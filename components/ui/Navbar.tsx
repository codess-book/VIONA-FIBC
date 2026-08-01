"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Box } from "lucide-react";
import { Bebas_Neue, Inter, IBM_Plex_Mono } from "next/font/google";

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
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
  const pathname = usePathname();

  // Home/Hero has a dark background, so the navbar reads white there.
  // Every other page is on a white background, so it reads blue.
  // No scroll listener needed — this alone decides the theme, which
  // also means one less scroll-driven re-render on mobile.
  const isHome = pathname === "/";

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 bg-transparent ${inter.className}`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* --- LEFT: LOGO + COMPANY NAME --- */}
          <Link href="/" className="group flex items-center gap-3">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-md border transition-colors duration-200 ${
                isHome
                  ? "border-white/15 bg-white/[0.03] text-white/80 group-hover:text-blue-400"
                  : "border-blue-900/15 bg-blue-900/[0.04] text-blue-900 group-hover:text-blue-600"
              }`}
            >
              <Box className="h-5 w-5" strokeWidth={1.5} />
            </div>
            <span className="flex flex-col leading-none">
              <span
                className={`${bebasNeue.className} text-3xl tracking-[0.08em] transition-colors duration-200 ${
                  isHome
                    ? "text-white group-hover:text-blue-400"
                    : "text-blue-900 group-hover:text-blue-600"
                }`}
              >
                VIONA
              </span>
              <span
                className={`${plexMono.className} hidden text-[0.55rem] tracking-[0.3em] sm:block ${
                  isHome ? "text-white/40" : "text-blue-900/40"
                }`}
              >
                FIBC PACKAGING
              </span>
            </span>
          </Link>

          {/* --- RIGHT: DESKTOP MENU --- */}
          <div className="hidden items-center gap-9 md:flex">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-medium tracking-wide transition-colors duration-200 ${
                    isHome
                      ? isActive
                        ? "text-blue-400"
                        : "text-white/80 hover:text-blue-400"
                      : isActive
                        ? "text-blue-600"
                        : "text-blue-900/70 hover:text-blue-600"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}

            <Link
              href="/contact"
              className={`rounded-full border px-5 py-2.5 text-sm font-medium tracking-wide transition-colors duration-200 ${
                isHome
                  ? "border-white/20 text-white hover:border-blue-400 hover:bg-blue-400/10"
                  : "border-blue-900/25 text-blue-900 hover:border-blue-600 hover:bg-blue-600/10 hover:text-blue-600"
              }`}
            >
              Get a quote
            </Link>
          </div>

          {/* --- MOBILE HAMBURGER BUTTON --- */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`inline-flex items-center justify-center rounded-md p-2 transition-colors md:hidden ${
              isHome
                ? "text-white/80 hover:bg-white/[0.06] active:bg-white/10"
                : "text-blue-900 hover:bg-blue-900/[0.06] active:bg-blue-900/10"
            }`}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" strokeWidth={1.5} />
            ) : (
              <Menu className="h-6 w-6" strokeWidth={1.5} />
            )}
          </button>
        </div>
      </div>

      {/* --- MOBILE DROPDOWN MENU ---
          The trigger bar above stays fully transparent as requested, but
          the open dropdown needs a readable backdrop — links floating over
          whatever content happens to be behind them would be unreadable.
          It still follows the same white/blue theme as the rest of the nav. */}
      <div
        className={`fixed left-0 right-0 top-16 overflow-hidden border-b transition-all duration-300 md:hidden ${
          isHome
            ? "border-white/10 bg-[#0A0A0B]/95"
            : "border-blue-900/10 bg-white/95"
        } ${isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="flex flex-col space-y-1 px-4 py-6">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`w-fit rounded-lg px-3 py-2.5 text-base font-medium transition-colors duration-200 ${
                  isHome
                    ? isActive
                      ? "text-blue-400"
                      : "text-white/80 active:bg-white/5"
                    : isActive
                      ? "text-blue-600"
                      : "text-blue-900/80 active:bg-blue-900/5"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          <div
            className={`mt-3 border-t pt-4 ${
              isHome ? "border-white/10" : "border-blue-900/10"
            }`}
          >
            <Link
              href="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`inline-block w-full rounded-full border px-5 py-3 text-center text-sm font-medium tracking-wide transition-colors duration-200 active:scale-[0.98] ${
                isHome
                  ? "border-white/20 text-white hover:border-blue-400 hover:bg-blue-400/10"
                  : "border-blue-900/25 text-blue-900 hover:border-blue-600 hover:bg-blue-600/10"
              }`}
            >
              Get a quote
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}