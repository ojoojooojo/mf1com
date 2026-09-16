import { createFileRoute } from "@tanstack/react-router";
import { Fragment, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ChevronDown, ChevronRight, Download, ShieldAlert, Users } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { ACTIVITIES, BLOCK_QUIZ_IDS, STOPS } from "@/lib/course-data";
import { MF2_ACTIVITIES, MF2_BLOCK_QUIZ_IDS, MF2_STOPS } from "@/lib/course-data-mf2";
import { MF3_ACTIVITIES, MF3_BLOCK_QUIZ_IDS, MF3_STOPS } from "@/lib/course-data-mf3";
import {
  exportClassWorkbook,
  exportParticipantWorkbook,
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
  MODULE_KEYS,
  MODULE_SHORT_LABELS,
  useModuleStatuses,
  useSetModuleOpen,
} from "@/lib/module-status";
import { Lock, LockOpen } from "lucide-react";

/* ---------- Estado de abertura dos módulos ---------- */

function ModuleAvailabilityPanel() {
  const statuses = useModuleStatuses();
  const setOpen = useSetModuleOpen();

  return (
    <section className="mt-6 rounded-2xl border border-border bg-card p-6 shadow-soft sm:p-8">
      <h2 className="font-display text-xl leading-tight">Módulos do curso</h2>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        Controle que módulos estão disponíveis aos participantes. Fechar um módulo não apaga nem
        altera qualquer progresso, resposta a quizzes ou produção escrita.
      </p>

      {statuses.isLoading ? (
        <p className="mt-4 text-sm text-muted-foreground">A carregar estado dos módulos…</p>
      ) : (
        <ul className="mt-5 space-y-3">
          {MODULE_KEYS.map((key) => {
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
                    {isOpen ? <LockOpen className="size-3.5" /> : <Lock className="size-3.5" />}
                    {isOpen ? "Aberto" : "Fechado"}
                  </p>
                </div>
                <button
                  type="button"
                  disabled={busy}
                  onClick={() => setOpen.mutate({ moduleKey: key, isOpen: !isOpen })}
                  aria-label={`${isOpen ? "Fechar" : "Abrir"} ${MODULE_SHORT_LABELS[key]}`}
                  className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-border bg-card px-3.5 py-2 text-xs font-semibold transition-colors hover:bg-muted disabled:opacity-60 sm:text-sm"
                >
                  {busy ? "A guardar…" : isOpen ? "Fechar módulo" : "Abrir módulo"}
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
    sectionOrder: buildSectionOrder(
      MF2_STOPS,
      "mf2-atividades",
      MF2_ACTIVITIES,
      "mf2-atividade-",
    ),
    stopIds: MF2_STOPS.map((s) => s.id),
    quizIds: MF2_BLOCK_QUIZ_IDS,
    finalQuizIds: MF2_FINAL_QUIZ_IDS,
    owns: (id) => id.startsWith("mf2-"),
  },
  mf3: {
    key: "mf3",
    label: "MF3 · Estratégias de Resolução de Conflitos",
    sectionOrder: buildSectionOrder(
      MF3_STOPS,
      "mf3-atividades",
      MF3_ACTIVITIES,
      "mf3-atividade-",
    ),
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
        supabase.from("profiles").select("id, email, role, created_at"),
        supabase.from("progress").select("user_id, section_id, status, updated_at"),
        supabase
          .from("quiz_answers")
          .select("user_id, quiz_id, selected_option, is_correct, answered_at")
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
          .select("user_id, activity_id, response_text, submitted_at"),
      ]);
      return {
        profiles: (profiles.data ?? []) as ProfileRow[],
        progress: (progress.data ?? []) as ProgressRow[],
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
        <h1 className="mt-2 font-display text-3xl leading-tight">Acompanhamento dos participantes</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Vista de leitura: progresso por secção, respostas aos micro-quizzes e produções escritas.
          Nada nesta página é editável e nada é classificado.
        </p>
      </header>

      <ModuleAvailabilityPanel />


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
        const correct = quiz.filter((r) => r.is_correct).length;
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
                    <td className="px-4 py-3 font-medium">{row.profile.email}</td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {formatDate(row.profile.created_at)}
                    </td>
                    <td className="px-4 py-3">
                      <span className="font-display">{row.percent}%</span>
                      <span className="ml-2 text-xs text-muted-foreground">
                        {row.progress.filter(
                          (r) => r.status === "concluido" && module.stopIds.includes(r.section_id),
                        ).length}
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
                            corretas ({module.quizIds.length} micro-quizzes avaliados nos blocos)
                          </span>
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
  progress,
  quiz,
  responses,
}: {
  module: ModuleConfig;
  isFormador: boolean;
  profile: ProfileRow;
  dataset: Dataset;
  email: string;
  progress: ProgressRow[];
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

      <section>
        <h3 className="font-display text-lg">Estado das secções</h3>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {module.sectionOrder.map((section) => {
            const status = statusOf(section.id);
            return (
              <li
                key={section.id}
                className="flex items-center justify-between gap-3 rounded-lg border border-border bg-card px-4 py-2.5 text-[0.9rem]"
              >
                <span className="min-w-0 truncate">{section.label.trim()}</span>
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
                  <th className="px-3 py-2 text-left">Opção escolhida</th>
                  <th className="px-3 py-2 text-left">Correta</th>
                  <th className="px-3 py-2 text-left">Quando</th>
                </tr>
              </thead>
              <tbody>
                {sortedQuiz.map((row) => {
                  const option = readOption(row.selected_option);
                  return (
                    <tr key={row.quiz_id} className="border-b border-border/60 last:border-0">
                      <td className="px-3 py-2 font-mono text-xs">{row.quiz_id}</td>
                      <td className="px-3 py-2">
                        <span className="font-semibold">{option.letter})</span>{" "}
                        {option.text || "(texto não registado)"}
                      </td>
                      <td className="px-3 py-2">
                        <span
                          className={cn(
                            "rounded-full px-2.5 py-0.5 text-xs font-semibold",
                            row.is_correct
                              ? "bg-success-soft text-success"
                              : "bg-accent-soft text-accent",
                          )}
                        >
                          {row.is_correct ? "Sim" : "Não"}
                        </span>
                      </td>
                      <td className="px-3 py-2 text-muted-foreground">
                        {formatDate(row.answered_at)}
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
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
