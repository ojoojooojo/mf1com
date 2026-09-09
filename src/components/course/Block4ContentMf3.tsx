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

/* ---------- Infográfico: o modelo transacional de avaliação ---------- */

function AvaliacaoStressSvg() {
  return (
    <svg
      viewBox="0 0 560 260"
      role="img"
      aria-label="Sequência do modelo transacional: acontecimento, avaliação primária, avaliação secundária e resposta"
      className="w-full"
    >
      {/* acontecimento */}
      <rect
        x="10"
        y="100"
        width="112"
        height="58"
        rx="12"
        fill="var(--muted)"
        stroke="var(--border)"
      />
      <text
        x="66"
        y="124"
        textAnchor="middle"
        fontSize="12"
        fontWeight="600"
        fill="var(--muted-foreground)"
        fontFamily="var(--font-sans)"
      >
        Incidente
      </text>
      <text
        x="66"
        y="141"
        textAnchor="middle"
        fontSize="10.5"
        fill="var(--muted-foreground)"
        fontFamily="var(--font-sans)"
      >
        na sala
      </text>

      {/* avaliação primária */}
      <rect
        x="158"
        y="100"
        width="128"
        height="58"
        rx="12"
        fill="var(--primary-soft)"
        stroke="var(--primary)"
      />
      <text
        x="222"
        y="122"
        textAnchor="middle"
        fontSize="12"
        fontWeight="600"
        fill="var(--primary)"
        fontFamily="var(--font-sans)"
      >
        Avaliação primária
      </text>
      <text
        x="222"
        y="139"
        textAnchor="middle"
        fontSize="10.5"
        fill="var(--primary)"
        fontFamily="var(--font-sans)"
      >
        ameaça, desafio ou nada?
      </text>

      {/* avaliação secundária */}
      <rect
        x="322"
        y="100"
        width="128"
        height="58"
        rx="12"
        fill="var(--accent-soft)"
        stroke="var(--accent)"
      />
      <text
        x="386"
        y="122"
        textAnchor="middle"
        fontSize="12"
        fontWeight="600"
        fill="var(--accent)"
        fontFamily="var(--font-sans)"
      >
        Avaliação secundária
      </text>
      <text
        x="386"
        y="139"
        textAnchor="middle"
        fontSize="10.5"
        fill="var(--accent)"
        fontFamily="var(--font-sans)"
      >
        tenho recursos para isto?
      </text>

      {/* resposta */}
      <rect
        x="486"
        y="100"
        width="64"
        height="58"
        rx="12"
        fill="var(--success-soft)"
        stroke="var(--success)"
      />
      <text
        x="518"
        y="133"
        textAnchor="middle"
        fontSize="11.5"
        fontWeight="600"
        fill="var(--success)"
        fontFamily="var(--font-sans)"
      >
        Resposta
      </text>

      {/* setas */}
      {[
        { x1: 124, x2: 156 },
        { x1: 288, x2: 320 },
        { x1: 452, x2: 484 },
      ].map(({ x1, x2 }) => (

        <g key={x1}>
          <line
            x1={x1}
            y1="129"
            x2={x2 - 6}
            y2="129"
            stroke="var(--border)"
            strokeWidth="2"
          />
          <polygon points={`${x2},129 ${x2 - 8},124 ${x2 - 8},134`} fill="var(--border)" />
        </g>
      ))}

      {/* reavaliação */}
      <path
        d="M518 168 C 518 214, 222 214, 222 166"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="1.6"
        strokeDasharray="5 5"
      />
      <polygon points="222,160 217,172 227,172" fill="var(--accent)" />
      <text
        x="370"
        y="230"
        textAnchor="middle"
        fontSize="10.5"
        fill="var(--muted-foreground)"
        fontFamily="var(--font-sans)"
      >
        reavaliação: a resposta e o seu efeito alteram a avaliação inicial
      </text>

      <text
        x="66"
        y="60"
        textAnchor="middle"
        fontSize="10.5"
        fill="var(--muted-foreground)"
        fontFamily="var(--font-sans)"
      >
        O stress não está aqui…
      </text>
      <text
        x="304"
        y="60"
        textAnchor="middle"
        fontSize="10.5"
        fill="var(--muted-foreground)"
        fontFamily="var(--font-sans)"
      >
        … nasce da relação entre estas duas avaliações
      </text>
    </svg>
  );
}

