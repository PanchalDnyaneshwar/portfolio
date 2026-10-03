/* Mirror for R3F Canvas and WebGL shaders (Single Source of Truth) */

export const colors = {
  bg: "#ECEEF3",
  bgElevated: "#FFFFFF",
  surface: "#FFFFFF",
  surfaceHover: "#E3E6ED",
  accent: "#4F46E5",
  accentSoft: "#6366F1",
  accent2: "#0EA5E9",
  text: "#0F172A",
  textMuted: "#475569",
  textSubtle: "#64748B",
  codeGreen: "#10B981",
  codeCyan: "#38BDF8",
  titaniumLight: "#E2E8F0",
  titaniumMid: "#94A3B8",
  titaniumDark: "#475569",
  slateGrey: "#64748B",
  coolGrey: "#CBD5E1",
  spaceGrey: "#334155",
  accentVibrant: "#6366F1",
} as const;

export function getThemeColors() {
  if (typeof window === "undefined") return colors;
  const computed = getComputedStyle(document.documentElement);
  const accent = computed.getPropertyValue("--color-accent").trim() || colors.accent;
  const accentSoft = computed.getPropertyValue("--color-accent-soft").trim() || colors.accentSoft;
  const accent2 = computed.getPropertyValue("--color-accent-2").trim() || colors.accent2;
  const bg = computed.getPropertyValue("--color-bg").trim() || colors.bg;
  const text = computed.getPropertyValue("--color-text").trim() || colors.text;

  return {
    bg,
    accent,
    accentSoft,
    accent2,
    text,
    codeGreen: colors.codeGreen,
    codeCyan: colors.codeCyan,
    titaniumLight: colors.titaniumLight,
    titaniumMid: colors.titaniumMid,
    titaniumDark: colors.titaniumDark,
    slateGrey: colors.slateGrey,
    coolGrey: colors.coolGrey,
    spaceGrey: colors.spaceGrey,
    accentVibrant: colors.accentVibrant,
  };
}
