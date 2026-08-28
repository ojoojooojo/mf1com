import { useEffect, useState } from "react";
import { Check, ListChecks } from "lucide-react";
import {
  ContentCard,
  Figure,
  KeyIdea,
  LessonAccordion,
  Prose,
  Quiz,
  ReflectionPrompt,
  Scenario,
  SectionHeading,
  SourceNote,
} from "@/components/course/LessonKit";
import { useProgress } from "@/lib/progress";
import { cn } from "@/lib/utils";

/* ---------- Tipologia de barreiras ---------- */

type Barreira = { nome: string; texto: string };
type Categoria = { titulo: string; itens: Barreira[] };

const CATEGORIAS: Categoria[] = [
  {
    titulo: "Do canal e do corpo",
    itens: [
      { nome: "Físicas / mecânicas", texto: "Ruído, ambiente ou equipamento inadequado." },
      { nome: "Fisiológicas", texto: "Limitações dos órgãos da fala e da audição." },
    ],
  },
  {
    titulo: "Da linguagem e da mente",
    itens: [
      {
        nome: "Semânticas",
        texto: "Linguagem não comum ao recetor (jargão, vocabulário técnico).",
      },
      { nome: "Psicológicas", texto: "Preconceitos e estereótipos." },
      { nome: "Pessoais", texto: "Personalidade, estado de espírito, emoções, valores." },
      {
        nome: "Perceção seletiva",
        texto: "Concentração no que se julga importante, ignorando o resto.",
      },
    ],
  },
  {
    titulo: "Do sistema e da organização",
    itens: [
      {
        nome: "Administrativas / burocráticas",
        texto: "Forma como a organização processa a informação; distância física.",
      },
      {
        nome: "Sobrecarga de informação",
        texto: "Saturação do recetor por excesso de mensagens.",
      },
      { nome: "Filtragem", texto: "Retenção ou distorção da informação entre níveis." },
    ],
  },
];

function BarreirasSvg() {
  const colX = [10, 246, 482];
  return (
    <svg
      viewBox="0 0 700 400"
      role="img"
      aria-label="Mapa de tipologia de barreiras à comunicação em três categorias: do canal e do corpo (físicas/mecânicas, fisiológicas); da linguagem e da mente (semânticas, psicológicas, pessoais, perceção seletiva); do sistema e da organização (administrativas/burocráticas, sobrecarga de informação, filtragem)."
      className="w-full"
    >
      {CATEGORIAS.map((cat, ci) => (
        <g key={cat.titulo}>
          <rect
            x={colX[ci]}
            y={10}
            width={208}
            height={380}
            rx={14}
            fill="var(--card)"
            stroke="var(--border)"
            strokeWidth={1.5}
          />
          <rect
            x={colX[ci]}
            y={10}
            width={208}
            height={44}
            rx={14}
            fill={ci === 1 ? "var(--accent-soft)" : "var(--primary-soft)"}
          />
          <text
            x={colX[ci]! + 104}
            y={38}
            textAnchor="middle"
            fontSize={12}
            fontWeight={700}
            fill={ci === 1 ? "var(--accent)" : "var(--primary)"}
            fontFamily="var(--font-sans)"
          >
            {cat.titulo.toUpperCase()}
          </text>
          {cat.itens.map((item, i) => (
            <g key={item.nome}>
              <rect
                x={colX[ci]! + 14}
                y={70 + i * 76}
                width={180}
                height={62}
                rx={10}
                fill="var(--surface)"
                stroke={ci === 1 ? "var(--accent)" : "var(--primary)"}
                strokeOpacity={0.45}
              />
              <text
                x={colX[ci]! + 26}
                y={90 + i * 76}
                fontSize={11.5}
                fontWeight={600}
                fill="var(--foreground)"
                fontFamily="var(--font-sans)"
              >
                {item.nome}
              </text>
              <text
                x={colX[ci]! + 26}
                y={108 + i * 76}
                fontSize={10.5}
                fill="var(--muted-foreground)"
                fontFamily="var(--font-sans)"
              >
                {item.texto.length > 42 ? item.texto.slice(0, 40) + "…" : item.texto}
              </text>
            </g>
          ))}
        </g>
      ))}
    </svg>
  );
}

/* ---------- Seleção múltipla com feedback por item ---------- */

type MultiOption = { text: string; present?: boolean; feedback: string };

