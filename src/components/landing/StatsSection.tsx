"use client";

import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

const stats = [
  { value: 3.3, suffix: "s", label: "Finality", desc: "Transaction confirmation", color: "text-gold-400", decimals: 1 },
  { value: 0.001, suffix: " ALGO", label: "Per Tx", desc: "Credential issuance cost", color: "text-electric-400", decimals: 3 },
  { value: 100, suffix: "%", label: "On-Chain", desc: "Trust data on Algorand", color: "text-neon-400", decimals: 0 },
  { value: 0, suffix: "", label: "Middlemen", desc: "Direct verification", color: "text-gold-300", decimals: 0 },
];

export const StatsSection: React.FC = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section ref={ref} className="relative py-16 overflow-hidden">
      <div className="highlight-line absolute top-0 left-0 right-0" />
      <div className="highlight-line absolute bottom-0 left-0 right-0" />

      <div className="section-wrapper">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="text-center"
            >
              <div className={`text-d4 font-black ${s.color} mb-1`}>
                {s.value === 0 ? <span>0</span> : <AnimatedCounter end={s.value} suffix={s.suffix} decimals={s.decimals} duration={2} />}
              </div>
              <div className="text-b2 font-bold text-surface-200 mb-0.5">{s.label}</div>
              <div className="text-b3 text-surface-500">{s.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
