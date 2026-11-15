import React, { useState } from 'react';
import { TreePine } from 'lucide-react';

export default function ProductGallery({ images = [], productName = 'Product' }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [imageErrors, setImageErrors] = useState({});

  const handleImageError = (index) => {
    setImageErrors((prev) => ({ ...prev, [index]: true }));
  };

  const activeImage = images[selectedIndex] || images[0];
  const isCurrentError = imageErrors[selectedIndex];

  return (
    <div className="flex flex-col gap-3.5 max-w-[440px] mx-auto lg:mx-0">
      {/* Main Image Display - Proportionately sized to match right text height */}
      <div className="relative aspect-square w-full bg-[#E8E3D9]/40 rounded-2xl overflow-hidden border border-[#E8E3D9] shadow-xs">
        {!isCurrentError && activeImage ? (
          <img
            src={activeImage}
            alt={`${productName} view ${selectedIndex + 1}`}
            className="w-full h-full object-cover object-center transition-all duration-300"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-[#E8E3D9]/50">
            <TreePine className="w-14 h-14 text-[#76501F]/50 mb-2" />
            <p className="font-serif text-base text-[#76501F]">BuddhaHome Artistry</p>
            <p className="text-xs text-[#777166] mt-1">{productName}</p>
          </div>
        )}
      </div>

      {/* Thumbnail Strip (if more than 1 image) */}
      {images.length > 1 && (
        <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar pb-1">
          {images.map((img, idx) => {
            const isSelected = idx === selectedIndex;
            const hasError = imageErrors[idx];

            return (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedIndex(idx)}
                className={`relative w-14 h-14 shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                  isSelected
                    ? 'border-[#76501F] ring-2 ring-[#76501F]/20 scale-102'
                    : 'border-[#E8E3D9] opacity-70 hover:opacity-100 hover:border-[#B69A63]'
                }`}
                aria-label={`View ${productName} image ${idx + 1}`}
              >
                {!hasError ? (
                  <img
                    src={img}
                    alt={`${productName} thumbnail ${idx + 1}`}
                    onError={() => handleImageError(idx)}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-[#E8E3D9]/60">
                    <TreePine className="w-5 h-5 text-[#76501F]/50" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
