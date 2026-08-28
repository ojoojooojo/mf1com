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

/* ---------- Infográfico: os nove níveis de escalada de Glasl ---------- */

type Nivel = { n: number; label: string; tier: 0 | 1 | 2 };

const NIVEIS: Nivel[] = [
  { n: 1, label: "Tensão pontual", tier: 0 },
  { n: 2, label: "Discussão, posições fixas", tier: 0 },
  { n: 3, label: "Ações substituem o diálogo", tier: 0 },
  { n: 4, label: "Coligações e aliados", tier: 1 },
  { n: 5, label: "Perda de face", tier: 1 },
  { n: 6, label: "Ameaças", tier: 1 },
  { n: 7, label: "Dano limitado ao opositor", tier: 2 },
  { n: 8, label: "Destruição do adversário", tier: 2 },
  { n: 9, label: "Derrota mútua", tier: 2 },
];

const TIERS = [
  { name: "Ganha-ganha", fill: "var(--primary-soft)", stroke: "var(--primary)", text: "var(--primary)" },
  { name: "Ganha-perde", fill: "var(--accent-soft)", stroke: "var(--accent)", text: "var(--accent)" },
  {
    name: "Perde-perde",
    fill: "var(--destructive-soft)",
    stroke: "var(--destructive)",
    text: "var(--destructive)",
  },
] as const;

