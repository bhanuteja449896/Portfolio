import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import { BookOpen, MapPin, Trophy, User } from "lucide-react";

const ACCENT = "#298DFF";

/* ─────────────────────────────────────────────
   StageDot — glows when its card is active
───────────────────────────────────────────── */
function StageDot({ activity }: { activity: MotionValue<number> }) {
  const size = useTransform(activity, [0, 1], [5, 10]);
  const op   = useTransform(activity, [0, 1], [0.18, 1]);
  const glow = useTransform(activity, [0, 1], [
    "0 0 0px rgba(41,141,255,0)",
    "0 0 14px rgba(41,141,255,1)",
  ]);
  return (
    <motion.span
      className="block flex-shrink-0 rounded-full"
      style={{ width: size, height: size, background: ACCENT, opacity: op, boxShadow: glow }}
    />
  );
}

/* ─────────────────────────────────────────────
   InfoCard — every visual property driven by a
   scroll-linked `activity` MotionValue 0→1.
   0 = deeply dimmed | 1 = full spotlight
───────────────────────────────────────────── */
function InfoCard({
  tag, icon, rotate, posClass, widthClass, zBase,
  activity, yOffset, children,
}: {
  tag: string;
  icon: React.ReactNode;
  rotate: number;
  posClass: string;
  widthClass: string;
  zBase: number;
  activity: MotionValue<number>;
  yOffset: MotionValue<number>;
  children: React.ReactNode;
}) {
  const opacity = useTransform(activity, [0, 1], [0.10, 1]);
  const scale   = useTransform(activity, [0, 1], [0.83, 1.04]);
  const zIndex  = useTransform(activity, (v) => Math.round(v * 50) + zBase);
  const filter  = useTransform(activity, [0, 1], ["blur(3.5px)", "blur(0px)"]);

  const borderColor = useTransform(activity, [0, 1], [
    "rgba(255,255,255,0.05)",
    "rgba(41,141,255,0.54)",
  ]);
  const boxShadow = useTransform(activity, [0, 1], [
    "0 2px 12px rgba(0,0,0,0.3), 0 0 0px rgba(41,141,255,0)",
    "0 24px 72px rgba(0,0,0,0.98), 0 0 0 1px rgba(41,141,255,0.28), 0 0 64px rgba(41,141,255,0.22)",
  ]);

  const barH    = useTransform(activity, [0, 1], [10, 46]);
  const barGlow = useTransform(activity, [0, 1], ["0 0 0px #298DFF", "0 0 24px #298DFF"]);
  const dotBg   = useTransform(activity, [0, 1], ["rgba(255,255,255,0.06)", ACCENT]);
  const dotGlow = useTransform(activity, [0, 1], ["0 0 0px transparent", `0 0 10px ${ACCENT}`]);

  return (
    <motion.div
      className={`absolute ${posClass} ${widthClass} group`}
      style={{ opacity, scale, rotate, zIndex, y: yOffset, filter }}
    >
      <motion.div
        className="relative overflow-hidden rounded-2xl bg-[#080808] p-5"
        style={{ borderWidth: "1px", borderStyle: "solid", borderColor, boxShadow }}
        whileHover={{ y: -5 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {/* left accent bar */}
        <motion.span
          className="absolute left-0 top-4 w-[3px] rounded-full"
          style={{ height: barH, background: ACCENT, boxShadow: barGlow }}
        />

        {/* corner glow dot */}
        <motion.span
          className="absolute right-3 top-3 h-[7px] w-[7px] rounded-full"
          style={{ background: dotBg, boxShadow: dotGlow }}
        />

        {/* hover inner halo */}
        <span
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(140px 120px at 25% 0%, rgba(41,141,255,0.17), transparent 70%)",
          }}
        />

        {/* tag */}
        <div className="mb-3.5 flex items-center gap-1.5 pl-4">
          <span className="flex" style={{ color: ACCENT }}>{icon}</span>
          <span
            className="text-[10.5px] font-semibold uppercase tracking-[0.18em]"
            style={{ color: ACCENT }}
          >
            {tag}
          </span>
        </div>

        {/* body */}
        <div className="pl-4">{children}</div>
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   AboutBackground — static ambient layer
───────────────────────────────────────────── */
function AboutBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute right-[5%] top-[48%] h-[600px] w-[600px] -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(41,141,255,0.28) 0%, rgba(41,141,255,0.07) 42%, transparent 68%)",
          filter: "blur(40px)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.11]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse 56% 68% at 70% 50%, black, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 56% 68% at 70% 50%, black, transparent 80%)",
        }}
      />
      <svg
        className="absolute right-[2%] top-1/2 h-[640px] w-[640px] -translate-y-1/2 opacity-[0.18]"
        viewBox="0 0 640 640"
        fill="none"
      >
        <circle cx="320" cy="320" r="250" stroke="rgba(41,141,255,0.2)" strokeDasharray="6 10" />
        <circle cx="320" cy="320" r="170" stroke="rgba(255,255,255,0.06)" />
        <circle cx="320" cy="320" r="308" stroke="rgba(255,255,255,0.04)" />
        <line x1="320" y1="268" x2="320" y2="290" stroke={ACCENT} strokeOpacity="0.5" strokeWidth="1.5" />
        <line x1="372" y1="320" x2="394" y2="320" stroke={ACCENT} strokeOpacity="0.5" strokeWidth="1.5" />
      </svg>
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black to-transparent" />
    </div>
  );
}

