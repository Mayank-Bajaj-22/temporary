import React from 'react';
import ProductCard from './ProductCard';
import EmptyState from '../ui/EmptyState';

export default function ProductGrid({
  products = [],
  columns = 4, // 3 or 4
  emptyTitle = "No products found",
  emptyDescription = "Try adjusting your filters or search keywords to find what you are looking for.",
  onResetFilters,
  className = '',
}) {
  if (!products || products.length === 0) {
    return (
      <EmptyState
        title={emptyTitle}
        description={emptyDescription}
        actionLabel={onResetFilters ? "Clear All Filters" : undefined}
        onAction={onResetFilters}
      />
    );
  }

  const columnClassMap = {
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
  };

  const gridClasses = columnClassMap[columns] || columnClassMap[4];

  return (
    <div className={`grid ${gridClasses} gap-5 sm:gap-6 lg:gap-8 ${className}`}>
      {products.map((product) => (
        <ProductCard key={product.id || product.slug} product={product} />
      ))}
    </div>
  );
}
