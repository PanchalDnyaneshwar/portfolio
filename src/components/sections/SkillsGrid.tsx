import React from "react";
import { skills } from "@/content/skills";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/motion/Reveal";
import { Server, Layout, Database, Layers, Wrench } from "lucide-react";

const categoryIcons: Record<string, React.ReactNode> = {
  Frontend: <Layout className="h-5 w-5 text-accent-2" />,
  Backend: <Server className="h-5 w-5 text-accent" />,
  Database: <Database className="h-5 w-5 text-accent-soft" />,
  "Core Concepts": <Layers className="h-5 w-5 text-text-muted" />,
  "Tools & Platforms": <Wrench className="h-5 w-5 text-text-subtle" />,
};

export function SkillsGrid() {
  return (
    <Section
      id="skills"
      eyebrow="Core Competencies"
      title="Technical Skills & Proficiencies"
      description="Technologies and engineering paradigms practiced through real-world API and full-stack development."
    >
      {/* Bento Grid with grouped chips and zero percentage bars/star ratings */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((group, idx) => (
          <Reveal key={group.category} delay={idx * 0.05}>
            <Card className="flex h-full flex-col justify-between">
              <div>
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface shadow-sm">
                    {categoryIcons[group.category] || <Server className="h-5 w-5 text-accent" />}
                  </div>
                  <h3 className="font-display text-lg font-semibold text-text">
                    {group.category}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-md border border-border bg-surface px-3 py-1.5 font-mono text-xs text-text transition-colors hover:border-border-strong"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
