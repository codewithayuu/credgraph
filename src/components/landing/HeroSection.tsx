"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Search } from "lucide-react";

export const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-[94vh] flex items-center overflow-hidden">
      <div className="orb orb-gold w-[600px] h-[600px] top-[-200px] left-[-150px] opacity-50" />
      <div className="orb orb-electric w-[400px] h-[400px] bottom-[-100px] right-[-100px] opacity-40" />
      <div className="orb orb-neon w-[300px] h-[300px] top-[50%] right-[15%] opacity-20" />

      <div className="absolute inset-0 grid-bg opacity-50" />

      <VerticalLines />
      <FloatingShapes />

      <div className="relative z-10 section-wrapper w-full">
        <div className="max-w-5xl mx-auto text-center">

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-8">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-surface-900/60 border border-surface-700/40 backdrop-blur-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-neon-400 animate-breathe" />
              <span className="text-cap text-neon-400 uppercase tracking-widest">Live on Algorand Testnet</span>
              <div className="w-px h-3 bg-surface-700" />
              <span className="text-cap text-surface-500">Hackathon 2025</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-d2 md:text-d1 text-white mb-7 text-balance"
          >
            Don&apos;t Trust the Resume.
            <br />
            <span className="relative inline-block">
              Verify the Chain.
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="absolute bottom-1 left-0 w-full h-[3px] bg-gradient-to-r from-gold-400 to-electric-400 rounded-full origin-left"
              />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-b1 md:text-h3 text-surface-400 max-w-3xl mx-auto mb-12 text-balance font-normal"
          >
            Issue composable, blockchain-verified academic credentials as NFTs on Algorand.
            Students own their achievements. Employers verify in seconds.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
          >
            <Link href="/issuer">
              <Button size="xl" iconRight={<ArrowRight className="w-5 h-5" />} className="min-w-[200px]">
                Start Issuing
              </Button>
            </Link>
            <Link href="/verify">
              <Button variant="outline" size="xl" icon={<Search className="w-5 h-5" />} className="min-w-[200px]">
                Verify Now
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-3xl mx-auto"
          >
            {[
              {
                title: "Issuer-Verified",
                desc: "On-chain registry of authorized institutions",
                gradient: "from-gold-500/12 to-gold-600/4",
                border: "border-gold-500/12",
                iconGradient: "from-gold-500 to-gold-600",
                iconPath: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
              },
              {
                title: "Composable",
                desc: "Micro-credentials combine into mastery paths",
                gradient: "from-electric-500/12 to-electric-600/4",
                border: "border-electric-500/12",
                iconGradient: "from-electric-500 to-electric-600",
                iconPath: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
              },
              {
                title: "Instant Verify",
                desc: "One link. Three seconds. Zero trust needed.",
                gradient: "from-neon-500/12 to-neon-600/4",
                border: "border-neon-500/12",
                iconGradient: "from-neon-500 to-neon-600",
                iconPath: "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
                whileHover={{ y: -4 }}
                className={`relative p-6 rounded-2xl bg-gradient-to-br ${item.gradient} border ${item.border} backdrop-blur-sm`}
              >
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${item.iconGradient} flex items-center justify-center mb-4 shadow-lg`}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d={item.iconPath} />
                  </svg>
                </div>
                <h3 className="text-b2 font-bold text-white mb-1.5">{item.title}</h3>
                <p className="text-b3 text-surface-400">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const VerticalLines: React.FC = () => (
  <>
    <div className="absolute top-24 left-[12%] w-px h-44 bg-gradient-to-b from-transparent via-gold-500/10 to-transparent" />
    <div className="absolute top-40 right-[18%] w-px h-36 bg-gradient-to-b from-transparent via-electric-500/8 to-transparent" />
    <div className="absolute bottom-32 left-[25%] w-px h-28 bg-gradient-to-b from-transparent via-gold-500/6 to-transparent" />
  </>
);

const FloatingShapes: React.FC = () => (
  <>
    {[
      { top: "12%", left: "6%", delay: 0, s: 24 },
      { top: "22%", right: "10%", delay: 2, s: 18 },
      { top: "65%", left: "4%", delay: 4, s: 20 },
      { top: "75%", right: "6%", delay: 1, s: 28 },
    ].map((el, i) => (
      <motion.div
        key={i}
        animate={{ y: [0, -12, 0], opacity: [0.06, 0.12, 0.06] }}
        transition={{ duration: 7 + i * 2, repeat: Infinity, delay: el.delay, ease: "easeInOut" }}
        className="absolute pointer-events-none"
        style={{ top: el.top, left: el.left, right: (el as any).right }}
      >
        <svg width={el.s} height={el.s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-gold-400">
          <path d="M12 2L22 8.5V15.5L12 22L2 15.5V8.5L12 2Z" />
        </svg>
      </motion.div>
    ))}
  </>
);
