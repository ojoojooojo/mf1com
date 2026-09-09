import { useState, type ReactNode } from "react";
import { Check, FlaskConical, Lock, Pencil, ShieldCheck } from "lucide-react";
import { useProgress } from "@/lib/progress";
import { cn } from "@/lib/utils";

/* ---------- Aviso de cenário simulado ---------- */

export function FictionNote({ children }: { children: ReactNode }) {
  return (
    <p className="my-4 flex items-start gap-2 rounded-lg border border-border bg-muted/60 px-4 py-3 text-sm text-muted-foreground">
      <FlaskConical className="mt-0.5 size-4 shrink-0" aria-hidden />
      <span>{children}</span>
    </p>
  );
}

export function PrivacyNote({ children }: { children: ReactNode }) {
  return (
    <p className="my-4 flex items-start gap-2 rounded-lg border border-primary/25 bg-primary-soft px-4 py-3 text-sm">
      <ShieldCheck className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
      <span>{children}</span>
    </p>
  );
}

/* ---------- Campo de produção escrita ---------- */

export function TaskField({
  id,
  label,
  instruction,
  rows = 4,
  placeholder = "Escreva aqui a sua resposta…",
}: {
  id: string;
  label: string;
  instruction?: string;
  rows?: number;
  placeholder?: string;
}) {
  const { state, saveAnswer, hydrated } = useProgress();
  const value = state.answers[id] ?? "";

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <label htmlFor={id} className="block font-display text-base">
        {label}
      </label>
      {instruction ? (
        <p className="mt-1 text-sm text-muted-foreground">{instruction}</p>
      ) : null}
      <textarea
        id={id}
        rows={rows}
        value={value}
        onChange={(e) => saveAnswer(id, e.target.value)}
        placeholder={placeholder}
        className="mt-3 w-full resize-y rounded-lg border border-input bg-background p-3 text-[0.95rem] leading-relaxed outline-none focus-visible:ring-2 focus-visible:ring-ring"
      />
      <p className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
        <Pencil className="size-3" aria-hidden />
        {hydrated && value.trim().length > 0
          ? "Guardado na sua conta."
          : "Fica guardado na sua conta, visível apenas a si e ao formador."}
      </p>
    </div>
  );
}

/* ---------- Seleção múltipla simples (sem correção) ---------- */

