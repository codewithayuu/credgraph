"use client";

import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const features = [
  {
    title: "On-Chain Issuer Registry",
    desc: "Every issuer is verified and recorded on the Algorand blockchain. Credentials from unregistered sources are immediately flagged.",
    iconPath: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
    gradient: "from-gold-500 to-gold-600",
    glow: "bg-gold-500/4",
    borderHover: "hover:border-gold-500/20",
  },
  {
    title: "Composable Skill Paths",
    desc: "Define rules that combine micro-credentials into mastery certifications. When all requirements are met, the composite is auto-issued.",
    iconPath: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
    gradient: "from-electric-500 to-electric-600",
    glow: "bg-electric-500/4",
    borderHover: "hover:border-electric-500/20",
  },
  {
    title: "Instant Public Verification",
    desc: "Share a single link or QR code. Employers verify every credential in seconds without logging in or connecting a wallet.",
    iconPath: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 9a3 3 0 100 6 3 3 0 000-6z",
    gradient: "from-neon-500 to-neon-600",
    glow: "bg-neon-500/4",
    borderHover: "hover:border-neon-500/20",
  },
  {
    title: "Student-Owned Credentials",
    desc: "Credentials live in the student's wallet as NFTs. No institution can silently restrict access. You own your achievements.",
    iconPath: "M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 3a4 4 0 100 8 4 4 0 000-8z",
    gradient: "from-violet-500 to-violet-600",
    glow: "bg-violet-500/4",
    borderHover: "hover:border-violet-500/20",
  },
  {
    title: "Transparent Revocation",
    desc: "Revocations are recorded on-chain with timestamps and reasons. Not silent deletion — an immutable audit trail.",
    iconPath: "M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    gradient: "from-crimson-500 to-crimson-600",
    glow: "bg-crimson-500/4",
    borderHover: "hover:border-crimson-500/20",
  },
  {
    title: "Platform Independent",
    desc: "Even if CredGraph goes offline, every credential remains on the Algorand blockchain, verifiable by anyone reading the chain.",
    iconPath: "M12 2a10 10 0 100 20 10 10 0 000-20zM2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z",
    gradient: "from-azure-500 to-azure-600",
    glow: "bg-azure-500/4",
    borderHover: "hover:border-azure-500/20",
  },
];

export const FeaturesSection: React.FC = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.08 });

  return (
    <section ref={ref} className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 dot-bg opacity-30" />

      <div className="relative section-wrapper">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-gold-500/8 border border-gold-500/15 text-micro text-gold-400 uppercase tracking-widest mb-5">
            Core Features
          </span>
          <h2 className="text-d3 text-white mb-4">
            Trust Infrastructure for <span className="text-gradient-gold">Education</span>
          </h2>
          <p className="text-b1 text-surface-400 max-w-2xl mx-auto">
            Six pillars that transform scattered certificates into a verifiable, composable credential graph.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <div className={`group h-full p-7 rounded-2xl ${f.glow} border border-surface-800/40 ${f.borderHover} transition-all duration-400 hover:shadow-card-hover relative overflow-hidden`}>
                <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-surface-700/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.gradient} flex items-center justify-center mb-5 shadow-lg group-hover:scale-105 transition-transform duration-300`}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d={f.iconPath} />
                  </svg>
                </div>

                <h3 className="text-h3 text-white mb-3">{f.title}</h3>
                <p className="text-b2 text-surface-400 leading-relaxed">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
