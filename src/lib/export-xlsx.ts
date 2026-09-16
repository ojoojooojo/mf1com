import ExcelJS from "exceljs";
import { average, npsOf, type EvaluationRow, type LikertKey } from "./evaluation";

/* ---------- Tipos partilhados com o painel do formador ---------- */

export type ProfileRow = { id: string; email: string; role: string; created_at: string };
export type ProgressRow = {
  user_id: string;
  section_id: string;
  status: string;
  updated_at: string;
};
export type QuizRow = {
  user_id: string;
  quiz_id: string;
  selected_option: string;
  is_correct: boolean;
  answered_at: string;
};
export type ResponseRow = {
  user_id: string;
  activity_id: string;
  response_text: string;
  submitted_at: string;
};

export type ExportModule = {
  key: string;
  label: string;
  stopIds: string[];
  /** Micro-quizzes avaliados dos blocos. */
  quizIds: readonly string[];
  /** Quizzes da avaliação final da formação (síntese) — categoria separada. */
  finalQuizIds: readonly string[];
  owns: (id: string) => boolean;
};

export type Dataset = {
  profiles: ProfileRow[];
  progress: ProgressRow[];
  quiz: QuizRow[];
  responses: ResponseRow[];
};

/* ---------- Utilitários (espelham o que é mostrado no ecrã) ---------- */

/** `selected_option` é guardado como "índice|texto da opção". */
export function readOption(value: string) {
  const [rawIndex, ...rest] = value.split("|");
  const index = Number.parseInt(rawIndex ?? "", 10);
  const letter = Number.isNaN(index) ? "?" : String.fromCharCode(97 + index);
  return { letter, text: rest.join("|") };
}

const DATE_FMT = "dd/mm/yyyy hh:mm";
const PCT_FMT = "0%";

type ColumnKind = "text" | "long" | "date" | "percent" | "number";
type ColumnDef = { header: string; width: number; kind?: ColumnKind };

function toDate(value: string | null | undefined) {
  if (!value) return null;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d;
}

/** Nome de folha válido no Excel: máx. 31 caracteres, sem : \ / ? * [ ] */
function safeSheetName(name: string) {
  return name.replace(/[:\\/?*[\]]/g, "-").slice(0, 31);
}

function addSheet(
  workbook: ExcelJS.Workbook,
  name: string,
  columns: ColumnDef[],
  rows: (string | number | Date | null)[][],
  options: { autofilter?: boolean } = {},
) {
  const sheet = workbook.addWorksheet(safeSheetName(name));
  sheet.columns = columns.map((c) => ({ header: c.header, width: c.width }));

  const headerRow = sheet.getRow(1);
  headerRow.font = { bold: true, color: { argb: "FFFFFFFF" }, name: "Arial", size: 11 };
  headerRow.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FF1F3864" } };
  headerRow.alignment = { vertical: "middle" };
  headerRow.height = 22;

  rows.forEach((values) => {
    const row = sheet.addRow(values);
    row.font = { name: "Arial", size: 11 };
    columns.forEach((col, i) => {
      const cell = row.getCell(i + 1);
      if (col.kind === "date") cell.numFmt = DATE_FMT;
      if (col.kind === "percent") cell.numFmt = PCT_FMT;
      if (col.kind === "long") {
        cell.alignment = { wrapText: true, vertical: "top" };
      } else {
        cell.alignment = { vertical: "top" };
      }
    });
  });

  sheet.views = [{ state: "frozen", ySplit: 1 }];
  if (options.autofilter && rows.length > 0) {
    sheet.autoFilter = {
      from: { row: 1, column: 1 },
      to: { row: 1, column: columns.length },
    };
  }
  return sheet;
}

