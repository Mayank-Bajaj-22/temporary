import React from 'react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../../config/site';
import { useProducts } from '../../context/ProductContext';
import { ShieldCheck, Sparkles, Trees, MessageCircle, Lock } from 'lucide-react';
import Container from '../ui/Container';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { categories } = useProducts();

  return (
    <footer className="bg-[#281A10] text-[#E8E3D9] mt-auto border-t border-[#3B281B]">
      {/* Main Footer Links */}
      <Container>
        <div className="py-14 sm:py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand & Mission Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-block">
              <span className="font-serif text-3xl tracking-tight text-white font-semibold">
                Buddha<span className="text-[#B69A63] italic font-normal">Home</span>
              </span>
            </Link>
            <p className="text-sm text-[#E8E3D9]/80 leading-relaxed max-w-sm font-sans">
              Thoughtfully handcrafted wooden serveware, standing pedestal bowls, and natural stone accessories for mindful living spaces. Celebrating raw textures and honest craftsmanship.
            </p>
            <div className="pt-2">
              <p className="text-xs text-[#B69A63] uppercase tracking-wider font-semibold">
                Direct Artisan Commissions
              </p>
              <p className="text-xs text-[#E8E3D9]/70 mt-1">
                Custom dimensions and bespoke wood species available upon request.
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-semibold tracking-[0.2em] text-[#B69A63] uppercase mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-white transition-colors">
                  Portfolio Gallery
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  About BuddhaHome
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Studio Contact & Orders
                </Link>
              </li>
              <li className="pt-2">
                <Link to="/admin" className="inline-flex items-center gap-1.5 text-xs text-[#B69A63] hover:text-white transition-colors">
                  <Lock className="w-3 h-3" />
                  <span>Studio Admin Panel</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-xs font-semibold tracking-[0.2em] text-[#B69A63] uppercase mb-4">
              Collections
            </h4>
            <ul className="space-y-2.5 text-sm">
              {categories.map((cat) => (
                <li key={cat.id}>
                  <Link
                    to={`/categories/${cat.slug}`}
                    className="hover:text-white transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-xs font-semibold tracking-[0.2em] text-[#B69A63] uppercase mb-4">
              Connect
            </h4>
            <div className="space-y-2.5 text-sm text-[#E8E3D9]/90">
              {siteConfig.contactPhone && (
                <div>
                  <span className="block text-[11px] text-[#E8E3D9]/60 uppercase">Phone</span>
                  <a href={`tel:${siteConfig.contactPhone.replace(/[^0-9+]/g, '')}`} className="hover:text-white">
                    {siteConfig.contactPhone}
                  </a>
                </div>
              )}
              {siteConfig.contactEmail && (
                <div>
                  <span className="block text-[11px] text-[#E8E3D9]/60 uppercase">Email</span>
                  <a href={`mailto:${siteConfig.contactEmail}`} className="hover:text-white">
                    {siteConfig.contactEmail}
                  </a>
                </div>
              )}
              {siteConfig.whatsappNumber && (
                <div className="pt-1">
                  <a
                    href={`https://wa.me/${siteConfig.whatsappNumber.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-[#B69A63] hover:underline font-medium"
                  >
                    <span>Enquire via WhatsApp</span>
                    <span>→</span>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="py-6 border-t border-[#3B281B] text-xs text-[#E8E3D9]/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {currentYear} BuddhaHome. All rights reserved. Handcrafted wooden & stone creations.</p>
          <p className="text-[11px]">Minimalist portfolio showcase for bespoke commissions.</p>
        </div>
      </Container>
    </footer>
  );
}
