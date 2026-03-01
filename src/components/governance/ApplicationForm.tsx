"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useGovernance } from "@/hooks/useGovernance";
import { useWallet } from "@/hooks/useWallet";
import { IssuerType } from "@/lib/types";
import { ISSUER_TYPE_LABELS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { EvidenceUpload } from "@/components/shared/EvidenceUpload";

interface FormState {
    institutionName: string;
    institutionType: IssuerType;
    email: string;
    website: string;
    description: string;
}

export function ApplicationForm() {
    const { isConnected, address } = useWallet();
    const { submitApplication, hasExistingApplication, myApplication } = useGovernance();

    const [form, setForm] = useState<FormState>({
        institutionName: "",
        institutionType: "university",
        email: "",
        website: "",
        description: "",
    });
    const [documentHash, setDocumentHash] = useState<string | undefined>();
    const [documentUri, setDocumentUri] = useState<string | undefined>();
    const [submitting, setSubmitting] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const validate = (): boolean => {
        const newErrors: Record<string, string> = {};
        if (!form.institutionName.trim()) newErrors.institutionName = "Institution name is required";
        if (!form.email.trim()) newErrors.email = "Email is required";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = "Invalid email address";
        if (!form.website.trim()) newErrors.website = "Website is required";
        if (!form.description.trim()) newErrors.description = "Description is required";
        else if (form.description.length < 50) newErrors.description = "Description must be at least 50 characters";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        setSubmitting(true);
        try {
            await submitApplication({
                institutionName: form.institutionName,
                institutionType: form.institutionType,
                email: form.email,
                website: form.website,
                description: form.description,
                documentUri,
                documentHash,
            });
        } finally {
            setSubmitting(false);
        }
    };

    const updateField = (field: keyof FormState, value: string) => {
        setForm((prev) => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors((prev) => { const next = { ...prev }; delete next[field]; return next; });
        }
    };

    // Show connect prompt if not connected
    if (!isConnected) {
        return (
            <div className="rounded-xl bg-surface-900/60 border border-surface-800 p-12 text-center">
                <p className="text-b2 text-surface-400">Connect your wallet to submit an application</p>
            </div>
        );
    }

    // Show existing application status
    if (hasExistingApplication && myApplication) {
        const statusConfig: Record<string, { color: string; bg: string; border: string; label: string }> = {
            pending: { color: "text-gold-400", bg: "bg-gold-500/5", border: "border-gold-500/15", label: "Your application is pending review" },
            under_review: { color: "text-azure-400", bg: "bg-azure-500/5", border: "border-azure-500/15", label: "Your application is under review" },
            approved: { color: "text-neon-400", bg: "bg-neon-500/5", border: "border-neon-500/15", label: "Your application has been approved" },
        };
        const config = statusConfig[myApplication.status] || statusConfig.pending;

        return (
            <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn("rounded-xl p-8 border text-center space-y-4", config.bg, config.border)}
            >
                <div className="w-14 h-14 rounded-2xl bg-surface-900/60 border border-surface-800 flex items-center justify-center mx-auto">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={config.color}>
                        <rect x="3" y="3" width="18" height="18" rx="4" stroke="currentColor" strokeWidth="1.5" />
                        <path d="M8 12L11 15L16 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
                <div>
                    <h3 className={cn("text-h2 font-semibold", config.color)}>{config.label}</h3>
                    <p className="text-b3 text-surface-400 mt-1">
                        Application for &quot;{myApplication.institutionName}&quot; submitted on{" "}
                        {new Date(myApplication.submittedAt * 1000).toLocaleDateString()}
                    </p>
                    {myApplication.reviewNote && (
                        <div className="mt-4 p-3 rounded-lg bg-surface-900/60 border border-surface-800/50 text-left">
                            <p className="text-micro text-surface-500">Reviewer Note</p>
                            <p className="text-b3 text-surface-300 mt-1">{myApplication.reviewNote}</p>
                        </div>
                    )}
                </div>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl"
        >
            <div className="mb-6">
                <h3 className="text-h2 font-semibold text-white">Register as Issuer</h3>
                <p className="text-b3 text-surface-400 mt-1">
                    Submit your institution for review. Once approved, you can issue verifiable credentials.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                {/* Institution Name */}
                <div>
                    <label className="text-micro text-surface-400 block mb-1.5">Institution Name *</label>
                    <input
                        type="text"
                        value={form.institutionName}
                        onChange={(e) => updateField("institutionName", e.target.value)}
                        placeholder="e.g., Stanford University — Computer Science"
                        className={cn(
                            "w-full px-4 py-2.5 rounded-xl text-b3",
                            "bg-surface-900/60 border text-white",
                            "placeholder:text-surface-500 focus:outline-none transition-all duration-200",
                            errors.institutionName
                                ? "border-crimson-500/40 focus:border-crimson-500/60"
                                : "border-surface-800 focus:border-gold-500/30 focus:shadow-focus-gold"
                        )}
                    />
                    {errors.institutionName && (
                        <p className="text-micro text-crimson-400 mt-1">{errors.institutionName}</p>
                    )}
                </div>

                {/* Institution Type */}
                <div>
                    <label className="text-micro text-surface-400 block mb-1.5">Institution Type *</label>
                    <select
                        value={form.institutionType}
                        onChange={(e) => updateField("institutionType", e.target.value)}
                        className={cn(
                            "w-full px-4 py-2.5 rounded-xl text-b3 appearance-none",
                            "bg-surface-900/60 border border-surface-800 text-white",
                            "focus:outline-none focus:border-gold-500/30 focus:shadow-focus-gold",
                            "transition-all duration-200"
                        )}
                    >
                        {Object.entries(ISSUER_TYPE_LABELS).map(([value, label]) => (
                            <option key={value} value={value} className="bg-surface-900 text-white">
                                {label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Email & Website */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="text-micro text-surface-400 block mb-1.5">Official Email *</label>
                        <input
                            type="email"
                            value={form.email}
                            onChange={(e) => updateField("email", e.target.value)}
                            placeholder="admin@institution.edu"
                            className={cn(
                                "w-full px-4 py-2.5 rounded-xl text-b3",
                                "bg-surface-900/60 border text-white",
                                "placeholder:text-surface-500 focus:outline-none transition-all duration-200",
                                errors.email
                                    ? "border-crimson-500/40 focus:border-crimson-500/60"
                                    : "border-surface-800 focus:border-gold-500/30 focus:shadow-focus-gold"
                            )}
                        />
                        {errors.email && <p className="text-micro text-crimson-400 mt-1">{errors.email}</p>}
                    </div>
                    <div>
                        <label className="text-micro text-surface-400 block mb-1.5">Website *</label>
                        <input
                            type="url"
                            value={form.website}
                            onChange={(e) => updateField("website", e.target.value)}
                            placeholder="https://institution.edu"
                            className={cn(
                                "w-full px-4 py-2.5 rounded-xl text-b3",
                                "bg-surface-900/60 border text-white",
                                "placeholder:text-surface-500 focus:outline-none transition-all duration-200",
                                errors.website
                                    ? "border-crimson-500/40 focus:border-crimson-500/60"
                                    : "border-surface-800 focus:border-gold-500/30 focus:shadow-focus-gold"
                            )}
                        />
                        {errors.website && <p className="text-micro text-crimson-400 mt-1">{errors.website}</p>}
                    </div>
                </div>

                {/* Description */}
                <div>
                    <label className="text-micro text-surface-400 block mb-1.5">Description *</label>
                    <textarea
                        value={form.description}
                        onChange={(e) => updateField("description", e.target.value)}
                        placeholder="Describe your institution, programs, and why you want to issue credentials on CredGraph..."
                        rows={4}
                        className={cn(
                            "w-full px-4 py-2.5 rounded-xl text-b3 resize-none",
                            "bg-surface-900/60 border text-white",
                            "placeholder:text-surface-500 focus:outline-none transition-all duration-200",
                            errors.description
                                ? "border-crimson-500/40 focus:border-crimson-500/60"
                                : "border-surface-800 focus:border-gold-500/30 focus:shadow-focus-gold"
                        )}
                    />
                    <div className="flex justify-between mt-1">
                        {errors.description && <p className="text-micro text-crimson-400">{errors.description}</p>}
                        <p className="text-micro text-surface-500 ml-auto">{form.description.length}/500</p>
                    </div>
                </div>

                {/* Supporting Documents */}
                <div>
                    <label className="text-micro text-surface-400 block mb-1.5">Supporting Documents (Optional)</label>
                    <p className="text-micro text-surface-500 mb-3">
                        Upload accreditation documents, partnership agreements, or other verification materials.
                    </p>
                    <EvidenceUpload
                        compact
                        onUploaded={(record) => {
                            setDocumentHash(record.hash);
                            setDocumentUri(record.uri);
                        }}
                    />
                </div>

                {/* Wallet info */}
                <div className="p-3 rounded-lg bg-surface-850 border border-surface-800/50">
                    <p className="text-micro text-surface-500 mb-1">Registering Wallet</p>
                    <p className="text-micro text-electric-400 font-mono break-all">{address}</p>
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    disabled={submitting}
                    className={cn(
                        "w-full py-3 px-4 rounded-xl text-b3 font-semibold transition-all duration-300",
                        "bg-gradient-to-r from-gold-600 to-gold-500 text-void",
                        "hover:shadow-glow-gold active:scale-[0.98]",
                        "flex items-center justify-center gap-2",
                        "disabled:opacity-60 disabled:cursor-not-allowed"
                    )}
                >
                    {submitting ? (
                        <>
                            <svg className="w-4 h-4 animate-spin" viewBox="0 0 16 16" fill="none">
                                <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="2" strokeDasharray="28" strokeDashoffset="8" strokeLinecap="round" />
                            </svg>
                            Submitting Application...
                        </>
                    ) : (
                        "Submit Application"
                    )}
                </button>
            </form>
        </motion.div>
    );
}
