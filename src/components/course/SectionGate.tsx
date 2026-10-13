import { useQuery } from "@tanstack/react-query";
import { Lock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useProgress } from "@/lib/progress";
import { formatOpening, lockedUntil, useSectionSchedule } from "@/lib/section-schedule";

/** Papel do utilizador — partilha a cache com o ModuleGate (mesma queryKey/queryFn). */
function useViewerRole() {
  return useQuery({
    queryKey: ["module-gate", "role"],
    queryFn: async () => {
      const { data: auth } = await supabase.auth.getUser();
      const userId = auth.user?.id;
      if (!userId) return null;
      const { data } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", userId)
        .maybeSingle();
      return data?.role ?? null;
    },
  });
}

/**
 * Regra de acesso às subsecções: fechada se tem data futura no calendário.
 * O formador vê sempre tudo; quem já concluiu a subsecção mantém acesso de leitura.
 */
export function useSectionLocks() {
  const schedule = useSectionSchedule();
  const role = useViewerRole();
  const { isCompleted, hydrated } = useProgress();
  const loading = schedule.isLoading || role.isLoading;

  const lockFor = (sectionId: string, progressKey = sectionId): Date | null => {
    if (loading || role.data === "formador") return null;
    const until = lockedUntil(schedule.data, sectionId);
    if (!until) return null;
    if (hydrated && isCompleted(progressKey)) return null;
    return until;
  };

  return { loading, lockFor };
}

/** Cartão mostrado no lugar do conteúdo de uma subsecção ainda fechada. */
export function SectionLockedCard({ until }: { until: Date }) {
  return (
    <section className="rounded-2xl border border-border bg-card p-6 shadow-soft sm:p-8">
      <p className="eyebrow flex items-center gap-2">
        <Lock className="size-4" /> Conteúdo agendado
      </p>
      <h1 className="mt-2 font-display text-2xl leading-tight sm:text-3xl">
        Esta parte ainda não está disponível
      </h1>
      <p className="mt-3 max-w-xl text-[0.975rem] leading-relaxed text-muted-foreground">
        Esta parte abre {formatOpening(until)}.
      </p>
    </section>
  );
}
