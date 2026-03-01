"use client";

import React from "react";
import { motion } from "framer-motion";
import { GlowOrb } from "@/components/ui/GlowOrb";
import { truncateAddress } from "@/lib/utils";
import {
  Search,
  Database,
  ShieldCheck,
  Layers,
  CheckCircle2,
} from "lucide-react";

interface Props {
  address: string;
}

const steps = [
  { icon: <Search className="w-5 h-5" />, label: "Querying Algorand Indexer...", delay: 0 },
  { icon: <Database className="w-5 h-5" />, label: "Fetching credential ASAs...", delay: 0.6 },
  { icon: <ShieldCheck className="w-5 h-5" />, label: "Verifying issuer registry...", delay: 1.0 },
  { icon: <Layers className="w-5 h-5" />, label: "Checking composition rules...", delay: 1.4 },
];

export const VerificationLoading: React.FC<Props> = ({ address }) => {
  return (
    <div className="page-container relative flex items-center justify-center min-h-[80vh]">
      <GlowOrb color="accent" size="lg" className="top-[20%] left-[30%] opacity-20" />

      <div className="absolute inset-0 grid-pattern opacity-30" />

      <div className="relative z-10 max-w-md w-full mx-4">
        <div className="glass-strong rounded-3xl p-10 text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-accent-500 to-emerald-500 mb-6 shadow-xl shadow-accent-500/20"
          >
            <ShieldCheck className="w-8 h-8 text-white" />
          </motion.div>

          <h2 className="text-heading-xl font-bold text-white mb-2">Verifying Credentials</h2>
          <p className="text-body-sm text-dark-400 font-mono mb-8">
            {truncateAddress(address, 8)}
          </p>

          <div className="space-y-3 text-left">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: step.delay }}
                className="flex items-center gap-3 p-3 rounded-xl bg-dark-800/30 border border-dark-700/20"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3, delay: step.delay + 0.2 }}
                  className="w-8 h-8 rounded-lg bg-accent-500/10 flex items-center justify-center text-accent-400"
                >
                  {step.icon}
                </motion.div>
                <span className="text-body-sm text-dark-300">{step.label}</span>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: step.delay + 0.5 }}
                  className="ml-auto"
                >
                  <CheckCircle2 className="w-4 h-4 text-accent-400" />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
