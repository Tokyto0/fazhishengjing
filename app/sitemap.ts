import type { MetadataRoute } from "next";
import { caseSections, knowledgeArticles, policySections } from "@/content";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/research", "/cases", "/team", "/classroom", "/knowledge", "/policies", "/about"];
  const dynamic = [
    ...caseSections.map((item) => `/cases/${item.slug}`),
    ...knowledgeArticles.map((item) => `/knowledge/${item.slug}`),
    ...policySections.map((item) => `/policies/${item.slug}`),
  ];
  const lastModified = new Date("2026-08-26T00:00:00.000Z");

  return [...paths, ...dynamic].map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
