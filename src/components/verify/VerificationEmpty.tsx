"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { GlowOrb } from "@/components/ui/GlowOrb";
import { WalletAddress } from "@/components/ui/WalletAddress";
import { FileX2, ArrowLeft, Search } from "lucide-react";

interface Props {
  address: string;
}

export const VerificationEmpty: React.FC<Props> = ({ address }) => {
  return (
    <div className="page-container relative flex items-center justify-center min-h-[70vh]">
      <GlowOrb color="brand" size="md" className="top-[30%] right-[20%] opacity-15" />

      <div className="absolute inset-0 dot-pattern opacity-20" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 max-w-lg w-full mx-4"
      >
        <div className="glass-strong rounded-3xl p-10 text-center">
          <div className="w-16 h-16 rounded-2xl bg-dark-800/60 border border-dark-700/50 flex items-center justify-center mx-auto mb-6">
            <FileX2 className="w-8 h-8 text-dark-500" />
          </div>

          <h2 className="text-heading-xl font-bold text-white mb-3">
            No Credentials Found
          </h2>
          <div className="mb-4">
            <WalletAddress address={address} showCopy truncateChars={10} className="text-body-sm justify-center" />
          </div>
          <p className="text-body-md text-dark-400 mb-8">
            This wallet address does not hold any CredGraph credentials. The address may be incorrect, or no credentials have been issued to this wallet yet.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/verify">
              <Button variant="secondary" icon={<ArrowLeft className="w-4 h-4" />}>
                Try Another Address
              </Button>
            </Link>
            <Link href="/verify/STUDENT1ABCDEFGHIJKLMNOPQRSTUVWXYZ234567890">
              <Button variant="outline" icon={<Search className="w-4 h-4" />}>
                View Demo Student
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
