"use client";

import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { StatusIndicator } from "@/components/ui/StatusIndicator";
import { WalletAddress } from "@/components/ui/WalletAddress";

import type { Credential, Issuer } from "@/lib/types";
import { formatTimestamp, getExplorerUrl } from "@/lib/utils";

interface Props {
  credential: Credential;
  issuerVerified: boolean;
  issuerInfo?: Issuer;
}

const ease = [0.16, 1, 0.3, 1] as const;

export const VerifiedCredentialCard: React.FC<Props> = ({ credential, issuerVerified }) => {
  const [expanded, setExpanded] = useState(false);
  const isRevoked = credential.status === "revoked";

  const cat = useMemo(() => categoryMeta(credential.category), [credential.category]);
  const tier = useMemo(() => tierMeta(credential.tier), [credential.tier]);

  return (
    <Card
      variant="interactive"
      padding="none"
      onClick={() => setExpanded((v) => !v)}
      className={[
        "overflow-hidden",
        isRevoked ? "border-crimson-500/14 bg-gradient-to-br from-crimson-500/10 to-transparent" : "",
      ].join(" ")}
    >
      <div className="p-5">
        <div className="flex items-start gap-4">
          <div
            className={[
              "w-12 h-12 rounded-2xl border border-white/6 flex items-center justify-center flex-shrink-0",
              isRevoked ? "bg-crimson-500/10 text-crimson-300" : `bg-surface-900/35 ${cat.ink}`,
            ].join(" ")}
          >
            {isRevoked ? <MarkX /> : cat.mark}
          </div>

          <div className="flex-1 min-w-0">
            <h3 className={["text-b2 font-semibold truncate", isRevoked ? "text-surface-400 line-through decoration-crimson-500/30" : "text-white"].join(" ")}>
              {credential.credentialTypeName}
            </h3>

            <div className="mt-2 flex items-center gap-2 flex-wrap">
              <span className="text-b3 text-surface-500 truncate">{credential.issuerName}</span>
              <StatusIndicator status={issuerVerified ? "verified" : "unverified"} size="sm" />
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              <Badge variant={cat.badge} size="sm">
                {cat.label}
              </Badge>
              <Badge variant={tier.badge} size="sm">
                {tier.label}
              </Badge>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            <StatusIndicator status={isRevoked ? "revoked" : "active"} size="md" />
            <motion.div animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.22, ease }}>
              <MarkChevron />
            </motion.div>
          </div>
        </div>

        {isRevoked && credential.revocationReason && (
          <div className="mt-4 rounded-2xl border border-crimson-500/12 bg-crimson-500/8 p-4">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="crimson" size="sm" dot>
                Revoked
              </Badge>
              {credential.revokedAt && <span className="text-cap text-surface-500">on {formatTimestamp(credential.revokedAt)}</span>}
            </div>
            <p className="text-b3 text-crimson-300 mt-2 leading-relaxed">{credential.revocationReason}</p>
          </div>
        )}
      </div>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.26, ease }}
            className="overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-5 pb-5 pt-4 border-t border-surface-800/55">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <DetailRow label="Credential ID" value={credential.id} mono />
                  <DetailRow label="ASA ID" value={String(credential.asaId)} mono />
                  <DetailRow label="Type ID" value={credential.credentialTypeId} mono />
                  <DetailRow label="Issued" value={formatTimestamp(credential.issuedAt)} />
                  {credential.evidenceHash && <DetailRow label="Evidence" value={credential.evidenceHash} mono />}
                </div>

                <div className="space-y-3">
                  <div className="panel rounded-3xl border border-surface-800/50 p-4">
                    <p className="text-micro uppercase tracking-[0.22em] text-surface-500">Issuer</p>
                    <p className="text-b2 text-white mt-2">{credential.issuerName}</p>

                    <div className="mt-2">
                      <WalletAddress address={credential.issuerAddress} showCopy truncateChars={6} />
                    </div>

                    <div className="mt-3">
                      <StatusIndicator
                        status={issuerVerified ? "verified" : "warning"}
                        size="sm"
                        label={issuerVerified ? "Registered issuer (on-chain)" : "Not found in issuer registry"}
                      />
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Badge variant={cat.badge} size="sm">
                      {cat.label}
                    </Badge>
                    <Badge variant={tier.badge} size="sm">
                      {tier.label}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex flex-col sm:flex-row gap-3">
                {credential.txId && (
                  <a
                    href={getExplorerUrl("transaction", credential.txId)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="panel rounded-2xl border border-surface-800/55 px-4 py-3 text-b3 text-surface-300 hover:text-gold-300 hover:border-gold-500/18 transition-colors inline-flex items-center justify-center gap-2"
                  >
                    <MarkExternal />
                    View transaction
                  </a>
                )}

                <a
                  href={getExplorerUrl("asset", credential.asaId)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="panel rounded-2xl border border-surface-800/55 px-4 py-3 text-b3 text-surface-300 hover:text-gold-300 hover:border-gold-500/18 transition-colors inline-flex items-center justify-center gap-2"
                >
                  <MarkExternal />
                  View ASA
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
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-surface-800/55 bg-surface-900/45 p-4">
      <span className="text-b3 text-surface-400">{label}</span>
      <span className={mono ? "text-b3 text-surface-200 font-mono max-w-[55%] truncate text-right" : "text-b3 text-surface-200 max-w-[55%] truncate text-right"}>
        {value}
      </span>
    </div>
  );
}

