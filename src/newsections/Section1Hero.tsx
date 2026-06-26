import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
  useReducedMotion,
  type Variants,
  type MotionValue,
} from "framer-motion";
import { ArrowUpRight, MapPin, Database, Server, Sparkles } from "lucide-react";
import { HERO_CARDS, HERO_PILLS, PERSONAL_INFO } from "../data/portfolioData";

const ACCENT = "#298DFF";

/* ------------------------------------------------------------------ */
/* Motion variants                                                     */
/* ------------------------------------------------------------------ */

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const cardCluster: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.35 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 36, scale: 0.94 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ------------------------------------------------------------------ */
// Data imported from portfolioData

/* ------------------------------------------------------------------ */
/* Floating tilt card                                                  */
/* ------------------------------------------------------------------ */

function TiltCard({
  card,
  scrollY,
  reduced,
}: {
  card: typeof HERO_CARDS[0];
  scrollY: MotionValue<number>;
  reduced: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { damping: 18, stiffness: 200 });
  const sry = useSpring(ry, { damping: 18, stiffness: 200 });
  const parallax = useTransform(scrollY, [0, 1], [0, -card.depth]);

  const handleMove = (e: React.MouseEvent) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    ry.set(px * 14);
    rx.set(-py * 14);
  };

  const handleLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      style={{ y: reduced ? 0 : parallax, rotate: card.rotate }}
      className={`group absolute ${card.className}`}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <motion.div
        style={{ rotateX: srx, rotateY: sry, transformPerspective: 900 }}
        animate={reduced ? undefined : { y: [0, -10, 0] }}
        transition={
          reduced
            ? undefined
            : {
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: card.floatDelay,
              }
        }
        className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a]/90 p-5 backdrop-blur-sm transition-colors duration-300 group-hover:border-[#298DFF]/50"
      >
        {/* left accent bar */}
        <span
          className="absolute left-0 top-5 h-10 w-[3px] rounded-full opacity-70 transition-all duration-300 group-hover:h-14 group-hover:opacity-100"
          style={{ background: ACCENT, boxShadow: `0 0 14px ${ACCENT}` }}
        />
        {/* hover halo */}
        <span
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(140px 140px at 30% 0%, rgba(41,141,255,0.18), transparent 70%)",
          }}
        />
        {/* corner marker */}
        <span className="absolute right-3 top-3 h-2 w-2 rounded-full border border-white/20 transition-colors duration-300 group-hover:border-[#298DFF]" />

        <div className="relative flex items-start gap-3 pl-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-[#298DFF]">
            {card.icon}
          </div>
          <div className="min-w-0">
            <h3 className="text-[15px] font-semibold tracking-tight text-white">
              {card.title}
            </h3>
            <p className="mt-1 text-[12.5px] leading-relaxed text-white/45">
              {card.meta}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Background — radial glow, grid, arcs                               */
/* ------------------------------------------------------------------ */

