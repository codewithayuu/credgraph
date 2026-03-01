"use client";

import React from "react";
import { motion } from "framer-motion";
import { BrandLogo } from "@/components/ui/BrandLogo";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-void">
      <div className="flex flex-col items-center gap-6 text-center">
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gold-500/10 blur-3xl rounded-full" />
          <BrandLogo size={80} className="relative z-10" />
        </motion.div>

        <div className="space-y-2">
          <h2 className="text-h2 font-display text-white tracking-tight">
            Cred<span className="text-gradient-gold">Graph</span>
          </h2>
          <div className="flex justify-center gap-1.5 mt-4">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ opacity: [0.2, 1, 0.2] }}
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                className="w-1.5 h-1.5 rounded-full bg-gold-400 shadow-glow-gold"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
