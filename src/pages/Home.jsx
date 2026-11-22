// import React, { useState, useEffect } from "react";
// import { AnimatePresence, motion } from "framer-motion";
// import { Link } from "react-router-dom";
// import {
//   ArrowRight,
//   Trees,
//   Hammer,
//   Sparkles,
//   ArrowUpRight,
//   ChevronRight,
// } from "lucide-react";

// import Container from "../components/ui/Container";
// import Button from "../components/ui/Button";
// import ProductCard from "../components/products/ProductCard";
// import { useProducts } from "../context/ProductContext";
// import { categories } from "../data/categories";

// export default function Home() {
//   const { products } = useProducts();

//   // Hero slideshow
//   const [heroIndex, setHeroIndex] = useState(0);

//   const heroImages = products
//     .filter((product) => product.available !== false)
//     .flatMap((product) =>
//       (product.images || []).filter(Boolean).map((src) => ({
//         src,
//         alt: product.name || "BuddhaHome Collection",
//       })),
//     );

//   // Alternate between 2-image and 3-image layouts
//   const heroSlides = [];
//   let imageIndex = 0;
//   let layoutIndex = 0;

//   while (imageIndex < heroImages.length) {
//     const count = layoutIndex % 2 === 0 ? 2 : 3;

//     const images = heroImages.slice(imageIndex, imageIndex + count);

//     imageIndex += count;

//     if (images.length === 1 && heroImages.length > 1) {
//       images.push(heroImages[0]);
//     }

//     if (images.length > 0) {
//       heroSlides.push(images);
//     }

//     layoutIndex++;
//   }

//   const activeHeroSlide = heroSlides.length
//     ? heroSlides[heroIndex % heroSlides.length]
//     : [];

//   // Automatic slideshow
//   useEffect(() => {
//     if (heroSlides.length <= 1) return;

//     const interval = setInterval(() => {
//       setHeroIndex((current) => (current + 1) % heroSlides.length);
//     }, 9000);

//     return () => clearInterval(interval);
//   }, [heroSlides.length]);

//   // Group products by category
//   const productsByCategory = categories.reduce((acc, cat) => {
//     acc[cat.slug] = products
//       .filter((p) => p.categorySlug === cat.slug && p.available !== false)
//       .slice(0, 4);

//     return acc;
//   }, {});

//   return (
//     <div className="pb-20">
//       {/* HERO SLIDESHOW */}
//       <section className="relative w-full h-[60vh] min-h-[420px] max-h-[760px] overflow-hidden bg-[#281A10]">
//         {activeHeroSlide.length > 0 && (
//           <AnimatePresence mode="wait">
//             <motion.div
//               key={heroIndex}
//               className="absolute inset-0 grid h-full w-full grid-cols-1 sm:[grid-template-columns:var(--hero-columns)]"
//               style={{
//                 "--hero-columns": `repeat(${activeHeroSlide.length}, minmax(0, 1fr))`,
//               }}
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               transition={{ duration: 1 }}
//             >
//               {activeHeroSlide.map((item, index) => (
//                 <motion.div
//                   key={`${heroIndex}-${index}`}
//                   className={`relative h-full min-w-0 overflow-hidden ${
//                     activeHeroSlide.length === 3 ? "bg-[#E8E3D9]" : ""
//                   } ${index === 0 ? "" : "hidden sm:block"}`}
//                   initial={{ scale: 1.06 }}
//                   animate={{ scale: 1 }}
//                   transition={{
//                     duration: 1.4,
//                     ease: "easeOut",
//                   }}
//                 >
//                   <img
//                     src={item.src}
//                     alt={item.alt}
//                     className={`w-full h-full ${
//                       activeHeroSlide.length === 3
//                         ? "object-contain p-1"
//                         : "object-cover"
//                     }`}
//                   />
//                 </motion.div>
//               ))}
//             </motion.div>
//           </AnimatePresence>
//         )}

//         {/* Image overlay */}
//         <div className="absolute inset-0 bg-black/15 pointer-events-none" />

//         {/* Explore button */}
//         <Link
//           to="/products"
//           aria-label="Explore Collection"
//           className={`group absolute z-20
//   inline-flex items-center justify-center gap-2 sm:gap-3
//   px-5 sm:px-7 py-3.5
//   rounded-full
//   border border-white/70
//   bg-black/20 backdrop-blur-sm
//   text-white
//   text-[10px] sm:text-xs
//   font-medium tracking-[0.12em] sm:tracking-[0.22em]
//   whitespace-nowrap
//   overflow-hidden
//   transition-all duration-500
//   hover:bg-[#F7F5F0]
//   hover:text-[#281A10]
//   hover:border-[#B69A63]
//   hover:shadow-xl

//   left-1/2 -translate-x-1/2 bottom-[18%]

//   sm:left-1/2 sm:-translate-x-1/2 sm:bottom-[18%]
// `}
//         >
//           <span className="relative inline-block h-[1.5em] whitespace-nowrap shrink-0 overflow-hidden leading-[1.5]">
//             <span className="block transition-transform duration-500 ease-[0.22,1,0.36,1] group-hover:-translate-y-full">
//               EXPLORE COLLECTION
//             </span>

