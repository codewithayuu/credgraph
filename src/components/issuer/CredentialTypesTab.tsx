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
import { CreateCredentialTypeForm } from "./CreateCredentialTypeForm";
import { CREDENTIAL_CATEGORIES, CREDENTIAL_TIERS } from "@/lib/constants";
import { formatTimestamp } from "@/lib/utils";
import {
  Plus,
  FileStack,
  Award,
  Tag,
  Layers,
  Calendar,
  FileCheck,
  CheckCircle2,
} from "lucide-react";

export const CredentialTypesTab: React.FC = () => {
  const { address } = useWallet();
  const { getCredentialTypesByIssuer } = useCredentialStore();
  const [showCreateModal, setShowCreateModal] = useState(false);

  const types = address ? getCredentialTypesByIssuer(address) : [];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-heading-lg font-bold text-white">Credential Types</h2>
          <p className="text-body-sm text-dark-400 mt-1">
            Define the types of credentials your institution issues
          </p>
        </div>
        <Button
          onClick={() => setShowCreateModal(true)}
          icon={<Plus className="w-4 h-4" />}
        >
          New Type
        </Button>
      </div>

      {types.length === 0 ? (
        <EmptyState
          icon={<FileStack className="w-8 h-8 text-dark-500" />}
          title="No Credential Types Defined"
          description="Create your first credential type to start issuing verifiable credentials to students."
          action={
            <Button
              onClick={() => setShowCreateModal(true)}
              icon={<Plus className="w-4 h-4" />}
              variant="outline"
            >
              Create First Type
            </Button>
          }
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {types.map((type, i) => {
            const catConfig = CREDENTIAL_CATEGORIES[type.category];
            const tierConfig = CREDENTIAL_TIERS[type.tier];
            return (
              <motion.div
                key={type.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <Card variant="interactive" padding="md" className="h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl ${catConfig?.bgColor || "bg-dark-800"} flex items-center justify-center`}>
                        <Award className={`w-5 h-5 ${catConfig?.color || "text-dark-400"}`} />
                      </div>
                      <div>
                        <h3 className="text-body-lg font-semibold text-white">{type.name}</h3>
                        <span className="text-caption font-mono text-dark-500">{type.id}</span>
                      </div>
                    </div>
                    <Badge
                      variant={type.status === "active" ? "success" : "default"}
                      size="sm"
                      dot
                    >
                      {type.status}
                    </Badge>
                  </div>

                  <p className="text-body-sm text-dark-400 mb-4 line-clamp-2">
                    {type.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="info" size="sm" icon={<Tag className="w-3 h-3" />}>
                      {catConfig?.label || type.category}
                    </Badge>
                    <Badge variant="brand" size="sm" icon={<Layers className="w-3 h-3" />}>
                      {tierConfig?.label || type.tier}
                    </Badge>
                    {type.evidenceRequired && (
                      <Badge variant="warning" size="sm" icon={<FileCheck className="w-3 h-3" />}>
                        Evidence Required
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5 text-caption text-dark-500">
                    <Calendar className="w-3 h-3" />
                    Created {formatTimestamp(type.createdAt)}
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
        title="Create Credential Type"
        description="Define a new type of credential that your institution can issue"
        size="lg"
      >
        <CreateCredentialTypeForm onClose={() => setShowCreateModal(false)} />
      </Modal>
    </div>
  );
};
