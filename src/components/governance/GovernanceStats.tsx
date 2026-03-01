"use client";

import React from "react";
import { GovernanceStats as GovernanceStatsType } from "@/lib/types";
import { cn } from "@/lib/utils";

interface GovernanceStatsProps {
    stats: GovernanceStatsType;
}

export function GovernanceStats({ stats }: GovernanceStatsProps) {
    const items = [
        {
            label: "Active Issuers",
            value: stats.activeIssuers,
            color: "text-neon-400",
            bg: "bg-neon-500/5",
            border: "border-neon-500/15",
        },
        {
            label: "Pending Applications",
            value: stats.pendingApplications,
            color: "text-gold-400",
            bg: "bg-gold-500/5",
            border: "border-gold-500/15",
        },
        {
            label: "Suspended",
            value: stats.suspendedIssuers,
            color: "text-crimson-400",
            bg: "bg-crimson-500/5",
            border: "border-crimson-500/15",
        },
        {
            label: "Governance Actions",
            value: stats.totalActions,
            color: "text-electric-400",
            bg: "bg-electric-500/5",
            border: "border-electric-500/15",
        },
    ];

    return (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {items.map((item) => (
                <div
                    key={item.label}
                    className={cn(
                        "rounded-xl p-4 border",
                        item.bg,
                        item.border
                    )}
                >
                    <p className={cn("text-h1 font-bold font-display", item.color)}>
                        {item.value}
                    </p>
                    <p className="text-micro text-surface-400 mt-1">{item.label}</p>
                </div>
            ))}
        </div>
    );
}
