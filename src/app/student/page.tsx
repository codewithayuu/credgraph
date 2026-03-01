"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useStudent } from "@/hooks/useStudent";
import { StudentConnectPrompt } from "@/components/student/StudentConnectPrompt";
import { CredentialsGrid } from "@/components/student/CredentialsGrid";
import { ClaimFlow } from "@/components/student/ClaimFlow";
import { ExpiryAlerts } from "@/components/student/ExpiryAlerts";
import { StudentSkillPathsTab } from "@/components/student/StudentSkillPathsTab";
import { StudentTimelineTab } from "@/components/student/StudentTimelineTab";
import { StudentShareTab } from "@/components/student/StudentShareTab";
import { WalletAddress } from "@/components/ui/WalletAddress";
import { PageTransition } from "@/components/shared/PageTransition";
import { cn } from "@/lib/utils";

const TABS = [
  { id: "credentials", label: "Credentials" },
  { id: "claims", label: "Claims" },
  { id: "paths", label: "Skill Paths" },
  { id: "timeline", label: "Timeline" },
  { id: "share", label: "Share" },
];

export default function StudentPage() {
  const { address, isConnected, stats, progress } = useStudent();
  const [activeTab, setActiveTab] = useState("credentials");

  if (!isConnected) {
    return (
      <PageTransition>
        <StudentConnectPrompt />
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen">
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-0 right-[-15%] w-[700px] h-[500px] rounded-full bg-electric-500/[0.02] blur-[120px]" />
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
              <div className="w-10 h-10 rounded-xl bg-electric-500/10 border border-electric-500/20 flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-electric-400">
                  <path d="M10 2L4 6V10L10 14L16 10V6L10 2Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
                  <path d="M4 10V14L10 18L16 14V10" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <h1 className="text-d4 font-bold text-white font-display">Dashboard</h1>
                <p className="text-b3 text-surface-400">Your credentials and progress</p>
              </div>
            </div>

            {/* Stat pills */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <StatPill label="Total" value={stats.total} color="electric" />
              <StatPill label="Active" value={stats.active} color="neon" />
              {stats.claimableCount > 0 && (
                <StatPill label="Claimable" value={stats.claimableCount} color="gold" />
              )}
              {stats.expiringCount > 0 && (
                <StatPill label="Expiring" value={stats.expiringCount} color="gold" />
              )}
              <StatPill label="Composite" value={stats.compositeCount} color="violet" />
              <StatPill label="Paths" value={stats.completedPaths} color="azure" />
              {stats.revoked > 0 && (
                <StatPill label="Revoked" value={stats.revoked} color="crimson" />
              )}
            </div>

            <div className="flex items-center gap-3">
              {address && <WalletAddress address={address} showCopy showExplorer truncateChars={10} />}
              <span className="text-micro px-2.5 py-1 rounded-full bg-electric-500/8 border border-electric-500/15 text-electric-400 font-semibold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-electric-400" />
                Connected
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
                    activeTab === tab.id ? "text-electric-400" : "text-surface-400 hover:text-surface-200"
                  )}
                >
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="student-tab-bg"
                      className="absolute inset-0 rounded-lg bg-electric-500/10 border border-electric-500/15"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1.5">
                    {tab.label}
                    {tab.id === "claims" && stats.claimableCount > 0 && (
                      <span className="text-micro px-1.5 py-0.5 rounded-full bg-gold-500/20 text-gold-400 font-bold">
                        {stats.claimableCount}
                      </span>
                    )}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="space-y-8"
          >
            {activeTab === "credentials" && (
              <>
                <ExpiryAlerts />
                {address && <CredentialsGrid address={address} />}
              </>
            )}
            {activeTab === "claims" && <ClaimFlow />}
            {activeTab === "paths" && <StudentSkillPathsTab />}
            {activeTab === "timeline" && <StudentTimelineTab />}
            {activeTab === "share" && <StudentShareTab />}
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
    violet: "bg-violet-500/8 border-violet-500/15 text-violet-400",
  };
  return (
    <span className={cn("text-micro px-2.5 py-1 rounded-full border font-medium", colorMap[color] || colorMap.electric)}>
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
