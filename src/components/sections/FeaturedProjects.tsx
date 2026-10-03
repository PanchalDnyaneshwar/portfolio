import React from "react";
import Link from "next/link";
import { projects } from "@/content/projects";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Tag } from "@/components/ui/Tag";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { Github } from "@/components/ui/Icons";

const PROJECT_THUMBNAILS: Record<string, string> = {
  "procura-nx": "/images/projects/procura-nx/01-home.png",
  "jne-school": "/images/projects/jne-school/01-home.png",
  "mahaifm": "/images/projects/mahaifm/01-home.png",
};

// Project cover: shows real screenshot when available, or calm geometric placeholder
function ProjectCover({ slug, title }: { slug: string; title: string }) {
  const thumbnail = PROJECT_THUMBNAILS[slug];

  if (thumbnail) {
    return (
      <div className="relative h-44 sm:h-52 w-full overflow-hidden rounded-[var(--radius-sm)] border border-border bg-bg-elevated flex items-center justify-center mb-6 transition-colors group-hover:border-border-strong">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={thumbnail}
          alt={`${title} interface preview`}
          className="w-full h-full object-cover object-top transition-transform duration-200 group-hover:scale-[1.02]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface/80 via-transparent to-transparent pointer-events-none" />
      </div>
    );
  }

  return (
    <div className="relative h-44 sm:h-52 w-full overflow-hidden rounded-[var(--radius-sm)] border border-border bg-bg-elevated flex items-center justify-center mb-6">
      <div className="absolute inset-0 bg-gradient-to-br from-surface via-bg-elevated to-surface opacity-90" />
      <div className="absolute -top-12 -left-12 h-36 w-36 rounded-full bg-accent/15 blur-2xl" />
      <div className="absolute -bottom-10 -right-10 h-36 w-36 rounded-full bg-accent-2/15 blur-2xl" />
      
      {/* Precision architectural geometric watermark */}
      <div className="relative z-10 flex flex-col items-center gap-2">
        <div className="h-16 w-16 rounded-xl border border-border-strong bg-surface/80 flex items-center justify-center shadow-card backdrop-blur-sm">
          <span className="font-mono text-xs uppercase tracking-widest text-accent-soft font-bold">
            {slug === "jne-school" ? "JNE" : "IFM"}
          </span>
        </div>
      </div>
    </div>
  );
}

export function FeaturedProjects() {
  const featured = projects.filter((p) => p.featured);

  return (
    <Section
      id="featured-projects"
      eyebrow="Selected Work"
      title="Featured Engineering Projects"
      description="Production platforms built for Indian B2B trade compliance and educational administration."
    >
      <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-2">
        {featured.map((project, idx) => (
          <Reveal key={project.slug} delay={idx * 0.07}>
            <Card className="group flex h-full flex-col justify-between">
              <div>
                {/* Real screenshot preview or calm brand cover */}
                <Link href={`/projects/${project.slug}`} className="block">
                  <ProjectCover slug={project.slug} title={project.title} />
                </Link>

                <div className="flex items-center justify-between pb-3">
                  <span className="font-mono text-xs text-accent-soft">
                    {project.cardChips[0]} &bull; {project.cardChips[1]}
                  </span>

                  <div className="flex items-center gap-2">
                    {project.links.repo && (
                      <Link
                        href={project.links.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-border p-2 text-text-muted hover:border-border-strong hover:text-text transition-colors"
                        aria-label={`View source code for ${project.title}`}
                      >
                        <Github className="h-4 w-4" />
                      </Link>
                    )}
                    {project.links.live && (
                      <Link
                        href={project.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-border p-2 text-text-muted hover:border-border-strong hover:text-text transition-colors"
                        aria-label={`Open live site for ${project.title}`}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                    )}
                  </div>
                </div>

                <Link href={`/projects/${project.slug}`} className="group inline-block">
                  <h3 className="font-display text-xl sm:text-2xl font-semibold tracking-tight text-text group-hover:text-accent-soft transition-colors">
                    {project.title}
                  </h3>
                </Link>

                <p className="mt-3 text-sm text-text-muted leading-relaxed">
                  {project.summary}
                </p>

                {/* 6 to 8 stack chips */}
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {project.cardChips.slice(0, 8).map((chip) => (
                    <Tag key={chip}>{chip}</Tag>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-5 border-t border-border flex items-center justify-between">
                <Link
                  href={`/projects/${project.slug}`}
                  className="link-underline font-mono text-xs uppercase tracking-wider text-accent-soft inline-flex items-center gap-1.5"
                >
                  <span>Read Case Study</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>

                {project.links.live && (
                  <Button
                    href={project.links.live}
                    variant="ghost"
                    className="min-h-[44px] px-4 text-xs"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>Live Site</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </Button>
                )}
              </div>
            </Card>
          </Reveal>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Link
          href="/projects"
          className="link-underline font-mono text-xs uppercase tracking-wider text-text-muted hover:text-text transition-colors inline-flex items-center gap-1.5"
        >
          <span>View all engineering projects (3)</span>
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </Section>
  );
}
