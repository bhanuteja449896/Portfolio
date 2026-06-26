import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";

/* ─── constants ─────────────────────────────────────────────── */
const ACCENT = "#298DFF";
const PANEL_W = 390; // px — each panel's fixed width
const PANEL_GAP = 36; // px — gap between panels

/* ─── data ──────────────────────────────────────────────────── */
const CATS = [
  {
    id: "backend",
    label: "Backend",
    num: "01",
    sub: "Server-side foundations",
    featured: "Python",
    skills: ["Python", "FastAPI", "Django", "Express.js"],
  },
  {
    id: "frontend",
    label: "Frontend",
    num: "02",
    sub: "Client-side delivery",
    featured: "React.js",
    skills: ["JavaScript", "React.js"],
  },
  {
    id: "database",
    label: "Database",
    num: "03",
    sub: "Data persistence layer",
    featured: "PostgreSQL",
    skills: ["SQL", "PostgreSQL", "NoSQL"],
  },
  {
    id: "cloud",
    label: "Cloud",
    num: "04",
    sub: "Infrastructure & deployment",
    featured: "AWS",
    skills: ["AWS (EC2, S3, RDS)"],
  },
  {
    id: "tools",
    label: "Tools",
    num: "05",
    sub: "Development workflow",
    featured: "Docker",
    skills: ["Git", "GitHub", "Docker", "Postman"],
  },
  {
    id: "core",
    label: "Core CS",
    num: "06",
    sub: "Engineering fundamentals",
    featured: "DSA",
    skills: ["Data Structures & Algorithms", "OOP", "DBMS", "REST API Design"],
  },
] as const;

type Cat = (typeof CATS)[number];
const N = CATS.length;

/* ─── SkillChip ─────────────────────────────────────────────── */
function SkillChip({ label }: { label: string }) {
  return (
    <motion.span
      className="inline-flex cursor-default select-none items-center rounded-full px-3.5 py-1.5 text-[12px] font-medium"
      style={{
        border: "1px solid rgba(255,255,255,0.09)",
        background: "rgba(255,255,255,0.03)",
        color: "rgba(255,255,255,0.68)",
      }}
      whileHover={{
        y: -2,
        borderColor: `rgba(41,141,255,0.55)`,
        background: "rgba(41,141,255,0.09)",
        color: "#ffffff",
        boxShadow: "0 0 14px rgba(41,141,255,0.22)",
      }}
      transition={{ type: "spring", stiffness: 360, damping: 24 }}
    >
      {label}
    </motion.span>
  );
}

