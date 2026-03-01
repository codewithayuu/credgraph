"use client";

import React from "react";
import { motion } from "framer-motion";
import { useCredentialStore } from "@/store/credentialStore";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { StatusIndicator } from "@/components/ui/StatusIndicator";
import { EmptyState } from "@/components/ui/EmptyState";
import { CREDENTIAL_CATEGORIES } from "@/lib/constants";
import {
  Crown,
  CheckCircle2,
  Circle,
  TrendingUp,
  Sparkles,
  ArrowRight,
} from "lucide-react";

interface Props {
  address: string;
}

export const ProgressTracker: React.FC<Props> = ({ address }) => {
  const { getCompositionProgress, credentialTypes } = useCredentialStore();
  const progress = getCompositionProgress(address);

  if (progress.length === 0) {
    return (
      <EmptyState
        icon={<TrendingUp className="w-8 h-8 text-dark-500" />}
        title="No Skill Paths Available"
        description="When issuers define composition rules, your progress toward mastery certifications will appear here."
      />
    );
  }

  return (
    <div className="space-y-6">
      {progress.map((item, i) => {
        const compositeType = credentialTypes.find(
          (t) => t.id === item.rule.compositeCredentialTypeId
        );

        return (
          <motion.div
            key={item.rule.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
          >
            <Card variant="gradient" padding="lg">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white shadow-lg shadow-amber-500/20">
                    <Crown className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-heading-lg font-bold text-white">{item.rule.name}</h3>
                    <p className="text-body-sm text-dark-400">{item.rule.definedByName}</p>
                  </div>
                </div>

                {item.isEligible ? (
                  <Badge variant="success" size="lg" dot pulse>
                    Complete
                  </Badge>
                ) : (
                  <Badge variant="warning" size="lg">
                    {item.totalEarned}/{item.totalRequired}
                  </Badge>
                )}
              </div>

              <p className="text-body-md text-dark-400 mb-6">{item.rule.description}</p>

              <ProgressBar
                value={item.totalEarned}
                max={item.totalRequired}
                size="lg"
                showFraction
                showPercentage
                className="mb-6"
              />

              <div className="space-y-2">
                {item.rule.requiredCredentialTypeIds.map((typeId) => {
                  const type = credentialTypes.find((t) => t.id === typeId);
                  const isEarned = item.earnedTypeIds.includes(typeId);
                  const catConfig = type ? CREDENTIAL_CATEGORIES[type.category] : null;

                  return (
                    <div
                      key={typeId}
                      className={`flex items-center gap-3 p-3 rounded-xl border transition-all duration-300 ${
                        isEarned
                          ? "bg-accent-500/5 border-accent-500/15"
                          : "bg-dark-800/20 border-dark-700/20"
                      }`}
                    >
                      {isEarned ? (
                        <CheckCircle2 className="w-5 h-5 text-accent-400 flex-shrink-0" />
                      ) : (
                        <Circle className="w-5 h-5 text-dark-600 flex-shrink-0" />
                      )}
                      <span className={`flex-1 text-body-md font-medium ${isEarned ? "text-dark-100" : "text-dark-500"}`}>
                        {type?.name || "Unknown"}
                      </span>
                      {catConfig && (
                        <Badge variant="info" size="sm">{catConfig.label}</Badge>
                      )}
                      <span className="text-caption font-mono text-dark-600">{typeId}</span>
                    </div>
                  );
                })}
              </div>

              {item.isEligible && item.compositeCredential && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 rounded-xl bg-accent-500/5 border border-accent-500/15"
                >
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-accent-400" />
                    <span className="text-body-md font-semibold text-accent-300">
                      Mastery credential earned and in your wallet!
                    </span>
                  </div>
                </motion.div>
              )}

              {item.isEligible && !item.compositeCredential && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 rounded-xl bg-amber-500/5 border border-amber-500/15"
                >
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-amber-400" />
                    <span className="text-body-md font-semibold text-amber-300">
                      All requirements met! Composite credential will be auto-issued.
                    </span>
                  </div>
                </motion.div>
              )}
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
};
