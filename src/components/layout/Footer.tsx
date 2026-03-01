"use client";

import React from "react";
import Link from "next/link";
import { Hexagon, Github, ExternalLink, Zap, ArrowUpRight } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="relative border-t border-dark-800/50">
      <div className="absolute inset-0 bg-gradient-to-t from-dark-950 to-transparent pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-brand-500 to-cyber-500 flex items-center justify-center">
                <Hexagon className="w-4.5 h-4.5 text-white" strokeWidth={2.5} />
              </div>
              <span className="text-heading-md font-bold text-white">
                Cred<span className="gradient-text">Graph</span>
              </span>
            </Link>
            <p className="text-body-sm text-dark-500 leading-relaxed mb-4">
              Composable, verifiable academic credentials on Algorand. Building the trust layer for education.
            </p>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-500/10 border border-accent-500/20 w-fit">
              <div className="w-1.5 h-1.5 rounded-full bg-accent-400 animate-pulse" />
              <span className="text-caption font-semibold text-accent-400 uppercase tracking-wider">
                Algorand Testnet
              </span>
            </div>
          </div>

          <div>
            <h4 className="text-body-sm font-semibold text-dark-200 uppercase tracking-wider mb-4">Protocol</h4>
            <ul className="space-y-3">
              {[
                { label: "Issuer Portal", href: "/issuer" },
                { label: "Student Dashboard", href: "/student" },
                { label: "Verify Credentials", href: "/verify" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-body-sm text-dark-500 hover:text-brand-400 transition-colors duration-300 flex items-center gap-1.5"
                  >
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-body-sm font-semibold text-dark-200 uppercase tracking-wider mb-4">Resources</h4>
            <ul className="space-y-3">
              {[
                { label: "Algorand Docs", href: "https://developer.algorand.org/" },
                { label: "Pera Wallet", href: "https://perawallet.app/" },
                { label: "ARC-3 Standard", href: "https://arc.algorand.foundation/ARCs/arc-0003" },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-body-sm text-dark-500 hover:text-brand-400 transition-colors duration-300 flex items-center gap-1.5"
                  >
                    {link.label}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-body-sm font-semibold text-dark-200 uppercase tracking-wider mb-4">Built With</h4>
            <div className="flex flex-wrap gap-2">
              {["Next.js", "Algorand", "IPFS", "TypeScript", "Framer Motion"].map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 text-caption font-medium text-dark-400 bg-dark-800/40 border border-dark-700/30 rounded-lg"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-dark-800/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-caption text-dark-600">
            Built for the Algorand Hackathon 2025. All credentials live on-chain.
          </p>
          <div className="flex items-center gap-1 text-caption text-dark-600">
            <Zap className="w-3 h-3 text-amber-500" />
            <span>Powered by Algorand Pure Proof-of-Stake</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
