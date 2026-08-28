import { Scenario, SectionHeading, ContentCard } from "@/components/course/LessonKit";
import {
  ChoiceGroup,
  Commentary,
  FictionNote,
  RevealPanel,
  TaskField,
  useFilled,
} from "@/components/course/ActivityKit";

export function ActivityMf2_1() {
  const filled = useFilled(
    "mf2-atividade-1-fase",
    "mf2-atividade-1-nivel-just",
    "mf2-atividade-1-conteudo",
    "mf2-atividade-1-sinais",
  );

  return (
    <>
      <section className="mt-10">
        <SectionHeading
          eyebrow="Situação"
          title="Duas turmas de formandos, um mesmo curso"
          lead="Acompanhe a evolução ao longo das quatro sessões antes de analisar."
        />
        <FictionNote>
          Cenário fictício, construído para fins pedagógicos. Não descreve pessoas nem sessões
          reais.
        </FictionNote>
        <Scenario
          title="Duas turmas de formandos, um mesmo curso"
          context="Cenário simulado, ao longo de quatro sessões."
          lines={[
            {
              speaker: "Sessão 1",
              text: "O grupo divide-se espontaneamente em dois subgrupos de trabalho. Um prefere avançar depressa pela matéria teórica; o outro insiste em mais tempo de estudo de caso antes de cada tópico novo.",
            },
            {
              speaker: "Sessão 2",
              text: "A divergência mantém-se, mas ainda é discutida abertamente nos intervalos, com humor.",
            },
            {
              speaker: "Sessão 3",
              text: "Num exercício conjunto, um formando do primeiro subgrupo critica publicamente o ritmo da sessão, dizendo que «se calhar quem quer ir mais devagar devia estudar por fora».",
              side: "right",
            },
            {
              speaker: "Sessão 4",
              text: "Nos trabalhos de grupo seguintes, os dois subgrupos deixam de se misturar por iniciativa própria e passam a ignorar as sugestões um do outro.",
              side: "right",
            },
          ]}
          note="Preencha os quatro campos abaixo com o seu próprio raciocínio antes de ver a análise de referência."
        />
      </section>

      <section className="mt-10">
        <SectionHeading
          eyebrow="A sua análise"
          title="Quatro campos"
          lead="Uma ou duas frases por campo são suficientes."
        />
        <div className="space-y-4">
          <TaskField
            id="mf2-atividade-1-fase"
            label="1. Em que fase do processo de conflito (Pondy, Bloco 1) diria que esta situação está no final da Sessão 4, e porquê?"
            instruction="Considere as cinco fases: latente, percebido, sentido, manifesto, resíduo."
          />

          <ChoiceGroup
            id="mf2-atividade-1-nivel"
            label="2. Que nível de conflito (Rahim, Bloco 1) está predominantemente em jogo?"
            options={[
              { key: "inter", label: "A", text: "Interpessoal — entre duas pessoas específicas" },
              {
                key: "intra",
                label: "B",
                text: "Intragrupal — dentro do mesmo grupo de formandos",
              },
              {
                key: "intergrupo",
                label: "C",
                text: "Intergrupal — entre dois subgrupos que se formaram e se opõem",
              },
            ]}
          />
          <TaskField
            id="mf2-atividade-1-nivel-just"
            label="Justifique a sua escolha"
            rows={3}
          />

          <TaskField
            id="mf2-atividade-1-conteudo"
            label="3. Que tipo de conflito, por conteúdo (Jehn, Bloco 1), predomina — de tarefa, de processo ou relacional? Diria que se manteve estável ao longo das quatro sessões, ou que mudou de tipo? Justifique."
            rows={5}
          />

          <TaskField
            id="mf2-atividade-1-sinais"
            label="4. Que sinal concreto do enunciado marca, na sua leitura, a transição da fase «sentida» para a fase «manifesta»?"
            rows={3}
          />
        </div>

        <RevealPanel id="mf2-atividade-1-revelado" canReveal={filled}>
          <Commentary
            heading="Como ler esta evolução"
            intro="Não há uma única leitura certa — compare o seu raciocínio com este."
            items={[
              {
                title: "1. Fase do processo",
                body: (
                  <p>
                    Pela Sessão 4, já não é apenas «sentida» — há comportamento observável (deixar
                    de se misturar, ignorar sugestões): é <strong>fase manifesta</strong>. É
                    importante notar que o «resíduo» ainda não se formou, porque o episódio está em
                    curso, não encerrado.
                  </p>
                ),
              },
              {
                title: "2. Nível predominante",
                tone: "good",
                body: (
                  <p>
                    <strong>Intergrupal</strong> é a leitura mais precisa a partir da Sessão 3-4,
                    porque a linha de oposição já não passa por indivíduos isolados mas por dois
                    subgrupos coesos que agem como unidades. Nas Sessões 1-2 seria mais discutível
                    — a divergência ainda não tinha subgrupos definidos a agir coletivamente.
                  </p>
                ),
              },
              {
                title: "3. Tipo por conteúdo",
                tone: "warn",
                body: (
                  <p>
                    Começa como conflito de <strong>tarefa/processo</strong> (ritmo, método de
                    trabalho) mas o comentário da Sessão 3 («devia estudar por fora») introduz um
                    elemento <strong>relacional</strong> — deixa de ser só sobre o ritmo e passa a
                    incluir uma crítica pessoal veiculada. Nomear esta mudança é importante: a
                    investigação (De Dreu &amp; Weingart, Bloco 1) mostra que o conflito relacional
                    é o mais associado a pior desempenho e satisfação.
                  </p>
                ),
              },
              {
                title: "4. Sinal de transição",
                body: (
                  <p>
                    O comentário público na Sessão 3 é o ponto de viragem mais claro — de tensão
                    latente/sentida (discutida com humor) para comportamento manifesto e hostil.
                  </p>
                ),
              },
            ]}
            closing="Repare que diagnosticar corretamente (fase, nível, tipo) é o que torna possível escolher a abordagem certa no Bloco 2 — antes de pensar em intervir, é preciso saber com que se está a lidar."
          />
        </RevealPanel>
      </section>

      <ContentCard tone="primary" title="Liga a">
        <p>Bloco 1 (fases, níveis e tipos de conflito).</p>
      </ContentCard>
    </>
  );
}
