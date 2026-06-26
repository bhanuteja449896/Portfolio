import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
  AnimatePresence,
} from "framer-motion";

/* ─────────────────────────────────────────────────────────────────────────
   Constants
───────────────────────────────────────────────────────────────────────── */
const ACCENT = "#298DFF";
const EASE = [0.16, 1, 0.3, 1] as const;

/* ─────────────────────────────────────────────────────────────────────────
   Project data
───────────────────────────────────────────────────────────────────────── */
interface Project {
  id: string;
  index: string;
  title: string;
  tagline: string;
  description: string;
  metric: { value: string; label: string };
  stack: string[];
  accentLabel: string;
}

const PROJECTS: Project[] = [
  {
    id: "ai-college",
    index: "01",
    title: "AI-Integrated College Data Management System",
    tagline: "AI-powered college data insights platform",
    description:
      "An AI-powered backend system enabling natural language queries on structured college data. Combines REST API design with intelligent query parsing to dramatically reduce manual effort.",
    metric: { value: "40%", label: "Manual query effort reduction" },
    stack: ["Python", "FastAPI", "REST APIs", "AI Integration", "SQL / NoSQL"],
    accentLabel: "AI · Backend",
  },
  {
    id: "digital-wallet",
    index: "02",
    title: "Digital Wallet Payment System",
    tagline: "Secure digital wallet with real-time transactions",
    description:
      "Built a secure digital wallet system with robust backend validation, real-time transaction handling, and production-oriented deployment on AWS infrastructure.",
    metric: { value: "1000+", label: "Real-time transactions processed" },
    stack: ["Python", "Django", "React.js", "PostgreSQL", "AWS (EC2, S3, RDS)"],
    accentLabel: "FinTech · Full Stack",
  },
  {
    id: "gatepass",
    index: "03",
    title: "College Gatepass Automation System",
    tagline: "Automated gatepass workflow for colleges",
    description:
      "A full-stack automation platform replacing manual workflows with real-time dashboards, role-based access control, and digital approval chains.",
    metric: { value: "90%", label: "Reduction in manual processing time" },
    stack: ["Python", "Django", "React.js", "PostgreSQL"],
    accentLabel: "Automation · Full Stack",
  },
];

/* ─────────────────────────────────────────────────────────────────────────
   Tech chip
───────────────────────────────────────────────────────────────────────── */
function TechChip({ label, delay }: { label: string; delay: number }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay, ease: EASE }}
      className="inline-flex cursor-default select-none items-center rounded-full px-3.5 py-1.5 text-[11.5px] font-medium"
      style={{
        border: "1px solid rgba(255,255,255,0.10)",
        background: "rgba(255,255,255,0.04)",
        color: "rgba(255,255,255,0.65)",
      }}
      whileHover={{
        y: -2,
        borderColor: "rgba(41,141,255,0.50)",
        background: "rgba(41,141,255,0.08)",
        color: "#ffffff",
        boxShadow: "0 0 12px rgba(41,141,255,0.20)",
      }}
    >
      {label}
    </motion.span>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   Metric badge
───────────────────────────────────────────────────────────────────────── */
function MetricBadge({
  value,
  label,
  delay,
}: {
  value: string;
  label: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.88 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay, ease: EASE }}
      className="inline-flex items-center gap-3 rounded-xl px-5 py-3"
      style={{
        background: "rgba(41,141,255,0.10)",
        border: "1px solid rgba(41,141,255,0.32)",
        boxShadow: "0 0 32px rgba(41,141,255,0.14)",
      }}
      whileHover={{
        y: -2,
        boxShadow: "0 0 48px rgba(41,141,255,0.24)",
      }}
    >
      <span
        className="font-bold leading-none tracking-tight"
        style={{ fontSize: "clamp(1.5rem, 2.8vw, 2rem)", color: ACCENT }}
      >
        {value}
      </span>
      <span className="max-w-[160px] text-[11px] font-medium uppercase leading-tight tracking-[0.14em] text-white/50">
        {label}
      </span>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   Abstract technical visual panel (decorative right-side element)
