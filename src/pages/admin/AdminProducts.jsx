import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  Sparkles, 
  Check, 
  X, 
  AlertTriangle, 
  TreePine,
  ExternalLink
} from 'lucide-react';
import { useProducts } from '../../context/ProductContext';
import Button from '../../components/ui/Button';

export default function AdminProducts() {
  const { products, categories, deleteProduct } = useProducts();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedAvailability, setSelectedAvailability] = useState('all'); // 'all' | 'available' | 'unavailable'
  const [productToDelete, setProductToDelete] = useState(null);

  // Filter products based on search and filters
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // 1. Text search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = p.name?.toLowerCase().includes(q);
        const matchesCategory = p.category?.toLowerCase().includes(q);
        const matchesSlug = p.slug?.toLowerCase().includes(q);
        if (!matchesName && !matchesCategory && !matchesSlug) return false;
      }

      // 2. Category filter
      if (selectedCategory !== 'all' && p.categorySlug !== selectedCategory) {
        return false;
      }

      // 3. Availability filter
      if (selectedAvailability === 'available' && !p.available) return false;
      if (selectedAvailability === 'unavailable' && p.available) return false;

      return true;
    });
  }, [products, searchQuery, selectedCategory, selectedAvailability]);

  // Handle deletion
  const confirmDelete = () => {
    if (productToDelete) {
      deleteProduct(productToDelete.id);
      setProductToDelete(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#76501F]">
            Inventory & Showcase
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif text-[#281A10] mt-1">
            All Portfolio Products
          </h1>
          <p className="text-xs sm:text-sm text-[#777166] mt-1">
            Review, edit, or curate products displayed in your BuddhaHome studio portfolio.
          </p>
        </div>

        <Button
          to="/admin/products/new"
          variant="primary"
          size="md"
          icon={Plus}
        >
          Add Product
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-[#E8E3D9] shadow-xs flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#777166]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by piece name or slug..."
            className="w-full pl-10 pr-9 py-2 bg-[#F7F5F0] border border-[#E8E3D9] rounded-sm text-sm text-[#29251F] focus:border-[#76501F] focus:outline-none transition-colors"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#777166] hover:text-[#281A10]"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filter Dropdowns */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Category Dropdown */}
          <div className="flex items-center gap-1.5 text-xs bg-[#F7F5F0] border border-[#E8E3D9] rounded-sm px-3 py-2">
            <span className="text-[#777166] font-medium">Category:</span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-transparent text-[#29251F] font-semibold focus:outline-none cursor-pointer"
            >
              <option value="all">All Collections</option>
              {categories.map((c) => (
                <option key={c.id} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Availability Dropdown */}
          <div className="flex items-center gap-1.5 text-xs bg-[#F7F5F0] border border-[#E8E3D9] rounded-sm px-3 py-2">
            <span className="text-[#777166] font-medium">Status:</span>
            <select
              value={selectedAvailability}
              onChange={(e) => setSelectedAvailability(e.target.value)}
              className="bg-transparent text-[#29251F] font-semibold focus:outline-none cursor-pointer"
            >
              <option value="all">All Statuses</option>
              <option value="available">Available Only</option>
              <option value="unavailable">Archived Only</option>
            </select>
          </div>
        </div>
      </div>

      {/* Product Table Container */}
      <div className="bg-white rounded-xl border border-[#E8E3D9] shadow-xs overflow-hidden">
        {filteredProducts.length === 0 ? (
          <div className="p-12 text-center max-w-sm mx-auto">
            <TreePine className="w-12 h-12 text-[#76501F]/40 mx-auto mb-3" />
            <h3 className="font-serif text-lg text-[#281A10]">No products match</h3>
            <p className="text-xs text-[#777166] mt-1 mb-4">
              Try adjusting your search query or filters to find products.
            </p>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedAvailability('all');
              }}
            >
              Reset Filters
            </Button>
          </div>
        ) : (
          <>
            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-[#F7F5F0] border-b border-[#E8E3D9] text-[11px] uppercase tracking-wider text-[#777166]">
                  <tr>
                    <th scope="col" className="px-6 py-3.5 font-semibold">Image & Piece</th>
                    <th scope="col" className="px-6 py-3.5 font-semibold">Collection</th>
                    <th scope="col" className="px-6 py-3.5 font-semibold">Showcase Status</th>
                    <th scope="col" className="px-6 py-3.5 font-semibold">Highlight</th>
                    <th scope="col" className="px-6 py-3.5 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8E3D9]/60">
                  {filteredProducts.map((p) => (
                    <tr key={p.id} className="hover:bg-[#F7F5F0]/60 transition-colors">
                      {/* Product image & name */}
                      <td className="px-6 py-4 flex items-center gap-3.5">
                        <img
                          src={p.images?.[0] || '/images/buddhahome/walnut-scalloped-serving-collection.png'}
                          alt=""
                          className="w-14 h-14 rounded-lg object-cover bg-[#E8E3D9]/40 border border-[#E8E3D9] shrink-0"
                        />
                        <div>
                          <span className="font-medium text-[#29251F] block text-sm">
                            {p.name}
                          </span>
                          <span className="text-[11px] text-[#777166] font-mono block">
                            /{p.slug}
                          </span>
                        </div>
                      </td>

                      {/* Collection */}
                      <td className="px-6 py-4 text-xs">
                        <span className="px-2.5 py-1 bg-[#F7F5F0] border border-[#E8E3D9] rounded-xs font-medium text-[#76501F]">
                          {p.category}
                        </span>
                      </td>

                      {/* Availability status */}
                      <td className="px-6 py-4">
                        {p.available ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                            Available
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
                            Archived
                          </span>
                        )}
                      </td>

                      {/* Featured badge */}
                      <td className="px-6 py-4">
                        {p.featured ? (
                          <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-[#281A10] bg-[#B69A63]/30 border border-[#B69A63]/50 px-2 py-0.5 rounded-xs">
                            <Sparkles className="w-2.5 h-2.5 text-[#76501F]" />
                            Featured
                          </span>
                        ) : (
                          <span className="text-xs text-[#777166]/60">—</span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            to={`/products/${p.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 text-[#777166] hover:text-[#281A10] hover:bg-[#F7F5F0] rounded-sm transition-colors"
                            title="View public page"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Link>

                          <Link
                            to={`/admin/products/${p.id}/edit`}
                            className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-[#76501F] bg-[#F7F5F0] hover:bg-[#76501F] hover:text-white rounded-sm border border-[#E8E3D9] transition-colors"
                            title="Edit Product"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                            <span>Edit</span>
                          </Link>

                          <button
                            type="button"
                            onClick={() => setProductToDelete(p)}
                            className="p-1.5 text-rose-700 hover:text-white hover:bg-rose-700 rounded-sm transition-colors"
                            title="Delete Product"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card Layout */}
            <div className="md:hidden divide-y divide-[#E8E3D9]/60">
              {filteredProducts.map((p) => (
                <div key={p.id} className="p-4 space-y-3">
                  <div className="flex items-start gap-3">
                    <img
                      src={p.images?.[0] || '/images/buddhahome/walnut-scalloped-serving-collection.png'}
                      alt=""
                      className="w-16 h-16 rounded-lg object-cover border border-[#E8E3D9] shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm text-[#29251F] truncate">{p.name}</h4>
                      <span className="text-xs text-[#76501F] font-medium block">{p.category}</span>
                      <div className="mt-1 flex items-center gap-2">
                        {p.available ? (
                          <span className="text-[10px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full font-semibold">
                            Available
                          </span>
                        ) : (
                          <span className="text-[10px] text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full font-semibold">
                            Archived
                          </span>
                        )}
                        {p.featured && (
                          <span className="text-[10px] text-[#281A10] bg-[#B69A63]/30 px-1.5 py-0.5 rounded-xs font-semibold">
                            ★ Featured
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-1 border-t border-[#E8E3D9]/50">
                    <Link
                      to={`/products/${p.slug}`}
                      className="px-2.5 py-1 text-xs text-[#777166] hover:text-[#281A10]"
                    >
                      View
                    </Link>
                    <Link
                      to={`/admin/products/${p.id}/edit`}
                      className="inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold text-[#76501F] bg-[#F7F5F0] rounded-sm border border-[#E8E3D9]"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </Link>
                    <button
                      type="button"
                      onClick={() => setProductToDelete(p)}
                      className="p-1 text-rose-700 hover:bg-rose-50 rounded-sm"
                      aria-label="Delete piece"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {productToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#281A10]/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#E8E3D9] space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-lg text-[#281A10] font-semibold">
                  Confirm Product Deletion
                </h3>
                <p className="text-xs text-[#777166] mt-1 leading-relaxed">
                  Are you sure you want to remove <strong className="text-[#29251F]">"{productToDelete.name}"</strong> from your BuddhaHome portfolio? This will remove it from the public catalogue during this session.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#E8E3D9]">
              <button
                type="button"
                onClick={() => setProductToDelete(null)}
                className="px-4 py-2 text-xs font-medium text-[#777166] hover:text-[#281A10] transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                className="px-4 py-2 text-xs font-semibold bg-rose-700 text-white rounded-sm hover:bg-rose-800 transition-colors shadow-xs"
              >
                Delete from Showcase
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
