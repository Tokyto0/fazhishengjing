import type { MetadataRoute } from "next";
import { cases, knowledgeArticles, policyProposals } from "@/content";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/research", "/cases", "/team", "/classroom", "/knowledge", "/ai", "/policies", "/about"];
  const dynamic = [
    ...cases.map((item) => `/cases/${item.slug}`),
    ...knowledgeArticles.map((item) => `/knowledge/${item.slug}`),
    ...policyProposals.map((item) => `/policies/${item.slug}`),
  ];
  return [...paths, ...dynamic].map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
