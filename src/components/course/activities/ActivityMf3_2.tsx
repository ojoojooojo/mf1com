import { ContentCard, Scenario, SectionHeading } from "@/components/course/LessonKit";
import {
  ChoiceGroup,
  Commentary,
  useChosen,
  FictionNote,
  RevealPanel,
  TaskField,
  useFilled,
} from "@/components/course/ActivityKit";

const STYLE_OPTIONS = [
  {
    key: "competir",
    label: "A",
    text: "Competir — afirmar que a decisão do critério é sua, relembrar que está no plano de sessão e encerrar o assunto ali.",
  },
  {
    key: "colaborar",
    label: "B",
    text: "Colaborar — parar o exercício, explicitar o que preocupa cada lado e redesenhar o critério com o grupo.",
  },
  {
    key: "comprometer",
    label: "C",
    text: "Comprometer — manter o critério para este exercício e aceitar alterá-lo no exercício seguinte.",
  },
  {
    key: "evitar",
    label: "D",
    text: "Evitar — não abordar a objeção agora, deixar o exercício correr e ver se a questão volta a surgir.",
  },
  {
    key: "acomodar",
    label: "E",
    text: "Acomodar — aceitar a proposta do grupo e substituir imediatamente o critério pelo que eles pedem.",
  },
];

