"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Check, X, Clock, AlertTriangle, ShieldCheck, ShieldOff, ShieldAlert } from "lucide-react";

type StatusType = "active" | "revoked" | "pending" | "suspended" | "verified" | "unverified" | "warning";

interface StatusIndicatorProps {
  status: StatusType;
  label?: string;
  size?: "sm" | "md" | "lg";
  showIcon?: boolean;
  className?: string;
}

const config: Record<StatusType, { icon: React.ReactNode; bg: string; text: string; border: string; label: string }> = {
  active: { icon: <Check className="w-3 h-3" strokeWidth={3} />, bg: "bg-neon-500/10", text: "text-neon-400", border: "border-neon-500/20", label: "Active" },
  revoked: { icon: <X className="w-3 h-3" strokeWidth={3} />, bg: "bg-crimson-500/10", text: "text-crimson-400", border: "border-crimson-500/20", label: "Revoked" },
  pending: { icon: <Clock className="w-3 h-3" />, bg: "bg-gold-500/10", text: "text-gold-400", border: "border-gold-500/20", label: "Pending" },
  suspended: { icon: <AlertTriangle className="w-3 h-3" />, bg: "bg-gold-600/10", text: "text-gold-500", border: "border-gold-600/20", label: "Suspended" },
  verified: { icon: <ShieldCheck className="w-3 h-3" />, bg: "bg-electric-500/10", text: "text-electric-400", border: "border-electric-500/20", label: "Verified" },
  unverified: { icon: <ShieldOff className="w-3 h-3" />, bg: "bg-surface-700/40", text: "text-surface-500", border: "border-surface-600/40", label: "Unverified" },
  warning: { icon: <ShieldAlert className="w-3 h-3" />, bg: "bg-gold-500/10", text: "text-gold-400", border: "border-gold-500/20", label: "Warning" },
};

const sizes = { sm: "px-2 py-0.5 text-micro gap-1", md: "px-2.5 py-1 text-cap gap-1.5", lg: "px-3 py-1.5 text-b3 gap-2" };

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({ status, label, size = "md", showIcon = true, className }) => {
  const c = config[status];
  return (
    <span className={cn("inline-flex items-center font-semibold border rounded-full whitespace-nowrap", c.bg, c.text, c.border, sizes[size], className)}>
      {showIcon && c.icon}
      {label || c.label}
    </span>
  );
};
