import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState, type ReactNode } from "react";
import { Check, Circle, Dot, LogIn, LogOut, Menu, RotateCcw, X } from "lucide-react";
import { STOPS, MODULE_CODE, MODULE_TITLE } from "@/lib/course-data";
import { useProgress } from "@/lib/progress";
import { useAuth } from "@/lib/auth";
import { cn } from "@/lib/utils";


function TrailList({ onNavigate }: { onNavigate?: () => void }) {
  const { isCompleted, isVisited } = useProgress();
  const location = useLocation();

  return (
    <nav aria-label="Mapa do módulo" className="space-y-1">
      {STOPS.map((stop, i) => {
        const active =
          stop.params
            ? location.pathname === `/blocos/${stop.params["blocoId"]}`
            : stop.to === "/"
              ? location.pathname === "/"
              : location.pathname.startsWith(stop.to);
        const done = isCompleted(stop.id);
        const seen = isVisited(stop.id);
        return (
          <Link
            key={stop.id}
            to={stop.to}
            params={stop.params as never}
            onClick={onNavigate}
            className={cn(
              "group flex items-start gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
              active
                ? "bg-sidebar-primary text-sidebar-primary-foreground"
                : "text-sidebar-foreground hover:bg-sidebar-accent",
            )}
          >
            <span
              className={cn(
                "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border text-[10px] font-semibold",
                done
                  ? "border-transparent bg-success text-success-foreground"
                  : active
                    ? "border-sidebar-primary-foreground/60"
                    : "border-sidebar-border",
              )}
              aria-hidden
            >
              {done ? <Check className="size-3" /> : i + 1}
            </span>
            <span className="min-w-0">
              <span className="block leading-snug">{stop.shortTitle}</span>
              <span
                className={cn(
                  "text-xs",
                  active ? "text-sidebar-primary-foreground/80" : "text-muted-foreground",
                )}
              >
                {done ? "Concluído" : seen ? "Iniciado" : `${stop.minutes} min`}
              </span>
            </span>
          </Link>
        );
      })}
    </nav>
  );
}

function ProgressPanel() {
  const { percent, reset, hydrated } = useProgress();
  return (
    <div className="rounded-xl border border-sidebar-border bg-sidebar p-4">
      <p className="eyebrow">Progresso</p>
      <div className="mt-2 flex items-center gap-3">
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-primary transition-[width] duration-500"
            style={{ width: `${hydrated ? percent : 0}%` }}
          />
        </div>
        <span className="text-sm font-semibold tabular-nums">{hydrated ? percent : 0}%</span>
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        Guardado automaticamente neste navegador.
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
      >
        <RotateCcw className="size-3" /> Reiniciar progresso
      </button>
    </div>
  );
}

export function CourseLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { percent, hydrated } = useProgress();

  useEffect(() => setOpen(false), [location.pathname]);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border bg-surface/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex size-9 items-center justify-center rounded-lg border border-border text-foreground lg:hidden"
            aria-label="Abrir mapa do módulo"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
          <Link to="/" className="min-w-0">
            <span className="eyebrow flex items-center gap-1">
              {MODULE_CODE} <Dot className="size-3" /> Formação de Formadores
            </span>
            <span className="block truncate font-display text-base font-semibold">
              {MODULE_TITLE}
            </span>
          </Link>
          <div className="ml-auto hidden items-center gap-3 sm:flex">
            <div className="h-1.5 w-32 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-accent transition-[width] duration-500"
                style={{ width: `${hydrated ? percent : 0}%` }}
              />
            </div>
            <span className="text-xs font-semibold tabular-nums text-muted-foreground">
              {hydrated ? percent : 0}% concluído
            </span>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-7xl gap-8 px-4 py-8">
        <aside
          className={cn(
            "shrink-0 lg:block lg:w-72",
            open
              ? "fixed inset-x-0 top-[57px] z-30 block max-h-[80vh] overflow-y-auto border-b border-border bg-surface p-4 shadow-lift"
              : "hidden",
          )}
        >
          <div className="space-y-4 lg:sticky lg:top-24">
            <ProgressPanel />
            <div className="rounded-xl border border-border bg-card p-2">
              <p className="eyebrow px-3 pt-2 pb-1">Mapa do módulo</p>
              <TrailList onNavigate={() => setOpen(false)} />
            </div>
          </div>
        </aside>
        <main className="min-w-0 flex-1 pb-16">{children}</main>
      </div>

      <footer className="border-t border-border bg-surface">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            {MODULE_CODE} · {MODULE_TITLE} — segue o referencial de Formação Pedagógica Contínua de
            Formadores do IEFP.
          </p>
          <Link
            to="/fontes"
            className="font-medium underline-offset-4 hover:text-foreground hover:underline"
          >
            Fontes e referências
          </Link>
        </div>
      </footer>
    </div>
  );
}
