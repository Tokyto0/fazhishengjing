import type { Metadata } from "next";
import { ArrowLeft, BookOpenText } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageTransition } from "@/components/motion/page-transition";
import { policySections } from "@/content";

export function generateStaticParams() {
  return policySections.map((section) => ({ slug: section.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const section = policySections.find((item) => item.slug === slug);

  return section
    ? {
        title: `${section.title}｜政策建议`,
        description: section.paragraphs[0],
      }
    : {};
}

export default async function PolicyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const section = policySections.find((item) => item.slug === slug);

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
              href="/policies"
              className="relative inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-signal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-4"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              返回政策建议
            </Link>
            <div className="relative mt-9 flex items-center gap-3 text-sm font-semibold text-signal">
              <BookOpenText className="h-5 w-5" aria-hidden="true" />
              <span>政策建议 {String(section.order).padStart(2, "0")}</span>
            </div>
            <h1 className="relative mt-5 text-balance font-display text-3xl font-bold leading-tight text-ink sm:text-4xl lg:text-5xl">
              {section.title}
            </h1>
          </div>
        </header>

        <div className="mx-auto min-w-0 max-w-4xl overflow-hidden px-5 py-12 sm:px-8 sm:py-16 lg:py-20">
          <div className="space-y-6 sm:space-y-7">
            {section.paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className="break-words whitespace-pre-wrap text-justify text-base leading-8 text-slate-700 [overflow-wrap:anywhere] sm:text-lg sm:leading-9"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </article>
    </PageTransition>
  );
}
