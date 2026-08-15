import type { Metadata } from "next";
import { ArrowRight, BarChart3, FileCheck2, Landmark } from "lucide-react";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { PageTransition } from "@/components/motion/page-transition";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/section-heading";
import { policyProposals } from "@/content";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = { title: "政策建议库", description: "展示团队围绕 AI 赋能、数字知识产权治理与乡村振兴形成的政策建议和研究成果。" };

export default function PoliciesPage() {
  return (
    <PageTransition>
      <PageHero eyebrow="Policy & research" title="把一线发现，转化为可讨论、可落地的治理建议" description="关注 AI 赋能农文旅知识产权保护、数字化治理与乡村振兴，让研究回应基层真实需求。" aside={<div className="rounded-2xl border border-white bg-white/80 p-6 shadow-soft backdrop-blur"><Landmark className="h-6 w-6 text-signal" /><p className="mt-4 font-display text-2xl font-bold text-ocean">研究转化</p><p className="mt-1 text-sm text-slate-500">问题 · 建议 · 预期影响</p></div>} />
      <section className="section-space bg-white"><div className="container-page"><Reveal><SectionHeading eyebrow="Policy proposals" title="三条重点方向，回应共同治理难题" /></Reveal><div className="mt-12 space-y-5">{policyProposals.map((proposal, index) => <Reveal key={proposal.slug} delay={index * .05}><Link href={`/policies/${proposal.slug}`} className="group grid gap-7 rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-blue-200 hover:shadow-soft sm:p-8 lg:grid-cols-[120px_1fr_auto] lg:items-center"><div><span className="font-display text-5xl font-bold text-slate-100 transition group-hover:text-blue-100">0{index + 1}</span><p className="mt-2 text-xs font-semibold text-signal">{proposal.level}</p></div><div><div className="flex flex-wrap items-center gap-2 text-xs"><span className="rounded-full bg-blue-50 px-3 py-1 font-semibold text-blue-700">{proposal.category}</span><span className="text-slate-400">{formatDate(proposal.publishedAt)}</span></div><h2 className="mt-4 font-display text-2xl font-bold text-ink transition group-hover:text-signal sm:text-3xl">{proposal.title}</h2><p className="mt-3 max-w-3xl leading-7 text-slate-600">{proposal.summary}</p><div className="mt-5 flex flex-wrap gap-2">{proposal.expectedImpact.map((impact) => <span key={impact} className="rounded-full bg-slate-50 px-3 py-1 text-xs text-slate-500">{impact}</span>)}</div></div><span className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 text-slate-400 transition group-hover:border-signal group-hover:bg-signal group-hover:text-white"><ArrowRight className="h-5 w-5" /></span></Link></Reveal>)}</div></div></section>
      <section className="section-space bg-mist"><div className="container-page grid gap-5 md:grid-cols-3">{[{ icon: FileCheck2, value: "事实可溯", text: "每条建议对应调研发现与资料来源" }, { icon: BarChart3, value: "影响可评", text: "明确治理对象、执行条件与预期变化" }, { icon: Landmark, value: "持续跟踪", text: "记录建议完善、交流与落地反馈" }].map((item, index) => { const Icon = item.icon; return <Reveal key={item.value} delay={index * .05}><div className="rounded-2xl border border-slate-200 bg-white p-7"><Icon className="h-6 w-6 text-signal" /><h3 className="mt-6 font-display text-2xl font-bold">{item.value}</h3><p className="mt-3 text-sm leading-7 text-slate-600">{item.text}</p></div></Reveal>; })}</div></section>
    </PageTransition>
  );
}
