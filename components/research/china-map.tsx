"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CalendarDays, CheckCircle2, MapPin, Radar, Route, Sparkles } from "lucide-react";
import { useState } from "react";
import { researchStops } from "@/content";
import { formatDate } from "@/lib/utils";

const routePath = researchStops
  .map((stop, index) => `${index === 0 ? "M" : "L"} ${stop.coordinate.x} ${stop.coordinate.y}`)
  .join(" ");

const labelPlacement: Record<string, { dx: number; dy: number; anchor: "start" | "end" }> = {
  shandong: { dx: 4, dy: -3, anchor: "start" },
  guangdong: { dx: 4, dy: 4, anchor: "start" },
  hunan: { dx: 4, dy: -3, anchor: "start" },
  ningxia: { dx: -4, dy: -3, anchor: "end" },
  heilongjiang: { dx: -4, dy: 4, anchor: "end" },
};

export function ChinaMap() {
  const [selectedId, setSelectedId] = useState(researchStops[0].id);
  const selected = researchStops.find((item) => item.id === selectedId) ?? researchStops[0];
  const selectedIndex = researchStops.findIndex((item) => item.id === selected.id);

  return (
    <div className="grid gap-7 lg:grid-cols-[1.12fr_.88fr]">
      <div className="relative min-h-[570px] overflow-hidden rounded-[28px] border border-blue-900/60 bg-[#06172c] p-5 shadow-[0_30px_80px_rgba(7,20,38,.18)] sm:p-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_76%_16%,rgba(22,135,255,.22),transparent_32%),radial-gradient(circle_at_18%_86%,rgba(32,201,151,.13),transparent_28%)]" />
        <div className="absolute inset-0 bg-grid bg-[length:38px_38px] opacity-[0.12] [mask-image:linear-gradient(to_bottom,black,transparent)]" />
        <div className="absolute -right-16 top-24 h-44 w-44 rounded-full border border-blue-400/10" />
        <div className="absolute -right-4 top-36 h-28 w-28 rounded-full border border-blue-400/10" />

        <div className="relative z-10 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.24em] text-blue-300">
              <Radar className="h-3.5 w-3.5" /> Research map
            </div>
            <h2 className="mt-2 font-display text-2xl font-bold text-white sm:text-3xl">五省区实践坐标</h2>
            <p className="mt-2 text-xs text-slate-400">山东 · 广东 · 湖南 · 宁夏 · 黑龙江</p>
          </div>
          <div className="shrink-0 rounded-full border border-mint/20 bg-mint/10 px-3 py-2 text-[11px] font-semibold text-emerald-200">
            <span className="mr-2 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-mint shadow-[0_0_12px_#20c997]" />
            五地联动
          </div>
        </div>

        <div className="relative z-10 mx-auto mt-3 aspect-[1.28/1] w-full max-w-[700px]">
          <svg
            viewBox="0 0 120 90"
            className="absolute inset-0 h-full w-full"
            role="img"
            aria-label="中国地图示意，标注山东省、广东省、湖南省、宁夏回族自治区和黑龙江省五个调研地区"
          >
            <defs>
              <linearGradient id="map-fill" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#173f70" />
                <stop offset="0.58" stopColor="#0e3159" />
                <stop offset="1" stopColor="#0a2545" />
              </linearGradient>
              <linearGradient id="route-stroke" x1="0" y1="0" x2="1" y2="1">
                <stop stopColor="#20c997" />
                <stop offset="0.48" stopColor="#55a7ff" />
                <stop offset="1" stopColor="#9bc9ff" />
              </linearGradient>
              <filter id="map-shadow" x="-30%" y="-30%" width="160%" height="160%">
                <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#020b17" floodOpacity=".55" />
              </filter>
              <filter id="marker-glow" x="-300%" y="-300%" width="700%" height="700%">
                <feGaussianBlur stdDeviation="2.2" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
              <pattern id="map-dots" width="3" height="3" patternUnits="userSpaceOnUse">
                <circle cx=".8" cy=".8" r=".22" fill="#76baff" opacity=".24" />
              </pattern>
            </defs>

            <path
              d="M14 31 20 23 29 21 35 14 45 12 51 7 59 10 68 7 77 12 90 10 98 15 99 22 108 28 104 35 112 41 106 48 101 51 100 58 92 61 88 68 80 70 77 79 69 82 62 78 53 82 48 75 38 77 34 70 26 68 28 58 21 54 23 46 15 41 19 35Z"
              fill="url(#map-fill)"
              stroke="#5e92c8"
              strokeWidth=".65"
              strokeLinejoin="round"
              filter="url(#map-shadow)"
            />
            <path
              d="M14 31 20 23 29 21 35 14 45 12 51 7 59 10 68 7 77 12 90 10 98 15 99 22 108 28 104 35 112 41 106 48 101 51 100 58 92 61 88 68 80 70 77 79 69 82 62 78 53 82 48 75 38 77 34 70 26 68 28 58 21 54 23 46 15 41 19 35Z"
              fill="url(#map-dots)"
              opacity=".65"
            />

            <g fill="none" stroke="#8db9e5" strokeWidth=".38" strokeOpacity=".16">
              <path d="M20 34 Q45 29 68 9" />
              <path d="M27 56 Q53 45 98 22" />
              <path d="M34 69 Q61 58 105 48" />
              <path d="M51 8 Q49 37 48 75" />
              <path d="M77 12 Q71 42 78 77" />
              <path d="M22 46 Q58 50 100 58" />
            </g>
            <path d="M30 59 Q49 54 63 59 T91 55" fill="none" stroke="#54a6e7" strokeWidth=".7" strokeOpacity=".18" />

            <motion.path
              d={routePath}
              fill="none"
              stroke="url(#route-stroke)"
              strokeWidth=".75"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="2.2 2.2"
              initial={false}
              animate={{ strokeDashoffset: [0, -18] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              opacity=".6"
            />

            {researchStops.map((stop, index) => {
              const active = stop.id === selectedId;
              const label = labelPlacement[stop.id];
              return (
                <g
                  key={stop.id}
                  className="cursor-pointer outline-none"
                  onClick={() => setSelectedId(stop.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") setSelectedId(stop.id);
                  }}
                  aria-label={`查看${stop.province}调研信息`}
                >
                  <circle cx={stop.coordinate.x} cy={stop.coordinate.y} r={active ? 5.4 : 4} fill={active ? "#20c997" : "#1687ff"} opacity={active ? .12 : .08}>
                    <animate attributeName="r" values={active ? "3.5;6;3.5" : "3;4.6;3"} dur={active ? "2s" : `${2.8 + index * .2}s`} repeatCount="indefinite" />
                  </circle>
                  <circle cx={stop.coordinate.x} cy={stop.coordinate.y} r={active ? 2.2 : 1.7} fill={active ? "#20c997" : "#5aa9ff"} stroke="#eaf5ff" strokeWidth=".6" filter={active ? "url(#marker-glow)" : undefined} />
                  <circle cx={stop.coordinate.x} cy={stop.coordinate.y} r=".55" fill="#fff" />
                  <text
                    x={stop.coordinate.x + label.dx}
                    y={stop.coordinate.y + label.dy}
                    fill={active ? "#ffffff" : "#b8d4ef"}
                    fontSize={active ? "3.7" : "3.25"}
                    fontWeight="700"
                    textAnchor={label.anchor}
                    style={{ paintOrder: "stroke", stroke: "#071a31", strokeWidth: 1.5, strokeLinejoin: "round" }}
                  >
                    {stop.mapLabel}
                  </text>
                </g>
              );
            })}
          </svg>
          <div className="pointer-events-none absolute bottom-[12%] left-[7%] hidden rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-[10px] text-slate-400 backdrop-blur sm:block">
            <span className="mr-2 inline-block h-px w-6 align-middle bg-gradient-to-r from-mint to-blue-400" />
            实践调研路线示意
          </div>
        </div>

        <div className="relative z-10 grid grid-cols-5 gap-1.5 sm:gap-2">
          {researchStops.map((stop, index) => (
            <button
              key={stop.id}
              type="button"
              onClick={() => setSelectedId(stop.id)}
              aria-pressed={stop.id === selectedId}
              aria-label={`选择${stop.province}`}
              className={`group rounded-xl border px-1 py-2.5 text-center transition duration-300 sm:px-2 sm:py-3 ${
                stop.id === selectedId
                  ? "border-mint/40 bg-mint/10 text-white shadow-[inset_0_0_20px_rgba(32,201,151,.08)]"
                  : "border-white/[0.08] bg-white/[0.035] text-slate-400 hover:border-blue-400/30 hover:bg-white/[0.07] hover:text-white"
              }`}
            >
              <span className={`mb-1 block text-[9px] font-semibold tracking-wider ${stop.id === selectedId ? "text-mint" : "text-slate-600"}`}>0{index + 1}</span>
              <span className="text-[10px] font-semibold sm:text-xs">{stop.mapLabel}</span>
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.article
          key={selected.id}
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -16 }}
          transition={{ duration: 0.25 }}
          className="relative overflow-hidden rounded-[28px] border border-slate-200 bg-white p-6 shadow-soft sm:p-8"
        >
          <div className="absolute right-0 top-0 h-48 w-48 rounded-bl-full bg-gradient-to-bl from-blue-50 to-transparent" />
          <div className="relative">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-bold tracking-wider text-blue-700">
                <Sparkles className="h-3.5 w-3.5" />{selected.province}站
              </span>
              <span className="font-display text-sm font-bold tracking-[0.16em] text-slate-300">0{selectedIndex + 1} / 0{researchStops.length}</span>
            </div>

            <div className="mt-7 flex items-end justify-between gap-4 border-b border-slate-100 pb-7">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Fieldwork focus</p>
                <h3 className="mt-3 text-balance font-display text-3xl font-bold leading-tight text-ink">{selected.title}</h3>
              </div>
              <span className="hidden h-12 w-12 shrink-0 place-items-center rounded-2xl bg-ocean text-white sm:grid"><MapPin className="h-5 w-5" /></span>
            </div>

            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs text-slate-500">
              <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4 text-signal" />{selected.city}</span>
              <span className="flex items-center gap-1.5"><CalendarDays className="h-4 w-4 text-signal" />{selected.date ? formatDate(selected.date) : "调研时间待补充"}</span>
            </div>

            <p className="mt-6 leading-8 text-slate-600">{selected.summary}</p>

            <div className="mt-7 rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-emerald-50/50 p-5">
              <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400"><Radar className="h-4 w-4 text-signal" />调研焦点</p>
              <p className="mt-3 font-display text-lg font-bold leading-7 text-ocean">{selected.focus}</p>
            </div>

            <div className="mt-7 grid gap-7 sm:grid-cols-2">
              <div>
                <p className="mb-3 flex items-center gap-2 text-sm font-bold text-ink"><Route className="h-4 w-4 text-signal" />资料整理状态</p>
                <ul className="space-y-2.5 text-sm leading-6 text-slate-600">
                  {selected.activities.map((item) => <li key={item} className="flex gap-2.5"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-300" />{item}</li>)}
                </ul>
              </div>
              <div>
                <p className="mb-3 flex items-center gap-2 text-sm font-bold text-ink"><CheckCircle2 className="h-4 w-4 text-mint" />成果框架</p>
                <ul className="space-y-2.5 text-sm leading-6 text-slate-600">
                  {selected.outcomes.map((item) => <li key={item} className="flex gap-2.5"><CheckCircle2 className="mt-1 h-3.5 w-3.5 shrink-0 text-emerald-500" />{item}</li>)}
                </ul>
              </div>
            </div>
          </div>
        </motion.article>
      </AnimatePresence>
    </div>
  );
}
