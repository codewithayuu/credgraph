"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

import { useWallet } from "@/hooks/useWallet";
import { useCredentialStore } from "@/store/credentialStore";

import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { StatusIndicator } from "@/components/ui/StatusIndicator";
import { WalletAddress } from "@/components/ui/WalletAddress";

import { generateCredentialId } from "@/lib/utils";
import type { Credential } from "@/lib/types";

const ease = [0.16, 1, 0.3, 1] as const;

export const IssueCredentialTab: React.FC = () => {
  const { address } = useWallet();
  const {
    getCredentialTypesByIssuer,
    getIssuerByAddress,
    addCredential,
    getCompositionProgress,
    credentialTypes,
  } = useCredentialStore();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<{
    id: string;
    asaId: number;
    txId: string;
    recipient: string;
    typeId: string;
    typeName: string;
    compositeTriggered: boolean;
  } | null>(null);

  const [form, setForm] = useState({
    credentialTypeId: "",
    recipientAddress: "",
    evidenceHash: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const types = useMemo(() => (address ? getCredentialTypesByIssuer(address) : []), [address, getCredentialTypesByIssuer]);
  const issuerInfo = useMemo(() => (address ? getIssuerByAddress(address) : undefined), [address, getIssuerByAddress]);

  const typeOptions = useMemo(
    () =>
      types
        .filter((t) => t.status === "active")
        .map((t) => ({ value: t.id, label: `${t.name} (${t.id})` })),
    [types]
  );

  const selectedType = useMemo(() => types.find((t) => t.id === form.credentialTypeId), [types, form.credentialTypeId]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.credentialTypeId) newErrors.credentialTypeId = "Select a credential type";
    if (!form.recipientAddress.trim()) newErrors.recipientAddress = "Recipient address is required";
    if (form.recipientAddress.trim().length > 0 && form.recipientAddress.trim().length < 30) {
      newErrors.recipientAddress = "Enter a valid Algorand address";
    }
    if (selectedType?.evidenceRequired && !form.evidenceHash.trim()) {
      newErrors.evidenceHash = "Evidence is required for this credential type";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const issueMock = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1400));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!address) return;
    if (!validate()) return;

    setLoading(true);

    try {
      await issueMock();

      const credId = generateCredentialId();
      const asaId = Math.floor(Math.random() * 900000) + 100000;
      const txId = `TX${Date.now().toString(36).toUpperCase()}`;

      const typeName = selectedType?.name || "Unknown";
      const recipient = form.recipientAddress.trim();

      const newCredential: Credential = {
        id: credId,
        asaId,
        credentialTypeId: form.credentialTypeId,
        credentialTypeName: typeName,
        category: selectedType?.category || "technical",
        tier: selectedType?.tier || "beginner",
        issuerAddress: address,
        issuerName: issuerInfo?.name || "Unknown",
        recipientAddress: recipient,
        evidenceHash: form.evidenceHash.trim() || undefined,
        issuedAt: Math.floor(Date.now() / 1000),
        status: "active",
        txId,
      };

      addCredential(newCredential);

      // Composition trigger detection (mock mode)
      const progress = getCompositionProgress(recipient);
      const compositeTriggered = progress.some((p) => p.isEligible && !p.compositeCredential);

      if (compositeTriggered) {
        const eligibleRule = progress.find((p) => p.isEligible && !p.compositeCredential);
        if (eligibleRule) {
          const compositeType = credentialTypes.find((t) => t.id === eligibleRule.rule.compositeCredentialTypeId);
          if (compositeType) {
            const compositeCredential: Credential = {
              id: generateCredentialId(),
              asaId: Math.floor(Math.random() * 900000) + 100000,
              credentialTypeId: compositeType.id,
              credentialTypeName: compositeType.name,
              category: compositeType.category,
              tier: compositeType.tier,
              issuerAddress: address,
              issuerName: issuerInfo?.name || "Unknown",
              recipientAddress: recipient,
              issuedAt: Math.floor(Date.now() / 1000),
              status: "active",
              txId: `TX${Date.now().toString(36).toUpperCase()}COMP`,
            };
            addCredential(compositeCredential);
          }
        }
      }

      setSuccess({
        id: credId,
        asaId,
        txId,
        recipient,
        typeId: form.credentialTypeId,
        typeName,
        compositeTriggered,
      });

      toast.success("Credential issued successfully");
    } catch (err: any) {
      toast.error(err?.message || "Failed to issue credential");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setForm({ credentialTypeId: "", recipientAddress: "", evidenceHash: "" });
    setErrors({});
    setSuccess(null);
  };

  if (success) {
    return (
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease }}>
        <Card variant="golden" padding="lg" className="max-w-2xl mx-auto">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-gold-500/10 border border-gold-500/14 text-gold-300 shadow-glow-gold">
              <MarkSeal />
            </div>

            <h2 className="mt-5 font-display text-h1 text-white">Issued on Testnet</h2>
            <p className="mt-2 text-b1 text-surface-400 text-balance">
              The credential NFT has been minted and recorded with an on-chain transaction reference.
            </p>
          </div>

          <div className="mt-8 grid gap-3">
            <InfoRow label="Credential ID" value={success.id} mono />
            <InfoRow label="ASA ID" value={String(success.asaId)} mono />
            <InfoRow label="Type" value={`${success.typeName} (${success.typeId})`} />
            <div className="rounded-2xl border border-surface-800/55 bg-surface-900/45 p-4">
              <p className="text-micro uppercase tracking-[0.22em] text-surface-500">Recipient</p>
              <div className="mt-2">
                <WalletAddress address={success.recipient} showCopy showExplorer truncateChars={8} />
              </div>
            </div>
            <div className="flex items-center justify-between rounded-2xl border border-surface-800/55 bg-surface-900/45 p-4">
              <span className="text-b3 text-surface-400">Status</span>
              <StatusIndicator status="active" label="Active" />
            </div>
            <InfoRow label="Transaction" value={success.txId} mono />
          </div>

          {success.compositeTriggered && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.45, ease }}
              className="mt-7 panel rounded-3xl border border-neon-500/14 bg-gradient-to-br from-neon-500/8 to-transparent p-6"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-2xl bg-neon-500/10 border border-neon-500/14 flex items-center justify-center text-neon-300">
                  <MarkSpark />
                </div>
                <div>
                  <p className="text-micro uppercase tracking-[0.22em] text-neon-300">Composition trigger</p>
                  <h3 className="font-display text-h2 text-white mt-1">Composite credential auto-issued</h3>
                  <p className="text-b2 text-surface-400 mt-2">
                    This issuance completed a skill path. The mastery credential was minted automatically (mock mode).
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          <div className="mt-8 flex justify-center">
            <Button onClick={resetForm} size="lg" iconRight={<MarkArrow />}>
              Issue another credential
            </Button>
          </div>
        </Card>
      </motion.div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card variant="highlighted" padding="lg">
        <div className="flex items-start justify-between gap-6 mb-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-electric-500/10 border border-electric-500/14 text-electric-300 flex items-center justify-center">
              <MarkIssue />
            </div>
            <div>
              <h2 className="font-display text-h1 text-white leading-tight">Issue a credential</h2>
              <p className="text-b2 text-surface-400 mt-1">Mint a credential NFT and deliver it to a student wallet.</p>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-2">
            <Badge variant="electric" size="md" dot>
              Testnet
            </Badge>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <Select
            label="Credential Type"
            options={typeOptions}
            value={form.credentialTypeId}
            onChange={(e) => {
              setForm((prev) => ({ ...prev, credentialTypeId: e.target.value }));
              if (errors.credentialTypeId) setErrors((prev) => ({ ...prev, credentialTypeId: "" }));
            }}
            error={errors.credentialTypeId}
            placeholder="Select a credential type"
            required
          />

          {selectedType && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.25, ease }}
              className="rounded-2xl border border-surface-800/55 bg-surface-900/45 p-4 overflow-hidden"
            >
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-2xl bg-gold-500/10 border border-gold-500/14 text-gold-300 flex items-center justify-center">
                  <MarkDoc />
                </div>
                <div className="min-w-0">
                  <p className="text-b3 font-semibold text-surface-100 truncate">{selectedType.name}</p>
                  <p className="text-cap text-surface-500 mt-0.5 line-clamp-2">{selectedType.description}</p>
                </div>
              </div>
              {selectedType.evidenceRequired && (
                <div className="mt-3">
                  <Badge variant="gold" size="sm" dot>
                    Evidence required
                  </Badge>
                </div>
              )}
            </motion.div>
          )}

          <Input
            label="Recipient Wallet Address"
            placeholder="Enter student's Algorand wallet address"
            value={form.recipientAddress}
            onChange={(e) => {
              setForm((prev) => ({ ...prev, recipientAddress: e.target.value }));
              if (errors.recipientAddress) setErrors((prev) => ({ ...prev, recipientAddress: "" }));
            }}
            error={errors.recipientAddress}
            icon={<MarkWallet />}
            required
          />

          <Input
            label={selectedType?.evidenceRequired ? "Evidence Hash (Required)" : "Evidence Hash (Optional)"}
            placeholder="sha256:... or IPFS CID"
            value={form.evidenceHash}
            onChange={(e) => {
              setForm((prev) => ({ ...prev, evidenceHash: e.target.value }));
              if (errors.evidenceHash) setErrors((prev) => ({ ...prev, evidenceHash: "" }));
            }}
            error={errors.evidenceHash}
            icon={<MarkHash />}
            hint="Hash of a submission, project, or proof document."
            required={selectedType?.evidenceRequired}
          />

          {selectedType?.evidenceRequired && !form.evidenceHash && (
            <div className="rounded-2xl border border-gold-500/14 bg-gold-500/6 p-4">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-2xl border border-gold-500/14 bg-gold-500/10 text-gold-300 flex items-center justify-center">
                  <MarkWarn />
                </div>
                <div>
                  <p className="text-b3 font-semibold text-surface-100">Evidence required</p>
                  <p className="text-b3 text-surface-400 mt-1">
                    This type requires evidence. Provide a content hash or IPFS CID before issuing.
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="pt-5 border-t border-surface-800/55">
            <Button type="submit" loading={loading} fullWidth size="lg" icon={<MarkIssue />}>
              Issue credential on Algorand
            </Button>
            <p className="text-cap text-surface-500 text-center mt-3">
              Mock mint + registry write for demo. On-chain wiring can be enabled via services layer.
            </p>
          </div>
        </form>
      </Card>
    </div>
  );
};

