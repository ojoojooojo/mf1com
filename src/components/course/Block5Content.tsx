import {
  ContentCard,
  Figure,
  KeyIdea,
  LessonAccordion,
  Prose,
  Quiz,
  ReflectionPrompt,
  Scenario,
  SectionHeading,
  SourceNote,
} from "@/components/course/LessonKit";

/* ---------- Infográfico: ciclo da escuta ativa ---------- */

const PASSOS = [
  {
    numero: 1,
    titulo: "Atenção plena",
    texto: "Focar-se inteiramente no que a pessoa diz, sem planear já a resposta.",
  },
  {
    numero: 2,
    titulo: "Escutar o «significado total»",
    texto:
      "Captar não só o conteúdo, mas o sentimento por trás das palavras.",
  },
  {
    numero: 3,
    titulo: "Responder ao sentimento",
    texto: "Quando o sentimento é a parte mais importante da mensagem, é a ele que se responde.",
  },
  {
    numero: 4,
    titulo: "Refletir a compreensão",
    texto:
      "Parafrasear por palavras próprias até a pessoa confirmar que se sentiu compreendida.",
  },
] as const;

function CicloEscutaSvg() {
  const cx = 350;
  const cy = 190;
  const r = 118;
  const pos = [
    { x: cx, y: cy - r },
    { x: cx + r, y: cy },
    { x: cx, y: cy + r },
    { x: cx - r, y: cy },
  ];
  return (
    <svg
      viewBox="0 0 700 380"
      role="img"
      aria-label="Ciclo da escuta ativa em quatro passos que se repetem: atenção plena, escutar o significado total, responder ao sentimento e refletir a compreensão."
      className="w-full"
    >
      <defs>
        <marker id="b5-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0 0 L10 5 L0 10 z" fill="var(--accent)" />
        </marker>
      </defs>

      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        stroke="var(--accent)"
        strokeWidth={2}
        strokeDasharray="8 6"
      />
      {[0, 90, 180, 270].map((a) => (
        <g key={a} transform={`rotate(${a} ${cx} ${cy})`}>
          <line
            x1={cx + r}
            y1={cy - 6}
            x2={cx + r}
            y2={cy + 6}
            stroke="var(--accent)"
            strokeWidth={2}
            markerEnd="url(#b5-arrow)"
          />
        </g>
      ))}

      <text x={cx} y={cy - 6} textAnchor="middle" fontSize={13} fontWeight={700} fill="var(--primary)" fontFamily="var(--font-sans)">
        ESCUTA ATIVA
      </text>
      <text x={cx} y={cy + 14} textAnchor="middle" fontSize={11} fill="var(--muted-foreground)" fontFamily="var(--font-sans)">
        um ciclo, não uma sequência
      </text>

      {PASSOS.map((p, i) => (
        <g key={p.numero}>
          <circle
            cx={pos[i]!.x}
            cy={pos[i]!.y}
            r={40}
            fill="var(--primary-soft)"
            stroke="var(--primary)"
            strokeWidth={1.5}
          />
          <text
            x={pos[i]!.x}
            y={pos[i]!.y + 6}
            textAnchor="middle"
            fontSize={18}
            fontWeight={700}
            fill="var(--primary)"
            fontFamily="var(--font-sans)"
          >
            {p.numero}
          </text>
          <text
            x={pos[i]!.x}
            y={i === 2 ? pos[i]!.y + 60 : i === 0 ? pos[i]!.y - 52 : pos[i]!.y + 60}
            textAnchor="middle"
            fontSize={12}
            fontWeight={600}
            fill="var(--foreground)"
            fontFamily="var(--font-sans)"
          >
            {p.titulo}
          </text>
        </g>
      ))}
    </svg>
  );
}

const ATITUDES = [
  { titulo: "Respeito genuíno", texto: "Respeito genuíno pelo potencial e valor da outra pessoa." },
  {
    titulo: "Aceitação da autodireção",
    texto:
      "Aceitação da sua capacidade de autodireção — confiar que a pessoa pode encontrar o seu próprio caminho.",
  },
  {
    titulo: "Interesse sincero",
    texto:
      "A falta dele torna-se visível ao outro, por mais que se tente disfarçar.",
  },
] as const;

