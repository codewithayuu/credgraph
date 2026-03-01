"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ icon, title, description, action, className }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("flex flex-col items-center justify-center py-20 px-8 text-center", className)}
    >
      <div className="w-14 h-14 rounded-2xl bg-surface-800/60 border border-surface-700/40 flex items-center justify-center mb-5">
        {icon || (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-surface-500">
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" strokeLinecap="round" strokeLinejoin="round" />
            <polyline points="14,2 14,8 20,8" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="9" y1="15" x2="15" y2="15" strokeLinecap="round" />
          </svg>
        )}
      </div>
      <h3 className="text-h3 text-surface-200 mb-2">{title}</h3>
      <p className="text-b2 text-surface-500 max-w-sm mb-6">{description}</p>
      {action}
    </motion.div>
  );
};
