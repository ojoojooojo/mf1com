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
        <Quiz
          id="mf2-sintese-quiz-1"
          question="Dois departamentos de uma escola de formação discordam sobre qual deve gerir o orçamento de materiais didáticos, e cada equipa evita colaborar com a outra em iniciativas conjuntas. Que nível de conflito (Rahim, Bloco 1) é este, predominantemente?"
          options={[
            {
              text: "Interpessoal",
              feedback:
                "Interpessoal envolveria duas pessoas específicas, não dois departamentos a agir como unidades.",
            },
            {
              text: "Intergrupal",
              correct: true,
              feedback:
                "Correto. Dois grupos constituídos (os departamentos) opõem-se e evitam colaborar entre si como unidades — o traço distintivo do nível intergrupal.",
            },
            {
              text: "Intrapessoal",
              feedback:
                "Intrapessoal seria um conflito dentro de uma só pessoa, entre objetivos ou valores próprios — não é o caso aqui.",
            },
          ]}
          takeaway="Quando a oposição já não passa por indivíduos isolados mas por grupos inteiros a agir como blocos, o nível é intergrupal."
        />

        <Quiz
          id="mf2-sintese-quiz-2"
          question="Um formador nota que dois formandos já trocam farpas indiretas mas ainda debatem abertamente o tema em disputa. Segundo o modelo de escalada de Glasl (Bloco 2), em que patamar estão, e que tipo de resposta é ainda mais provável de funcionar?"
          options={[
            {
              text: "Patamar ganha-perde avançado; só a mediação externa resulta a esta altura",
              feedback:
                "Ganha-perde avançado envolveria já procura de coligações e ataques à reputação mais explícitos — este episódio ainda está a um nível mais inicial.",
            },
            {
              text: "Patamar ganha-ganha; prevenção ou intervenção direta do formador ainda têm boas probabilidades de funcionar",
              correct: true,
              feedback:
                "Correto. Ainda há diálogo direto sobre o tema, mesmo com alguma tensão — típico do patamar inicial, onde uma solução onde ambas as partes ficam satisfeitas continua ao alcance.",
            },
            {
              text: "Patamar perde-perde; já não há solução construtiva possível",
              feedback:
                "Perde-perde implicaria disposição para se prejudicarem mutuamente mesmo a custo próprio — não há qualquer sinal disso aqui.",
            },
          ]}
          takeaway="Quanto mais cedo se reconhece o patamar, maior a margem para uma resposta simples funcionar."
        />

        <Quiz
          id="mf2-sintese-quiz-3"
          question="Depois de vários atrasos seguidos de um formador, a coordenação decide apenas avisá-lo verbalmente sobre a pontualidade, sem investigar mais. Nas semanas seguintes, o mesmo problema volta a acontecer. Isto ilustra sobretudo..."
          options={[
            {
              text: "Que a causa de fundo não foi tratada — só se respondeu ao detonador mais recente",
              correct: true,
              feedback:
                "Correto. Tratar apenas o episódio visível, sem investigar a condição estrutural que o gera, tende a produzir o mesmo problema outra vez, com outro pretexto.",
            },
            {
              text: "Que o formador é o único responsável por este conflito",
              feedback:
                "Atribuir toda a responsabilidade a uma só pessoa ignora precisamente a distinção entre causa de fundo e detonador que este módulo trabalhou.",
            },
            {
              text: "Que este é um exemplo de consequência funcional",
              feedback:
                "Uma consequência funcional deixaria clareza ou aprendizagem ganhas; aqui o problema persiste sem alteração — não há ganho identificável.",
            },
          ]}
          takeaway="Repetição do mesmo episódio é normalmente sinal de que a causa de fundo, não só o detonador, continua por tratar."
        />

        <Quiz
          id="mf2-sintese-quiz-4"
          question="Numa videochamada, um formando interpreta o silêncio prolongado de um colega como desinteresse, sem considerar que pode ter havido um problema técnico de som. Que mecanismo, estudado no Bloco 4, está mais provavelmente em jogo?"
          options={[
            {
              text: "Escalada segundo o modelo de Glasl",
              feedback:
                "Escalada descreve como um conflito já em curso se agrava por fases — aqui ainda nem há confirmação de que exista sequer um conflito, só uma interpretação precipitada de um sinal ambíguo.",
            },
            {
              text: "Realismo ingénuo / erro fundamental de atribuição",
              correct: true,
              feedback:
                "Correto. O formando trata a sua própria leitura (desinteresse) como um facto, sem considerar explicações alternativas igualmente plausíveis (problema técnico) — o mecanismo descrito por Ross no Bloco 4.",
            },
            {
              text: "Conflito de tarefa",
              feedback:
                "Conflito de tarefa seria um desacordo sobre o conteúdo do trabalho — aqui não há sequer um desacordo confirmado, apenas uma interpretação de um sinal ambíguo.",
            },
          ]}
          takeaway="Antes de reagir a um sinal ambíguo, vale perguntar: que outra explicação, igualmente plausível, ainda não considerei?"
        />

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
            As <strong>8 horas assíncronas</strong> do MF2 —{" "}
            <em>Dinâmicas e Causas do Conflito na Formação</em> estão concluídas. Faltam as{" "}
            <strong>2 horas síncronas</strong>, realizadas online fora deste MOOC, para completar as{" "}
            <strong>10 horas totais</strong> do módulo.
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
