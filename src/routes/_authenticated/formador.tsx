import { createFileRoute } from "@tanstack/react-router";
import { Fragment, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ChevronDown, ChevronRight, Download, ShieldAlert, Trash2, Users } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { deleteParticipant } from "@/lib/participants.functions";
import { AdminCompletionControl } from "@/components/course/AdminCompletionControl";
import type { AdminProgress } from "@/lib/admin-completion";
import { supabase } from "@/integrations/supabase/client";
import { ACTIVITIES, BLOCK_QUIZ_IDS, STOPS } from "@/lib/course-data";
import { MF2_ACTIVITIES, MF2_BLOCK_QUIZ_IDS, MF2_STOPS } from "@/lib/course-data-mf2";
import { MF3_ACTIVITIES, MF3_BLOCK_QUIZ_IDS, MF3_STOPS } from "@/lib/course-data-mf3";
import {
  exportClassWorkbook,
  exportParticipantWorkbook,
  fullNameOf,
  readOption,
  type Dataset,
  type ExportModule,
  type ProfileRow,
  type ProgressRow,
  type QuizRow,
  type ResponseRow,
} from "@/lib/export-xlsx";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  EVALUATION_KEY,
  MODULE_KEYS,
  MODULE_SHORT_LABELS,
  useModuleStatuses,
  useSetModuleOpen,
  type ControlKey,
} from "@/lib/module-status";
import { Lock, LockOpen } from "lucide-react";
import {
  formatOpening,
  isoToLisbonLocal,
  lisbonLocalToIso,
  sectionScheduleQueryKey,
  type SectionScheduleRow,
} from "@/lib/section-schedule";
import { exportEvaluationWorkbook } from "@/lib/export-xlsx";
import {
  LIKERT_DIMENSIONS,
  average,
  npsOf,
  useEvaluationResults,
  type LikertKey,
} from "@/lib/evaluation";

/* ---------- Estado de abertura dos módulos ---------- */

