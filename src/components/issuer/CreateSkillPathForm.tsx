"use client";

import React, { useState } from "react";
import { useWallet } from "@/hooks/useWallet";
import { useCredentialStore } from "@/store/credentialStore";
import { Input, Textarea } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { generateRuleId } from "@/lib/utils";
import { CompositionRule } from "@/lib/types";
import toast from "react-hot-toast";
import { Sparkles, CheckCircle2, Circle } from "lucide-react";

interface Props {
  onClose: () => void;
}

export const CreateSkillPathForm: React.FC<Props> = ({ onClose }) => {
  const { address } = useWallet();
  const { credentialTypes, addCompositionRule, getIssuerByAddress } = useCredentialStore();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    description: "",
    compositeTypeId: "",
    selectedTypeIds: [] as string[],
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const issuerInfo = address ? getIssuerByAddress(address) : undefined;

  const availableTypes = credentialTypes.filter(
    (t) => t.status === "active" && t.id !== form.compositeTypeId
  );

  const compositeOptions = credentialTypes
    .filter((t) => t.status === "active")
    .map((t) => ({ value: t.id, label: t.name }));

  const toggleType = (typeId: string) => {
    setForm((prev) => ({
      ...prev,
      selectedTypeIds: prev.selectedTypeIds.includes(typeId)
        ? prev.selectedTypeIds.filter((id) => id !== typeId)
        : [...prev.selectedTypeIds, typeId],
    }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.description.trim()) newErrors.description = "Description is required";
    if (!form.compositeTypeId) newErrors.compositeTypeId = "Select a composite credential type";
    if (form.selectedTypeIds.length < 2) newErrors.selectedTypeIds = "Select at least 2 required credentials";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate() || !address) return;

    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    const newRule: CompositionRule = {
      id: generateRuleId(),
      name: form.name,
      description: form.description,
      definedBy: address,
      definedByName: issuerInfo?.name || "Unknown Issuer",
      requiredCredentialTypeIds: form.selectedTypeIds,
      requiredCredentialTypes: availableTypes.filter((t) => form.selectedTypeIds.includes(t.id)),
      compositionType: "all_required",
      compositeCredentialTypeId: form.compositeTypeId,
      autoIssue: true,
      createdAt: Math.floor(Date.now() / 1000),
      status: "active",
    };

    addCompositionRule(newRule);
    toast.success(`Skill path "${form.name}" created successfully`);
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
        label="Skill Path Name"
        placeholder="e.g., Full Stack Development Mastery"
        value={form.name}
        onChange={(e) => updateField("name", e.target.value)}
        error={errors.name}
        icon={<Sparkles className="w-4 h-4" />}
        required
      />

      <Textarea
        label="Description"
        placeholder="Describe what this skill path certifies..."
        value={form.description}
        onChange={(e) => updateField("description", e.target.value)}
        error={errors.description}
        required
      />

      <Select
        label="Composite Credential Type"
        options={compositeOptions}
        value={form.compositeTypeId}
        onChange={(e) => updateField("compositeTypeId", e.target.value)}
        error={errors.compositeTypeId}
        placeholder="Select the mastery credential"
        required
      />

      <div className="space-y-3">
        <label className="text-body-sm font-medium text-dark-200">
          Required Micro-Credentials
        </label>

        {availableTypes.length === 0 ? (
          <p className="text-body-sm text-dark-500">No active credential types available</p>
        ) : (
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {availableTypes.map((type) => {
              const isSelected = form.selectedTypeIds.includes(type.id);
              return (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => toggleType(type.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all duration-300 ${
                    isSelected
                      ? "bg-brand-500/5 border-brand-500/20"
                      : "bg-dark-800/40 border-dark-700/30 hover:border-brand-500/30"
                  }`}
                >
                  {isSelected ? (
                    <CheckCircle2 className="w-5 h-5 text-brand-400 flex-shrink-0" />
                  ) : (
                    <Circle className="w-5 h-5 text-dark-600 flex-shrink-0" />
                  )}
                  <div className="text-left">
                    <p className={`text-body-sm font-medium ${isSelected ? "text-dark-100" : "text-dark-400"}`}>
                      {type.name}
                    </p>
                    <p className="text-caption text-dark-500">{type.description}</p>
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {errors.selectedTypeIds && (
          <p className="text-body-sm text-red-400 flex items-center gap-1.5">
            <span className="w-1 h-1 bg-red-400 rounded-full" />
            {errors.selectedTypeIds}
          </p>
        )}
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
          Create Skill Path
        </Button>
      </div>
    </form>
  );
};
