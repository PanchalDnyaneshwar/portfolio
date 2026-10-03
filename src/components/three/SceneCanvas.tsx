"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useMotionAllowed } from "@/hooks/useMotionAllowed";
import { StaticHero } from "./fallbacks/StaticHero";

export function SceneCanvas({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile();
  const allowed = useMotionAllowed();

  if (isMobile || !allowed) {
    return <StaticHero />;
  }

  return (
    <div className="relative h-full w-full">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>{children}</Suspense>
      </Canvas>
    </div>
  );
}
