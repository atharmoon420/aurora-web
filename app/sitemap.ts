import type { MetadataRoute } from "next";
import { getPublished } from "@/lib/articles";
const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://aurora.news";
export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = ["", "/standards", "/corrections", "/ai-disclosure"].map((p) => ({
    url: `${SITE}${p}`, lastModified: new Date(), changeFrequency: "daily" as const, priority: p === "" ? 1 : 0.5,
  }));
  const articles = getPublished().map((a) => ({
    url: `${SITE}/${a.category.toLowerCase()}/${a.slug}`,
    lastModified: new Date(a.publishedAt),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));
  return [...staticPages, ...articles];
}
