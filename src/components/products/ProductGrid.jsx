// import React from 'react';
// import ProductCard from './ProductCard';
// import EmptyState from '../ui/EmptyState';

// export default function ProductGrid({
//   products = [],
//   columns = 4,
//   emptyTitle = "No products found",
//   emptyDescription = "Try adjusting your filters or search keywords to find what you are looking for.",
//   onResetFilters,
//   className = '',
// }) {
//   if (!products || products.length === 0) {
//     return (
//       <EmptyState
//         title={emptyTitle}
//         description={emptyDescription}
//         actionLabel={onResetFilters ? "Clear All Filters" : undefined}
//         onAction={onResetFilters}
//       />
//     );
//   }

//   const columnClassMap = {
//     3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
//     4: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
//   };

//   const gridClasses = columnClassMap[columns] || columnClassMap[4];

//   return (
//     <div className={`grid ${gridClasses} gap-5 sm:gap-6 lg:gap-8 ${className}`}>
//       {products.map((product, index) => (
//         <ProductCard
//           key={product.id || product.slug}
//           product={{
//             ...product,
//             animationIndex: index % columns,
//           }}
//         />
//       ))}
//     </div>
//   );
// }


import React from "react";
import { motion } from "framer-motion";
import ProductCard from "./ProductCard";
import EmptyState from "../ui/EmptyState";

export default function ProductGrid({
  products = [],
  columns = 4,
  emptyTitle = "No products found",
  emptyDescription = "Try adjusting your filters or search keywords to find what you are looking for.",
  onResetFilters,
  className = "",
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
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
  };

  const gridClasses = columnClassMap[columns] || columnClassMap[4];

  return (
    <motion.div
      className={`grid ${gridClasses} gap-5 sm:gap-6 lg:gap-8 ${className}`}
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {products.map((product, index) => (
        <ProductCard
          key={product.id || product.slug}
          product={{
            ...product,
            animationIndex: index % columns,
          }}
        />
      ))}
    </motion.div>
  );
}

