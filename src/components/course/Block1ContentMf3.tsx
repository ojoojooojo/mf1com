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

/* ---------- Infográfico: as cinco dimensões de Goleman ---------- */

const DIMENSIONS = [
  { label: "Autoconsciência", note: "Reconhecer" },
  { label: "Autorregulação", note: "Gerir" },
  { label: "Motivação", note: "Persistir" },
  { label: "Empatia", note: "Compreender" },
  { label: "Competências sociais", note: "Relacionar" },
];

function DimensoesSvg() {
  return (
    <svg viewBox="0 0 560 260" role="img" aria-label="As cinco dimensões da inteligência emocional segundo Goleman" className="w-full">
      <text
        x="280"
        y="22"
        textAnchor="middle"
        fontSize="12"
        fill="var(--muted-foreground)"
        fontFamily="var(--font-sans)"
      >
        Competências intrapessoais (sobre si) → Competências interpessoais (com os outros)
      </text>
      {DIMENSIONS.map((d, i) => {
        const x = 20 + i * 106;
        const intra = i < 3;
        return (
          <g key={d.label}>
            <rect
              x={x}
              y="46"
              width="96"
              height="120"
              rx="12"
              fill={intra ? "var(--primary-soft)" : "var(--accent-soft)"}
              stroke={intra ? "var(--primary)" : "var(--accent)"}
            />
            <circle
              cx={x + 48}
              cy="78"
              r="16"
              fill="var(--surface)"
              stroke={intra ? "var(--primary)" : "var(--accent)"}
            />
            <text
              x={x + 48}
              y="83"
              textAnchor="middle"
              fontSize="13"
              fill={intra ? "var(--primary)" : "var(--accent)"}
              fontFamily="var(--font-sans)"
            >
              {i + 1}
            </text>
            <foreignObject x={x + 6} y="100" width="84" height="60">
              <div
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "11px",
                  lineHeight: 1.25,
                  textAlign: "center",
                  color: "var(--foreground)",
                  fontWeight: 600,
                }}
              >
                {d.label}
                <div style={{ fontWeight: 400, opacity: 0.7 }}>{d.note}</div>
              </div>
            </foreignObject>
          </g>
        );
      })}
      <line
        x1="20"
        y1="196"
        x2="330"
        y2="196"
        stroke="var(--primary)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <line
        x1="342"
        y1="196"
        x2="540"
        y2="196"
        stroke="var(--accent)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <text
        x="175"
        y="216"
        textAnchor="middle"
        fontSize="11"
        fill="var(--primary)"
        fontFamily="var(--font-sans)"
      >
        Trabalhadas neste Bloco 1
      </text>
      <text
        x="441"
        y="216"
        textAnchor="middle"
        fontSize="11"
        fill="var(--accent)"
        fontFamily="var(--font-sans)"
      >
        Trabalhadas no Bloco 2
      </text>
      <text
        x="280"
        y="244"
        textAnchor="middle"
        fontSize="11"
        fill="var(--muted-foreground)"
        fontFamily="var(--font-sans)"
      >
        Modelo de Goleman (1995), a partir do conceito de Salovey &amp; Mayer (1990)
      </text>
    </svg>
  );
}

