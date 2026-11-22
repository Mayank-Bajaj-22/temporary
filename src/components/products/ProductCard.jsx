import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Sparkles,
  MessageCircle,
  ArrowRight,
  ArrowUpRight,
  TreePine,
} from "lucide-react";
import { getWhatsAppEnquiryUrl } from "../../config/site";

export default function ProductCard({ product, className = "" }) {
  const [imageError, setImageError] = useState(false);

  const primaryImage = product?.images?.[0];
  const secondaryImage = product?.images?.[1];

  const whatsAppUrl = getWhatsAppEnquiryUrl(product.name);

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{
        once: true,
        amount: 0.15,
        margin: "0px 0px -50px 0px",
      }}
      transition={{
        duration: 1.5,
        delay: (product.animationIndex ?? 0) * 0.25,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`group flex flex-col h-full bg-white rounded-xl overflow-hidden border border-[#E8E3D9] hover:border-[#B69A63]/60 transition-all duration-500 hover:shadow-xl ${className}`}
    >
      {/* Image Container */}
      <Link
        to={`/products/${product.slug}`}
        className="relative block aspect-square overflow-hidden bg-white focus:outline-none"
        aria-label={`View ${product.name}`}
      >
        {!imageError && primaryImage ? (
          <>
            {/* Main Image */}
            <img
              src={primaryImage}
              alt={product.name}
              loading="lazy"
              onError={() => setImageError(true)}
              className="absolute inset-0 w-full h-full object-contain object-center p-2 transition-transform duration-700 ease-[0.22,1,0.36,1] group-hover:scale-[1.03]"
            />

            {/* Secondary Image Reveal */}
            {secondaryImage && (
              <img
                src={secondaryImage}
                alt={`${product.name} alternate view`}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-contain object-center p-2 opacity-0 transition-opacity duration-700 ease-in-out group-hover:opacity-100"
              />
            )}

            {/* Premium Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#281A10]/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

            {/* View Product Button */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="w-12 h-12 rounded-full bg-[#F7F5F0]/95 text-[#281A10] flex items-center justify-center scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500 ease-[0.22,1,0.36,1] shadow-lg">
                <ArrowUpRight className="w-5 h-5" />
              </span>
            </div>
          </>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-[#E8E3D9]/50 text-[#777166]">
            <TreePine className="w-10 h-10 mb-2 text-[#76501F]/60" />
            <span className="text-xs font-serif italic text-[#76501F]">
              BuddhaHome Artistry
            </span>
            <span className="text-[11px] text-[#777166] mt-1">
              {product.name}
            </span>
          </div>
        )}

        {/* Product Badges */}
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

        {/* Category Tag */}
        {product.category && (
          <div className="absolute bottom-3 left-3 pointer-events-none">
            <span className="text-[10px] font-medium tracking-wider uppercase bg-[#F7F5F0]/90 backdrop-blur-sm text-[#76501F] px-3 py-1.5 rounded-sm">
              {product.category}
            </span>
          </div>
        )}
      </Link>

      {/* Product Details */}
      <div className="px-4 sm:px-5 pb-4 sm:pb-5 flex flex-col flex-1 justify-between bg-white">
        <div className="mt-4 pt-3 border-t border-[#E8E3D9]/60 flex items-center justify-between">
          <Link
            to={`/products/${product.slug}`}
            className="group/details text-xs font-semibold tracking-wider uppercase text-[#76501F] hover:text-[#281A10] transition-colors inline-flex items-center gap-1"
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/details:translate-x-1" />
          </Link>

          <a
            href={whatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="Enquire on WhatsApp"
            className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium bg-[#F7F5F0] hover:bg-[#76501F] text-[#76501F] hover:text-white rounded-sm border border-[#E8E3D9] transition-colors duration-300"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Enquire</span>
          </a>
        </div>
      </div>
    </motion.article>
  );
}
