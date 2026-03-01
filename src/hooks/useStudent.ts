"use client";

import { useMemo } from "react";
import { useWallet } from "./useWallet";
import { useCredentialStore } from "@/store/credentialStore";

export function useStudent() {
  const { address, isConnected } = useWallet();
  const {
    getCredentialsByRecipient,
    getCompositionProgress,
  } = useCredentialStore();

  const credentials = useMemo(
    () => (address ? getCredentialsByRecipient(address) : []),
    [address, getCredentialsByRecipient]
  );

  const progress = useMemo(
    () => (address ? getCompositionProgress(address) : []),
    [address, getCompositionProgress]
  );

  const composites = useMemo(
    () => credentials.filter((c) => c.category === "certification" && c.tier === "expert"),
    [credentials]
  );

  const micros = useMemo(
    () => credentials.filter((c) => !(c.category === "certification" && c.tier === "expert")),
    [credentials]
  );

  const stats = useMemo(() => {
    const total = credentials.length;
    const active = credentials.filter((c) => c.status === "active").length;
    const revoked = credentials.filter((c) => c.status === "revoked").length;
    const compositeCount = composites.length;
    const pendingPaths = progress.filter((p) => !p.isEligible).length;
    const completedPaths = progress.filter((p) => p.isEligible).length;

    return { total, active, revoked, compositeCount, pendingPaths, completedPaths };
  }, [credentials, composites, progress]);

  return {
    address,
    isConnected,
    credentials,
    composites,
    micros,
    progress,
    stats,
  };
}
