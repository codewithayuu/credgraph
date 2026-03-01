"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { StatusIndicator } from "@/components/ui/StatusIndicator";
import { WalletAddress } from "@/components/ui/WalletAddress";
import { Credential, Issuer } from "@/lib/types";
import { CREDENTIAL_CATEGORIES, CREDENTIAL_TIERS } from "@/lib/constants";
import { formatTimestamp, getExplorerUrl } from "@/lib/utils";
import {
  Award,
  Building2,
  Calendar,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Hash,
  Tag,
  Layers,
  ShieldCheck,
  ShieldX,
  XCircle,
} from "lucide-react";

interface Props {
  credential: Credential;
  issuerVerified: boolean;
  issuerInfo?: Issuer;
}

export const VerifiedCredentialCard: React.FC<Props> = ({
  credential,
  issuerVerified,
  issuerInfo,
}) => {
  const [expanded, setExpanded] = useState(false);
  const catConfig = CREDENTIAL_CATEGORIES[credential.category];
  const tierConfig = CREDENTIAL_TIERS[credential.tier];
  const isRevoked = credential.status === "revoked";

  return (
    <Card
      variant="glass"
      padding="none"
      className={`overflow-hidden transition-all duration-500 ${
        isRevoked ? "border-red-500/15 bg-red-500/2" : ""
      }`}
    >
      <div
        className="p-5 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
            isRevoked
              ? "bg-red-500/10"
              : catConfig?.bgColor || "bg-dark-800"
          }`}>
            {isRevoked ? (
              <XCircle className="w-6 h-6 text-red-400" />
            ) : (
              <Award className={`w-6 h-6 ${catConfig?.color || "text-dark-400"}`} />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className={`text-body-lg font-semibold truncate ${isRevoked ? "text-dark-400 line-through decoration-red-500/40" : "text-white"}`}>
                {credential.credentialTypeName}
              </h3>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-body-sm text-dark-400 truncate">{credential.issuerName}</span>
              {issuerVerified ? (
                <StatusIndicator status="verified" size="sm" label="Verified" />
              ) : (
                <StatusIndicator status="unverified" size="sm" label="Unverified" />
              )}
            </div>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="hidden sm:flex flex-wrap gap-1.5">
              <Badge variant="info" size="sm">{catConfig?.label || credential.category}</Badge>
              <Badge variant="brand" size="sm">{tierConfig?.label || credential.tier}</Badge>
            </div>

            <StatusIndicator
              status={isRevoked ? "revoked" : "active"}
              size="md"
            />

            <motion.div
              animate={{ rotate: expanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown className="w-5 h-5 text-dark-500" />
            </motion.div>
          </div>
        </div>

        {isRevoked && credential.revocationReason && (
          <div className="mt-3 p-3 rounded-lg bg-red-500/5 border border-red-500/10">
            <div className="flex items-center gap-2 mb-1">
              <XCircle className="w-3.5 h-3.5 text-red-400" />
              <span className="text-caption font-semibold text-red-300">REVOKED</span>
              {credential.revokedAt && (
                <span className="text-caption text-dark-500">
                  on {formatTimestamp(credential.revokedAt)}
                </span>
              )}
            </div>
            <p className="text-body-sm text-red-400/80">{credential.revocationReason}</p>
          </div>
        )}
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 border-t border-dark-700/30 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <DetailRow icon={<Tag className="w-3.5 h-3.5" />} label="Credential ID" value={credential.id} mono />
                  <DetailRow icon={<Hash className="w-3.5 h-3.5" />} label="ASA ID" value={credential.asaId.toString()} mono />
                  <DetailRow icon={<Layers className="w-3.5 h-3.5" />} label="Type ID" value={credential.credentialTypeId} mono />
                  <DetailRow icon={<Calendar className="w-3.5 h-3.5" />} label="Issued" value={formatTimestamp(credential.issuedAt)} />
                </div>

                <div className="space-y-3">
                  <div className="p-3 rounded-lg bg-dark-800/30 border border-dark-700/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Building2 className="w-3.5 h-3.5 text-dark-400" />
                      <span className="text-caption font-semibold text-dark-300 uppercase tracking-wider">Issuer</span>
                    </div>
                    <p className="text-body-sm text-white mb-1">{credential.issuerName}</p>
                    <WalletAddress address={credential.issuerAddress} showCopy truncateChars={6} className="text-caption" />
                    <div className="mt-2">
                      {issuerVerified ? (
                        <div className="flex items-center gap-1.5 text-caption text-accent-400">
                          <ShieldCheck className="w-3 h-3" />
                          Registered in CredGraph Issuer Registry
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 text-caption text-amber-400">
                          <ShieldX className="w-3 h-3" />
                          Not found in Issuer Registry
                        </div>
                      )}
                    </div>
                  </div>

                  {credential.evidenceHash && (
                    <DetailRow icon={<Hash className="w-3.5 h-3.5" />} label="Evidence Hash" value={credential.evidenceHash} mono />
                  )}
                </div>
              </div>

              <div className="mt-4 flex gap-3">
                {credential.txId && (
                  <a
                    href={getExplorerUrl("transaction", credential.txId)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg border border-dark-700/50 text-body-sm text-dark-300 hover:text-brand-400 hover:border-brand-500/30 transition-all"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    View Transaction
                  </a>
                )}
                <a
                  href={getExplorerUrl("asset", credential.asaId)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border border-dark-700/50 text-body-sm text-dark-300 hover:text-brand-400 hover:border-brand-500/30 transition-all"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
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

function DetailRow({
  icon,
  label,
  value,
  mono,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="flex items-center justify-between p-2.5 rounded-lg bg-dark-800/20 border border-dark-700/15">
      <div className="flex items-center gap-2 text-dark-400">
        {icon}
        <span className="text-caption font-medium">{label}</span>
      </div>
      <span className={`text-caption text-dark-200 max-w-[55%] truncate text-right ${mono ? "font-mono" : ""}`}>
        {value}
      </span>
    </div>
  );
}
