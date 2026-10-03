"use client";

import React from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { navLinks } from "@/config/nav";
import { Container } from "@/components/ui/Container";
import { Github, Linkedin } from "@/components/ui/Icons";
import { Mail, MapPin, ArrowUp, Download } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-accent-soft/30 bg-gradient-to-br from-accent via-accent-soft to-accent-2 text-white pt-16 pb-8 no-print shadow-xl">
      <Container>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4 lg:grid-cols-5">
          {/* Brand Info */}
          <div className="md:col-span-2 lg:col-span-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 font-display text-xl font-bold tracking-tight text-white"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-white text-xs font-mono font-bold shadow-xs shrink-0">
                DP
              </span>
              <div>
                <span className="block leading-none">{siteConfig.name}</span>
                <span className="block font-mono text-xs font-medium text-white/80 mt-1">
                  {siteConfig.role}
                </span>
              </div>
            </Link>

            <p className="mt-4 max-w-sm text-sm text-white/80 leading-relaxed">
              {siteConfig.description}
            </p>

            <div className="mt-4 flex items-center gap-2 text-xs text-white/70 font-mono">
              <MapPin className="h-3.5 w-3.5 text-white/80 shrink-0" />
              <span>{siteConfig.location}</span>
            </div>

            <div className="mt-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 font-mono text-xs text-white shadow-xs">
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                <span>{siteConfig.availability.label}</span>
              </div>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="mb-4 font-mono text-xs uppercase tracking-wider text-white/70 font-semibold">
              Navigation
            </h3>
            <ul className="flex flex-col gap-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-block text-sm text-white/80 transition-all duration-200 hover:text-white hover:translate-x-1"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect & Socials */}
          <div className="md:col-span-1 lg:col-span-2">
            <h3 className="mb-4 font-mono text-xs uppercase tracking-wider text-white/70 font-semibold">
              Connect
            </h3>
            <p className="mb-4 text-sm text-white/80 leading-relaxed">
              Open to engineering opportunities, scalable backend microservices, and modern web application development.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href={siteConfig.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-all duration-200 hover:bg-white/20 hover:scale-105 shrink-0"
              >
                <Github className="h-4 w-4 shrink-0" />
              </Link>
              <Link
                href={siteConfig.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-all duration-200 hover:bg-white/20 hover:scale-105 shrink-0"
              >
                <Linkedin className="h-4 w-4 shrink-0" />
              </Link>
              <Link
                href={`mailto:${siteConfig.email}`}
                aria-label="Send Email"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-all duration-200 hover:bg-white/20 hover:scale-105 shrink-0"
              >
                <Mail className="h-4 w-4 shrink-0" />
              </Link>
            </div>

            <div className="mt-4">
              <a
                href={siteConfig.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-white px-4 py-2.5 text-xs font-semibold text-accent shadow-sm transition-all duration-200 hover:bg-white/90 hover:scale-105"
              >
                <Download className="h-3.5 w-3.5 shrink-0" />
                <span>Resume (PDF)</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/15 pt-8 text-xs text-white/70 sm:flex-row">
          <p>© {currentYear} {siteConfig.name}. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <Link href="/rss.xml" className="hover:text-white transition-colors">
              RSS
            </Link>
            <Link href="/sitemap.xml" className="hover:text-white transition-colors">
              Sitemap
            </Link>
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 hover:text-white transition-colors font-mono cursor-pointer"
              aria-label="Back to top of page"
            >
              <span>Back to top</span>
              <ArrowUp className="h-3 w-3 shrink-0" />
            </button>
          </div>
        </div>
      </Container>
    </footer>
  );
}
