import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Clock, Target, Users } from "lucide-react";
import {
  BLOCKS,
  COURSE_TITLE,
  LEARNING_OBJECTIVES,
  MODULE_CODE,
  MODULE_TITLE,
} from "@/lib/course-data";
import { ContentCard, Figure, SectionHeading } from "@/components/course/LessonKit";
import { StopNav, useVisit } from "@/components/course/StopNav";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MF1 — Comunicação e Escuta Ativa na Formação | MOOC" },
      {
        name: "description",
        content:
          "Módulo 1 da formação Gestão de Conflitos na Formação: 8 horas assíncronas sobre comunicação, assertividade, barreiras e escuta ativa para formadores.",
      },
      { property: "og:title", content: "MF1 — Comunicação e Escuta Ativa na Formação" },
      {
        property: "og:description",
        content:
          "MOOC para formadores: comunicação, componentes psicológicos, assertividade, barreiras e escuta ativa, com atividades práticas.",
      },
    ],
  }),
  component: Landing,
});

function CommunicationDiagram() {
  return (
    <svg viewBox="0 0 560 200" role="img" aria-label="Do ruído à escuta ativa" className="w-full">
      <defs>
        <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 Z" fill="var(--primary)" />
        </marker>
      </defs>
      <rect x="16" y="52" width="150" height="96" rx="14" fill="var(--muted)" stroke="var(--border)" />
      <rect x="205" y="52" width="150" height="96" rx="14" fill="var(--accent-soft)" stroke="var(--accent)" />
      <rect x="394" y="52" width="150" height="96" rx="14" fill="var(--primary-soft)" stroke="var(--primary)" />
      {[
        [91, "Mensagem", "emitida"],
        [280, "Ruído e", "interpretação"],
        [469, "Compreensão", "partilhada"],
      ].map(([x, l1, l2]) => (
        <g key={String(x)} fontFamily="var(--font-sans)" textAnchor="middle">
          <text x={x as number} y="95" fontSize="15" fill="var(--foreground)">
            {l1}
          </text>
          <text x={x as number} y="116" fontSize="15" fill="var(--muted-foreground)">
            {l2}
          </text>
        </g>
      ))}
      {[
        [170, 200],
        [359, 389],
      ].map(([x1, x2]) => (
        <line
          key={x1}
          x1={x1}
          y1="100"
          x2={x2}
          y2="100"
          stroke="var(--primary)"
          strokeWidth="2"
          markerEnd="url(#arrow)"
        />
      ))}
      <text
        x="280"
        y="30"
        textAnchor="middle"
        fontSize="13"
        fontFamily="var(--font-sans)"
        fill="var(--muted-foreground)"
      >
        A escuta ativa é o que evita que a mensagem se perca a meio
      </text>
    </svg>
  );
}

function Landing() {
  useVisit("abertura");

  return (
    <article>
      <div className="rounded-2xl border border-border bg-card p-6 shadow-soft sm:p-10">
        <p className="eyebrow">
          {MODULE_CODE} · {COURSE_TITLE}
        </p>
        <h1 className="mt-2 max-w-3xl font-display text-3xl leading-tight sm:text-4xl">
          {MODULE_TITLE}
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          Quase todos os conflitos numa sala de formação começam — ou agravam-se — na
          comunicação. Saber formular uma mensagem com clareza e, sobretudo, saber escutar o que
          o outro está realmente a dizer é o que permite ao formador intervir antes de a tensão
          escalar. Este módulo trabalha essas competências de forma prática e aplicada ao seu
          contexto profissional.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            to="/blocos/$blocoId"
            params={{ blocoId: "1" }}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Começar <ArrowRight className="size-4" />
          </Link>
          <Link
            to="/atividades"
            className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-3 text-sm font-semibold hover:bg-muted"
          >
            Ver aprendizagem ativa
          </Link>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <ContentCard title="Carga horária" icon={<Clock className="size-4 text-primary" />}>
          <p className="font-semibold">10h totais do módulo</p>
          <p className="mt-1 text-muted-foreground">
            8h assíncronas (este MOOC) + 2h síncronas em sessão presencial/online, fora deste
            MOOC.
          </p>
        </ContentCard>
        <ContentCard title="Estrutura" icon={<Target className="size-4 text-primary" />}>
          <p className="text-muted-foreground">
            ~6h de aprendizagem de conteúdos em 5 blocos + ~2h de aprendizagem ativa com 5
            atividades práticas.
          </p>
        </ContentCard>
        <ContentCard title="Para quem" icon={<Users className="size-4 text-primary" />}>
          <p className="text-muted-foreground">
            Formadores certificados em formação contínua, com base no referencial oficial do IEFP
            (Portugal).
          </p>
        </ContentCard>
      </div>

      <section className="mt-12">
        <SectionHeading
          eyebrow="Referencial oficial"
          title="Objetivos de aprendizagem"
          lead="No final deste módulo, deverá ser capaz de:"
        />
        <ol className="grid gap-3 sm:grid-cols-2">
          {LEARNING_OBJECTIVES.map((objective, i) => (
            <li
              key={i}
              className="flex gap-3 rounded-xl border border-border bg-card p-5 text-[0.975rem] leading-relaxed"
            >
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary-soft text-sm font-semibold text-primary">
                {i + 1}
              </span>
              {objective}
            </li>
          ))}
        </ol>
      </section>

      <Figure caption="Percurso conceptual do módulo: da mensagem emitida à compreensão partilhada.">
        <CommunicationDiagram />
      </Figure>

      <section className="mt-12">
        <SectionHeading
          eyebrow="Percurso"
          title="Os 5 conteúdos que vai percorrer"
          lead="Cada bloco alterna conteúdo, exemplos, interação e aplicação."
        />
        <ul className="space-y-3">
          {BLOCKS.map((block) => (
            <li key={block.id}>
              <Link
                to="/blocos/$blocoId"
                params={{ blocoId: block.id }}
                className="group flex items-start gap-4 rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/40 hover:bg-secondary"
              >
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary text-sm font-semibold text-primary-foreground">
                  {block.number}
                </span>
                <span className="min-w-0">
                  <span className="block font-display text-lg">{block.title}</span>
                  <span className="mt-1 block text-sm text-muted-foreground">
                    {block.subtitle}
                  </span>
                  <span className="mt-2 block text-xs text-muted-foreground">
                    ~{block.minutes} min · {block.focus.join(" · ")}
                  </span>
                </span>
                <ArrowRight className="ml-auto mt-1 size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <StopNav stopId="abertura" />
    </article>
  );
}