function MultiSelectCheck({
  id,
  question,
  hint,
  options,
  takeaway,
}: {
  id: string;
  question: string;
  hint?: string;
  options: MultiOption[];
  takeaway?: string;
}) {
  const { state, saveAnswer, hydrated } = useProgress();
  const stored = state.answers[id];
  const [selected, setSelected] = useState<number[]>([]);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (!hydrated || !stored) return;
    setSelected(stored.split(",").filter(Boolean).map(Number));
    setRevealed(true);
  }, [hydrated, stored]);

  const toggle = (i: number) =>
    setSelected((prev) => (prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]));

  return (
    <section className="my-6 rounded-xl border border-border bg-card p-5 shadow-soft">
      <p className="eyebrow flex items-center gap-2">
        <ListChecks className="size-3.5" /> Seleção múltipla
      </p>
      <h3 className="mt-1 font-display text-lg">{question}</h3>
      {hint ? <p className="mt-1 text-sm text-muted-foreground">{hint}</p> : null}
      <ul className="mt-4 grid gap-2 sm:grid-cols-2">
        {options.map((option, i) => {
          const isSel = selected.includes(i);
          return (
            <li key={option.text}>
              <button
                type="button"
                onClick={() => toggle(i)}
                aria-pressed={isSel}
                className={cn(
                  "flex w-full items-start gap-3 rounded-lg border p-3 text-left text-[0.95rem] transition-colors",
                  isSel ? "border-primary bg-primary-soft" : "border-border hover:bg-muted",
                )}
              >
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded border border-current">
                  {isSel ? <Check className="size-3" /> : null}
                </span>
                <span>{option.text}</span>
              </button>
            </li>
          );
        })}
      </ul>
      <button
        type="button"
        onClick={() => {
          setRevealed(true);
          saveAnswer(id, selected.join(","));
        }}
        disabled={selected.length === 0}
        className="mt-4 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-50"
      >
        Ver análise das barreiras
      </button>

      {revealed ? (
        <div className="mt-4 space-y-2">
          {options.map((option, i) => (
            <div
              key={option.text}
              className={cn(
                "rounded-lg border-l-4 p-4 text-[0.95rem] leading-relaxed",
                option.present
                  ? "border-success bg-success-soft"
                  : "border-accent bg-accent-soft",
              )}
            >
              <p className="eyebrow">
                {option.present ? "Presente no cenário" : "Não se aplica aqui"} ·{" "}
                {option.text}
                {selected.includes(i) ? " · selecionou" : ""}
              </p>
              <p className="mt-1">{option.feedback}</p>
            </div>
          ))}
          {takeaway ? (
            <p className="rounded-lg bg-muted/60 p-4 text-sm">{takeaway}</p>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}

const CENARIO_OPCOES: MultiOption[] = [
  {
    text: "Físicas / mecânicas",
    present: true,
    feedback:
      "Sim: o ruído de obras no exterior interfere diretamente no canal. Parte da mensagem simplesmente não chega — e o esforço extra para ouvir consome atenção que faria falta para compreender.",
  },
  {
    text: "Fisiológicas",
    present: true,
    feedback:
      "Com cautela: as barreiras fisiológicas dizem respeito a limitações dos órgãos da fala e da audição. O cansaço do grupo no final do dia não é exatamente isso, mas produz um efeito próximo — reduz a capacidade física de receber e processar. Vale identificá-lo, sem o confundir com uma limitação auditiva.",
  },
  {
    text: "Semânticas",
    present: true,
    feedback:
      "Sim: a formadora usa termos que só alguns dominam. A linguagem não é comum ao recetor, pelo que as palavras chegam mas o significado não.",
  },
  {
    text: "Sobrecarga de informação",
    present: true,
    feedback:
      "Sim: instruções técnicas complexas apresentadas em sequência saturam o recetor. Mesmo sem ruído nem jargão, o volume por si só impediria a retenção.",
  },
  {
    text: "Psicológicas (preconceitos e estereótipos)",
    feedback:
      "Não há, no cenário, indício de preconceito ou estereótipo de uma parte sobre a outra. É uma barreira muito frequente em formação — mas atribuí-la aqui seria acrescentar informação que o cenário não dá.",
  },
  {
    text: "Perceção seletiva",
    feedback:
      "Plausível como consequência, mas o cenário não descreve ninguém a retê-la parcialmente por a julgar mais ou menos importante. A dificuldade descrita vem do canal, da linguagem e do volume, não de um recorte de relevância.",
  },
  {
    text: "Administrativas / burocráticas",
    feedback:
      "Não se aplica: nada indica que a organização tenha processado, atrasado ou intermediado esta informação. A comunicação é direta, presencial e em tempo real.",
  },
  {
    text: "Filtragem",
    feedback:
      "Não se aplica: a filtragem pressupõe alguém a retransmitir informação entre níveis, retendo ou distorcendo pelo caminho. Aqui a formadora fala diretamente ao grupo.",
  },
  {
    text: "Pessoais (personalidade, valores)",
    feedback:
      "Não com base no que é descrito. Emoções e valores estão sempre presentes em alguma medida, mas o cenário não os aponta como causa da falha — identificar barreiras exige indícios, não suposições.",
  },
];

export function Block4Content() {
  return (
    <>
      {/* 1. CONTEÚDO */}
      <section className="mt-10">
        <SectionHeading eyebrow="Conteúdo" title="O que impede a mensagem de chegar" />
        <Prose>
          <p>
            Uma barreira é qualquer coisa que distorce ou impede que a mensagem do emissor chegue
            intacta ao recetor.
          </p>
          <p>
            O referencial pede para identificar e superar «barreiras comuns à comunicação, tais
            como preconceitos e má interpretação de mensagens».
          </p>
        </Prose>

        <Figure
          caption="Mapa de tipologia das barreiras à comunicação: nove tipos agrupados em três categorias."
          source="Abreu & Bazoni (2016), citando Kunsch (2003) e Dubrin (2003)."
        >
          <BarreirasSvg />
        </Figure>

        <SourceNote>
          Abreu, T.M.B. &amp; Bazoni, M.C. (2016). «Como superar barreiras da comunicação nas
          organizações.» <em>R. Dito Efeito</em>, 7(11), 74-94, citando Kunsch, M.M.K. (2003) e
          Dubrin, A. (2003).
        </SourceNote>

        <KeyIdea>
          As barreiras raramente aparecem sozinhas: numa mesma situação costumam somar-se o canal,
          a linguagem e o volume de informação — e é a soma que faz a mensagem falhar.
        </KeyIdea>
      </section>

      {/* 2. EXEMPLO + 3. INTERAÇÃO */}
      <section className="mt-12">
        <SectionHeading
          eyebrow="Exemplo"
          title="Quantas barreiras vê nesta situação?"
          lead="Cenário ilustrativo (fictício), construído para conter várias barreiras ao mesmo tempo."
        />
        <Scenario
          title="Fim de tarde, instruções técnicas"
          context="Cenário fictício, criado para fins pedagógicos."
          lines={[
            {
              speaker: "Situação",
              text: "Uma formadora dá instruções técnicas complexas, num espaço com ruído de obras no exterior, a um grupo cansado no final do dia, usando termos que só alguns dominam.",
            },
          ]}
          note="Selecione abaixo todas as barreiras que julga estarem presentes — e só depois veja a análise."
        />

        <MultiSelectCheck
          id="bloco-4-barreiras-cenario"
          question="Quantas barreiras diferentes consegue identificar nesta situação?"
          hint="Pode selecionar várias. A análise comenta todas as opções, incluindo as que não se aplicam."
          options={CENARIO_OPCOES}
          takeaway="Quatro barreiras estão claramente em jogo (físicas, fisiológicas em sentido lato, semânticas e sobrecarga). Identificar barreiras é um exercício de evidência: só se nomeia o que a situação mostra."
        />

        <LessonAccordion
          items={[
            {
              title: "Preconceito não é só o óbvio",
              content: (
                <div className="space-y-3">
                  <p>
                    No contexto de formação, um preconceito pode ser assumir que um formando mais
                    calado «não está interessado», ou que alguém mais velho «não vai acompanhar a
                    tecnologia». Estas suposições são barreiras psicológicas que distorcem a
                    comunicação antes mesmo de ela começar.
                  </p>
                  <p className="text-muted-foreground">
                    Repare na ligação ao Bloco 2: o preconceito funciona como perceção seletiva
                    antecipada — decide o que vamos ver e ouvir naquela pessoa antes de ela abrir a
                    boca.
                  </p>
                </div>
              ),
            },
          ]}
        />
      </section>

      {/* 4. INTERAÇÃO */}
      <section className="mt-12">
        <SectionHeading
          eyebrow="Interação"
          title="Que barreira está a agir?"
          lead="Quatro situações curtas. Cada opção explica porque se enquadra — ou não — nesse tipo de barreira."
        />

        <Quiz
          id="bloco-4-quiz-1"
          question="«Enviei o email com as regras há três semanas, através da coordenação — os formandos dizem que nunca souberam de nada.»"
          options={[
            {
              text: "Administrativa / burocrática",
              correct: true,
              feedback:
                "Certo: a mensagem passou pelo circuito da organização e perdeu-se no caminho. Não há problema de linguagem nem de canal físico — o problema é a forma como a informação foi processada e intermediada.",
            },
            {
              text: "Semântica",
              feedback:
                "A linguagem não está em causa: nada indica que as regras fossem incompreensíveis. O que falhou foi o percurso da mensagem dentro da estrutura.",
            },
            {
              text: "Física / mecânica",
              feedback:
                "Não há ruído nem equipamento inadequado descritos. A falha é organizacional, não do canal físico.",
            },
            {
              text: "Perceção seletiva",
              feedback:
                "Para haver perceção seletiva a mensagem teria de ter chegado e sido parcialmente retida. Aqui, aparentemente, não chegou.",
            },
          ]}
          takeaway="Quando a mensagem atravessa intermediários, o problema tende a estar no circuito — e repetir a mesma mensagem pelo mesmo circuito repete a falha."
        />

        <Quiz
          id="bloco-4-quiz-2"
          question="«Expliquei que era preciso validar o output do pipeline antes do commit — ficaram todos a olhar para mim.»"
          options={[
            {
              text: "Semântica",
              correct: true,
              feedback:
                "Certo: a linguagem não é comum ao recetor. O jargão técnico é eficientíssimo entre pares e opaco para quem está a aprender — as palavras chegaram, o significado não.",
            },
            {
              text: "Psicológica",
              feedback:
                "Não há indício de preconceito ou estereótipo em jogo. O obstáculo está no vocabulário escolhido, não numa suposição sobre as pessoas.",
            },
            {
              text: "Sobrecarga de informação",
              feedback:
                "É uma frase única e curta: não houve saturação por volume. O que houve foi vocabulário não partilhado.",
            },
            {
              text: "Fisiológica",
              feedback:
                "Nada aponta para limitações da fala ou da audição. Ouviram bem — apenas não descodificaram.",
            },
          ]}
          takeaway="Teste rápido para barreiras semânticas: se tiver de explicar mais de dois termos por frase, o problema não é a atenção do grupo."
        />

        <Quiz
          id="bloco-4-quiz-3"
          question="«Aquele formando quase não fala nas sessões, portanto não deve estar interessado no curso.»"
          options={[
            {
              text: "Psicológica (preconceito / estereótipo)",
              correct: true,
              feedback:
                "Certo: é uma suposição sobre a pessoa a partir de um único sinal, que passa a filtrar tudo o que ela fizer depois. O formador deixa de recolher informação e começa a confirmar a sua conclusão.",
            },
            {
              text: "Pessoal (estado de espírito)",
              feedback:
                "As barreiras pessoais dizem respeito a emoções e valores do momento. Aqui o que atua é uma inferência estabilizada sobre o outro — um estereótipo.",
            },
            {
              text: "Administrativa",
              feedback:
                "A organização não intervém nesta leitura: a barreira está na interpretação de quem observa.",
            },
            {
              text: "Filtragem",
              feedback:
                "Não há retransmissão de informação entre níveis. A distorção acontece na cabeça de quem interpreta, não no trajeto da mensagem.",
            },
          ]}
          takeaway="O preconceito é a barreira mais difícil de detetar porque se apresenta como conclusão razoável, não como obstáculo."
        />

        <Quiz
          id="bloco-4-quiz-4"
          question="«Dei-lhes o manual, o guião, a rubrica de avaliação e três exemplos, tudo na primeira meia hora. Ninguém sabia por onde começar.»"
          options={[
            {
              text: "Sobrecarga de informação",
              correct: true,
              feedback:
                "Certo: o recetor ficou saturado por excesso de mensagens em simultâneo. Cada documento era claro — o conjunto, entregue de uma vez, tornou-se inutilizável.",
            },
            {
              text: "Semântica",
              feedback:
                "Nada indica vocabulário inacessível. O problema é a quantidade e o ritmo, não as palavras.",
            },
            {
              text: "Física / mecânica",
              feedback:
                "O ambiente e o equipamento não são referidos como problema. A saturação é cognitiva.",
            },
            {
              text: "Perceção seletiva",
              feedback:
                "A perceção seletiva costuma ser a consequência disto — a pessoa agarra-se a um pedaço. Mas a causa descrita é o volume entregue de uma só vez.",
            },
          ]}
          takeaway="Contra a sobrecarga: sequenciar. Um documento, um momento, uma tarefa — na ordem em que vão ser usados."
        />
      </section>

      {/* 5. APLICAÇÃO */}
      <section className="mt-12">
        <SectionHeading
          eyebrow="Aplicação"
          title="Transportar para a sua prática"
          lead="Sem resposta certa: o valor está no registo pessoal e na consciência que gera."
        />
        <ReflectionPrompt
          id="bloco-4-reflexao-aplicacao"
          question="Qual das nove barreiras aparece com mais frequência nas suas sessões? Que mudança concreta poderia reduzi-la já na próxima?"
          hint="Nomeie a barreira, descreva onde ela surge e uma alteração possível."
        />
        <ContentCard tone="primary" title="Antes de avançar">
          <p>
            O Bloco 5 fecha o módulo com a competência que atravessa todas as anteriores: escutar
            ativamente.
          </p>
        </ContentCard>
        <SourceNote>
          Abreu, T.M.B. &amp; Bazoni, M.C. (2016). <em>R. Dito Efeito</em>, 7(11), 74-94 (citando
          Kunsch 2003, Dubrin 2003, Gil 2001).
        </SourceNote>
      </section>
    </>
  );
}
