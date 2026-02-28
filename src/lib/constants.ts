// ============================================
// APPLICATION CONSTANTS
// ============================================

export const APP_NAME = "CredGraph";
export const APP_TAGLINE = "Don't trust the resume. Verify the chain.";
export const APP_DESCRIPTION =
  "Composable, verifiable academic credentials on Algorand. Issue, own, verify, compose.";

// Algorand Network Configuration
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

// Smart Contract App IDs (to be filled after deployment)
export const CONTRACT_IDS = {
  issuerRegistry: 0,
  credentialRegistry: 0,
  compositionRules: 0,
};

// ASA Configuration
export const ASA_CONFIG = {
  unitName: "CRED",
  namePrefix: "CG:",
  decimals: 0,
  totalSupply: 1,
};

// Category Configuration
export const CREDENTIAL_CATEGORIES: Record<
  string,
  { label: string; color: string; bgColor: string; borderColor: string }
> = {
  technical: {
    label: "Technical",
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/20",
  },
  soft_skill: {
    label: "Soft Skill",
    color: "text-purple-400",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/20",
  },
  achievement: {
    label: "Achievement",
    color: "text-amber-400",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/20",
  },
  research: {
    label: "Research",
    color: "text-cyan-400",
    bgColor: "bg-cyan-500/10",
    borderColor: "border-cyan-500/20",
  },
  certification: {
    label: "Certification",
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/20",
  },
  academic: {
    label: "Academic",
    color: "text-indigo-400",
    bgColor: "bg-indigo-500/10",
    borderColor: "border-indigo-500/20",
  },
};

// Tier Configuration
export const CREDENTIAL_TIERS: Record<
  string,
  { label: string; color: string; level: number }
> = {
  beginner: { label: "Beginner", color: "text-green-400", level: 1 },
  intermediate: { label: "Intermediate", color: "text-blue-400", level: 2 },
  advanced: { label: "Advanced", color: "text-purple-400", level: 3 },
  expert: { label: "Expert", color: "text-amber-400", level: 4 },
};

// Issuer Type Configuration
export const ISSUER_TYPES: Record<string, { label: string; icon: string }> = {
  university: { label: "University", icon: "GraduationCap" },
  department: { label: "Department", icon: "Building2" },
  training_org: { label: "Training Organization", icon: "BookOpen" },
  club: { label: "Club / Society", icon: "Users" },
  company: { label: "Company", icon: "Briefcase" },
  government: { label: "Government", icon: "Landmark" },
};

// Navigation Links
export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/issuer", label: "Issuer Portal" },
  { href: "/student", label: "Student Dashboard" },
  { href: "/verify", label: "Verify" },
];

// Status Colors
export const STATUS_STYLES: Record<
  string,
  { bg: string; text: string; border: string; dot: string }
> = {
  active: {
    bg: "bg-emerald-500/10",
    text: "text-emerald-400",
    border: "border-emerald-500/20",
    dot: "bg-emerald-400",
  },
  revoked: {
    bg: "bg-red-500/10",
    text: "text-red-400",
    border: "border-red-500/20",
    dot: "bg-red-400",
  },
  pending: {
    bg: "bg-amber-500/10",
    text: "text-amber-400",
    border: "border-amber-500/20",
    dot: "bg-amber-400",
  },
  suspended: {
    bg: "bg-orange-500/10",
    text: "text-orange-400",
    border: "border-orange-500/20",
    dot: "bg-orange-400",
  },
  verified: {
    bg: "bg-brand-500/10",
    text: "text-brand-400",
    border: "border-brand-500/20",
    dot: "bg-brand-400",
  },
};

// Animation Variants (for Framer Motion)
export const MOTION_VARIANTS = {
  fadeInUp: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
  },
  fadeInDown: {
    initial: { opacity: 0, y: -30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
  },
  fadeInLeft: {
    initial: { opacity: 0, x: -30 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
  },
  fadeInRight: {
    initial: { opacity: 0, x: 30 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.5, ease: "easeOut" },
  },
  staggerContainer: {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  },
  staggerItem: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  },
};

// Demo Wallet Addresses (for testing)
export const DEMO_WALLETS = {
  admin: "ADMIN_WALLET_ADDRESS_PLACEHOLDER",
  issuer1: "ISSUER1_WALLET_ADDRESS_PLACEHOLDER",
  issuer2: "ISSUER2_WALLET_ADDRESS_PLACEHOLDER",
  student1: "STUDENT1_WALLET_ADDRESS_PLACEHOLDER",
  student2: "STUDENT2_WALLET_ADDRESS_PLACEHOLDER",
};

// IPFS Gateway
export const IPFS_GATEWAY = "https://gateway.pinata.cloud/ipfs/";

// Pinata Configuration
export const PINATA_CONFIG = {
  apiUrl: "https://api.pinata.cloud",
  gateway: "https://gateway.pinata.cloud/ipfs/",
};