export function Block4ContentMf3() {
  return (
    <>
      {/* A. CONTEÚDO — Modelo transacional */}
      <section className="mt-10">
        <SectionHeading
          eyebrow="Conteúdo"
          title="O stress não está no acontecimento: está na avaliação que fazemos dele"
          lead="Lazarus e Folkman mostraram que a mesma situação gera stress em alguém e não gera em outra pessoa — porque o que conta é a avaliação, não o facto."
        />
        <Prose>
          <p>
            Richard Lazarus e Susan Folkman propuseram um modelo <strong>transacional</strong> do
            stress: o stress não é uma propriedade da situação nem uma característica fixa da pessoa,
            mas o resultado da <em>relação</em> entre as exigências percebidas de uma situação e os
            recursos que a pessoa acredita ter para lhes responder. Um pedido difícil de um formando
            pode ser vivido por um formador como uma ameaça iminente e por outro como um problema
            interessante — a diferença está na avaliação.
          </p>
          <p>
            Esta avaliação faz-se em dois movimentos, rápidos e em grande parte não conscientes. Na{" "}
            <strong>avaliação primária</strong>, a pessoa julga o que a situação significa para si:
            é irrelevante, é benigna, ou é significativa? E, se for significativa, é uma{" "}
            <em>ameaça</em> (risco de dano à sua competência, autoridade ou imagem), um{" "}
            <em>desafio</em> (exigente mas com possibilidade de ganho) ou um <em>dano já
            consumado</em>? Na <strong>avaliação secundária</strong>, a pergunta muda de objeto:
            deixa de ser sobre a situação e passa a ser sobre si — tenho competências, tempo, apoio
            e margem para lidar com isto?
          </p>
          <p>
            O stress intenso surge tipicamente quando a avaliação primária diz «ameaça» e a
            secundária diz «não tenho como responder». O mesmo incidente lido como «desafio» com
            recursos suficientes produz ativação, não sofrimento. E porque a resposta e o seu efeito
            alimentam de novo o ciclo — <strong>reavaliação</strong> —, aquilo que o formador faz nos
            primeiros segundos altera a forma como continuará a ler a situação.
          </p>
        </Prose>
        <Figure
          caption="O modelo transacional aplicado a um incidente em sala: o mesmo facto produz respostas diferentes segundo o resultado das duas avaliações; a reavaliação torna o processo circular."
          source="Lazarus, R.S. & Folkman, S. (1984), Stress, Appraisal, and Coping, Springer."
        >
          <AvaliacaoStressSvg />
        </Figure>
        <ContentCard tone="primary" title="As duas perguntas, em linguagem de sala de formação">
          <ul className="mt-1 list-disc space-y-1 pl-5">
            <li>
              <strong>Avaliação primária:</strong> «o que é que isto está a pôr em causa?» — o
              programa, o tempo, a minha autoridade, a aprendizagem do grupo, nada de relevante?
            </li>
            <li>
              <strong>Avaliação secundária:</strong> «o que é que eu tenho para lidar com isto?» —
              experiência com situações parecidas, tempo até ao intervalo, apoio da coordenação,
              relação já construída com aquele participante.
            </li>
          </ul>
        </ContentCard>
        <SourceNote>
          Lazarus, R.S. &amp; Folkman, S. (1984). <em>Stress, Appraisal, and Coping</em>. Springer.
        </SourceNote>
      </section>

      {/* B. CONTEÚDO — Distorções */}
      <section className="mt-12">
        <SectionHeading
          eyebrow="Conteúdo"
          title="O que o stress faz à leitura do conflito"
          lead="Sob stress elevado, o formador não perde apenas a calma: perde informação."
        />
        <Prose>
          <p>
            Quando a avaliação primária classifica um incidente como ameaça e a secundária conclui
            que os recursos são insuficientes, a atenção reorganiza-se para uma resposta rápida. Essa
            reorganização é útil face a perigo físico e desadequada face a um conflito de sala, porque
            estreita exatamente aquilo de que a intervenção depende: a informação disponível sobre o
            que está a acontecer.
          </p>
        </Prose>
        <LessonAccordion
          items={[
            {
              title: "Visão em túnel",
              content:
                "A atenção fixa-se no elemento percebido como ameaçador — a frase, o tom, o participante — e deixa de registar o resto: quem mais reagiu, o que aconteceu nos cinco minutos anteriores, se o comentário respondia a algo dito por outro colega. O formador decide com uma fração dos dados e depois lembra-se do episódio por essa fração.",
            },
            {
              title: "Redução da empatia",
              content:
                "Tomar a perspetiva do outro exige capacidade de processamento disponível. Sob stress elevado essa capacidade está ocupada com a própria ameaça, pelo que a pergunta «o que estará a passar-se com esta pessoa?» simplesmente não é formulada. Não é falta de vontade nem de carácter: é indisponibilidade momentânea de um recurso.",
            },
            {
              title: "Leitura enviesada das intenções",
              content:
                "Comportamentos ambíguos passam a ser lidos como hostis e deliberados. Um participante que consulta o telemóvel torna-se «alguém que está a desafiar-me»; um pedido de esclarecimento repetido torna-se «alguém que quer expor-me». O MF2 chamou a isto viés de atribuição — o stress é um dos seus principais amplificadores.",
            },
            {
              title: "Reações defensivas ou de evitamento",
              content:
                "A resposta polariza-se em dois extremos: ou intervir de imediato com dureza desproporcionada (defesa), ou fingir que nada se passou e prosseguir (evitamento). Ambos são respostas ao próprio estado interno, não à situação. Reconhecem-se por um sinal comum: são escolhidos em menos de dois segundos, sem que nenhuma alternativa tenha sido considerada.",
            },
          ]}
        />
        <KeyIdea>
          Sob stress elevado, a pergunta a fazer não é «como respondo a isto?», mas «estou, neste
          momento, em condições de responder a isto?». O erro mais comum não é escolher mal a
          intervenção: é intervir com uma leitura da situação que o próprio stress já distorceu.
        </KeyIdea>
        <SourceNote>
          Lazarus, R.S. &amp; Folkman, S. (1984). <em>Stress, Appraisal, and Coping</em>. Springer.
        </SourceNote>
      </section>

      {/* C. CONTEÚDO — Autorregulação aplicada */}
      <section className="mt-12">
        <SectionHeading
          eyebrow="Conteúdo"
          title="Autorregulação no momento anterior à intervenção"
          lead="A autorregulação foi apresentada no Bloco 1 como dimensão da inteligência emocional. Aqui interessa um uso muito específico: os segundos entre o incidente e a resposta."
        />
        <Prose>
          <p>
            No Bloco 1, a autorregulação foi definida como a capacidade de gerir os próprios estados
            emocionais em vez de ser conduzido por eles. Neste bloco, essa capacidade tem um ponto de
            aplicação delimitado: o intervalo entre perceber o incidente e agir sobre ele. É nesse
            intervalo que se joga a diferença entre reagir a partir da avaliação distorcida e
            responder a partir de uma <em>reavaliação</em>.
          </p>
          <p>
            Praticamente, a autorregulação neste momento cumpre três funções: interrompe a resposta
            automática, torna consciente o resultado das duas avaliações («estou a ler isto como
            ameaça — será?»; «que recursos tenho de facto?») e devolve capacidade de atenção
            suficiente para voltar a ver o grupo, não apenas a ameaça.
          </p>
        </Prose>
        <ContentCard tone="accent" title="Recursos práticos para o intervalo antes de responder">
          <ul className="mt-1 list-disc space-y-1 pl-5">
            <li>
              <strong>Nomear internamente o estado:</strong> «estou irritado», «senti-me exposto».
              Nomear é o passo mínimo da autoconsciência e reduz a força da reação automática.
            </li>
            <li>
              <strong>Comprar tempo legitimamente:</strong> uma pausa respiratória, beber água,
              anunciar «vamos fazer cinco minutos de intervalo e depois retomamos este ponto». Adiar
              a resposta não é evitar o conflito — é recusar responder em más condições.
            </li>
            <li>
              <strong>Refazer a avaliação primária:</strong> «o que está realmente em causa?» A
              maioria dos incidentes de sala ameaça a imagem do formador muito mais do que a
              aprendizagem do grupo — e essa distinção altera a resposta.
            </li>
            <li>
              <strong>Refazer a avaliação secundária:</strong> «que recursos tenho?» Frequentemente
              existem mais do que o estado de ameaça deixa ver: tempo, relação prévia, possibilidade
              de tratar o assunto em privado, apoio de coordenação.
            </li>
            <li>
              <strong>Recuperar o dado perdido:</strong> uma pergunta aberta ao participante devolve
              a informação que a visão em túnel eliminou, antes de qualquer decisão.
            </li>
          </ul>
        </ContentCard>
        <KeyIdea>
          A pausa de autorregulação não serve para «acalmar» no sentido de suprimir a emoção. Serve
          para recuperar dados: a emoção continua presente, mas deixa de ser a única fonte de
          informação sobre o que se passou.
        </KeyIdea>
        <SourceNote>
          Lazarus, R.S. &amp; Folkman, S. (1984). <em>Stress, Appraisal, and Coping</em>. Springer.
          A autorregulação como dimensão da inteligência emocional foi tratada no Bloco 1 a partir de
          Goleman, D. (1995), <em>Emotional Intelligence</em>, Bantam Books.
        </SourceNote>
      </section>

      {/* D. EXEMPLO — Cenário comparativo */}
      <section className="mt-12">
        <SectionHeading
          eyebrow="Exemplo"
          title="O mesmo incidente crítico, dois estados internos"
          lead="Não há aqui uma resposta certa universal — há duas trajetórias plausíveis com consequências diferentes."
        />
        <Scenario
          title="Versão 1 — Responder a partir da ameaça"
          context="Quarta sessão, fim da tarde. A formadora Inês está atrasada no programa e sabe que amanhã há avaliação. Miguel, participante, interrompe a explicação."
          lines={[
            {
              speaker: "Miguel",
              text: "Desculpe, mas isto que está a dizer não é o que fazemos na prática. Onde trabalho, ninguém faz assim.",
            },
            {
              speaker: "Inês (formadora)",
              text: "Miguel, esta é a terceira vez hoje. O conteúdo é este, está no referencial, e eu tenho de o dar até amanhã. Se quiser discutir a prática da sua empresa, fica para outra altura.",
              side: "right",
            },
            {
              speaker: "Miguel",
              text: "(cala-se, cruza os braços e não participa no resto da sessão)",
            },
            {
              speaker: "Grupo",
              text: "(duas pessoas que ia levantar dúvidas semelhantes já não as levantam; a tensão prolonga-se na sessão seguinte)",
            },
          ]}
          note="A avaliação primária de Inês leu a intervenção como ameaça à sua autoridade — reforçada pela pressão de tempo e pela avaliação secundária «não tenho margem». O que se perdeu foi informação: Miguel podia estar a trazer um caso real valioso, e havia duas pessoas com a mesma dúvida. A resposta foi coerente com o estado interno, não com a situação."
        />
        <Scenario
          title="Versão 2 — Uma pausa antes de responder"
          context="Mesmo momento, mesma frase, mesma pressão de tempo."
          lines={[
            {
              speaker: "Miguel",
              text: "Desculpe, mas isto que está a dizer não é o que fazemos na prática. Onde trabalho, ninguém faz assim.",
            },
            {
              speaker: "Inês (formadora)",
              text: "(pausa de dois segundos; nota internamente: «senti-me posta em causa — o que está realmente em risco é o meu tempo, não o conteúdo»)",
              side: "right",
            },
            {
              speaker: "Inês (formadora)",
              text: "Isso interessa-me. Diga-me em duas frases como é que fazem — quero perceber se é uma variante do mesmo princípio ou se é outra coisa.",
              side: "right",
            },
            {
              speaker: "Miguel",
              text: "Nós saltamos a fase de registo. Fazemos direto, porque não temos sistema informático.",
            },
            {
              speaker: "Inês (formadora)",
              text: "Percebo. O princípio é o mesmo, o que muda é o suporte. Vamos usar o seu caso como exemplo quando chegarmos ao ponto seguinte — assim tratamos as duas coisas sem perder tempo.",
              side: "right",
            },
          ]}
          note="A pausa não eliminou a irritação nem o atraso no programa: recuperou dados. A reavaliação («ameaça à imagem» → «restrição de tempo») abriu uma resposta que integrou o contributo de Miguel em vez de o excluir. Note-se que, se a intervenção de Miguel fosse desrespeitosa para com um colega, uma resposta firme e imediata seria adequada — a pausa serve para distinguir os dois casos, não para adiar sempre."
        />
        <SourceNote>
          Os diálogos são simulações pedagógicas construídas para este módulo, com nomes fictícios;
          ilustram o processo de avaliação e reavaliação descrito em Lazarus &amp; Folkman (1984).
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
          id="mf3-bloco-4-quiz-avaliacao-primaria"
          question="Um formador ouve um participante dizer em voz alta que «este exercício é uma perda de tempo». Pensa imediatamente: «isto vai desautorizar-me diante do grupo». Que passo do modelo transacional acabou de ocorrer?"
          options={[
            {
              text: "Avaliação primária: classificou a situação como ameaça, ou seja, como significativa e com risco de dano para si.",
              correct: true,
              feedback:
                "Correto. A avaliação primária responde à pergunta «o que significa isto para mim?» e classifica a situação como irrelevante, benigna ou significativa — e, neste último caso, como ameaça, desafio ou dano. «Vai desautorizar-me» é precisamente uma leitura de ameaça.",
            },
            {
              text: "Avaliação secundária: está a julgar se consegue lidar com a situação.",
              feedback:
                "A avaliação secundária tem outro objeto: os recursos próprios («tenho competências, tempo, apoio para isto?»). O pensamento descrito ainda incide sobre o que a situação significa, não sobre o que o formador tem para lhe responder — essa etapa vem imediatamente depois.",
            },
            {
              text: "Reavaliação: está a corrigir uma leitura anterior à luz de nova informação.",
              feedback:
                "A reavaliação pressupõe que já houve uma avaliação, uma resposta e algum efeito observável que obriga a revê-la. Aqui trata-se do primeiro julgamento sobre o incidente, e não de uma revisão.",
            },
            {
              text: "Autorregulação: está a gerir o seu estado emocional face ao incidente.",
              feedback:
                "A autorregulação seria o passo seguinte — interromper a resposta automática e reexaminar a leitura feita. O que está descrito é a leitura em si, que é o que a autorregulação vem depois questionar.",
            },
          ]}
          takeaway="Primária: o que isto significa para mim. Secundária: o que eu tenho para lidar com isto."
        />

        <Quiz
          id="mf3-bloco-4-quiz-avaliacao-secundaria"
          question="Dois formadores enfrentam o mesmo incidente e ambos o classificam como significativo. Um vive stress intenso; o outro sente-se apenas exigido. Qual é, segundo o modelo transacional, a explicação mais provável desta diferença?"
          options={[
            {
              text: "O segundo formador é naturalmente menos emotivo — trata-se de uma diferença de temperamento.",
              feedback:
                "O modelo transacional foi proposto precisamente contra explicações puramente disposicionais. O stress não é uma característica fixa da pessoa nem uma propriedade da situação: emerge da relação entre exigências percebidas e recursos percebidos, que variam de situação para situação na mesma pessoa.",
            },
            {
              text: "A avaliação secundária diverge: o segundo reconhece recursos suficientes (experiência, tempo, relação com o grupo) para responder à exigência.",
              correct: true,
              feedback:
                "Correto. Com a mesma avaliação primária de significância, é a avaliação secundária que decide o resultado: recursos percebidos como suficientes produzem uma leitura de desafio e ativação; recursos percebidos como insuficientes produzem ameaça e stress intenso.",
            },
            {
              text: "O primeiro formador fez uma avaliação primária errada e o segundo fez a correta.",
              feedback:
                "O modelo não trata as avaliações como certas ou erradas em abstrato — e, no caso descrito, ambos classificaram a situação como significativa. A divergência tem de estar no segundo momento, o dos recursos, não no primeiro.",
            },
            {
              text: "O incidente é objetivamente mais grave para o primeiro formador, dado o seu contexto profissional.",
              feedback:
                "É uma hipótese plausível na vida real, mas não explica o caso enunciado: o incidente é o mesmo e ambos o avaliaram como significativo. Dentro do modelo, a diferença de intensidade com igual avaliação primária remete para os recursos percebidos.",
            },
          ]}
          takeaway="Igual avaliação primária, stress diferente: a variável em jogo é o balanço de recursos."
        />

        <Quiz
          id="mf3-bloco-4-quiz-distorcao"
          question="Uma formadora, sob forte pressão, decide em segundos que um participante que consulta o telemóvel «está a desafiá-la» e repreende-o publicamente. Mais tarde descobre que ele estava a confirmar um dado que ela própria tinha pedido. Que distorção associada ao stress explica melhor o que aconteceu?"
          options={[
            {
              text: "Leitura enviesada das intenções: um comportamento ambíguo foi interpretado como hostil e deliberado.",
              correct: true,
              feedback:
                "Correto. Sob stress elevado, comportamentos ambíguos tendem a ser atribuídos a intenções hostis e deliberadas — o mecanismo de atribuição que o MF2 descreveu, aqui amplificado. Consultar o telemóvel admitia várias leituras; o estado interno selecionou a mais ameaçadora.",
            },
            {
              text: "Redução da empatia: ficou sem capacidade disponível para considerar a perspetiva do participante.",
              feedback:
                "A redução da empatia está certamente presente e é parte do quadro — mas descreve a indisponibilidade de tomar a perspetiva do outro, não o ato de atribuir uma intenção concreta. O que decidiu a repreensão foi a atribuição de hostilidade a um comportamento ambíguo.",
            },
            {
              text: "Visão em túnel: fixou-se num elemento e deixou de registar o contexto envolvente.",
              feedback:
                "A visão em túnel também opera aqui, ao reduzir a atenção ao telemóvel e apagar o pedido que ela própria tinha feito. Ainda assim, o passo decisivo — transformar um gesto ambíguo em desafio intencional — é atribuição de intenções, que a visão em túnel apenas facilita.",
            },
            {
              text: "Reação defensiva: respondeu para proteger a sua posição em vez de responder à situação.",
              feedback:
                "A repreensão pública é, de facto, uma reação defensiva — mas a reação é a consequência, não a distorção que a origina. A pergunta incide sobre o erro de leitura que tornou a defesa aparentemente justificada.",
            },
          ]}
          takeaway="O stress raramente inventa comportamentos: escolhe, entre as leituras possíveis, a mais ameaçadora."
        />
      </section>

      {/* F. APLICAÇÃO — Reflexão */}
      <section className="mt-12">
        <SectionHeading
          eyebrow="Aplicação"
          title="Aplique ao seu próprio contexto"
          lead="A resposta fica guardada na sua conta e acompanha-o até à Síntese Final."
        />
        <ReflectionPrompt
          id="mf3-bloco-4-reflexao"
          question="Recorde um momento de formação em que interveio num conflito sob pressão e, mais tarde, teria feito diferente."
          hint="Descreva o incidente em duas ou três frases. Depois responda: como classificou a situação no momento (ameaça, desafio, irrelevante) e que recursos achou que não tinha? Que informação lhe faltava e que uma pausa lhe teria devolvido? Que sinal, em si mesmo, quer aprender a reconhecer como aviso de que não está em condições de responder?"
          rows={8}
        />
        <SourceNote>
          Lazarus, R.S. &amp; Folkman, S. (1984). <em>Stress, Appraisal, and Coping</em>. Springer;
          Goleman, D. (1995). <em>Emotional Intelligence</em>. Bantam Books (autorregulação, tratada
          no Bloco 1).
        </SourceNote>
      </section>
    </>
  );
}
