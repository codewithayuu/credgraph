"use client";

import React from "react";
import { BatchIssueRow, CredentialType } from "@/lib/types";
import { cn, truncateAddress } from "@/lib/utils";

interface CSVPreviewProps {
    rows: BatchIssueRow[];
    credentialTypes: CredentialType[];
    showResults?: boolean;
}

export function CSVPreview({
    rows,
    credentialTypes,
    showResults = false,
}: CSVPreviewProps) {
    const getTypeName = (typeId: string) => {
        const t = credentialTypes.find((ct) => ct.id === typeId);
        return t?.name || typeId;
    };

    const getStatusDisplay = (row: BatchIssueRow) => {
        switch (row.status) {
            case "pending":
                return {
                    label: "Ready",
                    color: "text-gold-400",
                    bg: "bg-gold-500/8",
                    border: "border-gold-500/15",
                };
            case "processing":
                return {
                    label: "Processing",
                    color: "text-electric-400",
                    bg: "bg-electric-500/8",
                    border: "border-electric-500/15",
                };
            case "success":
                return {
                    label: "Success",
                    color: "text-neon-400",
                    bg: "bg-neon-500/8",
                    border: "border-neon-500/15",
                };
            case "failed":
                return {
                    label: "Failed",
                    color: "text-crimson-400",
                    bg: "bg-crimson-500/8",
                    border: "border-crimson-500/15",
                };
            case "skipped":
                return {
                    label: "Skipped",
                    color: "text-surface-500",
                    bg: "bg-surface-800",
                    border: "border-surface-700",
                };
            default:
                return {
                    label: "Unknown",
                    color: "text-surface-500",
                    bg: "bg-surface-800",
                    border: "border-surface-700",
                };
        }
    };

    return (
        <div className="rounded-xl bg-surface-900/60 border border-surface-800 overflow-hidden">
            {/* Table header */}
            <div className="grid grid-cols-12 gap-2 px-4 py-3 bg-surface-850 border-b border-surface-800/60 text-micro text-surface-500 font-semibold uppercase tracking-wider">
                <div className="col-span-1">#</div>
                <div className="col-span-3">Recipient</div>
                <div className="col-span-3">Credential Type</div>
                <div className="col-span-2">Evidence</div>
                <div className="col-span-1">Status</div>
                {showResults && <div className="col-span-2">Result</div>}
            </div>

            {/* Table rows */}
            <div className="max-h-80 overflow-y-auto divide-y divide-surface-800/40">
                {rows.map((row, i) => {
                    const statusDisplay = getStatusDisplay(row);
                    return (
                        <div
                            key={i}
                            className={cn(
                                "grid grid-cols-12 gap-2 px-4 py-2.5 text-micro",
                                "hover:bg-surface-850/50 transition-colors",
                                row.status === "skipped" && "opacity-50"
                            )}
                        >
                            <div className="col-span-1 text-surface-500 font-mono">{i + 1}</div>
                            <div className="col-span-3 text-surface-200 font-mono truncate">
                                {truncateAddress(row.recipientAddress, 8)}
                            </div>
                            <div className="col-span-3 text-surface-300 truncate">
                                {getTypeName(row.credentialTypeId)}
                            </div>
                            <div className="col-span-2 text-surface-500 truncate font-mono">
                                {row.evidenceHash ? truncateAddress(row.evidenceHash, 6) : "—"}
                            </div>
                            <div className="col-span-1">
                                <span
                                    className={cn(
                                        "text-micro px-1.5 py-0.5 rounded",
                                        statusDisplay.bg,
                                        statusDisplay.border,
                                        statusDisplay.color,
                                        "border"
                                    )}
                                >
                                    {statusDisplay.label}
                                </span>
                            </div>
                            {showResults && (
                                <div className="col-span-2 truncate">
                                    {row.status === "success" && row.credentialId && (
                                        <span className="text-micro text-neon-400 font-mono">
                                            {row.credentialId}
                                        </span>
                                    )}
                                    {row.status === "failed" && row.error && (
                                        <span className="text-micro text-crimson-400" title={row.error}>
                                            {row.error}
                                        </span>
                                    )}
                                    {row.status === "skipped" && row.error && (
                                        <span className="text-micro text-surface-500" title={row.error}>
                                            {row.error}
                                        </span>
                                    )}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Footer */}
            <div className="px-4 py-2.5 bg-surface-850 border-t border-surface-800/60 flex items-center justify-between">
                <span className="text-micro text-surface-500">
                    {rows.length} total rows
                </span>
                <div className="flex items-center gap-3">
                    <span className="text-micro text-neon-400">
                        {rows.filter((r) => r.status === "success").length} succeeded
                    </span>
                    <span className="text-micro text-crimson-400">
                        {rows.filter((r) => r.status === "failed").length} failed
                    </span>
                    <span className="text-micro text-surface-500">
                        {rows.filter((r) => r.status === "skipped").length} skipped
                    </span>
                </div>
            </div>
        </div>
    );
}
