"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Copy, Check } from "lucide-react";
import { copyToClipboard } from "@/lib/utils";

interface CopyButtonProps {
  text: string;
  label?: string;
  className?: string;
  size?: "sm" | "md";
}

export const CopyButton: React.FC<CopyButtonProps> = ({
  text,
  label,
  className,
  size = "md",
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await copyToClipboard(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className={cn(
        "inline-flex items-center gap-1.5 font-medium transition-all duration-300",
        "text-dark-400 hover:text-brand-400",
        size === "sm" ? "text-caption" : "text-body-sm",
        className
      )}
    >
      {copied ? (
        <Check className={cn(size === "sm" ? "w-3 h-3" : "w-4 h-4", "text-accent-400")} />
      ) : (
        <Copy className={cn(size === "sm" ? "w-3 h-3" : "w-4 h-4")} />
      )}
      {label && <span>{copied ? "Copied!" : label}</span>}
    </button>
  );
};
