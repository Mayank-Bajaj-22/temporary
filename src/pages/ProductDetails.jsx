import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ChevronRight, 
  MessageCircle, 
  Phone, 
  Trees, 
  Shield, 
  Sparkles, 
  Check, 
  ArrowLeft 
} from 'lucide-react';
import Container from '../components/ui/Container';
import ProductGallery from '../components/products/ProductGallery';
import ProductCard from '../components/products/ProductCard';
import Button from '../components/ui/Button';
import { useProducts } from '../context/ProductContext';
import { siteConfig, getWhatsAppEnquiryUrl } from '../config/site';

export default function ProductDetails() {
  const { slug } = useParams();
  const { getProductBySlug, products } = useProducts();

  // Find product by slug in shared context
  const product = getProductBySlug(slug);

  // If product not found
  if (!product) {
    return (
      <div className="py-24 sm:py-36 text-center">
        <Container size="narrow">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#76501F]">
            Portfolio Piece Not Found
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#281A10] mt-3 mb-4">
            This handcrafted creation cannot be found
          </h1>
          <p className="text-[#777166] text-sm mb-8 leading-relaxed">
            The piece you are looking for may have been retired or renamed. Explore our active portfolio collection.
          </p>
          <Button to="/products" variant="primary" icon={ArrowLeft}>
            Back to Collection
          </Button>
        </Container>
      </div>
    );
  }

  // Related products from the same category
  const relatedProducts = products
    .filter((p) => p.categorySlug === product.categorySlug && p.id !== product.id)
    .slice(0, 4);

  // Enquiry URL
  const whatsAppUrl = getWhatsAppEnquiryUrl(product.name);

  return (
    <div className="py-8 sm:py-12">
      <Container>
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center flex-wrap gap-2 text-xs text-[#777166] mb-8 sm:mb-10" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-[#281A10] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#B69A63]" />
          <Link to="/products" className="hover:text-[#281A10] transition-colors">
            Portfolio
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#B69A63]" />
          <Link to={`/categories/${product.categorySlug}`} className="hover:text-[#281A10] transition-colors">
            {product.category}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#B69A63]" />
          <span className="text-[#281A10] font-medium truncate max-w-xs">{product.name}</span>
        </nav>

        {/* Main Product Showcase Grid - Balanced to match image height with text */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Gallery Column */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <ProductGallery images={product.images} productName={product.name} />
          </div>

          {/* Details & Enquire Column - Minimalist Portfolio Style, No Pricing */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              {/* Category & Status */}
              <div className="flex items-center justify-between">
                <Link
                  to={`/categories/${product.categorySlug}`}
                  className="text-xs font-semibold tracking-[0.2em] text-[#76501F] hover:text-[#281A10] uppercase transition-colors"
                >
                  {product.category}
                </Link>

                <div className="flex items-center gap-1.5 text-xs text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  <Check className="w-3.5 h-3.5" />
                  <span>Available for Commission</span>
                </div>
              </div>

              {/* Title & Tagline */}
              <div>
                <h1 className="text-3xl sm:text-4xl font-serif text-[#281A10] tracking-tight leading-tight">
                  {product.name}
                </h1>
                <p className="mt-2 text-xs font-semibold tracking-wider uppercase text-[#76501F]">
                  Custom Client Commission & Studio Handcrafted
                </p>
              </div>

              {/* Description */}
              <p className="text-sm sm:text-base text-[#777166] leading-relaxed font-sans font-light">
                {product.description}
              </p>

              {/* Craftsmanship Specifications Box */}
              {product.details && (
                <div className="bg-white border border-[#E8E3D9] rounded-xl p-5 space-y-3.5 text-xs">
                  <h4 className="font-semibold text-[#281A10] uppercase tracking-wider text-[11px] pb-2 border-b border-[#E8E3D9]">
                    Artisanal Specifications
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[#29251F]">
                    <div>
                      <span className="text-[#777166] block">Materials</span>
                      <strong className="font-medium">{product.details.woodType}</strong>
                    </div>

                    <div>
                      <span className="text-[#777166] block">Dimensions</span>
                      <strong className="font-medium">{product.details.dimensions}</strong>
                    </div>

                    <div>
                      <span className="text-[#777166] block">Surface Treatment</span>
                      <strong className="font-medium">{product.details.finish}</strong>
                    </div>

                    <div>
                      <span className="text-[#777166] block">Approx. Weight</span>
                      <strong className="font-medium">{product.details.weight}</strong>
                    </div>
                  </div>

                  {product.details.craftNote && (
                    <div className="pt-2 border-t border-[#E8E3D9]/60 text-[11px] text-[#777166] italic">
                      "{product.details.craftNote}"
                    </div>
                  )}
                </div>
              )}

              {/* Direct Enquiry Box - WhatsApp & Phone Call Only (No Pricing) */}
              <div className="bg-[#EFEAD8] border border-[#B69A63]/40 rounded-2xl p-5 sm:p-6 space-y-4">
                <div className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-[#76501F] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-serif text-base text-[#281A10] font-medium">
                      Request Pricing & Commission Details
                    </h4>
                    <p className="text-xs text-[#777166] mt-0.5 leading-relaxed">
                      Every piece is shaped individually. Connect directly with our studio on WhatsApp or Phone to enquire about custom quotes, available wood species, and lead times.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <a
                    href={whatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-[#76501F] text-white text-xs font-semibold uppercase tracking-wider rounded-sm hover:bg-[#281A10] transition-colors shadow-xs"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Enquire on WhatsApp</span>
                  </a>

                  {siteConfig.contactPhone ? (
                    <Button
                      href={`tel:${siteConfig.contactPhone.replace(/[^0-9+]/g, '')}`}
                      variant="subtle"
                      size="lg"
                      icon={Phone}
                    >
                      Workshop Call
                    </Button>
                  ) : (
                    <Button
                      to="/contact"
                      variant="subtle"
                      size="lg"
                      icon={Phone}
                    >
                      Contact Us
                    </Button>
                  )}
                </div>
              </div>

              {/* Care & Dispatch Reassurance */}
              <div className="space-y-2 pt-2 text-xs text-[#777166]">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-[#76501F]" />
                  <span>Break-safe cushioned packaging and pan-India studio dispatch</span>
                </div>
                <div className="flex items-center gap-2">
                  <Trees className="w-4 h-4 text-[#76501F]" />
                  <span>Finished with zero-VOC organic botanical oils and natural wax buffs</span>
                </div>
              </div>
            </div>

            {/* Back link */}
            <div className="pt-6 border-t border-[#E8E3D9]">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#76501F] hover:text-[#281A10] transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Return to Full Portfolio</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <section className="mt-20 sm:mt-28 pt-12 border-t border-[#E8E3D9]">
            <div className="flex flex-col sm:flex-row items-baseline justify-between mb-8 sm:mb-12">
              <div>
                <span className="text-xs font-semibold tracking-[0.2em] text-[#76501F] uppercase">
                  Similar Artistry
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif text-[#281A10] mt-1">
                  More from {product.category}
                </h3>
              </div>
              <Link
                to={`/categories/${product.categorySlug}`}
                className="text-xs font-semibold tracking-wider uppercase text-[#76501F] hover:underline mt-2 sm:mt-0"
              >
                View Category ({product.category}) →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relProduct) => (
                <ProductCard key={relProduct.id} product={relProduct} />
              ))}
            </div>
          </section>
        )}
      </Container>
    </div>
  );
}
