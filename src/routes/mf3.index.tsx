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
  DiagramPlaceholder,
  Figure,
  SectionHeading,
} from "@/components/course/LessonKit";
import { StopNav, useVisit } from "@/components/course/StopNav";

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
            ~8h assíncronas (este MOOC) + 2h síncronas em sessão presencial/online, fora deste
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

      <Figure caption="Percurso conceptual do módulo: diagrama pedagógico a construir com o conteúdo definitivo.">
        <DiagramPlaceholder />
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
