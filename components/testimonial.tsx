"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import { AnimatedTooltip } from "./ui/animated-testimonial";
import { Star, Quote, ChevronLeft, ChevronRight, Sparkles, Heart } from "lucide-react";

// ---------- People Data for AnimatedTooltip ----------
const people = [
  {
    id: 1,
    name: "Melanie",
    designation: "Supply Chain Manager - Global Imports Ltd.",
    image:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=3387&q=80",
  },
  {
    id: 2,
    name: "John",
    designation: "Operations Director - Industrial Packaging Co.",
    image:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 3,
    name: "Peter",
    designation: "Procurement Head - Minerals & Logistics Group",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
  },
];

// ---------- REAL TESTIMONIAL DATA ----------
const testimonials = [
  {
    id: 1,
    name: "Melanie",
    role: "Supply Chain Manager",
    company: "Global Imports Ltd.",
    quote:
      "Real testimonial, good quality products delivered on time as committed. I have ordered one 40ft container FIBC from Viona Flexible Packaging Pvt Ltd and I got the good quality product on time. Me and my team is very satisfied from their service. Good luck team Viona!",
    rating: 5,
    avatar: people[0].image,
  },
  {
    id: 2,
    name: "John",
    role: "Operations Director",
    company: "Industrial Packaging Co.",
    quote:
      "Excellent service! Looking forward to do more business in future with them. Their commitment to quality and delivery timelines is truly impressive.",
    rating: 5,
    avatar: people[1].image,
  },
  {
    id: 3,
    name: "Peter",
    role: "Procurement Head",
    company: "Minerals & Logistics Group",
    quote:
      "I placed a bulk order for FIBC bags and Viona exceeded my expectations. The quality is top-notch and the team is very professional. Highly recommended!",
    rating: 5,
    avatar: people[2].image,
  },
];

// ---------- Star Rating Component ----------
const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`h-3.5 w-3.5 ${
            i < rating
              ? "fill-blue-500 text-blue-500"
              : "fill-gray-300 text-gray-300"
          }`}
        />
      ))}
    </div>
  );
};

