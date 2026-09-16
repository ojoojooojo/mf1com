import { useState, type ReactNode } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Check, CircleDot, Lightbulb, MessageSquareQuote, Pencil, Quote } from "lucide-react";
import { cn } from "@/lib/utils";
import { useProgress } from "@/lib/progress";

/* ---------- Estrutura de página ---------- */

export function SectionHeading({
  eyebrow,
  title,
  lead,
  className,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  className?: string;
}) {
  const centered = className?.includes("text-center");
  return (
    <header className={cn("mb-6", className)}>
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2 className="mt-1 font-display text-2xl leading-tight sm:text-3xl">{title}</h2>
      {lead ? (
        <p className={cn("mt-3 max-w-2xl text-muted-foreground", centered && "mx-auto")}>
          {lead}
        </p>
      ) : null}
    </header>
  );
}

export function Prose({ children }: { children: ReactNode }) {
  return <div className="prose-lesson">{children}</div>;
}

/* ---------- Cartões ---------- */

export function ContentCard({
  title,
  icon,
  children,
  tone = "neutral",
}: {
  title?: string;
  icon?: ReactNode;
  children: ReactNode;
  tone?: "neutral" | "primary" | "accent" | "success";
}) {
  const tones = {
    neutral: "border-border bg-card",
    primary: "border-primary/25 bg-primary-soft",
    accent: "border-accent/30 bg-accent-soft",
    success: "border-success/30 bg-success-soft",
  } as const;
  return (
    <section className={cn("rounded-xl border p-5 shadow-soft", tones[tone])}>
      {title ? (
        <h3 className="mb-2 flex items-center gap-2 font-display text-lg">
          {icon}
          {title}
        </h3>
      ) : null}
      <div className="text-[0.975rem] leading-relaxed">{children}</div>
    </section>
  );
}

export function KeyIdea({ children }: { children: ReactNode }) {
  return (
    <aside className="my-6 flex gap-3 rounded-xl border-l-4 border-accent bg-accent-soft p-5">
      <Lightbulb className="mt-0.5 size-5 shrink-0 text-accent" aria-hidden />
      <div>
        <p className="eyebrow text-accent">Ideia-chave</p>
        <div className="mt-1 text-[0.975rem] leading-relaxed">{children}</div>
      </div>
    </aside>
  );
}

export function SourceNote({ children }: { children: ReactNode }) {
  return (
    <p className="mt-6 border-t border-border pt-3 text-xs text-muted-foreground">
      <span className="font-semibold">Fonte:</span> {children}
    </p>
  );
}

export function Placeholder({ label = "Conteúdo em preparação" }: { label?: string }) {
  return (
    <div className="rounded-xl border border-dashed border-border bg-muted/50 p-6 text-sm text-muted-foreground">
      <p className="eyebrow">Em construção</p>
      <p className="mt-1">{label}</p>
    </div>
  );
}

/* ---------- Acordeão pedagógico ---------- */

