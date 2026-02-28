"use client";

import React from "react";
import { cn, truncateAddress } from "@/lib/utils";
import { CopyButton } from "./CopyButton";
import { ExternalLink } from "lucide-react";
import { getExplorerUrl } from "@/lib/utils";

interface WalletAddressProps {
  address: string;
  truncate?: boolean;
  truncateChars?: number;
  showCopy?: boolean;
  showExplorer?: boolean;
  className?: string;
  mono?: boolean;
}

export const WalletAddress: React.FC<WalletAddressProps> = ({
  address,
  truncate = true,
  truncateChars = 6,
  showCopy = true,
  showExplorer = false,
  className,
  mono = true,
}) => {
  const displayAddress = truncate
    ? truncateAddress(address, truncateChars)
    : address;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2",
        mono && "font-mono",
        className
      )}
    >
      <span className="text-dark-300">{displayAddress}</span>
      {showCopy && <CopyButton text={address} size="sm" />}
      {showExplorer && (
        <a
          href={getExplorerUrl("address", address)}
          target="_blank"
          rel="noopener noreferrer"
          className="text-dark-500 hover:text-brand-400 transition-colors"
        >
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      )}
    </span>
  );
};
