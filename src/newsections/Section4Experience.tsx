import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { EXPERIENCE_CARDS } from "../data/portfolioData";

/* ─────────────────────────────────────────────────────────────────────────
   Constants
───────────────────────────────────────────────────────────────────────── */
const ACCENT = "#298DFF";
const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

type CardData = (typeof EXPERIENCE_CARDS)[number];

/* ─────────────────────────────────────────────────────────────────────────
   Background
───────────────────────────────────────────────────────────────────────── */
function S4Background() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* deep center radial glow behind card stack */}
      <div
        className="absolute left-1/2 top-[45%] h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(ellipse, rgba(41,141,255,0.09) 0%, transparent 60%)",
          filter: "blur(100px)",
        }}
      />
      {/* secondary offset glow */}
      <div
        className="absolute left-[58%] top-[40%] h-[400px] w-[400px] -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(41,141,255,0.06) 0%, transparent 70%)",
          filter: "blur(70px)",
        }}
      />
      {/* fine dot grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.55) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />
      {/* arc interface geometry top-left */}
      <svg
        className="absolute left-0 top-0 opacity-[0.035]"
        width="440"
        height="440"
        viewBox="0 0 440 440"
        fill="none"
      >
        <circle cx="0" cy="0" r="200" stroke="white" strokeWidth="1" />
        <circle cx="0" cy="0" r="280" stroke="white" strokeWidth="0.5" />
        <circle cx="0" cy="0" r="360" stroke="white" strokeWidth="0.5" />
      </svg>
      {/* arc bottom-right */}
      <svg
        className="absolute bottom-0 right-0 opacity-[0.035]"
        width="340"
        height="340"
        viewBox="0 0 340 340"
        fill="none"
      >
        <circle cx="340" cy="340" r="180" stroke="white" strokeWidth="1" />
        <circle cx="340" cy="340" r="260" stroke="white" strokeWidth="0.5" />
      </svg>
      {/* section transition fades */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent" />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   Metric badge
───────────────────────────────────────────────────────────────────────── */
function MetricBadge({ value, label }: { value: string; label: string }) {
  return (
    <motion.div
      className="inline-flex flex-col items-center rounded-xl px-5 py-3"
      style={{
        background: "rgba(41,141,255,0.08)",
        border: "1px solid rgba(41,141,255,0.30)",
        boxShadow: "0 0 24px rgba(41,141,255,0.12)",
      }}
      whileHover={{
        y: -3,
        background: "rgba(41,141,255,0.14)",
        boxShadow: "0 0 40px rgba(41,141,255,0.22)",
      }}
      transition={{ type: "spring", stiffness: 380, damping: 26 }}
    >
      <span
        className="font-bold leading-none tracking-tight"
        style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", color: ACCENT }}
      >
        {value}
      </span>
      <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/50">
        {label}
      </span>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   Tag chip
───────────────────────────────────────────────────────────────────────── */
function Tag({ label }: { label: string }) {
  return (
    <span
      className="inline-flex items-center rounded-full px-3 py-1 text-[11px] font-medium text-white/55"
      style={{
        border: "1px solid rgba(255,255,255,0.08)",
        background: "rgba(255,255,255,0.03)",
      }}
    >
      {label}
    </span>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   Experience card (desktop scroll-driven)
───────────────────────────────────────────────────────────────────────── */
interface ExpCardProps {
  card: CardData;
  cardIndex: number;
  totalCards: number;
  scrollProgress: ReturnType<typeof useSpring>;
  reduced: boolean;
}

function ExpCard({ card, cardIndex, scrollProgress, reduced }: ExpCardProps) {
  const n = EXPERIENCE_CARDS.length;
  const segmentSize = 1 / n;
  const peakStart = cardIndex * segmentSize;
  const peakEnd = peakStart + segmentSize;
  // Card 0 starts fully active at progress=0.
  // Other cards start entering a bit before their peak window.
  const entryStart = cardIndex === 0
    ? 0
    : Math.max(0, peakStart - segmentSize * 0.35);


  const yInput = cardIndex === 0
    ? [0, peakEnd, Math.min(peakEnd + segmentSize, 1)]
    : [entryStart, peakStart, peakEnd, Math.min(peakEnd + segmentSize, 1)];
  const yOutput = cardIndex === 0
    ? reduced ? [0, 0, 0] : [0, -20, -36]
    : reduced
      ? [0, 0, 0, 0]
      : [80 + cardIndex * 10, 0, -18, -32];

  const y = useTransform(scrollProgress, yInput, yOutput);


  const scaleInput = cardIndex === 0
    ? [0, peakEnd, Math.min(peakEnd + segmentSize, 1)]
    : [entryStart, peakStart, peakEnd, Math.min(peakEnd + segmentSize, 1)];
  const scaleOutput = cardIndex === 0
    ? reduced ? [1, 1, 1] : [1.0, 0.97, 0.93]
    : reduced ? [1, 1, 1, 1] : [0.92, 1.0, 0.97, 0.93];

  const scale = useTransform(scrollProgress, scaleInput, scaleOutput);


  // Card 0 is already settled at start; others fade in as they enter.
  // Last card never fades (no card after it).
  const isLastCard = cardIndex === n - 1;

  const opacityInput = cardIndex === 0
    ? [0, peakEnd, Math.min(peakEnd + segmentSize * 0.6, 1)]
    : isLastCard
      ? [entryStart, peakStart, peakEnd]
      : [entryStart, peakStart, peakEnd, Math.min(peakEnd + segmentSize * 0.6, 1)];
  const opacityOutput: number[] = cardIndex === 0
    ? reduced ? [1, 1, 0.22] : [1, 0.9, 0.22]
    : isLastCard
      ? reduced ? [1, 1, 1] : [0, 1, 1]
      : reduced ? [1, 1, 1, 1] : [0, 1, 0.9, 0.22];

  const opacity = useTransform(scrollProgress, opacityInput, opacityOutput);



  const borderColor = useTransform(
    scrollProgress,
    [peakStart - 0.05, peakStart, peakEnd, peakEnd + 0.1],
    [
      "rgba(255,255,255,0.06)",
      "rgba(41,141,255,0.40)",
      "rgba(41,141,255,0.22)",
      "rgba(255,255,255,0.06)",
    ]
  );

  const boxShadow = useTransform(
    scrollProgress,
    [peakStart - 0.05, peakStart, peakEnd],
    [
      "0 4px 24px rgba(0,0,0,0.7)",
      "0 0 0 1px rgba(41,141,255,0.18), 0 24px 80px rgba(0,0,0,0.95), 0 0 80px rgba(41,141,255,0.14)",
      "0 8px 40px rgba(0,0,0,0.85)",
    ]
  );

  const blur = useTransform(
    scrollProgress,
    [peakStart, peakEnd, 1],
    ["blur(0px)", "blur(0px)", `blur(${Math.min(cardIndex * 0.6, 2)}px)`]
  );

  // Later cards have higher z-index so each one slides ON TOP of the previous
  const zIndex = cardIndex + 1;

  const hasMetric = "metric" in card && card.metric;

  return (
    <motion.div
      className="group absolute left-0 right-0 mx-auto w-full max-w-[640px]"
      style={{
        y,
        scale,
        opacity,
        zIndex,
        filter: blur,
        top: `${cardIndex * 14}px`,
      }}
    >
      <motion.div
        className="relative overflow-hidden rounded-2xl bg-[#080808]"
        style={{
          borderWidth: "1px",
          borderStyle: "solid",
          borderColor,
          boxShadow,
        }}
        whileHover={{
          borderColor: "rgba(41,141,255,0.55)",
          boxShadow:
            "0 0 0 1px rgba(41,141,255,0.25), 0 24px 80px rgba(0,0,0,0.95), 0 0 60px rgba(41,141,255,0.18)",
        }}
        transition={{ duration: 0.25 }}
      >
        {/* blue left accent bar */}
        <div
          className="absolute left-0 top-8 w-[3px] rounded-r-full"
          style={{
            height: 56,
            background: ACCENT,
            boxShadow: `0 0 18px ${ACCENT}`,
          }}
        />

        {/* top-right corner dot */}
        <div
          className="absolute right-5 top-5 h-2 w-2 rounded-full"
          style={{ background: ACCENT, boxShadow: `0 0 10px ${ACCENT}` }}
        />

        {/* hover inner halo */}
        <span
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(220px 180px at 0% 0%, rgba(41,141,255,0.10), transparent 70%)",
          }}
        />

        <div className="p-7 pl-10">
          {/* card header */}
          <div className="mb-5 flex items-start justify-between gap-4">
            <div>
              <div className="mb-2 flex items-center gap-2.5">
                <span
                  className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em]"
                  style={{ color: ACCENT }}
                >
                  {card.index} — {card.type}
                </span>
              </div>
              <h3
                className="font-bold leading-tight tracking-[-0.03em] text-white"
                style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)" }}
              >
                {card.headline}
              </h3>
            </div>

            {hasMetric && (
              <div className="flex-shrink-0">
                <MetricBadge
                  value={(card as typeof EXPERIENCE_CARDS[1]).metric.value}
                  label={(card as typeof EXPERIENCE_CARDS[1]).metric.label}
                />
              </div>
            )}
          </div>

          {/* divider */}
          <div
            className="mb-5 h-px w-full"
            style={{ background: "rgba(255,255,255,0.055)" }}
          />

          {/* meta row */}
          <div className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-1">
            <span className="text-[13px] font-semibold text-white">
              {card.company}
            </span>
            <span
              className="h-1 w-1 rounded-full"
              style={{ background: "rgba(255,255,255,0.2)" }}
            />
            <span className="text-[12px] text-white/55">{card.role}</span>
            <span
              className="h-1 w-1 rounded-full"
              style={{ background: "rgba(255,255,255,0.2)" }}
            />
            <span className="font-mono text-[11px] text-white/35">
              {card.period}
            </span>
          </div>

          {/* body */}
          <p className="mb-6 text-[13.5px] leading-relaxed text-white/55">
            {card.body}
          </p>

          {/* tags */}
          <div className="flex flex-wrap gap-2">
            {card.tags.map((t) => (
              <Tag key={t} label={t} />
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   Mobile card
───────────────────────────────────────────────────────────────────────── */
function MobileCard({ card, delay }: { card: CardData; delay: number }) {
  const hasMetric = "metric" in card && card.metric;
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: EASE_OUT_EXPO }}
      className="group relative overflow-hidden rounded-2xl bg-[#080808]"
      style={{ border: "1px solid rgba(41,141,255,0.18)" }}
    >
      <div
        className="absolute left-0 top-6 w-[3px] rounded-r-full"
        style={{ height: 44, background: ACCENT, boxShadow: `0 0 10px ${ACCENT}` }}
      />
      <div
        className="absolute right-4 top-4 h-[7px] w-[7px] rounded-full"
        style={{ background: ACCENT, boxShadow: `0 0 8px ${ACCENT}` }}
      />
      <span
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(140px 120px at 0% 0%, rgba(41,141,255,0.10), transparent 70%)",
        }}
      />

      <div className="p-5 pl-8">
        <div
          className="mb-1.5 font-mono text-[9.5px] font-semibold uppercase tracking-[0.22em]"
          style={{ color: ACCENT }}
        >
          {card.index} — {card.type}
        </div>

        <div className="mb-3 flex items-start justify-between gap-3">
          <h3 className="text-[1.25rem] font-bold leading-tight tracking-tight text-white">
            {card.headline}
          </h3>
          {hasMetric && (
            <div
              className="flex-shrink-0 rounded-lg px-3 py-2 text-center"
              style={{
                background: "rgba(41,141,255,0.10)",
                border: "1px solid rgba(41,141,255,0.28)",
              }}
            >
              <div
                className="text-[1.1rem] font-bold leading-none"
                style={{ color: ACCENT }}
              >
                {(card as typeof EXPERIENCE_CARDS[1]).metric.value}
              </div>
              <div className="mt-0.5 text-[9px] uppercase tracking-[0.14em] text-white/45">
                {(card as typeof EXPERIENCE_CARDS[1]).metric.label}
              </div>
            </div>
          )}
        </div>

        <div
          className="mb-3 h-px w-full"
          style={{ background: "rgba(255,255,255,0.055)" }}
        />

        <p className="mb-3 text-[12.5px] leading-relaxed text-white/50">
          {card.body}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {card.tags.map((t) => (
            <span
              key={t}
              className="inline-flex rounded-full px-2.5 py-1 text-[11px] font-medium text-white/55"
              style={{
                border: "1px solid rgba(255,255,255,0.08)",
                background: "rgba(255,255,255,0.03)",
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   Section 4 — Experience (main export)
───────────────────────────────────────────────────────────────────────── */
export default function Section4Experience() {
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

  const [progressPct, setProgressPct] = React.useState(0);
  const [activeCard, setActiveCard] = React.useState(0);

  React.useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      setProgressPct(Math.round(v * 100));
      setActiveCard(Math.min(EXPERIENCE_CARDS.length - 1, Math.floor(v * EXPERIENCE_CARDS.length)));
    });
  }, [scrollYProgress]);

  return (
    <div ref={sectionRef} id="experience" className="relative bg-black">

      {/* ════════════════════════════════════════════════════════════
          DESKTOP — tall scrollable section with sticky inner stage
      ════════════════════════════════════════════════════════════ */}
      <div style={{ minHeight: "300vh" }}>
        <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
          <S4Background />

          {/* section header */}
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
                  04 — Experience
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
                Experience
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
                className="mt-2 max-w-[400px] text-[12.5px] leading-relaxed text-white/36"
              >
                Engineering impact through code. Scroll to reveal the story.
              </motion.p>
            </div>

            <motion.div
              className="text-right"
              key={activeCard}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
            >
              <div
                className="text-[11px] font-semibold uppercase tracking-[0.18em]"
                style={{ color: ACCENT }}
              >
                {EXPERIENCE_CARDS[activeCard].type}
              </div>
              <div className="mt-0.5 font-mono text-[10px] text-white/24">
                {String(activeCard + 1).padStart(2, "0")} /{" "}
                {String(EXPERIENCE_CARDS.length).padStart(2, "0")}
              </div>
            </motion.div>
          </div>

          {/* card stage */}
          <div className="relative z-10 flex flex-1 items-center justify-center overflow-hidden px-10 xl:px-14">
            {/* depth glow behind stack */}
            <div
              className="pointer-events-none absolute left-1/2 top-1/2 h-[360px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-3xl"
              style={{
                background:
                  "radial-gradient(ellipse, rgba(41,141,255,0.04) 0%, transparent 70%)",
                filter: "blur(40px)",
              }}
            />

            {/* stacked cards */}
            <div className="relative w-full max-w-[640px]" style={{ height: 340 }}>
              {EXPERIENCE_CARDS.map((card, i) => (
                <ExpCard
                  key={card.id}
                  card={card}
                  cardIndex={i}
                  totalCards={EXPERIENCE_CARDS.length}
                  scrollProgress={progress}
                  reduced={reduced}
                />
              ))}
            </div>

            {/* right column — identity + metrics */}
            <div className="ml-16 hidden flex-shrink-0 xl:flex xl:flex-col xl:gap-5">
              <motion.div
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-2xl p-6"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  width: 240,
                }}
              >
                <div
                  className="mb-1 font-mono text-[9.5px] font-semibold uppercase tracking-[0.2em]"
                  style={{ color: ACCENT, opacity: 0.7 }}
                >
                  Company
                </div>
                <div className="mb-0.5 text-[17px] font-bold leading-tight text-white">
                  VarenyamAI
                </div>
                <div className="text-[12px] text-white/45">
                  Python Full Stack Developer Intern
                </div>
                <div
                  className="mt-3 h-px w-full"
                  style={{ background: "rgba(255,255,255,0.055)" }}
                />
                <div className="mt-3 font-mono text-[11px] text-white/28">
                  Jun 2025 – Dec 2025
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col gap-3"
              >
                <MetricBadge value="30%" label="Faster APIs" />
                <MetricBadge value="25%" label="Faster Page Load" />
              </motion.div>

              <motion.div
                animate={{ opacity: [0.4, 0.9, 0.4] }}
                transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
                className="flex flex-col items-center gap-1.5"
                style={{ color: "rgba(255,255,255,0.22)" }}
              >
                <span className="text-[10px] uppercase tracking-[0.18em]">scroll</span>
                <div
                  className="h-8 w-px rounded-full"
                  style={{ background: "rgba(41,141,255,0.4)" }}
                />
              </motion.div>
            </div>
          </div>

          {/* progress bar + dots */}
          <div className="relative z-10 flex flex-shrink-0 items-center gap-4 px-10 py-5 xl:px-14">
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

            <div className="flex items-center gap-2">
              {EXPERIENCE_CARDS.map((_, i) => (
                <motion.span
                  key={i}
                  className="block rounded-full"
                  animate={{
                    width: i === activeCard ? 20 : 5,
                    background:
                      i === activeCard ? ACCENT : "rgba(255,255,255,0.16)",
                    boxShadow:
                      i === activeCard ? `0 0 8px ${ACCENT}` : "none",
                  }}
                  style={{ height: 5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 26 }}
                />
              ))}
            </div>

            <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.14em] text-white/18">
              {progressPct}% — scroll to explore →
            </span>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════
          MOBILE — sequential card reveal
      ════════════════════════════════════════════════════════════ */}
      <div className="hidden">
        <div className="pointer-events-none absolute inset-0">
          <div
            className="absolute left-1/2 top-1/4 h-[320px] w-[320px] -translate-x-1/2 rounded-full opacity-50"
            style={{
              background:
                "radial-gradient(circle, rgba(41,141,255,0.14) 0%, transparent 70%)",
              filter: "blur(60px)",
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
                04 — Experience
              </span>
            </div>
            <h2
              className="font-bold leading-none tracking-[-0.03em] text-white"
              style={{ fontSize: "clamp(2.2rem, 10vw, 3rem)" }}
            >
              Experience
            </h2>
            <p className="mt-2.5 text-[13px] leading-relaxed text-white/38">
              Engineering impact through code.
            </p>
          </div>

          {/* identity summary */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
            className="mb-5 rounded-xl p-5"
            style={{
              background: "rgba(41,141,255,0.06)",
              border: "1px solid rgba(41,141,255,0.22)",
            }}
          >
            <div className="mb-1 text-[12px] font-semibold text-white">VarenyamAI</div>
            <div className="text-[12px] text-white/55">Python Full Stack Developer Intern</div>
            <div className="mt-2 font-mono text-[11px] text-white/32">Jun 2025 – Dec 2025</div>
            <div className="mt-3 flex gap-3">
              {[{ v: "30%", l: "Faster APIs" }, { v: "25%", l: "Faster Load" }].map((m) => (
                <div
                  key={m.l}
                  className="flex flex-col items-center rounded-lg px-4 py-2"
                  style={{
                    background: "rgba(41,141,255,0.10)",
                    border: "1px solid rgba(41,141,255,0.25)",
                  }}
                >
                  <span className="text-[1rem] font-bold leading-none" style={{ color: ACCENT }}>{m.v}</span>
                  <span className="mt-0.5 text-[9px] uppercase tracking-[0.12em] text-white/45">{m.l}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* mobile experience cards */}
          <div className="flex flex-col gap-4">
            {EXPERIENCE_CARDS.map((card, i) => (
              <MobileCard key={card.id} card={card} delay={i * 0.08} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
