import type { ReactNode } from "react";

export function PageHero({ eyebrow, title, description, aside }: { eyebrow: string; title: string; description: string; aside?: ReactNode }) {
  return (
    <section className="relative overflow-hidden border-b border-slate-200 bg-mist pt-[76px]">
      <div className="absolute inset-0 bg-grid bg-[length:48px_48px] [mask-image:linear-gradient(to_right,black,transparent_90%)]" />
      <div className="absolute -right-36 top-10 h-96 w-96 rounded-full bg-blue-200/40 blur-3xl" />
      <div className="relative mx-auto grid min-h-[430px] max-w-7xl items-end gap-10 px-5 pb-16 pt-20 sm:px-8 lg:grid-cols-[1fr_.5fr] lg:pb-20">
        <div className="hero-enter">
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-9 bg-signal" />
            <span className="text-xs font-bold uppercase tracking-[0.24em] text-signal">{eyebrow}</span>
          </div>
          <h1 className="max-w-4xl text-balance font-display text-4xl font-bold leading-tight text-ink sm:text-5xl lg:text-6xl">{title}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">{description}</p>
        </div>
        {aside && <div className="hero-enter hero-enter-delayed min-w-0 w-full lg:w-auto lg:justify-self-end">{aside}</div>}
      </div>
    </section>
  );
}
