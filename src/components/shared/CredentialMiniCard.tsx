"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { CREDENTIAL_CATEGORIES } from "@/lib/constants";
import { CredentialBadge } from "./CredentialBadge";
import { StatusIndicator } from "@/components/ui/StatusIndicator";
import { Credential } from "@/lib/types";
import { formatTimestampShort } from "@/lib/utils";

interface CredentialMiniCardProps {
  credential: Credential;
  onClick?: () => void;
  className?: string;
}

export const CredentialMiniCard: React.FC<CredentialMiniCardProps> = ({
  credential,
  onClick,
  className,
}) => {
  const catConfig = CREDENTIAL_CATEGORIES[credential.category];

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 p-3 rounded-xl glass border border-dark-700/30",
        "hover:border-brand-500/20 cursor-pointer transition-all duration-300",
        credential.status === "revoked" && "opacity-60",
        className
      )}
    >
      <CredentialBadge
        typeId={credential.credentialTypeId}
        category={credential.category}
        tier={credential.tier}
        name={credential.credentialTypeName}
        size="sm"
        animated={false}
      />
      <div className="flex-1 min-w-0">
        <p className={cn(
          "text-body-sm font-medium truncate",
          credential.status === "revoked" ? "text-dark-500 line-through" : "text-dark-100"
        )}>
          {credential.credentialTypeName}
        </p>
        <p className="text-caption text-dark-500 truncate">{credential.issuerName}</p>
      </div>
      <StatusIndicator
        status={credential.status === "active" ? "active" : "revoked"}
        size="sm"
        showIcon={false}
      />
    </motion.div>
  );
};
