"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useCredentialStore } from "@/store/credentialStore";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { StatusIndicator } from "@/components/ui/StatusIndicator";
import { Modal } from "@/components/ui/Modal";
import { EmptyState } from "@/components/ui/EmptyState";
import { WalletAddress } from "@/components/ui/WalletAddress";
import { Button } from "@/components/ui/Button";
import { Credential } from "@/lib/types";
import { CREDENTIAL_CATEGORIES, CREDENTIAL_TIERS } from "@/lib/constants";
import { formatTimestamp, getExplorerUrl } from "@/lib/utils";
import {
  Award,
  Crown,
  Tag,
  Layers,
  Calendar,
  ExternalLink,
  Hash,
  Building2,
  ShieldCheck,
  LayoutGrid,
} from "lucide-react";

interface Props {
  address: string;
}

export const CredentialsGrid: React.FC<Props> = ({ address }) => {
  const { getCredentialsByRecipient, getIssuerByAddress } = useCredentialStore();
  const [selectedCredential, setSelectedCredential] = useState<Credential | null>(null);

  const credentials = getCredentialsByRecipient(address);
  const composites = credentials.filter((c) => c.category === "certification" && c.tier === "expert");
  const micros = credentials.filter((c) => !(c.category === "certification" && c.tier === "expert"));

  if (credentials.length === 0) {
    return (
      <EmptyState
        icon={<LayoutGrid className="w-8 h-8 text-dark-500" />}
        title="No Credentials Yet"
        description="Your earned credentials will appear here. Ask your institution to issue credentials to your wallet address."
      />
    );
  }

  return (
    <div>
      {composites.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Crown className="w-5 h-5 text-amber-400" />
            <h3 className="text-heading-md font-bold text-white">Composite Credentials</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {composites.map((cred, i) => (
              <CredentialCard
                key={cred.id}
                credential={cred}
                index={i}
                isComposite
                onClick={() => setSelectedCredential(cred)}
              />
            ))}
          </div>
        </div>
      )}

      <div>
        <div className="flex items-center gap-2 mb-4">
          <Award className="w-5 h-5 text-brand-400" />
          <h3 className="text-heading-md font-bold text-white">Micro-Credentials</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {micros.map((cred, i) => (
            <CredentialCard
              key={cred.id}
              credential={cred}
              index={i}
              onClick={() => setSelectedCredential(cred)}
            />
          ))}
        </div>
      </div>

      <Modal
        isOpen={!!selectedCredential}
        onClose={() => setSelectedCredential(null)}
        title="Credential Details"
        size="lg"
      >
        {selectedCredential && <CredentialDetail credential={selectedCredential} />}
      </Modal>
    </div>
  );
};

function CredentialCard({
  credential,
  index,
  isComposite,
  onClick,
}: {
  credential: Credential;
  index: number;
  isComposite?: boolean;
  onClick: () => void;
}) {
  const catConfig = CREDENTIAL_CATEGORIES[credential.category];
  const tierConfig = CREDENTIAL_TIERS[credential.tier];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      <Card
        variant="interactive"
        padding="md"
        onClick={onClick}
        className={isComposite ? "border-amber-500/20 bg-amber-500/3" : ""}
      >
        <div className="flex items-start justify-between mb-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
            isComposite
              ? "bg-gradient-to-br from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/15"
              : `${catConfig?.bgColor || "bg-dark-800"}` 
          }`}>
            {isComposite ? (
              <Crown className="w-5 h-5" />
            ) : (
              <Award className={`w-5 h-5 ${catConfig?.color || "text-dark-400"}`} />
            )}
          </div>
          <StatusIndicator
            status={credential.status === "active" ? "active" : "revoked"}
            size="sm"
          />
        </div>

        <h3 className="text-body-lg font-semibold text-white mb-1 line-clamp-1">
          {credential.credentialTypeName}
        </h3>
        <p className="text-body-sm text-dark-400 mb-3 line-clamp-1">
          {credential.issuerName}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-3">
          <Badge variant="info" size="sm">{catConfig?.label || credential.category}</Badge>
          <Badge variant="brand" size="sm">{tierConfig?.label || credential.tier}</Badge>
        </div>

        <div className="flex items-center gap-1.5 text-caption text-dark-500">
          <Calendar className="w-3 h-3" />
          {formatTimestamp(credential.issuedAt)}
        </div>

        {credential.status === "revoked" && credential.revocationReason && (
          <div className="mt-3 p-2 rounded-lg bg-red-500/5 border border-red-500/10">
            <p className="text-caption text-red-400 line-clamp-1">
              Revoked: {credential.revocationReason}
            </p>
          </div>
        )}
      </Card>
    </motion.div>
  );
}

function CredentialDetail({ credential }: { credential: Credential }) {
  const { getIssuerByAddress } = useCredentialStore();
  const issuer = getIssuerByAddress(credential.issuerAddress);

  const details = [
    { label: "Credential ID", value: credential.id, mono: true },
    { label: "ASA ID", value: credential.asaId.toString(), mono: true },
    { label: "Type ID", value: credential.credentialTypeId, mono: true },
    { label: "Category", value: CREDENTIAL_CATEGORIES[credential.category]?.label || credential.category },
    { label: "Tier", value: CREDENTIAL_TIERS[credential.tier]?.label || credential.tier },
    { label: "Issued", value: formatTimestamp(credential.issuedAt) },
  ];

  if (credential.evidenceHash) {
    details.push({ label: "Evidence Hash", value: credential.evidenceHash, mono: true });
  }

  if (credential.status === "revoked") {
    details.push({ label: "Revoked", value: credential.revokedAt ? formatTimestamp(credential.revokedAt) : "Unknown" });
    details.push({ label: "Reason", value: credential.revocationReason || "No reason provided" });
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-brand-500 to-cyber-500 flex items-center justify-center text-white shadow-lg">
          <Award className="w-7 h-7" />
        </div>
        <div>
          <h3 className="text-heading-lg font-bold text-white">{credential.credentialTypeName}</h3>
          <StatusIndicator status={credential.status === "active" ? "active" : "revoked"} />
        </div>
      </div>

      <div className="p-4 rounded-xl bg-dark-800/40 border border-dark-700/30">
        <div className="flex items-center gap-2 mb-2">
          <Building2 className="w-4 h-4 text-brand-400" />
          <span className="text-body-sm font-medium text-dark-200">Issuer</span>
          {issuer && <StatusIndicator status="verified" size="sm" label="Verified" />}
        </div>
        <p className="text-body-md text-white">{credential.issuerName}</p>
        <WalletAddress address={credential.issuerAddress} showCopy showExplorer className="mt-1 text-caption" />
      </div>

      <div className="space-y-2">
        {details.map((d, i) => (
          <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-dark-800/20 border border-dark-700/15">
            <span className="text-body-sm text-dark-400">{d.label}</span>
            <span className={`text-body-sm text-dark-200 ${(d as any).mono ? "font-mono" : ""} text-right max-w-[60%] truncate`}>
              {d.value}
            </span>
          </div>
        ))}
      </div>

      {credential.txId && (
        <a
          href={getExplorerUrl("transaction", credential.txId)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full p-3 rounded-xl border border-dark-700/50 text-body-sm text-dark-300 hover:text-brand-400 hover:border-brand-500/30 transition-all"
        >
          <ExternalLink className="w-4 h-4" />
          View on Algorand Explorer
        </a>
      )}
    </div>
  );
}
