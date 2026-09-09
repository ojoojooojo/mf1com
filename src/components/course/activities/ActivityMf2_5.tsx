import { Scenario, SectionHeading, ContentCard, Figure } from "@/components/course/LessonKit";
import {
  CheckboxGroup,
  Commentary,
  FictionNote,
  RevealPanel,
  TaskField,
  useFilled,
} from "@/components/course/ActivityKit";
import atividadeMf2_5Image from "@/assets/mf2-atividade-5-sinais-precoces.jpg";

export function ActivityMf2_5() {
  const filled = useFilled(
    "mf2-atividade-5-sinais",
    "mf2-atividade-5-aplicacao",
    "mf2-atividade-5-abordagem",
  );

  return (
    <>
      <section className="mt-10">
        <SectionHeading
          eyebrow="Situação"
          title="Os primeiros sinais"
          lead="Ainda não há conflito manifesto — mas há sinais para quem souber lê-los."
        />
        <FictionNote>
          Cenário fictício, construído para fins pedagógicos. Não descreve pessoas nem sessões
          reais.
        </FictionNote>
        <Scenario
          title="Os primeiros sinais"
          context="Cenário simulado, início de uma nova turma."
          lines={[
            {
              speaker: "Semana 1",
              text: "Nos exercícios em grupo, vários formandos comentam informalmente que «nunca se sabe muito bem quem é que deve apresentar» — não há critério definido para distribuir esse papel.",
            },
            {
              speaker: "Semana 2",
              text: "Dois pequenos subgrupos começam a formar-se e, sem que ninguém o diga abertamente, parecem competir por mais tempo de atenção e feedback do formador durante os exercícios.",
            },
            {
              speaker: "Situação atual",
              text: "Ainda não houve nenhum confronto direto nem episódio manifesto — mas o clima já é percetivelmente mais tenso do que nas primeiras sessões.",
              side: "right",
            },
          ]}
          note="Identifique sinais e proponha medidas preventivas antes de ver a análise de referência."
        />
        <Figure
          caption="Um momento comum de acompanhamento em sala — antes de qualquer sinal óbvio."
          source="Reconstrução visual gerada por IA para fins pedagógicos."
        >
          <img
            src={atividadeMf2_5Image}
            alt="Formador debruçado sobre a mesa de um pequeno grupo de formandos a dar feedback, enquanto, numa mesa próxima, outro subgrupo aguarda e alguns dos seus elementos olham na direção do formador."
            loading="lazy"
            width={1536}
            height={1024}
            className="h-auto w-full max-w-full rounded-lg object-cover"
          />
        </Figure>
      </section>

      <section className="mt-10">
        <SectionHeading
          eyebrow="A sua análise"
          title="Quatro campos"
          lead="Uma ou duas frases por campo são suficientes."
        />
        <div className="space-y-4">
          <TaskField
            id="mf2-atividade-5-sinais"
            label="1. Que sinais precoces de conflito (fase latente/percebida, Bloco 1; início da escalada, Bloco 2) identifica nesta situação, mesmo sem nenhum episódio manifesto?"
            rows={4}
          />

          <CheckboxGroup
            id="mf2-atividade-5-medidas"
            label="2. Que medidas preventivas fariam mais sentido nesta fase?"
            options={[
              "Definir regras explícitas de participação e critérios para distribuir papéis nos exercícios",
              "Clarificar critérios de avaliação e expectativas desde o início do curso",
              "Ignorar os sinais até haver um conflito manifesto e visível",
              "Estabelecer momentos regulares e breves de verificação do clima do grupo",
              "Atribuir papéis rotativos nos exercícios de grupo, em vez de deixá-los surgir informalmente",
              "Aumentar a exigência técnica dos exercícios para reduzir o tempo disponível para tensões",
            ]}
          />

          <TaskField
            id="mf2-atividade-5-aplicacao"
            label="3. Escolha DUAS das medidas que assinalou acima e explique concretamente como as aplicaria nesta turma, já na próxima sessão."
            rows={5}
          />

          <TaskField
            id="mf2-atividade-5-abordagem"
            label="4. Que abordagem fundamental do Bloco 2 (prevenção, intervenção ou pós-resolução) está a exercitar ao propor estas medidas — e porque é esta a mais adequada nesta fase, e não outra?"
            rows={4}
          />
        </div>

        <RevealPanel id="mf2-atividade-5-revelado" canReveal={filled}>
          <Commentary
            heading="Agir antes de haver o que resolver"
            intro="Não há uma única leitura certa — compare o seu raciocínio com este."
            items={[
              {
                title: "1. Sinais precoces",
                tone: "neutral",
                body: (
                  <p>
                    A ausência de critério para distribuir o papel de apresentar é uma condição
                    latente clássica (papéis mal definidos); a competição informal por atenção do
                    formador já é perceção mútua de escassez (tempo/atenção como recurso limitado) —
                    ainda na fase percebida, sem comportamento manifesto de conflito.
                  </p>
                ),
              },
              {
                title: "2. Medidas preventivas",
                tone: "good",
                body: (
                  <p>
                    As opções com efeito preventivo real são definir regras de participação/papéis,
                    clarificar critérios e expectativas, criar momentos de verificação do clima, e
                    atribuir papéis rotativos — todas atuam sobre as causas de fundo (Bloco 3)
                    antes de gerarem atrito. Ignorar os sinais é o oposto de prevenção; aumentar a
                    exigência técnica não trata nenhuma das causas identificadas e pode até
                    intensificar a competição por atenção.
                  </p>
                ),
              },
              {
                title: "3. Aplicação concreta",
                body: (
                  <p>
                    Não há uma única combinação certa — o que importa é que a medida escolhida
                    responda diretamente a um sinal identificado no ponto 1, e que seja algo que
                    consiga aplicar já na próxima sessão, não apenas em teoria.
                  </p>
                ),
              },
              {
                title: "4. Abordagem fundamental",
                tone: "good",
                body: (
                  <p>
                    Isto é <strong>prevenção</strong> (Bloco 2) — está a agir antes de qualquer
                    conflito manifesto, precisamente quando é mais barato e mais eficaz agir,
                    segundo o modelo de escalada de Glasl: quanto mais cedo, maior a probabilidade
                    de uma solução onde todos ficam satisfeitos.
                  </p>
                ),
              },
            ]}
            closing="A prevenção raramente parece heróica — não há um conflito visível para «resolver». É exatamente por isso que é a abordagem mais subestimada e, ao mesmo tempo, a mais eficaz em termos de custo."
          />
        </RevealPanel>
      </section>

      <ContentCard tone="primary" title="Liga a">
        <p>Bloco 2 (abordagens fundamentais e escalada de Glasl).</p>
      </ContentCard>
    </>
  );
}
