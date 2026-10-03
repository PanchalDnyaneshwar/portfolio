"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  headings: TocItem[];
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-80px 0% -60% 0%" }
    );

    headings.forEach((heading) => {
      const el = document.getElementById(heading.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <aside className="sticky top-28 flex flex-col gap-3 rounded-[var(--radius-md)] border border-border bg-surface/50 p-5">
      <h4 className="font-mono text-xs uppercase tracking-wider text-text-subtle">
        Table of Contents
      </h4>
      <nav className="flex flex-col gap-2">
        {headings.map((heading) => {
          const isActive = activeId === heading.id;
          return (
            <a
              key={heading.id}
              href={`#${heading.id}`}
              className={cn(
                "text-sm transition-colors",
                heading.level === 3 && "pl-3",
                isActive
                  ? "text-accent font-medium"
                  : "text-text-muted hover:text-text"
              )}
            >
              {heading.text}
            </a>
          );
        })}
      </nav>
    </aside>
  );
}
