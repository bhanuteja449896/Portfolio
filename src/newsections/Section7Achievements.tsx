"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
  useScroll,
  MotionValue,
} from "framer-motion";

const ACCENT = "#298DFF";
const EASE = [0.16, 1, 0.3, 1] as const;

// Icons
const Icons = {
  Community: () => (
    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 00-3-3.87" />
      <path d="M16 3.13a4 4 0 010 7.75" />
    </svg>
  ),
  Project: () => (
    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 12 12 17 22 12" />
      <polyline points="2 17 12 22 22 17" />
    </svg>
  ),
  Code: () => (
    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  ),
};

const ACHIEVEMENTS = [
  {
    title: "Tech Community Builder",
    description:
      "Built and scaled a tech community in Hyderabad to 500+ members, organizing technical sessions and workshops.",
    badge: "500+ Members",
    icon: <Icons.Community />,
  },
  {
    title: "Client Project Delivery",
    description:
      "Successfully delivered 2 full-stack projects to US-based clients, meeting production-level requirements.",
    badge: "2+ Client Projects",
    icon: <Icons.Project />,
  },
  {
    title: "Problem Solving Discipline",
    description:
      "Solved 800+ LeetCode problems demonstrating strong algorithmic thinking and consistency.",
    badge: "800+ Problems Solved",
    icon: <Icons.Code />,
  },
];

