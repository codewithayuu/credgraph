import {
    Credential,
    ClaimResult,
    ClaimableCredential,
    CredentialType,
    Issuer,
} from "@/lib/types";
import { CLAIM_CONFIG } from "@/lib/constants";
import { sleep } from "@/lib/utils";

/**
 * Claim service handles the credential claim/escrow flow.
 *
 * Flow:
 * 1. Issuer issues credential → goes to escrow (status: pending, claimStatus: claimable)
 * 2. Student sees claimable credential in dashboard
 * 3. Student clicks "Claim" → system checks ASA opt-in
 * 4. If not opted in → guided opt-in flow with gas estimation
 * 5. After opt-in → credential transfers from escrow to student wallet
 * 6. Status changes: pending → active, claimStatus: claimable → claimed
 *
 * Current: Mock layer with simulated delays.
 * Production: Real ASA opt-in + transfer transactions via Pera Wallet.
 */

// ─── Check Opt-In Status ─────────────────────

export async function checkOptInStatus(
    walletAddress: string,
    asaId: number
): Promise<{ optedIn: boolean; balance?: number }> {
    try {
        // In production, this would query the Algorand indexer
        // to check if the wallet has opted into the ASA
        await sleep(300);

        // Mock: assume not opted in for claimable credentials
        return { optedIn: false, balance: 0 };
    } catch (err) {
        return { optedIn: false };
    }
}

// ─── Estimate Claim Cost ─────────────────────

export async function estimateClaimCost(): Promise<{
    optInCost: number;
    claimCost: number;
    totalCost: number;
}> {
    return {
        optInCost: CLAIM_CONFIG.estimatedOptInCost,
        claimCost: CLAIM_CONFIG.estimatedClaimCost,
        totalCost: CLAIM_CONFIG.estimatedOptInCost + CLAIM_CONFIG.estimatedClaimCost,
    };
}

// ─── Perform Opt-In ──────────────────────────

export async function performOptIn(
    walletAddress: string,
    asaId: number,
    peraWallet: any
): Promise<{ success: boolean; txId?: string; error?: string }> {
    try {
        // In production:
        // 1. Build opt-in transaction
        // 2. Sign with Pera Wallet
        // 3. Submit to network
        // 4. Wait for confirmation

        await sleep(1500);

        // Mock success
        const txId = `TXOPTIN${Date.now().toString(36).toUpperCase()}`;
        return { success: true, txId };
    } catch (err: any) {
        return {
            success: false,
            error: err?.message || "Opt-in failed",
        };
    }
}

// ─── Claim Credential ────────────────────────

export async function claimCredentialFromEscrow(
    credentialId: string,
    walletAddress: string,
    asaId: number,
    peraWallet: any
): Promise<ClaimResult> {
    try {
        // Step 1: Check opt-in
        const { optedIn } = await checkOptInStatus(walletAddress, asaId);

        // Step 2: Perform opt-in if needed
        if (!optedIn) {
            const optInResult = await performOptIn(walletAddress, asaId, peraWallet);
            if (!optInResult.success) {
                return {
                    success: false,
                    credentialId,
                    error: `Opt-in failed: ${optInResult.error}`,
                };
            }
        }

        // Step 3: Transfer credential from escrow
        // In production, the issuer's escrow account would transfer the ASA
        await sleep(2000);

        const txId = `TXCLAIM${Date.now().toString(36).toUpperCase()}`;

        return {
            success: true,
            credentialId,
            txId,
        };
    } catch (err: any) {
        return {
            success: false,
            credentialId,
            error: err?.message || "Claim failed",
        };
    }
}

// ─── Build Claimable Credential Info ─────────

export function buildClaimableInfo(
    credential: Credential,
    credentialType: CredentialType | undefined,
    issuer: Issuer | undefined
): ClaimableCredential {
    const now = Math.floor(Date.now() / 1000);
    const escrowExpiry = credential.issuedAt + CLAIM_CONFIG.escrowExpiryDuration;

    return {
        credential,
        issuerInfo: issuer || {
            address: credential.issuerAddress,
            name: credential.issuerName,
            type: "university" as const,
            registeredAt: 0,
            status: "active" as const,
        },
        credentialType: credentialType || {
            id: credential.credentialTypeId,
            name: credential.credentialTypeName,
            description: "",
            category: credential.category,
            tier: credential.tier,
            issuerAddress: credential.issuerAddress,
            issuerName: credential.issuerName,
            evidenceRequired: false,
            createdAt: 0,
            status: "active" as const,
        },
        requiresOptIn: true, // In production, would check actual opt-in status
        estimatedGasCost: CLAIM_CONFIG.estimatedOptInCost + CLAIM_CONFIG.estimatedClaimCost,
        expiresAt: escrowExpiry > now ? escrowExpiry : undefined,
    };
}

// ─── Check if Claim Has Expired ──────────────

export function isClaimExpired(credential: Credential): boolean {
    if (credential.claimStatus !== "claimable") return false;
    const now = Math.floor(Date.now() / 1000);
    const escrowExpiry = credential.issuedAt + CLAIM_CONFIG.escrowExpiryDuration;
    return now > escrowExpiry;
}
