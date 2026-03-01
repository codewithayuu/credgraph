"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Button } from "@/components/ui/Button";
import { BrandLogo } from "@/components/ui/BrandLogo";

const ease = [0.16, 1, 0.3, 1] as const;

const roles = [
  {
    href: "/issuer",
    title: "Institution",
    desc: "Register as an issuer and mint credentials.",
    tone: "gold" as const,
    mark: <RoleIssuerMark />,
  },
  {
    href: "/student",
    title: "Student",
    desc: "Own, track, and share achievements.",
    tone: "electric" as const,
    mark: <RoleStudentMark />,
  },
  {
    href: "/verify",
    title: "Verifier",
    desc: "Verify credentials instantly with a link.",
    tone: "neon" as const,
    mark: <RoleVerifyMark />,
  },
];

const tone = {
  gold: "border-gold-500/14 hover:border-gold-500/22 hover:shadow-glow-gold",
  electric: "border-electric-500/14 hover:border-electric-500/22 hover:shadow-glow-electric",
  neon: "border-neon-500/14 hover:border-neon-500/22 hover:shadow-glow-neon",
};

export const CTASection: React.FC = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.18 });

  return (
    <section ref={ref} className="relative py-28 overflow-hidden">
      <div className="orb orb-gold w-[520px] h-[520px] top-[-200px] left-[10%] opacity-20" />
      <div className="orb orb-electric w-[420px] h-[420px] bottom-[-220px] right-[10%] opacity-18" />

      <div className="relative section-wrapper">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease }}
          className="max-w-5xl mx-auto"
        >
          <div className="panel rounded-3xl border border-surface-800/50 overflow-hidden">
            <div className="relative p-10 sm:p-12">
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(900px_380px_at_25%_0%,rgba(247,201,72,0.10),transparent_60%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(900px_380px_at_80%_15%,rgba(0,221,212,0.08),transparent_62%)]" />
                <div className="absolute inset-0 opacity-[0.14] dot-bg" />
              </div>

              <div className="relative text-center">
                <div className="inline-flex items-center justify-center mb-10">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 bg-gold-500/10 blur-3xl rounded-full opacity-60"
                  />
                  <BrandLogo size={80} className="relative z-10" />
                </div>

                <h2 className="font-display text-d3 text-white mb-4">
                  Ready to build the <span className="text-gradient-gold">trust layer</span>?
                </h2>
                <p className="text-b1 text-surface-400 max-w-2xl mx-auto leading-relaxed">
                  Choose your role. CredGraph gives you chain-native proof for issuing, owning, and verifying credentials.
                </p>

                <div className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4">
                  <Link href="/issuer" className="w-full sm:w-auto">
                    <Button size="lg" className="w-full sm:w-auto min-w-[220px]">
                      Get started as institution
                    </Button>
                  </Link>
                  <Link href="/verify" className="w-full sm:w-auto">
                    <Button variant="secondary" size="lg" className="w-full sm:w-auto min-w-[220px]">
                      Verify a wallet
                    </Button>
                  </Link>
                </div>

                <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
                  {roles.map((r, i) => (
                    <motion.div
                      key={r.title}
                      initial={{ opacity: 0, y: 14 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.55, delay: 0.12 + i * 0.08, ease }}
                    >
                      <Link href={r.href} className="block h-full">
                        <motion.div
                          whileHover={{ y: -4 }}
                          transition={{ type: "spring", stiffness: 420, damping: 32 }}
                          className={[
                            "h-full rounded-3xl border p-6",
                            "bg-gradient-to-br from-white/6 to-transparent",
                            "transition-[transform,box-shadow,border-color] duration-200",
                            tone[r.tone],
                          ].join(" ")}
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <p className="text-b2 font-semibold text-white">{r.title}</p>
                              <p className="text-b3 text-surface-400 mt-1">{r.desc}</p>
                            </div>
                            <div className="w-11 h-11 rounded-2xl border border-white/6 bg-surface-900/40 backdrop-blur flex items-center justify-center">
                              {r.mark}
                            </div>
                          </div>

                          <div className="mt-6 flex items-center gap-2">
                            <span className="text-micro uppercase tracking-[0.22em] text-surface-500">Open</span>
                            <span className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
                            <RoleArrow />
                          </div>
                        </motion.div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

function RoleArrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-surface-400">
      <path d="M5 12h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function RoleIssuerMark() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-gold-300">
      <path d="M4 10l8-4l8 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 10v8M10 10v8M14 10v8M18 10v8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" opacity="0.75" />
      <path d="M4.8 18.5h14.4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function RoleStudentMark() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-electric-300">
      <path d="M4 10l8-4l8 4l-8 4l-8-4z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M6 14.2v3.2c0 1.8 2.7 3.3 6 3.3s6-1.5 6-3.3v-3.2" stroke="currentColor" strokeWidth="1.7" opacity="0.75" />
    </svg>
  );
}

function RoleVerifyMark() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-neon-300">
      <path
        d="M12 3.5c3.4 2.6 6.4 3.1 8.2 3.4c.2 1 .3 2 .3 3c0 5.4-3.7 9.8-8.5 11c-4.8-1.2-8.5-5.6-8.5-11c0-1 .1-2 .3-3C5.6 6.6 8.6 6.1 12 3.5z"
        stroke="currentColor"
        strokeWidth="1.7"
        opacity="0.7"
      />
      <path d="M8.7 12.2l2.1 2.1l4.8-5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