function InfoRow({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-surface-800/55 bg-surface-900/45 p-4">
      <span className="text-b3 text-surface-400">{label}</span>
      <span className={mono ? "text-b3 text-surface-200 font-mono truncate max-w-[60%] text-right" : "text-b3 text-surface-200 truncate max-w-[60%] text-right"}>
        {value}
      </span>
    </div>
  );
}

/* Marks */
function MarkArrow() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-void">
      <path d="M5 12h12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MarkSeal() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" className="text-gold-300">
      <path
        d="M12 3l8 4.6v6.1c0 4.7-3.2 7.9-8 9.3c-4.8-1.4-8-4.6-8-9.3V7.6L12 3z"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinejoin="round"
        opacity="0.85"
      />
      <path d="M8.4 12.2l2.2 2.2l5.4-5.6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MarkSpark() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-neon-300">
      <path d="M13 2L4 14h8l-1 8 9-12h-8l1-8z" stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round" />
    </svg>
  );
}

function MarkIssue() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-current">
      <path d="M6 12h12" stroke="currentColor" strokeWidth="2.0" strokeLinecap="round" />
      <path d="M12 6l6 6-6 6" stroke="currentColor" strokeWidth="2.0" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MarkDoc() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-current">
      <path d="M7 4.8h7l3 3v11.4c0 .9-.7 1.6-1.6 1.6H7c-.9 0-1.6-.7-1.6-1.6V6.4c0-.9.7-1.6 1.6-1.6Z" stroke="currentColor" strokeWidth="1.9" />
      <path d="M14 4.8V8h3.2" stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round" />
      <path d="M9 12h6" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" opacity="0.8" />
      <path d="M9 15.8h5" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" opacity="0.6" />
    </svg>
  );
}