//             <span className="absolute left-0 top-full whitespace-nowrap transition-transform duration-500 ease-[0.22,1,0.36,1] group-hover:-translate-y-full">
//               EXPLORE COLLECTION
//             </span>
//           </span>

//           <ArrowUpRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
//         </Link>
//       </section>

//       {/* PER-CATEGORY PRODUCT SECTIONS */}
//       {categories.map((category) => {
//         const categoryProducts = productsByCategory[category.slug] || [];

//         if (categoryProducts.length === 0) return null;

//         return (
//           <section
//             key={category.slug}
//             className="py-14 sm:py-20 border-b border-[#E8E3D9] last:border-b-0"
//           >
//             <Container>
//               {/* Section Header */}
//               <div className="flex items-end justify-between mb-8 sm:mb-10">
//                 <div>
//                   <h2 className="text-2xl sm:text-3xl lg:text-4xl font-sans font-semibold tracking-normal text-[#29251F] lowercase">
//                     {category.name}
//                   </h2>

//                   <p className="mt-1.5 text-sm text-[#777166] max-w-lg leading-relaxed hidden sm:block">
//                     {category.description}
//                   </p>
//                 </div>

//                 <Link
//                   to={`/categories/${category.slug}`}
//                   className="group hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold tracking-[0.15em] uppercase text-[#76501F] hover:text-[#281A10] transition-colors border-b border-[#76501F]/40 hover:border-[#281A10] pb-0.5 shrink-0 ml-6"
//                 >
//                   <span className="relative inline-block h-[1.5em] overflow-hidden leading-[1.5]">
//                     <span className="block transition-transform duration-500 ease-[0.22,1,0.36,1] group-hover:-translate-y-full">
//                       View All
//                     </span>

//                     <span className="absolute left-0 top-full whitespace-nowrap transition-transform duration-500 ease-[0.22,1,0.36,1] group-hover:-translate-y-full">
//                       View All
//                     </span>
//                   </span>

//                   <ChevronRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
//                 </Link>
//               </div>

//               {/* Products Grid */}
//               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
//                 {categoryProducts.map((product, index) => (
//                   <ProductCard
//                     key={product.id || product.slug}
//                     product={{
//                       ...product,
//                       animationIndex: index,
//                     }}
//                   />
//                 ))}
//               </div>

//               {/* View All Button */}
//               <div className="mt-10 text-center">
//                 <Link
//                   to={`/categories/${category.slug}`}
//                   className="group inline-flex items-center justify-center gap-2 px-10 py-3 bg-[#281A10] text-[#F7F5F0] text-xs font-semibold tracking-[0.2em] uppercase hover:bg-[#76501F] transition-colors duration-300 rounded-sm"
//                 >
//                   <span className="relative inline-block h-[1.5em] overflow-hidden leading-[1.5]">
//                     <span className="block transition-transform duration-500 ease-[0.22,1,0.36,1] group-hover:-translate-y-full">
//                       View All
//                     </span>

//                     <span className="absolute left-0 top-full whitespace-nowrap transition-transform duration-500 ease-[0.22,1,0.36,1] group-hover:-translate-y-full">
//                       View All
//                     </span>
//                   </span>

//                   <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
//                 </Link>
//               </div>
//             </Container>
//           </section>
//         );
//       })}

//       {/* BRAND STORY SECTION */}
//       <section className="bg-[#281A10] text-[#F7F5F0] overflow-hidden">
//         <div className="grid grid-cols-1 lg:grid-cols-2">
//           {/* LEFT — BRAND IMAGE */}
//           <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[560px] overflow-hidden">
//             <motion.img
//               src="/images/buddhahome/rustic-wooden-stand-tray.png"
//               alt="BuddhaHome handcrafted wooden products"
//               loading="lazy"
//               className="absolute inset-0 w-full h-full object-cover object-center"
//               initial={{ scale: 1.08 }}
//               whileInView={{ scale: 1 }}
//               viewport={{ once: true, amount: 0.2 }}
//               transition={{
//                 duration: 1.6,
//                 ease: [0.22, 1, 0.36, 1],
//               }}
//             />

//             {/* Mobile image overlay */}
//             <div className="absolute inset-0 bg-gradient-to-t from-[#281A10]/60 via-transparent to-transparent lg:hidden" />
//           </div>

//           {/* RIGHT — BRAND CONTENT */}
//           <motion.div
//             className="flex flex-col justify-center p-8 sm:p-12 lg:p-16 xl:p-20 space-y-7"
//             initial={{ opacity: 0, x: 40 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: false, amount: 0.2 }}
//             transition={{
//               duration: 1,
//               delay: 0.35,
//               ease: [0.22, 1, 0.36, 1],
//             }}
//           >
//             {/* Small Label */}
//             <div className="flex items-center gap-3">
//               <span className="w-8 h-[1px] bg-[#B69A63]" />
//               <span className="text-[#B69A63] text-xs tracking-[0.25em] uppercase">
//                 Our Story
//               </span>
//             </div>

