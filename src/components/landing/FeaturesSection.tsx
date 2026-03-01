"use client";

import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const ease = [0.16, 1, 0.3, 1] as const;

type Tone = "gold" | "electric" | "neon" | "violet" | "crimson" | "azure";

const features: Array<{
  title: string;
  desc: string;
  tone: Tone;
  size: "lg" | "sm";
  mark: React.ReactNode;
}> = [
  {
    title: "On-Chain Issuer Registry",
    desc: "Issuers become verifiable sources. Unregistered credentials are flagged instantly.",
    tone: "gold",
    size: "lg",
    mark: <MarkRegistry />,
  },
  {
    title: "Instant Public Verification",
    desc: "A link shows issuer status, revocations, composition breakdown, and chain proof.",
    tone: "neon",
    size: "lg",
    mark: <MarkVerify />,
  },
  {
    title: "Composable Skill Paths",
    desc: "Micro-credentials merge into mastery once requirements are met.",
    tone: "electric",
    size: "sm",
    mark: <MarkCompose />,
  },
  {
    title: "Student-Owned Credentials",
    desc: "Credentials live in the wallet. Portable by design.",
    tone: "violet",
    size: "sm",
    mark: <MarkWallet />,
  },
  {
    title: "Transparent Revocation",
    desc: "Revocation is an on-chain event with timestamps and reasons.",
    tone: "crimson",
    size: "sm",
    mark: <MarkRevoke />,
  },
  {
    title: "Platform Independent",
    desc: "Even if CredGraph disappears, the chain remains verifiable.",
    tone: "azure",
    size: "sm",
    mark: <MarkGlobe />,
  },
];

const toneStyles: Record<Tone, { border: string; bg: string; glow: string; ink: string }> = {
  gold: {
    border: "border-gold-500/14 hover:border-gold-500/24",
    bg: "from-gold-500/10 to-transparent",
    glow: "hover:shadow-glow-gold",
    ink: "text-gold-300",
  },
  electric: {
    border: "border-electric-500/14 hover:border-electric-500/24",
    bg: "from-electric-500/10 to-transparent",
    glow: "hover:shadow-glow-electric",
    ink: "text-electric-300",
  },
  neon: {
    border: "border-neon-500/14 hover:border-neon-500/24",
    bg: "from-neon-500/10 to-transparent",
    glow: "hover:shadow-glow-neon",
    ink: "text-neon-300",
  },
  violet: {
    border: "border-violet-500/14 hover:border-violet-500/24",
    bg: "from-violet-500/10 to-transparent",
    glow: "hover:shadow-card-hover",
    ink: "text-violet-300",
  },
  crimson: {
    border: "border-crimson-500/14 hover:border-crimson-500/24",
    bg: "from-crimson-500/10 to-transparent",
    glow: "hover:shadow-glow-crimson",
    ink: "text-crimson-300",
  },
  azure: {
    border: "border-azure-500/14 hover:border-azure-500/24",
    bg: "from-azure-500/10 to-transparent",
    glow: "hover:shadow-card-hover",
    ink: "text-azure-300",
  },
};

export const FeaturesSection: React.FC = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.08 });

  return (
    <section ref={ref} className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 dot-bg opacity-[0.28]" />

      <div className="relative section-wrapper">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-500/8 border border-gold-500/14 text-micro text-gold-300 uppercase tracking-widest mb-5">
            Core Features
          </span>
          <h2 className="font-display text-d3 text-white mb-4">
            Trust infrastructure for <span className="text-gradient-gold">education</span>
          </h2>
          <p className="text-b1 text-surface-400 max-w-2xl mx-auto">
            A protocol surface for issuing, composing, and verifying credentials with chain-native proofs.
          </p>
        </motion.div>

        {/* Bento */}
        <div className="grid grid-cols-12 gap-5">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.06, ease }}
              className={f.size === "lg" ? "col-span-12 lg:col-span-6" : "col-span-12 md:col-span-6 lg:col-span-3"}
            >
              <FeatureCard {...f} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

