import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { 
  getProducts, 
  getProductById as serviceGetProductById, 
  getProductBySlug as serviceGetProductBySlug,
  createProduct as serviceCreateProduct,
  updateProduct as serviceUpdateProduct,
  deleteProduct as serviceDeleteProduct
} from '../services/productService';
import { getCategories } from '../services/categoryService';
import { isSupabaseConfigured } from '../lib/supabase';

const ProductContext = createContext(null);

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load all products and categories
  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const [loadedProducts, loadedCategories] = await Promise.all([
        getProducts({ includeUnavailable: true, sortBy: 'featured' }),
        getCategories(),
      ]);

      setProducts(loadedProducts);
      setCategories(loadedCategories);
    } catch (err) {
      console.error('Failed to load products/categories in ProductProvider:', err);
      setError(err.message || 'Failed to load portfolio catalogue');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Add a product
  const addProduct = async (productData) => {
    try {
      const created = await serviceCreateProduct(productData);
      // Immediately reflect in state
      setProducts((prev) => [created, ...prev]);
      return created;
    } catch (err) {
      console.error('Error creating product:', err);
      throw err;
    }
  };

  // Update a product
  const updateProduct = async (id, updatedFields) => {
    try {
      const updated = await serviceUpdateProduct(id, updatedFields);
      setProducts((prev) =>
        prev.map((p) => (String(p.id) === String(id) || p.slug === id ? { ...p, ...updated } : p))
      );
      return updated;
    } catch (err) {
      console.error('Error updating product:', err);
      throw err;
    }
  };

  // Delete a product
  const deleteProduct = async (id) => {
    try {
      await serviceDeleteProduct(id);
      setProducts((prev) => prev.filter((p) => String(p.id) !== String(id) && p.slug !== id));
      return true;
    } catch (err) {
      console.error('Error deleting product:', err);
      throw err;
    }
  };

  // Lookup helpers
  const getProductById = useCallback(
    (id) => {
      const cached = products.find((p) => String(p.id) === String(id) || p.slug === id);
      return cached || null;
    },
    [products]
  );

  const getProductBySlug = useCallback(
    (slug) => {
      const cached = products.find((p) => p.slug === slug || String(p.id) === String(slug));
      return cached || null;
    },
    [products]
  );

  // Live Calculated Dashboard Statistics
  const stats = useMemo(() => {
    const total = products.length;
    const featured = products.filter((p) => p.featured).length;
    const available = products.filter((p) => p.available).length;
    const unavailable = total - available;
    const newArrivals = products.filter((p) => p.isNewArrival).length;

    return {
      totalProducts: total,
      featuredProducts: featured,
      availableProducts: available,
      unavailableProducts: unavailable,
      newArrivals,
    };
  }, [products]);

  const value = {
    products,
    categories,
    loading,
    error,
    refreshProducts: loadData,
    addProduct,
    updateProduct,
    deleteProduct,
    getProductById,
    getProductBySlug,
    stats,
    isSupabaseLive: isSupabaseConfigured(),
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
}
