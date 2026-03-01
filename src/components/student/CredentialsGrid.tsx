"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";

import { useCredentialStore } from "@/store/credentialStore";

import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { StatusIndicator } from "@/components/ui/StatusIndicator";
import { Modal } from "@/components/ui/Modal";
import { EmptyState } from "@/components/ui/EmptyState";
import { WalletAddress } from "@/components/ui/WalletAddress";

import type { Credential } from "@/lib/types";
import { formatTimestamp, getExplorerUrl } from "@/lib/utils";

interface Props {
  address: string;
}

export const CredentialsGrid: React.FC<Props> = ({ address }) => {
  const { getCredentialsByRecipient, getIssuerByAddress } = useCredentialStore();
  const [selected, setSelected] = useState<Credential | null>(null);

  const credentials = useMemo(() => getCredentialsByRecipient(address), [address, getCredentialsByRecipient]);

  const { composites, micros } = useMemo(() => {
    const isComposite = (c: Credential) => c.category === "certification" && c.tier === "expert";
    return {
      composites: credentials.filter(isComposite),
      micros: credentials.filter((c) => !isComposite(c)),
    };
  }, [credentials]);

  if (credentials.length === 0) {
    return (
      <EmptyState
        icon={<MarkGrid className="w-8 h-8 text-surface-500" />}
        title="No credentials yet"
        description="When an institution issues credentials to your wallet address, they will appear here."
      />
    );
  }

  return (
    <div className="space-y-10">
      {composites.length > 0 && (
        <section>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-2xl bg-gold-500/10 border border-gold-500/14 text-gold-300 flex items-center justify-center">
              <MarkCrown />
            </div>
            <div>
              <h3 className="font-display text-h1 text-white leading-tight">Composite credentials</h3>
              <p className="text-b3 text-surface-500 mt-1">Mastery credentials composed from verified micros.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {composites.map((cred, i) => (
              <CredentialCard
                key={cred.id}
                credential={cred}
                index={i}
                composite
                onClick={() => setSelected(cred)}
              />
            ))}
          </div>
        </section>
      )}

      <section>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-2xl bg-electric-500/10 border border-electric-500/14 text-electric-300 flex items-center justify-center">
            <MarkBadge />
          </div>
          <div>
            <h3 className="font-display text-h1 text-white leading-tight">Micro-credentials</h3>
            <p className="text-b3 text-surface-500 mt-1">Portable proofs minted by issuers, owned by you.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {micros.map((cred, i) => (
            <CredentialCard key={cred.id} credential={cred} index={i} onClick={() => setSelected(cred)} />
          ))}
        </div>
      </section>

      <Modal isOpen={!!selected} onClose={() => setSelected(null)} title="Credential details" size="lg">
        {selected && <CredentialDetail credential={selected} issuerVerified={!!getIssuerByAddress(selected.issuerAddress)} />}
      </Modal>
    </div>
  );
};

function CredentialCard({
  credential,
  index,
  composite,
  onClick,
}: {
  credential: Credential;
  index: number;
  composite?: boolean;
  onClick: () => void;
}) {
  const isRevoked = credential.status === "revoked";
  const cat = categoryMeta(credential.category);
  const tier = tierMeta(credential.tier);

  return (
    <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: index * 0.05 }}>
      <Card
        variant="interactive"
        padding="md"
        onClick={onClick}
        className={[
          "overflow-hidden",
          composite ? "border-gold-500/14 bg-gradient-to-br from-gold-500/8 to-transparent" : "",
          isRevoked ? "border-crimson-500/14 bg-gradient-to-br from-crimson-500/10 to-transparent" : "",
        ].join(" ")}
      >
        <div className="flex items-start justify-between gap-4 mb-4">
          <div
            className={[
              "w-12 h-12 rounded-2xl border border-white/6 flex items-center justify-center",
              composite ? "bg-gold-500/10 text-gold-300" : `bg-surface-900/35 ${cat.ink}`,
            ].join(" ")}
          >
            {composite ? <MarkCrown /> : cat.mark}
          </div>

          <StatusIndicator status={isRevoked ? "revoked" : "active"} size="sm" />
        </div>

        <h4 className={["text-b2 font-semibold leading-snug", isRevoked ? "text-surface-400 line-through decoration-crimson-500/30" : "text-white"].join(" ")}>
          {credential.credentialTypeName}
        </h4>

        <p className="text-b3 text-surface-500 mt-1 line-clamp-1">{credential.issuerName}</p>

        <div className="flex flex-wrap gap-2 mt-4">
          <Badge variant={composite ? "gold" : cat.badge} size="sm">
            {cat.label}
          </Badge>
          <Badge variant={composite ? "gold" : tier.badge} size="sm">
            {tier.label}
          </Badge>
        </div>

        <div className="mt-4 flex items-center gap-2 text-cap text-surface-500">
          <span className="text-surface-500">
            <MarkCalendar />
          </span>
          <span>{formatTimestamp(credential.issuedAt)}</span>
        </div>

        {isRevoked && credential.revocationReason && (
          <div className="mt-4 rounded-2xl border border-crimson-500/12 bg-crimson-500/8 p-3">
            <p className="text-cap text-crimson-300 line-clamp-2">
              Revoked: {credential.revocationReason}
            </p>
          </div>
        )}
      </Card>
    </motion.div>
  );
}

