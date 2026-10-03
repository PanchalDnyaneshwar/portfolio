import React from "react";
import type { Metadata } from "next";
import { getAllPosts } from "@/lib/mdx";
import { Section } from "@/components/ui/Section";
import { ArticlesFilter } from "@/components/blog/ArticlesFilter";

export const metadata: Metadata = {
  title: "Articles",
  description: "Applied engineering essays on cryptographic boundaries, payments calculation architecture, and database pre-aggregation.",
};

export default function ArticlesPage() {
  const allPosts = getAllPosts();

  return (
    <div className="pt-24 pb-16">
      <Section
        id="all-articles"
        eyebrow="Knowledge Base"
        title="Technical Articles & System Insights"
        description="Applied engineering essays on cryptographic boundaries, payments calculation architecture, and database pre-aggregation."
      >
        <ArticlesFilter posts={allPosts} />
      </Section>
    </div>
  );
}