// ---------- Main Component ----------
export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play for the carousel
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handlePrev = () => {
    setIsAutoPlaying(false);
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-white py-20 md:py-28"
    >
      {/* ============ LIGHT BLUE CHECKERED GRID BACKGROUND ============ */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div 
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(to right, #2563EB 1px, transparent 1px), linear-gradient(to bottom, #2563EB 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />
        
        {/* Subtle Glows */}
        <motion.div
          className="absolute -top-32 -left-32 h-[500px] w-[500px] rounded-full bg-blue-400/10 blur-3xl"
          animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-32 -right-32 h-[500px] w-[500px] rounded-full bg-blue-400/8 blur-3xl"
          animate={{ x: [0, -40, 0], y: [0, -30, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        
        {/* ---- Section Header ---- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-blue-700">
            <span className="h-px w-8 bg-blue-700" />
            Testimonials
          </span>

          <h2 className="mt-4 text-4xl font-bold text-slate-900 sm:text-5xl lg:text-6xl">
            What Our{" "}
            <span className="bg-gradient-to-r from-blue-900 to-blue-500 bg-clip-text text-transparent">
              Clients Say
            </span>
          </h2>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mx-auto mt-4 h-[3px] w-20 rounded-full bg-gradient-to-r from-blue-900 to-blue-500"
          />

          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-500">
            Hear from industry leaders who trust VIONA for their bulk packaging needs.
          </p>
        </motion.div>

        {/* ============================================================ */}
        {/* ---- 3D CLOCKWISE ROTATING CAROUSEL (COMPACT) ---- */}
        {/* ============================================================ */}
        <div className="relative flex flex-col items-center justify-center mt-4">
          
          {/* 3D Container - Height reduced */}
          <div className="relative h-[320px] w-full max-w-3xl perspective-1500">
            
            <AnimatePresence mode="wait">
              {testimonials.map((testimonial, idx) => {
                let position = (idx - activeIndex + testimonials.length) % testimonials.length;
                
                // Center Card (Active)
                if (position === 0) {
                  return (
                    <motion.div
                      key={testimonial.id}
                      initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
                      animate={{ 
                        opacity: 1, 
                        scale: 1, 
                        rotateY: 0,
                        x: 0,
                        z: 0
                      }}
                      exit={{ 
                        opacity: 0, 
                        scale: 0.8, 
                        rotateY: 90,
                        x: 300,
                        transition: { duration: 0.6 }
                      }}
                      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute inset-0 flex items-center justify-center"
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      {/* COMPACT CENTER CARD */}
                      <div className="w-full max-w-lg rounded-2xl bg-white/90 backdrop-blur-xl border border-blue-200/30 p-6 shadow-2xl shadow-blue-900/10">
                        <div className="flex items-start justify-between">
                          <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-blue-500/30">
                            <img src={testimonial.avatar} alt={testimonial.name} className="h-full w-full object-cover" />
                          </div>
                          <Quote className="h-8 w-8 text-blue-400/20" />
                        </div>
                        
                        <div className="mt-3">
                          <StarRating rating={testimonial.rating} />
                          <p className="mt-3 text-sm leading-relaxed text-slate-700 line-clamp-4">
                            &ldquo;{testimonial.quote}&rdquo;
                          </p>
                        </div>
                        
                        <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
                          <div>
                            <p className="text-sm font-semibold text-slate-900">{testimonial.name}</p>
                            <p className="text-[10px] text-slate-500">
                              {testimonial.role} <span className="text-blue-400/40">·</span> {testimonial.company}
                            </p>
                          </div>
                          <Heart className="h-4 w-4 text-pink-400/70 animate-pulse" />
                        </div>
                      </div>
                    </motion.div>
                  );
                } 
                // Next card (Right side)
                else if (position === 1) {
                  return (
                    <motion.div
                      key={testimonial.id}
                      initial={{ opacity: 0, x: 300, rotateY: 90, scale: 0.8 }}
                      animate={{ 
                        opacity: 0.5, 
                        x: 250, 
                        rotateY: 45, 
                        scale: 0.7,
                        filter: "blur(1px)"
                      }}
                      exit={{ opacity: 0, x: 500 }}
                      transition={{ duration: 0.7 }}
                      className="absolute right-0 top-1/2 -translate-y-1/2"
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      <div className="w-64 rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200 p-5 shadow-lg pointer-events-none">
                        <StarRating rating={testimonial.rating} />
                        <p className="mt-2 text-xs text-slate-600 line-clamp-3">
                          &ldquo;{testimonial.quote.slice(0, 60)}...&rdquo;
                        </p>
                        <p className="mt-3 text-[10px] font-semibold text-slate-900">{testimonial.name}</p>
                      </div>
                    </motion.div>
                  );
                } 
                // Previous card (Left side)
                else if (position === 2) {
                  return (
                    <motion.div
                      key={testimonial.id}
                      initial={{ opacity: 0, x: -300, rotateY: -90, scale: 0.8 }}
                      animate={{ 
                        opacity: 0.5, 
                        x: -250, 
                        rotateY: -45, 
                        scale: 0.7,
                        filter: "blur(1px)"
                      }}
                      exit={{ opacity: 0, x: -500 }}
                      transition={{ duration: 0.7 }}
                      className="absolute left-0 top-1/2 -translate-y-1/2"
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      <div className="w-64 rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200 p-5 shadow-lg pointer-events-none">
                        <StarRating rating={testimonial.rating} />
                        <p className="mt-2 text-xs text-slate-600 line-clamp-3">
                          &ldquo;{testimonial.quote.slice(0, 60)}...&rdquo;
                        </p>
                        <p className="mt-3 text-[10px] font-semibold text-slate-900">{testimonial.name}</p>
                      </div>
                    </motion.div>
                  );
                }
                return null;
              })}
            </AnimatePresence>
          </div>

          {/* ---- Carousel Controls ---- */}
          <div className="mt-6 flex items-center justify-center gap-6">
            <button
              onClick={handlePrev}
              className="group rounded-full border border-slate-200 bg-white p-2.5 text-slate-500 shadow-sm transition-all hover:border-blue-500 hover:bg-blue-500 hover:text-white"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            
            <div className="flex gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setIsAutoPlaying(false);
                    setActiveIndex(idx);
                  }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === activeIndex
                      ? "w-6 bg-gradient-to-r from-blue-900 to-blue-500"
                      : "w-2 bg-slate-300 hover:bg-slate-400"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="group rounded-full border border-slate-200 bg-white p-2.5 text-slate-500 shadow-sm transition-all hover:border-blue-500 hover:bg-blue-500 hover:text-white"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* ============================================================ */}
        {/* ---- BOTTOM: Trusted Leaders (AnimatedTooltip) ---- */}
        {/* ============================================================ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 flex flex-col items-center justify-center pt-6 border-t border-slate-200"
        >
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-blue-900/30" />
              <span className="text-[0.6rem] font-medium uppercase tracking-[0.2em] text-blue-900/60">
                Trusted Leaders
              </span>
              <span className="h-px w-8 bg-blue-900/30" />
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              <AnimatedTooltip items={people} />
            </div>
            <p className="text-center text-xs text-slate-400">
              Industry experts who rely on VIONA
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}