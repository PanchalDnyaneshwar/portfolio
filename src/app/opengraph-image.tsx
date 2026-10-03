import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";
import { colors } from "@/design/tokens";

export const runtime = "edge";
export const alt = `${siteConfig.name} - ${siteConfig.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          backgroundColor: colors.bg,
          padding: "80px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Brand Header */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "14px",
              backgroundColor: colors.bgElevated,
              border: "1px solid rgba(15,23,42,0.14)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "24px",
              fontWeight: 800,
              color: colors.accent,
            }}
          >
            DP
          </div>
          <span style={{ fontSize: "28px", fontWeight: 700, color: colors.text }}>
            {siteConfig.name}
          </span>
        </div>

        {/* Hero Card */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: colors.bgElevated,
            border: "1px solid rgba(15,23,42,0.12)",
            borderRadius: "24px",
            padding: "48px 56px",
            width: "100%",
            boxShadow: "0 10px 30px rgba(15,23,42,0.04)",
          }}
        >
          <div
            style={{
              fontSize: "18px",
              fontWeight: 700,
              color: colors.accent,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              marginBottom: "12px",
            }}
          >
            {siteConfig.role}
          </div>
          <div
            style={{
              fontSize: "46px",
              fontWeight: 800,
              color: colors.text,
              letterSpacing: "-0.03em",
              lineHeight: 1.15,
            }}
          >
            Architecting Scalable Microservices & Web Applications
          </div>
        </div>

        {/* Footer Meta */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            fontSize: "18px",
            color: colors.textSubtle,
          }}
        >
          <span>{siteConfig.location}</span>
          <span>Java &bull; Spring Boot &bull; NestJS &bull; React &bull; TypeScript</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
