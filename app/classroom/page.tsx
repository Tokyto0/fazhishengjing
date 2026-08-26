import type { Metadata } from "next";
import {
  ArrowRight,
  BookOpenText,
  ExternalLink,
  FileText,
  GraduationCap,
  Library,
  PlayCircle,
  Search,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { PageTransition } from "@/components/motion/page-transition";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/section-heading";
import { StatusPill } from "@/components/status-pill";
import { classroomResources } from "@/content";

export const metadata: Metadata = {
  title: "普法云课堂",
  description: "在线阅读知识产权课程、实务指南与农文旅知识产权研究文献。",
};

const learningPath = [
  { title: "入门", text: "认识乡村经营中的商标、版权与授权边界" },
  { title: "实务", text: "把规范用标、发布审查和过程记录落到清单" },
  { title: "研究", text: "阅读论文原文，追溯政策建议和案例分析依据" },
];

export default function ClassroomPage() {
  const lessons = classroomResources.filter((resource) => resource.format === "文章");
  const papers = classroomResources.filter((resource) => resource.format === "PDF");

  return (
    <PageTransition>
      <PageHero
        eyebrow="Public legal classroom"
        title="从普法入门，到论文原文阅读"
        description="云课堂把短课程、实务手册和研究文献放在同一条学习路径上：先建立基本判断，再回到原文材料中核验依据。"
        aside={
          <div className="rounded-2xl border border-white bg-white/80 p-6 shadow-soft backdrop-blur">
            <GraduationCap className="h-6 w-6 text-signal" />
            <p className="mt-4 font-display text-2xl font-bold text-ocean">开放学习</p>
            <p className="mt-1 text-sm text-slate-500">课程 · 指南 · 论文</p>
          </div>
        }
      />

      <section className="border-b border-slate-200 bg-white py-10">
        <div className="container-page grid gap-4 md:grid-cols-3">
          {learningPath.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.05}>
              <div className="grid h-full grid-cols-[44px_1fr] gap-4 rounded-2xl border border-slate-200 bg-white p-5">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-ocean text-sm font-bold text-white">
                  0{index + 1}
                </span>
                <div>
                  <h2 className="font-display text-xl font-bold text-ink">{item.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-500">{item.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-space bg-mist">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow="Guided learning"
              title="先用四份材料建立行动框架"
              description="这些内容适合快速进入主题：从商标注册、地理标志、非遗保护到 AI 辅助创作记录，形成可执行的基础方法。"
            />
          </Reveal>

          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {lessons.map((resource, index) => {
              const Icon = resource.kind === "课程" ? PlayCircle : BookOpenText;
              return (
                <Reveal key={resource.slug} delay={index * 0.05}>
                  <Link
                    href={`/knowledge/${resource.articleSlug}`}
                    className="group flex h-full min-h-[330px] flex-col rounded-2xl border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-soft"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <span className="grid h-11 w-11 place-items-center rounded-xl bg-blue-50 text-signal">
                        <Icon className="h-5 w-5" />
                      </span>
                      <StatusPill available>可在线阅读</StatusPill>
                    </div>
                    <div className="mt-7 flex flex-wrap items-center gap-2 text-xs text-slate-400">
                      <span>{resource.kind}</span>
                      <span>·</span>
                      <span>{resource.level}</span>
                      <span>·</span>
                      <span>{resource.duration}</span>
                    </div>
                    <h3 className="mt-3 font-display text-2xl font-bold leading-tight text-ink transition group-hover:text-signal">
                      {resource.title}
                    </h3>
                    <p className="mt-4 flex-1 text-sm leading-7 text-slate-600">{resource.summary}</p>
                    <span className="mt-7 inline-flex items-center gap-2 border-t border-slate-100 pt-5 text-sm font-semibold text-signal">
                      进入阅读
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-space bg-white">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-[.72fr_1.28fr]">
            <Reveal>
              <div className="lg:sticky lg:top-28">
                <div className="mb-5 flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-ocean text-white">
                    <Library className="h-5 w-5" />
                  </span>
                  <span className="eyebrow mb-0">Reading room</span>
                </div>
                <h2 className="font-display text-4xl font-bold leading-tight text-ink">
                  论文资料阅览室
                </h2>
                <p className="mt-5 text-lg leading-8 text-slate-600">
                  这里集中放置农文旅、AIGC、知识产权与数字治理相关论文原文。文档名即为阅读入口，打开后进入浏览器 PDF 阅读页。
                </p>
                <div className="mt-8 grid gap-3 text-sm text-slate-600 sm:grid-cols-3 lg:grid-cols-1">
                  <div className="flex items-center gap-3 rounded-xl bg-mist px-4 py-3">
                    <FileText className="h-4 w-4 text-signal" />
                    <span>{papers.length} 篇 PDF 原文</span>
                  </div>
                  <div className="flex items-center gap-3 rounded-xl bg-mist px-4 py-3">
                    <Search className="h-4 w-4 text-signal" />
                    <span>按主题快速定位</span>
                  </div>
                  <div className="flex items-center gap-3 rounded-xl bg-mist px-4 py-3">
                    <Sparkles className="h-4 w-4 text-signal" />
                    <span>支撑政策与案例研究</span>
                  </div>
                </div>
              </div>
            </Reveal>

            <div className="space-y-3">
              {papers.map((resource, index) => (
                <Reveal key={resource.slug} delay={index * 0.025}>
                  <article className="group rounded-2xl border border-slate-200 bg-white p-5 transition duration-300 hover:border-blue-200 hover:shadow-soft sm:p-6">
                    <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                      <div className="min-w-0">
                        <div className="mb-3 flex flex-wrap items-center gap-2 text-xs">
                          <span className="rounded-full bg-blue-50 px-3 py-1 font-semibold text-blue-700">
                            {resource.theme}
                          </span>
                          <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-500">
                            {resource.author}
                          </span>
                        </div>
                        <h3 className="break-words font-display text-xl font-bold leading-8 text-ink [overflow-wrap:anywhere]">
                          <Link
                            href={resource.resourceUrl!}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="transition hover:text-signal"
                          >
                            {resource.title}
                          </Link>
                        </h3>
                        <p className="mt-3 text-sm leading-7 text-slate-600">{resource.summary}</p>
                      </div>
                      <Link
                        href={resource.resourceUrl!}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`打开 PDF：${resource.title}`}
                        className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-signal transition hover:border-signal hover:bg-blue-50"
                      >
                        PDF 阅读
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-mist py-16">
        <Reveal className="container-page">
          <div className="grid gap-8 bg-ink p-8 text-white sm:p-12 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="eyebrow text-blue-300">Knowledge to action</p>
              <h2 className="mt-4 font-display text-3xl font-bold">读完材料，再回到知识库形成清单</h2>
              <p className="mt-4 max-w-2xl leading-7 text-slate-300">
                知识库把论文、法条和案例转化为更适合实践使用的流程化指南。
              </p>
            </div>
            <Link
              href="/knowledge"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-ocean"
            >
              进入知识库
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </section>
    </PageTransition>
  );
}
