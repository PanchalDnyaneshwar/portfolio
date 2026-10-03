import React from "react";
import { cn } from "@/lib/utils";

interface TagProps extends React.ComponentPropsWithoutRef<"span"> {
  children: React.ReactNode;
}

export function Tag({ children, className, ...props }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-border bg-surface px-3 py-1.5 font-mono text-xs text-text-muted transition-colors hover:border-accent-soft/40 hover:text-text",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
