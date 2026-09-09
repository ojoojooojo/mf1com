import { Scenario, SectionHeading, ContentCard, Figure } from "@/components/course/LessonKit";
import {
  CheckboxGroup,
  Commentary,
  FictionNote,
  RevealPanel,
  TaskField,
  useFilled,
} from "@/components/course/ActivityKit";
import atividadeAImage from "@/assets/mf1-atividade-a-sala-formacao.jpg";

const BARREIRAS = [
  "Físicas / mecânicas",
  "Fisiológicas",
  "Semânticas",
  "Psicológicas (preconceitos)",
  "Pessoais (emoções, valores)",
  "Perceção seletiva",
  "Administrativas / burocráticas",
  "Sobrecarga de informação",
  "Filtragem",
];

export function ActivityA() {
  const k = "atividade-a";
  const filled = useFilled(`${k}-p1`, `${k}-p2-just`, `${k}-p3`, `${k}-p4`);

  return (
    <>
      <section className="mt-10">
        <SectionHeading
          eyebrow="Situação"
          title="A primeira sessão de um formador novo"
          lead="Leia com atenção: há vários sinais a acontecer ao mesmo tempo."
        />
        <FictionNote>
          Cenário fictício, construído para fins pedagógicos. Não descreve pessoas nem sessões
          reais.
        </FictionNote>
        <Scenario
          title="Primeira meia hora, sala com 14 formandos"
          context="Cenário simulado."
          lines={[
            {
              speaker: "Sala",
              text: "Um formando está sentado no fundo da sala, de braços cruzados, sem tirar apontamentos. Outro interrompe repetidamente os colegas a meio das intervenções.",
            },
            {
              speaker: "Ambiente",
              text: "Do exterior chega ruído contínuo de obras; as janelas estão abertas por causa do calor.",
            },
            {
              speaker: "Formador",
              text: "Logo nos primeiros trinta minutos apresenta o enquadramento com linguagem muito técnica, sem parar para verificar se o grupo está a acompanhar.",
              side: "right",
            },
          ]}
          note="Preencha as quatro partes abaixo com o seu próprio raciocínio. Só depois verá a análise de referência — o objetivo é comparar raciocínios, não acertar numa resposta única."
        />
        <Figure
          caption="A sala momentos antes do incidente descrito."
          source="Reconstrução visual gerada por IA para fins pedagógicos."
        >
          <img
            src={atividadeAImage}
            alt="Sala de formação com adultos sentados em mesas em U, formador de pé junto a um ecrã a meio de uma explicação; um formando ao fundo está com os braços cruzados e olha para a janela aberta, dois formandos trocam um breve comentário entre si."
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
          title="Quatro partes"
          lead="Uma ou duas frases por campo são suficientes."
        />
        <div className="space-y-4">
          <TaskField
            id={`${k}-p1`}
            label="1. Que elementos do processo de comunicação estão em jogo aqui?"
            instruction="Recorra ao Bloco 1: emissor, código, mensagem, canal, ruído, recetor, feedback, contexto. Indique quais reconhece e onde."
          />

          <CheckboxGroup
            id={`${k}-p2`}
            label="2. Que barreiras à comunicação consegue identificar?"
            instruction="Selecione todas as que reconhece (Bloco 4) e justifique em seguida."
            options={BARREIRAS}
          />
          <TaskField
            id={`${k}-p2-just`}
            label="2b. Justifique as barreiras que selecionou"
            instruction="Para cada barreira escolhida, aponte o sinal concreto do cenário que a sustenta."
            rows={5}
          />

          <TaskField
            id={`${k}-p3`}
            label="3. Que sinais não-verbais são visíveis e o que podem indicar?"
            instruction="Descreva o que se vê — e distinga a observação (o que acontece) da interpretação (o que pode significar)."
          />

          <TaskField
            id={`${k}-p4`}
            label="4. Qual seria a sua primeira ação como formador, e porquê?"
            instruction="Uma só ação, a primeira. Explique o critério que a torna prioritária."
          />
        </div>

        <RevealPanel id={`${k}-revelado`} canReveal={filled}>
          <Commentary
            heading="Como um formador experiente leria esta situação"
            intro="Não é uma correção: é um raciocínio de referência para colocar ao lado do seu. Se chegou a conclusões diferentes com bons argumentos, isso é parte do trabalho."
            items={[
              {
                title: "1. Elementos do processo de comunicação",
                body: (
                  <>
                    <p>
                      O <strong>emissor</strong> é o formador; a <strong>mensagem</strong> é o
                      enquadramento inicial; o <strong>código</strong> é linguagem técnica — e é
                      aqui que começa o problema, porque o código não é partilhado por todos os
                      recetores.
                    </p>
                    <p>
                      O <strong>canal</strong> é oral e presencial, degradado por{" "}
                      <strong>ruído</strong> em dois sentidos: ruído físico (as obras) e ruído
                      semântico (os termos não descodificados). O <strong>contexto</strong> é uma
                      primeira sessão — ainda não há relação estabelecida nem normas de grupo.
                    </p>
                    <p>
                      O elemento decisivo é o <strong>feedback</strong>: ele existe (braços
                      cruzados, interrupções, ausência de apontamentos), mas não está a ser
                      recolhido. O formador continua a emitir sem ler o retorno — e sem feedback o
                      processo deixa de ser comunicação e passa a ser emissão.
                    </p>
                  </>
                ),
              },
              {
                title: "2. Barreiras presentes",
                tone: "warn",
                body: (
                  <>
                    <p>
                      <strong>Físicas / mecânicas:</strong> o ruído de obras interfere diretamente
                      no canal e obriga a um esforço de audição que consome atenção.
                    </p>
                    <p>
                      <strong>Semânticas:</strong> a linguagem muito técnica não é comum a todos os
                      recetores — as palavras chegam, o significado não.
                    </p>
                    <p>
                      <strong>Sobrecarga de informação:</strong> todo o enquadramento concentrado em
                      trinta minutos, sem pausas de verificação, satura o grupo.
                    </p>
                    <p>
                      <strong>Perceção seletiva</strong> (provável consequência): saturados, os
                      formandos retêm fragmentos e descartam o resto.
                    </p>
                    <p className="text-muted-foreground">
                      Cuidado com duas barreiras tentadoras: <strong>psicológicas</strong> só se
                      aplicam se <em>o formador</em> começar a supor que o formando de braços
                      cruzados «não está interessado» — a barreira estaria então nele, não no
                      formando. E as <strong>administrativas/burocráticas</strong> ou de{" "}
                      <strong>filtragem</strong> não se aplicam: não há intermediários no circuito.
                    </p>
                  </>
                ),
              },
              {
                title: "3. Sinais não-verbais e o que podem indicar",
                body: (
                  <>
                    <p>
                      <strong>Observação:</strong> braços cruzados, corpo recuado no fundo da sala,
                      ausência de apontamentos; interrupções repetidas do segundo formando.
                    </p>
                    <p>
                      <strong>Interpretações possíveis</strong> — no plural, propositadamente:
                      desconforto, discordância, cansaço, frio, timidez, ou simplesmente uma postura
                      habitual. As interrupções podem ser ansiedade, entusiasmo, necessidade de
                      reconhecimento ou hábito de comunicação num contexto profissional diferente.
                    </p>
                    <p>
                      O erro clássico é fechar a interpretação demasiado depressa. O sinal
                      não-verbal indica <em>onde olhar</em>, não <em>o que concluir</em>: serve para
                      formular uma hipótese e verificá-la, de preferência em privado.
                    </p>
                  </>
                ),
              },
              {
                title: "4. Primeira ação — e o critério",
                tone: "good",
                body: (
                  <>
                    <p>
                      A ação de referência é <strong>parar de emitir e abrir feedback</strong>:
                      fechar a janela ou baixar o ruído se for possível, e fazer uma verificação
                      curta e não avaliativa — «vou parar aqui um minuto: destes três termos, quais
                      é que precisam de ser desmontados antes de avançarmos?».
                    </p>
                    <p>
                      O critério de prioridade: das quatro barreiras, três (canal, código,
                      sobrecarga) estão sob controlo direto do formador e resolvem-se em segundos.
                      As leituras não-verbais, essas, exigem tempo e relação — e qualquer conversa
                      individual com o formando de braços cruzados deve acontecer no intervalo, não
                      em frente ao grupo.
                    </p>
                    <p>
                      Também não se começa pelo formando que interrompe: no início de uma primeira
                      sessão, uma repreensão pública instala defensividade em toda a sala. Trata-se
                      primeiro com estrutura («vamos ouvir uma intervenção de cada vez, aponto a sua
                      para não se perder») e só depois, se persistir, individualmente.
                    </p>
                  </>
                ),
              },
            ]}
            closing="Compare agora: quantos dos elementos e barreiras identificou? E, sobretudo, a sua primeira ação atacava a causa mais próxima e mais controlável — ou a mais visível?"
          />
        </RevealPanel>
      </section>

      <div className="mt-8">
        <ContentCard tone="primary" title="Liga a">
          <p>Bloco 1 (elementos do processo), Bloco 4 (barreiras) e Bloco 2 (sinais não-verbais).</p>
        </ContentCard>
      </div>
    </>
  );
}
