"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

const ease = [0.16, 1, 0.3, 1] as const;

export const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-[94vh] flex items-center overflow-hidden">
      {/* Atmosphere */}
      <div className="orb orb-gold w-[720px] h-[720px] top-[-280px] left-[-260px] opacity-45" />
      <div className="orb orb-electric w-[520px] h-[520px] bottom-[-220px] right-[-160px] opacity-35" />
      <div className="orb orb-neon w-[420px] h-[420px] top-[52%] right-[18%] opacity-15" />

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 dot-bg opacity-[0.45]" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-void via-void/40 to-transparent" />
      </div>

      <div className="relative z-10 section-wrapper w-full py-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-14 items-center">
          {/* Left: copy */}
          <div className="max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease }}
              className="mb-7"
            >
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-surface-900/55 border border-surface-700/40 backdrop-blur-sm">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60 bg-neon-400" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-neon-400" />
                </span>
                <span className="text-cap text-neon-300 uppercase tracking-widest">Algorand Testnet</span>
                <div className="w-px h-3 bg-surface-700/70" />
                <span className="text-cap text-surface-500">CredGraph Protocol</span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-display text-d3 sm:text-d2 lg:text-d2 text-white leading-[1.06] text-balance"
            >
              Don&apos;t trust the resume.
              <br />
              <span className="relative inline-block">
                Verify the chain.
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.85, delay: 0.65, ease }}
                  className="absolute -bottom-1 left-0 w-full h-[3px] bg-gradient-to-r from-gold-400 via-electric-400 to-neon-400 rounded-full origin-left"
                />
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.14, ease }}
              className="mt-6 text-b1 text-surface-400 max-w-lg text-balance"
            >
              Institutions issue composable academic credentials as Algorand NFTs. Students own them. Employers verify
              instantly with a public link—no accounts, no middlemen.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.25, ease }}
              className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5"
            >
              <Link href="/issuer" className="w-full sm:w-auto">
                <Button size="xl" className="min-w-[220px] w-full sm:w-auto">
                  Register Institution
                </Button>
              </Link>

              <Link href="/verify" className="w-full sm:w-auto">
                <Button variant="outline" size="xl" className="min-w-[220px] w-full sm:w-auto">
                  Verify Credentials
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.35, ease }}
              className="mt-6"
            >
              <Link
                href="/student"
                className="inline-flex items-center gap-2 text-b3 text-surface-500 hover:text-surface-200 transition-colors"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-electric-400/80" />
                Explore the student dashboard
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.45, ease }}
              className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4"
            >
              <ValueTile
                title="Issuer Registry"
                desc="Approved institutions, publicly auditable."
                tone="gold"
                icon={<MarkIssuerRegistry />}
              />
              <ValueTile
                title="Composition"
                desc="Micros merge into mastery credentials."
                tone="electric"
                icon={<MarkComposition />}
              />
              <ValueTile
                title="Public Verify"
                desc="A link that proves the chain, fast."
                tone="neon"
                icon={<MarkVerify />}
              />
            </motion.div>
          </div>

          {/* Right: artifact visual */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.15, ease }}
            className="relative"
          >
            <CredentialArtifact />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

function ValueTile({
  title,
  desc,
  tone,
  icon,
}: {
  title: string;
  desc: string;
  tone: "gold" | "electric" | "neon";
  icon: React.ReactNode;
}) {
  const toneStyles: Record<typeof tone, { border: string; glow: string; bg: string; iconBg: string }> = {
    gold: {
      border: "border-gold-500/14",
      glow: "hover:shadow-glow-gold",
      bg: "bg-gradient-to-br from-gold-500/10 to-transparent",
      iconBg: "bg-gold-500/12",
    },
    electric: {
      border: "border-electric-500/14",
      glow: "hover:shadow-glow-electric",
      bg: "bg-gradient-to-br from-electric-500/10 to-transparent",
      iconBg: "bg-electric-500/12",
    },
    neon: {
      border: "border-neon-500/14",
      glow: "hover:shadow-glow-neon",
      bg: "bg-gradient-to-br from-neon-500/10 to-transparent",
      iconBg: "bg-neon-500/12",
    },
  };

  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 420, damping: 32 }}
      className={[
        "panel rounded-2xl p-4",
        "border",
        toneStyles[tone].border,
        toneStyles[tone].bg,
        "transition-[transform,box-shadow,border-color] duration-200",
        toneStyles[tone].glow,
      ].join(" ")}
    >
      <div className={`w-10 h-10 rounded-xl ${toneStyles[tone].iconBg} border border-white/5 flex items-center justify-center`}>
        {icon}
      </div>
      <div className="mt-3">
        <p className="text-b3 font-semibold text-white">{title}</p>
        <p className="text-micro text-surface-500 mt-1 leading-relaxed">{desc}</p>
      </div>
    </motion.div>
  );
}

