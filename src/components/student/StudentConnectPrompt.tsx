"use client";

import React from "react";
import { motion } from "framer-motion";
import { useWallet } from "@/hooks/useWallet";
import { Button } from "@/components/ui/Button";

const ease = [0.16, 1, 0.3, 1] as const;

export const StudentConnectPrompt: React.FC = () => {
  const { connect, isConnecting } = useWallet();

  return (
    <div className="relative min-h-[85vh] flex items-center overflow-hidden">
      <div className="orb orb-electric w-[760px] h-[760px] top-[-360px] right-[-340px] opacity-22" />
      <div className="orb orb-gold w-[560px] h-[560px] bottom-[-360px] left-[-340px] opacity-12" />
      <div className="absolute inset-0 dot-bg opacity-[0.35]" />

      <div className="relative z-10 section-wrapper w-full py-14">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center max-w-6xl mx-auto">
          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05, ease }}
            className="relative lg:order-1"
          >
            <motion.div
              whileHover={{ rotateX: 3, rotateY: 4, y: -3 }}
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
              className="relative panel-elevated rounded-3xl border border-electric-500/12 overflow-hidden"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(900px_360px_at_20%_0%,rgba(0,221,212,0.12),transparent_60%)]" />
                <div className="absolute inset-0 opacity-[0.16] dot-bg" />
              </div>

              <div className="relative p-8 sm:p-9">
                <div className="flex items-center justify-between gap-6">
                  <div>
                    <p className="text-micro uppercase tracking-[0.22em] text-surface-500">Student Workspace</p>
                    <h2 className="mt-2 font-display text-h1 text-white leading-tight">
                      Wallet-owned
                      <br />
                      <span className="text-gradient-electric">credentials</span>
                    </h2>
                    <p className="mt-2 text-b3 text-surface-400 max-w-md">
                      View earned credentials, track composition progress, and generate a public verification link + QR.
                    </p>
                  </div>

                  <div className="shrink-0">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-electric border border-white/10 shadow-glow-electric flex items-center justify-center">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-void">
                        <path d="M4 10l8-4l8 4l-8 4l-8-4z" fill="currentColor" />
                        <path d="M6 14.2v3.2c0 1.8 2.7 3.3 6 3.3s6-1.5 6-3.3v-3.2" fill="none" stroke="rgba(255,255,255,0.26)" strokeWidth="2.2" strokeLinecap="round" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="mt-7 grid grid-cols-2 gap-3">
                  <MetaPill k="Identity" v="Wallet Address" tone="electric" />
                  <MetaPill k="Share" v="Link + QR" tone="gold" />
                  <MetaPill k="Status" v="Active/Revoked" tone="neon" />
                  <MetaPill k="Verify" v="No Login" tone="electric" />
                </div>

                <div className="mt-7 pt-6 border-t border-surface-800/55">
                  <div className="flex items-center justify-between gap-4">
                    <div className="space-y-1">
                      <p className="text-micro uppercase tracking-[0.22em] text-surface-500">Example verification</p>
                      <p className="text-b3 text-surface-300 font-mono">/verify/STUD...890</p>
                    </div>
                    <div className="w-24 h-10 rounded-xl bg-surface-950/35 border border-surface-800/55 overflow-hidden">
                      <div className="h-full shimmer-line opacity-[0.9]" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="absolute -inset-10 -z-10 bg-[radial-gradient(520px_240px_at_50%_60%,rgba(0,221,212,0.10),transparent_70%)]" />
          </motion.div>

          {/* Copy */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="max-w-xl lg:order-2"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-electric-500/8 border border-electric-500/14 text-micro text-electric-300 uppercase tracking-widest">
              Student Onboarding
            </div>

            <h1 className="mt-5 font-display text-d3 sm:text-d2 text-white leading-[1.06] text-balance">
              Student Dashboard
              <br />
              Your achievements, <span className="text-gradient-electric">owned</span>
            </h1>

            <p className="mt-5 text-b1 text-surface-400 leading-relaxed text-balance">
              Connect your wallet to see credentials issued to your address. Share a public verification link that employers
              can open instantly.
            </p>

            <div className="mt-8 space-y-3">
              <GateBullet tone="electric" title="Wallet identity" desc="Your address is your credential profile." />
              <GateBullet tone="gold" title="Shareable proof" desc="A single link or QR works anywhere." />
              <GateBullet tone="neon" title="Transparent status" desc="Active vs revoked is visible and timestamped." />
            </div>

            <div className="mt-10 max-w-md">
              <Button
                onClick={connect}
                loading={isConnecting}
                size="xl"
                fullWidth
                icon={<MarkWalletLink />}
                className="bg-gradient-electric border-electric-400/20 shadow-glow-electric hover:shadow-glow-electric"
              >
                Connect Pera Wallet
              </Button>

              <div className="mt-4 flex items-center justify-between gap-3">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-900/55 border border-surface-700/45">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60 bg-neon-400" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-neon-400" />
                  </span>
                  <span className="text-micro text-surface-400 uppercase tracking-[0.22em]">Algorand Testnet</span>
                </div>

                <div className="text-cap text-surface-500">You control what you share.</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

function GateBullet({
  tone,
  title,
  desc,
}: {
  tone: "gold" | "electric" | "neon";
  title: string;
  desc: string;
}) {
  const styles = {
    gold: "border-gold-500/14 bg-gold-500/6 text-gold-300",
    electric: "border-electric-500/14 bg-electric-500/6 text-electric-300",
    neon: "border-neon-500/14 bg-neon-500/6 text-neon-300",
  }[tone];

  return (
    <div className="flex items-start gap-3">
      <div className={`mt-0.5 w-6 h-6 rounded-2xl border ${styles} flex items-center justify-center`}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <path
            d="M20 6L9 17l-5-5"
            stroke="currentColor"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div>
        <p className="text-b3 font-semibold text-surface-100">{title}</p>
        <p className="text-b3 text-surface-500 mt-0.5 leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

function MetaPill({ k, v, tone }: { k: string; v: string; tone: "gold" | "electric" | "neon" }) {
  const map = {
    gold: "border-gold-500/14 bg-gold-500/6 text-gold-300",
    electric: "border-electric-500/14 bg-electric-500/6 text-electric-300",
    neon: "border-neon-500/14 bg-neon-500/6 text-neon-300",
  }[tone];

  return (
    <div className={`rounded-2xl border ${map} px-3.5 py-2.5`}>
      <p className="text-micro uppercase tracking-[0.18em] opacity-80">{k}</p>
      <p className="text-b3 font-semibold text-surface-100 mt-1">{v}</p>
    </div>
  );
}

/* Shared mark (kept local for drop-in simplicity) */
function MarkWalletLink() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-void">
      <path
        d="M6.2 7.6h11.6c1 0 1.8.8 1.8 1.8v7.2c0 1-.8 1.8-1.8 1.8H6.2c-1 0-1.8-.8-1.8-1.8V9.4c0-1 .8-1.8 1.8-1.8Z"
        stroke="currentColor"
        strokeWidth="2.0"
      />
      <path d="M15.2 12h4" stroke="currentColor" strokeWidth="2.0" strokeLinecap="round" />
      <path
        d="M9.2 7.6V6.2c0-1 .8-1.8 1.8-1.8h6.8"
        stroke="currentColor"
        strokeWidth="2.0"
        strokeLinecap="round"
        opacity="0.75"
      />
      <path
        d="M8.4 14.2l1.8 1.8l3.6-3.8"
        stroke="currentColor"
        strokeWidth="2.0"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.75"
      />
    </svg>
  );
}