function MarkWallet() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-current">
      <path d="M6.2 7.6h11.6c1 0 1.8.8 1.8 1.8v7.2c0 1-.8 1.8-1.8 1.8H6.2c-1 0-1.8-.8-1.8-1.8V9.4c0-1 .8-1.8 1.8-1.8Z" stroke="currentColor" strokeWidth="2.0" />
      <path d="M15.2 12h4" stroke="currentColor" strokeWidth="2.0" strokeLinecap="round" />
      <path d="M9.2 7.6V6.2c0-1 .8-1.8 1.8-1.8h6.8" stroke="currentColor" strokeWidth="2.0" strokeLinecap="round" opacity="0.75" />
    </svg>
  );
}

function MarkHash() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-current">
      <path d="M9 3L7 21" stroke="currentColor" strokeWidth="2.0" strokeLinecap="round" />
      <path d="M17 3l-2 18" stroke="currentColor" strokeWidth="2.0" strokeLinecap="round" />
      <path d="M5 9h16" stroke="currentColor" strokeWidth="2.0" strokeLinecap="round" />
      <path d="M4 15h16" stroke="currentColor" strokeWidth="2.0" strokeLinecap="round" opacity="0.8" />
    </svg>
  );
}

function MarkWarn() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-current">
      <path d="M12 3l10 18H2L12 3Z" stroke="currentColor" strokeWidth="2.0" strokeLinejoin="round" opacity="0.9" />
      <path d="M12 9v5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M12 17.6h.01" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" />
    </svg>
  );
}
