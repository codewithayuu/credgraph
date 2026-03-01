"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { BrandLogo } from "@/components/ui/BrandLogo";

export const Footer: React.FC = () => {
  return (
    <footer className="relative border-t border-surface-800/30 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(900px_380px_at_20%_0%,rgba(247,201,72,0.08),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_380px_at_80%_10%,rgba(0,221,212,0.06),transparent_60%)]" />
      </div>

      <div className="relative section-wrapper py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4 group">
              <motion.div
                whileHover={{ scale: 1.05, y: -1 }}
                transition={{ type: "spring", stiffness: 520, damping: 34 }}
                className="relative"
              >
                <BrandLogo size={40} className="relative z-10" />
                <div className="absolute inset-0 rounded-full bg-gold-500/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>

              <span className="font-display text-h3 text-white tracking-tight">
                Cred<span className="text-gradient-gold">Graph</span>
              </span>
            </Link>

            <p className="text-b3 text-surface-500 mb-5 max-w-[280px]">
              Composable, verifiable academic credentials on Algorand.
            </p>

            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neon-500/8 border border-neon-500/14 w-fit">
              <div className="w-1.5 h-1.5 rounded-full bg-neon-400 animate-breathe" />
              <span className="text-micro text-neon-300 uppercase tracking-wider">Algorand Testnet</span>
            </div>
          </div>

          <div>
            <h4 className="text-micro text-surface-300 uppercase tracking-[0.22em] mb-4">Protocol</h4>
            <ul className="space-y-2.5">
              {[
                { l: "Issuer Portal", h: "/issuer" },
                { l: "Student Dashboard", h: "/student" },
                { l: "Verify", h: "/verify" },
                { l: "Governance", h: "/governance" },
              ].map((item) => (
                <li key={item.h}>
                  <Link href={item.h} className="text-b3 text-surface-500 hover:text-surface-200 transition-colors">
                    {item.l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-micro text-surface-300 uppercase tracking-[0.22em] mb-4">Resources</h4>
            <ul className="space-y-2.5">
              {[
                { l: "Algorand Docs", h: "https://developer.algorand.org/" },
                { l: "Pera Wallet", h: "https://perawallet.app/" },
                { l: "ARC-3 Standard", h: "https://arc.algorand.foundation/ARCs/arc-0003" },
              ].map((item) => (
                <li key={item.h}>
                  <a
                    href={item.h}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-b3 text-surface-500 hover:text-surface-200 transition-colors inline-flex items-center gap-1.5"
                  >
                    {item.l}
                    <ExternalLink className="w-3 h-3 opacity-70" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-micro text-surface-300 uppercase tracking-[0.22em] mb-4">Stack</h4>
            <div className="flex flex-wrap gap-2">
              {["Next.js", "Algorand", "IPFS", "TypeScript"].map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-1.5 text-micro text-surface-500 bg-surface-800/40 border border-surface-700/30 rounded-lg"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-surface-800/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <p className="text-cap text-surface-600">Built for Algorand Hackathon 2025</p>
          <p className="text-cap text-surface-600">Powered by Pure Proof-of-Stake</p>
        </div>
      </div>
    </footer>
  );
};
