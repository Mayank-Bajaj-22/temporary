import React, { useState } from 'react';
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  PlusCircle, 
  ExternalLink, 
  Menu, 
  X, 
  ShieldCheck, 
  LogOut,
  Database,
  UserCheck
} from 'lucide-react';
import ScrollToTop from '../components/common/ScrollToTop';
import { useAuth } from '../context/AuthContext';

export default function AdminLayout() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, isConfigured } = useAuth();

  const navItems = [
    { name: 'Dashboard', to: '/admin', icon: LayoutDashboard, end: true },
    { name: 'Products Portfolio', to: '/admin/products', icon: Package, end: false },
    { name: 'Add Product', to: '/admin/products/new', icon: PlusCircle, end: true },
  ];

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/admin/login');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F5F0] text-[#29251F] flex flex-col md:flex-row font-sans">
      <ScrollToTop />

      {/* Mobile Top Header */}
      <div className="md:hidden bg-[#281A10] text-[#F7F5F0] px-4 py-3 flex items-center justify-between sticky top-0 z-40 border-b border-[#3B281B]">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="p-1.5 -ml-1 text-[#E8E3D9] hover:text-white"
            aria-label="Toggle admin sidebar"
          >
            {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <span className="font-serif text-lg tracking-tight font-semibold text-white">
            Buddha<span className="text-[#B69A63] italic font-normal">Home</span>
            <span className="ml-1.5 text-[10px] font-sans uppercase tracking-widest text-[#B69A63] bg-[#76501F]/40 px-1.5 py-0.5 rounded-xs">Admin</span>
          </span>
        </div>

        <Link
          to="/"
          className="inline-flex items-center gap-1 text-xs text-[#E8E3D9]/80 hover:text-white"
          title="Back to Public Store"
        >
          <span>Store</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Sidebar (Desktop + Mobile Slide-over) */}
      <aside
        className={`fixed md:sticky top-0 h-screen z-50 md:z-30 w-64 bg-[#281A10] text-[#E8E3D9] flex flex-col border-r border-[#3B281B] transition-transform duration-200 ease-in-out ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Brand Area */}
        <div className="p-6 border-b border-[#3B281B] flex items-center justify-between">
          <div>
            <Link to="/admin" className="block">
              <span className="font-serif text-2xl tracking-tight font-semibold text-white">
                Buddha<span className="text-[#B69A63] italic font-normal">Home</span>
              </span>
            </Link>
            <span className="inline-flex items-center gap-1 mt-1 text-[10px] uppercase tracking-wider text-[#B69A63] font-semibold bg-[#76501F]/30 px-2 py-0.5 rounded-xs">
              <ShieldCheck className="w-3 h-3" />
              Studio Admin
            </span>
          </div>

          <button
            type="button"
            onClick={() => setIsMobileOpen(false)}
            className="md:hidden p-1 text-[#E8E3D9] hover:text-white"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
          <p className="px-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#B69A63]/80 mb-2">
            Management
          </p>

          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                onClick={() => setIsMobileOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-[#76501F] text-white shadow-xs font-semibold'
                      : 'text-[#E8E3D9]/80 hover:bg-[#3B281B] hover:text-white'
                  }`
                }
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.name}</span>
              </NavLink>
            );
          })}

          <div className="pt-6">
            <p className="px-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#B69A63]/80 mb-2">
              Shortcuts
            </p>
            <Link
              to="/"
              className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm text-[#E8E3D9]/80 hover:bg-[#3B281B] hover:text-white transition-colors group"
            >
              <span className="flex items-center gap-2">
                <ExternalLink className="w-4 h-4 text-[#B69A63]" />
                <span>View Public Store</span>
              </span>
              <span className="text-xs text-[#B69A63] opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
            </Link>
          </div>
        </nav>

        {/* Authenticated User & Sign Out Footer */}
        <div className="p-4 border-t border-[#3B281B] bg-[#21150C]/80 text-xs text-[#E8E3D9]/80 space-y-2.5">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-[#76501F]/40 border border-[#76501F] flex items-center justify-center text-[#B69A63] shrink-0 font-bold text-xs">
              {user?.email ? user.email.charAt(0).toUpperCase() : 'A'}
            </div>
            <div className="truncate flex-1">
              <span className="block font-medium text-white truncate text-[11px]">
                {user?.email || 'Administrator'}
              </span>
              <span className="text-[10px] text-[#B69A63] block">
                {isConfigured ? 'Supabase Auth' : 'Demo Mode'}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="w-full inline-flex items-center justify-center gap-1.5 py-1.5 px-3 bg-[#3B281B] hover:bg-rose-900/60 text-[#E8E3D9] hover:text-white rounded-sm text-[11px] font-semibold tracking-wider uppercase transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-[#281A10]/70 z-40 md:hidden backdrop-blur-xs"
          onClick={() => setIsMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        {/* Top Header Bar for Desktop */}
        <header className="hidden md:flex items-center justify-between px-8 py-4 bg-white border-b border-[#E8E3D9]">
          <div className="flex items-center gap-2 text-xs text-[#777166]">
            <span>BuddhaHome Admin</span>
            <span>/</span>
            <span className="text-[#281A10] font-semibold capitalize">
              {location.pathname.replace('/admin', '').replace('/', '') || 'Dashboard'}
            </span>
          </div>

          <div className="flex items-center gap-4">
            {isConfigured ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-full text-[11px] font-medium text-emerald-800">
                <Database className="w-3.5 h-3.5 text-emerald-600" />
                <span>Supabase PostgreSQL Live</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#F2EDE2] border border-[#B69A63]/30 rounded-full text-[11px] font-medium text-[#76501F]">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
                <span>Demo Fallback Mode</span>
              </span>
            )}

            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#76501F] hover:text-[#281A10] transition-colors"
            >
              <span>Public Store</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </header>

        {/* Content Outlet */}
        <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
