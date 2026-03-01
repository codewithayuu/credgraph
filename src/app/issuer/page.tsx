"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useIssuer } from "@/hooks/useIssuer";
import { IssuerConnectPrompt } from "@/components/issuer/IssuerConnectPrompt";
import { IssueCredentialTab } from "@/components/issuer/IssueCredentialTab";
import { BatchIssueTab } from "@/components/issuer/BatchIssueTab";
import { CredentialTypesTab } from "@/components/issuer/CredentialTypesTab";
import { SkillPathsTab } from "@/components/issuer/SkillPathsTab";
import { ManageIssuancesTab } from "@/components/issuer/ManageIssuancesTab";
import { WalletAddress } from "@/components/ui/WalletAddress";
import { PageTransition } from "@/components/shared/PageTransition";
import { cn } from "@/lib/utils";

const TABS = [
  { id: "issue", label: "Issue" },
  { id: "batch", label: "Batch Issue" },
  { id: "types", label: "Credential Types" },
  { id: "paths", label: "Skill Paths" },
  { id: "manage", label: "Manage" },
];

export default function IssuerPage() {
  const { address, isConnected, isAuthorized, issuerInfo, stats } = useIssuer();
  const [activeTab, setActiveTab] = useState("issue");

  if (!isConnected) {
    return (
      <PageTransition>
        <IssuerConnectPrompt />
      </PageTransition>
    );
  }

  if (!isAuthorized) {
    return (
      <PageTransition>
        <div className="min-h-[70vh] flex items-center justify-center px-4">
          <div className="max-w-md text-center space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-crimson-500/10 border border-crimson-500/20 flex items-center justify-center mx-auto">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="text-crimson-400">
                <path d="M14 4L5 9V19L14 24L23 19V9L14 4Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                <path d="M14 11V15M14 19V19.01" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </div>
            <div>
              <h2 className="text-d4 font-bold text-white font-display">Not Authorized</h2>
              <p className="text-b2 text-surface-400 mt-2">
                Your wallet is not registered as an authorized issuer.
                Visit the Governance page to apply.
              </p>
            </div>
            {address && <WalletAddress address={address} showCopy truncateChars={12} />}
            <a
              href="/governance"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-b3 font-semibold bg-gradient-to-r from-gold-600 to-gold-500 text-void hover:shadow-glow-gold active:scale-[0.98] transition-all"
            >
              Apply as Issuer
            </a>
          </div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen">
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-0 left-[-10%] w-[600px] h-[500px] rounded-full bg-gold-500/[0.02] blur-[120px]" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-gold-400">
                  <path d="M10 2L3 7V8H17V7L10 2Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
                  <path d="M5 8V14M10 8V14M15 8V14" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                  <path d="M3 14H17V16H3V14Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <h1 className="text-d4 font-bold text-white font-display">Issuer Portal</h1>
                <p className="text-b3 text-surface-400">{issuerInfo?.name || "Unknown Issuer"}</p>
              </div>
            </div>

            {/* Stat pills */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <StatPill label="Issued" value={stats.total} color="gold" />
              <StatPill label="Active" value={stats.active} color="neon" />
              <StatPill label="Pending Claims" value={stats.pending} color="electric" />
              <StatPill label="Revoked" value={stats.revoked} color="crimson" />
              <StatPill label="Types" value={stats.typeCount} color="azure" />
            </div>

            <div className="flex items-center gap-3">
              {address && <WalletAddress address={address} showCopy showExplorer truncateChars={10} />}
              <span className="text-micro px-2.5 py-1 rounded-full bg-neon-500/8 border border-neon-500/15 text-neon-400 font-semibold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-neon-400 animate-pulse" />
                Verified Issuer
              </span>
            </div>
          </motion.div>

          {/* Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-8"
          >
            <div className="flex items-center gap-1 p-1 rounded-xl bg-surface-900/60 border border-surface-800 w-fit overflow-x-auto">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "relative px-4 py-2 rounded-lg text-b3 font-medium transition-all duration-200 whitespace-nowrap",
                    activeTab === tab.id ? "text-gold-400" : "text-surface-400 hover:text-surface-200"
                  )}
                >
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="issuer-tab-bg"
                      className="absolute inset-0 rounded-lg bg-gold-500/10 border border-gold-500/15"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            {activeTab === "issue" && <IssueCredentialTab />}
            {activeTab === "batch" && <BatchIssueTab />}
            {activeTab === "types" && <CredentialTypesTab />}
            {activeTab === "paths" && <SkillPathsTab />}
            {activeTab === "manage" && <ManageIssuancesTab />}
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}

function StatPill({ label, value, color }: { label: string; value: number; color: string }) {
  const colorMap: Record<string, string> = {
    gold: "bg-gold-500/8 border-gold-500/15 text-gold-400",
    neon: "bg-neon-500/8 border-neon-500/15 text-neon-400",
    electric: "bg-electric-500/8 border-electric-500/15 text-electric-400",
    crimson: "bg-crimson-500/8 border-crimson-500/15 text-crimson-400",
    azure: "bg-azure-500/8 border-azure-500/15 text-azure-400",
  };
  return (
    <span className={cn("text-micro px-2.5 py-1 rounded-full border font-medium", colorMap[color] || colorMap.gold)}>
      {value} {label}
    </span>
  );
}

function Placeholder({ label }: { label: string }) {
  return (
    <div className="rounded-xl bg-surface-900/40 border border-surface-800 p-12 text-center">
      <p className="text-b2 text-surface-400">{label} — coming soon</p>
    </div>
  );
}
