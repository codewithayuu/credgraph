"use client";

import { useMemo, useCallback, useState } from "react";
import { useWallet } from "./useWallet";
import { useCredentialStore } from "@/store/credentialStore";
import { ClaimableCredential, Credential } from "@/lib/types";
import {
    claimCredentialFromEscrow,
    estimateClaimCost,
    buildClaimableInfo,
    isClaimExpired,
} from "@/services/claim";
import toast from "react-hot-toast";

interface ClaimState {
    claiming: boolean;
    claimingId: string | null;
    step: "idle" | "checking" | "opt_in" | "claiming" | "confirmed" | "failed";
    error: string | null;
}

export function useClaim() {
    const { address, isConnected, peraWallet } = useWallet();
    const store = useCredentialStore();

    const [claimState, setClaimState] = useState<ClaimState>({
        claiming: false,
        claimingId: null,
        step: "idle",
        error: null,
    });

    // ─── Get Claimable Credentials ─────────

    const claimableCredentials = useMemo((): ClaimableCredential[] => {
        if (!address) return [];

        const claimable = store.getClaimableCredentials(address);

        return claimable
            .filter((c) => !isClaimExpired(c))
            .map((c) => {
                const credType = store.getCredentialTypeById(c.credentialTypeId);
                const issuer = store.getIssuerByAddress(c.issuerAddress);
                return buildClaimableInfo(c, credType, issuer);
            });
    }, [address, store]);

    const claimableCount = claimableCredentials.length;

    // ─── Estimate Costs ────────────────────

    const costs = useMemo(() => estimateClaimCost(), []);

    // ─── Claim a Credential ────────────────

    const claimCredential = useCallback(
        async (credentialId: string) => {
            if (!address || !peraWallet) {
                toast.error("Please connect your wallet first");
                return false;
            }

            const credential = store.credentials.find((c) => c.id === credentialId);
            if (!credential) {
                toast.error("Credential not found");
                return false;
            }

            if (credential.claimStatus !== "claimable") {
                toast.error("This credential is not claimable");
                return false;
            }

            if (isClaimExpired(credential)) {
                toast.error("Claim period has expired for this credential");
                return false;
            }

            setClaimState({
                claiming: true,
                claimingId: credentialId,
                step: "checking",
                error: null,
            });

            try {
                // Step 1: Checking opt-in status
                setClaimState((s) => ({ ...s, step: "opt_in" }));

                // Step 2: Claiming
                setClaimState((s) => ({ ...s, step: "claiming" }));

                const result = await claimCredentialFromEscrow(
                    credentialId,
                    address,
                    credential.asaId,
                    peraWallet
                );

                if (result.success) {
                    // Update store
                    store.claimCredential(credentialId);

                    setClaimState({
                        claiming: false,
                        claimingId: null,
                        step: "confirmed",
                        error: null,
                    });

                    toast.success("Credential claimed successfully");

                    // Reset after delay
                    setTimeout(() => {
                        setClaimState({
                            claiming: false,
                            claimingId: null,
                            step: "idle",
                            error: null,
                        });
                    }, 3000);

                    return true;
                } else {
                    setClaimState({
                        claiming: false,
                        claimingId: credentialId,
                        step: "failed",
                        error: result.error || "Claim failed",
                    });

                    toast.error(result.error || "Failed to claim credential");
                    return false;
                }
            } catch (err: any) {
                setClaimState({
                    claiming: false,
                    claimingId: credentialId,
                    step: "failed",
                    error: err?.message || "Claim failed",
                });

                toast.error(err?.message || "Failed to claim credential");
                return false;
            }
        },
        [address, peraWallet, store]
    );

    // ─── Reset Claim State ─────────────────

    const resetClaimState = useCallback(() => {
        setClaimState({
            claiming: false,
            claimingId: null,
            step: "idle",
            error: null,
        });
    }, []);

    return {
        claimableCredentials,
        claimableCount,
        claimState,
        costs,
        claimCredential,
        resetClaimState,
    };
}
