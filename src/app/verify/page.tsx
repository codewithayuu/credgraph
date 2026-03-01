"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Search } from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

export default function VerifyPage() {
  const router = useRouter();
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");

  const demo = useMemo(
    () => [
      {
        title: "Demo Student (Rahul)",
        sub: "6 credentials including revocation scenario",
        address: "STUDENT1ABCDEFGHIJKLMNOPQRSTUVWXYZ234567890",
        tone: "gold" as const,
        mark: <MarkShield />,
      },
      {
        title: "Demo Wallet (Empty)",
        sub: "No credentials yet",
        address: "STUDENT2XYZABCDEFGHIJKLMNOPQRSTUVWXYZ234568",
        tone: "electric" as const,
        mark: <MarkWallet />,
      },
    ],
    []
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const v = address.trim();
    if (!v) return setError("Please enter a wallet address");
    if (v.length < 20) return setError("Please enter a valid Algorand wallet address");
    setError("");
    router.push(`/verify/${v}`);
  };

  return (
    <div className="relative min-h-[85vh] flex items-center overflow-hidden">
      {/* Atmosphere */}
      <div className="orb orb-electric w-[620px] h-[620px] top-[-300px] right-[-260px] opacity-20" />
      <div className="orb orb-gold w-[520px] h-[520px] bottom-[-320px] left-[-260px] opacity-16" />
      <div className="absolute inset-0 dot-bg opacity-[0.35]" />

      <div className="relative z-10 section-wrapper w-full py-14">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <motion.div
              animate={{ rotate: [0, 2.5, -2.5, 0] }}
              transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
              className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-electric shadow-glow-electric mb-7"
            >
              <div className="w-10 h-10 text-void">
                <MarkVerifySeal />
              </div>
            </motion.div>

            <h1 className="font-display text-d3 sm:text-d2 text-white mb-3">
              Public <span className="text-gradient-electric">Verification</span>
            </h1>
            <p className="text-b1 text-surface-400 max-w-xl mx-auto text-balance">
              Enter a wallet address. Get issuer verification, revocation history, and chain proof—no login required.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            className="panel rounded-3xl border border-surface-800/50 p-7 sm:p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <Input
                label="Wallet Address"
                placeholder="Enter Algorand wallet address to verify..."
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                  if (error) setError("");
                }}
                error={error}
                icon={<Search className="w-4 h-4" />}
                className="text-b1 py-4"
              />

              <Button type="submit" size="xl" fullWidth iconRight={<ArrowMark />} className="shadow-glow-electric">
                Verify wallet
              </Button>
            </form>

            <div className="mt-7 flex items-center gap-4">
              <div className="flex-1 h-px bg-surface-800/60" />
              <span className="text-micro text-surface-500 uppercase tracking-[0.22em]">or try demo</span>
              <div className="flex-1 h-px bg-surface-800/60" />
            </div>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {demo.map((d) => (
                <button
                  key={d.title}
                  type="button"
                  onClick={() => {
                    setAddress(d.address);
                    router.push(`/verify/${d.address}`);
                  }}
                  className={[
                    "text-left w-full rounded-2xl p-4 border",
                    "transition-[border-color,box-shadow,transform,background-color] duration-200",
                    d.tone === "gold"
                      ? "bg-gold-500/6 border-gold-500/14 hover:border-gold-500/22 hover:shadow-glow-gold"
                      : "bg-electric-500/6 border-electric-500/14 hover:border-electric-500/22 hover:shadow-glow-electric",
                  ].join(" ")}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={[
                        "w-10 h-10 rounded-2xl border border-white/6 bg-surface-900/35 flex items-center justify-center",
                        d.tone === "gold" ? "text-gold-300" : "text-electric-300",
                      ].join(" ")}
                    >
                      {d.mark}
                    </div>
                    <div className="min-w-0">
                      <p className="text-b3 font-semibold text-surface-100">{d.title}</p>
                      <p className="text-cap text-surface-500 mt-0.5">{d.sub}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4"
          >
            {[
              { label: "No Login Required", tone: "gold", mark: <MarkNoLogin /> },
              { label: "Instant Results", tone: "electric", mark: <MarkBolt /> },
              { label: "Public Chain Proof", tone: "neon", mark: <MarkGlobe /> },
            ].map((item) => (
              <div key={item.label} className="panel rounded-3xl border border-surface-800/50 p-5">
                <div className="flex items-center gap-3">
                  <div
                    className={[
                      "w-11 h-11 rounded-2xl border border-white/6 bg-surface-900/35 flex items-center justify-center",
                      item.tone === "gold" && "text-gold-300",
                      item.tone === "electric" && "text-electric-300",
                      item.tone === "neon" && "text-neon-300",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    {item.mark}
                  </div>
                  <p className="text-b3 font-semibold text-surface-200">{item.label}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

/* Inline marks (premium, consistent) */
function ArrowMark() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-void">
      <path d="M5 12h12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MarkVerifySeal() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 3.5c3.4 2.6 6.4 3.1 8.2 3.4c.2 1 .3 2 .3 3c0 5.4-3.7 9.8-8.5 11c-4.8-1.2-8.5-5.6-8.5-11c0-1 .1-2 .3-3C5.6 6.6 8.6 6.1 12 3.5z"
        stroke="currentColor"
        strokeWidth="1.8"
        opacity="0.85"
      />
      <path d="M8.7 12.2l2.1 2.1l4.8-5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MarkShield() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 3l8 4.6v6.1c0 4.7-3.2 7.9-8 9.3c-4.8-1.4-8-4.6-8-9.3V7.6L12 3z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path d="M8.4 12.2l2.2 2.2l5.4-5.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" opacity="0.8" />
    </svg>
  );
}

function MarkWallet() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M5.5 7.4h13c1 0 1.8.8 1.8 1.8v7.4c0 1-.8 1.8-1.8 1.8h-13c-1 0-1.8-.8-1.8-1.8V9.2c0-1 .8-1.8 1.8-1.8z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M15.7 12h4.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M8.2 7.4V6.1c0-.9.7-1.6 1.6-1.6h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" opacity="0.6" />
    </svg>
  );
}

function MarkNoLogin() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M7.4 10.5V8.9a4.6 4.6 0 0 1 9.2 0v1.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M7.3 10.5h9.4c.9 0 1.6.7 1.6 1.6v5.6c0 .9-.7 1.6-1.6 1.6H7.3c-.9 0-1.6-.7-1.6-1.6v-5.6c0-.9.7-1.6 1.6-1.6z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 14.2v2.4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" opacity="0.75" />
    </svg>
  );
}

function MarkBolt() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M13 2L4 14h8l-1 8 9-12h-8l1-8z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}

function MarkGlobe() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M12 3.2a8.8 8.8 0 100 17.6a8.8 8.8 0 000-17.6z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M3.4 12h17.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" opacity="0.75" />
      <path
        d="M12 3.2c2.2 2.5 3.6 5.7 3.6 8.8c0 3.1-1.4 6.3-3.6 8.8c-2.2-2.5-3.6-5.7-3.6-8.8c0-3.1 1.4-6.3 3.6-8.8z"
        stroke="currentColor"
        strokeWidth="1.8"
        opacity="0.6"
      />
    </svg>
  );
}