function CredentialDetail({ credential, issuerVerified }: { credential: Credential; issuerVerified: boolean }) {
  const isRevoked = credential.status === "revoked";
  const cat = categoryMeta(credential.category);
  const tier = tierMeta(credential.tier);

  const details: Array<{ label: string; value: string; mono?: boolean }> = [
    { label: "Credential ID", value: credential.id, mono: true },
    { label: "ASA ID", value: String(credential.asaId), mono: true },
    { label: "Type ID", value: credential.credentialTypeId, mono: true },
    { label: "Category", value: cat.label },
    { label: "Tier", value: tier.label },
    { label: "Issued", value: formatTimestamp(credential.issuedAt) },
  ];

  if (credential.evidenceHash) details.push({ label: "Evidence", value: credential.evidenceHash, mono: true });
  if (isRevoked) {
    details.push({ label: "Revoked", value: credential.revokedAt ? formatTimestamp(credential.revokedAt) : "Unknown" });
    details.push({ label: "Reason", value: credential.revocationReason || "No reason provided" });
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start gap-4">
        <div className={["w-14 h-14 rounded-2xl border border-white/6 flex items-center justify-center", isRevoked ? "bg-crimson-500/10 text-crimson-300" : `bg-surface-900/35 ${cat.ink}`].join(" ")}>
          {isRevoked ? <MarkX /> : cat.markLarge}
        </div>

        <div className="min-w-0">
          <h3 className="font-display text-h1 text-white leading-tight">{credential.credentialTypeName}</h3>
          <div className="mt-2 flex items-center gap-2 flex-wrap">
            <StatusIndicator status={isRevoked ? "revoked" : "active"} />
            <Badge variant={cat.badge} size="sm">{cat.label}</Badge>
            <Badge variant={tier.badge} size="sm">{tier.label}</Badge>
          </div>
        </div>
      </div>

      <div className="panel rounded-3xl border border-surface-800/50 p-5">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <p className="text-micro uppercase tracking-[0.22em] text-surface-500">Issuer</p>
            <p className="text-b2 text-white mt-2">{credential.issuerName}</p>
            <div className="mt-2">
              <WalletAddress address={credential.issuerAddress} showCopy showExplorer truncateChars={8} />
            </div>
          </div>

          <StatusIndicator status={issuerVerified ? "verified" : "unverified"} size="sm" label={issuerVerified ? "Verified issuer" : "Unregistered issuer"} />
        </div>
      </div>

      <div className="space-y-2">
        {details.map((d) => (
          <div key={d.label} className="flex items-center justify-between gap-4 rounded-2xl border border-surface-800/55 bg-surface-900/45 p-4">
            <span className="text-b3 text-surface-400">{d.label}</span>
            <span className={d.mono ? "text-b3 text-surface-200 font-mono max-w-[60%] truncate text-right" : "text-b3 text-surface-200 max-w-[60%] truncate text-right"}>
              {d.value}
            </span>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
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
  );
}

/* Local, safe mapping (no dependency on constants export names) */
function categoryMeta(category: string): {
  label: string;
  badge: "azure" | "violet" | "electric" | "gold" | "default";
  ink: string;
  mark: React.ReactNode;
  markLarge: React.ReactNode;
} {
  const c = (category || "").toLowerCase();

  if (c === "technical") {
    return { label: "Technical", badge: "azure", ink: "text-azure-300", mark: <MarkTech />, markLarge: <MarkTech large /> };
  }
  if (c === "soft_skill" || c === "soft") {
    return { label: "Soft skill", badge: "violet", ink: "text-violet-300", mark: <MarkSoft />, markLarge: <MarkSoft large /> };
  }
  if (c === "participation") {
    return { label: "Participation", badge: "electric", ink: "text-electric-300", mark: <MarkFlag />, markLarge: <MarkFlag large /> };
  }
  if (c === "certification") {
    return { label: "Certification", badge: "gold", ink: "text-gold-300", mark: <MarkCrown />, markLarge: <MarkCrown large /> };
  }

  return { label: category || "Credential", badge: "default", ink: "text-surface-300", mark: <MarkBadge />, markLarge: <MarkBadge large /> };
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

function MarkCalendar() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-current">
      <path d="M7 4.8v2.4M17 4.8v2.4" stroke="currentColor" strokeWidth="2.0" strokeLinecap="round" />
      <path d="M6.2 8.2h11.6" stroke="currentColor" strokeWidth="2.0" strokeLinecap="round" opacity="0.8" />
      <path d="M6.2 6.6h11.6c1 0 1.8.8 1.8 1.8v9.4c0 1-.8 1.8-1.8 1.8H6.2c-1 0-1.8-.8-1.8-1.8V8.4c0-1 .8-1.8 1.8-1.8Z" stroke="currentColor" strokeWidth="1.8" opacity="0.7" />
    </svg>
  );
}

function MarkX() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-current">
      <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M6 6l12 12" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

function MarkGrid({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path d="M4.8 4.8h6.8v6.8H4.8V4.8Z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12.4 4.8h6.8v6.8h-6.8V4.8Z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12.4 12.4h6.8v6.8h-6.8v-6.8Z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M4.8 12.4h6.8v6.8H4.8v-6.8Z" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function MarkCrown({ large }: { large?: boolean }) {
  return (
    <svg width={large ? 26 : 20} height={large ? 26 : 20} viewBox="0 0 24 24" fill="none" className="text-current">
      <path d="M6.2 9.2l3.1 3.2L12 8l2.7 4.4l3.1-3.2v8.6H6.2V9.2Z" stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round" />
      <path d="M6.2 17.8h11.6" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" opacity="0.7" />
    </svg>
  );
}

function MarkBadge({ large }: { large?: boolean }) {
  return (
    <svg width={large ? 26 : 20} height={large ? 26 : 20} viewBox="0 0 24 24" fill="none" className="text-current">
      <path d="M12 3.5l7 4v8c0 4-3 6.8-7 8c-4-1.2-7-4-7-8v-8l7-4Z" stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round" opacity="0.85" />
      <path d="M9 12.2l2 2l4-4.2" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MarkTech({ large }: { large?: boolean }) {
  return (
    <svg width={large ? 26 : 20} height={large ? 26 : 20} viewBox="0 0 24 24" fill="none" className="text-current">
      <path d="M7.2 7.6l4.8-2.8l4.8 2.8v5.5l-4.8 2.8l-4.8-2.8V7.6Z" stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round" />
      <path d="M12 4.8v10.9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity="0.55" />
    </svg>
  );
}

function MarkSoft({ large }: { large?: boolean }) {
  return (
    <svg width={large ? 26 : 20} height={large ? 26 : 20} viewBox="0 0 24 24" fill="none" className="text-current">
      <path d="M8.2 12a3.8 3.8 0 1 1 7.6 0c0 3.3-2.2 6.2-3.8 7.5C10.4 18.2 8.2 15.3 8.2 12Z" stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round" />
      <path d="M12 9.2h.01" stroke="currentColor" strokeWidth="3.0" strokeLinecap="round" opacity="0.7" />
    </svg>
  );
}

function MarkFlag({ large }: { large?: boolean }) {
  return (
    <svg width={large ? 26 : 20} height={large ? 26 : 20} viewBox="0 0 24 24" fill="none" className="text-current">
      <path d="M6.8 20V5.2" stroke="currentColor" strokeWidth="2.0" strokeLinecap="round" />
      <path d="M6.8 6.2h9l-1.2 3.2l1.2 3.2h-9" stroke="currentColor" strokeWidth="2.0" strokeLinejoin="round" opacity="0.85" />
    </svg>
  );
}
