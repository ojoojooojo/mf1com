import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Clock } from "lucide-react";
import { BLOCKS, getBlock } from "@/lib/course-data";
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
import { Block1Content } from "@/components/course/Block1Content";
import { Block2Content } from "@/components/course/Block2Content";
import { Block3Content } from "@/components/course/Block3Content";
import { Block4Content } from "@/components/course/Block4Content";
import { Block5Content } from "@/components/course/Block5Content";

export const Route = createFileRoute("/blocos/$blocoId")({
  loader: ({ params }) => {
    const block = getBlock(params.blocoId);
    if (!block) throw notFound();
    return { block };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Bloco indisponível — MF1" }, { name: "robots", content: "noindex" }],
      };
    }
    const { block } = loaderData;
    const title = `Bloco ${block.number}: ${block.title} — MF1`;
    return {
      meta: [
        { title },
        { name: "description", content: block.subtitle },
        { property: "og:title", content: title },
        { property: "og:description", content: block.subtitle },
      ],
    };
  },
  notFoundComponent: BlockNotFound,
  component: BlockPage,
});

function BlockNotFound() {
  return (
    <div className="rounded-xl border border-border bg-card p-8">
      <h1 className="font-display text-2xl">Bloco não encontrado</h1>
      <p className="mt-2 text-muted-foreground">
        Escolha um dos cinco blocos do módulo no mapa lateral.
      </p>
      <ul className="mt-4 space-y-2">
        {BLOCKS.map((b) => (
          <li key={b.id}>
            <Link
              to="/blocos/$blocoId"
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

function BlockPage() {
  const { block } = Route.useLoaderData();
  const stopId = `bloco-${block.id}`;
  useVisit(stopId);

  return (
    <article key={block.id}>
      <header className="rounded-2xl border border-border bg-card p-6 shadow-soft sm:p-8">
        <p className="eyebrow">Bloco {block.number} de 5</p>
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

      {block.id === "1" ? (
        <Block1Content />
      ) : block.id === "2" ? (
        <Block2Content />
      ) : block.id === "3" ? (
        <Block3Content />
      ) : block.id === "4" ? (
        <Block4Content />
      ) : block.id === "5" ? (
        <Block5Content />
      ) : (
        <BlockPlaceholder block={block} />
      )}

      <StopNav stopId={stopId} />
    </article>
  );
}

function BlockPlaceholder({ block }: { block: (typeof BLOCKS)[number] }) {
  return (
    <>
      {/* 1. CONTEÚDO */}
      <section className="mt-10">
        <SectionHeading eyebrow="Conteúdo" title="Enquadramento conceptual" />
        <Prose>
          <p className="text-muted-foreground">
            O texto pedagógico deste bloco será inserido aqui, tal como fornecido, com a
            respetiva atribuição de fonte.
          </p>
        </Prose>
        <Placeholder label="Texto de enquadramento, definições e desenvolvimento teórico deste bloco." />
        <KeyIdea>
          Espaço reservado para a ideia-chave do bloco — a formulação que o formando deve
          conseguir repetir por palavras suas no final da leitura.
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
            { speaker: "Formador", text: "Réplica a inserir com o conteúdo definitivo.", side: "right" },
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
          id={`bloco-${block.id}-quiz-1`}
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
          id={`bloco-${block.id}-reflexao-1`}
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
