import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { profile } from "@/content/profile";
import { education } from "@/content/education";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { PhoneReveal } from "@/components/ui/PhoneReveal";
import { Download, GraduationCap, Calendar, MapPin, Milestone, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description: `About ${siteConfig.name} - ${profile.role} based in ${siteConfig.location}.`,
};

const journeyMilestones = [
  {
    year: "August 2025 – Present",
    title: "Junior Software Engineer",
    organization: "Infoprosys Technologies Pvt. Ltd., Pune",
    description: "Developing scalable full-stack applications with Spring Boot, NestJS, and React.js; integrating PhonePe and Razorpay payment gateways; optimizing database queries.",
  },
  {
    year: "March 2024 – August 2024",
    title: "Web Development Intern",
    organization: "Jijai Technologies Pvt. Ltd., Pune",
    description: "Built responsive UI components using React.js, refactored frontend codebases for performance, and participated in peer code reviews.",
  },
  {
    year: "2021 – 2024",
    title: "Bachelor of Technology (Computer Engineering)",
    organization: "Gramin College of Engineering, Nanded",
    description: "Completed undergraduate engineering degree with 68%. Grounding in OOP, Data Structures, SQL, and Software Development Life Cycle.",
  },
];

export default function AboutPage() {
  return (
    <div className="pt-24 pb-16">
      <Section
        id="about"
        eyebrow="Background & Philosophy"
        title="About Dnyaneshwar Panchal"
        description="Full Stack Developer focused on building reliable, maintainable software and scalable backend architectures."
      >
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Bio Text Column */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <Reveal delay={0.05}>
              <h3 className="font-display text-2xl font-bold text-text mb-2">
                My Story
              </h3>
            </Reveal>

            {profile.bio.map((paragraph, index) => (
              <Reveal key={index} delay={0.1 + index * 0.05}>
                <p className="text-base sm:text-lg text-text-muted leading-relaxed">
                  {paragraph}
                </p>
              </Reveal>
            ))}

            {/* What I Am Looking For */}
            <Reveal delay={0.2} className="pt-4">
              <Card className="border-border bg-surface p-6 sm:p-8">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-accent mt-0.5 shrink-0" />
                  <div>
                    <h4 className="font-display text-lg font-semibold text-text mb-2">
                      What I Am Looking For
                    </h4>
                    <p className="text-sm text-text-muted leading-relaxed">
                      I am actively seeking full-time opportunities (remote, hybrid, or onsite in Pune and across India) as a Full Stack Developer or Backend Engineer. I aim to contribute to high-impact engineering teams building resilient REST APIs, microservices, and modern web architectures.
                    </p>
                  </div>
                </div>
              </Card>
            </Reveal>

            <Reveal delay={0.25} className="pt-2 flex flex-wrap items-center gap-3">
              <Button href={siteConfig.resumeUrl} variant="primary" target="_blank" rel="noopener noreferrer">
                <Download className="h-4 w-4" />
                <span>Resume</span>
              </Button>
              <PhoneReveal />
            </Reveal>
          </div>

          {/* Details & Journey Column */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Profile Photo */}
            <Reveal delay={0.1}>
              <Card className="overflow-hidden p-3 border-border bg-surface-solid shadow-card">
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-surface">
                  <Image
                    src="/images/profile.jpg"
                    alt={profile.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 420px"
                    className="object-cover object-top transition-transform duration-300 hover:scale-105"
                    priority
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/85 via-slate-950/40 to-transparent p-4 text-white">
                    <p className="font-display font-semibold text-base">{profile.name}</p>
                    <p className="font-mono text-xs text-white/80">{profile.role} • Pune, India</p>
                  </div>
                </div>
              </Card>
            </Reveal>

            {/* Journey Timeline */}
            <Reveal delay={0.15}>
              <Card className="p-6 sm:p-8">
                <div className="flex items-center gap-2 mb-6">
                  <Milestone className="h-5 w-5 text-accent" />
                  <h3 className="font-display text-lg font-semibold text-text">
                    Engineering Journey
                  </h3>
                </div>

                <div className="relative border-l border-border pl-5 flex flex-col gap-6">
                  {journeyMilestones.map((m, idx) => (
                    <div key={idx} className="relative">
                      <span className="absolute -left-5 -translate-x-1/2 top-1.5 h-2.5 w-2.5 rounded-full border border-border-strong bg-surface" />
                      <span className="font-mono text-xs text-accent-soft block mb-1">
                        {m.year}
                      </span>
                      <h4 className="text-sm font-semibold text-text">
                        {m.title}
                      </h4>
                      <p className="text-xs font-mono text-text-subtle mb-1.5">
                        {m.organization}
                      </p>
                      <p className="text-xs text-text-muted leading-relaxed">
                        {m.description}
                      </p>
                    </div>
                  ))}
                </div>
              </Card>
            </Reveal>

            {/* Education */}
            <Reveal delay={0.2}>
              <Card className="p-6 sm:p-8">
                <div className="flex items-center gap-2 mb-4">
                  <GraduationCap className="h-5 w-5 text-accent" />
                  <h3 className="font-display text-lg font-semibold text-text">
                    Education
                  </h3>
                </div>

                {education.map((edu) => (
                  <div key={edu.id} className="flex flex-col gap-1">
                    <p className="font-semibold text-text text-sm">
                      {edu.degree}
                    </p>
                    <p className="text-xs text-accent-soft font-mono">
                      {edu.institution} &bull; {edu.grade}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-text-subtle font-mono mt-1">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {edu.start} — {edu.end}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {edu.location}
                      </span>
                    </div>
                  </div>
                ))}
              </Card>
            </Reveal>
          </div>
        </div>
      </Section>
    </div>
  );
}
