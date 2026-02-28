"use client";

import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  icon?: React.ReactNode;
  rightElement?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, icon, rightElement, className, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label className="input-label">
            {label}
            {props.required && <span className="text-red-400 ml-1">*</span>}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-dark-500">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={cn(
              "input-field",
              icon && "pl-11",
              rightElement && "pr-12",
              error && "border-red-500/50 focus:border-red-500/70 focus:ring-red-500/20",
              className
            )}
            {...props}
          />
          {rightElement && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              {rightElement}
            </div>
          )}
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

Input.displayName = "Input";

// Textarea variant
interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, hint, className, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label className="input-label">
            {label}
            {props.required && <span className="text-red-400 ml-1">*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          className={cn(
            "input-field min-h-[100px] resize-y",
            error && "border-red-500/50 focus:border-red-500/70 focus:ring-red-500/20",
            className
          )}
          {...props}
        />
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

Textarea.displayName = "Textarea";
