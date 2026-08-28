"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Send,
  MapPin,
  Phone,
  Mail,
  User,
  AtSign,
  Clock,
  MessageSquare,
  Building2,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-50px" });

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-white py-20 md:py-28"
    >
      {/* ==================== BACKGROUND TEXTURES (DOTS & CHECKS) ==================== */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* 1. Light Grey Grid Checks Pattern */}
        <div
          className="absolute inset-0 opacity-[0.4]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(203, 213, 225, 0.5) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(203, 213, 225, 0.5) 1px, transparent 1px)
            `,
            backgroundSize: "32px 32px",
          }}
        />

        {/* 2. Light Grey Micro Dots Texture */}
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage: `radial-gradient(rgba(100, 116, 139, 0.3) 1.2px, transparent 1.2px)`,
            backgroundSize: "16px 16px",
          }}
        />

        {/* 3. Radial Mask Effect (Edges par pattern soft aur fade-out lagta hai) */}
        <div className="absolute inset-0 bg-gradient-to-tr from-slate-50 via-transparent to-slate-50 opacity-80" />

        {/* Ambient Subtle Color Glows */}
        <div className="absolute top-0 right-0 -mt-20 -mr-20 h-96 w-96 rounded-full bg-blue-300/20 blur-3xl" />
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 h-96 w-96 rounded-full bg-cyan-300/20 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8 items-center">
          {/* ==================== LEFT: CONTACT FORM (7 COLS) ==================== */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">
              <span className="h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
              Get in Touch
            </span>

            <h2 className="mt-3 text-3xl font-extrabold text-slate-900 sm:text-4xl lg:text-5xl">
              Let’s{" "}
              <span className="bg-gradient-to-r from-blue-900 via-blue-700 to-blue-500 bg-clip-text text-transparent">
                Connect.
              </span>
            </h2>

            <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-xl">
              Reach out to us for bulk packaging inquiries, customized
              solutions, or partnership opportunities. We respond within 24
              hours.
            </p>

            {/* Form Card */}
            <form className="relative mt-8 space-y-4 rounded-3xl border border-slate-200/80 bg-white/90 p-6 sm:p-8 shadow-xl shadow-slate-900/5 backdrop-blur-md">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 mb-1.5">
                    <User className="h-3.5 w-3.5 text-blue-600" /> Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                  />
                </div>
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 mb-1.5">
                    <AtSign className="h-3.5 w-3.5 text-blue-600" /> Email
                  </label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 mb-1.5">
                  <Phone className="h-3.5 w-3.5 text-blue-600" /> Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
              </div>

              <div>
                <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 mb-1.5">
                  <MessageSquare className="h-3.5 w-3.5 text-blue-600" />{" "}
                  Message / Requirement
                </label>
                <textarea
                  rows={4}
                  placeholder="Tell us about your packaging requirements, quantity, or specific details..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 resize-none transition-all"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-900 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-900/25 transition-all hover:bg-blue-800"
              >
                Send Message <Send className="h-4 w-4" />
              </motion.button>
            </form>
          </motion.div>

          {/* ==================== RIGHT: CONTACT CARDS & INFO (5 COLS) ==================== */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-5 flex flex-col gap-5"
          >
            {/* Quick Contact Banner Card */}
            <div className="rounded-3xl border border-blue-200/60 bg-gradient-to-br from-blue-900 to-slate-900 p-8 text-white shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 translate-x-4 -translate-y-4 text-white/5">
                <Sparkles className="h-40 w-40" />
              </div>

              <div className="relative z-10">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/20 px-3 py-1 text-xs font-medium text-blue-300 border border-blue-400/30">
                  <Clock className="h-3.5 w-3.5" /> Fast Response Guaranteed
                </span>
                <h3 className="mt-4 text-2xl font-bold">Prefer Direct Talk?</h3>
                <p className="mt-2 text-xs text-blue-100/80 leading-relaxed">
                  Our team is available Monday to Saturday to assist you with
                  quick queries and immediate quotes.
                </p>

                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <a
                    href="tel:+917992392070"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs font-bold text-slate-900 hover:bg-blue-50 transition-colors"
                  >
                    <Phone className="h-3.5 w-3.5 text-blue-600" /> Call Now
                  </a>
                  <a
                    href="https://wa.me/917992392070"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500/20 border border-emerald-400/30 px-4 py-2.5 text-xs font-bold text-emerald-300 hover:bg-emerald-500/30 transition-colors"
                  >
                    WhatsApp <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Info Grid Cards */}
            <div className="grid grid-cols-1 gap-4">
              {/* Address Card */}
              <div className="group flex items-start gap-4 rounded-2xl border border-slate-200/80 bg-white/90 p-5 shadow-sm transition-all hover:border-blue-300 hover:shadow-md">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Building2 className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    Headquarters
                  </h4>
                  <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                    15/2 Tatya Tope Marg Freeganj Ujjain- 456010 Madhya Pradesh
                    (India)
                  </p>
                </div>
              </div>

              {/* Email Card */}
              <div className="group flex items-start gap-4 rounded-2xl border border-slate-200/80 bg-white/90 p-5 shadow-sm transition-all hover:border-blue-300 hover:shadow-md">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    Email Support
                  </h4>
                  <p className="mt-1 text-xs text-slate-600">
                    <a
                      href="mailto:info@viona.com"
                      className="hover:text-blue-700 transition-colors"
                    >
                      info@viona.com
                    </a>
                  </p>
                  <p className="mt-1 text-xs text-slate-600">
                    <a
                      href="export@vionafibc.com"
                      className="hover:text-blue-700 transition-colors"
                    >
                      export@vionafibc.com
                    </a>
                  </p>
                  <p className="mt-1 text-xs text-slate-600">
                    <a
                      href="Marketing@vionafibc.com"
                      className="hover:text-blue-700 transition-colors"
                    >
                      Marketing@vionafibc.com
                    </a>
                  </p>
                </div>
              </div>

              {/* Working Hours Card */}
              <div className="group flex items-start gap-4 rounded-2xl border border-slate-200/80 bg-white/90 p-5 shadow-sm transition-all hover:border-blue-300 hover:shadow-md">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    Business Hours
                  </h4>
                  <p className="mt-1 text-xs text-slate-600">
                    Mon - Sat: 8:00 AM - 7:00 PM IST
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
