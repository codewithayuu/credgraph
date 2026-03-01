"use client";

import React from "react";
import { cn } from "@/lib/utils";

type StatusType =
  | "active"
  | "revoked"
  | "pending"
  | "suspended"
  | "verified"
  | "unverified"
  | "warning";

interface StatusIndicatorProps {
  status: StatusType;
  label?: string;
  size?: "sm" | "md" | "lg";
  showIcon?: boolean;
  className?: string;
}

const sizes = {
  sm: "px-2 py-0.5 text-micro gap-1",
  md: "px-2.5 py-1 text-cap gap-1.5",
  lg: "px-3 py-1.5 text-b3 gap-2",
};

const config: Record<
  StatusType,
  { icon: React.ReactNode; bg: string; text: string; border: string; label: string }
> = {
  active: {
    icon: <MarkCheck />,
    bg: "bg-neon-500/10",
    text: "text-neon-300",
    border: "border-neon-500/18",
    label: "Active",
  },
  revoked: {
    icon: <MarkX />,
    bg: "bg-crimson-500/10",
    text: "text-crimson-300",
    border: "border-crimson-500/18",
    label: "Revoked",
  },
  pending: {
    icon: <MarkPending />,
    bg: "bg-gold-500/10",
    text: "text-gold-300",
    border: "border-gold-500/18",
    label: "Pending",
  },
  suspended: {
    icon: <MarkWarning />,
    bg: "bg-gold-600/10",
    text: "text-gold-300",
    border: "border-gold-600/18",
    label: "Suspended",
  },
  verified: {
    icon: <MarkShieldCheck />,
    bg: "bg-electric-500/10",
    text: "text-electric-300",
    border: "border-electric-500/18",
    label: "Verified",
  },
  unverified: {
    icon: <MarkShieldOff />,
    bg: "bg-surface-800/45",
    text: "text-surface-500",
    border: "border-white/8",
    label: "Unverified",
  },
  warning: {
    icon: <MarkWarning />,
    bg: "bg-gold-500/10",
    text: "text-gold-300",
    border: "border-gold-500/18",
    label: "Warning",
  },
};

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  status,
  label,
  size = "md",
  showIcon = true,
  className,
}) => {
  const c = config[status];

  return (
    <span
      className={cn(
        "inline-flex items-center font-semibold border rounded-full whitespace-nowrap",
        "backdrop-blur-sm",
        c.bg,
        c.text,
        c.border,
        sizes[size],
        className
      )}
    >
      {showIcon && <span className="opacity-95">{c.icon}</span>}
      {label || c.label}
    </span>
  );
};

/* Bespoke micro-marks (consistent stroke, premium feel) */
function MarkCheck() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path
        d="M20 6L9 17l-5-5"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MarkX() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
      <path d="M6 6l12 12" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
    </svg>
  );
}

function MarkPending() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 3.3a8.7 8.7 0 1 0 0 17.4a8.7 8.7 0 0 0 0-17.4Z"
        stroke="currentColor"
        strokeWidth="2.0"
        opacity="0.8"
      />
      <path
        d="M12 7.8V12l3 1.9"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MarkWarning() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 3l10 18H2L12 3Z"
        stroke="currentColor"
        strokeWidth="2.0"
        strokeLinejoin="round"
        opacity="0.85"
      />
      <path d="M12 9v5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M12 17.6h.01" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" />
    </svg>
  );
}

function MarkShieldCheck() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 3l8 4.6v6.1c0 4.7-3.2 7.9-8 9.3c-4.8-1.4-8-4.6-8-9.3V7.6L12 3z"
        stroke="currentColor"
        strokeWidth="2.0"
        strokeLinejoin="round"
        opacity="0.8"
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

function MarkShieldOff() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 3l8 4.6v6.1c0 4.7-3.2 7.9-8 9.3c-4.8-1.4-8-4.6-8-9.3V7.6L12 3z"
        stroke="currentColor"
        strokeWidth="2.0"
        strokeLinejoin="round"
        opacity="0.75"
      />
      <path
        d="M7 17L17 7"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        opacity="0.8"
      />
    </svg>
  );
}
