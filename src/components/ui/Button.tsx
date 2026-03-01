"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger" | "success" | "outline";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  loading?: boolean;
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
  fullWidth?: boolean;
}

const variantClasses = {
  primary: cn(
    "text-void font-semibold",
    "bg-gradient-gold",
    "border border-gold-400/20",
    "shadow-glow-gold",
    "hover:brightness-[1.04] hover:shadow-glow-gold-lg",
    "active:brightness-[0.98]",
    // subtle top sheen
    "before:absolute before:inset-0 before:rounded-[inherit] before:pointer-events-none",
    "before:bg-[linear-gradient(180deg,rgba(255,255,255,0.20),transparent_55%)] before:opacity-35",
    "hover:before:opacity-45 before:transition-opacity"
  ),
  secondary: cn(
    "text-surface-100 font-semibold",
    "bg-surface-800/70 hover:bg-surface-800",
    "border border-surface-700/55 hover:border-surface-600/60",
    "shadow-card"
  ),
  ghost: cn(
    "text-surface-300 hover:text-surface-100 font-semibold",
    "bg-transparent hover:bg-surface-800/55",
    "border border-transparent"
  ),
  danger: cn(
    "text-white font-semibold",
    "bg-gradient-crimson",
    "border border-crimson-400/20",
    "shadow-glow-crimson",
    "hover:brightness-[1.03]"
  ),
  success: cn(
    "text-void font-semibold",
    "bg-gradient-neon",
    "border border-neon-400/18",
    "shadow-glow-neon",
    "hover:brightness-[1.03]"
  ),
  outline: cn(
    "text-gold-300 font-semibold",
    "bg-transparent",
    "border border-gold-500/35 hover:border-gold-400/60",
    "hover:bg-gold-500/5"
  ),
};

const sizeClasses = {
  xs: "px-2.5 py-1 text-micro rounded-lg gap-1.5",
  sm: "px-3.5 py-1.5 text-b3 rounded-lg gap-1.5",
  md: "px-5 py-2.5 text-b2 rounded-xl gap-2",
  lg: "px-7 py-3.5 text-b1 rounded-xl gap-2.5",
  xl: "px-9 py-4 text-h3 rounded-2xl gap-3",
};

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  icon,
  iconRight,
  fullWidth = false,
  className,
  disabled,
  ...props
}) => {
  const isDisabled = disabled || loading;

  return (
    <motion.button
      whileHover={isDisabled ? undefined : { y: -1, scale: 1.015 }}
      whileTap={isDisabled ? undefined : { y: 0, scale: 0.985 }}
      transition={{ type: "spring", stiffness: 500, damping: 34 }}
      className={cn(
        "relative inline-flex items-center justify-center select-none",
        "transition-[transform,filter,box-shadow,background-color,border-color] duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500/30 focus-visible:ring-offset-2 focus-visible:ring-offset-void",
        "disabled:opacity-45 disabled:cursor-not-allowed disabled:pointer-events-none",
        "overflow-hidden",
        variantClasses[variant],
        sizeClasses[size],
        fullWidth && "w-full",
        className
      )}
      disabled={isDisabled}
      {...(props as any)}
    >
      {loading && <Loader2 className="w-4 h-4 animate-spin" />}
      {!loading && icon && <span className="flex-shrink-0">{icon}</span>}
      <span className="relative z-10">{children}</span>
      {!loading && iconRight && <span className="flex-shrink-0 relative z-10">{iconRight}</span>}
    </motion.button>
  );
};
