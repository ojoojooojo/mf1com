import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, CheckCircle2, ClipboardList, Lock, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  EMPTY_DRAFT,
  LIKERT_DIMENSIONS,
  LIKERT_LABELS,
  PERFIL_OPTIONS,
  evaluationErrorMessage,
  useEvaluationAccess,
  useSubmitEvaluation,
  type EvaluationDraft,
  type LikertKey,
} from "@/lib/evaluation";

export const Route = createFileRoute("/_authenticated/avaliacao")({
  head: () => ({
    meta: [
      { title: "Avaliação da Formação | Gestão de Conflitos na Formação" },
      {
        name: "description",
        content:
          "Questionário anónimo de avaliação da ação de formação Gestão de Conflitos na Formação: objetivos, conteúdos, metodologia, sessões síncronas online, formador, organização e materiais.",
      },
      { property: "og:title", content: "Avaliação da Formação — 4.º passo do percurso" },
      {
        property: "og:description",
        content:
          "Avaliação anónima da formação pelos participantes, no final do percurso MF1 → MF2 → MF3.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: EvaluationPage,
});

/* ---------- Blocos auxiliares ---------- */

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-surface">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-4 py-4">
          <div className="min-w-0">
            <p className="eyebrow">4.º passo do percurso</p>
            <p className="truncate font-display text-base font-semibold">Avaliação da Formação</p>
          </div>
          <Link
            to="/"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-semibold hover:bg-muted"
          >
            <ArrowLeft className="size-3.5" /> Página inicial
          </Link>
        </div>
      </header>
      <main className="mx-auto max-w-3xl px-4 py-10">{children}</main>
    </div>
  );
}

function Notice({
  icon,
  eyebrow,
  title,
  children,
}: {
  icon: React.ReactNode;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-border bg-card p-6 shadow-soft sm:p-8">
      <p className="eyebrow flex items-center gap-2">
        {icon} {eyebrow}
      </p>
      <h1 className="mt-2 font-display text-2xl leading-tight sm:text-3xl">{title}</h1>
      <div className="mt-3 space-y-3 text-[0.975rem] leading-relaxed text-muted-foreground">
        {children}
      </div>
    </section>
  );
}

function ScaleRow({
  label,
  hint,
  value,
  onChange,
}: {
  label: string;
  hint: string;
  value: number | null;
  onChange: (v: number) => void;
}) {
  return (
    <fieldset className="rounded-xl border border-border bg-card p-5">
      <legend className="px-1 text-sm font-semibold">{label}</legend>
      <p className="mt-1 text-sm text-muted-foreground">{hint}</p>
      <div className="mt-4 grid grid-cols-5 gap-2">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            aria-pressed={value === n}
            onClick={() => onChange(n)}
            className={cn(
              "flex flex-col items-center gap-1 rounded-lg border px-1 py-2.5 text-center transition-colors",
              value === n
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-surface hover:bg-muted",
            )}
          >
            <span className="text-sm font-semibold tabular-nums">{n}</span>
            <span className="text-[0.65rem] leading-tight">{LIKERT_LABELS[n]}</span>
          </button>
        ))}
      </div>
    </fieldset>
  );
}

function TextArea({
  label,
  hint,
  value,
  onChange,
}: {
  label: string;
  hint: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="block rounded-xl border border-border bg-card p-5">
      <span className="text-sm font-semibold">{label}</span>
      <span className="mt-1 block text-sm text-muted-foreground">{hint}</span>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={4}
        className="mt-3 w-full rounded-lg border border-border bg-surface p-3 text-[0.95rem] leading-relaxed outline-none focus:border-primary"
      />
    </label>
  );
}

/* ---------- Página ---------- */

const STEP_LABELS = ["Quem responde", "Dimensões da formação", "Recomendação", "Comentários"];

