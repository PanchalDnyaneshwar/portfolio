/* Single Source of Truth for 3D Background Parameters (Software Developer World) */

export type ScenePreset = "calm" | "subtle" | "lively" | "off";

export const scenePresets: Record<ScenePreset, { label: string; speedMultiplier: number }> = {
  calm: { label: "Calm", speedMultiplier: 1.0 },
  subtle: { label: "Subtle", speedMultiplier: 0.5 },
  lively: { label: "Lively", speedMultiplier: 1.5 },
  off: { label: "Off", speedMultiplier: 0.0 },
};

export const sceneConfig = {
  // Developer 3D Artifacts
  laptop: {
    position: [6.0, 1.2, -3.8] as [number, number, number],
    scale: 0.75,
  },
  bug: {
    position: [-6.4, -2.2, -3.4] as [number, number, number],
    scale: 0.7,
  },
  brackets: {
    position: [-6.0, 2.8, -4.0] as [number, number, number],
    scale: 0.75,
  },
  curlyBraces: {
    position: [5.8, -3.2, -4.2] as [number, number, number],
    scale: 0.7,
  },

  // Developer Constellation Network Mesh
  network: {
    nodeCountDesktop: 48,
    nodeCountTablet: 24,
    maxDistance: 3.8,
    nodeSize: 0.075,
    nodeOpacity: 0.45,
    lineOpacity: 0.18,
    driftSpeed: 0.07,
    spreadX: 18,
    spreadY: 14,
    spreadZ: 8,
    offsetZ: -4.5,
  },

  // Active telemetry data packets
  packets: {
    count: 10,
    size: 0.08,
    speed: 0.6,
    opacity: 0.75,
  },

  // Ambient telemetry points
  particles: {
    countDesktop: 280,
    countTablet: 140,
    size: 0.045,
    opacity: 0.22,
    rotationSpeedY: 0.01,
    verticalDriftSpeed: 0.012,
    spreadX: 24,
    spreadY: 20,
    spreadZ: 16,
  },

  // Camera & Interaction
  camera: {
    initialZ: 7.0,
    travelZ: 3.5,
    dampingScroll: 0.05,
    maxMouseParallax: 0.25,
    dampingMouse: 0.035,
    fov: 45,
  },

  // Render Constraints
  render: {
    dpr: [1, 1.5] as [number, number],
  },
} as const;
