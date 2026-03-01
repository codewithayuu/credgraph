import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ExpiryStatus } from "@/lib/types";
import { EXPIRY_CONFIG } from "@/lib/constants";

// ─── Class Name Utility ──────────────────────

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ─── Address Utilities ───────────────────────

export function truncateAddress(address: string, chars: number = 6): string {
  if (!address) return "";
  if (address.length <= chars * 2) return address;
  return `${address.slice(0, chars)}...${address.slice(-chars)}`;
}

export function isValidAlgorandAddress(address: string): boolean {
  if (!address) return false;
  // Algorand addresses are 58 characters, base32 encoded
  // For mock data, we also accept our longer demo addresses
  return address.length >= 40 && /^[A-Z0-9]+$/.test(address);
}

// ─── Timestamp Formatting ────────────────────

export function formatTimestamp(timestamp: number): string {
  return new Date(timestamp * 1000).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatTimestampShort(timestamp: number): string {
  return new Date(timestamp * 1000).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function formatTimestampRelative(timestamp: number): string {
  const now = Math.floor(Date.now() / 1000);
  const diff = now - timestamp;

  if (diff < 0) {
    // Future timestamp (for expiry)
    const absDiff = Math.abs(diff);
    if (absDiff < 3600) return `in ${Math.floor(absDiff / 60)}m`;
    if (absDiff < 86400) return `in ${Math.floor(absDiff / 3600)}h`;
    if (absDiff < 2592000) return `in ${Math.floor(absDiff / 86400)}d`;
    return `in ${Math.floor(absDiff / 2592000)}mo`;
  }

  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 2592000) return `${Math.floor(diff / 86400)}d ago`;
  return formatTimestampShort(timestamp);
}

export function formatDuration(seconds: number): string {
  if (seconds === 0) return "Never";
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours`;
  if (seconds < 2592000) return `${Math.floor(seconds / 86400)} days`;
  if (seconds < 31536000) return `${Math.floor(seconds / 2592000)} months`;
  const years = Math.floor(seconds / 31536000);
  return years === 1 ? "1 year" : `${years} years`;
}

// ─── Explorer URLs ───────────────────────────

export function getExplorerUrl(
  type: "transaction" | "asset" | "address",
  id: string | number,
  network: "testnet" | "mainnet" = "testnet"
): string {
  const base =
    network === "testnet"
      ? "https://testnet.explorer.perawallet.app"
      : "https://explorer.perawallet.app";

  switch (type) {
    case "transaction":
      return `${base}/tx/${id}`;
    case "asset":
      return `${base}/asset/${id}`;
    case "address":
      return `${base}/address/${id}`;
  }
}

// ─── IPFS URLs ───────────────────────────────

export function getIpfsUrl(cid: string): string {
  if (cid.startsWith("ipfs://")) {
    return `https://gateway.pinata.cloud/ipfs/${cid.replace("ipfs://", "")}`;
  }
  return `https://gateway.pinata.cloud/ipfs/${cid}`;
}

// ─── ID Generation ───────────────────────────

export function generateCredentialId(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 8);
  return `CRED-${timestamp}-${random}`.toUpperCase();
}

export function generateRuleId(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 6);
  return `COMP-${timestamp}-${random}`.toUpperCase();
}

export function generateTypeId(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 6);
  return `CT-${timestamp}-${random}`.toUpperCase();
}

export function generateApplicationId(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 6);
  return `APP-${timestamp}-${random}`.toUpperCase();
}

export function generateActionId(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 6);
  return `ACTION-${timestamp}-${random}`.toUpperCase();
}

export function generateBatchId(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 6);
  return `BATCH-${timestamp}-${random}`.toUpperCase();
}

export function generateShareLinkId(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 8);
  return `SHARE-${timestamp}-${random}`.toUpperCase();
}

// ─── File Hashing ────────────────────────────

export async function hashFile(file: File): Promise<string> {
  const buffer = await file.arrayBuffer();
  const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return `sha256:${hashHex}`;
}

export async function hashString(input: string): Promise<string> {
  const buffer = new TextEncoder().encode(input);
  const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return `sha256:${hashHex}`;
}

// ─── Clipboard ───────────────────────────────

