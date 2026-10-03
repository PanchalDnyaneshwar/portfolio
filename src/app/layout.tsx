import "@/styles/globals.css";
import type { Metadata } from "next";
import { fontVariables } from "@/lib/fonts";
import { siteConfig } from "@/config/site";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SceneProvider } from "@/components/layout/SceneToggle";
import { MotionProvider } from "@/components/layout/MotionToggle";
import { PageTransition } from "@/components/motion/PageTransition";
import { BackgroundSceneClient } from "@/components/three/BackgroundSceneClient";
import { generatePersonJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | ${siteConfig.role}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: `${siteConfig.name} | ${siteConfig.role}`,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | ${siteConfig.role}`,
    description: siteConfig.description,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={fontVariables} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(generatePersonJsonLd()) }}
        />
      </head>
      <body className="relative flex min-h-screen flex-col text-text selection:bg-accent/20 selection:text-text">
        {/* Layer -2: Fixed background color layer behind canvas */}
        <div className="fixed inset-0 -z-20 bg-bg pointer-events-none" />

        <MotionProvider>
          <SceneProvider>
            <SmoothScroll>
              {/* Layer -1: Persistent 3D Canvas Atmosphere behind all pages */}
              <BackgroundSceneClient />
              <Navbar />
              <main id="main-content" className="flex-1 relative z-10">
                <PageTransition>{children}</PageTransition>
              </main>
              <Footer />
            </SmoothScroll>
          </SceneProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
