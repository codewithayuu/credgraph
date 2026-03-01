"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface GradientBorderProps {
  children: React.ReactNode;
  className?: string;
  borderWidth?: number;
  gradient?: string;
  rounded?: string;
  animated?: boolean;
}

export const GradientBorder: React.FC<GradientBorderProps> = ({
  children,
  className,
  borderWidth = 1,
  gradient = "linear-gradient(135deg, rgba(99, 102, 241, 0.5), rgba(20, 184, 166, 0.5), rgba(16, 185, 129, 0.5))",
  rounded = "rounded-2xl",
  animated = false,
}) => {
  return (
    <div
      className={cn("relative", rounded, className)}
      style={{ padding: borderWidth }}
    >
      <div
        className={cn(
          "absolute inset-0",
          rounded,
          animated && "animate-gradient-x"
        )}
        style={{
          background: gradient,
          backgroundSize: animated ? "200% 200%" : "100% 100%",
        }}
      />
      <div className={cn("relative bg-dark-900", rounded)}>
        {children}
      </div>
    </div>
  );
};
