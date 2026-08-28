import {
  ContentCard,
  KeyIdea,
  LessonAccordion,
  Prose,
  Quiz,
  ReflectionPrompt,
  Scenario,
  SectionHeading,
  SourceNote,
} from "@/components/course/LessonKit";

export function Block4ContentMf2() {
  return (
    <>
      {/* A. CONTEÚDO — O impacto do conflito no indivíduo */}
      <section className="mt-10">
        <SectionHeading
          eyebrow="Conteúdo"
          title="O impacto do conflito no indivíduo"
          lead="O conflito não gerido tem custo pessoal — não só organizacional."
        />
        <Prose>
          <p>
            Um conflito não gerido tem custo pessoal, não só organizacional. Os mesmos dados do
            CPP Global Human Capital Report (2008) mostram que 25% das pessoas associam um
            conflito vivido a doença ou ausência ao trabalho, 57% terminam um episódio de conflito
            com sentimentos negativos, e 67% chegam a evitar deliberadamente uma pessoa depois de
            um conflito com ela — um efeito que pode persistir muito depois do episódio manifesto
            ter terminado (o "resíduo" de Pondy, Bloco 1, tem portanto um custo humano, não só
            relacional).
          </p>
        </Prose>
        <KeyIdea>
          Nem todos vivem o mesmo conflito da mesma forma. A mesma situação pode ser mobilizadora
          para uma pessoa e profundamente desgastante para outra — o que não deve ser lido como
          fragilidade, mas como parte normal da variação humana perante a tensão.
        </KeyIdea>
        <SourceNote>
          CPP Inc. (2008). Workplace Conflict and How Businesses Can Harness It to Thrive: The CPP
          Global Human Capital Report.
        </SourceNote>
      </section>

      {/* B. CONTEÚDO — Como a perceção molda o conflito */}
      <section className="mt-12">
        <SectionHeading
          eyebrow="Conteúdo"
          title="Como a perceção molda o conflito (e como o alimenta)"
          lead="Grande parte do que faz um conflito escalar não é o que aconteceu — é o que cada parte pensa que aconteceu."
        />
        <Prose>
          <p>
            Grande parte do que faz um conflito escalar não é o que realmente aconteceu, mas o que
            cada parte pensa que aconteceu — e a suposição de que a sua própria visão é
            simplesmente «a realidade». O psicólogo social Lee Ross descreveu este fenómeno como
            «realismo ingénuo» (naive realism): a tendência para assumir que vemos a situação tal
            como ela é, objetivamente, e que quem discorda ou está mal informado, ou tem um motivo
            escondido, ou é tendencioso. Este mecanismo está intimamente relacionado com o erro
            fundamental de atribuição: a tendência para explicar o comportamento dos outros pelo
            carácter («ele é agressivo») e o nosso próprio pelo contexto («eu reagi porque estava
            sob pressão»).
          </p>
        </Prose>
        <LessonAccordion
          items={[
            {
              title: "Aprofundar: porque é que isto acelera a escalada",
              content:
                "Se assumo que a minha leitura da situação é objetiva e a do outro é enviesada, deixo de procurar entender o seu ponto de vista — e interpreto qualquer resistência da parte dele como prova adicional de má-fé. É o mesmo mecanismo que Deutsch descreve como «perceção enviesada» no Bloco 2: cada parte vê as suas próprias ações como razoáveis e as do outro como hostis.",
            },
            {
              title: "Aprofundar: o que ajuda a interromper o padrão",
              content:
                "Nomear explicitamente a possibilidade de estar a ver apenas uma parte da situação («o que é que eu poderia estar a não ver aqui?») é um dos poucos antídotos simples e sempre disponíveis — não elimina o viés, mas abre uma fresta para a dúvida antes de agir sobre uma leitura precipitada.",
            },
          ]}
        />
        <SourceNote>
          Ross, L. (2018). From the Fundamental Attribution Error to the Truly Fundamental
          Attribution Error and Beyond: My Research Journey. Perspectives on Psychological
          Science.
        </SourceNote>

        <Scenario
          title="A mesma pausa, duas leituras"
          context="Cenário simulado."
          lines={[
            {
              speaker: "Formando",
              text: "(pensa) O formador cortou a minha pergunta porque quer é despachar a matéria, não lhe interessa se percebemos.",
            },
            {
              speaker: "Formador",
              text: "(pensa) Tive de gerir o tempo porque já estávamos atrasados — não posso alongar-me em cada pergunta.",
              side: "right",
            },
          ]}
          note="As duas leituras partem do mesmo episódio de 15 segundos. Nenhuma das duas partes está a mentir — cada uma está convencida de que a sua leitura é simplesmente o que aconteceu."
        />

        <Quiz
          id="mf2-bloco-4-quiz-percecao"
          question="No cenário acima, o mecanismo psicológico mais em jogo é..."
          options={[
            {
              text: "Falta de comunicação verbal",
              feedback:
                "O episódio em si (cortar a pergunta) até pode ter sido comunicado com clareza — o que está em jogo é a interpretação de intenção que cada parte faz do mesmo facto, não a clareza da mensagem.",
            },
            {
              text: "Realismo ingénuo / viés de atribuição",
              correct: true,
              feedback:
                "Correto. Cada parte trata a sua própria leitura da situação como a realidade objetiva, e atribui a ação do outro a uma disposição pessoal («não lhe interessa») em vez de considerar o contexto que a outra parte está a viver (gestão do tempo).",
            },
            {
              text: "Conflito de tarefa",
              feedback:
                "Não há aqui um desacordo sobre o conteúdo do trabalho — o que está em jogo é como cada parte interpreta a intenção por trás de uma ação, um mecanismo percetivo, não uma discordância de tarefa.",
            },
          ]}
          takeaway="Perguntar-se «que outra explicação, igualmente plausível, eu ainda não considerei?» é um exercício simples que interrompe este padrão antes de ele guiar a próxima ação."
        />
      </section>

      {/* C. INTERAÇÃO — O papel do indivíduo */}
      <section className="mt-12">
        <SectionHeading
          eyebrow="Interação"
          title="O papel do indivíduo na origem, escalada e prevenção"
          lead="Cada pessoa envolvida é sempre, em algum grau, coautora da trajetória do conflito."
        />
        <Prose>
          <p>
            O referencial deste curso pede explicitamente que o formador reflita sobre o seu
            PRÓPRIO papel — não apenas o dos outros — na origem, escalada e resolução de
            conflitos. Isto liga diretamente à «lei rudimentar das relações sociais» de Deutsch
            (Bloco 2): se o meu comportamento tende a gerar mais do mesmo tipo de comportamento na
            outra parte, então cada pessoa envolvida — incluindo o formador — é sempre, em algum
            grau, coautora da trajetória do conflito, mesmo que não tenha sido quem o começou.
          </p>
        </Prose>
        <KeyIdea>
          Reconhecer o próprio papel não é o mesmo que assumir toda a culpa. É reconhecer que, tal
          como se pode contribuir para a escalada sem intenção (uma resposta seca, uma suposição
          precipitada), também se pode contribuir para a prevenção e a desescalada — e essa
          segunda parte está sempre ao alcance de cada pessoa, independentemente do que a outra
          parte fizer primeiro.
        </KeyIdea>
        <SourceNote>
          Deutsch, M. (1973). The Resolution of Conflict: Constructive and Destructive Processes.
          Referencial de Formação Pedagógica Contínua de Formadores — Gestão de Conflitos na
          Formação (IEFP/CNQF, 2024).
        </SourceNote>
        <Quiz
          id="mf2-bloco-4-quiz-papel"
          question="Um formador, sentindo-se questionado por um formando à frente do grupo, responde de forma seca e o formando fecha-se e deixa de participar pelo resto da sessão. Qual destas leituras é mais precisa?"
          options={[
            {
              text: "O formando é o único responsável, porque foi ele quem iniciou o desacordo",
              feedback:
                "Iniciar um desacordo não é o mesmo que ser o único a moldar a sua trajetória — a resposta seca do formador também contribuiu para a escalada e para o fecho do formando.",
            },
            {
              text: "O formador não teve qualquer papel, porque só reagiu ao que o formando disse",
              feedback:
                "Reagir também é agir: a forma da resposta (seca, em vez de curiosa) ajudou a determinar se a troca escalava ou se desescalava — é precisamente o mecanismo cooperação-gera-cooperação / competição-gera-competição do Bloco 2.",
            },
            {
              text: "Ambos contribuíram para a trajetória do episódio, ainda que de formas diferentes",
              correct: true,
              feedback:
                "Correto. O formando trouxe o desacordo inicial; o formador, com a resposta seca, contribuiu para a escalada e para o afastamento subsequente. Nenhum dos dois controla sozinho o resultado, mas ambos o influenciam.",
            },
          ]}
          takeaway="Esta pergunta não serve para distribuir culpas — serve para identificar o único ponto da equação sobre o qual cada pessoa tem controlo direto: a sua própria próxima resposta."
        />
      </section>

      {/* D. APLICAÇÃO */}
      <section className="mt-12">
        <SectionHeading
          eyebrow="Aplicação"
          title="Transportar para a sua prática"
          lead="Sem resposta certa: o valor está no registo pessoal e na consciência que gera."
        />
        <ReflectionPrompt
          id="mf2-bloco-4-reflexao"
          question="Recorde uma situação de tensão numa formação em que, olhando para trás, reconhece que a sua própria reação (um tom, uma suposição, um silêncio) ajudou a escalar — ainda que sem intenção. O que faria de diferente hoje, sabendo o que sabe agora sobre perceção e sobre a lei rudimentar das relações sociais?"
        />
        <ContentCard tone="primary" title="Antes de avançar">
          <p>
            Guarde a sua resposta. Vai ser retomada na Atividade 4 — Papel do Indivíduo, e ajuda a
            preparar a Síntese Final.
          </p>
        </ContentCard>
      </section>
    </>
  );
}
