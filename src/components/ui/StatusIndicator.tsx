"use client";

import React from "react";
import { cn } from "@/lib/utils";
import {
  CheckCircle2,
  XCircle,
  Clock,
  AlertTriangle,
  ShieldCheck,
  ShieldX,
  ShieldAlert,
} from "lucide-react";

type StatusType = "active" | "revoked" | "pending" | "suspended" | "verified" | "unverified" | "warning";

interface StatusIndicatorProps {
  status: StatusType;
  label?: string;
  size?: "sm" | "md" | "lg";
  showIcon?: boolean;
  className?: string;
}

const statusConfig: Record<StatusType, {
  icon: React.ReactNode;
  bg: string;
  text: string;
  border: string;
  label: string;
}> = {
  active: {
    icon: <CheckCircle2 className="w-3.5 h-3.5" />,
    bg: "bg-emerald-500/10",
    text: "text-emerald-400",
    border: "border-emerald-500/20",
    label: "Active",
  },
  revoked: {
    icon: <XCircle className="w-3.5 h-3.5" />,
    bg: "bg-red-500/10",
    text: "text-red-400",
    border: "border-red-500/20",
    label: "Revoked",
  },
  pending: {
    icon: <Clock className="w-3.5 h-3.5" />,
    bg: "bg-amber-500/10",
    text: "text-amber-400",
    border: "border-amber-500/20",
    label: "Pending",
  },
  suspended: {
    icon: <AlertTriangle className="w-3.5 h-3.5" />,
    bg: "bg-orange-500/10",
    text: "text-orange-400",
    border: "border-orange-500/20",
    label: "Suspended",
  },
  verified: {
    icon: <ShieldCheck className="w-3.5 h-3.5" />,
    bg: "bg-brand-500/10",
    text: "text-brand-400",
    border: "border-brand-500/20",
    label: "Verified",
  },
  unverified: {
    icon: <ShieldX className="w-3.5 h-3.5" />,
    bg: "bg-dark-700/50",
    text: "text-dark-400",
    border: "border-dark-600/50",
    label: "Unverified",
  },
  warning: {
    icon: <ShieldAlert className="w-3.5 h-3.5" />,
    bg: "bg-amber-500/10",
    text: "text-amber-400",
    border: "border-amber-500/20",
    label: "Warning",
  },
};

const statusSizes = {
  sm: "px-2 py-0.5 text-[11px] gap-1",
  md: "px-2.5 py-1 text-caption gap-1.5",
  lg: "px-3 py-1.5 text-body-sm gap-2",
};

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  status,
  label,
  size = "md",
  showIcon = true,
  className,
}) => {
  const config = statusConfig[status];

  return (
    <span
      className={cn(
        "inline-flex items-center font-semibold border rounded-full whitespace-nowrap",
        config.bg,
        config.text,
        config.border,
        statusSizes[size],
        className
      )}
    >
      {showIcon && config.icon}
      {label || config.label}
    </span>
  );
};
