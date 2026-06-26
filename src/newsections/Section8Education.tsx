"use client";

import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const ACCENT = "#298DFF";
const EASE = [0.16, 1, 0.3, 1] as const;

/* ─────────────────────────────────────────────────────────────────────────
   Icons
───────────────────────────────────────────────────────────────────────── */
const Icons = {
  GraduationCap: () => (
    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  ),
  BadgeCheck: () => (
    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  ),
  Cisco: () => (
    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M2 14v-4M6 16v-8M10 18v-12M14 16v-8M18 14v-4M22 12v-0.1" />
    </svg>
  )
};

/* ─────────────────────────────────────────────────────────────────────────
   Main Component
───────────────────────────────────────────────────────────────────────── */
export default function Section8Education() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { margin: "-20% 0px", once: false });

  // Hover state for the 3D Certification Flip Card
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-black py-24 md:py-32 px-4"
    >
      {/* ── Ambient Background Glow ── */}
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(41,141,255,0.03) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
        animate={{ opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* ── Section Header ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.8, ease: EASE }}
        className="relative z-10 flex flex-col items-center text-center mb-16 md:mb-24"
      >
        <span
          className="mb-4 text-[11.5px] font-semibold uppercase tracking-[0.25em]"
          style={{ color: ACCENT }}
        >
          08 — Education
        </span>
        <h2 className="mb-4 text-3xl font-bold tracking-tight text-white md:text-5xl">
          Academic Foundation
        </h2>
        <p className="max-w-[480px] text-[14.5px] leading-relaxed text-white/50">
          Strong academic consistency backed by applied technical learning. A composed record of discipline and rigorous foundational study.
        </p>
      </motion.div>

      {/* ── Layered Composition Container ── */}
      <div className="relative w-full max-w-5xl mx-auto flex flex-col md:block md:h-[480px] gap-8 z-10">
        
        {/* 1. Primary Education Card (Hero) */}
        <motion.div
          className="relative md:absolute md:left-4 md:top-0 md:w-[65%] w-full rounded-2xl bg-[#080808] border border-white/[0.06] p-8 md:p-12 shadow-[0_20px_40px_rgba(0,0,0,0.4)] z-10 group"
          initial={{ opacity: 0, x: -30, y: 20 }}
          animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: -30, y: 20 }}
          transition={{ duration: 1, ease: EASE }}
          whileHover={{ borderColor: "rgba(255,255,255,0.15)" }}
        >
          {/* Subtle Accent Glow on Hover */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#298DFF]/[0.02] rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

          <div className="relative z-10 flex flex-col h-full justify-between">
            <div>
              <div className="mb-8 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/[0.02] border border-white/5 text-[#298DFF]">
                <Icons.GraduationCap />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-2">
                B.Tech in Computer Science<br />& Engineering (IoT)
              </h3>
              <p className="text-base text-white/60 mb-8">
                Malla Reddy College of Engineering and Technology
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 mt-8 pt-8 border-t border-white/[0.04]">
              <span className="text-sm font-medium text-white/40 tracking-wider">
                NOV 2022 – MAY 2026
              </span>
              
              {/* Premium CGPA Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-[#298DFF]/20 bg-[#298DFF]/[0.05] px-4 py-2 shadow-[0_0_20px_rgba(41,141,255,0.05)]">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#298DFF]/70">
                  CGPA
                </span>
                <span className="text-sm font-bold text-[#298DFF]">
                  9.04
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 2. Secondary Certification Card (3D Flip) */}
        {/* On desktop, it overlaps the bottom right. On mobile, it just stacks below. */}
        <motion.div
          className="relative md:absolute md:right-4 md:-bottom-8 md:w-[45%] w-full h-[220px] z-20 cursor-pointer"
          style={{ perspective: 1500 }}
          initial={{ opacity: 0, x: 30, y: 40 }}
          animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: 30, y: 40 }}
          transition={{ duration: 1, delay: 0.2, ease: EASE }}
          onMouseEnter={() => setIsFlipped(true)}
          onMouseLeave={() => setIsFlipped(false)}
          onClick={() => setIsFlipped(!isFlipped)} // Fallback for mobile tap
        >
          {/* 3D Flip Wrapper */}
          <motion.div
            className="w-full h-full relative"
            style={{ transformStyle: "preserve-3d" }}
            animate={{ rotateX: isFlipped ? 180 : 0 }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            {/* FRONT OF CARD */}
            <div 
              className="absolute inset-0 w-full h-full rounded-2xl bg-[#0C0C0C] border border-[#298DFF]/20 p-8 shadow-2xl flex flex-col justify-center overflow-hidden"
              style={{ backfaceVisibility: "hidden" }}
            >
              {/* Subtle blue accent bar */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#298DFF]/60 to-transparent opacity-50" />
              
              <div className="flex items-center gap-4 mb-4">
                <div className="h-10 w-10 rounded-lg bg-[#298DFF]/10 flex items-center justify-center text-[#298DFF]">
                  <Icons.BadgeCheck />
                </div>
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#298DFF]">
                  Certification
                </span>
              </div>

              <h4 className="text-lg font-bold text-white tracking-tight">
                CCNA: Introduction to Networks
              </h4>
              <p className="mt-2 text-sm text-white/50">
                Hover to view details
              </p>
            </div>

            {/* BACK OF CARD */}
            <div 
              className="absolute inset-0 w-full h-full rounded-2xl bg-[#298DFF] border border-[#298DFF] p-8 shadow-[0_0_40px_rgba(41,141,255,0.2)] flex flex-col justify-center items-center text-center"
              style={{ backfaceVisibility: "hidden", transform: "rotateX(180deg)" }}
            >
              <div className="text-black mb-3">
                <Icons.Cisco />
              </div>
              <h4 className="text-lg font-extrabold text-black tracking-tight mb-2">
                Cisco Certified
              </h4>
              <p className="text-sm font-medium text-black/70 mb-4">
                Issued in 2024
              </p>
              <span className="inline-block rounded-full bg-black/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-black">
                Verified Credential
              </span>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