function EvaluationPage() {
  const access = useEvaluationAccess();
  const submit = useSubmitEvaluation();
  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState<EvaluationDraft>(EMPTY_DRAFT);
  const [done, setDone] = useState(false);
  const [warning, setWarning] = useState<string | null>(null);

  const set = <K extends keyof EvaluationDraft>(key: K, value: EvaluationDraft[K]) => {
    setWarning(null);
    setDraft((prev) => ({ ...prev, [key]: value }));
  };

  if (access.isLoading) {
    return (
      <Shell>
        <p className="text-sm text-muted-foreground">A verificar o seu percurso…</p>
      </Shell>
    );
  }

  const data = access.data;
  const isFormador = data?.isFormador ?? false;

  if (!isFormador && data?.submitted) {
    return (
      <Shell>
        <Notice
          icon={<CheckCircle2 className="size-4" />}
          eyebrow="Avaliação já registada"
          title="Já respondeu à avaliação desta formação"
        >
          <p>
            A sua avaliação foi registada de forma anónima e não é possível voltar a submeter — nem
            alterá-la, precisamente porque não fica ligada à sua conta.
          </p>
          <p>Obrigado pelo contributo: é com ele que a próxima edição melhora.</p>
        </Notice>
      </Shell>
    );
  }

  if (!isFormador && data?.evaluationOpen === false) {
    return (
      <Shell>
        <Notice
          icon={<Lock className="size-4" />}
          eyebrow="Avaliação temporariamente fechada"
          title="A avaliação da formação está fechada pelo formador"
        >
          <p>
            Não é um erro: o formador fechou temporariamente o preenchimento da avaliação. Voltará a
            estar disponível quando o indicar.
          </p>
          <p>
            Todo o seu percurso e as respostas já submetidas mantêm-se guardados, sem qualquer
            alteração.
          </p>
          <div className="pt-1">
            <Link
              to="/"
              className="inline-flex items-center rounded-lg border border-border px-4 py-2 text-sm font-semibold hover:bg-muted"
            >
              Voltar à página inicial
            </Link>
          </div>
        </Notice>
      </Shell>
    );
  }

  if (!isFormador && !data?.completedMf3) {
    return (
      <Shell>
        <Notice
          icon={<Lock className="size-4" />}
          eyebrow="Ainda não disponível"
          title="Conclua o MF3 antes de avaliar a formação"
        >
          <p>
            A avaliação da formação é o 4.º e último passo do percurso, a seguir ao MF3 —{" "}
            <em>Estratégias de Resolução de Conflitos na Formação</em>. Fica disponível depois de
            concluir a <strong>Síntese Final do MF3</strong>.
          </p>
          <p>
            Não é um erro: todo o seu percurso está guardado e esta página abre automaticamente
            quando terminar o módulo.
          </p>
          <div className="flex flex-wrap gap-3 pt-1">
            <Link
              to="/mf3/sintese"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
            >
              Ir para a Síntese Final do MF3 <ArrowRight className="size-4" />
            </Link>
            <Link
              to="/"
              className="inline-flex items-center rounded-lg border border-border px-4 py-2 text-sm font-semibold hover:bg-muted"
            >
              Voltar à página inicial
            </Link>
          </div>
        </Notice>
      </Shell>
    );
  }

  if (done) {
    return (
      <Shell>
        <Notice
          icon={<CheckCircle2 className="size-4" />}
          eyebrow="Obrigado"
          title="Avaliação registada com sucesso"
        >
          <p>
            A sua avaliação ficou registada de forma <strong>anónima</strong>. O formador verá apenas
            valores agregados e os comentários, sem qualquer ligação ao seu nome, email ou conta.
          </p>
          <p>Com isto, concluiu o percurso completo: MF1 → MF2 → MF3 → Avaliação.</p>
          <div className="pt-1">
            <Link
              to="/"
              className="inline-flex items-center rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
            >
              Voltar à página inicial da formação
            </Link>
          </div>
        </Notice>
      </Shell>
    );
  }

  const canAdvance = () => {
    if (step === 1) return LIKERT_DIMENSIONS.every((d) => draft[d.key] !== null);
    if (step === 2) return draft.recomendacao !== null && draft.satisfacao_global !== null;
    return true;
  };

  const next = () => {
    if (!canAdvance()) {
      setWarning("Responda a todas as escalas deste passo para avançar.");
      return;
    }
    setWarning(null);
    setStep((s) => Math.min(3, s + 1));
  };

  const onSubmit = () => {
    if (isFormador) {
      setWarning(
        "Está em pré-visualização como formador: o questionário não é submetido a partir da sua conta.",
      );
      return;
    }
    submit.mutate(draft, { onSuccess: () => setDone(true) });
  };

  return (
    <Shell>
      <section className="rounded-2xl border border-border bg-card p-6 shadow-soft sm:p-8">
        <p className="eyebrow flex items-center gap-2">
          <ClipboardList className="size-4" /> Avaliação da ação de formação
        </p>
        <h1 className="mt-2 font-display text-2xl leading-tight sm:text-3xl">
          Gestão de Conflitos na Formação
        </h1>
        <p className="mt-3 text-[0.975rem] leading-relaxed text-muted-foreground">
          Quatro passos curtos sobre as 30 horas do percurso (18 horas assíncronas neste MOOC e 12
          horas síncronas online). Serve para melhorar as próximas edições.
        </p>
        <p className="mt-3 flex items-start gap-2 rounded-xl border border-success/30 bg-success-soft p-4 text-[0.925rem] leading-relaxed">
          <ShieldCheck className="mt-0.5 size-4 shrink-0 text-success" aria-hidden />
          <span>
            <strong>Respostas anónimas.</strong> As respostas são guardadas sem qualquer identificação:
            o formador não consegue saber quem escreveu o quê. Apenas se regista que a sua conta já
            respondeu, para evitar respostas repetidas.
          </span>
        </p>
        {isFormador && (
          <p className="mt-3 rounded-xl border border-primary/25 bg-primary-soft p-4 text-[0.925rem] leading-relaxed">
            Pré-visualização de formador: pode percorrer o questionário como o veem os participantes,
            mas a submissão está reservada aos formandos.
            {data?.evaluationOpen === false && (
              <>
                {" "}
                Neste momento a avaliação está <strong>fechada</strong> aos participantes — só o
                formador a vê.
              </>
            )}
          </p>
        )}
      </section>

      <ol className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {STEP_LABELS.map((label, i) => (
          <li
            key={label}
            aria-current={i === step ? "step" : undefined}
            className={cn(
              "rounded-lg border px-3 py-2 text-xs font-semibold",
              i === step
                ? "border-primary bg-primary-soft text-foreground"
                : i < step
                  ? "border-success/40 bg-success-soft text-foreground"
                  : "border-border bg-surface text-muted-foreground",
            )}
          >
            {i + 1}. {label}
          </li>
        ))}
      </ol>

      <div className="mt-6 space-y-4">
        {step === 0 && (
          <fieldset className="rounded-xl border border-border bg-card p-5">
            <legend className="px-1 text-sm font-semibold">
              Função que melhor descreve o seu perfil (opcional)
            </legend>
            <p className="mt-1 text-sm text-muted-foreground">
              Ajuda a ler os resultados por perfil. Não permite identificar ninguém e pode deixar em
              branco.
            </p>
            <div className="mt-4 space-y-2">
              {PERFIL_OPTIONS.map((option) => (
                <label
                  key={option}
                  className={cn(
                    "flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-2.5 text-sm transition-colors",
                    draft.perfil === option
                      ? "border-primary bg-primary-soft"
                      : "border-border bg-surface hover:bg-muted",
                  )}
                >
                  <input
                    type="radio"
                    name="perfil"
                    value={option}
                    checked={draft.perfil === option}
                    onChange={() => set("perfil", option)}
                    className="size-4 accent-[hsl(var(--primary))]"
                  />
                  {option}
                </label>
              ))}
            </div>
          </fieldset>
        )}

        {step === 1 && (
          <>
            <p className="text-sm text-muted-foreground">
              Classifique cada dimensão de <strong>1 (muito insatisfeito)</strong> a{" "}
              <strong>5 (muito satisfeito)</strong>.
            </p>
            {LIKERT_DIMENSIONS.map((d) => (
              <ScaleRow
                key={d.key}
                label={d.label}
                hint={d.hint}
                value={draft[d.key]}
                onChange={(v) => set(d.key as LikertKey, v)}
              />
            ))}
          </>
        )}

        {step === 2 && (
          <>
            <fieldset className="rounded-xl border border-border bg-card p-5">
              <legend className="px-1 text-sm font-semibold">
                Recomendaria esta formação a outro formador?
              </legend>
              <p className="mt-1 text-sm text-muted-foreground">
                0 = de forma alguma · 10 = recomendaria sem hesitar.
              </p>
              <div className="mt-4 grid grid-cols-6 gap-2 sm:grid-cols-11">
                {Array.from({ length: 11 }, (_, n) => (
                  <button
                    key={n}
                    type="button"
                    aria-pressed={draft.recomendacao === n}
                    onClick={() => set("recomendacao", n)}
                    className={cn(
                      "rounded-lg border py-2.5 text-sm font-semibold tabular-nums transition-colors",
                      draft.recomendacao === n
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-surface hover:bg-muted",
                    )}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </fieldset>
            <ScaleRow
              label="Satisfação global com a formação"
              hint="Balanço final do percurso completo (MF1, MF2 e MF3)."
              value={draft.satisfacao_global}
              onChange={(v) => set("satisfacao_global", v)}
            />
          </>
        )}

        {step === 3 && (
          <>
            <TextArea
              label="Pontos fortes"
              hint="O que funcionou bem e deve manter-se nas próximas edições."
              value={draft.pontos_fortes}
              onChange={(v) => set("pontos_fortes", v)}
            />
            <TextArea
              label="Pontos a melhorar"
              hint="O que dificultou o seu percurso ou ficou aquém do esperado."
              value={draft.pontos_melhorar}
              onChange={(v) => set("pontos_melhorar", v)}
            />
            <TextArea
              label="Sugestões"
              hint="Temas a acrescentar, formatos a experimentar, outras ideias."
              value={draft.sugestoes}
              onChange={(v) => set("sugestoes", v)}
            />
          </>
        )}
      </div>

      {warning && <p className="mt-4 text-sm font-medium text-destructive">{warning}</p>}
      {submit.isError && (
        <p className="mt-4 text-sm font-medium text-destructive">
          {evaluationErrorMessage((submit.error as Error).message)}
        </p>
      )}

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          disabled={step === 0}
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-semibold hover:bg-muted disabled:opacity-50"
        >
          <ArrowLeft className="size-4" /> Anterior
        </button>
        {step < 3 ? (
          <button
            type="button"
            onClick={next}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
          >
            Continuar <ArrowRight className="size-4" />
          </button>
        ) : (
          <button
            type="button"
            disabled={submit.isPending}
            onClick={onSubmit}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-60"
          >
            {submit.isPending ? "A registar…" : "Submeter avaliação"}
          </button>
        )}
      </div>
    </Shell>
  );
}
