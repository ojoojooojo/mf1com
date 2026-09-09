import { ContentCard, Figure, Scenario, SectionHeading } from "@/components/course/LessonKit";
import {
  ChoiceGroup,
  Commentary,
  FictionNote,
  RevealPanel,
  TaskField,
  useFilled,
} from "@/components/course/ActivityKit";
import { useProgress } from "@/lib/progress";
import atividadeCImage from "@/assets/mf1-atividade-c-desafio-publico.jpg";

const OPCOES = [
  {
    key: "a",
    label: "A",
    text: "«Pois, mas eu é que estou a dar a formação.»",
  },
  {
    key: "b",
    label: "B",
    text: "«Interessante — pode dar-nos um exemplo da sua experiência? Ajuda-nos a ligar isto à prática real.»",
  },
  {
    key: "c",
    label: "C",
    text: "«Vamos manter o foco no que está previsto para hoje, se faz favor.»",
  },
  {
    key: "d",
    label: "D",
    text: "«Tem razão em parte, e há também esta outra perspetiva — podemos explorar as duas?»",
  },
];

export function ActivityC() {
  const k = "atividade-c";
  const { state, hydrated } = useProgress();
  const escolha = hydrated ? state.answers[`${k}-escolha`] : undefined;
  const justificado = useFilled(`${k}-justificacao`);
  const canReveal = Boolean(escolha) && justificado;

  return (
    <>
      <section className="mt-10">
        <SectionHeading
          eyebrow="Situação"
          title="A competência do formador é desafiada em público"
          lead="Um momento de tensão que quase todos os formadores encontram — e em que a primeira frase determina o resto da sessão."
        />
        <FictionNote>
          Situação fictícia, criada para fins pedagógicos.
        </FictionNote>
        <Scenario
          title="A meio de uma explicação"
          context="Cenário simulado. Grupo de 12 formandos, sessão da tarde."
          lines={[
            {
              speaker: "Formando",
              text: "«Isto que está a dizer nem sequer é assim na prática, já trabalhei nesta área.»",
            },
            {
              speaker: "Formador",
              text: "(silêncio de dois segundos — todo o grupo está a olhar)",
              side: "right",
            },
          ]}
          note="Escolha a resposta que daria e justifique brevemente. Só depois verá o comentário a cada uma das quatro — nenhuma é «a única certa»."
        />
        <Figure
          caption="O momento imediatamente a seguir ao desafio em público."
          source="Reconstrução visual gerada por IA para fins pedagógicos."
        >
          <img
            src={atividadeCImage}
            alt="Grupo de formandos numa sala, todos com o olhar virado para um colega que acabou de falar, sentado numa postura direita e com os braços apoiados na mesa; ao fundo, de costas, veem-se os ombros do formador."
            loading="lazy"
            width={1536}
            height={1024}
            className="h-auto w-full max-w-full rounded-lg object-cover"
          />
        </Figure>
      </section>

      <section className="mt-10">
        <SectionHeading eyebrow="A sua decisão" title="Escolha e justifique" />
        <div className="space-y-4">
          <ChoiceGroup
            id={`${k}-escolha`}
            label="Que resposta daria?"
            instruction="Escolha uma das quatro."
            options={OPCOES}
          />
          <TaskField
            id={`${k}-justificacao`}
            label="Porque escolheu essa resposta?"
            instruction="Duas ou três frases. Que efeito espera que ela produza no formando e no resto do grupo?"
            rows={4}
          />
        </div>

        <RevealPanel
          id={`${k}-revelado`}
          canReveal={canReveal}
          buttonLabel="Submeter e ver o comentário às quatro respostas"
          lockedHint="Escolha uma resposta e escreva a sua justificação antes de avançar."
        >
          <Commentary
            heading="Comentário às quatro respostas"
            intro={
              escolha ? (
                <>
                  A sua escolha foi a opção <strong>{escolha.toUpperCase()}</strong>. Leia todas —
                  incluindo aquelas que descartou, porque é aí que costuma estar a aprendizagem.
                </>
              ) : (
                "Leia todas — incluindo aquelas que descartou."
              )
            }
            items={[
              {
                title: "A) «Pois, mas eu é que estou a dar a formação.» — defensiva / hierárquica",
                tone: "warn",
                body: (
                  <>
                    <p>
                      Resolve o desconforto do formador em três segundos e cria um problema que dura
                      o resto do curso. Invoca autoridade de posição precisamente no momento em que
                      a autoridade posta em causa era a de conteúdo — e autoridade invocada é
                      autoridade que já não se sustenta sozinha.
                    </p>
                    <p>
                      Do ponto de vista dos estilos do Bloco 3, é agressiva: ganha o confronto e
                      perde a relação. O grupo aprende, nesse instante, que discordar tem custo — e
                      o feedback (Bloco 1) desaparece da sala durante o resto da formação.
                    </p>
                    <p className="text-muted-foreground">
                      Prós honestos: interrompe imediatamente uma escalada. Se houvesse agressividade
                      real ou desrespeito pessoal, seria legítimo pôr um limite firme — mas com uma
                      formulação assertiva, não hierárquica.
                    </p>
                  </>
                ),
              },
              {
                title:
                  "B) «Interessante — pode dar-nos um exemplo da sua experiência?» — curiosa / inclusiva",
                tone: "good",
                body: (
                  <>
                    <p>
                      É a resposta que mais claramente aplica escuta ativa (Bloco 5): não se defende,
                      não julga, e convida a pessoa a dizer mais. Transforma uma objeção em
                      contributo e, ao pedir um exemplo concreto, traz a discussão do plano das
                      afirmações gerais para o plano dos factos, onde é tratável.
                    </p>
                    <p>
                      Tem ainda um efeito de grupo importante: mostra que a experiência dos
                      formandos tem lugar na sala. Em formação de adultos, esse é um dos ganhos
                      pedagógicos maiores que existem.
                    </p>
                    <p className="text-muted-foreground">
                      Risco a gerir: sem enquadramento posterior, pode ficar a ideia de que o
                      conteúdo apresentado ficou invalidado. Depois do exemplo, é preciso nomear a
                      diferença — «na sua experiência funcionou assim; o modelo descreve outro
                      contexto, e vale a pena ver porquê».
                    </p>
                  </>
                ),
              },
              {
                title: "C) «Vamos manter o foco no que está previsto para hoje.» — evasiva",
                tone: "warn",
                body: (
                  <>
                    <p>
                      Não confronta e não escuta: adia. É o estilo passivo do Bloco 3 disfarçado de
                      gestão de tempo. O sentimento por trás da intervenção (ser reconhecido pela
                      sua experiência) fica sem resposta e tende a voltar — mais tarde, mais forte,
                      ou em murmúrio com o colega ao lado.
                    </p>
                    <p className="text-muted-foreground">
                      Prós reais: é defensável quando o tempo é curto e o tema é lateral — mas então
                      deve vir com um compromisso explícito («fica anotado, retomamos no final»), e
                      esse compromisso tem de ser cumprido. Sem isso, é fuga.
                    </p>
                  </>
                ),
              },
              {
                title:
                  "D) «Tem razão em parte, e há também esta outra perspetiva.» — validação parcial + assertiva",
                tone: "good",
                body: (
                  <>
                    <p>
                      Combina reconhecimento e firmeza: valida o que há de válido, mantém o conteúdo
                      e propõe explorar as duas leituras. É assertiva no sentido pleno — clara sobre
                      a própria posição, respeitosa quanto à do outro.
                    </p>
                    <p>
                      Nota importante: só funciona se a validação for verdadeira. «Tem razão em
                      parte» dito por hábito, sem identificar em que parte, é lido como técnica — e
                      Rogers e Farson avisam exatamente sobre isso: a escuta ativa não se aplica de
                      ânimo indiferente.
                    </p>
                    <p className="text-muted-foreground">
                      B e D são ambas boas e servem momentos diferentes: <strong>B</strong> quando
                      ainda não se sabe o que o formando quer dizer (falta informação);{" "}
                      <strong>D</strong> quando a objeção é clara e se pode responder já ao conteúdo.
                      Na prática, a sequência mais forte é frequentemente B seguida de D.
                    </p>
                  </>
                ),
              },
            ]}
            closing="Releia a sua justificação: o critério que usou foi proteger a sua autoridade, proteger o tempo da sessão, ou compreender o que o formando estava realmente a trazer? É esse critério — mais do que a opção escolhida — que define o seu estilo em situações de conflito emergente."
          />
        </RevealPanel>
      </section>

      <div className="mt-8">
        <ContentCard tone="primary" title="Liga a">
          <p>Bloco 3 (estilos de comunicação e assertividade) e Bloco 5 (escuta ativa e empatia).</p>
        </ContentCard>
      </div>
    </>
  );
}
