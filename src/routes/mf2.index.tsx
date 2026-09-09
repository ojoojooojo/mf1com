import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Clock, Target, Users } from "lucide-react";
import { COURSE_TITLE } from "@/lib/course-data";
import {
  MF2_BLOCKS,
  MF2_LEARNING_OBJECTIVES,
  MF2_MODULE_CODE,
  MF2_MODULE_TITLE,
} from "@/lib/course-data-mf2";
import {
  ContentCard,
  DiagramPlaceholder,
  Figure,
  SectionHeading,
} from "@/components/course/LessonKit";
import { StopNav, useVisit } from "@/components/course/StopNav";

export const Route = createFileRoute("/mf2/")({
  head: () => ({
    meta: [
      { title: "MF2 — Dinâmicas e Causas do Conflito na Formação | MOOC" },
      {
        name: "description",
        content:
          "Módulo 2 da formação Gestão de Conflitos na Formação: natureza, tipos, causas, custos e impacto do conflito em contexto de formação de adultos.",
      },
      { property: "og:title", content: "MF2 — Dinâmicas e Causas do Conflito na Formação" },
      {
        property: "og:description",
        content:
          "MOOC para formadores: definição e tipos de conflito, estratégias de gestão, causas e custos, impacto nos indivíduos e papel de cada um.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Mf2Landing,
});

function Mf2Landing() {
  useVisit("mf2-abertura");

  return (
    <article>
      <div className="rounded-2xl border border-border bg-card p-6 shadow-soft sm:p-10">
        <p className="eyebrow">
          {MF2_MODULE_CODE} · {COURSE_TITLE}
        </p>
        <h1 className="mt-2 max-w-3xl font-display text-3xl leading-tight sm:text-4xl">
          {MF2_MODULE_TITLE}
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          Depois de comunicar e escutar no MF1, o que acontece quando interesses, perceções ou
          objetivos entram em oposição? O MF2 explora a natureza, as causas e o impacto do conflito
          na formação — e o papel de cada pessoa na sua origem, escalada ou prevenção.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            to="/mf2/blocos/$blocoId"
            params={{ blocoId: "1" }}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Começar <ArrowRight className="size-4" />
          </Link>
          <Link
            to="/mf2/atividades"
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
            4 blocos de conteúdo + 5 atividades de aprendizagem ativa (~2h) de aplicação prática.
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
          {MF2_LEARNING_OBJECTIVES.map((objective, i) => (
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

      <Figure caption="Percurso conceptual do módulo: da natureza do conflito às suas causas, custos e ao papel de cada pessoa.">
        <PercursoMf2Svg />
      </Figure>


      <section className="mt-12">
        <SectionHeading
          eyebrow="Percurso"
          title="Os 4 blocos que vai percorrer"
          lead="Cada bloco alterna conteúdo, exemplos, interação e aplicação."
        />
        <ul className="space-y-3">
          {MF2_BLOCKS.map((block) => (
            <li key={block.id}>
              <Link
                to="/mf2/blocos/$blocoId"
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

      <StopNav stopId="mf2-abertura" />
    </article>
  );
}
