import { Hero } from "@/components/sections/Hero";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { ExperienceTimeline } from "@/components/sections/ExperienceTimeline";
import { SkillsGrid } from "@/components/sections/SkillsGrid";
import { LatestArticles } from "@/components/sections/LatestArticles";
import { ContactCta } from "@/components/sections/ContactCta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedProjects />
      <ExperienceTimeline />
      <SkillsGrid />
      <LatestArticles />
      <ContactCta />
    </>
  );
}
