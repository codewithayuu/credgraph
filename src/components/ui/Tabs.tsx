"use client";

import React, { useId } from "react";
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
  onTabChange: (id: string) => void;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, onTabChange, className }) => {
  const uid = useId();

  return (
    <div
      className={cn(
        "panel rounded-2xl border border-surface-800/50",
        "p-1.5",
        "overflow-x-auto",
        "[-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        className
      )}
    >
      <div className="flex gap-1 min-w-max">
        {tabs.map((tab) => {
          const active = tab.id === activeTab;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "relative isolate",
                "flex items-center gap-2",
                "px-4 py-2.5 rounded-xl whitespace-nowrap",
                "text-b3 font-semibold",
                "transition-[color,transform] duration-200",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500/25 focus-visible:ring-offset-2 focus-visible:ring-offset-void",
                active ? "text-surface-100" : "text-surface-400 hover:text-surface-200"
              )}
            >
              {active && (
                <>
                  <motion.div
                    layoutId={`tabActive-${uid}`}
                    className="absolute inset-0 rounded-xl bg-gradient-to-br from-gold-500/12 via-electric-500/8 to-transparent border border-white/8"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                  <motion.div
                    layoutId={`tabActiveRail-${uid}`}
                    className="absolute left-2 right-2 bottom-1 h-px rounded-full bg-gradient-to-r from-transparent via-gold-400/70 to-transparent"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                </>
              )}

              <span className="relative z-10 flex items-center gap-2">
                {tab.icon && (
                  <span
                    className={cn(
                      "w-8 h-8 rounded-xl flex items-center justify-center border",
                      active
                        ? "bg-gold-500/10 border-gold-500/14 text-gold-300"
                        : "bg-surface-900/35 border-white/6 text-surface-400"
                    )}
                  >
                    <span className="[&>svg]:w-4 [&>svg]:h-4">{tab.icon}</span>
                  </span>
                )}

                <span>{tab.label}</span>

                {tab.count !== undefined && (
                  <span
                    className={cn(
                      "ml-1 px-2 py-0.5 rounded-full border",
                      "text-micro font-semibold tracking-[0.18em] uppercase",
                      active
                        ? "bg-gold-500/10 text-gold-300 border-gold-500/14"
                        : "bg-surface-900/35 text-surface-500 border-white/6"
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
    </div>
  );
};
