"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
  variant?: "text" | "circular" | "rectangular" | "card";
  width?: string;
  height?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className,
  variant = "rectangular",
  width,
  height,
}) => {
  const variants = {
    text: "h-4 rounded-md",
    circular: "rounded-full",
    rectangular: "rounded-xl",
    card: "rounded-2xl h-48",
  };

  return (
    <div
      className={cn(
        "bg-dark-800/60 shimmer-bg",
        variants[variant],
        className
      )}
      style={{ width, height }}
    />
  );
};

// Credential Card Skeleton
export const CredentialCardSkeleton: React.FC = () => (
  <div className="glass rounded-2xl p-6 space-y-4">
    <div className="flex items-start justify-between">
      <div className="flex items-center gap-3">
        <Skeleton className="w-12 h-12" variant="circular" />
        <div className="space-y-2">
          <Skeleton className="w-40 h-5" />
          <Skeleton className="w-28 h-3" />
        </div>
      </div>
      <Skeleton className="w-20 h-6 rounded-full" />
    </div>
    <div className="space-y-2">
      <Skeleton className="w-full h-3" />
      <Skeleton className="w-3/4 h-3" />
    </div>
    <div className="flex gap-2">
      <Skeleton className="w-20 h-6 rounded-full" />
      <Skeleton className="w-24 h-6 rounded-full" />
    </div>
  </div>
);
