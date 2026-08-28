import {
  ContentCard,
  Figure,
  KeyIdea,
  LessonAccordion,
  Prose,
  Quiz,
  ReflectionPrompt,
  SectionHeading,
  SourceNote,
} from "@/components/course/LessonKit";

/* ---------- Infográfico: continuum passivo / assertivo / agressivo ---------- */

type Coluna = {
  titulo: string;
  x: number;
  destaque?: boolean;
  voz: string;
  postura: string;
  olhar: string;
};

const COLUNAS: Coluna[] = [
  {
    titulo: "PASSIVO",
    x: 20,
    voz: "Voz baixa",
    postura: "Postura recuada",
    olhar: "Olhar em fuga",
  },
  {
    titulo: "ASSERTIVO",
    x: 250,
    destaque: true,
    voz: "Voz firme e calma",
    postura: "Postura aberta",
    olhar: "Olhar sustentado",
  },
  {
    titulo: "AGRESSIVO",
    x: 480,
    voz: "Voz alta, «por cima»",
    postura: "Postura invasiva",
    olhar: "Olhar fixo, desafiante",
  },
];

function ContinuumSvg() {
  return (
    <svg
      viewBox="0 0 700 330"
      role="img"
      aria-label="Continuum da comunicação: coluna passiva à esquerda (voz baixa, postura recuada, olhar em fuga), coluna assertiva ao centro em destaque (voz firme e calma, postura aberta, olhar sustentado) e coluna agressiva à direita (voz alta, postura invasiva, olhar fixo)."
      className="w-full"
    >
      {/* eixo */}
      <line x1={30} y1={296} x2={670} y2={296} stroke="var(--border)" strokeWidth={2} />
      <text x={30} y={318} fontSize={11} fill="var(--muted-foreground)" fontFamily="var(--font-sans)">
        autoanulação
      </text>
      <text x={670} y={318} textAnchor="end" fontSize={11} fill="var(--muted-foreground)" fontFamily="var(--font-sans)">
        violação dos direitos do outro
      </text>

      {COLUNAS.map((c) => (
        <g key={c.titulo}>
          <rect
            x={c.x}
            y={c.destaque ? 12 : 34}
            width={200}
            height={c.destaque ? 258 : 236}
            rx={14}
            fill={c.destaque ? "var(--primary-soft)" : "var(--card)"}
            stroke={c.destaque ? "var(--primary)" : "var(--border)"}
            strokeWidth={c.destaque ? 2 : 1.5}
          />
          <text
            x={c.x + 100}
            y={c.destaque ? 44 : 64}
            textAnchor="middle"
            fontSize={14}
            fontWeight={700}
            fill={c.destaque ? "var(--primary)" : "var(--foreground)"}
            fontFamily="var(--font-sans)"
          >
            {c.titulo}
          </text>
          {[c.voz, c.postura, c.olhar].map((linha, i) => (
            <g key={linha}>
              <circle
                cx={c.x + 26}
                cy={(c.destaque ? 84 : 104) + i * 40}
                r={5}
                fill={c.destaque ? "var(--primary)" : "var(--accent)"}
              />
              <text
                x={c.x + 42}
                y={(c.destaque ? 88 : 108) + i * 40}
                fontSize={12}
                fill="var(--foreground)"
                fontFamily="var(--font-sans)"
              >
                {linha}
              </text>
            </g>
          ))}
          <line
            x1={c.x + 20}
            y1={(c.destaque ? 84 : 104) + 130}
            x2={c.x + 180}
            y2={(c.destaque ? 84 : 104) + 130}
            stroke="var(--border)"
          />
          <text
            x={c.x + 100}
            y={(c.destaque ? 84 : 104) + 152}
            textAnchor="middle"
            fontSize={11}
            fill="var(--muted-foreground)"
            fontFamily="var(--font-sans)"
          >
            {c.destaque ? "equilíbrio: clareza + respeito" : c.titulo === "PASSIVO" ? "cede sempre" : "impõe sempre"}
          </text>
        </g>
      ))}
    </svg>
  );
}

