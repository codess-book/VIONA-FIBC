"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowRight, Sparkles } from "lucide-react";

const navItems = [
    { title: "Home", href: "#" },
    { title: "About", href: "#about" },
    { title: "Products", href: "#products" },
    { title: "Industries", href: "#industries" },
    { title: "Infrastructure", href: "#infrastructure" },
    { title: "Contact", href: "#contact" },
];

const letterVariants = {
    hidden: { opacity: 0, y: 20, rotateX: 40 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        rotateX: 0,
        transition: {
            delay: i * 0.06,
            duration: 0.6,
            ease: [0.23, 1, 0.32, 1],
        },
    }),
};

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const scroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener("scroll", scroll);
        return () => window.removeEventListener("scroll", scroll);
    }, []);

    useEffect(() => {
        const handleEscape = (e) => e.key === "Escape" && setOpen(false);
        document.addEventListener("keydown", handleEscape);
        return () => document.removeEventListener("keydown", handleEscape);
    }, []);

    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [open]);

    const brandLetters = "VIONA".split("");

    return (
        <>
            <motion.header
                initial={{ y: -100, opacity: 0, scale: 0.95 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                transition={{
                    duration: 0.8,
                    ease: [0.23, 1, 0.32, 1],
                    delay: 0.2,
                }}
                className="fixed top-5 left-1/2 z-50 w-[95%] max-w-7xl -translate-x-1/2"
            >
                <nav
                    className={`relative transition-all duration-700 rounded-2xl border
          ${scrolled
                            ? "border-white/10 bg-black/70 backdrop-blur-3xl shadow-[0_25px_80px_rgba(0,0,0,.7)] shadow-amber-500/5"
                            : "border-white/5 bg-black/40 backdrop-blur-xl shadow-[0_8px_40px_rgba(0,0,0,.3)]"
                        }
          `}
                >
                    <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-amber-500/10 blur-3xl" />
                    <div className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-sky-500/8 blur-3xl" />

                    <div className="relative flex h-[72px] items-center justify-between px-6 md:px-8">
                        {/* LOGO */}
                        <Link href="/" className="group flex items-center gap-3">
                            <motion.div
                                whileHover={{ scale: 1.05, rotate: -5 }}
                                whileTap={{ scale: 0.95 }}
                                className="relative h-11 w-11 rounded-2xl bg-gradient-to-br from-amber-400 via-yellow-500 to-sky-400 p-[2px] shadow-[0_0_45px_rgba(255,187,0,.25)] transition-shadow duration-500 group-hover:shadow-[0_0_70px_rgba(255,187,0,.45)]"
                            >
                                <div className="flex h-full w-full items-center justify-center rounded-2xl bg-[#070a12]">
                                    <Sparkles size={16} className="text-amber-400" fill="rgba(251,191,36,0.3)" />
                                </div>
                            </motion.div>

                            <div className="flex items-center overflow-hidden">
                                {brandLetters.map((letter, i) => (
                                    <motion.span
                                        key={i}
                                        custom={i}
                                        variants={letterVariants}
                                        initial="hidden"
                                        animate="visible"
                                        className={`text-xl font-extrabold tracking-[0.12em] ${
                                            i === 0
                                                ? "bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent"
                                                : "text-white"
                                        }`}
                                    >
                                        {letter}
                                    </motion.span>
                                ))}
                            </div>

                            <motion.span
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.8, duration: 0.4 }}
                                className="ml-1 hidden rounded-full border border-amber-500/20 bg-amber-500/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.15em] text-amber-400/80 backdrop-blur-sm md:block"
                            >
                                Premium
                            </motion.span>
                        </Link>

                        {/* Desktop nav */}
                        <div className="hidden items-center gap-1 lg:flex">
                            {navItems.map((item, index) => (
                                <Link
                                    key={item.title}
                                    href={item.href}
                                    onMouseEnter={() => setActiveIndex(index)}
                                    onMouseLeave={() => setActiveIndex(-1)}
                                    className={`group relative rounded-xl px-4 py-2 text-[14px] font-medium transition-all duration-300 ${
                                        activeIndex === index ? "text-amber-400" : "text-gray-400 hover:text-white"
                                    }`}
                                >
                                    <span className="relative z-10">{item.title}</span>
                                    <motion.span
                                        className="absolute inset-0 rounded-xl bg-white/5"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{
                                            opacity: activeIndex === index ? 1 : 0,
                                            scale: activeIndex === index ? 1 : 0.8,
                                        }}
                                        transition={{ duration: 0.25 }}
                                    />
                                    <motion.span
                                        className="absolute -bottom-0.5 left-3 right-3 h-[2px] rounded-full bg-gradient-to-r from-amber-400 to-sky-400"
                                        initial={{ scaleX: 0, opacity: 0 }}
                                        animate={{
                                            scaleX: activeIndex === index ? 1 : 0,
                                            opacity: activeIndex === index ? 1 : 0,
                                        }}
                                        transition={{ duration: 0.3 }}
                                    />
                                </Link>
                            ))}
                        </div>

                        {/* Desktop CTA */}
                        <div className="hidden lg:block">
                            <motion.button
                                whileHover={{ scale: 1.04 }}
                                whileTap={{ scale: 0.96 }}
                                className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-amber-400 via-yellow-500 to-sky-400 px-6 py-2.5 font-semibold text-black shadow-[0_0_40px_rgba(255,180,0,.2)] transition-shadow duration-300 hover:shadow-[0_0_60px_rgba(255,180,0,.35)]"
                            >
                                <span className="relative z-10 flex items-center gap-2 text-[14px]">
                                    Get Quote
                                    <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                                </span>
                                <motion.span
                                    className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent"
                                    whileHover={{ x: "200%" }}
                                    transition={{ duration: 0.6, ease: "easeInOut" }}
                                />
                            </motion.button>
                        </div>

                        {/* Mobile toggle */}
                        <motion.button
                            onClick={() => setOpen(!open)}
                            whileTap={{ scale: 0.92 }}
                            className="relative flex h-10 w-10 items-center justify-center rounded-xl text-white transition-colors hover:bg-white/10 lg:hidden"
                        >
                            <AnimatePresence mode="wait">
                                {open ? (
                                    <motion.div
                                        key="close"
                                        initial={{ rotate: -90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: 90, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <X size={26} />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="menu"
                                        initial={{ rotate: 90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: -90, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <Menu size={26} />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.button>
                    </div>
                </nav>
            </motion.header>

            {/* MOBILE MENU – FULL WIDTH, SMOOTH, SMALLER FONTS, NO NUMBERS, HANDSHAKE ICON */}
            <AnimatePresence>
                {open && (
                    <>
                        <motion.div
                            onClick={() => setOpen(false)}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="fixed inset-0 z-40 bg-black/70 backdrop-blur-md lg:hidden"
                        />

                        <motion.div
                            initial={{ x: "100%", opacity: 0.7 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: "100%", opacity: 0.7 }}
                            transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 30,
                                mass: 0.7,
                            }}
                            // Full width, no max-w restriction
                            className="fixed right-0 top-0 z-50 flex h-screen w-full flex-col bg-[#070a12]/98 p-6 backdrop-blur-3xl lg:hidden"
                        >
                            {/* Header */}
                            <div className="mb-8 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-amber-400 via-yellow-500 to-sky-400 p-[2px]">
                                        <div className="flex h-full w-full items-center justify-center rounded-2xl bg-[#070a12]">
                                            <Sparkles size={14} className="text-amber-400" fill="rgba(251,191,36,0.3)" />
                                        </div>
                                    </div>
                                    <span className="text-lg font-extrabold tracking-[0.2em] text-white">VIONA</span>
                                </div>

                                <motion.button
                                    onClick={() => setOpen(false)}
                                    whileTap={{ scale: 0.9 }}
                                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white transition-colors hover:bg-white/10"
                                >
                                    <X size={22} />
                                </motion.button>
                            </div>

                            {/* Navigation – smaller fonts, no numbers */}
                            <div className="flex flex-col gap-1">
                                {navItems.map((item, index) => {
                                    const isActive = index === 0;
                                    return (
                                        <motion.div
                                            key={item.title}
                                            initial={{ opacity: 0, x: 30 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{
                                                delay: index * 0.05,
                                                duration: 0.35,
                                                ease: [0.23, 1, 0.32, 1],
                                            }}
                                        >
                                            <Link
                                                href={item.href}
                                                onClick={() => setOpen(false)}
                                                className={`group flex items-center justify-between rounded-2xl px-5 py-3.5 text-[17px] font-semibold transition-all duration-300 ${
                                                    isActive
                                                        ? "bg-gradient-to-r from-amber-500/15 to-transparent text-amber-400"
                                                        : "text-gray-300 hover:bg-white/5 hover:text-white"
                                                }`}
                                            >
                                                <span>{item.title}</span>
                                                {/* numbering removed */}
                                            </Link>
                                        </motion.div>
                                    );
                                })}
                            </div>

                            {/* Decorative divider */}
                            <div className="my-6 flex items-center gap-4">
                                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                                <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-gray-600">
                                    Let's Connect
                                </span>
                                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                            </div>

                            {/* CTA Button */}
                            <motion.button
                                whileTap={{ scale: 0.97 }}
                                className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-500 to-sky-400 px-6 py-4 text-[16px] font-bold text-black shadow-[0_0_50px_rgba(255,180,0,.15)]"
                            >
                                <span className="relative z-10 flex items-center justify-center gap-3">
                                    Get a Free Quote
                                    <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
                                </span>
                                <motion.span
                                    className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent"
                                    whileHover={{ x: "200%" }}
                                    transition={{ duration: 0.6 }}
                                />
                            </motion.button>

                            {/* Handshake animation (small object) */}
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.4, duration: 0.5 }}
                                className="mt-6 flex items-center justify-center gap-3 text-gray-400"
                            >
                                <span className="text-sm font-light tracking-wide">Trusted partnership</span>
                                <motion.span
                                    // handshake shake animation
                                    animate={{ rotate: [0, -10, 10, -5, 5, 0] }}
                                    transition={{
                                        repeat: Infinity,
                                        repeatDelay: 2,
                                        duration: 0.6,
                                        ease: "easeInOut",
                                    }}
                                    className="text-3xl"
                                >
                                    🤝
                                </motion.span>
                            </motion.div>

                            {/* Footer */}
                            <div className="mt-auto pt-6 text-center">
                                <p className="text-[11px] text-gray-600">© 2026 VIONA. All rights reserved.</p>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}