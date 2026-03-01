"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { StatusIndicator } from "@/components/ui/StatusIndicator";
import { Button } from "@/components/ui/Button";
import { Circle } from "lucide-react";
import { BrandLogo } from "@/components/ui/BrandLogo";

const micros = [
  { id: "CT-001", name: "React.js Proficiency", earned: true, mark: <MicroMarkCode /> },
  { id: "CT-002", name: "Database Fundamentals", earned: true, mark: <MicroMarkDatabase /> },
  { id: "CT-003", name: "Node.js Backend", earned: true, mark: <MicroMarkRoute /> },
  { id: "CT-004", name: "API Design Mastery", earned: true, mark: <MicroMarkLink /> },
  { id: "CT-005", name: "Cloud Deployment", earned: false, mark: <MicroMarkCloud /> },
];

export const CompositionShowcase: React.FC = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.14 });
  const [completed, setCompleted] = useState(false);

  const earned = completed ? 5 : 4;

  return (
    <section ref={ref} className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 dot-bg opacity-[0.22]" />

      <div className="relative section-wrapper">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-500/8 border border-gold-500/14 text-micro text-gold-300 uppercase tracking-widest mb-5">
            Composition Engine
          </span>
          <h2 className="font-display text-d3 text-white mb-4">
            Micro-credentials <span className="text-gradient-gold">compose into mastery</span>
          </h2>
          <p className="text-b1 text-surface-400 max-w-2xl mx-auto">
            Define skill paths. When prerequisites are met, the composite credential can be issued automatically.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          >
            <Card variant="golden" padding="lg">
              <div className="relative">
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full blur-3xl bg-gold-500/10" />
                  <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full blur-3xl bg-electric-500/8" />
                </div>

                <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 bg-gold-500/10 blur-2xl rounded-full opacity-60"
                      />
                      <BrandLogo size={64} className="relative z-10" />
                    </div>
                    <div>
                      <h3 className="font-display text-h1 text-white leading-tight">
                        Full Stack
                        <span className="text-gradient-gold"> Developer</span>
                      </h3>
                      <p className="text-b3 text-surface-400 mt-1">Composite credential — ABC University (CS)</p>
                    </div>
                  </div>

                  <Badge variant={completed ? "neon" : "gold"} size="lg" dot pulse={completed}>
                    {completed ? "EARNED" : `${earned}/5 COMPLETE`}
                  </Badge>
                </div>

                <ProgressBar
                  value={earned}
                  max={5}
                  label="Skill path progress"
                  showFraction
                  showPercentage
                  size="lg"
                  className="mb-8"
                />

                <div className="space-y-2.5 mb-9">
                  {micros.map((cred, i) => {
                    const isEarned = cred.earned || (completed && cred.id === "CT-005");

                    return (
                      <motion.div
                        key={cred.id}
                        initial={{ opacity: 0, x: -12 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.45, delay: 0.25 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                        className={[
                          "relative rounded-2xl border p-4",
                          "transition-[border-color,box-shadow,transform,background-color] duration-200",
                          isEarned
                            ? "bg-neon-500/5 border-neon-500/14 hover:border-neon-500/22 hover:shadow-glow-neon"
                            : "bg-surface-900/40 border-surface-800/40 hover:border-surface-700/50 hover:shadow-panel-hover",
                        ].join(" ")}
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className={[
                              "w-10 h-10 rounded-2xl border border-white/6 flex items-center justify-center",
                              isEarned ? "bg-neon-500/10 text-neon-300" : "bg-surface-900/40 text-surface-500",
                            ].join(" ")}
                          >
                            {cred.mark}
                          </div>

                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between gap-3">
                              <span className={`text-b2 font-semibold ${isEarned ? "text-surface-100" : "text-surface-400"}`}>
                                {cred.name}
                              </span>
                              <span className="text-cap font-mono text-surface-600">{cred.id}</span>
                            </div>
                            <div className="mt-2">
                              <StatusIndicator status={isEarned ? "active" : "pending"} label={isEarned ? "Earned" : "Missing"} size="sm" />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                <div className="flex justify-center">
                  {completed ? (
                    <Button
                      variant="secondary"
                      size="lg"
                      icon={<Circle className="w-4 h-4" />}
                      onClick={() => setCompleted(false)}
                    >
                      Reset simulation
                    </Button>
                  ) : (
                    <Button size="lg" onClick={() => setCompleted(true)}>
                      Simulate: earn Cloud Deployment
                    </Button>
                  )}
                </div>

                <AnimatePresence>
                  {completed && (
                    <motion.div
                      initial={{ opacity: 0, y: 14, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: "auto" }}
                      exit={{ opacity: 0, y: -14, height: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="mt-9 overflow-hidden"
                    >
                      <div className="panel rounded-3xl border border-neon-500/14 bg-gradient-to-br from-neon-500/8 to-transparent p-6">
                        <div className="flex items-center justify-between gap-6 flex-wrap">
                          <div>
                            <p className="text-micro uppercase tracking-[0.22em] text-neon-300">Auto-issue trigger</p>
                            <h4 className="font-display text-h2 text-white mt-2">Composite credential issued</h4>
                            <p className="text-b2 text-surface-400 mt-2">
                              All 5 required micro-credentials verified. A mastery credential is minted with a component proof graph.
                            </p>
                          </div>
                          <div className="w-24 h-10 rounded-xl bg-surface-950/40 border border-surface-800/55 overflow-hidden">
                            <div className="h-full shimmer-line opacity-[0.9]" />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

/* Micro marks */
function MicroMarkCode() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M15.5 17.2l4.3-5.2l-4.3-5.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8.5 6.8L4.2 12l4.3 5.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" opacity="0.8" />
    </svg>
  );
}
function MicroMarkDatabase() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M4 7c0 2.2 3.1 4 7 4s7-1.8 7-4s-3.1-4-7-4s-7 1.8-7 4z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M4 7v10c0 2.2 3.1 4 7 4s7-1.8 7-4V7" stroke="currentColor" strokeWidth="1.8" opacity="0.75" />
    </svg>
  );
}
function MicroMarkRoute() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function MicroMarkLink() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M10 13a4.6 4.6 0 006.9.5l2.7-2.7a4.6 4.6 0 00-6.5-6.5l-1.3 1.3"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 11a4.6 4.6 0 00-6.9-.5l-2.7 2.7a4.6 4.6 0 006.5 6.5l1.3-1.3"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.75"
      />
    </svg>
  );
}
function MicroMarkCloud() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M8.7 18h8.3a3.6 3.6 0 00.5-7.2A4.9 4.9 0 008.2 9.7a3.8 3.8 0 00.5 8.3z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M12 12.8v5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" opacity="0.75" />
      <path d="M9.8 15l2.2-2.2L14.2 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" opacity="0.75" />
    </svg>
  );
}
