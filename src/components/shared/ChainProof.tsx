"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { getExplorerUrl, truncateAddress } from "@/lib/utils";
import {
  ExternalLink,
  Link as LinkIcon,
  Hash,
  Clock,
  Box,
  Shield,
} from "lucide-react";

interface ChainProofProps {
  txId?: string;
  asaId?: number;
  issuerAddress?: string;
  recipientAddress?: string;
  timestamp?: number;
  className?: string;
}

export const ChainProof: React.FC<ChainProofProps> = ({
  txId,
  asaId,
  issuerAddress,
  recipientAddress,
  timestamp,
  className,
}) => {
  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center gap-2 mb-3">
        <LinkIcon className="w-4 h-4 text-brand-400" />
        <span className="text-body-sm font-semibold text-dark-200">On-Chain Proof</span>
      </div>

      {txId && (
        <ProofRow
          icon={<Hash className="w-3.5 h-3.5" />}
          label="Transaction"
          value={truncateAddress(txId, 8)}
          href={getExplorerUrl("transaction", txId)}
        />
      )}

      {asaId && (
        <ProofRow
          icon={<Box className="w-3.5 h-3.5" />}
          label="Asset (ASA)"
          value={asaId.toString()}
          href={getExplorerUrl("asset", asaId)}
        />
      )}

      {issuerAddress && (
        <ProofRow
          icon={<Shield className="w-3.5 h-3.5" />}
          label="Issuer"
          value={truncateAddress(issuerAddress, 6)}
          href={getExplorerUrl("address", issuerAddress)}
        />
      )}

      {timestamp && (
        <ProofRow
          icon={<Clock className="w-3.5 h-3.5" />}
          label="Block Time"
          value={new Date(timestamp * 1000).toISOString()}
        />
      )}
    </div>
  );
};

function ProofRow({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <div className={cn(
      "flex items-center justify-between p-2.5 rounded-lg bg-dark-800/20 border border-dark-700/15 group",
      href && "hover:border-brand-500/20 cursor-pointer transition-all"
    )}>
      <div className="flex items-center gap-2 text-dark-400">
        {icon}
        <span className="text-caption font-medium">{label}</span>
      </div>
      <div className="flex items-center gap-1.5">
        <span className="text-caption font-mono text-dark-300">{value}</span>
        {href && (
          <ExternalLink className="w-3 h-3 text-dark-600 group-hover:text-brand-400 transition-colors" />
        )}
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return content;
}
