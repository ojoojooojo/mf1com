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

export function Block2ContentMf3() {
  return (
    <>
      {/* A. CONTEÚDO — As duas dimensões interpessoais */}
      <section className="mt-10">
        <SectionHeading
          eyebrow="Conteúdo"
          title="Empatia e competências sociais: as dimensões que olham para fora"
          lead="Das cinco dimensões do modelo de Goleman, faltavam explorar as duas que se jogam na relação."
        />
        <Prose>
          <p>
            As três dimensões trabalhadas no bloco anterior organizam a relação do formador consigo
            mesmo. As duas que faltam — <strong>empatia</strong> e{" "}
            <strong>competências sociais</strong> — organizam a relação com o grupo: a primeira é a
            capacidade de ler com precisão o que se passa no outro; a segunda é a capacidade de
            fazer algo útil com essa leitura.
          </p>
          <p>
            A ordem não é acidental. Sem autoconsciência, a leitura do outro fica contaminada pelo
            próprio estado emocional: um formador que não percebe que está irritado tende a
            interpretar silêncio como hostilidade. É por isso que a empatia se constrói depois — e
            não em vez — do trabalho sobre si.
          </p>
        </Prose>
        <SourceNote>
          Goleman, D. (1995). Emotional Intelligence: Why It Can Matter More Than IQ. Bantam Books.
        </SourceNote>
      </section>

      {/* B. CONTEÚDO — Empatia cognitiva vs. emocional */}
      <section className="mt-12">
        <SectionHeading
          eyebrow="Conteúdo"
          title="Empatia cognitiva e empatia emocional"
          lead="Compreender a perspetiva do outro e sentir com o outro são duas operações diferentes."
        />
        <Prose>
          <p>
            A <strong>empatia cognitiva</strong> é compreender intelectualmente a perspetiva do
            outro: reconstruir o raciocínio, os interesses e as razões que fazem com que, do lugar
            onde ele está, aquilo faça sentido. É deliberada, treinável, e não exige concordância —
            posso compreender com exatidão por que um formando resiste a uma tarefa sem achar que
            ele tem razão.
          </p>
          <p>
            A <strong>empatia emocional</strong> é sentir com o outro: ser afetado pelo estado
            emocional dele, captar o desconforto, a vergonha ou a frustração antes de qualquer
            explicação verbal. É mais rápida e mais automática, e é o que dá calor à relação — mas,
            em excesso e sem regulação, contagia: o formador que absorve integralmente a ansiedade
            do grupo perde a distância necessária para o conduzir.
          </p>
          <p>
            Num formador, as duas são complementares. A empatia emocional deteta que algo se passa;
            a empatia cognitiva permite formular <em>o quê</em> e decidir o que fazer. Uma sem a
            outra dá frieza analítica ou envolvimento inútil.
          </p>
        </Prose>
        <ContentCard tone="primary" title="Como se distinguem na prática">
          <ul className="mt-1 list-disc space-y-1 pl-5">
            <li>
              <strong>Empatia emocional:</strong> «sinto que este grupo está tenso e isso está a
              deixar-me tenso também».
            </li>
            <li>
              <strong>Empatia cognitiva:</strong> «esta tensão provavelmente vem de saberem que
              serão avaliados por uma chefia que também está na sala».
            </li>
          </ul>
        </ContentCard>
        <KeyIdea>
          Empatia não é concordar, nem consolar, nem ceder. É reconstruir com precisão a perspetiva
          do outro — o que muitas vezes conduz a uma decisão firme, mas informada.
        </KeyIdea>
        <SourceNote>
          Goleman, D. (1995). Emotional Intelligence: Why It Can Matter More Than IQ. Bantam Books
          (capítulo sobre empatia).
        </SourceNote>
      </section>

      {/* C. CONTEÚDO — Ligação à escuta ativa do MF1 */}
      <section className="mt-12">
        <SectionHeading
          eyebrow="Conteúdo"
          title="A ligação com a escuta ativa trabalhada no MF1"
          lead="A escuta ativa é o veículo; a empatia é a competência emocional que ela exige."
        />
        <Prose>
          <p>
            No primeiro módulo trabalhou a escuta ativa como conjunto de comportamentos observáveis
            — não interromper, reformular, verificar o que se compreendeu. Vista daqui, essa
            prática ganha outra leitura: a escuta ativa é o comportamento através do qual a empatia
            se torna visível e verificável para o outro. Não se demonstra empatia declarando-a;
            demonstra-se devolvendo a perspetiva do outro de forma que ele a reconheça.
          </p>
          <p>
            A relação é de dupla dependência. Sem empatia, a escuta ativa degrada-se em técnica
            vazia — reformulações corretas que não acertam no que importa. Sem escuta ativa, a
            empatia fica invisível: o formando não tem como saber que foi compreendido.
          </p>
        </Prose>
        <SourceNote>
          Rogers, C.R. &amp; Farson, R.E. (1957). Active Listening. University of Chicago —
          Industrial Relations Center; Goleman, D. (1995). Emotional Intelligence. Bantam Books.
        </SourceNote>
      </section>

      {/* D. CONTEÚDO — Competências sociais na sala */}
      <section className="mt-12">
        <SectionHeading
          eyebrow="Conteúdo"
          title="Competências sociais: da leitura ao comportamento"
          lead="Três traduções concretas da empatia na gestão de um grupo de formação."
        />
        <LessonAccordion
          items={[
            {
              title: "1. Perceber tensões antes de escalarem",
              content:
                "A maioria dos conflitos em formação dá sinais antes de se tornar explícita: participações que cessam, respostas monossilábicas, um subgrupo que se isola, ironias breves, olhares trocados. Ler estes sinais é empatia; nomeá-los com cuidado ou ajustar o ritmo antes de a situação se tornar pública é competência social. Intervir cedo é quase sempre mais barato do que mediar depois.",
            },
            {
              title: "2. Adaptar o discurso a diferentes formandos",
              content:
                "Num mesmo grupo há quem precise do enquadramento teórico para aceitar a prática e quem só adira depois de ver o exemplo concreto; há quem prefira ser desafiado publicamente e quem se feche se o for. Adaptar o registo, os exemplos e o tipo de solicitação a cada pessoa não é falta de coerência pedagógica: é reconhecer que o mesmo conteúdo precisa de portas diferentes.",
            },
            {
              title: "3. Mediar entre pontos de vista",
              content:
                "Quando dois formandos discordam, a competência social do formador está em tornar visível o que cada posição protege — «se bem entendi, a Sofia está preocupada com o rigor e o Tiago com o tempo disponível» — antes de procurar solução. Explicitar os interesses por trás das posições retira o confronto do plano pessoal e devolve-o ao problema.",
            },
          ]}
        />
        <SourceNote>
          Goleman, D. (1995). Emotional Intelligence. Bantam Books; Referencial IEFP/CNQF (2024),
          Módulo 3.
        </SourceNote>
      </section>

      {/* E. EXEMPLO — Cenário comparativo */}
      <section className="mt-12">
        <SectionHeading
          eyebrow="Exemplo"
          title="O desconforto silencioso de um formando"
          lead="Segundo dia de uma formação com trabalho de grupo. Uma participante deixou de intervir."
        />
        <Scenario
          title="Versão 1 — empatia baixa"
          context="A formadora Marta pede resultados aos grupos. A participante Inês, que interveio muito no primeiro dia, está calada desde o intervalo."
          lines={[
            {
              speaker: "Marta (formadora)",
              text: "Grupo 2, apresentem. Inês, você que falou tanto ontem, hoje está muito quietinha — perdeu a energia?",
              side: "right",
            },
            { speaker: "Inês", text: "Não, está tudo bem. O André apresenta." },
            {
              speaker: "Marta (formadora)",
              text: "Ok. Então André, avance, temos de andar.",
              side: "right",
            },
            {
              speaker: "Grupo 2",
              text: "(Inês não volta a intervir no resto do dia; na avaliação final escreve que não se sentiu ouvida no trabalho de grupo)",
            },
          ]}
          note="Marta notou o sinal — o silêncio — mas leu-o como falta de energia e comentou-o em público. Sem empatia cognitiva, não formulou hipóteses sobre a causa; ao expor Inês, tornou o recuo dela mais provável."
        />
        <Scenario
          title="Versão 2 — empatia alta"
          context="Mesma sessão, mesmo silêncio de Inês."
          lines={[
            {
              speaker: "Marta (formadora)",
              text: "Grupo 2, apresentem quando estiverem prontos. Vou passar pelos grupos entretanto.",
              side: "right",
            },
            {
              speaker: "Marta (formadora)",
              text: "(aproxima-se de Inês, em voz baixa) Ontem trouxe várias coisas úteis e hoje reparei que está mais recuada. Aconteceu algo no grupo que valha a pena eu saber?",
              side: "right",
            },
            {
              speaker: "Inês",
              text: "É que sempre que proponho algo, o André reformula e apresenta como ideia dele. Já desisti.",
            },
            {
              speaker: "Marta (formadora)",
              text: "Obrigada por me dizer. Vou pedir que a apresentação identifique de quem partiu cada proposta — para todos os grupos, não só o seu.",
              side: "right",
            },
          ]}
          note="O sinal detetado foi o mesmo. A diferença está em três decisões: procurar a causa em vez de a presumir, fazê-lo em privado, e intervir sobre o processo de todos os grupos — o que resolve a situação sem expor Inês nem acusar André."
        />
        <SourceNote>
          Os diálogos são simulações pedagógicas construídas para este módulo, com nomes fictícios;
          ilustram os conceitos de empatia e competências sociais descritos em Goleman (1995).
        </SourceNote>
      </section>

      {/* F. INTERAÇÃO — Micro-quizzes */}
      <section className="mt-12">
        <SectionHeading
          eyebrow="Interação"
          title="Verifique a sua compreensão"
          lead="Cada opção tem feedback explicativo — inclusive as que não são as mais adequadas."
        />

        <Quiz
          id="mf3-bloco-2-quiz-tipos-empatia"
          question="Um formador percebe imediatamente que um participante ficou constrangido com uma pergunta, mas só mais tarde conclui que o constrangimento vinha de ele não ter feito o trabalho prévio. Como se descrevem estes dois momentos?"
          options={[
            {
              text: "Primeiro empatia emocional (captou o estado afetivo), depois empatia cognitiva (reconstruiu a razão da perspetiva do outro).",
              correct: true,
              feedback:
                "Exatamente, e esta é a sequência típica em sala: a empatia emocional funciona como alerta rápido de que algo se passa, e a empatia cognitiva faz o trabalho mais lento de formular o quê — só a segunda permite decidir uma intervenção adequada.",
            },
            {
              text: "Os dois são empatia emocional: em ambos o formador está a sentir com o participante.",
              feedback:
                "Só o primeiro momento é empatia emocional. Perceber de imediato o constrangimento é captação afetiva; concluir a razão do constrangimento é uma reconstrução da perspetiva do outro, ou seja, empatia cognitiva.",
            },
            {
              text: "Primeiro empatia cognitiva, depois empatia emocional — a compreensão precede sempre o sentir.",
              feedback:
                "A ordem está invertida. A resposta afetiva é mais automática e mais rápida; a compreensão das razões exige tempo e atenção deliberada. Foi por isso que a conclusão sobre a causa só surgiu mais tarde.",
            },
            {
              text: "Nenhum dos momentos é empatia: como o formador não consolou o participante, não houve empatia.",
              feedback:
                "Empatia não se define pelo consolo. Consolar é uma resposta possível entre várias; a empatia é a leitura precisa do estado e da perspetiva do outro, que pode conduzir a consolar, a ajustar a tarefa ou a não fazer nada em público.",
            },
          ]}
          takeaway="A empatia emocional deteta; a empatia cognitiva formula. Um formador precisa das duas."
        />

        <Quiz
          id="mf3-bloco-2-quiz-competencia-social"
          question="Dois formandos discordam abertamente sobre como fazer um exercício de grupo e o tom começa a subir. Qual das intervenções traduz melhor competência social apoiada em empatia?"
          options={[
            {
              text: "«Vamos parar com isso, temos programa para cumprir. Façam como está no enunciado.»",
              feedback:
                "Encerra o episódio, mas apenas na superfície. Ao não reconhecer o que cada posição protege, o desacordo desaparece da vista e mantém-se ativo no grupo — e ambos ficam com a experiência de não terem sido ouvidos.",
            },
            {
              text: "«Se bem entendi, o Tiago está preocupado com o tempo que a proposta exige e a Sofia com o rigor do resultado. São duas preocupações legítimas — como conciliamos as duas neste exercício?»",
              correct: true,
              feedback:
                "É a opção mais completa: explicita o interesse por trás de cada posição (empatia cognitiva tornada visível), valida ambos sem dar razão a nenhum, e devolve a decisão ao problema em vez de a manter entre pessoas.",
            },
            {
              text: "«A Sofia tem razão, o rigor é mais importante. Sigam a proposta dela.»",
              feedback:
                "Resolve por autoridade e depressa, mas cria um vencedor e um vencido numa discussão que era sobre método. O Tiago passa a ter uma razão adicional para não colaborar, e o grupo aprende que discordar é arriscado.",
            },
            {
              text: "Não intervir: os adultos devem resolver os seus desacordos sozinhos.",
              feedback:
                "A autonomia do grupo é desejável, mas com o tom já a subir a não intervenção deixa o episódio escalar. Perceber tensões antes de escalarem só é útil se for seguido de alguma ação — mesmo mínima, como ajustar o enquadramento da tarefa.",
            },
          ]}
          takeaway="Explicitar interesses por trás das posições retira o confronto do plano pessoal e devolve-o ao problema."
        />

        <Quiz
          id="mf3-bloco-2-quiz-cenario"
          question="No cenário de Inês, o que distingue essencialmente a Versão 2 da Versão 1?"
          options={[
            {
              text: "Na Versão 2 a formadora detetou o silêncio; na Versão 1 não deu por ele.",
              feedback:
                "Nas duas versões Marta detetou o silêncio — inclusive o comentou em voz alta na Versão 1. A deteção não era o problema: o problema era o que fez com ela.",
            },
            {
              text: "Na Versão 2 a formadora resolveu o problema repreendendo o André, o que restabeleceu a justiça no grupo.",
              feedback:
                "Marta não repreendeu ninguém. Precisamente por isso a intervenção funciona: alterou a regra de apresentação para todos os grupos, o que corrige o efeito sem obrigar André a defender-se nem colocar Inês em posição de acusadora.",
            },
            {
              text: "Na Versão 2 a formadora procurou a causa em privado e agiu sobre o processo de todos os grupos, em vez de presumir a causa e expor a participante.",
              correct: true,
              feedback:
                "É esse o essencial. A empatia cognitiva substituiu a presunção («perdeu a energia») pela pergunta, e a competência social escolheu o momento privado e uma medida geral, que corrige a dinâmica sem transformar Inês e André num caso público.",
            },
            {
              text: "Na Versão 2 a formadora deixou de cumprir o programa para tratar de uma questão emocional.",
              feedback:
                "Não houve troca entre programa e relação: a conversa foi breve, decorreu enquanto os grupos preparavam a apresentação, e a medida tomada era de organização da tarefa. Gerir tensões cedo custa habitualmente menos tempo do que mediar um conflito instalado.",
            },
          ]}
        />
      </section>

      {/* G. APLICAÇÃO — Reflexão */}
      <section className="mt-12">
        <SectionHeading
          eyebrow="Aplicação"
          title="Leve isto à sua prática"
          lead="A empatia cognitiva treina-se sobre casos concretos — de preferência os seus."
        />
        <ReflectionPrompt
          id="mf3-bloco-2-reflexao"
          question="Recorde um formando que lhe pareceu difícil. Compreendeu, na altura, a perspetiva dele — e o que faria de forma diferente com mais empatia cognitiva?"
          hint="Descreva a situação em poucas linhas, formule agora duas hipóteses sobre o que aquele comportamento protegia (interesse, receio, história anterior) e indique uma intervenção concreta que teria testado essas hipóteses em vez de as presumir."
          rows={7}
        />
        <KeyIdea>
          Sempre que classificar um formando como «difícil», experimente completar a frase: «isto
          faria sentido se ele estivesse a proteger…». A hipótese pode estar errada — mas a
          pergunta que ela gera é quase sempre melhor do que a que faria sem ela.
        </KeyIdea>
        <SourceNote>
          Goleman, D. (1995). Emotional Intelligence: Why It Can Matter More Than IQ. Bantam Books;
          Salovey, P. &amp; Mayer, J.D. (1990). Emotional Intelligence. Imagination, Cognition, and
          Personality, 9(3), 185-211; Rogers, C.R. &amp; Farson, R.E. (1957). Active Listening.
          University of Chicago — Industrial Relations Center; Referencial IEFP/CNQF (2024), Módulo
          3.
        </SourceNote>
      </section>
    </>
  );
}
