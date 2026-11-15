import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, MessageCircle, ArrowRight, TreePine } from 'lucide-react';
import { getWhatsAppEnquiryUrl } from '../../config/site';

export default function ProductCard({ product, className = '' }) {
  const [imageError, setImageError] = useState(false);
  const primaryImage = product?.images?.[0];
  const whatsAppUrl = getWhatsAppEnquiryUrl(product.name);

  return (
    <article className={`group flex flex-col h-full bg-white rounded-xl overflow-hidden border border-[#E8E3D9] hover:border-[#B69A63]/60 transition-all duration-300 hover:shadow-lg ${className}`}>
      {/* Image Container with Consistent Aspect Ratio */}
      <Link
        to={`/products/${product.slug}`}
        className="relative block aspect-4/5 overflow-hidden bg-[#E8E3D9]/40 focus:outline-none"
        tabIndex={-1}
        aria-hidden="true"
      >
        {!imageError && primaryImage ? (
          <img
            src={primaryImage}
            alt={product.name}
            loading="lazy"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-[#E8E3D9]/50 text-[#777166]">
            <TreePine className="w-10 h-10 mb-2 text-[#76501F]/60" />
            <span className="text-xs font-serif italic text-[#76501F]">BuddhaHome Artistry</span>
            <span className="text-[11px] text-[#777166] mt-1">{product.name}</span>
          </div>
        )}

        {/* Badges: New Arrival or Featured */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none">
          {product.isNewArrival && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-semibold tracking-wider uppercase bg-[#281A10] text-[#F7F5F0] rounded-xs shadow-xs">
              <Sparkles className="w-2.5 h-2.5 text-[#B69A63]" />
              New Turning
            </span>
          )}
          {!product.isNewArrival && product.featured && (
            <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase bg-[#B69A63] text-[#281A10] rounded-xs">
              Portfolio Highlight
            </span>
          )}
        </div>

        {/* Category Tag pill overlay on image bottom-left */}
        {product.category && (
          <div className="absolute bottom-2.5 left-3 pointer-events-none">
            <span className="text-[10px] font-medium tracking-wider uppercase bg-[#F7F5F0]/90 backdrop-blur-xs text-[#76501F] px-2 py-0.5 rounded-xs">
              {product.category}
            </span>
          </div>
        )}
      </Link>

      {/* Product Details Section - Clean Portfolio presentation without pricing */}
      <div className="px-4 sm:px-5 pb-4 sm:pb-5 flex flex-col flex-1 justify-between bg-white">
        {/* <div>
          <h3 className="font-serif text-lg sm:text-xl text-[#29251F] group-hover:text-[#76501F] transition-colors leading-snug">
            <Link
              to={`/products/${product.slug}`}
              className="focus-visible:outline-2 rounded-xs"
            >
              {product.name}
            </Link>
          </h3>

          {product.description && (
            <p className="mt-1.5 text-xs text-[#777166] line-clamp-2 leading-relaxed">
              {product.description}
            </p>
          )}
        </div> */}

        {/* Direct Action Bar: Details & WhatsApp Quote */}
        <div className="mt-4 pt-3 border-t border-[#E8E3D9]/60 flex items-center justify-between">
          <Link
            to={`/products/${product.slug}`}
            className="text-xs font-semibold tracking-wider uppercase text-[#76501F] hover:text-[#281A10] transition-colors inline-flex items-center gap-1"
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>

          <a
            href={whatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="Enquire on WhatsApp"
            className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium bg-[#F7F5F0] hover:bg-[#76501F] text-[#76501F] hover:text-white rounded-sm border border-[#E8E3D9] transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Enquire</span>
          </a>
        </div>
      </div>
    </article>
  );
}
