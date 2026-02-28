"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface GridBackgroundProps {
  className?: string;
  variant?: "grid" | "dots" | "mesh";
  children?: React.ReactNode;
}

export const GridBackground: React.FC<GridBackgroundProps> = ({
  className,
  variant = "grid",
  children,
}) => {
  return (
    <div className={cn("relative", className)}>
      <div
        className={cn(
          "absolute inset-0 pointer-events-none",
          variant === "grid" && "grid-pattern",
          variant === "dots" && "dot-pattern",
          variant === "mesh" && "mesh-bg"
        )}
      />
      {/* Fade edges */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-dark-950 via-transparent to-dark-950" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-dark-950 via-transparent to-dark-950 opacity-50" />
      {children && <div className="relative z-10">{children}</div>}
    </div>
  );
};
