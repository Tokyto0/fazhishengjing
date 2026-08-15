import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  light = false,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
      <div className={cn("mb-4 flex items-center gap-3", align === "center" && "justify-center")}>
        <span className="h-px w-8 bg-signal" />
        <span className={cn("text-xs font-bold uppercase tracking-[0.22em]", light ? "text-blue-300" : "text-signal")}>{eyebrow}</span>
      </div>
      <h2 className={cn("text-balance font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-[44px]", light ? "text-white" : "text-ink")}>{title}</h2>
      {description && <p className={cn("mt-5 text-base leading-8 sm:text-lg", light ? "text-slate-300" : "text-slate-600")}>{description}</p>}
    </div>
  );
}
