"use client";

import { motion } from "framer-motion";
import { BookOpenText, Bot, Leaf, Scale } from "lucide-react";

const nodes = [
  { label: "法律", icon: Scale, x: "12%", y: "22%", delay: 0 },
  { label: "科技", icon: Bot, x: "74%", y: "16%", delay: 0.4 },
  { label: "乡土", icon: Leaf, x: "73%", y: "72%", delay: 0.8 },
  { label: "知识", icon: BookOpenText, x: "10%", y: "72%", delay: 1.2 },
];

export function HeroVisual() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[520px]" aria-hidden="true">
      <motion.div
        className="absolute inset-[11%] rounded-full border border-blue-300/40"
        animate={{ rotate: 360 }}
        transition={{ duration: 34, repeat: Infinity, ease: "linear" }}
      >
        <span className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-mint shadow-[0_0_18px_#20c997]" />
      </motion.div>
      <motion.div
        className="absolute inset-[23%] rounded-full border border-dashed border-blue-300/30"
        animate={{ rotate: -360 }}
        transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
      />
      <div className="absolute inset-[31%] grid place-items-center rounded-[38%] border border-white/60 bg-white/80 shadow-[0_30px_100px_rgba(0,50,100,.22)] backdrop-blur-xl">
        <div className="text-center">
          <span className="font-display text-6xl font-bold text-ocean sm:text-7xl">法</span>
          <span className="mx-auto mt-2 block h-1 w-8 rounded-full bg-mint" />
        </div>
      </div>
      <svg className="absolute inset-0 h-full w-full opacity-50" viewBox="0 0 100 100">
        <path d="M21 27 L40 40 M79 24 L61 40 M79 76 L62 61 M20 76 L39 61" fill="none" stroke="#1687ff" strokeWidth=".35" strokeDasharray="2 2" />
      </svg>
      {nodes.map((node) => {
        const Icon = node.icon;
        return (
          <motion.div
            key={node.label}
            className="absolute flex items-center gap-2 rounded-xl border border-white/80 bg-white/85 px-3 py-2 text-xs font-semibold text-ocean shadow-lg backdrop-blur"
            style={{ left: node.x, top: node.y }}
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, delay: node.delay, repeat: Infinity, ease: "easeInOut" }}
          >
            <Icon className="h-4 w-4 text-signal" />{node.label}
          </motion.div>
        );
      })}
    </div>
  );
}
