import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

interface MetadataProps {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
}

export function constructMetadata({
  title,
  description = siteConfig.description,
  path = "",
  image = "/og/default.png",
}: MetadataProps = {}): Metadata {
  const url = `${siteConfig.url}${path}`;
  const resolvedTitle = title ? `${title} | ${siteConfig.name}` : `${siteConfig.name} | ${siteConfig.role}`;

  return {
    title: resolvedTitle,
    description,
    openGraph: {
      title: resolvedTitle,
      description,
      url,
      siteName: siteConfig.name,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: resolvedTitle,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description,
      images: [image],
    },
    alternates: {
      canonical: url,
    },
  };
}

export function generatePersonJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    jobTitle: siteConfig.role,
    url: siteConfig.url,
    email: `mailto:${siteConfig.email}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Pune",
      addressRegion: "Maharashtra",
      addressCountry: "India",
    },
    sameAs: [
      siteConfig.socials.linkedin,
      siteConfig.socials.github,
    ],
  };
}