const ESTILOS = [
  {
    nome: "Passivo",
    tone: "neutral" as const,
    pontos: [
      "Autoanulação.",
      "Incapacidade de expressar diretamente sentimentos.",
      "Fala em voz baixa.",
      "Evita opiniões pessoais.",
      "Concorda publicamente mesmo discordando por dentro.",
    ],
  },
  {
    nome: "Assertivo",
    tone: "primary" as const,
    pontos: [
      "Comunicação direta e respeitosa.",
      "Expressa sentimentos e opiniões com firmeza.",
      "Respeita o ponto de vista do outro.",
    ],
  },
  {
    nome: "Agressivo",
    tone: "neutral" as const,
    pontos: [
      "Ameaça ou viola direitos dos outros.",
      "Fala em voz alta, «por cima» do discurso alheio.",
      "Opiniões expressas de forma dogmática.",
    ],
  },
];

const DEZ_PASSOS = [
  "Escolher hora e local calmos e privados.",
  "Preparar o essencial antes de falar.",
  "Usar frases na 1.ª pessoa («Eu sinto…», «Eu penso…») e evitar generalizações («sempre», «nunca»).",
  "Confirmar que o outro compreendeu.",
  "Ouvir ativamente a resposta.",
  "Devolver o que ouviu.",
  "Identificar o problema em conjunto.",
  "Procurar soluções em conjunto.",
  "Negociar um caminho que beneficie ambos.",
  "Autoavaliar o que resultou bem.",
];

