"use client";

import React, { useState } from "react";
import { siteConfig } from "@/config/site";
import { Phone, Eye } from "lucide-react";

export function PhoneReveal({ className }: { className?: string }) {
  const [revealed, setRevealed] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");

  if (!siteConfig.contact.showPhone) {
    return null;
  }

  const handleReveal = () => {
    try {
      // Decode base64 client-side so number never exists in static HTML source
      const decoded = atob(siteConfig.contact.phoneObfuscated);
      setPhoneNumber(decoded);
      setRevealed(true);
    } catch {
      // fallback
    }
  };

  if (!revealed) {
    return (
      <button
        type="button"
        onClick={handleReveal}
        className={`inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 font-mono text-xs text-text-muted hover:border-accent-soft hover:text-text transition-colors ${className}`}
        aria-label="Click to reveal phone number"
      >
        <Eye className="h-3.5 w-3.5 text-accent" />
        <span>Click to reveal phone</span>
      </button>
    );
  }

  return (
    <a
      href={`tel:+91${phoneNumber}`}
      className={`inline-flex items-center gap-2 rounded-full border border-accent/40 bg-surface px-4 py-2 font-mono text-xs text-accent-soft hover:text-accent transition-colors ${className}`}
      aria-label={`Call ${phoneNumber}`}
    >
      <Phone className="h-3.5 w-3.5 text-accent" />
      <span>+91 {phoneNumber}</span>
    </a>
  );
}
