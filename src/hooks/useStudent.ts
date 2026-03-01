"use client";

import { useMemo } from "react";
import { useWallet } from "./useWallet";
import { useCredentialStore } from "@/store/credentialStore";

export function useStudent() {
  const { address, isConnected } = useWallet();
  const {
    getCredentialsByRecipient,
    getCompositionProgress,
    getExpiringCredentials,
    getExpiredCredentials,
    getClaimableCredentials,
    getShareLinks,
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
    () =>
      credentials.filter(
        (c) =>
          c.category === "certification" &&
          c.tier === "expert" &&
          c.claimStatus === "claimed"
      ),
    [credentials]
  );

  const micros = useMemo(
    () =>
      credentials.filter(
        (c) =>
          !(c.category === "certification" && c.tier === "expert") &&
          c.claimStatus === "claimed"
      ),
    [credentials]
  );

  const claimable = useMemo(
    () => (address ? getClaimableCredentials(address) : []),
    [address, getClaimableCredentials]
  );

  const expiring = useMemo(
    () => (address ? getExpiringCredentials(address) : []),
    [address, getExpiringCredentials]
  );

  const expired = useMemo(
    () => (address ? getExpiredCredentials(address) : []),
    [address, getExpiredCredentials]
  );

  const shareLinks = useMemo(
    () => (address ? getShareLinks(address) : []),
    [address, getShareLinks]
  );

  const stats = useMemo(() => {
    const now = Math.floor(Date.now() / 1000);
    const claimed = credentials.filter((c) => c.claimStatus === "claimed");
    const total = claimed.length;
    const active = claimed.filter(
      (c) => c.status === "active" && (!c.expiresAt || c.expiresAt > now)
    ).length;
    const revoked = claimed.filter((c) => c.status === "revoked").length;
    const expiredCount = claimed.filter(
      (c) => c.expiresAt && c.expiresAt <= now
    ).length;
    const compositeCount = composites.length;
    const pendingPaths = progress.filter((p) => !p.isEligible).length;
    const completedPaths = progress.filter((p) => p.isEligible).length;
    const claimableCount = claimable.length;
    const expiringCount = expiring.length;

    return {
      total,
      active,
      revoked,
      expired: expiredCount,
      compositeCount,
      pendingPaths,
      completedPaths,
      claimableCount,
      expiringCount,
    };
  }, [credentials, composites, progress, claimable, expiring]);

  return {
    address,
    isConnected,
    credentials,
    composites,
    micros,
    claimable,
    expiring,
    expired,
    progress,
    shareLinks,
    stats,
  };
}
