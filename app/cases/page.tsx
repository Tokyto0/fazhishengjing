import type { Metadata } from "next";
import { Layers3 } from "lucide-react";
import { CaseFilter } from "@/components/cases/case-filter";
import { PageHero } from "@/components/page-hero";
import { PageTransition } from "@/components/motion/page-transition";

export const metadata: Metadata = { title: "典型案例库", description: "聚焦地理标志、非遗、文旅 IP、商标与 AI 知识产权保护的结构化案例库。" };

export default function CasesPage() {
  return (
    <PageTransition>
      <PageHero eyebrow="Case library" title="把复杂问题，拆成可理解、可行动的案例" description="每个案例遵循统一分析框架，呈现背景、法律问题、调研发现、解决方案与制度依据。" aside={<div className="rounded-2xl border border-white bg-white/80 p-6 shadow-soft backdrop-blur"><Layers3 className="h-6 w-6 text-signal" /><p className="mt-4 font-display text-2xl font-bold text-ocean">5 大主题</p><p className="mt-1 text-sm text-slate-500">统一结构 · 持续归档</p></div>} />
      <section className="section-space bg-mist"><div className="container-page"><CaseFilter /></div></section>
    </PageTransition>
  );
}
