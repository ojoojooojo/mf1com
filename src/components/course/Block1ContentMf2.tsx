import {
  ContentCard,
  Figure,
  KeyIdea,
  LessonAccordion,
  Prose,
  Quiz,
  Scenario,
  SectionHeading,
  SourceNote,
} from "@/components/course/LessonKit";

/* ---------- Infográfico: as cinco fases de um episódio de conflito (Pondy, 1967) ---------- */

const FASES = [
  { label: "Latente", hint: "condições existem" },
  { label: "Percebido", hint: "alguém nota" },
  { label: "Sentido", hint: "tensão emocional" },
  { label: "Manifesto", hint: "comportamento visível" },
  { label: "Resíduo", hint: "o que fica" },
];

function FasesConflitoSvg() {
  const W = 760;
  const boxW = 128;
  const boxH = 76;
  const y = 74;
  const gap = (W - 32 - FASES.length * boxW) / (FASES.length - 1);

  return (
    <svg
      viewBox={`0 0 ${W} 272`}
      role="img"
      aria-label="Diagrama das cinco fases do conflito em sequência — latente, percebido, sentido, manifesto e resíduo — com uma seta de retorno do resíduo às condições latentes, mostrando que o ciclo se repete."
      className="w-full max-w-3xl"
    >
      <defs>
        <marker id="mf2b1-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 Z" fill="var(--primary)" />
        </marker>
        <marker
          id="mf2b1-arrow-accent"
          markerWidth="8"
          markerHeight="8"
          refX="7"
          refY="4"
          orient="auto"
        >
          <path d="M0,0 L8,4 L0,8 Z" fill="var(--accent)" />
        </marker>
      </defs>

      <text
        x={W / 2}
        y={30}
        textAnchor="middle"
        fontSize={13}
        fontFamily="var(--font-sans)"
        fill="var(--muted-foreground)"
      >
        Um conflito é um processo em fases — não um acontecimento súbito
      </text>

      {FASES.map((fase, i) => {
        const x = 16 + i * (boxW + gap);
        const last = i === FASES.length - 1;
        return (
          <g key={fase.label}>
            <rect
              x={x}
              y={y}
              width={boxW}
              height={boxH}
              rx={12}
              fill={last ? "var(--accent-soft)" : "var(--primary-soft)"}
              stroke={last ? "var(--accent)" : "var(--primary)"}
              strokeWidth={1.5}
            />
            <text
              x={x + boxW / 2}
              y={y + 32}
              textAnchor="middle"
              fontSize={14}
              fontWeight={600}
              fill="var(--foreground)"
              fontFamily="var(--font-sans)"
            >
              {fase.label}
            </text>
            <text
              x={x + boxW / 2}
              y={y + 54}
              textAnchor="middle"
              fontSize={11}
              fill="var(--muted-foreground)"
              fontFamily="var(--font-sans)"
            >
              {fase.hint}
            </text>
            <text
              x={x + boxW / 2}
              y={y - 12}
              textAnchor="middle"
              fontSize={11}
              fontWeight={600}
              fill="var(--primary)"
              fontFamily="var(--font-sans)"
            >
              {i + 1}
            </text>
            {!last ? (
              <line
                x1={x + boxW + 4}
                y1={y + boxH / 2}
                x2={x + boxW + gap - 6}
                y2={y + boxH / 2}
                stroke="var(--primary)"
                strokeWidth={2}
                markerEnd="url(#mf2b1-arrow)"
              />
            ) : null}
          </g>
        );
      })}

      {/* Ciclo: o resíduo realimenta as condições latentes */}
      <path
        d={`M ${16 + 4 * (boxW + gap) + boxW / 2} ${y + boxH + 6}
            C ${16 + 4 * (boxW + gap) + boxW / 2} ${y + boxH + 90},
              ${16 + boxW / 2} ${y + boxH + 90},
              ${16 + boxW / 2} ${y + boxH + 10}`}
        fill="none"
        stroke="var(--accent)"
        strokeWidth={2}
        strokeDasharray="6 5"
        markerEnd="url(#mf2b1-arrow-accent)"
      />
      <text
        x={W / 2}
        y={y + boxH + 104}
        textAnchor="middle"
        fontSize={12}
        fontFamily="var(--font-sans)"
        fill="var(--accent)"
      >
        O resíduo de um episódio altera as condições latentes do episódio seguinte
      </text>
    </svg>
  );
}

/* ---------- Bloco 1 do MF2 ---------- */

