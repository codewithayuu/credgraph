"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { StatusIndicator } from "@/components/ui/StatusIndicator";
import {
  CheckCircle2,
  Circle,
  Layers,
  ArrowRight,
  Sparkles,
  Crown,
  Code,
  Database,
  Server,
  Plug,
  Cloud,
} from "lucide-react";

const microCredentials = [
  { id: "CT-001", name: "React.js Proficiency", icon: <Code className="w-4 h-4" />, earned: true },
  { id: "CT-002", name: "Database Fundamentals", icon: <Database className="w-4 h-4" />, earned: true },
  { id: "CT-003", name: "Node.js Backend", icon: <Server className="w-4 h-4" />, earned: true },
  { id: "CT-004", name: "API Design Mastery", icon: <Plug className="w-4 h-4" />, earned: true },
  { id: "CT-005", name: "Cloud Deployment", icon: <Cloud className="w-4 h-4" />, earned: false },
];

export const CompositionShowcase: React.FC = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const [simCompleted, setSimCompleted] = useState(false);
  const earnedCount = simCompleted ? 5 : 4;

  return (
    <section ref={ref} className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 dot-pattern opacity-30" />

      <div className="relative section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-caption font-semibold text-amber-400 uppercase tracking-wider mb-4">
            Composition Engine
          </span>
          <h2 className="text-display-sm md:text-display-md font-black text-white mb-4">
            Micro-Credentials{" "}
            <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
              Compose Into Mastery
            </span>
          </h2>
          <p className="text-body-lg text-dark-400 max-w-2xl mx-auto">
            Define skill paths with composition rules. When all prerequisites are earned, the composite credential is automatically issued.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <Card variant="gradient" padding="lg" className="relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-amber-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white shadow-lg shadow-amber-500/20">
                    <Crown className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-heading-lg font-bold text-white">
                      Full Stack Developer
                    </h3>
                    <p className="text-body-sm text-dark-400">
                      Composite Credential — ABC University CS Dept
                    </p>
                  </div>
                </div>
                <Badge
                  variant={simCompleted ? "success" : "warning"}
                  size="lg"
                  dot
                  pulse={simCompleted}
                >
                  {simCompleted ? "EARNED" : `${earnedCount}/5 Complete`}
                </Badge>
              </div>

              <ProgressBar
                value={earnedCount}
                max={5}
                label="Skill Path Progress"
                showFraction
                showPercentage
                size="lg"
                className="mb-8"
              />

              <div className="space-y-3 mb-8">
                {microCredentials.map((cred, i) => {
                  const isEarned = cred.earned || (simCompleted && cred.id === "CT-005");
                  return (
                    <motion.div
                      key={cred.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                      className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-500 ${
                        isEarned
                          ? "bg-accent-500/5 border-accent-500/15"
                          : "bg-dark-800/30 border-dark-700/30"
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        isEarned ? "bg-accent-500/20 text-accent-400" : "bg-dark-700/50 text-dark-500"
                      }`}>
                        {cred.icon}
                      </div>
                      <span className={`flex-1 text-body-md font-medium ${isEarned ? "text-dark-100" : "text-dark-500"}`}>
                        {cred.name}
                      </span>
                      <span className="text-caption font-mono text-dark-600">{cred.id}</span>
                      {isEarned ? (
                        <StatusIndicator status="active" label="Earned" size="sm" />
                      ) : (
                        <StatusIndicator status="pending" label="Missing" size="sm" />
                      )}
                    </motion.div>
                  );
                })}
              </div>

              <div className="flex items-center justify-center">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setSimCompleted(!simCompleted)}
                  className={`flex items-center gap-3 px-8 py-3.5 rounded-xl font-semibold text-body-md transition-all duration-500 ${
                    simCompleted
                      ? "bg-dark-800 text-dark-300 border border-dark-600/50 hover:bg-dark-700"
                      : "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-xl shadow-amber-500/25 hover:shadow-amber-500/40"
                  }`}
                >
                  {simCompleted ? (
                    <>
                      <Circle className="w-4 h-4" />
                      Reset Simulation
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      Simulate: Earn Cloud Deployment
                    </>
                  )}
                </motion.button>
              </div>

              <AnimatePresence>
                {simCompleted && (
                  <motion.div
                    initial={{ opacity: 0, y: 20, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: "auto" }}
                    exit={{ opacity: 0, y: -20, height: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="mt-8 p-6 rounded-xl bg-gradient-to-r from-accent-500/10 via-accent-500/5 to-emerald-500/10 border border-accent-500/20"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <Sparkles className="w-5 h-5 text-accent-400" />
                      <span className="text-heading-md font-bold text-accent-300">
                        Composite Credential Auto-Issued!
                      </span>
                    </div>
                    <p className="text-body-md text-dark-400">
                      All 5 required micro-credentials have been verified. The &ldquo;Full Stack Developer&rdquo; mastery credential has been automatically minted as an NFT and delivered to the student&apos;s wallet.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
