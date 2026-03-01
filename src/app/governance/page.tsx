"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useGovernance } from "@/hooks/useGovernance";
import { useWallet } from "@/hooks/useWallet";
import { GovernanceConnectPrompt } from "@/components/governance/GovernanceConnectPrompt";
import { IssuerRegistry } from "@/components/governance/IssuerRegistry";
import { ApplicationForm } from "@/components/governance/ApplicationForm";
import { ApplicationReview } from "@/components/governance/ApplicationReview";
import { GovernanceTimeline } from "@/components/governance/GovernanceTimeline";
import { GovernanceStats } from "@/components/governance/GovernanceStats";
import { PageTransition } from "@/components/shared/PageTransition";
import { cn } from "@/lib/utils";

const PUBLIC_TABS = [
    { id: "registry", label: "Issuer Registry" },
    { id: "apply", label: "Apply" },
    { id: "timeline", label: "Audit Trail" },
];

const ADMIN_TABS = [
    { id: "registry", label: "Issuer Registry" },
    { id: "review", label: "Review Applications" },
    { id: "apply", label: "Apply" },
    { id: "timeline", label: "Audit Trail" },
];

export default function GovernancePage() {
    const { isConnected } = useWallet();
    const { isAdmin, stats } = useGovernance();
    const [activeTab, setActiveTab] = useState("registry");

    const tabs = isAdmin ? ADMIN_TABS : PUBLIC_TABS;

    return (
        <PageTransition>
            <div className="min-h-screen">
                {/* Background atmosphere */}
                <div className="fixed inset-0 pointer-events-none">
                    <div className="absolute top-0 right-[-20%] w-[800px] h-[600px] rounded-full bg-gold-500/[0.03] blur-[120px]" />
                    <div className="absolute bottom-[10%] left-[-10%] w-[600px] h-[500px] rounded-full bg-electric-500/[0.02] blur-[100px]" />
                </div>

                <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                    {/* Page header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mb-8"
                    >
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-gold-400">
                                    <path d="M10 2L3 6V14L10 18L17 14V6L10 2Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
                                    <path d="M10 8V12M8 10H12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                                </svg>
                            </div>
                            <div>
                                <h1 className="text-d4 font-bold text-white font-display">
                                    Governance
                                </h1>
                                <p className="text-b3 text-surface-400">
                                    Issuer registration, approval, and public audit trail
                                </p>
                            </div>
                        </div>

                        {isAdmin && (
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold-500/8 border border-gold-500/15 mt-2">
                                <div className="w-2 h-2 rounded-full bg-gold-400 animate-pulse" />
                                <span className="text-micro text-gold-400 font-semibold">Admin Mode</span>
                            </div>
                        )}
                    </motion.div>

                    {/* Stats bar */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.05 }}
                        className="mb-8"
                    >
                        <GovernanceStats stats={stats} />
                    </motion.div>

                    {/* Tab navigation */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="mb-8"
                    >
                        <div className="flex items-center gap-1 p-1 rounded-xl bg-surface-900/60 border border-surface-800 w-fit overflow-x-auto">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={cn(
                                        "relative px-4 py-2 rounded-lg text-b3 font-medium transition-all duration-200 whitespace-nowrap",
                                        activeTab === tab.id
                                            ? "text-gold-400"
                                            : "text-surface-400 hover:text-surface-200"
                                    )}
                                >
                                    {activeTab === tab.id && (
                                        <motion.div
                                            layoutId="gov-tab-indicator"
                                            className="absolute inset-0 rounded-lg bg-gold-500/10 border border-gold-500/15"
                                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                        />
                                    )}
                                    <span className="relative z-10 flex items-center gap-2">
                                        {tab.label}
                                        {tab.id === "review" && stats.pendingApplications > 0 && (
                                            <span className="text-micro px-1.5 py-0.5 rounded-full bg-gold-500/20 text-gold-400 font-bold">
                                                {stats.pendingApplications}
                                            </span>
                                        )}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </motion.div>

                    {/* Tab content */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.15 }}
                    >
                        {activeTab === "registry" && <IssuerRegistry />}
                        {activeTab === "apply" && <ApplicationForm />}
                        {activeTab === "review" && isAdmin && <ApplicationReview />}
                        {activeTab === "timeline" && <GovernanceTimeline />}
                    </motion.div>
                </div>
            </div>
        </PageTransition>
    );
}
