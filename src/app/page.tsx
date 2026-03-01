"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { BrandLogo } from "@/components/ui/BrandLogo";

export default function DemoPortalPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
      {/* Premium mesh backdrop */}
      <div className="fixed inset-0 -z-10 bg-mesh-void bg-[length:200%_200%] animate-gradient-shift" />
      <div className="fixed inset-0 -z-10 opacity-[0.4] grid-bg" />

      {/* Content */}
      <div className="max-w-6xl w-full mx-auto space-y-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center relative z-10"
        >
          <div className="flex justify-center mb-6">
            <BrandLogo size={64} />
          </div>
          <h1 className="text-display text-5xl sm:text-6xl md:text-7xl font-bold text-white tracking-tight mb-4">
            Cred<span className="text-gradient-gold">Graph</span> Demo
          </h1>
          <p className="text-xl text-surface-400 max-w-2xl mx-auto">
            Choose a persona to explore the trustless credential issuance and verification protocol.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
          {/* Card 1: Issuer */}
          <Link href="/issuer" className="block group">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="h-full rounded-3xl p-8 bg-surface-900/60 backdrop-blur-xl border border-surface-800 transition-all duration-300 group-hover:bg-surface-800/80 group-hover:border-gold-500/30 group-hover:shadow-[0_0_40px_-10px_rgba(250,204,21,0.15)] group-hover:-translate-y-2 relative overflow-hidden flex flex-col"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-gold-500/20 transition-colors" />

              <div className="w-14 h-14 rounded-2xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center mb-6 text-gold-400 group-hover:scale-110 transition-transform">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-gold-400 transition-colors">The Issuer</h2>
              <p className="text-surface-400 leading-relaxed text-sm">
                Act as educational institutions like Algo Atlas. Define dynamic mastery skill paths, manage custom credential types, and automatically issue tamper-proof achievements on-chain.
              </p>
            </motion.div>
          </Link>

          {/* Card 2: Student */}
          <Link href="/student" className="block group">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="h-full rounded-3xl p-8 bg-surface-900/60 backdrop-blur-xl border border-surface-800 transition-all duration-300 group-hover:bg-surface-800/80 group-hover:border-electric-500/30 group-hover:shadow-[0_0_40px_-10px_rgba(59,130,246,0.15)] group-hover:-translate-y-2 relative overflow-hidden flex flex-col"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-electric-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-electric-500/20 transition-colors" />

              <div className="w-14 h-14 rounded-2xl bg-electric-500/10 border border-electric-500/20 flex items-center justify-center mb-6 text-electric-400 group-hover:scale-110 transition-transform">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-electric-400 transition-colors">The Student</h2>
              <p className="text-surface-400 leading-relaxed text-sm">
                Enter the learner&apos;s perspective. View your secure wallet of earned micro-credentials, track your progress toward mastery certifications, and use selective disclosure to securely share your profile.
              </p>
            </motion.div>
          </Link>

          {/* Card 3: Verifier */}
          <Link href="/verify/ALGO_DEMO_WALLET_123" className="block group">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="h-full rounded-3xl p-8 bg-surface-900/60 backdrop-blur-xl border border-surface-800 transition-all duration-300 group-hover:bg-surface-800/80 group-hover:border-neon-500/30 group-hover:shadow-[0_0_40px_-10px_rgba(34,197,94,0.15)] group-hover:-translate-y-2 relative overflow-hidden flex flex-col"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-neon-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-neon-500/20 transition-colors" />

              <div className="w-14 h-14 rounded-2xl bg-neon-500/10 border border-neon-500/20 flex items-center justify-center mb-6 text-neon-400 group-hover:scale-110 transition-transform">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-neon-400 transition-colors">The Verifier</h2>
              <p className="text-surface-400 leading-relaxed text-sm">
                Act as a hiring platform like DevPaglu. Instantly perform a trustless verification check on a candidate's credentials using cryptographic proofs, completely removing the need for manual background checks.
              </p>
            </motion.div>
          </Link>
        </div>
      </div>
    </div>
  );
}
