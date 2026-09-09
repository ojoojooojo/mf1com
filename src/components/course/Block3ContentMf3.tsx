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

/* ---------- Infográfico: os dois eixos e os cinco estilos ---------- */

const STYLES = [
  { label: "Competir", x: 90, y: 70 },
  { label: "Colaborar", x: 430, y: 70 },
  { label: "Comprometer", x: 260, y: 155 },
  { label: "Evitar", x: 90, y: 240 },
  { label: "Acomodar", x: 430, y: 240 },
];

function EstilosTkiSvg() {
  return (
    <svg
      viewBox="0 0 520 300"
      role="img"
      aria-label="Os cinco estilos de gestão de conflito posicionados nos eixos de assertividade e cooperação"
      className="w-full"
    >
      {/* eixos */}
      <line x1="46" y1="270" x2="46" y2="34" stroke="var(--border)" strokeWidth="2" />
      <line x1="46" y1="270" x2="500" y2="270" stroke="var(--border)" strokeWidth="2" />
      <polygon points="46,26 41,38 51,38" fill="var(--border)" />
      <polygon points="508,270 496,265 496,275" fill="var(--border)" />
      <text
        x="18"
        y="150"
        textAnchor="middle"
        fontSize="11"
        fill="var(--muted-foreground)"
        fontFamily="var(--font-sans)"
        transform="rotate(-90 18 150)"
      >
        Assertividade (afirmar os próprios interesses)
      </text>
      <text
        x="273"
        y="292"
        textAnchor="middle"
        fontSize="11"
        fill="var(--muted-foreground)"
        fontFamily="var(--font-sans)"
      >
        Cooperação (satisfazer os interesses do outro)
      </text>

      {/* estilos */}
      {STYLES.map((s) => {
        const mid = s.label === "Comprometer";
        return (
          <g key={s.label}>
            <rect
              x={s.x - 52}
              y={s.y - 18}
              width="104"
              height="36"
              rx="10"
              fill={mid ? "var(--accent-soft)" : "var(--primary-soft)"}
              stroke={mid ? "var(--accent)" : "var(--primary)"}
            />
            <text
              x={s.x}
              y={s.y + 5}
              textAnchor="middle"
              fontSize="12.5"
              fontWeight="600"
              fill={mid ? "var(--accent)" : "var(--primary)"}
              fontFamily="var(--font-sans)"
            >
              {s.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export function Block3ContentMf3() {
  return (
    <>
      {/* A. CONTEÚDO — Os dois eixos */}
      <section className="mt-10">
        <SectionHeading
          eyebrow="Conteúdo"
          title="Dois eixos, cinco estilos: o modelo de Thomas e Kilmann"
          lead="Toda a resposta a um conflito combina duas decisões: quanto afirmo do que é meu e quanto atendo do que é do outro."
        />
        <Prose>
          <p>
            Kenneth Thomas e Ralph Kilmann propuseram descrever o comportamento em conflito através
            de duas dimensões independentes. A <strong>assertividade</strong> é o grau em que a
            pessoa procura satisfazer os seus próprios interesses; a <strong>cooperação</strong> é o
            grau em que procura satisfazer os interesses do outro. Cruzando as duas, obtêm-se cinco
            estilos característicos de gestão de conflito.
          </p>
          <p>
            O modelo não classifica pessoas em tipos fixos. Descreve <em>modos</em> de resposta que
            qualquer pessoa usa em situações diferentes — ainda que cada um tenha um ou dois modos
            preferidos, para os quais tende a recorrer por defeito, mesmo quando a situação pediria
            outro.
          </p>
        </Prose>
        <Figure
          caption="Os cinco estilos de gestão de conflito posicionados nos eixos de assertividade (vertical) e cooperação (horizontal). Comprometer situa-se num nível intermédio de ambas as dimensões."
          source="Thomas, K.W. & Kilmann, R.H. (1974), Thomas-Kilmann Conflict Mode Instrument."
        >
          <EstilosTkiSvg />
        </Figure>
        <SourceNote>
          Thomas, K.W. &amp; Kilmann, R.H. (1974). Thomas-Kilmann Conflict Mode Instrument. Xicom.
        </SourceNote>
      </section>

      {/* B. CONTEÚDO — Os cinco estilos */}
      <section className="mt-12">
        <SectionHeading
          eyebrow="Conteúdo"
          title="Os cinco estilos, um a um"
          lead="Para cada estilo: o que é, um exemplo em formação, quando ajuda e quando se torna arriscado."
        />
        <LessonAccordion
          items={[
            {
              title: "Competir — assertivo, pouco cooperativo",
              content:
                "Afirmar a própria posição e procurar que prevaleça, mesmo à custa dos interesses do outro. Exemplo em formação: interromper de imediato um participante que ridiculariza um colega e declarar que aquele comportamento não é aceitável na sala. Adequado quando a decisão é urgente, quando estão em causa regras de segurança, dignidade ou avaliação, e quando a responsabilidade é inequivocamente do formador. Arriscado quando é usado por defeito em desacordos de conteúdo: gera silêncio no grupo, transforma discordância em confronto pessoal e faz com que as objeções passem a circular fora da sala.",
            },
            {
              title: "Colaborar — assertivo e cooperativo",
              content:
                "Procurar uma solução que atenda substancialmente aos interesses de ambos, explorando as razões por trás das posições. Exemplo em formação: dois participantes discordam sobre o método de um exercício e o formador explicita o que cada um protege — rigor e tempo — e reformula a tarefa para responder aos dois. Adequado quando a relação e o resultado importam ambos, quando há tempo, e quando as posições escondem interesses conciliáveis. Arriscado quando o tempo é curto ou o assunto é trivial: transforma um pormenor em processo demorado e cansa o grupo.",
            },
            {
              title: "Comprometer — nível intermédio de ambos",
              content:
                "Procurar uma solução parcialmente satisfatória para ambos, cedendo cada um parte do que pretendia. Exemplo em formação: o grupo quer terminar mais cedo e o formador precisa de cumprir os conteúdos; encurta-se o intervalo e faz-se uma síntese em vez de um exercício. Adequado quando os objetivos são incompatíveis mas ambos legítimos, e quando é preciso uma solução aceitável depressa. Arriscado quando é usado antes de explorar interesses: fecha o assunto numa solução medíocre que não satisfaz ninguém e que pode reabrir mais tarde.",
            },
            {
              title: "Evitar — pouco assertivo, pouco cooperativo",
              content:
                "Não abordar o conflito: adiar, contornar ou retirar-se. Exemplo em formação: ignorar um comentário irónico isolado e prosseguir a sessão, tratando o assunto no intervalo, se voltar a acontecer. Adequado quando a questão é de facto secundária, quando a tensão está demasiado alta para uma conversa produtiva no momento, ou quando adiar permite recolher informação. Arriscado como padrão: o conflito latente não desaparece, o grupo interpreta a ausência de reação como permissão, e o custo de intervir mais tarde é muito maior.",
            },
            {
              title: "Acomodar — pouco assertivo, muito cooperativo",
              content:
                "Ceder à posição do outro, colocando os interesses dele à frente dos próprios. Exemplo em formação: o grupo pede para inverter a ordem de dois módulos e o formador aceita, apesar de preferir a sequência original. Adequado quando o assunto importa claramente mais ao outro do que a si, quando se reconhece que estava errado, e quando preservar a relação vale mais do que aquele ponto. Arriscado quando é repetido: erode a credibilidade do formador, acumula ressentimento e ensina ao grupo que insistir é o caminho para obter tudo.",
            },
          ]}
        />
        <KeyIdea>
          Nenhum destes cinco estilos é universalmente o correto — e nenhum é intrinsecamente errado.
          A competência não está em dominar o «melhor» estilo, mas em reconhecer o que a situação
          pede e escolher em consequência, em vez de recorrer sempre ao modo preferido. Um formador
          que só colabora é tão limitado como um que só compete.
        </KeyIdea>
        <ContentCard tone="accent" title="Três perguntas antes de escolher o estilo">
          <ul className="mt-1 list-disc space-y-1 pl-5">
            <li>Que importância tem, aqui, o resultado — e que importância tem a relação?</li>
            <li>Quanto tempo tenho realmente para tratar isto?</li>
            <li>De quem é, legitimamente, esta decisão?</li>
          </ul>
        </ContentCard>
        <SourceNote>
          Thomas, K.W. &amp; Kilmann, R.H. (1974). Thomas-Kilmann Conflict Mode Instrument. Xicom.
        </SourceNote>
      </section>

      {/* C. CONTEÚDO — Prevenção ativa */}
      <section className="mt-12">
        <SectionHeading
          eyebrow="Conteúdo"
          title="Prevenção ativa: escolher o estilo antes de a situação escalar"
          lead="No MF2 viu quando se intervém; aqui a questão é como se escolhe intervir — e o quanto antes."
        />
        <Prose>
          <p>
            O módulo anterior distinguiu três momentos de atuação: prevenção, intervenção e
            pós-resolução. A prevenção ativa acrescenta a esse enquadramento uma ideia operacional:
            a escolha consciente de estilo é, em si, um instrumento de prevenção. Quanto mais cedo
            um sinal é lido, mais estilos continuam disponíveis; quanto mais tarde, menos escolha
            resta — um conflito já público e escalado deixa de admitir «evitar» e torna «colaborar»
            muito mais caro.
          </p>
          <p>
            Sinais precoces típicos numa formação: participações que cessam sem razão aparente,
            respostas cada vez mais curtas, um subgrupo que se senta sempre à parte, ironias breves
            que ninguém comenta, dois participantes que deixaram de se dirigir um ao outro,
            reclamações que chegam pelo intervalo e não pela sala. Nenhum destes é ainda conflito
            manifesto — e é precisamente por isso que são valiosos.
          </p>
        </Prose>
        <KeyIdea>
          Ler o sinal cedo não obriga a agir de forma dramática. Muitas vezes a prevenção ativa é
          apenas uma alteração discreta: mudar a composição de um grupo, reformular uma regra da
          tarefa para todos, ou uma conversa de dois minutos no intervalo.
        </KeyIdea>
        <SourceNote>
          Thomas, K.W. &amp; Kilmann, R.H. (1974). Thomas-Kilmann Conflict Mode Instrument. Xicom;
          Referencial IEFP/CNQF (2024), Módulo 3.
        </SourceNote>
      </section>

      {/* D. EXEMPLO — Cenário comparativo */}
      <section className="mt-12">
        <SectionHeading
          eyebrow="Exemplo"
          title="O mesmo desacordo, dois estilos diferentes"
          lead="Exercício de grupo. Dois participantes discordam sobre a abordagem a seguir."
        />
        <Scenario
          title="Versão 1 — Competir, sem necessidade"
          context="O formador Rui circula pela sala. Beatriz e Vasco discutem em voz alta se o exercício deve partir de dados reais ou de um caso simulado."
          lines={[
            {
              speaker: "Beatriz",
              text: "Com dados inventados isto não prova nada. Devíamos usar números da nossa empresa.",
            },
            {
              speaker: "Vasco",
              text: "E depois passamos a manhã a discutir os números em vez do método.",
            },
            {
              speaker: "Rui (formador)",
              text: "Parem os dois. O enunciado diz caso simulado, portanto é caso simulado. Avancem, já perdemos dez minutos.",
              side: "right",
            },
            {
              speaker: "Grupo",
              text: "(o exercício avança em silêncio; Beatriz não volta a propor nada e, na apresentação, o grupo entrega uma versão mínima do trabalho)",
            },
          ]}
          note="O estilo escolhido — competir — resolveria bem uma questão de segurança ou de dignidade. Aqui foi aplicado a um desacordo legítimo sobre método: fechou a discussão em segundos e comprou com isso a desistência de Beatriz e um trabalho pior."
        />
        <Scenario
          title="Versão 2 — Colaborar, ajustado à situação"
          context="Mesmo momento, mesmo desacordo."
          lines={[
            {
              speaker: "Rui (formador)",
              text: "Deixem-me perceber: Beatriz, o que a preocupa é a aplicabilidade do que sai daqui. Vasco, o que o preocupa é gastar o tempo a discutir dados em vez de método. É isso?",
              side: "right",
            },
            { speaker: "Beatriz", text: "É. Não quero sair daqui com um exercício de papel." },
            { speaker: "Vasco", text: "E eu não quero ficar sem tempo para a parte que interessa." },
            {
              speaker: "Rui (formador)",
              text: "Então façam assim: aplicam o método ao caso simulado, que está fechado e é rápido, e reservam os últimos dez minutos para a Beatriz dizer o que mudaria com os números reais dela. Ganham as duas coisas.",
              side: "right",
            },
          ]}
          note="Mesmo desacordo, estilo diferente. Rui explicitou o interesse por trás de cada posição e desenhou uma solução que atende aos dois — custou dois minutos e manteve as duas pessoas a trabalhar. Note-se que, se faltassem cinco minutos para o fim da sessão, comprometer seria a escolha mais sensata."
        />
        <SourceNote>
          Os diálogos são simulações pedagógicas construídas para este módulo, com nomes fictícios;
          ilustram os estilos descritos em Thomas &amp; Kilmann (1974).
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
          id="mf3-bloco-3-quiz-identificar-estilo"
          question="Um formador percebe que dois participantes deixaram de se dirigir um ao outro. Decide não abordar o assunto e continuar a sessão como planeado, esperando que passe. Que estilo está a usar?"
          options={[
            {
              text: "Acomodar — está a ceder aos interesses dos participantes.",
              feedback:
                "Acomodar implica ceder ativamente à posição do outro, colocando os interesses dele à frente dos próprios. Aqui não há cedência a nenhuma posição: o formador simplesmente não aborda o assunto, o que o coloca em baixa assertividade e baixa cooperação.",
            },
            {
              text: "Comprometer — está a procurar uma solução intermédia entre intervir e não intervir.",
              feedback:
                "Comprometer é uma solução parcial negociada entre as partes, com cedência mútua sobre um objeto concreto. Não abordar o assunto não é uma solução intermédia: é a ausência de abordagem, ou seja, evitar.",
            },
            {
              text: "Evitar — baixa assertividade e baixa cooperação: não aborda os seus interesses nem os dos participantes.",
              correct: true,
              feedback:
                "Correto. Evitar é a combinação de baixa assertividade com baixa cooperação — adiar, contornar ou retirar-se. Pode ser adequado se o sinal for isolado e a tensão estiver alta demais no momento; torna-se problemático se for o padrão, porque o conflito latente continua a operar.",
            },
            {
              text: "Colaborar — está a dar espaço ao grupo para resolver sozinho.",
              feedback:
                "Colaborar exige envolvimento ativo na exploração dos interesses de ambas as partes. Não há aqui nenhuma exploração: há inação com a expectativa de que a situação se resolva por si.",
            },
          ]}
          takeaway="Os dois eixos — assertividade e cooperação — são suficientes para identificar qualquer dos cinco estilos."
        />

        <Quiz
          id="mf3-bloco-3-quiz-quando-usar"
          question="Faltam quinze minutos para o fim da sessão. Um participante insiste em reabrir uma discussão sobre a ordem dos conteúdos, tema já debatido de manhã, e outros dois mostram sinais de impaciência. Qual o estilo mais adequado NESTA situação?"
          options={[
            {
              text: "Comprometer: reconhecer a questão, propor uma solução parcial rápida (registá-la para a sessão seguinte) e fechar a sessão como previsto.",
              correct: true,
              feedback:
                "É a melhor escolha aqui, e a razão é a restrição de tempo combinada com objetivos legítimos de ambos os lados: o participante quer ser ouvido, o grupo quer terminar. Uma solução parcial e imediata atende parcialmente aos dois e preserva a relação sem sacrificar o fecho.",
            },
            {
              text: "Colaborar: explorar a fundo os interesses de todos até encontrar uma solução que sirva a todos.",
              feedback:
                "Colaborar é o estilo mais completo, mas exige tempo — e nesta situação específica não há. Abrir agora uma exploração aprofundada de um tema já debatido penaliza os participantes impacientes e deixa a sessão sem fecho. Em outra situação, com tempo, esta seria a melhor escolha.",
            },
            {
              text: "Competir: lembrar que o assunto já foi decidido de manhã e encerrá-lo por autoridade.",
              feedback:
                "Resolve o tempo, mas paga um preço evitável: o assunto já tinha sido debatido, logo o participante não está a violar nenhuma regra — está a insistir. Encerrar por autoridade transforma insistência em confronto e provavelmente devolve o tema pelas costas. Competir seria a escolha certa se estivesse em causa segurança ou dignidade.",
            },
            {
              text: "Acomodar: aceitar reabrir a discussão porque o participante insiste.",
              feedback:
                "Ceder aqui satisfaz uma pessoa contra o interesse manifesto dos restantes e do próprio formador, num tema já tratado. Acomodar seria adequado se o assunto importasse claramente mais ao outro e pouco a si — não é o caso quando dois participantes já mostram impaciência.",
            },
          ]}
          takeaway="A pergunta nunca é «qual é o melhor estilo», mas «o que é que esta situação, com este tempo e estas pessoas, pede»."
        />

        <Quiz
          id="mf3-bloco-3-quiz-prevencao"
          question="Qual das seguintes observações é o sinal precoce mais claro de um conflito que pede prevenção ativa?"
          options={[
            {
              text: "Um participante fez uma pergunta difícil sobre o conteúdo e pediu uma fonte para a afirmação do formador.",
              feedback:
                "Isto não é sinal de conflito: é participação exigente, e habitualmente boa notícia. Ler pedidos de rigor como hostilidade é um erro frequente — e leva a intervenções que criam o conflito que se pretendia prevenir.",
            },
            {
              text: "Dois participantes discordaram abertamente sobre um exercício, discutiram cinco minutos e chegaram a uma solução comum.",
              feedback:
                "Um desacordo explícito, discutido e resolvido pelas próprias pessoas é sinal de um grupo saudável, não de conflito em incubação. Note a diferença face à opção correta: aqui o desacordo esteve visível e fechou; lá está invisível e continua ativo.",
            },
            {
              text: "O grupo pediu para antecipar o intervalo em dez minutos.",
              feedback:
                "É um pedido de organização, não um sinal de conflito. Tratá-lo como sintoma de tensão é sobre-interpretar — e a prevenção ativa perde utilidade quando se aplica a tudo, porque deixa de distinguir o que merece atenção.",
            },
            {
              text: "Um subgrupo que antes participava passou a sentar-se à parte, responde por monossílabos e faz comentários irónicos breves que ninguém comenta.",
              correct: true,
              feedback:
                "É o sinal mais claro: há mudança de padrão, retirada de participação e ironia não endereçada — conflito ainda não manifesto, mas já a operar. É exatamente o momento em que todos os estilos continuam disponíveis e uma medida discreta (recompor grupos, uma conversa breve no intervalo) resolve com custo baixo.",
            },
          ]}
        />
      </section>

      {/* F. APLICAÇÃO — Reflexão */}
      <section className="mt-12">
        <SectionHeading
          eyebrow="Aplicação"
          title="Leve isto à sua prática"
          lead="Identificar o seu estilo por defeito é o primeiro passo para deixar de o usar automaticamente."
        />
        <ReflectionPrompt
          id="mf3-bloco-3-reflexao"
          question="Qual dos cinco estilos é o seu modo por defeito em conflito na formação — e em que situação concreta ele já lhe saiu caro?"
          hint="Nomeie o estilo, descreva brevemente um episódio real, indique que estilo teria sido mais adequado naquela situação específica e diga que sinal poderia ter lido mais cedo."
          rows={7}
        />
        <SourceNote>
          Thomas, K.W. &amp; Kilmann, R.H. (1974). Thomas-Kilmann Conflict Mode Instrument. Xicom;
          Referencial IEFP/CNQF (2024), Módulo 3 — «Estratégias de Resolução de Conflitos na
          Formação».
        </SourceNote>
      </section>
    </>
  );
}
