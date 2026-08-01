"use client";

import { motion, useInView } from "motion/react";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { ArrowRight, Link } from "lucide-react";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";

// ---------- Stats ----------
const stats = [
  { value: "25+", label: "Years of Experience" },
  { value: "500+", label: "Packaging Variants" },
  { value: "100+", label: "Business Partners" },
  { value: "99%", label: "Quality Compliance" },
];

// ---------- Counter ----------
const Counter = ({ value, label }: { value: string; label: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [count, setCount] = useState(0);
  const target = parseInt(value);

  useEffect(() => {
    if (isInView && target) {
      let start = 0;
      const duration = 2000;
      const increment = target / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isInView, target]);

  return (
    <div ref={ref} className="text-center">
      <p className="text-3xl font-bold text-blue-900 sm:text-4xl">
        {isInView ? count : 0}
        {value.includes("+") ? "+" : value.includes("%") ? "%" : ""}
      </p>
      <p className="mt-1 text-xs font-medium uppercase tracking-[0.12em] text-blue-600">
        {label}
      </p>
    </div>
  );
};

// ---------- Main About Section ----------
export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-white py-16 md:py-24"
    >
      {/* ============ BACKGROUND PREMIUM EFFECTS ============ */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* 1. Moving Gradient Blobs (Navy & Light Blue) */}
        <motion.div
          className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-blue-900/10 blur-3xl"
          animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-blue-600/8 blur-3xl"
          animate={{ x: [0, -40, 0], y: [0, -30, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[600px] bg-blue-500/5 blur-3xl rounded-full"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* 2. Premium Floating Shapes (Left Side) */}
        <div className="pointer-events-none absolute -top-16 -left-16 h-64 w-64">
          <motion.div
            className="h-full w-full rounded-full bg-gradient-to-br from-blue-900/5 to-blue-500/5"
            animate={{ scale: [1, 1.1, 1], rotate: [0, 45, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        <div className="pointer-events-none absolute -bottom-8 left-20 h-40 w-40">
          <motion.div
            className="h-full w-full rounded-full border-2 border-dashed border-blue-900/10"
            animate={{ scale: [1, 1.2, 1], rotate: [0, -30, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
          {/* ---- LEFT: Content ---- */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3"
            >
              <span className="h-px w-8 bg-blue-600" />
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-600">
                About VIONA
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, x: -25 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-5 font-display text-4xl font-bold leading-[1.08] text-slate-900 sm:text-5xl"
            >
              Engineering{" "}
              <span className="bg-gradient-to-r from-blue-900 to-blue-500 bg-clip-text text-transparent">
                Excellence.
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-900 to-blue-500 bg-clip-text text-transparent">
                Packaging
              </span>{" "}
              Innovation.
            </motion.h2>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mt-5 h-[2px] w-14 origin-left rounded-full bg-gradient-to-r from-blue-900 to-blue-500"
            />

            {/* Premium Paragraphs */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-5 space-y-4 text-sm leading-relaxed text-slate-600 sm:text-base"
            >
              <p>
                At{" "}
                <span className="text-blue-900 font-semibold">
                  VIONA-FIBC PRIVATE LIMITED
                </span>
                , we believe in creating Packaging Solutions that especially
                cater to the necessities of those businesses which appreciate
                premium craftsmanship and sophistication.
              </p>
              <p>
                Our niche product range has been created for enhanced operations
                of{" "}
                <span className="text-blue-600 font-medium">
                  Agro, Infrastructure, Minerals & Chemical Industries
                </span>
                . We are an India based company working towards excellence in
                Big Bag production through innovation and technology.
              </p>
              <p>
                Our team comes with years of industry experience, comprising a
                highly motivated set of specialists dedicated to delivering
                lasting value to customers worldwide.
              </p>
            </motion.div>

            {/* Buttons: Navy Blue & Light Blue */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <motion.a
                href="#"
                className="group inline-flex items-center gap-2 rounded-full bg-blue-900 px-6 py-3 text-sm font-medium tracking-wide text-white shadow-lg transition-all duration-300 hover:bg-blue-800 hover:shadow-blue-900/30"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
              >
                Know More
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </motion.a>

              <motion.a
                href="/globe"
                className="group inline-flex items-center gap-2 rounded-full border-2 border-blue-900 bg-transparent px-6 py-3 text-sm font-medium tracking-wide text-blue-900 shadow-sm transition-all duration-300 hover:border-blue-600 hover:bg-blue-600 hover:text-white hover:shadow-blue-600/40"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
              >
                Talk to our team
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </motion.a>
            </motion.div>
          </div>

          {/* ---- RIGHT: 3D Card (White & Blue Theme) ---- */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center justify-center"
          >
            <CardContainer className="inter-var">
              <CardBody className="bg-white relative group/card hover:shadow-2xl hover:shadow-blue-900/[0.1] border border-blue-200 w-auto sm:w-[30rem] h-auto rounded-xl p-6">
                <CardItem
                  translateZ="50"
                  className="text-xl font-bold text-blue-900"
                >
                  VIONA Manufacturing
                </CardItem>
                <CardItem
                  //   as="p"
                  translateZ="60"
                  className="text-blue-600 text-sm max-w-sm mt-2"
                >
                  State‑of‑the‑art facility for precision FIBC production.
                </CardItem>
                <CardItem translateZ="100" className="w-full mt-4">
                  <img
                    src="/Images/factory.jpg" // ✅ Fixed lowercase path
                    height="1000"
                    width="1000"
                    className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                    alt="VIONA factory"
                  />
                </CardItem>
                <div className="flex justify-between items-center mt-6">
                  <Link href="#">
                    <CardItem
                      translateZ={20}
                      className="px-4 py-2 rounded-xl text-xs font-normal text-slate-500 hover:text-blue-600"
                    >
                      Learn more →
                    </CardItem>
                  </Link>
                  <CardItem
                    translateZ={20}
                    // as="button"
                    className="px-4 py-2 rounded-xl bg-blue-900 text-white text-xs font-bold hover:bg-blue-800 transition-colors"
                  >
                    Know more
                  </CardItem>
                </div>
              </CardBody>
            </CardContainer>
          </motion.div>
        </div>

        {/* ---- Stats ---- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 grid grid-cols-2 gap-6 border-t border-blue-200 pt-10 sm:grid-cols-4"
        >
          {stats.map((stat, idx) => (
            <Counter key={idx} value={stat.value} label={stat.label} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
