import { ContentCard, Figure, Scenario, SectionHeading } from "@/components/course/LessonKit";
import {
  CheckboxGroup,
  ChoiceGroup,
  Commentary,
  FictionNote,
  RevealPanel,
  TaskField,
  useChosen,
  useFilled,
} from "@/components/course/ActivityKit";
import atividadeMf3_3Image from "@/assets/mf3-atividade-3-incidente-efa.jpg";

export function ActivityMf3_3() {
  const filled = useFilled("mf3-atividade-3-decisao-real");
  const chose = useChosen("mf3-atividade-3-decisao");

  return (
    <>
      {/* Parte 1 — autorreconhecimento */}
      <section className="mt-10">
        <SectionHeading
          eyebrow="Autorreconhecimento"
          title="Os seus sinais de stress em sala"
          lead="Selecione os sinais que já experimentou em situação de formação. Não há número certo de escolhas e nada aqui é avaliado."
        />
        <CheckboxGroup
          id="mf3-atividade-3-sinais-fisiologicos"
          label="Sinais fisiológicos"
          instruction="O que o corpo faz antes de você decidir alguma coisa."
          options={[
            "Aceleração dos batimentos cardíacos",
            "Calor no rosto ou rubor",
            "Aperto na garganta ou voz alterada",
            "Tensão nos ombros, na nuca ou na mandíbula",
            "Respiração curta e superficial",
            "Mãos frias, húmidas ou trémulas",
            "Boca seca",
            "Cansaço súbito e desproporcionado",
          ]}
        />
        <div className="mt-4">
          <CheckboxGroup
            id="mf3-atividade-3-sinais-cognitivos"
            label="Sinais cognitivos"
            instruction="O que acontece à sua atenção e ao seu pensamento."
            options={[
              "Ficar fixado numa frase ou numa pessoa e deixar de ver o resto da sala",
              "Perder o fio à explicação que estava a dar",
              "Pensar «isto é contra mim» antes de ter dados para o afirmar",
              "Antecipar o pior desfecho possível da situação",
              "Ensaiar mentalmente uma resposta enquanto o outro ainda fala",
              "Não conseguir lembrar-se do que tinha planeado para a sessão",
              "Ter dificuldade em considerar mais de uma alternativa",
            ]}
          />
        </div>
        <div className="mt-4">
          <CheckboxGroup
            id="mf3-atividade-3-sinais-comportamentais"
            label="Sinais comportamentais"
            instruction="O que os outros conseguem observar em você."
            options={[
              "Falar mais depressa ou mais alto",
              "Interromper quem está a falar",
              "Usar ironia ou humor cortante",
              "Encurtar respostas e fechar a conversa",
              "Evitar o contacto visual com determinada pessoa",
              "Antecipar o intervalo ou terminar a sessão mais cedo",
              "Andar de um lado para o outro ou mexer em objetos",
              "Passar a dirigir-se ao grupo e a ignorar quem levantou a questão",
            ]}
          />
        </div>
        <ContentCard tone="accent" title="Porque é que isto é a primeira parte da atividade">
          <p>
            Nenhuma técnica de autorregulação funciona sem um gatilho de acionamento. O sinal que
            aprende a reconhecer <em>em si</em> é esse gatilho: é o que lhe diz, antes de qualquer
            decisão, que a sua leitura da situação já pode estar distorcida. Formadores diferentes
            têm sinais diferentes — e o sinal mais útil raramente é o mais dramático, é o mais
            precoce.
          </p>
        </ContentCard>
      </section>

      {/* Parte 2 — decisão */}
      <section className="mt-12">
        <SectionHeading
          eyebrow="Incidente crítico"
          title="Reagir agora ou fazer uma pausa?"
          lead="Uma decisão binária, com duas consequências plausíveis — nenhuma delas universalmente certa."
        />
        <FictionNote>
          Cenário fictício, construído para fins pedagógicos. Não descreve pessoas nem sessões reais.
        </FictionNote>
        <Scenario
          title="«Já percebemos que a senhora nunca trabalhou nisto»"
          context="Formação em contexto EFA, quinta sessão. Está a explicar um procedimento quando Rita, participante com quinze anos de experiência no setor, interrompe. Reconhece em si dois dos sinais que assinalou acima: calor no rosto e a frase «isto é contra mim»."
          lines={[
            {
              speaker: "Rita",
              text: "Já percebemos que a senhora nunca trabalhou nisto na prática. Está a explicar-nos uma coisa que no terreno não é assim.",
            },
            {
              speaker: "Grupo",
              text: "(dois participantes riem-se baixinho; os outros olham para você; ninguém diz nada)",
            },
            {
              speaker: "Você",
              text: "(sente o rosto quente; passaram menos de dois segundos e tem de fazer algo)",
              side: "right",
            },
          ]}
          note="Faltam 50 minutos de sessão. Rita nunca tinha sido hostil antes. Não há regra de segurança nem dignidade de terceiros em causa neste momento."
        />
        <Figure
          caption="O incidente crítico, no momento em que acontece."
          source="Reconstrução visual gerada por IA para fins pedagógicos."
        >
          <img
            src={atividadeMf3_3Image}
            alt="Sala de formação EFA; uma participante de meia-idade fala com postura confiante e braços apoiados na mesa, dois colegas próximos sorriem discretamente, o resto do grupo observa em silêncio, e a formadora, parcialmente de costas junto ao quadro, permanece imóvel."
            loading="lazy"
            width={1536}
            height={1024}
            className="h-auto w-full max-w-full rounded-lg object-cover"
          />
        </Figure>
        <ChoiceGroup
          id="mf3-atividade-3-decisao"
          label="O que faz nos próximos cinco segundos?"
          instruction="Escolha e depois compare as duas consequências."
          options={[
            {
              key: "reagir",
              label: "A",
              text: "Reagir de imediato — responder à afirmação sobre a sua experiência ali mesmo, enquanto a sala está atenta.",
            },
            {
              key: "pausa",
              label: "B",
              text: "Aplicar uma técnica breve de autorregulação — duas respirações, nomear internamente o que sentiu — e só depois responder.",
            },
          ]}
        />
        <RevealPanel
          id="mf3-atividade-3-consequencias"
          buttonLabel="Submeter a escolha e ver as consequências"
          lockedHint="Escolha uma das duas opções antes de ver as consequências."
          canReveal={chose}
        >
          <Commentary
            heading="As duas consequências, lado a lado"
            intro="Ambas são plausíveis e ambas têm um custo. O contexto decide."
            items={[
              {
                title: "A — Reagir de imediato"
                  ,
                body: (
                  <>
                    <p>
                      Com o rosto quente e a leitura «isto é contra mim» já formada, a resposta sai
                      quase sempre a defender o próprio currículo: «tenho onze anos de experiência
                      neste setor, Rita». O grupo registra que a formadora se defendeu, e não que
                      respondeu ao conteúdo técnico. Rita não retira o que disse e a sessão prossegue
                      com uma tensão que ninguém nomeia. O custo é informação: nunca se soube que
                      procedimento concreto Rita faz de forma diferente no terreno.
                    </p>
                    <p>
                      Há contextos, no entanto, em que reagir de imediato é a escolha correta e a
                      pausa seria um erro: se a frase tivesse atingido um colega em vez da formadora,
                      se houvesse discriminação, ou se estivesse em risco a segurança de alguém. A
                      firmeza imediata protege terceiros; aqui não havia terceiros a proteger.
                    </p>
                  </>
                ),
              },
              {
                title: "B — Pausa de autorregulação",
                tone: "good",
                body: (
                  <>
                    <p>
                      Duas respirações e um reconhecimento interno («senti-me exposta — o que está em
                      causa é a minha imagem, não o procedimento») bastam para reabrir alternativas.
                      A resposta que se torna possível é outra: «Rita, isso interessa-me. Diga-me
                      concretamente como fazem no terreno — quero ver se é uma variante do mesmo
                      princípio ou se é outra coisa.» Em metade dos casos surge um contributo técnico
                      valioso; noutros, torna-se visível para o grupo que a afirmação não tinha
                      substância, sem que a formadora tenha precisado de o dizer.
                    </p>
                    <p>
                      O custo também existe: a pausa é visível, há dois segundos de silêncio, e
                      alguns participantes podem lê-los como hesitação. E a pausa não resolve nada
                      por si — apenas devolve capacidade de escolher.
                    </p>
                  </>
                ),
              },
              {
                title: "O que distingue os dois casos",
                tone: "warn",
                body: (
                  <p>
                    A pergunta útil não é «reagir ou pausar?», mas «o que está realmente em causa?».
                    Se o que está em risco é a imagem do formador, a pausa quase sempre melhora a
                    resposta. Se o que está em risco é a segurança, a dignidade de terceiros ou uma
                    regra inegociável, a firmeza imediata é a resposta adequada — e uma pausa
                    prolongada seria lida, corretamente, como permissão.
                  </p>
                ),
              },
            ]}
            closing="Repare que a pausa não elimina a emoção: a formadora continua incomodada. O que muda é que a emoção deixa de ser a única fonte de informação sobre o que se passou."
          />
        </RevealPanel>
      </section>

      {/* Parte 3 — aplicação */}
      <section className="mt-12">
        <SectionHeading
          eyebrow="Aplicação"
          title="Na sua própria prática"
          lead="Este é o registo que fica na sua conta."
        />
        <TaskField
          id="mf3-atividade-3-decisao-real"
          label="Descreva uma situação real da sua prática em que sentiu stress em sala e diga o que faria hoje."
          instruction="Aborde: (1) a situação, em duas ou três frases, sem nomes nem dados identificáveis; (2) qual dos sinais que assinalou acima esteve presente e em que momento o notou; (3) o que faria hoje — reagir de imediato ou pausar — e porquê, com base no que estava realmente em causa; (4) que técnica concreta de autorregulação está disponível para você naquele contexto específico."
          rows={8}
        />
        <RevealPanel
          id="mf3-atividade-3-revelado"
          buttonLabel="Submeter e ver o comentário de fecho"
          lockedHint="Escreva a sua resposta antes de ver o comentário de fecho."
          canReveal={filled}
        >
          <Commentary
            heading="Três verificações sobre o que escreveu"
            items={[
              {
                title: "O sinal que identificou é precoce ou tardio?",
                body: (
                  <p>
                    Sinais como «falei mais alto» ou «interrompi» são úteis, mas chegam depois de a
                    resposta já ter começado. Vale a pena procurar o que aconteceu antes disso —
                    frequentemente um sinal fisiológico discreto. Quanto mais precoce o sinal, mais
                    margem tem para escolher.
                  </p>
                ),
              },
              {
                title: "A técnica que escolheu é executável naquele contexto?",
                tone: "warn",
                body: (
                  <p>
                    Uma técnica que exija sair da sala ou cinco minutos de silêncio não sobrevive a
                    uma sessão real. Antecipar o intervalo, beber água, dizer «deixe-me pensar
                    nisso» ou fazer uma pergunta de clarificação são recursos que cabem no tempo
                    real de uma sala de formação.
                  </p>
                ),
              },
              {
                title: "Distinguiu o que estava em causa?",
                tone: "good",
                body: (
                  <p>
                    Se a sua justificação para pausar ou reagir se apoia numa avaliação do que estava
                    realmente em risco — a sua imagem, o tempo, a aprendizagem do grupo, a dignidade
                    de alguém — então já está a fazer a reavaliação de Lazarus e Folkman, e não
                    apenas a aplicar uma regra.
                  </p>
                ),
              },
            ]}
          />
        </RevealPanel>
      </section>

      <ContentCard tone="primary" title="Liga a">
        <p>
          Bloco 4 (avaliação primária e secundária, distorções do stress e autorregulação antes de
          intervir) e Bloco 1 (autoconsciência).
        </p>
      </ContentCard>
    </>
  );
}
