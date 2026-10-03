"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";
import { navLinks, primaryCta } from "@/config/nav";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { MobileMenu } from "./MobileMenu";
import { Menu, Download } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Subtle blur and border after 24px scroll per spec
      setIsScrolled(window.scrollY > 24);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Skip to Content Accessible Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-xs focus:font-mono focus:text-white"
      >
        Skip to main content
      </a>

      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-200",
          "h-[64px] md:h-[72px]",
          isScrolled
            ? "border-b border-border bg-bg-elevated/80 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        )}
      >
        <Container className="flex h-full items-center justify-between">
          {/* Brand */}
          <Link
            href="/"
            className="group flex items-center gap-2.5 font-display text-base md:text-lg font-bold tracking-tight text-text"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-surface text-accent text-xs font-mono font-bold transition-colors group-hover:border-accent-soft shrink-0">
              DP
            </span>
            <span className="inline-block">{siteConfig.name}</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors",
                    isActive
                      ? "text-text"
                      : "text-text-muted hover:text-text hover:bg-surface/50"
                  )}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute inset-0 -z-10 rounded-full border border-border bg-surface" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Cluster */}
          <div className="flex items-center gap-3">
            <Button
              href={primaryCta.href}
              className="hidden sm:inline-flex text-xs px-4 min-h-[44px]"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Download className="h-3.5 w-3.5 shrink-0" />
              <span>{primaryCta.label}</span>
            </Button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open navigation menu"
              className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border border-border bg-surface p-2 text-text-muted hover:text-text lg:hidden"
            >
              <Menu className="h-5 w-5 shrink-0" />
            </button>
          </div>
        </Container>
      </header>

      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  );
}
