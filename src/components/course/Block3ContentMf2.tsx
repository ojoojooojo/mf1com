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

/* ---------- Infográfico: os custos do conflito (CPP, 2008) ---------- */

type Stat = { value: string; label: string };

const STATS: Stat[] = [
  { value: "85%", label: "das pessoas lidam com conflito em alguma medida no trabalho" },
  { value: "29%", label: "lidam com conflito «sempre» ou «frequentemente»" },
  { value: "2,1h", label: "por semana, em média, gastas a lidar com conflito" },
  { value: "385M", label: "de dias de trabalho por ano perdidos nos EUA" },
  { value: "89%", label: "relataram conflitos que escalaram" },
  { value: "25%", label: "viram um conflito resultar em doença ou ausência" },
  { value: "18%", label: "viram pessoas saírem da organização por causa de um conflito" },
  { value: "9%", label: "associaram um conflito ao fracasso de um projeto" },
];

function CustosConflitoSvg() {
  const W = 960;
  const cols = 4;
  const cardW = 222;
  const cardH = 108;
  const gap = 14;
  const topY = 34;
  const rows = Math.ceil(STATS.length / cols);
  const H = topY + rows * (cardH + gap) + 6;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-label="Cartões com estatísticas sobre o custo do conflito no trabalho: 85 por cento das pessoas lidam com conflito, 29 por cento frequentemente, 2,1 horas por semana em média, 385 milhões de dias de trabalho perdidos por ano nos EUA, 89 por cento viram conflitos escalar, 25 por cento viram conflitos causar doença ou ausência, 18 por cento viram saídas da organização e 9 por cento associaram conflitos ao fracasso de projetos."
      className="w-full max-w-4xl"
    >
      <text
        x={6}
        y={20}
        fontSize={13}
        fontFamily="var(--font-sans)"
        fill="var(--muted-foreground)"
      >
        O custo do conflito não gerido, em oito números
      </text>

      {STATS.map((stat, i) => {
        const col = i % cols;
        const row = Math.floor(i / cols);
        const x = 6 + col * (cardW + gap);
        const y = topY + row * (cardH + gap);
        const isMoney = i === 3;
        return (
          <g key={stat.value + stat.label}>
            <rect
              x={x}
              y={y}
              width={cardW}
              height={cardH}
              rx={10}
              fill={isMoney ? "var(--accent-soft)" : "var(--primary-soft)"}
              stroke={isMoney ? "var(--accent)" : "var(--primary)"}
              strokeWidth={1.5}
            />
            <text
              x={x + 16}
              y={y + 46}
              fontSize={34}
              fontWeight={700}
              fontFamily="var(--font-display, var(--font-sans))"
              fill={isMoney ? "var(--accent)" : "var(--primary)"}
            >
              {stat.value}
            </text>
            <foreignObject x={x + 14} y={y + 54} width={cardW - 28} height={cardH - 60}>
              <div
                style={{
                  fontSize: "11.5px",
                  lineHeight: 1.3,
                  fontFamily: "var(--font-sans)",
                  color: "var(--muted-foreground)",
                }}
              >
                {stat.label}
              </div>
            </foreignObject>
          </g>
        );
      })}
    </svg>
  );
}

