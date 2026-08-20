import type { Metadata } from "next";
import "./globals.css";
import GlobalAnimationSystem from "@/components/GlobalAnimationSystem";
import AudioSystem from "@/components/AudioSystem";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "SAM EBENEZER P // NEXUS AI OS",
  description:
    "Futuristic AI Operating System portfolio of Sam Ebenezer P — Full Stack Developer, Java Engineer & AI Enthusiast",
  keywords: [
    "Sam Ebenezer",
    "Sam Ebenezer P",
    "Portfolio",
    "Software Engineer",
    "Java Developer",
    "AI Specialist",
    "Karunya University"
  ],
  metadataBase: new URL("https://samebenezer.dev"),
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "SAM EBENEZER P // NEXUS AI OS",
    description:
      "Futuristic AI Operating System portfolio of Sam Ebenezer P — Full Stack Developer, Java Engineer & AI Enthusiast",
    url: "https://samebenezer.dev",
    siteName: "NEXUS AI OS",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og",
        width: 1200,
        height: 630,
        alt: "NEXUS AI OS Preview"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "SAM EBENEZER P // NEXUS AI OS",
    description:
      "Futuristic AI Operating System portfolio of Sam Ebenezer P — Full Stack Developer, Java Engineer & AI Enthusiast",
    images: ["/og"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* ── Font preconnect ── */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* ── Fonts with display=swap (Phase 21 — Lighthouse) ── */}
        <link
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;700;900&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
        {/* JSON-LD Structured Data */}
        <JsonLd />
      </head>
      <body className="antialiased">
        {/* Phase 19 — Global animation overlays */}
        <GlobalAnimationSystem />
        {/* Phase 20 — Audio system + mute button */}
        <AudioSystem />
        {children}
      </body>
    </html>
  );
}


