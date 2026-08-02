"use client";

import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { motion } from "motion/react";
import { Bebas_Neue, Inter, IBM_Plex_Mono } from "next/font/google";
import { FaLinkedin } from "react-icons/fa";

const footerProducts = [
  "FIBC's",
  "Types of Bag (A, B, C)",
  "Platten Bag",
  "Hood Bag",
  "Silo bag",
  "PP Small Bag",
  "Valve Bag",
  "Jute Bag",
  "Onion mesh Bag",
  "Gazette Bag",
  "Ventilated Bag",
  "Tarpaulin",
  "BOPP",
];
 const bebasNeue = Bebas_Neue({
    subsets: ["latin"],
    weight: "400",
  });

export default function Footer() {
  const currentYear = new Date().getFullYear();
 
  return (
    <footer className="relative w-full bg-[#0A0A0B]/95 border-t border-white/5 shadow-[0_-4px_20px_rgba(59,130,246,0.15)]">
      {/* ---- Subtle Top Glow (Blue) ---- */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[2px] w-32 bg-gradient-to-r from-transparent via-blue-500 to-transparent blur-sm" />

      {/* ---- Light Blue Checkered Grid Background ---- */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-10 pb-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* ---- Column 1: Address ---- */}
          <div className="flex flex-col space-y-2">
            <h3  className={`${bebasNeue.className} text-2xl sm:text-3xl tracking-[0.06em] sm:tracking-[0.08em] text-white transition-colors duration-300 group-hover:text-[#8FA8C4]`}>
              Address
            </h3>
            <div className="flex flex-col space-y-1.5 text-sm text-slate-400 font-sans">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-blue-400 shrink-0 mt-0.5" />
                <p className="leading-snug">
                  <span className="font-semibold text-slate-200">
                    Office Address:
                  </span>
                  <br />
                  15/2 Tatya Tope Marg,
                  <br />
                  Freeganj, Ujjain - 456010,
                  <br />
                  Madhya Pradesh (India)
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-blue-400" />
                <a
                  href="mailto:info@vionafibc.com"
                  className="text-slate-400 hover:text-blue-400 transition-colors text-sm"
                >
                  info@vionafibc.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 text-blue-400" />
                <a
                  href="tel:+917992392070"
                  className="text-slate-400 hover:text-blue-400 transition-colors text-sm"
                >
                  +91 7992392070
                </a>
              </div>
            </div>
          </div>

          {/* ---- Column 2: Our Products ---- */}
          <div className="flex flex-col space-y-2">
            <h3 
           className={`${bebasNeue.className} text-2xl sm:text-3xl tracking-[0.06em] sm:tracking-[0.08em] text-white transition-colors duration-300 group-hover:text-[#8FA8C4]`}>
              Our Products
            </h3>
            <ul className="grid grid-cols-1 gap-y-0.5 text-sm text-slate-400 font-sans">
              {footerProducts.map((product) => (
                <li key={product}>
                  <Link
                    href={`/products/${product.toLowerCase().replace(/\s+/g, "-").replace(/[()]/g, "")}`}
                    className="relative inline-block hover:text-blue-400 transition-colors duration-200 group"
                  >
                    {product}
                    <span className="absolute -bottom-1 left-0 h-[1px] w-0 bg-blue-500 transition-all duration-300 group-hover:w-full" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ---- Column 3: Business Hours ---- */}
          <div className="flex flex-col space-y-2">
            <h3  className={`${bebasNeue.className} text-2xl sm:text-3xl tracking-[0.06em] sm:tracking-[0.08em] text-white transition-colors duration-300 group-hover:text-[#8FA8C4]`}>
              Business Hours
            </h3>
            <div className="flex flex-col space-y-0.5 text-sm text-slate-400 font-sans">
              <p>
                Mon - Sat:{" "}
                <span className="font-medium text-slate-200">8am – 7pm</span>
              </p>
              <p>
                Sunday: <span className="font-medium text-red-400">Closed</span>
              </p>
            </div>

            <div className="mt-2 flex items-center gap-2.5">
              <a
                href="https://www.linkedin.com/company/viona-fibc-private-limited/"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-400 transition-all duration-300 hover:border-blue-500 hover:bg-blue-500 hover:text-white hover:shadow-lg hover:shadow-blue-500/20"
              >
                <FaLinkedin className="h-4 w-4" />
              </a>
              <a
                href="mailto:info@vionafibc.com"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-400 transition-all duration-300 hover:border-blue-500 hover:bg-blue-500 hover:text-white hover:shadow-lg hover:shadow-blue-500/20"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* ---- Column 4: Brand Info ---- */}
          <div className="flex flex-col space-y-2">
            <div className="flex items-center gap-2">
              {/* <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white font-serif font-bold text-lg shadow-md shadow-blue-500/20">
                V
              </div> */}
              <img
                src="/Images/logo/logo.png"
                alt="VIONA Logo"
                className="h-12 w-auto object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
              <span className={`${bebasNeue.className} text-2xl sm:text-3xl tracking-[0.06em] sm:tracking-[0.08em] text-white transition-colors duration-300 group-hover:text-[#8FA8C4]`}>
                VIONA
              </span>
            </div>

            <p className="text-sm leading-relaxed text-slate-400 font-sans">
              VIONA-FIBC Pvt. Ltd. – India based manufacturer of premium Big
              Bags, driven by innovation and technology.
            </p>

            <div className="mt-0.5">
              {/* <img
                src="/Images/logo/logo.png"
                alt="VIONA Logo"
                className="h-12 w-auto object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              /> */}
            </div>
          </div>
        </div>

        {/* ---- Bottom Row: Copyright + Credits ---- */}
        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-4 sm:flex-row">
          <p className="text-[10px] font-medium text-slate-500 tracking-wide">
            &copy; {currentYear} VIONA-FIBC Pvt. Ltd. All rights reserved.
          </p>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-[10px] font-medium text-slate-500"
          >
            Developed &amp; Designed by{" "}
            <span className="text-blue-400 hover:text-blue-300 transition-colors">
              codes.book
            </span>
          </motion.p>
        </div>
      </div>
    </footer>
  );
}
