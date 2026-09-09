import { ContentCard, Figure, SectionHeading } from "@/components/course/LessonKit";
import {
  Commentary,
  FictionNote,
  RevealPanel,
  TaskField,
  useFilled,
} from "@/components/course/ActivityKit";
import atividadeBImage from "@/assets/mf1-atividade-b-telemoveis.jpg";

type Item = {
  n: number;
  frase: string;
  estilo: string;
  referencia: { d: string; e: string; s: string };
  notas: { title: string; body: string }[];
};

const ITENS: Item[] = [
  {
    n: 1,
    frase: "«Vocês nunca prestam atenção nenhuma, é sempre a mesma coisa.»",
    estilo: "Agressiva",
    referencia: {
      d: "«Reparei que, nos últimos vinte minutos, várias pessoas estiveram a responder a mensagens no telemóvel durante a explicação.»",
      e: "«Fico preocupado, porque esta parte é a base do exercício que vem a seguir e não quero que fiquem para trás.»",
      s: "«Proponho o seguinte: faço agora uma síntese de três minutos e depois avançamos com os telemóveis de lado até ao intervalo. Funciona para todos?»",
    },
    notas: [
      {
        title: "Sai do «vocês nunca» e entra no comportamento observável",
        body: "«Nunca» e «sempre» são generalizações que ninguém consegue reconhecer como verdadeiras — provocam defesa imediata. A descrição fixa-se num intervalo de tempo e num comportamento concreto e verificável.",
      },
      {
        title: "Fala na primeira pessoa e nomeia o efeito real",
        body: "«Fico preocupado» é do emissor e não é contestável; «vocês não estão interessados» é um rótulo sobre os outros e é imediatamente contestável. O motivo dado (a ligação ao exercício seguinte) mostra que a exigência serve o grupo, não o ego do formador.",
      },
      {
        title: "Termina com um caminho concreto, não com uma queixa",
        body: "A frase original não pede nada — só desabafa. A versão assertiva propõe uma ação delimitada no tempo e pede acordo, o que transforma um confronto num combinado.",
      },
    ],
  },
  {
    n: 2,
    frase: "«Desculpem lá, se calhar não estou a explicar bem, deixem lá...»",
    estilo: "Passiva",
    referencia: {
      d: "«Estou a ver várias expressões de dúvida e poucas perguntas — o que me diz que a explicação não está a chegar como eu queria.»",
      e: "«Prefiro perceber onde está a falha do que seguir em frente às escuras.»",
      s: "«Vamos fazer assim: digam-me qual dos três passos ficou mais confuso e eu refaço esse passo com um exemplo diferente.»",
    },
    notas: [
      {
        title: "Reconhecer não é desistir",
        body: "A frase original começa bem (assume responsabilidade) e desfaz-se no fim: «deixem lá» abandona o problema e deixa o grupo sem solução. A versão assertiva mantém a responsabilidade e acrescenta continuidade.",
      },
      {
        title: "Retira os desqualificadores",
        body: "«Desculpem lá», «se calhar», «deixem lá» reduzem a autoridade de quem fala sem beneficiar ninguém. Descrever o que se observou («expressões de dúvida e poucas perguntas») é mais honesto e mais firme do que pedir desculpa por existir.",
      },
      {
        title: "Devolve o controlo ao grupo com uma tarefa clara",
        body: "Em vez de esperar que alguém salve a situação, pede-se um dado específico (qual dos três passos). Perguntas específicas obtêm respostas; «alguma dúvida?» quase nunca obtém.",
      },
    ],
  },
  {
    n: 3,
    frase: "«Se continuam a chegar atrasados, deixo de vos avisar quando há alterações.»",
    estilo: "Agressiva-punitiva",
    referencia: {
      d: "«Nas últimas três sessões começámos cerca de dez minutos depois da hora, à espera de quem chegava.»",
      e: "«Isso encurta o tempo de prática de quem está pontual, e é isso que me incomoda.»",
      s: "«A partir da próxima sessão começo à hora marcada, com um resumo de dois minutos no início para quem chegar depois. Se houver constrangimentos de transporte, falem comigo para procurarmos alternativa.»",
    },
    notas: [
      {
        title: "Substitui a ameaça por uma consequência natural e anunciada",
        body: "Retirar informação é castigo: prejudica a aprendizagem para corrigir comportamento, e mina a confiança de todo o grupo. Começar à hora é uma consequência lógica, previsível, aplicada igualmente a todos — e não retira nada a ninguém.",
      },
      {
        title: "Nomeia o prejuízo concreto e a quem afeta",
        body: "A frase original protege o formador; a versão assertiva torna visível o custo real — o tempo de prática de quem chega a horas. Isto desloca a questão do plano da obediência para o plano da justiça dentro do grupo.",
      },
      {
        title: "Deixa a porta aberta sem abdicar da regra",
        body: "O convite a falar sobre constrangimentos é escuta ativa dentro de uma mensagem assertiva: a regra mantém-se, a pessoa não é descartada. Firme no conteúdo, disponível na relação.",
      },
    ],
  },
];

