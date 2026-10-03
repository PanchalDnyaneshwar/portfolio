import React from "react";
import type { Metadata } from "next";
import { ExperienceTimeline } from "@/components/sections/ExperienceTimeline";

export const metadata: Metadata = {
  title: "Experience",
  description: "Professional work experience and engineering achievements.",
};

export default function ExperiencePage() {
  return (
    <div className="pt-24 pb-16">
      <ExperienceTimeline />
    </div>
  );
}
