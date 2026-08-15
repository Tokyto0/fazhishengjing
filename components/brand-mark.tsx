import { cn } from "@/lib/utils";

export function BrandMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "relative grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-xl bg-ocean text-white shadow-lg shadow-blue-950/20",
        className,
      )}
      aria-hidden="true"
    >
      <span className="absolute inset-x-2 top-2 h-px bg-blue-300/70" />
      <span className="absolute bottom-2 left-2 h-2 w-2 rounded-full bg-mint" />
      <span className="font-display text-xl leading-none">法</span>
    </span>
  );
}