//             {/* Heading */}
//             <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl leading-[1.2] font-medium">
//               The Beauty of
//               <br />
//               <span className="text-[#B69A63] italic">Handmade Living</span>
//             </h2>

//             {/* Description */}
//             <p className="text-[#D5CCBF] text-sm sm:text-base leading-8 max-w-xl">
//               At BuddhaHome, we believe that the beauty of a home lies in the
//               little details. Every creation reflects the warmth of natural
//               materials, the skill of thoughtful craftsmanship, and the charm of
//               timeless design.
//             </p>

//             <p className="text-[#D5CCBF] text-sm sm:text-base leading-8 max-w-xl">
//               From handcrafted wooden pieces to thoughtfully curated home
//               accessories, each product brings a sense of warmth, character, and
//               individuality to your space.
//             </p>

//             {/* Decorative Divider */}
//             <div className="w-16 h-[1px] bg-[#B69A63]/70" />

//             {/* Explore Button */}
//             <Link
//               to="/about"
//               className="group inline-flex items-center gap-4 w-fit text-[#F7F5F0] text-xs tracking-[0.18em] uppercase"
//             >
//               <span className="relative pb-2">
//                 Discover Our Story
//                 <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#B69A63] origin-left transition-transform duration-500 group-hover:scale-x-0" />
//               </span>

//               <span className="w-9 h-9 rounded-full border border-[#B69A63]/60 flex items-center justify-center transition-all duration-500 group-hover:bg-[#B69A63] group-hover:text-[#281A10] group-hover:translate-x-1">
//                 <ArrowRight size={15} />
//               </span>
//             </Link>
//           </motion.div>
//         </div>
//       </section>

//       {/* CRAFTSMANSHIP VALUES */}
//       <section className="relative py-16 sm:py-20 border-b border-[#E8E3D9] overflow-hidden bg-gradient-to-b from-[#FFFFFF] via-[#FAF8F3] to-[#F7F5F0]">
//         <Container>
//           {/* Section Heading */}
//           <motion.div
//             className="text-center max-w-xl mx-auto mb-12 sm:mb-14"
//             initial={{ opacity: 0, y: 25 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true, amount: 0.4 }}
//             transition={{
//               duration: 0.8,
//               ease: [0.22, 1, 0.36, 1],
//             }}
//           >
//             <span className="text-xs font-semibold tracking-[0.2em] text-[#76501F] uppercase">
//               The BuddhaHome Standard
//             </span>

//             <h2 className="text-2xl sm:text-3xl font-serif text-[#29251F] mt-3 leading-snug">
//               Built on Reverence for Raw Wood & Stone
//             </h2>

//             <p className="mt-3 text-sm text-[#777166] leading-relaxed">
//               Thoughtful craftsmanship, natural materials and timeless quality
//               in every creation.
//             </p>
//           </motion.div>

//           {/* Cards Container */}
//           <motion.div
//             className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8"
//             variants={{
//               hidden: {},
//               visible: {
//                 transition: {
//                   staggerChildren: 0.18,
//                 },
//               },
//             }}
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true, amount: 0.2 }}
//           >
//             {/* CARD 1 */}
//             <motion.div
//               variants={{
//                 hidden: { opacity: 0, y: 35 },
//                 visible: {
//                   opacity: 1,
//                   y: 0,
//                   transition: {
//                     duration: 0.75,
//                     ease: [0.22, 1, 0.36, 1],
//                   },
//                 },
//               }}
//               whileHover={{
//                 y: -7,
//                 transition: { duration: 0.35, ease: "easeOut" },
//               }}
//               className="group relative p-8 sm:p-9 rounded-2xl bg-white/80 border border-[#E8E3D9] text-center space-y-5 shadow-sm hover:border-[#B69A63] hover:shadow-[0_18px_45px_rgba(40,26,16,0.08)] transition-[border-color,box-shadow] duration-500"
//             >
//               {/* Icon Circle */}
//               <motion.div
//                 whileHover={{
//                   scale: 1.08,
//                   rotate: -5,
//                   borderColor: "#B69A63",
//                   boxShadow: "0 0 0 5px rgba(182,154,99,0.10)",
//                 }}
//                 transition={{ duration: 0.4, ease: "easeOut" }}
//                 className="w-16 h-16 mx-auto rounded-full bg-[#F7F5F0] border border-[#E8E3D9] flex items-center justify-center text-[#76501F] transition-colors duration-500"
//               >
//                 <Hammer className="w-6 h-6 stroke-[1.5]" />
//               </motion.div>

//               <h3 className="font-serif text-xl text-[#29251F]">
//                 Thoughtfully Handcrafted
//               </h3>

//               <p className="text-sm text-[#777166] leading-relaxed">
//                 Every joint, bevel, and contour is hand-shaped by artisans who
//                 respect traditional joinery methods that endure through
//                 generations.
//               </p>