function ModuleAvailabilityPanel() {
  const statuses = useModuleStatuses();
  const setOpen = useSetModuleOpen();

  return (
    <section className="mt-6 rounded-2xl border border-border bg-card shadow-soft">
      <Accordion type="single" collapsible className="px-6 sm:px-8">
        <AccordionItem value="modulos" className="border-b-0">
          <AccordionTrigger className="font-display text-xl leading-tight">
            Módulos do curso
          </AccordionTrigger>
          <AccordionContent>
            <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
              Controle que módulos estão disponíveis aos participantes. Fechar um módulo não apaga
              nem altera qualquer progresso, resposta a quizzes ou produção escrita.
            </p>

            {statuses.isLoading ? (
              <p className="mt-4 text-sm text-muted-foreground">A carregar estado dos módulos…</p>
            ) : (
              <ul className="mt-5 space-y-3">
                {([...MODULE_KEYS, EVALUATION_KEY] as ControlKey[]).map((key) => {
                  const isEvaluation = key === EVALUATION_KEY;
                  const isOpen = statuses.data?.[key].is_open ?? true;
                  const busy = setOpen.isPending && setOpen.variables?.moduleKey === key;
                  return (
                    <li
                      key={key}
                      className="flex flex-col gap-3 rounded-xl border border-border bg-surface p-4 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold">{MODULE_SHORT_LABELS[key]}</p>
                        <p
                          className={cn(
                            "mt-1 inline-flex items-center gap-1.5 text-xs font-semibold",
                            isOpen ? "text-success" : "text-destructive",
                          )}
                        >
                          {isOpen ? (
                            <LockOpen className="size-3.5" />
                          ) : (
                            <Lock className="size-3.5" />
                          )}
                          {isEvaluation
                            ? isOpen
                              ? "Aberta"
                              : "Fechada"
                            : isOpen
                              ? "Aberto"
                              : "Fechado"}
                        </p>
                        {isEvaluation && (
                          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                            Fecho manual do 4.º passo. Aberta por omissão: abre automaticamente a
                            cada participante que conclua o MF3. Fechar impede novas submissões, mas
                            não apaga respostas já registadas nem o seu acesso aos resultados.
                          </p>
                        )}
                      </div>
                      <button
                        type="button"
                        disabled={busy}
                        onClick={() => setOpen.mutate({ moduleKey: key, isOpen: !isOpen })}
                        aria-label={`${isOpen ? "Fechar" : "Abrir"} ${MODULE_SHORT_LABELS[key]}`}
                        className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-border bg-card px-3.5 py-2 text-xs font-semibold transition-colors hover:bg-muted disabled:opacity-60 sm:text-sm"
                      >
                        {busy
                          ? "A guardar…"
                          : isEvaluation
                            ? isOpen
                              ? "Fechar avaliação"
                              : "Abrir avaliação"
                            : isOpen
                              ? "Fechar módulo"
                              : "Abrir módulo"}
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
            {setOpen.isError && (
              <p className="mt-3 text-sm text-destructive">
                Não foi possível alterar o estado do módulo. Tente novamente.
              </p>
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
}

/* ---------- Calendário de abertura das subsecções ---------- */

const SECTION_LABELS: Record<string, string> = {
  ...Object.fromEntries(STOPS.map((s) => [s.id, s.shortTitle])),
  ...Object.fromEntries(MF2_STOPS.map((s) => [s.id, s.shortTitle])),
  ...Object.fromEntries(MF3_STOPS.map((s) => [s.id, s.shortTitle])),
  ...Object.fromEntries(
    ACTIVITIES.map((a) => [`atividade-${a.id}`, `Atividade ${a.letter} · ${a.title}`]),
  ),
  ...Object.fromEntries(
    MF2_ACTIVITIES.map((a) => [`mf2-atividade-${a.id}`, `Atividade ${a.letter} · ${a.title}`]),
  ),
  ...Object.fromEntries(
    MF3_ACTIVITIES.map((a) => [`mf3-atividade-${a.id}`, `Atividade ${a.letter} · ${a.title}`]),
  ),
};

const scheduleFullQueryKey = ["section-schedule-full"] as const;

function ScheduleRow({
  row,
  busy,
  onSave,
}: {
  row: SectionScheduleRow;
  busy: boolean;
  onSave: (iso: string) => void;
}) {
  const [value, setValue] = useState(() => isoToLisbonLocal(row.opens_at));
  const saved = isoToLisbonLocal(row.opens_at);
  const dirty = value !== saved;
  const open = new Date(row.opens_at).getTime() <= Date.now();
  const label = SECTION_LABELS[row.section_id] ?? row.section_id;

  return (
    <li className="flex flex-col gap-2 rounded-xl border border-border bg-surface p-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <p className="truncate text-sm font-medium">{label}</p>
        <p
          className={cn(
            "mt-0.5 inline-flex items-center gap-1.5 text-xs font-semibold",
            open ? "text-success" : "text-muted-foreground",
          )}
        >
          {open ? <LockOpen className="size-3" /> : <Lock className="size-3" />}
          {open ? "Aberta" : `Abre ${formatOpening(new Date(row.opens_at))}`}
        </p>
      </div>
      <div className="flex shrink-0 flex-wrap items-center gap-2">
        <input
          type="datetime-local"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          aria-label={`Data de abertura de ${label}`}
          className="rounded-lg border border-input bg-background px-2.5 py-1.5 text-xs"
        />
        {dirty ? (
          <button
            type="button"
            disabled={busy}
            onClick={() => onSave(lisbonLocalToIso(value))}
            className="inline-flex items-center justify-center rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {busy ? "A guardar…" : "Guardar"}
          </button>
        ) : null}
        {!open && !dirty ? (
          <button
            type="button"
            disabled={busy}
            onClick={() => onSave(new Date().toISOString())}
            className="inline-flex items-center justify-center rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-semibold transition-colors hover:bg-muted disabled:opacity-60"
          >
            {busy ? "A guardar…" : "Abrir agora"}
          </button>
        ) : null}
      </div>
    </li>
  );
}

function SectionSchedulePanel() {
  const queryClient = useQueryClient();
  const scheduleQuery = useQuery({
    queryKey: scheduleFullQueryKey,
    queryFn: async (): Promise<SectionScheduleRow[]> => {
      const { data, error } = await supabase
        .from("section_schedule")
        .select("section_id, module_key, opens_at, updated_at, updated_by")
        .order("module_key")
        .order("opens_at");
      if (error) throw error;
      return (data ?? []) as SectionScheduleRow[];
    },
  });
  const save = useMutation({
    mutationFn: async ({ sectionId, opensAt }: { sectionId: string; opensAt: string }) => {
      const { data: auth } = await supabase.auth.getUser();
      const { error } = await supabase
        .from("section_schedule")
        .update({ opens_at: opensAt, updated_by: auth.user?.id ?? null })
        .eq("section_id", sectionId);
      if (error) throw error;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: scheduleFullQueryKey });
      void queryClient.invalidateQueries({ queryKey: sectionScheduleQueryKey });
    },
  });

  return (
    <section className="mt-6 rounded-2xl border border-border bg-card shadow-soft">
      <Accordion type="single" collapsible className="px-6 sm:px-8">
        <AccordionItem value="calendario" className="border-b-0">
          <AccordionTrigger className="font-display text-xl leading-tight">
            Calendário de abertura
          </AccordionTrigger>
          <AccordionContent>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              Cada parte abre automaticamente à data indicada (hora de Portugal continental). O que
              já abriu fica aberto até ao fim da ação. Fechar o módulo inteiro (acima) tem sempre
              prioridade sobre este calendário.
            </p>
            {scheduleQuery.isLoading ? (
              <p className="mt-4 text-sm text-muted-foreground">A carregar calendário…</p>
            ) : (
              <div className="mt-5 space-y-6">
                {MODULE_KEYS.map((moduleKey) => (
                  <div key={moduleKey}>
                    <p className="eyebrow">{MODULE_SHORT_LABELS[moduleKey]}</p>
                    <ul className="mt-3 space-y-2">
                      {(scheduleQuery.data ?? [])
                        .filter((r) => r.module_key === moduleKey)
                        .map((row) => (
                          <ScheduleRow
                            key={`${row.section_id}:${row.opens_at}`}
                            row={row}
                            busy={save.isPending && save.variables?.sectionId === row.section_id}
                            onSave={(iso) =>
                              save.mutate({ sectionId: row.section_id, opensAt: iso })
                            }
                          />
                        ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
            {save.isError && (
              <p className="mt-3 text-sm text-destructive">
                Não foi possível guardar a data de abertura. Tente novamente.
              </p>
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
}

/* ---------- Avaliação da formação (dados anónimos) ---------- */

function Bar({ count, total }: { count: number; total: number }) {
  const pct = total > 0 ? Math.round((count / total) * 100) : 0;
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
      <div className="h-full rounded-full bg-primary" style={{ width: `${pct}%` }} />
    </div>
  );
}

function EvaluationSummary({ isFormador }: { isFormador: boolean }) {
  const results = useEvaluationResults(isFormador);
  const rows = results.data ?? [];
  const total = rows.length;
  const nps = npsOf(rows);

  if (results.isLoading) {
    return <p className="mt-8 text-sm text-muted-foreground">A carregar respostas da avaliação…</p>;
  }

  return (
    <section className="mt-8 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm text-muted-foreground">
            {total} resposta{total === 1 ? "" : "s"} recebida{total === 1 ? "" : "s"} — sem qualquer
            identificação do participante.
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            As respostas são guardadas numa tabela sem coluna de utilizador; o controlo de «já
            respondeu» é privado de cada conta e não é consultável nesta página.
          </p>
        </div>
        <ExportButton
          isFormador={isFormador}
          label="Exportar avaliação da formação"
          onExport={() => exportEvaluationWorkbook(rows, LIKERT_DIMENSIONS)}
        />
      </div>

      {total === 0 ? (
        <p className="rounded-xl border border-border bg-surface p-5 text-sm text-muted-foreground">
          Ainda não há respostas à avaliação da formação. A página fica disponível aos participantes
          depois de concluírem a Síntese Final do MF3.
        </p>
      ) : (
        <>
          <div className="overflow-hidden rounded-xl border border-border bg-card">
            <table className="w-full min-w-[34rem] border-collapse text-[0.95rem]">
              <thead className="border-b border-border bg-surface">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Dimensão
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Média (1–5)
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Distribuição (1 → 5)
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  ...LIKERT_DIMENSIONS,
                  { key: "satisfacao_global" as const, label: "Satisfação global" },
                ].map((dim) => {
                  const values = rows.map((r) =>
                    dim.key === "satisfacao_global" ? r.satisfacao_global : r[dim.key as LikertKey],
                  );
                  const counts = [1, 2, 3, 4, 5].map((n) => values.filter((v) => v === n).length);
                  return (
                    <tr key={dim.key} className="border-b border-border last:border-0">
                      <td className="px-4 py-3">{dim.label}</td>
                      <td className="px-4 py-3 font-semibold tabular-nums">
                        {average(values).toFixed(2)}
                      </td>
                      <td className="px-4 py-3">
                        <div className="space-y-1">
                          {counts.map((count, i) => (
                            <div key={i} className="flex items-center gap-2">
                              <span className="w-3 text-xs tabular-nums text-muted-foreground">
                                {i + 1}
                              </span>
                              <Bar count={count} total={total} />
                              <span className="w-8 text-right text-xs tabular-nums text-muted-foreground">
                                {count}
                              </span>
                            </div>
                          ))}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="rounded-xl border border-border bg-card p-5">
            <p className="eyebrow">Recomendação a outro formador (0–10)</p>
            <p className="mt-1 font-display text-xl">
              Média {nps.average.toFixed(1)} · NPS {nps.nps}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Promotores (9–10): {nps.promoters} · Passivos (7–8): {nps.passives} · Detratores
              (0–6): {nps.detractors}
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-display text-xl">Comentários (anónimos)</h2>
            {rows.every(
              (r) => !r.pontos_fortes.trim() && !r.pontos_melhorar.trim() && !r.sugestoes.trim(),
            ) ? (
              <p className="rounded-xl border border-border bg-surface p-5 text-sm text-muted-foreground">
                Nenhuma resposta aberta preenchida até agora.
              </p>
            ) : (
              rows.map((row, i) => {
                if (
                  !row.pontos_fortes.trim() &&
                  !row.pontos_melhorar.trim() &&
                  !row.sugestoes.trim()
                )
                  return null;
                return (
                  <article key={row.id} className="rounded-xl border border-border bg-card p-5">
                    <p className="eyebrow">
                      Resposta {i + 1} · {row.perfil ?? "perfil não indicado"}
                    </p>
                    {row.pontos_fortes.trim() && (
                      <p className="mt-2 text-[0.95rem] leading-relaxed">
                        <strong>Pontos fortes:</strong> {row.pontos_fortes}
                      </p>
                    )}
                    {row.pontos_melhorar.trim() && (
                      <p className="mt-2 text-[0.95rem] leading-relaxed">
                        <strong>Pontos a melhorar:</strong> {row.pontos_melhorar}
                      </p>
                    )}
                    {row.sugestoes.trim() && (
                      <p className="mt-2 text-[0.95rem] leading-relaxed">
                        <strong>Sugestões:</strong> {row.sugestoes}
                      </p>
                    )}
                  </article>
                );
              })
            )}
          </div>
        </>
      )}
    </section>
  );
}

export const Route = createFileRoute("/_authenticated/formador")({
  head: () => ({
    meta: [
      { title: "Painel do formador | MF1 Comunicação e Escuta Ativa" },
      {
        name: "description",
        content:
          "Vista de leitura do progresso, respostas aos micro-quizzes e produções escritas dos participantes do módulo MF1.",
      },
      { property: "og:title", content: "Painel do formador — MF1" },
      {
        property: "og:description",
        content: "Acompanhamento do percurso dos participantes do módulo MF1.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: TrainerPage,
});

/* ---------- Tipos e utilitários ---------- */

type ModuleTab = "mf1" | "mf2" | "mf3";
type TrainerProgressRow = ProgressRow & AdminProgress;
type PanelTab = ModuleTab | "avaliacao";

type ModuleConfig = {
  key: ModuleTab;
  label: string;
  sectionOrder: { id: string; label: string }[];
  stopIds: string[];
  quizIds: readonly string[];
  /** Quizzes da avaliação final da formação (síntese) — sempre uma categoria separada. */
  finalQuizIds: readonly string[];
  /** Filtro de pertença de um id de secção/quiz/atividade a este módulo. */
  owns: (id: string) => boolean;
};

/** Quizzes de autoavaliação final de cada módulo — NUNCA contam como micro-quizzes avaliados. */
const MF1_FINAL_QUIZ_IDS = ["final-1", "final-2", "final-3", "final-4", "final-5"] as const;
const MF2_FINAL_QUIZ_IDS = [
  "mf2-sintese-quiz-1",
  "mf2-sintese-quiz-2",
  "mf2-sintese-quiz-3",
  "mf2-sintese-quiz-4",
] as const;
const MF3_FINAL_QUIZ_IDS = [
  "mf3-sintese-quiz-1",
  "mf3-sintese-quiz-2",
  "mf3-sintese-quiz-3",
  "mf3-sintese-quiz-4",
] as const;

/** Ordem canónica das secções, igual ao mapa do módulo (com as atividades aninhadas). */
function buildSectionOrder(
  stops: typeof STOPS,
  activitiesStopId: string,
  activities: typeof ACTIVITIES,
  activityPrefix: string,
) {
  return stops.flatMap((stop) =>
    stop.id === activitiesStopId
      ? [
          { id: stop.id, label: stop.shortTitle },
          ...activities.map((a) => ({
            id: `${activityPrefix}${a.id}`,
            label: `  Atividade ${a.letter} · ${a.title}`,
          })),
        ]
      : [{ id: stop.id, label: stop.shortTitle }],
  );
}

const MODULES: Record<ModuleTab, ModuleConfig> = {
  mf1: {
    key: "mf1",
    label: "MF1 · Comunicação e Escuta Ativa",
    sectionOrder: buildSectionOrder(STOPS, "aprendizagem-ativa", ACTIVITIES, "atividade-"),
    stopIds: STOPS.map((s) => s.id),
    quizIds: BLOCK_QUIZ_IDS,
    finalQuizIds: MF1_FINAL_QUIZ_IDS,
    owns: (id) => !id.startsWith("mf2-") && !id.startsWith("mf3-"),
  },
  mf2: {
    key: "mf2",
    label: "MF2 · Dinâmicas e Causas do Conflito",
    sectionOrder: buildSectionOrder(MF2_STOPS, "mf2-atividades", MF2_ACTIVITIES, "mf2-atividade-"),
    stopIds: MF2_STOPS.map((s) => s.id),
    quizIds: MF2_BLOCK_QUIZ_IDS,
    finalQuizIds: MF2_FINAL_QUIZ_IDS,
    owns: (id) => id.startsWith("mf2-"),
  },
  mf3: {
    key: "mf3",
    label: "MF3 · Estratégias de Resolução de Conflitos",
    sectionOrder: buildSectionOrder(MF3_STOPS, "mf3-atividades", MF3_ACTIVITIES, "mf3-atividade-"),
    stopIds: MF3_STOPS.map((s) => s.id),
    quizIds: MF3_BLOCK_QUIZ_IDS,
    finalQuizIds: MF3_FINAL_QUIZ_IDS,
    owns: (id) => id.startsWith("mf3-"),
  },
};

function formatDate(value: string) {
  return new Date(value).toLocaleString("pt-PT", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/* ---------- Página ---------- */

function TrainerPage() {
  const [tab, setTab] = useState<PanelTab>("mf1");
  const roleQuery = useQuery({
    queryKey: ["formador", "role"],
    queryFn: async () => {
      const { data: auth } = await supabase.auth.getUser();
      const userId = auth.user?.id;
      if (!userId) return { userId: null, role: null };
      const { data } = await supabase
        .from("profiles")
        .select("id, role")
        .eq("id", userId)
        .maybeSingle();
      return { userId, role: data?.role ?? null };
    },
  });

  const isFormador = roleQuery.data?.role === "formador";

  const dataQuery = useQuery({
    queryKey: ["formador", "dados"],
    enabled: isFormador,
    queryFn: async () => {
      const [profiles, progress, quiz, responses] = await Promise.all([
        supabase
          .from("profiles")
          .select("id, email, role, created_at, nome_proprio, apelido, nota_formador"),
        supabase.from("progress").select("user_id, section_id, status, updated_at, completed_by_admin, admin_completed_at, admin_completed_by"),
        supabase
          .from("quiz_answers")
          .select(
            "user_id, quiz_id, selected_option, is_correct, answered_at, first_option, first_is_correct, first_answered_at, attempts, first_is_legacy",
          )
          .in("quiz_id", [
            ...BLOCK_QUIZ_IDS,
            ...MF2_BLOCK_QUIZ_IDS,
            ...MF3_BLOCK_QUIZ_IDS,
            ...MF1_FINAL_QUIZ_IDS,
            ...MF2_FINAL_QUIZ_IDS,
            ...MF3_FINAL_QUIZ_IDS,
          ]),
        supabase
          .from("written_responses")
          .select("user_id, activity_id, response_text, submitted_at, revealed_text, revealed_at"),
      ]);
      return {
        profiles: (profiles.data ?? []) as ProfileRow[],
        progress: (progress.data ?? []) as TrainerProgressRow[],
        quiz: (quiz.data ?? []) as QuizRow[],
        responses: (responses.data ?? []) as ResponseRow[],
      };
    },
  });

  if (roleQuery.isLoading) {
    return <p className="text-sm text-muted-foreground">A verificar permissões…</p>;
  }

  if (!isFormador) {
    return (
      <section className="rounded-2xl border border-destructive/40 bg-destructive-soft p-6 sm:p-8">
        <p className="eyebrow flex items-center gap-2">
          <ShieldAlert className="size-4" /> Acesso restrito
        </p>
        <h1 className="mt-2 font-display text-2xl">Esta área é reservada a formadores</h1>
        <p className="mt-3 max-w-xl text-[0.975rem] leading-relaxed text-muted-foreground">
          A sua conta está registada como participante do módulo, pelo que não tem acesso ao painel
          de acompanhamento. Se é formador deste curso e devia ter acesso, contacte a coordenação da
          formação para que o seu perfil seja atualizado.
        </p>
      </section>
    );
  }

  return (
    <article>
      <header className="rounded-2xl border border-border bg-card p-6 shadow-soft sm:p-8">
        <p className="eyebrow flex items-center gap-2">
          <Users className="size-4" /> Painel do formador
        </p>
        <h1 className="mt-2 font-display text-3xl leading-tight">
          Acompanhamento dos participantes
        </h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Progresso por secção, respostas aos micro-quizzes e produções escritas. Pode ainda
          adicionar uma nota a cada participante e remover registos incorretos (contas de teste ou
          inscrições duplicadas) — essas ações não alteram o conteúdo avaliado.
        </p>
      </header>

      <ModuleAvailabilityPanel />
      <SectionSchedulePanel />

      <nav
        aria-label="Módulos e avaliação"
        className="mt-6 flex flex-wrap items-center gap-1 rounded-xl border border-border bg-card p-1"
      >
        {(["mf1", "mf2", "mf3", "avaliacao"] as PanelTab[]).map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => setTab(key)}
            className={cn(
              "rounded-lg px-3 py-2 text-xs font-semibold transition-colors sm:text-sm",
              tab === key
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            {key === "avaliacao" ? "Avaliação da Formação" : MODULES[key].label}
          </button>
        ))}
      </nav>

      {tab === "avaliacao" ? (
        <EvaluationSummary isFormador={isFormador} />
      ) : dataQuery.isLoading ? (
        <p className="mt-8 text-sm text-muted-foreground">A carregar dados…</p>
      ) : dataQuery.data ? (
        <ParticipantsTable
          key={tab}
          ownId={roleQuery.data?.userId ?? null}
          isFormador={isFormador}
          module={MODULES[tab]}
          data={dataQuery.data}
        />
      ) : (
        <p className="mt-8 text-sm text-muted-foreground">Não foi possível carregar os dados.</p>
      )}
    </article>
  );
}

/* ---------- Tabela de participantes ---------- */

type SortKey = "email" | "created_at" | "percent" | "score";

const ALL_MODULES: ExportModule[] = [MODULES.mf1, MODULES.mf2, MODULES.mf3];

/** Botão de exportação. Só é renderizado a formadores; a query subjacente já está
 * restringida pelo papel (RLS + verificação em TrainerPage). */
function ExportButton({
  isFormador,
  label,
  onExport,
}: {
  isFormador: boolean;
  label: string;
  onExport: () => Promise<void>;
}) {
  const [busy, setBusy] = useState(false);
  if (!isFormador) return null;
  return (
    <button
      type="button"
      disabled={busy}
      onClick={async (event) => {
        event.stopPropagation();
        setBusy(true);
        try {
          await onExport();
        } finally {
          setBusy(false);
        }
      }}
      className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3.5 py-2 text-xs font-semibold text-foreground transition-colors hover:bg-muted disabled:opacity-60 sm:text-sm"
    >
      <Download className="size-4" aria-hidden />
      {busy ? "A gerar ficheiro…" : label}
    </button>
  );
}

function ParticipantsTable({
  ownId,
  isFormador,
  module,
  data,
}: {
  ownId: string | null;
  isFormador: boolean;
  module: ModuleConfig;
  data: Dataset;
}) {
  const [sort, setSort] = useState<{ key: SortKey; asc: boolean }>({
    key: "email",
    asc: true,
  });
  const [openId, setOpenId] = useState<string | null>(null);

  const rows = useMemo(() => {
    return data.profiles
      .filter((p) => p.id !== ownId && p.role !== "formador")
      .map((profile) => {
        const progress = data.progress.filter(
          (r) => r.user_id === profile.id && module.owns(r.section_id),
        );
        const completedStops = progress.filter(
          (r) => r.status === "concluido" && module.stopIds.includes(r.section_id),
        ).length;
        const quiz = data.quiz.filter(
          (r) => r.user_id === profile.id && module.quizIds.includes(r.quiz_id),
        );
        // Conta a primeira resposta; em registos anteriores à correção usa o valor atual.
        const correct = quiz.filter((r) => r.first_is_correct ?? r.is_correct).length;
        const legacy = quiz.filter((r) => r.first_is_legacy).length;
        return {
          profile,
          progress,
          quiz,
          responses: data.responses.filter(
            (r) => r.user_id === profile.id && module.owns(r.activity_id),
          ),
          percent: Math.min(100, Math.round((completedStops / module.stopIds.length) * 100)),
          answered: quiz.length,
          correct,
          legacy,
        };
      })
      .sort((a, b) => {
        const dir = sort.asc ? 1 : -1;
        switch (sort.key) {
          case "email":
            return a.profile.email.localeCompare(b.profile.email) * dir;
          case "created_at":
            return a.profile.created_at.localeCompare(b.profile.created_at) * dir;
          case "percent":
            return (a.percent - b.percent) * dir;
          case "score":
            return (a.correct - b.correct || a.answered - b.answered) * dir;
        }
      });
  }, [data, module, ownId, sort]);

  const toggleSort = (key: SortKey) =>
    setSort((prev) => ({ key, asc: prev.key === key ? !prev.asc : true }));

  const header = (key: SortKey, label: string) => (
    <th className="px-4 py-3 text-left">
      <button
        type="button"
        onClick={() => toggleSort(key)}
        className={cn(
          "inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wide",
          sort.key === key ? "text-primary" : "text-muted-foreground hover:text-foreground",
        )}
      >
        {label}
        {sort.key === key ? <span aria-hidden>{sort.asc ? "▲" : "▼"}</span> : null}
      </button>
    </th>
  );

  if (rows.length === 0) {
    return (
      <p className="mt-8 rounded-xl border border-border bg-surface p-5 text-sm text-muted-foreground">
        Ainda não há participantes registados no módulo.
      </p>
    );
  }

  return (
    <section className="mt-8">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">
          {rows.length} participante{rows.length === 1 ? "" : "s"} (formadores excluídos)
        </p>
        <ExportButton
          isFormador={isFormador}
          label="Exportar resultados da turma"
          onExport={() =>
            exportClassWorkbook(
              rows.map((r) => r.profile),
              ALL_MODULES,
              data,
            )
          }
        />
      </div>
      <div className="overflow-x-auto rounded-xl border border-border bg-card">
        <table className="w-full min-w-[38rem] border-collapse text-[0.95rem]">
          <thead className="border-b border-border bg-surface">
            <tr>
              {header("email", "Participante")}
              {header("created_at", "Registo")}
              {header("percent", "Progresso")}
              {header("score", "Micro-quizzes")}
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const isOpen = openId === row.profile.id;
              return (
                <Fragment key={row.profile.id}>
                  <tr
                    className={cn(
                      "cursor-pointer border-b border-border/70 transition-colors hover:bg-muted/60",
                      isOpen && "bg-primary-soft",
                    )}
                    onClick={() => setOpenId(isOpen ? null : row.profile.id)}
                  >
                    <td className="px-4 py-3">
                      {fullNameOf(row.profile) ? (
                        <>
                          <span className="font-medium">{fullNameOf(row.profile)}</span>
                          <span className="block text-xs text-muted-foreground">
                            {row.profile.email}
                          </span>
                        </>
                      ) : (
                        <span className="font-medium">{row.profile.email}</span>
                      )}
                      {row.profile.nota_formador?.trim() ? (
                        <span className="mt-0.5 block text-xs font-normal text-accent">
                          Nota: {row.profile.nota_formador}
                        </span>
                      ) : null}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {formatDate(row.profile.created_at)}
                    </td>
                    <td className="px-4 py-3">
                      <span className="font-display">{row.percent}%</span>
                      <span className="ml-2 text-xs text-muted-foreground">
                        {
                          row.progress.filter(
                            (r) =>
                              r.status === "concluido" && module.stopIds.includes(r.section_id),
                          ).length
                        }
                        /{module.stopIds.length} secções
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {row.answered === 0 ? (
                        <span className="text-muted-foreground">—</span>
                      ) : (
                        <>
                          <span className="font-display">
                            {row.correct}/{row.answered}
                          </span>
                          <span className="ml-2 text-xs text-muted-foreground">
                            corretas à primeira ({module.quizIds.length} micro-quizzes avaliados nos
                            blocos)
                          </span>
                          {row.legacy > 0 ? (
                            <span className="ml-2 rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                              {row.legacy} registo{row.legacy === 1 ? "" : "s"} anterior
                              {row.legacy === 1 ? "" : "es"} à correção
                            </span>
                          ) : null}
                        </>
                      )}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {isOpen ? (
                        <ChevronDown className="size-4" />
                      ) : (
                        <ChevronRight className="size-4" />
                      )}
                    </td>
                  </tr>
                  {isOpen ? (
                    <tr>
                      <td colSpan={5} className="border-b border-border bg-surface px-4 py-6">
                        <ParticipantDetail
                          module={module}
                          isFormador={isFormador}
                          profile={row.profile}
                          dataset={data}
                          email={row.profile.email}
                          onDeleted={() => setOpenId(null)}
                          progress={row.progress}
                          quiz={row.quiz}
                          responses={row.responses}
                        />
                      </td>
                    </tr>
                  ) : null}
                </Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}

/* ---------- Vista detalhada ---------- */

function ParticipantDetail({
  module,
  isFormador,
  profile,
  dataset,
  email,
  onDeleted,
  progress,
  quiz,
  responses,
}: {
  module: ModuleConfig;
  isFormador: boolean;
  profile: ProfileRow;
  dataset: Dataset;
  email: string;
  onDeleted: () => void;
  progress: TrainerProgressRow[];
  quiz: QuizRow[];
  responses: ResponseRow[];
}) {
  const statusOf = (sectionId: string) => {
    const row = progress.find((r) => r.section_id === sectionId);
    if (!row) return { label: "Não iniciado", tone: "muted" as const };
    if (row.status === "concluido") return { label: "Concluído", tone: "good" as const };
    return { label: "Iniciado", tone: "warn" as const };
  };

  const sortedQuiz = [...quiz].sort((a, b) => a.quiz_id.localeCompare(b.quiz_id));
  const sortedResponses = [...responses]
    .filter((r) => r.response_text.trim().length > 0)
    .sort((a, b) => a.activity_id.localeCompare(b.activity_id));

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">
          Detalhe de <span className="font-medium text-foreground">{email}</span>
        </p>
        <ExportButton
          isFormador={isFormador}
          label="Exportar resultados"
          onExport={() => exportParticipantWorkbook(profile, ALL_MODULES, dataset)}
        />
      </div>

      <ParticipantNote profile={profile} />

      <DeleteParticipant profile={profile} onDeleted={onDeleted} />

      <section>
        <h3 className="font-display text-lg">Estado das secções</h3>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {module.sectionOrder.map((section) => {
            const status = statusOf(section.id);
            return (
              <li
                key={section.id}
                className="flex flex-col items-start justify-between gap-3 rounded-lg border border-border bg-card px-4 py-2.5 text-[0.9rem]"
              >
                <span className="min-w-0">{section.label.trim()}</span>
                <div className="flex flex-wrap items-center gap-2">
                <span
                  className={cn(
                    "shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold",
                    status.tone === "good"
                      ? "bg-success-soft text-success"
                      : status.tone === "warn"
                        ? "bg-accent-soft text-accent"
                        : "bg-muted text-muted-foreground",
                  )}
                >
                  {status.label}
                </span>
                {progress.find((r) => r.section_id === section.id)?.completed_by_admin && (
                  <span className="text-xs font-semibold text-primary" title="Concluído pela administração">Adm.</span>
                )}
                {isFormador && <AdminCompletionControl userId={profile.id} sectionId={section.id}
                  label={section.label.trim()} progress={progress.find((r) => r.section_id === section.id)} />}
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      <section>
        <h3 className="font-display text-lg">
          Respostas aos micro-quizzes avaliados dos blocos ({module.quizIds.length})
        </h3>
        {sortedQuiz.length === 0 ? (
          <p className="mt-2 text-sm text-muted-foreground">Ainda sem respostas registadas.</p>
        ) : (
          <div className="mt-3 overflow-x-auto rounded-lg border border-border bg-card">
            <table className="w-full min-w-[32rem] border-collapse text-[0.9rem]">
              <thead className="border-b border-border bg-surface text-xs uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th className="px-3 py-2 text-left">Quiz</th>
                  <th className="px-3 py-2 text-left">Primeira resposta</th>
                  <th className="px-3 py-2 text-left">Correta à primeira</th>
                  <th className="px-3 py-2 text-left">Tent.</th>
                  <th className="px-3 py-2 text-left">Última resposta</th>
                  <th className="px-3 py-2 text-left">Quando (1.ª)</th>
                </tr>
              </thead>
              <tbody>
                {sortedQuiz.map((row) => {
                  const first = readOption(row.first_option ?? row.selected_option);
                  const last = readOption(row.selected_option);
                  const firstCorrect = row.first_is_correct ?? row.is_correct;
                  return (
                    <tr key={row.quiz_id} className="border-b border-border/60 last:border-0">
                      <td className="px-3 py-2 font-mono text-xs">{row.quiz_id}</td>
                      <td className="px-3 py-2">
                        <span className="font-semibold">{first.letter})</span>{" "}
                        {first.text || "(texto não registado)"}
                        {row.first_is_legacy ? (
                          <span className="ml-2 rounded-full bg-muted px-2 py-0.5 text-[0.7rem] text-muted-foreground">
                            anterior à correção
                          </span>
                        ) : null}
                      </td>
                      <td className="px-3 py-2">
                        <span
                          className={cn(
                            "rounded-full px-2.5 py-0.5 text-xs font-semibold",
                            firstCorrect
                              ? "bg-success-soft text-success"
                              : "bg-accent-soft text-accent",
                          )}
                        >
                          {firstCorrect ? "Sim" : "Não"}
                        </span>
                      </td>
                      <td className="px-3 py-2 tabular-nums text-muted-foreground">
                        {row.attempts}
                      </td>
                      <td className="px-3 py-2 text-muted-foreground">
                        <span className="font-semibold">{last.letter})</span>{" "}
                        {last.text || "(texto não registado)"} —{" "}
                        {row.is_correct ? "correta" : "incorreta"}
                      </td>
                      <td className="px-3 py-2 text-muted-foreground">
                        {formatDate(row.first_answered_at ?? row.answered_at)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section>
        <h3 className="font-display text-lg">
          Respostas escritas (atividades e reflexões formativas — não avaliadas)
        </h3>
        {sortedResponses.length === 0 ? (
          <p className="mt-2 text-sm text-muted-foreground">Ainda sem produções escritas.</p>
        ) : (
          <ul className="mt-3 space-y-3">
            {sortedResponses.map((row) => (
              <li key={row.activity_id} className="rounded-lg border border-border bg-card p-4">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="font-mono text-xs text-primary">{row.activity_id}</p>
                  <p className="text-xs text-muted-foreground">{formatDate(row.submitted_at)}</p>
                </div>
                <p className="mt-2 whitespace-pre-wrap text-[0.95rem] leading-relaxed">
                  {row.response_text}
                </p>
                {row.revealed_at ? (
                  <div className="mt-3 rounded-lg border border-primary/25 bg-primary-soft p-3">
                    <p className="text-xs font-semibold text-primary">
                      Submetido antes de ver o comentário ({formatDate(row.revealed_at)})
                    </p>
                    <p className="mt-1 whitespace-pre-wrap text-sm leading-relaxed">
                      {row.revealed_text}
                    </p>
                  </div>
                ) : null}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

/* ---------- Nota do formador por participante ---------- */

function ParticipantNote({ profile }: { profile: ProfileRow }) {
  const queryClient = useQueryClient();
  const [value, setValue] = useState(profile.nota_formador ?? "");
  const [state, setState] = useState<"idle" | "saving" | "saved" | "error">("idle");

  const dirty = value.trim() !== (profile.nota_formador ?? "").trim();

  async function save() {
    setState("saving");
    const { error } = await supabase
      .from("profiles")
      .update({ nota_formador: value.trim() || null })
      .eq("id", profile.id);
    if (error) {
      setState("error");
      return;
    }
    setState("saved");
    await queryClient.invalidateQueries({ queryKey: ["formador", "dados"] });
  }

  return (
    <section className="rounded-xl border border-border bg-card p-5">
      <h3 className="font-display text-lg">Nota do formador</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Etiqueta privada, visível apenas neste painel — útil para identificar participantes
        registados antes de o registo pedir o nome.
      </p>
      <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center">
        <input
          type="text"
          value={value}
          maxLength={200}
          onChange={(e) => {
            setValue(e.target.value);
            setState("idle");
          }}
          placeholder="Ex.: Ana Martins — inscrição presencial"
          aria-label={`Nota do formador para ${profile.email}`}
          className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
        <button
          type="button"
          disabled={!dirty || state === "saving"}
          onClick={() => void save()}
          className="inline-flex shrink-0 items-center justify-center rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {state === "saving" ? "A guardar…" : "Guardar nota"}
        </button>
      </div>
      {state === "saved" ? (
        <p className="mt-2 text-xs font-medium text-success">Nota guardada.</p>
      ) : null}
      {state === "error" ? (
        <p className="mt-2 text-xs font-medium text-destructive">
          Não foi possível guardar a nota. Tente novamente.
        </p>
      ) : null}
    </section>
  );
}

/* ---------- Remoção definitiva de um participante ---------- */

function DeleteParticipant({ profile, onDeleted }: { profile: ProfileRow; onDeleted: () => void }) {
  const queryClient = useQueryClient();
  const deleteFn = useServerFn(deleteParticipant);
  const [confirming, setConfirming] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function confirmDelete() {
    setBusy(true);
    setError(null);
    try {
      await deleteFn({ data: { userId: profile.id } });
      await queryClient.invalidateQueries({ queryKey: ["formador", "dados"] });
      onDeleted();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Não foi possível remover o participante.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="rounded-xl border border-destructive/40 bg-destructive-soft p-5">
      <h3 className="font-display text-lg text-destructive">Remover participante</h3>
      {!confirming ? (
        <>
          <p className="mt-1 text-sm text-muted-foreground">
            Elimina por completo esta conta e todos os dados associados (progresso, respostas a
            quizzes e produções escritas). Indicado para contas de teste ou registos incorretos.
          </p>
          <button
            type="button"
            onClick={() => setConfirming(true)}
            className="mt-3 inline-flex items-center gap-2 rounded-lg border border-destructive/50 bg-card px-3.5 py-2 text-sm font-semibold text-destructive transition-colors hover:bg-destructive/10"
          >
            <Trash2 className="size-4" aria-hidden /> Apagar participante…
          </button>
        </>
      ) : (
        <>
          <p className="mt-1 text-sm font-medium text-destructive">
            Ação irreversível: a conta {profile.email} e todos os seus dados de percurso serão
            apagados definitivamente.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              type="button"
              disabled={busy}
              onClick={() => void confirmDelete()}
              className="inline-flex items-center gap-2 rounded-lg bg-destructive px-3.5 py-2 text-sm font-semibold text-destructive-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              <Trash2 className="size-4" aria-hidden />
              {busy ? "A eliminar…" : "Confirmar eliminação definitiva"}
            </button>
            <button
              type="button"
              disabled={busy}
              onClick={() => setConfirming(false)}
              className="rounded-lg border border-border bg-card px-3.5 py-2 text-sm font-semibold transition-colors hover:bg-muted"
            >
              Cancelar
            </button>
          </div>
          {error ? <p className="mt-2 text-sm font-medium text-destructive">{error}</p> : null}
        </>
      )}
    </section>
  );
}
