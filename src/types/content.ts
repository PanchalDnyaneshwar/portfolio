export interface Experience {
  id: string;
  company: string;
  role: string;
  location: string;
  start: string;
  end: string | "Present";
  summary: string;
  highlights: string[];
  stack: string[];
}

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  summary: string;
  featured: boolean;
  role: string;
  overview: string;
  problemPoints?: string[];
  modules?: { name: string; description: string }[];
  keyFeatures?: { title: string; description: string }[];
  technicalChallenge?: { title: string; challenge?: string; solution: string };
  highlight?: { title: string; description: string };
  outcome?: string;
  stackGrouped: { category: string; items: string[] }[];
  cardChips: string[];
  links: { live?: string; repo?: string };
  location?: string;
  screenshotSlots?: string[];
  teamProject?: boolean;
  metrics?: { enabled: boolean; items?: { label: string; value: string }[] };
}

export interface SkillGroup {
  category: "Frontend" | "Backend" | "Database" | "Core Concepts" | "Tools & Platforms";
  items: string[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  start: string;
  end: string;
  grade?: string;
  highlights?: string[];
}

export interface Profile {
  name: string;
  role: string;
  headline: string;
  bio: string[];
  quickStats: { label: string; value: string }[];
}
