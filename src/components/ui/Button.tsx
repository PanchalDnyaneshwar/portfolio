"use client";

import React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { buttonTap } from "@/design/motion";

type Variant = "primary" | "ghost" | "secondary";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  variant?: Variant;
  children: React.ReactNode;
  className?: string;
  target?: string;
  rel?: string;
}

const styles: Record<Variant, string> = {
  primary: "bg-text text-white hover:bg-slate-800 shadow-sm font-semibold",
  secondary: "bg-surface-solid text-text border border-border-strong hover:bg-surface-hover hover:border-text font-medium shadow-xs",
  ghost: "bg-transparent text-text border border-border hover:border-border-strong hover:bg-surface font-medium",
};

export function Button({
  href,
  variant = "primary",
  className,
  children,
  target,
  rel,
  ...rest
}: ButtonProps) {
  const classes = cn(
    "inline-flex min-h-[48px] items-center justify-center gap-2.5 rounded-full px-6 py-3 text-sm font-medium transition-all duration-200 cursor-pointer select-none [&>svg]:shrink-0",
    styles[variant],
    className
  );

  const MotionLink = motion.create(Link);

  if (href) {
    const isExternal = href.startsWith("http") || href.startsWith("//") || href.endsWith(".pdf");
    return (
      <MotionLink
        href={href}
        className={classes}
        whileTap={buttonTap}
        target={target || (isExternal ? "_blank" : undefined)}
        rel={rel || (isExternal ? "noopener noreferrer" : undefined)}
      >
        {children}
      </MotionLink>
    );
  }

  return (
    <motion.button
      className={classes}
      whileTap={buttonTap}
      {...(rest as any)}
    >
      {children}
    </motion.button>
  );
}
