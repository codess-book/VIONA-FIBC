// app/team/page.tsx
"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, useReducedMotion } from "framer-motion";
import {
  Mail,
  Watch,
  Phone,
  Users,
  Briefcase,
  Crown,
  ChevronRight,
} from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

// --- Team Data ---
const teamMembers = [
  {
    name: "Dr. Chintaman Rathore",
    role: "Managing Director",
    leadership: true,
    bio: "A distinguished orator and doctorate holder, Dr. Rathore brings decades of cross-industry experience to VIONA and maintains close, hands-on engagement with every level of the organisation.",
    email: "info@vionafibc.com",
    phone: "+91 9009177118",
    image: "/Images/Team/md-chintaman-rathore.jpeg",
  },
  {
    name: "Harshad Chauhan",
    role: "General Manager",
    leadership: false,
    bio: "Operations expert ensuring seamless manufacturing processes and delivering premium quality FIBC solutions to global clients.",
    email: "harshad@vionafibc.com",
    phone: "+91 7354712121",
    image: "/Images/Team/general-manager-harshad-chauhan.jpeg",
  },
  {
    name: "Nikhil Upadhyay",
    role: "Int'l Marketing Manager",
    leadership: false,
    bio: "Nikhil brings deep expertise in export marketing, with his team leading business development across Europe, the USA and the Middle East.",
    email: "marketing@vionafibc.com",
    phone: "+91 7992392070",
    image: "/Images/Team/intl-marketing-manager-nikhil.jpeg",
  },
  {
    name: "Divya Rathore",
    role: "Int'l Marketing Manager",
    leadership: false,
    bio: "Building strong client relationships and delivering customised FIBC solutions for diverse industrial applications worldwide.",
    email: "sales@vionafibc.com",
    phone: "+91 7974993209",
    image: "/Images/Team/intel-manager-divya-rathore.jpeg",
  },
  {
    name: "Sourabh Meena",
    role: "Logistics Head",
    leadership: false,
    bio: "Streamlining supply chain operations to ensure timely delivery and efficient logistics for VIONA's global clientele.",
    email: "sourabh.meena@vionafibc.com",
    phone: "+91 9399060851",
    image: "/Images/Team/Logistichead-tarunmeena.jpeg",
  },
  {
    name: "Tarun Lodhi",
    role: "Documentation Head",
    leadership: false,
    bio: "Managing export documentation and compliance, ensuring seamless international trade operations for VIONA-FIBC.",
    email: "aditi.rathore@vionafibc.com",
    phone: "+91 7441149831",
    image: "/Images/Team/documentationHead-Tarun.jpeg",
  },
];

type Member = (typeof teamMembers)[0];

const stats = [
  { icon: Watch, label: "Years of experience", value: "8+" },
  { icon: Users, label: "Employees", value: "500+" },
  { icon: Briefcase, label: "Quality", value: "Premium" },
];

