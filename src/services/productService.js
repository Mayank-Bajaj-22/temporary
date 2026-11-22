import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { products as fallbackProducts } from '../data/products';
import { filterAndSortProducts } from '../utils/productFilters';

// In-memory cache/store for fallback mode
let localProducts = [...fallbackProducts];

/**
 * Format database record (snake_case) into frontend model (camelCase)
 */
export function formatProductRecord(record) {
  if (!record) return null;
  return {
    id: record.id,
    name: record.name,
    slug: record.slug,
    description: record.description || '',
    price: Number(record.price) || 0,
    categoryId: record.category_id,
    category: record.category_name || 'Artisanal Collection',
    categorySlug: record.category_slug || 'scalloped-serveware',
    images: Array.isArray(record.images) && record.images.length > 0 
      ? record.images 
      : ['/images/buddhahome/walnut-scalloped-serving-collection.png'],
    details: record.details && typeof record.details === 'object' ? record.details : {},
    featured: Boolean(record.featured),
    isNewArrival: Boolean(record.is_new_arrival),
    available: Boolean(record.available),
    createdAt: record.created_at || new Date().toISOString(),
    updatedAt: record.updated_at || new Date().toISOString(),
  };
}

/**
 * Format frontend model (camelCase) into database payload (snake_case)
 */
export function formatProductPayload(product) {
  return {
    name: product.name?.trim(),
    slug: product.slug?.trim(),
    description: product.description?.trim() || '',
    price: typeof product.price === 'number' ? Math.max(0, product.price) : 0,
    category_id: product.categoryId || null,
    category_name: product.category || 'Artisanal Collection',
    category_slug: product.categorySlug || 'scalloped-serveware',
    images: Array.isArray(product.images) && product.images.length > 0 
      ? product.images 
      : ['/images/buddhahome/walnut-scalloped-serving-collection.png'],
    details: product.details || {},
    featured: Boolean(product.featured),
    is_new_arrival: Boolean(product.isNewArrival),
    available: product.available !== undefined ? Boolean(product.available) : true,
  };
}

/**
 * Fetch products with optional filtering and sorting
 */
export async function getProducts({
  searchQuery = '',
  categorySlug = '',
  sortBy = 'featured',
  onlyFeatured = false,
  onlyNewArrivals = false,
  includeUnavailable = false,
} = {}) {
  if (!isSupabaseConfigured()) {
    // Fallback mode using in-memory store
    let filtered = filterAndSortProducts(localProducts, {
      searchQuery,
      categorySlug,
      sortBy,
      onlyFeatured,
      onlyNewArrivals,
    });
    if (!includeUnavailable) {
      filtered = filtered.filter((p) => p.available);
    }
    return filtered;
  }

  try {
    let query = supabase.from('products').select('*');

    // Filter by availability unless explicitly requested by admin
    if (!includeUnavailable) {
      query = query.eq('available', true);
    }

    if (categorySlug && categorySlug !== 'all') {
      query = query.eq('category_slug', categorySlug);
    }

    if (onlyFeatured) {
      query = query.eq('featured', true);
    }

    if (onlyNewArrivals) {
      query = query.eq('is_new_arrival', true);
    }

    if (searchQuery && searchQuery.trim()) {
      const q = searchQuery.trim();
      query = query.or(
        `name.ilike.%${q}%,description.ilike.%${q}%,category_name.ilike.%${q}%,category_slug.ilike.%${q}%`
      );
    }

    // Sorting
    switch (sortBy) {
      case 'name-asc':
        query = query.order('name', { ascending: true });
        break;
      case 'name-desc':
        query = query.order('name', { ascending: false });
        break;
      case 'newest':
        query = query.order('created_at', { ascending: false });
        break;
      case 'featured':
      default:
        query = query
          .order('featured', { ascending: false })
          .order('created_at', { ascending: false });
        break;
    }

    const { data, error } = await query;

    if (error) {
      console.warn('Supabase getProducts error, falling back to local dataset:', error.message);
      return filterAndSortProducts(localProducts, {
        searchQuery,
        categorySlug,
        sortBy,
        onlyFeatured,
        onlyNewArrivals,
      });
    }

    return (data || []).map(formatProductRecord);
  } catch (err) {
    console.error('Unexpected error fetching products from Supabase:', err);
    return localProducts;
  }
}

/**
 * Fetch a single product by slug
 */