/* ─── SkillPanel ─────────────────────────────────────────────── */
function SkillPanel({
  cat,
  activity,
}: {
  cat: Cat;
  activity: MotionValue<number>;
}) {
  const opacity     = useTransform(activity, [0, 1], [0.11, 1]);
  const scale       = useTransform(activity, [0, 1], [0.93, 1.0]);
  const borderColor = useTransform(activity, [0, 1], [
    "rgba(255,255,255,0.05)",
    "rgba(41,141,255,0.46)",
  ]);
  const boxShadow = useTransform(activity, [0, 1], [
    "0 2px 12px rgba(0,0,0,0.5)",
    `0 0 0 1px rgba(41,141,255,0.2), 0 16px 64px rgba(0,0,0,0.95), 0 0 72px rgba(41,141,255,0.16)`,
  ]);
  const accentBarH = useTransform(activity, [0, 1], [10, 52]);
  const accentBarGlow = useTransform(activity, [0, 1], [
    "0 0 0px rgba(41,141,255,0)",
    "0 0 22px rgba(41,141,255,0.9)",
  ]);
  const featuredOp = useTransform(activity, [0, 1], [0.14, 1]);
  const numOp      = useTransform(activity, [0, 1], [0.16, 0.45]);

  return (
    <motion.div
      className="group relative flex h-[420px] w-[390px] flex-shrink-0 flex-col overflow-hidden rounded-2xl bg-[#080808]"
      style={{
        opacity,
        scale,
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor,
        boxShadow,
        minWidth: `${PANEL_W}px`,
      }}
    >
      {/* left accent bar — grows taller when active */}
      <motion.span
        className="absolute left-0 top-8 w-[3px] rounded-r-full"
        style={{
          height: accentBarH,
          background: ACCENT,
          boxShadow: accentBarGlow,
        }}
      />

      {/* top-right corner dot */}
      <motion.span
        className="absolute right-5 top-5 h-[7px] w-[7px] rounded-full"
        style={{
          background: ACCENT,
          opacity: featuredOp,
          boxShadow: `0 0 10px ${ACCENT}`,
        }}
      />

      {/* hover inner halo */}
      <span
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(200px 160px at 0% 0%, rgba(41,141,255,0.11), transparent 70%)",
        }}
      />

      <div className="flex flex-1 flex-col p-7 pl-10">
        {/* panel number */}
        <motion.div
          className="mb-5 flex items-center justify-between"
          style={{ opacity: numOp }}
        >
          <span
            className="font-mono text-[10.5px] uppercase tracking-[0.22em]"
            style={{ color: ACCENT }}
          >
            {cat.num} / 06
          </span>
          <span className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-white/18">
            {cat.id}
          </span>
        </motion.div>

        {/* featured skill — large type */}
        <motion.div className="mb-5" style={{ opacity: featuredOp }}>
          <div
            className="font-bold leading-none tracking-tight text-white"
            style={{ fontSize: "clamp(2rem, 3.4vw, 2.8rem)" }}
          >
            {cat.featured}
          </div>
        </motion.div>

        {/* accent line + category label */}
        <div className="mb-1">
          <div
            className="mb-3 h-px w-8"
            style={{ background: "rgba(255,255,255,0.10)" }}
          />
          <h3 className="text-[15px] font-semibold tracking-tight text-white">
            {cat.label}
          </h3>
          <p className="mt-0.5 text-[10.5px] font-medium uppercase tracking-[0.16em] text-white/28">
            {cat.sub}
          </p>
        </div>

        {/* spacer */}
        <div className="flex-1" />

        {/* divider */}
        <div
          className="my-5 h-px w-full"
          style={{ background: "rgba(255,255,255,0.055)" }}
        />

        {/* skill chips */}
        <div className="flex flex-wrap gap-2">
          {cat.skills.map((s) => (
            <SkillChip key={s} label={s} />
          ))}
        </div>

        {/* chip count */}
        <div className="mt-4 flex items-center gap-2">
          <div
            className="h-px flex-1"
            style={{ background: "rgba(255,255,255,0.04)" }}
          />
          <span className="font-mono text-[9.5px] text-white/18">
            {cat.skills.length}{" "}
            {cat.skills.length === 1 ? "technology" : "technologies"}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── background geometry ────────────────────────────────────── */
function S3Background() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* wide diffused center glow */}
      <div
        className="absolute left-1/2 top-1/2 h-[500px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(ellipse, rgba(41,141,255,0.07) 0%, transparent 65%)",
          filter: "blur(80px)",
        }}
      />
      {/* right cluster glow */}
      <div
        className="absolute right-[10%] top-1/2 h-[360px] w-[360px] -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(41,141,255,0.10) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      {/* fine grid */}
      <div
        className="absolute inset-0 opacity-[0.055]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />
      {/* top fade from prev section */}
      <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-black to-transparent" />
      {/* bottom fade into next section */}
      <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black to-transparent" />
    </div>
  );
}

