import React from "react";
import Link from "next/link";
import { CodeBlock } from "./CodeBlock";

interface MdxRendererProps {
  content: string;
}

export function MdxRenderer({ content }: MdxRendererProps) {
  // Simple markdown renderer tailored for articles
  const lines = content.split("\n");
  const renderedElements: React.ReactNode[] = [];
  let inCodeBlock = false;
  let codeBuffer: string[] = [];
  let codeLanguage = "";

  lines.forEach((line, index) => {
    // Handle code blocks
    if (line.trim().startsWith("```")) {
      if (inCodeBlock) {
        // End of code block
        inCodeBlock = false;
        renderedElements.push(
          <CodeBlock
            key={`code-${index}`}
            code={codeBuffer.join("\n")}
            language={codeLanguage || "text"}
          />
        );
        codeBuffer = [];
        codeLanguage = "";
      } else {
        // Start of code block
        inCodeBlock = true;
        codeLanguage = line.trim().replace(/^```/, "").trim();
      }
      return;
    }

    if (inCodeBlock) {
      codeBuffer.push(line);
      return;
    }

    // Handle Headings
    if (line.startsWith("# ")) {
      const text = line.replace(/^#\s+/, "");
      renderedElements.push(
        <h1
          key={`h1-${index}`}
          className="mt-8 mb-4 font-display text-[clamp(2rem,4vw,3rem)] font-bold tracking-tight text-text"
        >
          {text}
        </h1>
      );
      return;
    }

    if (line.startsWith("## ")) {
      const text = line.replace(/^##\s+/, "");
      const id = text.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");
      renderedElements.push(
        <h2
          key={`h2-${index}`}
          id={id}
          className="mt-10 mb-4 font-display text-[clamp(1.5rem,3vw,2.25rem)] font-semibold tracking-tight text-text scroll-mt-24"
        >
          {text}
        </h2>
      );
      return;
    }

    if (line.startsWith("### ")) {
      const text = line.replace(/^###\s+/, "");
      const id = text.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");
      renderedElements.push(
        <h3
          key={`h3-${index}`}
          id={id}
          className="mt-8 mb-3 font-display text-xl font-medium tracking-tight text-text scroll-mt-24"
        >
          {text}
        </h3>
      );
      return;
    }

    // Handle Lists
    if (line.trim().startsWith("- ")) {
      const text = line.trim().replace(/^-\s+/, "");
      renderedElements.push(
        <li key={`li-${index}`} className="ml-5 list-disc text-text-muted leading-relaxed my-1">
          {text}
        </li>
      );
      return;
    }

    // Handle Empty Lines
    if (!line.trim()) {
      return;
    }

    // Regular paragraphs with 65ch rule
    renderedElements.push(
      <p
        key={`p-${index}`}
        className="my-4 text-base text-text-muted leading-[1.7] max-w-[65ch]"
      >
        {line}
      </p>
    );
  });

  return <article className="prose-dark w-full">{renderedElements}</article>;
}
