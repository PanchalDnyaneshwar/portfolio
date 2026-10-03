"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import type { ScenePreset } from "@/design/scene";
import { scenePresets } from "@/design/scene";

interface SceneContextType {
  preset: ScenePreset;
  setPreset: (preset: ScenePreset) => void;
  speedMultiplier: number;
}

const SceneContext = createContext<SceneContextType>({
  preset: "calm",
  setPreset: () => {},
  speedMultiplier: 1.0,
});

export function SceneProvider({ children }: { children: React.ReactNode }) {
  const [preset, setPresetState] = useState<ScenePreset>("calm");

  useEffect(() => {
    const saved = localStorage.getItem("portfolio_scene_preset") as ScenePreset | null;
    if (saved && scenePresets[saved]) {
      setPresetState(saved);
    }
  }, []);

  const setPreset = (next: ScenePreset) => {
    setPresetState(next);
    localStorage.setItem("portfolio_scene_preset", next);
  };

  const speedMultiplier = scenePresets[preset]?.speedMultiplier ?? 1.0;

  return (
    <SceneContext.Provider value={{ preset, setPreset, speedMultiplier }}>
      {children}
    </SceneContext.Provider>
  );
}

export function useScene() {
  return useContext(SceneContext);
}

export function SceneToggle() {
  const { preset, setPreset } = useScene();
  const options: ScenePreset[] = ["calm", "subtle", "off"];

  return (
    <div className="flex items-center gap-1 rounded-full border border-border bg-surface p-1 text-xs font-mono text-text-subtle">
      <span className="px-2 font-medium text-text-muted">3D Motion:</span>
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => setPreset(opt)}
          className={`rounded-full px-2.5 py-1 transition-colors ${
            preset === opt
              ? "bg-accent/20 text-accent font-semibold"
              : "text-text-subtle hover:text-text"
          }`}
          aria-label={`Set 3D motion to ${scenePresets[opt].label}`}
        >
          {scenePresets[opt].label}
        </button>
      ))}
    </div>
  );
}
