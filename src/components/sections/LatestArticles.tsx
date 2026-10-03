import React from "react";
import Link from "next/link";
import { getAllPosts } from "@/lib/mdx";
import { Section } from "@/components/ui/Section";
import { ArticleCard } from "@/components/blog/ArticleCard";
import { ArrowUpRight } from "lucide-react";

export function LatestArticles() {
  const posts = getAllPosts().slice(0, 3);

  if (posts.length === 0) return null;

  return (
    <Section
      id="articles"
      eyebrow="Technical Writing"
      title="Recent Articles & Engineering Notes"
      description="Deep dives on token security, payment gateway MDR reconciliation, and high-performance pre-aggregated analytics."
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <ArticleCard key={post.slug} post={post} />
        ))}
      </div>

      <div className="mt-12 text-center">
        <Link
          href="/articles"
          className="link-underline font-mono text-xs uppercase tracking-wider text-text-muted hover:text-text transition-colors inline-flex items-center gap-1.5"
        >
          <span>View all articles (3)</span>
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </Section>
  );
}
