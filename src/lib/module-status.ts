import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type ModuleKey = "mf1" | "mf2" | "mf3";

export const MODULE_KEYS: ModuleKey[] = ["mf1", "mf2", "mf3"];

export const MODULE_SHORT_LABELS: Record<ModuleKey, string> = {
  mf1: "MF1 — Comunicação e Escuta Ativa",
  mf2: "MF2 — Dinâmicas e Causas do Conflito",
  mf3: "MF3 — Estratégias de Resolução de Conflitos",
};

export type ModuleStatusRow = {
  module_key: ModuleKey;
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

/** Estado (aberto/fechado) dos três módulos. Leitura pública — funciona sem sessão. */
export function useModuleStatuses() {
  return useQuery({
    queryKey: moduleStatusQueryKey,
    staleTime: 30_000,
    queryFn: async (): Promise<Record<ModuleKey, ModuleStatusRow>> => {
      const { data, error } = await supabase
        .from("module_status")
        .select("module_key, is_open, updated_at, updated_by");
      if (error) throw error;
      const fallback = (key: ModuleKey): ModuleStatusRow => ({
        module_key: key,
        is_open: true,
        updated_at: new Date(0).toISOString(),
        updated_by: null,
      });
      const rows = (data ?? []) as ModuleStatusRow[];
      return {
        mf1: rows.find((r) => r.module_key === "mf1") ?? fallback("mf1"),
        mf2: rows.find((r) => r.module_key === "mf2") ?? fallback("mf2"),
        mf3: rows.find((r) => r.module_key === "mf3") ?? fallback("mf3"),
      };
    },
  });
}

/** Abrir/fechar um módulo. A escrita só é aceite a formadores (garantido por RLS). */
export function useSetModuleOpen() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ moduleKey, isOpen }: { moduleKey: ModuleKey; isOpen: boolean }) => {
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
