import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Shill Beast",
  description: "Powering Decentralized Promotion — automate your shill army.",
  openGraph: {
    title: "Shill Beast",
    description: "AI + Telegram + X = unstoppable decentralized promotion engine.",
    url: "https://shillbeast.vercel.app",
    siteName: "Shill Beast",
    images: [
      {
        url: "/hero.png",
        width: 1200,
        height: 630,
        alt: "Shill Beast",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@ShillBeastAI",
    creator: "@ShillBeastAI",
    title: "Shill Beast",
    description: "Powering Decentralized Promotion.",
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-black text-white">
      <head>
        <meta name="theme-color" content="#0A0A0A" />
        <link
          rel="icon"
          href="/favicon-dark.ico"
          media="(prefers-color-scheme: dark)"
        />
        <link
          rel="icon"
          href="/favicon-transparent.ico"
          media="(prefers-color-scheme: light)"
        />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className={`${inter.className} min-h-screen flex flex-col sb-grid`}>
  {/* bottom gradient lift */}
  <div aria-hidden className="pointer-events-none fixed inset-x-0 bottom-0 h-24 bg-gradient-to-t from-cyan-500/10 to-transparent z-0" />
  {children}
</body>

    </html>
  );
}
