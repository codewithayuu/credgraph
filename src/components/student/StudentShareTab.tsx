"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useStudent } from "@/hooks/useStudent";
import { useCredentialStore } from "@/store/credentialStore";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";

export function StudentShareTab() {
    const { address } = useStudent();
    const { credentials } = useCredentialStore();

    const myCredentials = useMemo(() => {
        return credentials.filter(c => c.recipientAddress === address && c.status === "active");
    }, [credentials, address]);

    const [selectedIds, setSelectedIds] = useState<Set<string>>(
        new Set(myCredentials.map(c => c.id))
    );

    const [generatedLink, setGeneratedLink] = useState("");
    const [copied, setCopied] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);

    const toggleCredential = (id: string) => {
        setSelectedIds(prev => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });
        // Reset generated link when selection changes
        if (generatedLink) setGeneratedLink("");
    };

    const generateLink = () => {
        if (selectedIds.size === 0) {
            toast.error("Select at least one credential to share.");
            return;
        }

        setIsGenerating(true);

        // Fake generation delay for realism
        setTimeout(() => {
            // Mock hash generation based on selection
            const hash = Math.random().toString(36).substring(2, 10);
            setGeneratedLink(`https://credgraph.app/verify/p/${hash}`);
            setIsGenerating(false);
            toast.success("Profile link generated securely!");
        }, 600);
    };

    const handleCopy = async () => {
        if (!generatedLink) return;
        try {
            await navigator.clipboard.writeText(generatedLink);
            setCopied(true);
            toast.success("Copied to Clipboard!");
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            toast.error("Failed to copy link");
        }
    };

    return (
        <div className="space-y-6">
            <div className="mb-6">
                <h3 className="text-h2 font-semibold text-white">Share Your Profile</h3>
                <p className="text-b3 text-surface-400 mt-1">Select the credentials you want to disclose publicly. (Selective Disclosure)</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">

                {/* Left: Control Panel (Selective Disclosure) */}
                <div className="flex-1 space-y-5">
                    <div className="panel rounded-3xl border border-surface-800 p-6 shadow-card">
                        <h4 className="text-h3 font-semibold text-white mb-4">Select Credentials</h4>

                        <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                            {myCredentials.length === 0 ? (
                                <p className="text-surface-500 py-4 text-center">No active credentials to share.</p>
                            ) : (
                                myCredentials.map((cred) => {
                                    const isSelected = selectedIds.has(cred.id);
                                    return (
                                        <button
                                            key={cred.id}
                                            onClick={() => toggleCredential(cred.id)}
                                            className={cn(
                                                "w-full flex items-center gap-4 p-4 rounded-2xl border text-left transition-all",
                                                isSelected
                                                    ? "bg-surface-800/60 border-gold-500/30"
                                                    : "bg-surface-900 border-surface-800 opacity-60 hover:opacity-100 hover:border-surface-700"
                                            )}
                                        >
                                            {/* Checkbox / Toggle */}
                                            <div className={cn(
                                                "shrink-0 w-6 h-6 rounded-md border flex items-center justify-center transition-colors",
                                                isSelected
                                                    ? "bg-gold-500 text-void border-gold-500"
                                                    : "bg-surface-800 border-surface-600"
                                            )}>
                                                {isSelected && (
                                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                                        <path d="M11.6666 3.5L5.24992 9.91667L2.33325 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                )}
                                            </div>

                                            <div className="flex-1 min-w-0">
                                                <p className={cn(
                                                    "text-b2 font-semibold truncate",
                                                    isSelected ? "text-white" : "text-surface-300"
                                                )}>
                                                    {cred.credentialTypeName}
                                                </p>
                                                <p className="text-micro text-surface-500 truncate mt-0.5">
                                                    Issued by {cred.issuerName}
                                                </p>
                                            </div>

                                            <div className="shrink-0 text-micro font-mono text-surface-600 hidden sm:block">
                                                {cred.id.split('-')[1]}
                                            </div>
                                        </button>
                                    );
                                })
                            )}
                        </div>

                        <div className="mt-8 pt-6 border-t border-surface-800/60">
                            <button
                                onClick={generateLink}
                                disabled={selectedIds.size === 0 || isGenerating}
                                className={cn(
                                    "w-full py-4 rounded-xl text-b2 font-bold transition-all flex items-center justify-center gap-2",
                                    selectedIds.size > 0
                                        ? "bg-gradient-to-r from-electric-600 to-electric-500 text-void hover:shadow-glow-electric active:scale-[0.98]"
                                        : "bg-surface-800 text-surface-500 cursor-not-allowed",
                                    isGenerating && "opacity-80"
                                )}
                            >
                                {isGenerating ? (
                                    <>
                                        <span className="w-4 h-4 rounded-full border-2 border-void/30 border-t-void animate-spin" />
                                        Generating ZK Proof...
                                    </>
                                ) : (
                                    <>
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        Generate Public Profile Link
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right: Output Preview */}
                <div className="lg:w-80 shrink-0">
                    <AnimatePresence mode="wait">
                        {generatedLink ? (
                            <motion.div
                                key="generated"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.4, type: "spring" }}
                                className="panel rounded-3xl border border-surface-800 p-6 shadow-card flex flex-col items-center bg-gradient-to-b from-surface-900 to-void relative overflow-hidden text-center"
                            >
                                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gold-500/20 blur-3xl rounded-full pointer-events-none" />

                                <h4 className="text-h3 font-display font-semibold text-white mb-6">Scan or Share</h4>

                                <div className="bg-white p-3 rounded-2xl shadow-glow-gold mb-6 relative group">
                                    <svg viewBox="0 0 100 100" className="w-40 h-40">
                                        <rect x="0" y="0" width="100" height="100" fill="#ffffff" />
                                        <rect x="10" y="10" width="20" height="20" fill="black" />
                                        <rect x="15" y="15" width="10" height="10" fill="black" />
                                        <rect x="70" y="10" width="20" height="20" fill="black" />
                                        <rect x="75" y="15" width="10" height="10" fill="black" />
                                        <rect x="10" y="70" width="20" height="20" fill="black" />
                                        <rect x="15" y="75" width="10" height="10" fill="black" />
                                        {[45, 50, 55, 60, 35, 40, 65, 30, 70].map((v, i) => (
                                            <React.Fragment key={i}>
                                                <rect x={v} y={20 + (i % 3) * 10} width="6" height="6" fill="black" />
                                                <rect x={20 + (i % 3) * 10} y={v} width="6" height="6" fill="black" />
                                                <rect x={40 + (i % 2) * 15} y={40 + (i % 3) * 5} width="8" height="8" fill="black" />
                                            </React.Fragment>
                                        ))}
                                        <rect x="42" y="42" width="16" height="16" fill="white" />
                                        <circle cx="50" cy="50" r="5" fill="#facc15" />
                                    </svg>

                                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm rounded-2xl opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer" onClick={handleCopy}>
                                        <p className="text-micro font-bold text-white uppercase tracking-wider">Copy Link</p>
                                    </div>
                                </div>

                                <div className="w-full relative mt-auto">
                                    <div className="flex items-center gap-0 bg-surface-900 border border-surface-700/60 rounded-xl overflow-hidden group hover:border-surface-600 transition-colors">
                                        <input
                                            type="text"
                                            readOnly
                                            value={generatedLink}
                                            className="flex-1 w-full bg-transparent text-micro text-surface-300 pl-3 pr-2 py-3 outline-none truncate selection:bg-gold-500/30"
                                            onClick={(e) => e.currentTarget.select()}
                                        />
                                        <button
                                            onClick={handleCopy}
                                            className="shrink-0 p-3 bg-surface-800 text-gold-400 hover:text-gold-300 hover:bg-surface-700 transition-colors"
                                            aria-label="Copy to clipboard"
                                        >
                                            {copied ? (
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                                    <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            ) : (
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                                    <path d="M8 4V16C8 17.1046 8.89543 18 10 18H20C21.1046 18 22 17.1046 22 16V4C22 2.89543 21.1046 2 20 2H10C8.89543 2 8 2.89543 8 4Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                                                    <path d="M16 22H4C2.89543 22 2 21.1046 2 20V8C2 6.89543 2.89543 6 4 6" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                                                </svg>
                                            )}
                                        </button>
                                    </div>
                                </div>

                            </motion.div>
                        ) : (
                            <motion.div
                                key="empty"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="h-full min-h-[300px] panel rounded-3xl border border-surface-800/50 p-6 flex flex-col items-center justify-center text-center opacity-60"
                            >
                                <div className="w-16 h-16 rounded-full bg-surface-800 flex items-center justify-center text-surface-500 mb-4">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <p className="text-b2 text-surface-400">Generate a link to see your shareable profile card.</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

            </div>
        </div>
    );
}
