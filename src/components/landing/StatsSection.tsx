"use client";

import React from "react";
import { motion } from "framer-motion";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { useInView } from "react-intersection-observer";
import { Clock, ShieldCheck, Layers, Zap } from "lucide-react";

const stats = [
  {
    value: 3.3,
    suffix: "s",
    label: "Finality Time",
    description: "Transaction confirmation on Algorand",
    icon: <Clock className="w-5 h-5" />,
    color: "text-brand-400",
    bgColor: "bg-brand-500/10",
    decimals: 1,
  },
  {
    value: 0.001,
    prefix: "",
    suffix: " ALGO",
    label: "Per Transaction",
    description: "Cost to issue one credential",
    icon: <Zap className="w-5 h-5" />,
    color: "text-amber-400",
    bgColor: "bg-amber-500/10",
    decimals: 3,
  },
  {
    value: 100,
    suffix: "%",
    label: "On-Chain",
    description: "All trust data lives on Algorand",
    icon: <ShieldCheck className="w-5 h-5" />,
    color: "text-accent-400",
    bgColor: "bg-accent-500/10",
    decimals: 0,
  },
  {
    value: 0,
    suffix: "",
    label: "Middlemen",
    description: "Direct issuer-to-student-to-verifier",
    icon: <Layers className="w-5 h-5" />,
    color: "text-cyber-400",
    bgColor: "bg-cyber-500/10",
    decimals: 0,
  },
];

export const StatsSection: React.FC = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section ref={ref} className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-dark-950 via-dark-900/50 to-dark-950" />
      <div className="glow-line absolute top-0 left-0 right-0" />
      <div className="glow-line absolute bottom-0 left-0 right-0" />

      <div className="relative section-container">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="text-center group"
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${stat.bgColor} mb-4 ${stat.color} transition-transform duration-300 group-hover:scale-110`}>
                {stat.icon}
              </div>
              <div className={`text-display-sm font-black ${stat.color} mb-1`}>
                {stat.value === 0 ? (
                  <span>0{stat.suffix}</span>
                ) : (
                  <AnimatedCounter
                    end={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    decimals={stat.decimals}
                    duration={2}
                  />
                )}
              </div>
              <div className="text-body-md font-semibold text-dark-200 mb-1">
                {stat.label}
              </div>
              <div className="text-body-sm text-dark-500">{stat.description}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
