"use client";

import React from "react";
import { WalletAddress } from "@/components/ui/WalletAddress";
import { ShieldCheck, Globe } from "lucide-react";

interface Props {
  address: string;
}

export const VerificationHeader: React.FC<Props> = ({ address }) => {
  return (
    <div className="glass-strong rounded-2xl p-6 card-highlight">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent-500 to-emerald-500 flex items-center justify-center text-white shadow-lg shadow-accent-500/20">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-heading-xl font-bold text-white mb-1">
              Credential Verification
            </h1>
            <div className="flex items-center gap-2">
              <span className="text-body-sm text-dark-400">Wallet:</span>
              <WalletAddress address={address} showCopy showExplorer truncateChars={10} className="text-body-sm" />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-500/10 border border-accent-500/20">
          <Globe className="w-3.5 h-3.5 text-accent-400" />
          <span className="text-caption font-semibold text-accent-400">Public Verification — No Login Required</span>
        </div>
      </div>
    </div>
  );
};
