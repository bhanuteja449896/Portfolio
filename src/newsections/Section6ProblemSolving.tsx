"use client";

import React, { useEffect, useRef } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
  animate,
} from "framer-motion";

const ACCENT = "#298DFF";
const EASE = [0.16, 1, 0.3, 1] as const;

// Marquee Words
const MARQUEE_WORDS = [
  "Logic",
  "DSA",
  "Pattern Recognition",
  "Consistency",
  "Optimization",
  "Algorithmic Thinking",
  "Data Structures",
  "Problem Solving",
];

// Orbit Items
const INNER_ORBIT = ["Arrays", "Trees", "Greedy", "Sliding Window", "Recursion"];
const OUTER_ORBIT = [
  "Dynamic Programming",
  "Graphs",
  "Backtracking",
  "Binary Search",
  "Hashing",
];

/* ─────────────────────────────────────────────────────────────────────────
   Animated Counter Component
───────────────────────────────────────────────────────────────────────── */
function AnimatedCounter({
  value,
  inView,
}: {
  value: number;
  inView: boolean;
}) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    if (inView) {
      const controls = animate(count, value, {
        duration: 2.5,
        ease: [0.22, 1, 0.36, 1],
      });
      return controls.stop;
    } else {
      // Reset when out of view if you want it to recount every time,
      // or leave it. Usually resetting is nice for a kinetic feel.
      count.set(0);
    }
  }, [count, inView, value]);

  return <motion.span>{rounded}</motion.span>;
}

/* ─────────────────────────────────────────────────────────────────────────
   Orbital Ring Component
───────────────────────────────────────────────────────────────────────── */
function OrbitRing({
  radius,
  duration,
  direction = 1,
  items,
  inView,
}: {
  radius: number;
  duration: number;
  direction?: 1 | -1;
  items: string[];
  inView: boolean;
}) {
  const size = radius * 2;

  return (
    <div
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      style={{ width: size, height: size }}
    >
      {/* The visible faint ring */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
        transition={{ duration: 1.2, ease: EASE }}
        className="absolute inset-0 rounded-full border"
        style={{ borderColor: "rgba(255,255,255,0.04)" }}
      />

      {/* The rotating container */}
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: direction === 1 ? 360 : -360 }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {items.map((item, i) => {
          const angle = (i / items.length) * 360;
          // Position on the circle
          const x = Math.cos((angle * Math.PI) / 180) * radius;
          const y = Math.sin((angle * Math.PI) / 180) * radius;

          return (
            <div
              key={item}
              className="absolute left-1/2 top-1/2"
              style={{
                transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
              }}
            >
              {/* Counter-rotate the individual item so text stays upright */}
              <motion.div
                animate={{ rotate: direction === 1 ? -360 : 360 }}
                transition={{
                  duration,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={
                    inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }
                  }
                  transition={{
                    duration: 0.8,
                    delay: 0.2 + i * 0.1,
                    ease: EASE,
                  }}
                  whileHover={{ 
                    scale: 1.1, 
                    color: "#fff", 
                    borderColor: ACCENT,
                    boxShadow: `0 0 24px rgba(41, 141, 255, 0.4)`
                  }}
                  className="whitespace-nowrap rounded-full border px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] backdrop-blur-md cursor-default"
                  style={{
                    background: "rgba(0,0,0,0.6)",
                    borderColor: "rgba(255,255,255,0.25)",
                    color: "rgba(255,255,255,0.8)",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.8), 0 0 16px rgba(41,141,255,0.15)",
                  }}
                >
                  {item}
                </motion.div>
              </motion.div>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   Marquee Ticker Component
───────────────────────────────────────────────────────────────────────── */
function TickerLine({ reverse = false, speed = 40 }) {
  // Duplicate array to ensure seamless loop
  const items = [...MARQUEE_WORDS, ...MARQUEE_WORDS, ...MARQUEE_WORDS];

  return (
    <div className="pointer-events-none flex w-full overflow-hidden opacity-20 mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ repeat: Infinity, ease: "linear", duration: speed }}
      >
        {items.map((word, i) => (
          <span
            key={i}
            className="mx-4 text-[10px] font-bold uppercase tracking-[0.3em] text-white"
          >
            {word} <span className="mx-4 text-[#298DFF]">•</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   Main Section Component
───────────────────────────────────────────────────────────────────────── */
export default function Section6ProblemSolving() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { margin: "-20% 0px", once: false });

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black py-20"
    >
      {/* ── Background Glow ── */}
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(41,141,255,0.15) 0%, transparent 60%)",
          filter: "blur(40px)",
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* ── Ambient Tickers ── */}
      <div className="absolute inset-x-0 top-16 flex flex-col gap-4">
        <TickerLine speed={60} />
      </div>
      <div className="absolute inset-x-0 bottom-16 flex flex-col gap-4">
        <TickerLine reverse speed={70} />
      </div>

      {/* ── Orbital System (Scales down on smaller screens) ── */}
      <div className="absolute left-1/2 top-1/2 w-full h-full -translate-x-1/2 -translate-y-1/2 scale-[0.45] sm:scale-75 md:scale-90 lg:scale-100 pointer-events-none z-0 flex items-center justify-center">
        <OrbitRing
          radius={200}
          duration={35}
          direction={1}
          items={INNER_ORBIT}
          inView={isInView}
        />
        <OrbitRing
          radius={330}
          duration={50}
          direction={-1}
          items={OUTER_ORBIT}
          inView={isInView}
        />
      </div>

      {/* ── Center Stat Module ── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8, ease: EASE }}
        className="relative z-10 flex flex-col items-center justify-center text-center px-4"
      >
        <div className="mb-6 flex flex-col items-center gap-3">
          <span className="h-10 w-px bg-gradient-to-b from-transparent to-[#298DFF]/50" />
          <span
            className="text-[11px] font-semibold uppercase tracking-[0.2em]"
            style={{ color: ACCENT }}
          >
            06 — Problem Solving
          </span>
        </div>

        {/* The Giant Counter */}
        <div className="relative flex items-center justify-center">
          {/* Subtle ring around the counter */}
          <motion.div
            className="absolute -inset-10 rounded-full border border-[#298DFF]/10 bg-[#298DFF]/[0.02]"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: EASE }}
          />

          <h2
            className="font-bold leading-none tracking-tighter text-white drop-shadow-2xl"
            style={{ fontSize: "clamp(3.5rem, 8vw, 6rem)" }}
          >
            <AnimatedCounter value={800} inView={isInView} />
            <span style={{ color: ACCENT }}>+</span>
          </h2>
        </div>

        <p className="mt-8 text-[12px] font-bold uppercase tracking-[0.25em] text-white/70">
          LeetCode Problems Solved
        </p>
      </motion.div>
    </section>
  );
}
