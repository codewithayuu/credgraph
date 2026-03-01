"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface StatCardProps {
  icon: React.ReactNode;
  value: number | string;
  label: string;
  description?: string;
  color: "brand" | "accent" | "cyber" | "amber" | "red" | "purple";
  delay?: number;
  className?: string;
}

const colorMap = {
  brand: {
    bg: "bg-brand-500/8",
    border: "border-brand-500/15",
    text: "text-brand-400",
    iconBg: "bg-brand-500/15",
    glow: "hover:shadow-brand-500/10",
  },
  accent: {
    bg: "bg-accent-500/8",
    border: "border-accent-500/15",
    text: "text-accent-400",
    iconBg: "bg-accent-500/15",
    glow: "hover:shadow-accent-500/10",
  },
  cyber: {
    bg: "bg-cyber-500/8",
    border: "border-cyber-500/15",
    text: "text-cyber-400",
    iconBg: "bg-cyber-500/15",
    glow: "hover:shadow-cyber-500/10",
  },
  amber: {
    bg: "bg-amber-500/8",
    border: "border-amber-500/15",
    text: "text-amber-400",
    iconBg: "bg-amber-500/15",
    glow: "hover:shadow-amber-500/10",
  },
  red: {
    bg: "bg-red-500/8",
    border: "border-red-500/15",
    text: "text-red-400",
    iconBg: "bg-red-500/15",
    glow: "hover:shadow-red-500/10",
  },
  purple: {
    bg: "bg-purple-500/8",
    border: "border-purple-500/15",
    text: "text-purple-400",
    iconBg: "bg-purple-500/15",
    glow: "hover:shadow-purple-500/10",
  },
};

export const StatCard: React.FC<StatCardProps> = ({
  icon,
  value,
  label,
  description,
  color,
  delay = 0,
  className,
}) => {
  const c = colorMap[color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={cn(
        "p-5 rounded-2xl border transition-all duration-300 hover:shadow-xl",
        c.bg,
        c.border,
        c.glow,
        className
      )}
    >
      <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center mb-3", c.iconBg, c.text)}>
        {icon}
      </div>
      <div className={cn("text-display-sm font-black mb-1", c.text)}>
        {value}
      </div>
      <div className="text-body-sm font-medium text-dark-200">{label}</div>
      {description && (
        <div className="text-caption text-dark-500 mt-1">{description}</div>
      )}
    </motion.div>
  );
};
