import { create } from "zustand";
import {
  Credential,
  CredentialType,
  CompositionRule,
  Issuer,
  CompositionProgress,
} from "@/lib/types";
import { MOCK_ISSUERS, MOCK_CREDENTIAL_TYPES, MOCK_CREDENTIALS, MOCK_COMPOSITION_RULES } from "@/lib/mockData";

interface CredentialStore {
  issuers: Issuer[];
  credentialTypes: CredentialType[];
  credentials: Credential[];
  compositionRules: CompositionRule[];
  isLoading: boolean;

  setIssuers: (issuers: Issuer[]) => void;
  setCredentialTypes: (types: CredentialType[]) => void;
  setCredentials: (credentials: Credential[]) => void;
  setCompositionRules: (rules: CompositionRule[]) => void;
  setLoading: (loading: boolean) => void;

  addCredentialType: (type: CredentialType) => void;
  addCredential: (credential: Credential) => void;
  addCompositionRule: (rule: CompositionRule) => void;
  revokeCredential: (id: string, reason: string) => void;

  getCredentialsByRecipient: (address: string) => Credential[];
  getCredentialsByIssuer: (address: string) => Credential[];
  getCredentialTypesByIssuer: (address: string) => CredentialType[];
  getCompositionProgress: (address: string) => CompositionProgress[];
  getIssuerByAddress: (address: string) => Issuer | undefined;
  isAuthorizedIssuer: (address: string) => boolean;

  loadMockData: () => void;
}

export const useCredentialStore = create<CredentialStore>((set, get) => ({
  issuers: [],
  credentialTypes: [],
  credentials: [],
  compositionRules: [],
  isLoading: false,

  setIssuers: (issuers) => set({ issuers }),
  setCredentialTypes: (types) => set({ credentialTypes: types }),
  setCredentials: (credentials) => set({ credentials }),
  setCompositionRules: (rules) => set({ compositionRules: rules }),
  setLoading: (loading) => set({ isLoading: loading }),

  addCredentialType: (type) =>
    set((state) => ({ credentialTypes: [...state.credentialTypes, type] })),

  addCredential: (credential) =>
    set((state) => ({ credentials: [...state.credentials, credential] })),

  addCompositionRule: (rule) =>
    set((state) => ({ compositionRules: [...state.compositionRules, rule] })),

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

  getCredentialsByRecipient: (address) =>
    get().credentials.filter((c) => c.recipientAddress === address),

  getCredentialsByIssuer: (address) =>
    get().credentials.filter((c) => c.issuerAddress === address),

  getCredentialTypesByIssuer: (address) =>
    get().credentialTypes.filter((t) => t.issuerAddress === address),

  getCompositionProgress: (address) => {
    const state = get();
    const studentCredentials = state.credentials.filter(
      (c) => c.recipientAddress === address && c.status === "active"
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

  loadMockData: () =>
    set({
      issuers: MOCK_ISSUERS,
      credentialTypes: MOCK_CREDENTIAL_TYPES,
      credentials: MOCK_CREDENTIALS,
      compositionRules: MOCK_COMPOSITION_RULES,
    }),
}));
