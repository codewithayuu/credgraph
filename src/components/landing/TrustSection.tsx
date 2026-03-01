"use client";

import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export const TrustSection: React.FC = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section ref={ref} className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-void via-surface-950/35 to-void" />

      <div className="relative section-wrapper">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-crimson-500/8 border border-crimson-500/14 text-micro text-crimson-300 uppercase tracking-widest mb-5">
            The Problem
          </span>
          <h2 className="font-display text-d3 text-white mb-4">
            PDFs are <span className="text-crimson-300 line-through decoration-crimson-500/30">trustworthy</span>{" "}
            <span className="text-gradient-gold">forgeable</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative panel rounded-3xl border border-crimson-500/12 bg-gradient-to-br from-crimson-500/10 to-transparent overflow-hidden"
          >
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full blur-3xl bg-crimson-500/10" />
              <div className="absolute inset-0 opacity-[0.12] dot-bg" />
            </div>

            <div className="relative p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-11 h-11 rounded-2xl bg-crimson-500/10 border border-crimson-500/14 flex items-center justify-center text-crimson-300">
                  <MarkBroken />
                </div>
                <h3 className="font-display text-h1 text-white">Today&apos;s reality</h3>
              </div>

              <ul className="space-y-3.5">
                {[
                  "PDF certificates can be forged in minutes",
                  "Verification takes weeks via emails and calls",
                  "Resumes frequently contain inaccurate claims",
                  "Credentials get fragmented across platforms",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-xl bg-crimson-500/8 border border-crimson-500/12 flex items-center justify-center mt-0.5 text-crimson-300">
                      <MarkX />
                    </div>
                    <span className="text-b2 text-surface-400 leading-relaxed">{t}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 pt-6 border-t border-surface-800/55">
                <p className="text-micro uppercase tracking-[0.22em] text-surface-500">Result</p>
                <p className="text-b2 text-surface-400 mt-2">Trust becomes manual, slow, and easy to exploit.</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 28 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="relative panel rounded-3xl border border-neon-500/12 bg-gradient-to-br from-neon-500/10 via-electric-500/6 to-transparent overflow-hidden"
          >
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full blur-3xl bg-neon-500/10" />
              <div className="absolute -left-24 -bottom-24 w-72 h-72 rounded-full blur-3xl bg-electric-500/10" />
              <div className="absolute inset-0 opacity-[0.10] dot-bg" />
            </div>

            <div className="relative p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-11 h-11 rounded-2xl bg-neon-500/10 border border-neon-500/14 flex items-center justify-center text-neon-300">
                  <MarkShield />
                </div>
                <h3 className="font-display text-h1 text-white">With CredGraph</h3>
              </div>

              <ul className="space-y-3.5">
                {[
                  "NFT credentials signed by verified issuers",
                  "Verification in seconds via public link",
                  "Forgery becomes computationally infeasible",
                  "All credentials in one wallet, composable",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-xl bg-neon-500/8 border border-neon-500/12 flex items-center justify-center mt-0.5 text-neon-300">
                      <MarkCheck />
                    </div>
                    <span className="text-b2 text-surface-300 leading-relaxed">{t}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 pt-6 border-t border-surface-800/55">
                <p className="text-micro uppercase tracking-[0.22em] text-surface-500">Result</p>
                <p className="text-b2 text-surface-400 mt-2">Trust becomes programmable, fast, and auditable.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

/* Marks */
function MarkBroken() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M7 4h7l3 3v13H7z" stroke="currentColor" strokeWidth="1.7" />
      <path d="M14 4v4h4" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M9 14h6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" opacity="0.8" />
      <path d="M9 17h4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" opacity="0.6" />
    </svg>
  );
}
function MarkX() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" />
      <path d="M6 6l12 12" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" />
    </svg>
  );
}
function MarkShield() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
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
function MarkCheck() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
