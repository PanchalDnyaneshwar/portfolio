import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Post, PostFrontmatter } from "@/types/post";

const postsDirectory = path.join(process.cwd(), "src/content/posts");

export function getAllPosts(): Post[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const allPosts = fileNames
    .filter((fileName) => fileName.endsWith(".mdx") || fileName.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx?$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      // Estimate reading time
      const words = content.trim().split(/\s+/).length;
      const readingTimeMinutes = Math.max(1, Math.ceil(words / 200));
      const readingTime = `${readingTimeMinutes} min read`;

      // Extract headings (## and ###)
      const headings: { text: string; id: string; level: number }[] = [];
      const headingRegex = /^(#{2,3})\s+(.*)$/gm;
      let match;
      while ((match = headingRegex.exec(content)) !== null) {
        const level = match[1].length;
        const text = match[2].trim();
        const id = text
          .toLowerCase()
          .replace(/[^\w\s-]/g, "")
          .replace(/\s+/g, "-");
        headings.push({ text, id, level });
      }

      const frontmatter = data as PostFrontmatter;

      return {
        slug,
        frontmatter,
        content,
        readingTime,
        headings,
      };
    })
    .filter((post) => post.frontmatter.published)
    .sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime());

  return allPosts;
}

export function getPostBySlug(slug: string): Post | null {
  const allPosts = getAllPosts();
  return allPosts.find((post) => post.slug === slug) || null;
}
