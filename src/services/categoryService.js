import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { categories as fallbackCategories } from '../data/categories';

/**
 * Fetch all categories ordered by sort_order
 */
export async function getCategories() {
  if (!isSupabaseConfigured()) {
    return fallbackCategories;
  }

  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('sort_order', { ascending: true });

    if (error) {
      console.warn('Supabase getCategories error, using fallback:', error.message);
      return fallbackCategories;
    }

    if (!data || data.length === 0) {
      return fallbackCategories;
    }

    return data.map((c) => ({
      id: c.id,
      name: c.name,
      slug: c.slug,
      description: c.description || '',
      image: c.image_path || '/images/buddhahome/walnut-scalloped-serving-collection.png',
      sortOrder: c.sort_order,
      featured: true,
    }));
  } catch (err) {
    console.error('Unexpected error fetching categories:', err);
    return fallbackCategories;
  }
}
