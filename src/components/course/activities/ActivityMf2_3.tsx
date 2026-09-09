import { Scenario, SectionHeading, ContentCard, Figure } from "@/components/course/LessonKit";
import {
  ChoiceGroup,
  Commentary,
  FictionNote,
  RevealPanel,
  TaskField,
  useFilled,
} from "@/components/course/ActivityKit";
import atividadeMf2_3Image from "@/assets/mf2-atividade-3-distancia-residual.jpg";

export function ActivityMf2_3() {
  const filled = useFilled(
    "mf2-atividade-3-funcional",
    "mf2-atividade-3-disfuncional",
    "mf2-atividade-3-aprendizagem",
  );

  return (
    <>
      <section className="mt-10">
        <SectionHeading
          eyebrow="Situação"
          title="O que ficou depois do desacordo"
          lead="Um conflito «resolvido» nem sempre deixa de ter custos — analise o que ficou."
        />
        <FictionNote>
          Cenário fictício, construído para fins pedagógicos. Não descreve pessoas nem sessões
          reais.
        </FictionNote>
        <Scenario
          title="O que ficou depois do desacordo"
          context="Cenário simulado, algumas semanas depois de um conflito aberto entre dois formandos sobre a divisão de tarefas num trabalho de grupo."
          lines={[
            {
              speaker: "O que aconteceu",
              text: "O desacordo foi resolvido com a ajuda do formador, que ajudou os dois formandos a redistribuir tarefas de forma mais clara.",
            },
            {
              speaker: "Três semanas depois",
              text: "Os dois formandos continuam a trabalhar juntos quando é preciso, mas evitam-se em contextos informais e um deles admite, em privado, que «prefere não voltar a apanhar com ele no mesmo grupo».",
              side: "right",
            },
            {
              speaker: "No grupo mais alargado",
              text: "O incidente levou o formador a introduzir, para todos os trabalhos de grupo seguintes, uma grelha explícita de divisão de tarefas — o que reduziu visivelmente disputas semelhantes nos grupos seguintes.",
              side: "right",
            },
          ]}
          note="Preencha os campos antes de ver a análise de referência."
        />
        <Figure
          caption="A mesma mesa de trabalho, depois de o desacordo ter sido resolvido."
          source="Reconstrução visual gerada por IA para fins pedagógicos."
        >
          <img
            src={atividadeMf2_3Image}
            alt="Dois formandos sentados em extremos opostos da mesma mesa de trabalho, ambos com documentos à frente, sem contacto visual entre si, enquanto os restantes colegas conversam à volta."
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
            id="mf2-atividade-3-funcional"
            label="1. Que consequências funcionais (Bloco 3) consegue identificar nesta situação — para o grupo alargado, não só para os dois formandos?"
            rows={4}
          />

          <TaskField
            id="mf2-atividade-3-disfuncional"
            label="2. Que consequências disfuncionais consegue identificar — mesmo tendo o conflito sido «resolvido» na superfície?"
            rows={4}
          />

          <ChoiceGroup
            id="mf2-atividade-3-classificacao"
            label="3. No global, classificaria o desfecho deste episódio como..."
            options={[
              { key: "func", label: "A", text: "Predominantemente funcional" },
              { key: "disfunc", label: "B", text: "Predominantemente disfuncional" },
              {
                key: "mista",
                label: "C",
                text: "Marcadamente misto — funcional a um nível, disfuncional a outro",
              },
            ]}
          />
          <TaskField
            id="mf2-atividade-3-classificacao-just"
            label="Justifique"
            rows={3}
          />

          <TaskField
            id="mf2-atividade-3-aprendizagem"
            label="4. Que impacto específico teve este episódio na aprendizagem e na relação pedagógica — não apenas na relação entre os dois formandos?"
            rows={4}
          />
        </div>

        <RevealPanel id="mf2-atividade-3-revelado" canReveal={filled}>
          <Commentary
            heading="Funcional para uns, disfuncional para outros"
            intro="Não há uma única leitura certa — compare o seu raciocínio com este."
            items={[
              {
                title: "1. Consequências funcionais",
                tone: "good",
                body: (
                  <p>
                    A grelha de divisão de tarefas introduzida para todo o grupo é o exemplo mais
                    claro — uma regra de processo que não existia antes e que beneficia todos os
                    grupos seguintes, não só os dois formandos envolvidos.
                  </p>
                ),
              },
              {
                title: "2. Consequências disfuncionais",
                tone: "warn",
                body: (
                  <p>
                    O evitamento social que persiste três semanas depois é um custo residual claro
                    (liga ao Bloco 4 — o «resíduo» de Pondy e os 67% de evitamento reportados no
                    CPP 2008); a relação entre os dois formandos ficou mais pobre, mesmo com a
                    tarefa «resolvida».
                  </p>
                ),
              },
              {
                title: "3. Classificação global",
                tone: "neutral",
                body: (
                  <p>
                    A leitura mais rica é «marcadamente mista» — funcional ao nível do grupo e do
                    processo, disfuncional ao nível da relação interpessoal entre os dois
                    envolvidos. Reduzir a um único rótulo (só funcional, ou só disfuncional) perde
                    esta distinção importante.
                  </p>
                ),
              },
              {
                title: "4. Impacto na aprendizagem",
                body: (
                  <p>
                    A introdução da grelha é uma melhoria de processo que provavelmente aumenta a
                    qualidade dos trabalhos seguintes; mas se o evitamento entre os dois formandos
                    os levar a participar menos abertamente noutros exercícios conjuntos, há também
                    um custo de aprendizagem a monitorizar.
                  </p>
                ),
              },
            ]}
            closing="Um conflito raramente é «só» funcional ou «só» disfuncional — o exercício de o analisar aos dois níveis (grupo e indivíduos) é o que evita declarar uma situação encerrada quando ainda há resíduo por tratar."
          />
        </RevealPanel>
      </section>

      <ContentCard tone="primary" title="Liga a">
        <p>Bloco 3 (consequências) e Bloco 4 (impacto no indivíduo).</p>
      </ContentCard>
    </>
  );
}
