import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import {
  MF3_BLOCKS,
  MF3_BLOCK_QUIZ_IDS,
  MF3_LEARNING_OBJECTIVES,
} from "@/lib/course-data-mf3";
import {
  ContentCard,
  Quiz,
  ReflectionPrompt,
  SectionHeading,
} from "@/components/course/LessonKit";
import { StopNav, useVisit } from "@/components/course/StopNav";
import { useProgress } from "@/lib/progress";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/mf3/sintese")({
  head: () => ({
    meta: [
      { title: "Síntese Final e autoavaliação | MF3 Estratégias de Resolução de Conflitos" },
      {
        name: "description",
        content:
          "Recapitulação dos cinco conteúdos do módulo MF3, autoavaliação formativa integrada e encerramento do percurso assíncrono do curso.",
      },
      { property: "og:title", content: "Síntese Final — MF3" },
      {
        property: "og:description",
        content:
          "Recapitulação dos cinco blocos, autoavaliação formativa e encerramento do módulo MF3 — Estratégias de Resolução de Conflitos na Formação.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Mf3SynthesisPage,
});

/** Recapitulação por bloco — uma ideia central cada, para reler antes da sessão síncrona online. */
const RECAP: Record<string, string> = {
  "1": "A inteligência emocional é uma competência aprendível, não um traço fixo (Salovey & Mayer, 1990; Goleman, 1995). Autoconsciência é reconhecer o que se está a sentir enquanto se sente; autorregulação é decidir o que fazer com isso. É a diferença entre reagir por impulso e responder com intenção.",
  "2": "A empatia cognitiva compreende a perspetiva do outro; a emocional sintoniza-se com o que ele sente. Nenhuma delas exige concordar. Traduzidas em competências sociais — escuta ativa, feedback, gestão do grupo —, é isto que sustenta a relação enquanto o conflito é tratado.",
  "3": "Os cinco estilos de Thomas-Kilmann (1974) cruzam assertividade e cooperação: competir, colaborar, comprometer, evitar, acomodar. Nenhum é o melhor em absoluto — o que decide é a adequação ao momento, ao que está em jogo e à relação. A prevenção ativa evita ter de escolher tarde.",
  "4": "Antes de reagir, o formador avalia: isto é ameaça, desafio ou irrelevante? Tenho recursos para lidar com isto? (Lazarus & Folkman, 1984). Em stress elevado, essa avaliação distorce-se — visão em túnel, menos empatia, leitura enviesada das intenções. A pausa de autorregulação existe para reavaliar antes de intervir.",
  "5": "A Roda de Mapeamento do Conflito (Lantos & Harari, 2018, a partir de Mayer, 2000) decompõe um conflito em quatro quadrantes — Problema, Pessoas, Processo, Contexto. Serve para não confundir o que está em disputa com quem está em disputa, nem com o modo como o assunto foi tratado.",
};

const FINAL_QUIZ_IDS = [
  "mf3-sintese-quiz-1",
  "mf3-sintese-quiz-2",
  "mf3-sintese-quiz-3",
  "mf3-sintese-quiz-4",
];
const FINAL_CORRECT: Record<string, number> = {
  "mf3-sintese-quiz-1": 2,
  "mf3-sintese-quiz-2": 0,
  "mf3-sintese-quiz-3": 1,
  "mf3-sintese-quiz-4": 2,
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
  // Fonte de verdade: a tabela `quiz_answers` da conta autenticada, só com os quizzes dos blocos MF3.
  const { data } = useQuery({
    queryKey: ["mf3-sintese", "quiz-answers"],
    queryFn: async () => {
      const { data: auth } = await supabase.auth.getUser();
      const userId = auth.user?.id;
      if (!userId) return { answered: 0, correct: 0 };
      const { data: rows } = await supabase
        .from("quiz_answers")
        .select("quiz_id, is_correct")
        .eq("user_id", userId)
        .in("quiz_id", [...MF3_BLOCK_QUIZ_IDS]);
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
        {correct}/{MF3_BLOCK_QUIZ_IDS.length} respostas corretas nos micro-quizzes dos blocos
      </p>
      <p className="mt-2 text-[0.95rem] leading-relaxed text-muted-foreground">
        {answered < MF3_BLOCK_QUIZ_IDS.length
          ? `Respondeu a ${answered} dos ${MF3_BLOCK_QUIZ_IDS.length} micro-quizzes ao longo dos cinco blocos. `
          : "Respondeu a todos os micro-quizzes dos cinco blocos. "}
        Isto não é uma classificação: é apenas feedback formativo para si. Pode voltar a qualquer
        bloco e responder de novo — fica guardada a resposta mais recente.
      </p>
    </div>
  );
}

function Mf3SynthesisPage() {
  useVisit("mf3-sintese");

  return (
    <article>
      <header className="rounded-2xl border border-border bg-card p-6 shadow-soft sm:p-8">
        <p className="eyebrow">Última paragem</p>
        <h1 className="mt-2 font-display text-3xl leading-tight">Síntese Final</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Fechar o MF3 é também fechar o percurso completo: comunicar e escutar (MF1), compreender a
          natureza e as causas do conflito (MF2) e, agora, agir sobre ele com intenção. Revisite os
          cinco conteúdos, teste a aplicação em situações novas e decida o que leva para a sua
          prática.
        </p>
      </header>

      <section className="mt-10">
        <SectionHeading
          eyebrow="O percurso completo"
          title="Do que se diz ao que se faz"
          lead="Três módulos, uma progressão."
        />
        <div className="grid gap-3 sm:grid-cols-3">
          <ContentCard title="MF1 · Comunicação e escuta">
            <p>
              Como a mensagem é construída, distorcida e recebida. A escuta ativa e a assertividade
              como base de qualquer conversa difícil.
            </p>
          </ContentCard>
          <ContentCard title="MF2 · Natureza do conflito">
            <p>
              O que é um conflito, como escala, de onde vem, quanto custa e que papel cada pessoa
              envolvida tem na sua trajetória.
            </p>
          </ContentCard>
          <ContentCard tone="primary" title="MF3 · Estratégias de resolução">
            <p>
              O que fazer com ele: autoconhecimento, empatia, escolha de estilo, gestão do stress e
              uma ferramenta estruturada de análise.
            </p>
          </ContentCard>
        </div>
      </section>

      <section className="mt-12">
        <SectionHeading
          eyebrow="Recapitulação"
          title="Os cinco conteúdos, em síntese"
          lead="Uma ideia central por conteúdo — para reler antes da sessão síncrona online."
        />
        <ul className="grid gap-3 sm:grid-cols-2">
          {MF3_BLOCKS.map((block) => (
            <li key={block.id} className="rounded-xl border border-border bg-card p-5">
              <p className="eyebrow">Bloco {block.number}</p>
              <h3 className="mt-1 font-display text-lg">{block.title}</h3>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-muted-foreground">
                {RECAP[block.id]}
              </p>
              <Link
                to="/mf3/blocos/$blocoId"
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
          title="Quatro situações que cruzam blocos"
          lead="Cada pergunta obriga a usar mais do que um conteúdo do módulo. Todas as respostas têm explicação — é aí que está a aprendizagem, não no número de acertos."
        />

        <Quiz
          id="mf3-sintese-quiz-1"
          question="Um formador percebe, a meio de uma discussão tensa, que está a falar mais alto e a interromper. Faz uma pausa de trinta segundos, respira e só depois responde, já a perguntar ao formando o que está por trás da sua objeção. Que competências, de que blocos, acabou de usar em sequência?"
          options={[
            {
              text: "Empatia emocional (Bloco 2) e depois estilo de compromisso (Bloco 3)",
              feedback:
                "A empatia surge no fim, quando pergunta o que está por trás da objeção, mas o que acontece primeiro — reparar no próprio tom e travar a resposta — não é empatia, e nada indica que tenha havido concessões mútuas de compromisso.",
            },
            {
              text: "Avaliação primária (Bloco 4) e prevenção ativa (Bloco 3)",
              feedback:
                "A avaliação primária está presente de forma implícita, mas a prevenção ativa atua antes de o conflito surgir — aqui a discussão já está em curso, pelo que se trata de intervenção, não de prevenção.",
            },
            {
              text: "Autoconsciência e autorregulação (Bloco 1), aplicadas como pausa antes de intervir (Bloco 4), seguidas de empatia cognitiva (Bloco 2)",
              correct: true,
              feedback:
                "Correto. Reconhecer o próprio estado é autoconsciência; travar a resposta imediata é autorregulação, usada exatamente no momento que o Bloco 4 descreve — antes de intervir, para reavaliar. Perguntar o que está por trás da objeção é empatia cognitiva a procurar a perspetiva do outro.",
            },
          ]}
          takeaway="Reparar, travar, reavaliar, perguntar: as competências dos blocos raramente se usam isoladas — encadeiam-se numa sequência de segundos."
        />

        <Quiz
          id="mf3-sintese-quiz-2"
          question="Dois formandos discutem repetidamente sobre quem faz o quê no trabalho de grupo. A formadora está esgotada no fim de um dia longo e sente-se tentada a decidir ela mesma a divisão de tarefas para acabar com o assunto. Qual é a leitura mais completa desta situação?"
          options={[
            {
              text: "O stress está a empurrá-la para um estilo de competir que resolve o episódio mas não a causa, que é sobretudo de processo — o quadrante Processo da Roda",
              correct: true,
              feedback:
                "Correto. Decidir unilateralmente para encerrar o assunto é competir (Bloco 3), e a tentação vem do estado de esgotamento (Bloco 4). O que está em disputa não é o conteúdo do trabalho, mas como as tarefas se distribuem — o quadrante Processo (Bloco 5). Imposta de fora, a regra pode não ser aceite.",
            },
            {
              text: "É um conflito puramente relacional entre os dois formandos e o estilo indicado é acomodar",
              feedback:
                "Nada nos dados indica animosidade pessoal como causa; e acomodar significaria a formadora ceder no que lhe importa, o que não descreve decidir a divisão de tarefas por ela.",
            },
            {
              text: "É uma questão de contexto externo, pelo que a formadora deve evitar intervir",
              feedback:
                "O contexto (prazos, condições) pode agravar, mas o que se repete é a distribuição de tarefas dentro do grupo. Evitar, num conflito recorrente e visível, tende a comunicar que é aceitável.",
            },
          ]}
          takeaway="A pergunta útil não é «que estilo uso?», mas «em que quadrante está o problema, e em que estado estou eu para o tratar?»."
        />

        <Quiz
          id="mf3-sintese-quiz-3"
          question="Uma formadora diz a um formando: «Compreendo que o prazo lhe pareça curto, e vou explicar-lhe porque não o consigo alterar.» Um colega comenta que ela «não foi empática, porque não cedeu». O que responderia?"
          options={[
            {
              text: "O colega tem razão: sem alterar o prazo não houve empatia, apenas cortesia",
              feedback:
                "Confunde empatia com concessão. Se empatia exigisse ceder, seria impossível ser empático em qualquer situação onde não há margem — e o Bloco 2 mostra precisamente o contrário.",
            },
            {
              text: "A empatia consiste em reconhecer e validar a experiência do outro, não em concordar ou ceder — pode coexistir com um limite claro e assertivo",
              correct: true,
              feedback:
                "Correto. Reconhecer a perspetiva do formando (empatia cognitiva) e manter uma decisão explicada é exatamente a combinação de empatia com assertividade trabalhada no MF1 e no Bloco 2. Ceder por não suportar o desconforto seria acomodar, não ser empático.",
            },
            {
              text: "Não foi empatia mas colaboração, porque ela explicou as suas razões",
              feedback:
                "Colaborar implicaria procurar em conjunto uma solução que servisse ambos os interesses. Aqui há reconhecimento da perspetiva e manutenção de um limite — empatia com assertividade.",
            },
          ]}
          takeaway="Empatia não é ceder. É deixar claro que se compreendeu — mesmo quando a resposta continua a ser não."
        />

        <Quiz
          id="mf3-sintese-quiz-4"
          question="Depois de mapear um conflito na Roda, um formador conclui que o quadrante mais carregado é Pessoas: há desconfiança acumulada entre dois formandos desde um episódio anterior. Qual é a implicação mais defensável para a sua intervenção?"
          options={[
            {
              text: "Deve resolver primeiro a questão substantiva em disputa; a relação recompõe-se sozinha depois",
              feedback:
                "Com desconfiança acumulada, um acordo substantivo tende a ser lido através dessa desconfiança e a ser contestado pouco depois. O quadrante Problema não é o que está a sustentar este conflito.",
            },
            {
              text: "Deve aplicar um estilo de competir para impor uma solução rápida e cortar a escalada",
              feedback:
                "Impor pode travar o episódio visível, mas num quadrante relacional é provável que aumente a desconfiança — precisamente o que está na origem do problema.",
            },
            {
              text: "Trabalhar a relação — escuta de cada parte, clarificação de intenções mal interpretadas — antes de negociar o conteúdo, porque um acordo substantivo assenta mal sobre desconfiança não tratada",
              correct: true,
              feedback:
                "Correto. Quando o peso está em Pessoas, o conteúdo é muitas vezes o pretexto e não a causa. Reconstituir a leitura que cada parte faz das intenções do outro — o realismo ingénuo trabalhado no MF2 — cria as condições para que qualquer acordo se mantenha.",
            },
          ]}
          takeaway="O quadrante mais carregado indica por onde começar. Negociar conteúdo sobre desconfiança não tratada costuma dar acordos que não duram."
        />

        <ScorePanel />
        <QuizSummary />
      </section>

      <section className="mt-12">
        <SectionHeading eyebrow="Objetivos do módulo" title="Confirme o percurso" />
        <ul className="space-y-2">
          {MF3_LEARNING_OBJECTIVES.map((objective, i) => (
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
          id="mf3-sintese-compromisso"
          question="Das cinco ferramentas do módulo — autoconsciência, empatia, escolha de estilo, pausa de autorregulação e Roda de Mapeamento —, qual vai usar na próxima situação difícil que enfrentar, e como saberá que a usou?"
          hint="Uma prática observável, que possa avaliar depois da sessão."
        />
        <div className="mt-4">
          <ReflectionPrompt
            id="mf3-sintese-percurso"
            question="Olhando para os três módulos, o que mudou na forma como olha para um conflito em sala desde o início do curso?"
            hint="Pode referir uma ideia que o surpreendeu ou uma prática que já abandonou."
          />
        </div>
      </section>

      <div className="mt-8 space-y-4">
        <ContentCard tone="primary" title="Módulo concluído — o que falta">
          <p>
            As <strong>8 horas assíncronas</strong> do MF3 —{" "}
            <em>Estratégias de Resolução de Conflitos na Formação</em> estão concluídas. Faltam as{" "}
            <strong>2 horas síncronas</strong>, realizadas online fora deste MOOC, para completar as{" "}
            <strong>10 horas totais</strong> do módulo — e, com o MF1 e o MF2, o percurso completo de
            Gestão de Conflitos na Formação.
          </p>
        </ContentCard>

        <ContentCard title="Rever o percurso">
          <div className="flex flex-wrap gap-4">
            <Link
              to="/mf3/atividades"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
            >
              Rever a Aprendizagem Ativa <ArrowRight className="size-4" />
            </Link>
            <Link
              to="/mf3/fontes"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
            >
              Ver as fontes do módulo <ArrowRight className="size-4" />
            </Link>
          </div>
        </ContentCard>
      </div>

      <StopNav stopId="mf3-sintese" />
    </article>
  );
}