//               {/* Subtle Bottom Accent */}
//               <div className="w-8 h-[1px] bg-[#B69A63]/60 mx-auto transition-all duration-500 group-hover:w-14" />
//             </motion.div>

//             {/* CARD 2 */}
//             <motion.div
//               variants={{
//                 hidden: { opacity: 0, y: 35 },
//                 visible: {
//                   opacity: 1,
//                   y: 0,
//                   transition: {
//                     duration: 0.75,
//                     ease: [0.22, 1, 0.36, 1],
//                   },
//                 },
//               }}
//               whileHover={{
//                 y: -7,
//                 transition: { duration: 0.35, ease: "easeOut" },
//               }}
//               className="group relative p-8 sm:p-9 rounded-2xl bg-white/80 border border-[#E8E3D9] text-center space-y-5 shadow-sm hover:border-[#B69A63] hover:shadow-[0_18px_45px_rgba(40,26,16,0.08)] transition-[border-color,box-shadow] duration-500"
//             >
//               {/* Icon Circle */}
//               <motion.div
//                 whileHover={{
//                   scale: 1.08,
//                   rotate: 5,
//                   borderColor: "#B69A63",
//                   boxShadow: "0 0 0 5px rgba(182,154,99,0.10)",
//                 }}
//                 transition={{ duration: 0.4, ease: "easeOut" }}
//                 className="w-16 h-16 mx-auto rounded-full bg-[#F7F5F0] border border-[#E8E3D9] flex items-center justify-center text-[#76501F] transition-colors duration-500"
//               >
//                 <Trees className="w-6 h-6 stroke-[1.5]" />
//               </motion.div>

//               <h3 className="font-serif text-xl text-[#29251F]">
//                 Natural Material Character
//               </h3>

//               <p className="text-sm text-[#777166] leading-relaxed">
//                 We celebrate genuine grain irregularities, growth rings, and
//                 honed travertine pockets instead of masking them behind
//                 synthetic coatings.
//               </p>

//               {/* Subtle Bottom Accent */}
//               <div className="w-8 h-[1px] bg-[#B69A63]/60 mx-auto transition-all duration-500 group-hover:w-14" />
//             </motion.div>

//             {/* CARD 3 */}
//             <motion.div
//               variants={{
//                 hidden: { opacity: 0, y: 35 },
//                 visible: {
//                   opacity: 1,
//                   y: 0,
//                   transition: {
//                     duration: 0.75,
//                     ease: [0.22, 1, 0.36, 1],
//                   },
//                 },
//               }}
//               whileHover={{
//                 y: -7,
//                 transition: { duration: 0.35, ease: "easeOut" },
//               }}
//               className="group relative p-8 sm:p-9 rounded-2xl bg-white/80 border border-[#E8E3D9] text-center space-y-5 shadow-sm hover:border-[#B69A63] hover:shadow-[0_18px_45px_rgba(40,26,16,0.08)] transition-[border-color,box-shadow] duration-500"
//             >
//               {/* Icon Circle */}
//               <motion.div
//                 whileHover={{
//                   scale: 1.08,
//                   rotate: -5,
//                   borderColor: "#B69A63",
//                   boxShadow: "0 0 0 5px rgba(182,154,99,0.10)",
//                 }}
//                 transition={{ duration: 0.4, ease: "easeOut" }}
//                 className="w-16 h-16 mx-auto rounded-full bg-[#F7F5F0] border border-[#E8E3D9] flex items-center justify-center text-[#76501F] transition-colors duration-500"
//               >
//                 <Sparkles className="w-6 h-6 stroke-[1.5]" />
//               </motion.div>

//               <h3 className="font-serif text-xl text-[#29251F]">
//                 Food-Safe Organic Finishes
//               </h3>

//               <p className="text-sm text-[#777166] leading-relaxed">
//                 Finished with natural botanical oils and beeswax buffs that
//                 enhance tactile warmth without releasing toxic chemical fumes.
//               </p>

//               {/* Subtle Bottom Accent */}
//               <div className="w-8 h-[1px] bg-[#B69A63]/60 mx-auto transition-all duration-500 group-hover:w-14" />
//             </motion.div>
//           </motion.div>
//         </Container>
//       </section>

//       {/* BESPOKE ENQUIRY — EDITORIAL CTA */}
//       <section className="relative py-16 sm:py-20 overflow-hidden">
//         <Container>
//           {/* Main CTA Wrapper */}
//           <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-[#B69A63]/25 bg-gradient-to-br from-[#F7F5F0] via-[#F3EEDF] to-[#EFEAD8]">
//             {/* Subtle Background Decoration */}
//             <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-[#B69A63]/[0.06] blur-3xl pointer-events-none" />

//             <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-[#76501F]/[0.04] blur-3xl pointer-events-none" />

//             {/* Gold Divider */}
//             <motion.div
//               className="absolute top-0 left-0 h-[2px] bg-[#B69A63]"
//               initial={{ width: "0%" }}
//               whileInView={{ width: "100%" }}
//               viewport={{ once: false }}
//               transition={{
//                 duration: 1.2,
//                 ease: [0.22, 1, 0.36, 1],
//               }}
//             />

