"use client";

import React, { useState } from "react";
import { ArticleCard } from "@/components/blog/ArticleCard";
import { Search } from "lucide-react";
import type { Post } from "@/types/post";

export function ArticlesFilter({ posts }: { posts: Post[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Cybersecurity", "APIs", "Backend"];

  const filteredPosts = posts.filter((post: Post) => {
    const matchesCategory =
      selectedCategory === "All" || post.frontmatter.category === selectedCategory;
    const matchesSearch =
      post.frontmatter.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.frontmatter.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.frontmatter.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  return (
    <>
      {/* Search & Category Filter Bar */}
      <div className="mb-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-text-subtle" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search articles by title, tag, or topic..."
            className="w-full rounded-full border border-border bg-surface pl-10 pr-4 py-2 text-xs font-mono text-text placeholder:text-text-subtle focus:border-accent-soft focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-full px-3.5 py-1.5 font-mono text-xs transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? "bg-accent/20 text-accent font-semibold border border-accent/40"
                  : "border border-border bg-surface text-text-muted hover:border-border-strong hover:text-text"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Grid */}
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post: Post) => (
            <ArticleCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-border bg-surface p-12 text-center">
          <p className="font-mono text-sm text-text-subtle">
            No articles found matching &quot;{searchQuery}&quot;.
          </p>
        </div>
      )}
    </>
  );
}
