import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, Search, PhoneCall, X, ShieldAlert } from 'lucide-react';
import { useProducts } from '../../context/ProductContext';
import MobileMenu from './MobileMenu';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { categories } = useProducts();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#F7F5F0]/95 backdrop-blur-md border-b border-[#E8E3D9] transition-all">
        {/* Main Navbar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Left side: Hamburger button & Desktop primary links */}
            <div className="flex items-center gap-6">
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2 -ml-2 text-[#29251F] hover:text-[#76501F] transition-colors rounded-sm focus-visible:outline-2"
                aria-label="Open navigation menu"
              >
                <Menu className="w-6 h-6 stroke-[1.75]" />
              </button>

              <nav className="hidden lg:flex items-center gap-6">
                <Link
                  to="/"
                  className={`text-xs uppercase tracking-[0.18em] font-medium transition-colors hover:text-[#76501F] ${
                    location.pathname === '/' ? 'text-[#76501F] font-semibold' : 'text-[#29251F]'
                  }`}
                >
                  Home
                </Link>
                <Link
                  to="/products"
                  className={`text-xs uppercase tracking-[0.18em] font-medium transition-colors hover:text-[#76501F] ${
                    location.pathname === '/products' ? 'text-[#76501F] font-semibold' : 'text-[#29251F]'
                  }`}
                >
                  Portfolio
                </Link>
                <Link
                  to="/about"
                  className={`text-xs uppercase tracking-[0.18em] font-medium transition-colors hover:text-[#76501F] ${
                    location.pathname === '/about' ? 'text-[#76501F] font-semibold' : 'text-[#29251F]'
                  }`}
                >
                  About
                </Link>
              </nav>
            </div>

            {/* Center: Brand Wordmark */}
            <div className="flex-1 flex justify-center text-center">
              <Link to="/" className="inline-flex flex-col items-center group">
                <span className="font-serif text-2xl sm:text-3xl lg:text-4xl tracking-tight text-[#281A10] font-semibold leading-none">
                  Buddha<span className="text-[#76501F] italic font-normal">Home</span>
                </span>
                <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-[#777166] font-medium mt-1">
                  Artisanal Wood & Stone
                </span>
              </Link>
            </div>

            {/* Right: Search, Contact & Admin links */}
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                type="button"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 text-[#29251F] hover:text-[#76501F] transition-colors rounded-sm"
                aria-label="Toggle product search"
              >
                {isSearchOpen ? <X className="w-5 h-5" /> : <Search className="w-5 h-5 stroke-[1.75]" />}
              </button>

              <Link
                to="/contact"
                className="p-2 text-[#29251F] hover:text-[#76501F] transition-colors rounded-sm flex items-center gap-1.5"
                aria-label="Contact and studio enquiries"
                title="Enquire & Contact"
              >
                <PhoneCall className="w-5 h-5 stroke-[1.75]" />
                <span className="hidden md:inline text-xs font-semibold tracking-wider uppercase text-[#76501F]">
                  Enquire
                </span>
              </Link>

              <Link
                to="/admin"
                className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 bg-white border border-[#E8E3D9] hover:border-[#76501F] text-[#777166] hover:text-[#76501F] rounded-sm transition-colors"
                title="Open Studio Admin Panel"
              >
                <span>Admin</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Category Bar Inspired by the Reference Site */}
        <div className="hidden md:block border-t border-[#E8E3D9]/60 bg-[#F7F5F0]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center justify-center gap-8 py-2.5 overflow-x-auto no-scrollbar text-[11px] font-semibold tracking-[0.16em] uppercase">
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  to={`/categories/${cat.slug}`}
                  className={`whitespace-nowrap transition-colors hover:text-[#76501F] ${
                    location.pathname === `/categories/${cat.slug}`
                      ? 'text-[#76501F] border-b-2 border-[#76501F] pb-0.5'
                      : 'text-[#777166]'
                  }`}
                >
                  {cat.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Expandable Search Drawer */}
        {isSearchOpen && (
          <div className="border-t border-[#E8E3D9] bg-white shadow-md animate-in slide-in-from-top-2 duration-150">
            <div className="max-w-3xl mx-auto px-4 py-4 sm:py-6">
              <form onSubmit={handleSearchSubmit} className="relative flex items-center">
                <Search className="absolute left-4 w-5 h-5 text-[#777166]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search BuddhaHome creations (e.g. Scalloped Platter, Travertine Tray, Animal Board)..."
                  className="w-full pl-12 pr-28 py-3 bg-[#F7F5F0] border border-[#E8E3D9] rounded-sm text-sm text-[#29251F] placeholder-[#777166] focus:border-[#76501F] focus:outline-none transition-colors"
                  autoFocus
                />
                <button
                  type="submit"
                  className="absolute right-2 px-4 py-1.5 bg-[#281A10] text-[#F7F5F0] text-xs font-semibold uppercase tracking-wider rounded-xs hover:bg-[#76501F] transition-colors"
                >
                  Search
                </button>
              </form>
              <div className="mt-2.5 flex items-center justify-between text-xs text-[#777166]">
                <span>Popular: Walnut Scalloped, Travertine Tray, Standing Bowls, Animal Woodcraft</span>
                <button
                  type="button"
                  onClick={() => setIsSearchOpen(false)}
                  className="hover:text-[#281A10] underline"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Drawer */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
}
