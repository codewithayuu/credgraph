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
          <label className="input-label">
            {label}
            {props.required && <span className="text-red-400 ml-1">*</span>}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            className={cn(
              "input-field appearance-none pr-10 cursor-pointer",
              error && "border-red-500/50 focus:border-red-500/70 focus:ring-red-500/20",
              !props.value && "text-dark-500",
              className
            )}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                className="bg-dark-800 text-dark-100"
              >
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-500 pointer-events-none" />
        </div>
        {error && (
          <p className="text-body-sm text-red-400 flex items-center gap-1.5">
            <span className="w-1 h-1 bg-red-400 rounded-full" />
            {error}
          </p>
        )}
        {hint && !error && (
          <p className="text-caption text-dark-500">{hint}</p>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";
