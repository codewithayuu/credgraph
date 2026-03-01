"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn, copyToClipboard } from "@/lib/utils";
import { verifyEvidenceIntegrity } from "@/services/evidence";
import { formatFileSize } from "@/services/evidence";
import { getIPFSUrl } from "@/services/ipfs";
import toast from "react-hot-toast";

interface EvidenceViewerProps {
    evidenceHash?: string;
    evidenceUri?: string;
    compact?: boolean;
}

type VerifyState = "idle" | "selecting" | "verifying" | "match" | "mismatch";

export function EvidenceViewer({
    evidenceHash,
    evidenceUri,
    compact = false,
}: EvidenceViewerProps) {
    const [verifyState, setVerifyState] = useState<VerifyState>("idle");
    const [computedHash, setComputedHash] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    if (!evidenceHash) {
        return (
            <div className="p-3 rounded-lg bg-surface-850 border border-surface-800/50">
                <p className="text-micro text-surface-500 flex items-center gap-2">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-surface-500">
                        <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.2" />
                        <path d="M7 4.5V7.5M7 9.5V9.51" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                    </svg>
                    No evidence attached to this credential
                </p>
            </div>
        );
    }

    const handleCopyHash = async () => {
        await copyToClipboard(evidenceHash);
        setCopied(true);
        toast.success("Hash copied");
        setTimeout(() => setCopied(false), 2000);
    };

    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) {
            setVerifyState("idle");
            return;
        }

        setVerifyState("verifying");

        try {
            const result = await verifyEvidenceIntegrity(file, evidenceHash);
            setComputedHash(result.computedHash);

            if (result.match) {
                setVerifyState("match");
                toast.success("Evidence integrity verified — hashes match");
            } else {
                setVerifyState("mismatch");
                toast.error("Hash mismatch — evidence does not match");
            }
        } catch (err) {
            setVerifyState("idle");
            toast.error("Failed to verify evidence");
        }

        // Reset file input
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const ipfsUrl = evidenceUri ? getIPFSUrl(evidenceUri) : null;

    return (
        <div className="space-y-3">
            {/* Hidden file input for verification */}
            <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                onChange={handleFileSelect}
            />

            {/* Hash display */}
            <div className="p-3 rounded-lg bg-surface-850 border border-surface-800/50">
                <div className="flex items-center justify-between mb-1.5">
                    <p className="text-micro text-surface-500">Evidence Hash</p>
                    <button
                        onClick={handleCopyHash}
                        className="text-micro text-surface-500 hover:text-electric-400 transition-colors flex items-center gap-1"
                    >
                        {copied ? (
                            <>
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-neon-400">
                                    <path d="M2.5 6L5 8.5L9.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                Copied
                            </>
                        ) : (
                            <>
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                    <rect x="4" y="4" width="6.5" height="6.5" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
                                    <path d="M8 4V2.5C8 1.95 7.55 1.5 7 1.5H2.5C1.95 1.5 1.5 1.95 1.5 2.5V7C1.5 7.55 1.95 8 2.5 8H4" stroke="currentColor" strokeWidth="1.2" />
                                </svg>
                                Copy
                            </>
                        )}
                    </button>
                </div>
                <p className="text-micro text-electric-400 font-mono break-all leading-relaxed">
                    {evidenceHash}
                </p>
            </div>

            {/* IPFS link */}
            {ipfsUrl && (
                <div className="p-3 rounded-lg bg-surface-850 border border-surface-800/50">
                    <p className="text-micro text-surface-500 mb-1">IPFS Evidence</p>
                    <a
                        href={ipfsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-micro text-violet-400 hover:text-violet-300 font-mono break-all flex items-center gap-1.5 transition-colors"
                    >
                        {evidenceUri}
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="flex-shrink-0">
                            <path d="M4.5 2.5H2.5V9.5H9.5V7.5M7 2.5H9.5V5M9.5 2.5L5.5 6.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </a>
                </div>
            )}

            {/* Verify button / results */}
            <AnimatePresence mode="wait">
                {verifyState === "idle" && (
                    <motion.button
                        key="verify-btn"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => {
                            setVerifyState("selecting");
                            fileInputRef.current?.click();
                        }}
                        className={cn(
                            "w-full py-2.5 px-4 rounded-xl text-micro font-semibold transition-all",
                            "bg-surface-800 text-surface-300 border border-surface-700",
                            "hover:bg-surface-700 hover:border-surface-600",
                            "flex items-center justify-center gap-2"
                        )}
                    >
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.3" />
                            <path d="M5 7L6.5 8.5L9 5.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Verify Evidence Integrity
                    </motion.button>
                )}

                {verifyState === "selecting" && (
                    <motion.div
                        key="selecting"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="p-3 rounded-lg bg-gold-500/5 border border-gold-500/15 text-center"
                    >
                        <p className="text-micro text-gold-400">Select the original evidence file to verify...</p>
                    </motion.div>
                )}

                {verifyState === "verifying" && (
                    <motion.div
                        key="verifying"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="p-3 rounded-lg bg-surface-850 border border-gold-500/20 flex items-center gap-3"
                    >
                        <svg className="w-4 h-4 text-gold-400 animate-spin" viewBox="0 0 16 16" fill="none">
                            <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="2" strokeDasharray="28" strokeDashoffset="8" strokeLinecap="round" />
                        </svg>
                        <p className="text-micro text-gold-400">Computing hash and comparing...</p>
                    </motion.div>
                )}

                {verifyState === "match" && (
                    <motion.div
                        key="match"
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="space-y-2"
                    >
                        <div className="p-3 rounded-lg bg-neon-500/5 border border-neon-500/20 flex items-center gap-3">
                            <div className="w-7 h-7 rounded-full bg-neon-500/15 flex items-center justify-center flex-shrink-0">
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-neon-400">
                                    <path d="M2.5 7L5.5 10L11.5 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-b3 text-neon-400 font-medium">Integrity Verified</p>
                                <p className="text-micro text-surface-400">File hash matches the on-chain evidence hash</p>
                            </div>
                        </div>
                        <button
                            onClick={() => { setVerifyState("idle"); setComputedHash(null); }}
                            className="text-micro text-surface-500 hover:text-surface-300 transition-colors"
                        >
                            Verify another file
                        </button>
                    </motion.div>
                )}

                {verifyState === "mismatch" && (
                    <motion.div
                        key="mismatch"
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="space-y-2"
                    >
                        <div className="p-3 rounded-lg bg-crimson-500/5 border border-crimson-500/20">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-7 h-7 rounded-full bg-crimson-500/15 flex items-center justify-center flex-shrink-0">
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-crimson-400">
                                        <path d="M4 4L10 10M10 4L4 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-b3 text-crimson-400 font-medium">Hash Mismatch</p>
                                    <p className="text-micro text-surface-400">The file does not match the stored evidence</p>
                                </div>
                            </div>
                            {computedHash && (
                                <div className="mt-2 p-2 rounded bg-surface-900/80">
                                    <p className="text-micro text-surface-500">Computed hash:</p>
                                    <p className="text-micro text-crimson-400 font-mono break-all">{computedHash}</p>
                                    <p className="text-micro text-surface-500 mt-1.5">Expected hash:</p>
                                    <p className="text-micro text-neon-400 font-mono break-all">{evidenceHash}</p>
                                </div>
                            )}
                        </div>
                        <button
                            onClick={() => { setVerifyState("idle"); setComputedHash(null); }}
                            className="text-micro text-surface-500 hover:text-surface-300 transition-colors"
                        >
                            Try another file
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
