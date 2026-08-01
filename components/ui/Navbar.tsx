"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Box, ChevronDown } from "lucide-react";
import { Bebas_Neue, Inter, IBM_Plex_Mono } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";

// Display face for the logo wordmark
const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
});

// Body face for nav links
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

// Utility face
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

// Animation variants
const mobileMenuVariants = {
  hidden: { 
    opacity: 0,
    height: 0,
    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1] as const
    }
  },
  visible: { 
    opacity: 1,
    height: "auto",
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

const mobileLinkVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.06,
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1]
    }
  })
};

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "border-b border-white/10 bg-[#0A0A0B]/95 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.3)]"
          : "border-b border-white/[0.06] bg-[#0A0A0B]/60 backdrop-blur-md"
      } ${inter.className} text-white`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 sm:h-16 items-center justify-between">
          
          {/* --- LOGO --- */}
          <Link 
            href="/" 
            className="group flex items-center gap-2 sm:gap-3 relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Icon Box with animation */}
            <motion.div 
              className="relative flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-md border border-white/15 bg-white/[0.03] text-white/80 transition-colors duration-300 group-hover:border-[#6E8CAE]/60 group-hover:text-white"
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Box className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={1.5} />
              
              {/* Glow effect on hover */}
              <motion.div
                className="absolute inset-0 rounded-md bg-[#6E8CAE]/10 blur-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>

            {/* Logo Text */}
            <span className="flex flex-col leading-none">
              <motion.span
                className={`${bebasNeue.className} text-2xl sm:text-3xl tracking-[0.06em] sm:tracking-[0.08em] text-white transition-colors duration-300 group-hover:text-[#8FA8C4]`}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                VIONA
              </motion.span>
              <span
                className={`${plexMono.className} hidden sm:block text-[0.45rem] sm:text-[0.55rem] tracking-[0.2em] sm:tracking-[0.3em] text-white/35`}
              >
                FIBC PACKAGING
              </span>
            </span>
          </Link>

          {/* --- DESKTOP MENU --- */}
          <div className="hidden items-center gap-6 lg:gap-9 md:flex">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`group relative text-sm font-medium tracking-wide transition-colors duration-200 ${
                    isActive ? "text-white" : "text-white/50 hover:text-white"
                  }`}
                >
                  <span className="relative z-10">{link.name}</span>
                  
                  {/* Active indicator */}
                  {isActive && (
                    <motion.span
                      layoutId="activeNav"
                      className="absolute -bottom-1.5 left-0 h-px bg-gradient-to-r from-[#6E8CAE] to-[#8FA8C4]"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                  
                  {/* Hover underline */}
                  <span
                    className={`absolute -bottom-1.5 left-0 h-px bg-gradient-to-r from-[#6E8CAE] to-[#8FA8C4] transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                  
                  {/* Hover glow */}
                  <span className="absolute inset-0 -z-10 rounded-lg bg-white/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </Link>
              );
            })}

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/contact"
                className="relative overflow-hidden rounded-full border border-white/20 px-4 py-2 sm:px-5 sm:py-2.5 text-sm font-medium tracking-wide text-white transition-all duration-300 hover:border-[#6E8CAE] hover:shadow-[0_0_30px_rgba(110,140,174,0.15)] group"
              >
                <span className="relative z-10">Get a quote</span>
                <span className="absolute inset-0 -z-0 bg-gradient-to-r from-[#6E8CAE]/0 via-[#6E8CAE]/10 to-[#6E8CAE]/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              </Link>
            </motion.div>
          </div>

          {/* --- MOBILE HAMBURGER BUTTON --- */}
          <motion.button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileTap={{ scale: 0.9 }}
            className="inline-flex items-center justify-center rounded-md p-1.5 sm:p-2 text-white/80 transition-colors hover:bg-white/[0.06] active:bg-white/10 md:hidden relative"
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            {/* Animated hamburger icon */}
            <div className="relative h-5 w-5 sm:h-6 sm:w-6">
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={1.5} />
                ) : (
                  <Menu className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={1.5} />
                )}
              </motion.div>
            </div>
            
            {/* Notification dot */}
            {!isMobileMenuOpen && (
              <motion.span
                className="absolute -top-0.5 -right-0.5 h-1.5 w-1.5 rounded-full bg-[#6E8CAE]"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            )}
          </motion.button>
        </div>
      </div>

      {/* --- MOBILE MENU --- */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="fixed left-0 right-0 top-[56px] sm:top-[64px] overflow-hidden border-t border-white/10 bg-[#0A0A0B]/98 backdrop-blur-2xl md:hidden shadow-2xl"
          >
            <div className="flex flex-col px-4 py-4 sm:py-6">
              {/* Mobile Links */}
              {navLinks.map((link, index) => {
                const isActive = pathname === link.href;
                return (
                  <motion.div
                    key={link.name}
                    custom={index}
                    variants={mobileLinkVariants}
                    initial="hidden"
                    animate="visible"
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`relative flex items-center justify-between w-full rounded-lg px-3 py-3 sm:py-3.5 text-base font-medium transition-all duration-200 active:scale-[0.98] ${
                        isActive 
                          ? "text-white bg-white/5" 
                          : "text-white/60 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      <span>{link.name}</span>
                      {isActive && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="h-1.5 w-1.5 rounded-full bg-[#6E8CAE]"
                        />
                      )}
                    </Link>
                  </motion.div>
                );
              })}

              {/* Divider */}
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ delay: 0.3 }}
                className="my-2 border-t border-white/10"
              />

              {/* Mobile CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-1 px-1"
              >
                <Link
                  href="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="relative overflow-hidden flex w-full items-center justify-center rounded-full border border-white/20 px-5 py-3.5 text-sm font-medium tracking-wide text-white transition-all duration-300 hover:border-[#6E8CAE] hover:bg-[#6E8CAE]/10 active:scale-[0.97] group"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Get a quote
                    <ChevronDown className="h-4 w-4 rotate-[-90deg] group-hover:translate-x-1 transition-transform" />
                  </span>
                  <span className="absolute inset-0 -z-0 bg-gradient-to-r from-[#6E8CAE]/0 via-[#6E8CAE]/5 to-[#6E8CAE]/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                </Link>
              </motion.div>

              {/* Brand tagline */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className={`${plexMono.className} mt-4 text-center text-[0.5rem] tracking-[0.25em] text-white/20`}
              >
                ENGINEERED FOR HEAVY LOADS
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}