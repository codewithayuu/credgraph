"use client";

import React from "react";
import { motion } from "framer-motion";
import { VerificationSummary as SummaryType } from "@/lib/types";
import {
  Award,
  CheckCircle2,
  XCircle,
  Crown,
  ShieldCheck,
  ShieldX,
} from "lucide-react";

interface Props {
  summary: SummaryType;
}

export const VerificationSummary: React.FC<Props> = ({ summary }) => {
  const stats = [
    {
      icon: <Award className="w-5 h-5" />,
      value: summary.totalCredentials,
      label: "Total Credentials",
      color: "text-brand-400",
      bg: "bg-brand-500/10",
      border: "border-brand-500/15",
    },
    {
      icon: <CheckCircle2 className="w-5 h-5" />,
      value: summary.activeCredentials,
      label: "Active",
      color: "text-accent-400",
      bg: "bg-accent-500/10",
      border: "border-accent-500/15",
    },
    {
      icon: <XCircle className="w-5 h-5" />,
      value: summary.revokedCredentials,
      label: "Revoked",
      color: summary.revokedCredentials > 0 ? "text-red-400" : "text-dark-500",
      bg: summary.revokedCredentials > 0 ? "bg-red-500/10" : "bg-dark-800/40",
      border: summary.revokedCredentials > 0 ? "border-red-500/15" : "border-dark-700/30",
    },
    {
      icon: <Crown className="w-5 h-5" />,
      value: summary.compositeCredentials,
      label: "Composite",
      color: summary.compositeCredentials > 0 ? "text-amber-400" : "text-dark-500",
      bg: summary.compositeCredentials > 0 ? "bg-amber-500/10" : "bg-dark-800/40",
      border: summary.compositeCredentials > 0 ? "border-amber-500/15" : "border-dark-700/30",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {stats.map((stat, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: i * 0.08 }}
          className={`p-4 rounded-xl ${stat.bg} border ${stat.border} text-center`}
        >
          <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg ${stat.bg} ${stat.color} mb-2`}>
            {stat.icon}
          </div>
          <div className={`text-display-sm font-black ${stat.color}`}>{stat.value}</div>
          <div className="text-caption font-medium text-dark-400">{stat.label}</div>
        </motion.div>
      ))}

      <div className="col-span-2 md:col-span-4 mt-1">
        <div className={`flex items-center justify-center gap-2 p-3 rounded-xl border ${
          summary.allIssuersVerified
            ? "bg-accent-500/5 border-accent-500/15"
            : "bg-amber-500/5 border-amber-500/15"
        }`}>
          {summary.allIssuersVerified ? (
            <>
              <ShieldCheck className="w-4 h-4 text-accent-400" />
              <span className="text-body-sm font-semibold text-accent-300">All issuers verified in CredGraph Registry</span>
            </>
          ) : (
            <>
              <ShieldX className="w-4 h-4 text-amber-400" />
              <span className="text-body-sm font-semibold text-amber-300">Some issuers could not be verified</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
