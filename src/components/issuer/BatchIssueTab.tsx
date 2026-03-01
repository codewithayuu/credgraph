"use client";

import React, { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useIssuer } from "@/hooks/useIssuer";
import { useCredentialStore } from "@/store/credentialStore";
import {
    parseAndValidateCSV,
    createBatchJob,
    processBatchJob,
    generateSampleCSV,
} from "@/services/batch";
import { BatchIssueJob, BatchIssueRow, Credential } from "@/lib/types";
import { cn, truncateAddress } from "@/lib/utils";
import { BATCH_CONFIG } from "@/lib/constants";
import { CSVPreview } from "./CSVPreview";
import { BatchProgress } from "./BatchProgress";
import toast from "react-hot-toast";

type BatchStage = "upload" | "preview" | "processing" | "complete";

export function BatchIssueTab() {
    const { address, credentialTypes, issuerInfo } = useIssuer();
    const store = useCredentialStore();

    const [stage, setStage] = useState<BatchStage>("upload");
    const [csvContent, setCsvContent] = useState<string>("");
    const [parsedRows, setParsedRows] = useState<BatchIssueRow[]>([]);
    const [parseErrors, setParseErrors] = useState<string[]>([]);
    const [activeJob, setActiveJob] = useState<BatchIssueJob | null>(null);
    const [completedJob, setCompletedJob] = useState<BatchIssueJob | null>(null);

    const fileInputRef = useRef<HTMLInputElement>(null);

    // ─── Handle CSV File Upload ────────────

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.name.endsWith(".csv")) {
            toast.error("Please upload a .csv file");
            return;
        }

        const reader = new FileReader();
        reader.onload = (event) => {
            const content = event.target?.result as string;
            if (!content) return;

            setCsvContent(content);
            processCSV(content);
        };
        reader.readAsText(file);
    };

    // ─── Process CSV Content ───────────────

    const processCSV = (content: string) => {
        if (!address) return;

        const result = parseAndValidateCSV(content, credentialTypes, address);

        setParsedRows(result.rows);
        setParseErrors(result.errors);

        if (result.rows.length > 0) {
            setStage("preview");
        } else {
            toast.error("No valid rows found in CSV");
        }
    };

    // ─── Start Batch Processing ────────────

    const startBatch = useCallback(async () => {
        if (!address || !issuerInfo) return;

        const pendingRows = parsedRows.filter((r) => r.status === "pending");
        if (pendingRows.length === 0) {
            toast.error("No valid rows to process");
            return;
        }

        const job = createBatchJob(address, parsedRows);
        setActiveJob(job);
        store.addBatchJob(job);
        setStage("processing");

        try {
            const completedJob = await processBatchJob(
                job,
                credentialTypes,
                issuerInfo.name,
                // Progress callback
                (processed, success, failed, currentRow) => {
                    setActiveJob((prev) =>
                        prev
                            ? {
                                ...prev,
                                processedRows: processed,
                                successCount: success,
                                failedCount: failed,
                            }
                            : null
                    );
                },
                // Row complete callback
                (rowIndex, row, credential) => {
                    // Update the batch job row in store
                    store.updateBatchRow(job.id, rowIndex, row);

                    // If credential was created, add to credential store
                    if (credential) {
                        store.addCredential(credential);
                    }

                    // Update local parsed rows
                    setParsedRows((prev) => {
                        const updated = [...prev];
                        updated[rowIndex] = row;
                        return updated;
                    });
                }
            );

            setCompletedJob(completedJob);
            store.updateBatchJob(job.id, {
                status: "completed",
                processedRows: completedJob.processedRows,
                successCount: completedJob.successCount,
                failedCount: completedJob.failedCount,
                completedAt: completedJob.completedAt,
            });
            setStage("complete");

            toast.success(
                `Batch complete: ${completedJob.successCount} succeeded, ${completedJob.failedCount} failed`
            );
        } catch (err: any) {
            toast.error("Batch processing failed");
            setStage("preview");
        }
    }, [address, issuerInfo, parsedRows, credentialTypes, store]);

    // ─── Download Sample CSV ───────────────

    const downloadSampleCSV = () => {
        const csv = generateSampleCSV(credentialTypes);
        const blob = new Blob([csv], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "credgraph-batch-template.csv";
        a.click();
        URL.revokeObjectURL(url);
        toast.success("Template downloaded");
    };

    // ─── Reset ─────────────────────────────

    const handleReset = () => {
        setStage("upload");
        setCsvContent("");
        setParsedRows([]);
        setParseErrors([]);
        setActiveJob(null);
        setCompletedJob(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    return (
        <div className="space-y-6">
            {/* Hidden file input */}
            <input
                ref={fileInputRef}
                type="file"
                accept=".csv"
                className="hidden"
                onChange={handleFileUpload}
            />

            <AnimatePresence mode="wait">
                {/* ─── Upload Stage ─────────────────── */}
                {stage === "upload" && (
                    <motion.div
                        key="upload"
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -16 }}
                        className="space-y-6"
                    >
                        {/* Header */}
                        <div>
                            <h3 className="text-h2 font-semibold text-white">Batch Issuance</h3>
                            <p className="text-b3 text-surface-400 mt-1">
                                Issue credentials to multiple recipients at once using a CSV file.
                            </p>
                        </div>

                        {/* Upload area */}
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            className={cn(
                                "w-full rounded-xl border-2 border-dashed py-14 px-8 transition-all duration-300",
                                "border-surface-700 hover:border-gold-500/40 hover:bg-gold-500/3",
                                "flex flex-col items-center justify-center gap-4"
                            )}
                        >
                            <div className="w-16 h-16 rounded-2xl bg-surface-800 border border-surface-700 flex items-center justify-center">
                                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="text-surface-400">
                                    <path d="M14 18V6M14 6L9 11M14 6L19 11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M4 18V22C4 23.1 4.9 24 6 24H22C23.1 24 24 23.1 24 22V18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <div className="text-center">
                                <p className="text-b2 text-surface-200 font-medium">
                                    Upload CSV File
                                </p>
                                <p className="text-b3 text-surface-500 mt-1">
                                    Click to select or drag and drop
                                </p>
                            </div>
                        </button>

                        {/* CSV format info */}
                        <div className="rounded-xl bg-surface-900/60 border border-surface-800 p-5 space-y-4">
                            <h4 className="text-b3 text-white font-semibold">CSV Format</h4>

                            <div className="space-y-2">
                                <p className="text-micro text-surface-400">Required columns:</p>
                                <div className="flex flex-wrap gap-2">
                                    {BATCH_CONFIG.requiredColumns.map((col) => (
                                        <span
                                            key={col}
                                            className="text-micro px-2.5 py-1 rounded-md bg-electric-500/8 border border-electric-500/15 text-electric-400 font-mono"
                                        >
                                            {col}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <p className="text-micro text-surface-400">Optional columns:</p>
                                <div className="flex flex-wrap gap-2">
                                    {BATCH_CONFIG.optionalColumns.map((col) => (
                                        <span
                                            key={col}
                                            className="text-micro px-2.5 py-1 rounded-md bg-surface-800 border border-surface-700 text-surface-400 font-mono"
                                        >
                                            {col}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="flex items-center gap-2 pt-1">
                                <button
                                    onClick={downloadSampleCSV}
                                    className="text-micro text-gold-400 hover:text-gold-300 font-medium flex items-center gap-1.5 transition-colors"
                                >
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                        <path d="M7 3V11M7 11L4 8M7 11L10 8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M2.5 11.5H11.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                                    </svg>
                                    Download Template CSV
                                </button>
                                <span className="text-micro text-surface-600">·</span>
                                <span className="text-micro text-surface-500">
                                    Max {BATCH_CONFIG.maxTotalRows} rows per batch
                                </span>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* ─── Preview Stage ────────────────── */}
                {stage === "preview" && (
                    <motion.div
                        key="preview"
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -16 }}
                        className="space-y-6"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-h2 font-semibold text-white">Review Batch</h3>
                                <p className="text-b3 text-surface-400 mt-1">
                                    {parsedRows.length} rows parsed · {parsedRows.filter((r) => r.status === "pending").length} valid · {parsedRows.filter((r) => r.status === "skipped").length} skipped
                                </p>
                            </div>
                            <button
                                onClick={handleReset}
                                className="text-micro px-3 py-1.5 rounded-lg bg-surface-800 text-surface-300 border border-surface-700 hover:bg-surface-700 transition-all"
                            >
                                Upload Different File
                            </button>
                        </div>

                        {/* Parse errors */}
                        {parseErrors.length > 0 && (
                            <div className="rounded-xl bg-crimson-500/5 border border-crimson-500/20 p-4 space-y-2">
                                <p className="text-b3 text-crimson-400 font-medium">
                                    {parseErrors.length} validation issue{parseErrors.length !== 1 ? "s" : ""}
                                </p>
                                <div className="space-y-1 max-h-32 overflow-y-auto">
                                    {parseErrors.map((err, i) => (
                                        <p key={i} className="text-micro text-surface-400">
                                            {err}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* CSV Preview Table */}
                        <CSVPreview rows={parsedRows} credentialTypes={credentialTypes} />

                        {/* Action buttons */}
                        <div className="flex items-center gap-3">
                            <button
                                onClick={handleReset}
                                className="flex-1 py-3 px-4 rounded-xl text-b3 font-medium bg-surface-800 text-surface-300 border border-surface-700 hover:bg-surface-700 transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={startBatch}
                                disabled={parsedRows.filter((r) => r.status === "pending").length === 0}
                                className={cn(
                                    "flex-1 py-3 px-4 rounded-xl text-b3 font-semibold transition-all",
                                    "bg-gradient-to-r from-gold-600 to-gold-500 text-void",
                                    "hover:shadow-glow-gold active:scale-[0.98]",
                                    "flex items-center justify-center gap-2",
                                    "disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:shadow-none"
                                )}
                            >
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                Issue {parsedRows.filter((r) => r.status === "pending").length} Credentials
                            </button>
                        </div>
                    </motion.div>
                )}

                {/* ─── Processing Stage ─────────────── */}
                {stage === "processing" && activeJob && (
                    <motion.div
                        key="processing"
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -16 }}
                    >
                        <BatchProgress job={activeJob} rows={parsedRows} credentialTypes={credentialTypes} />
                    </motion.div>
                )}

                {/* ─── Complete Stage ──────────────── */}
                {stage === "complete" && completedJob && (
                    <motion.div
                        key="complete"
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -16 }}
                        className="space-y-6"
                    >
                        {/* Summary */}
                        <div className="rounded-xl bg-surface-900/60 border border-surface-800 p-6 text-center space-y-4">
                            <div className="w-16 h-16 rounded-2xl bg-neon-500/10 border border-neon-500/20 flex items-center justify-center mx-auto">
                                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="text-neon-400">
                                    <path d="M6 14L11.5 19.5L22 8.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-h2 font-semibold text-white">Batch Complete</h3>
                                <p className="text-b3 text-surface-400 mt-1">
                                    All credentials have been processed
                                </p>
                            </div>

                            {/* Stats grid */}
                            <div className="grid grid-cols-3 gap-3 mt-4">
                                <div className="p-3 rounded-lg bg-surface-850 border border-surface-800/50">
                                    <p className="text-d4 text-white font-bold font-display">
                                        {completedJob.totalRows}
                                    </p>
                                    <p className="text-micro text-surface-400">Total</p>
                                </div>
                                <div className="p-3 rounded-lg bg-neon-500/5 border border-neon-500/15">
                                    <p className="text-d4 text-neon-400 font-bold font-display">
                                        {completedJob.successCount}
                                    </p>
                                    <p className="text-micro text-surface-400">Succeeded</p>
                                </div>
                                <div className="p-3 rounded-lg bg-crimson-500/5 border border-crimson-500/15">
                                    <p className="text-d4 text-crimson-400 font-bold font-display">
                                        {completedJob.failedCount}
                                    </p>
                                    <p className="text-micro text-surface-400">Failed</p>
                                </div>
                            </div>
                        </div>

                        {/* Result table */}
                        <CSVPreview rows={parsedRows} credentialTypes={credentialTypes} showResults />

                        {/* Action */}
                        <button
                            onClick={handleReset}
                            className="w-full py-3 px-4 rounded-xl text-b3 font-semibold bg-gradient-to-r from-gold-600 to-gold-500 text-void hover:shadow-glow-gold active:scale-[0.98] transition-all"
                        >
                            Start New Batch
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
