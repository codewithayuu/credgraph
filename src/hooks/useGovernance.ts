"use client";

import { useMemo, useCallback } from "react";
import { useWallet } from "./useWallet";
import { useGovernanceStore } from "@/store/governanceStore";
import { useCredentialStore } from "@/store/credentialStore";
import {
    GovernanceApplicationStatus,
    Issuer,
} from "@/lib/types";
import {
    submitIssuerApplication,
    reviewIssuerApplication,
    buildIssuerFromApplication,
    SubmitApplicationParams,
    ReviewApplicationParams,
} from "@/services/governance";
import toast from "react-hot-toast";

export function useGovernance() {
    const { address, isConnected } = useWallet();
    const govStore = useGovernanceStore();
    const credStore = useCredentialStore();

    const isAdmin = useMemo(
        () => (address ? govStore.isAdmin(address) : false),
        [address, govStore]
    );

    const stats = useMemo(() => govStore.getStats(), [govStore]);

    const pendingApplications = useMemo(
        () => govStore.getApplicationsByStatus("pending"),
        [govStore]
    );

    const underReviewApplications = useMemo(
        () => govStore.getApplicationsByStatus("under_review"),
        [govStore]
    );

    const approvedApplications = useMemo(
        () => govStore.getApplicationsByStatus("approved"),
        [govStore]
    );

    const rejectedApplications = useMemo(
        () => govStore.getApplicationsByStatus("rejected"),
        [govStore]
    );

    const recentActions = useMemo(
        () => govStore.getRecentActions(30),
        [govStore]
    );

    const myApplication = useMemo(
        () => (address ? govStore.getApplicationByAddress(address) : undefined),
        [address, govStore]
    );

    const hasExistingApplication = useMemo(
        () => (address ? govStore.hasExistingApplication(address) : false),
        [address, govStore]
    );

    // ─── Submit Application ────────────────

    const submitApplication = useCallback(
        async (params: Omit<SubmitApplicationParams, "applicantAddress">) => {
            if (!address) {
                toast.error("Please connect your wallet first");
                return null;
            }

            if (hasExistingApplication) {
                toast.error("You already have an active application");
                return null;
            }

            try {
                const result = await submitIssuerApplication({
                    ...params,
                    applicantAddress: address,
                });

                if (result.success) {
                    // Add to governance store
                    const application = govStore.submitApplication({
                        applicantAddress: address,
                        institutionName: params.institutionName,
                        institutionType: params.institutionType,
                        email: params.email,
                        website: params.website,
                        description: params.description,
                        documentUri: params.documentUri,
                        documentHash: params.documentHash,
                    });

                    toast.success("Application submitted successfully");
                    return application;
                } else {
                    toast.error(result.error || "Failed to submit application");
                    return null;
                }
            } catch (err: any) {
                toast.error(err?.message || "Failed to submit application");
                return null;
            }
        },
        [address, hasExistingApplication, govStore]
    );

    // ─── Review Application ────────────────

    const reviewApplication = useCallback(
        async (
            applicationId: string,
            decision: "approved" | "rejected" | "under_review",
            reviewNote: string
        ) => {
            if (!address || !isAdmin) {
                toast.error("Unauthorized: Admin access required");
                return false;
            }

            try {
                const result = await reviewIssuerApplication({
                    applicationId,
                    reviewerAddress: address,
                    decision,
                    reviewNote,
                });

                if (result.success) {
                    // Update governance store
                    govStore.updateApplicationStatus(
                        applicationId,
                        decision,
                        address,
                        reviewNote
                    );

                    // If approved, add issuer to credential store
                    if (decision === "approved") {
                        const app = govStore.applications.find((a) => a.id === applicationId);
                        if (app) {
                            const issuer = buildIssuerFromApplication(app);
                            credStore.addIssuer(issuer);
                        }
                    }

                    const actionLabels = {
                        approved: "Issuer approved",
                        rejected: "Application rejected",
                        under_review: "Marked for review",
                    };

                    toast.success(actionLabels[decision]);
                    return true;
                } else {
                    toast.error(result.error || "Failed to review application");
                    return false;
                }
            } catch (err: any) {
                toast.error(err?.message || "Failed to review application");
                return false;
            }
        },
        [address, isAdmin, govStore, credStore]
    );

    // ─── Suspend Issuer ────────────────────

    const suspendIssuerAction = useCallback(
        async (issuerAddress: string, reason: string) => {
            if (!address || !isAdmin) {
                toast.error("Unauthorized: Admin access required");
                return false;
            }

            try {
                // Update issuer status in credential store
                credStore.updateIssuer(issuerAddress, { status: "suspended" });

                // Update application status in governance store
                const app = govStore.getApplicationByAddress(issuerAddress);
                if (app) {
                    govStore.updateApplicationStatus(
                        app.id,
                        "suspended",
                        address,
                        reason
                    );
                }

                // Add governance action
                const issuer = credStore.getIssuerByAddress(issuerAddress);
                govStore.addAction({
                    type: "issuer_suspended",
                    targetAddress: issuerAddress,
                    targetName: issuer?.name || "Unknown Issuer",
                    performedBy: address,
                    reason,
                    timestamp: Math.floor(Date.now() / 1000),
                });

                toast.success("Issuer suspended");
                return true;
            } catch (err: any) {
                toast.error(err?.message || "Failed to suspend issuer");
                return false;
            }
        },
        [address, isAdmin, credStore, govStore]
    );

    // ─── Reinstate Issuer ──────────────────

    const reinstateIssuerAction = useCallback(
        async (issuerAddress: string, reason: string) => {
            if (!address || !isAdmin) {
                toast.error("Unauthorized: Admin access required");
                return false;
            }

            try {
                credStore.updateIssuer(issuerAddress, { status: "active" });

                const app = govStore.getApplicationByAddress(issuerAddress);
                if (app) {
                    govStore.updateApplicationStatus(
                        app.id,
                        "approved",
                        address,
                        reason
                    );
                }

                const issuer = credStore.getIssuerByAddress(issuerAddress);
                govStore.addAction({
                    type: "issuer_reinstated",
                    targetAddress: issuerAddress,
                    targetName: issuer?.name || "Unknown Issuer",
                    performedBy: address,
                    reason,
                    timestamp: Math.floor(Date.now() / 1000),
                });

                toast.success("Issuer reinstated");
                return true;
            } catch (err: any) {
                toast.error(err?.message || "Failed to reinstate issuer");
                return false;
            }
        },
        [address, isAdmin, credStore, govStore]
    );

    return {
        // State
        address,
        isConnected,
        isAdmin,
        stats,

        // Application lists
        pendingApplications,
        underReviewApplications,
        approvedApplications,
        rejectedApplications,
        recentActions,

        // User-specific
        myApplication,
        hasExistingApplication,

        // Actions
        submitApplication,
        reviewApplication,
        suspendIssuerAction,
        reinstateIssuerAction,
    };
}
