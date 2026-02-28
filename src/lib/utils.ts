import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function truncateAddress(address: string, chars: number = 6): string {
  if (!address) return "";
  if (address.length <= chars * 2) return address;
  return `${address.slice(0, chars)}...${address.slice(-chars)}`;
}

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

  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 2592000) return `${Math.floor(diff / 86400)}d ago`;
  return formatTimestampShort(timestamp);
}

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

export function getIpfsUrl(cid: string): string {
  if (cid.startsWith("ipfs://")) {
    return `https://gateway.pinata.cloud/ipfs/${cid.replace("ipfs://", "")}`;
  }
  return `https://gateway.pinata.cloud/ipfs/${cid}`;
}

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

export async function hashFile(file: File): Promise<string> {
  const buffer = await file.arrayBuffer();
  const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return `sha256:${hashHex}`;
}

export function copyToClipboard(text: string): Promise<void> {
  return navigator.clipboard.writeText(text);
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function getVerificationUrl(address: string): string {
  return `${typeof window !== "undefined" ? window.location.origin : ""}/verify/${address}`;
}

export function getCategoryStyle(category: string) {
  const styles: Record<string, { bg: string; text: string; border: string }> = {
    technical: {
      bg: "bg-blue-500/10",
      text: "text-blue-400",
      border: "border-blue-500/20",
    },
    soft_skill: {
      bg: "bg-purple-500/10",
      text: "text-purple-400",
      border: "border-purple-500/20",
    },
    achievement: {
      bg: "bg-amber-500/10",
      text: "text-amber-400",
      border: "border-amber-500/20",
    },
    research: {
      bg: "bg-cyan-500/10",
      text: "text-cyan-400",
      border: "border-cyan-500/20",
    },
    certification: {
      bg: "bg-emerald-500/10",
      text: "text-emerald-400",
      border: "border-emerald-500/20",
    },
    academic: {
      bg: "bg-indigo-500/10",
      text: "text-indigo-400",
      border: "border-indigo-500/20",
    },
  };
  return styles[category] || styles.technical;
}

export function getTierLevel(tier: string): number {
  const levels: Record<string, number> = {
    beginner: 1,
    intermediate: 2,
    advanced: 3,
    expert: 4,
  };
  return levels[tier] || 1;
}
