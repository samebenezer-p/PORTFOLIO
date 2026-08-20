# OG / Twitter Meta Tag Snippet — Phase 4 SEO

> **Action required by you:** This file documents the exact code to paste into `src/app/layout.tsx`.  
> It is **NOT auto-applied** — open the file yourself, find the `openGraph` block, and replace it with the snippet below when ready.
>
> The dynamic `/og` image route was already created earlier in this session (`src/app/og/route.tsx`).
> This snippet only corrects the metadata references to use it and adds missing tags.

---

## Where to paste

File: `next-app/src/app/layout.tsx`  
Location: Replace the existing `export const metadata: Metadata = { ... }` block (lines 7–59) with the block below.

---

## Replacement snippet

```typescript
export const metadata: Metadata = {
  title: {
    default: "SAM EBENEZER P // NEXUS AI OS",
    template: "%s | NEXUS AI OS",
  },
  description:
    "Futuristic AI Operating System portfolio of Sam Ebenezer P — Full Stack Developer, Java Engineer & AI Enthusiast",
  keywords: [
    "Sam Ebenezer",
    "Sam Ebenezer P",
    "Portfolio",
    "Software Engineer",
    "Java Developer",
    "AI Specialist",
    "Karunya University",
    "Next.js Portfolio",
    "NEXUS OS",
  ],
  metadataBase: new URL("https://samebenezer.dev"),
  alternates: {
    canonical: "/",
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
        url: "/og",          // ← dynamic edge-rendered image (1200×630 dark HUD)
        width: 1200,
        height: 630,
        alt: "NEXUS AI OS — Sam Ebenezer P Portfolio Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SAM EBENEZER P // NEXUS AI OS",
    description:
      "Futuristic AI Operating System portfolio of Sam Ebenezer P — Full Stack Developer, Java Engineer & AI Enthusiast",
    images: ["/og"],        // ← same dynamic edge image
    creator: "@samebenezer", // update if you have a Twitter/X handle
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};
```

---

## What changed vs. the original

| Change | Reason |
|---|---|
| `title` changed to object with `template` | Allows future pages to inherit site name |
| `keywords` array expanded | Adds "Next.js Portfolio" and "NEXUS OS" for better discoverability |
| `openGraph.images[0].url` → `"/og"` | Now uses the dynamic edge-rendered dark HUD card (already built) |
| `openGraph.images[0].alt` | More descriptive for screen readers and social platforms |
| `twitter.images` → `["/og"]` | Matches OG image |
| `twitter.creator` added | Required by Twitter for proper card attribution |

---

*Generated: 2026-07-24. Apply manually with explicit go-ahead.*
