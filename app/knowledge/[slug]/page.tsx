import type { Metadata } from "next";
import { ArrowLeft, Bot, CalendarDays, Clock3, Download, Info } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { PageTransition } from "@/components/motion/page-transition";
import { knowledgeArticles } from "@/content";
import { formatDate } from "@/lib/utils";

export function generateStaticParams() { return knowledgeArticles.map((article) => ({ slug: article.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const { slug } = await params; const article = knowledgeArticles.find((item) => item.slug === slug); return article ? { title: article.title, description: article.summary } : {}; }

export default async function KnowledgeDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = knowledgeArticles.find((item) => item.slug === slug);
  if (!article) notFound();
  return (
    <PageTransition>
      <article className="bg-white pt-[76px]">
        <header className="border-b border-slate-200 bg-mist"><div className="mx-auto max-w-4xl px-5 py-14 sm:px-8 sm:py-20"><Link href="/knowledge" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-signal"><ArrowLeft className="h-4 w-4" />返回知识库</Link><div className="mt-9 flex flex-wrap items-center gap-2 text-xs"><span className="rounded-full bg-blue-100 px-3 py-1.5 font-semibold text-blue-700">{article.category}</span><span className="rounded-full bg-white px-3 py-1.5 text-slate-500">{article.type}</span></div><h1 className="mt-6 text-balance font-display text-4xl font-bold leading-tight text-ink sm:text-5xl">{article.title}</h1><p className="mt-5 text-lg leading-8 text-slate-600">{article.summary}</p><div className="mt-7 flex flex-wrap gap-5 text-xs text-slate-400"><span className="flex items-center gap-1.5"><CalendarDays className="h-4 w-4" />更新于 {formatDate(article.updatedAt)}</span><span className="flex items-center gap-1.5"><Clock3 className="h-4 w-4" />阅读约 {article.readingTime} 分钟</span></div></div></header>
        <div className="mx-auto grid max-w-5xl gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[1fr_240px] lg:py-20"><div className="prose-fazhi"><ReactMarkdown remarkPlugins={[remarkGfm]}>{article.body}</ReactMarkdown></div><aside className="space-y-4 lg:sticky lg:top-28 lg:self-start"><div className="rounded-2xl border border-blue-100 bg-blue-50 p-5"><Info className="h-5 w-5 text-signal" /><p className="mt-3 text-sm font-bold text-ocean">使用说明</p><p className="mt-2 text-xs leading-6 text-slate-600">内容用于公益普法与学习交流，不构成针对个案的法律意见。法条与政策请以现行官方文本为准。</p></div>{article.resourceUrl && <a href={article.resourceUrl} download className="button-secondary w-full"><Download className="h-4 w-4" />下载配套资料</a>}<Link href={`/ai?q=${encodeURIComponent(article.title)}`} className="button-primary w-full"><Bot className="h-4 w-4" />就此主题提问</Link><div className="flex flex-wrap gap-2 pt-2">{article.tags.map((tag) => <span key={tag} className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-500">#{tag}</span>)}</div></aside></div>
      </article>
    </PageTransition>
  );
}
