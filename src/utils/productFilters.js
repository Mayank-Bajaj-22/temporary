/**
 * Filter and sort products according to current criteria
 * Minimalist portfolio showcase (no pricing)
 */
export const filterAndSortProducts = (products, {
  searchQuery = '',
  categorySlug = '',
  sortBy = 'featured', // 'featured' | 'newest' | 'name-asc' | 'name-desc'
  onlyFeatured = false,
  onlyNewArrivals = false,
} = {}) => {
  if (!Array.isArray(products)) return [];

  let result = [...products];

  // 1. Text Search Filter (name, category, description, woodType)
  if (searchQuery && searchQuery.trim()) {
    const q = searchQuery.trim().toLowerCase();
    result = result.filter(product => {
      const nameMatch = product.name?.toLowerCase().includes(q);
      const catMatch = product.category?.toLowerCase().includes(q);
      const descMatch = product.description?.toLowerCase().includes(q);
      const woodMatch = product.details?.woodType?.toLowerCase().includes(q);
      return nameMatch || catMatch || descMatch || woodMatch;
    });
  }

  // 2. Category Filter
  if (categorySlug && categorySlug !== 'all') {
    result = result.filter(product => product.categorySlug === categorySlug);
  }

  // 3. Featured Filter
  if (onlyFeatured) {
    result = result.filter(product => Boolean(product.featured));
  }

  // 4. New Arrivals Filter
  if (onlyNewArrivals) {
    result = result.filter(product => Boolean(product.isNewArrival));
  }

  // 5. Sorting
  switch (sortBy) {
    case 'name-asc':
      result.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'name-desc':
      result.sort((a, b) => b.name.localeCompare(a.name));
      break;
    case 'newest':
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      break;
    case 'featured':
    default:
      // Featured first, then newest
      result.sort((a, b) => {
        if (a.featured === b.featured) {
          return new Date(b.createdAt) - new Date(a.createdAt);
        }
        return a.featured ? -1 : 1;
      });
      break;
  }

  return result;
};
