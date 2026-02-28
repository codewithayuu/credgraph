"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface GlowOrbProps {
  color?: "brand" | "accent" | "cyber";
  size?: "sm" | "md" | "lg" | "xl";
  position?: string;
  className?: string;
  animated?: boolean;
}

const orbColors = {
  brand: "from-brand-500/20 to-brand-600/5",
  accent: "from-accent-500/15 to-accent-600/5",
  cyber: "from-cyber-500/15 to-cyber-600/5",
};

const orbSizes = {
  sm: "w-32 h-32",
  md: "w-64 h-64",
  lg: "w-96 h-96",
  xl: "w-[500px] h-[500px]",
};

export const GlowOrb: React.FC<GlowOrbProps> = ({
  color = "brand",
  size = "md",
  position,
  className,
  animated = true,
}) => {
  return (
    <motion.div
      animate={
        animated
          ? {
              scale: [1, 1.1, 1],
              opacity: [0.5, 0.8, 0.5],
            }
          : undefined
      }
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={cn(
        "absolute rounded-full bg-gradient-radial blur-3xl pointer-events-none",
        orbColors[color],
        orbSizes[size],
        position,
        className
      )}
    />
  );
};
