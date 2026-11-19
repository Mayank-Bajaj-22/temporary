// import React, { useState } from 'react';
// import { TreePine } from 'lucide-react';

// export default function ProductGallery({ images = [], productName = 'Product' }) {
//   const [selectedIndex, setSelectedIndex] = useState(0);
//   const [imageErrors, setImageErrors] = useState({});

//   const handleImageError = (index) => {
//     setImageErrors((prev) => ({ ...prev, [index]: true }));
//   };

//   const activeImage = images[selectedIndex] || images[0];
//   const isCurrentError = imageErrors[selectedIndex];

//   return (
//     <div className="flex flex-col gap-3.5 max-w-[440px] mx-auto lg:mx-0">
//       {/* Main Image Display - Proportionately sized to match right text height */}
//       <div className="relative aspect-square w-full bg-[#E8E3D9]/40 rounded-2xl overflow-hidden border border-[#E8E3D9] shadow-xs">
//         {!isCurrentError && activeImage ? (
//           <img
//             src={activeImage}
//             alt={`${productName} view ${selectedIndex + 1}`}
//             className="w-full h-full object-cover object-center transition-all duration-300"
//           />
//         ) : (
//           <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-[#E8E3D9]/50">
//             <TreePine className="w-14 h-14 text-[#76501F]/50 mb-2" />
//             <p className="font-serif text-base text-[#76501F]">BuddhaHome Artistry</p>
//             <p className="text-xs text-[#777166] mt-1">{productName}</p>
//           </div>
//         )}
//       </div>

//       {/* Thumbnail Strip (if more than 1 image) */}
//       {images.length > 1 && (
//         <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar pb-1">
//           {images.map((img, idx) => {
//             const isSelected = idx === selectedIndex;
//             const hasError = imageErrors[idx];

//             return (
//               <button
//                 key={idx}
//                 type="button"
//                 onClick={() => setSelectedIndex(idx)}
//                 className={`relative w-14 h-14 shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
//                   isSelected
//                     ? 'border-[#76501F] ring-2 ring-[#76501F]/20 scale-102'
//                     : 'border-[#E8E3D9] opacity-70 hover:opacity-100 hover:border-[#B69A63]'
//                 }`}
//                 aria-label={`View ${productName} image ${idx + 1}`}
//               >
//                 {!hasError ? (
//                   <img
//                     src={img}
//                     alt={`${productName} thumbnail ${idx + 1}`}
//                     onError={() => handleImageError(idx)}
//                     className="w-full h-full object-cover"
//                   />
//                 ) : (
//                   <div className="w-full h-full flex items-center justify-center bg-[#E8E3D9]/60">
//                     <TreePine className="w-5 h-5 text-[#76501F]/50" />
//                   </div>
//                 )}
//               </button>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// }


import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  TreePine,
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Maximize2,
} from "lucide-react";
import { createPortal } from 'react-dom';

