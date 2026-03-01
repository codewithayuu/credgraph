"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Button } from "@/components/ui/Button";
import { GlowOrb } from "@/components/ui/GlowOrb";
import { ArrowRight, Shield, GraduationCap, Search, Hexagon } from "lucide-react";

export const CTASection: React.FC = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section ref={ref} className="relative py-28 overflow-hidden">
      <GlowOrb color="brand" size="lg" className="top-[-100px] left-[20%] opacity-30" />
      <GlowOrb color="accent" size="md" className="bottom-[-50px] right-[30%] opacity-20" />

      <div className="relative section-container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-500 to-cyber-500 mb-8 shadow-2xl shadow-brand-500/30"
          >
            <Hexagon className="w-8 h-8 text-white" strokeWidth={2} />
          </motion.div>

          <h2 className="text-display-sm md:text-display-md font-black text-white mb-6">
            Ready to Build the{" "}
            <span className="gradient-text">Trust Layer</span>?
          </h2>
          <p className="text-body-lg text-dark-400 max-w-2xl mx-auto mb-12">
            Whether you issue credentials, earn them, or verify them — CredGraph gives you
            cryptographic certainty in a world of forged PDFs.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {[
              {
                href: "/issuer",
                icon: <Shield className="w-5 h-5" />,
                title: "For Issuers",
                desc: "Register and issue credentials",
                gradient: "from-brand-600 to-brand-500",
                shadow: "shadow-brand-500/20",
              },
              {
                href: "/student",
                icon: <GraduationCap className="w-5 h-5" />,
                title: "For Students",
                desc: "View and share your credentials",
                gradient: "from-cyber-600 to-cyber-500",
                shadow: "shadow-cyber-500/20",
              },
              {
                href: "/verify",
                icon: <Search className="w-5 h-5" />,
                title: "For Verifiers",
                desc: "Verify any credential instantly",
                gradient: "from-accent-600 to-accent-500",
                shadow: "shadow-accent-500/20",
              },
            ].map((cta, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
              >
                <Link href={cta.href}>
                  <motion.div
                    whileHover={{ y: -6, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`p-6 rounded-2xl bg-gradient-to-br ${cta.gradient} text-white shadow-xl ${cta.shadow} hover:shadow-2xl transition-shadow duration-300 cursor-pointer group`}
                  >
                    <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center mb-4 group-hover:bg-white/20 transition-colors">
                      {cta.icon}
                    </div>
                    <h3 className="text-heading-md font-bold mb-1">{cta.title}</h3>
                    <p className="text-body-sm text-white/70">{cta.desc}</p>
                    <ArrowRight className="w-4 h-4 mt-3 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
