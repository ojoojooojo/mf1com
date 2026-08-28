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

/* ---------- Infográfico: filtros psicológicos entre duas pessoas ---------- */

function FiltrosSvg() {
  const filtros = ["Perceção seletiva", "Emoções", "Valores e experiência", "Autoimagem e papel"];
  return (
    <svg
      viewBox="0 0 720 300"
      role="img"
      aria-label="Diagrama: entre o emissor e o recetor existem quatro filtros psicológicos — perceção seletiva, emoções, valores e experiência, autoimagem e papel social — que moldam a mensagem em cada sentido."
      className="w-full"
    >
      <defs>
        <marker id="b2-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0 0 L10 5 L0 10 z" fill="var(--primary)" />
        </marker>
      </defs>

      <circle cx={70} cy={120} r={44} fill="var(--primary-soft)" stroke="var(--primary)" strokeWidth={1.5} />
      <text x={70} y={125} textAnchor="middle" fontSize={13} fontWeight={600} fill="var(--foreground)" fontFamily="var(--font-sans)">
        Pessoa A
      </text>

      <circle cx={650} cy={120} r={44} fill="var(--primary-soft)" stroke="var(--primary)" strokeWidth={1.5} />
      <text x={650} y={125} textAnchor="middle" fontSize={13} fontWeight={600} fill="var(--foreground)" fontFamily="var(--font-sans)">
        Pessoa B
      </text>

      <line x1={118} y1={104} x2={598} y2={104} stroke="var(--primary)" strokeWidth={2} markerEnd="url(#b2-arrow)" />
      <line x1={602} y1={140} x2={122} y2={140} stroke="var(--primary)" strokeWidth={2} markerEnd="url(#b2-arrow)" />

      {filtros.map((f, i) => {
        const x = 170 + i * 110;
        return (
          <g key={f}>
            <rect x={x} y={62} width={92} height={120} rx={10} fill="var(--accent-soft)" stroke="var(--accent)" strokeDasharray="5 4" />
            <text x={x + 46} y={200} textAnchor="middle" fontSize={11} fontWeight={600} fill="var(--accent)" fontFamily="var(--font-sans)">
              {f.split(" ")[0]}
            </text>
            <text x={x + 46} y={214} textAnchor="middle" fontSize={11} fill="var(--muted-foreground)" fontFamily="var(--font-sans)">
              {f.split(" ").slice(1).join(" ")}
            </text>
          </g>
        );
      })}

      <text x={360} y={258} textAnchor="middle" fontSize={12} fill="var(--muted-foreground)" fontFamily="var(--font-sans)">
        A mensagem atravessa filtros em ambos os sentidos — nunca chega «pura».
      </text>
    </svg>
  );
}

const COMPONENTES = [
  {
    nome: "Perceção seletiva",
    texto:
      "Cada pessoa filtra a informação, concentrando-se no que julga mais importante e ignorando o resto.",
  },
  {
    nome: "Emoções e estado de espírito",
    texto: "Influenciam o que dizemos e como interpretamos o que ouvimos.",
  },
  {
    nome: "Valores, crenças e experiência",
    texto: "Moldam o significado que atribuímos às mensagens.",
  },
  {
    nome: "Autoimagem e papel social",
    texto: "Adaptamos o nosso estilo consoante o contexto e o papel que sentimos ter.",
  },
] as const;

const FILTRO_OPCOES = [
  "Perceção seletiva",
  "Emoção / estado de espírito",
  "Valor pessoal",
  "Papel social",
];

type ClassificacaoItem = {
  id: string;
  frase: string;
  correta: number;
  feedback: [string, string, string, string];
  takeaway: string;
};

