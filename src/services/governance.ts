import {
    GovernanceApplication,
    GovernanceAction,
    Issuer,
    ApiResponse,
} from "@/lib/types";
import { GOVERNANCE_CONFIG } from "@/lib/constants";
import { sleep } from "@/lib/utils";

/**
 * Governance service handles issuer registration, approval, and audit trail.
 *
 * Current implementation: mock layer with simulated delays.
 * Production path: Replace with on-chain governance contract calls.
 */

// ─── Application Submission ──────────────────

export interface SubmitApplicationParams {
    applicantAddress: string;
    institutionName: string;
    institutionType: Issuer["type"];
    email: string;
    website: string;
    description: string;
    documentUri?: string;
    documentHash?: string;
}

export async function submitIssuerApplication(
    params: SubmitApplicationParams
): Promise<ApiResponse<GovernanceApplication>> {
    try {
        // Simulate blockchain delay
        await sleep(1500);

        // In production, this would:
        // 1. Upload application metadata to IPFS
        // 2. Call governance smart contract to register application
        // 3. Store application in on-chain box storage
        // 4. Return transaction ID

        // For now, the Zustand store handles the actual state mutation
        // This service just provides the async wrapper and validation

        return {
            success: true,
            data: undefined, // The store creates the application object
        };
    } catch (err: any) {
        return {
            success: false,
            error: err?.message || "Failed to submit application",
        };
    }
}

// ─── Application Review ─────────────────────

export interface ReviewApplicationParams {
    applicationId: string;
    reviewerAddress: string;
    decision: "approved" | "rejected" | "under_review";
    reviewNote: string;
}

export async function reviewIssuerApplication(
    params: ReviewApplicationParams
): Promise<ApiResponse<{ txId: string }>> {
    try {
        // Validate reviewer is admin
        if (!GOVERNANCE_CONFIG.adminWallets.includes(params.reviewerAddress)) {
            return {
                success: false,
                error: "Unauthorized: Only governance admins can review applications",
            };
        }

        // Simulate blockchain delay
        await sleep(2000);

        // In production, this would:
        // 1. Call governance contract to update application status
        // 2. If approved, register issuer in IssuerRegistry contract
        // 3. Record governance action on-chain
        // 4. Return transaction ID

        const txId = `TXGOV${Date.now().toString(36).toUpperCase()}`;

        return {
            success: true,
            data: { txId },
        };
    } catch (err: any) {
        return {
            success: false,
            error: err?.message || "Failed to review application",
        };
    }
}

// ─── Issuer Suspension ──────────────────────

export interface SuspendIssuerParams {
    issuerAddress: string;
    adminAddress: string;
    reason: string;
}

export async function suspendIssuer(
    params: SuspendIssuerParams
): Promise<ApiResponse<{ txId: string }>> {
    try {
        if (!GOVERNANCE_CONFIG.adminWallets.includes(params.adminAddress)) {
            return {
                success: false,
                error: "Unauthorized: Only governance admins can suspend issuers",
            };
        }

        await sleep(1500);

        const txId = `TXSUS${Date.now().toString(36).toUpperCase()}`;

        return {
            success: true,
            data: { txId },
        };
    } catch (err: any) {
        return {
            success: false,
            error: err?.message || "Failed to suspend issuer",
        };
    }
}

// ─── Issuer Reinstatement ───────────────────

export interface ReinstateIssuerParams {
    issuerAddress: string;
    adminAddress: string;
    reason: string;
}

export async function reinstateIssuer(
    params: ReinstateIssuerParams
): Promise<ApiResponse<{ txId: string }>> {
    try {
        if (!GOVERNANCE_CONFIG.adminWallets.includes(params.adminAddress)) {
            return {
                success: false,
                error: "Unauthorized: Only governance admins can reinstate issuers",
            };
        }

        await sleep(1500);

        const txId = `TXREI${Date.now().toString(36).toUpperCase()}`;

        return {
            success: true,
            data: { txId },
        };
    } catch (err: any) {
        return {
            success: false,
            error: err?.message || "Failed to reinstate issuer",
        };
    }
}

// ─── Verify Issuer On-Chain ──────────────────

export async function verifyIssuerOnChain(
    address: string
): Promise<ApiResponse<{ verified: boolean; registrationTxId?: string }>> {
    try {
        // In production, this would query the IssuerRegistry smart contract
        // to verify the issuer is registered on-chain
        await sleep(500);

        return {
            success: true,
            data: { verified: true },
        };
    } catch (err: any) {
        return {
            success: false,
            error: err?.message || "Failed to verify issuer on-chain",
        };
    }
}

// ─── Build Issuer Object from Application ────

export function buildIssuerFromApplication(
    application: GovernanceApplication
): Issuer {
    return {
        address: application.applicantAddress,
        name: application.institutionName,
        type: application.institutionType,
        registeredAt: Math.floor(Date.now() / 1000),
        status: "active",
        description: application.description,
        website: application.website,
        email: application.email,
        logoUrl: "",
        credibilityScore: 50, // New issuers start at 50
        totalIssued: 0,
        totalRevoked: 0,
    };
}
