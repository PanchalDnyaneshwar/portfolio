"use client";

import React, { useState } from "react";
import { Check, Copy } from "lucide-react";

interface CodeBlockProps {
  code: string;
  language?: string;
}

export function CodeBlock({ code, language = "bash" }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative my-6 overflow-hidden rounded-[var(--radius-md)] border border-border bg-bg-elevated">
      <div className="flex items-center justify-between border-b border-border bg-surface px-4 py-2 text-xs font-mono text-text-subtle">
        <span>{language}</span>
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1 hover:text-text transition-colors"
          aria-label="Copy code to clipboard"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-success" />
              <span>Copied</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-sm leading-relaxed text-text">
        <code>{code}</code>
      </pre>
    </div>
  );
}