function CredentialArtifact() {
  return (
    <div className="relative mx-auto max-w-[560px]">
      {/* orbiting micro-tiles */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-7 left-8 hidden sm:block z-20"
      >
        <MiniTile tone="electric" label="CT-003" sub="Backend" />
      </motion.div>

      <motion.div
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 8.5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
        className="absolute top-16 -right-4 hidden sm:block z-20"
      >
        <MiniTile tone="gold" label="CT-010" sub="Mastery" />
      </motion.div>

      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 9.2, repeat: Infinity, ease: "easeInOut", delay: 1.1 }}
        className="absolute -bottom-8 right-16 hidden sm:block z-20"
      >
        <MiniTile tone="neon" label="TX" sub="Finality" />
      </motion.div>

      {/* main credential card */}
      <motion.div
        whileHover={{ rotateX: 3, rotateY: -4, y: -3 }}
        transition={{ type: "spring", stiffness: 380, damping: 30 }}
        className="relative rounded-3xl border border-gold-500/14 bg-surface-900/55 backdrop-blur-xl shadow-panel overflow-hidden"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* foil edge */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 opacity-[0.70] bg-[radial-gradient(800px_280px_at_10%_0%,rgba(247,201,72,0.12),transparent_55%)]" />
          <div className="absolute inset-0 opacity-[0.65] bg-[radial-gradient(700px_260px_at_90%_10%,rgba(0,221,212,0.10),transparent_60%)]" />
          <div className="absolute inset-0 opacity-[0.55] bg-[radial-gradient(900px_420px_at_50%_110%,rgba(0,232,94,0.06),transparent_55%)]" />
          <div className="absolute inset-0 border border-white/5 rounded-3xl" />
        </div>

        <div className="relative p-7 sm:p-8">
          <div className="flex items-start justify-between gap-6">
            <div>
              <p className="text-micro uppercase tracking-[0.22em] text-surface-500">Credential NFT</p>
              <h3 className="mt-2 font-display text-h1 text-white leading-tight">
                Full Stack
                <span className="text-gradient-gold"> Developer</span>
              </h3>
              <p className="mt-2 text-b3 text-surface-400 max-w-sm">
                Composed from verified micro-credentials. Portable proof, wallet-owned.
              </p>
            </div>

            <div className="shrink-0">
              <div className="w-12 h-12 rounded-2xl bg-gradient-gold border border-white/10 shadow-glow-gold flex items-center justify-center">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-void">
                  <path
                    d="M12 2L21 7.2V16.8L12 22L3 16.8V7.2L12 2Z"
                    fill="currentColor"
                    opacity="0.95"
                  />
                  <path
                    d="M12 7.6L16.3 10.1V14.9L12 17.4L7.7 14.9V10.1L12 7.6Z"
                    fill="rgba(255,255,255,0.28)"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="mt-7 grid grid-cols-2 gap-3">
            <MetaPill k="Issuer" v="ABC University" tone="electric" />
            <MetaPill k="Status" v="Active" tone="neon" />
            <MetaPill k="Standard" v="ARC-3" tone="gold" />
            <MetaPill k="Verify" v="Public Link" tone="electric" />
          </div>

          <div className="mt-7 pt-6 border-t border-surface-800/55">
            <div className="flex items-center justify-between gap-4">
              <div className="space-y-1">
                <p className="text-micro uppercase tracking-[0.20em] text-surface-500">On-chain proof</p>
                <p className="text-b3 font-mono text-surface-300 mt-1">TX: 7VQ...T9A</p>
              </div>
              <div className="w-24 h-10 rounded-xl bg-surface-950/40 border border-surface-800/55 overflow-hidden">
                <div className="h-full shimmer-line opacity-[0.9]" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* base glow */}
      <div className="absolute -inset-10 -z-10 bg-[radial-gradient(480px_220px_at_50%_65%,rgba(247,201,72,0.10),transparent_70%)]" />
    </div>
  );
}

function MetaPill({
  k,
  v,
  tone,
}: {
  k: string;
  v: string;
  tone: "gold" | "electric" | "neon";
}) {
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

function MiniTile({ tone, label, sub }: { tone: "gold" | "electric" | "neon"; label: string; sub: string }) {
  const map = {
    gold: "border-gold-500/16 bg-gold-500/7 text-gold-300",
    electric: "border-electric-500/16 bg-electric-500/7 text-electric-300",
    neon: "border-neon-500/16 bg-neon-500/7 text-neon-300",
  }[tone];

  return (
    <div className={`rounded-2xl border ${map} bg-surface-900/80 px-4 py-3 backdrop-blur-xl shadow-card`}>
      <p className="text-micro uppercase tracking-[0.20em] opacity-80">{label}</p>
      <p className="text-b3 font-semibold text-surface-100 mt-1">{sub}</p>
    </div>
  );
}

/* Bespoke hero marks (inline SVG, single-weight, "protocol" feel) */
function MarkIssuerRegistry() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-gold-300">
      <path
        d="M12 2.7l8 4.6v6.3c0 4.6-3.2 7.9-8 9.7c-4.8-1.8-8-5.1-8-9.7V7.3l8-4.6Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M8.2 12.2l2.3 2.3l5.5-5.7"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MarkComposition() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-electric-300">
      <path
        d="M7.2 7.6l4.8-2.8l4.8 2.8v5.5l-4.8 2.8l-4.8-2.8V7.6Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M12 4.8v10.9"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.7"
      />
      <path
        d="M5.2 14.6l6.8 3.9l6.8-3.9"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MarkVerify() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-neon-300">
      <path
        d="M10.2 13.4h7.1"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M14.6 9.1l2.7 4.3l-2.7 4.3"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.7 6.8h5.2v10.4H6.7z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
        opacity="0.75"
      />
    </svg>
  );
}