export function Block3ContentMf2() {
  return (
    <>
      {/* 1. CONTEÚDO — Causas dos conflitos */}
      <section className="mt-10">
        <SectionHeading
          eyebrow="Conteúdo"
          title="Causas dos conflitos"
          lead="Raramente há uma única causa — há quase sempre uma combinação de condições de fundo."
        />
        <Prose>
          <p>
            As causas de um conflito raramente são uma coisa só. A investigação organizacional
            aponta recorrentemente para um pequeno conjunto de fontes: recursos escassos (tempo,
            espaço, orçamento, atenção do formador); objetivos incompatíveis; interdependência mal
            gerida (quando o trabalho de uma pessoa depende do de outra, sem clareza de papéis);
            diferenças de valores, estilos ou expectativas; e falhas de comunicação (o território
            já trabalhado no MF1 — ambiguidade, pressupostos não verificados, falta de feedback).
          </p>
        </Prose>
        <KeyIdea>
          Segundo o inquérito internacional CPP Global Human Capital Report (CPP Inc., 2008),
          quando se pergunta às pessoas o que está na origem dos conflitos que vivem,
          «personalidades e egos em confronto» surge destacadamente em primeiro lugar (49%),
          seguido de stress (34%), sobrecarga de trabalho (33%), falta de clareza na liderança
          (29%) e falta de honestidade/abertura (26%). Ou seja: a maior parte das causas
          percebidas não é técnica — é relacional e organizacional.
        </KeyIdea>
        <LessonAccordion
          items={[
            {
              title: "Aprofundar: distinguir causa de detonador",
              content:
                "Uma causa é a condição de fundo (ex.: papéis mal definidos entre dois formadores). Um fator precipitante é o episódio concreto que torna essa condição visível (ex.: os dois aparecem na mesma sessão a dar instruções contraditórias). Tratar só o detonador sem tocar na causa de fundo tende a produzir o mesmo conflito outra vez, com outro pretexto.",
            },
            {
              title: "Aprofundar: fatores contextuais",
              content:
                "Pressão de tempo, espaços inadequados, número elevado de formandos por formador e falta de recursos tornam qualquer causa mais provável de escalar — não são causas em si, mas terreno fértil.",
            },
          ]}
        />
        <SourceNote>
          CPP Inc. (2008). Workplace Conflict and How Businesses Can Harness It to Thrive: The CPP
          Global Human Capital Report. Referencial de Formação Pedagógica Contínua de Formadores —
          Gestão de Conflitos na Formação (IEFP/CNQF, 2024).
        </SourceNote>
        <Quiz
          id="mf2-bloco-3-quiz-causas"
          question="Um formador está sistematicamente a chegar atrasado às sessões porque também dá formação noutra instituição, em cima da hora. Isto gera atrito crescente com a coordenação pedagógica. Qual destas é a CAUSA de fundo, e não apenas o detonador mais visível?"
          options={[
            {
              text: "O atraso à sessão de hoje",
              feedback:
                "O atraso de hoje é o episódio visível — o detonador — não a condição estrutural que o torna provável.",
            },
            {
              text: "A sobreposição de horários entre os dois compromissos profissionais do formador",
              correct: true,
              feedback:
                "Correto. É a condição estrutural (interdependência mal gerida entre dois compromissos) que gera, repetidamente, a probabilidade de atraso — resolver só o episódio de hoje não elimina a causa.",
            },
            {
              text: "A irritação da coordenação pedagógica",
              feedback:
                "Essa é já uma reação ao problema (fase «sentida», Bloco 1), não a causa que lhe deu origem.",
            },
          ]}
          takeaway="Perguntar «isto vai voltar a acontecer se eu só resolver o episódio de hoje?» é um bom teste para distinguir causa de detonador."
        />
      </section>

      {/* 2. CONTEÚDO — Os custos dos conflitos */}
      <section className="mt-12">
        <SectionHeading
          eyebrow="Conteúdo"
          title="Os custos dos conflitos"
          lead="Conflitos não geridos têm custo mensurável — em tempo, em desempenho e em bem-estar."
        />
        <Prose>
          <p>
            Os conflitos não geridos têm custo mensurável — em tempo, em desempenho e em
            bem-estar. O CPP Global Human Capital Report (2008), um inquérito internacional a
            milhares de trabalhadores, encontrou que: 85% das pessoas lidam com conflito em alguma
            medida no trabalho, e 29% fazem-no "sempre" ou "frequentemente"; em média, gastam-se
            2,1 horas por semana a lidar com conflito — nos EUA, isso representava cerca de 385
            milhões de dias de trabalho por ano; 89% dos participantes relataram conflitos que
            escalaram; 25% viram um conflito resultar em doença ou ausência; 18% relataram que
            pessoas saíram da organização por causa de um conflito, e 9% associaram um conflito ao
            fracasso de um projeto.
          </p>
        </Prose>
        <Figure
          caption="O custo do conflito não gerido, segundo um inquérito internacional a milhares de trabalhadores."
          source="CPP Inc. (2008). Workplace Conflict and How Businesses Can Harness It to Thrive."
        >
          <CustosConflitoSvg />
        </Figure>
        <KeyIdea>
          Este inquérito foi feito no mundo do trabalho em geral, não especificamente em formação
          — mas o padrão é transponível: tempo gasto a gerir tensão é tempo que não está a ser
          usado para ensinar, aprender ou preparar a sessão seguinte. Custo não é só financeiro —
          é também clima, retenção e qualidade da aprendizagem.
        </KeyIdea>
        <SourceNote>
          CPP Inc. (2008). Workplace Conflict and How Businesses Can Harness It to Thrive: The CPP
          Global Human Capital Report.
        </SourceNote>
        <Quiz
          id="mf2-bloco-3-quiz-custos"
          question="Segundo o CPP Global Human Capital Report (2008), qual destas afirmações está correta sobre o tempo gasto em conflito no trabalho?"
          options={[
            {
              text: "A maioria das pessoas nunca lida com conflito no trabalho",
              feedback:
                "É o oposto: 85% das pessoas lidam com conflito em alguma medida; só uma pequena percentagem relata nunca o enfrentar.",
            },
            {
              text: "Em média, gastam-se cerca de duas horas por semana a lidar com conflito",
              correct: true,
              feedback:
                "Correto — a média encontrada foi de 2,1 horas por semana, com variação considerável entre países.",
            },
            {
              text: "O tempo gasto em conflito é residual e não tem impacto mensurável",
              feedback:
                "Ao contrário: agregado a uma força de trabalho inteira, esse tempo traduziu-se, nos EUA, em centenas de milhões de dias de trabalho por ano — um custo de escala nacional.",
            },
          ]}
          takeaway="O objetivo de estudar estes números não é dramatizar o conflito — é justificar, com evidência, porque vale a pena investir tempo em preveni-lo e geri-lo bem (Bloco 2)."
        />
      </section>

      {/* 3. APLICAÇÃO — Consequências: funcionais vs. disfuncionais */}
      <section className="mt-12">
        <SectionHeading
          eyebrow="Aplicação"
          title="Consequências: funcionais vs. disfuncionais"
          lead="O que fica depois de um conflito depende de como ele é conduzido — não apenas de ele existir."
        />
        <Prose>
          <p>
            Nem toda a consequência de um conflito é negativa. Quando bem gerido, um conflito pode
            clarificar expectativas, revelar problemas antes escondidos e fortalecer relações
            (consequência funcional). Quando mal gerido, pode empobrecer a aprendizagem, isolar
            pessoas e minar a confiança no grupo (consequência disfuncional). Os mesmos dados do
            CPP (2008) mostram os dois lados: 57% das pessoas terminaram um conflito com
            sentimentos negativos e 67% evitaram deliberadamente colegas depois de um conflito
            (consequências disfuncionais) — mas 95% das pessoas que receberam formação em gestão
            de conflitos consideraram-na útil, o que sugere que o desfecho depende fortemente de
            como o conflito é conduzido, não apenas de ele existir.
          </p>
        </Prose>
        <ReflectionPrompt
          id="mf2-bloco-3-reflexao"
          question="Pense num conflito que testemunhou ou geriu numa formação. Que consequência teve — para os indivíduos envolvidos, para o grupo, para a aprendizagem que estava a decorrer? Foi predominantemente funcional ou disfuncional? Porquê?"
        />
        <Quiz
          id="mf2-bloco-3-quiz-consequencias"
          question="Depois de um desacordo aberto sobre o ritmo do curso, o formador ajusta o plano com o grupo e explicita, a partir daí, como as próximas decisões sobre ritmo vão ser tomadas. Isto é sobretudo um exemplo de consequência..."
          options={[
            {
              text: "Funcional",
              correct: true,
              feedback:
                "Correto. O conflito revelou uma falta de clareza sobre o processo de decisão e a resposta corrigiu-a para todo o resto do curso — aprendizagem e clareza ganhas, não perdidas.",
            },
            {
              text: "Disfuncional",
              feedback:
                "Disfuncional seria o oposto: o desacordo a persistir sem resposta, a gerar ressentimento ou a fazer o grupo evitar levantar o tema outra vez.",
            },
            {
              text: "Neutra — não teve efeito real",
              feedback:
                "Houve um efeito concreto e duradouro: uma regra de processo explícita que não existia antes. Não é um caso neutro.",
            },
          ]}
          takeaway="A pergunta que separa funcional de disfuncional não é «foi desconfortável?» — quase sempre é. É «o que ficou depois, para melhor ou para pior?»"
        />
        <ContentCard tone="primary" title="Antes de avançar">
          <p>
            Guarde as suas respostas. Vão ser retomadas nas Atividades 2 (Mapear Causas) e 3
            (Analisar Consequências).
          </p>
        </ContentCard>
      </section>
    </>
  );
}