/* local mapping (safe) */
function categoryMeta(category: string): { label: string; badge: "azure" | "violet" | "electric" | "gold" | "default"; ink: string; mark: React.ReactNode } {
  const c = (category || "").toLowerCase();
  if (c === "technical") return { label: "Technical", badge: "azure", ink: "text-azure-300", mark: <MarkTech /> };
  if (c === "soft_skill" || c === "soft") return { label: "Soft skill", badge: "violet", ink: "text-violet-300", mark: <MarkSoft /> };
  if (c === "participation") return { label: "Participation", badge: "electric", ink: "text-electric-300", mark: <MarkFlag /> };
  if (c === "certification") return { label: "Certification", badge: "gold", ink: "text-gold-300", mark: <MarkCrown /> };
  return { label: category || "Credential", badge: "default", ink: "text-surface-300", mark: <MarkBadge /> };
}

function tierMeta(tier: string): { label: string; badge: "default" | "electric" | "azure" | "gold" } {
  const t = (tier || "").toLowerCase();
  if (t === "beginner") return { label: "Beginner", badge: "default" };
  if (t === "intermediate") return { label: "Intermediate", badge: "electric" };
  if (t === "advanced") return { label: "Advanced", badge: "azure" };
  if (t === "expert" || t === "mastery") return { label: "Expert", badge: "gold" };
  return { label: tier || "Tier", badge: "default" };
}

/* Marks */
function MarkExternal() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-current">
      <path d="M10 6h8v8" stroke="currentColor" strokeWidth="2.0" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18 6l-9.5 9.5" stroke="currentColor" strokeWidth="2.0" strokeLinecap="round" />
      <path d="M8 6H7.2C6 6 5 7 5 8.2v8.6C5 18 6 19 7.2 19h8.6c1.2 0 2.2-1 2.2-2.2V16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" opacity="0.65" />
    </svg>
  );
}

function MarkChevron() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-surface-500">
      <path d="M6 10l6 6l6-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MarkX() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-current">
      <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M6 6l12 12" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

function MarkCrown() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-current">
      <path d="M6.2 9.2l3.1 3.2L12 8l2.7 4.4l3.1-3.2v8.6H6.2V9.2Z" stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round" />
      <path d="M6.2 17.8h11.6" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" opacity="0.7" />
    </svg>
  );
}

function MarkBadge() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-current">
      <path d="M12 3.5l7 4v8c0 4-3 6.8-7 8c-4-1.2-7-4-7-8v-8l7-4Z" stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round" opacity="0.85" />
      <path d="M9 12.2l2 2l4-4.2" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MarkTech() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-current">
      <path d="M7.2 7.6l4.8-2.8l4.8 2.8v5.5l-4.8 2.8l-4.8-2.8V7.6Z" stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round" />
      <path d="M12 4.8v10.9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity="0.55" />
    </svg>
  );
}

function MarkSoft() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-current">
      <path d="M8.2 12a3.8 3.8 0 1 1 7.6 0c0 3.3-2.2 6.2-3.8 7.5C10.4 18.2 8.2 15.3 8.2 12Z" stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round" />
      <path d="M12 9.2h.01" stroke="currentColor" strokeWidth="3.0" strokeLinecap="round" opacity="0.7" />
    </svg>
  );
}

function MarkFlag() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-current">
      <path d="M6.8 20V5.2" stroke="currentColor" strokeWidth="2.0" strokeLinecap="round" />
      <path d="M6.8 6.2h9l-1.2 3.2l1.2 3.2h-9" stroke="currentColor" strokeWidth="2.0" strokeLinejoin="round" opacity="0.85" />
    </svg>
  );
}
