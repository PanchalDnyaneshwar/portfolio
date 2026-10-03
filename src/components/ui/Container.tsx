import React from "react";
import { cn } from "@/lib/utils";

export function Container({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={cn("mx-auto w-full max-w-[var(--container-max)] px-[var(--gutter)]", className)}
      {...props}
    />
  );
}