const CLASSIFICACAO: ClassificacaoItem[] = [
  {
    id: "bloco-2-quiz-filtro-1",
    frase: "«Só ouvi a parte em que disse que íamos ter mais trabalho.»",
    correta: 0,
    feedback: [
      "Certo: a pessoa retém apenas o fragmento que lhe pareceu mais relevante (ou mais ameaçador) e deixa cair o resto da mensagem. É perceção seletiva — o filtro que decide o que entra e o que fica de fora.",
      "Pode haver emoção associada, mas o que a frase descreve é o que foi retido da mensagem, não o estado de espírito de quem fala. O núcleo aqui é o recorte da informação: perceção seletiva.",
      "Não está em jogo um juízo sobre o que é justo ou correto. A frase relata aquilo que a pessoa ouviu — e só isso — o que aponta para perceção seletiva.",
      "A frase não invoca a posição nem o estatuto de quem fala. Descreve um recorte de escuta: perceção seletiva.",
    ],
    takeaway:
      "Quando um formando reage a algo que «não foi dito assim», vale a pena verificar o que ele efetivamente retém da mensagem antes de repetir o mesmo argumento.",
  },
  {
    id: "bloco-2-quiz-filtro-2",
    frase: "«Hoje estou com pouca paciência para isto.»",
    correta: 1,
    feedback: [
      "Não é o recorte da informação que está em causa: a pessoa nomeia explicitamente o seu estado interno. O filtro dominante é a emoção / estado de espírito.",
      "Certo: a frase declara o estado emocional do momento, que vai condicionar o que a pessoa diz e como interpreta o que ouve — mesmo com o conteúdo inalterado.",
      "Não se invoca um princípio nem uma ideia de justiça. Trata-se de disposição emocional momentânea: emoção / estado de espírito.",
      "Não há referência a estatuto ou papel. É o estado de espírito de hoje que está a filtrar a interação.",
    ],
    takeaway:
      "O estado emocional é um filtro móvel: a mesma pessoa pode receber a mesma mensagem de forma muito diferente em dois dias distintos.",
  },
  {
    id: "bloco-2-quiz-filtro-3",
    frase: "«Isto não devia ser assim, não é justo.»",
    correta: 2,
    feedback: [
      "A pessoa não está a relatar o que ouviu ou deixou de ouvir — está a avaliar a situação face a um princípio. Isso remete para valor pessoal.",
      "Pode haver irritação, mas o que a frase mobiliza é um critério de justiça, não um estado passageiro. O filtro é o valor pessoal.",
      "Certo: «devia», «não é justo» são marcas de um critério de valor. A pessoa mede a realidade por aquilo que acredita que deve ser — e é esse filtro que define o significado atribuído à mensagem.",
      "O papel social pode reforçar o argumento, mas a frase não o invoca. Invoca um princípio: valor pessoal.",
    ],
    takeaway:
      "Quando o conflito é de valores, repetir informação não resolve — é preciso reconhecer o critério que a outra pessoa está a usar.",
  },
  {
    id: "bloco-2-quiz-filtro-4",
    frase: "«Como formador mais experiente, acho que devia falar primeiro.»",
    correta: 3,
    feedback: [
      "Não há aqui recorte da mensagem recebida. Há uma justificação baseada na posição de quem fala: papel social.",
      "A frase não nomeia emoção alguma; sustenta-se na posição que a pessoa sente ocupar no grupo — papel social.",
      "Há um juízo implícito, mas o argumento é a experiência e o lugar de quem fala, não um princípio moral. Trata-se de papel social.",
      "Certo: a pessoa fundamenta a sua intervenção na autoimagem e no papel que sente ter no grupo, ajustando o estilo de comunicação a esse lugar.",
    ],
    takeaway:
      "Papéis e autoimagem organizam silenciosamente quem fala, quando e com que autoridade — em sala de formação isso é fonte frequente de tensão.",
  },
];

