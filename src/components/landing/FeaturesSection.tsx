"use client";

import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Shield,
  Layers,
  Search,
  Wallet,
  GitBranch,
  Eye,
  Lock,
  Globe,
  Database,
} from "lucide-react";

const features = [
  {
    icon: <Shield className="w-6 h-6" />,
    title: "On-Chain Issuer Registry",
    description: "Every issuer is verified and recorded on the Algorand blockchain. Credentials from unregistered sources are immediately flagged.",
    gradient: "from-brand-500 to-brand-600",
    bgGlow: "bg-brand-500/5",
    borderColor: "border-brand-500/10 hover:border-brand-500/30",
  },
  {
    icon: <Layers className="w-6 h-6" />,
    title: "Composable Skill Paths",
    description: "Define rules that combine micro-credentials into mastery certifications. When all requirements are met, the composite credential is auto-issued.",
    gradient: "from-cyber-500 to-cyber-600",
    bgGlow: "bg-cyber-500/5",
    borderColor: "border-cyber-500/10 hover:border-cyber-500/30",
  },
  {
    icon: <Search className="w-6 h-6" />,
    title: "Instant Public Verification",
    description: "Share a single link or QR code. Employers see every credential, issuer verification, revocation status, and composition proof — in three seconds.",
    gradient: "from-accent-500 to-accent-600",
    bgGlow: "bg-accent-500/5",
    borderColor: "border-accent-500/10 hover:border-accent-500/30",
  },
  {
    icon: <Wallet className="w-6 h-6" />,
    title: "Student-Owned Credentials",
    description: "Credentials live in the student's blockchain wallet as NFTs. No institution can silently revoke or restrict access. You own your achievements.",
    gradient: "from-purple-500 to-purple-600",
    bgGlow: "bg-purple-500/5",
    borderColor: "border-purple-500/10 hover:border-purple-500/30",
  },
  {
    icon: <Eye className="w-6 h-6" />,
    title: "Transparent Revocation",
    description: "When a credential is revoked, it's recorded on-chain with a timestamp and reason. Not silent deletion—an immutable audit trail.",
    gradient: "from-red-500 to-red-600",
    bgGlow: "bg-red-500/5",
    borderColor: "border-red-500/10 hover:border-red-500/30",
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: "Platform Independent",
    description: "Even if CredGraph goes offline, every credential remains on the Algorand blockchain, verifiable by anyone reading the chain directly.",
    gradient: "from-amber-500 to-amber-600",
    bgGlow: "bg-amber-500/5",
    borderColor: "border-amber-500/10 hover:border-amber-500/30",
  },
];

export const FeaturesSection: React.FC = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section ref={ref} className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 mesh-bg opacity-40" />

      <div className="relative section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-caption font-semibold text-brand-400 uppercase tracking-wider mb-4">
            Core Features
          </span>
          <h2 className="text-display-sm md:text-display-md font-black text-white mb-4">
            Trust Infrastructure for{" "}
            <span className="gradient-text">Education</span>
          </h2>
          <p className="text-body-lg text-dark-400 max-w-2xl mx-auto">
            Six pillars that transform scattered certificates into a verifiable, composable credential graph.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <div
                className={`relative group h-full p-7 rounded-2xl ${feature.bgGlow} border ${feature.borderColor} backdrop-blur-sm transition-all duration-500 hover:shadow-2xl`}
              >
                <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-dark-600/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-white mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>

                <h3 className="text-heading-md font-bold text-white mb-3">
                  {feature.title}
                </h3>

                <p className="text-body-md text-dark-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