export function ActivityB() {
  const k = "atividade-b";

  return (
    <>
      <section className="mt-10">
        <SectionHeading
          eyebrow="Enunciado"
          title="Três frases ditas sob pressão"
          lead="Para cada frase, escreva a sua reformulação assertiva com a técnica D.E.E. do Bloco 3 — Descrever o comportamento, Expressar o efeito, Especificar o caminho."
        />
        <FictionNote>
          Frases simuladas, típicas de momentos de cansaço ou tensão em sala. Não são atribuídas a
          nenhuma pessoa real.
        </FictionNote>
        <ContentCard tone="primary" title="Lembrete D.E.E.">
          <ul className="list-disc space-y-1 pl-5">
            <li>
              <strong>Descrever</strong> — o comportamento observável, sem rótulos nem
              generalizações («nunca», «sempre»).
            </li>
            <li>
              <strong>Expressar</strong> — o efeito em si, na primeira pessoa.
            </li>
            <li>
              <strong>Especificar</strong> — o que propõe concretamente a partir de agora.
            </li>
          </ul>
        </ContentCard>
        <Figure
          caption="Uma pausa comum numa sessão de formação — nem sempre significa o que parece."
          source="Reconstrução visual gerada por IA para fins pedagógicos."
        >
          <img
            src={atividadeBImage}
            alt="Formador em pé, com uma pausa breve a meio de uma explicação, enquanto vários formandos têm o telemóvel na mão; um deles está a escrever uma mensagem."
            loading="lazy"
            width={1536}
            height={1024}
            className="h-auto w-full max-w-full rounded-lg object-cover"
          />
        </Figure>
      </section>

      {ITENS.map((item) => {
        const idResposta = `${k}-${item.n}-resposta`;
        return (
          <ActivityBItem key={item.n} item={item} idResposta={idResposta} />
        );
      })}

      <div className="mt-8">
        <ContentCard title="O que comparar">
          <p>
            Não procure coincidência de palavras. Verifique três coisas na sua versão: fala na
            primeira pessoa? descreve o comportamento sem rotular a pessoa? termina com um caminho
            concreto?
          </p>
        </ContentCard>
      </div>
    </>
  );
}

function ActivityBItem({ item, idResposta }: { item: Item; idResposta: string }) {
  const filled = useFilled(idResposta);

  return (
    <section className="mt-12">
      <SectionHeading
        eyebrow={`Frase ${item.n} · ${item.estilo}`}
        title={item.frase}
        lead="Reescreva-a de forma assertiva, mantendo o conteúdo e mudando o efeito relacional."
      />
      <TaskField
        id={idResposta}
        label={`A sua reformulação assertiva da frase ${item.n}`}
        instruction="Pode escrever as três partes seguidas (Descrever / Expressar / Especificar) ou num único parágrafo."
        rows={6}
      />
      <RevealPanel
        id={`${idResposta}-revelado`}
        canReveal={filled}
        buttonLabel="Submeter e ver a reformulação de referência"
        lockedHint="Escreva primeiro a sua versão — comparar só tem valor depois de produzir a sua."
      >
        <Commentary
          heading={`Reformulação de referência — frase ${item.n}`}
          intro="Uma versão possível entre muitas. Repare na estrutura antes de repararem nas palavras."
          items={[
            {
              title: "Descrever",
              tone: "good",
              body: <p>{item.referencia.d}</p>,
            },
            {
              title: "Expressar",
              tone: "good",
              body: <p>{item.referencia.e}</p>,
            },
            {
              title: "Especificar",
              tone: "good",
              body: <p>{item.referencia.s}</p>,
            },
            ...item.notas.map((n) => ({
              title: `Porque funciona · ${n.title}`,
              body: <p>{n.body}</p>,
            })),
          ]}
          closing="Releia agora a sua versão com estes três critérios. Onde é que ela ainda escorrega para o rótulo, para a desculpa ou para a ameaça?"
        />
      </RevealPanel>
    </section>
  );
}
