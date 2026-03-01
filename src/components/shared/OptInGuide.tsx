"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { CLAIM_CONFIG } from "@/lib/constants";

interface OptInGuideProps {
    assetName: string;
    asaId: number;
    estimatedCost?: number;
    onProceed: () => void;
    onCancel: () => void;
    loading?: boolean;
}

export function OptInGuide({
    assetName,
    asaId,
    estimatedCost,
    onProceed,
    onCancel,
    loading = false,
}: OptInGuideProps) {
    const cost = estimatedCost || CLAIM_CONFIG.estimatedOptInCost;

    const steps = [
        {
            title: "What is ASA Opt-In?",
            description:
                "Algorand requires your wallet to explicitly opt into receiving new assets. This is a security feature that prevents unwanted tokens.",
        },
        {
            title: "Transaction Details",
            description: `You will sign a 0-amount transaction to yourself for ASA ${asaId}. This registers your wallet to receive "${assetName}".`,
        },
        {
            title: "Cost",
            description: `The opt-in costs approximately ${cost} ALGO (standard transaction fee). The credential claim after opt-in costs approximately ${CLAIM_CONFIG.estimatedClaimCost} ALGO.`,
        },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            className="rounded-xl bg-surface-900/80 backdrop-blur-md border border-surface-800 p-6 space-y-5"
        >
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-electric-500/10 border border-electric-500/20 flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-electric-400">
                        <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.3" />
                        <path d="M10 7V10.5M10 13.5V13.51" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                </div>
                <div>
                    <h3 className="text-h3 font-semibold text-white">ASA Opt-In Required</h3>
                    <p className="text-micro text-surface-400">One-time setup for this credential type</p>
                </div>
            </div>

            <div className="space-y-3">
                {steps.map((step, i) => (
                    <div
                        key={i}
                        className="flex items-start gap-3 p-3 rounded-lg bg-surface-850 border border-surface-800/50"
                    >
                        <div className="w-6 h-6 rounded-full bg-electric-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-micro text-electric-400 font-bold">{i + 1}</span>
                        </div>
                        <div>
                            <p className="text-b3 text-white font-medium">{step.title}</p>
                            <p className="text-micro text-surface-400 mt-0.5">{step.description}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Cost summary */}
            <div className="p-3 rounded-lg bg-gold-500/5 border border-gold-500/15">
                <div className="flex items-center justify-between">
                    <span className="text-b3 text-surface-300">Estimated Total Cost</span>
                    <span className="text-b3 text-gold-400 font-mono font-semibold">
                        ~{(cost + CLAIM_CONFIG.estimatedClaimCost).toFixed(3)} ALGO
                    </span>
                </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-3">
                <button
                    onClick={onCancel}
                    disabled={loading}
                    className={cn(
                        "flex-1 py-2.5 px-4 rounded-xl text-b3 font-medium transition-all",
                        "bg-surface-800 text-surface-300 border border-surface-700 hover:bg-surface-700",
                        loading && "opacity-50 cursor-not-allowed"
                    )}
                >
                    Cancel
                </button>
                <button
                    onClick={onProceed}
                    disabled={loading}
                    className={cn(
                        "flex-1 py-2.5 px-4 rounded-xl text-b3 font-semibold transition-all",
                        "bg-gradient-to-r from-electric-600 to-electric-500 text-void",
                        "hover:shadow-glow-electric active:scale-[0.98]",
                        "flex items-center justify-center gap-2",
                        loading && "opacity-80 cursor-wait"
                    )}
                >
                    {loading ? (
                        <>
                            <svg className="w-4 h-4 animate-spin" viewBox="0 0 16 16" fill="none">
                                <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="2" strokeDasharray="28" strokeDashoffset="8" strokeLinecap="round" />
                            </svg>
                            Processing...
                        </>
                    ) : (
                        <>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M3 8L6.5 11.5L13 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            Proceed with Opt-In
                        </>
                    )}
                </button>
            </div>
        </motion.div>
    );
}
