"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { Lens } from "./ui/productlens";
import HeroButton from "./ui/animatedbutton";

// 🟢 Product Data (Make sure image paths are lowercase)
const PRODUCTS = [
  {
    slug: "Inlet-and-Outlet-Closure",
    name: "Inlet and Outlet closure",
    description:
      "Our inlet and outlet closure system ensures safe filling, dependable containment, and controlled emptying in every operation",
    image: "/Images/Products/inlet-outlet.png",
  },
  {
    slug: "Single-Loop",
    name: "Single Loop",
    description:
      "Built for efficient bulk material handling, the Single Loop FIBC combines high-strength woven polypropylene with a reinforced lifting loop to ensure safe transport, storage, and streamlined operations.",
    image: "/Images/Products/singleloop.png",
  },
  {
    slug: "ventilated",
    name: "Ventilated FIBC",
    description:
      "Designed with breathable woven panels that promote airflow, helping preserve the freshness and quality of agricultural products during storage and transportation.",
    image: "/Images/Products/vantilated.png",
  },
 {
  slug: "four-panel",
  name: "Four Panel Bag",
  description:
    "Constructed from four individually stitched fabric panels, the Four Panel FIBC maintains a stable square shape for efficient stacking, secure transportation, and optimal storage. Its reinforced design delivers reliable performance across a wide range of bulk material handling applications.",

  image: "/images/Products/four-pannel.png",
  texture: "/Images/Products/four-pannel.png",
 },
];

// Animation variants — alternate direction based on index (even = left, odd = right)
const cardVariants = {
  hidden: (index: number) => ({
    opacity: 0,
    x: index % 2 === 0 ? -60 : 60,
    y: 20,
  }),
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const headingVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

function ProductCard({
  product,
  index,
}: {
  product: (typeof PRODUCTS)[number];
  index: number;
}) {
  const [hovering, setHovering] = useState(false);

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      whileHover={{ y: -6 }}
      className="group flex flex-col rounded-2xl bg-white shadow-sm hover:shadow-xl hover:shadow-blue-900/10 transition-shadow duration-300 will-change-transform"
    >
      {/* Bigger image, no border/margin eating into it */}
      <Lens hovering={hovering} setHovering={setHovering}>
        <div className="relative aspect-square sm:aspect-[4/5] overflow-hidden rounded-2xl bg-blue-50/80">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-transparent to-blue-500/10 pointer-events-none z-10" />

          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </Lens>

      {/* No blur-on-hover, tight consistent padding */}
      <div className="flex flex-1 flex-col px-1 pt-2.5 pb-1 sm:pt-4">
        <h3 className="text-xs font-semibold text-slate-900 sm:text-base">
          {product.name}
        </h3>
        <p className="mt-1 flex-1 text-[0.7rem] leading-relaxed text-slate-500 sm:text-sm line-clamp-2 sm:line-clamp-none">
          {product.description}
        </p>

        {/* Button — matches hero button style, works on tap too */}
        <Link
          href={`/products/${product.slug}`}
          className="group/btn relative mt-2.5 sm:mt-4 inline-flex items-center justify-center gap-1.5 sm:gap-2 overflow-hidden rounded-full bg-blue-900 px-3 py-1.5 sm:px-4 sm:py-2.5 text-[0.6rem] sm:text-[0.7rem] font-semibold uppercase tracking-wide text-white shadow-sm transition-transform duration-200 active:scale-95 hover:scale-[1.02] touch-manipulation"
          style={{ WebkitTapHighlightColor: "transparent" }}
        >
          <span
            className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent"
            style={{ animation: "shine 2.8s ease-in-out infinite" }}
          />
          <span className="relative z-10">Read More</span>
          <ArrowRight className="relative z-10 h-3 w-3 sm:h-3.5 sm:w-3.5 transition-transform duration-300 group-hover/btn:translate-x-1 group-active/btn:translate-x-1" />

          <style jsx>{`
            @keyframes shine {
              0% {
                transform: translateX(-100%);
              }
              50%,
              100% {
                transform: translateX(100%);
              }
            }
          `}</style>
        </Link>
      </div>
    </motion.div>
  );
}

export default function ProductsSection() {
  return (
    <section className="relative overflow-hidden bg-white py-10 md:py-28">
      {/* ============ BACKGROUND EFFECTS — lighter on mobile ============ */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Kept everywhere, but smaller + cheaper blur on mobile */}
        <motion.div
          className="absolute -top-20 -left-20 h-64 w-64 rounded-full bg-blue-900/10 blur-2xl md:-top-32 md:-left-32 md:h-[500px] md:w-[500px] md:blur-3xl"
          animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-blue-600/8 blur-2xl md:-bottom-32 md:-right-32 md:h-[500px] md:w-[500px] md:blur-3xl"
          animate={{ x: [0, -30, 0], y: [0, -20, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Desktop-only extras — hidden on mobile for performance/battery */}
        <motion.div
          className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[600px] bg-blue-500/5 blur-3xl rounded-full"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="hidden md:block pointer-events-none absolute -top-16 -left-16 h-64 w-64">
          <motion.div
            className="h-full w-full rounded-full bg-gradient-to-br from-blue-900/5 to-blue-500/5"
            animate={{ scale: [1, 1.1, 1], rotate: [0, 45, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        <div className="hidden md:block pointer-events-none absolute top-1/4 right-0 h-48 w-48">
          <motion.div
            className="h-full w-full rounded-full border-2 border-dashed border-blue-900/10"
            animate={{ scale: [1, 1.15, 1], rotate: [0, -30, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.6 }}
          variants={headingVariants}
          className="mx-auto mb-6 md:mb-12 max-w-xl text-center"
        >
          <span className="inline-flex items-center gap-2 text-[0.6rem] sm:text-[0.7rem] font-semibold uppercase tracking-[0.2em] sm:tracking-[0.3em] text-blue-700">
            <span className="h-px w-8 bg-blue-700" />
            Our Products
          </span>
          <h2 className="mt-3 text-xl font-bold text-slate-900 sm:text-3xl md:text-4xl">
            FIBC Bags Built for Every Load
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
            Premium woven polypropylene bags engineered for industrial strength
            and reliability.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-3 sm:gap-5 md:gap-6 lg:grid-cols-4">
          {PRODUCTS.map((product, index) => (
            <ProductCard key={product.slug} product={product} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="mt-10 md:mt-12 flex justify-center"
        >
          <HeroButton href="/allProducts" variant="secondary">
            Explore All Products
          </HeroButton>
        </motion.div>
      </div>
    </section>
  );
}
