import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { BLOCKS, LEARNING_OBJECTIVES } from "@/lib/course-data";
import {
  ContentCard,
  Placeholder,
  ReflectionPrompt,
  SectionHeading,
} from "@/components/course/LessonKit";
import { StopNav, useVisit } from "@/components/course/StopNav";
import { useProgress } from "@/lib/progress";

export const Route = createFileRoute("/sintese")({
  head: () => ({
    meta: [
      { title: "Síntese Final e autoavaliação | MF1 Comunicação e Escuta Ativa" },
      {
        name: "description",
        content:
          "Recapitulação dos cinco conteúdos do módulo, autoavaliação formativa e encerramento com transição para o Módulo 2 da formação.",
      },
      { property: "og:title", content: "Síntese Final — MF1" },
      {
        property: "og:description",
        content: "Recapitulação, autoavaliação formativa e encerramento do módulo.",
      },
    ],
  }),
  component: SynthesisPage,
});

const SELF_ASSESSMENT = [
  "Explico o conceito de comunicação e as suas funções em contexto formativo.",
  "Identifico os elementos do processo comunicacional e os componentes psicológicos em jogo.",
  "Formulo mensagens assertivas e dou feedback construtivo.",
  "Reconheço barreiras à comunicação e atuo para as reduzir.",
  "Pratico escuta ativa e respondo com empatia em situações de tensão.",
];

const LEVELS = ["Ainda não", "Em desenvolvimento", "Consigo", "Consigo e ensino"];

function SelfAssessment() {
  const { state, saveAnswer } = useProgress();
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      {SELF_ASSESSMENT.map((item, i) => {
        const key = `autoavaliacao-${i}`;
        const value = state.answers[key];
        return (
          <div key={key} className="border-b border-border p-5 last:border-b-0">
            <p className="text-[0.975rem]">{item}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {LEVELS.map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => saveAnswer(key, level)}
                  aria-pressed={value === level}
                  className={
                    value === level
                      ? "rounded-full bg-primary px-3.5 py-1.5 text-xs font-semibold text-primary-foreground"
                      : "rounded-full border border-border px-3.5 py-1.5 text-xs font-medium text-muted-foreground hover:bg-muted"
                  }
                >
                  {level}
                </button>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function SynthesisPage() {
  useVisit("sintese");

  return (
    <article>
      <header className="rounded-2xl border border-border bg-card p-6 shadow-soft sm:p-8">
        <p className="eyebrow">Última paragem</p>
        <h1 className="mt-2 font-display text-3xl leading-tight">Síntese Final</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Fechar o percurso implica arrumar o que aprendeu: revisitar os cinco conteúdos,
          reconhecer onde está hoje e decidir o que leva para a sua prática.
        </p>
      </header>

      <section className="mt-10">
        <SectionHeading eyebrow="Recapitulação" title="Os cinco conteúdos, em síntese" />
        <ul className="grid gap-3 sm:grid-cols-2">
          {BLOCKS.map((block) => (
            <li key={block.id} className="rounded-xl border border-border bg-card p-5">
              <p className="eyebrow">Bloco {block.number}</p>
              <h3 className="mt-1 font-display text-lg">{block.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Síntese de fecho deste bloco a inserir com o conteúdo definitivo.
              </p>
              <Link
                to="/blocos/$blocoId"
                params={{ blocoId: block.id }}
                className="mt-3 inline-block text-sm font-medium text-primary underline-offset-4 hover:underline"
              >
                Revisitar bloco
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-4">
          <Placeholder label="Texto de síntese integradora do módulo (com atribuição de fonte) a inserir." />
        </div>
      </section>

      <section className="mt-12">
        <SectionHeading
          eyebrow="Autoavaliação formativa"
          title="Onde está hoje?"
          lead="Não há classificação. Serve para orientar a sessão síncrona e o seu plano pessoal."
        />
        <SelfAssessment />
      </section>

      <section className="mt-12">
        <SectionHeading eyebrow="Objetivos do módulo" title="Confirme o percurso" />
        <ul className="space-y-2">
          {LEARNING_OBJECTIVES.map((objective, i) => (
            <li
              key={i}
              className="rounded-xl border border-border bg-surface p-4 text-sm leading-relaxed"
            >
              {objective}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12">
        <ReflectionPrompt
          id="sintese-compromisso"
          question="Qual é o seu compromisso concreto para a próxima sessão que vai formar?"
          hint="Uma prática, observável, que possa avaliar depois."
        />
      </section>

      <div className="mt-8">
        <ContentCard tone="primary" title="A seguir: Módulo 2">
          <p>
            Este MOOC encerra o MF1. O Módulo 2 da formação{" "}
            <strong>Gestão de Conflitos na Formação</strong> aprofunda a natureza do conflito e as
            estratégias de mediação — está fora do âmbito deste MOOC e será disponibilizado
            separadamente. Recorde ainda as 2 horas síncronas do MF1, realizadas em sessão
            presencial ou online.
          </p>
          <Link
            to="/atividades"
            className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
          >
            Rever a Aprendizagem Ativa <ArrowRight className="size-4" />
          </Link>
        </ContentCard>
      </div>

      <StopNav stopId="sintese" />
    </article>
  );
}
