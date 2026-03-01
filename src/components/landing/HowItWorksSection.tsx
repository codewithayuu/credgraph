"use client";

import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  UserPlus,
  Award,
  Wallet,
  QrCode,
  ArrowDown,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

const steps = [
  {
    number: "01",
    icon: <UserPlus className="w-7 h-7" />,
    title: "Institution Registers",
    description: "An educational institution is verified and added to the on-chain Issuer Registry. Their wallet address becomes a trusted credential source.",
    color: "brand",
    accent: "from-brand-500 to-brand-400",
    bg: "bg-brand-500/8",
    border: "border-brand-500/20",
    glow: "shadow-brand-500/10",
  },
  {
    number: "02",
    icon: <Award className="w-7 h-7" />,
    title: "Credential Issued as NFT",
    description: "When a student completes a course, the issuer mints a unique credential NFT on Algorand with metadata, evidence hash, and timestamps.",
    color: "cyber",
    accent: "from-cyber-500 to-cyber-400",
    bg: "bg-cyber-500/8",
    border: "border-cyber-500/20",
    glow: "shadow-cyber-500/10",
  },
  {
    number: "03",
    icon: <Wallet className="w-7 h-7" />,
    title: "Student Owns & Composes",
    description: "The NFT lives in the student's wallet. As they earn more, composition rules auto-detect mastery and issue composite credentials.",
    color: "accent",
    accent: "from-accent-500 to-accent-400",
    bg: "bg-accent-500/8",
    border: "border-accent-500/20",
    glow: "shadow-accent-500/10",
  },
  {
    number: "04",
    icon: <QrCode className="w-7 h-7" />,
    title: "Anyone Verifies Instantly",
    description: "Share a link or QR code. Employers see every credential, issuer verification, revocation status, and composition proof — in three seconds.",
    color: "amber",
    accent: "from-amber-500 to-amber-400",
    bg: "bg-amber-500/8",
    border: "border-amber-500/20",
    glow: "shadow-amber-500/10",
  },
];

export const HowItWorksSection: React.FC = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section ref={ref} className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-dark-950 via-dark-900/30 to-dark-950" />

      <div className="relative section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-cyber-500/10 border border-cyber-500/20 text-caption font-semibold text-cyber-400 uppercase tracking-wider mb-4">
            How It Works
          </span>
          <h2 className="text-display-sm md:text-display-md font-black text-white mb-4">
            Four Steps to{" "}
            <span className="gradient-text-accent">Trustless Verification</span>
          </h2>
          <p className="text-body-lg text-dark-400 max-w-2xl mx-auto">
            From institutional registration to instant employer verification — the complete credential lifecycle.
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <div className="absolute left-[28px] md:left-1/2 md:-translate-x-px top-0 bottom-0 w-px bg-gradient-to-b from-brand-500/30 via-cyber-500/20 to-accent-500/30" />

          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.2 }}
              className={`relative flex items-start gap-6 mb-16 last:mb-0 md:gap-12 ${
                i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              <div className="hidden md:block md:w-1/2" />

              <div className="absolute left-[20px] md:left-1/2 md:-translate-x-1/2 z-10">
                <div className={`w-[18px] h-[18px] rounded-full ${step.bg} ${step.border} border-2 flex items-center justify-center`}>
                  <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${step.accent}`} />
                </div>
              </div>

              <div className={`ml-14 md:ml-0 md:w-1/2 ${i % 2 === 0 ? "md:pr-12" : "md:pl-12"}`}>
                <div className={`p-6 rounded-2xl ${step.bg} border ${step.border} hover:shadow-xl hover:${step.glow} transition-all duration-500`}>
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`text-caption font-black bg-gradient-to-r ${step.accent} bg-clip-text text-transparent`}>
                      STEP {step.number}
                    </span>
                  </div>
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.accent} flex items-center justify-center text-white mb-4 shadow-lg`}>
                    {step.icon}
                  </div>
                  <h3 className="text-heading-lg font-bold text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-body-md text-dark-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
