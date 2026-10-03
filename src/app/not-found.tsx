import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center pt-24 pb-16 text-center">
      <Container className="max-w-md">
        <p className="font-mono text-sm uppercase tracking-widest text-accent mb-2">
          404 Error
        </p>
        <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-text">
          Page Not Found
        </h1>
        <p className="mt-4 text-text-muted text-sm sm:text-base leading-relaxed">
          The requested route or resource does not exist or has been moved to another path.
        </p>
        <div className="mt-8 flex justify-center">
          <Button href="/" variant="primary">
            <ArrowLeft className="h-4 w-4" />
            <span>Return to Home</span>
          </Button>
        </div>
      </Container>
    </div>
  );
}
