"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Search } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { caseCategories, cases } from "@/content";
import { cn } from "@/lib/utils";

export function CaseFilter() {
  const [category, setCategory] = useState("全部");
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => cases.filter((item) => {
    const inCategory = category === "全部" || item.category === category;
    const text = `${item.title}${item.summary}${item.tags.join("")}`.toLowerCase();
    return inCategory && text.includes(query.trim().toLowerCase());
  }), [category, query]);

  return (
    <div>
      <div className="flex flex-col gap-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm lg:flex-row lg:items-center lg:justify-between">
        <div className="flex gap-2 overflow-x-auto pb-1 lg:pb-0" role="tablist" aria-label="案例分类">
          {caseCategories.map((item) => <button key={item} type="button" role="tab" aria-selected={category === item} onClick={() => setCategory(item)} className={cn("shrink-0 rounded-full px-4 py-2 text-sm font-medium transition", category === item ? "bg-ocean text-white" : "bg-slate-50 text-slate-600 hover:bg-blue-50 hover:text-signal")}>{item}</button>)}
        </div>
        <label className="flex min-w-0 items-center gap-2 rounded-xl border border-slate-200 px-3 py-2.5 lg:w-64"><Search className="h-4 w-4 shrink-0 text-slate-400" /><span className="sr-only">搜索案例</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="搜索标题或关键词" className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-slate-400" /></label>
      </div>
      <p className="mb-5 mt-8 text-sm text-slate-500">共找到 <strong className="text-ink">{filtered.length}</strong> 个案例</p>
      <motion.div layout className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((item, index) => (
            <motion.article key={item.slug} layout initial={{ opacity: 0, scale: .97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: .97 }} transition={{ duration: .22 }} className={cn("group overflow-hidden rounded-2xl border bg-white transition hover:-translate-y-1 hover:shadow-soft", index === 0 && category === "全部" ? "border-blue-200 md:col-span-2 lg:col-span-2" : "border-slate-200")}>
              <Link href={`/cases/${item.slug}`} className="flex h-full min-h-[320px] flex-col p-7">
                <div className="flex items-start justify-between gap-4"><span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">{item.category}</span><ArrowUpRight className="h-5 w-5 text-slate-300 transition group-hover:text-signal" /></div>
                <h2 className={cn("mt-7 text-balance font-display font-bold leading-tight text-ink transition group-hover:text-signal", index === 0 && category === "全部" ? "text-3xl" : "text-2xl")}>{item.title}</h2>
                <p className="mt-4 flex-1 leading-7 text-slate-600">{item.summary}</p>
                <div className="mt-7 flex flex-wrap items-center gap-2 border-t border-slate-100 pt-5">{item.tags.map((tag) => <span key={tag} className="text-xs text-slate-400">#{tag}</span>)}<span className="ml-auto text-xs text-slate-400">{item.region} · {item.year}</span></div>
              </Link>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>
      {filtered.length === 0 && <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-20 text-center"><p className="font-display text-xl font-bold text-ink">没有匹配的案例</p><p className="mt-2 text-sm text-slate-500">试试更换分类或缩短关键词。</p></div>}
    </div>
  );
}