export function CheckboxGroup({
  id,
  label,
  instruction,
  options,
}: {
  id: string;
  label: string;
  instruction?: string;
  options: string[];
}) {
  const { state, saveAnswer, hydrated } = useProgress();
  const selected = (state.answers[id] ?? "").split("|").filter(Boolean);

  const toggle = (opt: string) =>
    saveAnswer(
      id,
      (selected.includes(opt)
        ? selected.filter((x) => x !== opt)
        : [...selected, opt]
      ).join("|"),
    );

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <p className="font-display text-base">{label}</p>
      {instruction ? (
        <p className="mt-1 text-sm text-muted-foreground">{instruction}</p>
      ) : null}
      <ul className="mt-3 grid gap-2 sm:grid-cols-2">
        {options.map((opt) => {
          const isSel = hydrated && selected.includes(opt);
          return (
            <li key={opt}>
              <button
                type="button"
                onClick={() => toggle(opt)}
                aria-pressed={isSel}
                className={cn(
                  "flex w-full items-start gap-3 rounded-lg border p-3 text-left text-[0.95rem] transition-colors",
                  isSel ? "border-primary bg-primary-soft" : "border-border hover:bg-muted",
                )}
              >
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded border border-current">
                  {isSel ? <Check className="size-3" /> : null}
                </span>
                <span>{opt}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/* ---------- Escolha única com justificação ---------- */

export type ChoiceOption = { key: string; label: string; text: string };

export function ChoiceGroup({
  id,
  label,
  instruction,
  options,
}: {
  id: string;
  label: string;
  instruction?: string;
  options: ChoiceOption[];
}) {
  const { state, saveAnswer, hydrated } = useProgress();
  const value = hydrated ? state.answers[id] : undefined;

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <p className="font-display text-base">{label}</p>
      {instruction ? (
        <p className="mt-1 text-sm text-muted-foreground">{instruction}</p>
      ) : null}
      <ul className="mt-3 space-y-2">
        {options.map((opt) => {
          const isSel = value === opt.key;
          return (
            <li key={opt.key}>
              <button
                type="button"
                onClick={() => saveAnswer(id, opt.key)}
                aria-pressed={isSel}
                className={cn(
                  "flex w-full items-start gap-3 rounded-lg border p-4 text-left transition-colors",
                  isSel ? "border-primary bg-primary-soft" : "border-border hover:bg-muted",
                )}
              >
                <span
                  className={cn(
                    "flex size-7 shrink-0 items-center justify-center rounded-full font-display text-sm font-semibold",
                    isSel ? "bg-primary text-primary-foreground" : "bg-muted text-foreground",
                  )}
                >
                  {opt.label}
                </span>
                <span className="text-[0.95rem] leading-relaxed">{opt.text}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/* ---------- Revelação de análise de referência ---------- */

export function RevealPanel({
  id,
  buttonLabel = "Submeter e comparar com a análise de referência",
  lockedHint = "Escreva a sua resposta antes de ver a análise de referência.",
  canReveal,
  children,
}: {
  id: string;
  buttonLabel?: string;
  lockedHint?: string;
  canReveal: boolean;
  children: ReactNode;
}) {
  const { saveFlag } = useProgress();
  // Guardar o id revelado (em vez de um booleano) garante que o painel volta a
  // fechar quando o componente é reutilizado noutra atividade sem remontar.
  const [openId, setOpenId] = useState<string | null>(null);
  const open = openId === id;

  if (open) {
    return <div className="mt-5">{children}</div>;
  }

  return (
    <div className="mt-5">
      <button
        type="button"
        disabled={!canReveal}
        onClick={() => {
          setOpenId(id);
          saveFlag(id);
        }}
        className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {canReveal ? <Check className="size-4" /> : <Lock className="size-4" />}
        {buttonLabel}
      </button>
      {!canReveal ? (
        <p className="mt-2 text-xs text-muted-foreground">{lockedHint}</p>
      ) : null}
    </div>
  );
}

/* ---------- Blocos de comentário pedagógico ---------- */

export type CommentaryItem = { title: string; body: ReactNode; tone?: "neutral" | "good" | "warn" };

export function Commentary({
  heading,
  intro,
  items,
  closing,
}: {
  heading: string;
  intro?: ReactNode;
  items: CommentaryItem[];
  closing?: ReactNode;
}) {
  return (
    <section className="rounded-xl border border-border bg-surface p-5">
      <p className="eyebrow text-accent">Análise de referência</p>
      <h3 className="mt-1 font-display text-xl">{heading}</h3>
      {intro ? <p className="mt-2 text-[0.95rem] text-muted-foreground">{intro}</p> : null}
      <div className="mt-4 space-y-3">
        {items.map((item) => (
          <div
            key={item.title}
            className={cn(
              "rounded-lg border-l-4 bg-card p-4 text-[0.95rem] leading-relaxed",
              item.tone === "good"
                ? "border-success bg-success-soft"
                : item.tone === "warn"
                  ? "border-accent bg-accent-soft"
                  : "border-primary",
            )}
          >
            <p className="font-semibold">{item.title}</p>
            <div className="mt-1 space-y-2">{item.body}</div>
          </div>
        ))}
      </div>
      {closing ? (
        <p className="mt-4 rounded-lg bg-muted/60 p-4 text-sm">{closing}</p>
      ) : null}
    </section>
  );
}

/* ---------- Hook utilitário: texto preenchido? ---------- */

export function useFilled(...ids: string[]) {
  const { state, hydrated } = useProgress();
  if (!hydrated) return false;
  return ids.every((id) => (state.answers[id] ?? "").trim().length >= 3);
}
