"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { GlowOrb } from "@/components/ui/GlowOrb";
import { Home, Search, Hexagon } from "lucide-react";

export default function NotFound() {
  return (
    <div className="page-container relative flex items-center justify-center min-h-[80vh]">
      <GlowOrb color="brand" size="lg" className="top-[20%] left-[30%] opacity-20" />

      <div className="absolute inset-0 grid-pattern opacity-30" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-lg w-full mx-4 text-center"
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-dark-800/60 border border-dark-700/50 mb-8"
        >
          <Hexagon className="w-10 h-10 text-dark-500" />
        </motion.div>

        <h1 className="text-display-md font-black text-white mb-2">404</h1>
        <p className="text-heading-md text-dark-400 mb-2">Page Not Found</p>
        <p className="text-body-md text-dark-500 mb-8">
          The page you are looking for does not exist or has been moved.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/">
            <Button icon={<Home className="w-4 h-4" />}>
              Back to Home
            </Button>
          </Link>
          <Link href="/verify">
            <Button variant="outline" icon={<Search className="w-4 h-4" />}>
              Verify Credentials
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
