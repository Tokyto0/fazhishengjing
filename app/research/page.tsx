import type { Metadata } from "next";
import { Archive, Camera, MessageSquareText, Route } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/motion/reveal";
import { PageTransition } from "@/components/motion/page-transition";
import { ChinaMap } from "@/components/research/china-map";
import { SectionHeading } from "@/components/section-heading";
import { researchPrinciples, researchStops } from "@/content";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = { title: "五省区调研纪实", description: "以交互地图与时间线记录法智生境团队在山东、广东、湖南、宁夏与黑龙江的调研实践过程。" };

export default function ResearchPage() {
  return (
    <PageTransition>
      <PageHero eyebrow="Research journey" title="把每一次抵达，留在可追溯的实践档案里" description="从问题发现、现场访谈到成果转化，以地图和时间线记录五省区调研过程。" aside={<div className="grid grid-cols-2 gap-3"><div className="rounded-2xl border border-white bg-white/80 p-5 shadow-soft backdrop-blur"><p className="font-display text-3xl font-bold text-ocean">{researchStops.length}</p><p className="mt-1 text-xs text-slate-500">调研省区</p></div><div className="rounded-2xl border border-white bg-white/80 p-5 shadow-soft backdrop-blur"><p className="font-display text-3xl font-bold text-ocean">12</p><p className="mt-1 text-xs text-slate-500">实践点位</p></div></div>} />

      <section id="research-map" className="section-space scroll-mt-20 bg-white"><div className="container-page"><Reveal><ChinaMap /></Reveal><p className="mt-4 text-center text-xs text-slate-400">地图按实际调研省级范围标注；具体城市、点位与时间将在原始日志核验后补充。</p></div></section>

      <section className="section-space bg-mist">
        <div className="container-page">
          <Reveal><SectionHeading eyebrow="Timeline" title="沿着时间，回到问题发生的现场" description="每个节点同时保存地点、任务、观察与产出，使社会实践不止是一组照片，而是一条完整的研究证据链。" /></Reveal>
          <div className="relative mt-14">
            <div className="absolute bottom-0 left-[19px] top-0 w-px bg-gradient-to-b from-signal via-blue-200 to-transparent lg:left-1/2" />
            <div className="space-y-8 lg:space-y-12">
              {researchStops.map((stop, index) => (
                <Reveal key={stop.id} delay={index * .04}>
                  <article className={`relative grid lg:grid-cols-2 lg:gap-16 ${index % 2 ? "" : "lg:[&>div:first-child]:col-start-2"}`}>
                    <span className="absolute left-[12px] top-7 z-10 grid h-4 w-4 place-items-center rounded-full border-4 border-mist bg-signal ring-2 ring-blue-200 lg:left-1/2 lg:-translate-x-1/2" />
                    <div className={`ml-12 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:ml-0 ${index % 2 ? "lg:col-start-2" : "lg:row-start-1"}`}>
                      <div className="flex items-center justify-between gap-4 text-xs"><span className="font-semibold text-signal">{stop.province} · {stop.city}</span><time className="shrink-0 text-slate-400">{stop.date ? formatDate(stop.date) : "时间待补充"}</time></div>
                      <h3 className="mt-4 font-display text-2xl font-bold text-ink">{stop.title}</h3>
                      <p className="mt-3 leading-7 text-slate-600">{stop.summary}</p>
                      <div className="mt-5 flex flex-wrap gap-2">{stop.activities.map((activity) => <span key={activity} className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">{activity}</span>)}</div>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-space bg-white">
        <div className="container-page">
          <Reveal><SectionHeading eyebrow="Method" title="四项原则，让调研成果经得起时间" align="center" /></Reveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{researchPrinciples.map((item, index) => { const icons = [Route, MessageSquareText, Archive, Camera]; const Icon = icons[index]; return <Reveal key={item.number} delay={index * .05}><div className="h-full rounded-2xl border border-slate-200 p-6"><div className="flex items-center justify-between"><Icon className="h-5 w-5 text-signal" /><span className="font-display text-3xl text-slate-100">{item.number}</span></div><h3 className="mt-8 font-display text-2xl font-bold">{item.title}</h3><p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p></div></Reveal>; })}</div>
        </div>
      </section>
    </PageTransition>
  );
}
