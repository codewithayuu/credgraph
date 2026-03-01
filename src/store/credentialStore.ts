import { create } from "zustand";
import {
  Credential,
  CredentialType,
  CompositionRule,
  Issuer,
  CompositionProgress,
  ClaimStatus,
  PrivacyLevel,
  BatchIssueJob,
  BatchIssueRow,
  ShareLink,
} from "@/lib/types";
import {
  MOCK_ISSUERS,
  MOCK_CREDENTIAL_TYPES,
  MOCK_CREDENTIALS,
  MOCK_COMPOSITION_RULES,
} from "@/lib/mockData";
import { EXPIRY_CONFIG } from "@/lib/constants";

interface CredentialStore {
  // ─── State ──────────────────────────────
  issuers: Issuer[];
  credentialTypes: CredentialType[];
  credentials: Credential[];
  compositionRules: CompositionRule[];
  batchJobs: BatchIssueJob[];
  shareLinks: ShareLink[];
  isLoading: boolean;

  // ─── Setters ────────────────────────────
  setIssuers: (issuers: Issuer[]) => void;
  setCredentialTypes: (types: CredentialType[]) => void;
  setCredentials: (credentials: Credential[]) => void;
  setCompositionRules: (rules: CompositionRule[]) => void;
  setLoading: (loading: boolean) => void;

  // ─── CRUD Operations ───────────────────
  addIssuer: (issuer: Issuer) => void;
  updateIssuer: (address: string, updates: Partial<Issuer>) => void;
  removeIssuer: (address: string) => void;
  addCredentialType: (type: CredentialType) => void;
  addCredential: (credential: Credential) => void;
  updateCredential: (id: string, updates: Partial<Credential>) => void;
  addCompositionRule: (rule: CompositionRule) => void;
  revokeCredential: (id: string, reason: string) => void;

  // ─── Claim Operations ──────────────────
  claimCredential: (id: string) => void;
  getClaimableCredentials: (address: string) => Credential[];

  // ─── Privacy Operations ────────────────
  setCredentialPrivacy: (id: string, level: PrivacyLevel) => void;
  addShareLink: (link: ShareLink) => void;
  removeShareLink: (id: string) => void;
  getShareLinks: (ownerAddress: string) => ShareLink[];

  // ─── Batch Operations ──────────────────
  addBatchJob: (job: BatchIssueJob) => void;
  updateBatchJob: (id: string, updates: Partial<BatchIssueJob>) => void;
  updateBatchRow: (jobId: string, rowIndex: number, updates: Partial<BatchIssueRow>) => void;
  getBatchJobs: (issuerAddress: string) => BatchIssueJob[];

  // ─── Query Methods ─────────────────────
  getCredentialsByRecipient: (address: string) => Credential[];
  getCredentialsByIssuer: (address: string) => Credential[];
  getCredentialTypesByIssuer: (address: string) => CredentialType[];
  getCredentialTypeById: (id: string) => CredentialType | undefined;
  getCompositionProgress: (address: string) => CompositionProgress[];
  getIssuerByAddress: (address: string) => Issuer | undefined;
  isAuthorizedIssuer: (address: string) => boolean;
  getExpiringCredentials: (address: string) => Credential[];
  getExpiredCredentials: (address: string) => Credential[];

  // ─── Init ──────────────────────────────
  loadMockData: () => void;
}

