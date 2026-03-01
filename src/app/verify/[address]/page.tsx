"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useCredentialStore } from "@/store/credentialStore";
import { GlowOrb } from "@/components/ui/GlowOrb";
import { VerificationHeader } from "@/components/verify/VerificationHeader";
import { VerificationSummary } from "@/components/verify/VerificationSummary";
import { VerifiedCredentialCard } from "@/components/verify/VerifiedCredentialCard";
import { CompositeCredentialCard } from "@/components/verify/CompositeCredentialCard";
import { VerificationEmpty } from "@/components/verify/VerificationEmpty";
import { VerificationLoading } from "@/components/verify/VerificationLoading";
import { Credential } from "@/lib/types";
import {
  Crown,
  Award,
  ShieldCheck,
} from "lucide-react";

export default function VerifyAddressPage() {
  const params = useParams();
  const walletAddress = params.address as string;
  const {
    getCredentialsByRecipient,
    getIssuerByAddress,
    isAuthorizedIssuer,
    compositionRules,
    credentialTypes,
  } = useCredentialStore();

  const [loading, setLoading] = useState(true);
  const [credentials, setCredentials] = useState<Credential[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const creds = getCredentialsByRecipient(walletAddress);
      setCredentials(creds);
      setLoading(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, [walletAddress, getCredentialsByRecipient]);

  if (loading) {
    return <VerificationLoading address={walletAddress} />;
  }

  const activeCredentials = credentials.filter((c) => c.status === "active");
  const revokedCredentials = credentials.filter((c) => c.status === "revoked");
  const composites = credentials.filter((c) => c.category === "certification" && c.tier === "expert");
  const micros = credentials.filter((c) => !(c.category === "certification" && c.tier === "expert"));

  const allIssuersVerified = credentials.every((c) => isAuthorizedIssuer(c.issuerAddress));

  const summary = {
    totalCredentials: credentials.length,
    activeCredentials: activeCredentials.length,
    revokedCredentials: revokedCredentials.length,
    compositeCredentials: composites.length,
    allIssuersVerified,
  };

  const getCompositeComponents = (compositeCredential: Credential) => {
    const rule = compositionRules.find(
      (r) => r.compositeCredentialTypeId === compositeCredential.credentialTypeId
    );
    if (!rule) return [];
    return rule.requiredCredentialTypeIds
      .map((typeId) => credentials.find((c) => c.credentialTypeId === typeId))
      .filter(Boolean) as Credential[];
  };

  if (credentials.length === 0) {
    return <VerificationEmpty address={walletAddress} />;
  }

  return (
    <div className="page-container relative">
      <GlowOrb color="accent" size="lg" className="top-0 right-[-100px] opacity-15" />
      <GlowOrb color="brand" size="md" className="bottom-[20%] left-[-80px] opacity-10" />

      <div className="absolute inset-0 dot-pattern opacity-20" />

      <div className="relative z-10 section-container py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <VerificationHeader address={walletAddress} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-6"
        >
          <VerificationSummary summary={summary} />
        </motion.div>

        {composites.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-10"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 rounded-lg bg-amber-500/15 flex items-center justify-center">
                <Crown className="w-4 h-4 text-amber-400" />
              </div>
              <h2 className="text-heading-lg font-bold text-white">Composite Credentials</h2>
            </div>
            <div className="space-y-4">
              {composites.map((cred, i) => (
                <motion.div
                  key={cred.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                >
                  <CompositeCredentialCard
                    credential={cred}
                    components={getCompositeComponents(cred)}
                    issuerVerified={isAuthorizedIssuer(cred.issuerAddress)}
                    issuerInfo={getIssuerByAddress(cred.issuerAddress)}
                    rule={compositionRules.find(
                      (r) => r.compositeCredentialTypeId === cred.credentialTypeId
                    )}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: composites.length > 0 ? 0.4 : 0.2 }}
          className="mt-10"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-8 rounded-lg bg-brand-500/15 flex items-center justify-center">
              <Award className="w-4 h-4 text-brand-400" />
            </div>
            <h2 className="text-heading-lg font-bold text-white">
              Micro-Credentials
              <span className="text-dark-500 font-normal text-body-md ml-2">({micros.length})</span>
            </h2>
          </div>
          <div className="space-y-3">
            {micros.map((cred, i) => (
              <motion.div
                key={cred.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
              >
                <VerifiedCredentialCard
                  credential={cred}
                  issuerVerified={isAuthorizedIssuer(cred.issuerAddress)}
                  issuerInfo={getIssuerByAddress(cred.issuerAddress)}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-dark-800/40 border border-dark-700/30">
            <ShieldCheck className="w-4 h-4 text-accent-400" />
            <span className="text-body-sm text-dark-400">
              All data sourced directly from Algorand Blockchain — trustless verification
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
