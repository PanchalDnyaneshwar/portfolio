"use client";

import React, { useState } from "react";
import { siteConfig } from "@/config/site";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { IconLink } from "@/components/ui/IconLink";
import { Badge } from "@/components/ui/Badge";
import { PhoneReveal } from "@/components/ui/PhoneReveal";
import { Github, Linkedin } from "@/components/ui/Icons";
import { Mail, MapPin, Send, CheckCircle2, AlertCircle, Copy, Check } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    honeypot: "", // Honeypot spam trap
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(siteConfig.email);
    showToast("Email copied to clipboard!");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "", honeypot: "" });
        showToast("Message sent successfully!");
      } else {
        setStatus("error");
        setErrorMessage(data.message || "Failed to send message. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Network error occurred. Please try again later.");
    }
  };

  return (
    <div className="pt-24 pb-20">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full border border-border-strong bg-surface-hover px-4 py-2.5 font-mono text-xs text-text shadow-card transition-all">
          <CheckCircle2 className="h-4 w-4 text-success" />
          <span>{toastMessage}</span>
        </div>
      )}

      <Section
        id="contact-form"
        eyebrow="Direct Channel"
        title="Get in Touch"
        description="Whether you have an inquiry about my experience or would like to discuss an engineering role, feel free to reach out."
      >
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Left Column: Direct Info */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <Card className="flex flex-col gap-5 p-6 sm:p-8">
              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-accent-soft block mb-2">
                  Availability
                </span>
                <Badge variant="success">
                  {siteConfig.availability.label}
                </Badge>
              </div>

              <div className="pt-4 border-t border-border flex flex-col gap-4">
                <div className="flex items-start gap-3 text-sm text-text-muted">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface text-accent shrink-0">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="block font-mono text-xs text-text-subtle">Email</span>
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="text-text hover:text-accent transition-colors truncate block"
                    >
                      {siteConfig.email}
                    </a>
                    <button
                      type="button"
                      onClick={copyEmail}
                      className="mt-1 inline-flex items-center gap-1 font-mono text-xs text-accent-soft hover:underline cursor-pointer"
                    >
                      <Copy className="h-3 w-3" />
                      <span>Copy Email</span>
                    </button>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-sm text-text-muted">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface text-accent shrink-0">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="block font-mono text-xs text-text-subtle">Location</span>
                    <span className="text-text">{siteConfig.location}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <span className="block font-mono text-xs text-text-subtle mb-1.5">Direct Phone</span>
                  <PhoneReveal />
                </div>
              </div>

              <div className="pt-4 border-t border-border">
                <span className="font-mono text-xs uppercase tracking-wider text-text-subtle block mb-3">
                  Online Presence
                </span>
                <div className="flex items-center gap-3">
                  <IconLink
                    href={siteConfig.socials.github}
                    icon={<Github className="h-4 w-4" />}
                    label="GitHub"
                  />
                  <IconLink
                    href={siteConfig.socials.linkedin}
                    icon={<Linkedin className="h-4 w-4" />}
                    label="LinkedIn"
                  />
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <Card className="p-6 sm:p-8">
              {status === "success" ? (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-success/20 text-success mb-4">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-text">
                    Message Sent Successfully
                  </h3>
                  <p className="mt-2 text-sm text-text-muted max-w-md leading-relaxed">
                    Thank you for reaching out. I have received your message and will respond as soon as possible.
                  </p>
                  <Button
                    onClick={() => setStatus("idle")}
                    variant="ghost"
                    className="mt-6"
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <h3 className="font-display text-xl font-semibold text-text mb-1">
                    Send a Message
                  </h3>

                  {/* Honeypot Spam Trap (Hidden from users) */}
                  <input
                    type="text"
                    name="honeypot"
                    value={formData.honeypot}
                    onChange={handleChange}
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  {status === "error" && (
                    <div className="flex items-center gap-2 rounded-lg border border-danger/30 bg-danger/10 p-3 text-sm text-danger">
                      <AlertCircle className="h-4 w-4 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="mb-1.5 block font-mono text-xs text-text-subtle uppercase tracking-wider">
                        Your Name
                      </label>
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block font-mono text-xs text-text-subtle uppercase tracking-wider">
                        Your Email
                      </label>
                      <Input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-1.5 block font-mono text-xs text-text-subtle uppercase tracking-wider">
                      Message
                    </label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Hi Dnyaneshwar, I came across your portfolio and wanted to discuss an engineering opportunity..."
                      rows={5}
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    className="mt-2 w-full justify-center sm:w-auto self-start"
                    disabled={status === "loading"}
                  >
                    <Send className="h-4 w-4" />
                    <span>{status === "loading" ? "Sending..." : "Send Message"}</span>
                  </Button>
                </form>
              )}
            </Card>
          </div>
        </div>
      </Section>
    </div>
  );
}
