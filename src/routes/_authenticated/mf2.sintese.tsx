import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import {
  MF2_BLOCKS,
  MF2_BLOCK_QUIZ_IDS,
  MF2_LEARNING_OBJECTIVES,
} from "@/lib/course-data-mf2";
import {
  ContentCard,
  Placeholder,
  Quiz,
  ReflectionPrompt,
  SectionHeading,
} from "@/components/course/LessonKit";
import { StopNav, useVisit } from "@/components/course/StopNav";
import { useProgress } from "@/lib/progress";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/mf2/sintese")({
  head: () => ({
    meta: [
      { title: "Síntese Final e autoavaliação | MF2 Dinâmicas e Causas do Conflito" },
      {
        name: "description",
        content:
          "Recapitulação dos quatro conteúdos do módulo, autoavaliação formativa e encerramento das horas assíncronas do MF2.",
      },
      { property: "og:title", content: "Síntese Final — MF2" },
      {
        property: "og:description",
        content:
          "Recapitulação visual, autoavaliação formativa e encerramento do módulo MF2 — Dinâmicas e Causas do Conflito na Formação.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Mf2SynthesisPage,
});

/** Recapitulação por bloco — texto definitivo a inserir com o conteúdo de cada bloco. */
const RECAP: Record<string, string> = {
  "1": "Um conflito existe sempre que atividades ou interesses são incompatíveis (Deutsch). Não é bom nem mau em si — o que decide é como é gerido. Pondy mostra que atravessa cinco fases (latente a resíduo); Rahim e Jehn ajudam a nomear o nível (inter/intra/intergrupal) e o conteúdo (tarefa/processo/relacional) em jogo.",
  "2": "Três abordagens fundamentais — prevenção, intervenção, pós-resolução — atuam em momentos diferentes do mesmo conflito. O modelo de Glasl mostra que quanto mais cedo se atua, mais fácil é chegar a um desfecho onde ambas as partes ganham; e Deutsch lembra que cooperação tende a gerar cooperação, tal como competição gera competição.",
  "3": "Os conflitos têm causas de fundo (recursos, objetivos, interdependência, comunicação) distintas dos detonadores que os tornam visíveis. Têm também custo mensurável em tempo e bem-estar (CPP, 2008) e consequências que podem ser funcionais ou disfuncionais, consoante como são geridos.",
  "4": "O conflito tem custo pessoal, não só organizacional. Grande parte da escalada vem de como interpretamos as intenções do outro (realismo ingénuo, erro de atribuição) — e cada pessoa envolvida, incluindo o formador, é sempre, em algum grau, coautora da trajetória do conflito.",
};

const FINAL_QUIZ_IDS = [
  "mf2-sintese-quiz-1",
  "mf2-sintese-quiz-2",
  "mf2-sintese-quiz-3",
  "mf2-sintese-quiz-4",
];
const FINAL_CORRECT: Record<string, number> = {
  "mf2-sintese-quiz-1": 1,
  "mf2-sintese-quiz-2": 1,
  "mf2-sintese-quiz-3": 0,
  "mf2-sintese-quiz-4": 1,
};

function ScorePanel() {
  const { state, hydrated } = useProgress();
  const answered = FINAL_QUIZ_IDS.filter((id) => typeof state.quiz[id] === "number");
  const correct = answered.filter((id) => state.quiz[id] === FINAL_CORRECT[id]).length;

  if (!hydrated || answered.length === 0) return null;

  return (
    <div className="mt-6 rounded-xl border border-border bg-surface p-5">
      <p className="eyebrow">Balanço</p>
      <p className="mt-1 font-display text-xl">
        Acertou {correct} de {FINAL_QUIZ_IDS.length}
        {answered.length < FINAL_QUIZ_IDS.length
          ? ` (${answered.length} respondidas até agora)`
          : ""}
        .
      </p>
      <p className="mt-2 text-[0.95rem] leading-relaxed text-muted-foreground">
        Este número não é uma nota nem uma classificação: fica guardado na sua conta e serve de
        feedback formativo para si e para o formador do curso.
      </p>
    </div>
  );
}

function QuizSummary() {
  // Fonte de verdade: a tabela `quiz_answers` da conta autenticada, só com os quizzes dos blocos MF2.
  const { data } = useQuery({
    queryKey: ["mf2-sintese", "quiz-answers"],
    queryFn: async () => {
      const { data: auth } = await supabase.auth.getUser();
      const userId = auth.user?.id;
      if (!userId) return { answered: 0, correct: 0 };
      const { data: rows } = await supabase
        .from("quiz_answers")
        .select("quiz_id, is_correct")
        .eq("user_id", userId)
        .in("quiz_id", [...MF2_BLOCK_QUIZ_IDS]);
      const relevant = rows ?? [];
      return {
        answered: relevant.length,
        correct: relevant.filter((r) => r.is_correct).length,
      };
    },
  });

  if (!data) return null;
  const { answered, correct } = data;

  return (
    <div className="mt-4 rounded-xl border border-primary/25 bg-primary-soft p-5">
      <p className="eyebrow">O seu percurso nos micro-quizzes</p>
      <p className="mt-1 font-display text-xl">
        {correct}/{MF2_BLOCK_QUIZ_IDS.length} respostas corretas nos micro-quizzes dos blocos
      </p>
      <p className="mt-2 text-[0.95rem] leading-relaxed text-muted-foreground">
        {answered < MF2_BLOCK_QUIZ_IDS.length
          ? `Respondeu a ${answered} dos ${MF2_BLOCK_QUIZ_IDS.length} micro-quizzes ao longo dos quatro blocos. `
          : "Respondeu a todos os micro-quizzes dos quatro blocos. "}
        Isto não é uma classificação: é apenas feedback formativo para si. Pode voltar a qualquer
        bloco e responder de novo — fica guardada a resposta mais recente.
      </p>
    </div>
  );
}

function Mf2SynthesisPage() {
  useVisit("mf2-sintese");

  return (
    <article>
      <header className="rounded-2xl border border-border bg-card p-6 shadow-soft sm:p-8">
        <p className="eyebrow">Última paragem</p>
        <h1 className="mt-2 font-display text-3xl leading-tight">Síntese Final</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Fechar o percurso implica arrumar o que aprendeu: revisitar os quatro conteúdos numa frase
          cada, testar a aplicação em situações novas e decidir o que leva para a sua prática.
        </p>
      </header>

      <section className="mt-10">
        <SectionHeading
          eyebrow="Recapitulação"
          title="Os quatro conteúdos, em síntese"
          lead="Uma ideia central por conteúdo — para reler antes da sessão síncrona."
        />
        <ul className="grid gap-3 sm:grid-cols-2">
          {MF2_BLOCKS.map((block) => (
            <li key={block.id} className="rounded-xl border border-border bg-card p-5">
              <p className="eyebrow">Bloco {block.number}</p>
              <h3 className="mt-1 font-display text-lg">{block.title}</h3>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-muted-foreground">
                {RECAP[block.id]}
              </p>
              <Link
                to="/mf2/blocos/$blocoId"
                params={{ blocoId: block.id }}
                className="mt-3 inline-block text-sm font-medium text-primary underline-offset-4 hover:underline"
              >
                Revisitar bloco
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12">
        <SectionHeading
          eyebrow="Autoavaliação formativa"
          title="Quatro situações novas"
          lead="Uma pergunta por conteúdo, em situações que ainda não viu no curso. Cada resposta terá explicação — é aí que está a aprendizagem, não no número de acertos."
        />
        <Placeholder label="As quatro perguntas de autoavaliação definitivas serão inseridas aqui." />

        {FINAL_QUIZ_IDS.map((id, i) => (
          <Quiz
            key={id}
            id={id}
            question={`${i + 1}. Pergunta de autoavaliação a inserir com o conteúdo definitivo.`}
            options={[
              {
                text: "Opção A (a substituir)",
                correct: true,
                feedback: "Feedback explicativo a inserir com o conteúdo definitivo.",
              },
              {
                text: "Opção B (a substituir)",
                feedback: "Feedback explicativo a inserir com o conteúdo definitivo.",
              },
              {
                text: "Opção C (a substituir)",
                feedback: "Feedback explicativo a inserir com o conteúdo definitivo.",
              },
            ]}
            takeaway="Síntese a retirar desta pergunta."
          />
        ))}

        <ScorePanel />
        <QuizSummary />
      </section>

      <section className="mt-12">
        <SectionHeading eyebrow="Objetivos do módulo" title="Confirme o percurso" />
        <ul className="space-y-2">
          {MF2_LEARNING_OBJECTIVES.map((objective, i) => (
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
          id="mf2-sintese-compromisso"
          question="Qual é o seu compromisso concreto para a próxima sessão que vai formar?"
          hint="Uma prática, observável, que possa avaliar depois."
        />
      </section>

      <div className="mt-8 space-y-4">
        <ContentCard tone="primary" title="Módulo concluído — o que falta">
          <p>
            As <strong>~8 horas assíncronas</strong> do MF2 —{" "}
            <em>Dinâmicas e Causas do Conflito na Formação</em> estão concluídas. Faltam as{" "}
            <strong>2 horas síncronas</strong>, realizadas em sessão presencial ou online fora deste
            MOOC, para completar as <strong>10 horas totais</strong> do módulo.
          </p>
        </ContentCard>

        <ContentCard title="Rever o percurso">
          <Link
            to="/mf2/atividades"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
          >
            Rever a Aprendizagem Ativa <ArrowRight className="size-4" />
          </Link>
        </ContentCard>
      </div>

      <StopNav stopId="mf2-sintese" />
    </article>
  );
}
