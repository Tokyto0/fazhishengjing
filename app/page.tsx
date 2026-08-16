import type { Metadata } from "next";
import {
  ArrowRight,
  BookOpenText,
  BriefcaseBusiness,
  ChevronRight,
  FileText,
  MapPinned,
  Quote,
  Scale,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { HeroVisual } from "@/components/home/hero-visual";
import { Counter } from "@/components/motion/counter";
import { Reveal } from "@/components/motion/reveal";
import { PageTransition } from "@/components/motion/page-transition";
import { SectionHeading } from "@/components/section-heading";
import { caseSections, researchStops } from "@/content";
import { homeStats, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "首页",
  description: siteConfig.description,
};

const entries = [
  { href: "/research", title: "五省区调研纪实", description: "在地图与时间线中回到实践现场", icon: MapPinned, number: "01", color: "bg-blue-50 text-blue-700" },
  { href: "/cases", title: "典型案例库", description: "从真实问题提炼可复用的解决路径", icon: BriefcaseBusiness, number: "02", color: "bg-emerald-50 text-emerald-700" },
  { href: "/classroom", title: "普法云课堂", description: "让专业法律知识清楚、好懂、可获得", icon: BookOpenText, number: "03", color: "bg-amber-50 text-amber-700" },
  { href: "/knowledge", title: "IP 保护知识库", description: "分类检索流程、法条、案例与研究", icon: Scale, number: "04", color: "bg-violet-50 text-violet-700" },
  { href: "/policies", title: "政策建议库", description: "把一线发现转化为系统治理建议", icon: FileText, number: "05", color: "bg-cyan-50 text-cyan-700" },
];

export default function HomePage() {
  const featuredCases = caseSections.slice(0, 3);

  return (
    <PageTransition>
      <section className="relative min-h-[760px] overflow-hidden bg-[linear-gradient(135deg,#f8fbff_0%,#eef6ff_46%,#f4fbf8_100%)] pt-[76px]">
        <div className="absolute inset-0 bg-grid bg-[length:52px_52px] opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent_88%)]" />
        <div className="absolute -left-32 top-24 h-[420px] w-[420px] rounded-full bg-blue-200/30 blur-3xl" />
        <div className="absolute right-0 top-0 h-[460px] w-[460px] rounded-full bg-emerald-100/40 blur-3xl" />
        <div className="container-page relative grid min-h-[680px] items-center gap-6 py-16 lg:grid-cols-[1.05fr_.95fr] lg:py-20">
          <Reveal>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/80 px-4 py-2 text-xs font-semibold tracking-wide text-ocean shadow-sm backdrop-blur">
              <Sparkles className="h-4 w-4 text-signal" />
              高校社会实践 · 知识开放共享
            </div>
            <h1 className="max-w-3xl text-balance font-display text-5xl font-bold leading-[1.08] tracking-tight text-ink sm:text-6xl lg:text-[76px]">
              让乡土创新<br />
              <span className="relative text-ocean">
                被看见，被保护
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 500 16" fill="none" aria-hidden="true"><path d="M3 12C132 3 336 3 497 8" stroke="#20c997" strokeWidth="5" strokeLinecap="round" opacity=".8" /></svg>
              </span>
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-9 text-slate-600 sm:text-xl">聚焦农文旅融合、知识产权保护与人工智能赋能，用扎实调研连接法律专业、技术创新与真实生活。</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/research" className="button-primary">走进调研现场 <ArrowRight className="h-4 w-4" /></Link>
              <Link href="/knowledge" className="button-secondary">检索知识库</Link>
            </div>
            <div className="mt-10 flex items-center gap-4 text-sm text-slate-500">
              <div className="flex -space-x-2" aria-hidden="true">
                {["法", "智", "农", "旅"].map((item, index) => <span key={item} className="grid h-8 w-8 place-items-center rounded-full border-2 border-white bg-ocean text-xs text-white" style={{ opacity: 1 - index * 0.12 }}>{item}</span>)}
              </div>
              <span>五地联动 · 多学科协作 · 持续归档</span>
            </div>
          </Reveal>
          <Reveal delay={0.12} className="hidden lg:block"><HeroVisual /></Reveal>
        </div>
        <div className="absolute bottom-0 left-1/2 hidden -translate-x-1/2 items-center gap-3 pb-6 text-[11px] uppercase tracking-[0.25em] text-slate-400 lg:flex"><span className="h-9 w-px bg-gradient-to-b from-signal to-transparent" />向下探索</div>
      </section>

      <section className="relative z-10 -mt-1 bg-white">
        <div className="container-page grid divide-y divide-slate-200 border-x border-b border-slate-200 bg-white sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
          {homeStats.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 0.06} className="p-7 lg:p-9">
              <p className="font-display text-4xl font-bold text-ocean sm:text-5xl"><Counter value={stat.value} /><span className="ml-1 text-xl text-signal">{stat.suffix}</span></p>
              <p className="mt-3 font-semibold text-ink">{stat.label}</p>
              <p className="mt-1 text-xs text-slate-500">{stat.note}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-space bg-white">
        <div className="container-page">
          <Reveal><SectionHeading eyebrow="Explore the platform" title="每一份成果，都有清晰的入口" description="从实践现场到知识服务，平台以可追溯、可检索、可持续更新的方式保存团队成果。" /></Reveal>
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-6">
            {entries.map((item, index) => {
              const Icon = item.icon;
              const wide = index < 2;
              return (
                <Reveal key={item.href} delay={index * 0.05} className={wide ? "lg:col-span-3" : "lg:col-span-2"}>
                  <Link href={item.href} className="group flex h-full min-h-[230px] flex-col justify-between rounded-2xl border border-slate-200 bg-white p-7 transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-soft">
                    <div className="flex items-start justify-between">
                      <span className={`grid h-12 w-12 place-items-center rounded-xl ${item.color}`}><Icon className="h-5 w-5" /></span>
                      <span className="font-display text-4xl text-slate-100 transition group-hover:text-blue-100">{item.number}</span>
                    </div>
                    <div>
                      <h3 className="font-display text-2xl font-bold text-ink">{item.title}</h3>
                      <p className="mt-2 leading-7 text-slate-500">{item.description}</p>
                      <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-signal">进入栏目 <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-space overflow-hidden bg-ink text-white">
        <div className="container-page grid items-center gap-14 lg:grid-cols-[.8fr_1.2fr]">
          <Reveal>
            <SectionHeading eyebrow="Fieldwork archive" title="五省区，五种现场，一条共同的问题脉络" description="团队跨越山东、广东、湖南、宁夏与黑龙江，追踪知识产权如何真正参与农文旅融合与乡村产业发展。" light />
            <Link href="/research" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-mint">查看完整调研时间线 <ArrowRight className="h-4 w-4" /></Link>
          </Reveal>
          <div className="grid gap-3 sm:grid-cols-2">
            {researchStops.map((stop, index) => (
              <Reveal key={stop.id} delay={index * 0.06}>
                <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-6 transition hover:border-blue-400/40 hover:bg-white/[0.09]">
                  <div className="flex items-center justify-between text-xs"><span className="font-semibold tracking-wider text-blue-300">{stop.province}</span><span className="text-slate-500">0{index + 1}</span></div>
                  <h3 className="mt-5 font-display text-xl font-bold">{stop.title}</h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-400">{stop.summary}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space bg-mist">
        <div className="container-page">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <Reveal><SectionHeading eyebrow="Cases in focus" title="从一个具体问题，抵达可复用的方法" /></Reveal>
            <Link href="/cases" className="inline-flex items-center gap-2 text-sm font-semibold text-signal">浏览全部案例 <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {featuredCases.map((item, index) => (
              <Reveal key={item.slug} delay={index * 0.06}>
                <Link href={`/cases/${item.slug}`} className="group flex min-h-[340px] flex-col rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-soft">
                  <div className="flex items-center justify-between"><span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">案例专题</span><span className="font-mono text-xs text-slate-400">{String(item.order).padStart(2, "0")}</span></div>
                  <h3 className="mt-8 text-balance font-display text-2xl font-bold leading-9 text-ink transition group-hover:text-signal">{item.title}</h3>
                  <div className="flex-1" />
                  <div className="mt-7 flex items-center justify-between border-t border-slate-100 pt-5 text-sm font-semibold text-ocean"><span>查看案例分析</span><ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-mist py-16">
        <Reveal className="container-page flex max-w-4xl flex-col items-center text-center">
          <Quote className="h-8 w-8 text-blue-200" />
          <blockquote className="mt-5 text-balance font-display text-2xl font-bold leading-relaxed text-ink sm:text-3xl">“社会实践不是短暂抵达，而是把看见的问题，变成可以继续生长的知识。”</blockquote>
        </Reveal>
      </section>
    </PageTransition>
  );
}
