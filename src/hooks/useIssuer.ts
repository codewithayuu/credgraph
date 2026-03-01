"use client";

import { useMemo } from "react";
import { useWallet } from "./useWallet";
import { useCredentialStore } from "@/store/credentialStore";

export function useIssuer() {
  const { address, isConnected } = useWallet();
  const {
    isAuthorizedIssuer,
    getIssuerByAddress,
    getCredentialTypesByIssuer,
    getCredentialsByIssuer,
    compositionRules,
    getBatchJobs,
  } = useCredentialStore();

  const isAuthorized = useMemo(
    () => (address ? isAuthorizedIssuer(address) : false),
    [address, isAuthorizedIssuer]
  );

  const issuerInfo = useMemo(
    () => (address ? getIssuerByAddress(address) : undefined),
    [address, getIssuerByAddress]
  );

  const credentialTypes = useMemo(
    () => (address ? getCredentialTypesByIssuer(address) : []),
    [address, getCredentialTypesByIssuer]
  );

  const issuedCredentials = useMemo(
    () => (address ? getCredentialsByIssuer(address) : []),
    [address, getCredentialsByIssuer]
  );

  const issuerRules = useMemo(
    () => compositionRules.filter((r) => r.definedBy === address),
    [compositionRules, address]
  );

  const batchJobs = useMemo(
    () => (address ? getBatchJobs(address) : []),
    [address, getBatchJobs]
  );

  const stats = useMemo(() => {
    const now = Math.floor(Date.now() / 1000);
    const total = issuedCredentials.length;
    const active = issuedCredentials.filter(
      (c) => c.status === "active" && (!c.expiresAt || c.expiresAt > now)
    ).length;
    const revoked = issuedCredentials.filter(
      (c) => c.status === "revoked"
    ).length;
    const pending = issuedCredentials.filter(
      (c) => c.claimStatus === "claimable"
    ).length;
    const expired = issuedCredentials.filter(
      (c) => c.expiresAt && c.expiresAt <= now
    ).length;
    const typeCount = credentialTypes.length;
    const pathCount = issuerRules.length;
    const batchCount = batchJobs.length;

    return {
      total,
      active,
      revoked,
      pending,
      expired,
      typeCount,
      pathCount,
      batchCount,
    };
  }, [issuedCredentials, credentialTypes, issuerRules, batchJobs]);

  return {
    address,
    isConnected,
    isAuthorized,
    issuerInfo,
    credentialTypes,
    issuedCredentials,
    issuerRules,
    batchJobs,
    stats,
  };
}
