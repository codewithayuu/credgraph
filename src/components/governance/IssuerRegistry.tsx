"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCredentialStore } from "@/store/credentialStore";
import { useGovernance } from "@/hooks/useGovernance";
import { Issuer } from "@/lib/types";
import {
    cn,
    truncateAddress,
    formatTimestampShort,
    getCredibilityColor,
    getCredibilityLabel,
} from "@/lib/utils";
import { ISSUER_TYPE_LABELS } from "@/lib/constants";

export function IssuerRegistry() {
    const { issuers } = useCredentialStore();
    const { isAdmin, suspendIssuerAction, reinstateIssuerAction } = useGovernance();
    const [expandedAddress, setExpandedAddress] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [suspendModal, setSuspendModal] = useState<{ address: string; name: string } | null>(null);
    const [suspendReason, setSuspendReason] = useState("");

    const filtered = issuers.filter(
        (issuer) =>
            issuer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            issuer.address.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSuspend = async () => {
        if (!suspendModal || !suspendReason.trim()) return;
        await suspendIssuerAction(suspendModal.address, suspendReason);
        setSuspendModal(null);
        setSuspendReason("");
    };

    const handleReinstate = async (address: string) => {
        await reinstateIssuerAction(address, "Reinstated by governance admin");
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                    <h3 className="text-h2 font-semibold text-white">Registered Issuers</h3>
                    <p className="text-b3 text-surface-400 mt-1">
                        {filtered.length} institution{filtered.length !== 1 ? "s" : ""} registered on CredGraph
                    </p>
                </div>

                {/* Search */}
                <div className="relative w-full sm:w-72">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-500">
                        <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.3" />
                        <path d="M11 11L14 14" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                    </svg>
                    <input
                        type="text"
                        placeholder="Search issuers..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className={cn(
                            "w-full pl-9 pr-4 py-2.5 rounded-xl text-b3",
                            "bg-surface-900/60 border border-surface-800 text-white",
                            "placeholder:text-surface-500 focus:outline-none focus:border-gold-500/30 focus:shadow-focus-gold",
                            "transition-all duration-200"
                        )}
                    />
                </div>
            </div>

            {/* Issuer list */}
            <div className="space-y-3">
                {filtered.length === 0 ? (
                    <div className="rounded-xl bg-surface-900/40 border border-surface-800 p-12 text-center">
                        <p className="text-b2 text-surface-400">No issuers found</p>
                    </div>
                ) : (
                    filtered.map((issuer, i) => (
                        <IssuerCard
                            key={issuer.address}
                            issuer={issuer}
                            index={i}
                            isExpanded={expandedAddress === issuer.address}
                            onToggle={() =>
                                setExpandedAddress(
                                    expandedAddress === issuer.address ? null : issuer.address
                                )
                            }
                            isAdmin={isAdmin}
                            onSuspend={() => setSuspendModal({ address: issuer.address, name: issuer.name })}
                            onReinstate={() => handleReinstate(issuer.address)}
                        />
                    ))
                )}
            </div>

            {/* Suspend confirmation modal */}
            <AnimatePresence>
                {suspendModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-void/80 backdrop-blur-sm"
                        onClick={() => setSuspendModal(null)}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 12 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 12 }}
                            className="w-full max-w-md rounded-xl bg-surface-900 border border-surface-800 p-6 space-y-4"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-crimson-500/10 border border-crimson-500/20 flex items-center justify-center">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-crimson-400">
                                        <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.4" />
                                        <path d="M10 6V10.5M10 13.5V13.51" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-h3 font-semibold text-white">Suspend Issuer</h3>
                                    <p className="text-micro text-surface-400">
                                        {suspendModal.name}
                                    </p>
                                </div>
                            </div>

                            <div className="p-3 rounded-lg bg-crimson-500/5 border border-crimson-500/15">
                                <p className="text-micro text-crimson-400">
                                    Suspending an issuer will prevent them from issuing new credentials. Existing credentials remain valid but will show a warning.
                                </p>
                            </div>

                            <div>
                                <label className="text-micro text-surface-400 block mb-1.5">Reason for suspension</label>
                                <textarea
                                    value={suspendReason}
                                    onChange={(e) => setSuspendReason(e.target.value)}
                                    placeholder="Provide a reason for the suspension..."
                                    rows={3}
                                    className={cn(
                                        "w-full px-3 py-2.5 rounded-xl text-b3",
                                        "bg-surface-850 border border-surface-800 text-white resize-none",
                                        "placeholder:text-surface-500 focus:outline-none focus:border-crimson-500/30",
                                        "transition-all duration-200"
                                    )}
                                />
                            </div>

                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => setSuspendModal(null)}
                                    className="flex-1 py-2.5 px-4 rounded-xl text-b3 font-medium bg-surface-800 text-surface-300 border border-surface-700 hover:bg-surface-700 transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSuspend}
                                    disabled={!suspendReason.trim()}
                                    className={cn(
                                        "flex-1 py-2.5 px-4 rounded-xl text-b3 font-semibold transition-all",
                                        "bg-crimson-500 text-white hover:bg-crimson-600 active:scale-[0.98]",
                                        "disabled:opacity-40 disabled:cursor-not-allowed"
                                    )}
                                >
                                    Suspend Issuer
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

