import data from "@/data/articles.json";

export interface Article {
  id: string;
  slug: string;
  headline: string;
  category: string;
  breaking: boolean;
  status: "published" | "needs_review" | "held" | "auto_published" | "rejected";
  language: string;
  publishedAt: string;
  readingTimeMin: number;
  distinctSources: number;
  featuredImageLabel: string;
  summary: string;
  body: string[];
  pullQuote: string;
  keyFacts: string[];
  timeline: [string, string][];
  background: string;
  futureImpact: string;
  sources: { name: string; url: string; reliability: number }[];
  relatedTopics: string[];
  scores: { originality: number; sourceReliability: number; factCheck: number; readability: number; confidence: number; flagged: string[] };
  signals: { breaking: number; trending: number; virality: number };
}

const ALL = data as unknown as Article[];

export const getPublished = () => ALL.filter((a) => a.status === "published" || a.status === "auto_published");
export const getAll = () => ALL;
export const getBySlug = (category: string, slug: string) =>
  ALL.find((a) => a.slug === slug && a.category.toLowerCase() === category.toLowerCase());
export const getReviewQueue = () => ALL;

export const SITE = "https://aurora.news";
export const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
