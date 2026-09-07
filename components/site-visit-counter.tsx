"use client";

import { Eye } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const aggregatePath = "/__site_total";
const goatCounterCode = process.env.NEXT_PUBLIC_GOATCOUNTER_CODE;

type GoatCounter = {
  count?: (values: { path: string; title: string; no_session: boolean }) => void;
  no_onload?: boolean;
};

declare global {
  interface Window {
    goatcounter?: GoatCounter;
  }
}

let goatCounterLoader: Promise<void> | undefined;

function loadGoatCounter(endpoint: string) {
  if (window.goatcounter?.count) {
    return Promise.resolve();
  }

  if (!goatCounterLoader) {
    goatCounterLoader = new Promise((resolve, reject) => {
      window.goatcounter = { ...window.goatcounter, no_onload: true };

      const script = document.createElement("script");
      script.async = true;
      script.src = "https://gc.zgo.at/count.js";
      script.dataset.goatcounter = `${endpoint}/count`;
      script.addEventListener("load", () => resolve(), { once: true });
      script.addEventListener("error", () => reject(new Error("GoatCounter 脚本加载失败")), { once: true });
      document.head.appendChild(script);
    });
  }

  return goatCounterLoader;
}

async function fetchVisitCount(endpoint: string) {
  const response = await fetch(`${endpoint}/counter/${encodeURIComponent(aggregatePath)}.json`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("GoatCounter 访问量读取失败");
  }

  const payload: unknown = await response.json();
  if (!payload || typeof payload !== "object" || !("count" in payload) || typeof payload.count !== "string") {
    throw new Error("GoatCounter 返回了无效的访问量数据");
  }

  return payload.count;
}

export function SiteVisitCounter() {
  const pathname = usePathname();
  const [state, setState] = useState<"loading" | "ready" | "unavailable">("loading");
  const [count, setCount] = useState<string>();

  useEffect(() => {
    if (!goatCounterCode) {
      setState("unavailable");
      return;
    }

    const endpoint = `https://${goatCounterCode}.goatcounter.com`;
    let cancelled = false;
    let refreshTimer: number | undefined;

    // Delaying by one task avoids React Strict Mode's development-only effect replay.
    const trackTimer = window.setTimeout(() => {
      void (async () => {
        try {
          await loadGoatCounter(endpoint);
          if (cancelled || !window.goatcounter?.count) {
            return;
          }

          window.goatcounter.count({
            path: aggregatePath,
            title: "全站累计浏览量",
            no_session: true,
          });

          const refresh = async () => {
            try {
              const nextCount = await fetchVisitCount(endpoint);
              if (!cancelled) {
                setCount(nextCount);
                setState("ready");
              }
            } catch {
              if (!cancelled) {
                setState("unavailable");
              }
            }
          };

          await refresh();
          refreshTimer = window.setTimeout(() => void refresh(), 800);
        } catch {
          if (!cancelled) {
            setState("unavailable");
          }
        }
      })();
    }, 0);

    return () => {
      cancelled = true;
      window.clearTimeout(trackTimer);
      if (refreshTimer) {
        window.clearTimeout(refreshTimer);
      }
    };
  }, [pathname]);

  const displayCount = state === "ready" ? count : state === "loading" ? "…" : "—";

  return (
    <span
      className="inline-flex h-10 max-w-28 items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 text-sm font-medium text-slate-600"
      title="全站累计浏览量"
      aria-label={`全站累计浏览量：${displayCount}`}
    >
      <Eye className="h-4 w-4 shrink-0 text-signal" aria-hidden="true" />
      <span className="hidden 2xl:inline">浏览量</span>
      <span className="truncate tabular-nums" aria-live="polite">{displayCount}</span>
    </span>
  );
}
