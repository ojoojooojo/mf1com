import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { BLOCKS, LEARNING_OBJECTIVES } from "@/lib/course-data";
import { ContentCard, Quiz, ReflectionPrompt, SectionHeading } from "@/components/course/LessonKit";
import { StopNav, useVisit } from "@/components/course/StopNav";
import { useProgress } from "@/lib/progress";

export const Route = createFileRoute("/sintese")({
  head: () => ({
    meta: [
      { title: "Síntese Final e autoavaliação | MF1 Comunicação e Escuta Ativa" },
      {
        name: "description",
        content:
          "Recapitulação dos cinco conteúdos do módulo, autoavaliação formativa de aplicação e encerramento das 8 horas assíncronas do MF1.",
      },
      { property: "og:title", content: "Síntese Final — MF1" },
      {
        property: "og:description",
        content:
          "Recapitulação visual, autoavaliação formativa de aplicação e encerramento do módulo MF1.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: SynthesisPage,
});

const RECAP: Record<string, string> = {
  "1": "Comunicar é pôr em comum. Toda a mensagem tem elementos (emissor, código, canal, recetor, ruído, feedback) e cumpre uma ou várias funções — saber identificá-las ajuda a perceber o que realmente está a acontecer numa troca.",
  "2": "Cada pessoa filtra o que ouve através da sua perceção, emoções, valores e papel social. A mesma frase pode ser ouvida de formas muito diferentes.",
  "3": "Assertividade é afirmar-se com clareza e respeito — nem passividade, nem agressão. Técnicas como o D.E.E. ajudam a estruturar isso na prática.",
  "4": "As barreiras podem vir do canal, da linguagem, da mente ou da organização. Identificar o tipo de barreira é o primeiro passo para a remover.",
  "5": "Escutar ativamente é focar-se no significado total da mensagem — conteúdo e sentimento — e devolver essa compreensão até a pessoa se sentir genuinamente ouvida.",
};

const FINAL_QUIZ_IDS = ["final-1", "final-2", "final-3", "final-4", "final-5"];
const FINAL_CORRECT: Record<string, number> = {
  "final-1": 1,
  "final-2": 0,
  "final-3": 1,
  "final-4": 2,
  "final-5": 1,
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
        Este número não é uma nota e não fica registado em lado nenhum além deste navegador. O valor
        do módulo mede-se no que muda na sua próxima sessão: como formula uma frase difícil, como
        repara num sinal não-verbal, como devolve compreensão antes de responder.
      </p>
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
          Fechar o percurso implica arrumar o que aprendeu: revisitar os cinco conteúdos numa frase
          cada, testar a aplicação em situações novas e decidir o que leva para a sua prática.
        </p>
      </header>

      <section className="mt-10">
        <SectionHeading
          eyebrow="Recapitulação"
          title="Os cinco conteúdos, em síntese"
          lead="Uma ideia central por conteúdo — para reler antes da sessão síncrona."
        />
        <ul className="grid gap-3 sm:grid-cols-2">
          {BLOCKS.map((block) => (
            <li key={block.id} className="rounded-xl border border-border bg-card p-5">
              <p className="eyebrow">Bloco {block.number}</p>
              <h3 className="mt-1 font-display text-lg">{block.title}</h3>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-muted-foreground">
                {RECAP[block.id]}
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
      </section>

      <section className="mt-12">
        <SectionHeading
          eyebrow="Autoavaliação formativa"
          title="Cinco situações novas"
          lead="Uma pergunta por conteúdo, em situações que ainda não viu no curso. Cada resposta tem explicação — é aí que está a aprendizagem, não no número de acertos."
        />

        <Quiz
          id="final-1"
          question="1. Um formador diz «Vamos fazer uma pausa de 10 minutos.» Qual é a função predominante desta mensagem?"
          options={[
            {
              text: "Expressiva (emotiva)",
              feedback:
                "A função expressiva centra-se no estado interior do emissor («estou exausto», «isto irrita-me»). Aqui não há partilha de sentimento: há uma instrução dirigida ao grupo.",
            },
            {
              text: "Apelativa (conativa)",
              correct: true,
              feedback:
                "Correto. A função apelativa está orientada para o recetor: pede uma ação ou uma mudança de comportamento. «Vamos fazer uma pausa» organiza o comportamento do grupo — é isso que a mensagem faz, mesmo sendo uma frase curta e banal.",
            },
            {
              text: "Metalinguística",
              feedback:
                "A função metalinguística usa a linguagem para falar da própria linguagem («quando digo conflito latente, refiro-me a…»). Não é o caso: a frase pede uma ação.",
            },
          ]}
          takeaway="Reparar na função predominante ajuda a perceber o que a mensagem está a tentar fazer — e por que razão às vezes não faz."
        />

        <Quiz
          id="final-2"
          question="2. Um formando comenta «Já dei este exercício, destaque nenhum, é sempre igual» depois de ter ouvido apenas a primeira frase da instrução. Que filtro psicológico está mais provavelmente em jogo?"
          options={[
            {
              text: "Perceção seletiva",
              correct: true,
              feedback:
                "Correto. A pessoa retém o fragmento que confirma o que já esperava («é sempre igual») e deixa de processar o resto da instrução. A informação nova nem chega a ser ouvida: o filtro fecha-se antes disso.",
            },
            {
              text: "Papel social",
              feedback:
                "O papel social influencia o que a pessoa se sente autorizada a dizer e como interpreta quem fala. Pode estar presente em segundo plano, mas o que explica o comentário é ter parado de ouvir após a primeira frase.",
            },
            {
              text: "Valores",
              feedback:
                "Os valores enquadram o que a pessoa considera aceitável ou importante. Aqui o mecanismo é anterior a isso: houve uma seleção precoce da informação com base numa expectativa prévia.",
            },
          ]}
          takeaway="Quando o filtro se fecha cedo, repetir a instrução no mesmo formato raramente resolve — é preciso reabrir a atenção, por exemplo com uma pergunta dirigida."
        />

        <Quiz
          id="final-3"
          question="3. Qual destas frases é assertiva?"
          options={[
            {
              text: "«Como sempre, ninguém prestou atenção.»",
              feedback:
                "É agressiva-generalizante: rotula o grupo («como sempre», «ninguém»), atribui intenção e não abre caminho nenhum. O grupo defende-se em vez de responder.",
            },
            {
              text: "«Reparei que houve pouca participação hoje — o que acham que ajudaria?»",
              correct: true,
              feedback:
                "Correto. Cumpre os critérios: fala em primeira pessoa («reparei»), descreve um comportamento observável sem rotular pessoas («houve pouca participação hoje», não «vocês são desinteressados») e propõe um caminho concreto ao devolver a palavra ao grupo.",
            },
            {
              text: "«Desculpem, se calhar a sessão não estava interessante.»",
              feedback:
                "É passiva: começa por pedir desculpa, assume toda a responsabilidade e desvaloriza-se, sem descrever o que aconteceu nem propor nada. O problema fica sem tratamento.",
            },
          ]}
          takeaway="Os três critérios práticos: primeira pessoa, comportamento observável em vez de rótulo, e uma proposta concreta."
        />

        <Quiz
          id="final-4"
          question="4. Um manual de formação cheio de siglas técnicas sem explicação é sobretudo que tipo de barreira?"
          options={[
            {
              text: "Física / mecânica",
              feedback:
                "As barreiras físicas afetam o canal: ruído, má ligação, sala inadequada, documento ilegível. Aqui o canal funciona — o manual chega e lê-se; o problema está no código usado.",
            },
            {
              text: "Psicológica",
              feedback:
                "Pode gerar um efeito psicológico (frustração, receio de perguntar), mas a causa não está na mente de quem lê: está na linguagem escolhida por quem escreveu.",
            },
            {
              text: "Semântica",
              correct: true,
              feedback:
                "Correto. É uma barreira semântica: o código não é partilhado. As siglas têm significado para o emissor e nenhum para o recetor, pelo que a mensagem chega sem se tornar compreensão. A remoção é direta — glossário, explicitação na primeira ocorrência, exemplos.",
            },
          ]}
          takeaway="Identificar o tipo de barreira aponta logo o tipo de solução: canal, código, mente ou organização."
        />

        <Quiz
          id="final-5"
          question="5. «Estás a dizer que sentiste que não foste ouvido na última reunião — é isso?» é um exemplo de quê?"
          options={[
            {
              text: "Dar um conselho apoiado na experiência própria",
              feedback:
                "Não há conselho nenhum na frase, nem referência à experiência de quem fala. Aliás, é justamente o contrário: quem escuta suspende a sua resposta para confirmar o que percebeu.",
            },
            {
              text: "Parafrasear — refletir e confirmar a compreensão",
              correct: true,
              feedback:
                "Correto. É uma paráfrase que devolve conteúdo («não foste ouvido na última reunião») e sentimento («sentiste»), terminando com um pedido de confirmação («é isso?»). Assim o outro pode corrigir, e sente que foi acompanhado — o objetivo central da escuta ativa.",
            },
            {
              text: "Fazer uma pergunta fechada de verificação factual",
              feedback:
                "Formalmente termina em pergunta, mas não procura um facto: procura validar a interpretação do significado total da mensagem. É a diferença entre verificar dados e verificar compreensão.",
            },
          ]}
          takeaway="A paráfrase é a forma mais simples de tornar a escuta visível — e a mais fácil de treinar."
        />

        <ScorePanel />
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

      <div className="mt-8 space-y-4">
        <ContentCard tone="primary" title="Módulo concluído — o que falta">
          <p>
            As <strong>8 horas assíncronas</strong> do MF1 —{" "}
            <em>Comunicação e Escuta Ativa na Formação</em> estão concluídas. Faltam as{" "}
            <strong>2 horas síncronas</strong>, realizadas em sessão presencial ou online fora deste
            MOOC, para completar as <strong>10 horas totais</strong> do módulo.
          </p>
        </ContentCard>

        <ContentCard title="A seguir: MF2 (fora do âmbito deste MOOC)">
          <p>
            «O próximo módulo, MF2 — Dinâmicas e Causas do Conflito na Formação, parte precisamente
            daqui: como as questões de comunicação que agora reconhece se transformam (ou não) em
            conflitos, e como reconhecer os seus sinais precoces.»
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            O MF2 não faz parte deste MOOC e será disponibilizado separadamente.
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
