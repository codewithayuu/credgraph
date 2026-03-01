"use client";

import React from "react";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="relative border-t border-surface-800/30">
      <div className="section-wrapper py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-gold flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-void">
                  <path d="M12 2L22 8.5V15.5L12 22L2 15.5V8.5L12 2Z" fill="currentColor" />
                </svg>
              </div>
              <span className="text-h3 text-white">Cred<span className="text-gradient-gold">Graph</span></span>
            </Link>
            <p className="text-b3 text-surface-500 mb-4">Composable, verifiable academic credentials on Algorand.</p>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-neon-500/8 border border-neon-500/15 w-fit">
              <div className="w-1.5 h-1.5 rounded-full bg-neon-400 animate-breathe" />
              <span className="text-micro text-neon-400">Algorand Testnet</span>
            </div>
          </div>

          <div>
            <h4 className="text-micro text-surface-300 uppercase tracking-widest mb-4">Protocol</h4>
            <ul className="space-y-2.5">
              {[{ l: "Issuer Portal", h: "/issuer" }, { l: "Dashboard", h: "/student" }, { l: "Verify", h: "/verify" }].map((item) => (
                <li key={item.h}><Link href={item.h} className="text-b3 text-surface-500 hover:text-gold-400 transition-colors">{item.l}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-micro text-surface-300 uppercase tracking-widest mb-4">Resources</h4>
            <ul className="space-y-2.5">
              {[
                { l: "Algorand Docs", h: "https://developer.algorand.org/" },
                { l: "Pera Wallet", h: "https://perawallet.app/" },
                { l: "ARC-3 Standard", h: "https://arc.algorand.foundation/ARCs/arc-0003" },
              ].map((item) => (
                <li key={item.h}>
                  <a href={item.h} target="_blank" rel="noopener noreferrer" className="text-b3 text-surface-500 hover:text-gold-400 transition-colors inline-flex items-center gap-1.5">
                    {item.l}<ExternalLink className="w-3 h-3" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-micro text-surface-300 uppercase tracking-widest mb-4">Stack</h4>
            <div className="flex flex-wrap gap-1.5">
              {["Next.js", "Algorand", "IPFS", "TypeScript"].map((t) => (
                <span key={t} className="px-2 py-1 text-micro text-surface-500 bg-surface-800/40 border border-surface-700/30 rounded-md">{t}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-surface-800/30 flex items-center justify-between">
          <p className="text-cap text-surface-600">Built for Algorand Hackathon 2025</p>
          <p className="text-cap text-surface-600">Powered by Pure Proof-of-Stake</p>
        </div>
      </div>
    </footer>
  );
};
