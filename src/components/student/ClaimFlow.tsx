"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useClaim } from "@/hooks/useClaim";
import { useWallet } from "@/hooks/useWallet";
import { ClaimableCredential } from "@/lib/types";
import {
    cn,
    truncateAddress,
    formatTimestamp,
    formatTimestampRelative,
    getCategoryStyle,
} from "@/lib/utils";
import { CREDENTIAL_CATEGORIES, CREDENTIAL_TIERS, CLAIM_CONFIG } from "@/lib/constants";
import toast from "react-hot-toast";

// ─── Claim Step Indicator ────────────────────

function ClaimStepIndicator({
    step,
}: {
    step: "idle" | "checking" | "opt_in" | "claiming" | "confirmed" | "failed";
}) {
    const steps = [
        { id: "checking", label: "Checking Status" },
        { id: "opt_in", label: "Opt-In" },
        { id: "claiming", label: "Claiming" },
        { id: "confirmed", label: "Confirmed" },
    ];

    const currentIndex = steps.findIndex((s) => s.id === step);

    if (step === "idle" || step === "failed") return null;

    return (
        <div className="flex items-center gap-2 py-4">
            {steps.map((s, i) => {
                const isActive = i === currentIndex;
                const isComplete = i < currentIndex;
                return (
                    <React.Fragment key={s.id}>
                        <div className="flex items-center gap-2">
                            <div
                                className={cn(
                                    "w-7 h-7 rounded-full flex items-center justify-center text-micro font-bold transition-all duration-300",
                                    isComplete && "bg-neon-500/20 text-neon-400 ring-1 ring-neon-500/30",
                                    isActive && "bg-gold-500/20 text-gold-400 ring-1 ring-gold-500/30 animate-pulse",
                                    !isComplete && !isActive && "bg-surface-800 text-surface-500 ring-1 ring-surface-700/50"
                                )}
                            >
                                {isComplete ? (
                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                        <path d="M2.5 6L5 8.5L9.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                ) : (
                                    i + 1
                                )}
                            </div>
                            <span
                                className={cn(
                                    "text-micro hidden sm:block",
                                    isActive ? "text-gold-400" : isComplete ? "text-neon-400" : "text-surface-500"
                                )}
                            >
                                {s.label}
                            </span>
                        </div>
                        {i < steps.length - 1 && (
                            <div
                                className={cn(
                                    "flex-1 h-px max-w-[40px]",
                                    i < currentIndex ? "bg-neon-500/40" : "bg-surface-700/50"
                                )}
                            />
                        )}
                    </React.Fragment>
                );
            })}
        </div>
    );
}

// ─── Single Claimable Card ───────────────────

