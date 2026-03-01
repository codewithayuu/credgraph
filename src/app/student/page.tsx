"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useWallet } from "@/hooks/useWallet";
import { useCredentialStore } from "@/store/credentialStore";
import { Tabs } from "@/components/ui/Tabs";
import { GlowOrb } from "@/components/ui/GlowOrb";
import { WalletAddress } from "@/components/ui/WalletAddress";
import { Badge } from "@/components/ui/Badge";
import { StudentConnectPrompt } from "@/components/student/StudentConnectPrompt";
import { CredentialsGrid } from "@/components/student/CredentialsGrid";
import { ProgressTracker } from "@/components/student/ProgressTracker";
import { ShareTools } from "@/components/student/ShareTools";
import { TimelineView } from "@/components/student/TimelineView";
import {
  GraduationCap,
  LayoutGrid,
  TrendingUp,
  Share2,
  Clock,
  Award,
  CheckCircle2,
  XCircle,
} from "lucide-react";

export default function StudentPage() {
  const { address, isConnected } = useWallet();
  const { getCredentialsByRecipient } = useCredentialStore();
  const [activeTab, setActiveTab] = useState("credentials");

  if (!isConnected || !address) {
    return <StudentConnectPrompt />;
  }

  const credentials = getCredentialsByRecipient(address);
  const activeCount = credentials.filter((c) => c.status === "active").length;
  const revokedCount = credentials.filter((c) => c.status === "revoked").length;

  const tabs = [
    { id: "credentials", label: "My Credentials", icon: <LayoutGrid className="w-4 h-4" />, count: credentials.length },
    { id: "progress", label: "Skill Paths", icon: <TrendingUp className="w-4 h-4" /> },
    { id: "timeline", label: "Timeline", icon: <Clock className="w-4 h-4" /> },
    { id: "share", label: "Share & Verify", icon: <Share2 className="w-4 h-4" /> },
  ];

  return (
    <div className="page-container relative">
      <GlowOrb color="cyber" size="lg" className="top-0 left-[-100px] opacity-20" />
      <GlowOrb color="accent" size="md" className="bottom-[20%] right-[-80px] opacity-15" />

      <div className="relative section-container py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <StudentHeader
            address={address}
            totalCredentials={credentials.length}
            activeCount={activeCount}
            revokedCount={revokedCount}
          />

          <div className="mt-8">
            <Tabs
              tabs={tabs}
              activeTab={activeTab}
              onTabChange={setActiveTab}
              variant="default"
            />
          </div>

          <div className="mt-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
              >
                {activeTab === "credentials" && <CredentialsGrid address={address} />}
                {activeTab === "progress" && <ProgressTracker address={address} />}
                {activeTab === "timeline" && <TimelineView address={address} />}
                {activeTab === "share" && <ShareTools address={address} />}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function StudentHeader({
  address,
  totalCredentials,
  activeCount,
  revokedCount,
}: {
  address: string;
  totalCredentials: number;
  activeCount: number;
  revokedCount: number;
}) {
  return (
    <div className="glass rounded-2xl p-6 card-highlight">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyber-500 to-accent-500 flex items-center justify-center text-white shadow-lg shadow-cyber-500/20">
            <GraduationCap className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-heading-xl font-bold text-white mb-1">
              Student Dashboard
            </h1>
            <WalletAddress address={address} showCopy showExplorer truncateChars={8} />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <StatPill
            icon={<Award className="w-3.5 h-3.5" />}
            value={totalCredentials}
            label="Total"
            color="brand"
          />
          <StatPill
            icon={<CheckCircle2 className="w-3.5 h-3.5" />}
            value={activeCount}
            label="Active"
            color="accent"
          />
          {revokedCount > 0 && (
            <StatPill
              icon={<XCircle className="w-3.5 h-3.5" />}
              value={revokedCount}
              label="Revoked"
              color="danger"
            />
          )}
        </div>
      </div>
    </div>
  );
}

function StatPill({
  icon,
  value,
  label,
  color,
}: {
  icon: React.ReactNode;
  value: number;
  label: string;
  color: "brand" | "accent" | "danger";
}) {
  const colors = {
    brand: "bg-brand-500/10 text-brand-400 border-brand-500/20",
    accent: "bg-accent-500/10 text-accent-400 border-accent-500/20",
    danger: "bg-red-500/10 text-red-400 border-red-500/20",
  };

  return (
    <div className={`flex items-center gap-2 px-3 py-2 rounded-xl border ${colors[color]}`}>
      {icon}
      <span className="text-heading-md font-bold">{value}</span>
      <span className="text-caption font-medium opacity-70">{label}</span>
    </div>
  );
}
