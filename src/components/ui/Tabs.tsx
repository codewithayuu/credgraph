"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface Tab {
  id: string;
  label: string;
  icon?: React.ReactNode;
  count?: number;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  className?: string;
  variant?: "default" | "pills" | "underline";
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTab,
  onTabChange,
  className,
  variant = "default",
}) => {
  return (
    <div
      className={cn(
        "flex gap-1",
        variant === "default" && "bg-dark-900/60 p-1 rounded-xl border border-dark-700/50",
        variant === "underline" && "border-b border-dark-700/50 gap-0",
        className
      )}
    >
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "relative flex items-center gap-2 px-4 py-2.5 text-body-sm font-medium transition-all duration-300 whitespace-nowrap",
              variant === "default" && "rounded-lg",
              variant === "pills" && "rounded-full",
              variant === "underline" && "px-5 py-3 rounded-none",
              isActive
                ? variant === "underline"
                  ? "text-brand-400"
                  : "text-white"
                : "text-dark-400 hover:text-dark-200"
            )}
          >
            {isActive && variant !== "underline" && (
              <motion.div
                layoutId="activeTab"
                className={cn(
                  "absolute inset-0",
                  variant === "default" && "bg-brand-600/20 border border-brand-500/30 rounded-lg",
                  variant === "pills" && "bg-brand-600/20 border border-brand-500/30 rounded-full"
                )}
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            {isActive && variant === "underline" && (
              <motion.div
                layoutId="activeTabUnderline"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-400"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-2">
              {tab.icon}
              {tab.label}
              {tab.count !== undefined && (
                <span
                  className={cn(
                    "px-1.5 py-0.5 text-[10px] font-bold rounded-full",
                    isActive
                      ? "bg-brand-500/30 text-brand-300"
                      : "bg-dark-700 text-dark-400"
                  )}
                >
                  {tab.count}
                </span>
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
};
