"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { useStudent } from "@/hooks/useStudent";
import { useCredentialStore } from "@/store/credentialStore";
import { cn } from "@/lib/utils";

export function StudentSkillPathsTab() {
    const { address } = useStudent();
    const { compositionRules, credentials } = useCredentialStore();

    const myCredentials = useMemo(() => {
        return credentials.filter(c => c.recipientAddress === address && c.status === "active");
    }, [credentials, address]);

    return (
        <div className="space-y-6">
            <div className="mb-6">
                <h3 className="text-h2 font-semibold text-white">Skill Paths</h3>
                <p className="text-b3 text-surface-400 mt-1">Track your progress towards mastery credentials.</p>
            </div>

            <div className="space-y-6">
                {compositionRules.map((rule, idx) => {
                    // Calculate progress
                    const requiredIds = rule.requiredCredentialTypeIds || [];
                    const earnedTypes = new Set(myCredentials.map(c => c.credentialTypeId));
                    const earnedCount = requiredIds.filter(id => earnedTypes.has(id)).length;
                    const totalCount = requiredIds.length;
                    const percentage = totalCount > 0 ? Math.round((earnedCount / totalCount) * 100) : 0;
                    const isComplete = earnedCount === totalCount && totalCount > 0;

                    return (
                        <motion.div
                            key={rule.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className={cn(
                                "panel rounded-3xl border p-6 relative overflow-hidden",
                                isComplete ? "border-gold-500/30" : "border-surface-800"
                            )}
                        >
                            {isComplete && (
                                <div className="absolute right-0 top-0 w-64 h-64 bg-gold-500/10 blur-3xl rounded-full pointer-events-none" />
                            )}

                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                                <div>
                                    <h4 className="text-h3 font-semibold text-white">{rule.name}</h4>
                                    <p className="text-micro text-surface-400 mt-1">{rule.description}</p>
                                </div>

                                <div className="text-right">
                                    <div className="text-h2 font-display font-bold text-white mb-1">
                                        {percentage}%
                                    </div>
                                    <div className="text-micro text-surface-400">
                                        {earnedCount} of {totalCount} credentials
                                    </div>
                                </div>
                            </div>

                            {/* Progress bar */}
                            <div className="h-2 w-full bg-surface-800 rounded-full overflow-hidden mb-6">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${percentage}%` }}
                                    transition={{ duration: 1, ease: "easeOut" }}
                                    className={cn(
                                        "h-full rounded-full",
                                        isComplete ? "bg-gradient-to-r from-gold-500 to-gold-400" : "bg-electric-500"
                                    )}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                                {rule.requiredCredentialTypes?.map((reqItem, i) => {
                                    const hasEarned = earnedTypes.has(reqItem.id);

                                    return (
                                        <div
                                            key={reqItem.id}
                                            className={cn(
                                                "p-4 rounded-xl border flex items-center gap-3 transition-colors",
                                                hasEarned
                                                    ? "bg-surface-800/80 border-electric-500/30"
                                                    : "bg-surface-900 border-surface-800 opacity-60"
                                            )}
                                        >
                                            <div className={cn(
                                                "w-8 h-8 rounded-lg flex items-center justify-center border",
                                                hasEarned
                                                    ? "bg-electric-500/20 border-electric-500/30 text-electric-400"
                                                    : "bg-surface-800 border-surface-700 text-surface-500"
                                            )}>
                                                {hasEarned ? (
                                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                        <path d="M13.3333 4L6 11.3333L2.66667 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                ) : (
                                                    <span className="text-micro font-bold">{i + 1}</span>
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className={cn(
                                                    "text-b3 font-medium truncate",
                                                    hasEarned ? "text-white" : "text-surface-300"
                                                )}>
                                                    {reqItem.name}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}