export function Block3Content() {
  return (
    <>
      {/* 1. CONTEÚDO */}
      <section className="mt-10">
        <SectionHeading eyebrow="Conteúdo" title="Nem ceder, nem atropelar" />
        <Prose>
          <p>
            A assertividade situa-se «no ponto central de um <em>continuum</em> entre a passividade
            e a agressão». Não é um meio-termo tímido — é afirmar-se com clareza e respeito, ao
            mesmo tempo.
          </p>
        </Prose>
        <SourceNote>IPL — Comunicação Interpessoal e Assertividade.</SourceNote>

        <Figure
          caption="O continuum da comunicação: passivo, assertivo (ao centro) e agressivo, com os sinais de voz, postura e olhar."
          source="IPL — Comunicação Interpessoal e Assertividade."
        >
          <ContinuumSvg />
        </Figure>

        <div className="grid gap-4 lg:grid-cols-3">
          {ESTILOS.map((e) => (
            <ContentCard key={e.nome} tone={e.tone} title={e.nome}>
              <ul className="list-disc space-y-1 pl-4">
                {e.pontos.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </ContentCard>
          ))}
        </div>
        <SourceNote>IPL.</SourceNote>

        <KeyIdea>
          Ser assertivo é dizer o que se pensa e sente de forma direta, mantendo intacto o respeito
          pelo ponto de vista do outro — nem se anular, nem passar por cima.
        </KeyIdea>

        <div className="mt-6">
          <ContentCard tone="accent" title="Um aviso importante">
            <p>
              «A passividade tende a ser avaliada positivamente pelos outros, mas quem comunica
              assertivamente pode ser mal percebido como agressivo.»
            </p>
            <p className="mt-2">
              Por isso a assertividade exige prática consciente — não é intuitiva para todos, e vale
              a pena persistir mesmo quando a reação inicial dos outros não é imediatamente
              positiva.
            </p>
            <p className="mt-3 text-xs text-muted-foreground">
              <span className="font-semibold">Fonte:</span> IPL.
            </p>
          </ContentCard>
        </div>
      </section>

      {/* 2. EXEMPLO / TÉCNICAS */}
      <section className="mt-12">
        <SectionHeading
          eyebrow="Exemplo"
          title="Duas ferramentas concretas"
          lead="A técnica D.E.E. para dizer algo desagradável ou dizer não, e um roteiro em 10 passos para conversas difíceis."
        />
        <LessonAccordion
          items={[
            {
              title: "Técnica D.E.E. — Descrever · Expressar · Especificar",
              content: (
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    Útil quando é preciso dizer algo desagradável ou dizer não. Exemplo aplicado:
                    um formando que interrompe repetidamente os colegas.
                  </p>
                  <ol className="space-y-3">
                    {[
                      [
                        "Descrever",
                        "o comportamento, sem rótulos",
                        "«Reparei que interrompeste os colegas três vezes nos últimos 10 minutos.»",
                      ],
                      [
                        "Expressar",
                        "o efeito / sentimento",
                        "«Isso está a dificultar que outras pessoas partilhem as suas ideias.»",
                      ],
                      [
                        "Especificar",
                        "o que pede",
                        "«Gostava que esperasses que a pessoa termine antes de intervires.»",
                      ],
                    ].map(([passo, sub, exemplo], i) => (
                      <li key={passo} className="rounded-lg border border-border bg-surface p-4">
                        <p className="font-display text-base">
                          <span className="mr-2 text-primary">{i + 1}.</span>
                          {passo} <span className="text-sm text-muted-foreground">— {sub}</span>
                        </p>
                        <p className="mt-1 italic">{exemplo}</p>
                      </li>
                    ))}
                  </ol>
                  <p className="text-xs text-muted-foreground">
                    <span className="font-semibold">Fonte:</span> Manual UFCD 9205 — Comunicação e
                    Perfis.
                  </p>
                </div>
              ),
            },
            {
              title: "10 passos para uma conversa assertiva (versão condensada)",
              content: (
                <div className="space-y-3">
                  <ol className="grid gap-2 sm:grid-cols-2">
                    {DEZ_PASSOS.map((p, i) => (
                      <li key={p} className="flex gap-2 rounded-lg bg-muted/60 p-3 text-[0.95rem]">
                        <span className="font-semibold text-primary">{i + 1}.</span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ol>
                  <p className="text-xs text-muted-foreground">
                    <span className="font-semibold">Fonte:</span> IPL.
                  </p>
                </div>
              ),
            },
          ]}
        />
      </section>

      {/* 3. INTERAÇÃO */}
      <section className="mt-12">
        <SectionHeading
          eyebrow="Interação"
          title="Reformular no calor do momento"
          lead="Um formador irritado diz: «Vocês nunca prestam atenção nenhuma, é sempre a mesma coisa!» Qual das reformulações é assertiva?"
        />
        <Quiz
          id="bloco-3-quiz-reformulacao"
          question="Qual destas reformulações é assertiva?"
          options={[
            {
              text: "«Desculpem lá, se calhar sou só eu que não consigo explicar bem.»",
              feedback:
                "Esta é passiva: o formador desvaloriza-se a si próprio, retira-se do problema e não pede nada concreto ao grupo. O comportamento que o incomoda continua sem ser nomeado — e ele fica a sustentar sozinho um custo que é partilhado.",
            },
            {
              text: "«Reparei que várias pessoas estão a conversar enquanto explico — isso dificulta-me continuar. Podemos focar-nos nos próximos 10 minutos?»",
              correct: true,
              feedback:
                "Assertiva, e reconhece-se pelos três movimentos: descreve o comportamento observável sem rótulos, expressa o efeito que tem sobre si e pede algo concreto e realizável. Firmeza sem violação do outro — o ponto central do continuum.",
            },
            {
              text: "«Se continuarem assim, paro a sessão agora mesmo.»",
              feedback:
                "Agressiva: é uma ameaça. Pode obter silêncio imediato, mas não convida ao diálogo nem explica o efeito real do comportamento — e tende a deslocar o conflito para o plano da autoridade, onde é mais difícil resolvê-lo.",
            },
          ]}
          takeaway="A frase original («nunca», «sempre») generaliza e acusa. A versão assertiva troca a generalização por observação, o ataque por efeito, e a queixa por pedido."
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
          id="bloco-3-reflexao-dee"
          question="Escreva, em D.E.E., algo que precisa de dizer a um formando (ou colega) e que tem vindo a evitar."
          hint="Descrever o comportamento · Expressar o efeito · Especificar o pedido."
        />
        <ContentCard tone="primary" title="Antes de avançar">
          <p>
            No Bloco 4 vamos ver o que impede estas mensagens de chegar — as barreiras à
            comunicação.
          </p>
        </ContentCard>
        <SourceNote>
          IPL — Comunicação Interpessoal e Assertividade; Manual UFCD 9205 — Comunicação e Perfis
          (SNQ, Portugal).
        </SourceNote>
      </section>
    </>
  );
}
