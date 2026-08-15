"use client";

import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, Bot, ExternalLink, LoaderCircle, RotateCcw, Send, Sparkles, UserRound } from "lucide-react";
import Link from "next/link";
import { FormEvent, useState } from "react";

interface AnswerSource { id: string; title: string; category: string; url: string; excerpt: string; score: number }
interface AnswerData { answer: string; sources: AnswerSource[]; mode: "rag" | "retrieval"; notice: string }

const examples = ["AI 生成的农产品包装设计是否受到保护？", "非遗短视频应该如何保存创作证据？", "区域公用品牌授权需要注意什么？"];

export function AskPanel({ initialQuestion = "" }: { initialQuestion?: string }) {
  const [question, setQuestion] = useState(initialQuestion);
  const [submittedQuestion, setSubmittedQuestion] = useState("");
  const [result, setResult] = useState<AnswerData | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function ask(event?: FormEvent) {
    event?.preventDefault();
    const value = question.trim();
    if (value.length < 4 || loading) return;
    setLoading(true); setError(""); setResult(null); setSubmittedQuestion(value);
    try {
      const response = await fetch("/api/ai/ask", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ question: value }) });
      const data = await response.json() as AnswerData & { error?: string };
      if (!response.ok) throw new Error(data.error ?? "问答服务暂不可用");
      setResult(data);
    } catch (requestError) { setError(requestError instanceof Error ? requestError.message : "问答服务暂不可用"); }
    finally { setLoading(false); }
  }

  function reset() { setResult(null); setError(""); setQuestion(""); setSubmittedQuestion(""); }

  return (
    <div className="mx-auto max-w-5xl">
      {!result && !loading && !submittedQuestion && <div className="mb-8 text-center"><span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-blue-50 text-signal"><Bot className="h-7 w-7" /></span><h2 className="mt-5 font-display text-2xl font-bold text-ink">从一个具体问题开始</h2><p className="mt-2 text-sm text-slate-500">描述对象、使用场景和你的疑问，检索会更准确。</p></div>}
      <form onSubmit={ask} className="rounded-3xl border border-slate-200 bg-white p-4 shadow-soft sm:p-6">
        <label className="sr-only" htmlFor="ai-question">输入知识产权问题</label>
        <textarea id="ai-question" value={question} onChange={(event) => setQuestion(event.target.value)} rows={3} maxLength={500} placeholder="例如：我用 AI 生成了农产品品牌图案，又手工修改了字体和构图，这个设计可以获得保护吗？" className="w-full resize-none bg-transparent px-2 py-2 text-base leading-7 text-ink outline-none placeholder:text-slate-400 sm:text-lg" />
        <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-4"><span className="text-xs text-slate-400">{question.length} / 500</span><button type="submit" disabled={question.trim().length < 4 || loading} className="button-primary min-h-11 px-5 disabled:cursor-not-allowed disabled:opacity-50">{loading ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}{loading ? "检索资料中" : "发送问题"}</button></div>
      </form>
      {!result && !loading && <div className="mt-5 flex flex-wrap justify-center gap-2">{examples.map((example) => <button type="button" key={example} onClick={() => setQuestion(example)} className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs text-slate-600 transition hover:border-blue-300 hover:text-signal">{example}</button>)}</div>}

      <AnimatePresence mode="wait">
        {loading && <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mt-8 rounded-3xl border border-slate-200 bg-white p-7"><div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-50"><Sparkles className="h-5 w-5 animate-pulse text-signal" /></span><div><p className="font-semibold text-ink">正在从知识库寻找依据</p><p className="mt-1 text-xs text-slate-400">资料检索 → 相关性排序 → 生成回答</p></div></div><div className="mt-6 space-y-3"><span className="block h-3 w-full animate-pulse rounded bg-slate-100" /><span className="block h-3 w-5/6 animate-pulse rounded bg-slate-100" /><span className="block h-3 w-2/3 animate-pulse rounded bg-slate-100" /></div></motion.div>}
        {error && <motion.div key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-700"><p className="flex items-center gap-2 font-semibold"><AlertCircle className="h-4 w-4" />{error}</p><button type="button" onClick={() => ask()} className="mt-3 inline-flex items-center gap-1 font-semibold">重新尝试 <RotateCcw className="h-3.5 w-3.5" /></button></motion.div>}
        {result && <motion.div key="result" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="mt-8 space-y-5"><div className="rounded-2xl border border-slate-200 bg-white p-5"><div className="flex gap-3"><span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-slate-100"><UserRound className="h-4 w-4 text-slate-500" /></span><p className="pt-1 text-sm leading-6 text-slate-700">{submittedQuestion}</p></div></div><div className="rounded-3xl border border-blue-100 bg-[linear-gradient(145deg,#fff,#f5faff)] p-6 shadow-soft sm:p-8"><div className="flex items-center gap-3"><span className="grid h-9 w-9 place-items-center rounded-xl bg-ocean text-white"><Bot className="h-5 w-5" /></span><div><p className="font-display text-lg font-bold text-ink">知识库回答</p><p className="text-[11px] text-slate-400">{result.notice}</p></div></div><div className="mt-6 whitespace-pre-wrap text-[15px] leading-8 text-slate-700">{result.answer}</div><div className="mt-7 rounded-xl bg-amber-50 px-4 py-3 text-xs leading-6 text-amber-800">提示：回答用于公益普法与资料导航，不构成法律意见。涉及具体争议、合同或权利申请时，请咨询专业人士。</div></div>{result.sources.length > 0 && <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8"><div className="flex items-center justify-between"><h3 className="font-display text-xl font-bold">参考资料</h3><span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">{result.sources.length} 条已检索</span></div><div className="mt-5 grid gap-3 sm:grid-cols-2">{result.sources.map((source, index) => <Link key={source.id} href={source.url} className="group rounded-2xl border border-slate-200 p-5 transition hover:border-blue-200 hover:bg-blue-50/50"><div className="flex items-center justify-between"><span className="text-xs font-bold text-signal">资料 {index + 1}</span><ExternalLink className="h-3.5 w-3.5 text-slate-300 group-hover:text-signal" /></div><h4 className="mt-2 font-display font-bold text-ink">{source.title}</h4><p className="mt-2 line-clamp-2 text-xs leading-5 text-slate-500">{source.excerpt}</p></Link>)}</div></div>}<div className="text-center"><button type="button" onClick={reset} className="inline-flex items-center gap-2 text-sm font-semibold text-signal"><RotateCcw className="h-4 w-4" />换一个问题</button></div></motion.div>}
      </AnimatePresence>
    </div>
  );
}
