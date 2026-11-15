import React from 'react';
import { Trees, Hammer, Sparkles, ArrowRight } from 'lucide-react';
import Container from '../components/ui/Container';
import Button from '../components/ui/Button';

export default function About() {
  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* Hero Header */}
      <section className="relative bg-[#EFEAD8] py-16 sm:py-24 border-b border-[#E8E3D9]">
        <Container>
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <span className="text-xs font-semibold tracking-[0.25em] text-[#76501F] uppercase">
              The Philosophy
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-[#281A10] tracking-tight leading-tight">
              Rooted in Nature
            </h1>
            <p className="text-base sm:text-lg text-[#777166] font-sans font-light leading-relaxed max-w-2xl mx-auto">
              At BuddhaHome, we create handmade wooden serveware, pedestal bowl stands, and natural stone accessories shaped around the living character of the earth.
            </p>
          </div>
        </Container>
      </section>

      {/* Main Narrative Split Section */}
      <section>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-6 relative rounded-2xl overflow-hidden border border-[#E8E3D9] shadow-xl">
              <img
                src="/images/buddhahome/walnut-scalloped-serving-collection.png"
                alt="BuddhaHome artisanal workshop and handcrafted tableware"
                loading="lazy"
                className="w-full aspect-4/3 sm:aspect-16/10 lg:aspect-4/3 object-cover"
              />
            </div>

            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-semibold tracking-[0.2em] text-[#76501F] uppercase">
                Our Essence
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif text-[#281A10] leading-snug">
                Where Living Wood & Honed Stone Meet Unhurried Craft
              </h2>
              <p className="text-sm sm:text-base text-[#777166] leading-relaxed font-sans">
                BuddhaHome began with a quiet reverence for the tactile warmth, endurance, and honesty of solid timber and natural stone. In a world saturated with mass-manufactured plastics, we craft objects that bring grounded mindfulness to everyday rituals.
              </p>
              <p className="text-sm sm:text-base text-[#777166] leading-relaxed font-sans">
                Every tree log and travertine slab possesses an unrepeatable history. Our artisans gently sculpt, lathe-turn, and oil each piece so its knots, natural live edges, and geological fissures remain celebrated centerpieces of your living space.
              </p>
              <div className="pt-2">
                <Button to="/products" variant="primary" icon={ArrowRight} iconPosition="right">
                  Explore Portfolio Collection
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Craftsmanship Pillars */}
      <section className="bg-white py-16 sm:py-24 border-y border-[#E8E3D9]">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-semibold tracking-[0.2em] text-[#76501F] uppercase">
              Honest Principles
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#281A10] mt-2 mb-4">
              What Shapes Every BuddhaHome Piece
            </h2>
            <p className="text-sm text-[#777166]">
              Our guidelines for creating enduring pieces that bring peace and natural character to your home.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-[#F7F5F0] border border-[#E8E3D9] space-y-4">
              <div className="w-12 h-12 rounded-full bg-[#76501F]/15 flex items-center justify-center text-[#76501F]">
                <Trees className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl text-[#281A10]">Living Grain Over Perfection</h3>
              <p className="text-sm text-[#777166] leading-relaxed">
                Knots, sapwood highlights, and live contour edges are not flaws; they are the fingerprints of nature that make each creation unique.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-[#F7F5F0] border border-[#E8E3D9] space-y-4">
              <div className="w-12 h-12 rounded-full bg-[#76501F]/15 flex items-center justify-center text-[#76501F]">
                <Hammer className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl text-[#281A10]">Enduring Joinery & Hand Carving</h3>
              <p className="text-sm text-[#777166] leading-relaxed">
                Traditional lathe turnings, scalloped chiseling, and seamless ceramic-and-stone inlays engineered to last through generations of daily use.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-[#F7F5F0] border border-[#E8E3D9] space-y-4">
              <div className="w-12 h-12 rounded-full bg-[#76501F]/15 flex items-center justify-center text-[#76501F]">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl text-[#281A10]">Pure Organic Finishes</h3>
              <p className="text-sm text-[#777166] leading-relaxed">
                Sealed with food-safe botanical walnut oils, coconut balms, and hand-rubbed organic beeswax for a silky satin surface that breathes naturally.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Workshop Contact CTA */}
      <section>
        <Container>
          <div className="bg-[#281A10] text-white rounded-3xl p-8 sm:p-14 text-center max-w-4xl mx-auto space-y-6">
            <span className="text-xs font-semibold tracking-[0.25em] text-[#B69A63] uppercase">
              Direct Dialogue
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif tracking-tight">
              Begin a Conversation with Our Studio
            </h2>
            <p className="text-sm sm:text-base text-[#E8E3D9]/80 max-w-xl mx-auto font-sans leading-relaxed">
              We are delighted to share timber slab photos, discuss custom dimensions, or explore bespoke corporate gifting and hospitality commissions.
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
              <Button to="/contact" variant="gold" size="lg">
                Contact Studio
              </Button>
              <Button to="/products" variant="subtle" size="lg">
                View Portfolio
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
