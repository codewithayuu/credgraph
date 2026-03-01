"use client";

import React from "react";
import { motion } from "framer-motion";
import { useWallet } from "@/hooks/useWallet";
import { Button } from "@/components/ui/Button";
import { GlowOrb } from "@/components/ui/GlowOrb";
import { Wallet, Shield, ArrowRight, Hexagon } from "lucide-react";

export const IssuerConnectPrompt: React.FC = () => {
  const { connect, isConnecting } = useWallet();

  return (
    <div className="page-container relative flex items-center justify-center min-h-[80vh]">
      <GlowOrb color="brand" size="lg" className="top-[10%] left-[20%] opacity-25" />
      <GlowOrb color="cyber" size="md" className="bottom-[20%] right-[15%] opacity-20" />

      <div className="absolute inset-0 grid-pattern opacity-40" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-lg w-full mx-4"
      >
        <div className="glass-strong rounded-3xl p-10 text-center card-highlight">
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-brand-500 to-cyber-500 mb-8 shadow-2xl shadow-brand-500/30"
          >
            <Shield className="w-10 h-10 text-white" />
          </motion.div>

          <h1 className="text-display-sm font-black text-white mb-3">
            Issuer Portal
          </h1>
          <p className="text-body-lg text-dark-400 mb-8 max-w-sm mx-auto">
            Connect your authorized issuer wallet to define credential types, issue credentials, and manage skill paths.
          </p>

          <Button
            onClick={connect}
            loading={isConnecting}
            size="xl"
            icon={<Wallet className="w-5 h-5" />}
            fullWidth
            className="mb-6"
          >
            Connect Pera Wallet
          </Button>

          <div className="flex items-center gap-2 justify-center text-body-sm text-dark-500">
            <div className="w-1.5 h-1.5 rounded-full bg-accent-400 animate-pulse" />
            <span>Algorand Testnet</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