export async function getProductBySlug(slug) {
  if (!slug) return null;

  if (!isSupabaseConfigured()) {
    return localProducts.find((p) => p.slug === slug || String(p.id) === String(slug)) || null;
  }

  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('slug', slug)
      .maybeSingle();

    if (error) {
      console.warn('Supabase getProductBySlug error:', error.message);
      return localProducts.find((p) => p.slug === slug) || null;
    }

    return data ? formatProductRecord(data) : null;
  } catch (err) {
    console.error('Unexpected error getting product by slug:', err);
    return null;
  }
}

/**
 * Fetch a single product by ID
 */
export async function getProductById(id) {
  if (!id) return null;

  if (!isSupabaseConfigured()) {
    return localProducts.find((p) => String(p.id) === String(id) || p.slug === id) || null;
  }

  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) {
      console.warn('Supabase getProductById error:', error.message);
      return localProducts.find((p) => String(p.id) === String(id)) || null;
    }

    return data ? formatProductRecord(data) : null;
  } catch (err) {
    console.error('Unexpected error getting product by ID:', err);
    return null;
  }
}

/**
 * Create a new product (Admin authenticated only)
 */
export async function createProduct(productData) {
  const payload = formatProductPayload(productData);

  if (!isSupabaseConfigured()) {
    const newProduct = {
      ...productData,
      id: productData.id || productData.slug || `prod-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    localProducts = [newProduct, ...localProducts];
    return newProduct;
  }

  const { data, error } = await supabase
    .from('products')
    .insert([payload])
    .select()
    .single();

  if (error) {
    if (error.code === '23505') {
      throw new Error(`The slug "/${payload.slug}" is already in use by another piece.`);
    }
    throw new Error(error.message || 'Failed to create product in database.');
  }

  return formatProductRecord(data);
}

/**
 * Update an existing product (Admin authenticated only)
 */
export async function updateProduct(id, productData) {
  const payload = formatProductPayload(productData);

  if (!isSupabaseConfigured()) {
    localProducts = localProducts.map((p) => {
      if (String(p.id) === String(id) || p.slug === id) {
        return { ...p, ...productData, updatedAt: new Date().toISOString() };
      }
      return p;
    });
    return { id, ...productData };
  }

  const { data, error } = await supabase
    .from('products')
    .update(payload)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    if (error.code === '23505') {
      throw new Error(`The slug "/${payload.slug}" is already in use by another piece.`);
    }
    throw new Error(error.message || 'Failed to update product in database.');
  }

  return formatProductRecord(data);
}

/**
 * Delete a product by ID (Admin authenticated only)
 */
export async function deleteProduct(id) {
  if (!isSupabaseConfigured()) {
    localProducts = localProducts.filter((p) => String(p.id) !== String(id) && p.slug !== id);
    return true;
  }

  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id);

  if (error) {
    throw new Error(error.message || 'Failed to delete product from database.');
  }

  return true;
}

/**
 * Upload an image file to the Supabase Storage bucket: 'product-images'
 */
export async function uploadProductImage(file) {
  if (!file) {
    throw new Error('No image file provided.');
  }

  // 1. File Type Validation
  const validMimes = ['image/jpeg', 'image/png', 'image/webp', 'image/avif'];
  if (!validMimes.includes(file.type)) {
    throw new Error('Unsupported format: Please upload a JPEG, PNG, WebP, or AVIF image.');
  }

  // 2. File Size Validation (Max 5MB)
  const maxSize = 5 * 1024 * 1024;
  if (file.size > maxSize) {
    throw new Error('File exceeds size limit: Images must be smaller than 5 MB.');
  }

  // Fallback for unconfigured demo
  if (!isSupabaseConfigured()) {
    return URL.createObjectURL(file);
  }

  // 3. Upload to Supabase Storage
  const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
  const filePath = `products/${Date.now()}-${sanitizedName}`;

  const { data, error } = await supabase.storage
    .from('product-images')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (error) {
    console.error('Supabase storage upload error:', error);
    throw new Error(`Image upload failed: ${error.message}`);
  }

  // 4. Retrieve Public URL
  const { data: { publicUrl } } = supabase.storage
    .from('product-images')
    .getPublicUrl(data.path);

  return publicUrl;
}

/**
 * Upload multiple product images to Supabase Storage
 */
export async function uploadProductImages(files) {
  if (!files || files.length === 0) {
    throw new Error('Please select at least one image.');
  }

  const imageFiles = Array.from(files);

  const uploadedImages = await Promise.all(
    imageFiles.map((file) => uploadProductImage(file))
  );

  return uploadedImages;
}