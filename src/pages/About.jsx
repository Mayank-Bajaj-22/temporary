
import React from "react";
import { motion } from "framer-motion";
import { Trees, Hammer, Sparkles, ArrowRight } from "lucide-react";
import Container from "../components/ui/Container";
import Button from "../components/ui/Button";

const ease = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
    },
  },
};

const pillars = [
  {
    icon: Trees,
    title: "Living Grain Over Perfection",
    description:
      "Knots, sapwood highlights, and live contour edges are not flaws; they are the fingerprints of nature that make each creation unique.",
  },
  {
    icon: Hammer,
    title: "Enduring Joinery & Hand Carving",
    description:
      "Traditional lathe turnings, scalloped chiseling, and seamless ceramic-and-stone inlays engineered to last through generations of daily use.",
  },
  {
    icon: Sparkles,
    title: "Pure Organic Finishes",
    description:
      "Sealed with food-safe botanical walnut oils, coconut balms, and hand-rubbed organic beeswax for a silky satin surface that breathes naturally.",
  },
];

export default function About() {
  return (
    <div className="space-y-16 sm:space-y-24 pb-20">

      {/* HERO HEADER */}
      <section className="relative bg-[#EFEAD8] py-16 sm:py-24 border-b border-[#E8E3D9] overflow-hidden">
        <Container>
          <motion.div
            className="max-w-3xl mx-auto text-center space-y-4"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.span
              variants={fadeUp}
              className="block text-xs font-semibold tracking-[0.25em] text-[#76501F] uppercase"
            >
              The Philosophy
            </motion.span>

            <motion.h1
              variants={fadeUp}
              className="text-4xl sm:text-5xl lg:text-6xl font-serif text-[#281A10] tracking-tight leading-tight"
            >
              Rooted in Nature
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-base sm:text-lg text-[#777166] font-sans font-light leading-relaxed max-w-2xl mx-auto"
            >
              At BuddhaHome, we create handmade wooden serveware, pedestal bowl
              stands, and natural stone accessories shaped around the living
              character of the earth.
            </motion.p>
          </motion.div>
        </Container>
      </section>

      {/* MAIN NARRATIVE */}
      <section>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

            {/* IMAGE */}
            <motion.div
              className="lg:col-span-6 relative rounded-2xl overflow-hidden border border-[#E8E3D9] shadow-xl"
              initial={{ opacity: 0, x: -45, scale: 0.97 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1.1, ease }}
            >
              <motion.img
                src="/images/buddhahome/walnut-scalloped-serving-collection.png"
                alt="BuddhaHome artisanal workshop and handcrafted tableware"
                loading="lazy"
                className="w-full aspect-4/3 sm:aspect-16/10 lg:aspect-4/3 object-cover"
                whileHover={{ scale: 1.04 }}
                transition={{ duration: 0.8, ease }}
              />
            </motion.div>

            {/* TEXT */}
            <motion.div
              className="lg:col-span-6 space-y-6"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <motion.span
                variants={fadeUp}
                className="block text-xs font-semibold tracking-[0.2em] text-[#76501F] uppercase"
              >
                Our Essence
              </motion.span>

              <motion.h2
                variants={fadeUp}
                className="text-3xl sm:text-4xl font-serif text-[#281A10] leading-snug"
              >
                Where Living Wood & Honed Stone Meet Unhurried Craft
              </motion.h2>

              <motion.p
                variants={fadeUp}
                className="text-sm sm:text-base text-[#777166] leading-relaxed font-sans"
              >
                BuddhaHome began with a quiet reverence for the tactile warmth,
                endurance, and honesty of solid timber and natural stone. In a
                world saturated with mass-manufactured plastics, we craft
                objects that bring grounded mindfulness to everyday rituals.
              </motion.p>

              <motion.p
                variants={fadeUp}
                className="text-sm sm:text-base text-[#777166] leading-relaxed font-sans"
              >
                Every tree log and travertine slab possesses an unrepeatable
                history. Our artisans gently sculpt, lathe-turn, and oil each
                piece so its knots, natural live edges, and geological fissures
                remain celebrated centerpieces of your living space.
              </motion.p>

              <motion.div variants={fadeUp} className="pt-2">
                <Button
                  to="/products"
                  variant="primary"
                  icon={ArrowRight}
                  iconPosition="right"
                >
                  Explore Portfolio Collection
                </Button>
              </motion.div>
            </motion.div>

          </div>
        </Container>
      </section>

      {/* CRAFTSMANSHIP PILLARS */}
      <section className="bg-white py-16 sm:py-24 border-y border-[#E8E3D9]">
        <Container>

          {/* SECTION HEADING */}
          <motion.div
            className="text-center max-w-2xl mx-auto mb-14"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.span
              variants={fadeUp}
              className="block text-xs font-semibold tracking-[0.2em] text-[#76501F] uppercase"
            >
              Honest Principles
            </motion.span>

            <motion.h2
              variants={fadeUp}
              className="text-3xl sm:text-4xl font-serif text-[#281A10] mt-2 mb-4"
            >
              What Shapes Every BuddhaHome Piece
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="text-sm text-[#777166]"
            >
              Our guidelines for creating enduring pieces that bring peace and
              natural character to your home.
            </motion.p>
          </motion.div>

          {/* CARDS */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            {pillars.map((pillar) => {
              const Icon = pillar.icon;

              return (
                <motion.div
                  key={pillar.title}
                  variants={{
                    hidden: { opacity: 0, y: 40 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.8, ease },
                    },
                  }}
                  whileHover={{
                    y: -8,
                    transition: { duration: 0.35, ease: "easeOut" },
                  }}
                  className="group p-8 rounded-2xl bg-[#F7F5F0] border border-[#E8E3D9] space-y-4 shadow-sm hover:border-[#B69A63] hover:shadow-[0_18px_45px_rgba(40,26,16,0.08)] transition-[border-color,box-shadow] duration-500"
                >
                  <motion.div
                    whileHover={{
                      scale: 1.1,
                      rotate: -5,
                      borderColor: "#B69A63",
                    }}
                    transition={{ duration: 0.35 }}
                    className="w-12 h-12 rounded-full bg-[#76501F]/15 border border-transparent flex items-center justify-center text-[#76501F]"
                  >
                    <Icon className="w-6 h-6" />
                  </motion.div>

                  <h3 className="font-serif text-xl text-[#281A10]">
                    {pillar.title}
                  </h3>

                  <p className="text-sm text-[#777166] leading-relaxed">
                    {pillar.description}
                  </p>

                  <div className="w-8 h-[1px] bg-[#B69A63]/60 transition-all duration-500 group-hover:w-14" />
                </motion.div>
              );
            })}
          </motion.div>

        </Container>
      </section>

      {/* WORKSHOP CONTACT CTA */}
      <section>
        <Container>
          <motion.div
            className="bg-[#281A10] text-white rounded-3xl p-8 sm:p-14 text-center max-w-4xl mx-auto space-y-6"
            initial={{ opacity: 0, y: 45 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1, ease }}
          >
            <motion.span
              className="block text-xs font-semibold tracking-[0.25em] text-[#B69A63] uppercase"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease }}
            >
              Direct Dialogue
            </motion.span>

            <motion.h2
              className="text-3xl sm:text-4xl font-serif tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease }}
            >
              Begin a Conversation with Our Studio
            </motion.h2>

            <motion.p
              className="text-sm sm:text-base text-[#E8E3D9]/80 max-w-xl mx-auto font-sans leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease }}
            >
              We are delighted to share timber slab photos, discuss custom
              dimensions, or explore bespoke corporate gifting and hospitality
              commissions.
            </motion.p>

            <motion.div
              className="pt-2 flex flex-wrap items-center justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3, ease }}
            >
              <Button to="/contact" variant="gold" size="lg">
                Contact Studio
              </Button>

              <Button to="/products" variant="subtle" size="lg">
                View Portfolio
              </Button>
            </motion.div>
          </motion.div>
        </Container>
      </section>

    </div>
  );
}
