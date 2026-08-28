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
  { name: "Mining", icon: Pickaxe, desc: "Heavy-duty bulk material handling" },
  { name: "Minerals", icon: Gem, desc: "Refined ore & powder packaging" },
  { name: "Construction", icon: HardHat, desc: "Aggregate & sand transport" },
  { name: "Agriculture", icon: Wheat, desc: "Grain & fertilizer distribution" },
  { name: "Post & Parcel", icon: Package, desc: "Logistics & bulk shipments" },
  { name: "Chemical", icon: FlaskConical, desc: "Hazardous & UN-certified bags" },
  { name: "Disposal", icon: Trash2, desc: "Industrial waste containment" },
  { name: "Recycling", icon: Recycle, desc: "Eco-friendly reusable packaging" },
];

/* ---------------- Left column: heading entrance ---------------- */

const headingContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

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
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[300px] w-[600px] bg-blue-500/5 blur-3xl rounded-full" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-16">
          {/* ---- LEFT SIDE: Heading + Animated background ---- */}
          <div className="relative flex-1 lg:w-5/12">
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

          {/* ---- RIGHT SIDE: Larger Industry Grid Columns ---- */}
          <div className="flex-1 lg:w-7/12">
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-5"
            >
              {industries.map(({ name, icon: Icon, desc }, index) => (
                <motion.div
                  key={name}
                  custom={index}
                  variants={item}
                  whileHover={{
                    y: -6,
                    boxShadow: "0 20px 40px -15px rgba(27,58,107,0.15)",
                  }}
                  whileTap={{
                    y: -3,
                    scale: 0.98,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="group relative flex items-start gap-4 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:border-blue-400 hover:bg-blue-50/40 active:border-blue-400 touch-manipulation"
                  style={{ WebkitTapHighlightColor: "transparent" }}
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: -3 }}
                    whileTap={{ scale: 1.1, rotate: -3 }}
                    transition={{ duration: 0.25 }}
                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-900 transition-colors duration-300 group-hover:bg-blue-900 group-hover:text-white"
                  >
                    <Icon className="h-7 w-7" strokeWidth={1.8} />
                  </motion.div>

                  <div className="flex flex-col">
                    <span className="text-base font-bold text-slate-900 transition-colors duration-300 group-hover:text-blue-900 sm:text-lg">
                      {name}
                    </span>
                    <span className="mt-1 text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {desc}
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}