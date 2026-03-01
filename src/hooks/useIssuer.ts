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

  const stats = useMemo(() => {
    const total = issuedCredentials.length;
    const active = issuedCredentials.filter((c) => c.status === "active").length;
    const revoked = issuedCredentials.filter((c) => c.status === "revoked").length;
    const typeCount = credentialTypes.length;
    const pathCount = issuerRules.length;

    return { total, active, revoked, typeCount, pathCount };
  }, [issuedCredentials, credentialTypes, issuerRules]);

  return {
    address,
    isConnected,
    isAuthorized,
    issuerInfo,
    credentialTypes,
    issuedCredentials,
    issuerRules,
    stats,
  };
}
