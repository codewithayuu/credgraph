"use client";

import React from "react";
import { WalletAddress } from "@/components/ui/WalletAddress";

interface Props {
  address: string;
}

export const VerificationHeader: React.FC<Props> = ({ address }) => {
  return (
    <div className="panel-elevated rounded-3xl p-6 sm:p-7 overflow-hidden">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-electric border border-white/10 shadow-glow-electric flex items-center justify-center">
            <span className="text-void">
              <MarkVerifySeal />
            </span>
          </div>

          <div className="min-w-0">
            <h1 className="font-display text-h1 text-white leading-tight">Credential Verification</h1>
            <p className="text-b2 text-surface-400 mt-1">Audit public proofs for the following protocol wallet.</p>
          </div>
        </div>

        <div className="flex flex-col items-start lg:items-end gap-2">
          <p className="text-micro uppercase tracking-[0.22em] text-surface-500">Target wallet</p>
          <div className="bg-surface-900/40 border border-surface-800/60 rounded-full px-4 py-1.5 inline-flex">
            <WalletAddress address={address} showCopy showExplorer truncateChars={10} />
          </div>
        </div>
      </div>

      <div className="mt-7 flex items-center gap-6 py-4 border-t border-surface-800/40">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-electric-400 animate-pulse shadow-glow-electric" />
          <span className="text-cap font-medium text-surface-300">Live network audit</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-surface-600">
            <MarkGlobe />
          </span>
          <span className="text-cap text-surface-500">Algorand Testnet Explorer</span>
        </div>
      </div>
    </div>
  );
};

/* Marks */
function MarkVerifySeal() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 3l8 4.6v6.1c0 4.7-3.2 7.9-8 9.3c-4.8-1.4-8-4.6-8-9.3V7.6L12 3z"
        fill="currentColor"
        opacity="0.15"
      />
      <path
        d="M12 3l8 4.6v6.1c0 4.7-3.2 7.9-8 9.3c-4.8-1.4-8-4.6-8-9.3V7.6L12 3z"
        stroke="currentColor"
        strokeWidth="2.0"
        strokeLinejoin="round"
      />
      <path
        d="M8.4 12.2l2.2 2.2l5.4-5.6"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MarkGlobe() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <circle cx="12" cy="12" r="9" strokeWidth="2.0" />
      <path d="M12 3a16 16 0 0 0 0 18M12 3a16 16 0 0 1 0 18" strokeWidth="1.8" opacity="0.6" />
      <path d="M3 12h18" strokeWidth="1.8" opacity="0.6" />
    </svg>
  );
}
