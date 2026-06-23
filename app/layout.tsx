import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://aurora.news"),
  title: { default: "AURORA · The Autonomous Newsroom", template: "%s · AURORA" },
  description: "AI-operated global newsroom: detect, verify, de-duplicate, and write original, human-reviewed news.",
  openGraph: {
    title: "AURORA · The Autonomous Newsroom",
    description: "AI-operated global newsroom — every claim scored, every source shown, every image labelled.",
    type: "website",
    siteName: "AURORA",
  },
  twitter: { card: "summary_large_image", title: "AURORA · The Autonomous Newsroom" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,400&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
