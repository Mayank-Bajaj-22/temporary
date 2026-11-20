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

  // Hero slideshow
  const [heroIndex, setHeroIndex] = useState(0);

  const heroImages = products
    .filter((product) => product.available !== false)
    .flatMap((product) =>
      (product.images || []).filter(Boolean).map((src) => ({
        src,
        alt: product.name || "BuddhaHome Collection",
      })),
    );

  // Alternate between 2-image and 3-image layouts
  const heroSlides = [];
  let imageIndex = 0;
  let layoutIndex = 0;

  while (imageIndex < heroImages.length) {
    const count = layoutIndex % 2 === 0 ? 2 : 3;

    const images = heroImages.slice(imageIndex, imageIndex + count);

    imageIndex += count;

    if (images.length === 1 && heroImages.length > 1) {
      images.push(heroImages[0]);
    }

    if (images.length > 0) {
      heroSlides.push(images);
    }

    layoutIndex++;
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
      .filter((p) => p.categorySlug === cat.slug && p.available !== false)
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
              className="absolute inset-0 grid h-full w-full grid-cols-1 sm:[grid-template-columns:var(--hero-columns)]"
              style={{
                "--hero-columns": `repeat(${activeHeroSlide.length}, minmax(0, 1fr))`,
              }}
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

        {/* Image overlay */}
        <div className="absolute inset-0 bg-black/15 pointer-events-none" />

        {/* Explore button */}
        <Link
          to="/products"
          aria-label="Explore Collection"
          className={`group absolute z-20
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

  sm:left-1/2 sm:-translate-x-1/2 sm:bottom-[18%]
`}
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
        const categoryProducts = productsByCategory[category.slug] || [];

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
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-sans font-medium tracking-normal text-[#29251F] uppercase">
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
      <section className="py-14 sm:py-20 border-b border-[#E8E3D9]">
        <Container>
          <div className="bg-[#281A10] text-[#F7F5F0] rounded-3xl overflow-hidden border border-[#3B281B] shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
              <div className="lg:col-span-6 relative aspect-4/3 lg:aspect-auto lg:h-full overflow-hidden">
                <img
                  src="/images/buddhahome/rustic-wooden-stand-tray.png"
                  alt="BuddhaHome artisan woodcraft and display stands"
                  loading="lazy"
                  className="w-full h-full object-cover object-center brightness-95"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#281A10] via-transparent to-transparent lg:hidden" />
              </div>

              <div className="lg:col-span-6 p-8 sm:p-12 lg:p-16 space-y-6">
                <span className="text-xs font-semibold tracking-[0.25em] text-[#B69A63] uppercase">
                  Artisanal Heritage
                </span>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white tracking-tight leading-tight">
                  Every Piece Has a Story
                </h2>

                <p className="text-base text-[#E8E3D9]/80 font-sans leading-relaxed">
                  From the natural character of the timber to the hands that
                  shape it, every BuddhaHome creation celebrates the beauty of
                  thoughtful craftsmanship. We believe home accents should
                  anchor the senses with raw, honest textures.
                </p>

                <p className="text-sm text-[#E8E3D9]/70 font-sans leading-relaxed">
                  Rather than erasing grain knots and natural live contours, our
                  artisans preserve them as living chronicles of the earth's
                  natural design.
                </p>

                <div className="pt-2">
                  <Button
                    to="/about"
                    variant="gold"
                    size="lg"
                    icon={ArrowRight}
                    iconPosition="right"
                  >
                    Discover Our Story
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* CRAFTSMANSHIP VALUES */}
      <section className="py-14 sm:py-20 border-b border-[#E8E3D9] bg-white">
        <Container>
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs font-semibold tracking-[0.2em] text-[#76501F] uppercase">
              The BuddhaHome Standard
            </span>

            <h2 className="text-2xl sm:text-3xl font-serif text-[#29251F] mt-2">
              Built on Reverence for Raw Wood & Stone
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
            <div className="p-8 rounded-2xl bg-[#F7F5F0] border border-[#E8E3D9] text-center space-y-4">
              <div className="w-14 h-14 mx-auto rounded-full bg-white border border-[#E8E3D9] flex items-center justify-center text-[#76501F] shadow-xs">
                <Hammer className="w-6 h-6 stroke-[1.5]" />
              </div>

              <h3 className="font-serif text-xl text-[#29251F]">
                Thoughtfully Handcrafted
              </h3>

              <p className="text-sm text-[#777166] leading-relaxed">
                Every joint, bevel, and contour is hand-shaped by artisans who
                respect traditional joinery methods that endure through
                generations.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-[#F7F5F0] border border-[#E8E3D9] text-center space-y-4">
              <div className="w-14 h-14 mx-auto rounded-full bg-white border border-[#E8E3D9] flex items-center justify-center text-[#76501F] shadow-xs">
                <Trees className="w-6 h-6 stroke-[1.5]" />
              </div>

              <h3 className="font-serif text-xl text-[#29251F]">
                Natural Material Character
              </h3>

              <p className="text-sm text-[#777166] leading-relaxed">
                We celebrate genuine grain irregularities, growth rings, and
                honed travertine pockets instead of masking them behind
                synthetic coatings.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-[#F7F5F0] border border-[#E8E3D9] text-center space-y-4">
              <div className="w-14 h-14 mx-auto rounded-full bg-white border border-[#E8E3D9] flex items-center justify-center text-[#76501F] shadow-xs">
                <Sparkles className="w-6 h-6 stroke-[1.5]" />
              </div>

              <h3 className="font-serif text-xl text-[#29251F]">
                Food-Safe Organic Finishes
              </h3>

              <p className="text-sm text-[#777166] leading-relaxed">
                Finished with natural botanical oils and beeswax buffs that
                enhance tactile warmth without releasing toxic chemical fumes.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* BESPOKE ENQUIRY CALLOUT */}
      <section className="py-14 sm:py-20">
        <Container>
          <div className="bg-[#EFEAD8] rounded-3xl p-8 sm:p-12 lg:p-16 border border-[#B69A63]/30 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
            <div className="max-w-xl space-y-3">
              <span className="text-xs font-semibold tracking-[0.2em] text-[#76501F] uppercase">
                Custom Commissions & Inquiries
              </span>

              <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#281A10]">
                Have a Specific Dimension or Wood Species in Mind?
              </h3>

              <p className="text-sm text-[#777166] leading-relaxed">
                Connect directly with our workshop for bespoke sizing, custom
                live-edge platters, or architectural wood and stone
                installations.
              </p>
            </div>

            <div className="shrink-0">
              <Button to="/contact" variant="primary" size="lg">
                Contact Workshop
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
