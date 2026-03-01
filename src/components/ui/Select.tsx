"use client";

import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  hint?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, hint, options, placeholder, className, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label className="label-base">
            {label}
            {props.required && <span className="text-crimson-400 ml-1">*</span>}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            className={cn(
              "input-base appearance-none pr-10 cursor-pointer",
              error && "border-crimson-500/40 focus:border-crimson-500/60 focus:ring-crimson-500/10",
              !props.value && "text-surface-500",
              className
            )}
            {...props}
          >
            {placeholder && <option value="" disabled>{placeholder}</option>}
            {options.map((o) => (
              <option key={o.value} value={o.value} className="bg-surface-850 text-surface-100">{o.label}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-500 pointer-events-none" />
        </div>
        {error && (
          <p className="text-b3 text-crimson-400 flex items-center gap-1.5">
            <span className="w-1 h-1 bg-crimson-400 rounded-full flex-shrink-0" />
            {error}
          </p>
        )}
        {hint && !error && <p className="text-cap text-surface-500">{hint}</p>}
      </div>
    );
  }
);
Select.displayName = "Select";
