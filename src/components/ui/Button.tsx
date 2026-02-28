"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger" | "accent" | "outline";
  size?: "sm" | "md" | "lg" | "xl";
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  glow?: boolean;
  fullWidth?: boolean;
}

const variants = {
  primary:
    "bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-400 text-white shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40",
  secondary:
    "bg-dark-800 hover:bg-dark-700 text-dark-100 border border-dark-600/50 hover:border-dark-500/50",
  ghost:
    "bg-transparent hover:bg-dark-800/50 text-dark-300 hover:text-dark-100",
  danger:
    "bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white shadow-lg shadow-red-500/25",
  accent:
    "bg-gradient-to-r from-accent-600 to-accent-500 hover:from-accent-500 hover:to-accent-400 text-white shadow-lg shadow-accent-500/25",
  outline:
    "bg-transparent border-2 border-brand-500/50 hover:border-brand-400 text-brand-400 hover:text-brand-300 hover:bg-brand-500/5",
};

const sizes = {
  sm: "px-3 py-1.5 text-body-sm rounded-lg gap-1.5",
  md: "px-5 py-2.5 text-body-md rounded-xl gap-2",
  lg: "px-7 py-3.5 text-body-lg rounded-xl gap-2.5",
  xl: "px-9 py-4 text-heading-md rounded-2xl gap-3",
};

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  icon,
  iconPosition = "left",
  glow = false,
  fullWidth = false,
  className,
  disabled,
  ...props
}) => {
  return (
    <motion.button
      whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
      whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
      className={cn(
        "relative inline-flex items-center justify-center font-semibold transition-all duration-300",
        "focus:outline-none focus:ring-2 focus:ring-brand-500/40 focus:ring-offset-2 focus:ring-offset-dark-950",
        "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100",
        variants[variant],
        sizes[size],
        glow && "animate-pulse-glow",
        fullWidth && "w-full",
        className
      )}
      disabled={disabled || loading}
      {...(props as any)}
    >
      {loading && (
        <Loader2 className="w-4 h-4 animate-spin" />
      )}
      {!loading && icon && iconPosition === "left" && (
        <span className="flex-shrink-0">{icon}</span>
      )}
      <span>{children}</span>
      {!loading && icon && iconPosition === "right" && (
        <span className="flex-shrink-0">{icon}</span>
      )}
    </motion.button>
  );
};
