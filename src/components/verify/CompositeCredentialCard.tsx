"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { StatusIndicator } from "@/components/ui/StatusIndicator";
import { WalletAddress } from "@/components/ui/WalletAddress";
import { Credential, Issuer, CompositionRule } from "@/lib/types";
import { CREDENTIAL_CATEGORIES } from "@/lib/constants";
import { formatTimestamp, getExplorerUrl } from "@/lib/utils";
import {
  Crown,
  ChevronDown,
  CheckCircle2,
  XCircle,
  ExternalLink,
  Building2,
  Calendar,
  ShieldCheck,
  Layers,
} from "lucide-react";

interface Props {
  credential: Credential;
  components: Credential[];
  issuerVerified: boolean;
  issuerInfo?: Issuer;
  rule?: CompositionRule;
}

export const CompositeCredentialCard: React.FC<Props> = ({
  credential,
  components,
  issuerVerified,
  issuerInfo,
  rule,
}) => {
  const [expanded, setExpanded] = useState(true);
  const allComponentsActive = components.every((c) => c.status === "active");
  const hasRevokedComponent = components.some((c) => c.status === "revoked");

  return (
    <Card
      variant="glass"
      padding="none"
      className={`overflow-hidden border-amber-500/15 ${
        hasRevokedComponent ? "border-red-500/15" : ""
      }`}
    >
      <div className="p-6 bg-gradient-to-r from-amber-500/5 to-orange-500/3">
        <div
          className="flex items-center gap-4 cursor-pointer"
          onClick={() => setExpanded(!expanded)}
        >
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white shadow-xl shadow-amber-500/20 flex-shrink-0">
            <Crown className="w-7 h-7" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-1">
              <h3 className="text-heading-lg font-bold text-white">
                {credential.credentialTypeName}
              </h3>
              <Badge variant="warning" size="md">Composite</Badge>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-body-sm text-dark-400">{credential.issuerName}</span>
              {issuerVerified && <StatusIndicator status="verified" size="sm" label="Verified Issuer" />}
            </div>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            <StatusIndicator
              status={hasRevokedComponent ? "warning" : credential.status === "active" ? "active" : "revoked"}
              label={hasRevokedComponent ? "Component Revoked" : credential.status === "active" ? "Active" : "Revoked"}
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

        <div className="mt-4 flex items-center gap-4 text-body-sm text-dark-400">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            Issued {formatTimestamp(credential.issuedAt)}
          </div>
          <div className="flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5" />
            {components.length} components verified
          </div>
        </div>
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
            <div className="px-6 pb-6 border-t border-dark-700/20 pt-4">
              <p className="text-caption font-semibold text-dark-300 uppercase tracking-wider mb-3">
                Component Credentials ({components.length}/{rule?.requiredCredentialTypeIds.length || components.length})
              </p>

              <div className="space-y-2 mb-4">
                {components.map((comp, i) => {
                  const compCatConfig = CREDENTIAL_CATEGORIES[comp.category];
                  const isCompRevoked = comp.status === "revoked";

                  return (
                    <motion.div
                      key={comp.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.08 }}
                      className={`flex items-center gap-3 p-3 rounded-xl border ${
                        isCompRevoked
                          ? "bg-red-500/3 border-red-500/10"
                          : "bg-dark-800/20 border-dark-700/15"
                      }`}
                    >
                      {isCompRevoked ? (
                        <XCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                      ) : (
                        <CheckCircle2 className="w-5 h-5 text-accent-400 flex-shrink-0" />
                      )}
                      <div className="flex-1 min-w-0">
                        <span className={`text-body-sm font-medium ${isCompRevoked ? "text-red-300 line-through" : "text-dark-100"}`}>
                          {comp.credentialTypeName}
                        </span>
                        <span className="text-caption text-dark-500 block">{comp.issuerName}</span>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <Badge variant={isCompRevoked ? "danger" : "success"} size="sm">
                          {isCompRevoked ? "Revoked" : "Verified"}
                        </Badge>
                        {comp.txId && (
                          <a
                            href={getExplorerUrl("transaction", comp.txId)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-dark-500 hover:text-brand-400 transition-colors"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {hasRevokedComponent && (
                <div className="p-3 rounded-xl bg-red-500/5 border border-red-500/10 mb-4">
                  <div className="flex items-center gap-2">
                    <XCircle className="w-4 h-4 text-red-400" />
                    <span className="text-body-sm font-semibold text-red-300">
                      Component Revoked — Composite Requires Review
                    </span>
                  </div>
                  <p className="text-caption text-dark-500 mt-1">
                    One or more component credentials have been revoked. This composite credential may no longer be valid.
                  </p>
                </div>
              )}

              <div className="flex gap-3">
                {credential.txId && (
                  <a
                    href={getExplorerUrl("transaction", credential.txId)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg border border-dark-700/50 text-body-sm text-dark-300 hover:text-amber-400 hover:border-amber-500/30 transition-all"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    View Composite on Explorer
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
};
