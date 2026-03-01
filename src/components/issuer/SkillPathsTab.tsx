"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useWallet } from "@/hooks/useWallet";
import { useCredentialStore } from "@/store/credentialStore";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import { Modal } from "@/components/ui/Modal";
import { CreateSkillPathForm } from "./CreateSkillPathForm";
import { formatTimestamp } from "@/lib/utils";
import {
  Plus,
  GitBranch,
  Crown,
  ArrowRight,
  Calendar,
  CheckCircle2,
  Layers,
} from "lucide-react";

export const SkillPathsTab: React.FC = () => {
  const { address } = useWallet();
  const { compositionRules, credentialTypes } = useCredentialStore();
  const [showCreateModal, setShowCreateModal] = useState(false);

  const issuerRules = compositionRules.filter(
    (r) => r.definedBy === address
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-heading-lg font-bold text-white">Skill Paths</h2>
          <p className="text-body-sm text-dark-400 mt-1">
            Define composition rules that combine micro-credentials into mastery certifications
          </p>
        </div>
        <Button
          onClick={() => setShowCreateModal(true)}
          icon={<Plus className="w-4 h-4" />}
        >
          New Skill Path
        </Button>
      </div>

      {issuerRules.length === 0 ? (
        <EmptyState
          icon={<GitBranch className="w-8 h-8 text-dark-500" />}
          title="No Skill Paths Defined"
          description="Create composition rules to automatically issue mastery credentials when students complete all required micro-credentials."
          action={
            <Button
              onClick={() => setShowCreateModal(true)}
              icon={<Plus className="w-4 h-4" />}
              variant="outline"
            >
              Create First Path
            </Button>
          }
        />
      ) : (
        <div className="space-y-4">
          {issuerRules.map((rule, i) => {
            const requiredTypes = rule.requiredCredentialTypeIds.map((id) =>
              credentialTypes.find((t) => t.id === id)
            );
            const compositeType = credentialTypes.find(
              (t) => t.id === rule.compositeCredentialTypeId
            );

            return (
              <motion.div
                key={rule.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <Card variant="highlight" padding="md">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white shadow-lg shadow-amber-500/15">
                        <Crown className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-heading-md font-bold text-white">{rule.name}</h3>
                        <span className="text-caption font-mono text-dark-500">{rule.id}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="success" size="sm" dot>
                        {rule.status}
                      </Badge>
                      {rule.autoIssue && (
                        <Badge variant="brand" size="sm">
                          Auto-Issue
                        </Badge>
                      )}
                    </div>
                  </div>

                  <p className="text-body-sm text-dark-400 mb-4">{rule.description}</p>

                  <div className="mb-4">
                    <p className="text-caption font-semibold text-dark-300 uppercase tracking-wider mb-2">
                      Required Micro-Credentials ({rule.requiredCredentialTypeIds.length})
                    </p>
                    <div className="space-y-2">
                      {requiredTypes.map((type) => (
                        <div
                          key={type?.id || Math.random()}
                          className="flex items-center gap-3 p-3 rounded-lg bg-dark-800/30 border border-dark-700/20"
                        >
                          <CheckCircle2 className="w-4 h-4 text-brand-400 flex-shrink-0" />
                          <span className="text-body-sm text-dark-200">
                            {type?.name || "Unknown Type"}
                          </span>
                          <span className="text-caption font-mono text-dark-600 ml-auto">
                            {type?.id}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {compositeType && (
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-amber-500/5 border border-amber-500/15">
                      <ArrowRight className="w-4 h-4 text-amber-400 flex-shrink-0" />
                      <div>
                        <p className="text-body-sm font-medium text-amber-300">
                          Composite: {compositeType.name}
                        </p>
                        <p className="text-caption text-dark-500">
                          Auto-issued when all requirements are met
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-1.5 text-caption text-dark-500 mt-4">
                    <Calendar className="w-3 h-3" />
                    Created {formatTimestamp(rule.createdAt)}
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}

      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Create Skill Path"
        description="Define which micro-credentials combine into a mastery certification"
        size="lg"
      >
        <CreateSkillPathForm onClose={() => setShowCreateModal(false)} />
      </Modal>
    </div>
  );
};
