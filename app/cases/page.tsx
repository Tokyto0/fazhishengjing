import type { Metadata } from "next";
import { ArrowRight, Layers3 } from "lucide-react";
import Link from "next/link";
import { PageTransition } from "@/components/motion/page-transition";
import { caseSections } from "@/content";

export const metadata: Metadata = {
  title: "典型案例库",
  description: "按文档大标题分类呈现知识产权核心法条与典型案例。",
};

const caseGroups = [1, 2].map((group) =>
  caseSections.filter((section) => section.group === group),
);

export default function CasesPage() {
  return (
    <PageTransition>
      <header className="relative overflow-hidden border-b border-slate-200 bg-mist pt-[76px]">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(14,165,233,0.14),transparent_32%),radial-gradient(circle_at_18%_82%,rgba(16,185,129,0.10),transparent_30%)]"
          aria-hidden="true"
        />
        <div className="container-page relative py-14 sm:py-20">
          <div className="flex max-w-3xl items-center gap-3 text-sm font-semibold uppercase tracking-[0.2em] text-signal">
            <Layers3 className="h-5 w-5" aria-hidden="true" />
            Case library
          </div>
          <h1 className="mt-5 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            典型案例库
          </h1>
        </div>
      </header>

      <main className="bg-white py-12 sm:py-16 lg:py-20">
        <div className="container-page space-y-12 sm:space-y-16">
          {caseGroups.map((sections, groupIndex) => (
            <section
              key={groupIndex}
              aria-label={`第${groupIndex + 1}组案例与法条`}
              className={groupIndex === 0 ? "" : "border-t border-slate-200 pt-12 sm:pt-16"}
            >
              {sections[0]?.groupHeading && (
                <h2 className="mb-8 max-w-4xl font-display text-2xl font-bold leading-relaxed text-ink sm:text-3xl">
                  {sections[0].groupHeading}
                </h2>
              )}
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {sections.map((section) => (
                  <div key={section.slug} className="h-full min-w-0">
                    <Link
                      href={`/cases/${section.slug}`}
                      className="group flex h-full min-h-48 min-w-0 flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-sky-200 hover:shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-4 sm:p-7"
                    >
                      <span className="font-mono text-xs font-semibold tracking-[0.18em] text-slate-400">
                        {String(section.order).padStart(2, "0")}
                      </span>
                      <h3 className="mt-5 break-words font-display text-xl font-bold leading-8 text-ocean [overflow-wrap:anywhere] sm:text-2xl sm:leading-9">
                        {section.title}
                      </h3>
                      <span className="mt-auto inline-flex items-center gap-2 pt-7 text-sm font-semibold text-signal">
                        查看具体内容
                        <ArrowRight
                          className="h-4 w-4 transition-transform group-hover:translate-x-1"
                          aria-hidden="true"
                        />
                      </span>
                    </Link>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
    </PageTransition>
  );
}

