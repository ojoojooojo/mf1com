import { Link, useLocation } from "@tanstack/react-router";
import { useEffect } from "react";
import { ArrowLeft, ArrowRight, Check, Lock } from "lucide-react";
import { STOPS } from "@/lib/course-data";
import { MF2_STOPS } from "@/lib/course-data-mf2";
import { MF3_STOPS } from "@/lib/course-data-mf3";
import { useProgress } from "@/lib/progress";
import { useSectionLocks } from "@/components/course/SectionGate";
import { formatOpening } from "@/lib/section-schedule";
import { cn } from "@/lib/utils";

export function useVisit(stopId: string, enabled = true) {
  const { markVisited } = useProgress();
  useEffect(() => {
    if (enabled) markVisited(stopId);
  }, [stopId, enabled, markVisited]);
}

export function StopNav({ stopId }: { stopId: string }) {
  const { isCompleted, markCompleted, unmarkCompleted } = useProgress();
  const pathname = useLocation({ select: (l) => l.pathname });
  const stops = pathname.startsWith("/mf3")
    ? MF3_STOPS
    : pathname.startsWith("/mf2")
      ? MF2_STOPS
      : STOPS;
  const index = stops.findIndex((s) => s.id === stopId);
  const prev = index > 0 ? stops[index - 1] : undefined;
  const next = index >= 0 && index < stops.length - 1 ? stops[index + 1] : undefined;
  const done = isCompleted(stopId);
  const { lockFor } = useSectionLocks();
  const prevLock = prev ? lockFor(prev.id) : null;
  const nextLock = next ? lockFor(next.id) : null;

  return (
    <div className="mt-12 space-y-4 border-t border-border pt-6">
      <button
        type="button"
        onClick={() => (done ? unmarkCompleted(stopId) : markCompleted(stopId))}
        className={cn(
          "inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors",
          done
            ? "bg-success-soft text-foreground hover:bg-muted"
            : "bg-primary text-primary-foreground hover:bg-primary/90",
        )}
      >
        <Check className="size-4" />
        {done ? "Secção concluída — desmarcar" : "Marcar secção como concluída"}
      </button>

      <div className="flex flex-wrap items-center justify-between gap-3">
        {prev ? (
          prevLock ? (
            <span className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Lock className="size-4" /> {prev.shortTitle}
              <span className="text-xs">· abre {formatOpening(prevLock)}</span>
            </span>
          ) : (
            <Link
              to={prev.to}
              params={prev.params as never}
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="size-4" /> {prev.shortTitle}
            </Link>
          )
        ) : (
          <span />
        )}
        {next ? (
          nextLock ? (
            <span className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-semibold text-muted-foreground">
              <Lock className="size-4" /> {next.shortTitle}
              <span className="text-xs font-normal">· abre {formatOpening(nextLock)}</span>
            </span>
          ) : (
            <Link
              to={next.to}
              params={next.params as never}
              className="inline-flex items-center gap-2 rounded-lg border border-primary/30 bg-primary-soft px-4 py-2.5 text-sm font-semibold text-primary hover:bg-secondary"
            >
              {next.shortTitle} <ArrowRight className="size-4" />
            </Link>
          )
        ) : null}
      </div>
    </div>
  );
}
