import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, Phone, MessageCircle, ChevronRight, ShieldCheck } from 'lucide-react';
import { useProducts } from '../../context/ProductContext';
import { siteConfig } from '../../config/site';

export default function MobileMenu({ isOpen, onClose }) {
  const location = useLocation();
  const { categories } = useProducts();

  // Close menu when route changes
  useEffect(() => {
    if (isOpen) {
      onClose();
    }
  }, [location.pathname]);

  // Lock body scroll and handle ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-[#281A10]/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div 
        className="fixed inset-y-0 left-0 max-w-xs w-full bg-[#F7F5F0] border-r border-[#E8E3D9] shadow-2xl flex flex-col z-10 animate-in slide-in-from-left duration-200"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation Menu"
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#E8E3D9] flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <span className="font-serif text-2xl tracking-tight text-[#281A10] font-semibold">
              Buddha<span className="text-[#76501F] italic font-normal">Home</span>
            </span>
          </Link>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-[#777166] hover:text-[#281A10] hover:bg-[#E8E3D9]/60 rounded-sm transition-colors"
            aria-label="Close navigation menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation items */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#777166] mb-3">
              Explore Portfolio
            </p>
            <nav className="space-y-1">
              <Link
                to="/"
                className={`block px-3 py-2 text-base rounded-sm font-medium transition-colors ${
                  location.pathname === '/' 
                    ? 'bg-[#E8E3D9]/70 text-[#76501F]' 
                    : 'text-[#29251F] hover:bg-[#E8E3D9]/40'
                }`}
              >
                Home
              </Link>
              <Link
                to="/products"
                className={`block px-3 py-2 text-base rounded-sm font-medium transition-colors ${
                  location.pathname === '/products' 
                    ? 'bg-[#E8E3D9]/70 text-[#76501F]' 
                    : 'text-[#29251F] hover:bg-[#E8E3D9]/40'
                }`}
              >
                All Creations
              </Link>
              <Link
                to="/about"
                className={`block px-3 py-2 text-base rounded-sm font-medium transition-colors ${
                  location.pathname === '/about' 
                    ? 'bg-[#E8E3D9]/70 text-[#76501F]' 
                    : 'text-[#29251F] hover:bg-[#E8E3D9]/40'
                }`}
              >
                About Our Story
              </Link>
              <Link
                to="/contact"
                className={`block px-3 py-2 text-base rounded-sm font-medium transition-colors ${
                  location.pathname === '/contact' 
                    ? 'bg-[#E8E3D9]/70 text-[#76501F]' 
                    : 'text-[#29251F] hover:bg-[#E8E3D9]/40'
                }`}
              >
                Contact & Custom Commissions
              </Link>
              <Link
                to="/admin"
                className="block px-3 py-2 text-xs font-semibold uppercase tracking-wider text-[#76501F] hover:bg-[#E8E3D9]/40 rounded-sm"
              >
                Studio Admin Panel →
              </Link>
            </nav>
          </div>

          <div>
            <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#777166] mb-3">
              Collections
            </p>
            <nav className="space-y-1">
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  to={`/categories/${cat.slug}`}
                  className="flex items-center justify-between px-3 py-2 text-sm text-[#29251F] hover:bg-[#E8E3D9]/40 rounded-sm transition-colors group"
                >
                  <span>{cat.name}</span>
                  <ChevronRight className="w-4 h-4 text-[#777166] group-hover:text-[#76501F] transition-transform group-hover:translate-x-0.5" />
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Footer contact quick actions */}
        <div className="p-6 border-t border-[#E8E3D9] bg-white space-y-3">
          <p className="text-xs text-[#777166]">Have an enquiry or bespoke woodwork commission?</p>
          {siteConfig.whatsappNumber && (
            <a
              href={`https://wa.me/${siteConfig.whatsappNumber.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-[#76501F] text-white text-xs font-semibold tracking-wider uppercase rounded-sm hover:bg-[#281A10] transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Us</span>
            </a>
          )}
          {siteConfig.contactPhone && (
            <a
              href={`tel:${siteConfig.contactPhone.replace(/[^0-9+]/g, '')}`}
              className="flex items-center justify-center gap-2 w-full py-2 px-4 border border-[#E8E3D9] text-[#29251F] text-xs font-medium rounded-sm hover:border-[#76501F] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#76501F]" />
              <span>{siteConfig.contactPhone}</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