function FeatureCard({ title, desc, tone, mark, size }: { title: string; desc: string; tone: Tone; mark: React.ReactNode; size: "lg" | "sm" }) {
  const t = toneStyles[tone];

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 420, damping: 32 }}
      className={[
        "h-full",
        "panel rounded-3xl overflow-hidden",
        "border",
        t.border,
        "bg-gradient-to-br",
        t.bg,
        t.glow,
        "transition-[transform,box-shadow,border-color] duration-200",
      ].join(" ")}
    >
      <div className="relative p-7">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-80 transition-opacity duration-300" />
          <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full blur-3xl opacity-[0.22] bg-white/10" />
        </div>

        <div className="relative flex items-start justify-between gap-6">
          <div className="max-w-[520px]">
            <h3 className={`font-display ${size === "lg" ? "text-h1" : "text-h2"} text-white leading-tight`}>{title}</h3>
            <p className={`mt-3 ${size === "lg" ? "text-b1" : "text-b2"} text-surface-400 leading-relaxed`}>{desc}</p>
          </div>

          <div className="shrink-0">
            <div className={`w-11 h-11 rounded-2xl border border-white/6 bg-surface-900/40 backdrop-blur flex items-center justify-center ${t.ink}`}>
              {mark}
            </div>
          </div>
        </div>

        <div className="relative mt-7 flex items-center gap-2">
          <span className={`text-micro uppercase tracking-[0.22em] ${t.ink} opacity-85`}>Protocol Primitive</span>
          <span className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
        </div>
      </div>
    </motion.div>
  );
}

/* Bespoke marks */
function MarkRegistry() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 3l8 4.6v6.1c0 4.7-3.2 7.9-8 9.3c-4.8-1.4-8-4.6-8-9.3V7.6L12 3z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path d="M8.3 12.2l2.3 2.3l5.5-5.7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MarkVerify() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M7.5 8.2h9" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M7.5 12h6.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" opacity="0.8" />
      <path d="M7.5 15.8h4.8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" opacity="0.6" />
      <path
        d="M14.2 14.3l1.7 1.7l3.6-3.8"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MarkCompose() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M12 4.6l6 3.4v6.9l-6 3.5l-6-3.5V8l6-3.4z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M6.2 12l5.8 3.3L17.8 12" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" opacity="0.75" />
      <path d="M12 4.6v10.7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.55" />
    </svg>
  );
}

function MarkWallet() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M5.5 7.4h13c1 0 1.8.8 1.8 1.8v7.4c0 1-.8 1.8-1.8 1.8h-13c-1 0-1.8-.8-1.8-1.8V9.2c0-1 .8-1.8 1.8-1.8z" stroke="currentColor" strokeWidth="1.7" />
      <path d="M15.6 12h4.7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M8.2 7.4V6.1c0-.9.7-1.6 1.6-1.6h8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" opacity="0.6" />
    </svg>
  );
}

function MarkRevoke() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M12 8.2v5.4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M12 16.9h.01" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
      <path d="M12 2.9c5 0 9.1 4.1 9.1 9.1S17 21.1 12 21.1S2.9 17 2.9 12S7 2.9 12 2.9z" stroke="currentColor" strokeWidth="1.7" opacity="0.7" />
      <path d="M6.9 17.1l10.2-10.2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" opacity="0.55" />
    </svg>
  );
}

function MarkGlobe() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M12 3.2a8.8 8.8 0 100 17.6 8.8 8.8 0 000-17.6z" stroke="currentColor" strokeWidth="1.7" />
      <path d="M3.4 12h17.2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" opacity="0.75" />
      <path
        d="M12 3.2c2.2 2.5 3.6 5.7 3.6 8.8c0 3.1-1.4 6.3-3.6 8.8c-2.2-2.5-3.6-5.7-3.6-8.8c0-3.1 1.4-6.3 3.6-8.8z"
        stroke="currentColor"
        strokeWidth="1.7"
        opacity="0.6"
      />
    </svg>
  );
}