//             {/* CTA Content */}
//             <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10 p-8 sm:p-12 lg:p-16">
//               {/* LEFT — EDITORIAL TEXT */}
//               <motion.div
//                 className="max-w-2xl space-y-4 text-center md:text-left"
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true, amount: 0.3 }}
//                 transition={{
//                   duration: 0.9,
//                   ease: [0.22, 1, 0.36, 1],
//                 }}
//               >
//                 {/* Eyebrow */}
//                 <div className="flex items-center justify-center md:justify-start gap-3">
//                   <span className="w-7 h-[1px] bg-[#B69A63]" />

//                   <span className="text-[10px] sm:text-xs font-semibold tracking-[0.22em] text-[#76501F] uppercase">
//                     Custom Commissions & Inquiries
//                   </span>
//                 </div>

//                 {/* Heading */}
//                 <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl xl:text-[42px] leading-[1.2] text-[#281A10]">
//                   Have a Specific Dimension or Wood Species in Mind?
//                 </h2>

//                 {/* Description */}
//                 <p className="text-sm sm:text-base text-[#777166] leading-7 max-w-xl mx-auto md:mx-0">
//                   Connect directly with our workshop for bespoke sizing, custom
//                   live-edge platters, or architectural wood and stone
//                   installations.
//                 </p>

//                 {/* Decorative Accent */}
//                 <div className="pt-2 flex justify-center md:justify-start">
//                   <div className="w-12 h-[1px] bg-[#B69A63]/70" />
//                 </div>
//               </motion.div>

//               {/* RIGHT — CONTACT BUTTON */}
//               <motion.div
//                 className="relative shrink-0"
//                 initial={{ opacity: 0, x: 35 }}
//                 whileInView={{ opacity: 1, x: 0 }}
//                 viewport={{ once: true, amount: 0.3 }}
//                 transition={{
//                   duration: 0.9,
//                   delay: 0.2,
//                   ease: [0.22, 1, 0.36, 1],
//                 }}
//               >
//                 <Button
//                   to="/contact"
//                   variant="primary"
//                   size="lg"
//                   className="group"
//                 >
//                   <span className="inline-flex items-center gap-3">
//                     Contact Workshop
//                     <ArrowRight
//                       size={16}
//                       className="transition-transform duration-300 group-hover:translate-x-1"
//                     />
//                   </span>
//                 </Button>
//               </motion.div>
//             </div>
//           </div>
//         </Container>
//       </section>
//     </div>
//   );
// }


import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Trees,
  Hammer,
  Sparkles,
  ArrowUpRight,
  ChevronRight,
} from "lucide-react";

import Container from "../components/ui/Container";
import Button from "../components/ui/Button";
import ProductCard from "../components/products/ProductCard";
import { useProducts } from "../context/ProductContext";
import { categories } from "../data/categories";

