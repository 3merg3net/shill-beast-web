// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import SiteHeader from "./components/SiteHeader";
import SiteFooter from "./components/SiteFooter";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Shill Beast — Decentralized Promotion",
  description: "One-click shill links with OG cards. Bot + Portal for communities.",
  openGraph: {
    title: "Shill Beast — Decentralized Promotion",
    description: "One-click shill links with OG cards. Bot + Portal for communities.",
    url: "https://shill-beast-web.vercel.app",
    siteName: "Shill Beast",
    images: [{ url: "/hero.png", width: 1200, height: 630, alt: "Shill Beast" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shill Beast — Decentralized Promotion",
    description: "One-click shill links with OG cards. Bot + Portal for communities.",
    images: ["/hero.png"],
  },
  icons: {
    icon: [
      { url: "/favicon-dark.ico", media: "(prefers-color-scheme: dark)" },
      { url: "/favicon-transparent.ico", media: "(prefers-color-scheme: light)" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="bg-black text-white">
      <head>
        <meta name="theme-color" content="#0A0A0A" />
        <link rel="icon" href="/favicon-dark.ico" media="(prefers-color-scheme: dark)" />
        <link rel="icon" href="/favicon-transparent.ico" media="(prefers-color-scheme: light)" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>

      <body className={`${inter.className} min-h-screen flex flex-col sb-grid`}>
        {/* subtle bottom lift */}
        <div
          aria-hidden
          className="pointer-events-none fixed inset-x-0 bottom-0 h-24 bg-gradient-to-t from-cyan-500/10 to-transparent z-0"
        />

        <SiteHeader />
        <main className="relative z-10 flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
