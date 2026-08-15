"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CalendarDays, CheckCircle2, MapPin, Route } from "lucide-react";
import { useState } from "react";
import { researchStops } from "@/content";
import { formatDate } from "@/lib/utils";

export function ChinaMap() {
  const [selectedId, setSelectedId] = useState(researchStops[0].id);
  const selected = researchStops.find((item) => item.id === selectedId) ?? researchStops[0];

  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_.9fr]">
      <div className="relative min-h-[520px] overflow-hidden rounded-3xl border border-slate-200 bg-[linear-gradient(145deg,#071426,#0b3261)] p-5 shadow-soft sm:p-8">
        <div className="absolute inset-0 bg-grid bg-[length:38px_38px] opacity-20" />
        <div className="relative flex items-center justify-between">
          <div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-300">Research map</p><h2 className="mt-1 font-display text-2xl font-bold text-white">四省实践坐标</h2></div>
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-300"><span className="h-2 w-2 animate-pulse rounded-full bg-mint" />实践档案</div>
        </div>
        <div className="relative mt-5 aspect-[1.16/1] w-full">
          <svg viewBox="0 0 100 86" className="absolute inset-0 h-full w-full" role="img" aria-label="中国地图示意，标注浙江、福建、四川、陕西四个调研省份">
            <defs><linearGradient id="map-fill" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#163f70" /><stop offset="1" stopColor="#0d294d" /></linearGradient></defs>
            <path d="M13 35l7-7 8-2 3-7 10-2 6-8 7 4 8-1 7 8 10 1 3 6 10 6-4 7 5 5-8 4-2 8-7 2-3 9-10 1-4 8-10-3-9 2-7-7-11-2 1-9-7-7 5-7-8-5z" fill="url(#map-fill)" stroke="#4d82b8" strokeWidth=".6" />
            <path d="M19 35c18 5 34-2 55-14M29 66c18-13 38-18 58-17M50 13c-3 23-2 43 2 62" fill="none" stroke="#76baff" strokeOpacity=".12" strokeWidth=".5" />
            {researchStops.map((stop) => {
              const active = stop.id === selectedId;
              return (
                <g key={stop.id} className="cursor-pointer" onClick={() => setSelectedId(stop.id)} role="button" tabIndex={0} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") setSelectedId(stop.id); }} aria-label={`查看${stop.province}调研`}>
                  <circle cx={stop.coordinate.x} cy={stop.coordinate.y} r={active ? 4.4 : 3.4} fill="#1687ff" opacity={active ? .25 : .12}><animate attributeName="r" values={active ? "3;5;3" : "3;3.6;3"} dur="2s" repeatCount="indefinite" /></circle>
                  <circle cx={stop.coordinate.x} cy={stop.coordinate.y} r={active ? 2.1 : 1.5} fill={active ? "#20c997" : "#76baff"} stroke="#fff" strokeWidth=".55" />
                  <text x={stop.coordinate.x + 3.3} y={stop.coordinate.y - 2.3} fill={active ? "#fff" : "#b8d4ef"} fontSize="3.2" fontWeight="600">{stop.province}</text>
                </g>
              );
            })}
          </svg>
        </div>
        <div className="relative grid grid-cols-4 gap-2">
          {researchStops.map((stop, index) => (
            <button key={stop.id} type="button" onClick={() => setSelectedId(stop.id)} className={`rounded-xl border px-2 py-3 text-center text-xs transition ${stop.id === selectedId ? "border-mint/50 bg-mint/10 text-white" : "border-white/10 bg-white/5 text-slate-400 hover:bg-white/10"}`}>
              <span className="mb-1 block text-[10px] opacity-60">0{index + 1}</span>{stop.province}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.article key={selected.id} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: .25 }} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-bold tracking-wider text-blue-700">{selected.province}站</span>
            <span className="flex items-center gap-1.5 text-xs text-slate-500"><CalendarDays className="h-4 w-4" />{formatDate(selected.date)}</span>
          </div>
          <h3 className="mt-7 font-display text-3xl font-bold leading-tight text-ink">{selected.title}</h3>
          <p className="mt-3 flex items-center gap-2 text-sm font-medium text-signal"><MapPin className="h-4 w-4" />{selected.city}</p>
          <p className="mt-5 leading-8 text-slate-600">{selected.summary}</p>
          <div className="mt-7 rounded-2xl bg-mist p-5"><p className="text-xs font-bold uppercase tracking-wider text-slate-400">调研焦点</p><p className="mt-2 font-semibold text-ocean">{selected.focus}</p></div>
          <div className="mt-7 grid gap-6 sm:grid-cols-2">
            <div>
              <p className="mb-3 flex items-center gap-2 text-sm font-bold text-ink"><Route className="h-4 w-4 text-signal" />现场活动</p>
              <ul className="space-y-2 text-sm leading-6 text-slate-600">{selected.activities.map((item) => <li key={item} className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-300" />{item}</li>)}</ul>
            </div>
            <div>
              <p className="mb-3 flex items-center gap-2 text-sm font-bold text-ink"><CheckCircle2 className="h-4 w-4 text-mint" />阶段产出</p>
              <ul className="space-y-2 text-sm leading-6 text-slate-600">{selected.outcomes.map((item) => <li key={item} className="flex gap-2"><span className="mt-1"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /></span>{item}</li>)}</ul>
            </div>
          </div>
        </motion.article>
      </AnimatePresence>
    </div>
  );
}
