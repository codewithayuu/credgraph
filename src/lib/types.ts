import React from "react";

// ============================================
// CORE TYPES FOR CREDGRAPH
// ============================================

// Issuer Types
export interface Issuer {
  address: string;
  name: string;
  type: IssuerType;
  registeredAt: number;
  status: IssuerStatus;
  metadataUri?: string;
  description?: string;
  website?: string;
  logoUrl?: string;
}

export type IssuerType =
  | "university"
  | "department"
  | "training_org"
  | "club"
  | "company"
  | "government";

export type IssuerStatus = "active" | "suspended" | "revoked";

// Credential Type Definitions
export interface CredentialType {
  id: string;
  name: string;
  description: string;
  category: CredentialCategory;
  tier: CredentialTier;
  issuerAddress: string;
  issuerName: string;
  evidenceRequired: boolean;
  createdAt: number;
  status: "active" | "inactive";
  metadataUri?: string;
  badgeImageUrl?: string;
}

export type CredentialCategory =
  | "technical"
  | "soft_skill"
  | "achievement"
  | "research"
  | "certification"
  | "academic";

export type CredentialTier =
  | "beginner"
  | "intermediate"
  | "advanced"
  | "expert";

// Credential (Issued Instance)
export interface Credential {
  id: string;
  asaId: number;
  credentialTypeId: string;
  credentialTypeName: string;
  category: CredentialCategory;
  tier: CredentialTier;
  issuerAddress: string;
  issuerName: string;
  recipientAddress: string;
  evidenceHash?: string;
  evidenceUri?: string;
  issuedAt: number;
  status: CredentialStatus;
  revokedAt?: number;
  revocationReason?: string;
  txId?: string;
  metadataUri?: string;
  badgeImageUrl?: string;
}

export type CredentialStatus = "active" | "revoked" | "pending";

// Composition Rule
export interface CompositionRule {
  id: string;
  name: string;
  description: string;
  definedBy: string;
  definedByName: string;
  requiredCredentialTypeIds: string[];
  requiredCredentialTypes: CredentialType[];
  compositionType: CompositionType;
  compositeCredentialTypeId: string;
  autoIssue: boolean;
  createdAt: number;
  status: "active" | "inactive";
  badgeImageUrl?: string;
}

export type CompositionType = "all_required" | "n_of_m" | "tiered";

// Student Progress
export interface CompositionProgress {
  rule: CompositionRule;
  earnedTypeIds: string[];
  missingTypeIds: string[];
  totalRequired: number;
  totalEarned: number;
  isEligible: boolean;
  compositeCredential?: Credential;
}

// Verification Result
export interface VerificationResult {
  walletAddress: string;
  credentials: VerifiedCredential[];
  composites: VerifiedComposite[];
  summary: VerificationSummary;
}

export interface VerifiedCredential extends Credential {
  issuerVerified: boolean;
  issuerInfo?: Issuer;
  isOriginalRecipient: boolean;
}

export interface VerifiedComposite {
  compositeCredential: VerifiedCredential;
  components: VerifiedCredential[];
  allComponentsValid: boolean;
  rule: CompositionRule;
}

export interface VerificationSummary {
  totalCredentials: number;
  activeCredentials: number;
  revokedCredentials: number;
  compositeCredentials: number;
  allIssuersVerified: boolean;
}

// Wallet State
export interface WalletState {
  address: string | null;
  isConnected: boolean;
  isConnecting: boolean;
  error: string | null;
}

// Transaction Result
export interface TransactionResult {
  success: boolean;
  txId?: string;
  asaId?: number;
  credentialId?: string;
  error?: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// Tab Configuration
export interface TabConfig {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  count?: number;
}

// Table Column
export interface TableColumn<T> {
  key: keyof T | string;
  label: string;
  render?: (item: T) => React.ReactNode;
  sortable?: boolean;
  width?: string;
}

// Form State
export interface FormField {
  name: string;
  label: string;
  type: "text" | "textarea" | "select" | "file" | "number";
  placeholder?: string;
  required?: boolean;
  options?: { value: string; label: string }[];
  validation?: (value: string) => string | null;
}

// Notification
export interface Notification {
  id: string;
  type: "success" | "error" | "info" | "warning";
  title: string;
  message: string;
  timestamp: number;
  read: boolean;
}
