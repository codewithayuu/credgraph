export const APP_NAME = "CredGraph";
export const APP_TAGLINE = "Don't trust the resume. Verify the chain.";

// ─── Algorand Network Configuration ─────────

export const ALGORAND_CONFIG = {
  testnet: {
    algodServer: "https://testnet-api.algonode.cloud",
    algodPort: "",
    algodToken: "",
    indexerServer: "https://testnet-idx.algonode.cloud",
    indexerPort: "",
    indexerToken: "",
    explorerUrl: "https://testnet.explorer.perawallet.app",
  },
  mainnet: {
    algodServer: "https://mainnet-api.algonode.cloud",
    algodPort: "",
    algodToken: "",
    indexerServer: "https://mainnet-idx.algonode.cloud",
    indexerPort: "",
    indexerToken: "",
    explorerUrl: "https://explorer.perawallet.app",
  },
};

export const ACTIVE_NETWORK: "testnet" | "mainnet" = "testnet";
export const NETWORK_CONFIG = ALGORAND_CONFIG[ACTIVE_NETWORK];

// ─── Smart Contract IDs ─────────────────────

export const CONTRACT_IDS = {
  issuerRegistry: 0,
  credentialRegistry: 0,
  compositionRules: 0,
  governanceRegistry: 0,
};

// ─── ASA Configuration ──────────────────────

export const ASA_CONFIG = {
  unitName: "CRED",
  namePrefix: "CG:",
  decimals: 0,
  totalSupply: 1,
};

// ─── Credential Category Styling ────────────

export const CREDENTIAL_CATEGORIES: Record<
  string,
  { label: string; color: string; bgColor: string; iconBg: string; bg: string; border: string }
> = {
  technical: {
    label: "Technical",
    color: "text-azure-400",
    bgColor: "bg-azure-500/8",
    iconBg: "bg-azure-500/12",
    bg: "bg-azure-500/8",
    border: "border-azure-500/15",
  },
  soft_skill: {
    label: "Soft Skill",
    color: "text-violet-400",
    bgColor: "bg-violet-500/8",
    iconBg: "bg-violet-500/12",
    bg: "bg-violet-500/8",
    border: "border-violet-500/15",
  },
  achievement: {
    label: "Achievement",
    color: "text-gold-400",
    bgColor: "bg-gold-500/8",
    iconBg: "bg-gold-500/12",
    bg: "bg-gold-500/8",
    border: "border-gold-500/15",
  },
  research: {
    label: "Research",
    color: "text-electric-400",
    bgColor: "bg-electric-500/8",
    iconBg: "bg-electric-500/12",
    bg: "bg-electric-500/8",
    border: "border-electric-500/15",
  },
  certification: {
    label: "Certification",
    color: "text-neon-400",
    bgColor: "bg-neon-500/8",
    iconBg: "bg-neon-500/12",
    bg: "bg-neon-500/8",
    border: "border-neon-500/15",
  },
  academic: {
    label: "Academic",
    color: "text-gold-300",
    bgColor: "bg-gold-400/8",
    iconBg: "bg-gold-400/12",
    bg: "bg-gold-400/8",
    border: "border-gold-400/15",
  },
};

export const CATEGORY_MAP = CREDENTIAL_CATEGORIES;

// ─── Credential Tier Styling ────────────────

export const CREDENTIAL_TIERS: Record<
  string,
  { label: string; color: string; level: number }
> = {
  beginner: { label: "Beginner", color: "text-neon-400", level: 1 },
  intermediate: { label: "Intermediate", color: "text-azure-400", level: 2 },
  advanced: { label: "Advanced", color: "text-violet-400", level: 3 },
  expert: { label: "Expert", color: "text-gold-400", level: 4 },
};

export const TIER_MAP = CREDENTIAL_TIERS;

// ─── Navigation Links ───────────────────────

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/issuer", label: "Issuers" },
  { href: "/student", label: "Dashboard" },
  { href: "/verify", label: "Verify" },
  { href: "/governance", label: "Governance" },
];

// ─── IPFS Gateway ────────────────────────────

export const IPFS_GATEWAY = "https://gateway.pinata.cloud/ipfs/";

// ─── Demo Wallets ────────────────────────────

export const DEMO_WALLETS = {
  admin: "ADMIN1CREDGRAPHGOVERNANCEWALLETXYZ234567890",
  issuer1: "ISSUER1ABCDEFGHIJKLMNOPQRSTUVWXYZ234567890ABC",
  issuer2: "ISSUER2XYZABCDEFGHIJKLMNOPQRSTUVWXYZ2345678",
  issuer3: "ISSUER3HACKCLUBDEFGHIJKLMNOPQRSTUVWXYZ23456",
  student1: "STUDENT1ABCDEFGHIJKLMNOPQRSTUVWXYZ234567890",
  student2: "STUDENT2XYZABCDEFGHIJKLMNOPQRSTUVWXYZ234568",
};

// ─── Governance Constants ────────────────────

export const GOVERNANCE_CONFIG = {
  adminWallets: [
    "ADMIN1CREDGRAPHGOVERNANCEWALLETXYZ234567890",
  ],
  minReviewTime: 86400, // 1 day in seconds
  applicationCooldown: 604800, // 7 days between re-applications
  maxPendingApplications: 50,
};

// ─── Claim Flow Constants ────────────────────

export const CLAIM_CONFIG = {
  escrowExpiryDuration: 2592000, // 30 days
  estimatedOptInCost: 0.1, // ALGO
  estimatedClaimCost: 0.001, // ALGO
  maxClaimRetries: 3,
};

// ─── Batch Issuance Constants ────────────────

export const BATCH_CONFIG = {
  maxRowsPerBatch: 16, // Algorand group transaction limit
  maxTotalRows: 500,
  supportedFileTypes: [".csv"],
  requiredColumns: ["wallet_address", "credential_type_id"],
  optionalColumns: ["evidence_hash"],
};

// ─── Expiry Constants ────────────────────────

export const EXPIRY_CONFIG = {
  expiringSoonThreshold: 2592000, // 30 days in seconds
  defaultExpiryDurations: [
    { label: "Never", value: 0 },
    { label: "6 Months", value: 15552000 },
    { label: "1 Year", value: 31536000 },
    { label: "2 Years", value: 63072000 },
    { label: "3 Years", value: 94608000 },
    { label: "5 Years", value: 157680000 },
  ],
};

// ─── Issuer Type Labels ─────────────────────

export const ISSUER_TYPE_LABELS: Record<string, string> = {
  university: "University",
  department: "Department",
  training_org: "Training Organization",
  club: "Club / Society",
  company: "Company",
  government: "Government Body",
};

// ─── Governance Status Labels ───────────────

export const APPLICATION_STATUS_LABELS: Record<string, { label: string; color: string }> = {
  pending: { label: "Pending Review", color: "text-gold-400" },
  under_review: { label: "Under Review", color: "text-azure-400" },
  approved: { label: "Approved", color: "text-neon-400" },
  rejected: { label: "Rejected", color: "text-crimson-400" },
  suspended: { label: "Suspended", color: "text-violet-400" },
};
