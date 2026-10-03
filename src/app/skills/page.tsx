import React from "react";
import type { Metadata } from "next";
import { SkillsGrid } from "@/components/sections/SkillsGrid";

export const metadata: Metadata = {
  title: "Skills",
  description: "Comprehensive technical skillset, backend frameworks, databases, and development tooling.",
};

export default function SkillsPage() {
  return (
    <div className="pt-24 pb-16">
      <SkillsGrid />
    </div>
  );
}
