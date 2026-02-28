"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { FileX2 } from "lucide-react";

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  action,
  className,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "flex flex-col items-center justify-center py-16 px-8 text-center",
        className
      )}
    >
      <div className="w-16 h-16 rounded-2xl bg-dark-800/60 border border-dark-700/50 flex items-center justify-center mb-6">
        {icon || <FileX2 className="w-8 h-8 text-dark-500" />}
      </div>
      <h3 className="text-heading-md font-semibold text-dark-200 mb-2">
        {title}
      </h3>
      <p className="text-body-md text-dark-500 max-w-sm mb-6">{description}</p>
      {action}
    </motion.div>
  );
};
