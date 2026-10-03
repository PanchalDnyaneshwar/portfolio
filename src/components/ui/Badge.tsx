import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.ComponentPropsWithoutRef<"div"> {
  variant?: "success" | "neutral" | "accent";
  pulse?: boolean;
  children: React.ReactNode;
}

export function Badge({
  variant = "success",
  pulse = true,
  children,
  className,
  ...props
}: BadgeProps) {
  const dotColor =
    variant === "success"
      ? "bg-success"
      : variant === "accent"
      ? "bg-accent"
      : "bg-text-muted";

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-1.5 font-mono text-xs text-text-muted shadow-sm",
        className
      )}
      {...props}
    >
      <span className="relative flex h-2 w-2 shrink-0">
        {pulse && (
          <span
            className={cn(
              "absolute inline-flex h-full w-full animate-ping rounded-full opacity-75",
              dotColor
            )}
          />
        )}
        <span className={cn("relative inline-flex h-2 w-2 rounded-full", dotColor)} />
      </span>
      <span>{children}</span>
    </div>
  );
}
