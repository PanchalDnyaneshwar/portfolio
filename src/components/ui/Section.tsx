import React from "react";
import { Container } from "./Container";
import { Reveal } from "../motion/Reveal";
import { cn } from "@/lib/utils";

interface SectionProps {
  id?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export function Section({ id, eyebrow, title, description, children, className }: SectionProps) {
  return (
    <section id={id} className={cn("py-8 sm:py-12", className)}>
      <Container>
        {(eyebrow || title) && (
          <Reveal className="mb-12 sm:mb-16 max-w-2xl">
            {eyebrow && (
              <p className="mb-3 font-mono text-xs uppercase tracking-[0.12em] text-accent font-semibold">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="text-[clamp(2rem,3.5vw,3rem)] font-semibold tracking-tight text-text leading-[1.1]">
                {title}
              </h2>
            )}
            {description && (
              <p className="mt-4 text-base text-text-muted leading-relaxed">
                {description}
              </p>
            )}
          </Reveal>
        )}
        {children}
      </Container>
    </section>
  );
}