/* ─────────────────────────────────────────────────────────────────────────
   Inner Card (handles the mouse tilt and parallax)
───────────────────────────────────────────────────────────────────────── */
function InnerCard({
  achievement,
  index,
}: {
  achievement: typeof ACHIEVEMENTS[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Mouse tracking
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  // Map to rotations
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [12, -12]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-12, 12]);

  // Hover lift state
  const z = useMotionValue(0);
  const zSpring = useSpring(z, { stiffness: 300, damping: 30 });

  // Radial glow coordinates
  const glowX = useTransform(mouseXSpring, [-0.5, 0.5], [0, 100]);
  const glowY = useTransform(mouseYSpring, [-0.5, 0.5], [0, 100]);
  const bgGlow = useMotionTemplate`radial-gradient(circle at ${glowX}% ${glowY}%, rgba(41,141,255,0.12), transparent 60%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseEnter = () => {
    z.set(30); // Pop the card slightly towards viewer
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    z.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        z: zSpring,
        transformStyle: "preserve-3d",
      }}
      className="absolute inset-0 group shadow-2xl transition-all duration-500 rounded-2xl"
    >
      {/* ── Animated Sweeping Light Border ── */}
      <div className="absolute inset-0 z-0 overflow-hidden rounded-2xl pointer-events-none">
        <motion.div
          className="absolute left-1/2 top-1/2 w-[800px] h-[800px] origin-center -translate-x-1/2 -translate-y-1/2"
          style={{
            background: "conic-gradient(from 0deg, transparent 75%, rgba(41,141,255,0.8) 95%, #ffffff 100%)",
          }}
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* ── Inner Mask (Card surface) ── */}
      <div className="absolute inset-[2px] rounded-[14px] bg-[#080808] z-10" />
      
      {/* Subtle border outline so the card is visible when light isn't on that edge */}
      <div className="absolute inset-[2px] rounded-[14px] border border-white/[0.05] group-hover:border-white/[0.15] transition-colors duration-500 z-10 pointer-events-none" />

      {/* Subsurface Glow Layer */}
      <motion.div
        className="absolute inset-[1px] z-10 pointer-events-none opacity-0 transition-opacity duration-500 rounded-[15px] group-hover:opacity-100"
        style={{ background: bgGlow }}
      />

      {/* Floating Content Layer */}
      <motion.div
        style={{ z: 40 }} // This provides the deep 3D pop inside the card
        className="relative flex h-full w-full flex-col justify-between p-8 pointer-events-none"
      >
        <div>
          {/* Icon */}
          <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-[#298DFF] shadow-inner">
            {achievement.icon}
          </div>

          {/* Title */}
          <h3 className="mb-3 text-xl font-bold tracking-tight text-white">
            {achievement.title}
          </h3>

          {/* Description */}
          <p className="text-[14px] leading-relaxed text-white/50">
            {achievement.description}
          </p>
        </div>

        {/* Badge Layer */}
        <motion.div
          style={{ z: 60 }} // Pops out even further than text
          className="mt-6 w-fit rounded-full border border-[#298DFF]/30 bg-[#298DFF]/10 px-4 py-1.5 text-[11px] font-semibold tracking-widest uppercase text-[#298DFF] shadow-[0_0_15px_rgba(41,141,255,0.15)] transition-shadow duration-300 group-hover:shadow-[0_0_25px_rgba(41,141,255,0.35)]"
        >
          {achievement.badge}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   Scroll Wrapper Component
───────────────────────────────────────────────────────────────────────── */
function StackedCard({
  achievement,
  index,
  progress,
}: {
  achievement: any;
  index: number;
  progress: MotionValue<number>;
}) {
  let yRange = [0, 0];
  let xRange = [0, 0];
  let scaleRange = [1, 1];
  let opacityRange = [1, 1];
  let domain = [0, 0.33, 0.66, 1];

  if (index === 0) {
    domain = [0, 0.33, 0.55];
    yRange = [0, 0, 0];
    xRange = [0, 0, -800];
    scaleRange = [1, 1, 0.9];
    opacityRange = [1, 1, 0];
  } else if (index === 1) {
    domain = [0, 0.33, 0.66, 0.88];
    yRange = [40, 0, 0, 0];
    xRange = [0, 0, 0, -800];
    scaleRange = [0.92, 1, 1, 0.9];
    opacityRange = [1, 1, 1, 0];
  } else if (index === 2) {
    domain = [0, 0.33, 0.66, 1];
    yRange = [80, 40, 0, 0];
    xRange = [0, 0, 0, 0];
    scaleRange = [0.84, 0.92, 1, 1];
    opacityRange = [1, 1, 1, 1];
  }

  const y = useTransform(progress, domain, yRange);
  const x = useTransform(progress, domain, xRange);
  const scale = useTransform(progress, domain, scaleRange);
  const opacity = useTransform(progress, domain, opacityRange);

  return (
    <motion.div
      style={{
        y,
        x,
        scale,
        opacity,
        zIndex: 30 - index,
        transformOrigin: "center center"
      }}
      className="absolute top-0 left-0 w-full h-[380px]"
    >
      <InnerCard achievement={achievement} index={index} />
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   Main Section Component
───────────────────────────────────────────────────────────────────────── */
export default function Section7Achievements() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Apply a spring layer to the raw scroll progress for buttery smooth transitions
  const smoothProgress = useSpring(scrollYProgress, {
    damping: 25,
    stiffness: 120,
    mass: 0.5
  });

  return (
    <section
      ref={containerRef}
      className="relative h-[400vh] bg-black"
    >
      {/* ── Sticky Container ── */}
      <div className="sticky top-0 flex h-screen w-full flex-col items-center justify-center overflow-hidden py-24">
        
        {/* ── Ambient Background Glow ── */}
        <motion.div
          className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full z-0"
          style={{
            background:
              "radial-gradient(ellipse, rgba(41,141,255,0.06) 0%, transparent 60%)",
            filter: "blur(60px)",
          }}
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.5, 0.7, 0.5],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* ── Section Header ── */}
        <div className="relative z-10 mb-12 flex flex-col items-center text-center px-4">
          <span
            className="mb-4 text-[11.5px] font-semibold uppercase tracking-[0.25em]"
            style={{ color: ACCENT }}
          >
            07 — Achievements
          </span>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-white md:text-5xl">
            Proof of Impact
          </h2>
          <p className="max-w-md text-[14.5px] leading-relaxed text-white/50">
            Real execution. Real consistency. Real outcomes. 
            Building solutions that matter and communities that scale.
          </p>
        </div>

        {/* ── Scroll Stacked Cards ── */}
        <div className="relative z-10 w-full max-w-[360px] h-[380px] md:max-w-[400px]">
          {ACHIEVEMENTS.map((ach, i) => (
            <StackedCard
              key={i}
              achievement={ach}
              index={i}
              progress={smoothProgress}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