export function LessonAccordion({
  items,
}: {
  items: { title: string; content: ReactNode }[];
}) {
  return (
    <Accordion type="multiple" className="rounded-xl border border-border bg-card px-4">
      {items.map((item, i) => (
        <AccordionItem key={i} value={`item-${i}`}>
          <AccordionTrigger className="text-left font-display text-base">
            {item.title}
          </AccordionTrigger>
          <AccordionContent className="text-[0.975rem] leading-relaxed">
            {item.content}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

/* ---------- Cenário / diálogo ---------- */

export type DialogueLine = { speaker: string; text: string; side?: "left" | "right" };

export function Scenario({
  title,
  context,
  lines,
  note,
}: {
  title: string;
  context?: string;
  lines: DialogueLine[];
  note?: ReactNode;
}) {
  return (
    <section className="my-6 overflow-hidden rounded-xl border border-border bg-surface">
      <div className="border-b border-border bg-secondary px-5 py-3">
        <p className="eyebrow flex items-center gap-2">
          <MessageSquareQuote className="size-3.5" /> Cenário
        </p>
        <h3 className="font-display text-lg text-secondary-foreground">{title}</h3>
        {context ? <p className="mt-1 text-sm text-muted-foreground">{context}</p> : null}
      </div>
      <ul className="space-y-3 p-5">
        {lines.map((line, i) => (
          <li
            key={i}
            className={cn(
              "max-w-[85%] rounded-xl px-4 py-3 text-[0.95rem] leading-relaxed",
              line.side === "right"
                ? "ml-auto bg-primary-soft"
                : "bg-muted",
            )}
          >
            <span className="block text-xs font-semibold text-muted-foreground">
              {line.speaker}
            </span>
            {line.text}
          </li>
        ))}
      </ul>
      {note ? (
        <div className="flex gap-2 border-t border-border px-5 py-4 text-sm text-muted-foreground">
          <Quote className="mt-0.5 size-4 shrink-0" aria-hidden />
          <div>{note}</div>
        </div>
      ) : null}
    </section>
  );
}

/* ---------- Reflexão aberta (guardada em localStorage) ---------- */

export function ReflectionPrompt({
  id,
  question,
  hint,
  rows = 5,
}: {
  id: string;
  question: string;
  hint?: string;
  rows?: number;
}) {
  const { state, saveAnswer, hydrated } = useProgress();
  const value = state.answers[id] ?? "";

  return (
    <section className="my-6 rounded-xl border border-accent/30 bg-card p-5">
      <p className="eyebrow flex items-center gap-2 text-accent">
        <Pencil className="size-3.5" /> Reflexão
      </p>
      <h3 className="mt-1 font-display text-lg">{question}</h3>
      {hint ? <p className="mt-1 text-sm text-muted-foreground">{hint}</p> : null}
      <textarea
        rows={rows}
        value={value}
        onChange={(e) => saveAnswer(id, e.target.value)}
        placeholder="Escreva aqui a sua resposta…"
        className="mt-3 w-full resize-y rounded-lg border border-input bg-background p-3 text-[0.95rem] leading-relaxed outline-none focus-visible:ring-2 focus-visible:ring-ring"
      />
      <p className="mt-2 text-xs text-muted-foreground">
        {hydrated && value.trim().length > 0
          ? "Resposta guardada na sua conta."
          : "A sua resposta fica guardada na sua conta e é visível apenas a si e ao formador do curso."}
      </p>
    </section>
  );
}

/* ---------- Micro-quiz com feedback explicativo ---------- */

export type QuizOption = { text: string; correct?: boolean; feedback: string };

export function Quiz({
  id,
  question,
  options,
  takeaway,
}: {
  id: string;
  question: string;
  options: QuizOption[];
  takeaway?: ReactNode;
}) {
  const { state, saveQuiz } = useProgress();
  const stored = state.quiz[id];
  const [selected, setSelected] = useState<number | null>(
    typeof stored === "number" ? stored : null,
  );
  const current = typeof stored === "number" ? stored : selected;
  const chosen = current !== null ? options[current] : undefined;

  return (
    <section className="my-6 rounded-xl border border-border bg-card p-5 shadow-soft">
      <p className="eyebrow flex items-center gap-2">
        <CircleDot className="size-3.5" /> Micro-quiz
      </p>
      <h3 className="mt-1 font-display text-lg">{question}</h3>
      <ul className="mt-4 space-y-2">
        {options.map((option, i) => {
          const isChosen = current === i;
          return (
            <li key={i}>
              <button
                type="button"
                onClick={() => {
                  setSelected(i);
                  saveQuiz(id, i, Boolean(option.correct), option.text);
                }}
                className={cn(
                  "flex w-full items-start gap-3 rounded-lg border p-3 text-left text-[0.95rem] transition-colors",
                  isChosen
                    ? option.correct
                      ? "border-success bg-success-soft"
                      : "border-destructive/60 bg-destructive-soft"
                    : "border-border hover:bg-muted",
                )}
                aria-pressed={isChosen}
              >
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border border-current text-[10px] font-semibold">
                  {isChosen && option.correct ? (
                    <Check className="size-3" />
                  ) : (
                    String.fromCharCode(97 + i)
                  )}
                </span>
                <span>{option.text}</span>
              </button>
            </li>
          );
        })}
      </ul>
      {chosen ? (
        <div
          className={cn(
            "mt-4 rounded-lg border-l-4 p-4 text-[0.95rem] leading-relaxed",
            chosen.correct
              ? "border-success bg-success-soft"
              : "border-accent bg-accent-soft",
          )}
        >
          <p className="eyebrow">
            {chosen.correct ? "Resposta adequada — porquê" : "Vale a pena repensar — porquê"}
          </p>
          <p className="mt-1">{chosen.feedback}</p>
          {takeaway ? (
            <p className="mt-2 border-t border-border/60 pt-2 text-sm">{takeaway}</p>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}

/* ---------- Figura / infográfico SVG ---------- */

export function Figure({
  caption,
  children,
  source,
}: {
  caption: string;
  children?: ReactNode;
  source?: string;
}) {
  return (
    <figure className="my-6 overflow-hidden rounded-xl border border-border bg-surface">
      <div className="flex items-center justify-center p-5">
        {children ?? <DiagramPlaceholder />}
      </div>
      <figcaption className="border-t border-border px-5 py-3 text-sm text-muted-foreground">
        {caption}
        {source ? <span className="block text-xs">Fonte: {source}</span> : null}
      </figcaption>
    </figure>
  );
}

export function DiagramPlaceholder() {
  return (
    <svg viewBox="0 0 520 180" role="img" aria-label="Diagrama em preparação" className="w-full">
      <rect
        x="1"
        y="1"
        width="518"
        height="178"
        rx="14"
        fill="var(--muted)"
        stroke="var(--border)"
        strokeDasharray="6 6"
      />
      {[70, 260, 450].map((cx, i) => (
        <g key={cx}>
          <circle cx={cx} cy="90" r="34" fill="var(--primary-soft)" stroke="var(--primary)" />
          <text
            x={cx}
            y="96"
            textAnchor="middle"
            fontSize="14"
            fill="var(--primary)"
            fontFamily="var(--font-sans)"
          >
            {i + 1}
          </text>
        </g>
      ))}
      {[
        [104, 226],
        [294, 416],
      ].map(([x1, x2]) => (
        <line
          key={x1}
          x1={x1}
          y1="90"
          x2={x2}
          y2="90"
          stroke="var(--accent)"
          strokeWidth="2"
          strokeDasharray="5 5"
        />
      ))}
      <text
        x="260"
        y="158"
        textAnchor="middle"
        fontSize="12"
        fill="var(--muted-foreground)"
        fontFamily="var(--font-sans)"
      >
        Infográfico pedagógico em preparação
      </text>
    </svg>
  );
}