// --- Floating Particles (fixed: sized to its section, cleans up fully) ---
const FloatingParticles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent || prefersReducedMotion) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      opacity: number;
    }> = [];

    const init = () => {
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
      const count = Math.min(
        50,
        Math.floor((canvas.width * canvas.height) / 25000)
      );
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        radius: Math.random() * 2 + 1,
        opacity: Math.random() * 0.15 + 0.05,
      }));
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(37, 99, 235, ${p.opacity})`;
        ctx.fill();
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.hypot(dx, dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(37, 99, 235, ${0.05 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(animate);
    };

    const start = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(animate);
    };
    const onVisibility = () => {
      if (document.hidden) cancelAnimationFrame(raf);
      else start();
    };

    init();
    start();
    const ro = new ResizeObserver(init);
    ro.observe(parent);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [prefersReducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 h-full w-full"
    />
  );
};

// --- Animated Background Orbs ---
const AnimatedOrbs = () => {
  const prefersReducedMotion = useReducedMotion();
  const loop = (values: number[], duration: number) =>
    prefersReducedMotion
      ? {}
      : { animate: { x: values }, transition: { duration, repeat: Infinity, ease: "easeInOut" as const } };

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <motion.div
        className="absolute -right-40 -top-40 h-[600px] w-[600px] rounded-full bg-blue-400/10 blur-3xl will-change-transform"
        {...loop([0, 30, -20, 0], 20)}
      />
      <motion.div
        className="absolute -bottom-40 -left-40 h-[600px] w-[600px] rounded-full bg-amber-400/10 blur-3xl will-change-transform"
        {...loop([0, -30, 20, 0], 25)}
      />
      <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/5 blur-3xl" />
    </div>
  );
};

// --- Small contact row ---
function ContactLink({
  href,
  icon: Icon,
  children,
}: {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className="group/link flex items-center gap-3 rounded-lg text-sm text-slate-600 transition-colors duration-300 hover:text-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
    >
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-700 ring-1 ring-blue-100 transition-colors duration-300 group-hover/link:bg-blue-700 group-hover/link:text-white">
        <Icon className="h-3.5 w-3.5" />
      </span>
      <span className="truncate">{children}</span>
    </a>
  );
}

// --- Featured card (Managing Director) ---
function FeaturedCard({ member }: { member: Member }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: EASE }}
    >
      <div className="relative grid overflow-hidden rounded-3xl border border-amber-200/60 bg-gradient-to-br from-white via-white to-amber-50/50 shadow-[0_30px_70px_-35px_rgba(30,64,175,0.35)] md:grid-cols-[minmax(0,0.85fr)_1.4fr]">
        {/* gold top hairline */}
        <span className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-amber-400 via-amber-300 to-transparent" />

        {/* photo */}
        <div className="relative min-h-[300px] md:min-h-[420px]">
          <Image
            src={member.image}
            alt={member.name}
            fill
            priority
            sizes="(min-width: 768px) 40vw, 100vw"
            className="object-cover object-top"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-white/10" />
        </div>

        {/* content */}
        <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-14">
          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-amber-300">
            <Crown className="h-3.5 w-3.5" />
            {member.role}
          </span>
          <h3 className="mt-5 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
            {member.name}
          </h3>
          <span className="mt-5 block h-px w-14 bg-gradient-to-r from-amber-400 to-transparent" />
          <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600">
            {member.bio}
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <ContactLink href={`mailto:${member.email}`} icon={Mail}>
              {member.email}
            </ContactLink>
            <ContactLink href={`tel:${member.phone.replace(/\s/g, "")}`} icon={Phone}>
              {member.phone}
            </ContactLink>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

// --- Team card ---
function TeamCard({ member, index }: { member: Member; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: (index % 3) * 0.1, ease: EASE }}
      className="group w-full sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-4rem)/3)]"
    >
      <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm shadow-slate-900/5 transition-[transform,box-shadow,border-color] duration-500 ease-out hover:-translate-y-1.5 hover:border-blue-200 hover:shadow-[0_28px_50px_-24px_rgba(30,64,175,0.35)]">
        {/* accent line, draws on hover */}
        <span className="absolute inset-x-0 top-0 z-20 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-blue-700 to-blue-400 transition-transform duration-700 ease-out group-hover:scale-x-100" />

        {/* photo */}
        <div className="relative aspect-[5/4] overflow-hidden bg-slate-100">
          <Image
            src={member.image}
            alt={member.name}
            fill
            sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
            className="object-cover object-top transition-transform duration-700 ease-out will-change-transform group-hover:scale-105"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-slate-950/55 via-transparent to-transparent" />
          <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-blue-900 shadow-sm backdrop-blur">
            {member.role}
          </span>
        </div>

        {/* body */}
        <div className="flex flex-1 flex-col p-6">
          <h3 className="text-lg font-semibold tracking-tight text-slate-900">
            {member.name}
          </h3>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
            {member.bio}
          </p>

          <div className="mt-6 space-y-3 border-t border-slate-200/70 pt-5">
            <ContactLink href={`mailto:${member.email}`} icon={Mail}>
              {member.email}
            </ContactLink>
            <ContactLink href={`tel:${member.phone.replace(/\s/g, "")}`} icon={Phone}>
              {member.phone}
            </ContactLink>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

// --- Main Component ---
export default function TeamPage() {
  const featured = teamMembers.find((m) => m.leadership) ?? teamMembers[0];
  const others = teamMembers.filter((m) => m !== featured);

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-b from-sky-50 via-blue-50/60 to-sky-100/60 py-12 sm:py-16 md:py-20 lg:py-28">
      {/* Background */}
      <FloatingParticles />
      <AnimatedOrbs />

      {/* Background textures */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {/* Micro-check texture: tiny light-blue squares whose stripes cross, like woven gingham fabric */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.11) 50%, transparent 50%),
              linear-gradient(90deg, rgba(59, 130, 246, 0.11) 50%, transparent 50%)
            `,
            backgroundSize: "10px 10px",
          }}
        />

        {/* Fine thread lines over the check for a woven feel */}
        <div
          className="absolute inset-0 opacity-70"
          style={{
            backgroundImage: `
              linear-gradient(rgba(37, 99, 235, 0.07) 1px, transparent 1px),
              linear-gradient(90deg, rgba(37, 99, 235, 0.07) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />

        {/* Soft light-blue shade */}
        <div className="absolute inset-0 bg-gradient-to-b from-sky-100/50 via-blue-100/25 to-sky-100/50" />

        {/* Fine grain texture */}
        <svg className="absolute inset-0 h-full w-full opacity-[0.04]">
          <filter id="grain">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.9"
              numOctaves="2"
              stitchTiles="stitch"
            />
          </filter>
          <rect width="100%" height="100%" filter="url(#grain)" />
        </svg>

        {/* Gradient masks */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-transparent to-white/70" />
        <div className="absolute inset-0 bg-gradient-to-tr from-slate-50 via-transparent to-blue-50/40" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ==================== HEADER ==================== */}
        <div className="mb-12 grid grid-cols-1 items-end gap-10 border-b border-slate-200/70 pb-10 sm:mb-14 lg:mb-16 lg:grid-cols-[1.3fr_1fr] lg:gap-14 lg:pb-14">
          <div className="pt-6">
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-blue-700"
            >
              <span className="h-px w-8 bg-gradient-to-r from-amber-400 to-blue-600" />
              Meet our leadership
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
              className="mt-5 text-3xl font-bold leading-[1.08] tracking-tight text-slate-900 sm:text-4xl lg:text-5xl xl:text-[3.5rem]"
            >
              The people behind VIONA&apos;s
              <span className="block bg-gradient-to-r from-blue-800 via-blue-700 to-blue-500 bg-clip-text text-transparent">
                engineering &amp; packaging standards
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
              className="mt-5 max-w-xl text-base leading-relaxed text-slate-600 lg:text-lg"
            >
              A team of experienced specialists overseeing manufacturing, export
              and client relationships for industries worldwide.
            </motion.p>
          </div>

          {/* Stats */}
          <motion.dl
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
            className="grid grid-cols-3 divide-x divide-slate-200/80 rounded-2xl border border-slate-200/80 bg-white/70 shadow-sm shadow-slate-900/5 backdrop-blur"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="px-3 py-5 sm:px-5">
                <dt className="flex items-center gap-1.5 text-[0.7rem] text-slate-500 sm:text-xs">
                  <stat.icon className="h-3.5 w-3.5 text-blue-700" />
                  {stat.label}
                </dt>
                <dd className="mt-2 text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl lg:text-3xl">
                  {stat.value}
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* ==================== MANAGING DIRECTOR ==================== */}
        <FeaturedCard member={featured} />

        {/* ==================== MANAGEMENT TEAM ==================== */}
        <div className="mb-8 mt-16 flex items-center gap-4 sm:mt-20">
          <span className="h-px flex-1 bg-gradient-to-r from-transparent to-slate-300/70" />
          <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
            Management team
          </h2>
          <span className="h-px flex-1 bg-gradient-to-l from-transparent to-slate-300/70" />
        </div>

        <div className="flex flex-wrap justify-center gap-6 lg:gap-8">
          {others.map((member, index) => (
            <TeamCard key={member.name} member={member} index={index} />
          ))}
        </div>

        {/* ==================== CTA ==================== */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mt-16 sm:mt-20 md:mt-24"
        >
          <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-slate-900 to-blue-950" />

            {/* Texture overlay */}
            <div
              className="absolute inset-0 opacity-[0.35]"
              style={{
                backgroundImage: `
                  repeating-linear-gradient(45deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 14px),
                  repeating-linear-gradient(-45deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 14px)
                `,
              }}
            />

            {/* Glow orbs */}
            <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-blue-500/20 blur-3xl sm:h-64 sm:w-64" />
            <div className="absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-amber-500/10 blur-3xl sm:h-64 sm:w-64" />

            {/* gold hairline */}
            <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-300/60 to-transparent" />

            <div className="relative z-10 flex flex-col items-center justify-between gap-6 px-6 py-10 sm:flex-row sm:px-10 md:px-14 md:py-14">
              <div className="text-center sm:text-left">
                <h2 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
                  Ready to discuss your packaging needs?
                </h2>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-blue-100/70 sm:text-base">
                  Reach our team directly for guidance, quotes or plant visits
                  tailored to your FIBC requirements.
                </p>
              </div>

              <Link
                href="/contact"
                className="group inline-flex shrink-0 items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-lg shadow-blue-950/40 transition-[background-color,box-shadow] duration-300 hover:bg-blue-50 hover:shadow-blue-950/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Contact us
                <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}