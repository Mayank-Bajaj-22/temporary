import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  ArrowRight,
  Trees,
  Hammer,
  Sparkles,
  CheckCircle2,
  ArrowUpRight,
  ChevronRight,
} from 'lucide-react';
import Container from '../components/ui/Container';
import Button from '../components/ui/Button';
import ProductCard from '../components/products/ProductCard';
import { useProducts } from '../context/ProductContext';
import { categories } from '../data/categories';

export default function Home() {
  const [heroSearch, setHeroSearch] = useState('');
  const navigate = useNavigate();
  const { products } = useProducts();

  const handleHeroSearch = (e) => {
    e.preventDefault();
    if (heroSearch.trim()) {
      navigate(`/products?q=${encodeURIComponent(heroSearch.trim())}`);
    }
  };

  // Group products by category slug for per-category sections
  const productsByCategory = categories.reduce((acc, cat) => {
    acc[cat.slug] = products
      .filter((p) => p.categorySlug === cat.slug && p.available !== false)
      .slice(0, 4);
    return acc;
  }, {});

  return (
    <div className="pb-20">
      {/* ================================================================
          HERO SECTION
          ================================================================ */}
      <section className="relative overflow-hidden pt-8 pb-12 sm:pt-12 sm:pb-20 border-b border-[#E8E3D9]">
        <div className="absolute inset-0 bg-gradient-to-b from-[#F7F5F0] via-[#F2EDE2] to-[#F7F5F0] -z-10" />

        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#E8E3D9]/80 border border-[#B69A63]/30 rounded-full text-xs font-semibold tracking-[0.2em] uppercase text-[#76501F]">
                <Trees className="w-3.5 h-3.5" />
                <span>ROOTED IN NATURE</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif tracking-tight text-[#281A10] leading-[1.08]">
                Crafted by Nature.{' '}
                <span className="italic font-normal block text-[#76501F]">Made for You.</span>
              </h1>

              <p className="text-base sm:text-lg text-[#777166] max-w-xl mx-auto lg:mx-0 leading-relaxed font-sans font-light">
                Thoughtfully handcrafted wooden serveware, standing pedestal bowls, and natural stone decor that bring warmth and character into your home.
              </p>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <Button to="/products" variant="primary" size="lg" icon={ArrowRight} iconPosition="right">
                  Explore Portfolio
                </Button>
                <Button to="/about" variant="secondary" size="lg">
                  Our Story
                </Button>
              </div>

              <div className="pt-4 border-t border-[#E8E3D9]/80 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-[#777166]">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#76501F]" />
                  100% Solid Hardwoods & Stone
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#76501F]" />
                  Bespoke Dimensions by Request
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#76501F]" />
                  Direct Studio WhatsApp Quotes
                </span>
              </div>
            </div>

            {/* Right Hero Visual */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="absolute -inset-3 rounded-2xl border-2 border-dashed border-[#B69A63]/30 pointer-events-none transform -rotate-1" />
                <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-white border border-[#E8E3D9]">
                  <img
                    src="/images/buddhahome/walnut-scalloped-serving-collection.png"
                    alt="Walnut Scalloped Serving Collection by BuddhaHome"
                    className="w-full aspect-4/5 object-cover object-center"
                    fetchPriority="high"
                  />
                  <div className="absolute bottom-5 left-5 right-5 p-4 bg-white/95 backdrop-blur-md rounded-xl border border-[#E8E3D9] shadow-md flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-semibold tracking-wider uppercase text-[#76501F] block">
                        Signature Collection
                      </span>
                      <h4 className="font-serif text-base text-[#281A10] font-medium">
                        Walnut Scalloped Serving Collection
                      </h4>
                      <p className="text-xs text-[#777166]">Solid Walnut & Natural Beeswax Finish</p>
                    </div>
                    <Link
                      to="/products/walnut-scalloped-collection"
                      className="p-2.5 rounded-full bg-[#281A10] text-white hover:bg-[#76501F] transition-colors"
                      aria-label="View Walnut Scalloped Collection"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mt-12 sm:mt-16 max-w-3xl mx-auto">
            <div className="bg-white p-3 sm:p-4 rounded-2xl border border-[#E8E3D9] shadow-sm">
              <form onSubmit={handleHeroSearch} className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#777166]" />
                  <input
                    type="text"
                    value={heroSearch}
                    onChange={(e) => setHeroSearch(e.target.value)}
                    placeholder="Search artisanal pieces (e.g. Scalloped Platter, Travertine Tray, Bear Board)..."
                    className="w-full pl-12 pr-4 py-3 bg-[#F7F5F0] border border-transparent focus:border-[#76501F] rounded-xl text-sm text-[#29251F] placeholder-[#777166] focus:outline-none transition-colors"
                  />
                </div>
                <Button type="submit" variant="wood" size="md" className="sm:w-auto w-full py-3 px-6">
                  Search Portfolio
                </Button>
              </form>
            </div>
          </div>
        </Container>
      </section>

      {/* ================================================================
          PER-CATEGORY PRODUCT SECTIONS (Swadeh-style)
          ================================================================ */}
      {categories.map((category) => {
        const categoryProducts = productsByCategory[category.slug] || [];
        if (categoryProducts.length === 0) return null;

        return (
          <section key={category.slug} className="py-14 sm:py-20 border-b border-[#E8E3D9] last:border-b-0">
            <Container>
              {/* Section Header */}
              <div className="flex items-end justify-between mb-8 sm:mb-10">
                <div>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif tracking-tight text-[#29251F] uppercase">
                    {category.name}
                  </h2>
                  <p className="mt-1.5 text-sm text-[#777166] max-w-lg leading-relaxed hidden sm:block">
                    {category.description}
                  </p>
                </div>
                <Link
                  to={`/categories/${category.slug}`}
                  className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold tracking-[0.15em] uppercase text-[#76501F] hover:text-[#281A10] transition-colors border-b border-[#76501F]/40 hover:border-[#281A10] pb-0.5 shrink-0 ml-6"
                >
                  View All
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Products Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
                {categoryProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {/* VIEW ALL button — centered below grid */}
              <div className="mt-10 text-center">
                <Link
                  to={`/categories/${category.slug}`}
                  className="inline-flex items-center justify-center gap-2 px-10 py-3 bg-[#281A10] text-[#F7F5F0] text-xs font-semibold tracking-[0.2em] uppercase hover:bg-[#76501F] transition-colors duration-200 rounded-sm"
                >
                  View All
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </Container>
          </section>
        );
      })}

      {/* ================================================================
          BRAND STORY SECTION
          ================================================================ */}
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
                  From the natural character of the timber to the hands that shape it, every BuddhaHome creation celebrates the beauty of thoughtful craftsmanship. We believe home accents should anchor the senses with raw, honest textures.
                </p>
                <p className="text-sm text-[#E8E3D9]/70 font-sans leading-relaxed">
                  Rather than erasing grain knots and natural live contours, our artisans preserve them as living chronicles of the earth's natural design.
                </p>
                <div className="pt-2">
                  <Button to="/about" variant="gold" size="lg" icon={ArrowRight} iconPosition="right">
                    Discover Our Story
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ================================================================
          CRAFTSMANSHIP VALUES
          ================================================================ */}
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
              <h3 className="font-serif text-xl text-[#29251F]">Thoughtfully Handcrafted</h3>
              <p className="text-sm text-[#777166] leading-relaxed">
                Every joint, bevel, and contour is hand-shaped by artisans who respect traditional joinery methods that endure through generations.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-[#F7F5F0] border border-[#E8E3D9] text-center space-y-4">
              <div className="w-14 h-14 mx-auto rounded-full bg-white border border-[#E8E3D9] flex items-center justify-center text-[#76501F] shadow-xs">
                <Trees className="w-6 h-6 stroke-[1.5]" />
              </div>
              <h3 className="font-serif text-xl text-[#29251F]">Natural Material Character</h3>
              <p className="text-sm text-[#777166] leading-relaxed">
                We celebrate genuine grain irregularities, growth rings, and honed travertine pockets instead of masking them behind synthetic coatings.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-[#F7F5F0] border border-[#E8E3D9] text-center space-y-4">
              <div className="w-14 h-14 mx-auto rounded-full bg-white border border-[#E8E3D9] flex items-center justify-center text-[#76501F] shadow-xs">
                <Sparkles className="w-6 h-6 stroke-[1.5]" />
              </div>
              <h3 className="font-serif text-xl text-[#29251F]">Food-Safe Organic Finishes</h3>
              <p className="text-sm text-[#777166] leading-relaxed">
                Finished with natural botanical oils and beeswax buffs that enhance tactile warmth without releasing toxic chemical fumes.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* ================================================================
          BESPOKE ENQUIRY CALLOUT
          ================================================================ */}
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
                Connect directly with our workshop for bespoke sizing, custom live-edge platters, or architectural wood and stone installations.
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
