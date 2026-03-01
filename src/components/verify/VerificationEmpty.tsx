"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

import { Button } from "@/components/ui/Button";
import { WalletAddress } from "@/components/ui/WalletAddress";

interface Props {
  address: string;
}

const ease = [0.16, 1, 0.3, 1] as const;

export const VerificationEmpty: React.FC<Props> = ({ address }) => {
  return (
    <div className="relative flex items-center justify-center min-h-[70vh] overflow-hidden">
      <div className="orb orb-electric w-[520px] h-[520px] top-[-240px] right-[-240px] opacity-14" />
      <div className="orb orb-gold w-[520px] h-[520px] bottom-[-260px] left-[-240px] opacity-12" />
      <div className="absolute inset-0 dot-bg opacity-[0.28]" />

      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.55, ease }}
        className="relative z-10 max-w-xl w-full mx-4"
      >
        <div className="panel-elevated rounded-3xl p-10 text-center overflow-hidden">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-surface-900/45 border border-surface-800/55 text-surface-400 mx-auto mb-6">
            <MarkEmpty />
          </div>

          <h2 className="font-display text-h1 text-white mb-3">No credentials found</h2>

          <div className="mb-4 flex justify-center">
            <WalletAddress address={address} showCopy truncateChars={10} className="text-b3" />
          </div>

          <p className="text-b1 text-surface-400 mb-8 text-balance">
            This wallet does not currently hold any CredGraph credentials. The address may be incorrect, or no
            credentials have been issued to this wallet yet.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/verify" className="w-full sm:w-auto">
              <Button variant="secondary" size="lg" icon={<MarkBack />}>
                Try another address
              </Button>
            </Link>

            <Link href="/verify/STUDENT1ABCDEFGHIJKLMNOPQRSTUVWXYZ234567890" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" icon={<MarkSearch />}>
                View demo wallet
              </Button>
            </Link>
          </div>

          <div className="mt-8 pt-6 border-t border-surface-800/55">
            <p className="text-cap text-surface-500">
              Tip: verification is public—no account and no wallet connection required.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

/* Marks */
function MarkEmpty() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <path
        d="M7 4.8h7l3 3v11.4c0 .9-.7 1.6-1.6 1.6H7c-.9 0-1.6-.7-1.6-1.6V6.4c0-.9.7-1.6 1.6-1.6Z"
        stroke="currentColor"
        strokeWidth="1.9"
        opacity="0.9"
      />
      <path d="M14 4.8V8h3.2" stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round" opacity="0.85" />
      <path d="M9 12h6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" opacity="0.6" />
      <path d="M9 15.6h4.2" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" opacity="0.5" />
      <path d="M8 18L18 8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" opacity="0.55" />
    </svg>
  );
}

function MarkBack() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-current">
      <path d="M10 6l-6 6l6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 12h16" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" opacity="0.85" />
    </svg>
  );
}

function MarkSearch() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-current">
      <path
        d="M11 19a8 8 0 1 1 0-16a8 8 0 0 1 0 16Z"
        stroke="currentColor"
        strokeWidth="2.0"
        opacity="0.85"
      />
      <path
        d="M21 21l-4.35-4.35"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}
