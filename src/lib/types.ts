import React from "react";

// ============================================
// CORE TYPES FOR CREDGRAPH
// ============================================

// ─── Issuer Types ────────────────────────────

export interface Issuer {
  address: string;
  name: string;
  type: IssuerType;
  registeredAt: number;
  status: IssuerStatus;
  metadataUri?: string;
  description?: string;
  website?: string;
  email?: string;
  logoUrl?: string;
  credibilityScore?: number;
  totalIssued?: number;
  totalRevoked?: number;
}

export type IssuerType =
  | "university"
  | "department"
  | "training_org"
  | "club"
  | "company"
  | "government";

export type IssuerStatus = "active" | "suspended" | "revoked" | "pending";

// ─── Governance Types ────────────────────────

export interface GovernanceApplication {
  id: string;
  applicantAddress: string;
  institutionName: string;
  institutionType: IssuerType;
  email: string;
  website: string;
  description: string;
  documentUri?: string;
  documentHash?: string;
  status: GovernanceApplicationStatus;
  submittedAt: number;
  reviewedAt?: number;
  reviewedBy?: string;
  reviewNote?: string;
  txId?: string;
}

export type GovernanceApplicationStatus =
  | "pending"
  | "under_review"
  | "approved"
  | "rejected"
  | "suspended";

export interface GovernanceAction {
  id: string;
  type: GovernanceActionType;
  targetAddress: string;
  targetName: string;
  performedBy: string;
  reason: string;
  timestamp: number;
  txId?: string;
  applicationId?: string;
}

export type GovernanceActionType =
  | "issuer_approved"
  | "issuer_rejected"
  | "issuer_suspended"
  | "issuer_reinstated"
  | "issuer_revoked"
  | "application_submitted"
  | "application_reviewed";

export interface GovernanceStats {
  totalIssuers: number;
  activeIssuers: number;
  pendingApplications: number;
  suspendedIssuers: number;
  totalActions: number;
}

// ─── Credential Type Definitions ─────────────

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
  expiryDuration?: number; // seconds — 0 or undefined = never expires
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

// ─── Credential (Issued Instance) ────────────

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
  expiresAt?: number; // unix timestamp — undefined = never expires
  claimStatus?: ClaimStatus;
  claimedAt?: number;
  privacyLevel?: PrivacyLevel;
}

export type CredentialStatus = "active" | "revoked" | "pending" | "expired";

export type ClaimStatus = "escrow" | "claimable" | "claimed" | "expired_unclaimed";

export type PrivacyLevel = "public" | "private" | "selective";

// ─── Claim Flow Types ────────────────────────

export interface ClaimableCredential {
  credential: Credential;
  issuerInfo: Issuer;
  credentialType: CredentialType;
  requiresOptIn: boolean;
  estimatedGasCost: number;
  expiresAt?: number;
}

export interface ClaimResult {
  success: boolean;
  credentialId: string;
  txId?: string;
  error?: string;
}

// ─── Batch Issuance Types ────────────────────

export interface BatchIssueRow {
  recipientAddress: string;
  credentialTypeId: string;
  evidenceHash?: string;
  status: BatchRowStatus;
  error?: string;
  credentialId?: string;
  asaId?: number;
  txId?: string;
}

export type BatchRowStatus = "pending" | "processing" | "success" | "failed" | "skipped";

export interface BatchIssueJob {
  id: string;
  issuerAddress: string;
  totalRows: number;
  processedRows: number;
  successCount: number;
  failedCount: number;
  status: "preparing" | "processing" | "completed" | "cancelled";
  rows: BatchIssueRow[];
  startedAt: number;
  completedAt?: number;
}

// ─── Evidence Types ──────────────────────────

export interface EvidenceRecord {
  hash: string;
  uri?: string;
  fileName?: string;
  fileType?: string;
  fileSize?: number;
  uploadedAt: number;
  ipfsCid?: string;
  verified?: boolean;
  verifiedAt?: number;
}

// ─── Composition Rule ────────────────────────

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

// ─── Student Progress ────────────────────────

export interface CompositionProgress {
  rule: CompositionRule;
  earnedTypeIds: string[];
  missingTypeIds: string[];
  totalRequired: number;
  totalEarned: number;
  isEligible: boolean;
  compositeCredential?: Credential;
}

// ─── Verification Result ─────────────────────

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
  isExpired?: boolean;
  expiryStatus?: "active" | "expiring_soon" | "expired";
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
  expiredCredentials: number;
  compositeCredentials: number;
  allIssuersVerified: boolean;
}

// ─── Privacy / Selective Disclosure ──────────

export interface ShareLink {
  id: string;
  ownerAddress: string;
  credentialIds: string[];
  createdAt: number;
  expiresAt?: number;
  accessCount: number;
  label?: string;
}

// ─── Wallet State ────────────────────────────

export interface WalletState {
  address: string | null;
  isConnected: boolean;
  isConnecting: boolean;
  error: string | null;
}

// ─── Transaction Result ──────────────────────

export interface TransactionResult {
  success: boolean;
  txId?: string;
  asaId?: number;
  credentialId?: string;
  error?: string;
}

// ─── API Response Types ──────────────────────

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// ─── Tab Configuration ───────────────────────

export interface TabConfig {
  id: string;
  label: string;
  icon?: React.ReactNode;
  count?: number;
}

// ─── Table Column ────────────────────────────

export interface TableColumn<T> {
  key: keyof T | string;
  label: string;
  render?: (item: T) => React.ReactNode;
  sortable?: boolean;
  width?: string;
}

// ─── Form State ──────────────────────────────

export interface FormField {
  name: string;
  label: string;
  type: "text" | "textarea" | "select" | "file" | "number";
  placeholder?: string;
  required?: boolean;
  options?: { value: string; label: string }[];
  validation?: (value: string) => string | null;
}

// ─── Notification ────────────────────────────

export interface Notification {
  id: string;
  type: "success" | "error" | "info" | "warning";
  title: string;
  message: string;
  timestamp: number;
  read: boolean;
}

// ─── Expiry Helpers ──────────────────────────

export type ExpiryStatus = "active" | "expiring_soon" | "expired" | "never_expires";

// ─── Wallet Recovery ─────────────────────────

export interface RecoveryRequest {
  id: string;
  oldAddress: string;
  newAddress: string;
  identityProof: string; // hash of student ID or email
  status: "pending" | "approved" | "rejected";
  submittedAt: number;
  reviewedAt?: number;
  reviewedBy?: string;
}
