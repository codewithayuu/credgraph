"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

import { useCredentialStore } from "@/store/credentialStore";
import { VerificationHeader } from "@/components/verify/VerificationHeader";
import { VerificationSummary } from "@/components/verify/VerificationSummary";
import { VerifiedCredentialCard } from "@/components/verify/VerifiedCredentialCard";
import { CompositeCredentialCard } from "@/components/verify/CompositeCredentialCard";
import { VerificationEmpty } from "@/components/verify/VerificationEmpty";
import { VerificationLoading } from "@/components/verify/VerificationLoading";

import type { Credential } from "@/lib/types";

const ease = [0.16, 1, 0.3, 1] as const;

export default function VerifyAddressPage() {
  const params = useParams();
  const walletAddress = params.address as string;

  const {
    getCredentialsByRecipient,
    getIssuerByAddress,
    isAuthorizedIssuer,
    compositionRules,
  } = useCredentialStore();

  const [loading, setLoading] = useState(true);
  const [credentials, setCredentials] = useState<Credential[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const { width, height } = useWindowSize();

  useEffect(() => {
    const timer = setTimeout(() => {
      const creds = getCredentialsByRecipient(walletAddress);
      setCredentials(creds);
      setLoading(false);

      if (creds.length > 0) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 5000);
      }
    }, 1200);

    return () => clearTimeout(timer);
  }, [walletAddress, getCredentialsByRecipient]);

  const composites = useMemo(
    () => credentials.filter((c) => c.category === "certification" && c.tier === "expert"),
    [credentials]
  );
  const micros = useMemo(
    () => credentials.filter((c) => !(c.category === "certification" && c.tier === "expert")),
    [credentials]
  );

  const summary = useMemo(() => {
    const activeCredentials = credentials.filter((c) => c.status === "active");
    const revokedCredentials = credentials.filter((c) => c.status === "revoked");

    const allIssuersVerified = credentials.every((c) => isAuthorizedIssuer(c.issuerAddress));

    return {
      totalCredentials: credentials.length,
      activeCredentials: activeCredentials.length,
      revokedCredentials: revokedCredentials.length,
      compositeCredentials: composites.length,
      allIssuersVerified,
    };
  }, [credentials, composites.length, isAuthorizedIssuer]);

  const getCompositeComponents = (compositeCredential: Credential) => {
    const rule = compositionRules.find(
      (r) => r.compositeCredentialTypeId === compositeCredential.credentialTypeId
    );
    if (!rule) return [];

    return rule.requiredCredentialTypeIds
      .map((typeId) => credentials.find((c) => c.credentialTypeId === typeId))
      .filter(Boolean) as Credential[];
  };

  if (loading) return <VerificationLoading address={walletAddress} />;
  if (credentials.length === 0) return <VerificationEmpty address={walletAddress} />;

  return (
    <div className="relative">
      {showConfetti && (
        <Confetti
          width={width}
          height={height}
          recycle={false}
          numberOfPieces={400}
          gravity={0.15}
          style={{ position: "fixed", top: 0, left: 0, zIndex: 100, pointerEvents: "none" }}
        />
      )}
      <div className="orb orb-electric w-[640px] h-[640px] top-[-320px] right-[-320px] opacity-16" />
      <div className="orb orb-gold w-[560px] h-[560px] bottom-[-340px] left-[-320px] opacity-14" />
      <div className="absolute inset-0 dot-bg opacity-[0.28]" />

      <div className="relative section-wrapper py-8">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease }}>
          <VerificationHeader address={walletAddress} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08, ease }}
          className="mt-6"
        >
          <VerificationSummary summary={summary} />
        </motion.div>

        {composites.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.16, ease }}
            className="mt-10"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-2xl bg-gold-500/10 border border-gold-500/14 text-gold-300 flex items-center justify-center">
                <MarkCrown />
              </div>
              <div>
                <h2 className="font-display text-h1 text-white leading-tight">Composite credentials</h2>
                <p className="text-b3 text-surface-500 mt-1">Mastery credentials composed from component proofs.</p>
              </div>
            </div>

            <div className="space-y-4">
              {composites.map((cred, i) => (
                <motion.div
                  key={cred.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.08 + i * 0.06, ease }}
                >
                  <CompositeCredentialCard
                    credential={cred}
                    components={getCompositeComponents(cred)}
                    issuerVerified={isAuthorizedIssuer(cred.issuerAddress)}
                    issuerInfo={getIssuerByAddress(cred.issuerAddress)}
                    rule={compositionRules.find((r) => r.compositeCredentialTypeId === cred.credentialTypeId)}
                  />
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: composites.length > 0 ? 0.24 : 0.16, ease }}
          className="mt-10"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-2xl bg-electric-500/10 border border-electric-500/14 text-electric-300 flex items-center justify-center">
              <MarkBadge />
            </div>
            <div className="flex items-baseline gap-2 flex-wrap">
              <h2 className="font-display text-h1 text-white leading-tight">Micro-credentials</h2>
              <span className="text-b3 text-surface-500">({micros.length})</span>
            </div>
          </div>

          <div className="space-y-3">
            {micros.map((cred, i) => (
              <motion.div
                key={cred.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.05 + i * 0.06, ease }}
              >
                <VerifiedCredentialCard
                  credential={cred}
                  issuerVerified={isAuthorizedIssuer(cred.issuerAddress)}
                  issuerInfo={getIssuerByAddress(cred.issuerAddress)}
                />
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35, ease }}
          className="mt-12 flex justify-center"
        >
          <div className="panel rounded-full border border-surface-800/55 px-5 py-2.5">
            <div className="flex items-center gap-2.5 text-b3 text-surface-400">
              <span className="text-electric-300">
                <MarkShieldCheck />
              </span>
              <span>Trustless verification via Algorand chain data + issuer registry.</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* Marks */
function MarkCrown() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-current">
      <path
        d="M6.2 9.2l3.1 3.2L12 8l2.7 4.4l3.1-3.2v8.6H6.2V9.2Z"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinejoin="round"
      />
      <path d="M6.2 17.8h11.6" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" opacity="0.7" />
    </svg>
  );
}

function MarkBadge() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-current">
      <path
        d="M12 3.5l7 4v8c0 4-3 6.8-7 8c-4-1.2-7-4-7-8v-8l7-4Z"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinejoin="round"
        opacity="0.85"
      />
      <path
        d="M9 12.2l2 2l4-4.2"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MarkShieldCheck() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-current">
      <path
        d="M12 3l8 4.6v6.1c0 4.7-3.2 7.9-8 9.3c-4.8-1.4-8-4.6-8-9.3V7.6L12 3z"
        stroke="currentColor"
        strokeWidth="2.0"
        strokeLinejoin="round"
        opacity="0.8"
      />
      <path
        d="M8.4 12.2l2.2 2.2l5.4-5.6"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
