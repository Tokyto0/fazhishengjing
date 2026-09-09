import type { Metadata } from "next";
import { ArrowDown, Compass, Quote, UsersRound } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { PageTransition } from "@/components/motion/page-transition";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/section-heading";
import { teamGroups } from "@/content";

export const metadata: Metadata = { title: "队员风采", description: "以职责、专业与实践感悟呈现法智生境社会实践团队的多学科协作。" };

export default function TeamPage() {
  return (
    <PageTransition>
      <PageHero eyebrow="The team" title="不同的专业，同一份面向真实问题的认真" description="不做照片墙。我们用分工、责任与思考，记录每位队员如何参与这场跨学科社会实践。" aside={<div className="rounded-2xl border border-white bg-white/80 p-6 shadow-soft backdrop-blur"><UsersRound className="h-6 w-6 text-signal" /><p className="mt-4 font-display text-2xl font-bold text-ocean">跨学科协作</p><p className="mt-1 text-sm text-slate-500">法律 · 技术 · 传播 · 设计</p></div>} />
      <section className="section-space bg-white"><div className="container-page"><Reveal><SectionHeading eyebrow="People behind the work" title="看见每一个成果背后的角色" description="从调研设计到技术实现，每项成果都有明确的责任链，也有来自实践现场的个人体悟。" /></Reveal><div className="mt-12 grid gap-5 lg:grid-cols-2">{teamGroups.map((group, index) => <Reveal key={group.role} delay={index * .04}><article className="group h-full rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-blue-200 hover:shadow-soft sm:p-7"><div className="border-b border-slate-100 pb-5"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-signal">团队分工</p><h2 className="mt-2 font-display text-3xl font-bold text-ocean sm:text-4xl">{group.role}</h2><div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">{group.members.map((member) => <div key={member.name}><p className="font-display text-xl font-bold text-ink">{member.name}</p><p className="mt-0.5 text-xs font-semibold text-signal">{member.major}</p></div>)}</div></div><p className="mt-5 text-sm leading-7 text-slate-600"><strong className="text-ink">实践职责：</strong>{group.responsibility}</p><div className="mt-3 space-y-3">{group.members.map((member) => <p key={member.name} className="text-sm leading-7 text-slate-600"><strong className="text-ink">核心贡献{group.members.length > 1 ? `（${member.name}）` : ""}：</strong>{member.contribution}</p>)}</div><blockquote className="mt-5 border-l-2 border-mint pl-4 text-sm italic leading-7 text-slate-500"><span className="not-italic font-semibold text-ink">{group.reflectionLabel ?? "实践感言"}：</span>“{group.reflection}”</blockquote></article></Reveal>)}</div></div></section>
      <section className="section-space bg-mist"><div className="container-page"><Reveal><SectionHeading eyebrow="How we collaborate" title="从问题到成果，一条透明的协作链" align="center" /></Reveal><div className="mx-auto mt-12 grid max-w-5xl gap-3 md:grid-cols-4">{["共同定义问题", "分专业进入现场", "交叉验证发现", "公开沉淀成果"].map((step, index) => <Reveal key={step} delay={index * .05}><div className="relative rounded-2xl border border-slate-200 bg-white p-6 text-center"><span className="mx-auto grid h-9 w-9 place-items-center rounded-full bg-blue-50 text-sm font-bold text-signal">0{index + 1}</span><p className="mt-4 font-display text-lg font-bold">{step}</p>{index < 3 && <ArrowDown className="absolute -bottom-5 left-1/2 z-10 h-5 w-5 -translate-x-1/2 text-blue-200 md:-right-4 md:bottom-auto md:left-auto md:top-1/2 md:-translate-y-1/2 md:rotate-[-90deg]" />}</div></Reveal>)}</div></div></section>
      <section className="bg-ocean py-20 text-white"><Reveal className="container-page text-center"><Compass className="mx-auto h-8 w-8 text-mint" /><Quote className="mx-auto mt-8 h-6 w-6 text-blue-300" /><p className="mx-auto mt-4 max-w-3xl text-balance font-display text-2xl font-bold leading-relaxed sm:text-3xl">我们的专业各不相同，但衡量成果的标准一致：是否尊重真实，是否帮助理解，是否能够被继续使用。</p></Reveal></section>
    </PageTransition>
  );
}
