"use client";

import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  FileX2,
  CheckCircle2,
  ArrowRight,
  X,
  Clock,
  Image,
  Link as LinkIcon,
  ShieldCheck,
  Fingerprint,
  Lock,
} from "lucide-react";

export const TrustSection: React.FC = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section ref={ref} className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-dark-950 via-dark-900/30 to-dark-950" />

      <div className="relative section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-caption font-semibold text-red-400 uppercase tracking-wider mb-4">
            The Problem We Solve
          </span>
          <h2 className="text-display-sm md:text-display-md font-black text-white mb-4">
            PDFs Are{" "}
            <span className="text-red-400 line-through decoration-red-500/40">Trustworthy</span>{" "}
            <span className="gradient-text">Forgeable</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="p-8 rounded-2xl bg-red-500/5 border border-red-500/15 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full blur-3xl" />
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-red-500/15 flex items-center justify-center text-red-400">
                <FileX2 className="w-5 h-5" />
              </div>
              <h3 className="text-heading-lg font-bold text-red-300">Today&apos;s Reality</h3>
            </div>
            <ul className="space-y-4">
              {[
                { icon: <Image className="w-4 h-4" />, text: "PDF certificates that anyone can Photoshop in 5 minutes" },
                { icon: <Clock className="w-4 h-4" />, text: "Verification takes 2-4 weeks via institutional requests" },
                { icon: <X className="w-4 h-4" />, text: "53% of resumes contain inaccurate credential claims" },
                { icon: <LinkIcon className="w-4 h-4" />, text: "Credentials locked in silos across 10+ different platforms" },
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-md bg-red-500/10 flex items-center justify-center text-red-400 mt-0.5 flex-shrink-0">
                    {item.icon}
                  </div>
                  <span className="text-body-md text-dark-400">{item.text}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="p-8 rounded-2xl bg-accent-500/5 border border-accent-500/15 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent-500/5 rounded-full blur-3xl" />
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-accent-500/15 flex items-center justify-center text-accent-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-heading-lg font-bold text-accent-300">With CredGraph</h3>
            </div>
            <ul className="space-y-4">
              {[
                { icon: <Fingerprint className="w-4 h-4" />, text: "NFT credentials cryptographically signed by verified issuers" },
                { icon: <CheckCircle2 className="w-4 h-4" />, text: "Verification in 3 seconds via a public link — no login needed" },
                { icon: <Lock className="w-4 h-4" />, text: "Forgery is computationally infeasible without private keys" },
                { icon: <LinkIcon className="w-4 h-4" />, text: "All credentials in one wallet, composable across institutions" },
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-md bg-accent-500/10 flex items-center justify-center text-accent-400 mt-0.5 flex-shrink-0">
                    {item.icon}
                  </div>
                  <span className="text-body-md text-dark-300">{item.text}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
