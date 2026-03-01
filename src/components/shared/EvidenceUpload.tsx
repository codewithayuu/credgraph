"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { uploadEvidence, formatFileSize } from "@/services/evidence";
import { EvidenceRecord } from "@/lib/types";
import toast from "react-hot-toast";

interface EvidenceUploadProps {
    onUploaded: (record: EvidenceRecord) => void;
    existingHash?: string;
    compact?: boolean;
}

type UploadState = "idle" | "selected" | "hashing" | "uploading" | "complete" | "error";

export function EvidenceUpload({
    onUploaded,
    existingHash,
    compact = false,
}: EvidenceUploadProps) {
    const [file, setFile] = useState<File | null>(null);
    const [state, setState] = useState<UploadState>("idle");
    const [record, setRecord] = useState<EvidenceRecord | null>(null);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selected = e.target.files?.[0];
        if (!selected) return;

        // Max 50MB
        if (selected.size > 50 * 1024 * 1024) {
            toast.error("File size must be under 50MB");
            return;
        }

        setFile(selected);
        setState("selected");
        setError(null);
        setRecord(null);
    };

    const handleUpload = async () => {
        if (!file) return;

        setState("hashing");

        try {
            setState("uploading");
            const result = await uploadEvidence(file);

            if (result.success && result.record) {
                setRecord(result.record);
                setState("complete");
                onUploaded(result.record);
                toast.success("Evidence uploaded and hashed");
            } else {
                setError(result.error || "Upload failed");
                setState("error");
                toast.error(result.error || "Failed to upload evidence");
            }
        } catch (err: any) {
            setError(err?.message || "Upload failed");
            setState("error");
            toast.error("Failed to upload evidence");
        }
    };

    const handleReset = () => {
        setFile(null);
        setState("idle");
        setRecord(null);
        setError(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const getFileIcon = (type: string) => {
        if (type.startsWith("image/")) return "img";
        if (type.includes("pdf")) return "pdf";
        if (type.includes("zip") || type.includes("tar")) return "zip";
        return "doc";
    };

    return (
        <div className="space-y-3">
            {/* Hidden file input */}
            <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                onChange={handleFileSelect}
                accept="*/*"
            />

            {/* Upload area */}
            <AnimatePresence mode="wait">
                {state === "idle" && (
                    <motion.div
                        key="idle"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            className={cn(
                                "w-full rounded-xl border-2 border-dashed transition-all duration-300",
                                "border-surface-700 hover:border-gold-500/40 hover:bg-gold-500/3",
                                "flex flex-col items-center justify-center gap-3",
                                compact ? "py-6 px-4" : "py-10 px-6"
                            )}
                        >
                            <div className="w-12 h-12 rounded-xl bg-surface-800 border border-surface-700 flex items-center justify-center">
                                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" className="text-surface-400">
                                    <path d="M11 14V4M11 4L7 8M11 4L15 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M3 14V17C3 18.1 3.9 19 5 19H17C18.1 19 19 18.1 19 17V14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <div className="text-center">
                                <p className="text-b3 text-surface-300 font-medium">
                                    Upload Evidence File
                                </p>
                                <p className="text-micro text-surface-500 mt-0.5">
                                    PDF, images, or any file up to 50MB
                                </p>
                            </div>
                        </button>
                    </motion.div>
                )}

                {state === "selected" && file && (
                    <motion.div
                        key="selected"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        className="rounded-xl bg-surface-900/60 border border-surface-800 p-4 space-y-3"
                    >
                        {/* File info */}
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-azure-500/10 border border-azure-500/20 flex items-center justify-center">
                                <span className="text-micro text-azure-400 font-bold uppercase">
                                    {getFileIcon(file.type)}
                                </span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-b3 text-white font-medium truncate">{file.name}</p>
                                <p className="text-micro text-surface-400">
                                    {formatFileSize(file.size)} · {file.type || "Unknown type"}
                                </p>
                            </div>
                            <button
                                onClick={handleReset}
                                className="p-1.5 rounded-lg hover:bg-surface-800 text-surface-500 hover:text-surface-300 transition-colors"
                            >
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                    <path d="M3 3L11 11M11 3L3 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                </svg>
                            </button>
                        </div>

                        {/* Action buttons */}
                        <div className="flex items-center gap-2">
                            <button
                                onClick={handleReset}
                                className="flex-1 py-2 px-3 rounded-lg text-micro font-medium bg-surface-800 text-surface-300 border border-surface-700 hover:bg-surface-700 transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleUpload}
                                className="flex-1 py-2 px-3 rounded-lg text-micro font-semibold bg-gradient-to-r from-gold-600 to-gold-500 text-void hover:shadow-glow-gold active:scale-[0.98] transition-all flex items-center justify-center gap-1.5"
                            >
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                    <path d="M7 11V3M7 3L4 6M7 3L10 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                Hash & Upload
                            </button>
                        </div>
                    </motion.div>
                )}

                {(state === "hashing" || state === "uploading") && (
                    <motion.div
                        key="processing"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        className="rounded-xl bg-surface-900/60 border border-gold-500/20 p-4"
                    >
                        <div className="flex items-center gap-3">
                            <svg className="w-5 h-5 text-gold-400 animate-spin flex-shrink-0" viewBox="0 0 16 16" fill="none">
                                <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="2" strokeDasharray="28" strokeDashoffset="8" strokeLinecap="round" />
                            </svg>
                            <div>
                                <p className="text-b3 text-gold-400 font-medium">
                                    {state === "hashing" ? "Computing SHA-256 hash..." : "Uploading to IPFS..."}
                                </p>
                                <p className="text-micro text-surface-400">
                                    {state === "hashing"
                                        ? "Generating cryptographic fingerprint of your file"
                                        : "Storing file on decentralized storage via Pinata"}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}

                {state === "complete" && record && (
                    <motion.div
                        key="complete"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        className="rounded-xl bg-neon-500/5 border border-neon-500/20 p-4 space-y-3"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-neon-500/15 flex items-center justify-center flex-shrink-0">
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-neon-400">
                                    <path d="M2.5 7L5.5 10L11.5 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-b3 text-neon-400 font-medium">Evidence Anchored</p>
                                <p className="text-micro text-surface-400">File hashed and uploaded successfully</p>
                            </div>
                        </div>

                        {/* Hash display */}
                        <div className="p-3 rounded-lg bg-surface-900/80 border border-surface-800/50">
                            <p className="text-micro text-surface-500 mb-1">SHA-256 Hash</p>
                            <p className="text-micro text-electric-400 font-mono break-all">{record.hash}</p>
                        </div>

                        {record.ipfsCid && (
                            <div className="p-3 rounded-lg bg-surface-900/80 border border-surface-800/50">
                                <p className="text-micro text-surface-500 mb-1">IPFS CID</p>
                                <p className="text-micro text-violet-400 font-mono break-all">{record.ipfsCid}</p>
                            </div>
                        )}

                        <button
                            onClick={handleReset}
                            className="text-micro text-surface-400 hover:text-surface-300 transition-colors"
                        >
                            Upload different file
                        </button>
                    </motion.div>
                )}

                {state === "error" && (
                    <motion.div
                        key="error"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        className="rounded-xl bg-crimson-500/5 border border-crimson-500/20 p-4"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-crimson-500/15 flex items-center justify-center flex-shrink-0">
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-crimson-400">
                                    <path d="M4 4L10 10M10 4L4 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                </svg>
                            </div>
                            <div className="flex-1">
                                <p className="text-b3 text-crimson-400 font-medium">Upload Failed</p>
                                <p className="text-micro text-surface-400">{error}</p>
                            </div>
                            <button
                                onClick={handleReset}
                                className="text-micro text-surface-400 hover:text-surface-300 px-3 py-1.5 rounded-lg bg-surface-800 border border-surface-700 transition-all"
                            >
                                Retry
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
