import type { MetadataRoute } from "next";
import { caseSections, knowledgeArticles, policySections } from "@/content";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/research", "/cases", "/team", "/classroom", "/knowledge", "/policies", "/about"];
  const dynamic = [
    ...caseSections.map((item) => `/cases/${item.slug}`),
    ...knowledgeArticles.map((item) => `/knowledge/${item.slug}`),
    ...policySections.map((item) => `/policies/${item.slug}`),
  ];
  return [...paths, ...dynamic].map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
