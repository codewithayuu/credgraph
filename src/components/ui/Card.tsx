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
  children, className, variant = "default", padding = "md", hover = false, onClick,
}) => {
  return (
    <motion.div
      whileHover={hover || variant === "interactive" ? { y: -3, transition: { duration: 0.25 } } : undefined}
      className={cn(
        "rounded-2xl transition-all duration-400",
        variants[variant],
        paddings[padding],
        (hover || variant === "interactive") && "hover:shadow-card-hover hover:border-gold-500/15 cursor-pointer",
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
  <h3 className={cn("text-h2 text-white", className)}>{children}</h3>
);

export const CardDescription: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <p className={cn("text-b2 text-surface-400 mt-1.5", className)}>{children}</p>
);
