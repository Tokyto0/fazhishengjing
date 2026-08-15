import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, CheckCircle2, FileText, Lightbulb, MapPin, Scale, SearchCheck } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageTransition } from "@/components/motion/page-transition";
import { Reveal } from "@/components/motion/reveal";
import { cases } from "@/content";

export function generateStaticParams() { return cases.map((item) => ({ slug: item.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = cases.find((entry) => entry.slug === slug);
  return item ? { title: item.title, description: item.summary } : {};
}

export default async function CaseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = cases.find((entry) => entry.slug === slug);
  if (!item) notFound();
  const related = cases.filter((entry) => entry.slug !== item.slug && (entry.category === item.category || entry.tags.some((tag) => item.tags.includes(tag)))).slice(0, 2);

  return (
    <PageTransition>
      <article className="bg-white pt-[76px]">
        <header className="relative overflow-hidden border-b border-slate-200 bg-ink text-white">
          <div className="absolute inset-0 bg-grid bg-[length:48px_48px] opacity-15" />
          <div className="container-page relative py-16 sm:py-20 lg:py-24">
            <Link href="/cases" className="inline-flex items-center gap-2 text-sm text-blue-200 transition hover:text-white"><ArrowLeft className="h-4 w-4" />返回案例库</Link>
            <div className="mt-10 flex flex-wrap items-center gap-3 text-xs"><span className="rounded-full bg-signal/20 px-3 py-1.5 font-semibold text-blue-200">{item.category}</span><span className="flex items-center gap-1.5 text-slate-400"><MapPin className="h-3.5 w-3.5" />{item.region} · {item.year}</span></div>
            <h1 className="mt-6 max-w-5xl text-balance font-display text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">{item.title}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">{item.summary}</p>
          </div>
        </header>

        <div className="container-page grid gap-12 py-16 lg:grid-cols-[1fr_280px] lg:py-20">
          <div className="space-y-14">
            <Reveal><Section icon={FileText} index="01" title="案例背景"><p>{item.background}</p></Section></Reveal>
            <Reveal><Section icon={Scale} index="02" title="核心法律问题"><div className="rounded-2xl border-l-4 border-signal bg-blue-50 p-6 font-medium leading-8 text-ocean">{item.legalIssue}</div></Section></Reveal>
            <Reveal><Section icon={SearchCheck} index="03" title="调研发现"><ul className="space-y-3">{item.findings.map((finding) => <li key={finding} className="flex gap-3 rounded-xl bg-slate-50 p-4"><span className="mt-1 font-display text-sm font-bold text-signal">F</span><span>{finding}</span></li>)}</ul></Section></Reveal>
            <Reveal><Section icon={Lightbulb} index="04" title="解决方案"><ol className="space-y-4">{item.solution.map((solution, index) => <li key={solution} className="flex gap-4"><span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-ocean text-xs font-bold text-white">{index + 1}</span><span className="pt-0.5">{solution}</span></li>)}</ol></Section></Reveal>
            <Reveal><Section icon={CheckCircle2} index="05" title="案例意义"><p>{item.significance}</p></Section></Reveal>
            <Reveal><Section icon={Scale} index="06" title="相关法律法规"><div className="grid gap-3">{item.laws.map((law) => <div key={law} className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-ink"><span className="h-2 w-2 rounded-full bg-mint" />{law}</div>)}</div></Section></Reveal>
          </div>
          <aside className="lg:sticky lg:top-28 lg:self-start"><div className="rounded-2xl border border-slate-200 bg-mist p-6"><p className="text-xs font-bold uppercase tracking-[.18em] text-slate-400">案例标签</p><div className="mt-4 flex flex-wrap gap-2">{item.tags.map((tag) => <span key={tag} className="rounded-full bg-white px-3 py-1.5 text-xs text-slate-600 shadow-sm">#{tag}</span>)}</div><div className="mt-6 border-t border-slate-200 pt-5"><p className="text-xs leading-6 text-slate-500">本案例为实践研究中的结构化分析，不替代针对具体事实的法律意见。</p></div></div></aside>
        </div>
      </article>
      {related.length > 0 && <section className="border-t border-slate-200 bg-mist py-16"><div className="container-page"><h2 className="font-display text-2xl font-bold">继续阅读</h2><div className="mt-6 grid gap-4 md:grid-cols-2">{related.map((entry) => <Link key={entry.slug} href={`/cases/${entry.slug}`} className="group rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-blue-200 hover:shadow-soft"><span className="text-xs font-semibold text-signal">{entry.category}</span><h3 className="mt-3 font-display text-xl font-bold group-hover:text-signal">{entry.title}</h3><span className="mt-5 inline-flex items-center gap-1 text-sm text-slate-500">查看案例 <ArrowRight className="h-4 w-4" /></span></Link>)}</div></div></section>}
    </PageTransition>
  );
}

function Section({ icon: Icon, index, title, children }: { icon: typeof Scale; index: string; title: string; children: React.ReactNode }) {
  return <section className="text-base leading-8 text-slate-600"><div className="mb-6 flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-50 text-signal"><Icon className="h-5 w-5" /></span><div><span className="text-[10px] font-bold tracking-[.2em] text-slate-400">PART {index}</span><h2 className="font-display text-2xl font-bold leading-none text-ink">{title}</h2></div></div>{children}</section>;
}
