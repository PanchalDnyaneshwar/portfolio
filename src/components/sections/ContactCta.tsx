"use client";

import React, { useState } from "react";
import { siteConfig } from "@/config/site";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { PhoneReveal } from "@/components/ui/PhoneReveal";
import { IconLink } from "@/components/ui/IconLink";
import { Github, Linkedin } from "@/components/ui/Icons";
import { Mail, ArrowRight, Copy, Check } from "lucide-react";

export function ContactCta() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(siteConfig.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Section
      id="contact"
      eyebrow="Initiate Conversation"
      title="Ready to Build Scalable Software?"
      description="Available for full-time engineering roles, high-impact backend contracts, or technical collaborations."
      className="border-t border-border"
    >
      <div className="relative rounded-[var(--radius-lg)] border border-border bg-surface p-8 sm:p-12 text-center overflow-hidden">
        {/* Subtle ambient blur */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-96 rounded-full bg-accent/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-xl flex flex-col items-center">
          <Badge variant="success" className="mb-6">
            {siteConfig.availability.label}
          </Badge>

          <h3 className="font-display text-2xl sm:text-3xl font-bold text-text">
            Looking for a dedicated Full Stack Engineer?
          </h3>

          <p className="mt-4 text-sm sm:text-base text-text-muted leading-relaxed">
            I specialize in architecting reliable backend services using Java, Spring Boot, and NestJS, combined with responsive React and Next.js applications.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <Button href={`mailto:${siteConfig.email}`} variant="primary">
              <Mail className="h-4 w-4" />
              <span>Email Me</span>
            </Button>

            <button
              type="button"
              onClick={copyEmail}
              className="inline-flex min-h-[48px] items-center gap-2 rounded-full border border-border bg-surface px-5 py-2.5 text-sm font-medium text-text hover:border-border-strong hover:bg-surface-hover transition-colors cursor-pointer"
              aria-label="Copy email address to clipboard"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 text-success" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 text-text-subtle" />
                  <span>Copy Email</span>
                </>
              )}
            </button>

            <Button href="/contact" variant="ghost">
              <span>Contact Form</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Socials & Click-to-reveal Phone */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 pt-6 border-t border-border w-full">
            <IconLink
              href={siteConfig.socials.github}
              icon={<Github className="h-4 w-4" />}
              label="GitHub"
            />
            <IconLink
              href={siteConfig.socials.linkedin}
              icon={<Linkedin className="h-4 w-4" />}
              label="LinkedIn"
            />
            <PhoneReveal />
          </div>
        </div>
      </div>
    </Section>
  );
}