export function ActivityMf3_2() {
  const filled = useFilled("mf3-atividade-2-comparacao");
  const chose1 = useChosen("mf3-atividade-2-estilo-1");
  const chose2 = useChosen("mf3-atividade-2-estilo-2");


  return (
    <>
      {/* Situação 1 */}
      <section className="mt-10">
        <SectionHeading
          eyebrow="Situação 1"
          title="A objeção ao critério de avaliação"
          lead="Leia o cenário e escolha a estratégia que efetivamente usaria — não a que parece mais bem vista."
        />
        <FictionNote>
          Cenário fictício, construído para fins pedagógicos. Não descreve pessoas nem sessões reais.
        </FictionNote>
        <Scenario
          title="«Este critério não faz sentido para o nosso trabalho»"
          context="Formação técnica de 35 horas, terceira sessão de sete. Grupo de nove adultos com experiência profissional na área. Está a lançar um exercício prático que será avaliado."
          lines={[
            {
              speaker: "Formador (você)",
              text: "O exercício vale para avaliação e o critério principal é o cumprimento da sequência de procedimento que vimos hoje.",
              side: "right",
            },
            {
              speaker: "Hélder",
              text: "Desculpe, mas isso não faz sentido para o nosso trabalho. Na prática, quem trabalha bem salta passos consoante a situação. Se nos avaliar pela sequência, avalia quem decora, não quem sabe.",
            },
            {
              speaker: "Duas outras pessoas",
              text: "(assentem com a cabeça; uma acrescenta «é verdade»)",
            },
            {
              speaker: "Restantes participantes",
              text: "(silêncio, à espera da sua resposta; faltam 40 minutos para o fim da sessão)",
            },
          ]}
          note="Hélder não está a ser desrespeitoso e o argumento dele é tecnicamente defensável. Nenhuma das cinco estratégias abaixo é absurda nesta situação."
        />
        <ChoiceGroup
          id="mf3-atividade-2-estilo-1"
          label="Que estratégia escolhe nesta primeira situação?"
          instruction="Escolha a que realmente usaria e depois veja a consequência plausível dessa escolha."
          options={STYLE_OPTIONS}
        />
        <RevealPanel
          id="mf3-atividade-2-consequencias-1"
          buttonLabel="Submeter a escolha e ver as consequências"
          lockedHint="Escolha uma estratégia antes de ver as consequências."
          canReveal={chose1}
        >
          <Commentary
            heading="Consequências plausíveis de cada escolha"
            intro="Cada estratégia produziria um resultado diferente — e todas têm um custo. Localize a sua."
            items={[
              {
                title: "A — Competir",
                body: (
                  <p>
                    O exercício arranca em dois minutos e o programa cumpre-se. Hélder cumpre a
                    sequência, mas apresenta o trabalho sem nada de próprio, e o argumento dele
                    circula no intervalo em vez da sala. Numa turma de adultos com experiência
                    profissional, o custo típico é este: a objeção não desaparece, muda de lugar.
                    Seria a escolha ajustada se a objeção fosse sobre uma regra de segurança
                    inegociável — não é o caso.
                  </p>
                ),
              },
              {
                title: "B — Colaborar",
                tone: "good",
                body: (
                  <p>
                    Ao explicitar o que cada lado protege — você, verificar se a sequência foi
                    compreendida; eles, ser avaliados pelo julgamento técnico — chega-se em dez
                    minutos a um critério de duas partes: cumprir a sequência{" "}
                    <em>ou</em> justificar cada desvio. O grupo mobiliza-se e o exercício fica
                    melhor. O custo é real: dez dos quarenta minutos disponíveis, e o exercício
                    termina apertado.
                  </p>
                ),
              },
              {
                title: "C — Comprometer",
                body: (
                  <p>
                    Fecha-se a questão em dois minutos e o exercício corre no tempo previsto. Hélder
                    aceita, sem entusiasmo, e a discussão de fundo — o que é ser competente nesta
                    área — nunca chega a acontecer. Solução aceitável, aprendizagem menor. Se
                    faltassem dez minutos em vez de quarenta, seria a escolha mais sensata.
                  </p>
                ),
              },
              {
                title: "D — Evitar",
                tone: "warn",
                body: (
                  <p>
                    O exercício arranca sem confronto imediato, o que é uma vantagem real quando o
                    formador não tem, no momento, uma resposta pensada. Mas o critério continua a
                    valer para avaliação e ninguém sabe se foi mantido ou não: durante o exercício
                    três pessoas perguntam separadamente «então conta a sequência ou não?», e você
                    responde de forma diferente a cada uma. A ambiguidade sobre avaliação é o
                    material com que se constroem conflitos maiores.
                  </p>
                ),
              },
              {
                title: "E — Acomodar",
                body: (
                  <p>
                    Hélder e os dois apoiantes ficam satisfeitos e o exercício arranca depressa. Só
                    que o critério novo foi definido por quem falou mais alto, e três participantes
                    menos experientes — que precisavam da sequência como suporte — ficam a ser
                    avaliados por um padrão que os desfavorece e que não pediram. Acomodar tem
                    sentido quando o assunto importa claramente mais ao outro; aqui importava também
                    a quem estava calado.
                  </p>
                ),
              },
            ]}
            closing="Nenhuma destas cinco leituras é a resposta certa: são cinco custos diferentes. A competência está em saber qual está a comprar."
          />
        </RevealPanel>
      </section>

      {/* Situação 2 — variante */}
      <section className="mt-12">
        <SectionHeading
          eyebrow="Situação 2 — variante"
          title="Mesmo assunto, contexto mudado"
          lead="A estratégia que resultou na primeira situação deixa de servir aqui. Escolha outra vez."
        />
        <Scenario
          title="A mesma objeção, na última sessão e com a chefia presente"
          context="Sétima e última sessão do mesmo curso. A avaliação final ocorre hoje e os resultados são comunicados à entidade empregadora. Está presente, como observadora, a coordenadora do serviço — que é chefia direta de Hélder e de quatro dos participantes. Faltam 25 minutos."
          lines={[
            {
              speaker: "Hélder",
              text: "Volto a dizer o mesmo: se nos avaliar pela sequência, o resultado não reflete o nosso trabalho. E hoje isto vai para a empresa.",
            },
            {
              speaker: "Coordenadora (observadora)",
              text: "(toma notas, sem intervir)",
            },
            {
              speaker: "Quatro participantes",
              text: "(olham para a coordenadora e não dizem nada; dois que na sessão 3 tinham apoiado Hélder mantêm-se agora em silêncio)",
            },
            {
              speaker: "Hélder",
              text: "Na terceira sessão ficou combinado que isto se resolvia. Não se resolveu.",
            },
          ]}
          note="Três coisas mudaram: o tempo disponível, a presença de uma assimetria hierárquica na sala, e o facto de a decisão ter consequências externas à formação. Uma quarta mudou também: existe agora um histórico entre vocês."
        />
        <ChoiceGroup
          id="mf3-atividade-2-estilo-2"
          label="Que estratégia escolhe nesta variante?"
          instruction="Repare que a sua escolha anterior pode ter deixado de ser viável."
          options={STYLE_OPTIONS}
        />
        <RevealPanel
          id="mf3-atividade-2-consequencias-2"
          buttonLabel="Submeter a escolha e ver as consequências"
          lockedHint="Escolha uma estratégia antes de ver as consequências."
          canReveal={chose2}
        >
          <Commentary
            heading="O que mudou nas consequências"
            intro="As mesmas cinco estratégias, com custos redistribuídos pelo novo contexto."
            items={[
              {
                title: "A — Competir",
                tone: "warn",
                body: (
                  <p>
                    Encerrar por autoridade resolve os 25 minutos, mas fá-lo à frente da chefia de
                    Hélder. O que na sessão 3 seria firmeza torna-se aqui exposição pública de um
                    subordinado diante de quem o avalia profissionalmente — um custo que já não é
                    pedagógico, é laboral. E o compromisso não cumprido da sessão 3 fica sem
                    resposta.
                  </p>
                ),
              },
              {
                title: "B — Colaborar",
                body: (
                  <p>
                    A estratégia que funcionava na sessão 3 deixou de ser viável, por duas razões
                    independentes: não há tempo para uma exploração de interesses, e a presença da
                    coordenadora torna improvável que os quatro subordinados digam o que pensam.
                    Uma colaboração em que metade do grupo não pode falar produz um acordo aparente,
                    não um acordo.
                  </p>
                ),
              },
              {
                title: "C — Comprometer",
                tone: "good",
                body: (
                  <p>
                    Reconhecer explicitamente o compromisso não cumprido, aplicar hoje o critério
                    já anunciado e acrescentar que cada participante pode registar por escrito a
                    justificação técnica dos seus desvios — que será considerada — atende
                    parcialmente aos dois lados dentro do tempo existente, sem expor ninguém. É
                    provavelmente a escolha mais defensável aqui, e continua a ter um custo: a
                    discussão de fundo volta a ficar sem lugar.
                  </p>
                ),
              },
              {
                title: "D — Evitar",
                body: (
                  <p>
                    Já não é uma opção disponível. Na sessão 3, evitar custava ambiguidade; aqui a
                    objeção é explícita, pública, fundada num compromisso anterior e diante de uma
                    observadora externa. Não responder é, em si, uma resposta — e é lida pelo grupo
                    e pela coordenadora como incapacidade de sustentar o próprio critério.
                  </p>
                ),
              },
              {
                title: "E — Acomodar",
                body: (
                  <p>
                    Ceder agora, no dia da avaliação e com a chefia presente, altera o padrão de
                    avaliação depois de o trabalho estar feito. Beneficia quem argumentou, prejudica
                    quem preparou o exercício segundo o critério anunciado, e comunica à coordenadora
                    que os critérios desta formação se negociam sob pressão. O que na sessão 3 seria
                    generosidade discutível é aqui um problema de equidade.
                  </p>
                ),
              },
            ]}
            closing="A lição operacional não é «comprometer é melhor». É que o tempo disponível, a composição da sala e o histórico entre as partes alteram qual estratégia é viável — e que quanto mais tarde se trata um assunto, menos estratégias restam."
          />
        </RevealPanel>
      </section>

      {/* Fecho escrito */}
      <section className="mt-12">
        <SectionHeading
          eyebrow="Análise"
          title="O que mudou entre as duas situações"
          lead="Este é o registo que fica na sua conta."
        />
        <TaskField
          id="mf3-atividade-2-comparacao"
          label="Compare as duas situações e explique por que motivo a estratégia teve — ou não teve — de ser diferente."
          instruction="Aborde: (1) que estratégia escolheu em cada situação; (2) quais das mudanças de contexto foram decisivas para si (tempo, hierarquia presente, consequências externas, histórico entre as partes); (3) o que isso lhe diz sobre o custo de deixar um assunto em aberto de uma sessão para a seguinte."
          rows={8}
        />
        <RevealPanel
          id="mf3-atividade-2-revelado"
          buttonLabel="Submeter e ver o comentário de fecho"
          lockedHint="Escreva a sua análise antes de ver o comentário de fecho."
          canReveal={filled}
        >
          <Commentary
            heading="Três leituras que costumam surgir aqui"
            items={[
              {
                title: "«Escolhi o mesmo estilo nas duas»",
                body: (
                  <p>
                    É perfeitamente possível e nem sempre é erro — comprometer, por exemplo,
                    defende-se nas duas. O que importa é se a escolha foi feita duas vezes ou apenas
                    repetida. O modelo de Thomas e Kilmann previne exatamente isto: cada pessoa tem
                    um ou dois modos preferidos para os quais recorre por defeito, mesmo quando a
                    situação pediria outro.
                  </p>
                ),
              },
              {
                title: "«A verdadeira falha foi na sessão 3»",
                tone: "good",
                body: (
                  <p>
                    Leitura sólida. A variante só se tornou difícil porque a questão ficou em aberto
                    com um compromisso implícito de resolução. É a prevenção ativa do Bloco 3 vista
                    ao contrário: quanto mais cedo se trata um sinal, mais estratégias continuam
                    disponíveis.
                  </p>
                ),
              },
              {
                title: "«O problema não era o critério»",
                tone: "warn",
                body: (
                  <p>
                    Também defensável, e antecipa o Bloco 5: o que estava declarado era o critério
                    (Problema), mas o que alimentava a situação era o modo como ele foi decidido e
                    comunicado (Processo), agravado pela hierarquia presente na sala (Contexto). A
                    Atividade 4 retoma esta decomposição.
                  </p>
                ),
              },
            ]}
          />
        </RevealPanel>
      </section>

      <ContentCard tone="primary" title="Liga a">
        <p>
          Bloco 3 (os cinco estilos de Thomas-Kilmann, adequação do estilo à situação e prevenção
          ativa).
        </p>
      </ContentCard>
    </>
  );
}
