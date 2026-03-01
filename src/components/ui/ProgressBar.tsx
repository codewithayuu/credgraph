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
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value, max, label, showPercentage, showFraction = true, size = "md", className,
}) => {
  const pct = max > 0 ? Math.min((value / max) * 100, 100) : 0;
  const done = value >= max;
  const h = { sm: "h-1", md: "h-2", lg: "h-3" };

  return (
    <div className={cn("space-y-2", className)}>
      {(label || showPercentage || showFraction) && (
        <div className="flex items-center justify-between text-b3">
          {label && <span className="text-surface-400 font-medium">{label}</span>}
          <div className="flex items-center gap-2">
            {showFraction && <span className={cn("font-mono font-bold", done ? "text-neon-400" : "text-surface-200")}>{value}/{max}</span>}
            {showPercentage && <span className="text-surface-500">({Math.round(pct)}%)</span>}
          </div>
        </div>
      )}
      <div className={cn("w-full rounded-full bg-surface-800/80 overflow-hidden", h[size])}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className={cn(
            "h-full rounded-full",
            done ? "bg-gradient-neon" : "bg-gradient-to-r from-gold-500 via-gold-400 to-electric-400"
          )}
        />
      </div>
    </div>
  );
};
