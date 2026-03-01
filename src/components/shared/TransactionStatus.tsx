"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { getExplorerUrl } from "@/lib/utils";
import {
  Loader2,
  CheckCircle2,
  XCircle,
  ExternalLink,
  Clock,
} from "lucide-react";

type TxStatus = "idle" | "preparing" | "signing" | "submitting" | "confirming" | "confirmed" | "failed";

interface TransactionStatusProps {
  status: TxStatus;
  txId?: string;
  error?: string;
  className?: string;
}

const statusConfig: Record<TxStatus, {
  icon: React.ReactNode;
  label: string;
  color: string;
  bg: string;
}> = {
  idle: { icon: null, label: "", color: "", bg: "" },
  preparing: {
    icon: <Loader2 className="w-5 h-5 animate-spin" />,
    label: "Preparing transaction...",
    color: "text-brand-400",
    bg: "bg-brand-500/10 border-brand-500/20",
  },
  signing: {
    icon: <Clock className="w-5 h-5 animate-pulse" />,
    label: "Waiting for wallet signature...",
    color: "text-amber-400",
    bg: "bg-amber-500/10 border-amber-500/20",
  },
  submitting: {
    icon: <Loader2 className="w-5 h-5 animate-spin" />,
    label: "Submitting to Algorand...",
    color: "text-cyber-400",
    bg: "bg-cyber-500/10 border-cyber-500/20",
  },
  confirming: {
    icon: <Loader2 className="w-5 h-5 animate-spin" />,
    label: "Waiting for confirmation...",
    color: "text-brand-400",
    bg: "bg-brand-500/10 border-brand-500/20",
  },
  confirmed: {
    icon: <CheckCircle2 className="w-5 h-5" />,
    label: "Transaction confirmed!",
    color: "text-accent-400",
    bg: "bg-accent-500/10 border-accent-500/20",
  },
  failed: {
    icon: <XCircle className="w-5 h-5" />,
    label: "Transaction failed",
    color: "text-red-400",
    bg: "bg-red-500/10 border-red-500/20",
  },
};

export const TransactionStatus: React.FC<TransactionStatusProps> = ({
  status,
  txId,
  error,
  className,
}) => {
  const config = statusConfig[status];

  if (status === "idle") return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 10, height: 0 }}
        animate={{ opacity: 1, y: 0, height: "auto" }}
        exit={{ opacity: 0, y: -10, height: 0 }}
        transition={{ duration: 0.3 }}
        className={cn(
          "p-4 rounded-xl border",
          config.bg,
          className
        )}
      >
        <div className="flex items-center gap-3">
          <div className={config.color}>{config.icon}</div>
          <div className="flex-1">
            <p className={cn("text-body-sm font-medium", config.color)}>
              {config.label}
            </p>
            {error && (
              <p className="text-caption text-red-400/80 mt-1">{error}</p>
            )}
          </div>
          {txId && status === "confirmed" && (
            <a
              href={getExplorerUrl("transaction", txId)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-caption text-dark-400 hover:text-brand-400 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              View
            </a>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
