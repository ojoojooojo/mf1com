import { ContentCard, Figure, SectionHeading } from "@/components/course/LessonKit";
import {
  ChoiceGroup,
  Commentary,
  RevealPanel,
  TaskField,
  useFilled,
} from "@/components/course/ActivityKit";
import atividadeMf3_1Image from "@/assets/mf3-atividade-1-auto-registo.jpg";

export function ActivityMf3_1() {
  const filled = useFilled("mf3-atividade-1-compromisso");

  return (
    <>
      <section className="mt-10">
        <SectionHeading
          eyebrow="Autoavaliação"
          title="As cinco dimensões, aplicadas à sua prática"
          lead="Para cada dimensão escolha a afirmação que descreve melhor o que faz habitualmente — não o que gostaria de fazer. Não há respostas certas nem pontuação."
        />
        <ContentCard tone="primary" title="Como responder">
          <p>
            As afirmações descrevem comportamentos concretos em sala, não traços de personalidade.
            Escolha a que mais se aproxima do seu padrão habitual nos últimos meses de formação. A
            utilidade do exercício depende inteiramente de responder pelo que acontece, não pelo que
            seria desejável.
          </p>
        </ContentCard>
        <Figure
          caption="Um momento de auto-registo, num intervalo entre sessões."
          source="Reconstrução visual gerada por IA para fins pedagógicos."
        >
          <img
            src={atividadeMf3_1Image}
            alt="Close-up das mãos de uma pessoa adulta a escrever num caderno pessoal, com uma chávena de café e materiais de formação impressos sobre a mesa, num espaço de pausa entre sessões."
            loading="lazy"
            width={1536}
            height={1024}
            className="h-auto w-full max-w-full rounded-lg object-cover"
          />
        </Figure>

        <div className="mt-4 space-y-4">
          <ChoiceGroup
            id="mf3-atividade-1-autoconsciencia"
            label="1. Autoconsciência"
            instruction="Quando algo em sala o irrita ou desconforta…"
            options={[
              {
                key: "a",
                label: "A",
                text: "Só me dou conta do que senti mais tarde, quando a sessão já acabou e revejo o que fiz.",
              },
              {
                key: "b",
                label: "B",
                text: "Percebo que estou incomodado, mas raramente consigo nomear a emoção concreta nem o que a desencadeou.",
              },
              {
                key: "c",
                label: "C",
                text: "Reconheço no momento o que sinto e identifico habitualmente o que, naquela situação, o provocou.",
              },
              {
                key: "d",
                label: "D",
                text: "Reconheço o que sinto e também noto o efeito que o meu estado está a produzir no grupo enquanto decorre.",
              },
            ]}
          />

          <ChoiceGroup
            id="mf3-atividade-1-autorregulacao"
            label="2. Autorregulação"
            instruction="Perante uma intervenção que sente como desafio à sua autoridade…"
            options={[
              {
                key: "a",
                label: "A",
                text: "Respondo imediatamente e, com alguma frequência, arrepio caminho depois.",
              },
              {
                key: "b",
                label: "B",
                text: "Contenho a reação, mas fico tenso e isso nota-se no tom durante o resto da sessão.",
              },
              {
                key: "c",
                label: "C",
                text: "Faço uma pausa breve antes de responder na maioria dos casos, embora nem sempre.",
              },
              {
                key: "d",
                label: "D",
                text: "Uso deliberadamente um recurso — pausa, água, intervalo antecipado — e só depois decido como responder.",
              },
            ]}
          />

          <ChoiceGroup
            id="mf3-atividade-1-motivacao"
            label="3. Motivação"
            instruction="Quando um grupo se mostra desinteressado e o trabalho se torna pesado…"
            options={[
              {
                key: "a",
                label: "A",
                text: "Cumpro o programa e conto os dias até ao fim do módulo.",
              },
              {
                key: "b",
                label: "B",
                text: "Insisto, mas atribuo o desinteresse ao grupo e a fatores que não controlo.",
              },
              {
                key: "c",
                label: "C",
                text: "Procuro ajustar alguma coisa na minha abordagem, embora sem grande método.",
              },
              {
                key: "d",
                label: "D",
                text: "Trato o desinteresse como informação sobre o meu desenho da sessão e testo alterações concretas na sessão seguinte.",
              },
            ]}
          />

          <ChoiceGroup
            id="mf3-atividade-1-empatia"
            label="4. Empatia"
            instruction="Quando um participante reage de forma que lhe parece desproporcionada…"
            options={[
              {
                key: "a",
                label: "A",
                text: "Concluo que é uma questão de carácter ou de má-vontade e gero a situação em conformidade.",
              },
              {
                key: "b",
                label: "B",
                text: "Percebo que há mais em jogo, mas não chego a explorar o que é.",
              },
              {
                key: "c",
                label: "C",
                text: "Procuro compreender a perspetiva dele, normalmente perguntando em privado no intervalo.",
              },
              {
                key: "d",
                label: "D",
                text: "Formulo hipóteses sobre o que aquela pessoa pode estar a proteger e verifico-as com ela antes de decidir o que fazer.",
              },
            ]}
          />

          <ChoiceGroup
            id="mf3-atividade-1-competencias-sociais"
            label="5. Competências sociais"
            instruction="Quando existe tensão instalada entre dois participantes do mesmo grupo…"
            options={[
              {
                key: "a",
                label: "A",
                text: "Evito mexer no assunto e reorganizo os grupos para que não trabalhem juntos.",
              },
              {
                key: "b",
                label: "B",
                text: "Falo com cada um separadamente, mas não altero nada no funcionamento do grupo.",
              },
              {
                key: "c",
                label: "C",
                text: "Falo com ambos e proponho regras de trabalho que reduzam o atrito.",
              },
              {
                key: "d",
                label: "D",
                text: "Trabalho os dois planos — a relação entre eles e o procedimento do grupo — e acompanho o efeito nas sessões seguintes.",
              },
            ]}
          />
        </div>
      </section>

      <section className="mt-10">
        <SectionHeading
          eyebrow="Compromisso"
          title="Uma dimensão, um compromisso concreto"
          lead="Este é o registo que fica na sua conta e que o formador poderá ler."
        />
        <TaskField
          id="mf3-atividade-1-compromisso"
          label="Escolha UMA das cinco dimensões para desenvolver e escreva um compromisso concreto e realista."
          instruction="Indique: (1) a dimensão escolhida; (2) o comportamento específico que quer passar a fazer — observável, não uma intenção genérica; (3) em que momento concreto da sua próxima formação o vai fazer; (4) como saberá se aconteceu. Evite compromissos do tipo «ser mais empático»; prefira «na próxima sessão, antes de responder a uma objeção, faço uma pergunta de clarificação»."
          rows={7}
        />

        <RevealPanel
          id="mf3-atividade-1-revelado"
          buttonLabel="Submeter e ver a leitura interpretativa"
          lockedHint="Escreva o seu compromisso antes de ver a leitura interpretativa."
          canReveal={filled}
        >
          <Commentary
            heading="Como ler o seu padrão de respostas"
            intro="Não existe pontuação nem perfil correto. O que interessa é o padrão — e o padrão só o próprio pode interpretar."
            items={[
              {
                title: "Respostas em A e B não são «piores»",
                body: (
                  <p>
                    As opções A e B descrevem, em geral, comportamentos mais reativos ou menos
                    deliberados; C e D descrevem comportamentos mais intencionais. Isto{" "}
                    <strong>não</strong> significa que A e B sejam falhas de carácter: descrevem
                    frequentemente formadores em contextos de grande pressão, com turmas difíceis ou
                    pouco tempo. A questão útil não é «em quantos escolhi D?», mas «o que é que, no
                    meu contexto, torna difícil o comportamento descrito em C ou D?».
                  </p>
                ),
              },
              {
                title: "Padrão desigual entre dimensões",
                tone: "good",
                body: (
                  <p>
                    É o resultado mais comum e o mais informativo. Muitos formadores reconhecem
                    autoconsciência elevada com autorregulação frágil — sabem exatamente o que
                    sentiram, mas depois de já terem respondido. Outros mostram empatia forte e
                    competências sociais baixas: compreendem bem o participante e não conseguem
                    traduzir essa compreensão em intervenção no grupo. Se o seu padrão é desigual,
                    a dimensão a desenvolver não é a mais baixa em abstrato — é a que estrangula as
                    outras.
                  </p>
                ),
              },
              {
                title: "Padrão uniformemente alto",
                tone: "warn",
                body: (
                  <p>
                    Se escolheu C ou D nas cinco dimensões, vale a pena um segundo olhar honesto:
                    respondeu pelo que faz habitualmente, ou pelo que faz nos seus melhores dias? A
                    inteligência emocional mede-se sobretudo nos dias maus — sessão ao fim da tarde,
                    programa atrasado, participante insistente. Reveja as respostas pensando num
                    desses dias.
                  </p>
                ),
              },
              {
                title: "Padrão uniformemente reativo",
                body: (
                  <p>
                    Escolhas concentradas em A e B ao longo das cinco dimensões apontam
                    frequentemente para um fator comum — sobrecarga, ausência de tempo entre sessões,
                    falta de um espaço onde processar o que acontece em sala — mais do que para cinco
                    lacunas independentes. Nesse caso, o compromisso mais eficaz raramente é
                    comportamental: é estrutural, como reservar dez minutos após cada sessão para
                    registar o que aconteceu.
                  </p>
                ),
              },
              {
                title: "Sobre o compromisso que escreveu",
                tone: "good",
                body: (
                  <p>
                    Releia-o e verifique três coisas: é observável por alguém de fora? Está ancorado
                    num momento concreto e não «sempre que possível»? É realizável na sua próxima
                    formação, e não numa versão idealizada dela? Um compromisso que falhe qualquer
                    destes três pontos tende a não sobreviver à primeira sessão difícil — e pode
                    reescrevê-lo agora.
                  </p>
                ),
              },
            ]}
            closing="A dimensão que escolheu volta a aparecer na Síntese Final: no fim do módulo será convidado a avaliar se o compromisso se manteve realista à luz de tudo o que trabalhou nos Blocos 3 a 5."
          />
        </RevealPanel>
      </section>

      <ContentCard tone="primary" title="Liga a">
        <p>
          Bloco 1 (as cinco dimensões da inteligência emocional, autoconsciência e autorregulação) e
          Bloco 2 (empatia e competências sociais).
        </p>
      </ContentCard>
    </>
  );
}