/* ─── Section3Skills ─────────────────────────────────────────── */
export default function Section3Skills() {
  const reduced    = useReducedMotion() ?? false;
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef   = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  /* ── Scroll progress 0→1 over section ── */
  const { scrollYProgress } = useScroll({
    target:  sectionRef,
    offset:  ["start start", "end end"],
  });
  const progress = useSpring(scrollYProgress, { damping: 24, stiffness: 100, mass: 0.5 });

  /* ── Dynamic translateX end: measured from DOM ── */
  const endX = useMotionValue(0);

  useEffect(() => {
    const compute = () => {
      const t = trackRef.current;
      const w = wrapperRef.current;
      if (!t || !w) return;
      endX.set(-(t.scrollWidth - w.offsetWidth));
    };
    compute();
    const ro = new ResizeObserver(compute);
    if (trackRef.current)   ro.observe(trackRef.current);
    if (wrapperRef.current) ro.observe(wrapperRef.current);
    return () => ro.disconnect();
  }, [endX]);

  /* ── X translation ── */
  const rawX = useTransform(
    [progress, endX] as MotionValue<number>[],
    ([p, e]: number[]) => p * e,
  );
  const x = useSpring(rawX, { damping: 26, stiffness: 140, mass: 0.3, restDelta: 0.001 });

  /* ── Per-panel activity (0=dim, 1=spotlight) ──
     Panels 0–5 peak at progress ≈ 0, 0.2, 0.4, 0.6, 0.8, 1.0
     Transitions overlap slightly for a smooth hand-off.        */
  const a0 = useTransform(progress, [0, 0, 0.10, 0.22],                   [1,    1,    1,    0.11]);
  const a1 = useTransform(progress, [0, 0.08, 0.16, 0.26, 0.36],          [0.4,  0.4,  1,    1,    0.11]);
  const a2 = useTransform(progress, [0, 0.28, 0.36, 0.46, 0.56],          [0.11, 0.11, 1,    1,    0.11]);
  const a3 = useTransform(progress, [0, 0.48, 0.56, 0.66, 0.76],          [0.11, 0.11, 1,    1,    0.11]);
  const a4 = useTransform(progress, [0, 0.68, 0.76, 0.84, 0.94],          [0.11, 0.11, 1,    1,    0.11]);
  const a5 = useTransform(progress, [0, 0.86, 0.94, 1,    1   ],          [0.11, 0.11, 1,    1,    1   ]);

  const fullAct = useMotionValue(1);
  const activities: MotionValue<number>[] = reduced
    ? [fullAct, fullAct, fullAct, fullAct, fullAct, fullAct]
    : [a0, a1, a2, a3, a4, a5];

  /* ── Active panel index (for tabs + dots) ── */
  const [activeIdx, setActiveIdx] = useState(0);
  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      setActiveIdx(Math.min(N - 1, Math.floor(v * N)));
    });
  }, [scrollYProgress]);

  /* ── Progress bar width ── */
  const barW = useTransform(progress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={sectionRef} id="skills" className="relative bg-black">

      {/* ══════════════════════════════════════════
          DESKTOP — 400vh container, sticky inner
      ══════════════════════════════════════════ */}
      <div className="min-h-[250vh]">
        <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
          <S3Background />

          {/* ── section header ─────────────────── */}
          <div className="relative z-10 flex flex-shrink-0 items-end justify-between px-10 pb-5 pt-10 xl:px-14">
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
                  03 — Skills
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true }}
                transition={{ duration: 0.78, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="font-bold leading-none tracking-[-0.04em] text-white"
                style={{ fontSize: "clamp(2.4rem, 4vw, 3.8rem)" }}
              >
                What I Know
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
                className="mt-2 max-w-[440px] text-[12.5px] leading-relaxed text-white/36"
              >
                Backend-first. Full-stack capable. System-minded.
              </motion.p>
            </div>

            {/* active category indicator */}
            <motion.div
              className="text-right"
              key={activeIdx}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <div
                className="text-[11px] font-semibold uppercase tracking-[0.18em]"
                style={{ color: ACCENT }}
              >
                {CATS[activeIdx].label}
              </div>
              <div className="mt-0.5 font-mono text-[10px] text-white/24">
                {String(activeIdx + 1).padStart(2, "0")} / {String(N).padStart(2, "0")}
              </div>
            </motion.div>
          </div>

          {/* ── category tab rail ──────────────── */}
          <div className="relative z-10 flex flex-shrink-0 items-center px-10 pb-5 xl:px-14">
            {/* rail line */}
            <div
              className="absolute bottom-0 left-10 right-10 h-px xl:left-14 xl:right-14"
              style={{ background: "rgba(255,255,255,0.06)" }}
            />

            {CATS.map((c, i) => {
              const isActive = i === activeIdx;
              return (
                <div key={c.id} className="relative mr-6 pb-3 last:mr-0">
                  <span
                    className="text-[11.5px] font-medium transition-colors duration-300"
                    style={{ color: isActive ? "#fff" : "rgba(255,255,255,0.26)" }}
                  >
                    {c.label}
                  </span>

                  {isActive && (
                    <motion.span
                      layoutId="skillTab"
                      className="absolute bottom-0 left-0 right-0 h-px rounded-full"
                      style={{
                        background: ACCENT,
                        boxShadow: `0 0 6px ${ACCENT}`,
                      }}
                      transition={{ type: "spring", stiffness: 320, damping: 30 }}
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* ── horizontal track area ──────────── */}
          <div ref={wrapperRef} className="relative z-10 min-h-0 flex-1 overflow-hidden">
            <motion.div
              ref={trackRef}
              className="flex h-full items-center px-10 xl:px-14"
              style={{
                x: reduced ? 0 : x,
                gap: `${PANEL_GAP}px`,
              }}
            >
              {CATS.map((cat, i) => (
                <SkillPanel
                  key={cat.id}
                  cat={cat}
                  activity={activities[i]}
                />
              ))}
              {/* trailing spacer so last panel can fully scroll into view */}
              <div style={{ width: "calc(50vw - 200px)", flexShrink: 0 }} />
            </motion.div>
          </div>

          {/* ── progress bar + dots ────────────── */}
          <div className="relative z-10 flex flex-shrink-0 items-center gap-4 px-10 py-5 xl:px-14">
            {/* thin progress bar */}
            <div
              className="relative h-[2px] w-28 overflow-hidden rounded-full"
              style={{ background: "rgba(255,255,255,0.07)" }}
            >
              <motion.div
                className="absolute inset-y-0 left-0 h-full rounded-full"
                style={{
                  width: barW,
                  background: ACCENT,
                  boxShadow: `0 0 6px ${ACCENT}`,
                }}
              />
            </div>

            {/* segment dots */}
            <div className="flex items-center gap-2">
              {CATS.map((_, i) => (
                <motion.span
                  key={i}
                  className="block rounded-full"
                  animate={{
                    width: i === activeIdx ? 20 : 5,
                    background:
                      i === activeIdx ? ACCENT : "rgba(255,255,255,0.16)",
                    boxShadow:
                      i === activeIdx
                        ? `0 0 8px ${ACCENT}`
                        : "none",
                  }}
                  style={{ height: 5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 26 }}
                />
              ))}
            </div>

            <span className="ml-auto text-[10px] uppercase tracking-[0.14em] text-white/20">
              scroll to navigate →
            </span>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          MOBILE — stacked vertical cards
      ══════════════════════════════════════════ */}
      <div className="hidden">
        {/* ambient glow */}
        <div className="pointer-events-none absolute inset-0">
          <div
            className="absolute right-0 top-1/4 h-[280px] w-[280px] rounded-full opacity-40"
            style={{
              background:
                "radial-gradient(circle, rgba(41,141,255,0.2) 0%, transparent 70%)",
              filter: "blur(50px)",
            }}
          />
        </div>

        <div className="relative z-10 px-5 py-16">
          {/* mobile header */}
          <div className="mb-8">
            <div className="mb-3 flex items-center gap-3">
              <span className="h-px w-8" style={{ background: ACCENT }} />
              <span
                className="text-[11px] font-semibold uppercase tracking-[0.2em]"
                style={{ color: ACCENT }}
              >
                03 — Skills
              </span>
            </div>
            <h2
              className="font-bold leading-none tracking-[-0.03em] text-white"
              style={{ fontSize: "clamp(2.4rem, 10vw, 3rem)" }}
            >
              What I Know
            </h2>
            <p className="mt-2.5 text-[13px] leading-relaxed text-white/38">
              Backend-first. Full-stack capable. System-minded.
            </p>
          </div>

          {/* mobile category cards */}
          <div className="flex flex-col gap-4">
            {CATS.map((cat, i) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: i * 0.07,
                  duration: 0.65,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group relative overflow-hidden rounded-2xl bg-[#080808] p-5"
                style={{ border: "1px solid rgba(41,141,255,0.20)" }}
              >
                {/* accent bar */}
                <span
                  className="absolute left-0 top-5 w-[3px] rounded-r-full"
                  style={{
                    height: 36,
                    background: ACCENT,
                    boxShadow: `0 0 10px ${ACCENT}`,
                  }}
                />
                {/* corner dot */}
                <span
                  className="absolute right-4 top-4 h-[6px] w-[6px] rounded-full"
                  style={{ background: ACCENT, boxShadow: `0 0 6px ${ACCENT}` }}
                />
                {/* hover halo */}
                <span
                  className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(120px 100px at 0% 0%, rgba(41,141,255,0.11), transparent 70%)",
                  }}
                />

                <div className="pl-5">
                  <div
                    className="mb-0.5 font-mono text-[9.5px] uppercase tracking-[0.2em]"
                    style={{ color: ACCENT, opacity: 0.5 }}
                  >
                    {cat.num}
                  </div>

                  <div className="mb-0.5 text-[22px] font-bold leading-none text-white">
                    {cat.featured}
                  </div>

                  <h3 className="mb-0.5 text-[14px] font-semibold text-white/80">
                    {cat.label}
                  </h3>
                  <p className="mb-3.5 text-[10px] uppercase tracking-[0.14em] text-white/28">
                    {cat.sub}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {cat.skills.map((s) => (
                      <span
                        key={s}
                        className="inline-flex rounded-full px-3 py-1 text-[11.5px] font-medium text-white/65"
                        style={{
                          border: "1px solid rgba(255,255,255,0.09)",
                          background: "rgba(255,255,255,0.03)",
                        }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
