import { Scenario, SectionHeading, ContentCard, Figure } from "@/components/course/LessonKit";
import {
  Commentary,
  FictionNote,
  RevealPanel,
  TaskField,
  useFilled,
} from "@/components/course/ActivityKit";
import atividadeMf2_4Image from "@/assets/mf2-atividade-4-formacao-online.jpg";

export function ActivityMf2_4() {
  const filled = useFilled(
    "mf2-atividade-4-origem",
    "mf2-atividade-4-manutencao",
    "mf2-atividade-4-percecao",
    "mf2-atividade-4-prevencao",
  );

  return (
    <>
      <section className="mt-10">
        <SectionHeading
          eyebrow="Situação"
          title="Uma pergunta, duas versões"
          lead="Quatro momentos, quatro papéis diferentes na mesma trajetória."
        />
        <FictionNote>
          Cenário fictício, construído para fins pedagógicos. Não descreve pessoas nem sessões
          reais.
        </FictionNote>
        <Scenario
          title="Uma pergunta, duas versões"
          context="Cenário simulado, sessão online, chat de grupo."
          lines={[
            {
              speaker: "Momento 1",
              text: "Um formando faz uma pergunta no chat sobre um exercício. Outro formando responde com um comentário sarcástico («já foi explicado três vezes, mas pronto»).",
            },
            {
              speaker: "Momento 2",
              text: "O primeiro formando não volta a escrever no chat pelo resto da sessão.",
              side: "right",
            },
            {
              speaker: "Momento 3",
              text: "Reparando no silêncio, o segundo formando comenta para um terceiro, em privado: «ele está só a ser dramático, nem foi assim tão grave».",
            },
            {
              speaker: "Momento 4",
              text: "Um terceiro formando, mais tarde, escreve no chat geral: «boa pergunta, também tinha essa dúvida — alguém consegue explicar de outra forma?», sem mencionar o episódio.",
              side: "right",
            },
          ]}
          note="Preencha os campos antes de ver a análise de referência."
        />
        <Figure
          caption="A sessão tal como decorre do lado do formando, em teletrabalho."
          source="Reconstrução visual gerada por IA para fins pedagógicos."
        >
          <img
            src={atividadeMf2_4Image}
            alt="Vista sobre o ombro de uma pessoa em teletrabalho, sentada a uma secretária em casa, a participar numa sessão de formação online; no ecrã do portátil veem-se vários participantes em vídeo e um painel de conversação lateral."
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
            id="mf2-atividade-4-origem"
            label="1. Quem teve o primeiro papel na origem desta tensão, e que comportamento concreto o revela?"
            rows={3}
          />

          <TaskField
            id="mf2-atividade-4-manutencao"
            label="2. Depois do silêncio do primeiro formando (Momento 2), o que fez o segundo formando (Momento 3) e como isso contribuiu para manter ou agravar a situação, mesmo sem confronto direto?"
            rows={4}
          />

          <TaskField
            id="mf2-atividade-4-percecao"
            label="3. Que mecanismo de perceção estudado no Bloco 4 (realismo ingénuo / erro de atribuição) reconhece na forma como o segundo formando interpreta o silêncio do colega («está só a ser dramático»)?"
            rows={4}
          />

          <TaskField
            id="mf2-atividade-4-prevencao"
            label="4. Que papel teve a ação do terceiro formando (Momento 4)? O que a torna diferente, em termos de efeito, das ações anteriores?"
            rows={4}
          />
        </div>

        <RevealPanel id="mf2-atividade-4-revelado" canReveal={filled}>
          <Commentary
            heading="Cada momento tem um papel diferente na trajetória"
            intro="Não há uma única leitura certa — compare o seu raciocínio com este."
            items={[
              {
                title: "1. Origem",
                body: (
                  <p>
                    O comentário sarcástico do segundo formando é o gatilho inicial mais direto —
                    ainda que pareça pequeno, é uma ação que interfere com a participação do colega.
                  </p>
                ),
              },
              {
                title: "2. Manutenção",
                tone: "warn",
                body: (
                  <p>
                    O segundo formando não repete o comentário sarcástico diretamente, mas ao
                    comentar em privado que o colega «está a ser dramático» reforça a sua própria
                    leitura sem verificar o que realmente se passou — mantém e legitima a tensão em
                    vez de a dissolver, mesmo sem novo confronto público.
                  </p>
                ),
              },
              {
                title: "3. Perceção",
                tone: "neutral",
                body: (
                  <p>
                    É um exemplo claro de <strong>realismo ingénuo</strong> (Ross, Bloco 4) — o
                    segundo formando trata a sua própria leitura («não foi grave») como um facto
                    objetivo, e desqualifica a reação do colega atribuindo-a a um traço pessoal
                    («dramático») em vez de considerar o efeito real do seu próprio comentário.
                  </p>
                ),
              },
              {
                title: "4. Prevenção",
                tone: "good",
                body: (
                  <p>
                    A ação do terceiro formando tem efeito oposto — reformula a pergunta original
                    como legítima e convida a uma nova resposta, sem apontar culpas nem reabrir o
                    episódio. É uma micro-ação preventiva: normaliza a pergunta e cria espaço para o
                    primeiro formando voltar a participar sem precisar de se justificar.
                  </p>
                ),
              },
            ]}
            closing="Nenhum destes formandos controla os outros dois — mas cada um controla a sua própria próxima ação, e é aí que a trajetória do conflito realmente se decide, momento a momento."
          />
        </RevealPanel>
      </section>

      <ContentCard tone="primary" title="Liga a">
        <p>Bloco 4 (papel do indivíduo e perceção).</p>
      </ContentCard>
    </>
  );
}
