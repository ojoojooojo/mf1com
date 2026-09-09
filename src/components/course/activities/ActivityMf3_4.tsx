import { ContentCard, Scenario, SectionHeading } from "@/components/course/LessonKit";
import {
  ChoiceGroup,
  Commentary,
  FictionNote,
  PrivacyNote,
  RevealPanel,
  TaskField,
  useFilled,
} from "@/components/course/ActivityKit";

export function ActivityMf3_4() {
  const filled = useFilled(
    "mf3-atividade-4-problema",
    "mf3-atividade-4-pessoas",
    "mf3-atividade-4-processo",
    "mf3-atividade-4-contexto",
  );

  return (
    <>
      {/* Escolha do caso */}
      <section className="mt-10">
        <SectionHeading
          eyebrow="Preparação"
          title="Escolha o conflito que vai mapear"
          lead="Pode usar o caso fornecido ou um conflito real da sua prática. Ambos os percursos são válidos."
        />
        <ChoiceGroup
          id="mf3-atividade-4-caso"
          label="Que conflito vai mapear?"
          options={[
            {
              key: "fornecido",
              label: "A",
              text: "O caso fornecido abaixo — «O grupo que se recusa a apresentar».",
            },
            {
              key: "proprio",
              label: "B",
              text: "Um conflito real da minha própria prática de formação.",
            },
          ]}
        />
        <FictionNote>
          O caso fornecido é fictício, construído para fins pedagógicos. Não descreve pessoas nem
          sessões reais. Se preferir trabalhar com um caso da sua prática, o mapeamento é igualmente
          válido — e normalmente mais útil.
        </FictionNote>
        <PrivacyNote>
          Se escolher um conflito real, <strong>não inclua nomes</strong> de formandos, colegas ou
          entidades, nem qualquer dado que permita identificar as pessoas envolvidas. Use
          designações como «participante A», «coordenadora», «uma das formandas». As suas respostas
          ficam guardadas na sua conta e são visíveis para o formador do curso.
        </PrivacyNote>
      </section>

      {/* Caso fornecido */}
      <section className="mt-10">
        <SectionHeading
          eyebrow="Caso fornecido"
          title="O grupo que se recusa a apresentar"
          lead="Leia com atenção: o material para os quatro quadrantes está todo aqui, mas disperso."
        />
        <Scenario
          title="«Nós não apresentamos»"
          context="Curso de dupla certificação, 300 horas, oitava semana. Turma de doze adultos, muitos em situação de desemprego e com a frequência ligada a um apoio. Os trabalhos de grupo têm apresentação oral obrigatória e avaliada."
          lines={[
            {
              speaker: "Sessão anterior",
              text: "O formador anuncia que a apresentação oral passa a valer 40% da nota do módulo — a percentagem não constava do que foi comunicado no início do curso.",
            },
            {
              speaker: "Grupo 2 (quatro participantes)",
              text: "«Nós não apresentamos. Fazemos o trabalho escrito, entregamos, mas à frente da turma não vamos.»",
            },
            {
              speaker: "Participante A (porta-voz do grupo)",
              text: "«Além disso, a última vez que apresentámos, houve comentários. Não vou passar por aquilo outra vez.»",
            },
            {
              speaker: "Participante B (do mesmo grupo, em privado)",
              text: "«Eu não me importava de apresentar. Mas se o grupo não vai, também não vou sozinha.»",
            },
            {
              speaker: "Participante C (de outro grupo, ao formador)",
              text: "«Se eles não apresentarem e tiverem a mesma nota, nós também não apresentamos.»",
            },
            {
              speaker: "Formador",
              text: "(sabe que a avaliação tem de estar fechada em duas semanas e que a assiduidade e o aproveitamento são comunicados à entidade que assegura o apoio)",
              side: "right",
            },
          ]}
          note="Antes de decidir o que fazer, mapeie. Os quatro campos abaixo correspondem aos quatro quadrantes da Roda."
        />
      </section>

      {/* Os quatro quadrantes */}
      <section className="mt-12">
        <SectionHeading
          eyebrow="Mapeamento"
          title="Os quatro quadrantes"
          lead="Duas a quatro frases por quadrante. Responda usando as questões de diagnóstico como guia — não é preciso responder a todas."
        />
        <div className="space-y-4">
          <TaskField
            id="mf3-atividade-4-problema"
            label="1. O Problema — a dimensão substantiva"
            instruction="O que é que cada parte diz que quer, e o que quer de facto com isso? Há algum recurso escasso realmente em disputa? Os factos estão estabelecidos ou cada parte trabalha com dados diferentes? Se este ponto fosse resolvido hoje, a tensão desapareceria?"
            rows={5}
          />
          <TaskField
            id="mf3-atividade-4-pessoas"
            label="2. As Pessoas — a dimensão relacional e emocional"
            instruction="Que emoção está presente em cada parte, e desde quando? Existe história anterior entre estas pessoas? O que é que cada uma sente que está a defender além do assunto em causa? A reação é proporcional ao problema declarado — e, se não é, o que explica a diferença?"
            rows={5}
          />
          <TaskField
            id="mf3-atividade-4-processo"
            label="3. O Processo — comunicação e procedimento"
            instruction="Quem foi ouvido antes de isto ser decidido, e quem não foi? As regras e os critérios foram explicitados no momento certo? Como circula a informação neste grupo — e por onde não circula? Alguma decisão sua, e o modo como a tomou, contribuiu para esta situação?"
            rows={5}
          />
          <TaskField
            id="mf3-atividade-4-contexto"
            label="4. O Contexto — fatores externos à situação imediata"
            instruction="Que pressões externas — laborais, hierárquicas, financeiras, de certificação — pesam aqui? Há relações de poder que vêm de fora da sala? Que constrangimentos de tempo, espaço ou recursos condicionam a situação? O que está fora da sua margem de atuação, e como o toma em conta?"
            rows={5}
          />
        </div>

        <RevealPanel
          id="mf3-atividade-4-revelado"
          buttonLabel="Submeter o mapeamento e comparar com a análise de referência"
          lockedHint="Preencha os quatro quadrantes antes de ver a análise de referência."
          canReveal={filled}
        >
          <Commentary
            heading="Mapeamento de referência do caso fornecido"
            intro="Se trabalhou com um caso próprio, use esta análise como modelo de granularidade, não como gabarito."
            items={[
              {
                title: "O Problema",
                body: (
                  <p>
                    Em disputa está a obrigatoriedade da apresentação oral e o seu peso de 40% na
                    nota. Recursos escassos: a nota e, indiretamente, a manutenção do apoio. Os
                    factos <em>não</em> estão estabelecidos de forma igual — o peso da apresentação é
                    informação nova para os participantes e antiga para o formador. Teste decisivo:
                    se o formador retirasse hoje a obrigatoriedade, a tensão baixaria, mas o
                    problema com o Participante C (equidade) apareceria de imediato. Logo, o
                    Problema não é o conflito inteiro.
                  </p>
                ),
              },
              {
                title: "As Pessoas",
                tone: "warn",
                body: (
                  <p>
                    Participante A refere «comentários» numa apresentação anterior: há uma
                    experiência de exposição e provável vergonha, que é o que está realmente a ser
                    defendido — não a nota. Participante B revela que a posição do grupo não é
                    unânime: há solidariedade e receio de romper com o grupo, o que transforma quatro
                    pessoas numa posição aparentemente única. Participante C traz um sentimento de
                    injustiça comparativa. Note-se a desproporção: a recusa em bloco é
                    desproporcionada face a uma apresentação de dez minutos — e é essa desproporção
                    que sinaliza que o quadrante Pessoas está ativo.
                  </p>
                ),
              },
              {
                title: "O Processo",
                tone: "good",
                body: (
                  <p>
                    É provavelmente o quadrante onde o conflito é alimentado e onde o formador tem
                    mais margem. O peso de 40% foi introduzido a meio do curso, sem que constasse do
                    comunicado inicial e sem que ninguém tivesse sido ouvido. Os «comentários» da
                    apresentação anterior aconteceram sem que existissem regras de feedback. Não
                    existe canal para levantar objeções sem exposição pública: o Participante B só
                    falou em privado, e o C também. Intervenções possíveis aqui: explicitar e
                    justificar a alteração de critério, criar regras de feedback antes das
                    apresentações, oferecer formatos alternativos de apresentação com o mesmo nível de
                    exigência.
                  </p>
                ),
              },
              {
                title: "O Contexto",
                body: (
                  <p>
                    Curso longo de dupla certificação, com aproveitamento comunicado à entidade que
                    assegura o apoio: para vários participantes, a nota tem consequências financeiras
                    diretas. Prazo de duas semanas para fechar a avaliação. Situação de desemprego de
                    parte da turma, o que aumenta o peso de qualquer exposição pública perante os
                    pares. Nada disto é alterável pelo formador — e é precisamente por isso que
                    intervenções que dependam de os participantes «assumirem o risco» de discordar
                    abertamente tenderiam a falhar.
                  </p>
                ),
              },
              {
                title: "Consequência prática do mapeamento",
                tone: "good",
                body: (
                  <p>
                    Um formador que lesse apenas o Problema negociaria a percentagem — e manteria
                    intactas a vergonha do Participante A, a ausência de regras de feedback e a
                    alteração unilateral de critério. O mapeamento indica outra sequência: reconhecer
                    e justificar publicamente o erro de processo, criar regras de feedback, oferecer
                    formatos alternativos equivalentes para todos os grupos (o que resolve também a
                    equidade invocada pelo Participante C) e tratar em privado a experiência do
                    Participante A.
                  </p>
                ),
              },
            ]}
            closing="O mapeamento não produz a decisão automaticamente — mas impede a intervenção que atua no quadrante errado. A Atividade 5 transforma esta análise num plano de prevenção para o seu próprio contexto."
          />
        </RevealPanel>
      </section>

      <ContentCard tone="primary" title="Liga a">
        <p>
          Bloco 5 (a Roda de Mapeamento do Conflito, os quatro quadrantes e as questões de
          diagnóstico) e Bloco 2 (empatia como via de acesso ao quadrante Pessoas).
        </p>
      </ContentCard>
    </>
  );
}
