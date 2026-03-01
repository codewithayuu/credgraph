"use client";

import React from "react";
import { cn, truncateAddress, getExplorerUrl } from "@/lib/utils";
import { CopyButton } from "./CopyButton";

interface WalletAddressProps {
  address: string;
  truncate?: boolean;
  truncateChars?: number;
  showCopy?: boolean;
  showExplorer?: boolean;
  className?: string;
}

export const WalletAddress: React.FC<WalletAddressProps> = ({
  address,
  truncate = true,
  truncateChars = 6,
  showCopy = true,
  showExplorer = false,
  className,
}) => {
  return (
    <span className={cn("inline-flex items-center gap-2 font-mono", className)}>
      <span className="text-surface-300 tracking-tight">
        {truncate ? truncateAddress(address, truncateChars) : address}
      </span>

      {showCopy && <CopyButton text={address} size="sm" />}

      {showExplorer && (
        <a
          href={getExplorerUrl("address", address)}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "inline-flex items-center justify-center",
            "w-7 h-7 rounded-xl",
            "border border-transparent",
            "text-surface-500 hover:text-gold-300",
            "hover:bg-surface-800/40 hover:border-white/6",
            "transition-[color,background-color,border-color] duration-200"
          )}
          aria-label="Open in explorer"
          title="Open in explorer"
        >
          <ExplorerMark />
        </a>
      )}
    </span>
  );
};

function ExplorerMark() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path d="M10 6h8v8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18 6l-9.5 9.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <path
        d="M8 6H7.2C6 6 5 7 5 8.2v8.6C5 18 6 19 7.2 19h8.6c1.2 0 2.2-1 2.2-2.2V16"
        stroke="currentColor"
        strokeWidth="2.0"
        strokeLinecap="round"
        opacity="0.65"
      />
    </svg>
  );
}
