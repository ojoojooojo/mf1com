import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Clock, Target, Users } from "lucide-react";
import { COURSE_TITLE } from "@/lib/course-data";
import {
  MF3_BLOCKS,
  MF3_LEARNING_OBJECTIVES,
  MF3_MODULE_CODE,
  MF3_MODULE_TITLE,
} from "@/lib/course-data-mf3";
import {
  ContentCard,
  Figure,
  SectionHeading,
} from "@/components/course/LessonKit";
import { StopNav, useVisit } from "@/components/course/StopNav";

/* ---------- Infográfico: percurso conceptual do módulo ---------- */

const STEPS = [
  { n: "1", label: "Inteligência\nEmocional" },
  { n: "2", label: "Empatia e\nComp. Sociais" },
  { n: "3", label: "Gestão e\nPrevenção" },
  { n: "4", label: "Stress e\nConflito" },
  { n: "5", label: "Roda de\nMapeamento" },
];

const LAYERS = ["Eu", "A relação", "A ação"];

function PercursoMf3Svg() {
  return (
    <svg
      viewBox="0 0 640 230"
      role="img"
      aria-label="Percurso conceptual do MF3: dos blocos 1 e 2 centrados no formador e na relação, para os blocos 3, 4 e 5 centrados na ação sobre o conflito"
      className="w-full"
    >
      {LAYERS.map((layer, i) => (
        <g key={layer}>
          <rect
            x={12 + i * 206}
            y={12}
            width={196}
            height={168}
            rx={14}
            fill="var(--primary-soft)"
            stroke="var(--border)"
          />
          <text
            x={110 + i * 206}
            y={36}
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill="var(--primary)"
          >
            {layer}
          </text>
        </g>
      ))}

      {STEPS.map((step, i) => {
        const layer = i < 1 ? 0 : i < 2 ? 1 : 2;
        const within = i < 2 ? 0 : i - 2;
        const slots = layer === 2 ? 3 : 1;
        const x = 12 + layer * 206 + (196 / slots) * within + 196 / slots / 2;
        return (
          <g key={step.n}>
            <circle cx={x} cy={78} r={17} fill="var(--primary)" />
            <text
              x={x}
              y={83}
              textAnchor="middle"
              fontSize="14"
              fontWeight="700"
              fill="var(--primary-foreground)"
            >
              {step.n}
            </text>
            {step.label.split("\n").map((line, li) => (
              <text
                key={line}
                x={x}
                y={116 + li * 14}
                textAnchor="middle"
                fontSize="10.5"
                fill="var(--foreground)"
              >
                {line}
              </text>
            ))}
          </g>
        );
      })}

      <path
        d="M 22 202 H 618"
        stroke="var(--primary)"
        strokeWidth="1.5"
        markerEnd="url(#mf3-arrow)"
      />
      <defs>
        <marker id="mf3-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="var(--primary)" />
        </marker>
      </defs>
      <text x={22} y={222} fontSize="10.5" fill="var(--muted-foreground)">
        Autoconhecimento
      </text>
      <text x={608} y={222} textAnchor="end" fontSize="10.5" fill="var(--muted-foreground)">
        Resolução estruturada
      </text>
    </svg>
  );
}


export const Route = createFileRoute("/mf3/")({
  head: () => ({
    meta: [
      { title: "MF3 — Estratégias de Resolução de Conflitos na Formação | MOOC" },
      {
        name: "description",
        content:
          "Módulo 3 da formação Gestão de Conflitos na Formação: inteligência emocional, empatia, estilos de gestão de conflito, stress e a Roda de Mapeamento do Conflito.",
      },
      {
        property: "og:title",
        content: "MF3 — Estratégias de Resolução de Conflitos na Formação",
      },
      {
        property: "og:description",
        content:
          "MOOC para formadores: autoconhecimento e autorregulação, empatia e competências sociais, estratégias de resolução, gestão de stress e a Roda de Mapeamento do Conflito.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Mf3Landing,
});

function Mf3Landing() {
  useVisit("mf3-abertura");

  return (
    <article>
      <div className="rounded-2xl border border-border bg-card p-6 shadow-soft sm:p-10">
        <p className="eyebrow">
          {MF3_MODULE_CODE} · {COURSE_TITLE}
        </p>
        <h1 className="mt-2 max-w-3xl font-display text-3xl leading-tight sm:text-4xl">
          {MF3_MODULE_TITLE}
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          Depois de comunicar e escutar (MF1) e de compreender a natureza e as causas do conflito
          (MF2), o MF3 foca-se em si: no autoconhecimento, na gestão emocional e nas estratégias
          concretas — incluindo uma ferramenta estruturada, a Roda de Mapeamento do Conflito — para
          prevenir e resolver conflitos na formação.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            to="/mf3/blocos/$blocoId"
            params={{ blocoId: "1" }}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Começar <ArrowRight className="size-4" />
          </Link>
          <Link
            to="/mf3/atividades"
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
            ~6h assíncronas (este MOOC) + 4h síncronas em sessão presencial/online, fora deste
            MOOC.
          </p>
        </ContentCard>
        <ContentCard title="Estrutura" icon={<Target className="size-4 text-primary" />}>
          <p className="text-muted-foreground">
            5 blocos de conteúdo + 5 atividades de aprendizagem ativa (~2h) de aplicação prática.
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
          {MF3_LEARNING_OBJECTIVES.map((objective, i) => (
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

      <Figure
        caption="Percurso conceptual do MF3: de dentro para fora — primeiro o formador, depois a relação, depois a ação estruturada sobre o conflito."
        source="Elaborado para este módulo a partir do Referencial IEFP/CNQF (2024)."
      >
        <PercursoMf3Svg />
      </Figure>


      <section className="mt-12">
        <SectionHeading
          eyebrow="Percurso"
          title="Os 5 blocos que vai percorrer"
          lead="Cada bloco alterna conteúdo, exemplos, interação e aplicação."
        />
        <ul className="space-y-3">
          {MF3_BLOCKS.map((block) => (
            <li key={block.id}>
              <Link
                to="/mf3/blocos/$blocoId"
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

      <StopNav stopId="mf3-abertura" />
    </article>
  );
}
