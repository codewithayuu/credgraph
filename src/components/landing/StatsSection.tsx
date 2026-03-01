"use client";

import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

const ease = [0.16, 1, 0.3, 1] as const;

const stats = [
  {
    value: 3.3,
    suffix: "s",
    label: "Finality",
    desc: "Transaction confirmation",
    tone: "gold" as const,
    decimals: 1,
    glyph: <GlyphFinality />,
  },
  {
    value: 0.001,
    suffix: " ALGO",
    label: "Per Tx",
    desc: "Credential issuance cost",
    tone: "electric" as const,
    decimals: 3,
    glyph: <GlyphCost />,
  },
  {
    value: 100,
    suffix: "%",
    label: "On-Chain",
    desc: "Trust data on Algorand",
    tone: "neon" as const,
    decimals: 0,
    glyph: <GlyphChain />,
  },
  {
    value: 0,
    suffix: "",
    label: "Middlemen",
    desc: "Direct verification",
    tone: "surface" as const,
    decimals: 0,
    glyph: <GlyphNoMiddlemen />,
  },
];

const toneStyles = {
  gold: {
    value: "text-gold-300",
    border: "border-gold-500/14 hover:border-gold-500/22",
    glow: "hover:shadow-glow-gold",
    bg: "from-gold-500/8 to-transparent",
  },
  electric: {
    value: "text-electric-300",
    border: "border-electric-500/14 hover:border-electric-500/22",
    glow: "hover:shadow-glow-electric",
    bg: "from-electric-500/8 to-transparent",
  },
  neon: {
    value: "text-neon-300",
    border: "border-neon-500/14 hover:border-neon-500/22",
    glow: "hover:shadow-glow-neon",
    bg: "from-neon-500/8 to-transparent",
  },
  surface: {
    value: "text-surface-200",
    border: "border-white/6 hover:border-white/10",
    glow: "hover:shadow-panel-hover",
    bg: "from-white/6 to-transparent",
  },
};

export const StatsSection: React.FC = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.18 });

  return (
    <section ref={ref} className="relative py-16 overflow-hidden">
      <div className="highlight-line absolute top-0 left-0 right-0" />
      <div className="highlight-line absolute bottom-0 left-0 right-0" />

      <div className="section-wrapper">
        <div className="panel rounded-3xl border border-surface-800/50 overflow-hidden">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s, i) => {
              const t = toneStyles[s.tone];
              return (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.55, delay: i * 0.08, ease }}
                  className={[
                    "relative p-6 sm:p-7",
                    "border-t border-surface-800/40 first:border-t-0",
                    "lg:border-t-0 lg:border-l lg:first:border-l-0 lg:border-surface-800/40",
                    "transition-[border-color,box-shadow,transform] duration-200",
                    "bg-gradient-to-br",
                    t.bg,
                    "border",
                    t.border,
                    t.glow,
                  ].join(" ")}
                >
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute -right-6 -top-6 opacity-[0.07]">{s.glyph}</div>
                    <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-40" />
                  </div>

                  <div className="relative">
                    <div className={`font-display text-d4 ${t.value} mb-1`}>
                      {s.value === 0 ? (
                        <span>0</span>
                      ) : (
                        <AnimatedCounter end={s.value} suffix={s.suffix} decimals={s.decimals} duration={2} />
                      )}
                    </div>

                    <div className="text-b2 font-bold text-surface-200 mb-0.5">{s.label}</div>
                    <div className="text-b3 text-surface-500">{s.desc}</div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

/* Decorative glyphs (subtle, non-generic, protocol aesthetic) */
function GlyphFinality() {
  return (
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none" className="text-gold-400">
      <path d="M60 12l34 20v40L60 92 26 72V32L60 12z" stroke="currentColor" strokeWidth="2" opacity="0.9" />
      <path d="M60 32l17 10v20L60 72 43 62V42l17-10z" stroke="currentColor" strokeWidth="2" opacity="0.55" />
      <path d="M42 60h36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.55" />
    </svg>
  );
}

function GlyphCost() {
  return (
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none" className="text-electric-400">
      <path d="M26 42h68v40H26z" stroke="currentColor" strokeWidth="2" opacity="0.9" />
      <path d="M36 52h36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.55" />
      <path d="M36 62h26" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.45" />
      <path d="M74 56l14 8-14 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.75" />
    </svg>
  );
}

function GlyphChain() {
  return (
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none" className="text-neon-400">
      <path
        d="M44 44l12-12a16 16 0 0122.6 22.6l-12 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.9"
      />
      <path
        d="M76 76l-12 12A16 16 0 0141.4 65.4l12-12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.65"
      />
      <path d="M52 68l16-16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.45" />
    </svg>
  );
}

function GlyphNoMiddlemen() {
  return (
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none" className="text-surface-200">
      <path d="M34 74V46l26-14 26 14v28L60 88 34 74z" stroke="currentColor" strokeWidth="2" opacity="0.55" />
      <path d="M42 58h36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.35" />
      <path d="M44 76l32-32" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.35" />
    </svg>
  );
}
