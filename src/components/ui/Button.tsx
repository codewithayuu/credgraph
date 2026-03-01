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
  primary: "bg-gradient-gold text-void font-bold shadow-lg shadow-gold-500/15 hover:shadow-gold-500/30 hover:brightness-110 active:brightness-95",
  secondary: "bg-surface-800 hover:bg-surface-700 text-surface-100 border border-surface-700/60 hover:border-surface-600",
  ghost: "bg-transparent hover:bg-surface-800/60 text-surface-400 hover:text-surface-100",
  danger: "bg-gradient-crimson text-white font-bold shadow-lg shadow-crimson-500/15 hover:shadow-crimson-500/25",
  success: "bg-gradient-neon text-void font-bold shadow-lg shadow-neon-500/15 hover:shadow-neon-500/25",
  outline: "bg-transparent border-2 border-gold-500/40 text-gold-400 hover:border-gold-400/70 hover:bg-gold-500/5",
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
  return (
    <motion.button
      whileHover={{ scale: disabled || loading ? 1 : 1.015 }}
      whileTap={{ scale: disabled || loading ? 1 : 0.985 }}
      className={cn(
        "relative inline-flex items-center justify-center font-semibold transition-all duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500/30 focus-visible:ring-offset-2 focus-visible:ring-offset-void",
        "disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none",
        variantClasses[variant],
        sizeClasses[size],
        fullWidth && "w-full",
        className
      )}
      disabled={disabled || loading}
      {...(props as any)}
    >
      {loading && <Loader2 className="w-4 h-4 animate-spin" />}
      {!loading && icon && <span className="flex-shrink-0">{icon}</span>}
      <span>{children}</span>
      {!loading && iconRight && <span className="flex-shrink-0">{iconRight}</span>}
    </motion.button>
  );
};
