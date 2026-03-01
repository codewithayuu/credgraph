"use client";

import React, { useState } from "react";
import { cn, copyToClipboard } from "@/lib/utils";

interface CopyButtonProps {
  text: string;
  label?: string;
  className?: string;
  size?: "sm" | "md";
}

export const CopyButton: React.FC<CopyButtonProps> = ({ text, label, className, size = "md" }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await copyToClipboard(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  const iconSize = size === "sm" ? "w-3.5 h-3.5" : "w-4 h-4";
  const chipSize = size === "sm" ? "w-7 h-7 rounded-xl" : "w-8 h-8 rounded-xl";
  const textSize = size === "sm" ? "text-cap" : "text-b3";

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={cn(
        "inline-flex items-center gap-2",
        "transition-[color,background-color,border-color,box-shadow,transform] duration-200",
        "text-surface-500 hover:text-surface-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500/25 focus-visible:ring-offset-2 focus-visible:ring-offset-void",
        className
      )}
      aria-label="Copy to clipboard"
      title={copied ? "Copied" : "Copy"}
    >
      <span
        className={cn(
          "inline-flex items-center justify-center",
          chipSize,
          "border border-transparent",
          "bg-surface-900/25",
          "hover:bg-surface-800/40 hover:border-white/6",
          copied ? "text-neon-300" : "text-surface-500 hover:text-gold-300"
        )}
      >
        {copied ? <MarkCheck className={iconSize} /> : <MarkCopy className={iconSize} />}
      </span>

      {label && (
        <span className={cn(textSize, "font-medium")}>
          {copied ? "Copied" : label}
        </span>
      )}
    </button>
  );
};

function MarkCopy({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path
        d="M9 9h10v10H9V9Z"
        stroke="currentColor"
        strokeWidth="2.0"
        opacity="0.85"
      />
      <path
        d="M5 15H4.2C3 15 2 14 2 12.8V4.2C2 3 3 2 4.2 2h8.6C14 2 15 3 15 4.2V5"
        stroke="currentColor"
        strokeWidth="2.0"
        strokeLinecap="round"
        opacity="0.65"
      />
    </svg>
  );
}

function MarkCheck({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path
        d="M20 6L9 17l-5-5"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
