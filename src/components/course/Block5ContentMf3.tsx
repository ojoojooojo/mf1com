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

/* ---------- Infográfico: a Roda de Mapeamento do Conflito ---------- */

const QUADRANTS = [
  {
    label: "O Problema",
    sub: "o que está em disputa",
    x: 150,
    y: 78,
    tone: "primary" as const,
  },
  {
    label: "As Pessoas",
    sub: "emoções e relação",
    x: 370,
    y: 78,
    tone: "accent" as const,
  },
  {
    label: "O Processo",
    sub: "como se comunica e decide",
    x: 150,
    y: 222,
    tone: "accent" as const,
  },
  {
    label: "O Contexto",
    sub: "fatores externos",
    x: 370,
    y: 222,
    tone: "primary" as const,
  },
];

function RodaConflitoSvg() {
  return (
    <svg
      viewBox="0 0 520 300"
      role="img"
      aria-label="Roda de Mapeamento do Conflito com os quatro quadrantes: o Problema, as Pessoas, o Processo e o Contexto"
      className="w-full"
    >
      {/* roda */}
      <circle
        cx="260"
        cy="150"
        r="138"
        fill="var(--muted)"
        stroke="var(--border)"
        strokeWidth="2"
      />
      <line x1="122" y1="150" x2="398" y2="150" stroke="var(--border)" strokeWidth="1.5" />
      <line x1="260" y1="12" x2="260" y2="288" stroke="var(--border)" strokeWidth="1.5" />

      {/* quadrantes */}
      {QUADRANTS.map((q) => {
        const primary = q.tone === "primary";
        return (
          <g key={q.label}>
            <rect
              x={q.x - 78}
              y={q.y - 26}
              width="156"
              height="52"
              rx="12"
              fill={primary ? "var(--primary-soft)" : "var(--accent-soft)"}
              stroke={primary ? "var(--primary)" : "var(--accent)"}
            />
            <text
              x={q.x}
              y={q.y - 5}
              textAnchor="middle"
              fontSize="13"
              fontWeight="600"
              fill={primary ? "var(--primary)" : "var(--accent)"}
              fontFamily="var(--font-sans)"
            >
              {q.label}
            </text>
            <text
              x={q.x}
              y={q.y + 12}
              textAnchor="middle"
              fontSize="10.5"
              fill={primary ? "var(--primary)" : "var(--accent)"}
              fontFamily="var(--font-sans)"
            >
              {q.sub}
            </text>
          </g>
        );
      })}

      {/* centro */}
      <circle cx="260" cy="150" r="42" fill="var(--card)" stroke="var(--border)" strokeWidth="2" />
      <text
        x="260"
        y="147"
        textAnchor="middle"
        fontSize="11.5"
        fontWeight="600"
        fill="var(--foreground)"
        fontFamily="var(--font-sans)"
      >
        Conflito
      </text>
      <text
        x="260"
        y="162"
        textAnchor="middle"
        fontSize="9.5"
        fill="var(--muted-foreground)"
        fontFamily="var(--font-sans)"
      >
        concreto
      </text>
    </svg>
  );
}

