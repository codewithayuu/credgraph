"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { GlowOrb } from "@/components/ui/GlowOrb";
import { GridBackground } from "@/components/ui/GridBackground";
import {
  Search,
  QrCode,
  Shield,
  ArrowRight,
  Scan,
  ShieldCheck,
  Globe,
  Zap,
} from "lucide-react";

export default function VerifyPage() {
  const router = useRouter();
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!address.trim()) {
      setError("Please enter a wallet address");
      return;
    }
    if (address.trim().length < 20) {
      setError("Please enter a valid Algorand wallet address");
      return;
    }
    setError("");
    router.push(`/verify/${address.trim()}`);
  };

  return (
    <div className="page-container relative min-h-[85vh] flex items-center">
      <GlowOrb color="accent" size="xl" className="top-[-150px] right-[-100px] opacity-25" />
      <GlowOrb color="brand" size="lg" className="bottom-[-100px] left-[-50px] opacity-20" />
      <GlowOrb color="cyber" size="md" className="top-[40%] left-[10%] opacity-15" />

      <div className="absolute inset-0 grid-pattern opacity-40" />

      <div className="relative z-10 section-container w-full">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <motion.div
              animate={{ rotate: [0, 3, -3, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-accent-500 to-emerald-500 mb-8 shadow-2xl shadow-accent-500/30"
            >
              <ShieldCheck className="w-10 h-10 text-white" />
            </motion.div>

            <h1 className="text-display-md md:text-display-lg font-black text-white mb-4">
              Verify{" "}
              <span className="gradient-text-accent">Credentials</span>
            </h1>
            <p className="text-body-lg text-dark-400 max-w-xl mx-auto">
              Enter a wallet address or scan a QR code to instantly verify all credentials — no login, no wallet, no trust required.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="glass-strong rounded-3xl p-8 card-highlight">
              <form onSubmit={handleSubmit} className="space-y-6">
                <Input
                  label="Wallet Address"
                  placeholder="Enter Algorand wallet address to verify..."
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                    if (error) setError("");
                  }}
                  error={error}
                  icon={<Search className="w-4 h-4" />}
                  className="text-body-lg py-4"
                />

                <Button
                  type="submit"
                  size="xl"
                  fullWidth
                  icon={<ArrowRight className="w-5 h-5" />}
                  iconPosition="right"
                  className="shadow-xl bg-gradient-to-r from-accent-600 to-emerald-500 hover:from-accent-500 hover:to-emerald-400 shadow-accent-500/20"
                >
                  Verify Credentials
                </Button>
              </form>

              <div className="mt-6 flex items-center gap-4">
                <div className="flex-1 h-px bg-dark-700/50" />
                <span className="text-caption text-dark-500 uppercase tracking-wider">or try demo</span>
                <div className="flex-1 h-px bg-dark-700/50" />
              </div>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setAddress("STUDENT1ABCDEFGHIJKLMNOPQRSTUVWXYZ234567890");
                    router.push("/verify/STUDENT1ABCDEFGHIJKLMNOPQRSTUVWXYZ234567890");
                  }}
                  className="flex items-center gap-3 p-4 rounded-xl bg-dark-800/40 border border-dark-700/30 hover:border-brand-500/30 hover:bg-dark-800/60 transition-all duration-300 text-left group"
                >
                  <div className="w-8 h-8 rounded-lg bg-brand-500/10 flex items-center justify-center text-brand-400 group-hover:bg-brand-500/20 transition-colors">
                    <Shield className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-body-sm font-medium text-dark-200">Demo Student (Rahul)</p>
                    <p className="text-caption text-dark-500">6 credentials including composite</p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setAddress("STUDENT2XYZABCDEFGHIJKLMNOPQRSTUVWXYZ234568");
                    router.push("/verify/STUDENT2XYZABCDEFGHIJKLMNOPQRSTUVWXYZ234568");
                  }}
                  className="flex items-center gap-3 p-4 rounded-xl bg-dark-800/40 border border-dark-700/30 hover:border-cyber-500/30 hover:bg-dark-800/60 transition-all duration-300 text-left group"
                >
                  <div className="w-8 h-8 rounded-lg bg-cyber-500/10 flex items-center justify-center text-cyber-400 group-hover:bg-cyber-500/20 transition-colors">
                    <Globe className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-body-sm font-medium text-dark-200">Demo Student (Empty)</p>
                    <p className="text-caption text-dark-500">No credentials yet</p>
                  </div>
                </button>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 grid grid-cols-3 gap-4"
          >
            {[
              { icon: <Shield className="w-5 h-5" />, label: "No Login Required", color: "text-brand-400 bg-brand-500/10" },
              { icon: <Zap className="w-5 h-5" />, label: "Instant Results", color: "text-accent-400 bg-accent-500/10" },
              { icon: <Globe className="w-5 h-5" />, label: "Publicly Verifiable", color: "text-cyber-400 bg-cyber-500/10" },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-2 p-4 rounded-xl bg-dark-900/30 border border-dark-800/30">
                <div className={`w-10 h-10 rounded-xl ${item.color} flex items-center justify-center`}>
                  {item.icon}
                </div>
                <span className="text-body-sm font-medium text-dark-300 text-center">{item.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
