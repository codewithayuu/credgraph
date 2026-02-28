"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "glass" | "highlight" | "gradient" | "interactive";
  padding?: "none" | "sm" | "md" | "lg";
  hover?: boolean;
  onClick?: () => void;
}

const paddingSizes = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

const variantStyles = {
  default: "bg-dark-900/60 border border-dark-700/50",
  glass: "glass",
  highlight: "glass card-highlight",
  gradient: "gradient-border glass",
  interactive: "glass cursor-pointer",
};

export const Card: React.FC<CardProps> = ({
  children,
  className,
  variant = "default",
  padding = "md",
  hover = false,
  onClick,
}) => {
  return (
    <motion.div
      whileHover={
        hover || variant === "interactive"
          ? { y: -4, transition: { duration: 0.3 } }
          : undefined
      }
      className={cn(
        "rounded-2xl backdrop-blur-xl transition-all duration-500",
        variantStyles[variant],
        paddingSizes[padding],
        (hover || variant === "interactive") &&
          "hover:shadow-glow hover:border-brand-500/30 cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
};

// Card Header
export const CardHeader: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => (
  <div className={cn("mb-4", className)}>{children}</div>
);

// Card Title
export const CardTitle: React.FC<{
  children: React.ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4";
}> = ({ children, className, as: Tag = "h3" }) => (
  <Tag className={cn("text-heading-lg font-bold text-dark-50", className)}>
    {children}
  </Tag>
);

// Card Description
export const CardDescription: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => (
  <p className={cn("text-body-md text-dark-400 mt-1", className)}>{children}</p>
);

// Card Content
export const CardContent: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => (
  <div className={cn("", className)}>{children}</div>
);

// Card Footer
export const CardFooter: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => (
  <div className={cn("mt-6 pt-4 border-t border-dark-700/50 flex items-center gap-3", className)}>
    {children}
  </div>
);