export function Block1ContentMf2() {
  return (
    <>
      {/* 1. CONTEÚDO — o que é um conflito */}
      <section className="mt-10">
        <SectionHeading
          eyebrow="Conteúdo"
          title="O que é, afinal, um conflito?"
          lead="Antes de gerir, é preciso reconhecer e nomear."
        />

        <ContentCard tone="primary" title="Ponte com o MF1">
          <p>
            No MF1 trabalhou como comunicar com clareza e escutar para compreender. Mas mesmo a
            comunicação mais cuidada nem sempre evita o desacordo. O MF2 parte de uma pergunta
            diferente: o que acontece quando os interesses, as perceções ou os objetivos de duas ou
            mais pessoas entram em oposição?
          </p>
        </ContentCard>

        <Prose>
          <p>
            Um conflito existe sempre que há <strong>atividades incompatíveis</strong> — quando
            aquilo que uma parte quer, pensa ou faz interfere com o que a outra parte quer, pensa ou
            faz (Deutsch, 1973). O referencial oficial deste curso descreve-o como «qualquer
            discordância ou confronto entre duas ou mais partes com interesses, objetivos ou valores
            divergentes».
          </p>
        </Prose>

        <KeyIdea>
          Um conflito não é, por si, bom ou mau. O que determina se um conflito é construtivo ou
          destrutivo não é a sua existência, mas a forma como é gerido — vamos aprofundar este
          mecanismo no Bloco 2.
        </KeyIdea>
      </section>

      {/* 2. CONTEÚDO — as cinco fases */}
      <section className="mt-12">
        <SectionHeading
          eyebrow="Conteúdo"
          title="Anatomia de um conflito: cinco fases"
          lead="Um conflito raramente «aparece do nada» — já vinha a formar-se antes de se tornar visível."
        />

        <Prose>
          <p>
            Louis Pondy propôs, num artigo hoje clássico na literatura sobre conflito
            organizacional, um modelo de cinco fases:
          </p>
          <ol>
            <li>
              <strong>Latente</strong> — as condições para o conflito já existem (recursos escassos,
              objetivos divergentes, dependência entre pessoas) mas ainda não há perceção nem
              tensão.
            </li>
            <li>
              <strong>Percebido</strong> — pelo menos uma das partes toma consciência de que existe
              uma incompatibilidade.
            </li>
            <li>
              <strong>Sentido</strong> — a perceção transforma-se em tensão emocional: ansiedade,
              frustração, desconforto.
            </li>
            <li>
              <strong>Manifesto</strong> — o conflito torna-se visível em comportamento observável:
              discussão, silêncio hostil, evitamento, confronto.
            </li>
            <li>
              <strong>Resíduo</strong> — depois do episódio, fica um resultado: pode preparar
              terreno para cooperação futura ou agravar as condições latentes, alimentando o próximo
              episódio.
            </li>
          </ol>
        </Prose>

        <Figure
          caption="As cinco fases de um episódio de conflito."
          source="Pondy, L.R. (1967)."
        >
          <FasesConflitoSvg />
        </Figure>

        <KeyIdea>
          Saber reconhecer as fases iniciais — latente e percebida — é uma competência de prevenção:
          quanto mais cedo um formador nota os sinais, mais opções tem para intervir antes da fase
          manifesta. Vamos desenvolver isto no Bloco 2.
        </KeyIdea>

        <LessonAccordion
          items={[
            {
              title: "Aprofundar: o conflito como processo, não como acontecimento único",
              content: (
                <p>
                  Pondy insiste que um conflito não é um evento isolado, mas uma sequência de
                  episódios relacionados: cada episódio deixa um resíduo que molda o próximo. Um
                  formador que só reage ao episódio manifesto (a discussão visível) está a intervir
                  tarde — a fase latente já lá estava há tempo.
                </p>
              ),
            },
            {
              title: "Aprofundar: aplicação à sala de formação",
              content: (
                <p>
                  Numa turma, condições latentes típicas incluem: níveis de experiência muito
                  diferentes no mesmo grupo, disputa por tempo de palavra, métodos de avaliação
                  sentidos como injustos. Nenhuma destas gera conflito por si só — só quando alguém
                  as perceciona como um problema é que entramos na fase seguinte.
                </p>
              ),
            },
          ]}
        />

        <SourceNote>
          Pondy, L.R. (1967). Organizational Conflict: Concepts and Models. Administrative Science
          Quarterly, 12(2), 296-320.
        </SourceNote>
      </section>

      {/* 3. INTERAÇÃO — tipos por nível */}
      <section className="mt-12">
        <SectionHeading
          eyebrow="Interação"
          title="Tipos de conflito por nível"
          lead="A que escala é que o desacordo se joga — e, por isso, a que escala se intervém."
        />

        <Prose>
          <p>
            A literatura distingue conflitos pelo nível a que ocorrem:{" "}
            <strong>Intrapessoal</strong> (dentro da própria pessoa — não é o foco central deste
            módulo, mas molda como a pessoa entra nos outros tipos); <strong>Interpessoal</strong>{" "}
            (entre duas pessoas: um formador e um formando, dois formandos);{" "}
            <strong>Intragrupal</strong> (dentro do mesmo grupo: subgrupos de uma turma em desacordo
            sobre o ritmo de trabalho); <strong>Intergrupal</strong> (entre grupos ou equipas
            distintas: duas turmas a disputar o mesmo recurso ou sala).
          </p>
        </Prose>

        <Scenario
          title="Duas equipas, uma sala"
          context="Cenário simulado."
          lines={[
            {
              speaker: "Equipa A",
              text: "Precisamos dos últimos 20 minutos para ensaiar a apresentação — combinámos isto a semana passada.",
            },
            {
              speaker: "Equipa B",
              text: "Nós também. Ninguém nos disse que era só para vocês.",
              side: "right",
            },
            {
              speaker: "Formador",
              text: "Antes de decidirmos quem fica com o tempo, o que é que cada equipa precisa mesmo de fazer nesses 20 minutos?",
            },
          ]}
          note="Note que o formador não escolhe um lado — reformula a questão para expor os interesses reais por trás das posições."
        />

        <Quiz
          id="mf2-bloco-1-quiz-tipos-nivel"
          question="No cenário acima, que nível de conflito está em jogo?"
          options={[
            {
              text: "Interpessoal",
              feedback:
                "Envolve pessoas, mas o traço distintivo aqui é que a disputa ocorre entre dois grupos constituídos (as duas equipas), não apenas entre duas pessoas isoladas.",
            },
            {
              text: "Intragrupal",
              feedback:
                "Intragrupal seria uma divergência dentro da MESMA equipa — aqui há duas equipas distintas em oposição.",
            },
            {
              text: "Intergrupal",
              correct: true,
              feedback:
                "Correto. Duas equipas distintas (grupos já formados) disputam o mesmo recurso — tempo e sala. É o traço definidor do conflito intergrupal.",
            },
          ]}
          takeaway="O nível ajuda a escolher a escala certa de intervenção: aqui, a solução tem de envolver as duas equipas como um todo, não apenas os porta-vozes."
        />

        <SourceNote>
          Rahim, M.A. (2002). Toward a Theory of Managing Organizational Conflict. International
          Journal of Conflict Management, 13(3), 206-235.
        </SourceNote>
      </section>

      {/* 4. CONTEÚDO — tipos por conteúdo */}
      <section className="mt-12">
        <SectionHeading
          eyebrow="Conteúdo"
          title="Tipos de conflito por conteúdo"
          lead="Complementar ao nível: o que está, de facto, em desacordo."
        />

        <Prose>
          <p>
            Outra forma de classificar, complementar à anterior, olha para <em>o quê</em> está em
            desacordo: <strong>De tarefa</strong> (desacordo sobre o conteúdo do trabalho: o quê
            fazer, que opção escolher, que informação está correta); <strong>De processo</strong>{" "}
            (desacordo sobre como fazer: quem faz o quê, prazos, forma de organizar o trabalho);{" "}
            <strong>Relacional</strong> (tensão pessoal: antipatias, incompatibilidade de estilos,
            atritos que já não são sobre o assunto em discussão).
          </p>
        </Prose>

        <KeyIdea>
          A meta-análise de De Dreu &amp; Weingart (2003), que reuniu dezenas de estudos, encontrou
          que tanto o conflito relacional como o conflito de tarefa se associam, em média, a pior
          desempenho de equipa e menor satisfação — sendo o efeito do conflito relacional
          consistentemente mais negativo. Isto contraria a ideia popular de que «algum conflito de
          tarefa é sempre saudável»: pode ser produtivo em certas condições, mas não é uma regra
          geral.
        </KeyIdea>

        <Quiz
          id="mf2-bloco-1-quiz-tipos-conteudo"
          question="Dois formadores discordam sobre se o módulo deve incluir mais exercícios práticos ou mais teoria. Que tipo de conflito, por conteúdo, é este?"
          options={[
            {
              text: "De tarefa",
              correct: true,
              feedback:
                "Correto. É um desacordo sobre o conteúdo/substância da decisão a tomar — o quê incluir no módulo.",
            },
            {
              text: "De processo",
              feedback:
                "Processo seria discordar sobre COMO organizar a decisão — por exemplo, quem decide ou até quando podem propor alterações — não sobre a substância da própria decisão.",
            },
            {
              text: "Relacional",
              feedback:
                "Não há, pelo enunciado, qualquer indício de tensão pessoal. É importante não presumir hostilidade onde há apenas uma divergência de opinião técnica — fazê-lo pode transformar um desacordo de tarefa saudável num conflito relacional desnecessário.",
            },
          ]}
          takeaway="Nomear o tipo de conflito impede que um desacordo de tarefa seja tratado — ou sentido — como um ataque pessoal."
        />

        <SourceNote>
          Jehn, K.A. (1997). A Qualitative Analysis of Conflict Types and Dimensions in
          Organizational Groups. Administrative Science Quarterly, 42(3), 530-557; De Dreu, C.K.W.
          &amp; Weingart, L.R. (2003). Task versus Relationship Conflict, Team Performance, and Team
          Member Satisfaction: A Meta-Analysis. Journal of Applied Psychology, 88(4), 741-749.
        </SourceNote>
      </section>

      {/* 5. APLICAÇÃO — funcional vs. disfuncional */}
      <section className="mt-12">
        <SectionHeading
          eyebrow="Aplicação"
          title="Funcional vs. disfuncional"
          lead="O critério não está no desacordo em si, mas no que lhe acontece a seguir."
        />

        <Prose>
          <p>
            Não existe «conflito bom» ou «conflito mau» em abstrato — existe conflito gerido de
            forma que produz aprendizagem e clareza (<strong>funcional</strong>) ou de forma que
            produz dano e rutura (<strong>disfuncional</strong>). Deutsch (1973) chama a isto a «lei
            rudimentar das relações sociais»: processos cooperativos tendem a gerar mais cooperação;
            processos competitivos tendem a gerar mais competição e escalada. Vamos aprofundar este
            mecanismo no Bloco 2.
          </p>
        </Prose>

        <Scenario
          title="Dois formadores, um método"
          context="Cenário simulado."
          lines={[
            {
              speaker: "Formador A",
              text: "Prefiro começar pela prática — acho que o grupo aprende melhor experimentando primeiro.",
            },
            {
              speaker: "Formador B",
              text: "Eu tendo a começar pela teoria. O que te leva a preferir a prática primeiro?",
              side: "right",
            },
            {
              speaker: "Formador A",
              text: "Reparei que sem uma referência concreta, a teoria fica abstrata demais para este público.",
            },
            {
              speaker: "Formador B",
              text: "Faz sentido. E se abrirmos com um exercício curto e só depois formalizarmos os conceitos que ele já mobilizou?",
              side: "right",
            },
          ]}
          note="Exemplo de conflito de tarefa gerido de forma funcional: perguntas exploratórias, foco na razão por trás da posição do outro, síntese conjunta no fim."
        />

        <Quiz
          id="mf2-bloco-1-quiz-funcional"
          question="A troca acima entre os dois formadores é um exemplo de conflito gerido de forma..."
          options={[
            {
              text: "Funcional",
              correct: true,
              feedback:
                "Correto. Ambos exploram as razões um do outro, mantêm o foco na tarefa (a melhor sequência pedagógica) e chegam a uma síntese que nenhum tinha isoladamente.",
            },
            {
              text: "Disfuncional",
              feedback:
                "Disfuncional implicaria escalada, ataques pessoais ou rutura da relação — nada disso está presente; pelo contrário, a relação sai reforçada.",
            },
            {
              text: "Não é possível saber sem mais informação",
              feedback:
                "Embora o contexto real seja sempre mais rico, os elementos já apresentados — perguntas exploratórias, foco na tarefa, síntese conjunta — são suficientes para reconhecer um padrão claramente cooperativo.",
            },
          ]}
          takeaway="O critério não é «houve ou não houve desacordo» — é «o que aconteceu depois do desacordo aparecer»."
        />

        <ContentCard title="Nota sobre os cenários">
          <p className="text-sm text-muted-foreground">
            «Duas equipas, uma sala» e «Dois formadores, um método» são situações simuladas, criadas
            para fins pedagógicos — não são relatos reais.
          </p>
        </ContentCard>

        <SourceNote>
          Deutsch, M. (1973). The Resolution of Conflict: Constructive and Destructive Processes.
          Yale University Press; Referencial de Formação Pedagógica Contínua de Formadores — Gestão
          de Conflitos na Formação (IEFP/CNQF, 2024), enquadramento do Módulo 2.
        </SourceNote>
      </section>
    </>
  );
}
