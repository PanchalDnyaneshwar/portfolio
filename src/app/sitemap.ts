import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { projects } from "@/content/projects";
import { getAllPosts } from "@/lib/mdx";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();

  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/about",
    "/experience",
    "/projects",
    "/skills",
    "/resume",
    "/articles",
    "/contact",
  ].map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  const projectRoutes: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${siteConfig.url}/projects/${p.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${siteConfig.url}/articles/${post.slug}`,
    lastModified: new Date(post.frontmatter.date).toISOString(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...projectRoutes, ...postRoutes];
}
