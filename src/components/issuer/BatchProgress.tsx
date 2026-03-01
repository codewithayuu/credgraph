"use client";

import React from "react";
import { motion } from "framer-motion";
import { BatchIssueJob, BatchIssueRow, CredentialType } from "@/lib/types";
import { cn } from "@/lib/utils";

interface BatchProgressProps {
    job: BatchIssueJob;
    rows: BatchIssueRow[];
    credentialTypes: CredentialType[];
}

export function BatchProgress({ job, rows, credentialTypes }: BatchProgressProps) {
    const totalPending = rows.filter((r) => r.status === "pending" || r.status === "processing").length + job.processedRows;
    const progressPercent = totalPending > 0 ? (job.processedRows / totalPending) * 100 : 0;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="text-center">
                <h3 className="text-h2 font-semibold text-white">Processing Batch</h3>
                <p className="text-b3 text-surface-400 mt-1">
                    Issuing credentials to {job.totalRows} recipients...
                </p>
            </div>

            {/* Progress bar */}
            <div className="rounded-xl bg-surface-900/60 border border-surface-800 p-6 space-y-4">
                <div className="flex items-center justify-between">
                    <span className="text-b3 text-surface-300 font-medium">
                        {job.processedRows} of {job.totalRows} processed
                    </span>
                    <span className="text-b3 text-gold-400 font-mono font-semibold">
                        {Math.round(progressPercent)}%
                    </span>
                </div>

                <div className="h-3 rounded-full bg-surface-800 overflow-hidden">
                    <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-gold-500 via-electric-500 to-neon-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${progressPercent}%` }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                    />
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3">
                    <div className="p-3 rounded-lg bg-surface-850 border border-surface-800/50 text-center">
                        <p className="text-h2 text-gold-400 font-bold font-display">
                            {job.processedRows}
                        </p>
                        <p className="text-micro text-surface-400">Processed</p>
                    </div>
                    <div className="p-3 rounded-lg bg-neon-500/5 border border-neon-500/15 text-center">
                        <p className="text-h2 text-neon-400 font-bold font-display">
                            {job.successCount}
                        </p>
                        <p className="text-micro text-surface-400">Succeeded</p>
                    </div>
                    <div className="p-3 rounded-lg bg-crimson-500/5 border border-crimson-500/15 text-center">
                        <p className="text-h2 text-crimson-400 font-bold font-display">
                            {job.failedCount}
                        </p>
                        <p className="text-micro text-surface-400">Failed</p>
                    </div>
                </div>
            </div>

            {/* Live row updates */}
            <div className="rounded-xl bg-surface-900/60 border border-surface-800 overflow-hidden">
                <div className="px-4 py-2.5 bg-surface-850 border-b border-surface-800/60">
                    <p className="text-micro text-surface-400 font-semibold uppercase tracking-wider">
                        Live Processing Log
                    </p>
                </div>
                <div className="max-h-48 overflow-y-auto divide-y divide-surface-800/30">
                    {rows
                        .filter((r) => r.status === "success" || r.status === "failed")
                        .slice(-10)
                        .reverse()
                        .map((row, i) => {
                            const typeName = credentialTypes.find(
                                (t) => t.id === row.credentialTypeId
                            )?.name || row.credentialTypeId;

                            return (
                                <motion.div
                                    key={`${row.recipientAddress}-${i}`}
                                    initial={{ opacity: 0, x: -8 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="px-4 py-2 flex items-center gap-3"
                                >
                                    <div
                                        className={cn(
                                            "w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0",
                                            row.status === "success"
                                                ? "bg-neon-500/15"
                                                : "bg-crimson-500/15"
                                        )}
                                    >
                                        {row.status === "success" ? (
                                            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="text-neon-400">
                                                <path d="M2 5L4 7L8 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        ) : (
                                            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="text-crimson-400">
                                                <path d="M3 3L7 7M7 3L3 7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                                            </svg>
                                        )}
                                    </div>
                                    <span className="text-micro text-surface-300 truncate flex-1">
                                        {typeName}
                                    </span>
                                    <span className="text-micro text-surface-500 font-mono">
                                        {row.recipientAddress.slice(0, 8)}...
                                    </span>
                                    {row.credentialId && (
                                        <span className="text-micro text-neon-400 font-mono">
                                            {row.credentialId}
                                        </span>
                                    )}
                                </motion.div>
                            );
                        })}
                </div>
            </div>

            {/* Processing indicator */}
            <div className="flex items-center justify-center gap-3 py-4">
                <svg className="w-5 h-5 text-gold-400 animate-spin" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="2" strokeDasharray="28" strokeDashoffset="8" strokeLinecap="round" />
                </svg>
                <span className="text-b3 text-gold-400 font-medium">
                    Processing batch — do not close this page
                </span>
            </div>
        </div>
    );
}
