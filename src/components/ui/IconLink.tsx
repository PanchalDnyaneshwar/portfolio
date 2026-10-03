import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface IconLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  icon: React.ReactNode;
  label: string;
}

export function IconLink({ href, icon, label, className, ...props }: IconLinkProps) {
  const isExternal = href.startsWith("http") || href.startsWith("//");

  return (
    <Link
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      aria-label={label}
      className={cn(
        "inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-text-muted transition-all duration-200 hover:border-accent-soft hover:bg-surface-hover hover:text-text",
        className
      )}
      {...props}
    >
      {icon}
      <span className="sr-only">{label}</span>
    </Link>
  );
}
