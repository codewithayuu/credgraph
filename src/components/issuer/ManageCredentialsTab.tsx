"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useWallet } from "@/hooks/useWallet";
import { useCredentialStore } from "@/store/credentialStore";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import { Modal } from "@/components/ui/Modal";
import { WalletAddress } from "@/components/ui/WalletAddress";
import { formatTimestamp, getExplorerUrl } from "@/lib/utils";
import {
  Ban,
  ExternalLink,
  AlertTriangle,
  XCircle,
  CheckCircle2,
  Building2,
  ShieldCheck,
  Calendar,
  Award,
} from "lucide-react";

export const ManageCredentialsTab: React.FC = () => {
  const { address } = useWallet();
  const { getCredentialsByIssuer, revokeCredential } = useCredentialStore();
  const [revokeModal, setRevokeModal] = useState<{ id: string; name: string } | null>(null);
  const [revokeReason, setRevokeReason] = useState("");
  const [revoking, setRevoking] = useState(false);

  const credentials = address ? getCredentialsByIssuer(address) : [];

  const handleRevoke = async () => {
    if (!revokeModal) return;

    setRevoking(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    revokeCredential(revokeModal.id, revokeReason);

    setRevoking(false);

    setRevokeModal(null);

    setRevokeReason("");
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-heading-lg font-bold text-white">Manage Issued Credentials</h2>
        <p className="text-body-sm text-dark-400 mt-1">
          View and manage all credentials you&apos;ve issued to students
        </p>
      </div>

      {credentials.length === 0 ? (
        <EmptyState
          icon={<Award className="w-8 h-8 text-dark-500" />}
          title="No Credentials Issued Yet"
          description="Credentials you issue to students will appear here for management and revocation."
        />
      ) : (
        <div className="space-y-4">
          {credentials.map((cred, i) => (
            <motion.div
              key={cred.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <Card variant="glass" padding="md">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        cred.status === "active" ? "bg-accent-500/15 text-accent-400" : "bg-red-500/15 text-red-400"
                      }`}>
                        {cred.status === "active" ? <CheckCircle2 className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                      </div>
                      <div>
                        <h3 className="text-body-lg font-semibold text-white">{cred.credentialTypeName}</h3>
                        <p className="text-body-sm text-dark-400">Issued to {cred.recipientAddress}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-caption text-dark-500">ASA ID:</span>
                        <span className="text-caption font-mono text-dark-200">{cred.asaId}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-caption text-dark-500">Credential ID:</span>
                        <span className="text-caption font-mono text-dark-200">{cred.id}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="info" size="sm">{cred.category}</Badge>
                      <Badge variant="brand" size="sm">{cred.tier}</Badge>
                      <Badge
                        variant={cred.status === "active" ? "success" : "danger"}
                        size="sm"
                        dot
                      >
                        {cred.status}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-1.5 text-caption text-dark-500">
                      <Calendar className="w-3 h-3" />
                      <span>Issued {formatTimestamp(cred.issuedAt)}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 ml-4">
                    {cred.status === "active" ? (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          setRevokeModal({ id: cred.id, name: cred.credentialTypeName })
                        }
                        icon={<Ban className="w-3.5 h-3.5" />}
                        className="text-dark-400 hover:text-red-400"
                      >
                        Revoke
                      </Button>
                    ) : (
                      <div className="text-caption text-red-400 max-w-[200px]">
                        <p className="font-medium">Revoked {cred.revokedAt ? formatTimestamp(cred.revokedAt) : ""}</p>
                        {cred.revocationReason && (
                          <p className="text-dark-500 truncate">{cred.revocationReason}</p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      <Modal
        isOpen={!!revokeModal}
        onClose={() => {
          setRevokeModal(null);
          setRevokeReason("");
        }}
        title="Revoke Credential"
        description={`You are about to revoke "${revokeModal?.name}". This action is transparent and recorded on-chain.`}
        size="md"
      >
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/15">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-4 h-4 text-red-400" />
              <span className="text-body-sm font-semibold text-red-300">Important</span>
            </div>
            <ul className="text-body-sm text-dark-400 space-y-1.5">
              <li>The credential NFT will remain in the student&apos;s wallet</li>
              <li>The status will change to REVOKED in the on-chain registry</li>
              <li>Any verifier checking this credential will see the revocation</li>
              <li>Composite credentials containing this will be flagged</li>
            </ul>
          </div>

          <div className="space-y-3">
            <label className="text-body-sm font-medium text-dark-200">Revocation Reason</label>
            <textarea
              value={revokeReason}
              onChange={(e) => setRevokeReason(e.target.value)}
              placeholder="e.g., Academic integrity violation, Administrative error"
              className="w-full px-4 py-3 bg-dark-800/80 border border-dark-600/50 rounded-xl text-dark-100 placeholder:text-dark-500 focus:outline-none focus:border-red-500/50 focus:ring-2 focus:ring-red-500/20 transition-all duration-300 text-body-md min-h-[80px] resize-y"
              required
            />
          </div>

          <div className="flex items-center gap-3 pt-4 border-t border-dark-700/50">
            <Button
              variant="ghost"
              onClick={() => {
                setRevokeModal(null);
                setRevokeReason("");
              }}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              loading={revoking}
              onClick={handleRevoke}
              disabled={!revokeReason.trim()}
              icon={<XCircle className="w-4 h-4" />}
              className="flex-1"
            >
              Confirm Revocation
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
