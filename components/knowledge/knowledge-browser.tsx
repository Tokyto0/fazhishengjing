"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, BookOpen, FileSearch, Search, Timer } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { knowledgeArticles, knowledgeCategories } from "@/content";
import { cn } from "@/lib/utils";

export function KnowledgeBrowser() {
  const [category, setCategory] = useState("全部");
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => knowledgeArticles.filter((article) => {
    const categoryMatch = category === "全部" || article.category === category;
    const haystack = `${article.title}${article.summary}${article.tags.join("")}`.toLowerCase();
    return categoryMatch && haystack.includes(query.trim().toLowerCase());
  }), [category, query]);

  return (
    <div className="grid gap-8 lg:grid-cols-[250px_1fr]">
      <aside className="lg:sticky lg:top-28 lg:self-start">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="px-3 pb-3 pt-1 text-xs font-bold uppercase tracking-[.18em] text-slate-400">知识分类</p>
          <div className="space-y-1">{knowledgeCategories.map((item) => <button key={item} type="button" onClick={() => setCategory(item)} className={cn("flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-sm font-medium transition", category === item ? "bg-ocean text-white" : "text-slate-600 hover:bg-slate-50 hover:text-ink")}><span>{item}</span><span className={cn("text-xs", category === item ? "text-blue-200" : "text-slate-300")}>{item === "全部" ? knowledgeArticles.length : knowledgeArticles.filter((article) => article.category === item).length}</span></button>)}</div>
        </div>
        <div className="mt-4 rounded-2xl bg-blue-50 p-5"><FileSearch className="h-5 w-5 text-signal" /><p className="mt-3 text-sm font-bold text-ocean">找不到答案？</p><p className="mt-1 text-xs leading-5 text-slate-500">试试基于知识库资料的 AI 问答。</p><Link href="/ai" className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-signal">前往提问 <ArrowRight className="h-3.5 w-3.5" /></Link></div>
      </aside>
      <div>
        <label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm"><Search className="h-5 w-5 text-slate-400" /><span className="sr-only">搜索知识库</span><input value={query} onChange={(event) => setQuery(event.target.value)} className="min-w-0 flex-1 bg-transparent text-base outline-none placeholder:text-slate-400" placeholder="搜索主题、关键词或问题，例如“AI 创作记录”" /><kbd className="hidden rounded border border-slate-200 bg-slate-50 px-2 py-1 text-[10px] text-slate-400 sm:block">{filtered.length} 条</kbd></label>
        <div className="mt-6 grid gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((article) => <motion.article layout key={article.slug} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="group rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-blue-200 hover:shadow-soft sm:p-7"><Link href={`/knowledge/${article.slug}`}><div className="flex flex-wrap items-center gap-2 text-xs"><span className="rounded-full bg-blue-50 px-3 py-1 font-semibold text-blue-700">{article.category}</span><span className="rounded-full bg-slate-100 px-3 py-1 text-slate-500">{article.type}</span><span className="ml-auto flex items-center gap-1 text-slate-400"><Timer className="h-3.5 w-3.5" />{article.readingTime} 分钟</span></div><h2 className="mt-5 font-display text-2xl font-bold text-ink transition group-hover:text-signal">{article.title}</h2><p className="mt-3 leading-7 text-slate-600">{article.summary}</p><div className="mt-5 flex items-end justify-between"><div className="flex flex-wrap gap-x-3 gap-y-1">{article.tags.map((tag) => <span key={tag} className="text-xs text-slate-400">#{tag}</span>)}</div><ArrowRight className="h-5 w-5 shrink-0 text-slate-300 transition group-hover:translate-x-1 group-hover:text-signal" /></div></Link></motion.article>)}
          </AnimatePresence>
        </div>
        {filtered.length === 0 && <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-white py-20 text-center"><BookOpen className="mx-auto h-8 w-8 text-slate-300" /><p className="mt-4 font-display text-xl font-bold">暂无匹配内容</p><button type="button" onClick={() => { setQuery(""); setCategory("全部"); }} className="mt-3 text-sm font-semibold text-signal">清除筛选</button></div>}
      </div>
    </div>
  );
}
