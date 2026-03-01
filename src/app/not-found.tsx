"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Home, Search } from "lucide-react";
import { BrandLogo } from "@/components/ui/BrandLogo";

export default function NotFound() {
  return (
    <div className="section-wrapper relative flex flex-col items-center justify-center min-h-[85vh] text-center">
      <div className="orb orb-gold w-[400px] h-[400px] top-[20%] left-[30%] opacity-10" />
      <div className="absolute inset-0 dot-bg opacity-30" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 max-w-lg w-full px-6"
      >
        <div className="inline-flex items-center justify-center mb-10">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            <BrandLogo size={120} />
          </motion.div>
        </div>

        <h1 className="text-d2 font-display text-white mb-2 leading-none">404</h1>
        <p className="text-h2 font-display text-surface-200 mb-6">Graph Node Not Found</p>
        <p className="text-b1 text-surface-400 mb-10 max-w-sm mx-auto leading-relaxed">
          The requested coordinate doesn&apos;t exist in the CredGraph protocol. Please check the URL or return home.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button size="lg" icon={<Home className="w-4 h-4" />}>
              Back to Safety
            </Button>
          </Link>
          <Link href="/verify">
            <Button variant="secondary" size="lg" icon={<Search className="w-4 h-4" />}>
              Try Searching
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