export function copyToClipboard(text: string): Promise<void> {
  return navigator.clipboard.writeText(text);
}

// ─── Async Utility ───────────────────────────

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ─── Verification URL ────────────────────────

export function getVerificationUrl(address: string): string {
  return `${typeof window !== "undefined" ? window.location.origin : ""}/verify/${address}`;
}

// ─── Category Styling ────────────────────────

export function getCategoryStyle(category: string) {
  const styles: Record<string, { bg: string; text: string; border: string }> = {
    technical: {
      bg: "bg-azure-500/10",
      text: "text-azure-400",
      border: "border-azure-500/20",
    },
    soft_skill: {
      bg: "bg-violet-500/10",
      text: "text-violet-400",
      border: "border-violet-500/20",
    },
    achievement: {
      bg: "bg-gold-500/10",
      text: "text-gold-400",
      border: "border-gold-500/20",
    },
    research: {
      bg: "bg-electric-500/10",
      text: "text-electric-400",
      border: "border-electric-500/20",
    },
    certification: {
      bg: "bg-neon-500/10",
      text: "text-neon-400",
      border: "border-neon-500/20",
    },
    academic: {
      bg: "bg-gold-400/10",
      text: "text-gold-300",
      border: "border-gold-400/20",
    },
  };
  return styles[category] || styles.technical;
}

// ─── Tier Level ──────────────────────────────

export function getTierLevel(tier: string): number {
  const levels: Record<string, number> = {
    beginner: 1,
    intermediate: 2,
    advanced: 3,
    expert: 4,
  };
  return levels[tier] || 1;
}

// ─── Expiry Utilities ────────────────────────

export function getExpiryStatus(expiresAt?: number): ExpiryStatus {
  if (!expiresAt || expiresAt === 0) return "never_expires";

  const now = Math.floor(Date.now() / 1000);
  const remaining = expiresAt - now;

  if (remaining <= 0) return "expired";
  if (remaining <= EXPIRY_CONFIG.expiringSoonThreshold) return "expiring_soon";
  return "active";
}

export function getExpiryLabel(expiresAt?: number): string {
  if (!expiresAt || expiresAt === 0) return "No Expiry";

  const status = getExpiryStatus(expiresAt);
  const now = Math.floor(Date.now() / 1000);

  switch (status) {
    case "expired":
      return `Expired ${formatTimestampRelative(expiresAt)}`;
    case "expiring_soon": {
      const remaining = expiresAt - now;
      const days = Math.floor(remaining / 86400);
      return days <= 1 ? "Expires tomorrow" : `Expires in ${days} days`;
    }
    case "active":
      return `Expires ${formatTimestampShort(expiresAt)}`;
    default:
      return "No Expiry";
  }
}

export function getExpiryColor(status: ExpiryStatus): string {
  switch (status) {
    case "expired":
      return "text-crimson-400";
    case "expiring_soon":
      return "text-gold-400";
    case "active":
      return "text-neon-400";
    case "never_expires":
      return "text-surface-400";
    default:
      return "text-surface-400";
  }
}

// ─── CSV Parsing ─────────────────────────────

export function parseCSV(
  csvContent: string
): { headers: string[]; rows: string[][] } {
  const lines = csvContent
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  if (lines.length === 0) return { headers: [], rows: [] };

  const headers = lines[0].split(",").map((h) => h.trim().toLowerCase());
  const rows = lines.slice(1).map((line) =>
    line.split(",").map((cell) => cell.trim())
  );

  return { headers, rows };
}

export function validateCSVHeaders(
  headers: string[],
  required: string[]
): { valid: boolean; missing: string[] } {
  const missing = required.filter((col) => !headers.includes(col));
  return { valid: missing.length === 0, missing };
}

// ─── Credibility Score Styling ───────────────

export function getCredibilityColor(score: number): string {
  if (score >= 90) return "text-neon-400";
  if (score >= 75) return "text-electric-400";
  if (score >= 50) return "text-gold-400";
  return "text-crimson-400";
}

export function getCredibilityLabel(score: number): string {
  if (score >= 90) return "Excellent";
  if (score >= 75) return "Good";
  if (score >= 50) return "Fair";
  return "Low";
}
