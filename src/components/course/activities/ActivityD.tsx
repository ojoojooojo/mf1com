import { ContentCard, Figure, SectionHeading } from "@/components/course/LessonKit";
import {
  Commentary,
  FictionNote,
  RevealPanel,
  TaskField,
} from "@/components/course/ActivityKit";
import { useProgress } from "@/lib/progress";
import { cn } from "@/lib/utils";
import { AlertTriangle, Check } from "lucide-react";
import atividadeDImage from "@/assets/mf1-atividade-d-dialogo.jpg";

type Fala = {
  id: string;
  speaker: "Formador" | "Formando";
  text: string;
  anotacoes: { tom: string; postura: string; olhar: string; distancia: string };
  incongruente: boolean;
  comentario: string;
};

const FALAS: Fala[] = [
  {
    id: "f1",
    speaker: "Formador",
    text: "«Então, como é que foi o exercício? Correu bem?»",
    anotacoes: {
      tom: "Tom animado, ritmo rápido",
      postura: "De pé, ligeiramente inclinado para a frente",
      olhar: "Contacto visual direto",
      distancia: "Cerca de 1,5 m",
    },
    incongruente: false,
    comentario:
      "Verbal e não-verbal alinhados: pergunta aberta, corpo disponível, olhar presente. É o ponto de partida — e é útil para perceber, por contraste, o que muda nas falas seguintes.",
  },
  {
    id: "f2",
    speaker: "Formando",
    text: "«Sim, sim... correu bem.»",
    anotacoes: {
      tom: "Voz baixa, frase arrastada, sobe no fim",
      postura: "Ombros encolhidos, mãos a mexer no lápis",
      olhar: "Desvia para a folha",
      distancia: "Recua meio passo",
    },
    incongruente: true,
    comentario:
      "Primeira incongruência clara. O conteúdo verbal afirma que correu bem; o paraverbal (voz baixa, hesitação, entoação a subir) e o não-verbal (ombros encolhidos, olhar desviado, recuo) dizem o contrário. Pelo Bloco 5, o «significado total» aqui não está nas palavras: está no sentimento por trás delas — provavelmente desconforto ou receio de admitir dificuldade. Responder só ao conteúdo («ótimo, então avançamos») é ignorar a mensagem mais importante que acabou de ser enviada.",
  },
  {
    id: "f3",
    speaker: "Formador",
    text: "«Ótimo. Então avançamos para a parte seguinte.»",
    anotacoes: {
      tom: "Tom neutro, ritmo acelerado",
      postura: "Já a virar-se para o projetor",
      olhar: "Sem contacto visual",
      distancia: "Afasta-se para o quadro",
    },
    incongruente: false,
    comentario:
      "Não há incongruência entre o que este formador diz e o que o seu corpo comunica — ambos dizem «esta conversa terminou». Não é incongruente, é uma oportunidade de escuta perdida: o passo 1 do ciclo (atenção plena) foi substituído pela agenda da sessão.",
  },
  {
    id: "f4",
    speaker: "Formando",
    text: "«Não, tudo bem, pode continuar.»",
    anotacoes: {
      tom: "Voz tensa, um pouco mais alta que o normal",
      postura: "Braços cruzados, costas encostadas à cadeira",
      olhar: "Fixo na mesa",
      distancia: "Corpo virado para o lado, não para o formador",
    },
    incongruente: true,
    comentario:
      "Segunda incongruência clara, e a mais forte. As palavras autorizam («pode continuar»), o tom e o corpo contradizem («não está tudo bem»). Note-se também o desnecessário: se estivesse tudo bem, não haveria razão para o dizer. Perante uma discrepância deste tipo, a regra do Bloco 5 é responder ao sentimento e não ao conteúdo — algo como «pode ser impressão minha, mas parece-me que ficou alguma coisa por dizer sobre o exercício».",
  },
  {
    id: "f5",
    speaker: "Formador",
    text: "«Se houver dúvidas, é só dizer, estou sempre disponível.»",
    anotacoes: {
      tom: "Tom apressado, frase dita a caminho da porta",
      postura: "De costas, a arrumar os cabos",
      olhar: "Nenhum",
      distancia: "3 m, a aumentar",
    },
    incongruente: true,
    comentario:
      "Terceira incongruência — e a menos notada, porque vem do formador. A disponibilidade é afirmada verbalmente e desmentida por tudo o resto: costas voltadas, pressa, distância a aumentar. Rogers e Farson são diretos quanto a isto: a falta de interesse sincero torna-se visível ao outro por mais que se tente disfarçar. Um convite deste tipo raramente é aceite.",
  },
  {
    id: "f6",
    speaker: "Formando",
    text: "«Está bem. Obrigado.»",
    anotacoes: {
      tom: "Voz plana, sem inflexão",
      postura: "Já a guardar o material",
      olhar: "Breve, de passagem",
      distancia: "A sair da sala",
    },
    incongruente: false,
    comentario:
      "Não é uma incongruência: é o desfecho coerente das anteriores. A pessoa retirou-se da conversa — verbalmente e fisicamente. Do lado do formador, é aqui que se percebe o custo real de não ter recolhido o feedback duas falas antes.",
  },
];

