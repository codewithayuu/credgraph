"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGovernance } from "@/hooks/useGovernance";
import { GovernanceApplication } from "@/lib/types";
import { cn, truncateAddress } from "@/lib/utils";
import { ISSUER_TYPE_LABELS, APPLICATION_STATUS_LABELS } from "@/lib/constants";

export function ApplicationReview() {
    const {
        pendingApplications,
        underReviewApplications,
        rejectedApplications,
        reviewApplication,
    } = useGovernance();

    const [reviewingId, setReviewingId] = useState<string | null>(null);
    const [reviewNote, setReviewNote] = useState("");
    const [processing, setProcessing] = useState(false);

    const allReviewable = [...pendingApplications, ...underReviewApplications];

    const handleReview = async (
        applicationId: string,
        decision: "approved" | "rejected" | "under_review"
    ) => {
        if (!reviewNote.trim() && decision !== "under_review") {
            return;
        }
        setProcessing(true);
        try {
            await reviewApplication(applicationId, decision, reviewNote || `Marked as ${decision}`);
            setReviewingId(null);
            setReviewNote("");
        } finally {
            setProcessing(false);
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-h2 font-semibold text-white">Review Applications</h3>
                <p className="text-b3 text-surface-400 mt-1">
                    {allReviewable.length} application{allReviewable.length !== 1 ? "s" : ""} awaiting review
                </p>
            </div>

            {allReviewable.length === 0 ? (
                <div className="rounded-xl bg-surface-900/40 border border-surface-800 p-12 text-center">
                    <div className="w-14 h-14 rounded-2xl bg-neon-500/8 border border-neon-500/15 flex items-center justify-center mx-auto mb-4">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-neon-400">
                            <path d="M6 12L10.5 16.5L18 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <p className="text-b2 text-surface-300 font-medium">All caught up</p>
                    <p className="text-b3 text-surface-500 mt-1">No pending applications to review</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {allReviewable.map((app, i) => (
                        <ApplicationReviewCard
                            key={app.id}
                            application={app}
                            index={i}
                            isReviewing={reviewingId === app.id}
                            onStartReview={() => { setReviewingId(app.id); setReviewNote(""); }}
                            onCancelReview={() => { setReviewingId(null); setReviewNote(""); }}
                            reviewNote={reviewingId === app.id ? reviewNote : ""}
                            onReviewNoteChange={setReviewNote}
                            onApprove={() => handleReview(app.id, "approved")}
                            onReject={() => handleReview(app.id, "rejected")}
                            onMarkReview={() => handleReview(app.id, "under_review")}
                            processing={processing && reviewingId === app.id}
                        />
                    ))}
                </div>
            )}

            {/* Recently rejected */}
            {rejectedApplications.length > 0 && (
                <div className="mt-8">
                    <h4 className="text-h3 font-semibold text-surface-300 mb-4">Recently Rejected</h4>
                    <div className="space-y-3">
                        {rejectedApplications.slice(0, 5).map((app, i) => (
                            <div
                                key={app.id}
                                className="rounded-xl bg-surface-900/40 border border-surface-800 p-4 flex items-center gap-4"
                            >
                                <div className="w-2 h-2 rounded-full bg-crimson-400 flex-shrink-0" />
                                <div className="flex-1 min-w-0">
                                    <p className="text-b3 text-surface-300 truncate">{app.institutionName}</p>
                                    <p className="text-micro text-surface-500">{app.reviewNote}</p>
                                </div>
                                <span className="text-micro text-crimson-400">Rejected</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

function ApplicationReviewCard({
    application,
    index,
    isReviewing,
    onStartReview,
    onCancelReview,
    reviewNote,
    onReviewNoteChange,
    onApprove,
    onReject,
    onMarkReview,
    processing,
}: {
    application: GovernanceApplication;
    index: number;
    isReviewing: boolean;
    onStartReview: () => void;
    onCancelReview: () => void;
    reviewNote: string;
    onReviewNoteChange: (note: string) => void;
    onApprove: () => void;
    onReject: () => void;
    onMarkReview: () => void;
    processing: boolean;
}) {
    const [mounted, setMounted] = React.useState(false);
    React.useEffect(() => setMounted(true), []);

    const statusInfo = APPLICATION_STATUS_LABELS[application.status];
    const submittedDate = mounted ? new Date(application.submittedAt * 1000).toLocaleDateString("en-US", {
        month: "short", day: "numeric", year: "numeric",
    }) : "";

    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className={cn(
                "rounded-xl border overflow-hidden transition-all duration-300",
                "bg-surface-900/60 backdrop-blur-sm",
                isReviewing ? "border-gold-500/30 shadow-glow-gold" : "border-surface-800"
            )}
        >
            <div className="p-4 space-y-3">
                {/* Application header */}
                <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gold-500/8 border border-gold-500/15 flex items-center justify-center flex-shrink-0">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="text-gold-400">
                            <rect x="2.5" y="2.5" width="13" height="13" rx="3" stroke="currentColor" strokeWidth="1.3" />
                            <path d="M6 9H12M9 6V12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                        </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                        <h4 className="text-b3 font-semibold text-white">{application.institutionName}</h4>
                        <p className="text-micro text-surface-400">
                            {ISSUER_TYPE_LABELS[application.institutionType]} · Submitted {submittedDate}
                        </p>
                    </div>
                    <span className={cn("text-micro px-2 py-0.5 rounded-full", statusInfo?.color || "text-surface-400")}>
                        {statusInfo?.label || application.status}
                    </span>
                </div>

                {/* Application details */}
                <div className="p-3 rounded-lg bg-surface-850 border border-surface-800/50">
                    <p className="text-b3 text-surface-300">{application.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <div className="p-2.5 rounded-lg bg-surface-850 border border-surface-800/50">
                        <p className="text-micro text-surface-500">Email</p>
                        <p className="text-micro text-surface-300">{application.email}</p>
                    </div>
                    <div className="p-2.5 rounded-lg bg-surface-850 border border-surface-800/50">
                        <p className="text-micro text-surface-500">Website</p>
                        <a href={application.website} target="_blank" rel="noopener noreferrer" className="text-micro text-violet-400 hover:text-violet-300 truncate block">
                            {application.website}
                        </a>
                    </div>
                </div>

                <div className="p-2.5 rounded-lg bg-surface-850 border border-surface-800/50">
                    <p className="text-micro text-surface-500">Wallet</p>
                    <p className="text-micro text-electric-400 font-mono break-all">{application.applicantAddress}</p>
                </div>

                {application.documentHash && (
                    <div className="p-2.5 rounded-lg bg-surface-850 border border-surface-800/50">
                        <p className="text-micro text-surface-500">Document Hash</p>
                        <p className="text-micro text-violet-400 font-mono break-all">{application.documentHash}</p>
                    </div>
                )}

                {/* Review actions */}
                {!isReviewing ? (
                    <div className="flex items-center gap-2 pt-2">
                        <button
                            onClick={onStartReview}
                            className="px-4 py-2 rounded-lg text-micro font-semibold bg-gradient-to-r from-gold-600 to-gold-500 text-void hover:shadow-glow-gold active:scale-[0.98] transition-all"
                        >
                            Review Application
                        </button>
                        {application.status === "pending" && (
                            <button
                                onClick={onMarkReview}
                                className="px-3 py-2 rounded-lg text-micro font-medium bg-azure-500/8 text-azure-400 border border-azure-500/15 hover:bg-azure-500/15 transition-all"
                            >
                                Mark Under Review
                            </button>
                        )}
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="space-y-3 pt-2 border-t border-surface-800/60"
                    >
                        <div>
                            <label className="text-micro text-surface-400 block mb-1.5">Review Note</label>
                            <textarea
                                value={reviewNote}
                                onChange={(e) => onReviewNoteChange(e.target.value)}
                                placeholder="Provide your review notes..."
                                rows={3}
                                className={cn(
                                    "w-full px-3 py-2.5 rounded-xl text-b3 resize-none",
                                    "bg-surface-850 border border-surface-800 text-white",
                                    "placeholder:text-surface-500 focus:outline-none focus:border-gold-500/30",
                                    "transition-all duration-200"
                                )}
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={onCancelReview}
                                disabled={processing}
                                className="px-3 py-2 rounded-lg text-micro font-medium bg-surface-800 text-surface-300 border border-surface-700 hover:bg-surface-700 transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={onReject}
                                disabled={processing || !reviewNote.trim()}
                                className={cn(
                                    "px-4 py-2 rounded-lg text-micro font-semibold transition-all",
                                    "bg-crimson-500/10 text-crimson-400 border border-crimson-500/20 hover:bg-crimson-500/20",
                                    "disabled:opacity-40 disabled:cursor-not-allowed"
                                )}
                            >
                                Reject
                            </button>
                            <button
                                onClick={onApprove}
                                disabled={processing || !reviewNote.trim()}
                                className={cn(
                                    "px-4 py-2 rounded-lg text-micro font-semibold transition-all flex items-center gap-1.5",
                                    "bg-neon-500/10 text-neon-400 border border-neon-500/20 hover:bg-neon-500/20",
                                    "disabled:opacity-40 disabled:cursor-not-allowed"
                                )}
                            >
                                {processing ? (
                                    <svg className="w-3.5 h-3.5 animate-spin" viewBox="0 0 16 16" fill="none">
                                        <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="2" strokeDasharray="28" strokeDashoffset="8" strokeLinecap="round" />
                                    </svg>
                                ) : null}
                                Approve
                            </button>
                        </div>
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
}
