"use client";

import React from "react";
import { motion } from "framer-motion";
import { useGovernance } from "@/hooks/useGovernance";
import { GovernanceAction } from "@/lib/types";
import { cn, truncateAddress, getExplorerUrl } from "@/lib/utils";

const ACTION_CONFIG: Record<string, { icon: React.ReactNode; color: string; bg: string; label: string }> = {
    application_submitted: {
        icon: (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="2.5" y="2.5" width="9" height="9" rx="2" stroke="currentColor" strokeWidth="1.2" /><path d="M5 7H9M7 5V9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" /></svg>
        ),
        color: "text-gold-400",
        bg: "bg-gold-500/10 border-gold-500/20",
        label: "Application Submitted",
    },
    application_reviewed: {
        icon: (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.2" /><path d="M7 4.5V7L8.5 8.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        ),
        color: "text-azure-400",
        bg: "bg-azure-500/10 border-azure-500/20",
        label: "Application Reviewed",
    },
    issuer_approved: {
        icon: (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7L5.5 9.5L11 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        ),
        color: "text-neon-400",
        bg: "bg-neon-500/10 border-neon-500/20",
        label: "Issuer Approved",
    },
    issuer_rejected: {
        icon: (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M4 4L10 10M10 4L4 10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>
        ),
        color: "text-crimson-400",
        bg: "bg-crimson-500/10 border-crimson-500/20",
        label: "Application Rejected",
    },
    issuer_suspended: {
        icon: (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.2" /><path d="M5 5.5H9M5 8.5H9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" /></svg>
        ),
        color: "text-crimson-400",
        bg: "bg-crimson-500/10 border-crimson-500/20",
        label: "Issuer Suspended",
    },
    issuer_reinstated: {
        icon: (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7L5.5 9.5L11 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        ),
        color: "text-neon-400",
        bg: "bg-neon-500/10 border-neon-500/20",
        label: "Issuer Reinstated",
    },
    issuer_revoked: {
        icon: (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M4 4L10 10M10 4L4 10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>
        ),
        color: "text-crimson-400",
        bg: "bg-crimson-500/10 border-crimson-500/20",
        label: "Issuer Revoked",
    },
};

export function GovernanceTimeline() {
    const { recentActions } = useGovernance();

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-h2 font-semibold text-white">Audit Trail</h3>
                <p className="text-b3 text-surface-400 mt-1">
                    Public log of all governance actions — fully transparent
                </p>
            </div>

            {recentActions.length === 0 ? (
                <div className="rounded-xl bg-surface-900/40 border border-surface-800 p-12 text-center">
                    <p className="text-b2 text-surface-400">No governance actions recorded yet</p>
                </div>
            ) : (
                <div className="relative">
                    {/* Timeline line */}
                    <div className="absolute left-[19px] top-0 bottom-0 w-px bg-surface-800" />

                    <div className="space-y-1">
                        {recentActions.map((action, i) => (
                            <TimelineItem key={action.id} action={action} index={i} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

function TimelineItem({ action, index }: { action: GovernanceAction; index: number }) {
    const [mounted, setMounted] = React.useState(false);
    React.useEffect(() => setMounted(true), []);

    const config = ACTION_CONFIG[action.type] || ACTION_CONFIG.application_submitted;
    const timestamp = new Date(action.timestamp * 1000);
    const dateStr = mounted ? timestamp.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "";
    const timeStr = mounted ? timestamp.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }) : "";

    return (
        <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: index * 0.04 }}
            className="relative flex items-start gap-4 pl-0 py-3"
        >
            {/* Timeline dot */}
            <div className={cn("w-[38px] h-[38px] rounded-xl flex items-center justify-center flex-shrink-0 border relative z-10", config.bg, config.color)}>
                {config.icon}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0 pt-1">
                <div className="flex items-center gap-2 flex-wrap">
                    <span className={cn("text-b3 font-semibold", config.color)}>
                        {config.label}
                    </span>
                    <span className="text-micro text-surface-500">{dateStr} · {timeStr}</span>
                </div>

                <p className="text-b3 text-surface-300 mt-0.5">
                    <span className="text-white font-medium">{action.targetName}</span>
                </p>

                {action.reason && (
                    <p className="text-micro text-surface-400 mt-1">{action.reason}</p>
                )}

                <div className="flex items-center gap-3 mt-2 flex-wrap">
                    <span className="text-micro text-surface-500">
                        By: <span className="text-electric-400 font-mono">{truncateAddress(action.performedBy, 6)}</span>
                    </span>
                    {action.txId && (
                        <a
                            href={getExplorerUrl("transaction", action.txId)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-micro text-violet-400 hover:text-violet-300 font-mono flex items-center gap-1 transition-colors"
                        >
                            {truncateAddress(action.txId, 6)}
                            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                                <path d="M3.5 1.5H1.5V8.5H8.5V6.5M5.5 1.5H8.5V4.5M8.5 1.5L4.5 5.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </a>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