const INCONGRUENTES = FALAS.filter((f) => f.incongruente).map((f) => f.id);

export function ActivityD() {
  const k = "atividade-d";
  const { state, saveAnswer, hydrated } = useProgress();
  const marcadas = hydrated ? (state.answers[`${k}-marcas`] ?? "").split("|").filter(Boolean) : [];

  const toggle = (id: string) =>
    saveAnswer(
      `${k}-marcas`,
      (marcadas.includes(id) ? marcadas.filter((x) => x !== id) : [...marcadas, id]).join("|"),
    );

  const observacoesEscritas = marcadas.filter(
    (id) => (state.answers[`${k}-obs-${id}`] ?? "").trim().length >= 3,
  );
  const canReveal = marcadas.length > 0 && observacoesEscritas.length === marcadas.length;

  return (
    <>
      <section className="mt-10">
        <SectionHeading
          eyebrow="Enunciado"
          title="Diálogo anotado: ler o que não é dito"
          lead="Seis falas alternadas. Cada fala traz etiquetas com tom de voz, postura, contacto visual e distância física — informação não-verbal que, num vídeo, veria em vez de ler."
        />
        <FictionNote>
          Diálogo simulado, criado para fins pedagógicos. As anotações substituem o vídeo, que não
          está disponível neste formato.
        </FictionNote>
        <ContentCard tone="accent" title="O que lhe é pedido">
          <ol className="list-decimal space-y-1 pl-5">
            <li>
              Assinale as falas em que há <strong>incongruência</strong> entre o que é dito (verbal)
              e o que é comunicado pelo tom e pelo corpo (paraverbal e não-verbal).
            </li>
            <li>Em cada fala assinalada, escreva o que observou.</li>
            <li>Só depois compare com o comentário de referência, fala a fala.</li>
          </ol>
        </ContentCard>
        <Figure
          caption="Um momento do diálogo — o que observa antes de ler as falas?"
          source="Reconstrução visual gerada por IA para fins pedagógicos."
        >
          <img
            src={atividadeDImage}
            alt="Formador de pé, virado para um formando sentado; o formando tem os braços cruzados e o olhar dirigido para a mesa, numa postura ligeiramente afastada do formador."
            loading="lazy"
            width={1536}
            height={1024}
            className="h-auto w-full max-w-full rounded-lg object-cover"
          />
        </Figure>
      </section>

      <section className="mt-10">
        <SectionHeading eyebrow="Observação" title="O diálogo" />
        <ul className="space-y-4">
          {FALAS.map((fala) => {
            const marcada = marcadas.includes(fala.id);
            const isFormador = fala.speaker === "Formador";
            return (
              <li
                key={fala.id}
                className={cn(
                  "rounded-xl border p-4 transition-colors sm:p-5",
                  marcada ? "border-accent bg-accent-soft" : "border-border bg-card",
                  isFormador ? "sm:ml-auto sm:w-[92%]" : "sm:w-[92%]",
                )}
              >
                <p className="eyebrow">{fala.speaker}</p>
                <p className="mt-1 text-[1.02rem] leading-relaxed">{fala.text}</p>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {[
                    ["Tom", fala.anotacoes.tom],
                    ["Postura", fala.anotacoes.postura],
                    ["Olhar", fala.anotacoes.olhar],
                    ["Distância", fala.anotacoes.distancia],
                  ].map(([rotulo, valor]) => (
                    <li
                      key={rotulo}
                      className="rounded-full border border-dashed border-primary/40 bg-primary-soft/60 px-2.5 py-0.5 text-xs text-foreground"
                    >
                      <span className="font-semibold uppercase tracking-wide">{rotulo}:</span>{" "}
                      {valor}
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={() => toggle(fala.id)}
                  aria-pressed={marcada}
                  className={cn(
                    "mt-3 inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors",
                    marcada
                      ? "border-accent bg-accent text-accent-foreground"
                      : "border-border hover:bg-muted",
                  )}
                >
                  {marcada ? <Check className="size-3.5" /> : <AlertTriangle className="size-3.5" />}
                  {marcada ? "Assinalada como incongruente" : "Assinalar incongruência"}
                </button>

                {marcada ? (
                  <div className="mt-3">
                    <TaskField
                      id={`${k}-obs-${fala.id}`}
                      label="O que observou nesta fala?"
                      instruction="Distinga o que é dito do que é comunicado pelo tom e pelo corpo."
                      rows={3}
                    />
                  </div>
                ) : null}
              </li>
            );
          })}
        </ul>

        <RevealPanel
          id={`${k}-revelado`}
          canReveal={canReveal}
          buttonLabel="Submeter e ver o comentário fala a fala"
          lockedHint="Assinale pelo menos uma incongruência e escreva a sua observação em cada fala assinalada."
        >
          <Commentary
            heading="Comentário de referência, fala a fala"
            intro={
              <>
                Assinalou {marcadas.length}{" "}
                {marcadas.length === 1 ? "fala" : "falas"}. Na leitura de referência há{" "}
                <strong>três</strong> momentos de incongruência clara — e um deles é do formador, o
                que é fácil de deixar passar.
              </>
            }
            items={FALAS.map((fala) => {
              const marcada = marcadas.includes(fala.id);
              const acertou = marcada === fala.incongruente;
              return {
                title: `${fala.speaker}: ${fala.text}${
                  fala.incongruente ? " — incongruência" : " — sem incongruência"
                }${marcada ? " · assinalou" : ""}`,
                tone: fala.incongruente ? ("warn" as const) : acertou ? ("good" as const) : ("neutral" as const),
                body: <p>{fala.comentario}</p>,
              };
            })}
            closing={
              INCONGRUENTES.every((id) => marcadas.includes(id))
                ? "Identificou as três incongruências. Repare no fio condutor: cada uma que passa sem resposta reduz a probabilidade de a pessoa voltar a trazer o assunto — é assim que um mal-entendido pequeno se torna um conflito."
                : "Volte às falas 2, 4 e 5. O padrão a treinar é este: quando as palavras dizem uma coisa e o tom ou o corpo dizem outra, é ao sentimento que se responde primeiro (passo 3 do ciclo do Bloco 5) — e a resposta mais segura é uma hipótese, não um diagnóstico: «parece-me que…, é isso?»."
            }
          />
        </RevealPanel>
      </section>

      <div className="mt-8">
        <ContentCard tone="primary" title="Liga a">
          <p>
            Bloco 2 (verbal, paraverbal e não-verbal) e Bloco 5 (significado total, responder ao
            sentimento, refletir a compreensão).
          </p>
        </ContentCard>
      </div>
    </>
  );
}
