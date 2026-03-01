"use client";

import { useState, useEffect, useCallback } from "react";
import { useCredentialStore } from "@/store/credentialStore";
import {
  Credential,
  Issuer,
  CompositionRule,
  VerificationSummary,
} from "@/lib/types";

interface VerifiedCredential extends Credential {
  issuerVerified: boolean;
  issuerInfo?: Issuer;
}

interface CompositeGroup {
  credential: VerifiedCredential;
  components: VerifiedCredential[];
  rule?: CompositionRule;
  allValid: boolean;
  hasRevokedComponent: boolean;
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
    credentialTypes,
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
      compositeCredentials: 0,
      allIssuersVerified: true,
    },
  });

  const verify = useCallback(() => {
    const rawCredentials = getCredentialsByRecipient(walletAddress);

    const verified: VerifiedCredential[] = rawCredentials.map((cred) => ({
      ...cred,
      issuerVerified: isAuthorizedIssuer(cred.issuerAddress),
      issuerInfo: getIssuerByAddress(cred.issuerAddress),
    }));

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
      const allValid = components.every(
        (c) => c.status === "active" && c.issuerVerified
      );

      return { credential: comp, components, rule, allValid, hasRevokedComponent };
    });

    const summary: VerificationSummary = {
      totalCredentials: verified.length,
      activeCredentials: verified.filter((c) => c.status === "active").length,
      revokedCredentials: verified.filter((c) => c.status === "revoked").length,
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