function ClaimableCard({
    item,
    onClaim,
    isClaiming,
    claimStep,
}: {
    item: ClaimableCredential;
    onClaim: (id: string) => void;
    isClaiming: boolean;
    claimStep: string;
}) {
    const [expanded, setExpanded] = useState(false);
    const catStyle = getCategoryStyle(item.credential.category);
    const catInfo = CREDENTIAL_CATEGORIES[item.credential.category];
    const tierInfo = CREDENTIAL_TIERS[item.credential.tier];

    const escrowExpiry = item.credential.issuedAt + CLAIM_CONFIG.escrowExpiryDuration;
    const now = Math.floor(Date.now() / 1000);
    const daysLeft = Math.max(0, Math.floor((escrowExpiry - now) / 86400));

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            className={cn(
                "rounded-xl border transition-all duration-300 overflow-hidden",
                "bg-surface-900/60 backdrop-blur-sm",
                isClaiming
                    ? "border-gold-500/30 shadow-glow-gold"
                    : "border-surface-800 hover:border-surface-700"
            )}
        >
            {/* Header */}
            <div
                className="flex items-center gap-4 p-4 cursor-pointer"
                onClick={() => !isClaiming && setExpanded(!expanded)}
            >
                {/* Category icon */}
                <div
                    className={cn(
                        "w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0",
                        catStyle.bg,
                        "border",
                        catStyle.border
                    )}
                >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className={catStyle.text}>
                        <rect x="3" y="3" width="14" height="14" rx="3" stroke="currentColor" strokeWidth="1.4" />
                        <path d="M7 10L9 12L13 8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>

                <div className="flex-1 min-w-0">
                    <h3 className="text-b3 font-semibold text-white truncate">
                        {item.credential.credentialTypeName}
                    </h3>
                    <p className="text-micro text-surface-400 truncate">
                        From {item.issuerInfo.name}
                    </p>
                </div>

                {/* Status badges */}
                <div className="flex items-center gap-2 flex-shrink-0">
                    <span className={cn(
                        "text-micro px-2 py-0.5 rounded-full border",
                        catInfo?.bg || "bg-surface-800",
                        catInfo?.border || "border-surface-700",
                        catInfo?.color || "text-surface-400"
                    )}>
                        {catInfo?.label || item.credential.category}
                    </span>
                    <span className={cn(
                        "text-micro px-2 py-0.5 rounded-full",
                        "bg-gold-500/10 border border-gold-500/20 text-gold-400"
                    )}>
                        Claimable
                    </span>
                </div>

                {/* Expand arrow */}
                <motion.div
                    animate={{ rotate: expanded ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-surface-500"
                >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </motion.div>
            </div>

            {/* Expanded content */}
            <AnimatePresence>
                {expanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                    >
                        <div className="px-4 pb-4 space-y-4 border-t border-surface-800/60 pt-4">
                            {/* Info grid */}
                            <div className="grid grid-cols-2 gap-3">
                                <div className="p-3 rounded-lg bg-surface-850 border border-surface-800/50">
                                    <p className="text-micro text-surface-500 mb-1">Issued</p>
                                    <p className="text-b3 text-white font-medium">
                                        {formatTimestamp(item.credential.issuedAt)}
                                    </p>
                                </div>
                                <div className="p-3 rounded-lg bg-surface-850 border border-surface-800/50">
                                    <p className="text-micro text-surface-500 mb-1">Claim Expires In</p>
                                    <p className={cn(
                                        "text-b3 font-medium",
                                        daysLeft <= 7 ? "text-crimson-400" : daysLeft <= 14 ? "text-gold-400" : "text-neon-400"
                                    )}>
                                        {daysLeft} days
                                    </p>
                                </div>
                                <div className="p-3 rounded-lg bg-surface-850 border border-surface-800/50">
                                    <p className="text-micro text-surface-500 mb-1">Tier</p>
                                    <p className={cn("text-b3 font-medium", tierInfo?.color || "text-surface-300")}>
                                        {tierInfo?.label || item.credential.tier}
                                    </p>
                                </div>
                                <div className="p-3 rounded-lg bg-surface-850 border border-surface-800/50">
                                    <p className="text-micro text-surface-500 mb-1">Est. Gas Cost</p>
                                    <p className="text-b3 text-electric-400 font-medium font-mono">
                                        {item.estimatedGasCost} ALGO
                                    </p>
                                </div>
                            </div>

                            {/* Opt-in requirement notice */}
                            {item.requiresOptIn && (
                                <div className="flex items-start gap-3 p-3 rounded-lg bg-gold-500/5 border border-gold-500/15">
                                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="text-gold-400 flex-shrink-0 mt-0.5">
                                        <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.3" />
                                        <path d="M9 6V9.5M9 12V12.01" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                                    </svg>
                                    <div>
                                        <p className="text-b3 text-gold-400 font-medium">ASA Opt-In Required</p>
                                        <p className="text-micro text-surface-400 mt-0.5">
                                            Your wallet needs to opt into this credential asset before claiming. This will be handled automatically.
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Claim step indicator (shows during claim) */}
                            {isClaiming && (
                                <ClaimStepIndicator step={claimStep as any} />
                            )}

                            {/* Claim button */}
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onClaim(item.credential.id);
                                }}
                                disabled={isClaiming}
                                className={cn(
                                    "w-full py-3 px-4 rounded-xl text-b3 font-semibold transition-all duration-300",
                                    "flex items-center justify-center gap-2",
                                    isClaiming
                                        ? "bg-gold-500/10 text-gold-400 border border-gold-500/20 cursor-wait"
                                        : "bg-gradient-to-r from-gold-600 to-gold-500 text-void hover:shadow-glow-gold active:scale-[0.98]"
                                )}
                            >
                                {isClaiming ? (
                                    <>
                                        <svg className="w-4 h-4 animate-spin" viewBox="0 0 16 16" fill="none">
                                            <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="2" strokeDasharray="28" strokeDashoffset="8" strokeLinecap="round" />
                                        </svg>
                                        Claiming...
                                    </>
                                ) : (
                                    <>
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                            <path d="M8 2V14M2 8H14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                                        </svg>
                                        Claim Credential
                                    </>
                                )}
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

// ─── Main ClaimFlow Component ────────────────

export function ClaimFlow() {
    const { claimableCredentials, claimableCount, claimState, claimCredential, resetClaimState } = useClaim();

    if (claimableCount === 0) {
        return null; // Don't render if nothing to claim
    }

    return (
        <div className="space-y-4">
            {/* Section header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gold-500/10 border border-gold-500/20 flex items-center justify-center">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-gold-400">
                            <path d="M8 1L14 4.5V11.5L8 15L2 11.5V4.5L8 1Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
                            <path d="M8 5V8.5L10.5 10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <div>
                        <h3 className="text-h3 font-semibold text-white">
                            Pending Claims
                        </h3>
                        <p className="text-micro text-surface-400">
                            {claimableCount} credential{claimableCount !== 1 ? "s" : ""} waiting to be claimed
                        </p>
                    </div>
                </div>

                <span className="text-micro px-2.5 py-1 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-400 font-semibold">
                    {claimableCount}
                </span>
            </div>

            {/* Claimable cards */}
            <div className="space-y-3">
                <AnimatePresence mode="popLayout">
                    {claimableCredentials.map((item) => (
                        <ClaimableCard
                            key={item.credential.id}
                            item={item}
                            onClaim={claimCredential}
                            isClaiming={
                                claimState.claiming && claimState.claimingId === item.credential.id
                            }
                            claimStep={
                                claimState.claimingId === item.credential.id
                                    ? claimState.step
                                    : "idle"
                            }
                        />
                    ))}
                </AnimatePresence>
            </div>

            {/* Success toast area */}
            <AnimatePresence>
                {claimState.step === "confirmed" && (
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        className="p-4 rounded-xl bg-neon-500/8 border border-neon-500/20 flex items-center gap-3"
                    >
                        <div className="w-8 h-8 rounded-full bg-neon-500/15 flex items-center justify-center flex-shrink-0">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-neon-400">
                                <path d="M3 8L6.5 11.5L13 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <div className="flex-1">
                            <p className="text-b3 text-neon-400 font-medium">Credential Claimed</p>
                            <p className="text-micro text-surface-400">
                                The credential has been transferred to your wallet and is now active.
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
