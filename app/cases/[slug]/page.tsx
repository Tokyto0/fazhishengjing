import type { Metadata } from "next";
import { ArrowLeft, BookOpenText } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageTransition } from "@/components/motion/page-transition";
import { caseSections } from "@/content";

export function generateStaticParams() {
  return caseSections.map((section) => ({ slug: section.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const section = caseSections.find((item) => item.slug === slug);
  const description = section?.blocks.find(
    (block) => block.kind === "paragraph",
  );

  return section
    ? {
        title: `${section.title}｜典型案例库`,
        description: description?.kind === "paragraph" ? description.text : section.title,
      }
    : {};
}

export default async function CaseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const section = caseSections.find((item) => item.slug === slug);

  if (!section) {
    notFound();
  }

  return (
    <PageTransition>
      <article className="bg-white pt-[76px]">
        <header className="relative overflow-hidden border-b border-slate-200 bg-mist">
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(14,165,233,0.13),transparent_32%)]"
            aria-hidden="true"
          />
          <div className="mx-auto max-w-4xl px-5 py-12 sm:px-8 sm:py-16 lg:py-20">
            <Link
              href="/cases"
              className="relative inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-signal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-4"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              返回案例库
            </Link>
            <div className="relative mt-9 flex items-center gap-3 text-sm font-semibold text-signal">
              <BookOpenText className="h-5 w-5" aria-hidden="true" />
              <span>案例专题 {String(section.order).padStart(2, "0")}</span>
            </div>
            <h1 className="relative mt-5 break-words font-display text-3xl font-bold leading-tight text-ink [overflow-wrap:anywhere] sm:text-4xl lg:text-5xl">
              {section.title}
            </h1>
          </div>
        </header>

        <div className="mx-auto min-w-0 max-w-4xl overflow-hidden px-5 py-12 sm:px-8 sm:py-16 lg:py-20">
          <div className="space-y-6 sm:space-y-7">
            {section.blocks.map((block, index) => {
              if (block.kind === "subheading") {
                return (
                  <h2
                    key={index}
                    className="border-l-4 border-signal pl-4 font-display text-2xl font-bold leading-relaxed text-ink sm:text-3xl"
                  >
                    {block.text}
                  </h2>
                );
              }

              if (block.kind === "table") {
                const [header, ...rows] = block.rows;

                return (
                  <div
                    key={index}
                    className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm"
                  >
                    <table className="min-w-[720px] w-full border-collapse text-left text-sm leading-7 sm:text-base">
                      <thead className="bg-ocean text-white">
                        <tr>
                          {header.map((cell, cellIndex) => (
                            <th
                              key={cellIndex}
                              scope="col"
                              className="border-r border-white/15 px-4 py-3 font-semibold last:border-r-0"
                            >
                              {cell}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {rows.map((row, rowIndex) => (
                          <tr
                            key={rowIndex}
                            className="border-t border-slate-200 even:bg-slate-50"
                          >
                            {row.map((cell, cellIndex) => (
                              <td
                                key={cellIndex}
                                className="whitespace-pre-wrap border-r border-slate-200 px-4 py-3 align-top text-slate-700 last:border-r-0"
                              >
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                );
              }

              return (
                <p
                  key={index}
                  className="break-words whitespace-pre-wrap text-justify text-base leading-8 text-slate-700 [overflow-wrap:anywhere] sm:text-lg sm:leading-9"
                >
                  {block.text}
                </p>
              );
            })}
          </div>
        </div>
      </article>
    </PageTransition>
  );
}

