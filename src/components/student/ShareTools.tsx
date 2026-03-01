"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { CopyButton } from "@/components/ui/CopyButton";
import { getVerificationUrl } from "@/lib/utils";
import {
  QrCode,
  Link as LinkIcon,
  Download,
  Share2,
  ExternalLink,
  Smartphone,
} from "lucide-react";

interface Props {
  address: string;
}

export const ShareTools: React.FC<Props> = ({ address }) => {
  const verificationUrl = getVerificationUrl(address);
  const [qrDataUrl, setQrDataUrl] = useState<string>("");

  useEffect(() => {
    const generateQR = async () => {
      try {
        const QRCode = (await import("qrcode")).default;
        const url = await QRCode.toDataURL(verificationUrl, {
          width: 400,
          margin: 2,
          color: {
            dark: "#e2e8f0",
            light: "#0f172a",
          },
        });
        setQrDataUrl(url);
      } catch (err) {
        console.error("QR generation failed:", err);
      }
    };
    generateQR();
  }, [verificationUrl]);

  const downloadQR = () => {
    if (!qrDataUrl) return;
    const link = document.createElement("a");
    link.download = `credgraph-verify-${address.slice(0, 8)}.png`;
    link.href = qrDataUrl;
    link.click();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card variant="highlight" padding="lg" className="h-full">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-brand-500/15 flex items-center justify-center text-brand-400">
              <LinkIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-heading-md font-bold text-white">Verification Link</h3>
              <p className="text-body-sm text-dark-400">Share this link with employers or verifiers</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-dark-800/60 border border-dark-700/50 mb-4">
            <p className="text-body-sm font-mono text-brand-300 break-all">{verificationUrl}</p>
          </div>

          <div className="flex gap-3">
            <CopyButton text={verificationUrl} label="Copy Link" className="flex-1 justify-center px-4 py-2.5 rounded-xl bg-dark-800/60 border border-dark-700/50 hover:border-brand-500/30 transition-all" />
            <a
              href={verificationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-dark-800/60 border border-dark-700/50 text-body-sm text-dark-300 hover:text-brand-400 hover:border-brand-500/30 transition-all"
            >
              <ExternalLink className="w-4 h-4" />
              Open
            </a>
          </div>

          <div className="mt-6 p-4 rounded-xl bg-brand-500/5 border border-brand-500/10">
            <p className="text-body-sm text-dark-400">
              Anyone with this link can verify all your credentials instantly — no login or wallet required. Perfect for resumes, job applications, and LinkedIn profiles.
            </p>
          </div>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
      >
        <Card variant="highlight" padding="lg" className="h-full">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-cyber-500/15 flex items-center justify-center text-cyber-400">
              <QrCode className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-heading-md font-bold text-white">QR Code</h3>
              <p className="text-body-sm text-dark-400">Print on your resume or show at career fairs</p>
            </div>
          </div>

          <div className="flex items-center justify-center p-6 rounded-xl bg-dark-800/40 border border-dark-700/30 mb-4">
            {qrDataUrl ? (
              <img
                src={qrDataUrl}
                alt="Verification QR Code"
                className="w-48 h-48 rounded-xl"
              />
            ) : (
              <div className="w-48 h-48 rounded-xl bg-dark-700/50 shimmer-bg" />
            )}
          </div>

          <Button
            onClick={downloadQR}
            variant="secondary"
            fullWidth
            icon={<Download className="w-4 h-4" />}
            disabled={!qrDataUrl}
          >
            Download QR Code
          </Button>

          <div className="mt-4 flex items-center gap-2 justify-center text-caption text-dark-500">
            <Smartphone className="w-3 h-3" />
            <span>Scan with any phone camera to verify</span>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};
