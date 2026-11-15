import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import Container from '../components/ui/Container';
import ProductGrid from '../components/products/ProductGrid';
import ProductFilters from '../components/products/ProductFilters';
import { useProducts } from '../context/ProductContext';
import { filterAndSortProducts } from '../utils/productFilters';

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { products } = useProducts();

  // Read initial query params from URL
  const initialQuery = searchParams.get('q') || '';
  const initialCategory = searchParams.get('category') || 'all';

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState('featured');
  const [onlyFeatured, setOnlyFeatured] = useState(false);
  const [onlyNewArrivals, setOnlyNewArrivals] = useState(false);

  // Keep state synchronized with URL search params changes
  useEffect(() => {
    const urlQ = searchParams.get('q') || '';
    const urlCat = searchParams.get('category') || 'all';
    setSearchQuery(urlQ);
    setSelectedCategory(urlCat);
  }, [searchParams]);

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    const newParams = new URLSearchParams(searchParams);
    if (query) {
      newParams.set('q', query);
    } else {
      newParams.delete('q');
    }
    setSearchParams(newParams, { replace: true });
  };

  const handleCategoryChange = (catSlug) => {
    setSelectedCategory(catSlug);
    const newParams = new URLSearchParams(searchParams);
    if (catSlug && catSlug !== 'all') {
      newParams.set('category', catSlug);
    } else {
      newParams.delete('category');
    }
    setSearchParams(newParams, { replace: true });
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSortBy('featured');
    setOnlyFeatured(false);
    setOnlyNewArrivals(false);
    setSearchParams({}, { replace: true });
  };

  // Memoized filtered and sorted results using shared context
  const filteredProducts = useMemo(() => {
    return filterAndSortProducts(products, {
      searchQuery,
      categorySlug: selectedCategory,
      sortBy,
      onlyFeatured,
      onlyNewArrivals,
    });
  }, [products, searchQuery, selectedCategory, sortBy, onlyFeatured, onlyNewArrivals]);

  return (
    <div className="py-10 sm:py-16">
      <Container>
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <span className="text-xs font-semibold tracking-[0.2em] text-[#76501F] uppercase">
            Artisanal Portfolio
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#281A10] mt-2 mb-4 tracking-tight">
            Explore BuddhaHome Collection
          </h1>
          <p className="text-sm sm:text-base text-[#777166] leading-relaxed font-sans">
            Discover handcrafted wooden serveware, pedestal bowl stands, and natural stone accessories made for mindful living spaces. Connect directly with our studio for quotes and bespoke commissions.
          </p>
        </div>

        {/* Filter Controls Component */}
        <ProductFilters
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
          sortBy={sortBy}
          onSortChange={setSortBy}
          onlyFeatured={onlyFeatured}
          onFeaturedChange={setOnlyFeatured}
          onlyNewArrivals={onlyNewArrivals}
          onNewArrivalsChange={setOnlyNewArrivals}
          onClearFilters={handleClearFilters}
          totalResults={filteredProducts.length}
        />

        {/* Product Grid */}
        <ProductGrid
          products={filteredProducts}
          columns={4}
          emptyTitle={searchQuery ? `No results for "${searchQuery}"` : "No matching handcrafted pieces"}
          emptyDescription="Try clearing your filters or exploring another collection."
          onResetFilters={handleClearFilters}
        />
      </Container>
    </div>
  );
}
