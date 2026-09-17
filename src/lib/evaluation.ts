import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

/* ---------- Estrutura do questionário (modelo-tipo IEFP) ---------- */

export const PERFIL_OPTIONS = [
  "Formador(a) em exercício",
  "Formador(a) em início de atividade",
  "Coordenador(a) / mediador(a) de formação",
  "Técnico(a) de formação ou de recursos humanos",
  "Outra função",
  "Prefiro não indicar",
] as const;

export type LikertKey =
  | "escala_objetivos"
  | "escala_conteudos"
  | "escala_metodologia"
  | "escala_sincronas"
  | "escala_formador"
  | "escala_organizacao"
  | "escala_materiais";

export const LIKERT_DIMENSIONS: { key: LikertKey; label: string; hint: string }[] = [
  {
    key: "escala_objetivos",
    label: "Objetivos da formação",
    hint: "Clareza dos objetivos e grau em que foram cumpridos.",
  },
  {
    key: "escala_conteudos",
    label: "Conteúdos programáticos",
    hint: "Pertinência, rigor e utilidade para a sua prática de formador.",
  },
  {
    key: "escala_metodologia",
    label: "Metodologia e plataforma (MOOC)",
    hint: "Sequência dos blocos, atividades interativas e facilidade de utilização.",
  },
  {
    key: "escala_sincronas",
    label: "Sessões síncronas online",
    hint: "Aproveitamento das 4 horas síncronas online de cada módulo.",
  },
  {
    key: "escala_formador",
    label: "Desempenho do formador",
    hint: "Domínio dos temas, clareza das explicações e relação com o grupo.",
  },
  {
    key: "escala_organizacao",
    label: "Organização e logística",
    hint: "Informação prévia, calendarização e apoio ao longo do percurso.",
  },
  {
    key: "escala_materiais",
    label: "Meios e materiais utilizados",
    hint: "Textos, esquemas, imagens, fontes e recursos de apoio.",
  },
];

export const LIKERT_LABELS: Record<number, string> = {
  1: "Muito insatisfeito",
  2: "Insatisfeito",
  3: "Razoável",
  4: "Satisfeito",
  5: "Muito satisfeito",
};

export type EvaluationDraft = {
  perfil: string;
  recomendacao: number | null;
  satisfacao_global: number | null;
  pontos_fortes: string;
  pontos_melhorar: string;
  sugestoes: string;
} & Record<LikertKey, number | null>;

export const EMPTY_DRAFT: EvaluationDraft = {
  perfil: "",
  escala_objetivos: null,
  escala_conteudos: null,
  escala_metodologia: null,
  escala_sincronas: null,
  escala_formador: null,
  escala_organizacao: null,
  escala_materiais: null,
  recomendacao: null,
  satisfacao_global: null,
  pontos_fortes: "",
  pontos_melhorar: "",
  sugestoes: "",
};

/** Linha anónima da tabela de respostas — não existe qualquer coluna de identificação. */
export type EvaluationRow = {
  id: string;
  perfil: string | null;
  recomendacao: number;
  satisfacao_global: number;
  pontos_fortes: string;
  pontos_melhorar: string;
  sugestoes: string;
  created_at: string;
} & Record<LikertKey, number>;

/* ---------- Estado de acesso do participante ---------- */

export const evaluationAccessKey = ["avaliacao", "acesso"] as const;

export type EvaluationAccess = {
  signedIn: boolean;
  isFormador: boolean;
  completedMf3: boolean;
  submitted: boolean;
  /** Interruptor manual do formador (entrada "avaliacao" em module_status). */
  evaluationOpen: boolean;
};

/** Elegibilidade e estado de submissão da conta autenticada. */
export function useEvaluationAccess() {
  return useQuery({
    queryKey: evaluationAccessKey,
    queryFn: async (): Promise<EvaluationAccess> => {
      const { data: auth } = await supabase.auth.getUser();
      const userId = auth.user?.id;
      const switchRow = await supabase
        .from("module_status")
        .select("is_open")
        .eq("module_key", "avaliacao")
        .maybeSingle();
      // Sem registo, a avaliação considera-se aberta (comportamento automático original).
      const evaluationOpen = switchRow.data?.is_open ?? true;
      if (!userId) {
        return {
          signedIn: false,
          isFormador: false,
          completedMf3: false,
          submitted: false,
          evaluationOpen,
        };
      }
      const [profile, submission, progress] = await Promise.all([
        supabase.from("profiles").select("role").eq("id", userId).maybeSingle(),
        supabase
          .from("evaluation_submissions")
          .select("submitted_at")
          .eq("user_id", userId)
          .maybeSingle(),
        supabase
          .from("progress")
          .select("status")
          .eq("user_id", userId)
          .eq("section_id", "mf3-sintese")
          .maybeSingle(),
      ]);
      return {
        signedIn: true,
        isFormador: profile.data?.role === "formador",
        completedMf3: progress.data?.status === "concluido",
        submitted: Boolean(submission.data),
        evaluationOpen,
      };
    },
  });
}

