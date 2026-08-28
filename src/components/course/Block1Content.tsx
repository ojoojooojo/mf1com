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

/* ---------- Infográfico: Os elementos do processo de comunicação ---------- */

function ProcessoComunicacaoSvg() {
  const box = (
    x: number,
    y: number,
    w: number,
    h: number,
    label: string,
    fill: string,
    stroke: string,
  ) => (
    <g key={label}>
      <rect x={x} y={y} width={w} height={h} rx={10} fill={fill} stroke={stroke} strokeWidth={1.5} />
      <text
        x={x + w / 2}
        y={y + h / 2 + 4}
        textAnchor="middle"
        fontSize={13}
        fontWeight={600}
        fill="var(--foreground)"
        fontFamily="var(--font-sans)"
      >
        {label}
      </text>
    </g>
  );

  return (
    <svg
      viewBox="0 0 720 380"
      role="img"
      aria-label="Diagrama do processo de comunicação: emissor, código e mensagem, canal, recetor, com ruído no canal, feedback de retorno e contexto a envolver tudo."
      className="w-full max-w-2xl"
    >
      <defs>
        <marker id="b1-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 Z" fill="var(--primary)" />
        </marker>
        <marker id="b1-arrow-accent" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 Z" fill="var(--accent)" />
        </marker>
      </defs>

      {/* Contexto: envolve todo o processo */}
      <rect
        x={10}
        y={34}
        width={700}
        height={312}
        rx={18}
        fill="none"
        stroke="var(--border)"
        strokeWidth={1.5}
        strokeDasharray="7 5"
      />
      <text
        x={30}
        y={26}
        fontSize={12}
        fontWeight={700}
        letterSpacing={2}
        fill="var(--muted-foreground)"
        fontFamily="var(--font-sans)"
      >
        CONTEXTO
      </text>
      <text
        x={30}
        y={336}
        fontSize={11.5}
        fill="var(--muted-foreground)"
        fontFamily="var(--font-sans)"
      >
        A situação específica em que a comunicação ocorre envolve e condiciona todo o processo.
      </text>

      {/* Fluxo principal */}
      {box(40, 120, 130, 56, "Emissor", "var(--primary-soft)", "var(--primary)")}
      {box(220, 108, 150, 80, "", "var(--card)", "var(--primary)")}
      <text x={295} y={138} textAnchor="middle" fontSize={13} fontWeight={600} fill="var(--foreground)" fontFamily="var(--font-sans)">
        Código
      </text>
      <text x={295} y={158} textAnchor="middle" fontSize={13} fontWeight={600} fill="var(--foreground)" fontFamily="var(--font-sans)">
        + Mensagem
      </text>
      {box(420, 120, 110, 56, "Canal", "var(--card)", "var(--primary)")}
      {box(580, 120, 130, 56, "Recetor", "var(--primary-soft)", "var(--primary)")}

      {/* Setas do fluxo */}
      <line x1={170} y1={148} x2={214} y2={148} stroke="var(--primary)" strokeWidth={2} markerEnd="url(#b1-arrow)" />
      <line x1={370} y1={148} x2={414} y2={148} stroke="var(--primary)" strokeWidth={2} markerEnd="url(#b1-arrow)" />
      <line x1={530} y1={148} x2={574} y2={148} stroke="var(--primary)" strokeWidth={2} markerEnd="url(#b1-arrow)" />

      {/* Ruído: interferência no canal */}
      <g>
        <path
          d="M470 96 l-10 16 h12 l-10 18"
          fill="none"
          stroke="var(--accent)"
          strokeWidth={2.5}
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        <rect x={438} y={196} width={74} height={24} rx={12} fill="var(--accent-soft)" stroke="var(--accent)" />
        <text x={475} y={212} textAnchor="middle" fontSize={12} fontWeight={600} fill="var(--accent)" fontFamily="var(--font-sans)">
          Ruído
        </text>
        <line x1={475} y1={176} x2={475} y2={192} stroke="var(--accent)" strokeWidth={1.5} strokeDasharray="3 3" />
      </g>

      {/* Feedback: retorno do recetor ao emissor */}
      <path
        d="M645 190 C 645 270, 105 270, 105 190"
        fill="none"
        stroke="var(--accent)"
        strokeWidth={2}
        strokeDasharray="6 4"
        markerEnd="url(#b1-arrow-accent)"
      />
      <rect x={300} y={252} width={140} height={26} rx={13} fill="var(--accent-soft)" stroke="var(--accent)" />
      <text x={370} y={269} textAnchor="middle" fontSize={12} fontWeight={600} fill="var(--accent)" fontFamily="var(--font-sans)">
        Feedback
      </text>
    </svg>
  );
}

