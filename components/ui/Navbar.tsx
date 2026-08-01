"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, Box } from "lucide-react";
import { Bebas_Neue, Inter } from "next/font/google";
import ContactSection from "../contact";
// Display face for the logo wordmark — bold, condensed, stamped —
// fits an industrial packaging brand far better than a generic sans.
const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
});

// Body face for nav links — clean and highly legible at small sizes.
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Products", href: "/allProducts" },

  { name: "Quality", href: "/quality" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 ${
        isScrolled
          ? "bg-[#0B0C10]/90 backdrop-blur-xl border-white/10 shadow-lg shadow-black/20"
          : "bg-white/[0.03] backdrop-blur-lg border-white/[0.08] shadow-lg shadow-black/5"
      } ${inter.className} text-white`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* --- LEFT: LOGO + COMPANY NAME --- */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-white/20 to-blue-500/20 border border-white/30 text-white group-hover:border-blue-400 transition-all duration-300 shadow-lg shadow-blue-500/20">
              <Box className="h-5 w-5" />
              <span className="absolute inset-0 rounded-xl border border-blue-400/0 group-hover:border-blue-400/60 group-hover:animate-ping" />
            </div>
            <span
              className={`${bebasNeue.className} text-3xl tracking-[0.08em] text-white group-hover:text-blue-400 transition-colors duration-300`}
            >
              VIONA
            </span>
          </Link>

          {/* --- RIGHT: DESKTOP MENU --- */}
          <div className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="relative text-sm font-medium tracking-wide text-white/80 hover:text-blue-400 transition-colors duration-200 group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-blue-400 transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}

            <Link
              href="/contact"
              className="rounded-full border border-white/30 bg-white/5 px-5 py-2.5 text-sm font-medium tracking-wide text-white shadow-lg transition-all duration-300 hover:bg-blue-500 hover:border-blue-500 hover:text-white hover:shadow-blue-500/40"
            >
              Get a Quote
            </Link>
          </div>

          {/* --- MOBILE HAMBURGER BUTTON --- */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-white transition-colors hover:bg-white/10 active:bg-blue-500/20"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* --- MOBILE DROPDOWN MENU --- */}
      <div
        className={`md:hidden fixed left-0 right-0 top-16 overflow-hidden bg-[#0B0C10]/90 backdrop-blur-xl border-b border-white/10 transition-all duration-300 ${
          isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col space-y-3 px-4 py-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="relative text-base font-medium text-white/80 hover:text-blue-400 transition-colors duration-200 active:bg-white/5 active:px-3 active:py-2 active:-mx-3 active:rounded-lg w-fit group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-blue-400 transition-all duration-300 group-hover:w-full active:w-full" />
            </Link>
          ))}
          <div className="pt-4 border-t border-white/10">
            <Link
              href="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="inline-block w-full rounded-full border border-white/30 bg-white/5 px-5 py-3 text-center text-sm font-medium tracking-wide text-white shadow-lg transition-all duration-300 hover:bg-blue-500 hover:border-blue-500 hover:text-white active:scale-95"
            >
              Get a Quote
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
