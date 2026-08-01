"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Box } from "lucide-react";
import { Bebas_Neue, Inter, IBM_Plex_Mono } from "next/font/google";

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

// Utility face — same technical/spec voice used in the Hero.
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
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 border-b transition-colors duration-300 ${
        isScrolled
          ? "border-white/10 bg-[#0A0A0B]/90 backdrop-blur-xl"
          : "border-white/[0.06] bg-[#0A0A0B]/40 backdrop-blur-lg"
      } ${inter.className} text-white`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* --- LEFT: LOGO + COMPANY NAME --- */}
          <Link href="/" className="group flex items-center gap-3">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-md border border-white/15 bg-white/[0.03] text-white/80 transition-colors duration-300 group-hover:border-[#6E8CAE]/60 group-hover:text-white">
              <Box className="h-5 w-5" strokeWidth={1.5} />
            </div>
            <span className="flex flex-col leading-none">
              <span
                className={`${bebasNeue.className} text-3xl tracking-[0.08em] text-white transition-colors duration-300 group-hover:text-[#8FA8C4]`}
              >
                VIONA
              </span>
              <span
                className={`${plexMono.className} hidden text-[0.55rem] tracking-[0.3em] text-white/35 sm:block`}
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
                  className={`group relative text-sm font-medium tracking-wide transition-colors duration-200 ${
                    isActive ? "text-white" : "text-white/60 hover:text-white"
                  }`}
                >
                  {link.name}
                  <span
                    className={`absolute -bottom-1.5 left-0 h-px bg-[#6E8CAE] transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              );
            })}

            <Link
              href="/contact"
              className="rounded-full border border-white/20 px-5 py-2.5 text-sm font-medium tracking-wide text-white transition-colors duration-300 hover:border-[#6E8CAE] hover:bg-[#6E8CAE]/10"
            >
              Get a quote
            </Link>
          </div>

          {/* --- MOBILE HAMBURGER BUTTON --- */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="inline-flex items-center justify-center rounded-md p-2 text-white/80 transition-colors hover:bg-white/[0.06] active:bg-white/10 md:hidden"
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

      {/* --- MOBILE DROPDOWN MENU --- */}
      <div
        className={`fixed left-0 right-0 top-16 overflow-hidden border-b border-white/10 bg-[#0A0A0B]/95 backdrop-blur-xl transition-all duration-300 md:hidden ${
          isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col space-y-1 px-4 py-6">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`w-fit rounded-lg px-3 py-2.5 text-base font-medium transition-colors duration-200 active:bg-white/5 ${
                  isActive ? "text-white" : "text-white/60 hover:text-white"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          <div className="mt-3 border-t border-white/10 pt-4">
            <Link
              href="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="inline-block w-full rounded-full border border-white/20 px-5 py-3 text-center text-sm font-medium tracking-wide text-white transition-colors duration-300 hover:border-[#6E8CAE] hover:bg-[#6E8CAE]/10 active:scale-[0.98]"
            >
              Get a quote
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}