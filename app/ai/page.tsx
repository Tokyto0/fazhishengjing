import type { Metadata } from "next";
import { Bot, Database, FileCheck2, ShieldCheck } from "lucide-react";
import { AskPanel } from "@/components/ai/ask-panel";
import { PageHero } from "@/components/page-hero";
import { PageTransition } from "@/components/motion/page-transition";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = { title: "AI 知识库问答", description: "基于法智生境知识库资料检索并生成带来源的知识产权问答。" };

export default async function AiPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q = "" } = await searchParams;
  const features = [{ icon: Database, title: "先检索资料", text: "从本地知识库筛选相关内容" }, { icon: FileCheck2, title: "依据资料回答", text: "约束模型不脱离已检索上下文" }, { icon: ShieldCheck, title: "展示参考来源", text: "每次回答附上可回看的资料入口" }];
  return <PageTransition><PageHero eyebrow="Knowledge-grounded AI" title="不是让 AI 猜答案，而是让它先找到依据" description="问答模块采用 RAG 思路：检索知识库、组织资料上下文、生成回答并展示参考来源。" aside={<div className="rounded-2xl border border-white bg-white/80 p-6 shadow-soft backdrop-blur"><Bot className="h-6 w-6 text-signal" /><p className="mt-4 font-display text-2xl font-bold text-ocean">可信问答</p><p className="mt-1 text-sm text-slate-500">资料优先 · 来源透明</p></div>} /><section className="bg-white py-10"><div className="container-page grid gap-4 sm:grid-cols-3">{features.map((feature, index) => { const Icon = feature.icon; return <Reveal key={feature.title} delay={index * .05}><div className="flex items-center gap-4 rounded-2xl border border-slate-200 p-5"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-blue-50 text-signal"><Icon className="h-5 w-5" /></span><div><p className="font-display font-bold text-ink">{feature.title}</p><p className="mt-1 text-xs text-slate-500">{feature.text}</p></div></div></Reveal>; })}</div></section><section className="section-space bg-mist"><div className="container-page"><AskPanel initialQuestion={q.slice(0, 500)} /></div></section></PageTransition>;
}
