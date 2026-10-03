import React from "react";

export function StaticHero() {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
      {/* Outer ambient glow */}
      <div className="absolute h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
      <div className="absolute -bottom-10 -right-10 h-64 w-64 rounded-full bg-accent-2/20 blur-3xl" />

      {/* Cybernetic geometric ring */}
      <div className="relative flex h-60 w-60 items-center justify-center rounded-full border border-border bg-surface/40 backdrop-blur-md shadow-glow">
        <div className="flex h-44 w-44 items-center justify-center rounded-full border border-accent/40 bg-surface/60">
          <div className="h-28 w-28 rounded-full bg-gradient-to-tr from-accent to-accent-2 opacity-80 shadow-lg" />
        </div>
      </div>
    </div>
  );
}
