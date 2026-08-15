import { CircleCheck, Clock3 } from "lucide-react";
import { cn } from "@/lib/utils";

export function StatusPill({ available, children }: { available: boolean; children: string }) {
  const Icon = available ? CircleCheck : Clock3;
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium", available ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700")}>
      <Icon className="h-3.5 w-3.5" />{children}
    </span>
  );
}
