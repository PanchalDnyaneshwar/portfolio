import React from "react";
import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { profile } from "@/content/profile";
import { experience } from "@/content/experience";
import { education } from "@/content/education";
import { skills } from "@/content/skills";
import { projects } from "@/content/projects";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Tag } from "@/components/ui/Tag";
import { PhoneReveal } from "@/components/ui/PhoneReveal";
import { Download, Mail, MapPin, Printer } from "lucide-react";

export const metadata: Metadata = {
  title: "Resume",
  description: `Resume of ${siteConfig.name} - ${siteConfig.role}.`,
};

export default function ResumePage() {
  return (
    <div className="pt-24 pb-20">
      <Container className="max-w-4xl">
        {/* Actions bar */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-border pb-6 no-print">
          <div>
            <h1 className="font-display text-3xl font-bold text-text">
              Curriculum Vitae
            </h1>
            <p className="font-mono text-xs text-text-subtle mt-1">
              {siteConfig.name} &bull; {siteConfig.role}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              href={siteConfig.resumeUrl}
              variant="primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Download className="h-4 w-4" />
              <span>Download PDF</span>
            </Button>
            <PhoneReveal />
          </div>
        </div>

        {/* Paper Container */}
        <div className="rounded-[var(--radius-md)] border border-border bg-white p-8 sm:p-12 shadow-sm print:border-none print:shadow-none print:p-0">
          {/* Header */}
          <header className="border-b border-border pb-8">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-text">
              {siteConfig.name}
            </h2>
            <p className="font-mono text-sm uppercase tracking-wider text-accent font-semibold mt-1">
              {siteConfig.role}
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-4 text-xs font-mono text-text-subtle">
              <span className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-accent" />
                {siteConfig.location}
              </span>
              <span className="flex items-center gap-1.5">
                <Mail className="h-3.5 w-3.5 text-accent" />
                <a href={`mailto:${siteConfig.email}`} className="text-text hover:underline">
                  {siteConfig.email}
                </a>
              </span>
            </div>
          </header>

          {/* Professional Summary */}
          <section className="mt-8 border-b border-border pb-8">
            <h3 className="font-mono text-xs uppercase tracking-widest text-accent mb-3 font-semibold">
              Professional Summary
            </h3>
            <p className="text-sm text-text-muted leading-relaxed">
              {profile.bio.join(" ")}
            </p>
          </section>

          {/* Work Experience */}
          <section className="mt-8 border-b border-border pb-8">
            <h3 className="font-mono text-xs uppercase tracking-widest text-accent mb-6 font-semibold">
              Work Experience
            </h3>
            <div className="flex flex-col gap-8">
              {experience.map((item) => (
                <div key={item.id} className="flex flex-col gap-2">
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                    <div>
                      <h4 className="font-display text-base font-semibold text-text">
                        {item.role}
                      </h4>
                      <p className="text-xs font-mono text-accent">
                        {item.company} &bull; {item.location}
                      </p>
                    </div>
                    <span className="font-mono text-xs text-text-subtle">
                      {item.start} — {item.end}
                    </span>
                  </div>

                  <p className="text-xs text-text-muted leading-relaxed mt-1">
                    {item.summary}
                  </p>

                  <ul className="mt-2 flex flex-col gap-1.5">
                    {item.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-text-muted leading-relaxed">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-2 flex flex-wrap gap-1">
                    {item.stack.map((t) => (
                      <Tag key={t} className="text-xs py-0.5 px-2">
                        {t}
                      </Tag>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Key Engineering Projects (All 3 projects: Procura NX, School Portal, MAHAIFM) */}
          <section className="mt-8 border-b border-border pb-8">
            <h3 className="font-mono text-xs uppercase tracking-widest text-accent mb-6 font-semibold">
              Key Engineering Projects
            </h3>
            <div className="flex flex-col gap-6">
              {projects.map((proj) => (
                <div key={proj.slug} className="flex flex-col gap-2">
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                    <h4 className="font-display text-base font-semibold text-text">
                      {proj.title}
                    </h4>
                    {proj.links.live && (
                      <a
                        href={proj.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-xs text-accent hover:underline"
                      >
                        {proj.links.live.replace("https://", "")}
                      </a>
                    )}
                  </div>
                  <p className="text-xs text-text-muted leading-relaxed">
                    {proj.summary}
                  </p>
                  <p className="text-xs text-text font-medium">
                    <span className="font-semibold text-text-subtle">Role: </span>
                    {proj.role}
                  </p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {proj.cardChips.map((chip) => (
                      <Tag key={chip} className="text-xs py-0.5 px-2">
                        {chip}
                      </Tag>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Skills */}
          <section className="mt-8 border-b border-border pb-8">
            <h3 className="font-mono text-xs uppercase tracking-widest text-accent mb-4 font-semibold">
              Technical Proficiencies
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {skills.map((grp) => (
                <div key={grp.category} className="flex flex-col gap-1.5">
                  <span className="font-mono text-xs font-semibold text-text">
                    {grp.category}:
                  </span>
                  <p className="text-xs text-text-muted leading-relaxed">
                    {grp.items.join(", ")}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Education */}
          <section className="mt-8">
            <h3 className="font-mono text-xs uppercase tracking-widest text-accent mb-4 font-semibold">
              Education
            </h3>
            {education.map((edu) => (
              <div key={edu.id} className="flex flex-col gap-1">
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                  <h4 className="font-display text-sm font-semibold text-text">
                    {edu.degree}
                  </h4>
                  <span className="font-mono text-xs text-text-subtle">
                    {edu.start} — {edu.end}
                  </span>
                </div>
                <p className="text-xs font-mono text-text-muted">
                  {edu.institution} &bull; {edu.grade}
                </p>
              </div>
            ))}
          </section>
        </div>
      </Container>
    </div>
  );
}