export default function ProductGallery({
  images = [],
  productName = "Product",
}) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [imageErrors, setImageErrors] = useState({});
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  const validImages = images.filter(Boolean);
  const activeImage = validImages[selectedIndex] || validImages[0];

  const isCurrentError = imageErrors[selectedIndex];

  const handleImageError = (index) => {
    setImageErrors((prev) => ({ ...prev, [index]: true }));
  };

  const goToNext = () => {
    if (validImages.length <= 1) return;
    setSelectedIndex((prev) => (prev + 1) % validImages.length);
    setIsZoomed(false);
  };

  const goToPrevious = () => {
    if (validImages.length <= 1) return;
    setSelectedIndex(
      (prev) => (prev - 1 + validImages.length) % validImages.length
    );
    setIsZoomed(false);
  };

  const closeFullscreen = () => {
    setIsFullscreen(false);
    setIsZoomed(false);
  };

  // Keyboard navigation
  useEffect(() => {
    if (!isFullscreen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") closeFullscreen();
      if (e.key === "ArrowRight") goToNext();
      if (e.key === "ArrowLeft") goToPrevious();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isFullscreen, validImages.length]);

  // Prevent background scrolling in fullscreen
  useEffect(() => {
    if (!isFullscreen) return;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isFullscreen]);

  // Reset selected image when product changes
  useEffect(() => {
    setSelectedIndex(0);
    setIsZoomed(false);
    setIsFullscreen(false);
    setImageErrors({});
  }, [productName]);

  return (
    <>
      <div className="flex flex-col gap-3.5 max-w-[440px] mx-auto lg:mx-0 w-full">

        {/* Main Image */}
        <div className="relative aspect-square w-full bg-[#E8E3D9]/40 rounded-2xl overflow-hidden border border-[#E8E3D9] shadow-sm group">

          {!isCurrentError && activeImage ? (
            <>
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImage}
                  src={activeImage}
                  alt={`${productName} view ${selectedIndex + 1}`}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{
                    duration: 0.45,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="absolute inset-0 w-full h-full object-cover object-center"
                  onError={() => handleImageError(selectedIndex)}
                />
              </AnimatePresence>

              {/* Open Fullscreen */}
              <button
                type="button"
                onClick={() => setIsFullscreen(true)}
                className="absolute bottom-4 right-4 z-10 w-11 h-11 rounded-full bg-[#F7F5F0]/95 text-[#281A10] shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-[#281A10] hover:text-white"
                aria-label="Open fullscreen gallery"
              >
                <Maximize2 className="w-4 h-4" />
              </button>

              {/* Image Counter */}
              {validImages.length > 1 && (
                <div className="absolute bottom-4 left-4 px-3 py-1.5 rounded-full bg-[#281A10]/75 text-white text-[11px] tracking-wider backdrop-blur-sm">
                  {selectedIndex + 1} / {validImages.length}
                </div>
              )}
            </>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-[#E8E3D9]/50">
              <TreePine className="w-14 h-14 text-[#76501F]/50 mb-2" />
              <p className="font-serif text-base text-[#76501F]">
                BuddhaHome Artistry
              </p>
              <p className="text-xs text-[#777166] mt-1">
                {productName}
              </p>
            </div>
          )}
        </div>

        {/* Thumbnail Strip */}
        {validImages.length > 1 && (
          <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar pb-1">
            {validImages.map((img, idx) => {
              const isSelected = idx === selectedIndex;
              const hasError = imageErrors[idx];

              return (
                <button
                  key={`${img}-${idx}`}
                  type="button"
                  onClick={() => {
                    setSelectedIndex(idx);
                    setIsZoomed(false);
                  }}
                  className={`relative w-16 h-16 sm:w-[72px] sm:h-[72px] shrink-0 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                    isSelected
                      ? "border-[#76501F] ring-2 ring-[#76501F]/20 opacity-100"
                      : "border-[#E8E3D9] opacity-60 hover:opacity-100 hover:border-[#B69A63]"
                  }`}
                  aria-label={`View ${productName} image ${idx + 1}`}
                  aria-pressed={isSelected}
                >
                  {!hasError ? (
                    <img
                      src={img}
                      alt={`${productName} thumbnail ${idx + 1}`}
                      loading="lazy"
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

        <p className="text-[10px] tracking-[0.16em] uppercase text-[#777166]">
          Click image to explore in full screen
        </p>
      </div>

      
      {/* Fullscreen Gallery - Rendered through React Portal */}
      {createPortal(
        <AnimatePresence>
          {isFullscreen && activeImage && !isCurrentError && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[99999] bg-[#17120E]/95 backdrop-blur-md flex flex-col"
              role="dialog"
              aria-modal="true"
              aria-label={`${productName} image gallery`}
            >
              {/* Top Bar */}
              <div className="relative z-[100000] flex items-center justify-between px-5 sm:px-8 py-4 border-b border-white/10 bg-[#17120E]">

                <div>
                  <p className="text-white font-serif text-lg">
                    {productName}
                  </p>
                  <p className="text-white/50 text-[10px] tracking-[0.2em] uppercase mt-1">
                    BuddhaHome Collection
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-white/70 text-xs tabular-nums">
                    {selectedIndex + 1} / {validImages.length}
                  </span>

                  {/* Zoom Button */}
                  <button
                    type="button"
                    onClick={() => setIsZoomed((prev) => !prev)}
                    className="w-10 h-10 flex items-center justify-center rounded-full text-white hover:bg-white/10 transition-colors"
                    aria-label={isZoomed ? "Zoom out" : "Zoom in"}
                  >
                    {isZoomed ? (
                      <ZoomOut className="w-5 h-5" />
                    ) : (
                      <ZoomIn className="w-5 h-5" />
                    )}
                  </button>

                  {/* Close Button */}
                  <button
                    type="button"
                    onClick={closeFullscreen}
                    className="w-11 h-11 flex items-center justify-center rounded-full border border-white/20 bg-white/10 text-white hover:bg-white hover:text-[#281A10] transition-all duration-300"
                    aria-label="Close gallery"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Main Fullscreen Image */}
              <div className="relative flex-1 min-h-0 flex items-center justify-center px-12 sm:px-20 py-5">

                {validImages.length > 1 && (
                  <button
                    type="button"
                    onClick={goToPrevious}
                    className="absolute left-2 sm:left-8 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/20 text-white flex items-center justify-center hover:bg-white hover:text-[#281A10] transition-all"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                )}

                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeImage}
                    src={activeImage}
                    alt={`${productName} view ${selectedIndex + 1}`}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{
                      opacity: 1,
                      scale: isZoomed ? 1.8 : 1,
                    }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{
                      duration: 0.4,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    onClick={() => setIsZoomed((prev) => !prev)}
                    className={`max-w-full max-h-full object-contain cursor-zoom-in ${
                      isZoomed ? "cursor-zoom-out" : ""
                    }`}
                    style={{ transformOrigin: "center center" }}
                  />
                </AnimatePresence>

                {validImages.length > 1 && (
                  <button
                    type="button"
                    onClick={goToNext}
                    className="absolute right-2 sm:right-8 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/20 text-white flex items-center justify-center hover:bg-white hover:text-[#281A10] transition-all"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                )}
              </div>

              {/* Fullscreen Thumbnails */}
              {validImages.length > 1 && (
                <div className="flex justify-center gap-2 sm:gap-3 px-4 py-4 overflow-x-auto no-scrollbar border-t border-white/10">
                  {validImages.map((img, idx) => (
                    <button
                      key={`${img}-${idx}`}
                      type="button"
                      onClick={() => {
                        setSelectedIndex(idx);
                        setIsZoomed(false);
                      }}
                      className={`w-12 h-12 sm:w-14 sm:h-14 shrink-0 rounded-md overflow-hidden border-2 transition-all ${
                        idx === selectedIndex
                          ? "border-[#B69A63] opacity-100"
                          : "border-transparent opacity-40 hover:opacity-100"
                      }`}
                      aria-label={`Select image ${idx + 1}`}
                    >
                      <img
                        src={img}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
