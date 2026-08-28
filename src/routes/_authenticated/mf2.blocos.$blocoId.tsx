import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Clock } from "lucide-react";
import { MF2_BLOCKS, getMf2Block } from "@/lib/course-data-mf2";
import {
  ContentCard,
  Figure,
  KeyIdea,
  LessonAccordion,
  Placeholder,
  Prose,
  Quiz,
  ReflectionPrompt,
  Scenario,
  SectionHeading,
  SourceNote,
} from "@/components/course/LessonKit";
import { StopNav, useVisit } from "@/components/course/StopNav";
import { Block1ContentMf2 } from "@/components/course/Block1ContentMf2";

/** Primeiro micro-quiz avaliado de cada bloco do MF2 (id estável, já a gravar no backend). */
const FIRST_QUIZ_ID: Record<string, string> = {
  "1": "mf2-bloco-1-quiz-tipos-nivel",
  "2": "mf2-bloco-2-quiz-abordagem",
  "3": "mf2-bloco-3-quiz-causas",
  "4": "mf2-bloco-4-quiz-impacto",
};

export const Route = createFileRoute("/_authenticated/mf2/blocos/$blocoId")({
  loader: ({ params }) => {
    const block = getMf2Block(params.blocoId);
    if (!block) throw notFound();
    return { block };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Bloco indisponível — MF2" }, { name: "robots", content: "noindex" }],
      };
    }
    const { block } = loaderData;
    const title = `Bloco ${block.number}: ${block.title} — MF2`;
    return {
      meta: [
        { title },
        { name: "description", content: block.subtitle },
        { property: "og:title", content: title },
        { property: "og:description", content: block.subtitle },
      ],
    };
  },
  notFoundComponent: Mf2BlockNotFound,
  component: Mf2BlockPage,
});

function Mf2BlockNotFound() {
  return (
    <div className="rounded-xl border border-border bg-card p-8">
      <h1 className="font-display text-2xl">Bloco não encontrado</h1>
      <p className="mt-2 text-muted-foreground">
        Escolha um dos quatro blocos do módulo no mapa lateral.
      </p>
      <ul className="mt-4 space-y-2">
        {MF2_BLOCKS.map((b) => (
          <li key={b.id}>
            <Link
              to="/mf2/blocos/$blocoId"
              params={{ blocoId: b.id }}
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              Bloco {b.number} — {b.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Mf2BlockPage() {
  const { block } = Route.useLoaderData();
  const stopId = `mf2-bloco-${block.id}`;
  useVisit(stopId);

  return (
    <article key={block.id}>
      <header className="rounded-2xl border border-border bg-card p-6 shadow-soft sm:p-8">
        <p className="eyebrow">Bloco {block.number} de 4</p>
        <h1 className="mt-2 font-display text-3xl leading-tight">{block.title}</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">{block.subtitle}</p>
        <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1 text-muted-foreground">
            <Clock className="size-3" /> ~{block.minutes} min
          </span>
          {block.focus.map((f) => (
            <span
              key={f}
              className="rounded-full bg-primary-soft px-3 py-1 font-medium text-primary"
            >
              {f}
            </span>
          ))}
        </div>
      </header>

      {block.id === "1" ? <Block1ContentMf2 /> : <Mf2BlockPlaceholder block={block} />}

      <StopNav stopId={stopId} />
    </article>
  );
}

function Mf2BlockPlaceholder({ block }: { block: (typeof MF2_BLOCKS)[number] }) {
  const quizId = FIRST_QUIZ_ID[block.id] ?? `mf2-bloco-${block.id}-quiz-1`;

  return (
    <>
      {/* 1. CONTEÚDO */}
      <section className="mt-10">
        <SectionHeading eyebrow="Conteúdo" title="Enquadramento conceptual" />
        <Prose>
          <p className="text-muted-foreground">
            O texto pedagógico deste bloco será inserido aqui, tal como fornecido, com a respetiva
            atribuição de fonte.
          </p>
        </Prose>
        <Placeholder label="Texto de enquadramento, definições e desenvolvimento teórico deste bloco." />
        <KeyIdea>
          Espaço reservado para a ideia-chave do bloco — a formulação que o formando deve conseguir
          repetir por palavras suas no final da leitura.
        </KeyIdea>
        <Figure caption={`Infográfico do Bloco ${block.number}: diagrama pedagógico a construir.`} />
        <LessonAccordion
          items={[
            {
              title: "Aprofundar: conceito e delimitação",
              content: <Placeholder label="Desenvolvimento a inserir." />,
            },
            {
              title: "Aprofundar: aplicação ao contexto de formação",
              content: <Placeholder label="Desenvolvimento a inserir." />,
            },
          ]}
        />
        <SourceNote>a indicar com o conteúdo definitivo deste bloco.</SourceNote>
      </section>

      {/* 2. EXEMPLO / CENÁRIO */}
      <section className="mt-12">
        <SectionHeading
          eyebrow="Exemplo"
          title="Como isto aparece na sala de formação"
          lead="Um episódio curto para ancorar o conceito numa situação reconhecível."
        />
        <Scenario
          title="Cenário a definir"
          context="Contexto do episódio (grupo, momento da sessão, tensão em jogo)."
          lines={[
            { speaker: "Formando", text: "Réplica a inserir com o conteúdo definitivo." },
            {
              speaker: "Formador",
              text: "Réplica a inserir com o conteúdo definitivo.",
              side: "right",
            },
          ]}
          note="Nota de leitura pedagógica do cenário — o que observar nesta troca."
        />
      </section>

      {/* 3. INTERAÇÃO */}
      <section className="mt-12">
        <SectionHeading
          eyebrow="Interação"
          title="Verifique a sua compreensão"
          lead="Cada opção tem feedback explicativo: o objetivo é compreender o porquê, não acertar."
        />
        <Quiz
          id={quizId}
          question="Pergunta de verificação a inserir com o conteúdo definitivo."
          options={[
            {
              text: "Opção A (a substituir)",
              correct: true,
              feedback:
                "Feedback explicativo: por que razão esta leitura é a mais consistente com o conceito trabalhado.",
            },
            {
              text: "Opção B (a substituir)",
              feedback:
                "Feedback explicativo: que confusão frequente esta opção revela e como a corrigir.",
            },
            {
              text: "Opção C (a substituir)",
              feedback:
                "Feedback explicativo: onde esta resposta é parcialmente verdadeira mas insuficiente.",
            },
          ]}
          takeaway="Síntese a retirar desta pergunta."
        />
      </section>

      {/* 4. APLICAÇÃO */}
      <section className="mt-12">
        <SectionHeading
          eyebrow="Aplicação"
          title="Transportar para a sua prática"
          lead="Sem resposta certa: o valor está no registo pessoal e na consciência que gera."
        />
        <ReflectionPrompt
          id={`mf2-bloco-${block.id}-reflexao-1`}
          question="Questão de reflexão a inserir com o conteúdo definitivo."
          hint="Pense numa situação concreta que viveu enquanto formador."
        />
        <ContentCard tone="primary" title="Antes de avançar">
          <p>
            Guarde a sua resposta e continue. As reflexões deste bloco serão retomadas na
            Aprendizagem Ativa e na Síntese Final.
          </p>
        </ContentCard>
      </section>
    </>
  );
}