const LEGENDA_PROCESSO = [
  ["Emissor", "Quem envia a mensagem."],
  ["Código", "O sistema linguístico partilhado: palavras, gestos, símbolos."],
  ["Mensagem", "O conteúdo transmitido."],
  ["Canal", "O meio usado: voz, escrita, vídeo, plataforma online."],
  ["Ruído", "Qualquer distorção não intencional que afeta a receção."],
  ["Recetor", "Quem recebe e interpreta a mensagem."],
  ["Feedback", "A resposta do recetor que permite ao emissor perceber se foi compreendido."],
  ["Contexto", "A situação específica em que a comunicação ocorre."],
] as const;

/* ---------- As 6 funções da comunicação (Jakobson) ---------- */

const FUNCOES = [
  {
    nome: "Referencial",
    foco: "Foco no assunto: informação objetiva.",
    exemplo: "«A sessão começa às 9h30.»",
  },
  {
    nome: "Expressiva / Emotiva",
    foco: "Foco em quem fala: exprime sentimentos.",
    exemplo: "«Estou mesmo satisfeito com o vosso progresso!»",
  },
  {
    nome: "Apelativa / Persuasiva",
    foco: "Foco em quem ouve: procura influenciar e mover à ação.",
    exemplo: "«Abram o manual na página 12.»",
  },
  {
    nome: "Fática",
    foco: "Foco no canal: verifica se a comunicação está a funcionar.",
    exemplo: "«Estão a ouvir-me bem?»",
  },
  {
    nome: "Metalinguística",
    foco: "Foco no código: explica o próprio código.",
    exemplo: "«Quando digo “feedback”, quero dizer o comentário que vos dou sobre o trabalho.»",
  },
  {
    nome: "Poética",
    foco: "Foco na forma da mensagem em si.",
    exemplo: "«Comunicar não é falar, é pôr em comum.» — frase de efeito usada de propósito para ficar memorável.",
  },
] as const;

/* ---------- Conteúdo do Bloco 1 ---------- */