/* ─────────────────────────────────────────────
   Section2About — main export

   Desktop layout:
   ┌──────────────────────────────────────────┐
   │  300vh wrapper (sets section height)     │
   │  ┌─────────────────────────────────────┐ │
   │  │ sticky top-0 h-screen               │ │
   │  │  sticks for 200vh of scroll         │ │
   │  │  • Card 1 spotlight: progress 0→0.28│ │
   │  │  • Card 2 spotlight: 0.28→0.64      │ │
   │  │  • Card 3 spotlight: 0.64→1.0       │ │
   │  │  then naturally scrolls away → §3   │ │
   │  └─────────────────────────────────────┘ │
   └──────────────────────────────────────────┘
───────────────────────────────────────────── */
export default function Section2About() {
  const reduced    = useReducedMotion() ?? false;
  const sectionRef = useRef<HTMLDivElement>(null);

  /* progress 0→1 over 200vh (300vh container − 100vh viewport) */
  const { scrollYProgress } = useScroll({
    target:  sectionRef,
    offset:  ["start start", "end end"],
  });
  const progress = useSpring(scrollYProgress, { damping: 22, stiffness: 100, mass: 0.4 });

  /* ── Card activity: 0 = deeply dimmed | 1 = full spotlight ──────
     Three equal-ish phases across progress 0→1:
       Phase 1  (0.00 – 0.30) → Card 1 prominent
       Phase 2  (0.28 – 0.66) → Card 2 prominent
       Phase 3  (0.62 – 1.00) → Card 3 prominent             */
  const c1 = useTransform(progress,
    [0,    0.06, 0.26, 0.42],
    [0.92, 1,    0.40, 0.10]);

  const c2 = useTransform(progress,
    [0,    0.24, 0.40, 0.60, 0.72, 1   ],
    [0.10, 0.10, 1,    1,    0.10, 0.10]);

  const c3 = useTransform(progress,
    [0,    0.58, 0.76, 1   ],
    [0.10, 0.10, 1,    1   ]);

  /* ── Y-depth: cards move through Z-space as scroll progresses ── */
  const y1 = useTransform(progress, [0, 0.5, 1], [0,   -50, -70]);
  const y2 = useTransform(progress, [0, 0.35, 0.65, 1], [55,  0,   -35, -55]);
  const y3 = useTransform(progress, [0, 0.5, 1], [82,  40,   0  ]);

  /* ── Vertical line fills as user scrolls ── */
  const lineScale = useTransform(progress, [0, 1], [0.06, 1]);

  /* ── Reduced-motion static fallback ── */
  const fullAct = useMotionValue(1);
  const zeroY   = useMotionValue(0);
  const act1 = reduced ? fullAct : c1;
  const act2 = reduced ? fullAct : c2;
  const act3 = reduced ? fullAct : c3;
  const yO1  = reduced ? zeroY  : y1;
  const yO2  = reduced ? zeroY  : y2;
  const yO3  = reduced ? zeroY  : y3;

  return (
    /*
      Outer div: NO height class — gets height from its tallest child.
      On desktop: tallest child = 300vh desktop wrapper → outer = 300vh.
      On mobile:  desktop wrapper is hidden → outer = mobile content height.
    */
    <div ref={sectionRef} id="about" className="relative bg-black">

      {/* ══════════════════════════════════════════════
          DESKTOP — sticky scroll storytelling
          300vh wrapper → sticky lives for 200vh
      ══════════════════════════════════════════════ */}
      <div className="hidden lg:block lg:min-h-[300vh]">
        <div className="sticky top-0 h-screen overflow-hidden">
          <AboutBackground />

          <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-10 xl:px-14">
            <div className="grid w-full items-center gap-6 lg:grid-cols-[1.1fr_0.9fr]">

              {/* ────────── LEFT ────────── */}
              <div className="max-w-[500px]">

                {/* eyebrow */}
                <motion.div
                  initial={{ opacity: 0, x: -14 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className="mb-5 flex items-center gap-3"
                >
                  <span className="h-px w-8" style={{ background: ACCENT }} />
                  <span
                    className="text-[11px] font-semibold uppercase tracking-[0.2em]"
                    style={{ color: ACCENT }}
                  >
                    About
                  </span>
                </motion.div>

                {/* heading */}
                <motion.h2
                  initial={{ opacity: 0, y: 32, filter: "blur(8px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
                  className="font-bold leading-[1.02] tracking-[-0.04em] text-white"
                  style={{ fontSize: "clamp(3rem, 5.6vw, 5.2rem)" }}
                >
                  Know Me
                  <br />
                  <span style={{ color: ACCENT }}>More</span>
                </motion.h2>

                {/* subtitle */}
                <motion.p
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-3.5 text-[14.5px] font-medium text-white/55"
                >
                  Python Full Stack Developer focused on scalable systems
                </motion.p>

                {/* divider */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className="my-5 h-px max-w-[300px] origin-left"
                  style={{ background: "rgba(255,255,255,0.08)" }}
                />

                {/* body */}
                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
                  className="max-w-[390px] text-[14px] leading-[1.8] text-white/45"
                >
                  Python full stack developer specializing in FastAPI, Django,
                  React.js and SQL, building scalable and secure web applications
                  deployed on AWS. Focused on performance, reliability and
                  real-world problem solving.
                </motion.p>

                {/* stage dots — glow with their card */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.32 }}
                  className="mt-9 flex items-center gap-3"
                >
                  <StageDot activity={act1} />
                  <StageDot activity={act2} />
                  <StageDot activity={act3} />
                  <span className="ml-1 text-[10px] uppercase tracking-[0.14em] text-white/22">
                    scroll to explore
                  </span>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="mt-6 text-[10px] uppercase tracking-[0.18em] text-white/18"
                >
                  Performance. Architecture. Real-world execution.
                </motion.p>
              </div>

              {/* ────────── RIGHT — card cluster ────────── */}
              <div className="relative mx-auto h-[460px] w-full max-w-[470px]">

                {/* vertical fill line */}
                <div
                  className="absolute -left-3 top-0 h-full w-px overflow-hidden rounded-full"
                  style={{ background: "rgba(255,255,255,0.05)" }}
                >
                  <motion.div
                    className="w-full origin-top rounded-full"
                    style={{
                      scaleY: reduced ? 1 : lineScale,
                      height: "100%",
                      background: ACCENT,
                      boxShadow: `0 0 6px ${ACCENT}`,
                    }}
                  />
                </div>

                {/* Card 1 — Name ─────────────────────────
                    Spotlight at scroll start. Retreats
                    upward as Card 2 rises into focus.    */}
                <InfoCard
                  tag="Name"
                  icon={<User className="h-3.5 w-3.5" />}
                  rotate={-5}
                  posClass="left-[3%] top-[20%]"
                  widthClass="w-[248px]"
                  zBase={10}
                  activity={act1}
                  yOffset={yO1}
                >
                  <h3 className="text-[22px] font-bold leading-tight tracking-tight text-white">
                    Bhanu Teja
                    <br />
                    Makkineni
                  </h3>
                  <p className="mt-2 text-[12.5px] text-white/48">
                    Python Full Stack Developer
                  </p>
                  <div className="mt-2.5 flex items-center gap-1.5">
                    <MapPin className="h-3 w-3 shrink-0" style={{ color: ACCENT }} />
                    <span className="text-[11.5px] text-white/34">Hyderabad, India</span>
                  </div>
                </InfoCard>

                {/* Card 2 — Education ───────────────────
                    Starts lower, rises through mid-scroll,
                    then fades as Card 3 takes focus.     */}
                <InfoCard
                  tag="Education"
                  icon={<BookOpen className="h-3.5 w-3.5" />}
                  rotate={4}
                  posClass="right-[1%] top-[4%]"
                  widthClass="w-[260px]"
                  zBase={8}
                  activity={act2}
                  yOffset={yO2}
                >
                  <h3 className="text-[13px] font-semibold leading-snug text-white">
                    B.Tech in Computer Science
                    <br />
                    and Engineering (IoT)
                  </h3>
                  <p className="mt-1.5 text-[11.5px] leading-relaxed text-white/42">
                    Malla Reddy College of Engineering
                    <br />
                    and Technology
                  </p>
                  <p className="mt-1 text-[11px] text-white/28">Nov 2022 – May 2026</p>
                  <div
                    className="mt-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1"
                    style={{
                      border: "1px solid rgba(41,141,255,0.28)",
                      backgroundColor: "rgba(41,141,255,0.09)",
                    }}
                  >
                    <span className="text-[11px] font-semibold" style={{ color: ACCENT }}>
                      CGPA
                    </span>
                    <span className="text-[13px] font-bold text-white">9.04</span>
                  </div>
                </InfoCard>

                {/* Card 3 — Stats ───────────────────────
                    Starts deep-behind, rises last into
                    full spotlight. Stays active at end.  */}
                <InfoCard
                  tag="Stats"
                  icon={<Trophy className="h-3.5 w-3.5" />}
                  rotate={-2}
                  posClass="right-[2%] bottom-[4%]"
                  widthClass="w-[245px]"
                  zBase={12}
                  activity={act3}
                  yOffset={yO3}
                >
                  <div className="space-y-3">
                    {[
                      { v: "800+", l: "LeetCode problems solved" },
                      { v: "2+",   l: "client projects" },
                      { v: "500+", l: "community members" },
                    ].map(({ v, l }) => (
                      <div key={v} className="flex items-baseline gap-2">
                        <span className="text-[21px] font-bold text-white">{v}</span>
                        <span className="text-[11.5px] text-white/40">{l}</span>
                      </div>
                    ))}
                  </div>
                </InfoCard>

              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          MOBILE — stacked whileInView reveal
      ══════════════════════════════════════════════ */}
      <div className="relative lg:hidden">
        <div className="pointer-events-none absolute inset-0">
          <div
            className="absolute right-0 top-1/3 h-[280px] w-[280px] rounded-full opacity-50"
            style={{
              background: "radial-gradient(circle, rgba(41,141,255,0.24) 0%, transparent 70%)",
              filter: "blur(36px)",
            }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-lg px-6 py-20">
          <div className="mb-4 flex items-center gap-3">
            <span className="h-px w-8" style={{ background: ACCENT }} />
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: ACCENT }}>
              About
            </span>
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="font-bold leading-[1.04] tracking-[-0.04em] text-white"
            style={{ fontSize: "clamp(2.8rem,10vw,3.8rem)" }}
          >
            Know Me
            <br />
            <span style={{ color: ACCENT }}>More</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 text-[14px] leading-[1.8] text-white/45"
          >
            Python full stack developer specializing in FastAPI, Django, React.js
            and SQL, building scalable and secure web applications deployed on AWS.
          </motion.p>

          <div className="mt-8 flex flex-col gap-3">
            {(
              [
                {
                  tag: "Name",
                  icon: <User className="h-3.5 w-3.5" />,
                  body: (
                    <>
                      <h3 className="text-lg font-bold text-white">Bhanu Teja Makkineni</h3>
                      <p className="mt-1 text-[13px] text-white/48">Python Full Stack Developer</p>
                      <div className="mt-1.5 flex items-center gap-1.5">
                        <MapPin className="h-3 w-3" style={{ color: ACCENT }} />
                        <span className="text-[12px] text-white/34">Hyderabad, India</span>
                      </div>
                    </>
                  ),
                },
                {
                  tag: "Education",
                  icon: <BookOpen className="h-3.5 w-3.5" />,
                  body: (
                    <>
                      <h3 className="text-[13px] font-semibold text-white">B.Tech CSE (IoT)</h3>
                      <p className="mt-1 text-[12px] text-white/42">
                        Malla Reddy College · Nov 2022 – May 2026
                      </p>
                      <span className="mt-2 inline-block text-[12px] font-bold" style={{ color: ACCENT }}>
                        CGPA 9.04
                      </span>
                    </>
                  ),
                },
                {
                  tag: "Stats",
                  icon: <Trophy className="h-3.5 w-3.5" />,
                  body: (
                    <div className="space-y-1.5">
                      {[["800+","LeetCode problems"],["2+","client projects"],["500+","community members"]].map(([v,l]) => (
                        <p key={v} className="text-sm text-white">
                          <span className="font-bold">{v}</span>{" "}
                          <span className="text-white/45">{l}</span>
                        </p>
                      ))}
                    </div>
                  ),
                },
              ] as const
            ).map(({ tag, icon, body }, i) => (
              <motion.div
                key={tag}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                className="group relative overflow-hidden rounded-2xl bg-[#080808] p-4"
                style={{ border: "1px solid rgba(41,141,255,0.24)" }}
              >
                <span
                  className="absolute left-0 top-4 w-[3px] rounded-full"
                  style={{ background: ACCENT, height: 28, boxShadow: `0 0 10px ${ACCENT}` }}
                />
                <span
                  className="absolute right-3 top-3 h-[6px] w-[6px] rounded-full"
                  style={{ background: ACCENT, boxShadow: `0 0 6px ${ACCENT}` }}
                />
                <span
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background: "radial-gradient(100px 90px at 20% 0%, rgba(41,141,255,0.14), transparent 70%)",
                  }}
                />
                <div className="pl-4">
                  <div className="mb-2.5 flex items-center gap-1.5">
                    <span className="flex" style={{ color: ACCENT }}>{icon}</span>
                    <span className="text-[10px] font-semibold uppercase tracking-[0.16em]" style={{ color: ACCENT }}>
                      {tag}
                    </span>
                  </div>
                  {body}
                </div>
              </motion.div>
            ))}
          </div>

          <p className="mt-7 text-[10px] uppercase tracking-[0.18em] text-white/18">
            Performance. Architecture. Real-world execution.
          </p>
        </div>
      </div>

      {/* bottom fade into next section */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black to-transparent" />
    </div>
  );
}
