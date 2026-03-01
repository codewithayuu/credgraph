"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useWallet } from "@/hooks/useWallet";
import { useCredentialStore } from "@/store/credentialStore";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { generateCredentialId } from "@/lib/utils";
import { Credential } from "@/lib/types";
import toast from "react-hot-toast";
import {
  Send,
  Wallet,
  Hash,
  FileText,
  CheckCircle2,
  ExternalLink,
  ArrowRight,
  Sparkles,
  AlertTriangle,
} from "lucide-react";

export const IssueCredentialTab: React.FC = () => {
  const { address } = useWallet();
  const {
    getCredentialTypesByIssuer,
    getIssuerByAddress,
    addCredential,
    getCompositionProgress,
    compositionRules,
    credentialTypes,
  } = useCredentialStore();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<{ id: string; asaId: number; compositeTriggered: boolean } | null>(null);
  const [form, setForm] = useState({
    credentialTypeId: "",
    recipientAddress: "",
    evidenceHash: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const types = address ? getCredentialTypesByIssuer(address) : [];
  const issuerInfo = address ? getIssuerByAddress(address) : undefined;

  const typeOptions = types
    .filter((t) => t.status === "active")
    .map((t) => ({ value: t.id, label: `${t.name} (${t.id})` }));

  const selectedType = types.find((t) => t.id === form.credentialTypeId);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.credentialTypeId) newErrors.credentialTypeId = "Select a credential type";
    if (!form.recipientAddress.trim()) newErrors.recipientAddress = "Recipient address is required";
    if (form.recipientAddress.length > 0 && form.recipientAddress.length < 30)
      newErrors.recipientAddress = "Enter a valid Algorand address";
    if (selectedType?.evidenceRequired && !form.evidenceHash.trim())
      newErrors.evidenceHash = "Evidence is required for this credential type";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate() || !address) return;

    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    const credId = generateCredentialId();
    const asaId = Math.floor(Math.random() * 900000) + 100000;
    const typeName = selectedType?.name || "Unknown";

    const newCredential: Credential = {
      id: credId,
      asaId,
      credentialTypeId: form.credentialTypeId,
      credentialTypeName: typeName,
      category: selectedType?.category || "technical",
      tier: selectedType?.tier || "beginner",
      issuerAddress: address,
      issuerName: issuerInfo?.name || "Unknown",
      recipientAddress: form.recipientAddress,
      evidenceHash: form.evidenceHash || undefined,
      issuedAt: Math.floor(Date.now() / 1000),
      status: "active",
      txId: `TX${Date.now().toString(36).toUpperCase()}`,
    };

    addCredential(newCredential);

    const progress = getCompositionProgress(form.recipientAddress);
    const compositeTriggered = progress.some(
      (p) => p.isEligible && !p.compositeCredential
    );

    if (compositeTriggered) {
      const eligibleRule = progress.find((p) => p.isEligible && !p.compositeCredential);
      if (eligibleRule) {
        const compositeType = credentialTypes.find(
          (t) => t.id === eligibleRule.rule.compositeCredentialTypeId
        );
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
            recipientAddress: form.recipientAddress,
            issuedAt: Math.floor(Date.now() / 1000),
            status: "active",
            txId: `TX${Date.now().toString(36).toUpperCase()}COMP`,
          };
          addCredential(compositeCredential);
        }
      }
    }

    setSuccess({ id: credId, asaId, compositeTriggered });
    toast.success(`Credential issued successfully!`);
    setLoading(false);
  };

  const resetForm = () => {
    setForm({ credentialTypeId: "", recipientAddress: "", evidenceHash: "" });
    setErrors({});
    setSuccess(null);
  };

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card variant="gradient" padding="lg" className="max-w-2xl mx-auto text-center">
          <div className="w-16 h-16 rounded-2xl bg-accent-500/15 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-8 h-8 text-accent-400" />
          </div>

          <h2 className="text-heading-xl font-bold text-white mb-2">
            Credential Issued Successfully
          </h2>
          <p className="text-body-md text-dark-400 mb-8">
            The credential NFT has been minted on Algorand and registered in the Credential Registry.
          </p>

          <div className="space-y-3 mb-8">
            <div className="flex items-center justify-between p-3 rounded-xl bg-dark-800/40 border border-dark-700/30">
              <span className="text-body-sm text-dark-400">Credential ID</span>
              <span className="text-body-sm font-mono text-dark-200">{success.id}</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-dark-800/40 border border-dark-700/30">
              <span className="text-body-sm text-dark-400">ASA ID</span>
              <span className="text-body-sm font-mono text-dark-200">{success.asaId}</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-dark-800/40 border border-dark-700/30">
              <span className="text-body-sm text-dark-400">Status</span>
              <Badge variant="success" dot pulse>Active</Badge>
            </div>
          </div>

          {success.compositeTriggered && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 mb-8"
            >
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span className="text-body-md font-semibold text-amber-300">
                  Composite Credential Auto-Triggered!
                </span>
              </div>
              <p className="text-body-md text-dark-400">
                This issuance completed a skill path. A composite mastery credential has been automatically issued.
              </p>
            </motion.div>
          )}

          <Button onClick={resetForm} icon={<ArrowRight className="w-4 h-4" />}>
            Issue Another Credential
          </Button>
        </Card>
      </motion.div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card variant="highlight" padding="lg">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-cyber-500 flex items-center justify-center text-white">
            <Send className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-heading-lg font-bold text-white">Issue a Credential</h2>
            <p className="text-body-sm text-dark-400">
              Mint a credential NFT and deliver it to a student wallet
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <Select
            label="Credential Type"
            options={typeOptions}
            value={form.credentialTypeId}
            onChange={(e) => {
              setForm((prev) => ({ ...prev, credentialTypeId: e.target.value }));
              if (errors.credentialTypeId)
                setErrors((prev) => ({ ...prev, credentialTypeId: "" }));
            }}
            error={errors.credentialTypeId}
            placeholder="Select a credential type"
            required
          />

          {selectedType && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="p-3 rounded-xl bg-brand-500/5 border border-brand-500/15"
            >
              <div className="flex items-center gap-2 mb-1">
                <FileText className="w-3.5 h-3.5 text-brand-400" />
                <span className="text-body-sm font-medium text-brand-300">{selectedType.name}</span>
              </div>
              <p className="text-caption text-dark-500">{selectedType.description}</p>
            </motion.div>
          )}

          <Input
            label="Recipient Wallet Address"
            placeholder="Enter student's Algorand wallet address"
            value={form.recipientAddress}
            onChange={(e) => {
              setForm((prev) => ({ ...prev, recipientAddress: e.target.value }));
              if (errors.recipientAddress)
                setErrors((prev) => ({ ...prev, recipientAddress: "" }));
            }}
            error={errors.recipientAddress}
            icon={<Wallet className="w-4 h-4" />}
            required
          />

          <Input
            label={selectedType?.evidenceRequired ? "Evidence Hash (Required)" : "Evidence Hash (Optional)"}
            placeholder="sha256:abc123... or IPFS CID"
            value={form.evidenceHash}
            onChange={(e) => {
              setForm((prev) => ({ ...prev, evidenceHash: e.target.value }));
              if (errors.evidenceHash)
                setErrors((prev) => ({ ...prev, evidenceHash: "" }));
            }}
            error={errors.evidenceHash}
            icon={<Hash className="w-4 h-4" />}
            hint="Hash of the student's project, submission, or proof document"
            required={selectedType?.evidenceRequired}
          />

          {selectedType?.evidenceRequired && !form.evidenceHash && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-amber-500/5 border border-amber-500/15">
              <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span className="text-body-sm text-amber-300">
                This credential type requires evidence. Provide a hash or IPFS CID.
              </span>
            </div>
          )}

          <div className="pt-4 border-t border-dark-700/50">
            <Button
              type="submit"
              loading={loading}
              icon={<Send className="w-4 h-4" />}
              fullWidth
              size="lg"
              className="shadow-xl"
            >
              Issue Credential on Algorand
            </Button>
            <p className="text-caption text-dark-600 text-center mt-3">
              This will create an NFT (ASA) on Algorand Testnet and register it in the Credential Registry
            </p>
          </div>
        </form>
      </Card>
    </div>
  );
};
