import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import fs from "fs";
import path from "path";
import { projects } from "@/content/projects";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Tag } from "@/components/ui/Tag";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { ArrowLeft, ArrowRight, ExternalLink, ShieldAlert, Zap, Layers, MapPin } from "lucide-react";
import { Github } from "@/components/ui/Icons";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.title} | Case Study`,
    description: project.summary,
  };
}

// Check which real screenshot files actually exist in public/images/projects/<slug>/
function getExistingScreenshots(slug: string, slots?: string[]): { path: string; name: string }[] {
  if (!slots || slots.length === 0) return [];
  const projectDir = path.join(process.cwd(), "public", "images", "projects", slug);
  if (!fs.existsSync(projectDir)) return [];

  const existing: { path: string; name: string }[] = [];
  for (const slot of slots) {
    const filePath = path.join(projectDir, `${slot}.png`);
    const jpgPath = path.join(projectDir, `${slot}.jpg`);
    const readableName = slot
      .replace(/^\d+-/, "")
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");

    if (fs.existsSync(filePath)) {
      existing.push({ path: `/images/projects/${slug}/${slot}.png`, name: readableName });
    } else if (fs.existsSync(jpgPath)) {
      existing.push({ path: `/images/projects/${slug}/${slot}.jpg`, name: readableName });
    }
  }
  return existing;
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const projectIndex = projects.findIndex((p) => p.slug === slug);

  if (projectIndex === -1) {
    notFound();
  }

  const project = projects[projectIndex];
  const prevProject = projectIndex > 0 ? projects[projectIndex - 1] : null;
  const nextProject = projectIndex < projects.length - 1 ? projects[projectIndex + 1] : null;

  const existingScreenshots = getExistingScreenshots(project.slug, project.screenshotSlots);

  return (
    <div className="pt-24 pb-20">
      <Container className="max-w-4xl">
        {/* Navigation Breadcrumb */}
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-text-muted hover:text-text transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to all projects</span>
        </Link>

        {/* Header & Meta */}
        <Reveal>
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="font-mono text-xs uppercase tracking-widest text-accent-soft font-semibold">
              Case Study
            </span>
            {project.location && (
              <span className="flex items-center gap-1 font-mono text-xs text-text-subtle">
                <MapPin className="h-3 w-3 text-accent" />
                {project.location}
              </span>
            )}
          </div>

          <h1 className="font-display text-[clamp(2.2rem,5vw,3.8rem)] font-bold tracking-tight text-text leading-[1.05]">
            {project.title}
          </h1>

          <p className="mt-3 text-lg font-medium text-text-muted leading-relaxed">
            {project.tagline}
          </p>

          {/* Action CTAs */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            {project.links.live && (
              <Button href={project.links.live} variant="primary" target="_blank" rel="noopener noreferrer">
                <span>Open Live Site</span>
                <ExternalLink className="h-4 w-4" />
              </Button>
            )}
            {project.links.repo ? (
              <Button href={project.links.repo} variant="secondary" target="_blank" rel="noopener noreferrer">
                <span>View Source</span>
                <Github className="h-4 w-4" />
              </Button>
            ) : null}
          </div>
        </Reveal>

        {/* 1. My Role */}
        <Reveal delay={0.05} className="mt-12 pt-8 border-t border-border">
          <div className="flex items-center gap-2 mb-3">
            <h2 className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">
              My Engineering Role
            </h2>
            {project.teamProject && (
              <span className="rounded-full border border-border-strong bg-surface-hover px-2.5 py-0.5 font-mono text-xs text-text-subtle">
                Team project
              </span>
            )}
          </div>
          <Card className="p-6">
            <p className="text-sm sm:text-base text-text leading-relaxed">
              {project.role}
            </p>
          </Card>
        </Reveal>

        {/* 2. Overview */}
        <Reveal delay={0.1} className="mt-8">
          <h2 className="font-mono text-xs uppercase tracking-widest text-accent-soft mb-3">
            Overview
          </h2>
          <Card className="p-6">
            <p className="text-sm sm:text-base text-text-muted leading-relaxed">
              {project.overview}
            </p>
          </Card>
        </Reveal>

        {/* 3. Problem Points (Self-hiding when empty) */}
        {project.problemPoints && project.problemPoints.length > 0 && (
          <Reveal delay={0.15} className="mt-8">
            <h2 className="font-mono text-xs uppercase tracking-widest text-danger mb-3">
              Problem & Architectural Challenges
            </h2>
            <Card className="p-6">
              <ul className="flex flex-col gap-3">
                {project.problemPoints.map((point, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-text-muted leading-relaxed">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-danger" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </Reveal>
        )}

        {/* 4. User Roles / Modules (Self-hiding when empty) */}
        {project.modules && project.modules.length > 0 && (
          <Reveal delay={0.2} className="mt-8">
            <h2 className="font-mono text-xs uppercase tracking-widest text-accent-soft mb-3">
              User Roles & Core Modules
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {project.modules.map((mod, i) => (
                <Card key={i} className="p-5 flex flex-col justify-between">
                  <div>
                    <h3 className="font-display text-base font-semibold text-text mb-2">
                      {mod.name}
                    </h3>
                    <p className="text-xs text-text-muted leading-relaxed">
                      {mod.description}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </Reveal>
        )}

        {/* 5. Key Features (Self-hiding when empty) */}
        {project.keyFeatures && project.keyFeatures.length > 0 && (
          <Reveal delay={0.25} className="mt-8">
            <h2 className="font-mono text-xs uppercase tracking-widest text-accent-soft mb-3">
              Key Features & Implementation
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {project.keyFeatures.map((feat, i) => (
                <Card key={i} className="p-5">
                  <h3 className="font-display text-sm font-semibold text-text mb-1.5">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-text-muted leading-relaxed">
                    {feat.description}
                  </p>
                </Card>
              ))}
            </div>
          </Reveal>
        )}

        {/* 6. Technical Challenge (Self-hiding when empty) */}
        {project.technicalChallenge && (
          <Reveal delay={0.3} className="mt-8">
            <h2 className="font-mono text-xs uppercase tracking-widest text-accent-2 mb-3">
              Technical Challenge & Deep Dive
            </h2>
            <Card className="border-border bg-surface p-6 sm:p-8">
              <div className="flex items-center gap-2 mb-3">
                <ShieldAlert className="h-5 w-5 text-accent-2" />
                <h3 className="font-display text-lg font-semibold text-text">
                  {project.technicalChallenge.title}
                </h3>
              </div>
              {project.technicalChallenge.challenge && (
                <div className="mb-4">
                  <span className="font-mono text-xs text-text-subtle uppercase block mb-1">
                    The Hurdle:
                  </span>
                  <p className="text-sm text-text-muted leading-relaxed">
                    {project.technicalChallenge.challenge}
                  </p>
                </div>
              )}
              <div>
                <span className="font-mono text-xs text-accent-soft uppercase block mb-1">
                  Engineered Solution:
                </span>
                <p className="text-sm text-text-muted leading-relaxed">
                  {project.technicalChallenge.solution}
                </p>
              </div>
            </Card>
          </Reveal>
        )}

        {/* 7. Highlight (Self-hiding when empty) */}
        {project.highlight && (
          <Reveal delay={0.35} className="mt-8">
            <h2 className="font-mono text-xs uppercase tracking-widest text-accent mb-3">
              Engineering Highlight
            </h2>
            <Card className="border-border bg-surface p-6 sm:p-8">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="h-5 w-5 text-accent" />
                <h3 className="font-display text-lg font-semibold text-text">
                  {project.highlight.title}
                </h3>
              </div>
              <p className="text-sm text-text-muted leading-relaxed">
                {project.highlight.description}
              </p>
            </Card>
          </Reveal>
        )}

        {/* 8. Tech Stack (Grouped) */}
        <Reveal delay={0.4} className="mt-8">
          <h2 className="font-mono text-xs uppercase tracking-widest text-text-subtle mb-3">
            Technology Stack (Grouped)
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {project.stackGrouped.map((grp) => (
              <Card key={grp.category} className="p-5">
                <div className="flex items-center gap-1.5 mb-3 font-mono text-xs text-accent-soft font-semibold">
                  <Layers className="h-3.5 w-3.5" />
                  <span>{grp.category}</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {grp.items.map((tech) => (
                    <Tag key={tech}>{tech}</Tag>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </Reveal>

        {/* 9. Outcome (Self-hiding when empty) */}
        {project.outcome && (
          <Reveal delay={0.45} className="mt-8">
            <h2 className="font-mono text-xs uppercase tracking-widest text-success mb-3">
              Measurable Outcome
            </h2>
            <Card className="border-border bg-surface p-6">
              <p className="text-sm sm:text-base text-text-muted leading-relaxed">
                {project.outcome}
              </p>
            </Card>
          </Reveal>
        )}

        {/* 10. Metrics Block (DISABLED by default) */}
        {project.metrics?.enabled && project.metrics.items && (
          <div className="mt-8">
            {/* Disabled by default per specification */}
          </div>
        )}

        {/* 11. Screenshots Gallery (Hidden until real image files exist) */}
        {existingScreenshots.length > 0 && (
          <Reveal delay={0.5} className="mt-12">
            <h2 className="font-mono text-xs uppercase tracking-widest text-text-subtle mb-4">
              Interface Screenshots
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {existingScreenshots.map((item, i) => (
                <div key={i} className="overflow-hidden rounded-lg border border-border bg-surface flex flex-col">
                  <div className="px-4 py-2.5 border-b border-border bg-bg-elevated flex items-center justify-between">
                    <span className="font-mono text-xs text-text-muted uppercase tracking-wider">{item.name}</span>
                    <span className="h-1.5 w-1.5 rounded-full bg-accent-soft" />
                  </div>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.path} alt={`${project.title} - ${item.name}`} className="w-full object-cover" />
                </div>
              ))}
            </div>
          </Reveal>
        )}

        {/* Prev / Next Case Study Navigation */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          {prevProject ? (
            <Link
              href={`/projects/${prevProject.slug}`}
              className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-text-muted hover:text-text transition-colors self-start"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Previous: {prevProject.title}</span>
            </Link>
          ) : <div />}

          {nextProject ? (
            <Link
              href={`/projects/${nextProject.slug}`}
              className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-text-muted hover:text-text transition-colors self-end"
            >
              <span>Next: {nextProject.title}</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          ) : <div />}
        </div>
      </Container>
    </div>
  );
}
