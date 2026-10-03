"use client";

import React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { siteConfig } from "@/config/site";
import { profile } from "@/content/profile";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { heroContainer, heroItem } from "@/design/motion";
import { useMotionAllowed } from "@/hooks/useMotionAllowed";
import {
  ArrowRight,
  Download,
  Mail,
  Terminal,
  Briefcase,
  Code2,
  MapPin,
  CheckCircle2,
} from "lucide-react";

export function Hero() {
  const allowed = useMotionAllowed();

  return (
    <section className="relative pt-28 sm:pt-36 pb-16 sm:pb-24 overflow-hidden">
      {/* Soft ambient atmospheric glow */}
      <div className="absolute top-1/4 -right-24 h-96 w-96 rounded-full bg-accent/5 blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 -left-24 h-96 w-96 rounded-full bg-accent-2/5 blur-3xl pointer-events-none -z-10" />

      <Container className="relative z-10">
        <motion.div
          className="flex flex-col items-center text-center mx-auto max-w-4xl"
          variants={allowed ? heroContainer : undefined}
          initial={allowed ? "hidden" : undefined}
          animate={allowed ? "visible" : undefined}
        >
          {/* Eyebrow Status Badges (Centered) */}
          <motion.div
            variants={allowed ? heroItem : undefined}
            className="mb-5 flex flex-wrap items-center justify-center gap-3"
          >
            <Badge variant="success" pulse>
              {siteConfig.availability.label}
            </Badge>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1 text-xs font-mono text-text-muted shadow-xs">
              <Terminal className="h-3 w-3 text-accent shrink-0" />
              Full Stack Engineer
            </span>
          </motion.div>

          {/* Name Display with Signature Gradient on Panchal */}
          <motion.div variants={allowed ? heroItem : undefined} className="mb-4">
            <h4 className="font-display text-[clamp(1.75rem,6.5vw,5.25rem)] font-bold tracking-tight leading-[1.05] text-text">
              Dnyaneshwar{" "}
              <span className="bg-gradient-to-r from-accent via-accent-soft to-accent-2 bg-clip-text text-transparent">
                Panchal
              </span>
            </h4>
          </motion.div>

          {/* Role Title */}
          <motion.div variants={allowed ? heroItem : undefined} className="mb-4">
            <p className="font-mono text-base sm:text-lg font-semibold uppercase tracking-wider text-accent">
              {profile.role}
            </p>
          </motion.div>

          {/* Value Proposition Headline (Centered) */}
          <motion.div variants={allowed ? heroItem : undefined} className="mb-8 max-w-2xl mx-auto">
            <p className="text-base sm:text-lg text-text-muted leading-relaxed">
              {profile.headline}
            </p>
          </motion.div>

          {/* Action Buttons Cluster (Centered) */}
          <motion.div
            variants={allowed ? heroItem : undefined}
            className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-14"
          >
            <Button href="/projects" variant="primary" className="group">
              <span>View Projects</span>
              <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1" />
            </Button>

            <Button
              href={siteConfig.resumeUrl}
              variant="secondary"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Download className="h-4 w-4 shrink-0" />
              <span>Resume</span>
            </Button>

            <Button href="/contact" variant="ghost">
              <Mail className="h-4 w-4 shrink-0" />
              <span>Contact</span>
            </Button>
          </motion.div>

          {/* Stat Cards Grid (Well-Structured & Balanced) */}
          <motion.div
            variants={allowed ? heroItem : undefined}
            className="w-full pt-8 border-t border-border/80"
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 w-full">
              {/* Card 1: Experience */}
              <div className="flex items-center gap-3.5 rounded-2xl border border-border bg-surface/90 backdrop-blur-md p-4 text-left shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:border-border-strong hover:bg-surface-hover">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface-solid text-accent shrink-0 shadow-xs">
                  <Briefcase className="h-5 w-5 shrink-0" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-mono text-xs uppercase tracking-wider text-text-subtle">
                    Experience
                  </span>
                  <span className="font-display text-sm sm:text-base font-semibold text-text truncate">
                    1 Year Hands-on
                  </span>
                </div>
              </div>

              {/* Card 2: Core Stack */}
              <div className="flex items-center gap-3.5 rounded-2xl border border-border bg-surface/90 backdrop-blur-md p-4 text-left shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:border-border-strong hover:bg-surface-hover">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface-solid text-accent-2 shrink-0 shadow-xs">
                  <Code2 className="h-5 w-5 shrink-0" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-mono text-xs uppercase tracking-wider text-text-subtle">
                    Core Stack
                  </span>
                  <span className="font-display text-sm sm:text-base font-semibold text-text truncate">
                    Java / Spring / React
                  </span>
                </div>
              </div>

              {/* Card 3: Location */}
              <div className="flex items-center gap-3.5 rounded-2xl border border-border bg-surface/90 backdrop-blur-md p-4 text-left shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:border-border-strong hover:bg-surface-hover">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface-solid text-accent shrink-0 shadow-xs">
                  <MapPin className="h-5 w-5 shrink-0" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-mono text-xs uppercase tracking-wider text-text-subtle">
                    Location
                  </span>
                  <span className="font-display text-sm sm:text-base font-semibold text-text truncate">
                    Pune, India
                  </span>
                </div>
              </div>

              {/* Card 4: Availability */}
              <div className="flex items-center gap-3.5 rounded-2xl border border-border bg-surface/90 backdrop-blur-md p-4 text-left shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:border-border-strong hover:bg-surface-hover">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface-solid text-success shrink-0 shadow-xs">
                  <CheckCircle2 className="h-5 w-5 shrink-0" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-mono text-xs uppercase tracking-wider text-text-subtle">
                    Availability
                  </span>
                  <span className="font-display text-sm sm:text-base font-semibold text-text truncate">
                    Open to Roles
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