export function Block5Content() {
  return (
    <>
      {/* 1. CONTEÚDO */}
      <section className="mt-10">
        <SectionHeading eyebrow="Conteúdo" title="Escutar não é ouvir" />
        <Prose>
          <p>
            Escutar ativamente é diferente de ouvir passivamente. Carl Rogers e Richard Farson, no
            texto clássico <em>«Active Listening»</em> (1957), descrevem-na como uma forma de ajudar
            a trazer mudança nas pessoas através da forma como as escutamos — não é uma técnica
            aplicável de ânimo indiferente: «não podemos empregá-la como técnica se as nossas
            atitudes fundamentais entram em conflito com os seus conceitos básicos».
          </p>
        </Prose>
        <SourceNote>
          Rogers, C.R. &amp; Farson, R.E. (1957). <em>Active Listening</em>. University of Chicago —
          Industrial Relations Center.
        </SourceNote>

        <SectionHeading
          className="mt-12"
          eyebrow="Conteúdo"
          title="Três atitudes fundamentais"
          lead="Sem estas atitudes, os passos da escuta ativa tornam-se um procedimento vazio — e o outro nota."
        />
        <div className="grid gap-4 lg:grid-cols-3">
          {ATITUDES.map((a) => (
            <ContentCard key={a.titulo} title={a.titulo}>
              <p>{a.texto}</p>
            </ContentCard>
          ))}
        </div>
        <SourceNote>Rogers &amp; Farson (1957).</SourceNote>

        <Figure
          caption="O ciclo da escuta ativa em quatro passos."
          source="Rogers & Farson (1957)."
        >
          <CicloEscutaSvg />
        </Figure>

        <ol className="grid gap-3 sm:grid-cols-2">
          {PASSOS.map((p) => (
            <li key={p.numero} className="rounded-xl border border-border bg-card p-4">
              <p className="font-display text-base">
                <span className="mr-2 text-primary">{p.numero}.</span>
                {p.titulo}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{p.texto}</p>
            </li>
          ))}
        </ol>

        <div className="mt-4">
          <ContentCard tone="accent" title="O «significado total», num exemplo">
            <p>
              «Terminei a montagem» <span className="text-muted-foreground">vs.</span> «Finalmente
              terminei aquela maldita montagem» — a mesma informação, sentimentos muito diferentes.
            </p>
            <p className="mt-2">
              E sobre o quarto passo:{" "}
              <em>
                «nunca assumir que compreendemos verdadeiramente até conseguirmos comunicar essa
                compreensão à satisfação da outra pessoa.»
              </em>
            </p>
            <p className="mt-3 text-xs text-muted-foreground">
              <span className="font-semibold">Fonte:</span> Rogers &amp; Farson (1957).
            </p>
          </ContentCard>
        </div>

        <KeyIdea>
          A compreensão não se mede por dentro: só está confirmada quando a outra pessoa reconhece
          que foi compreendida.
        </KeyIdea>
      </section>

      {/* 2. EXEMPLO / CENÁRIO */}
      <section className="mt-12">
        <SectionHeading
          eyebrow="Exemplo"
          title="Duas respostas ao mesmo desabafo"
          lead="Diálogo ilustrativo (fictício). Repare no que cada resposta faz com o sentimento que foi trazido."
        />
        <Scenario
          title="«Isto não faz sentido nenhum»"
          context="Cenário fictício, criado para fins pedagógicos. Um formando desabafa a meio de um exercício."
          lines={[
            {
              speaker: "Formando",
              text: "«Este exercício não faz sentido nenhum, é só para complicar.»",
            },
            {
              speaker: "Resposta A do formador",
              text: "«Não é bem assim, se seguir os passos vai ver que faz sentido.»",
              side: "right",
            },
            {
              speaker: "Resposta B do formador",
              text: "«Parece que isto está a soar mais confuso do que útil neste momento — o que é que está a custar mais?»",
              side: "right",
            },
          ]}
          note="Antes de responder ao quiz, releia as duas respostas à luz dos quatro passos do ciclo."
        />

        <Quiz
          id="bloco-5-quiz-cenario"
          question="Qual das duas respostas usa escuta ativa — e porquê?"
          options={[
            {
              text: "Resposta A — «Não é bem assim, se seguir os passos vai ver que faz sentido.»",
              feedback:
                "É defensiva e justificativa: ignora o sentimento e vai direta à correção. Salta os passos 2 e 3 do ciclo (o significado total e a resposta ao sentimento) e fecha a conversa em vez de a abrir — o formando fica sem espaço para dizer o que realmente o está a bloquear.",
            },
            {
              text: "Resposta B — «Parece que isto está a soar mais confuso do que útil neste momento — o que é que está a custar mais?»",
              correct: true,
              feedback:
                "Escuta ativa, e reconhece-se por três critérios: reflete o sentimento («está a soar mais confuso do que útil») antes de explicar qualquer coisa; não julga a reação do formando; e convida-o a continuar com uma pergunta aberta. Cobre os passos 2, 3 e 4 do ciclo — e só depois disto é que uma explicação técnica tem alguma chance de ser ouvida.",
            },
            {
              text: "Ambas, porque as duas respondem ao formando.",
              feedback:
                "Responder não é escutar. A resposta A devolve conteúdo ao formando, mas não devolve compreensão: ele não fica a saber que o seu desconforto foi reconhecido. É precisamente essa devolução que caracteriza a escuta ativa.",
            },
          ]}
          takeaway="Regra prática: quando o sentimento é a parte mais forte da mensagem, responda ao sentimento primeiro. A explicação técnica pode esperar 20 segundos."
        />
      </section>

      {/* 3. INTERAÇÃO */}
      <section className="mt-12">
        <SectionHeading
          eyebrow="Interação"
          title="Parafrasear, refletir sentimento — ou nenhum dos dois?"
          lead="Classifique cada resposta do formador. Cada opção explica o critério em jogo."
        />

        <Quiz
          id="bloco-5-quiz-class-1"
          question="«Então, se bem entendi, a dificuldade está em perceber por onde começar o exercício?»"
          options={[
            {
              text: "Parafrasear",
              correct: true,
              feedback:
                "Certo: o formador devolve o conteúdo por palavras próprias e submete-o a confirmação («se bem entendi»). É o passo 4 do ciclo — a compreensão comunicada e verificada.",
            },
            {
              text: "Refletir sentimento",
              feedback:
                "Não nomeia emoção alguma: fica no plano do conteúdo. Refletir sentimento seria algo como «parece que isto está a deixá-lo frustrado».",
            },
            {
              text: "Nem uma coisa nem outra",
              feedback:
                "É, sim, uma das duas: há reformulação do conteúdo com pedido de confirmação — a definição de paráfrase.",
            },
          ]}
          takeaway="A paráfrase trabalha o conteúdo; termina sempre implicitamente numa pergunta: «é isto?»."
        />

        <Quiz
          id="bloco-5-quiz-class-2"
          question="«Percebo que isto o esteja a deixar irritado depois de tanto tempo a tentar.»"
          options={[
            {
              text: "Refletir sentimento",
              correct: true,
              feedback:
                "Certo: nomeia a emoção e o seu contexto, sem a avaliar. É o passo 3 do ciclo — responder ao sentimento quando ele é a parte mais importante da mensagem.",
            },
            {
              text: "Parafrasear",
              feedback:
                "Não reformula o conteúdo do que foi dito: vai ao sentimento por trás das palavras. É a outra metade do «significado total».",
            },
            {
              text: "Nem uma coisa nem outra",
              feedback:
                "Trata-se de reflexão de sentimento — precisamente a competência que Rogers e Farson colocam no centro da escuta ativa.",
            },
          ]}
          takeaway="Refletir sentimento não é concordar com a emoção nem validá-la como juízo: é reconhecer que ela está ali."
        />

        <Quiz
          id="bloco-5-quiz-class-3"
          question="«Já leu o enunciado até ao fim?»"
          options={[
            {
              text: "Nem uma coisa nem outra",
              correct: true,
              feedback:
                "Certo: é uma pergunta fechada de sim/não. Não devolve conteúdo nem sentimento e, pior, sugere que a dificuldade se explica por desatenção — o que tende a fechar a conversa em vez de a abrir.",
            },
            {
              text: "Parafrasear",
              feedback:
                "Não há reformulação do que o formando disse. Uma pergunta de verificação não é uma paráfrase.",
            },
            {
              text: "Refletir sentimento",
              feedback:
                "Nenhuma emoção é nomeada nem reconhecida. A pergunta desloca-se para o procedimento, deixando o sentimento sem resposta.",
            },
          ]}
          takeaway="Perguntas fechadas têm o seu lugar — mas não no momento em que alguém acabou de trazer frustração."
        />

        <Quiz
          id="bloco-5-quiz-class-4"
          question="«O que devia fazer era começar pela última alínea, é muito mais simples.»"
          options={[
            {
              text: "Nem uma coisa nem outra",
              correct: true,
              feedback:
                "Certo: é um conselho não pedido. Pode até ser tecnicamente acertado, mas salta os passos 2, 3 e 4 do ciclo — e comunica implicitamente que o que a pessoa sentia não era o mais importante da mensagem.",
            },
            {
              text: "Parafrasear",
              feedback:
                "Não devolve nada do que foi dito: acrescenta uma solução do próprio formador.",
            },
            {
              text: "Refletir sentimento",
              feedback:
                "Nenhum sentimento é reconhecido. O conselho passa por cima dele — é o reflexo mais comum, e o mais difícil de suspender.",
            },
          ]}
          takeaway="Aconselhar cedo é a forma mais frequente de interromper a escuta sem interromper a pessoa."
        />

        <div className="mt-6">
          <LessonAccordion
            items={[
              {
                title: "Resultado observável de se sentir ouvido",
                content: (
                  <div className="space-y-3">
                    <p>
                      Pessoas que se sentem verdadeiramente ouvidas tendem a tornar-se «mais abertas
                      à experiência, menos defensivas, mais democráticas».
                    </p>
                    <p className="text-muted-foreground">
                      É por isto que a escuta ativa é uma ferramenta de gestão de conflitos e não
                      apenas de cortesia: reduz a defensividade que alimenta o conflito.
                    </p>
                    <p className="text-xs text-muted-foreground">
                      <span className="font-semibold">Fonte:</span> Rogers &amp; Farson (1957).
                    </p>
                  </div>
                ),
              },
            ]}
          />
        </div>
      </section>

      {/* 4. APLICAÇÃO */}
      <section className="mt-12">
        <SectionHeading
          eyebrow="Aplicação"
          title="Transportar para a sua prática"
          lead="Sem resposta certa: o valor está no registo pessoal e na consciência que gera."
        />
        <ReflectionPrompt
          id="bloco-5-reflexao-aplicacao"
          question="Recorde a última vez que um formando lhe trouxe uma frustração. O que respondeu — e como responderia agora, refletindo o sentimento antes de explicar?"
          hint="Escreva a sua resposta original e a versão reformulada."
        />
        <ContentCard tone="primary" title="Antes de avançar">
          <p>
            Concluiu os cinco conteúdos do módulo. Segue-se a Aprendizagem Ativa: cinco atividades
            substanciais que põem em prática o que trabalhou nos Blocos 1 a 5.
          </p>
        </ContentCard>
        <SourceNote>
          Rogers, C.R. &amp; Farson, R.E. (1957). <em>Active Listening</em>. University of Chicago —
          Industrial Relations Center.
        </SourceNote>
      </section>
    </>
  );
}
