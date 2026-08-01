"use client";

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { Lens } from './ui/productlens';

// 🟢 Product Data (Make sure image paths are lowercase)
const PRODUCTS = [
  {
    slug: 'u-panel-fibc',
    name: 'U-Panel FIBC Bags',
    description: 'High load stability for palletized bulk transport.',
    image: '/images/factory3.jpg',
  },
  {
    slug: '4-panel-fibc',
    name: '4-Panel FIBC Bags',
    description: 'Uniform shape, efficient for automated filling lines.',
    image: '/images/products/singleloop.png',
  },
  {
    slug: 'baffle-bags',
    name: 'Baffle Bags',
    description: 'Square profile that maximizes container space.',
    image: '/images/factory3.jpg',
  },
  {
    slug: 'food-grade-fibc',
    name: 'Food Grade FIBC Bags',
    description: 'FDA-compliant bags for grains, sugar & edible oils.',
    image: '/images/factory3.jpg',
  },
];

function ProductCard({ product }: { product: (typeof PRODUCTS)[number] }) {
  const [hovering, setHovering] = useState(false);

  return (
    <div className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-4 shadow-sm hover:shadow-xl hover:shadow-blue-900/10 transition-all duration-300">
      {/* Lens Effect (Zoom on Hover) */}
      <Lens hovering={hovering} setHovering={setHovering}>
        <div className="relative aspect-square overflow-hidden rounded-xl bg-blue-50/80">
          
          {/* Navy Blue + Light Blue Gradient Overlay on Image */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-transparent to-blue-500/10 pointer-events-none z-10" />
          
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </Lens>

      <motion.div
        animate={{ filter: hovering ? 'blur(2px)' : 'blur(0px)' }}
        className="flex flex-1 flex-col pt-4"
      >
        <h3 className="text-sm font-semibold text-slate-900 sm:text-base">{product.name}</h3>
        <p className="mt-1 flex-1 text-xs leading-relaxed text-slate-500 sm:text-sm">
          {product.description}
        </p>

        <Link
          href={`/products/${product.slug}`}
          className="group mt-4 inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-wide text-blue-700 transition-all duration-300 hover:bg-blue-900 hover:border-blue-900 hover:text-white"
        >
          Read More
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </motion.div>
    </div>
  );
}

export default function ProductsSection() {
  return (
    <section className="relative overflow-hidden bg-white py-20 md:py-28">
      
      {/* ============ PREMIUM ANIMATED BACKGROUND EFFECTS ============ */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        
        {/* 1. Pulsing Glow Blobs (Navy & Light Blue) */}
        <motion.div
          className="absolute -top-32 -left-32 h-[500px] w-[500px] rounded-full bg-blue-900/10 blur-3xl"
          animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-32 -right-32 h-[500px] w-[500px] rounded-full bg-blue-600/8 blur-3xl"
          animate={{ x: [0, -40, 0], y: [0, -30, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* 2. Central Breathing Glow */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[600px] bg-blue-500/5 blur-3xl rounded-full"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* 3. Floating Geometric Shapes (Left Top) */}
        <div className="pointer-events-none absolute -top-16 -left-16 h-64 w-64">
          <motion.div
            className="h-full w-full rounded-full bg-gradient-to-br from-blue-900/5 to-blue-500/5"
            animate={{ scale: [1, 1.1, 1], rotate: [0, 45, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        {/* 4. Rotating Dashed Ring (Right Side) */}
        <div className="pointer-events-none absolute top-1/4 right-0 h-48 w-48">
          <motion.div
            className="h-full w-full rounded-full border-2 border-dashed border-blue-900/10"
            animate={{ scale: [1, 1.15, 1], rotate: [0, -30, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto mb-12 max-w-xl text-center">
          <span className="inline-flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-blue-700">
            <span className="h-px w-8 bg-blue-700" />
            Our Products
          </span>
          <h2 className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl">
            FIBC Bags Built for Every Load
          </h2>
          <p className="mt-2 text-sm text-slate-500 max-w-md mx-auto">
            Premium woven polypropylene bags engineered for industrial strength and reliability.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-5 sm:gap-6 lg:grid-cols-4">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>

        {/* "Explore All Products" Button - Premium Glassmorphism Style */}
        <div className="mt-12 flex justify-center">
          <Link
            href="/products"
            className="group inline-flex items-center gap-2 rounded-full border border-blue-300/50 bg-white/80 px-8 py-3 text-sm font-semibold text-blue-700 shadow-md backdrop-blur-md transition-all duration-300 hover:border-blue-900 hover:bg-blue-900 hover:text-white hover:shadow-xl hover:shadow-blue-900/20"
          >
            Explore All Products
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}