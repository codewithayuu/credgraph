import { create } from "zustand";
import {
    GovernanceApplication,
    GovernanceAction,
    GovernanceStats,
    GovernanceApplicationStatus,
} from "@/lib/types";
import {
    MOCK_GOVERNANCE_APPLICATIONS,
    MOCK_GOVERNANCE_ACTIONS,
} from "@/lib/mockData";
import { GOVERNANCE_CONFIG } from "@/lib/constants";
import { generateApplicationId, generateActionId } from "@/lib/utils";

interface GovernanceStore {
    // ─── State ──────────────────────────────
    applications: GovernanceApplication[];
    actions: GovernanceAction[];
    isLoading: boolean;

    // ─── Setters ────────────────────────────
    setApplications: (apps: GovernanceApplication[]) => void;
    setActions: (actions: GovernanceAction[]) => void;
    setLoading: (loading: boolean) => void;

    // ─── Application Operations ─────────────
    submitApplication: (app: Omit<GovernanceApplication, "id" | "status" | "submittedAt">) => GovernanceApplication;
    updateApplicationStatus: (
        id: string,
        status: GovernanceApplicationStatus,
        reviewedBy: string,
        reviewNote: string
    ) => void;

    // ─── Action Operations ──────────────────
    addAction: (action: Omit<GovernanceAction, "id">) => void;

    // ─── Query Methods ─────────────────────
    getApplicationsByStatus: (status: GovernanceApplicationStatus) => GovernanceApplication[];
    getApplicationByAddress: (address: string) => GovernanceApplication | undefined;
    getActionsByTarget: (address: string) => GovernanceAction[];
    getRecentActions: (limit?: number) => GovernanceAction[];
    getStats: () => GovernanceStats;
    isAdmin: (address: string) => boolean;
    hasExistingApplication: (address: string) => boolean;

    // ─── Init ──────────────────────────────
    loadMockData: () => void;
}

export const useGovernanceStore = create<GovernanceStore>((set, get) => ({
    // ─── Initial State ──────────────────────
    applications: [],
    actions: [],
    isLoading: false,

    // ─── Setters ────────────────────────────
    setApplications: (applications) => set({ applications }),
    setActions: (actions) => set({ actions }),
    setLoading: (loading) => set({ isLoading: loading }),

    // ─── Application Operations ─────────────
    submitApplication: (appData) => {
        const application: GovernanceApplication = {
            ...appData,
            id: generateApplicationId(),
            status: "pending",
            submittedAt: Math.floor(Date.now() / 1000),
        };

        set((state) => ({
            applications: [...state.applications, application],
        }));

        // Also add a governance action for the submission
        const action: GovernanceAction = {
            id: generateActionId(),
            type: "application_submitted",
            targetAddress: application.applicantAddress,
            targetName: application.institutionName,
            performedBy: application.applicantAddress,
            reason: "Initial issuer registration application",
            timestamp: application.submittedAt,
            applicationId: application.id,
        };

        set((state) => ({
            actions: [...state.actions, action],
        }));

        return application;
    },

    updateApplicationStatus: (id, status, reviewedBy, reviewNote) => {
        const now = Math.floor(Date.now() / 1000);
        const txId = `TXGOV${Date.now().toString(36).toUpperCase()}`;

        set((state) => ({
            applications: state.applications.map((app) =>
                app.id === id
                    ? {
                        ...app,
                        status,
                        reviewedAt: now,
                        reviewedBy,
                        reviewNote,
                        txId: status === "approved" || status === "rejected" ? txId : app.txId,
                    }
                    : app
            ),
        }));

        // Find the application to get target info
        const app = get().applications.find((a) => a.id === id);
        if (!app) return;

        // Map status to action type
        let actionType: GovernanceAction["type"] = "application_reviewed";
        if (status === "approved") actionType = "issuer_approved";
        else if (status === "rejected") actionType = "issuer_rejected";
        else if (status === "suspended") actionType = "issuer_suspended";
        else if (status === "under_review") actionType = "application_reviewed";

        const action: GovernanceAction = {
            id: generateActionId(),
            type: actionType,
            targetAddress: app.applicantAddress,
            targetName: app.institutionName,
            performedBy: reviewedBy,
            reason: reviewNote,
            timestamp: now,
            txId: status === "approved" || status === "rejected" ? txId : undefined,
            applicationId: id,
        };

        set((state) => ({
            actions: [...state.actions, action],
        }));
    },

    // ─── Action Operations ──────────────────
    addAction: (actionData) => {
        const action: GovernanceAction = {
            ...actionData,
            id: generateActionId(),
        };
        set((state) => ({
            actions: [...state.actions, action],
        }));
    },

    // ─── Query Methods ─────────────────────
    getApplicationsByStatus: (status) =>
        get().applications.filter((a) => a.status === status),

    getApplicationByAddress: (address) =>
        get().applications.find((a) => a.applicantAddress === address),

    getActionsByTarget: (address) =>
        get()
            .actions.filter((a) => a.targetAddress === address)
            .sort((a, b) => b.timestamp - a.timestamp),

    getRecentActions: (limit = 20) =>
        [...get().actions]
            .sort((a, b) => b.timestamp - a.timestamp)
            .slice(0, limit),

    getStats: () => {
        const state = get();
        const approved = state.applications.filter((a) => a.status === "approved");
        const pending = state.applications.filter((a) => a.status === "pending");
        const underReview = state.applications.filter((a) => a.status === "under_review");
        const suspended = state.applications.filter((a) => a.status === "suspended");

        return {
            totalIssuers: approved.length,
            activeIssuers: approved.length, // simplified — in production would cross-reference issuer store
            pendingApplications: pending.length + underReview.length,
            suspendedIssuers: suspended.length,
            totalActions: state.actions.length,
        };
    },

    isAdmin: (address) =>
        GOVERNANCE_CONFIG.adminWallets.includes(address),

    hasExistingApplication: (address) =>
        get().applications.some(
            (a) =>
                a.applicantAddress === address &&
                (a.status === "pending" || a.status === "under_review" || a.status === "approved")
        ),

    // ─── Init ──────────────────────────────
    loadMockData: () =>
        set({
            applications: MOCK_GOVERNANCE_APPLICATIONS,
            actions: MOCK_GOVERNANCE_ACTIONS,
        }),
}));
