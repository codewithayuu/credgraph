"use client";

import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const ease = [0.16, 1, 0.3, 1] as const;

const steps = [
  {
    num: "01",
    title: "Institution registers",
    desc: "An institution is approved and anchored in the Issuer Registry. Their wallet becomes a trusted source.",
    tone: "gold" as const,
    mark: <MarkInstitution />,
  },
  {
    num: "02",
    title: "Credential minted",
    desc: "The issuer mints an Algorand NFT with metadata, evidence hash, issuer identity, and timestamps.",
    tone: "electric" as const,
    mark: <MarkMint />,
  },
  {
    num: "03",
    title: "Student owns & composes",
    desc: "Micro-credentials accumulate in the wallet. Rules detect mastery and produce composite credentials.",
    tone: "neon" as const,
    mark: <MarkCompose />,
  },
  {
    num: "04",
    title: "Anyone verifies instantly",
    desc: "A public link proves credentials, issuer status, revocations, and composition proof—no login required.",
    tone: "gold" as const,
    mark: <MarkVerify />,
  },
];

const toneStyles = {
  gold: {
    chip: "bg-gold-500/8 border-gold-500/14 text-gold-300",
    border: "border-gold-500/14 hover:border-gold-500/22",
    glow: "hover:shadow-glow-gold",
    ink: "text-gold-300",
  },
  electric: {
    chip: "bg-electric-500/8 border-electric-500/14 text-electric-300",
    border: "border-electric-500/14 hover:border-electric-500/22",
    glow: "hover:shadow-glow-electric",
    ink: "text-electric-300",
  },
  neon: {
    chip: "bg-neon-500/8 border-neon-500/14 text-neon-300",
    border: "border-neon-500/14 hover:border-neon-500/22",
    glow: "hover:shadow-glow-neon",
    ink: "text-neon-300",
  },
};

export const HowItWorksSection: React.FC = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.08 });

  return (
    <section ref={ref} className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-void via-surface-950/40 to-void" />

      <div className="relative section-wrapper">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-electric-500/8 border border-electric-500/14 text-micro text-electric-300 uppercase tracking-widest mb-5">
            How It Works
          </span>
          <h2 className="font-display text-d3 text-white mb-4">
            Four steps to <span className="text-gradient-electric">trustless verification</span>
          </h2>
          <p className="text-b1 text-surface-400 max-w-2xl mx-auto">
            A full lifecycle: register → issue → compose → verify.
          </p>
        </motion.div>

        {/* Desktop rail */}
        <div className="hidden lg:block">
          <div className="relative panel rounded-3xl border border-surface-800/50 p-8 overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-x-12 top-10 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent opacity-70" />
              <div className="absolute inset-x-12 top-10 h-px bg-gradient-to-r from-transparent via-gold-500/18 to-transparent opacity-50" />
              <div className="absolute inset-0 dot-bg opacity-[0.16]" />
            </div>

            <div className="relative grid grid-cols-4 gap-6">
              {steps.map((s, i) => {
                const t = toneStyles[s.tone];
                return (
                  <motion.div
                    key={s.num}
                    initial={{ opacity: 0, y: 16 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.55, delay: 0.08 * i, ease }}
                    className={[
                      "relative rounded-3xl border bg-gradient-to-br from-white/6 to-transparent",
                      "p-6",
                      t.border,
                      t.glow,
                      "transition-[transform,box-shadow,border-color] duration-200",
                    ].join(" ")}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border ${t.chip}`}>
                        <span className="text-micro font-semibold tracking-[0.22em]">STEP</span>
                        <span className="text-micro font-semibold tracking-[0.22em]">{s.num}</span>
                      </div>
                      <div className={`w-11 h-11 rounded-2xl border border-white/6 bg-surface-900/40 backdrop-blur flex items-center justify-center ${t.ink}`}>
                        {s.mark}
                      </div>
                    </div>

                    <h3 className="mt-5 font-display text-h2 text-white leading-tight">{s.title}</h3>
                    <p className="mt-3 text-b2 text-surface-400 leading-relaxed">{s.desc}</p>

                    {/* connector hint */}
                    {i < steps.length - 1 && (
                      <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full border border-white/8 bg-void flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile vertical */}
        <div className="lg:hidden max-w-2xl mx-auto">
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-gold-500/18 via-electric-500/14 to-neon-500/16" />
            <div className="space-y-6">
              {steps.map((s, i) => {
                const t = toneStyles[s.tone];
                return (
                  <motion.div
                    key={s.num}
                    initial={{ opacity: 0, y: 16 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.55, delay: 0.08 * i, ease }}
                    className="relative pl-12"
                  >
                    <div className="absolute left-[9px] top-7 w-3.5 h-3.5 rounded-full bg-void border border-white/10">
                      <div className={`absolute inset-1 rounded-full ${t.ink.replace("text-", "bg-")}/80`} />
                    </div>

                    <div className={["panel rounded-3xl border p-6", t.border, t.glow].join(" ")}>
                      <div className="flex items-start justify-between gap-4">
                        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border ${t.chip}`}>
                          <span className="text-micro font-semibold tracking-[0.22em]">STEP</span>
                          <span className="text-micro font-semibold tracking-[0.22em]">{s.num}</span>
                        </div>
                        <div className={`w-11 h-11 rounded-2xl border border-white/6 bg-surface-900/40 backdrop-blur flex items-center justify-center ${t.ink}`}>
                          {s.mark}
                        </div>
                      </div>

                      <h3 className="mt-5 font-display text-h2 text-white leading-tight">{s.title}</h3>
                      <p className="mt-3 text-b2 text-surface-400 leading-relaxed">{s.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* Marks */
function MarkInstitution() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M4 10l8-4l8 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 10v8M10 10v8M14 10v8M18 10v8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" opacity="0.75" />
      <path d="M4.8 18.5h14.4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function MarkMint() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M7 7.5h10v10H7z" stroke="currentColor" strokeWidth="1.7" />
      <path d="M9.5 12h5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" opacity="0.75" />
      <path d="M12 4.3v3.2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M12 16.5v3.2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" opacity="0.7" />
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

function MarkVerify() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 3.5c3.4 2.6 6.4 3.1 8.2 3.4c.2 1 .3 2 .3 3c0 5.4-3.7 9.8-8.5 11c-4.8-1.2-8.5-5.6-8.5-11c0-1 .1-2 .3-3C5.6 6.6 8.6 6.1 12 3.5z"
        stroke="currentColor"
        strokeWidth="1.7"
        opacity="0.7"
      />
      <path d="M8.7 12.2l2.1 2.1l4.8-5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
