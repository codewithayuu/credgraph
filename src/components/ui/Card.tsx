"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "elevated" | "highlighted" | "golden" | "interactive";
  padding?: "none" | "sm" | "md" | "lg" | "xl";
  hover?: boolean;
  onClick?: () => void;
}

const paddings = { none: "", sm: "p-4", md: "p-6", lg: "p-8", xl: "p-10" };

const variants = {
  default: "panel",
  elevated: "panel-elevated",
  highlighted: "panel relative highlight-line-top",
  golden: "panel-solid border-gold-500/10 relative overflow-hidden",
  interactive: "panel cursor-pointer",
};

export const Card: React.FC<CardProps> = ({
  children,
  className,
  variant = "default",
  padding = "md",
  hover = false,
  onClick,
}) => {
  const isInteractive = hover || variant === "interactive";

  return (
    <motion.div
      whileHover={isInteractive ? { y: -3 } : undefined}
      transition={isInteractive ? { type: "spring", stiffness: 420, damping: 32 } : undefined}
      className={cn(
        "rounded-2xl",
        "transition-[transform,box-shadow,border-color,background-color] duration-200",
        variants[variant],
        paddings[padding],
        isInteractive && "hover:shadow-panel-hover hover:border-gold-500/14",
        isInteractive && "cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      {variant === "golden" && (
        <div className="absolute top-0 right-0 w-48 h-48 orb orb-gold opacity-40 -translate-y-1/2 translate-x-1/4" />
      )}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};

export const CardHeader: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <div className={cn("mb-5", className)}>{children}</div>
);

export const CardTitle: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <h3 className={cn("font-display text-h2 text-white", className)}>{children}</h3>
);

export const CardDescription: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => <p className={cn("text-b2 text-surface-400 mt-1.5", className)}>{children}</p>;
