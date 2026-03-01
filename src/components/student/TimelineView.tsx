"use client";

import React from "react";
import { motion } from "framer-motion";
import { useCredentialStore } from "@/store/credentialStore";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { StatusIndicator } from "@/components/ui/StatusIndicator";
import { EmptyState } from "@/components/ui/EmptyState";
import { CREDENTIAL_CATEGORIES } from "@/lib/constants";
import { formatTimestamp } from "@/lib/utils";
import {
  Award,
  Crown,
  Clock,
  XCircle,
  CheckCircle2,
  Calendar,
} from "lucide-react";

interface Props {
  address: string;
}

interface TimelineEvent {
  id: string;
  type: "issued" | "revoked";
  credentialName: string;
  issuerName: string;
  category: string;
  timestamp: number;
  reason?: string;
  isComposite: boolean;
}

export const TimelineView: React.FC<Props> = ({ address }) => {
  const { getCredentialsByRecipient } = useCredentialStore();
  const credentials = getCredentialsByRecipient(address);

  const events: TimelineEvent[] = [];

  credentials.forEach((cred) => {
    events.push({
      id: `${cred.id}-issued`,
      type: "issued",
      credentialName: cred.credentialTypeName,
      issuerName: cred.issuerName,
      category: cred.category,
      timestamp: cred.issuedAt,
      isComposite: cred.category === "certification" && cred.tier === "expert",
    });

    if (cred.status === "revoked" && cred.revokedAt) {
      events.push({
        id: `${cred.id}-revoked`,
        type: "revoked",
        credentialName: cred.credentialTypeName,
        issuerName: cred.issuerName,
        category: cred.category,
        timestamp: cred.revokedAt,
        reason: cred.revocationReason,
        isComposite: false,
      });
    }
  });

  events.sort((a, b) => b.timestamp - a.timestamp);

  if (events.length === 0) {
    return (
      <EmptyState
        icon={<Clock className="w-8 h-8 text-dark-500" />}
        title="No Timeline Events"
        description="Your credential history will appear here as you earn and receive credentials."
      />
    );
  }

  return (
    <div className="relative max-w-3xl mx-auto">
      <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-brand-500/30 via-dark-700/30 to-transparent" />

      <div className="space-y-6">
        {events.map((event, i) => {
          const catConfig = CREDENTIAL_CATEGORIES[event.category];
          const isRevoked = event.type === "revoked";

          return (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="relative flex items-start gap-5 pl-12"
            >
              <div className="absolute left-[18px] top-3">
                <div className={`w-[18px] h-[18px] rounded-full border-2 flex items-center justify-center ${
                  isRevoked
                    ? "bg-red-500/15 border-red-500/30"
                    : event.isComposite
                    ? "bg-amber-500/15 border-amber-500/30"
                    : "bg-brand-500/15 border-brand-500/30"
                }`}>
                  <div className={`w-2 h-2 rounded-full ${
                    isRevoked ? "bg-red-400" : event.isComposite ? "bg-amber-400" : "bg-brand-400"
                  }`} />
                </div>
              </div>

              <Card variant="glass" padding="md" className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {isRevoked ? (
                      <XCircle className="w-4 h-4 text-red-400" />
                    ) : event.isComposite ? (
                      <Crown className="w-4 h-4 text-amber-400" />
                    ) : (
                      <CheckCircle2 className="w-4 h-4 text-accent-400" />
                    )}
                    <span className={`text-body-sm font-semibold ${
                      isRevoked ? "text-red-300" : "text-dark-200"
                    }`}>
                      {isRevoked ? "Credential Revoked" : event.isComposite ? "Composite Earned" : "Credential Earned"}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-caption text-dark-500">
                    <Calendar className="w-3 h-3" />
                    {formatTimestamp(event.timestamp)}
                  </div>
                </div>

                <h4 className="text-body-lg font-semibold text-white mb-1">
                  {event.credentialName}
                </h4>
                <p className="text-body-sm text-dark-400">{event.issuerName}</p>

                {event.reason && (
                  <div className="mt-2 p-2 rounded-lg bg-red-500/5 border border-red-500/10">
                    <p className="text-caption text-red-400">Reason: {event.reason}</p>
                  </div>
                )}
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
