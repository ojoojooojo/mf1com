import { Link, useLocation } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Lock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import {
  MODULE_SHORT_LABELS,
  moduleKeyFromPathname,
  useModuleStatuses,
  type ModuleKey,
} from "@/lib/module-status";

function ClosedModule({ moduleKey }: { moduleKey: ModuleKey }) {
  return (
    <section className="rounded-2xl border border-border bg-card p-6 shadow-soft sm:p-8">
      <p className="eyebrow flex items-center gap-2">
        <Lock className="size-4" /> Módulo temporariamente fechado
      </p>
      <h1 className="mt-2 font-display text-2xl leading-tight sm:text-3xl">
        {MODULE_SHORT_LABELS[moduleKey]}
      </h1>
      <p className="mt-3 max-w-xl text-[0.975rem] leading-relaxed text-muted-foreground">
        Este módulo está, neste momento, fechado pelo formador. Não é um erro: o acesso será
        reaberto quando o formador o indicar.
      </p>
      <p className="mt-3 max-w-xl text-[0.975rem] leading-relaxed text-muted-foreground">
        Todo o seu percurso está guardado — progresso, respostas aos quizzes e produções escritas
        mantêm-se intactos e voltam a estar disponíveis quando o módulo reabrir.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          to="/"
          className="inline-flex items-center rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
        >
          Voltar à página inicial da formação
        </Link>
      </div>
    </section>
  );
}

/** Bloqueia o conteúdo de um módulo fechado aos participantes. Formadores passam sempre. */
export function ModuleGate({ children }: { children: React.ReactNode }) {
  const pathname = useLocation({ select: (l) => l.pathname });
  const moduleKey = moduleKeyFromPathname(pathname);
  const roleQuery = useQuery({
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
  const statuses = useModuleStatuses();

  if (!moduleKey) return <>{children}</>;
  if (roleQuery.isLoading || statuses.isLoading) {
    return <p className="text-sm text-muted-foreground">A verificar a disponibilidade do módulo…</p>;
  }
  if (roleQuery.data === "formador") return <>{children}</>;
  if (statuses.data && !statuses.data[moduleKey].is_open) {
    return <ClosedModule moduleKey={moduleKey} />;
  }
  return <>{children}</>;
}
