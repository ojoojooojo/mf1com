import { ContentCard, SectionHeading } from "@/components/course/LessonKit";
import { PrivacyNote, RevealPanel, TaskField, useFilled } from "@/components/course/ActivityKit";
import { Heart } from "lucide-react";

const APOIOS = [
  "Que emoção sentiu nesse momento — e conseguiu nomeá-la na altura?",
  "O que gostaria que a outra pessoa tivesse compreendido?",
  "Que sinal (verbal, de tom ou de corpo) esteve lá desde o início e só percebeu depois?",
];

const CONTEUDOS = [
  "Definição e funções da comunicação (Bloco 1)",
  "Componentes psicológicos e elementos do processo (Bloco 2)",
  "Comunicação assertiva (Bloco 3)",
  "Barreiras à comunicação (Bloco 4)",
  "Escuta ativa e empatia (Bloco 5)",
];

export function ActivityE() {
  const k = "atividade-e";
  const filled = useFilled(`${k}-reflexao`);

  return (
    <>
      <section className="mt-10">
        <SectionHeading
          eyebrow="Reflexão"
          title="A sua prática, revisitada"
          lead="Última atividade do módulo. Não há resposta certa nem errada — e nada aqui é avaliado."
        />
        <PrivacyNote>
          A sua resposta fica guardada <strong>na sua conta</strong> e é visível apenas a si e ao
          formador do curso. Não é avaliada, não é classificada e não é partilhada com o grupo.
          Escreva com liberdade — e sem identificar pessoas.
        </PrivacyNote>

        <ContentCard tone="accent" title="Pergunta de reflexão">
          <p className="text-[1.05rem] leading-relaxed">
            Pense numa situação de tensão ou mal-entendido que já viveu numa sessão de formação (sem
            identificar pessoas). Qual dos 5 conteúdos deste módulo — definição/funções, componentes
            psicológicos, comunicação assertiva, barreiras, escuta ativa — teria feito mais diferença
            se o tivesse aplicado nesse momento? Como o aplicaria da próxima vez?
          </p>
        </ContentCard>

        <div className="my-6 rounded-xl border border-border bg-surface p-5">
          <p className="eyebrow">Se não souber por onde começar</p>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 text-[0.95rem]">
            {APOIOS.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-muted-foreground">
            Os cinco conteúdos do módulo, para ter à mão: {CONTEUDOS.join(" · ")}.
          </p>
        </div>

        <TaskField
          id={`${k}-reflexao`}
          label="A sua reflexão"
          instruction="Escreva à sua vontade — um parágrafo ou uma página. Descreva a situação, o conteúdo que teria feito diferença e como o aplicaria da próxima vez."
          rows={14}
          placeholder="A situação que me vem à memória…"
        />

        <RevealPanel
          id={`${k}-revelado`}
          canReveal={filled}
          buttonLabel="Concluir a reflexão"
          lockedHint="Escreva a sua reflexão para concluir a atividade."
        >
          <div className="rounded-xl border border-primary/25 bg-primary-soft p-6">
            <p className="eyebrow flex items-center gap-2 text-primary">
              <Heart className="size-3.5" /> Fecho
            </p>
            <p className="mt-2 text-[1.05rem] leading-relaxed">
              Obrigado por refletir sobre a sua prática — este tipo de análise é, só por si, uma das
              formas mais eficazes de desenvolvimento profissional contínuo.
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              A sua reflexão continua guardada na sua conta e pode ser retomada ou reescrita
              sempre que quiser. Se lhe fizer sentido, leve-a para a sessão síncrona: é material de
              trabalho, não um exercício de arquivo.
            </p>
          </div>
        </RevealPanel>
      </section>

      <div className="mt-8">
        <ContentCard tone="primary" title="Liga a">
          <p>Aos cinco conteúdos do módulo — é a atividade que os junta na sua experiência.</p>
        </ContentCard>
      </div>
    </>
  );
}
