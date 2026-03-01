"use client";

import React from "react";
import { EvidenceViewer } from "@/components/shared/EvidenceViewer";

interface EvidenceVerifierProps {
    evidenceHash?: string;
    evidenceUri?: string;
    credentialName: string;
}

/**
 * Wrapper around EvidenceViewer specifically for the verification page.
 * Adds context-specific heading and description.
 */
export function EvidenceVerifier({
    evidenceHash,
    evidenceUri,
    credentialName,
}: EvidenceVerifierProps) {
    return (
        <div className="space-y-3">
            <div className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-electric-400">
                    <rect x="2.5" y="2.5" width="11" height="11" rx="2" stroke="currentColor" strokeWidth="1.3" />
                    <path d="M5.5 8L7 9.5L10.5 6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <h4 className="text-b3 text-white font-medium">Evidence Proof</h4>
            </div>

            {evidenceHash ? (
                <>
                    <p className="text-micro text-surface-400">
                        This credential has anchored evidence. Upload the original file to verify its integrity against the on-chain hash.
                    </p>
                    <EvidenceViewer
                        evidenceHash={evidenceHash}
                        evidenceUri={evidenceUri}
                    />
                </>
            ) : (
                <div className="p-3 rounded-lg bg-surface-850 border border-surface-800/50">
                    <p className="text-micro text-surface-500">
                        No evidence was attached when this credential was issued.
                    </p>
                </div>
            )}
        </div>
    );
}
