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
          <label className="label-base">
            {label}
            {props.required && <span className="text-crimson-400 ml-1">*</span>}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-surface-500 [&>svg]:w-4 [&>svg]:h-4">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={cn(
              "input-base",
              icon && "pl-11",
              rightElement && "pr-12",
              error && "border-crimson-500/45 focus-visible:border-crimson-500/60",
              className
            )}
            style={
              error
                ? ({
                    boxShadow: "0 0 0 4px rgba(239, 68, 68, 0.10)",
                  } as React.CSSProperties)
                : undefined
            }
            {...props}
          />
          {rightElement && <div className="absolute right-3 top-1/2 -translate-y-1/2">{rightElement}</div>}
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
Input.displayName = "Input";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, hint, className, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label className="label-base">
            {label}
            {props.required && <span className="text-crimson-400 ml-1">*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          className={cn(
            "input-base min-h-[110px] resize-y",
            error && "border-crimson-500/45 focus-visible:border-crimson-500/60",
            className
          )}
          style={
            error
              ? ({
                  boxShadow: "0 0 0 4px rgba(239, 68, 68, 0.10)",
                } as React.CSSProperties)
              : undefined
          }
          {...props}
        />
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
Textarea.displayName = "Textarea";