function HeroBackground({
  scrollY,
  reduced,
}: {
  scrollY: MotionValue<number>;
  reduced: boolean;
}) {
  const glowY = useTransform(scrollY, [0, 1], [0, -80]);
  const gridY = useTransform(scrollY, [0, 1], [0, 50]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* faint masked grid */}
      <motion.div
        style={{ y: reduced ? 0 : gridY }}
        className="absolute inset-0 opacity-[0.18]"
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)`,
            backgroundSize: "64px 64px",
            maskImage:
              "radial-gradient(ellipse 80% 60% at 70% 40%, black, transparent 75%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 80% 60% at 70% 40%, black, transparent 75%)",
          }}
        />
      </motion.div>

      {/* radial blue glow */}
      <motion.div
        style={{ y: reduced ? 0 : glowY }}
        animate={reduced ? undefined : { opacity: [0.55, 0.8, 0.55] }}
        transition={
          reduced
            ? undefined
            : { duration: 7, repeat: Infinity, ease: "easeInOut" }
        }
        className="absolute right-[6%] top-1/2 h-[520px] w-[520px] -translate-y-1/2 rounded-full"
      >
        <div
          className="h-full w-full rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(41,141,255,0.22) 0%, rgba(41,141,255,0.06) 40%, transparent 70%)",
            filter: "blur(20px)",
          }}
        />
      </motion.div>

      {/* structural arcs */}
      <svg
        className="absolute right-[2%] top-1/2 h-[640px] w-[640px] -translate-y-1/2 opacity-[0.25]"
        viewBox="0 0 640 640"
        fill="none"
      >
        <circle cx="320" cy="320" r="200" stroke="rgba(255,255,255,0.07)" />
        <circle cx="320" cy="320" r="280" stroke="rgba(41,141,255,0.12)" />
        <circle cx="320" cy="320" r="140" stroke="rgba(255,255,255,0.05)" />
      </svg>

      {/* top vignette */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black to-transparent" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Section 1 — Hero                                                    */
/* ------------------------------------------------------------------ */

export default function Section1Hero({
  onPrimary,
  onSecondary,
}: {
  onPrimary?: () => void;
  onSecondary?: () => void;
}) {
  const reduced = useReducedMotion() ?? false;
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const smoothScroll = useSpring(scrollYProgress, {
    damping: 30,
    stiffness: 120,
    mass: 0.4,
  });

  const leftY = useTransform(smoothScroll, [0, 1], [0, -60]);
  const leftOpacity = useTransform(smoothScroll, [0, 0.8], [1, 0]);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative isolate min-h-screen w-full overflow-hidden bg-black text-white"
    >
      <HeroBackground scrollY={smoothScroll} reduced={reduced} />

      <div className="relative z-10 flex min-h-screen w-full flex-col justify-center px-10 pt-16 pb-20 xl:px-14">
        <div className="grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">

          {/* LEFT COLUMN */}
          <motion.div
            style={{ y: reduced ? 0 : leftY, opacity: reduced ? 1 : leftOpacity }}
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="max-w-xl"
          >
            {/* eyebrow */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5"
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: ACCENT, boxShadow: `0 0 8px ${ACCENT}` }}
              />
              <span className="text-[12px] font-medium tracking-[0.18em] text-white/70">
                {PERSONAL_INFO.role.toUpperCase()}
              </span>
            </motion.div>

            {/* heading */}
            <motion.h1
              variants={itemVariants}
              className="mt-6 text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[1.04] tracking-[-0.03em]"
            >
              Build scalable
              <br />
              systems with{" "}
              <span style={{ color: ACCENT }}>Python</span>
              {" "}&amp; React
            </motion.h1>

            {/* supporting copy */}
            <motion.p
              variants={itemVariants}
              className="mt-6 max-w-md text-[15px] leading-relaxed text-white/55"
            >
              {PERSONAL_INFO.heroDescription}
            </motion.p>

            {/* name + location */}
            <motion.div
              variants={itemVariants}
              className="mt-7 flex items-center gap-4 text-sm"
            >
              <span className="font-semibold tracking-tight text-white">
                {PERSONAL_INFO.name}
              </span>
              <span className="h-4 w-px bg-white/15" />
              <span className="flex items-center gap-1.5 text-white/45">
                <MapPin className="h-3.5 w-3.5" style={{ color: ACCENT }} />
                {PERSONAL_INFO.location}
              </span>
            </motion.div>

            {/* CTAs */}
            <motion.div
              variants={itemVariants}
              className="mt-9 flex flex-wrap items-center gap-4"
            >
              <motion.button
                type="button"
                onClick={onPrimary}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full px-7 py-3.5 text-sm font-semibold text-white"
                style={{
                  background: ACCENT,
                  boxShadow: "0 8px 30px rgba(41,141,255,0.35)",
                }}
              >
                <span className="relative z-10">View Projects</span>
                <ArrowUpRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                <span className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-500 group-hover:translate-x-0" />
              </motion.button>

              <motion.button
                type="button"
                onClick={onSecondary}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.02] px-7 py-3.5 text-sm font-semibold text-white/90 transition-colors duration-300 hover:border-[#298DFF]/60 hover:bg-white/[0.05]"
              >
                Get In Touch
              </motion.button>
            </motion.div>

            {/* tech pills */}
            <motion.div
              variants={itemVariants}
              className="mt-10 flex flex-wrap gap-2.5"
            >
              {HERO_PILLS.map((pill) => (
                <motion.span
                  key={pill}
                  whileHover={{ y: -3 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  className="cursor-default rounded-lg border border-white/10 bg-white/[0.02] px-3.5 py-1.5 text-[12.5px] font-medium text-white/60 transition-colors duration-300 hover:border-[#298DFF]/40 hover:text-white"
                >
                  {pill}
                </motion.span>
              ))}
            </motion.div>

            {/* micro stat */}
            <motion.p
              variants={itemVariants}
              className="mt-8 text-[12px] tracking-[0.14em] text-white/35"
            >
              SCALABLE SYSTEMS. CLEAN ARCHITECTURE. PRODUCTION FOCUS.
            </motion.p>
          </motion.div>

          {/* RIGHT COLUMN — desktop card cluster */}
          <motion.div
            variants={cardCluster}
            initial="hidden"
            animate="show"
            className="relative mx-auto hidden h-[440px] w-full max-w-[520px] lg:block"
          >
            {HERO_CARDS.map((card) => (
              <TiltCard
                key={card.title}
                card={card}
                scrollY={smoothScroll}
                reduced={reduced}
              />
            ))}


          </motion.div>

          {/* MOBILE card stack */}
          <motion.div
            variants={cardCluster}
            initial="hidden"
            animate="show"
            className="flex flex-col gap-3 lg:hidden"
          >
            {HERO_CARDS.map((card) => (
              <motion.div
                key={card.title}
                variants={cardVariants}
                className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a]/90 p-4"
              >
                <span
                  className="absolute left-0 top-4 h-9 w-[3px] rounded-full"
                  style={{ background: ACCENT, boxShadow: `0 0 12px ${ACCENT}` }}
                />
                <div className="flex items-center gap-3 pl-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-[#298DFF]">
                    {card.icon}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white">
                      {card.title}
                    </h3>
                    <p className="text-[12px] text-white/45">{card.meta}</p>
                  </div>
                </div>
              </motion.div>
            ))}


          </motion.div>

        </div>
      </div>

      {/* bottom fade into next section */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent" />
    </section>
  );
}
