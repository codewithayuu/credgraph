export const APP_NAME = "CredGraph";
export const APP_TAGLINE = "Don't trust the resume. Verify the chain.";

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

export const CONTRACT_IDS = {
  issuerRegistry: 0,
  credentialRegistry: 0,
  compositionRules: 0,
};

export const ASA_CONFIG = {
  unitName: "CRED",
  namePrefix: "CG:",
  decimals: 0,
  totalSupply: 1,
};

export const CATEGORY_MAP: Record<string, { label: string; color: string; bg: string; border: string; iconBg: string }> = {
  technical: {
    label: "Technical",
    color: "text-azure-400",
    bg: "bg-azure-500/8",
    border: "border-azure-500/15",
    iconBg: "bg-azure-500/12",
  },
  soft_skill: {
    label: "Soft Skill",
    color: "text-violet-400",
    bg: "bg-violet-500/8",
    border: "border-violet-500/15",
    iconBg: "bg-violet-500/12",
  },
  achievement: {
    label: "Achievement",
    color: "text-gold-400",
    bg: "bg-gold-500/8",
    border: "border-gold-500/15",
    iconBg: "bg-gold-500/12",
  },
  research: {
    label: "Research",
    color: "text-electric-400",
    bg: "bg-electric-500/8",
    border: "border-electric-500/15",
    iconBg: "bg-electric-500/12",
  },
  certification: {
    label: "Certification",
    color: "text-neon-400",
    bg: "bg-neon-500/8",
    border: "border-neon-500/15",
    iconBg: "bg-neon-500/12",
  },
  academic: {
    label: "Academic",
    color: "text-gold-300",
    bg: "bg-gold-400/8",
    border: "border-gold-400/15",
    iconBg: "bg-gold-400/12",
  },
};

export const TIER_MAP: Record<string, { label: string; color: string; level: number }> = {
  beginner: { label: "Beginner", color: "text-neon-400", level: 1 },
  intermediate: { label: "Intermediate", color: "text-azure-400", level: 2 },
  advanced: { label: "Advanced", color: "text-violet-400", level: 3 },
  expert: { label: "Expert", color: "text-gold-400", level: 4 },
};

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/issuer", label: "Issuers" },
  { href: "/student", label: "Dashboard" },
  { href: "/verify", label: "Verify" },
];

export const IPFS_GATEWAY = "https://gateway.pinata.cloud/ipfs/";

export const DEMO_WALLETS = {
  admin: "ADMIN_WALLET_PLACEHOLDER",
  issuer1: "ISSUER1ABCDEFGHIJKLMNOPQRSTUVWXYZ234567890ABC",
  issuer2: "ISSUER2XYZABCDEFGHIJKLMNOPQRSTUVWXYZ2345678",
  issuer3: "ISSUER3HACKCLUBDEFGHIJKLMNOPQRSTUVWXYZ23456",
  student1: "STUDENT1ABCDEFGHIJKLMNOPQRSTUVWXYZ234567890",
  student2: "STUDENT2XYZABCDEFGHIJKLMNOPQRSTUVWXYZ234568",
};
