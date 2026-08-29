import { createFileRoute } from "@tanstack/react-router";
import { Placeholder, SectionHeading } from "@/components/course/LessonKit";
import { StopNav, useVisit } from "@/components/course/StopNav";

export const Route = createFileRoute("/_authenticated/mf3/sintese")({
  head: () => ({
    meta: [
      { title: "Síntese Final | MF3 Estratégias de Resolução de Conflitos" },
      {
        name: "description",
        content:
          "Recapitulação dos cinco conteúdos do módulo MF3, autoavaliação final e encerramento do percurso assíncrono.",
      },
      { property: "og:title", content: "Síntese Final — MF3" },
      {
        property: "og:description",
        content: "Recapitulação e autoavaliação final do módulo MF3.",
      },
    ],
  }),
  component: Mf3SynthesisPage,
});

function Mf3SynthesisPage() {
  useVisit("mf3-sintese");

  return (
    <article>
      <header className="rounded-2xl border border-border bg-card p-6 shadow-soft sm:p-8">
        <p className="eyebrow">Síntese Final · MF3</p>
        <h1 className="mt-2 font-display text-3xl leading-tight">
          Recapitulação, autoavaliação e encerramento
        </h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Esta página reúne o essencial dos cinco conteúdos do módulo e a autoavaliação final.
        </p>
      </header>

      <section className="mt-10">
        <SectionHeading
          eyebrow="Em preparação"
          title="Síntese em construção"
          lead="Será disponibilizada quando os cinco blocos de conteúdo estiverem completos."
        />
        <Placeholder label="Recapitulação dos Blocos 1 a 5, quadro de resultados dos micro-quizzes e quatro perguntas de autoavaliação final." />
      </section>

      <StopNav stopId="mf3-sintese" />
    </article>
  );
}
