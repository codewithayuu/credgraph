"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "gold" | "electric" | "neon" | "crimson" | "azure" | "violet";
  size?: "sm" | "md" | "lg";
  dot?: boolean;
  pulse?: boolean;
  icon?: React.ReactNode;
  className?: string;
}

const badgeVariants = {
  default: "bg-surface-800/55 text-surface-300 border-surface-700/45",
  gold: "bg-gold-500/10 text-gold-300 border-gold-500/18",
  electric: "bg-electric-500/10 text-electric-300 border-electric-500/18",
  neon: "bg-neon-500/10 text-neon-300 border-neon-500/18",
  crimson: "bg-crimson-500/10 text-crimson-300 border-crimson-500/18",
  azure: "bg-azure-500/10 text-azure-300 border-azure-500/18",
  violet: "bg-violet-500/10 text-violet-300 border-violet-500/18",
};

const dotColors = {
  default: "bg-surface-400",
  gold: "bg-gold-400",
  electric: "bg-electric-400",
  neon: "bg-neon-400",
  crimson: "bg-crimson-400",
  azure: "bg-azure-400",
  violet: "bg-violet-400",
};

const sizes = {
  sm: "px-2 py-0.5 text-micro gap-1",
  md: "px-2.5 py-1 text-cap gap-1.5",
  lg: "px-3.5 py-1.5 text-b3 gap-2",
};

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "default",
  size = "md",
  dot,
  pulse,
  icon,
  className,
}) => {
  return (
    <span
      className={cn(
        "inline-flex items-center font-semibold border rounded-full whitespace-nowrap",
        "backdrop-blur-sm",
        badgeVariants[variant],
        sizes[size],
        className
      )}
    >
      {dot && (
        <span className="relative flex h-1.5 w-1.5">
          {pulse && (
            <span
              className={cn(
                "animate-ping absolute inline-flex h-full w-full rounded-full opacity-60",
                dotColors[variant]
              )}
            />
          )}
          <span className={cn("relative inline-flex rounded-full h-1.5 w-1.5", dotColors[variant])} />
        </span>
      )}

      {icon && <span className="flex-shrink-0 [&>svg]:w-3.5 [&>svg]:h-3.5">{icon}</span>}
      {children}
    </span>
  );
};
