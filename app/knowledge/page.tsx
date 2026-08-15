import type { Metadata } from "next";
import { BookMarked } from "lucide-react";
import { KnowledgeBrowser } from "@/components/knowledge/knowledge-browser";
import { PageHero } from "@/components/page-hero";
import { PageTransition } from "@/components/motion/page-transition";

export const metadata: Metadata = { title: "IP 保护知识库", description: "分类浏览地理标志、非遗、文旅品牌与 AI 赋能知识产权保护知识。" };

export default function KnowledgePage() {
  return <PageTransition><PageHero eyebrow="Open knowledge base" title="把专业知识，变成随时可查的公共工具" description="按主题浏览指南、流程、法条、案例与研究；每篇内容标注更新时间，并可持续接入 PDF 资料。" aside={<div className="rounded-2xl border border-white bg-white/80 p-6 shadow-soft backdrop-blur"><BookMarked className="h-6 w-6 text-signal" /><p className="mt-4 font-display text-2xl font-bold text-ocean">4 类知识</p><p className="mt-1 text-sm text-slate-500">检索 · 阅读 · 引用</p></div>} /><section className="section-space bg-mist"><div className="container-page"><KnowledgeBrowser /></div></section></PageTransition>;
}
