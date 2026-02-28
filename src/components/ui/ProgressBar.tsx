"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ProgressBarProps {
  value: number;
  max: number;
  label?: string;
  showPercentage?: boolean;
  showFraction?: boolean;
  size?: "sm" | "md" | "lg";
  variant?: "brand" | "accent" | "gradient";
  className?: string;
  animated?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max,
  label,
  showPercentage = false,
  showFraction = true,
  size = "md",
  variant = "gradient",
  className,
  animated = true,
}) => {
  const percentage = max > 0 ? Math.min((value / max) * 100, 100) : 0;
  const isComplete = value >= max;

  const heights = {
    sm: "h-1.5",
    md: "h-2.5",
    lg: "h-4",
  };

  const barColors = {
    brand: "bg-gradient-to-r from-brand-600 to-brand-400",
    accent: "bg-gradient-to-r from-accent-600 to-accent-400",
    gradient: isComplete
      ? "bg-gradient-to-r from-accent-500 to-emerald-400"
      : "bg-gradient-to-r from-brand-600 via-brand-400 to-cyber-400",
  };

  return (
    <div className={cn("space-y-2", className)}>
      {(label || showPercentage || showFraction) && (
        <div className="flex items-center justify-between text-body-sm">
          {label && <span className="text-dark-300 font-medium">{label}</span>}
          <div className="flex items-center gap-2">
            {showFraction && (
              <span className={cn("font-mono font-semibold", isComplete ? "text-accent-400" : "text-dark-200")}>
                {value}/{max}
              </span>
            )}
            {showPercentage && (
              <span className="text-dark-400">
                ({Math.round(percentage)}%)
              </span>
            )}
          </div>
        </div>
      )}
      <div
        className={cn(
          "w-full rounded-full bg-dark-800/80 overflow-hidden",
          heights[size]
        )}
      >
        <motion.div
          initial={animated ? { width: 0 } : undefined}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
          className={cn("h-full rounded-full", barColors[variant])}
        />
      </div>
    </div>
  );
};
