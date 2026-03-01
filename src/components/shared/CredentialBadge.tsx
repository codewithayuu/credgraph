"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { CREDENTIAL_CATEGORIES, CREDENTIAL_TIERS } from "@/lib/constants";
import {
  Code,
  Database,
  Server,
  Plug,
  Cloud,
  Trophy,
  Brain,
  Crown,
  Award,
  Star,
  Hexagon,
} from "lucide-react";

interface CredentialBadgeProps {
  typeId: string;
  category: string;
  tier: string;
  name: string;
  size?: "sm" | "md" | "lg" | "xl";
  animated?: boolean;
  showTierRing?: boolean;
  className?: string;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  "CT-001": Code,
  "CT-002": Database,
  "CT-003": Server,
  "CT-004": Plug,
  "CT-005": Cloud,
  "CT-006": Trophy,
  "CT-007": Brain,
  "CT-010": Crown,
};

const categoryGradients: Record<string, string> = {
  technical: "from-blue-500 to-blue-600",
  soft_skill: "from-purple-500 to-purple-600",
  achievement: "from-amber-500 to-orange-500",
  research: "from-cyan-500 to-cyan-600",
  certification: "from-emerald-500 to-emerald-600",
  academic: "from-indigo-500 to-indigo-600",
};

const tierRingColors: Record<string, string> = {
  beginner: "ring-green-400/30",
  intermediate: "ring-blue-400/30",
  advanced: "ring-purple-400/30",
  expert: "ring-amber-400/50",
};

const sizes = {
  sm: { outer: "w-10 h-10", inner: "w-5 h-5", ring: "ring-2" },
  md: { outer: "w-14 h-14", inner: "w-7 h-7", ring: "ring-2" },
  lg: { outer: "w-20 h-20", inner: "w-10 h-10", ring: "ring-3" },
  xl: { outer: "w-28 h-28", inner: "w-14 h-14", ring: "ring-4" },
};

export const CredentialBadge: React.FC<CredentialBadgeProps> = ({
  typeId,
  category,
  tier,
  name,
  size = "md",
  animated = true,
  showTierRing = true,
  className,
}) => {
  const IconComponent = iconMap[typeId] || Award;
  const gradient = categoryGradients[category] || categoryGradients.technical;
  const ringColor = tierRingColors[tier] || tierRingColors.beginner;
  const sizeConfig = sizes[size];

  const badge = (
    <div
      className={cn(
        "relative rounded-2xl flex items-center justify-center",
        `bg-gradient-to-br ${gradient}`,
        sizeConfig.outer,
        showTierRing && `${sizeConfig.ring} ${ringColor} ring-offset-2 ring-offset-dark-900`,
        "shadow-lg",
        className
      )}
    >
      <IconComponent className={cn("text-white", sizeConfig.inner)} />

      {tier === "expert" && (
        <div className="absolute -top-1 -right-1">
          <Star className="w-4 h-4 text-amber-400 fill-amber-400 drop-shadow-lg" />
        </div>
      )}
    </div>
  );

  if (animated) {
    return (
      <motion.div
        whileHover={{ scale: 1.1, rotate: 3 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 15 }}
      >
        {badge}
      </motion.div>
    );
  }

  return badge;
};
