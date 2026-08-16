import type { Metadata } from "next";
import { ArrowRight, FileText } from "lucide-react";
import Link from "next/link";
import { PageTransition } from "@/components/motion/page-transition";
import { policySections } from "@/content";

export const metadata: Metadata = {
  title: "政策建议",
  description: "农文旅根据论文得出的政策建议，按文档大标题分类呈现。",
};

const policyGroups = [1, 2, 3].map((group) =>
  policySections.filter((section) => section.group === group),
);

export default function PoliciesPage() {
  return (
    <PageTransition>
      <header className="relative overflow-hidden border-b border-slate-200 bg-mist pt-[76px]">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(14,165,233,0.14),transparent_32%),radial-gradient(circle_at_18%_82%,rgba(16,185,129,0.10),transparent_30%)]"
          aria-hidden="true"
        />
        <div className="container-page relative py-14 sm:py-20">
          <div className="flex max-w-3xl items-center gap-3 text-sm font-semibold uppercase tracking-[0.2em] text-signal">
            <FileText className="h-5 w-5" aria-hidden="true" />
            Policy proposals
          </div>
          <h1 className="mt-5 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            政策建议
          </h1>
        </div>
      </header>

      <main className="bg-white py-12 sm:py-16 lg:py-20">
        <div className="container-page space-y-12 sm:space-y-16">
          {policyGroups.map((sections, groupIndex) => (
            <section
              key={groupIndex}
              aria-label={`第${groupIndex + 1}组政策建议`}
              className={groupIndex === 0 ? "" : "border-t border-slate-200 pt-12 sm:pt-16"}
            >
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {sections.map((section) => (
                  <div key={section.slug} className="min-w-0 h-full">
                    <Link
                      href={`/policies/${section.slug}`}
                      className="group flex h-full min-h-48 min-w-0 flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-sky-200 hover:shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-4 sm:p-7"
                    >
                      <span className="font-mono text-xs font-semibold tracking-[0.18em] text-slate-400">
                        {String(section.order).padStart(2, "0")}
                      </span>
                      <h2 className="mt-5 break-words font-display text-xl font-bold leading-8 text-ocean [overflow-wrap:anywhere] sm:text-2xl sm:leading-9">
                        {section.title}
                      </h2>
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