export function Block2Content() {
  return (
    <>
      {/* 1. CONTEÚDO */}
      <section className="mt-10">
        <SectionHeading eyebrow="Conteúdo" title="Comunicar é uma competência social" />
        <Prose>
          <p>
            Comunicar é também um «conjunto de competências sociais»: comportamento social eficaz
            na realização dos objetivos das pessoas em interação.
          </p>
          <p>Há dois aspetos centrais:</p>
        </Prose>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <ContentCard tone="primary" title="Ligação interpessoal">
            <p>As ações de cada um afetam e refletem as do outro.</p>
          </ContentCard>
          <ContentCard tone="accent" title="Singularidade">
            <p>
              Cada interlocutor traz características e circunstâncias próprias que tornam cada
              interação única — o que resulta bem com um formando pode não resultar com outro.
            </p>
          </ContentCard>
        </div>
        <SourceNote>
          Instituto Politécnico de Lisboa (IPL) — «Comunicação Interpessoal: A Importância da
          Assertividade».
        </SourceNote>

        <Figure
          caption="Entre duas pessoas há sempre filtros psicológicos a moldar a mensagem, nos dois sentidos."
          source="Gil, A.C. (2001) cit. em Abreu & Bazoni (2016); IPL."
        >
          <FiltrosSvg />
        </Figure>

        <SectionHeading
          eyebrow="Conteúdo"
          title="O que cada pessoa traz para a comunicação"
          lead="Quatro componentes psicológicos que atuam antes, durante e depois de qualquer troca."
        />
        <div className="grid gap-4 sm:grid-cols-2">
          {COMPONENTES.map((c) => (
            <ContentCard key={c.nome} title={c.nome}>
              <p>{c.texto}</p>
            </ContentCard>
          ))}
        </div>
        <SourceNote>
          Gil, A.C. (2001), citado em Abreu, T.M.B. &amp; Bazoni, M.C. (2016), «Como superar
          barreiras da comunicação nas organizações», <em>R. Dito Efeito</em>, 7(11); IPL.
        </SourceNote>

        <KeyIdea>
          Nenhuma mensagem chega «pura»: atravessa sempre a perceção seletiva, as emoções, os
          valores e o papel social de quem a recebe — e de quem a envia.
        </KeyIdea>
      </section>

      {/* 2. EXEMPLO / CENÁRIO + INTERAÇÃO */}
      <section className="mt-12">
        <SectionHeading
          eyebrow="Exemplo"
          title="O Benjamim: a mesma informação, ordens diferentes"
          lead="Exercício pedagógico clássico, aqui adaptado. Dois grupos de formandos recebem exatamente a mesma informação sobre uma pessoa fictícia — apenas a ordem muda."
        />
        <Scenario
          title="O Benjamim"
          context="Exercício pedagógico (pessoa fictícia). Cada grupo lê apenas a sua lista, sem saber da outra."
          lines={[
            {
              speaker: "Grupo 1 lê",
              text: "«O Benjamim é muito impulsivo, mentiroso, teimoso, desordeiro, honesto e competente.»",
            },
            {
              speaker: "Grupo 2 lê",
              text: "«O Benjamim é muito competente, honesto, mentiroso, desordeiro, impulsivo e uma língua de trapos.»",
              side: "right",
            },
          ]}
          note="Antes de continuar, responda à reflexão abaixo — e só depois abra o resultado."
        />

        <ReflectionPrompt
          id="bloco-2-reflexao-benjamim"
          question="Antes de ver o resultado: em que ordem preferiria apresentar informação sobre alguém — pelas qualidades primeiro ou pelos defeitos primeiro? Porquê?"
          hint="Registe a sua intuição inicial. Vai poder confrontá-la com o resultado do exercício."
          rows={4}
        />

        <LessonAccordion
          items={[
            {
              title: "Revelar o resultado do exercício",
              content: (
                <div className="space-y-3">
                  <p>
                    Os grupos que leem as qualidades primeiro tendem a ficar com uma impressão
                    final mais positiva do que os grupos que leem os defeitos primeiro — mesmo com
                    a <strong>mesma</strong> informação.
                  </p>
                  <p>
                    Isto é perceção seletiva e efeito de primazia em ação: as primeiras palavras
                    criam uma moldura que passa a organizar a leitura de tudo o que vem depois.
                  </p>
                </div>
              ),
            },
          ]}
        />
        <p className="mt-4 rounded-xl border border-border bg-muted/50 p-4 text-xs text-muted-foreground">
          <span className="font-semibold">Nota de proveniência:</span> esta situação é uma
          adaptação de um exercício constante no referencial oficial IEFP para este módulo, com
          fins exclusivamente pedagógicos.
        </p>

        <div className="mt-6">
          <LessonAccordion
            items={[
              {
                title: "Porque é que isto importa em sala de formação?",
                content: (
                  <p>
                    O mesmo comentário de um formando pode ser lido como curiosidade genuína ou
                    como desafio à autoridade, consoante o estado emocional e as expectativas de
                    quem o recebe. Reconhecer isto é o primeiro passo para gerir a própria reação
                    antes de reagir ao conflito.
                  </p>
                ),
              },
            ]}
          />
        </div>
      </section>

      {/* 3. INTERAÇÃO */}
      <section className="mt-12">
        <SectionHeading
          eyebrow="Interação"
          title="Que filtro psicológico está a agir?"
          lead="Associe cada frase de um formando ao filtro mais provável. Cada opção explica porque se enquadra — ou não — nesse filtro."
        />
        {CLASSIFICACAO.map((item) => (
          <Quiz
            key={item.id}
            id={item.id}
            question={item.frase}
            options={FILTRO_OPCOES.map((texto, i) => ({
              text: texto,
              correct: i === item.correta,
              feedback: item.feedback[i]!,
            }))}
            takeaway={item.takeaway}
          />
        ))}
      </section>

      {/* 4. APLICAÇÃO */}
      <section className="mt-12">
        <SectionHeading
          eyebrow="Aplicação"
          title="Transportar para a sua prática"
          lead="Sem resposta certa: o valor está no registo pessoal e na consciência que gera."
        />
        <ReflectionPrompt
          id="bloco-2-reflexao-aplicacao"
          question="Recorde uma vez em que interpretou mal a intervenção de um formando. Qual dos quatro filtros estava, provavelmente, a agir em você nesse momento?"
          hint="Descreva a situação em 3-4 frases e nomeie o filtro."
        />
        <ContentCard tone="primary" title="Antes de avançar">
          <p>
            No próximo bloco vamos ver como afirmar-se com clareza e respeito ao mesmo tempo — a
            comunicação assertiva.
          </p>
        </ContentCard>
        <SourceNote>
          IPL — Comunicação Interpessoal e Assertividade; Gil, A.C. (2001) cit. em Abreu &amp;
          Bazoni (2016), <em>R. Dito Efeito</em>, 7(11).
        </SourceNote>
      </section>
    </>
  );
}
