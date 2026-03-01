"use client";

import React from "react";
import { motion } from "framer-motion";
import { useWallet } from "@/hooks/useWallet";
import { cn } from "@/lib/utils";

export function GovernanceConnectPrompt() {
    const { connect, isConnecting } = useWallet();

    return (
        <div className="min-h-[70vh] flex items-center justify-center px-4">
            <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-lg w-full text-center space-y-8"
            >
                <div className="w-20 h-20 rounded-2xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center mx-auto">
                    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" className="text-gold-400">
                        <path d="M18 4L6 10V26L18 32L30 26V10L18 4Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                        <path d="M18 14V22M14 18H22" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                    </svg>
                </div>

                <div>
                    <h2 className="text-d4 font-bold text-white font-display mb-3">
                        Connect to Participate
                    </h2>
                    <p className="text-b2 text-surface-400 max-w-md mx-auto">
                        Connect your wallet to apply as an issuer, review applications (admin), or view your application status.
                    </p>
                </div>

                <button
                    onClick={connect}
                    disabled={isConnecting}
                    className={cn(
                        "px-8 py-3.5 rounded-xl text-b2 font-semibold transition-all duration-300",
                        "bg-gradient-to-r from-gold-600 to-gold-500 text-void",
                        "hover:shadow-glow-gold active:scale-[0.98]",
                        "flex items-center justify-center gap-2 mx-auto",
                        isConnecting && "opacity-80 cursor-wait"
                    )}
                >
                    {isConnecting ? (
                        <>
                            <svg className="w-5 h-5 animate-spin" viewBox="0 0 16 16" fill="none">
                                <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="2" strokeDasharray="28" strokeDashoffset="8" strokeLinecap="round" />
                            </svg>
                            Connecting...
                        </>
                    ) : (
                        <>
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                                <rect x="2" y="5" width="14" height="10" rx="2.5" stroke="currentColor" strokeWidth="1.4" />
                                <path d="M5 5V4C5 2.34 6.34 1 8 1H10C11.66 1 13 2.34 13 4V5" stroke="currentColor" strokeWidth="1.4" />
                                <circle cx="9" cy="10.5" r="1.5" fill="currentColor" />
                            </svg>
                            Connect Wallet
                        </>
                    )}
                </button>
            </motion.div>
        </div>
    );
}