// ─── Issuer Card ─────────────────────────────

function IssuerCard({
    issuer,
    index,
    isExpanded,
    onToggle,
    isAdmin,
    onSuspend,
    onReinstate,
}: {
    issuer: Issuer;
    index: number;
    isExpanded: boolean;
    onToggle: () => void;
    isAdmin: boolean;
    onSuspend: () => void;
    onReinstate: () => void;
}) {
    const statusConfig = {
        active: { label: "Active", color: "text-neon-400", bg: "bg-neon-500/8", border: "border-neon-500/15", dot: "bg-neon-400" },
        suspended: { label: "Suspended", color: "text-crimson-400", bg: "bg-crimson-500/8", border: "border-crimson-500/15", dot: "bg-crimson-400" },
        revoked: { label: "Revoked", color: "text-crimson-400", bg: "bg-crimson-500/8", border: "border-crimson-500/15", dot: "bg-crimson-400" },
        pending: { label: "Pending", color: "text-gold-400", bg: "bg-gold-500/8", border: "border-gold-500/15", dot: "bg-gold-400" },
    };

    const status = statusConfig[issuer.status] || statusConfig.active;
    const credScore = issuer.credibilityScore || 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className={cn(
                "rounded-xl border overflow-hidden transition-all duration-300",
                "bg-surface-900/60 backdrop-blur-sm",
                isExpanded ? "border-surface-700" : "border-surface-800 hover:border-surface-700"
            )}
        >
            {/* Header row */}
            <div
                className="flex items-center gap-4 p-4 cursor-pointer"
                onClick={onToggle}
            >
                {/* Institution icon */}
                <div className="w-11 h-11 rounded-xl bg-gold-500/8 border border-gold-500/15 flex items-center justify-center flex-shrink-0">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-gold-400">
                        <path d="M10 2L3 7V8H17V7L10 2Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
                        <path d="M5 8V15M9 8V15M11 8V15M15 8V15" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                        <path d="M3 15H17V17H3V15Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
                    </svg>
                </div>

                <div className="flex-1 min-w-0">
                    <h4 className="text-b3 font-semibold text-white truncate">{issuer.name}</h4>
                    <p className="text-micro text-surface-400">
                        {ISSUER_TYPE_LABELS[issuer.type] || issuer.type} · Since {formatTimestampShort(issuer.registeredAt)}
                    </p>
                </div>

                {/* Status + Score */}
                <div className="flex items-center gap-2 flex-shrink-0">
                    {credScore > 0 && (
                        <span className={cn("text-micro font-mono font-semibold", getCredibilityColor(credScore))}>
                            {credScore}
                        </span>
                    )}
                    <span className={cn("text-micro px-2 py-0.5 rounded-full border flex items-center gap-1.5", status.bg, status.border, status.color)}>
                        <span className={cn("w-1.5 h-1.5 rounded-full", status.dot)} />
                        {status.label}
                    </span>
                </div>

                <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-surface-500 flex-shrink-0"
                >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </motion.div>
            </div>

            {/* Expanded */}
            <AnimatePresence>
                {isExpanded && (
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
                                    <p className="text-micro text-surface-500 mb-1">Wallet Address</p>
                                    <p className="text-micro text-electric-400 font-mono break-all">{issuer.address}</p>
                                </div>
                                <div className="p-3 rounded-lg bg-surface-850 border border-surface-800/50">
                                    <p className="text-micro text-surface-500 mb-1">Website</p>
                                    {issuer.website ? (
                                        <a href={issuer.website} target="_blank" rel="noopener noreferrer" className="text-micro text-violet-400 hover:text-violet-300 transition-colors">
                                            {issuer.website}
                                        </a>
                                    ) : (
                                        <p className="text-micro text-surface-500">Not provided</p>
                                    )}
                                </div>
                                <div className="p-3 rounded-lg bg-surface-850 border border-surface-800/50">
                                    <p className="text-micro text-surface-500 mb-1">Email</p>
                                    <p className="text-micro text-surface-300">{issuer.email || "Not provided"}</p>
                                </div>
                                <div className="p-3 rounded-lg bg-surface-850 border border-surface-800/50">
                                    <p className="text-micro text-surface-500 mb-1">Credibility Score</p>
                                    <p className={cn("text-micro font-semibold", getCredibilityColor(credScore))}>
                                        {credScore}/100 — {getCredibilityLabel(credScore)}
                                    </p>
                                </div>
                            </div>

                            {/* Description */}
                            {issuer.description && (
                                <div className="p-3 rounded-lg bg-surface-850 border border-surface-800/50">
                                    <p className="text-micro text-surface-500 mb-1">Description</p>
                                    <p className="text-b3 text-surface-300">{issuer.description}</p>
                                </div>
                            )}

                            {/* Issuance stats */}
                            <div className="grid grid-cols-3 gap-3">
                                <div className="p-3 rounded-lg bg-surface-850 border border-surface-800/50 text-center">
                                    <p className="text-h3 text-white font-bold">{issuer.totalIssued || 0}</p>
                                    <p className="text-micro text-surface-400">Issued</p>
                                </div>
                                <div className="p-3 rounded-lg bg-surface-850 border border-surface-800/50 text-center">
                                    <p className="text-h3 text-crimson-400 font-bold">{issuer.totalRevoked || 0}</p>
                                    <p className="text-micro text-surface-400">Revoked</p>
                                </div>
                                <div className="p-3 rounded-lg bg-surface-850 border border-surface-800/50 text-center">
                                    <p className={cn("text-h3 font-bold", getCredibilityColor(credScore))}>{credScore}</p>
                                    <p className="text-micro text-surface-400">Score</p>
                                </div>
                            </div>

                            {/* Admin actions */}
                            {isAdmin && (
                                <div className="flex items-center gap-2 pt-2">
                                    {issuer.status === "active" && (
                                        <button
                                            onClick={(e) => { e.stopPropagation(); onSuspend(); }}
                                            className="px-3 py-1.5 rounded-lg text-micro font-medium bg-crimson-500/8 text-crimson-400 border border-crimson-500/15 hover:bg-crimson-500/15 transition-all"
                                        >
                                            Suspend Issuer
                                        </button>
                                    )}
                                    {issuer.status === "suspended" && (
                                        <button
                                            onClick={(e) => { e.stopPropagation(); onReinstate(); }}
                                            className="px-3 py-1.5 rounded-lg text-micro font-medium bg-neon-500/8 text-neon-400 border border-neon-500/15 hover:bg-neon-500/15 transition-all"
                                        >
                                            Reinstate Issuer
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}


