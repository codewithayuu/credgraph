"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { WalletAddress } from "@/components/ui/WalletAddress";

interface Props {
  address: string;
}

const ease = [0.16, 1, 0.3, 1] as const;

export const VerificationLoading: React.FC<Props> = ({ address }) => {
  const [step, setStep] = useState(0);

  const steps = [
    { label: "Initializing audit pipeline", sub: "Connecting to Algorand Testnet nodes" },
    { label: "Identifying wallet assets", sub: "Fetching ASA registry for target address" },
    { label: "Validating issuer signatures", sub: "Checking credential metadata against registry" },
    { label: "Compiling verification report", sub: "Analyzing composite requirements" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 400);
    return () => clearInterval(interval);
  }, [steps.length]);

  return (
    <div className="relative min-h-[70vh] flex flex-col items-center justify-center p-6 sm:p-10 overflow-hidden">
      <div className="orb orb-electric w-[600px] h-[600px] top-[-300px] right-[-300px] opacity-10" />
      <div className="absolute inset-0 dot-bg opacity-[0.2]" />

      <div className="relative z-10 w-full max-w-lg">
        <div className="flex flex-col items-center text-center">
          <div className="relative">
            <div className="w-16 h-16 rounded-3xl bg-electric-500/10 border border-electric-500/14 shadow-glow-electric flex items-center justify-center text-electric-300">
              <MarkVerifySeal />
            </div>
            <div className="absolute -inset-2 rounded-3xl border border-electric-500/20 animate-ping opacity-20" />
          </div>

          <h2 className="mt-8 font-display text-h1 text-white">Verifying credentials</h2>
          <div className="mt-3 bg-surface-900/40 border border-surface-800/60 rounded-full px-4 py-1.5 inline-flex">
            <WalletAddress address={address} showCopy={false} truncateChars={10} />
          </div>
        </div>

        <div className="mt-12 space-y-4">
          {steps.map((s, i) => {
            const isActive = step === i;
            const isDone = step > i;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0.3, x: -10 }}
                animate={{
                  opacity: isActive || isDone ? 1 : 0.3,
                  x: 0,
                }}
                transition={{ duration: 0.4, ease }}
                className={[
                  "flex items-start gap-4 p-4 rounded-2xl border transition-all duration-300",
                  isActive ? "border-electric-500/30 bg-electric-500/5 shadow-glow-electric/5" : "border-surface-800/50 bg-surface-900/20",
                ].join(" ")}
              >
                <div className={[
                  "w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-300",
                  isDone ? "bg-electric-500 text-void" : isActive ? "bg-electric-500/20 text-electric-300 animate-pulse" : "bg-surface-800 text-surface-500"
                ].join(" ")}>
                  {isDone ? <MarkCheck /> : <MarkNode />}
                </div>

                <div className="min-w-0 py-0.5">
                  <p className={["text-b2 font-semibold transition-colors duration-300", isActive ? "text-white" : isDone ? "text-surface-300" : "text-surface-500"].join(" ")}>
                    {s.label}
                  </p>
                  <p className="text-cap text-surface-500 mt-1">{s.sub}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

/* Marks */
function MarkVerifySeal() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 3l8 4.6v6.1c0 4.7-3.2 7.9-8 9.3c-4.8-1.4-8-4.6-8-9.3V7.6L12 3z"
        stroke="currentColor"
        strokeWidth="2.0"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MarkNode() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M12 2v4m0 12v4M2 12h4m12 0h4m-1.7-6.3l-2.8 2.8m-9 9l-2.8 2.8m0-14.6l2.8 2.8m9 9l2.8 2.8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

function MarkCheck() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-void">
      <path d="M20 6.5L9 17.5L4 12.5" stroke="currentColor" strokeWidth="3.0" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
