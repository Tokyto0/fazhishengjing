import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import Link from "next/link";
import { BrandMark } from "@/components/brand-mark";
import { navigation, siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink text-white">
      <div className="absolute inset-0 bg-grid bg-[length:42px_42px] opacity-10" />
      <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
        <div className="grid gap-12 border-b border-white/10 pb-12 lg:grid-cols-[1.3fr_.7fr_.7fr]">
          <div className="max-w-xl">
            <div className="mb-5 flex items-center gap-3">
              <BrandMark className="bg-white text-ocean" />
              <div>
                <p className="font-display text-xl font-bold tracking-wider">法智生境</p>
                <p className="text-[10px] uppercase tracking-[0.2em] text-blue-200">Practice for public good</p>
              </div>
            </div>
            <p className="text-balance text-lg leading-8 text-slate-300">{siteConfig.slogan}</p>
          </div>
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-blue-300">探索平台</p>
            <div className="grid grid-cols-2 gap-x-5 gap-y-3 text-sm text-slate-300 lg:grid-cols-1">
              {navigation.slice(0, 6).map((item) => (
                <Link key={item.href} href={item.href} className="transition hover:text-white">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-blue-300">联系与共建</p>
            <div className="space-y-4 text-sm text-slate-300">
              <p className="flex gap-3"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-mint" />高校社会实践项目组</p>
              <a href="mailto:contact@example.edu.cn" className="flex gap-3 transition hover:text-white"><Mail className="mt-0.5 h-4 w-4 shrink-0 text-mint" />contact@example.edu.cn</a>
              <Link href="/about" className="inline-flex items-center gap-1 text-white">了解项目 <ArrowUpRight className="h-4 w-4" /></Link>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3 pt-7 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} 法智生境社会实践团队 · 内容持续更新</p>
          <p>开放知识 · 审慎引用 · 服务乡土创新</p>
        </div>
      </div>
    </footer>
  );
}
