"use client";

import React from "react";
import { motion } from "framer-motion";
import { useStudent } from "@/hooks/useStudent";
import { Credential } from "@/lib/types";
import { cn, formatTimestamp, getExpiryLabel, getExpiryStatus, getExpiryColor } from "@/lib/utils";
import { CREDENTIAL_CATEGORIES } from "@/lib/constants";

export function ExpiryAlerts() {
    const { expiring, expired } = useStudent();

    if (expiring.length === 0 && expired.length === 0) return null;

    return (
        <div className="space-y-4">
            {/* Expiring soon */}
            {expiring.length > 0 && (
                <div className="space-y-3">
                    <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-gold-500/10 border border-gold-500/20 flex items-center justify-center">
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-gold-400">
                                <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.2" />
                                <path d="M7 4V7L9 8.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <h4 className="text-b3 font-semibold text-gold-400">
                            Expiring Soon ({expiring.length})
                        </h4>
                    </div>

                    {expiring.map((cred, i) => (
                        <ExpiryAlertCard key={cred.id} credential={cred} index={i} type="expiring" />
                    ))}
                </div>
            )}

            {/* Already expired */}
            {expired.length > 0 && (
                <div className="space-y-3">
                    <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-crimson-500/10 border border-crimson-500/20 flex items-center justify-center">
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-crimson-400">
                                <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.2" />
                                <path d="M7 4V7L9 8.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M3.5 10.5L10.5 3.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                            </svg>
                        </div>
                        <h4 className="text-b3 font-semibold text-crimson-400">
                            Expired ({expired.length})
                        </h4>
                    </div>

                    {expired.map((cred, i) => (
                        <ExpiryAlertCard key={cred.id} credential={cred} index={i} type="expired" />
                    ))}
                </div>
            )}
        </div>
    );
}

function ExpiryAlertCard({
    credential,
    index,
    type,
}: {
    credential: Credential;
    index: number;
    type: "expiring" | "expired";
}) {
    const [mounted, setMounted] = React.useState(false);
    React.useEffect(() => setMounted(true), []);

    const catInfo = CREDENTIAL_CATEGORIES[credential.category];
    const expiryStatus = getExpiryStatus(credential.expiresAt);
    const expiryLabel = mounted ? getExpiryLabel(credential.expiresAt) : "";
    const expiryColorClass = getExpiryColor(expiryStatus);

    return (
        <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className={cn(
                "rounded-xl p-3.5 border flex items-center gap-3",
                type === "expired"
                    ? "bg-crimson-500/3 border-crimson-500/15"
                    : "bg-gold-500/3 border-gold-500/15"
            )}
        >
            <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0", catInfo?.iconBg || "bg-surface-800", "border", catInfo?.border || "border-surface-700")}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={catInfo?.color || "text-surface-400"}>
                    <rect x="2.5" y="2.5" width="11" height="11" rx="2.5" stroke="currentColor" strokeWidth="1.2" />
                    <path d="M5.5 8L7 9.5L10.5 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>

            <div className="flex-1 min-w-0">
                <p className="text-b3 text-white font-medium truncate">{credential.credentialTypeName}</p>
                <p className="text-micro text-surface-400 truncate">{credential.issuerName}</p>
            </div>

            <span className={cn("text-micro font-medium flex-shrink-0", expiryColorClass)}>
                {expiryLabel}
            </span>
        </motion.div>
    );
}
