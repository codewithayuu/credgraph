"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { GlowOrb } from "@/components/ui/GlowOrb";
import {
  ArrowRight,
  Shield,
  Layers,
  Search,
  Hexagon,
  Sparkles,
  Zap,
  ChevronRight,
} from "lucide-react";

export const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden">
      <GlowOrb color="brand" size="xl" className="top-[-200px] left-[-100px] opacity-40" />
      <GlowOrb color="cyber" size="lg" className="bottom-[-100px] right-[-50px] opacity-30" />
      <GlowOrb color="accent" size="md" className="top-[30%] right-[10%] opacity-20" />

      <div className="absolute inset-0 grid-pattern opacity-60" />

      <div className="absolute top-20 left-[15%] w-px h-40 bg-gradient-to-b from-transparent via-brand-500/20 to-transparent" />
      <div className="absolute top-40 right-[20%] w-px h-32 bg-gradient-to-b from-transparent via-cyber-500/20 to-transparent" />

      <FloatingElements />

      <div className="relative z-10 section-container w-full">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-500/8 border border-brand-500/15 backdrop-blur-sm">
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-accent-400 animate-pulse" />
                <span className="text-caption font-semibold text-accent-400 uppercase tracking-wider">
                  Live on Algorand Testnet
                </span>
              </div>
              <div className="w-px h-3 bg-dark-600" />
              <span className="text-caption font-medium text-dark-400">
                Hackathon 2025
              </span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-display-lg md:text-display-xl font-black text-white mb-6 text-balance leading-[1.05]"
          >
            Don&apos;t Trust the Resume.
            <br />
            <span className="relative">
              Verify the Chain.
              <motion.span
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
                className="absolute bottom-0 left-0 h-[3px] bg-gradient-to-r from-brand-400 via-cyber-400 to-accent-400 rounded-full"
              />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-body-lg md:text-heading-md text-dark-400 max-w-3xl mx-auto mb-10 text-balance leading-relaxed"
          >
            Issue composable, blockchain-verified academic credentials as NFTs on Algorand.
            Students own their achievements. Employers verify in seconds. No middleman.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Link href="/issuer">
              <Button
                size="xl"
                icon={<ArrowRight className="w-5 h-5" />}
                iconPosition="right"
                className="min-w-[220px] shadow-2xl shadow-brand-500/20"
              >
                Start Issuing
              </Button>
            </Link>
            <Link href="/verify">
              <Button
                variant="outline"
                size="xl"
                icon={<Search className="w-5 h-5" />}
                className="min-w-[220px]"
              >
                Verify Credentials
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto"
          >
            {[
              {
                icon: <Shield className="w-5 h-5" />,
                title: "Issuer-Verified",
                desc: "On-chain registry of authorized institutions",
                color: "from-brand-500/20 to-brand-600/5",
                borderColor: "border-brand-500/15",
                iconBg: "bg-brand-500/15 text-brand-400",
              },
              {
                icon: <Layers className="w-5 h-5" />,
                title: "Composable",
                desc: "Micro-credentials combine into mastery paths",
                color: "from-cyber-500/20 to-cyber-600/5",
                borderColor: "border-cyber-500/15",
                iconBg: "bg-cyber-500/15 text-cyber-400",
              },
              {
                icon: <Zap className="w-5 h-5" />,
                title: "Instant Verify",
                desc: "One link. Three seconds. Zero trust needed.",
                color: "from-accent-500/20 to-accent-600/5",
                borderColor: "border-accent-500/15",
                iconBg: "bg-accent-500/15 text-accent-400",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
                className={`relative p-5 rounded-2xl bg-gradient-to-br ${item.color} border ${item.borderColor} backdrop-blur-sm`}
              >
                <div className={`w-10 h-10 rounded-xl ${item.iconBg} flex items-center justify-center mb-3`}>
                  {item.icon}
                </div>
                <h3 className="text-body-md font-semibold text-white mb-1">{item.title}</h3>
                <p className="text-body-sm text-dark-400">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const FloatingElements: React.FC = () => (
  <>
    {[
      { top: "15%", left: "8%", delay: 0, size: 6 },
      { top: "25%", right: "12%", delay: 1.5, size: 4 },
      { top: "60%", left: "5%", delay: 3, size: 5 },
      { top: "70%", right: "8%", delay: 2, size: 7 },
      { top: "40%", left: "15%", delay: 4, size: 3 },
    ].map((el, i) => (
      <motion.div
        key={i}
        animate={{
          y: [0, -15, 0],
          rotate: [0, 5, -5, 0],
          opacity: [0.15, 0.3, 0.15],
        }}
        transition={{
          duration: 6 + i,
          repeat: Infinity,
          delay: el.delay,
          ease: "easeInOut",
        }}
        className="absolute pointer-events-none"
        style={{ top: el.top, left: el.left, right: (el as any).right }}
      >
        <Hexagon
          className="text-brand-500/10"
          style={{ width: el.size * 8, height: el.size * 8 }}
          strokeWidth={1}
        />
      </motion.div>
    ))}
  </>
);