export const useCredentialStore = create<CredentialStore>((set, get) => ({
  // ─── Initial State ──────────────────────
  issuers: [],
  credentialTypes: [],
  credentials: [],
  compositionRules: [],
  batchJobs: [],
  shareLinks: [],
  isLoading: false,

  // ─── Setters ────────────────────────────
  setIssuers: (issuers) => set({ issuers }),
  setCredentialTypes: (types) => set({ credentialTypes: types }),
  setCredentials: (credentials) => set({ credentials }),
  setCompositionRules: (rules) => set({ compositionRules: rules }),
  setLoading: (loading) => set({ isLoading: loading }),

  // ─── Issuer CRUD ───────────────────────
  addIssuer: (issuer) =>
    set((state) => ({ issuers: [...state.issuers, issuer] })),

  updateIssuer: (address, updates) =>
    set((state) => ({
      issuers: state.issuers.map((i) =>
        i.address === address ? { ...i, ...updates } : i
      ),
    })),

  removeIssuer: (address) =>
    set((state) => ({
      issuers: state.issuers.filter((i) => i.address !== address),
    })),

  // ─── Credential Type CRUD ──────────────
  addCredentialType: (type) =>
    set((state) => ({ credentialTypes: [...state.credentialTypes, type] })),

  // ─── Credential CRUD ──────────────────
  addCredential: (credential) =>
    set((state) => ({ credentials: [...state.credentials, credential] })),

  updateCredential: (id, updates) =>
    set((state) => ({
      credentials: state.credentials.map((c) =>
        c.id === id ? { ...c, ...updates } : c
      ),
    })),

  // ─── Composition Rule CRUD ─────────────
  addCompositionRule: (rule) =>
    set((state) => ({ compositionRules: [...state.compositionRules, rule] })),

  // ─── Revoke ────────────────────────────
  revokeCredential: (id, reason) =>
    set((state) => ({
      credentials: state.credentials.map((c) =>
        c.id === id
          ? {
            ...c,
            status: "revoked" as const,
            revokedAt: Math.floor(Date.now() / 1000),
            revocationReason: reason,
          }
          : c
      ),
    })),

  // ─── Claim Operations ──────────────────
  claimCredential: (id) =>
    set((state) => ({
      credentials: state.credentials.map((c) =>
        c.id === id
          ? {
            ...c,
            status: "active" as const,
            claimStatus: "claimed" as ClaimStatus,
            claimedAt: Math.floor(Date.now() / 1000),
          }
          : c
      ),
    })),

  getClaimableCredentials: (address) =>
    get().credentials.filter(
      (c) =>
        c.recipientAddress === address &&
        c.claimStatus === "claimable" &&
        c.status === "pending"
    ),

  // ─── Privacy Operations ────────────────
  setCredentialPrivacy: (id, level) =>
    set((state) => ({
      credentials: state.credentials.map((c) =>
        c.id === id ? { ...c, privacyLevel: level } : c
      ),
    })),

  addShareLink: (link) =>
    set((state) => ({ shareLinks: [...state.shareLinks, link] })),

  removeShareLink: (id) =>
    set((state) => ({
      shareLinks: state.shareLinks.filter((l) => l.id !== id),
    })),

  getShareLinks: (ownerAddress) =>
    get().shareLinks.filter((l) => l.ownerAddress === ownerAddress),

  // ─── Batch Operations ──────────────────
  addBatchJob: (job) =>
    set((state) => ({ batchJobs: [...state.batchJobs, job] })),

  updateBatchJob: (id, updates) =>
    set((state) => ({
      batchJobs: state.batchJobs.map((j) =>
        j.id === id ? { ...j, ...updates } : j
      ),
    })),

  updateBatchRow: (jobId, rowIndex, updates) =>
    set((state) => ({
      batchJobs: state.batchJobs.map((j) => {
        if (j.id !== jobId) return j;
        const newRows = [...j.rows];
        if (newRows[rowIndex]) {
          newRows[rowIndex] = { ...newRows[rowIndex], ...updates };
        }
        return { ...j, rows: newRows };
      }),
    })),

  getBatchJobs: (issuerAddress) =>
    get().batchJobs.filter((j) => j.issuerAddress === issuerAddress),

  // ─── Query Methods ─────────────────────
  getCredentialsByRecipient: (address) =>
    get().credentials.filter((c) => c.recipientAddress === address),

  getCredentialsByIssuer: (address) =>
    get().credentials.filter((c) => c.issuerAddress === address),

  getCredentialTypesByIssuer: (address) =>
    get().credentialTypes.filter((t) => t.issuerAddress === address),

  getCredentialTypeById: (id) =>
    get().credentialTypes.find((t) => t.id === id),

  getCompositionProgress: (address) => {
    const state = get();
    const now = Math.floor(Date.now() / 1000);
    const studentCredentials = state.credentials.filter(
      (c) =>
        c.recipientAddress === address &&
        c.status === "active" &&
        c.claimStatus === "claimed" &&
        // Expired credentials don't count toward composition
        (!c.expiresAt || c.expiresAt > now)
    );
    const studentTypeIds = studentCredentials.map((c) => c.credentialTypeId);

    return state.compositionRules
      .filter((rule) => rule.status === "active")
      .map((rule) => {
        const earnedTypeIds = rule.requiredCredentialTypeIds.filter((id) =>
          studentTypeIds.includes(id)
        );
        const missingTypeIds = rule.requiredCredentialTypeIds.filter(
          (id) => !studentTypeIds.includes(id)
        );
        const compositeCredential = studentCredentials.find(
          (c) => c.credentialTypeId === rule.compositeCredentialTypeId
        );

        return {
          rule,
          earnedTypeIds,
          missingTypeIds,
          totalRequired: rule.requiredCredentialTypeIds.length,
          totalEarned: earnedTypeIds.length,
          isEligible: missingTypeIds.length === 0,
          compositeCredential,
        };
      });
  },

  getIssuerByAddress: (address) =>
    get().issuers.find((i) => i.address === address),

  isAuthorizedIssuer: (address) =>
    get().issuers.some((i) => i.address === address && i.status === "active"),

  getExpiringCredentials: (address) => {
    const now = Math.floor(Date.now() / 1000);
    const threshold = now + EXPIRY_CONFIG.expiringSoonThreshold;
    return get().credentials.filter(
      (c) =>
        c.recipientAddress === address &&
        c.status === "active" &&
        c.expiresAt &&
        c.expiresAt > now &&
        c.expiresAt <= threshold
    );
  },

  getExpiredCredentials: (address) => {
    const now = Math.floor(Date.now() / 1000);
    return get().credentials.filter(
      (c) =>
        c.recipientAddress === address &&
        c.expiresAt &&
        c.expiresAt <= now &&
        c.status === "active" // still marked active but actually expired
    );
  },

  // ─── Init ──────────────────────────────
  loadMockData: () =>
    set({
      issuers: MOCK_ISSUERS,
      credentialTypes: MOCK_CREDENTIAL_TYPES,
      credentials: MOCK_CREDENTIALS,
      compositionRules: MOCK_COMPOSITION_RULES,
      batchJobs: [],
      shareLinks: [],
    }),
}));
