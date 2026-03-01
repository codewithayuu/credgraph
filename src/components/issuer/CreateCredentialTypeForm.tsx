"use client";

import React, { useState } from "react";
import { useWallet } from "@/hooks/useWallet";
import { useCredentialStore } from "@/store/credentialStore";
import { Input, Textarea } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { generateTypeId } from "@/lib/utils";
import { CredentialType } from "@/lib/types";
import toast from "react-hot-toast";
import { Sparkles, Tag, Layers, FileText, FileCheck } from "lucide-react";

const categoryOptions = [
  { value: "technical", label: "Technical" },
  { value: "soft_skill", label: "Soft Skill" },
  { value: "achievement", label: "Achievement" },
  { value: "research", label: "Research" },
  { value: "certification", label: "Certification" },
  { value: "academic", label: "Academic" },
];

const tierOptions = [
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
  { value: "expert", label: "Expert" },
];

interface Props {
  onClose: () => void;
}

export const CreateCredentialTypeForm: React.FC<Props> = ({ onClose }) => {
  const { address } = useWallet();
  const { addCredentialType, getIssuerByAddress } = useCredentialStore();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    description: "",
    category: "",
    tier: "",
    evidenceRequired: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const issuerInfo = address ? getIssuerByAddress(address) : undefined;

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.description.trim()) newErrors.description = "Description is required";
    if (!form.category) newErrors.category = "Category is required";
    if (!form.tier) newErrors.tier = "Tier is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate() || !address) return;

    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    const newType: CredentialType = {
      id: generateTypeId(),
      name: form.name,
      description: form.description,
      category: form.category as any,
      tier: form.tier as any,
      issuerAddress: address,
      issuerName: issuerInfo?.name || "Unknown Issuer",
      evidenceRequired: form.evidenceRequired,
      createdAt: Math.floor(Date.now() / 1000),
      status: "active",
    };

    addCredentialType(newType);
    toast.success(`Credential type "${form.name}" created successfully`);
    setLoading(false);
    onClose();
  };

  const updateField = (field: string, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <Input
        label="Credential Name"
        placeholder="e.g., React.js Proficiency"
        value={form.name}
        onChange={(e) => updateField("name", e.target.value)}
        error={errors.name}
        icon={<Tag className="w-4 h-4" />}
        required
      />

      <Textarea
        label="Description"
        placeholder="Describe what this credential certifies..."
        value={form.description}
        onChange={(e) => updateField("description", e.target.value)}
        error={errors.description}
        required
      />

      <div className="grid grid-cols-2 gap-4">
        <Select
          label="Category"
          options={categoryOptions}
          value={form.category}
          onChange={(e) => updateField("category", e.target.value)}
          error={errors.category}
          placeholder="Select category"
          required
        />
        <Select
          label="Tier Level"
          options={tierOptions}
          value={form.tier}
          onChange={(e) => updateField("tier", e.target.value)}
          error={errors.tier}
          placeholder="Select tier"
          required
        />
      </div>

      <div className="flex items-center gap-3 p-4 rounded-xl bg-dark-800/40 border border-dark-700/30">
        <button
          type="button"
          onClick={() => updateField("evidenceRequired", !form.evidenceRequired)}
          className={`w-11 h-6 rounded-full transition-all duration-300 relative ${
            form.evidenceRequired
              ? "bg-brand-500"
              : "bg-dark-600"
          }`}
        >
          <div
            className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-300 ${
              form.evidenceRequired ? "translate-x-[22px]" : "translate-x-0.5"
            }`}
          />
        </button>
        <div>
          <p className="text-body-sm font-medium text-dark-200">Require Evidence</p>
          <p className="text-caption text-dark-500">Issuers must attach proof when issuing this credential</p>
        </div>
      </div>

      <div className="flex items-center gap-3 pt-4 border-t border-dark-700/50">
        <Button
          type="button"
          variant="ghost"
          onClick={onClose}
          className="flex-1"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          loading={loading}
          icon={<Sparkles className="w-4 h-4" />}
          className="flex-1"
        >
          Create Type
        </Button>
      </div>
    </form>
  );
};