async function download(workbook: ExcelJS.Workbook, filename: string) {
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function fileStamp() {
  const now = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
}

function slug(email: string) {
  return email.replace(/[^a-zA-Z0-9]+/g, "-").replace(/^-|-$/g, "");
}

/* ---------- Estatísticas (só de leitura) ---------- */

type ModuleStats = {
  module: ExportModule;
  completedStops: number;
  totalStops: number;
  percent: number;
  microAnswered: number;
  microCorrect: number;
  finalAnswered: number;
  finalCorrect: number;
  writtenCount: number;
};

function statsFor(module: ExportModule, data: Dataset, userId: string): ModuleStats {
  const progress = data.progress.filter(
    (r) => r.user_id === userId && module.owns(r.section_id),
  );
  const completedStops = progress.filter(
    (r) => r.status === "concluido" && module.stopIds.includes(r.section_id),
  ).length;
  const micro = data.quiz.filter(
    (r) => r.user_id === userId && module.quizIds.includes(r.quiz_id),
  );
  const final = data.quiz.filter(
    (r) => r.user_id === userId && module.finalQuizIds.includes(r.quiz_id),
  );
  const written = data.responses.filter(
    (r) =>
      r.user_id === userId && module.owns(r.activity_id) && r.response_text.trim().length > 0,
  );
  return {
    module,
    completedStops,
    totalStops: module.stopIds.length,
    percent: Math.min(1, completedStops / Math.max(1, module.stopIds.length)),
    microAnswered: micro.length,
    microCorrect: micro.filter((r) => r.is_correct).length,
    finalAnswered: final.length,
    finalCorrect: final.filter((r) => r.is_correct).length,
    writtenCount: written.length,
  };
}

const SUMMARY_COLUMNS: ColumnDef[] = [
  { header: "Módulo", width: 42 },
  { header: "Secções concluídas", width: 20, kind: "number" },
  { header: "Total de secções", width: 18, kind: "number" },
  { header: "Progresso", width: 12, kind: "percent" },
  { header: "Micro-quizzes avaliados (total)", width: 30, kind: "number" },
  { header: "Micro-quizzes respondidos", width: 26, kind: "number" },
  { header: "Micro-quizzes corretos", width: 24, kind: "number" },
  { header: "% acerto micro-quizzes", width: 22, kind: "percent" },
  { header: "Avaliação final (total)", width: 22, kind: "number" },
  { header: "Avaliação final respondidas", width: 27, kind: "number" },
  { header: "Avaliação final corretas", width: 25, kind: "number" },
  { header: "% acerto avaliação final", width: 24, kind: "percent" },
  { header: "Respostas escritas", width: 20, kind: "number" },
];

function summaryRow(label: string, s: ModuleStats) {
  return [
    label,
    s.completedStops,
    s.totalStops,
    s.percent,
    s.module.quizIds.length,
    s.microAnswered,
    s.microCorrect,
    s.microAnswered > 0 ? s.microCorrect / s.microAnswered : 0,
    s.module.finalQuizIds.length,
    s.finalAnswered,
    s.finalCorrect,
    s.finalAnswered > 0 ? s.finalCorrect / s.finalAnswered : 0,
    s.writtenCount,
  ];
}

function totalsRow(label: string, all: ModuleStats[]) {
  const sum = (pick: (s: ModuleStats) => number) => all.reduce((acc, s) => acc + pick(s), 0);
  const microAnswered = sum((s) => s.microAnswered);
  const microCorrect = sum((s) => s.microCorrect);
  const finalAnswered = sum((s) => s.finalAnswered);
  const finalCorrect = sum((s) => s.finalCorrect);
  const completed = sum((s) => s.completedStops);
  const total = sum((s) => s.totalStops);
  return [
    label,
    completed,
    total,
    total > 0 ? completed / total : 0,
    sum((s) => s.module.quizIds.length),
    microAnswered,
    microCorrect,
    microAnswered > 0 ? microCorrect / microAnswered : 0,
    sum((s) => s.module.finalQuizIds.length),
    finalAnswered,
    finalCorrect,
    finalAnswered > 0 ? finalCorrect / finalAnswered : 0,
    sum((s) => s.writtenCount),
  ];
}

/* ---------- Folhas de detalhe ---------- */

const QUIZ_COLUMNS: ColumnDef[] = [
  { header: "Categoria", width: 28 },
  { header: "Quiz (id)", width: 34 },
  { header: "Opção", width: 8 },
  { header: "Resposta escolhida", width: 60, kind: "long" },
  { header: "Correta", width: 10 },
  { header: "Data da resposta", width: 20, kind: "date" },
];

const MICRO_LABEL = "Micro-quiz avaliado (bloco)";
const FINAL_LABEL = "Avaliação final da formação";

function quizRowsFor(module: ExportModule, rows: QuizRow[]) {
  const build = (category: string, ids: readonly string[]) =>
    rows
      .filter((r) => ids.includes(r.quiz_id))
      .sort((a, b) => a.quiz_id.localeCompare(b.quiz_id))
      .map((r) => {
        const option = readOption(r.selected_option);
        return [
          category,
          r.quiz_id,
          `${option.letter})`,
          option.text || "(texto não registado)",
          r.is_correct ? "Sim" : "Não",
          toDate(r.answered_at),
        ] as (string | number | Date | null)[];
      });
  return [...build(MICRO_LABEL, module.quizIds), ...build(FINAL_LABEL, module.finalQuizIds)];
}

const WRITTEN_COLUMNS: ColumnDef[] = [
  { header: "Módulo", width: 12 },
  { header: "Atividade / reflexão (id)", width: 40 },
  { header: "Resposta escrita", width: 100, kind: "long" },
  { header: "Data de submissão", width: 20, kind: "date" },
];

function moduleKeyOf(modules: ExportModule[], id: string) {
  return modules.find((m) => m.owns(id))?.key.toUpperCase() ?? "—";
}

function writtenRowsFor(modules: ExportModule[], rows: ResponseRow[]) {
  return rows
    .filter((r) => r.response_text.trim().length > 0)
    .sort((a, b) => a.activity_id.localeCompare(b.activity_id))
    .map(
      (r) =>
        [
          moduleKeyOf(modules, r.activity_id),
          r.activity_id,
          r.response_text,
          toDate(r.submitted_at),
        ] as (string | number | Date | null)[],
    );
}

/* ---------- Exportação individual ---------- */

export async function exportParticipantWorkbook(
  profile: ProfileRow,
  modules: ExportModule[],
  data: Dataset,
) {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = "Gestão de Conflitos na Formação";
  workbook.created = new Date();

  const stats = modules.map((m) => statsFor(m, data, profile.id));

  const resumo = addSheet(workbook, "RESUMO", SUMMARY_COLUMNS, [
    ...stats.map((s) => summaryRow(s.module.label, s)),
    totalsRow("TOTAL DA FORMAÇÃO (MF1+MF2+MF3)", stats),
  ]);
  resumo.spliceRows(1, 0, [`Participante: ${profile.email}`], [
    `Exportado em: ${new Date().toLocaleString("pt-PT")}`,
  ]);
  resumo.getRow(1).font = { bold: true, name: "Arial", size: 12 };
  resumo.getRow(2).font = { name: "Arial", size: 10 };
  resumo.views = [{ state: "frozen", ySplit: 3 }];

  modules.forEach((module) => {
    const rows = quizRowsFor(
      module,
      data.quiz.filter((r) => r.user_id === profile.id),
    );
    addSheet(workbook, module.key.toUpperCase(), QUIZ_COLUMNS, rows, { autofilter: true });
  });

  addSheet(
    workbook,
    "ACTIVIDADES",
    WRITTEN_COLUMNS,
    writtenRowsFor(
      modules,
      data.responses.filter((r) => r.user_id === profile.id),
    ),
    { autofilter: true },
  );

  await download(workbook, `resultados-${slug(profile.email)}-${fileStamp()}.xlsx`);
}

/* ---------- Exportação de turma ---------- */

export async function exportClassWorkbook(
  participants: ProfileRow[],
  modules: ExportModule[],
  data: Dataset,
) {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = "Gestão de Conflitos na Formação";
  workbook.created = new Date();

  const participantColumns: ColumnDef[] = [
    { header: "Participante", width: 34 },
    { header: "Registo", width: 20, kind: "date" },
    ...modules.flatMap((m) => {
      const k = m.key.toUpperCase();
      return [
        { header: `${k} progresso`, width: 15, kind: "percent" as ColumnKind },
        { header: `${k} micro-quizzes corretos`, width: 24, kind: "number" as ColumnKind },
        { header: `${k} micro-quizzes respondidos`, width: 26, kind: "number" as ColumnKind },
        { header: `${k} avaliação final corretas`, width: 25, kind: "number" as ColumnKind },
        { header: `${k} respostas escritas`, width: 20, kind: "number" as ColumnKind },
      ];
    }),
    { header: "Total micro-quizzes corretos", width: 27, kind: "number" },
    { header: "Total micro-quizzes respondidos", width: 29, kind: "number" },
    { header: "Total avaliação final corretas", width: 28, kind: "number" },
    { header: "Progresso global", width: 18, kind: "percent" },
  ];

  const participantRows = participants
    .slice()
    .sort((a, b) => a.email.localeCompare(b.email))
    .map((profile) => {
      const stats = modules.map((m) => statsFor(m, data, profile.id));
      const sum = (pick: (s: ModuleStats) => number) => stats.reduce((a, s) => a + pick(s), 0);
      const completed = sum((s) => s.completedStops);
      const total = sum((s) => s.totalStops);
      return [
        profile.email,
        toDate(profile.created_at),
        ...stats.flatMap((s) => [
          s.percent,
          s.microCorrect,
          s.microAnswered,
          s.finalCorrect,
          s.writtenCount,
        ]),
        sum((s) => s.microCorrect),
        sum((s) => s.microAnswered),
        sum((s) => s.finalCorrect),
        total > 0 ? completed / total : 0,
      ] as (string | number | Date | null)[];
    });

  addSheet(workbook, "RESUMO POR PARTICIPANTE", participantColumns, participantRows, {
    autofilter: true,
  });

  const ids = new Set(participants.map((p) => p.id));
  const emailOf = new Map(participants.map((p) => [p.id, p.email]));

  const quizDetailColumns: ColumnDef[] = [
    { header: "Participante", width: 34 },
    { header: "Módulo", width: 12 },
    ...QUIZ_COLUMNS,
  ];
  const quizDetailRows = participants
    .slice()
    .sort((a, b) => a.email.localeCompare(b.email))
    .flatMap((profile) =>
      modules.flatMap((module) =>
        quizRowsFor(
          module,
          data.quiz.filter((r) => r.user_id === profile.id),
        ).map((row) => [profile.email, module.key.toUpperCase(), ...row]),
      ),
    );
  addSheet(workbook, "QUIZZES (DETALHE)", quizDetailColumns, quizDetailRows, {
    autofilter: true,
  });

  const writtenDetailColumns: ColumnDef[] = [
    { header: "Participante", width: 34 },
    ...WRITTEN_COLUMNS,
  ];
  const writtenWithEmail = data.responses
    .filter((r) => ids.has(r.user_id) && r.response_text.trim().length > 0)
    .sort(
      (a, b) =>
        (emailOf.get(a.user_id) ?? "").localeCompare(emailOf.get(b.user_id) ?? "") ||
        a.activity_id.localeCompare(b.activity_id),
    )
    .map(
      (r) =>
        [
          emailOf.get(r.user_id) ?? r.user_id,
          moduleKeyOf(modules, r.activity_id),
          r.activity_id,
          r.response_text,
          toDate(r.submitted_at),
        ] as (string | number | Date | null)[],
    );
  addSheet(workbook, "ACTIVIDADES (DETALHE)", writtenDetailColumns, writtenWithEmail, {
    autofilter: true,
  });

  await download(workbook, `resultados-turma-${fileStamp()}.xlsx`);
}

/* ---------- Exportação da avaliação da formação (anónima) ---------- */

/** Nunca recebe identidades: a tabela de respostas não tem coluna de utilizador. */
export async function exportEvaluationWorkbook(
  rows: EvaluationRow[],
  dimensions: { key: LikertKey; label: string }[],
) {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = "Gestão de Conflitos na Formação";
  workbook.created = new Date();

  const mediasColumns: ColumnDef[] = [
    { header: "Dimensão", width: 40 },
    { header: "Respostas", width: 12, kind: "number" },
    { header: "Média (1-5)", width: 14, kind: "number" },
    { header: "1", width: 8, kind: "number" },
    { header: "2", width: 8, kind: "number" },
    { header: "3", width: 8, kind: "number" },
    { header: "4", width: 8, kind: "number" },
    { header: "5", width: 8, kind: "number" },
  ];
  const mediasRows = dimensions.map((d) => {
    const values = rows.map((r) => r[d.key]);
    const dist = [1, 2, 3, 4, 5].map((n) => values.filter((v) => v === n).length);
    return [
      d.label,
      values.length,
      values.length ? Math.round((average(values) + Number.EPSILON) * 100) / 100 : 0,
      ...dist,
    ] as (string | number | Date | null)[];
  });
  const satisfacao = rows.map((r) => r.satisfacao_global);
  mediasRows.push([
    "Satisfação global",
    satisfacao.length,
    satisfacao.length ? Math.round((average(satisfacao) + Number.EPSILON) * 100) / 100 : 0,
    ...[1, 2, 3, 4, 5].map((n) => satisfacao.filter((v) => v === n).length),
  ]);

  const medias = addSheet(workbook, "AVALIACAO (MEDIAS)", mediasColumns, mediasRows);
  const nps = npsOf(rows);
  medias.addRow([]);
  medias.addRow(["Recomendação (0-10) — média", rows.length, Math.round((nps.average + Number.EPSILON) * 100) / 100]);
  medias.addRow(["Promotores (9-10)", nps.promoters]);
  medias.addRow(["Passivos (7-8)", nps.passives]);
  medias.addRow(["Detratores (0-6)", nps.detractors]);
  medias.addRow(["NPS", nps.nps]);
  medias.spliceRows(1, 0, [`Total de respostas anónimas: ${rows.length}`], [
    `Exportado em: ${new Date().toLocaleString("pt-PT")}`,
  ]);
  medias.getRow(1).font = { bold: true, name: "Arial", size: 12 };
  medias.getRow(2).font = { name: "Arial", size: 10 };
  medias.views = [{ state: "frozen", ySplit: 3 }];

  const detailColumns: ColumnDef[] = [
    { header: "Resposta n.º", width: 13, kind: "number" },
    { header: "Data", width: 20, kind: "date" },
    { header: "Perfil (opcional)", width: 34 },
    ...dimensions.map((d) => ({ header: d.label, width: 26, kind: "number" as ColumnKind })),
    { header: "Recomendação (0-10)", width: 20, kind: "number" },
    { header: "Satisfação global (1-5)", width: 22, kind: "number" },
  ];
  const detailRows = rows.map(
    (r, i) =>
      [
        i + 1,
        toDate(r.created_at),
        r.perfil ?? "(não indicado)",
        ...dimensions.map((d) => r[d.key]),
        r.recomendacao,
        r.satisfacao_global,
      ] as (string | number | Date | null)[],
  );
  addSheet(workbook, "AVALIACAO (RESPOSTAS)", detailColumns, detailRows, { autofilter: true });

  const commentColumns: ColumnDef[] = [
    { header: "Resposta n.º", width: 13, kind: "number" },
    { header: "Data", width: 20, kind: "date" },
    { header: "Pontos fortes", width: 60, kind: "long" },
    { header: "Pontos a melhorar", width: 60, kind: "long" },
    { header: "Sugestões", width: 60, kind: "long" },
  ];
  const commentRows = rows
    .map((r, i) => ({ r, i }))
    .filter(
      ({ r }) =>
        r.pontos_fortes.trim() || r.pontos_melhorar.trim() || r.sugestoes.trim(),
    )
    .map(
      ({ r, i }) =>
        [
          i + 1,
          toDate(r.created_at),
          r.pontos_fortes,
          r.pontos_melhorar,
          r.sugestoes,
        ] as (string | number | Date | null)[],
    );
  addSheet(workbook, "COMENTARIOS", commentColumns, commentRows, { autofilter: true });

  await download(workbook, `avaliacao-formacao-${fileStamp()}.xlsx`);
}
