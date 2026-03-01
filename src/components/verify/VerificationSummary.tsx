"use client";

import React from "react";
import { StatusIndicator } from "@/components/ui/StatusIndicator";

interface SummaryData {
  totalCredentials: number;
  activeCredentials: number;
  revokedCredentials: number;
  compositeCredentials: number;
  allIssuersVerified: boolean;
}

interface Props {
  summary: SummaryData;
}

export const VerificationSummary: React.FC<Props> = ({ summary }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatBox
        label="Verified micros"
        value={String(summary.activeCredentials)}
        icon={<MarkBadge className="text-electric-300" />}
        description="Active micro-credentials"
      />
      <StatBox
        label="Mastery proofs"
        value={String(summary.compositeCredentials)}
        icon={<MarkCrown className="text-gold-300" />}
        description="Composite credentials"
      />
      <StatBox
        label="Risk profile"
        value={summary.revokedCredentials > 0 ? String(summary.revokedCredentials) : "Clean"}
        icon={<MarkShield className={summary.revokedCredentials > 0 ? "text-crimson-400" : "text-moss-400"} />}
        description={summary.revokedCredentials > 0 ? "Revoked credentials found" : "No revocations on record"}
      />

      <div className="panel-elevated rounded-3xl p-5 border border-surface-800/40 bg-surface-900/40">
        <div className="flex flex-col h-full justify-between">
          <div>
            <p className="text-micro uppercase tracking-[0.22em] text-surface-500">Issuer trust</p>
            <h4 className="mt-3 text-b2 font-semibold text-white leading-tight">
              {summary.allIssuersVerified ? "Authorized network" : "Mixed authority"}
            </h4>
          </div>
          <div className="mt-4 pt-4 border-t border-surface-800/30 flex items-center justify-between">
            <StatusIndicator status={summary.allIssuersVerified ? "verified" : "unverified"} size="sm" />
            <span className="text-cap text-surface-500">Registry audit</span>
          </div>
        </div>
      </div>
    </div>
  );
};

function StatBox({ label, value, icon, description }: { label: string; value: string; icon: React.ReactNode; description: string }) {
  return (
    <div className="panel rounded-3xl p-5 border border-surface-800/55 bg-surface-900/35">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-micro uppercase tracking-[0.22em] text-surface-500">{label}</p>
          <h3 className="mt-2 text-h1 font-display text-white">{value}</h3>
        </div>
        <div className="w-10 h-10 rounded-2xl bg-surface-800/20 border border-surface-700/30 flex items-center justify-center">
          {icon}
        </div>
      </div>
      <p className="mt-4 text-cap text-surface-500 leading-snug">{description}</p>
    </div>
  );
}

/* Marks */
function MarkBadge({ className }: { className?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M12 3.5l7 4v8c0 4-3 6.8-7 8c-4-1.2-7-4-7-8v-8l7-4Z" stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round" />
      <path d="M9 12.2l2 2l4-4.2" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MarkCrown({ className }: { className?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M6.2 9.2l3.1 3.2L12 8l2.7 4.4l3.1-3.2v8.6H6.2V9.2Z" stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round" />
      <path d="M6.2 17.8h11.6" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" opacity="0.7" />
    </svg>
  );
}

function MarkShield({ className }: { className?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M12 3l8 4.6v6.1c0 4.7-3.2 7.9-8 9.3c-4.8-1.4-8-4.6-8-9.3V7.6L12 3z" stroke="currentColor" strokeWidth="2.0" strokeLinejoin="round" />
    </svg>
  );
}