export default function Home() {
  const { products } = useProducts();

  // HERO SLIDESHOW
  const [heroIndex, setHeroIndex] = useState(0);

  const heroImages = products
    .filter((product) => product.available !== false)
    .flatMap((product) =>
      (product.images || []).filter(Boolean).map((src) => ({
        src,
        alt: product.name || "BuddhaHome Collection",
      }))
    );

  // Create slides with ONLY 2 images
  const heroSlides = [];

  for (let i = 0; i < heroImages.length; i += 2) {
    const images = heroImages.slice(i, i + 2);

    // Pair the last remaining image with the first image
    if (images.length === 1 && heroImages.length > 0) {
      images.push(heroImages[0]);
    }

    if (images.length > 0) {
      heroSlides.push(images);
    }
  }

  const activeHeroSlide = heroSlides.length
    ? heroSlides[heroIndex % heroSlides.length]
    : [];

  // Automatic slideshow
  useEffect(() => {
    if (heroSlides.length <= 1) return;

    const interval = setInterval(() => {
      setHeroIndex((current) => (current + 1) % heroSlides.length);
    }, 9000);

    return () => clearInterval(interval);
  }, [heroSlides.length]);

  // Group products by category
  const productsByCategory = categories.reduce((acc, cat) => {
    acc[cat.slug] = products
      .filter(
        (p) =>
          p.categorySlug === cat.slug &&
          p.available !== false
      )
      .slice(0, 4);

    return acc;
  }, {});

  return (
    <div className="pb-20">

      {/* HERO SLIDESHOW */}
      <section className="relative w-full h-[60vh] min-h-[420px] max-h-[760px] overflow-hidden bg-[#281A10]">

        {activeHeroSlide.length > 0 && (
          <AnimatePresence mode="wait">
            <motion.div
              key={heroIndex}
              className="absolute inset-0 grid h-full w-full grid-cols-1 sm:grid-cols-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            >
              {activeHeroSlide.map((item, index) => (
                <motion.div
                  key={`${heroIndex}-${index}`}
                  className={`relative h-full min-w-0 overflow-hidden ${
                    index === 0 ? "" : "hidden sm:block"
                  }`}
                  initial={{ scale: 1.06 }}
                  animate={{ scale: 1 }}
                  transition={{
                    duration: 1.4,
                    ease: "easeOut",
                  }}
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}

        {/* Image Overlay */}
        <div className="absolute inset-0 bg-black/15 pointer-events-none" />

        {/* Explore Button */}
        <Link
          to="/products"
          aria-label="Explore Collection"
          className="group absolute z-20
            inline-flex items-center justify-center gap-2 sm:gap-3
            px-5 sm:px-7 py-3.5
            rounded-full
            border border-white/70
            bg-black/20 backdrop-blur-sm
            text-white
            text-[10px] sm:text-xs
            font-medium tracking-[0.12em] sm:tracking-[0.22em]
            whitespace-nowrap
            overflow-hidden
            transition-all duration-500
            hover:bg-[#F7F5F0]
            hover:text-[#281A10]
            hover:border-[#B69A63]
            hover:shadow-xl
            left-1/2 -translate-x-1/2 bottom-[18%]
            sm:left-1/2 sm:-translate-x-1/2 sm:bottom-[18%]"
        >
          <span className="relative inline-block h-[1.5em] whitespace-nowrap shrink-0 overflow-hidden leading-[1.5]">
            <span className="block transition-transform duration-500 ease-[0.22,1,0.36,1] group-hover:-translate-y-full">
              EXPLORE COLLECTION
            </span>

            <span className="absolute left-0 top-full whitespace-nowrap transition-transform duration-500 ease-[0.22,1,0.36,1] group-hover:-translate-y-full">
              EXPLORE COLLECTION
            </span>
          </span>

          <ArrowUpRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
        </Link>
      </section>

      {/* PER-CATEGORY PRODUCT SECTIONS */}
      {categories.map((category) => {
        const categoryProducts =
          productsByCategory[category.slug] || [];

        if (categoryProducts.length === 0) return null;

        return (
          <section
            key={category.slug}
            className="py-14 sm:py-20 border-b border-[#E8E3D9] last:border-b-0"
          >
            <Container>

              {/* Section Header */}
              <div className="flex items-end justify-between mb-8 sm:mb-10">
                <div>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-sans font-semibold tracking-normal text-[#29251F] lowercase">
                    {category.name}
                  </h2>

                  <p className="mt-1.5 text-sm text-[#777166] max-w-lg leading-relaxed hidden sm:block">
                    {category.description}
                  </p>
                </div>

                <Link
                  to={`/categories/${category.slug}`}
                  className="group hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold tracking-[0.15em] uppercase text-[#76501F] hover:text-[#281A10] transition-colors border-b border-[#76501F]/40 hover:border-[#281A10] pb-0.5 shrink-0 ml-6"
                >
                  <span className="relative inline-block h-[1.5em] overflow-hidden leading-[1.5]">
                    <span className="block transition-transform duration-500 ease-[0.22,1,0.36,1] group-hover:-translate-y-full">
                      View All
                    </span>

                    <span className="absolute left-0 top-full whitespace-nowrap transition-transform duration-500 ease-[0.22,1,0.36,1] group-hover:-translate-y-full">
                      View All
                    </span>
                  </span>

                  <ChevronRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>

              {/* Products Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
                {categoryProducts.map((product, index) => (
                  <ProductCard
                    key={product.id || product.slug}
                    product={{
                      ...product,
                      animationIndex: index,
                    }}
                  />
                ))}
              </div>

              {/* View All Button */}
              <div className="mt-10 text-center">
                <Link
                  to={`/categories/${category.slug}`}
                  className="group inline-flex items-center justify-center gap-2 px-10 py-3 bg-[#281A10] text-[#F7F5F0] text-xs font-semibold tracking-[0.2em] uppercase hover:bg-[#76501F] transition-colors duration-300 rounded-sm"
                >
                  <span className="relative inline-block h-[1.5em] overflow-hidden leading-[1.5]">
                    <span className="block transition-transform duration-500 ease-[0.22,1,0.36,1] group-hover:-translate-y-full">
                      View All
                    </span>

                    <span className="absolute left-0 top-full whitespace-nowrap transition-transform duration-500 ease-[0.22,1,0.36,1] group-hover:-translate-y-full">
                      View All
                    </span>
                  </span>

                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>

            </Container>
          </section>
        );
      })}

      {/* BRAND STORY SECTION */}
      <section className="bg-[#281A10] text-[#F7F5F0] overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2">

          {/* LEFT — BRAND IMAGE */}
          <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[560px] overflow-hidden">
            <motion.img
              src="/images/buddhahome/rustic-wooden-stand-tray.png"
              alt="BuddhaHome handcrafted wooden products"
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover object-center"
              initial={{ scale: 1.08 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 1.6,
                ease: [0.22, 1, 0.36, 1],
              }}
            />

            {/* Mobile Image Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#281A10]/60 via-transparent to-transparent lg:hidden" />
          </div>

          {/* RIGHT — BRAND CONTENT */}
          <motion.div
            className="flex flex-col justify-center p-8 sm:p-12 lg:p-16 xl:p-20 space-y-7"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{
              duration: 1,
              delay: 0.35,
              ease: [0.22, 1, 0.36, 1],
            }}
          >

            {/* Small Label */}
            <div className="flex items-center gap-3">
              <span className="w-8 h-[1px] bg-[#B69A63]" />
              <span className="text-[#B69A63] text-xs tracking-[0.25em] uppercase">
                Our Story
              </span>
            </div>

            {/* Heading */}
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl leading-[1.2] font-medium">
              The Beauty of
              <br />
              <span className="text-[#B69A63] italic">
                Handmade Living
              </span>
            </h2>

            {/* Description */}
            <p className="text-[#D5CCBF] text-sm sm:text-base leading-8 max-w-xl">
              At BuddhaHome, we believe that the beauty of a home lies in the
              little details. Every creation reflects the warmth of natural
              materials, the skill of thoughtful craftsmanship, and the charm
              of timeless design.
            </p>

            <p className="text-[#D5CCBF] text-sm sm:text-base leading-8 max-w-xl">
              From handcrafted wooden pieces to thoughtfully curated home
              accessories, each product brings a sense of warmth, character,
              and individuality to your space.
            </p>

            {/* Decorative Divider */}
            <div className="w-16 h-[1px] bg-[#B69A63]/70" />

            {/* Explore Button */}
            <Link
              to="/about"
              className="group inline-flex items-center gap-4 w-fit text-[#F7F5F0] text-xs tracking-[0.18em] uppercase"
            >
              <span className="relative pb-2">
                Discover Our Story
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#B69A63] origin-left transition-transform duration-500 group-hover:scale-x-0" />
              </span>

              <span className="w-9 h-9 rounded-full border border-[#B69A63]/60 flex items-center justify-center transition-all duration-500 group-hover:bg-[#B69A63] group-hover:text-[#281A10] group-hover:translate-x-1">
                <ArrowRight size={15} />
              </span>
            </Link>

          </motion.div>
        </div>
      </section>

      {/* CRAFTSMANSHIP VALUES */}
      <section className="relative py-16 sm:py-20 border-b border-[#E8E3D9] overflow-hidden bg-gradient-to-b from-[#FFFFFF] via-[#FAF8F3] to-[#F7F5F0]">
        <Container>

          {/* Section Heading */}
          <motion.div
            className="text-center max-w-xl mx-auto mb-12 sm:mb-14"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <span className="text-xs font-semibold tracking-[0.2em] text-[#76501F] uppercase">
              The BuddhaHome Standard
            </span>

            <h2 className="text-2xl sm:text-3xl font-serif text-[#29251F] mt-3 leading-snug">
              Built on Reverence for Raw Wood & Stone
            </h2>

            <p className="mt-3 text-sm text-[#777166] leading-relaxed">
              Thoughtful craftsmanship, natural materials and timeless quality
              in every creation.
            </p>
          </motion.div>

          {/* Cards Container */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.18,
                },
              },
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >

            {/* CARD 1 */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 35 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.75,
                    ease: [0.22, 1, 0.36, 1],
                  },
                },
              }}
              whileHover={{
                y: -7,
                transition: { duration: 0.35, ease: "easeOut" },
              }}
              className="group relative p-8 sm:p-9 rounded-2xl bg-white/80 border border-[#E8E3D9] text-center space-y-5 shadow-sm hover:border-[#B69A63] hover:shadow-[0_18px_45px_rgba(40,26,16,0.08)] transition-[border-color,box-shadow] duration-500"
            >
              <motion.div
                whileHover={{
                  scale: 1.08,
                  rotate: -5,
                  borderColor: "#B69A63",
                  boxShadow: "0 0 0 5px rgba(182,154,99,0.10)",
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="w-16 h-16 mx-auto rounded-full bg-[#F7F5F0] border border-[#E8E3D9] flex items-center justify-center text-[#76501F] transition-colors duration-500"
              >
                <Hammer className="w-6 h-6 stroke-[1.5]" />
              </motion.div>

              <h3 className="font-serif text-xl text-[#29251F]">
                Thoughtfully Handcrafted
              </h3>

              <p className="text-sm text-[#777166] leading-relaxed">
                Every joint, bevel, and contour is hand-shaped by artisans who
                respect traditional joinery methods that endure through
                generations.
              </p>

              <div className="w-8 h-[1px] bg-[#B69A63]/60 mx-auto transition-all duration-500 group-hover:w-14" />
            </motion.div>

            {/* CARD 2 */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 35 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.75,
                    ease: [0.22, 1, 0.36, 1],
                  },
                },
              }}
              whileHover={{
                y: -7,
                transition: { duration: 0.35, ease: "easeOut" },
              }}
              className="group relative p-8 sm:p-9 rounded-2xl bg-white/80 border border-[#E8E3D9] text-center space-y-5 shadow-sm hover:border-[#B69A63] hover:shadow-[0_18px_45px_rgba(40,26,16,0.08)] transition-[border-color,box-shadow] duration-500"
            >
              <motion.div
                whileHover={{
                  scale: 1.08,
                  rotate: 5,
                  borderColor: "#B69A63",
                  boxShadow: "0 0 0 5px rgba(182,154,99,0.10)",
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="w-16 h-16 mx-auto rounded-full bg-[#F7F5F0] border border-[#E8E3D9] flex items-center justify-center text-[#76501F] transition-colors duration-500"
              >
                <Trees className="w-6 h-6 stroke-[1.5]" />
              </motion.div>

              <h3 className="font-serif text-xl text-[#29251F]">
                Natural Material Character
              </h3>

              <p className="text-sm text-[#777166] leading-relaxed">
                We celebrate genuine grain irregularities, growth rings, and
                honed travertine pockets instead of masking them behind
                synthetic coatings.
              </p>

              <div className="w-8 h-[1px] bg-[#B69A63]/60 mx-auto transition-all duration-500 group-hover:w-14" />
            </motion.div>

            {/* CARD 3 */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 35 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.75,
                    ease: [0.22, 1, 0.36, 1],
                  },
                },
              }}
              whileHover={{
                y: -7,
                transition: { duration: 0.35, ease: "easeOut" },
              }}
              className="group relative p-8 sm:p-9 rounded-2xl bg-white/80 border border-[#E8E3D9] text-center space-y-5 shadow-sm hover:border-[#B69A63] hover:shadow-[0_18px_45px_rgba(40,26,16,0.08)] transition-[border-color,box-shadow] duration-500"
            >
              <motion.div
                whileHover={{
                  scale: 1.08,
                  rotate: -5,
                  borderColor: "#B69A63",
                  boxShadow: "0 0 0 5px rgba(182,154,99,0.10)",
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="w-16 h-16 mx-auto rounded-full bg-[#F7F5F0] border border-[#E8E3D9] flex items-center justify-center text-[#76501F] transition-colors duration-500"
              >
                <Sparkles className="w-6 h-6 stroke-[1.5]" />
              </motion.div>

              <h3 className="font-serif text-xl text-[#29251F]">
                Food-Safe Organic Finishes
              </h3>

              <p className="text-sm text-[#777166] leading-relaxed">
                Finished with natural botanical oils and beeswax buffs that
                enhance tactile warmth without releasing toxic chemical fumes.
              </p>

              <div className="w-8 h-[1px] bg-[#B69A63]/60 mx-auto transition-all duration-500 group-hover:w-14" />
            </motion.div>

          </motion.div>
        </Container>
      </section>

      {/* BESPOKE ENQUIRY — EDITORIAL CTA */}
      <section className="relative py-16 sm:py-20 overflow-hidden">
        <Container>

          {/* Main CTA Wrapper */}
          <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-[#B69A63]/25 bg-gradient-to-br from-[#F7F5F0] via-[#F3EEDF] to-[#EFEAD8]">

            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-[#B69A63]/[0.06] blur-3xl pointer-events-none" />

            <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-[#76501F]/[0.04] blur-3xl pointer-events-none" />

            {/* Gold Divider */}
            <motion.div
              className="absolute top-0 left-0 h-[2px] bg-[#B69A63]"
              initial={{ width: "0%" }}
              whileInView={{ width: "100%" }}
              viewport={{ once: false }}
              transition={{
                duration: 1.2,
                ease: [0.22, 1, 0.36, 1],
              }}
            />

            {/* CTA Content */}
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10 p-8 sm:p-12 lg:p-16">

              {/* LEFT — EDITORIAL TEXT */}
              <motion.div
                className="max-w-2xl space-y-4 text-center md:text-left"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.9,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div className="flex items-center justify-center md:justify-start gap-3">
                  <span className="w-7 h-[1px] bg-[#B69A63]" />

                  <span className="text-[10px] sm:text-xs font-semibold tracking-[0.22em] text-[#76501F] uppercase">
                    Custom Commissions & Inquiries
                  </span>
                </div>

                <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl xl:text-[42px] leading-[1.2] text-[#281A10]">
                  Have a Specific Dimension or Wood Species in Mind?
                </h2>

                <p className="text-sm sm:text-base text-[#777166] leading-7 max-w-xl mx-auto md:mx-0">
                  Connect directly with our workshop for bespoke sizing,
                  custom live-edge platters, or architectural wood and stone
                  installations.
                </p>

                <div className="pt-2 flex justify-center md:justify-start">
                  <div className="w-12 h-[1px] bg-[#B69A63]/70" />
                </div>
              </motion.div>

              {/* RIGHT — CONTACT BUTTON */}
              <motion.div
                className="relative shrink-0"
                initial={{ opacity: 0, x: 35 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.9,
                  delay: 0.2,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <Button
                  to="/contact"
                  variant="primary"
                  size="lg"
                  className="group"
                >
                  <span className="inline-flex items-center gap-3">
                    Contact Workshop
                    <ArrowRight
                      size={16}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </span>
                </Button>
              </motion.div>

            </div>
          </div>
        </Container>
      </section>

    </div>
  );
}