export function Block5ContentMf3() {
  return (
    <>
      {/* A. CONTEÚDO — A Roda e a sua origem */}
      <section className="mt-10">
        <SectionHeading
          eyebrow="Conteúdo"
          title="A Roda de Mapeamento do Conflito: uma ferramenta de diagnóstico"
          lead="Antes de escolher uma estratégia, é preciso saber com que conflito se está a lidar. A Roda organiza essa análise em quatro quadrantes."
        />
        <Prose>
          <p>
            A ferramenta apresentada neste bloco é a <strong>Roda de Mapeamento do Conflito</strong>{" "}
            proposta por Patrícia Lantos e Shirlei N. Harari no âmbito do trabalho da Mediare (2018).
            Trata-se de uma adaptação, para contextos de mediação e formação de língua portuguesa, da{" "}
            <em>Wheel of Conflict</em> formulada por Bernard Mayer em{" "}
            <em>The Dynamics of Conflict Resolution: A Practitioner&rsquo;s Guide</em> (2000). É
            importante manter esta atribuição: a Roda não é um instrumento anónimo nem uma criação
            deste módulo — tem autoria e uma genealogia identificáveis.
          </p>
          <p>
            A premissa é simples e exigente: um conflito raramente é aquilo que as partes dizem que
            é. Quando um formador ouve «o problema é que ele não cumpre os prazos», está a receber
            uma formulação já filtrada. A Roda obriga a examinar quatro dimensões antes de decidir
            intervir, precisamente porque a dimensão onde o conflito é <em>declarado</em> é
            frequentemente diferente da dimensão onde o conflito é <em>alimentado</em>.
          </p>
        </Prose>
        <Figure
          caption="A Roda de Mapeamento do Conflito: quatro quadrantes de análise em torno de um conflito concreto. Nenhum quadrante explica sozinho o conflito; o valor está em percorrer os quatro."
          source="Lantos, P. & Harari, S.N. (2018), Mediare — adaptação da Wheel of Conflict de Mayer, B. (2000)."
        >
          <RodaConflitoSvg />
        </Figure>
        <SourceNote>
          Lantos, P. &amp; Harari, S.N. (2018). Roda de Mapeamento do Conflito. Mediare — adaptação
          de Mayer, B. (2000), <em>The Dynamics of Conflict Resolution: A Practitioner&rsquo;s
          Guide</em>, Jossey-Bass.
        </SourceNote>
      </section>

      {/* B. CONTEÚDO — Os quatro quadrantes */}
      <section className="mt-12">
        <SectionHeading
          eyebrow="Conteúdo"
          title="Os quatro quadrantes, um a um"
          lead="Para cada quadrante: o que abrange e como se manifesta concretamente numa sala de formação."
        />
        <LessonAccordion
          items={[
            {
              title: "O Problema — a dimensão substantiva",
              content:
                "É aquilo que está objetivamente em disputa: recursos, tarefas, critérios, conteúdos, prazos, regras. Responde à pergunta «o que é que, de facto, as partes querem obter e não estão a obter?». Em formação, manifesta-se como: divergência sobre a distribuição de trabalho num exercício de grupo, discordância sobre um critério de avaliação, desacordo sobre a ordem ou profundidade dos conteúdos, disputa por um recurso escasso (um posto de trabalho, um equipamento, tempo de apresentação). Este é o quadrante mais fácil de identificar — e é por isso que é frequentemente tomado pelo conflito inteiro, quando é apenas a sua superfície.",
            },
            {
              title: "As Pessoas — a dimensão relacional e emocional",
              content:
                "Abrange emoções, necessidades identitárias, histórico entre as partes, perceções mútuas e valores pessoais. Responde à pergunta «o que é que cada pessoa sente que está em jogo para si?». Em formação, manifesta-se como: um participante que se sentiu ridicularizado numa sessão anterior e desde então rejeita tudo o que o colega propõe; alguém com necessidade forte de reconhecimento profissional num grupo que o trata como iniciante; desconfiança acumulada entre dois colegas de trabalho que frequentam a mesma formação. É o quadrante que explica por que motivo um problema pequeno gera uma reação desproporcionada.",
            },
            {
              title: "O Processo — comunicação e procedimento",
              content:
                "Refere-se ao modo como se comunica e como se decide: quem foi ouvido, quem decidiu, com que informação, em que sequência, com que transparência. Responde à pergunta «como é que se chegou até aqui — e quem participou nessa forma de chegar?». Em formação, manifesta-se como: uma regra de avaliação anunciada a meio do módulo sem explicação; grupos formados pelo formador sem que ninguém saiba o critério; um participante que fala sempre primeiro e absorve o tempo dos outros; feedback dado publicamente quando devia ser privado. Muitos conflitos que parecem ser sobre o Problema são, na verdade, sobre o Processo pelo qual o problema foi tratado.",
            },
            {
              title: "O Contexto — fatores externos à situação imediata",
              content:
                "Inclui tudo o que condiciona o conflito de fora: pressões organizacionais, cultura da empresa ou da entidade formadora, relações de poder e hierarquia, constrangimentos de tempo e de espaço, obrigações de certificação, situação pessoal e profissional dos participantes. Responde à pergunta «o que é que, vindo de fora desta sala, está a pressionar esta situação?». Em formação, manifesta-se como: participantes enviados pela entidade empregadora contra a sua vontade; a presença de uma chefia direta no mesmo grupo; a necessidade de certificação para manter o posto de trabalho; uma sala inadequada ou um horário exaustivo. O Contexto raramente é modificável pelo formador — mas ignorá-lo leva a intervenções que não podiam funcionar.",
            },
          ]}
        />
        <KeyIdea>
          Os quadrantes não são categorias exclusivas onde se «arruma» um conflito. São quatro
          perguntas a fazer sempre ao mesmo conflito. A intervenção mais eficaz é normalmente aquela
          que atua no quadrante que alimenta a situação, não naquele em que ela foi declarada.
        </KeyIdea>
        <SourceNote>
          Lantos, P. &amp; Harari, S.N. (2018). Mediare; Mayer, B. (2000),{" "}
          <em>The Dynamics of Conflict Resolution</em>, Jossey-Bass.
        </SourceNote>
      </section>

      {/* C. CONTEÚDO — Questões de diagnóstico */}
      <section className="mt-12">
        <SectionHeading
          eyebrow="Conteúdo"
          title="Questões de diagnóstico por quadrante"
          lead="Perguntas que o formador pode fazer a si mesmo — por escrito, antes de intervir — para mapear um conflito real."
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <ContentCard tone="primary" title="O Problema">
            <ul className="mt-1 list-disc space-y-1 pl-5">
              <li>O que é que cada parte diz que quer? E o que é que quer, de facto, com isso?</li>
              <li>Há algum recurso escasso realmente em disputa? Qual?</li>
              <li>Os factos estão estabelecidos ou cada parte trabalha com dados diferentes?</li>
              <li>Se este ponto fosse resolvido hoje, a tensão desapareceria?</li>
            </ul>
          </ContentCard>
          <ContentCard tone="accent" title="As Pessoas">
            <ul className="mt-1 list-disc space-y-1 pl-5">
              <li>Que emoção está presente em cada parte — e desde quando?</li>
              <li>Existe história anterior entre estas pessoas que eu desconheça?</li>
              <li>O que é que cada uma sente que está a defender além do assunto em causa?</li>
              <li>A reação é proporcional ao problema declarado? Se não, o que explica a diferença?</li>
            </ul>
          </ContentCard>
          <ContentCard tone="accent" title="O Processo">
            <ul className="mt-1 list-disc space-y-1 pl-5">
              <li>Quem foi ouvido antes de isto ser decidido? Quem não foi?</li>
              <li>As regras e os critérios foram explicitados e no momento certo?</li>
              <li>Como circula a informação neste grupo — e por onde não circula?</li>
              <li>Alguma decisão minha, e o modo como a tomei, contribuiu para esta situação?</li>
            </ul>
          </ContentCard>
          <ContentCard tone="primary" title="O Contexto">
            <ul className="mt-1 list-disc space-y-1 pl-5">
              <li>Que pressões externas — laborais, hierárquicas, de certificação — pesam aqui?</li>
              <li>Há relações de poder dentro do grupo que vêm de fora da sala?</li>
              <li>Que constrangimentos de tempo, espaço ou recursos condicionam a situação?</li>
              <li>O que está fora da minha margem de atuação — e como o tomo em conta?</li>
            </ul>
          </ContentCard>
        </div>
        <KeyIdea>
          Escrever as respostas, mesmo em frases curtas, é parte da ferramenta. O mapeamento feito
          apenas de cabeça tende a parar no primeiro quadrante que oferece uma explicação suficiente
          — normalmente o Problema.
        </KeyIdea>
        <SourceNote>
          Questões de diagnóstico organizadas para este módulo a partir da Roda de Lantos &amp;
          Harari (2018, Mediare) e de Mayer, B. (2000).
        </SourceNote>
      </section>

      {/* D. EXEMPLO — Cenário */}
      <section className="mt-12">
        <SectionHeading
          eyebrow="Exemplo"
          title="Um incidente, quatro quadrantes"
          lead="O mesmo episódio decomposto pela Roda — e a mudança que essa decomposição provoca na intervenção."
        />
        <Scenario
          title="«Não trabalho mais com ele»"
          context="Formação de 50 horas numa autarquia. Trabalho de grupo com apresentação avaliada. Sandra procura o formador Tiago no intervalo."
          lines={[
            {
              speaker: "Sandra",
              text: "Não trabalho mais com o Nuno. Ele não fez a parte dele, entreguei tudo eu, e depois foi ele que apresentou.",
            },
            {
              speaker: "Tiago (formador)",
              text: "Percebo que está mesmo incomodada. Deixe-me fazer-lhe algumas perguntas antes de decidirmos algo — quero perceber bem a situação.",
              side: "right",
            },
            {
              speaker: "Sandra",
              text: "Não é a primeira vez. No serviço é sempre assim: ele é coordenador, delega tudo, e nas reuniões apresenta o trabalho como se fosse dele.",
            },
            {
              speaker: "Tiago (formador)",
              text: "E quem escolheu quem apresentava?",
              side: "right",
            },
            {
              speaker: "Sandra",
              text: "Ninguém escolheu. Ele levantou-se e foi. Eu não ia discutir à frente de todos.",
            },
            {
              speaker: "Nuno (mais tarde, em conversa separada)",
              text: "Eu tinha três reuniões esta semana, avisei o grupo. Fui apresentar porque ninguém se levantou e havia que fazê-lo. Não sabia que ela tinha ficado com tudo.",
            },
          ]}
          note="Mapeamento: PROBLEMA — distribuição real de trabalho e atribuição do crédito na apresentação avaliada. PESSOAS — Sandra sente desvalorização repetida e falta de reconhecimento; Nuno não percebeu o efeito do que fez. PROCESSO — o grupo nunca decidiu explicitamente quem apresentava nem registou a divisão de tarefas; Sandra não teve onde levantar o assunto sem exposição pública. CONTEXTO — Nuno é coordenador de Sandra no serviço, o que torna a discordância profissionalmente arriscada para ela, e a formação é avaliada e obrigatória. Consequência prática: intervir apenas no Problema — refazer a divisão de tarefas — deixaria intacta a assimetria hierárquica e a ausência de procedimento. Tiago atua no Processo, onde tem margem: introduz para todos os grupos um registo escrito da divisão de tarefas e uma rotação obrigatória de quem apresenta, e trata separadamente com cada um a parte relacional. Não resolve o Contexto — e sabe que não pode."
        />
        <SourceNote>
          O diálogo é uma simulação pedagógica construída para este módulo, com nomes fictícios;
          ilustra a aplicação da Roda de Lantos &amp; Harari (2018).
        </SourceNote>
      </section>

      {/* E. INTERAÇÃO — Micro-quizzes */}
      <section className="mt-12">
        <SectionHeading
          eyebrow="Interação"
          title="Verifique a sua compreensão"
          lead="Cada opção tem feedback explicativo — inclusive as que não são as mais adequadas."
        />

        <Quiz
          id="mf3-bloco-5-quiz-quadrante"
          question="Num grupo, dois participantes contestam a nota de um trabalho. Verifica-se que o critério de avaliação só foi comunicado depois da entrega. Em que quadrante da Roda se situa, principalmente, este elemento?"
          options={[
            {
              text: "O Problema — o que está em causa é a nota atribuída ao trabalho.",
              feedback:
                "A nota é o objeto declarado, e pertence ao Problema. Mas o elemento identificado na pergunta é outro: o momento em que o critério foi comunicado. Isso diz respeito à forma como se decidiu e informou, não ao objeto da disputa.",
            },
            {
              text: "O Processo — a questão é a forma como o critério foi definido e comunicado.",
              correct: true,
              feedback:
                "Correto. O Processo abrange como se comunica e como se decide: sequência, transparência, quem foi ouvido e com que informação. Comunicar o critério só após a entrega é uma falha de processo, e é frequentemente aí que reside a força do conflito — não na nota em si.",
            },
            {
              text: "As Pessoas — o que está em jogo é o sentimento de injustiça dos participantes.",
              feedback:
                "O sentimento de injustiça é real e pertence às Pessoas, sendo importante mapeá-lo. Ainda assim, é o efeito; a pergunta incide sobre o elemento factual identificado, que é procedimental.",
            },
            {
              text: "O Contexto — a exigência de avaliação vem da entidade formadora, não do formador.",
              feedback:
                "A obrigatoriedade de avaliar é, de facto, um elemento de Contexto. Mas nada nesse contexto determinava que o critério fosse comunicado depois da entrega: essa é uma decisão de processo, dentro da margem do formador.",
            },
          ]}
          takeaway="Onde o conflito é declarado (Problema) raramente é onde ele é alimentado."
        />

        <Quiz
          id="mf3-bloco-5-quiz-diagnostico"
          question="Um formador quer mapear o quadrante «As Pessoas» num conflito entre dois participantes. Qual destas perguntas de diagnóstico serve melhor esse objetivo?"
          options={[
            {
              text: "«A reação de cada um é proporcional ao problema declarado? Se não, o que a explica?»",
              correct: true,
              feedback:
                "Correto. É uma pergunta central do quadrante Pessoas, porque a desproporção entre problema declarado e intensidade da reação aponta quase sempre para emoções acumuladas, história anterior ou necessidades identitárias em jogo.",
            },
            {
              text: "«Que recurso escasso está realmente em disputa entre os dois?»",
              feedback:
                "É uma boa pergunta de diagnóstico — mas do quadrante Problema. Identifica o objeto substantivo da disputa, não o que cada pessoa sente que está a defender.",
            },
            {
              text: "«Quem foi ouvido antes de esta decisão ser tomada?»",
              feedback:
                "Pertence ao Processo. Investiga participação e transparência na decisão, que é uma dimensão distinta do que cada pessoa sente e traz consigo.",
            },
            {
              text: "«Que pressões vindas da organização pesam sobre estes dois participantes?»",
              feedback:
                "Pertence ao Contexto. É informação valiosa e muitas vezes decisiva, mas descreve condicionantes externas, não a experiência emocional e relacional das partes.",
            },
          ]}
          takeaway="Cada quadrante tem o seu tipo de pergunta; usar a pergunta errada devolve o mapa errado."
        />

        <Quiz
          id="mf3-bloco-5-quiz-aplicacao"
          question="Depois de mapear um conflito nos quatro quadrantes, um formador conclui que o Contexto — hierarquia entre dois participantes na mesma organização — é o fator mais determinante. Qual é a utilização mais adequada desta conclusão?"
          options={[
            {
              text: "Concluir que o conflito não é resolúvel em formação e não intervir, dado que a causa principal é externa à sala.",
              feedback:
                "O reconhecimento de que o Contexto não é modificável pelo formador é correto, mas a inferência não é. A Roda serve para localizar onde há margem de atuação: normalmente no Processo e nas Pessoas. Não intervir deixa o conflito a operar com todos os seus efeitos sobre a aprendizagem do grupo.",
            },
            {
              text: "Levar o caso à coordenação da entidade formadora, uma vez que a causa é organizacional.",
              feedback:
                "Pode ser um passo legítimo em situações graves, e não está errado em absoluto. Mas transfere a questão em vez de usar o mapeamento: a Roda tinha acabado de mostrar dimensões — Processo e Pessoas — onde o formador podia agir de imediato e dentro das suas competências.",
            },
            {
              text: "Atuar nos quadrantes onde tem margem — sobretudo o Processo — desenhando procedimentos que reduzam o efeito da assimetria, e tomar o Contexto como condição a ter em conta.",
              correct: true,
              feedback:
                "Correto. Mapear o Contexto não serve para o alterar, mas para não desenhar intervenções que ele condena ao fracasso — por exemplo, esperar que a parte em posição hierárquica inferior discorde abertamente em plenário. O formador atua onde tem margem, informado por aquilo que não controla.",
            },
            {
              text: "Explicitar ao grupo que a hierarquia externa é a causa do conflito, para que todos compreendam a situação.",
              feedback:
                "Nomear publicamente a assimetria hierárquica expõe sobretudo a parte mais vulnerável e agrava o risco profissional que ela já corre. O mapeamento é um instrumento de análise do formador; não implica devolver ao grupo tudo o que revela.",
            },
          ]}
          takeaway="Mapear os quatro quadrantes serve para escolher onde intervir — e para reconhecer o que não se pode alterar."
        />
      </section>

      {/* F. APLICAÇÃO — Reflexão */}
      <section className="mt-12">
        <SectionHeading
          eyebrow="Aplicação"
          title="Aplique ao seu próprio contexto"
          lead="Este mapeamento prepara diretamente a Atividade 4 da Aprendizagem Ativa."
        />
        <ReflectionPrompt
          id="mf3-bloco-5-reflexao"
          question="Escolha um conflito real que tenha observado ou gerido numa formação e mapeie-o nos quatro quadrantes."
          hint="Escreva uma ou duas frases por quadrante: Problema (o que está em disputa), Pessoas (emoções, história, necessidades), Processo (como se comunicou e decidiu), Contexto (pressões externas). Termine indicando em que quadrante estava a intervir na altura — e em que quadrante, hoje, escolheria intervir."
          rows={9}
        />
        <SourceNote>
          Lantos, P. &amp; Harari, S.N. (2018). Roda de Mapeamento do Conflito. Mediare — adaptação
          de Mayer, B. (2000), <em>The Dynamics of Conflict Resolution: A Practitioner&rsquo;s
          Guide</em>, Jossey-Bass.
        </SourceNote>
      </section>
    </>
  );
}
