import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type ModuleKey = "mf1" | "mf2" | "mf3";

/** Chaves controláveis pelo formador: os três módulos e a Avaliação da Formação. */
export type ControlKey = ModuleKey | "avaliacao";

export const MODULE_KEYS: ModuleKey[] = ["mf1", "mf2", "mf3"];

export const EVALUATION_KEY = "avaliacao" as const;

export const MODULE_SHORT_LABELS: Record<ControlKey, string> = {
  mf1: "MF1 — Comunicação e Escuta Ativa",
  mf2: "MF2 — Dinâmicas e Causas do Conflito",
  mf3: "MF3 — Estratégias de Resolução de Conflitos",
  avaliacao: "Avaliação da Formação",
};

export type ModuleStatusRow = {
  module_key: ControlKey;
  is_open: boolean;
  updated_at: string;
  updated_by: string | null;
};

/** Módulo a que pertence um caminho da aplicação. `null` = fora dos módulos (ex.: /formador). */
export function moduleKeyFromPathname(pathname: string): ModuleKey | null {
  if (pathname === "/mf1" || pathname.startsWith("/mf1/")) return "mf1";
  if (pathname === "/mf2" || pathname.startsWith("/mf2/")) return "mf2";
  if (pathname === "/mf3" || pathname.startsWith("/mf3/")) return "mf3";
  return null;
}

export const moduleStatusQueryKey = ["module-status"] as const;

/** Estado (aberto/fechado) dos módulos e da avaliação. Leitura pública — funciona sem sessão. */
export function useModuleStatuses() {
  return useQuery({
    queryKey: moduleStatusQueryKey,
    staleTime: 30_000,
    queryFn: async (): Promise<Record<ControlKey, ModuleStatusRow>> => {
      const { data, error } = await supabase
        .from("module_status")
        .select("module_key, is_open, updated_at, updated_by");
      if (error) throw error;
      const rows = (data ?? []) as ModuleStatusRow[];
      const pick = (key: ControlKey): ModuleStatusRow =>
        rows.find((r) => r.module_key === key) ?? {
          module_key: key,
          is_open: true,
          updated_at: new Date(0).toISOString(),
          updated_by: null,
        };
      return {
        mf1: pick("mf1"),
        mf2: pick("mf2"),
        mf3: pick("mf3"),
        avaliacao: pick("avaliacao"),
      };
    },
  });
}

/** Abrir/fechar um módulo ou a avaliação. A escrita só é aceite a formadores (garantido por RLS). */
export function useSetModuleOpen() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ moduleKey, isOpen }: { moduleKey: ControlKey; isOpen: boolean }) => {
      const { data: auth } = await supabase.auth.getUser();
      const { error } = await supabase
        .from("module_status")
        .update({ is_open: isOpen, updated_by: auth.user?.id ?? null })
        .eq("module_key", moduleKey);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: moduleStatusQueryKey }),
  });
}
