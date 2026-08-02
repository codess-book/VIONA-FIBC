"use client";

import { motion } from "motion/react";
import {
  Pickaxe, // Mining
  Gem, // Minerals
  HardHat, // Construction
  Wheat, // Agriculture
  Package, // Post & Parcel
  FlaskConical, // Chemical
  Trash2, // Disposal / Recycling
  Recycle,
} from "lucide-react";
import type { Variants } from "motion/react";
import HeroButton from "./ui/animatedbutton";

// ✅ Original Industries List with Accurate Icons
const industries = [
  { name: "Mining", icon: Pickaxe },
  { name: "Minerals", icon: Gem },
  { name: "Construction", icon: HardHat },
  { name: "Agriculture", icon: Wheat },
  { name: "Post & Parcel", icon: Package },
  { name: "Chemical", icon: FlaskConical },
  { name: "Disposal", icon: Trash2 },
  { name: "Recycling", icon: Recycle },
];

/* ---------------- Left column: heading entrance ---------------- */

const headingContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

// eyebrow + underline + paragraph + button slide up
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

// heading itself slides in from the left
const slideFromLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ---------------- Right column: industry grid ---------------- */

const container: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
};

// alternate left/right based on index (set via custom prop)
const item: Variants = {
  hidden: (index: number) => ({
    opacity: 0,
    x: index % 2 === 0 ? -30 : 30,
    y: 14,
  }),
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function SupportingIndustries() {
  return (
    <section className="relative overflow-hidden bg-white py-24 md:py-32">
      {/* ---- Premium Background Navy Blue & Light Blue Glows ---- */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-blue-900/5 blur-3xl"
          animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-blue-600/5 blur-3xl"
          animate={{ x: [0, -40, 0], y: [0, -30, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Central Soft Blue Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[300px] w-[600px] bg-blue-500/5 blur-3xl rounded-full" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-16">
          {/* ---- LEFT SIDE: Heading + Animated background ---- */}
          <div className="relative flex-1 lg:w-5/12">
            {/* Premium Geometric Shapes */}
            <div className="pointer-events-none absolute -top-16 -left-16 h-64 w-64">
              <motion.div
                className="h-full w-full rounded-full bg-gradient-to-br from-blue-900/5 to-blue-500/5"
                animate={{ scale: [1, 1.1, 1], rotate: [0, 45, 0] }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>
            <div className="pointer-events-none absolute -bottom-8 right-0 h-40 w-40">
              <motion.div
                className="h-full w-full rounded-full border-2 border-dashed border-blue-900/10"
                animate={{ scale: [1, 1.2, 1], rotate: [0, -30, 0] }}
                transition={{
                  duration: 25,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>

            <motion.div
              variants={headingContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="relative"
            >
              <motion.span
                variants={fadeUp}
                className="inline-flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-blue-700"
              >
                <span className="h-px w-8 bg-blue-700" />
                Industries we empower
              </motion.span>

              <motion.h2
                variants={slideFromLeft}
                className="mt-5 font-display text-4xl font-black uppercase leading-[0.95] text-slate-900 sm:text-5xl lg:text-5xl"
              >
                Supporting{" "}
                <span className="bg-gradient-to-r from-blue-900 to-blue-500 bg-clip-text text-transparent">
                  Businesses
                </span>{" "}
                Across Industries
              </motion.h2>

              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.7,
                  delay: 0.3,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{ transformOrigin: "left" }}
                className="mt-6 h-[3px] w-20 rounded-full bg-gradient-to-r from-blue-900 to-blue-500"
              />

              <motion.p
                variants={fadeUp}
                className="mt-4 text-base text-slate-600 sm:text-lg"
              >
                From mining to recycling, our FIBC bulk packaging solutions
                drive your industry forward with strength and reliability.
              </motion.p>

              <motion.div variants={fadeUp} className="mt-6 inline-block">
                <HeroButton href="/contact" variant="primary">
                  Let&apos;s talk
                </HeroButton>
              </motion.div>
            </motion.div>
          </div>

          {/* ---- RIGHT SIDE: Industry Grid ---- */}
          <div className="flex-1 lg:w-7/12">
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
            >
              {industries.map(({ name, icon: Icon }, index) => (
                <motion.div
                  key={name}
                  custom={index}
                  variants={item}
                  whileHover={{
                    y: -6,
                    boxShadow: "0 12px 40px -12px rgba(27,58,107,0.2)",
                  }}
                  whileTap={{
                    y: -3,
                    scale: 0.98,
                    boxShadow: "0 8px 28px -10px rgba(27,58,107,0.25)",
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="group flex flex-col items-center rounded-2xl border border-slate-200 bg-white p-5 text-center transition-colors duration-300 hover:border-blue-400 hover:bg-blue-50/50 active:border-blue-400 active:bg-blue-50/50 touch-manipulation"
                  style={{ WebkitTapHighlightColor: "transparent" }}
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: -3 }}
                    whileTap={{ scale: 1.1, rotate: -3 }}
                    transition={{ duration: 0.25 }}
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-900 transition-colors duration-300 group-hover:bg-blue-900 group-hover:text-white group-active:bg-blue-900 group-active:text-white"
                  >
                    <Icon className="h-6 w-6" strokeWidth={1.8} />
                  </motion.div>
                  <span className="mt-2.5 text-xs font-semibold text-slate-800 transition-colors duration-300 group-hover:text-blue-800 group-active:text-blue-800 sm:text-sm">
                    {name}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}