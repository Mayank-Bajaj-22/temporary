import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import Container from '../components/ui/Container';
import ProductGrid from '../components/products/ProductGrid';
import Button from '../components/ui/Button';
import { useProducts } from '../context/ProductContext';
import { filterAndSortProducts } from '../utils/productFilters';
import { ArrowLeft, ArrowUpDown, ChevronRight } from 'lucide-react';

export default function CategoryPage() {
  const { slug } = useParams();
  const [sortBy, setSortBy] = useState('featured');
  const { products, categories } = useProducts();

  // Look up category
  const currentCategory = categories.find((c) => c.slug === slug);

  // Filter products for this category using shared state
  const categoryProducts = useMemo(() => {
    if (!currentCategory) return [];
    return filterAndSortProducts(products, {
      categorySlug: currentCategory.slug,
      sortBy,
    });
  }, [products, currentCategory, sortBy]);

  // If category slug is not found
  if (!currentCategory) {
    return (
      <div className="py-20 sm:py-32 text-center">
        <Container size="narrow">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#76501F]">
            Collection Not Found
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#281A10] mt-3 mb-4">
            Looking for a specific collection?
          </h1>
          <p className="text-[#777166] text-sm mb-8 leading-relaxed">
            The collection you are looking for doesn't exist or has moved. Explore our complete portfolio of handcrafted pieces.
          </p>
          <Button to="/products" variant="primary" icon={ArrowLeft}>
            Browse All Creations
          </Button>
        </Container>
      </div>
    );
  }

  return (
    <div className="pb-20">
      {/* Category Banner Header */}
      <section className="relative bg-[#EFEAD8] border-b border-[#E8E3D9] overflow-hidden py-12 sm:py-20">
        <div className="absolute inset-0 opacity-15 mix-blend-multiply pointer-events-none">
          <img
            src={currentCategory.image}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>

        <Container>
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-[#777166] mb-6">
            <Link to="/" className="hover:text-[#281A10] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#B69A63]" />
            <Link to="/products" className="hover:text-[#281A10] transition-colors">
              Collections
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#B69A63]" />
            <span className="text-[#281A10] font-semibold">{currentCategory.name}</span>
          </nav>

          <div className="max-w-2xl">
            <span className="text-xs font-semibold tracking-[0.2em] text-[#76501F] uppercase">
              Curated Collection
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#281A10] mt-2 mb-4 tracking-tight">
              {currentCategory.name}
            </h1>
            <p className="text-sm sm:text-base text-[#777166] leading-relaxed font-sans">
              {currentCategory.description}
            </p>
          </div>
        </Container>
      </section>

      {/* Main Products Area */}
      <section className="py-10 sm:py-14">
        <Container>
          {/* Subheader Toolbar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 mb-8 border-b border-[#E8E3D9] gap-4">
            <span className="text-xs text-[#777166]">
              Showing <strong className="text-[#281A10] font-semibold">{categoryProducts.length}</strong> handcrafted {categoryProducts.length === 1 ? 'piece' : 'pieces'} in {currentCategory.name}
            </span>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 bg-white border border-[#E8E3D9] rounded-sm px-3 py-1.5 text-xs shadow-2xs">
              <ArrowUpDown className="w-3.5 h-3.5 text-[#76501F]" />
              <label htmlFor="cat-sort" className="text-[#777166] font-medium">
                Sort:
              </label>
              <select
                id="cat-sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent text-[#29251F] font-semibold focus:outline-none cursor-pointer"
              >
                <option value="featured">Featured First</option>
                <option value="newest">Newest</option>
                <option value="name-asc">Name: A to Z</option>
              </select>
            </div>
          </div>

          {/* Product Grid */}
          <ProductGrid
            products={categoryProducts}
            columns={4}
            emptyTitle={`No pieces in ${currentCategory.name}`}
            emptyDescription="We are currently crafting new pieces for this collection. Check back soon or explore our other collections."
          />

          {/* Back link */}
          <div className="mt-14 pt-8 border-t border-[#E8E3D9] flex justify-center">
            <Button to="/products" variant="secondary" icon={ArrowLeft}>
              Explore Full Portfolio
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
}
