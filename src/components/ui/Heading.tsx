import React from "react";
import { cn } from "@/lib/utils";

type HeadingLevel = "display" | "h1" | "h2" | "h3" | "h4";

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: HeadingLevel;
  as?: "h1" | "h2" | "h3" | "h4" | "span" | "p";
  gradient?: boolean;
}

const levelStyles: Record<HeadingLevel, string> = {
  display: "text-[clamp(3rem,8vw,7rem)] font-bold tracking-[-0.04em] leading-[0.95]",
  h1: "text-[clamp(2.5rem,5vw,4.5rem)] font-bold tracking-[-0.03em] leading-[1.05]",
  h2: "text-[clamp(2rem,3.5vw,3rem)] font-semibold tracking-[-0.02em] leading-[1.1]",
  h3: "text-[clamp(1.25rem,2vw,1.75rem)] font-semibold tracking-[-0.01em] leading-[1.25]",
  h4: "text-lg font-medium tracking-tight",
};

export function Heading({
  level = "h2",
  as,
  gradient = false,
  className,
  children,
  ...props
}: HeadingProps) {
  const Component = as || (level === "display" ? "h1" : level);

  return (
    <Component
      className={cn(
        "font-display text-text",
        levelStyles[level],
        gradient && "bg-gradient-to-r from-accent to-accent-2 bg-clip-text text-transparent",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
