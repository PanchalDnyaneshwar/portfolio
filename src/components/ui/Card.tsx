import React from "react";
import { cn } from "@/lib/utils";

export function Card({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={cn(
        "rounded-[var(--radius-md)] border border-border bg-surface backdrop-blur-[8px] p-6 sm:p-8",
        "transition-all duration-200 hover:-translate-y-0.5 hover:border-border-strong hover:bg-surface-hover",
        className
      )}
      {...props}
    />
  );
}
