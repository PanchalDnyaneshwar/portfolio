"use client";

import React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { navLinks, primaryCta } from "@/config/nav";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/Button";
import { X, Download } from "lucide-react";
import { useMotionAllowed } from "@/hooks/useMotionAllowed";
import { duration } from "@/design/motion";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const allowed = useMotionAllowed();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: duration.hover }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-text/30 backdrop-blur-sm lg:hidden"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              duration: allowed ? 0.25 : 0,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="fixed top-0 right-0 bottom-0 z-50 flex w-full max-w-sm flex-col border-l border-border bg-bg-elevated p-6 shadow-2xl lg:hidden"
          >
            <div className="flex items-center justify-between pb-6 border-b border-border">
              <span className="font-display font-semibold text-lg text-text">
                Navigation
              </span>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close navigation menu"
                className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg p-2 text-text-muted hover:text-text hover:bg-surface"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="flex flex-col gap-1 py-6" aria-label="Mobile Navigation">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  className="flex min-h-[48px] items-center rounded-lg px-4 font-medium text-base text-text-muted transition-colors hover:bg-surface hover:text-text"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="mt-auto flex flex-col gap-4 pt-6 border-t border-border">
              <Button
                href={primaryCta.href}
                onClick={onClose}
                className="w-full justify-center"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Download className="h-4 w-4" />
                <span>{primaryCta.label}</span>
              </Button>

              <p className="text-center text-xs text-text-subtle font-mono">
                {siteConfig.location}
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
