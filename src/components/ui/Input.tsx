import React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <div className="w-full">
        <input
          ref={ref}
          className={cn(
            "w-full rounded-[var(--radius-sm)] border border-border bg-surface px-4 py-3 text-sm text-text placeholder:text-text-subtle",
            "transition-colors duration-200 focus:border-accent-soft focus:outline-none focus:ring-1 focus:ring-accent-soft",
            error && "border-danger focus:border-danger focus:ring-danger",
            className
          )}
          {...props}
        />
        {error && <p className="mt-1 font-mono text-xs text-danger">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
