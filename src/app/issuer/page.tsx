"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useWallet } from "@/hooks/useWallet";
import { useCredentialStore } from "@/store/credentialStore";
import { Button } from "@/components/ui/Button";
import { Tabs } from "@/components/ui/Tabs";
import { StatusIndicator } from "@/components/ui/StatusIndicator";
import { WalletAddress } from "@/components/ui/WalletAddress";
import { GlowOrb } from "@/components/ui/GlowOrb";
import { IssuerConnectPrompt } from "@/components/issuer/IssuerConnectPrompt";
import { CredentialTypesTab } from "@/components/issuer/CredentialTypesTab";
import { IssueCredentialTab } from "@/components/issuer/IssueCredentialTab";
import { SkillPathsTab } from "@/components/issuer/SkillPathsTab";
import { ManageCredentialsTab } from "@/components/issuer/ManageCredentialsTab";
import {
  Shield,
  FileStack,
  Send,
  GitBranch,
  Settings,
  Building2,
  CheckCircle2,
} from "lucide-react";

const tabs = [
  { id: "types", label: "Credential Types", icon: <FileStack className="w-4 h-4" /> },
  { id: "issue", label: "Issue Credential", icon: <Send className="w-4 h-4" /> },
  { id: "paths", label: "Skill Paths", icon: <GitBranch className="w-4 h-4" /> },
  { id: "manage", label: "Manage Issued", icon: <Settings className="w-4 h-4" /> },
];

export default function IssuerPage() {
  const { address, isConnected } = useWallet();
  const { isAuthorizedIssuer, getIssuerByAddress } = useCredentialStore();
  const [activeTab, setActiveTab] = useState("types");

  const isAuthorized = address ? isAuthorizedIssuer(address) : false;
  const issuerInfo = address ? getIssuerByAddress(address) : undefined;

  if (!isConnected || !address) {
    return <IssuerConnectPrompt />;
  }

  return (
    <div className="page-container relative">
      <GlowOrb color="brand" size="lg" className="top-0 right-[-100px] opacity-20" />
      <GlowOrb color="cyber" size="md" className="bottom-[20%] left-[-80px] opacity-15" />

      <div className="relative section-container py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <IssuerHeader
            address={address}
            isAuthorized={isAuthorized}
            issuerInfo={issuerInfo}
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
                {activeTab === "types" && <CredentialTypesTab />}
                {activeTab === "issue" && <IssueCredentialTab />}
                {activeTab === "paths" && <SkillPathsTab />}
                {activeTab === "manage" && <ManageCredentialsTab />}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function IssuerHeader({
  address,
  isAuthorized,
  issuerInfo,
}: {
  address: string;
  isAuthorized: boolean;
  issuerInfo: any;
}) {
  return (
    <div className="glass rounded-2xl p-6 card-highlight">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center text-white shadow-lg shadow-brand-500/20">
            <Building2 className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-heading-xl font-bold text-white">
                Issuer Portal
              </h1>
              <StatusIndicator
                status={isAuthorized ? "verified" : "unverified"}
                label={isAuthorized ? "Verified Issuer" : "Not Registered"}
              />
            </div>
            {issuerInfo ? (
              <p className="text-body-md text-dark-400">{issuerInfo.name}</p>
            ) : (
              <p className="text-body-md text-dark-500">
                Connect an authorized issuer wallet to access all features
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-4 py-2 rounded-xl bg-dark-800/60 border border-dark-700/50">
            <p className="text-caption text-dark-500 mb-0.5">Connected Wallet</p>
            <WalletAddress address={address} showCopy showExplorer truncateChars={8} />
          </div>
        </div>
      </div>
    </div>
  );
}
