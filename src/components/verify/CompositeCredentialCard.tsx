"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { StatusIndicator } from "@/components/ui/StatusIndicator";
import { WalletAddress } from "@/components/ui/WalletAddress";

import type { Credential, CompositionRule, Issuer } from "@/lib/types";
import { formatTimestamp, getExplorerUrl } from "@/lib/utils";

interface Props {
  credential: Credential;
  components: Credential[];
  issuerVerified: boolean;
  issuerInfo?: Issuer;
  rule?: CompositionRule;
}

const ease = [0.16, 1, 0.3, 1] as const;

export const CompositeCredentialCard: React.FC<Props> = ({
  credential,
  components,
  issuerVerified,
  issuerInfo,
  rule,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card variant="golden" padding="none" className="overflow-hidden">
      <div
        className="p-5 sm:p-6 cursor-pointer group"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gold-500/10 border border-gold-500/14 text-gold-300 shadow-glow-gold flex items-center justify-center flex-shrink-0">
              <MarkCrown />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <StatusIndicator status="active" size="sm" label="Composite mastery" />
                <Badge variant="gold" size="sm" dot>Verified proof</Badge>
              </div>
              <h3 className="font-display text-h1 text-white leading-tight group-hover:text-gold-200 transition-colors">
                {credential.credentialTypeName}
              </h3>
              <p className="text-b3 text-surface-400 mt-1">
                Issued by {credential.issuerName} • {formatTimestamp(credential.issuedAt)}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between md:justify-end gap-6">
            <div className="text-right hidden sm:block">
              <p className="text-micro uppercase tracking-[0.22em] text-surface-500">Components</p>
              <p className="text-b2 font-semibold text-white mt-1">
                {components.length} / {rule?.requiredCredentialTypeIds.length || "?"}
              </p>
            </div>

            <div className={["w-10 h-10 rounded-2xl border border-surface-800 bg-surface-900/50 flex items-center justify-center text-surface-400 group-hover:text-white group-hover:border-surface-700 transition-all", isExpanded ? "rotate-180" : ""].join(" ")}>
              <MarkChevron />
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease }}
          >
            <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-surface-800/55">
              <div className="grid lg:grid-cols-2 gap-8 py-4">

                <div className="space-y-5">
                  <div>
                    <h4 className="text-micro uppercase tracking-[0.22em] text-surface-500 mb-4">Proof metadata</h4>
                    <div className="space-y-2">
                      <DetailRow label="Mastery ID" value={credential.id} mono />
                      <DetailRow label="ASA ID" value={String(credential.asaId)} mono />
                      <DetailRow label="Tx Reference" value={credential.txId || "n/a"} mono />
                    </div>
                  </div>

                  <div>
                    <h4 className="text-micro uppercase tracking-[0.22em] text-surface-500 mb-4">Issuer authority</h4>
                    <div className="panel rounded-2xl border border-surface-800/55 bg-surface-900/35 p-4">
                      <div className="flex items-center justify-between gap-4">
                        <div className="min-w-0">
                          <p className="text-b2 font-semibold text-white truncate">{issuerInfo?.name || credential.issuerName}</p>
                          <div className="mt-1">
                            <WalletAddress address={credential.issuerAddress} showCopy truncateChars={6} />
                          </div>
                        </div>
                        <StatusIndicator status={issuerVerified ? "verified" : "unverified"} size="sm" />
                      </div>
                    </div>
                  </div>
                </div>


                <div>
                  <h4 className="text-micro uppercase tracking-[0.22em] text-surface-500 mb-4">Composite structure</h4>
                  <div className="space-y-2">
                    {components.map((comp) => (
                      <div key={comp.id} className="flex items-center justify-between gap-4 p-3 rounded-2xl border border-surface-800/40 bg-surface-900/20">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-8 h-8 rounded-xl bg-electric-500/10 border border-electric-500/14 text-electric-300 flex items-center justify-center flex-shrink-0">
                            <MarkBadge />
                          </div>
                          <p className="text-b3 font-medium text-surface-200 truncate">{comp.credentialTypeName}</p>
                        </div>
                        <StatusIndicator status="active" size="sm" />
                      </div>
                    ))}
                    {rule && components.length < rule.requiredCredentialTypeIds.length && (
                      <div className="p-3 rounded-2xl border border-surface-800/40 border-dashed bg-surface-900/10 opacity-50">
                        <p className="text-b3 text-surface-500 text-center">Incomplete requirements</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-4 flex flex-col sm:flex-row gap-3 pt-6 border-t border-surface-800/30">
                <a
                  href={getExplorerUrl("asset", credential.asaId)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="panel rounded-2xl border border-surface-800/55 px-4 py-2.5 text-b3 text-surface-300 hover:text-gold-300 hover:border-gold-500/20 transition-all flex items-center justify-center gap-2"
                >
                  <MarkExplorer />
                  Inspect Mastery ASA
                </a>
                <a
                  href={getExplorerUrl("transaction", credential.txId || "")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="panel rounded-2xl border border-surface-800/55 px-4 py-2.5 text-b3 text-surface-300 hover:text-gold-300 hover:border-gold-500/20 transition-all flex items-center justify-center gap-2"
                >
                  <MarkExplorer />
                  View proof transaction
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
};

function DetailRow({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-4 py-2 border-b border-surface-800/30 last:border-0">
      <span className="text-b3 text-surface-500">{label}</span>
      <span className={[
        "text-b3 text-surface-300 truncate max-w-[60%] text-right",
        mono ? "font-mono" : ""
      ].join(" ")}>{value}</span>
    </div>
  );
}

/* Marks */
function MarkCrown() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-current">
      <path d="M6.2 9.2l3.1 3.2L12 8l2.7 4.4l3.1-3.2v8.6H6.2V9.2Z" stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round" />
      <path d="M6.2 17.8h11.6" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" opacity="0.7" />
    </svg>
  );
}

function MarkBadge() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-current">
      <path d="M12 3.5l7 4v8c0 4-3 6.8-7 8c-4-1.2-7-4-7-8v-8l7-4Z" stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round" opacity="0.85" />
      <path d="M9 12.2l2 2l4-4.2" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MarkChevron() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-current">
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MarkExplorer() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" className="text-current">
      <path d="M10 6h8v8" stroke="currentColor" strokeWidth="2.0" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18 6l-9.5 9.5" stroke="currentColor" strokeWidth="2.0" strokeLinecap="round" />
    </svg>
  );
}
