import React from 'react';
import { Search, X, ArrowUpDown } from 'lucide-react';
import { categories } from '../../data/categories';

export default function ProductFilters({
  searchQuery = '',
  onSearchChange,
  selectedCategory = 'all',
  onCategoryChange,
  sortBy = 'featured',
  onSortChange,
  onlyFeatured = false,
  onFeaturedChange,
  onlyNewArrivals = false,
  onNewArrivalsChange,
  onClearFilters,
  totalResults = 0,
}) {
  const hasActiveFilters = Boolean(
    searchQuery ||
    selectedCategory !== 'all' ||
    sortBy !== 'featured' ||
    onlyFeatured ||
    onlyNewArrivals
  );

  return (
    <div className="bg-white border border-[#E8E3D9] rounded-xl p-5 mb-8 shadow-xs">
      {/* Top Row: Search & Sorting */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between pb-5 border-b border-[#E8E3D9]">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#777166]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by piece name, wood species, or collection..."
            className="w-full pl-10 pr-9 py-2.5 bg-[#F7F5F0] border border-[#E8E3D9] rounded-sm text-sm text-[#29251F] placeholder-[#777166] focus:border-[#76501F] focus:outline-none transition-colors"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 text-[#777166] hover:text-[#281A10]"
              aria-label="Clear search query"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Sort and Quick Toggles */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 bg-[#F7F5F0] border border-[#E8E3D9] rounded-sm px-3 py-2 text-xs">
            <ArrowUpDown className="w-3.5 h-3.5 text-[#76501F]" />
            <label htmlFor="sort-select" className="text-[#777166] font-medium whitespace-nowrap">
              Sort by:
            </label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="bg-transparent text-[#29251F] font-semibold focus:outline-none cursor-pointer"
            >
              <option value="featured">Featured First</option>
              <option value="newest">Newest Creations</option>
              <option value="name-asc">Name: A to Z</option>
              <option value="name-desc">Name: Z to A</option>
            </select>
          </div>

          {/* Quick Filter Toggles */}
          <button
            type="button"
            onClick={() => onFeaturedChange(!onlyFeatured)}
            className={`px-3 py-2 text-xs font-medium rounded-sm border transition-colors ${
              onlyFeatured
                ? 'bg-[#B69A63] border-[#B69A63] text-[#281A10] font-semibold'
                : 'bg-[#F7F5F0] border-[#E8E3D9] text-[#777166] hover:text-[#29251F]'
            }`}
          >
            ★ Highlights
          </button>

          <button
            type="button"
            onClick={() => onNewArrivalsChange(!onlyNewArrivals)}
            className={`px-3 py-2 text-xs font-medium rounded-sm border transition-colors ${
              onlyNewArrivals
                ? 'bg-[#281A10] border-[#281A10] text-[#F7F5F0] font-semibold'
                : 'bg-[#F7F5F0] border-[#E8E3D9] text-[#777166] hover:text-[#29251F]'
            }`}
          >
            ✦ New Turnings
          </button>
        </div>
      </div>

      {/* Bottom Row: Category Buttons & Status */}
      <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          <button
            type="button"
            onClick={() => onCategoryChange('all')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-full whitespace-nowrap transition-colors ${
              selectedCategory === 'all'
                ? 'bg-[#76501F] text-white shadow-xs'
                : 'bg-[#F7F5F0] text-[#777166] hover:bg-[#E8E3D9] hover:text-[#29251F]'
            }`}
          >
            All Creations
          </button>

          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => onCategoryChange(cat.slug)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-full whitespace-nowrap transition-colors ${
                selectedCategory === cat.slug
                  ? 'bg-[#76501F] text-white shadow-xs'
                  : 'bg-[#F7F5F0] text-[#777166] hover:bg-[#E8E3D9] hover:text-[#29251F]'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Results Count & Clear Button */}
        <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0 text-xs">
          <span className="text-[#777166]">
            Showing <strong className="text-[#29251F] font-semibold">{totalResults}</strong> {totalResults === 1 ? 'piece' : 'pieces'}
          </span>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={onClearFilters}
              className="inline-flex items-center gap-1 text-[#76501F] hover:text-[#281A10] font-semibold underline underline-offset-2"
            >
              <X className="w-3.5 h-3.5" />
              <span>Clear filters</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
