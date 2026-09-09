import { ContentCard, SectionHeading } from "@/components/course/LessonKit";
import {
  CheckboxGroup,
  ChoiceGroup,
  Commentary,
  PrivacyNote,
  RevealPanel,
  TaskField,
  useFilled,
} from "@/components/course/ActivityKit";

export function ActivityMf3_5() {
  const filled = useFilled(
    "mf3-atividade-5-estrategia-1",
    "mf3-atividade-5-estrategia-2",
  );

  return (
    <>
      {/* Contexto próprio */}
      <section className="mt-10">
        <SectionHeading
          eyebrow="Enquadramento"
          title="Da análise à ação"
          lead="A Atividade 4 mostrou onde um conflito é alimentado. Esta transforma essa leitura em prevenção para o seu próprio contexto."
        />
        <ChoiceGroup
          id="mf3-atividade-5-contexto"
          label="Em que contexto exerce, ou espera exercer, a sua atividade formativa?"
          instruction="Serve para ancorar o plano no seu terreno real — cada contexto tem conflitos típicos diferentes."
          options={[
            {
              key: "efa",
              label: "A",
              text: "Cursos EFA ou de dupla certificação — grupos longos, heterogéneos, frequência frequentemente ligada a apoios.",
            },
            {
              key: "modular",
              label: "B",
              text: "Formação Modular Certificada — módulos curtos, grupos que se formam e dissolvem depressa.",
            },
            {
              key: "rvcc",
              label: "C",
              text: "Processos de RVCC — trabalho muito individualizado, forte exposição biográfica dos adultos.",
            },
            {
              key: "empresa",
              label: "D",
              text: "Formação em contexto empresarial — colegas e chefias no mesmo grupo, hierarquia presente na sala.",
            },
            {
              key: "outro",
              label: "E",
              text: "Outro contexto — formação inicial de jovens, ensino profissional, formação interna ou voluntária.",
            },
          ]}
        />
        <PrivacyNote>
          Ao descrever o seu contexto, não inclua nomes de formandos, colegas ou entidades. As suas
          respostas ficam guardadas na sua conta e são visíveis para o formador do curso.
        </PrivacyNote>
      </section>

      {/* Seleção de categorias */}
      <section className="mt-12">
        <SectionHeading
          eyebrow="Seleção"
          title="Escolha 2 a 3 categorias de prevenção"
          lead="Selecione apenas as que são relevantes e realizáveis no contexto que indicou. Escolher tudo equivale a não escolher."
        />
        <CheckboxGroup
          id="mf3-atividade-5-categorias"
          label="Categorias de estratégias de prevenção"
          instruction="Cada categoria atua sobretudo num quadrante da Roda — indicado entre parênteses."
          options={[
            "Contratualização inicial: regras de funcionamento e critérios de avaliação explicitados e acordados na primeira sessão (Processo)",
            "Regras de feedback: como se comenta o trabalho dos outros, o que é dito em público e o que é dito em privado (Processo)",
            "Canal de objeção sem exposição: forma de levantar um desacordo sem ter de o fazer diante da turma (Processo)",
            "Desenho deliberado dos grupos: critérios de constituição e rotação de papéis, incluindo quem apresenta (Processo e Pessoas)",
            "Leitura precoce de sinais: rotina de observação do que muda no grupo antes de haver conflito manifesto (Pessoas)",
            "Reconhecimento da experiência dos adultos: espaço formal para a prática profissional dos participantes entrar na sessão (Pessoas)",
            "Gestão da assimetria hierárquica: cuidados quando chefias e subordinados estão no mesmo grupo (Contexto)",
            "Clarificação do que não depende de si: dizer ao grupo, cedo, o que está e o que não está na sua margem de decisão (Contexto)",
            "Autorregulação do formador: rotina pessoal antes e depois das sessões de maior tensão (Pessoas)",
            "Revisão de critérios a meio do percurso: momento previsto para reexaminar regras com o grupo, evitando alterações unilaterais (Problema e Processo)",
          ]}
        />
      </section>

      {/* Desenvolvimento */}
      <section className="mt-12">
        <SectionHeading
          eyebrow="Plano"
          title="Desenvolva cada estratégia escolhida"
          lead="Preencha duas — a terceira é opcional. Este é o registo final do módulo e fica guardado na sua conta."
        />
        <div className="space-y-4">
          <TaskField
            id="mf3-atividade-5-estrategia-1"
            label="Estratégia 1"
            instruction="Indique: (1) a categoria escolhida; (2) o que vai fazer concretamente — ação observável, não uma intenção; (3) quando e em que momento do percurso formativo; (4) que conflito típico do seu contexto isto previne, e porquê; (5) que quadrante da Roda está a atacar."
            rows={7}
          />
          <TaskField
            id="mf3-atividade-5-estrategia-2"
            label="Estratégia 2"
            instruction="Mesma estrutura: categoria, ação concreta, momento, conflito que previne e porquê, quadrante visado."
            rows={7}
          />
          <TaskField
            id="mf3-atividade-5-estrategia-3"
            label="Estratégia 3 (opcional)"
            instruction="Se selecionou três categorias, desenvolva a terceira com a mesma estrutura. Caso contrário, pode deixar em branco."
            rows={7}
          />
        </div>

        <RevealPanel
          id="mf3-atividade-5-revelado"
          buttonLabel="Submeter o plano e ver o comentário de fecho"
          lockedHint="Desenvolva pelo menos duas estratégias antes de ver o comentário de fecho."
          canReveal={filled}
        >
          <Commentary
            heading="Como avaliar o plano que acabou de escrever"
            intro="Não há plano certo — há planos que sobrevivem à primeira sessão difícil e planos que não sobrevivem."
            items={[
              {
                title: "Teste 1 — a ação é observável?",
                body: (
                  <p>
                    «Estar mais atento aos sinais do grupo» não é uma estratégia; é uma intenção.
                    «Ao fim de cada sessão, registar em três linhas quem participou menos do que o
                    habitual» é uma estratégia. Se alguém de fora não conseguisse verificar se
                    aconteceu, reescreva.
                  </p>
                ),
              },
              {
                title: "Teste 2 — está ancorada num momento?",
                tone: "warn",
                body: (
                  <p>
                    Prevenção sem calendário tende a ser feita quando já não é prevenção. Ancore cada
                    estratégia num momento fixo: primeira sessão, antes de cada trabalho de grupo, a
                    meio do percurso, nos dez minutos após cada sessão.
                  </p>
                ),
              },
              {
                title: "Teste 3 — cabe no seu contexto real?",
                body: (
                  <p>
                    Num módulo de 25 horas não há espaço para uma contratualização de duas horas; num
                    grupo com chefia presente não se pode contar com objeções abertas em plenário; no
                    RVCC, o que exige prevenção é sobretudo a exposição biográfica, não a disputa por
                    recursos. O plano tem de ser executável nas condições que indicou, não numa
                    versão idealizada delas.
                  </p>
                ),
              },
              {
                title: "Teste 4 — está a atacar o quadrante certo?",
                tone: "good",
                body: (
                  <p>
                    A maioria dos conflitos evitáveis em formação nasce no{" "}
                    <strong>Processo</strong> — critérios pouco claros, decisões sem participação,
                    feedback sem regras, ausência de canal para discordar. Se as suas duas ou três
                    estratégias estão todas no quadrante Problema, é provável que esteja a preparar-se
                    para resolver conflitos em vez de os prevenir.
                  </p>
                ),
              },
              {
                title: "Teste 5 — o formador está no plano?",
                body: (
                  <p>
                    A prevenção mais frequentemente esquecida é a autorregulação de quem forma. Sem
                    ela, todas as outras estratégias dependem de o formador estar em condições de as
                    aplicar no momento em que mais custam — o que é precisamente o que o stress
                    compromete.
                  </p>
                ),
              },
            ]}
            closing="Este plano fecha o percurso do módulo: autoconhecimento (Bloco 1), empatia (Bloco 2), escolha de estratégia (Bloco 3), gestão do próprio estado (Bloco 4) e diagnóstico estruturado (Bloco 5). A Síntese Final retoma-o para a autoavaliação."
          />
        </RevealPanel>
      </section>

      <ContentCard tone="primary" title="Liga a">
        <p>
          Bloco 3 (prevenção ativa e adequação da estratégia), Bloco 5 (os quatro quadrantes como
          grelha de escolha) e a Atividade 4 (o mapeamento que originou este plano).
        </p>
      </ContentCard>
    </>
  );
}
