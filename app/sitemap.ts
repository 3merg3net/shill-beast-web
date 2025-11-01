import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const host = process.env.WEB_BASE_URL || "https://shill-beast-web.vercel.app";
  const now = new Date().toISOString();

  return [
    { url: `${host}/`, lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: `${host}/portal`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    // optionally add a few known /s/<slug> pages statically
    { url: `${host}/s/basegold-1`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
  ];
}