function EscaladaGlaslSvg() {
  const W = 800;
  const boxW = 232;
  const boxH = 46;
  const stepX = 60;
  const stepY = 54;
  const topY = 44;
  const H = topY + NIVEIS.length * stepY + 52;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-label="Escada ascendente com os nove níveis de escalada de conflito de Glasl, agrupados em três patamares: ganha-ganha (níveis 1 a 3), ganha-perde (níveis 4 a 6) e perde-perde (níveis 7 a 9)."
      className="w-full max-w-3xl"
    >
      <text
        x={16}
        y={22}
        fontSize={13}
        fontFamily="var(--font-sans)"
        fill="var(--muted-foreground)"
      >
        A escalada progride por degraus — e cada patamar muda o objetivo das partes
      </text>

      {NIVEIS.map((nivel, i) => {
        const fromTop = NIVEIS.length - 1 - i; // nível 1 em baixo
        const y = topY + fromTop * stepY;
        const x = 16 + i * stepX;
        const tier = TIERS[nivel.tier];
        return (
          <g key={nivel.n}>
            <rect
              x={x}
              y={y}
              width={boxW}
              height={boxH}
              rx={10}
              fill={tier.fill}
              stroke={tier.stroke}
              strokeWidth={1.5}
            />
            <text
              x={x + 16}
              y={y + boxH / 2 + 5}
              fontSize={13}
              fontWeight={700}
              fontFamily="var(--font-sans)"
              fill={tier.text}
            >
              {nivel.n}
            </text>
            <text
              x={x + 34}
              y={y + boxH / 2 + 5}
              fontSize={13}
              fontFamily="var(--font-sans)"
              fill="var(--foreground)"
            >
              {nivel.label}
            </text>
          </g>
        );
      })}

      {TIERS.map((tier, t) => {
        const idxs = NIVEIS.filter((n) => n.tier === t).map((n) => NIVEIS.indexOf(n));
        const top = Math.min(...idxs.map((i) => topY + (NIVEIS.length - 1 - i) * stepY));
        const bottom = Math.max(
          ...idxs.map((i) => topY + (NIVEIS.length - 1 - i) * stepY + boxH),
        );
        const midY = (top + bottom) / 2;
        return (
          <g key={tier.name}>
            <line
              x1={W - 150}
              x2={W - 150}
              y1={top}
              y2={bottom}
              stroke={tier.stroke}
              strokeWidth={3}
              strokeLinecap="round"
            />
            <text
              x={W - 138}
              y={midY + 4}
              fontSize={12.5}
              fontWeight={600}
              fontFamily="var(--font-sans)"
              fill={tier.text}
            >
              {tier.name}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/* ---------- Bloco 2 · Estratégias e abordagens fundamentais ---------- */

export function Block2ContentMf2() {
  return (
    <>
      {/* 1. CONTEÚDO */}
      <section className="mt-10">
        <SectionHeading
          eyebrow="Conteúdo"
          title="Três abordagens fundamentais"
          lead="Prevenir, intervir, reparar — a mesma gestão de conflito em três tempos diferentes."
        />
        <Prose>
          <p>
            O referencial deste curso identifica três abordagens fundamentais na gestão de conflitos
            em contexto formativo.
          </p>
          <p>
            <strong>Prevenção</strong> — atua antes: cria um ambiente e normas de grupo que reduzem a
            probabilidade de o conflito latente se tornar percebido, sentido e manifesto (liga às
            cinco fases de Pondy, trabalhadas no Bloco 1).
          </p>
          <p>
            <strong>Intervenção</strong> — atua durante: o formador intervém ativamente enquanto o
            conflito está em curso, para o impedir de escalar e o reconduzir a um desfecho
            construtivo.
          </p>
          <p>
            <strong>Pós-resolução</strong> — atua depois: repara relações afetadas e reduz a
            probabilidade de o mesmo conflito recorrer (trata deliberadamente o «resíduo» de Pondy).
          </p>
        </Prose>
        <KeyIdea>
          As três abordagens não são alternativas — são fases complementares de uma mesma gestão de
          conflito ao longo do tempo. Prevenção bem feita reduz a necessidade de intervenção;
          pós-resolução bem feita reduz a necessidade de prevenção repetida.
        </KeyIdea>
      </section>

      {/* 2. EXEMPLO / CENÁRIO */}
      <section className="mt-12">
        <SectionHeading
          eyebrow="Exemplo"
          title="As três abordagens na sala de formação"
          lead="Três mini-episódios, um por abordagem — repare no momento em que o formador age."
        />
        <Scenario
          title="Prevenção — antes de existir tensão"
          context="Primeira sessão do curso, ainda sem qualquer conflito visível."
          lines={[
            {
              speaker: "Formador",
              text: "Antes de começarmos: neste grupo discutimos ideias, não pessoas. Quem discorda fala depois de repetir o que ouviu.",
              side: "right",
            },
            { speaker: "Grupo", text: "Combinado." },
          ]}
          note="As normas de participação são acordadas quando ninguém está em disputa — é isso que as torna utilizáveis mais tarde."
        />
        <Scenario
          title="Intervenção — durante a escalada"
          context="Meio da terceira sessão; uma troca entre dois formandos está a subir de tom."
          lines={[
            { speaker: "Formanda A", text: "Isso é simplesmente errado, já expliquei duas vezes." },
            {
              speaker: "Formador",
              text: "Vamos parar um instante. A questão em disputa é o critério de avaliação ou o exemplo que usámos? Vamos separar as duas.",
              side: "right",
            },
          ]}
          note="O formador não decide quem tem razão: reformula a questão em disputa para travar a escalada."
        />
        <Scenario
          title="Pós-resolução — depois do episódio"
          context="Início da sessão seguinte, cinco minutos dedicados ao que ficou."
          lines={[
            {
              speaker: "Formador",
              text: "Na sessão passada houve uma discussão dura. Quero registar que ambos trouxeram um argumento útil: o critério ficou mais claro por causa dessa troca.",
              side: "right",
            },
          ]}
          note="Validar publicamente o contributo das duas partes trata o resíduo — é o que reduz a probabilidade de recorrência."
        />
        <Quiz
          id="mf2-bloco-2-quiz-abordagem"
          question="No final de uma sessão marcada por tensão entre dois formandos, o formador reserva 10 minutos para que ambos expliquem ao grupo o que aprenderam com a situação, sem reabrir a disputa. Que abordagem fundamental está em ação?"
          options={[
            {
              text: "Prevenção",
              feedback:
                "Prevenção atuaria antes de o conflito se manifestar — aqui o episódio já ocorreu.",
            },
            {
              text: "Intervenção",
              feedback:
                "Intervenção seria atuar enquanto o conflito decorre — aqui a sessão de tensão já tinha terminado.",
            },
            {
              text: "Pós-resolução",
              correct: true,
              feedback:
                "Correto. O conflito já ocorreu; esta ação visa reparar a relação e extrair aprendizagem, reduzindo a probabilidade de recorrência — a definição exata de pós-resolução.",
            },
          ]}
          takeaway="Repare no tempo verbal da ação: «antes de», «durante», «depois de» — é o critério mais simples para distinguir as três abordagens."
        />
      </section>

      {/* 3. CONTEÚDO — Glasl */}
      <section className="mt-12">
        <SectionHeading
          eyebrow="Conteúdo"
          title="Como um conflito escala: o modelo de Glasl"
          lead="Nove níveis, três patamares — e um ponto a partir do qual uma conversa simples já não basta."
        />
        <Prose>
          <p>
            Para saber quando prevenir, quando intervir e quando um conflito já foi longe demais para
            uma solução simples, ajuda perceber como a escalada normalmente progride. Friedrich Glasl
            propôs um modelo de nove níveis, agrupados em três patamares.
          </p>
          <p>
            <strong>Patamar ganha-ganha</strong> (níveis 1-3: tensão pontual → discussão com posições
            fixas → o diálogo direto interrompe-se, dando lugar a ações). Ainda é possível uma solução
            onde ambas as partes saem satisfeitas.
          </p>
          <p>
            <strong>Patamar ganha-perde</strong> (níveis 4-6: procura de aliados/coligações → ataques à
            reputação, perda de face → ameaças). O objetivo muda: já não é resolver a questão, é
            vencer o outro.
          </p>
          <p>
            <strong>Patamar perde-perde</strong> (níveis 7-9: dano limitado ao opositor → destruição
            total → arrastar-se mutuamente para a derrota, mesmo a custo próprio).
          </p>
        </Prose>
        <Figure
          caption="Os nove níveis de escalada de um conflito, em três patamares."
          source="Glasl, F. — modelo de escalada em nove níveis (síntese conforme Jordan, T., 2000)."
        >
          <EscaladaGlaslSvg />
        </Figure>
        <KeyIdea>
          Em contexto de formação, o objetivo realista do formador não é «resolver» um conflito nos
          níveis mais altos — isso é trabalho de mediação especializada, tema do MF3. É reconhecer os
          sinais cedo e intervir enquanto ainda estamos no primeiro patamar, onde uma solução
          ganha-ganha continua ao alcance de ambas as partes.
        </KeyIdea>
        <SourceNote>
          Glasl, F. — modelo dos nove níveis de escalada de conflito. Síntese conforme Jordan, T.
          (2000), Glasl&apos;s Nine-Stage Model of Conflict Escalation.
        </SourceNote>
        <Quiz
          id="mf2-bloco-2-quiz-escalada"
          question="Dois formandos deixaram de se dirigir a palavra diretamente; cada um fala do outro para o resto do grupo, em tom desdenhoso. Em que patamar do modelo de Glasl esta situação já se encontra, o mais provavelmente?"
          options={[
            {
              text: "Ganha-ganha",
              feedback:
                "Neste patamar as partes ainda dialogam diretamente, mesmo que com posições rígidas — aqui já não há diálogo direto.",
            },
            {
              text: "Ganha-perde",
              correct: true,
              feedback:
                "Correto. Já há sinais de perda de face e comunicação indireta hostil, típicos deste patamar — o objetivo deixou de ser resolver a questão e passou a ser desacreditar o outro perante o grupo.",
            },
            {
              text: "Perde-perde",
              feedback:
                "Este patamar envolveria dano severo e disposição para se prejudicarem mutuamente mesmo a custo próprio — o cenário ainda não mostra isso.",
            },
          ]}
          takeaway="Quanto mais alto o nível, menos provável que uma conversa simples resolva — pode já ser momento de pedir apoio (coordenação pedagógica, mediação) em vez de insistir sozinho."
        />
      </section>

      {/* 4. INTERAÇÃO — Deutsch */}
      <section className="mt-12">
        <SectionHeading
          eyebrow="Interação"
          title="A lei rudimentar das relações sociais (Deutsch)"
          lead="O tipo de processo que escolhemos tende a voltar-nos em espelho."
        />
        <Prose>
          <p>
            Morton Deutsch (1973) descreve um padrão simples mas poderoso: processos cooperativos
            tendem a gerar mais cooperação; processos competitivos tendem a gerar mais competição. A
            dado momento, cada parte de um conflito escolhe — ainda que sem se dar conta — se vai
            tratar a situação como um problema comum a resolver em conjunto (cooperação) ou como uma
            disputa a vencer (competição). Essa escolha tende a reproduzir-se na resposta da outra
            parte.
          </p>
        </Prose>
        <LessonAccordion
          items={[
            {
              title: "Aprofundar: o que alimenta a escalada",
              content: (
                <p>
                  Deutsch identifica três processos que, juntos, empurram um conflito para a escalada:
                  processos competitivos (cada parte quer ganhar), perceção enviesada (cada parte vê
                  as suas próprias ações como razoáveis e as do outro como hostis — o mesmo mecanismo
                  do realismo ingénuo que vamos aprofundar no Bloco 4) e processos de compromisso
                  (cada parte sente que precisa de justificar o investimento já feito, escalando para
                  não «perder a face» ou parecer ter estado errada desde o início).
                </p>
              ),
            },
            {
              title: "Aprofundar: o que se pode fazer, mesmo em condições difíceis",
              content: (
                <p>
                  Deutsch sublinha que mesmo em condições objetivamente desfavoráveis, um conflito
                  pode ser conduzido de forma construtiva: a chave está em tratar o conflito como um
                  problema comum («nós contra o problema», não «eu contra ti»), manter comunicação
                  aberta e reconhecer interesses legítimos de ambas as partes.
                </p>
              ),
            },
          ]}
        />
        <ReflectionPrompt
          id="mf2-bloco-2-reflexao"
          question="Pense numa situação de tensão que já geriu (ou observou) na sua prática como formador. Nessa situação, agiu de forma predominantemente cooperativa ou competitiva? O que teria mudado se tivesse escolhido a orientação oposta?"
        />
      </section>

      {/* 5. APLICAÇÃO */}
      <section className="mt-12">
        <SectionHeading
          eyebrow="Aplicação"
          title="Levar isto para a prática"
          lead="Uma última verificação e a ponte para a aprendizagem ativa."
        />
        <Quiz
          id="mf2-bloco-2-quiz-cooperativo"
          question="Segundo a «lei rudimentar das relações sociais» de Deutsch, qual destas afirmações está mais correta?"
          options={[
            {
              text: "A forma como uma parte trata o conflito tende a gerar uma resposta do mesmo tipo na outra parte — cooperação tende a chamar cooperação, competição tende a chamar competição",
              correct: true,
              feedback:
                "Correto. É exatamente este o mecanismo: o tipo de processo (cooperativo ou competitivo) tende a reproduzir-se na resposta da outra parte.",
            },
            {
              text: "O resultado de um conflito depende inteiramente das condições externas (recursos, tempo, poder), não do comportamento das partes",
              feedback:
                "Deutsch mostra precisamente o contrário: mesmo em condições difíceis, o comportamento das partes pode inverter a trajetória do conflito.",
            },
            {
              text: "Uma vez que um conflito começa a escalar, é irreversível",
              feedback:
                "A escalada é um padrão comum, não um destino fixo — mudar de processo competitivo para cooperativo pode travar ou inverter a escalada, sobretudo nos níveis iniciais do modelo de Glasl.",
            },
          ]}
          takeaway="Isto dá ao formador uma alavanca concreta: mudar o SEU próprio comportamento — de competitivo para cooperativo — é muitas vezes o movimento mais rápido disponível para alterar a trajetória de um conflito em curso."
        />
        <ContentCard tone="primary" title="Antes de avançar">
          Guarde a sua reflexão. Vai ser retomada na Atividade 5 — Prevenção, e liga diretamente ao
          papel do indivíduo, trabalhado no Bloco 4.
        </ContentCard>
        <SourceNote>
          Referencial de Formação Pedagógica Contínua de Formadores — Gestão de Conflitos na Formação
          (IEFP/CNQF, 2024), enquadramento do Módulo 2. Deutsch, M. (1973). The Resolution of
          Conflict: Constructive and Destructive Processes. Yale University Press. Glasl, F. — modelo
          dos nove níveis de escalada de conflito, síntese conforme Jordan, T. (2000),
          Glasl&apos;s Nine-Stage Model of Conflict Escalation.
        </SourceNote>
      </section>
    </>
  );
}
