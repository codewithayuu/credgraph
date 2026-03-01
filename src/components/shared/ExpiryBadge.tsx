"use client";

import React from "react";
import { cn, getExpiryStatus, getExpiryLabel, getExpiryColor } from "@/lib/utils";
import { ExpiryStatus } from "@/lib/types";

interface ExpiryBadgeProps {
    expiresAt?: number;
    className?: string;
    showIcon?: boolean;
    size?: "sm" | "md";
}

export function ExpiryBadge({
    expiresAt,
    className,
    showIcon = true,
    size = "sm",
}: ExpiryBadgeProps) {
    const status = getExpiryStatus(expiresAt);
    const label = getExpiryLabel(expiresAt);
    const color = getExpiryColor(status);

    if (status === "never_expires") {
        return null; // Don't render if never expires
    }

    const bgMap: Record<ExpiryStatus, string> = {
        expired: "bg-crimson-500/8 border-crimson-500/15",
        expiring_soon: "bg-gold-500/8 border-gold-500/15",
        active: "bg-neon-500/8 border-neon-500/15",
        never_expires: "",
    };

    const iconMap: Record<ExpiryStatus, React.ReactNode> = {
        expired: (
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-crimson-400">
                <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.2" />
                <path d="M6 3.5V6L7.5 7.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M3.5 9.5L8.5 2.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
            </svg>
        ),
        expiring_soon: (
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-gold-400">
                <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.2" />
                <path d="M6 3.5V6L7.5 7.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
        active: (
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-neon-400">
                <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.2" />
                <path d="M6 3.5V6L7.5 7.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
        never_expires: null,
    };

    return (
        <span
            className={cn(
                "inline-flex items-center gap-1 rounded-full border",
                bgMap[status],
                color,
                size === "sm" ? "text-micro px-2 py-0.5" : "text-cap px-2.5 py-1",
                "font-medium",
                className
            )}
        >
            {showIcon && iconMap[status]}
            {label}
        </span>
    );
}
