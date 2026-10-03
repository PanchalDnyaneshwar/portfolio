import React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <div className="w-full">
        <textarea
          ref={ref}
          className={cn(
            "w-full rounded-[var(--radius-sm)] border border-border bg-surface px-4 py-3 text-sm text-text placeholder:text-text-subtle",
            "transition-colors duration-200 focus:border-accent-soft focus:outline-none focus:ring-1 focus:ring-accent-soft",
            "min-h-[128px] resize-y",
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

Textarea.displayName = "Textarea";
