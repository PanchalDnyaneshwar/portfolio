"use client";

import React from "react";
import { experience } from "@/content/experience";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Tag } from "@/components/ui/Tag";
import { Reveal } from "@/components/motion/Reveal";
import { Briefcase, Calendar, MapPin } from "lucide-react";

export function ExperienceTimeline() {
  return (
    <Section
      id="experience"
      eyebrow="Career History"
      title="Professional Experience"
      description="Hands-on software development across the full lifecycle, building scalable microservices and dynamic user interfaces."
    >
      <div className="relative border-l-2 border-border-strong pl-7 sm:pl-10 ml-4 sm:ml-6 flex flex-col gap-10">
        {experience.map((item, index) => (
          <Reveal key={item.id} delay={index * 0.07} className="relative">
            {/* Timeline node */}
            <div className="absolute -left-7 sm:-left-10 -translate-x-1/2 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full border-2 border-accent/40 bg-surface-solid text-accent shadow-sm">
              <Briefcase className="h-4 w-4 shrink-0" />
            </div>

            <Card className="flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 pb-3 border-b border-border">
                <div>
                  <h3 className="font-display text-lg sm:text-xl font-semibold text-text">
                    {item.role}
                  </h3>
                  <p className="text-sm font-semibold text-accent mt-0.5">
                    {item.company}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-text-subtle">
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="h-3 w-3" />
                    {item.start} — {item.end}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="h-3 w-3" />
                    {item.location}
                  </span>
                </div>
              </div>

              <p className="text-sm text-text-muted leading-relaxed">
                {item.summary}
              </p>

              <ul className="flex flex-col gap-2 pt-1">
                {item.highlights.map((highlight, hIdx) => (
                  <li
                    key={hIdx}
                    className="text-sm text-text-muted flex items-start gap-2.5 leading-relaxed"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-3 flex flex-wrap gap-1.5 pt-4 border-t border-border">
                {item.stack.map((tech) => (
                  <Tag key={tech}>{tech}</Tag>
                ))}
              </div>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
