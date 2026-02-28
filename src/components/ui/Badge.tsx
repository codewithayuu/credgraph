"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "success" | "danger" | "warning" | "info" | "brand" | "accent";
  size?: "sm" | "md" | "lg";
  dot?: boolean;
  pulse?: boolean;
  icon?: React.ReactNode;
  className?: string;
}

const badgeVariants = {
  default: "bg-dark-700/50 text-dark-300 border-dark-600/50",
  success: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  danger: "bg-red-500/10 text-red-400 border-red-500/20",
  warning: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  info: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  brand: "bg-brand-500/10 text-brand-400 border-brand-500/20",
  accent: "bg-accent-500/10 text-accent-400 border-accent-500/20",
};

const badgeSizes = {
  sm: "px-2 py-0.5 text-[11px]",
  md: "px-2.5 py-1 text-caption",
  lg: "px-3 py-1.5 text-body-sm",
};

const dotColors = {
  default: "bg-dark-400",
  success: "bg-emerald-400",
  danger: "bg-red-400",
  warning: "bg-amber-400",
  info: "bg-blue-400",
  brand: "bg-brand-400",
  accent: "bg-accent-400",
};

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "default",
  size = "md",
  dot = false,
  pulse = false,
  icon,
  className,
}) => {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 font-medium border rounded-full whitespace-nowrap",
        badgeVariants[variant],
        badgeSizes[size],
        className
      )}
    >
      {dot && (
        <span className="relative flex h-2 w-2">
          {pulse && (
            <span
              className={cn(
                "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
                dotColors[variant]
              )}
            />
          )}
          <span
            className={cn(
              "relative inline-flex rounded-full h-2 w-2",
              dotColors[variant]
            )}
          />
        </span>
      )}
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </span>
  );
};
