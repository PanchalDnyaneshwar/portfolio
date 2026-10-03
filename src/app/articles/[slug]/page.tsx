import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllPosts, getPostBySlug } from "@/lib/mdx";
import { Container } from "@/components/ui/Container";
import { Tag } from "@/components/ui/Tag";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { ReadingProgress } from "@/components/blog/ReadingProgress";
import { MdxRenderer } from "@/components/blog/MdxComponents";
import { ArticleCard } from "@/components/blog/ArticleCard";
import { formatDate } from "@/lib/utils";
import { ArrowLeft, Calendar, Clock, Share2, Copy } from "lucide-react";
import { Linkedin, Twitter } from "@/components/ui/Icons";
import { siteConfig } from "@/config/site";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Article Not Found" };

  return {
    title: `${post.frontmatter.title} | ${siteConfig.name}`,
    description: post.frontmatter.description,
  };
}

export default async function ArticleDetailPage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const allPosts = getAllPosts();
  const relatedPosts = allPosts
    .filter((p) => p.slug !== post.slug)
    .slice(0, 2);

  const postUrl = `${siteConfig.url}/articles/${post.slug}`;

  return (
    <>
      <ReadingProgress />

      <div className="pt-24 pb-20">
        <Container className="max-w-5xl">
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-text-muted hover:text-text transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to articles</span>
          </Link>

          {/* Header */}
          <header className="mb-12 border-b border-border pb-8">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <Tag className="text-accent-soft">{post.frontmatter.category}</Tag>
              <span className="font-mono text-xs text-text-subtle flex items-center gap-1.5">
                <Calendar className="h-3 w-3" />
                {formatDate(post.frontmatter.date)}
              </span>
              <span className="font-mono text-xs text-text-subtle flex items-center gap-1.5">
                <Clock className="h-3 w-3" />
                {post.readingTime}
              </span>
            </div>

            <h1 className="font-display text-[clamp(2.2rem,4.5vw,3.5rem)] font-bold tracking-tight text-text leading-[1.1]">
              {post.frontmatter.title}
            </h1>

            <p className="mt-4 text-base sm:text-lg text-text-muted leading-relaxed">
              {post.frontmatter.description}
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                {post.frontmatter.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md border border-border bg-surface px-2.5 py-1 font-mono text-xs text-text-subtle"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Share links */}
              <div className="flex items-center gap-2 font-mono text-xs text-text-subtle">
                <span className="flex items-center gap-1 mr-1">
                  <Share2 className="h-3.5 w-3.5 text-accent-soft" />
                  <span>Share:</span>
                </span>
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.frontmatter.title)}&url=${encodeURIComponent(postUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-border p-1.5 text-text-muted hover:text-text hover:border-border-strong transition-colors"
                  aria-label="Share on Twitter"
                >
                  <Twitter className="h-3.5 w-3.5" />
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-border p-1.5 text-text-muted hover:text-text hover:border-border-strong transition-colors"
                  aria-label="Share on LinkedIn"
                >
                  <Linkedin className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </header>

          {/* Content Layout with sticky TOC */}
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <MdxRenderer content={post.content} />
            </div>

            <div className="hidden lg:col-span-4 lg:block">
              <TableOfContents headings={post.headings} />
            </div>
          </div>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div className="mt-20 pt-10 border-t border-border">
              <h3 className="font-display text-xl font-bold text-text mb-6">
                Related Engineering Notes
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {relatedPosts.map((related) => (
                  <ArticleCard key={related.slug} post={related} />
                ))}
              </div>
            </div>
          )}
        </Container>
      </div>
    </>
  );
}