export function Block1ContentMf3() {
  return (
    <>
      {/* A. CONTEÚDO — O conceito de inteligência emocional */}
      <section className="mt-10">
        <SectionHeading
          eyebrow="Conteúdo"
          title="O que é inteligência emocional — e porque não é o mesmo que QI"
          lead="Antes de gerir o conflito dos outros, há um trabalho anterior: perceber o que se passa consigo."
        />
        <Prose>
          <p>
            O termo «inteligência emocional» foi proposto academicamente por Peter Salovey e John
            Mayer em 1990, que a definiram como a capacidade de monitorizar os próprios
            sentimentos e os dos outros, de os distinguir entre si e de usar essa informação para
            orientar o pensamento e a ação. Cinco anos depois, Daniel Goleman popularizou o
            conceito e argumentou que estas competências podem pesar mais no desempenho
            profissional e relacional do que o quociente de inteligência.
          </p>
          <p>
            A distinção é importante e frequentemente mal feita. O QI mede sobretudo capacidade de
            raciocínio abstrato, verbal e lógico-matemático, é relativamente estável ao longo da
            vida adulta e diz pouco sobre como uma pessoa se comporta quando é contrariada em
            público. A inteligência emocional refere-se ao reconhecimento e à gestão de emoções —
            próprias e alheias — e, ao contrário do QI, é largamente aprendível e treinável. Um
            formador tecnicamente brilhante pode gerir mal uma sala tensa; a competência que falta
            aí não é cognitiva, é emocional.
          </p>
        </Prose>
        <KeyIdea>
          Não confunda inteligência emocional com «ser simpático» ou «não se irritar». Ter
          inteligência emocional não é não sentir raiva, frustração ou desconforto — é reconhecer
          essas emoções com clareza e decidir o que fazer com elas, em vez de ser conduzido por
          elas.
        </KeyIdea>
        <SourceNote>
          Salovey, P. &amp; Mayer, J.D. (1990). Emotional Intelligence. Imagination, Cognition, and
          Personality, 9(3), 185-211; Goleman, D. (1995). Emotional Intelligence: Why It Can Matter
          More Than IQ. Bantam Books.
        </SourceNote>
      </section>

      {/* B. CONTEÚDO — As cinco dimensões */}
      <section className="mt-12">
        <SectionHeading
          eyebrow="Conteúdo"
          title="As cinco dimensões do modelo de Goleman"
          lead="Três olham para dentro; duas olham para a relação com os outros."
        />
        <Figure
          caption="As cinco dimensões da inteligência emocional. As três primeiras são intrapessoais e são o foco deste bloco; a empatia e as competências sociais têm bloco próprio a seguir."
          source="Goleman, D. (1995), Emotional Intelligence."
        >
          <DimensoesSvg />
        </Figure>
        <LessonAccordion
          items={[
            {
              title: "1. Autoconsciência (self-awareness)",
              content:
                "Reconhecer, no momento em que acontece, o que se está a sentir — e reconhecer também o efeito que esse estado tem no julgamento e no comportamento. É a dimensão fundadora: sem ela, as restantes não têm sobre o que trabalhar, porque não é possível regular uma emoção que não se identificou.",
            },
            {
              title: "2. Autorregulação (self-regulation)",
              content:
                "Gerir estados internos e impulsos em vez de agir automaticamente sobre eles. Não significa suprimir a emoção — significa introduzir um intervalo entre o estímulo e a resposta, dentro do qual há escolha. É a dimensão mais visível para os outros num momento de tensão.",
            },
            {
              title: "3. Motivação",
              content:
                "A orientação para objetivos por razões que vão além da recompensa externa: iniciativa, compromisso, persistência face a contrariedades. Num formador traduz-se em não desistir de um grupo difícil ao segundo dia e em manter o propósito pedagógico quando a sessão não corre como planeado.",
            },
            {
              title: "4. Empatia (aprofundada no Bloco 2)",
              content:
                "Reconhecer e compreender as emoções e a perspetiva dos outros — incluindo as que não são verbalizadas. Fica aqui apenas nomeada: é o objeto do Bloco 2 deste módulo, juntamente com as competências sociais.",
            },
            {
              title: "5. Competências sociais (aprofundadas no Bloco 2)",
              content:
                "A capacidade de gerir relações e influenciar construtivamente: comunicar, cooperar, negociar, gerir a dinâmica de um grupo. É onde a inteligência emocional se torna visível no resultado — e onde se apoia na escuta ativa trabalhada no MF1.",
            },
          ]}
        />
        <SourceNote>Goleman, D. (1995). Emotional Intelligence. Bantam Books.</SourceNote>
      </section>

      {/* C. CONTEÚDO — Autoconhecimento aplicado */}
      <section className="mt-12">
        <SectionHeading
          eyebrow="Conteúdo"
          title="Autoconhecimento: gatilhos e padrões de reação do formador"
          lead="Cada formador tem situações que o desregulam mais do que outras — e isso é informação útil."
        />
        <Prose>
          <p>
            O autoconhecimento operacional não é uma introspeção vaga: é conhecer os seus
            <strong> gatilhos</strong> (as situações concretas que disparam uma reação emocional
            intensa) e os seus <strong>padrões</strong> (o que costuma fazer quando é ativado). Em
            contexto de formação, os gatilhos mais comuns são reconhecíveis: ser publicamente
            contrariado na sua competência técnica, sentir que o grupo perdeu o interesse, ver o
            tempo da sessão a esgotar-se com metade do programa por dar, ou lidar com um participante
            que ironiza sistematicamente.
          </p>
          <p>
            E os padrões de reação também: uns endurecem e defendem autoridade, outros cedem
            demasiado depressa para eliminar a tensão, outros ainda desligam emocionalmente e
            despacham o resto da sessão. Nenhum destes padrões é um defeito de carácter — são
            respostas aprendidas. O que muda tudo é conhecê-los antes de estarem ativos, porque um
            padrão nomeado deixa de ser automático.
          </p>
        </Prose>
        <ContentCard tone="primary" title="Três perguntas de autoconhecimento aplicado">
          <ul className="mt-1 list-disc space-y-1 pl-5">
            <li>Que tipo de situação, numa sala de formação, me tira mais rapidamente do centro?</li>
            <li>O que é que eu costumo fazer nos primeiros dez segundos depois disso?</li>
            <li>
              Que sinal físico ou mental me avisa de que estou a ser ativado (voz mais rápida,
              maxilar tenso, vontade de interromper)?
            </li>
          </ul>
        </ContentCard>
      </section>

      {/* D. CONTEÚDO — Reagir vs. responder */}
      <section className="mt-12">
        <SectionHeading
          eyebrow="Conteúdo"
          title="Autorregulação: reagir por impulso ou responder com intenção"
          lead="A diferença entre as duas cabe num intervalo de poucos segundos."
        />
        <Prose>
          <p>
            <strong>Reagir</strong> é deixar a emoção escolher o comportamento: a resposta sai
            imediata, defensiva, e habitualmente é sobre a pessoa. <strong>Responder</strong> é
            passar a emoção pelo filtro do objetivo pedagógico antes de agir: a resposta sai mais
            lenta, é sobre o conteúdo ou sobre o processo, e mantém a relação intacta. A emoção é a
            mesma nos dois casos — o que difere é o que se faz com ela.
          </p>
          <p>
            Três técnicas simples, disponíveis em qualquer sala: a <strong>pausa</strong> (um
            silêncio deliberado de dois ou três segundos, que também sinaliza ao grupo que aquilo
            está a ser levado a sério); a <strong>respiração</strong> (uma expiração lenta, mais
            longa que a inspiração, que reduz a ativação fisiológica antes de falar); e a
            <strong> reformulação interna</strong> (trocar «ele está a desafiar-me» por «ele está a
            trazer uma objeção que talvez o grupo também tenha» — uma leitura alternativa da mesma
            situação que não obriga a defender-se).
          </p>
        </Prose>
        <KeyIdea>
          Autorregulação não é autocontrolo permanente — é ganhar o intervalo. O objetivo não é
          nunca sentir irritação numa sala de formação; é chegar ao fim da frase seguinte sem que
          ela tenha sido escrita pela irritação.
        </KeyIdea>
      </section>

      {/* E. EXEMPLO — Cenário comparativo */}
      <section className="mt-12">
        <SectionHeading
          eyebrow="Exemplo"
          title="A mesma situação, dois níveis de autorregulação"
          lead="Sessão de formação contínua. Décimo participante, meio da manhã, um comentário em voz alta."
        />
        <Scenario
          title="Versão 1 — o formador reage"
          context="O formador Nuno está a apresentar um método de avaliação. O participante Hélder interrompe."
          lines={[
            {
              speaker: "Hélder",
              text: "Desculpe, mas isso na prática não funciona. Já se vê que nunca esteve numa sala com trinta adultos desmotivados.",
            },
            {
              speaker: "Nuno (formador)",
              text: "Olhe, eu dou formação há catorze anos, portanto acho que sei do que estou a falar. Se quiser, podemos voltar ao programa.",
              side: "right",
            },
            {
              speaker: "Hélder",
              text: "Pronto, já vi que não vale a pena falar.",
            },
            {
              speaker: "Grupo",
              text: "(silêncio; duas pessoas trocam olhares e ninguém volta a levantar objeções durante a manhã)",
            },
          ]}
          note="A reação de Nuno defende a sua competência e fecha a questão — mas transforma um desacordo de conteúdo num confronto de pessoas, e ensina ao grupo que objeções têm custo. O conflito não desapareceu: passou a latente."
        />
        <Scenario
          title="Versão 2 — o formador responde"
          context="Mesma sessão, mesma frase de Hélder."
          lines={[
            {
              speaker: "Hélder",
              text: "Desculpe, mas isso na prática não funciona. Já se vê que nunca esteve numa sala com trinta adultos desmotivados.",
            },
            {
              speaker: "Nuno (formador)",
              text: "(pausa de dois segundos, expira) Isso é uma objeção séria e provavelmente não é só sua. Diga-me: em que ponto concreto é que o método falha, na sua experiência?",
              side: "right",
            },
            {
              speaker: "Hélder",
              text: "No tempo. Precisava de vinte minutos por pessoa e eu não tenho isso.",
            },
            {
              speaker: "Nuno (formador)",
              text: "Certo — então o problema é a escala, não o princípio. Vamos ver a versão reduzida do método, porque é essa que responde a esse constrangimento. Mais alguém tem turmas dessa dimensão?",
              side: "right",
            },
          ]}
          note="Nuno sentiu exatamente a mesma coisa na Versão 2 — a frase de Hélder era pessoal. A diferença está no intervalo: a pausa e a reformulação interna («é uma objeção, não um ataque») deram-lhe acesso a uma resposta que devolve a discussão ao conteúdo e usa a objeção pedagogicamente."
        />
        <SourceNote>
          Os diálogos são simulações pedagógicas construídas para este módulo, com nomes fictícios;
          ilustram os conceitos de autoconsciência e autorregulação descritos em Goleman (1995).
        </SourceNote>
      </section>

      {/* F. INTERAÇÃO — Micro-quizzes */}
      <section className="mt-12">
        <SectionHeading
          eyebrow="Interação"
          title="Verifique a sua compreensão"
          lead="Cada opção tem feedback explicativo — inclusive as que não são as mais adequadas."
        />

        <Quiz
          id="mf3-bloco-1-quiz-conceito"
          question="Qual das afirmações distingue corretamente inteligência emocional de quociente de inteligência?"
          options={[
            {
              text: "A inteligência emocional é uma forma mais avançada de QI: quem tem QI elevado tende automaticamente a gerir bem as emoções.",
              feedback:
                "Não são a mesma dimensão nem estão nessa relação. Salovey e Mayer descreveram a IE como uma capacidade distinta de processar informação emocional, e Goleman insistiu precisamente no contrário desta afirmação: há pessoas de QI muito elevado que gerem mal situações emocionalmente exigentes.",
            },
            {
              text: "Ter inteligência emocional significa manter-se calmo e não sentir emoções negativas em situações de tensão.",
              feedback:
                "Esta é a confusão mais comum. A IE não elimina a emoção: pressupõe sentir e reconhecer com clareza o que se está a sentir. Um formador que não notasse a sua própria irritação teria menos autoconsciência, não mais — e ficaria sem informação para se regular.",
            },
            {
              text: "A inteligência emocional é um traço de personalidade fixo: ou alguém nasce empático, ou não há nada a fazer.",
              feedback:
                "É justamente o oposto do argumento central de Goleman (1995), e a razão pela qual estas competências fazem parte de um referencial de formação: são aprendíveis. Se fossem fixas, este módulo não teria objeto.",
            },
            {
              text: "O QI mede sobretudo capacidade de raciocínio abstrato e é relativamente estável no adulto; a inteligência emocional refere-se ao reconhecimento e gestão de emoções e é largamente treinável.",
              correct: true,
              feedback:
                "Exatamente. É esta a distinção operacional que interessa a um formador: a competência que permite conduzir uma sala tensa não é a mesma que permite domínio técnico do conteúdo — e, ao contrário do QI, pode ser desenvolvida com treino deliberado.",
            },
          ]}
          takeaway="A IE é uma competência distinta do QI e treinável — o que a torna objeto legítimo de formação."
        />

        <Quiz
          id="mf3-bloco-1-quiz-dimensao"
          question="Uma formadora percebe, a meio da manhã, que a sua voz está mais rápida e que está a interromper os participantes — e associa isso ao facto de estar atrasada no programa. Que dimensão do modelo de Goleman está aqui em ação?"
          options={[
            {
              text: "Autoconsciência.",
              correct: true,
              feedback:
                "Sim. Ela está a reconhecer, no momento, o seu próprio estado interno e a identificar o efeito que ele está a ter no seu comportamento — sem ainda ter feito nada para o alterar. É esta a definição de autoconsciência, e é a dimensão fundadora: nada se regula antes de ser notado.",
            },
            {
              text: "Autorregulação.",
              feedback:
                "Ainda não. A autorregulação começaria no passo seguinte — quando ela fizesse a pausa, respirasse ou decidisse deliberadamente cortar um exercício em vez de acelerar. Até aqui houve reconhecimento, não gestão. Nota que a autorregulação depende deste reconhecimento prévio.",
            },
            {
              text: "Empatia.",
              feedback:
                "A empatia diz respeito ao reconhecimento das emoções e da perspetiva dos outros. Aqui a formadora está a ler o seu próprio estado, não o dos participantes — trata-se de uma competência intrapessoal. A empatia é objeto do Bloco 2.",
            },
            {
              text: "Competências sociais.",
              feedback:
                "As competências sociais manifestam-se na gestão da relação e da dinâmica do grupo — comunicar, negociar, cooperar. Neste episódio nada disso aconteceu ainda: houve apenas uma leitura interna correta do próprio estado.",
            },
          ]}
          takeaway="Autoconsciência é notar; autorregulação é o que se faz depois de notar."
        />

        <Quiz
          id="mf3-bloco-1-quiz-autorregulacao"
          question="Um participante comenta em voz alta: «Este exercício é uma perda de tempo.» Qual das respostas do formador é uma resposta autorregulada — e não uma reação impulsiva?"
          options={[
            {
              text: "«Se não quer participar, tem toda a liberdade de sair da sala.»",
              feedback:
                "É uma reação: a emoção escolheu o comportamento. A frase é sobre a pessoa, não sobre o exercício, e coloca a relação em jogo para resolver um desconforto de poucos segundos. Normalmente silencia o grupo em vez de resolver a objeção.",
            },
            {
              text: "«Pode ser — mas o exercício é assim porque tem de ser. Vamos continuar, sim?»",
              feedback:
                "Aparenta calma, mas é evitamento: não devolve nada à discussão, invoca autoridade («tem de ser») e deixa a objeção intacta debaixo da superfície. A tensão baixa no momento e volta mais tarde.",
            },
            {
              text: "«(pausa) O que é que lhe parece que está a faltar aqui? Se o objetivo do exercício não está claro, isso é relevante para todos.»",
              correct: true,
              feedback:
                "É uma resposta autorregulada: há um intervalo deliberado (a pausa), a leitura interna foi reformulada — de «ataque» para «objeção sobre o processo» — e a intervenção devolve o assunto ao conteúdo, tratando-o como informação útil para o grupo. A emoção sentida foi provavelmente a mesma das outras opções; o que mudou foi o que se fez com ela.",
            },
            {
              text: "O formador ignora o comentário e prossegue a explicação como se nada tivesse sido dito.",
              feedback:
                "Ignorar parece neutro, mas é frequentemente reação por retirada: elimina o desconforto imediato do formador e deixa o grupo a interpretar o silêncio. A objeção mantém-se, sem lugar onde ser tratada — e o participante conclui que ali não se fala.",
            },
          ]}
          takeaway="A marca da resposta autorregulada é o intervalo e o foco no conteúdo ou no processo, nunca na pessoa."
        />
      </section>

      {/* G. APLICAÇÃO — Reflexão */}
      <section className="mt-12">
        <SectionHeading
          eyebrow="Aplicação"
          title="Traga isto para a sua prática"
          lead="O autoconhecimento só é útil quando é concreto."
        />
        <ReflectionPrompt
          id="mf3-bloco-1-reflexao-gatilho"
          question="Identifique um gatilho emocional concreto na sua prática de formador — e o que costuma fazer nos primeiros segundos."
          hint="Descreva a situação-tipo (não uma generalidade), o sinal pelo qual percebe que está ativado, e o padrão de reação habitual. Termine com uma técnica — pausa, respiração ou reformulação interna — que se compromete a experimentar na próxima vez."
          rows={7}
        />
        <ContentCard title="A seguir">
          <p>
            Trabalhou as três dimensões intrapessoais: autoconsciência, autorregulação e motivação.
            O Bloco 2 avança para as duas dimensões voltadas para o outro — empatia e competências
            sociais — ligando-as à escuta ativa já trabalhada no MF1.
          </p>
        </ContentCard>
        <SourceNote>
          Fontes desta secção: Salovey, P. &amp; Mayer, J.D. (1990). Emotional Intelligence.
          Imagination, Cognition, and Personality, 9(3), 185-211; Goleman, D. (1995). Emotional
          Intelligence: Why It Can Matter More Than IQ. Bantam Books; Referencial IEFP/CNQF (2024),
          Módulo 3 — Estratégias de Resolução de Conflitos na Formação.
        </SourceNote>
      </section>
    </>
  );
}
