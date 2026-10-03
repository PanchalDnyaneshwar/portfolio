import { getAllPosts } from "@/lib/mdx";
import { siteConfig } from "@/config/site";

export async function GET() {
  const posts = getAllPosts();

  const itemsXml = posts
    .map(
      (post) => `
    <item>
      <title><![CDATA[${post.frontmatter.title}]]></title>
      <link>${siteConfig.url}/articles/${post.slug}</link>
      <guid>${siteConfig.url}/articles/${post.slug}</guid>
      <description><![CDATA[${post.frontmatter.description}]]></description>
      <pubDate>${new Date(post.frontmatter.date).toUTCString()}</pubDate>
      <category>${post.frontmatter.category}</category>
    </item>`
    )
    .join("");

  const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title><![CDATA[${siteConfig.name} - Technical Blog]]></title>
    <link>${siteConfig.url}</link>
    <description><![CDATA[${siteConfig.description}]]></description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteConfig.url}/rss.xml" rel="self" type="application/rss+xml"/>
    ${itemsXml}
  </channel>
</rss>`;

  return new Response(rssFeed, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
