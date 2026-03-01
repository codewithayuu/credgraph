"use client";

import { useState, useEffect, useCallback } from "react";
import { useCredentialStore } from "@/store/credentialStore";
import {
  Credential,
  Issuer,
  CompositionRule,
  VerificationSummary,
  ExpiryStatus,
} from "@/lib/types";
import { getExpiryStatus } from "@/lib/utils";

interface VerifiedCredential extends Credential {
  issuerVerified: boolean;
  issuerInfo?: Issuer;
  isExpired: boolean;
  expiryStatus: ExpiryStatus;
}

interface CompositeGroup {
  credential: VerifiedCredential;
  components: VerifiedCredential[];
  rule?: CompositionRule;
  allValid: boolean;
  hasRevokedComponent: boolean;
  hasExpiredComponent: boolean;
}

interface VerificationState {
  loading: boolean;
  credentials: VerifiedCredential[];
  composites: CompositeGroup[];
  micros: VerifiedCredential[];
  summary: VerificationSummary;
}

export function useVerification(walletAddress: string) {
  const {
    getCredentialsByRecipient,
    getIssuerByAddress,
    isAuthorizedIssuer,
    compositionRules,
  } = useCredentialStore();

  const [state, setState] = useState<VerificationState>({
    loading: true,
    credentials: [],
    composites: [],
    micros: [],
    summary: {
      totalCredentials: 0,
      activeCredentials: 0,
      revokedCredentials: 0,
      expiredCredentials: 0,
      compositeCredentials: 0,
      allIssuersVerified: true,
    },
  });

  const verify = useCallback(() => {
    const rawCredentials = getCredentialsByRecipient(walletAddress);

    // Only show claimed credentials in verification
    const claimedCredentials = rawCredentials.filter(
      (c) => c.claimStatus === "claimed" || c.claimStatus === undefined
    );

    const verified: VerifiedCredential[] = claimedCredentials.map((cred) => {
      const expiryStatus = getExpiryStatus(cred.expiresAt);
      const isExpired = expiryStatus === "expired";

      return {
        ...cred,
        issuerVerified: isAuthorizedIssuer(cred.issuerAddress),
        issuerInfo: getIssuerByAddress(cred.issuerAddress),
        isExpired,
        expiryStatus,
      };
    });

    const compositeCredentials = verified.filter(
      (c) => c.category === "certification" && c.tier === "expert"
    );
    const microCredentials = verified.filter(
      (c) => !(c.category === "certification" && c.tier === "expert")
    );

    const compositeGroups: CompositeGroup[] = compositeCredentials.map((comp) => {
      const rule = compositionRules.find(
        (r) => r.compositeCredentialTypeId === comp.credentialTypeId
      );
      const components = rule
        ? rule.requiredCredentialTypeIds
          .map((tid) => verified.find((v) => v.credentialTypeId === tid))
          .filter(Boolean) as VerifiedCredential[]
        : [];
      const hasRevokedComponent = components.some((c) => c.status === "revoked");
      const hasExpiredComponent = components.some((c) => c.isExpired);
      const allValid = components.every(
        (c) => c.status === "active" && c.issuerVerified && !c.isExpired
      );

      return {
        credential: comp,
        components,
        rule,
        allValid,
        hasRevokedComponent,
        hasExpiredComponent,
      };
    });

    const activeCount = verified.filter(
      (c) => c.status === "active" && !c.isExpired
    ).length;
    const revokedCount = verified.filter((c) => c.status === "revoked").length;
    const expiredCount = verified.filter((c) => c.isExpired).length;

    const summary: VerificationSummary = {
      totalCredentials: verified.length,
      activeCredentials: activeCount,
      revokedCredentials: revokedCount,
      expiredCredentials: expiredCount,
      compositeCredentials: compositeGroups.length,
      allIssuersVerified: verified.every((c) => c.issuerVerified),
    };

    setState({
      loading: false,
      credentials: verified,
      composites: compositeGroups,
      micros: microCredentials,
      summary,
    });
  }, [
    walletAddress,
    getCredentialsByRecipient,
    isAuthorizedIssuer,
    getIssuerByAddress,
    compositionRules,
  ]);

  useEffect(() => {
    const timer = setTimeout(verify, 1500);
    return () => clearTimeout(timer);
  }, [verify]);

  return state;
}
