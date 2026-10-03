import React from "react";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Tag } from "@/components/ui/Tag";
import { formatDate } from "@/lib/utils";
import type { Post } from "@/types/post";
import { ArrowUpRight, Clock, Calendar } from "lucide-react";

interface ArticleCardProps {
  post: Post;
}

export function ArticleCard({ post }: ArticleCardProps) {
  return (
    <Card className="group flex h-full flex-col justify-between p-6">
      <div>
        <div className="flex items-center justify-between pb-3">
          <Tag className="text-accent">{post.frontmatter.category}</Tag>
          <div className="flex items-center gap-3 font-mono text-xs text-text-subtle">
            <span className="inline-flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {formatDate(post.frontmatter.date)}
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {post.readingTime}
            </span>
          </div>
        </div>

        <Link href={`/articles/${post.slug}`}>
          <h3 className="font-display text-xl font-semibold tracking-tight text-text group-hover:text-accent-soft transition-colors">
            {post.frontmatter.title}
          </h3>
        </Link>

        <p className="mt-3 text-sm text-text-muted leading-relaxed">
          {post.frontmatter.description}
        </p>
      </div>

      <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
        <div className="flex flex-wrap gap-1.5">
          {post.frontmatter.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="font-mono text-xs text-text-subtle">
              #{tag}
            </span>
          ))}
        </div>

        <Link
          href={`/articles/${post.slug}`}
          className="inline-flex items-center gap-1 font-mono text-xs uppercase tracking-wider text-accent-soft group-hover:text-accent transition-colors"
        >
          <span>Read</span>
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </Card>
  );
}
