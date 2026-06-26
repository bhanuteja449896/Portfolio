"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useInView,
  AnimatePresence,
  useMotionValue,
  useSpring,
  LayoutGroup,
  useReducedMotion,
} from "framer-motion";
import { Mail, Phone, Github, Linkedin, Globe, X, ArrowRight } from "lucide-react";

const ACCENT = "#298DFF";
const EASE = [0.22, 1, 0.36, 1] as const;
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

/* ─────────────────────────────────────────────────────────────────────────
   Scramble Text Component
───────────────────────────────────────────────────────────────────────── */
function ScrambleText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [displayText, setDisplayText] = useState(reduced ? text : "");

  useEffect(() => {
    if (reduced || !isInView) return;
    
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText((prev) =>
        text
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return text[index];
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        clearInterval(interval);
      }
      
      // Speed of deciphering
      iteration += 1 / 2;
    }, 30);

    return () => clearInterval(interval);
  }, [isInView, text, reduced]);

  return (
    <span ref={ref} className={className}>
      {displayText}
    </span>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   Magnetic CTA
───────────────────────────────────────────────────────────────────────── */
function MagneticCTA({
  onClick,
  layoutId,
}: {
  onClick: () => void;
  layoutId: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const reduced = useReducedMotion();

  const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.25);
    y.set((e.clientY - centerY) * 0.25);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className="relative z-10 inline-block p-4 cursor-pointer"
      onClick={onClick}
    >
      <motion.div
        layoutId={layoutId}
        className="group relative flex h-16 w-56 items-center justify-center overflow-hidden rounded-full border border-white/20 bg-[#0A0A0A] shadow-[0_0_30px_rgba(41,141,255,0.15)] transition-colors duration-500 hover:border-[#298DFF]/60 hover:bg-[#111111]"
      >
        <span className="relative z-10 flex items-center gap-3 text-sm font-bold uppercase tracking-[0.15em] text-white transition-colors duration-300 group-hover:text-[#298DFF]">
          Open Channel
          <ArrowRight className="h-4 w-4" />
        </span>
        
        {/* Hover flare */}
        <span className="absolute inset-0 z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <span className="absolute left-1/2 top-1/2 h-24 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#298DFF]/20 blur-2xl" />
        </span>
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   Main Component
───────────────────────────────────────────────────────────────────────── */
export default function Section9Contact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { margin: "-10% 0px", once: true });
  const [isFormOpen, setIsFormOpen] = useState(false);

  const parentVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
  };

  const formStagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
  };

  return (
    <section
      id="contact"
      ref={containerRef}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-black py-24 md:py-32 px-4 sm:px-8 lg:px-12"
    >
      {/* Background glow and subtle scanning lines */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <motion.div
          className="absolute right-[20%] top-[40%] h-[600px] w-[600px] -translate-y-1/2 translate-x-1/2 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(41,141,255,0.04) 0%, transparent 60%)",
            filter: "blur(60px)",
          }}
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 1px, #FFF 1px, #FFF 2px)", backgroundSize: "100% 4px" }}
        />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col lg:flex-row lg:items-center justify-between gap-16 lg:gap-8">
        
        {/* LEFT COLUMN: Narrative & Info */}
        <motion.div
          variants={parentVariants}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="w-full lg:w-1/2 flex flex-col items-start"
        >
          <motion.div variants={childVariants} className="mb-4 inline-flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full animate-pulse bg-[#298DFF] shadow-[0_0_10px_#298DFF]" />
            <span className="text-[11.5px] font-semibold uppercase tracking-[0.25em] text-[#298DFF]">
              Status: Ready
            </span>
          </motion.div>

          <motion.h2 variants={childVariants} className="text-4xl md:text-6xl font-bold tracking-tighter text-white mb-6">
            <ScrambleText text="Get In Touch" />
          </motion.h2>

          <motion.p variants={childVariants} className="max-w-md text-base leading-relaxed text-white/50 mb-10">
            I’m open to backend-heavy Python/FastAPI roles, full-stack projects, and collaborating on scalable, secure web applications. Let’s build something real.
          </motion.p>

          <motion.div variants={childVariants} className="flex flex-col gap-4 w-full max-w-sm">
            <a href="mailto:bhanutejamakkineni@gmail.com" className="group flex items-center gap-4 rounded-xl border border-white/5 bg-white/[0.02] p-4 transition-all duration-300 hover:border-white/15 hover:bg-white/[0.04]">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/[0.04] text-white/60 group-hover:text-[#298DFF] transition-colors">
                <Mail className="h-4 w-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-wider text-white/40">Email</span>
                <span className="text-sm font-medium text-white/90">bhanutejamakkineni@gmail.com</span>
              </div>
            </a>

            <a href="tel:+918328653599" className="group flex items-center gap-4 rounded-xl border border-white/5 bg-white/[0.02] p-4 transition-all duration-300 hover:border-white/15 hover:bg-white/[0.04]">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/[0.04] text-white/60 group-hover:text-[#298DFF] transition-colors">
                <Phone className="h-4 w-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-wider text-white/40">Phone</span>
                <span className="text-sm font-medium text-white/90">+91 8328653599</span>
              </div>
            </a>
          </motion.div>

          <motion.div variants={childVariants} className="flex items-center gap-4 mt-8">
            {[
              { icon: <Github className="h-5 w-5" />, label: "GitHub", href: "#" },
              { icon: <Linkedin className="h-5 w-5" />, label: "LinkedIn", href: "#" },
              { icon: <Globe className="h-5 w-5" />, label: "Portfolio", href: "#" },
            ].map((link, i) => (
              <a
                key={i}
                href={link.href}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-transparent text-white/60 transition-all duration-300 hover:border-[#298DFF]/40 hover:bg-[#298DFF]/10 hover:text-[#298DFF]"
                aria-label={link.label}
              >
                {link.icon}
              </a>
            ))}
          </motion.div>
        </motion.div>

        {/* RIGHT COLUMN: Interactive Form / CTA */}
        <div className="w-full lg:w-1/2 flex items-center justify-center lg:justify-end min-h-[400px]">
          <LayoutGroup>
            <AnimatePresence mode="wait">
              {!isFormOpen ? (
                <motion.div
                  key="cta"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, transition: { duration: 0.1 } }}
                  className="flex items-center justify-center w-full h-full"
                >
                  <MagneticCTA layoutId="contact-panel" onClick={() => setIsFormOpen(true)} />
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  layoutId="contact-panel"
                  className="relative w-full max-w-md rounded-2xl border border-white/10 bg-[#0A0A0A] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden"
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  {/* Top Scanning Line */}
                  <motion.div
                    initial={{ x: "-100%" }}
                    animate={{ x: "100%" }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="absolute left-0 top-0 h-[2px] w-1/2 bg-gradient-to-r from-transparent via-[#298DFF] to-transparent"
                  />

                  <div className="flex items-center justify-between mb-8">
                    <span className="text-xs font-bold uppercase tracking-widest text-[#298DFF]">
                      <ScrambleText text="Channel Open" />
                    </span>
                    <button
                      onClick={() => setIsFormOpen(false)}
                      className="text-white/40 hover:text-white transition-colors p-1"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  <motion.form
                    variants={formStagger}
                    initial="hidden"
                    animate="show"
                    className="flex flex-col gap-5"
                    onSubmit={(e) => {
                      e.preventDefault();
                      // Handle form submission here
                    }}
                  >
                    <motion.div variants={childVariants} className="flex flex-col gap-2">
                      <label htmlFor="name" className="text-[11px] font-semibold uppercase tracking-wider text-white/40">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        required
                        className="w-full rounded-lg border border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition-all focus:border-[#298DFF]/50 focus:bg-[#298DFF]/[0.02] focus:ring-1 focus:ring-[#298DFF]/50"
                        placeholder="John Doe"
                      />
                    </motion.div>

                    <motion.div variants={childVariants} className="flex flex-col gap-2">
                      <label htmlFor="email" className="text-[11px] font-semibold uppercase tracking-wider text-white/40">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        className="w-full rounded-lg border border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition-all focus:border-[#298DFF]/50 focus:bg-[#298DFF]/[0.02] focus:ring-1 focus:ring-[#298DFF]/50"
                        placeholder="john@example.com"
                      />
                    </motion.div>

                    <motion.div variants={childVariants} className="flex flex-col gap-2">
                      <label htmlFor="message" className="text-[11px] font-semibold uppercase tracking-wider text-white/40">
                        Message
                      </label>
                      <textarea
                        id="message"
                        required
                        rows={4}
                        className="w-full resize-none rounded-lg border border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition-all focus:border-[#298DFF]/50 focus:bg-[#298DFF]/[0.02] focus:ring-1 focus:ring-[#298DFF]/50"
                        placeholder="Hello Bhanu..."
                      />
                    </motion.div>

                    <motion.button
                      variants={childVariants}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="mt-4 w-full rounded-lg bg-[#298DFF] px-4 py-3.5 text-sm font-bold text-black shadow-[0_0_20px_rgba(41,141,255,0.3)] transition-shadow hover:shadow-[0_0_30px_rgba(41,141,255,0.5)]"
                    >
                      Send Message
                    </motion.button>
                  </motion.form>
                </motion.div>
              )}
            </AnimatePresence>
          </LayoutGroup>
        </div>

      </div>
    </section>
  );
}
