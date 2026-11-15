import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Package, 
  Sparkles, 
  CheckCircle, 
  XCircle, 
  Plus, 
  ArrowRight, 
  Edit3, 
  Trees, 
  AlertCircle 
} from 'lucide-react';
import { useProducts } from '../../context/ProductContext';
import Button from '../../components/ui/Button';

export default function AdminDashboard() {
  const { products, stats } = useProducts();

  // Take the 5 most recent products
  const recentProducts = [...products]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#76501F]">
            Overview
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif text-[#281A10] mt-1">
            Buddha Home Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-[#777166] mt-1">
            Manage your artisanal creations, commissions, and showcase visibility.
          </p>
        </div>

        <Button
          to="/admin/products/new"
          variant="primary"
          size="md"
          icon={Plus}
        >
          Add New Product
        </Button>
      </div>

      {/* Development In-Memory Notice Banner */}
      <div className="p-4 bg-[#EFEAD8] border border-[#B69A63]/50 rounded-xl flex items-start gap-3 text-xs text-[#281A10]">
        <AlertCircle className="w-4 h-4 text-[#76501F] shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <strong className="font-semibold block text-[#76501F]">Active In-Memory Session Mode</strong>
          <p className="text-[#777166]">
            Any additions, updates, or deletions update the public showcase in real-time during this browser session. Persistent database storage will be connected during the backend integration phase.
          </p>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Total Products */}
        <div className="bg-white p-5 rounded-xl border border-[#E8E3D9] shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-[#F7F5F0] border border-[#E8E3D9] flex items-center justify-center text-[#76501F] shrink-0">
            <Package className="w-6 h-6 stroke-[1.5]" />
          </div>
          <div>
            <span className="text-xs font-medium text-[#777166] uppercase tracking-wider block">
              Total Creations
            </span>
            <span className="text-2xl sm:text-3xl font-serif text-[#281A10] font-semibold mt-0.5 block">
              {stats.totalProducts}
            </span>
          </div>
        </div>

        {/* Featured Products */}
        <div className="bg-white p-5 rounded-xl border border-[#E8E3D9] shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-[#F2EDE2] border border-[#B69A63]/30 flex items-center justify-center text-[#B69A63] shrink-0">
            <Sparkles className="w-6 h-6 stroke-[1.5]" />
          </div>
          <div>
            <span className="text-xs font-medium text-[#777166] uppercase tracking-wider block">
              Highlights
            </span>
            <span className="text-2xl sm:text-3xl font-serif text-[#281A10] font-semibold mt-0.5 block">
              {stats.featuredProducts}
            </span>
          </div>
        </div>

        {/* Available Products */}
        <div className="bg-white p-5 rounded-xl border border-[#E8E3D9] shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 shrink-0">
            <CheckCircle className="w-6 h-6 stroke-[1.5]" />
          </div>
          <div>
            <span className="text-xs font-medium text-[#777166] uppercase tracking-wider block">
              Active / Available
            </span>
            <span className="text-2xl sm:text-3xl font-serif text-[#281A10] font-semibold mt-0.5 block">
              {stats.availableProducts}
            </span>
          </div>
        </div>

        {/* Unavailable Products */}
        <div className="bg-white p-5 rounded-xl border border-[#E8E3D9] shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 shrink-0">
            <XCircle className="w-6 h-6 stroke-[1.5]" />
          </div>
          <div>
            <span className="text-xs font-medium text-[#777166] uppercase tracking-wider block">
              Archived / Inactive
            </span>
            <span className="text-2xl sm:text-3xl font-serif text-[#281A10] font-semibold mt-0.5 block">
              {stats.unavailableProducts}
            </span>
          </div>
        </div>
      </div>

      {/* Recent Products Showcase Section */}
      <div className="bg-white rounded-xl border border-[#E8E3D9] shadow-xs overflow-hidden">
        <div className="p-5 sm:p-6 border-b border-[#E8E3D9] flex items-center justify-between">
          <div>
            <h2 className="font-serif text-lg sm:text-xl text-[#281A10]">
              Recent Workshop Turnings
            </h2>
            <p className="text-xs text-[#777166] mt-0.5">
              The latest pieces added to your BuddhaHome portfolio.
            </p>
          </div>

          <Link
            to="/admin/products"
            className="text-xs font-semibold uppercase tracking-wider text-[#76501F] hover:text-[#281A10] inline-flex items-center gap-1 group"
          >
            <span>View All ({stats.totalProducts})</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Desktop Table View */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#F7F5F0] border-b border-[#E8E3D9] text-[11px] uppercase tracking-wider text-[#777166]">
              <tr>
                <th scope="col" className="px-6 py-3 font-semibold">Piece</th>
                <th scope="col" className="px-6 py-3 font-semibold">Collection</th>
                <th scope="col" className="px-6 py-3 font-semibold">Status</th>
                <th scope="col" className="px-6 py-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8E3D9]/60">
              {recentProducts.map((p) => (
                <tr key={p.id} className="hover:bg-[#F7F5F0]/60 transition-colors">
                  <td className="px-6 py-4 flex items-center gap-3">
                    <img
                      src={p.images?.[0] || '/images/buddhahome/walnut-scalloped-serving-collection.png'}
                      alt=""
                      className="w-12 h-12 rounded-lg object-cover bg-[#E8E3D9]/40 border border-[#E8E3D9]"
                    />
                    <div>
                      <span className="font-medium text-[#29251F] block">{p.name}</span>
                      <span className="text-xs text-[#777166]">Slug: /{p.slug}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs text-[#777166]">
                    <span className="px-2 py-0.5 bg-[#F7F5F0] border border-[#E8E3D9] rounded-xs font-medium text-[#76501F]">
                      {p.category}
                    </span>
                  </td>
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
                  <td className="px-6 py-4 text-right">
                    <Link
                      to={`/admin/products/${p.id}/edit`}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[#76501F] hover:text-[#281A10] px-2.5 py-1 bg-[#F7F5F0] hover:bg-[#E8E3D9] rounded-sm transition-colors"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card List */}
        <div className="sm:hidden divide-y divide-[#E8E3D9]/60">
          {recentProducts.map((p) => (
            <div key={p.id} className="p-4 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <img
                  src={p.images?.[0] || '/images/buddhahome/walnut-scalloped-serving-collection.png'}
                  alt=""
                  className="w-12 h-12 rounded-lg object-cover border border-[#E8E3D9]"
                />
                <div>
                  <h4 className="font-medium text-sm text-[#29251F]">{p.name}</h4>
                  <span className="text-[11px] text-[#777166]">{p.category}</span>
                </div>
              </div>

              <Link
                to={`/admin/products/${p.id}/edit`}
                className="p-2 text-[#76501F] hover:bg-[#F7F5F0] rounded-sm"
                aria-label={`Edit ${p.name}`}
              >
                <Edit3 className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
