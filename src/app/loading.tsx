"use client";

import React from "react";
import { motion } from "framer-motion";
import { Hexagon } from "lucide-react";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-dark-950">
      <div className="flex flex-col items-center gap-6">
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{
            rotate: { duration: 3, repeat: Infinity, ease: "linear" },
            scale: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
          }}
          className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-500 to-cyber-500 flex items-center justify-center shadow-2xl shadow-brand-500/30"
        >
          <Hexagon className="w-8 h-8 text-white" strokeWidth={2} />
        </motion.div>
        <div className="flex items-center gap-1.5">
          <span className="text-heading-md font-bold text-white">Cred</span>
          <span className="text-heading-md font-bold gradient-text">Graph</span>
        </div>
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
              className="w-2 h-2 rounded-full bg-brand-400"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