───────────────────────────────────────────────────────────────────────── */
function TechVisual({ project, active }: { project: Project; active: boolean }) {
  return (
    <motion.div
      className="relative flex h-full w-full items-center justify-center"
      animate={{ opacity: active ? 1 : 0.3 }}
      transition={{ duration: 0.6, ease: EASE }}
    >
      {/* outer ring */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 280,
          height: 280,
          border: `1px solid rgba(41,141,255,${active ? 0.22 : 0.06})`,
        }}
        animate={{ rotate: active ? 360 : 0 }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
      />
      {/* middle ring */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 200,
          height: 200,
          border: `1px solid rgba(255,255,255,${active ? 0.07 : 0.03})`,
        }}
        animate={{ rotate: active ? -360 : 0 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      {/* inner glowing ring */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 130,
          height: 130,
          border: `1.5px solid ${ACCENT}`,
          opacity: active ? 0.7 : 0.15,
          boxShadow: active ? `0 0 36px rgba(41,141,255,0.5), inset 0 0 36px rgba(41,141,255,0.12)` : "none",
        }}
        animate={{ scale: active ? [1, 1.03, 1] : 1 }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* center dot */}
      <motion.div
        className="absolute h-3 w-3 rounded-full"
        style={{
          background: ACCENT,
          boxShadow: active ? `0 0 20px ${ACCENT}` : "none",
          opacity: active ? 1 : 0.3,
        }}
      />

      {/* floating index number */}
      <div
        className="absolute right-0 top-0 font-mono text-[10px] uppercase tracking-[0.2em]"
        style={{ color: active ? ACCENT : "rgba(255,255,255,0.2)" }}
      >
        {project.index} / 03
      </div>

      {/* accent category label */}
      <motion.div
        className="absolute bottom-0 left-0 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em]"
        style={{
          background: "rgba(41,141,255,0.08)",
          border: "1px solid rgba(41,141,255,0.24)",
          color: active ? ACCENT : "rgba(255,255,255,0.3)",
        }}
        animate={{ opacity: active ? 1 : 0.4 }}
      >
        {project.accentLabel}
      </motion.div>

      {/* corner scan lines */}
      {active && (
        <>
          <motion.div
            className="absolute left-0 top-0 h-[1px] w-8"
            style={{ background: ACCENT, opacity: 0.6 }}
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          />
          <motion.div
            className="absolute left-0 top-0 h-8 w-[1px]"
            style={{ background: ACCENT, opacity: 0.6 }}
            initial={{ scaleY: 0, originY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          />
          <motion.div
            className="absolute bottom-0 right-0 h-[1px] w-8"
            style={{ background: ACCENT, opacity: 0.6 }}
            initial={{ scaleX: 0, originX: 1 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          />
          <motion.div
            className="absolute bottom-0 right-0 h-8 w-[1px]"
            style={{ background: ACCENT, opacity: 0.6 }}
            initial={{ scaleY: 0, originY: 1 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          />
        </>
      )}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   Desktop — full spotlight card (one per project, scroll-driven)
───────────────────────────────────────────────────────────────────────── */
interface SpotlightCardProps {
  project: Project;
  cardIndex: number;
  scrollProgress: ReturnType<typeof useSpring>;
  reduced: boolean;
  totalProjects: number;
}

function SpotlightCard({
  project,
  cardIndex,
  scrollProgress,
  reduced,
  totalProjects,
}: SpotlightCardProps) {
  const seg = 1 / totalProjects;
  const peakStart = cardIndex * seg;
  const peakEnd = peakStart + seg;
  const enterAt = Math.max(0, peakStart - seg * 0.3);
  const exitAt = Math.min(1, peakEnd + seg * 0.1);

  // Whether this card is currently in its "active" window
  const isFirst = cardIndex === 0;
  const isLast = cardIndex === totalProjects - 1;

  // Y: enters from below, settles, exits upward
  const yIn = isFirst ? [0, peakEnd, exitAt] : [enterAt, peakStart, peakEnd, exitAt];
  const yOut = isFirst
    ? reduced ? [0, 0, 0] : [0, 0, -60]
    : reduced
    ? [0, 0, 0, 0]
    : [70, 0, 0, -60];

  const y = useTransform(scrollProgress, yIn, yOut);

  // Opacity
  const opIn = isFirst
    ? [0, peakEnd, exitAt]
    : isLast
    ? [enterAt, peakStart, peakEnd]
    : [enterAt, peakStart, peakEnd, exitAt];
  const opOut = isFirst
    ? reduced ? [1, 1, 0.1] : [1, 1, 0.1]
    : isLast
    ? reduced ? [1, 1, 1] : [0, 1, 1]
    : reduced ? [1, 1, 1, 1] : [0, 1, 1, 0.1];

  const opacity = useTransform(scrollProgress, opIn, opOut);

  // Scale
  const scIn = isFirst
    ? [0, peakEnd, exitAt]
    : isLast
    ? [enterAt, peakStart, peakEnd]
    : [enterAt, peakStart, peakEnd, exitAt];
  const scOut = isFirst
    ? reduced ? [1, 1, 1] : [1, 1, 0.95]
    : isLast
    ? reduced ? [1, 1, 1] : [0.94, 1, 1]
    : reduced ? [1, 1, 1, 1] : [0.94, 1, 1, 0.95];

  const scale = useTransform(scrollProgress, scIn, scOut);


  // Border + shadow glow pulse on active
  const borderGlow = useTransform(
    scrollProgress,
    [peakStart - 0.04, peakStart, peakEnd, peakEnd + 0.04],
    [
      "rgba(255,255,255,0.06)",
      "rgba(41,141,255,0.45)",
      "rgba(41,141,255,0.30)",
      "rgba(255,255,255,0.06)",
    ]
  );
  const shadowGlow = useTransform(
    scrollProgress,
    [peakStart - 0.04, peakStart, peakEnd],
    [
      "0 8px 48px rgba(0,0,0,0.8)",
      `0 0 0 1px rgba(41,141,255,0.16), 0 32px 100px rgba(0,0,0,0.98), 0 0 100px rgba(41,141,255,0.18)`,
      "0 12px 60px rgba(0,0,0,0.9)",
    ]
  );

  const [isActive, setIsActive] = useState(isFirst);

  useEffect(() => {
    return scrollProgress.on("change", (v) => {
      setIsActive(v >= peakStart && v < peakEnd);
    });
  }, [scrollProgress, peakStart, peakEnd]);

  return (
    <motion.div
      className="absolute inset-x-0 mx-auto w-full max-w-[900px] px-4"
      style={{ y, scale, opacity, top: `${cardIndex * 4}px`, zIndex: cardIndex + 1 }}
    >
      {/* card shell */}
      <motion.div
        className="group relative overflow-hidden rounded-3xl bg-[#070707]"
        style={{
          borderWidth: "1px",
          borderStyle: "solid",
          borderColor: borderGlow,
          boxShadow: shadowGlow,
          minHeight: 380,
        }}
        whileHover={{
          borderColor: "rgba(41,141,255,0.50)",
          boxShadow:
            "0 0 0 1px rgba(41,141,255,0.22), 0 32px 100px rgba(0,0,0,0.98), 0 0 80px rgba(41,141,255,0.18)",
        }}
        transition={{ duration: 0.25 }}
      >
        {/* left accent bar */}
        <div
          className="absolute left-0 top-10 w-[3px] rounded-r-full"
          style={{ height: 64, background: ACCENT, boxShadow: `0 0 20px ${ACCENT}` }}
        />
        {/* corner dot */}
        <div
          className="absolute right-6 top-6 h-2 w-2 rounded-full"
          style={{ background: ACCENT, boxShadow: `0 0 10px ${ACCENT}` }}
        />
        {/* hover inner halo */}
        <span
          className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(280px 220px at 0% 0%, rgba(41,141,255,0.09), transparent 70%)",
          }}
        />

        {/* inner layout — two cols */}
        <div className="grid h-full grid-cols-1 gap-8 p-8 pl-12 md:grid-cols-[1fr_280px] xl:p-12 xl:pl-16">
          {/* ── left: content ── */}
          <div className="flex flex-col justify-between gap-6">
            {/* top: index + type */}
            <div>
              <div className="mb-3 flex items-center gap-3">
                <span
                  className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.22em]"
                  style={{ color: ACCENT }}
                >
                  {project.index} — Project
                </span>
                <span
                  className="h-px flex-1"
                  style={{ background: "rgba(255,255,255,0.06)" }}
                />
              </div>

              {/* title */}
              <AnimatePresence mode="wait">
                {isActive && (
                  <motion.h3
                    key={project.id + "-title"}
                    initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.55, ease: EASE }}
                    className="mb-2 font-bold leading-tight tracking-[-0.03em] text-white"
                    style={{ fontSize: "clamp(1.5rem, 3vw, 2.4rem)" }}
                  >
                    {project.title}
                  </motion.h3>
                )}
              </AnimatePresence>
              {!isActive && (
                <h3
                  className="mb-2 font-bold leading-tight tracking-[-0.03em] text-white/70"
                  style={{ fontSize: "clamp(1.5rem, 3vw, 2.4rem)" }}
                >
                  {project.title}
                </h3>
              )}

              {/* tagline */}
              <p
                className="mb-5 text-[13px] font-medium uppercase tracking-[0.14em]"
                style={{ color: "rgba(255,255,255,0.35)" }}
              >
                {project.tagline}
              </p>

              {/* description */}
              <p className="max-w-[520px] text-[14px] leading-relaxed text-white/55">
                {project.description}
              </p>
            </div>

            {/* bottom: metric + chips + cta */}
            <div className="flex flex-col gap-5">
              {/* metric */}
              <AnimatePresence mode="wait">
                {isActive ? (
                  <MetricBadge
                    key={project.id + "-metric"}
                    value={project.metric.value}
                    label={project.metric.label}
                    delay={0.12}
                  />
                ) : (
                  <div
                    className="inline-flex items-center gap-3 rounded-xl px-5 py-3 opacity-30"
                    style={{
                      background: "rgba(41,141,255,0.06)",
                      border: "1px solid rgba(41,141,255,0.16)",
                    }}
                  >
                    <span
                      className="font-bold leading-none"
                      style={{ fontSize: "clamp(1.5rem, 2.8vw, 2rem)", color: ACCENT }}
                    >
                      {project.metric.value}
                    </span>
                    <span className="max-w-[160px] text-[11px] uppercase leading-tight tracking-[0.14em] text-white/50">
                      {project.metric.label}
                    </span>
                  </div>
                )}
              </AnimatePresence>

              {/* divider */}
              <div
                className="h-px w-full"
                style={{ background: "rgba(255,255,255,0.055)" }}
              />

              {/* tech chips */}
              <div className="flex flex-wrap gap-2">
                <AnimatePresence mode="wait">
                  {isActive
                    ? project.stack.map((s, i) => (
                        <TechChip key={s} label={s} delay={0.18 + i * 0.06} />
                      ))
                    : project.stack.map((s) => (
                        <span
                          key={s}
                          className="inline-flex items-center rounded-full px-3.5 py-1.5 text-[11.5px] font-medium text-white/25"
                          style={{
                            border: "1px solid rgba(255,255,255,0.06)",
                            background: "rgba(255,255,255,0.02)",
                          }}
                        >
                          {s}
                        </span>
                      ))}
                </AnimatePresence>
              </div>

              {/* CTA */}
              <motion.button
                className="group/btn flex w-fit items-center gap-2 rounded-full px-5 py-2 text-[12px] font-semibold uppercase tracking-[0.16em] text-white/60 transition-colors duration-300"
                style={{
                  border: "1px solid rgba(255,255,255,0.10)",
                  background: "rgba(255,255,255,0.03)",
                }}
                whileHover={{
                  borderColor: "rgba(41,141,255,0.55)",
                  background: "rgba(41,141,255,0.08)",
                  color: "#ffffff",
                  boxShadow: "0 0 24px rgba(41,141,255,0.18)",
                }}
                transition={{ duration: 0.2 }}
              >
                <span>View Case Study</span>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  className="transition-transform duration-200 group-hover/btn:translate-x-0.5"
                >
                  <path
                    d="M2 6h8M7 3l3 3-3 3"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.button>
            </div>
          </div>

          {/* ── right: tech visual ── */}
          <div className="relative hidden md:flex md:items-center md:justify-center">
            <TechVisual project={project} active={isActive} />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   Background
───────────────────────────────────────────────────────────────────────── */
function S5Background({ activeIdx }: { activeIdx: number }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* roaming radial glow that follows active project */}
      <motion.div
        className="absolute h-[600px] w-[600px] rounded-full"
        animate={{
          left: ["40%", "45%", "38%"][activeIdx % 3],
          top: ["35%", "42%", "38%"][activeIdx % 3],
        }}
        transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
        style={{
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(circle, rgba(41,141,255,0.08) 0%, transparent 65%)",
          filter: "blur(80px)",
        }}
      />
      {/* secondary offset glow */}
      <div
        className="absolute right-[15%] top-[30%] h-[380px] w-[380px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(41,141,255,0.05) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      {/* dot grid */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)`,
          backgroundSize: "44px 44px",
        }}
      />
      {/* arc lines top-left */}
      <svg className="absolute left-0 top-0 opacity-[0.03]" width="500" height="500" viewBox="0 0 500 500" fill="none">
        <circle cx="0" cy="0" r="220" stroke="white" strokeWidth="1" />
        <circle cx="0" cy="0" r="310" stroke="white" strokeWidth="0.5" />
        <circle cx="0" cy="0" r="400" stroke="white" strokeWidth="0.5" />
      </svg>
      {/* arc lines bottom-right */}
      <svg className="absolute bottom-0 right-0 opacity-[0.03]" width="400" height="400" viewBox="0 0 400 400" fill="none">
        <circle cx="400" cy="400" r="200" stroke="white" strokeWidth="1" />
        <circle cx="400" cy="400" r="280" stroke="white" strokeWidth="0.5" />
      </svg>
      {/* top fade */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black to-transparent" />
      {/* bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent" />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   Section 5 — Projects
───────────────────────────────────────────────────────────────────────── */
export default function Section5Projects() {
  const reduced = useReducedMotion() ?? false;
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const progress = useSpring(scrollYProgress, {
    damping: 26,
    stiffness: 140,
    mass: 0.3,
    restDelta: 0.001,
  });

  const [activeIdx, setActiveIdx] = useState(0);
  const [progressPct, setProgressPct] = useState(0);

  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      setProgressPct(Math.round(v * 100));
      setActiveIdx(Math.min(PROJECTS.length - 1, Math.floor(v * PROJECTS.length)));
    });
  }, [scrollYProgress]);

  return (
    <div ref={sectionRef} id="projects" className="relative bg-black">

      {/* ══════════════════════════════════════════════════════
          DESKTOP — tall sticky spotlight
      ══════════════════════════════════════════════════════ */}
      <div style={{ minHeight: "250vh" }}>
        <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
          <S5Background activeIdx={activeIdx} />

          {/* ── section header ────────────────────────────── */}
          <div className="relative z-10 flex flex-shrink-0 items-end justify-between px-10 pb-6 pt-12 xl:px-14">
            <div>
              <motion.div
                initial={{ opacity: 0, x: -14 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="mb-2 flex items-center gap-3"
              >
                <span className="h-px w-8" style={{ background: ACCENT }} />
                <span
                  className="text-[11px] font-semibold uppercase tracking-[0.2em]"
                  style={{ color: ACCENT }}
                >
                  05 — Projects
                </span>
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 22, filter: "blur(6px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="font-bold leading-none tracking-[-0.04em] text-white"
                style={{ fontSize: "clamp(2.4rem, 4.2vw, 3.8rem)" }}
              >
                Projects
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
                className="mt-2 max-w-[420px] text-[12.5px] leading-relaxed text-white/36"
              >
                Engineering at scale. Scroll to explore each build.
              </motion.p>
            </div>

            {/* active project counter */}
            <motion.div
              className="text-right"
              key={activeIdx}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
            >
              <div
                className="text-[11px] font-semibold uppercase tracking-[0.18em]"
                style={{ color: ACCENT }}
              >
                {PROJECTS[activeIdx].accentLabel}
              </div>
              <div className="mt-0.5 font-mono text-[10px] text-white/24">
                {String(activeIdx + 1).padStart(2, "0")} /{" "}
                {String(PROJECTS.length).padStart(2, "0")}
              </div>
            </motion.div>
          </div>

          {/* ── spotlight stage ───────────────────────────── */}
          <div className="relative z-10 flex flex-1 items-center justify-center px-6 xl:px-10">
            {/* ambient glow behind active card */}
            <motion.div
              className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-3xl"
              animate={{ opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              style={{
                background: "radial-gradient(ellipse, rgba(41,141,255,0.05) 0%, transparent 70%)",
                filter: "blur(30px)",
              }}
            />

            {/* project cards container */}
            <div className="relative w-full" style={{ height: 520 }}>
              {PROJECTS.map((project, i) => (
                <SpotlightCard
                  key={project.id}
                  project={project}
                  cardIndex={i}
                  scrollProgress={progress}
                  reduced={reduced}
                  totalProjects={PROJECTS.length}
                />
              ))}
            </div>
          </div>

          {/* ── progress bar + nav ────────────────────────── */}
          <div className="relative z-10 flex flex-shrink-0 items-center gap-4 px-10 py-5 xl:px-14">
            {/* bar */}
            <div
              className="relative h-[2px] w-32 overflow-hidden rounded-full"
              style={{ background: "rgba(255,255,255,0.07)" }}
            >
              <motion.div
                className="absolute inset-y-0 left-0 h-full rounded-full"
                style={{
                  width: `${progressPct}%`,
                  background: ACCENT,
                  boxShadow: `0 0 6px ${ACCENT}`,
                }}
              />
            </div>

            {/* project nav dots */}
            <div className="flex items-center gap-2">
              {PROJECTS.map((_, i) => (
                <motion.span
                  key={i}
                  className="block rounded-full"
                  animate={{
                    width: i === activeIdx ? 22 : 5,
                    background: i === activeIdx ? ACCENT : "rgba(255,255,255,0.16)",
                    boxShadow: i === activeIdx ? `0 0 8px ${ACCENT}` : "none",
                  }}
                  style={{ height: 5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 26 }}
                />
              ))}
            </div>

            {/* project title display */}
            <motion.div
              key={activeIdx}
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="ml-2 text-[11px] font-medium text-white/30"
            >
              {PROJECTS[activeIdx].title.split(" ").slice(0, 4).join(" ")}…
            </motion.div>

            <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.14em] text-white/18">
              {progressPct}% — scroll to explore →
            </span>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          MOBILE — stacked spotlight blocks with reveal
      ══════════════════════════════════════════════════════ */}
      <div className="hidden">
        {/* ambient */}
        <div className="pointer-events-none absolute inset-0">
          <div
            className="absolute left-1/2 top-1/4 h-[360px] w-[360px] -translate-x-1/2 rounded-full opacity-50"
            style={{
              background: "radial-gradient(circle, rgba(41,141,255,0.14) 0%, transparent 70%)",
              filter: "blur(70px)",
            }}
          />
        </div>

        <div className="relative z-10 px-5 py-16">
          {/* mobile header */}
          <div className="mb-10">
            <div className="mb-3 flex items-center gap-3">
              <span className="h-px w-8" style={{ background: ACCENT }} />
              <span
                className="text-[11px] font-semibold uppercase tracking-[0.2em]"
                style={{ color: ACCENT }}
              >
                05 — Projects
              </span>
            </div>
            <h2
              className="font-bold leading-none tracking-[-0.03em] text-white"
              style={{ fontSize: "clamp(2.2rem, 10vw, 3rem)" }}
            >
              Projects
            </h2>
            <p className="mt-2.5 text-[13px] leading-relaxed text-white/38">
              Engineering at scale.
            </p>
          </div>

          {/* mobile project cards */}
          <div className="flex flex-col gap-6">
            {PROJECTS.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.75, delay: i * 0.1, ease: EASE }}
                className="group relative overflow-hidden rounded-2xl bg-[#080808]"
                style={{ border: "1px solid rgba(41,141,255,0.20)" }}
              >
                {/* accent bar */}
                <div
                  className="absolute left-0 top-8 w-[3px] rounded-r-full"
                  style={{ height: 52, background: ACCENT, boxShadow: `0 0 14px ${ACCENT}` }}
                />
                {/* corner dot */}
                <div
                  className="absolute right-4 top-4 h-[7px] w-[7px] rounded-full"
                  style={{ background: ACCENT, boxShadow: `0 0 8px ${ACCENT}` }}
                />
                {/* hover halo */}
                <span
                  className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(160px 140px at 0% 0%, rgba(41,141,255,0.10), transparent 70%)",
                  }}
                />

                <div className="p-5 pl-8">
                  {/* index + type */}
                  <div
                    className="mb-2 font-mono text-[9.5px] font-semibold uppercase tracking-[0.22em]"
                    style={{ color: ACCENT }}
                  >
                    {project.index} — Project
                  </div>

                  {/* title */}
                  <h3 className="mb-1.5 text-[1.15rem] font-bold leading-tight tracking-tight text-white">
                    {project.title}
                  </h3>
                  <p className="mb-4 text-[11px] uppercase tracking-[0.14em] text-white/35">
                    {project.tagline}
                  </p>

                  <p className="mb-4 text-[12.5px] leading-relaxed text-white/52">
                    {project.description}
                  </p>

                  {/* metric */}
                  <div
                    className="mb-4 inline-flex items-center gap-3 rounded-xl px-4 py-2.5"
                    style={{
                      background: "rgba(41,141,255,0.10)",
                      border: "1px solid rgba(41,141,255,0.28)",
                    }}
                  >
                    <span
                      className="text-[1.25rem] font-bold leading-none"
                      style={{ color: ACCENT }}
                    >
                      {project.metric.value}
                    </span>
                    <span className="text-[10px] uppercase leading-tight tracking-[0.14em] text-white/45">
                      {project.metric.label}
                    </span>
                  </div>

                  {/* divider */}
                  <div
                    className="mb-4 h-px w-full"
                    style={{ background: "rgba(255,255,255,0.055)" }}
                  />

                  {/* stack chips */}
                  <div className="mb-4 flex flex-wrap gap-1.5">
                    {project.stack.map((s) => (
                      <span
                        key={s}
                        className="inline-flex rounded-full px-3 py-1 text-[11px] font-medium text-white/55"
                        style={{
                          border: "1px solid rgba(255,255,255,0.08)",
                          background: "rgba(255,255,255,0.03)",
                        }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <motion.button
                    className="flex items-center gap-2 rounded-full px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/55"
                    style={{
                      border: "1px solid rgba(255,255,255,0.09)",
                      background: "rgba(255,255,255,0.03)",
                    }}
                    whileHover={{
                      borderColor: "rgba(41,141,255,0.50)",
                      background: "rgba(41,141,255,0.08)",
                      color: "#ffffff",
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    View Case Study
                    <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                      <path
                        d="M2 6h8M7 3l3 3-3 3"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