export function evaluationErrorMessage(message: string): string {
  if (message.includes("JA_RESPONDEU")) return "Esta conta já submeteu a avaliação da formação.";
  if (message.includes("AVALIACAO_FECHADA"))
    return "A avaliação da formação está, neste momento, fechada pelo formador. As respostas já submetidas mantêm-se guardadas.";
  if (message.includes("MF3_INCOMPLETO"))
    return "É necessário concluir a Síntese Final do MF3 antes de avaliar a formação.";
  if (message.includes("SO_FORMANDOS"))
    return "A avaliação é preenchida pelos participantes. A sua conta de formador só pré-visualiza o questionário.";
  if (message.includes("SEM_SESSAO")) return "A sua sessão expirou. Entre novamente para submeter.";
  return "Não foi possível registar a avaliação. Tente novamente.";
}

/** Submete a avaliação anónima. O registo de "já respondeu" é feito pela base de dados. */
export function useSubmitEvaluation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (draft: EvaluationDraft) => {
      const { error } = await supabase.rpc("submit_course_evaluation", {
        _perfil: draft.perfil,
        _escala_objetivos: draft.escala_objetivos as number,
        _escala_conteudos: draft.escala_conteudos as number,
        _escala_metodologia: draft.escala_metodologia as number,
        _escala_sincronas: draft.escala_sincronas as number,
        _escala_formador: draft.escala_formador as number,
        _escala_organizacao: draft.escala_organizacao as number,
        _escala_materiais: draft.escala_materiais as number,
        _recomendacao: draft.recomendacao as number,
        _satisfacao_global: draft.satisfacao_global as number,
        _pontos_fortes: draft.pontos_fortes.trim(),
        _pontos_melhorar: draft.pontos_melhorar.trim(),
        _sugestoes: draft.sugestoes.trim(),
      });
      if (error) throw new Error(error.message);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: evaluationAccessKey }),
  });
}

/* ---------- Leitura agregada (só formadores, por RLS) ---------- */

export function useEvaluationResults(enabled: boolean) {
  return useQuery({
    queryKey: ["avaliacao", "respostas"],
    enabled,
    queryFn: async (): Promise<EvaluationRow[]> => {
      const { data, error } = await supabase
        .from("course_evaluations")
        .select(
          "id, perfil, escala_objetivos, escala_conteudos, escala_metodologia, escala_sincronas, escala_formador, escala_organizacao, escala_materiais, recomendacao, satisfacao_global, pontos_fortes, pontos_melhorar, sugestoes, created_at",
        )
        .order("created_at", { ascending: true });
      if (error) throw error;
      return (data ?? []) as EvaluationRow[];
    },
  });
}

export function average(values: number[]) {
  if (values.length === 0) return 0;
  return values.reduce((a, b) => a + b, 0) / values.length;
}

/** Distribuição 1–5 de uma dimensão. */
export function distribution(rows: EvaluationRow[], key: LikertKey) {
  const counts = [0, 0, 0, 0, 0];
  rows.forEach((r) => {
    const v = r[key];
    if (v >= 1 && v <= 5) counts[v - 1] = (counts[v - 1] ?? 0) + 1;
  });
  return counts;
}

/** NPS clássico: % promotores (9–10) menos % detratores (0–6). */
export function npsOf(rows: EvaluationRow[]) {
  if (rows.length === 0) return { promoters: 0, passives: 0, detractors: 0, nps: 0, average: 0 };
  const promoters = rows.filter((r) => r.recomendacao >= 9).length;
  const passives = rows.filter((r) => r.recomendacao >= 7 && r.recomendacao <= 8).length;
  const detractors = rows.filter((r) => r.recomendacao <= 6).length;
  return {
    promoters,
    passives,
    detractors,
    nps: Math.round(((promoters - detractors) / rows.length) * 100),
    average: average(rows.map((r) => r.recomendacao)),
  };
}
