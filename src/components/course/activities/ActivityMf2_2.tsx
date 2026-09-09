import { Scenario, SectionHeading, ContentCard, Figure } from "@/components/course/LessonKit";
import {
  CheckboxGroup,
  Commentary,
  FictionNote,
  RevealPanel,
  TaskField,
  useFilled,
} from "@/components/course/ActivityKit";
import atividadeMf2_2Image from "@/assets/mf2-atividade-2-sala-configurada.jpg";

const FATORES_CONTEXTUAIS = [
  "Pressão de tempo entre sessões consecutivas",
  "Espaço partilhado sem regras definidas",
  "Ausência de comunicação direta entre os dois formadores",
  "Falta de um protocolo/coordenação institucional",
  "Elevado número de formandos",
  "Diferenças de método pedagógico entre os dois formadores",
];

export function ActivityMf2_2() {
  const filled = useFilled(
    "mf2-atividade-2-causas",
    "mf2-atividade-2-detonador",
    "mf2-atividade-2-previsao",
  );

  return (
    <>
      <section className="mt-10">
        <SectionHeading
          eyebrow="Situação"
          title="Dois formadores, uma sala partilhada"
          lead="Leia a sequência completa antes de identificar as causas."
        />
        <FictionNote>
          Cenário fictício, construído para fins pedagógicos. Não descreve pessoas nem sessões
          reais.
        </FictionNote>
        <Scenario
          title="Dois formadores, uma sala partilhada"
          context="Cenário simulado."
          lines={[
            {
              speaker: "Contexto",
              text: "Dois formadores dão módulos diferentes ao mesmo grupo, na mesma sala, em dias consecutivos. Não existe um protocolo escrito sobre como deixar a sala organizada para o formador seguinte.",
            },
            {
              speaker: "Semana 3",
              text: "O segundo formador chega e encontra a sala com as mesas na disposição errada para o seu método (trabalho em pequenos grupos), perdendo 10 minutos a reorganizar.",
            },
            {
              speaker: "Semana 5",
              text: "Já irritado, o segundo formador envia um email seco à coordenação a queixar-se do primeiro formador «não ter cuidado nenhum com o espaço de trabalho dos outros».",
              side: "right",
            },
            {
              speaker: "Semana 6",
              text: "O primeiro formador, ao saber do email, sente-se acusado injustamente — para ele, ninguém nunca lhe disse que havia um formador a seguir com necessidades diferentes de disposição de sala.",
              side: "right",
            },
          ]}
          note="Identifique as causas em jogo antes de ver a análise de referência."
        />
        <Figure
          caption="A sala tal como foi encontrada, antes do início da sessão."
          source="Reconstrução visual gerada por IA para fins pedagógicos."
        >
          <img
            src={atividadeMf2_2Image}
            alt="Sala de formação vazia com as mesas dispostas em filas, e um formador de pé junto à porta, com uma mala a tiracolo, a observar o espaço antes do início da sessão."
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
            id="mf2-atividade-2-causas"
            label="1. Que causas de fundo (Bloco 3) reconhece nesta situação? Pode haver mais do que uma."
            instruction="Considere: recursos escassos, objetivos incompatíveis, interdependência mal gerida, diferenças de valores/estilos, falhas de comunicação."
            rows={5}
          />

          <TaskField
            id="mf2-atividade-2-detonador"
            label="2. Qual foi o detonador — o episódio concreto que tornou o problema visível — e em que é que ele difere da causa de fundo?"
            rows={4}
          />

          <CheckboxGroup
            id="mf2-atividade-2-contextuais"
            label="3. Que fatores contextuais (Bloco 3) tornam este tipo de atrito mais provável aqui?"
            options={FATORES_CONTEXTUAIS}
          />

          <TaskField
            id="mf2-atividade-2-previsao"
            label="4. Se a coordenação apenas repreendesse o primeiro formador pelo episódio da Semana 3 (tratando só o detonador), o que preveria que acontecesse depois?"
            rows={4}
          />
        </div>

        <RevealPanel id="mf2-atividade-2-revelado" canReveal={filled}>
          <Commentary
            heading="Distinguir o que gerou o problema do que o tornou visível"
            intro="Não é uma correção: é um raciocínio de referência para comparar com o seu."
            items={[
              {
                title: "1. Causas de fundo",
                tone: "good",
                body: (
                  <p>
                    A causa central é <strong>interdependência mal gerida</strong> — o trabalho de
                    um formador depende diretamente de como o outro deixa o espaço, sem que essa
                    dependência tenha sido reconhecida ou combinada. Há também uma{" "}
                    <strong>falha de comunicação</strong> de fundo: nunca foi estabelecido um canal
                    entre os dois formadores nem com a coordenação.
                  </p>
                ),
              },
              {
                title: "2. Causa vs. detonador",
                body: (
                  <p>
                    O detonador é o episódio da Semana 3 (a sala mal preparada); a causa de fundo é
                    a ausência de um protocolo de transição entre formadores. O email da Semana 5 já
                    é uma reação ao detonador, não uma nova causa.
                  </p>
                ),
              },
              {
                title: "3. Fatores contextuais",
                tone: "neutral",
                body: (
                  <p>
                    Pressão de tempo entre sessões consecutivas, espaço partilhado sem regras e
                    ausência de comunicação direta são os mais determinantes aqui; o número de
                    formandos e as diferenças de método são secundários neste caso concreto.
                  </p>
                ),
              },
              {
                title: "4. Previsão sem tratar a causa",
                tone: "warn",
                body: (
                  <p>
                    Repreender só o primeiro formador resolveria o episódio pontual mas deixaria
                    intacta a condição estrutural — o mesmo atrito tende a repetir-se, possivelmente
                    com mais ressentimento da parte de quem sente que foi culpabilizado sem lhe
                    terem explicado a exigência.
                  </p>
                ),
              },
            ]}
            closing="Notar a diferença entre causa e detonador muda a pergunta de «quem teve culpa desta vez?» para «o que precisa de mudar para isto não se repetir?» — é essa mudança de pergunta que evita o mesmo conflito com outro pretexto."
          />
        </RevealPanel>
      </section>

      <ContentCard tone="primary" title="Liga a">
        <p>Bloco 3 (causas, detonadores e fatores contextuais).</p>
      </ContentCard>
    </>
  );
}