export function Block1Content() {
  return (
    <>
      {/* 1. CONTEÚDO */}
      <section className="mt-10">
        <SectionHeading eyebrow="Conteúdo" title="O que é, afinal, comunicar?" />
        <Prose>
          <p>
            <em>Comunicar</em> vem do latim <em>communicare</em>: pôr em comum, associar, entrar
            em relação, estabelecer laços. Comunicar não é apenas «falar» — é construir um
            significado partilhado com outra pessoa.
          </p>
          <p>
            Para um formador, isto é o alicerce de tudo o resto: antes de gerir um conflito, é
            preciso perceber onde e como a comunicação se perdeu.
          </p>
        </Prose>
        <SourceNote>
          Manual UFCD 9205 — <em>Comunicação e Perfis</em> (Sistema Nacional de Qualificações,
          Portugal).
        </SourceNote>

        <Figure
          caption="Os elementos do processo de comunicação."
          source="Knoow.net — Dias, M. (2019), «Modelos de Comunicação»; Manual UFCD 9205."
        >
          <ProcessoComunicacaoSvg />
        </Figure>

        <dl className="grid gap-3 sm:grid-cols-2">
          {LEGENDA_PROCESSO.map(([termo, descricao]) => (
            <div key={termo} className="rounded-xl border border-border bg-card p-4">
              <dt className="font-display text-base">{termo}</dt>
              <dd className="mt-1 text-sm text-muted-foreground">{descricao}</dd>
            </div>
          ))}
        </dl>

        <KeyIdea>
          Comunicar é pôr em comum: um processo com emissor, código, mensagem, canal, recetor,
          feedback — sempre exposto ao ruído e sempre dentro de um contexto.
        </KeyIdea>
      </section>

      {/* 2. EXEMPLO / CENÁRIO */}
      <section className="mt-12">
        <SectionHeading
          eyebrow="Exemplo"
          title="Como isto aparece na sala de formação"
          lead="Um episódio ilustrativo (fictício) para ancorar o conceito numa situação reconhecível."
        />
        <Scenario
          title="No início da sessão"
          context="Cenário ilustrativo, não real. Uma sala de formação, minutos iniciais de uma sessão."
          lines={[
            {
              speaker: "Formador",
              text: "«Antes de continuarmos, conseguem ouvir-me bem lá atrás?»",
            },
            {
              speaker: "Formando (fundo da sala)",
              text: "Acena que sim.",
              side: "right",
            },
            {
              speaker: "Formador",
              text: "«Ótimo. Então, o feedback do exercício de ontem foi muito positivo — hoje vamos aprofundar.»",
            },
          ]}
          note="Repare na primeira frase do formador: antes de transmitir conteúdo, ele verifica se o canal está aberto. É um gesto pequeno, mas decisivo."
        />

        <Quiz
          id="bloco-1-quiz-fatica"
          question="Qual destas frases do formador é sobretudo função fática — verificar se o canal está a funcionar?"
          options={[
            {
              text: "«Antes de continuarmos, conseguem ouvir-me bem lá atrás?»",
              correct: true,
              feedback:
                "Exatamente: esta frase testa o canal. O formador não está a transmitir conteúdo nem a pedir uma tarefa — está a confirmar que a comunicação física e relacional está aberta antes de avançar. É a função fática em ação.",
            },
            {
              text: "«O feedback do exercício de ontem foi muito positivo.»",
              feedback:
                "Esta frase transmite informação e revela avaliação — aproxima-se das funções referencial e expressiva. Repare que o enunciado pede a frase que testa o canal: procure a pergunta cuja única finalidade é confirmar que a mensagem chega.",
            },
            {
              text: "«Hoje vamos aprofundar.»",
              feedback:
                "Aqui o formador anuncia o que vem a seguir — informação sobre o assunto (função referencial), com um empurrão para a ação (apelativa). Não está, porém, a verificar o canal: essa verificação aconteceu antes, na primeira frase.",
            },
          ]}
          takeaway="A função fática aparece sempre que alguém confirma que o canal está aberto: «estão a ouvir?», «vêem bem o ecrã?», «conseguem acompanhar?»."
        />
      </section>

      {/* 3. APROFUNDAMENTO */}
      <section className="mt-12">
        <SectionHeading
          eyebrow="Conteúdo"
          title="As 6 funções da comunicação"
          lead="O modelo de Roman Jakobson: cada frase que dizemos privilegia um elemento do processo — e cumpre uma função diferente."
        />
        <div className="grid gap-4 sm:grid-cols-2">
          {FUNCOES.map((f) => (
            <ContentCard key={f.nome} title={f.nome}>
              <p>{f.foco}</p>
              <p className="mt-2 text-sm italic text-muted-foreground">{f.exemplo}</p>
            </ContentCard>
          ))}
        </div>
        <Prose>
          <p className="mt-4 text-sm text-muted-foreground">
            Nota: raramente surgem isoladas — a maioria das frases combina várias funções ao mesmo
            tempo.
          </p>
        </Prose>
        <SourceNote>
          Knoow.net — Dias, M. (2019), «Modelos de Comunicação» (a partir do modelo de Roman
          Jakobson).
        </SourceNote>

        <div className="mt-6">
          <LessonAccordion
            items={[
              {
                title: "Porque é que isto importa na gestão de conflitos?",
                content: (
                  <p>
                    Muitos conflitos em formação nascem de uma função mal compreendida: um formador
                    que usa a função apelativa de forma repetida e seca («Façam isto. Façam
                    aquilo.») sem nunca usar a expressiva pode ser lido como frio ou autoritário,
                    mesmo sem essa intenção. Saber identificar que função está a dominar a sua
                    própria comunicação — e a dos formandos — é o primeiro passo para ajustar o tom
                    antes que se instale a tensão.
                  </p>
                ),
              },
            ]}
          />
        </div>
      </section>

      {/* 4. INTERAÇÃO */}
      <section className="mt-12">
        <SectionHeading
          eyebrow="Interação"
          title="Associe cada frase à função predominante"
          lead="Quatro frases de sala de formação. Em cada opção errada explicamos porque não é essa função; em cada opção certa, reforçamos o critério de identificação."
        />
        <Quiz
          id="bloco-1-quiz-assoc-1"
          question="1. «Passem os trabalhos para a frente, por favor.»"
          options={[
            {
              text: "Apelativa",
              correct: true,
              feedback:
                "Correto: a frase pede uma ação concreta aos formandos. O foco está em quem ouve e no comportamento que se espera dele — é o critério da função apelativa.",
            },
            {
              text: "Referencial",
              feedback:
                "A função referencial informa sobre o assunto («a sessão termina às 13h»). Aqui não se está a informar: está a pedir-se que os formandos façam algo. Quando a frase mobiliza para uma ação, a função predominante é apelativa.",
            },
            {
              text: "Fática",
              feedback:
                "A função fática verifica o canal («estão a ouvir-me?»). Esta frase assume que o canal funciona e usa-o para dar uma instrução — logo, não é fática.",
            },
            {
              text: "Metalinguística",
              feedback:
                "A função metalinguística explica o próprio código («por 'trabalho' quero dizer…»). Nada aqui clarifica palavras ou termos — a frase pede uma ação, não explica linguagem.",
            },
          ]}
        />
        <Quiz
          id="bloco-1-quiz-assoc-2"
          question="2. «Estás a perceber o que estou a dizer?»"
          options={[
            {
              text: "Apelativa",
              feedback:
                "A função apelativa procura mover alguém à ação («abram o manual»). Esta frase não pede nenhuma tarefa: pergunta se a mensagem está a chegar. O foco está no canal, não na ação.",
            },
            {
              text: "Fática",
              correct: true,
              feedback:
                "Correto: a pergunta verifica se a comunicação está a funcionar — se o canal está aberto e a mensagem a ser recebida. É o uso típico da função fática.",
            },
            {
              text: "Expressiva",
              feedback:
                "A função expressiva revela sentimentos de quem fala («estou preocupado convosco»). Aqui não há emoção declarada: há uma verificação do estado da comunicação, que é território da função fática.",
            },
            {
              text: "Metalinguística",
              feedback:
                "A metalinguística explicaria o significado das palavras usadas. «Estás a perceber?» verifica a receção, mas não define nem clarifica o código — por isso é fática, não metalinguística.",
            },
          ]}
        />
        <Quiz
          id="bloco-1-quiz-assoc-3"
          question="3. «Estou super entusiasmado com este tema!»"
          options={[
            {
              text: "Expressiva",
              correct: true,
              feedback:
                "Correto: a frase revela o estado emocional de quem fala. O foco está no emissor e no que ele sente — o critério da função expressiva/emotiva.",
            },
            {
              text: "Referencial",
              feedback:
                "A referencial daria informação objetiva sobre o tema («este tema tem três partes»). «Super entusiasmado» não é informação sobre o tema: é a emoção do emissor, o que a torna expressiva.",
            },
            {
              text: "Apelativa",
              feedback:
                "A apelativa procura influenciar quem ouve a agir. O entusiasmo pode contagiar, mas a frase não pede nem sugere nenhuma ação — limita-se a exprimir o que o emissor sente.",
            },
            {
              text: "Poética",
              feedback:
                "A poética cuida a forma da mensagem (uma metáfora, uma frase de efeito). Esta é uma declaração direta de emoção, sem trabalho formal sobre a mensagem — logo, expressiva.",
            },
          ]}
        />
        <Quiz
          id="bloco-1-quiz-assoc-4"
          question="4. «Por “escuta ativa” quero dizer ouvir com atenção plena, não só esperar a nossa vez de falar.»"
          options={[
            {
              text: "Metalinguística",
              correct: true,
              feedback:
                "Correto: a frase define um termo do próprio discurso — explica o código («escuta ativa» significa…). Sempre que a linguagem fala sobre a própria linguagem, estamos na função metalinguística.",
            },
            {
              text: "Referencial",
              feedback:
                "Parece informativa, mas o objeto da informação é uma palavra do próprio discurso, não a realidade externa. Informar sobre o assunto é referencial; explicar o significado de um termo é metalinguístico.",
            },
            {
              text: "Fática",
              feedback:
                "A fática verificaria o canal («estão a perceber esta definição?»). Aqui não há verificação nenhuma: há uma explicação do significado de um termo, o que é metalinguístico.",
            },
            {
              text: "Expressiva",
              feedback:
                "A expressiva centrava-se no que o emissor sente. Esta frase não revela emoções: esclarece o que uma expressão significa. O foco no código torna-a metalinguística.",
            },
          ]}
          takeaway="Critério rápido: ação pedida → apelativa; verificar o canal → fática; emoção revelada → expressiva; explicar um termo → metalinguística."
        />
      </section>

      {/* 5. APLICAÇÃO */}
      <section className="mt-12">
        <SectionHeading
          eyebrow="Aplicação"
          title="Transportar para a sua prática"
          lead="Sem resposta certa: o valor está no registo pessoal e na consciência que gera."
        />
        <ReflectionPrompt
          id="bloco-1-reflexao-1"
          question="Pense nas suas últimas sessões de formação: que função da comunicação domina mais a sua própria fala — e que função costuma ficar de fora?"
          hint="Use os exemplos dos cartões como espelho. Identifique uma situação concreta em que esse desequilíbrio teve efeitos no grupo."
        />
      </section>

      <SourceNote>
        Manual UFCD 9205 — <em>Comunicação e Perfis</em> (Sistema Nacional de Qualificações,
        Portugal); Knoow.net — Dias, M. (2019), «Modelos de Comunicação».
      </SourceNote>
    </>
  );
}
