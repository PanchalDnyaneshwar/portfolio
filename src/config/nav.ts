import { siteConfig } from "./site";

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Experience", href: "/experience" },
  { label: "Projects", href: "/projects" },
  { label: "Skills", href: "/skills" },
  { label: "Articles", href: "/articles" },
  { label: "Contact", href: "/contact" },
] as const;

export const primaryCta = {
  label: "Resume",
  href: siteConfig.resumeUrl,
  external: true,
} as const;
