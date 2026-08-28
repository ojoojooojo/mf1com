import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, Clock } from "lucide-react";
import { MF2_ACTIVITIES } from "@/lib/course-data-mf2";
import { ContentCard, SectionHeading } from "@/components/course/LessonKit";
import { StopNav, useVisit } from "@/components/course/StopNav";
import { useProgress } from "@/lib/progress";

export const Route = createFileRoute("/_authenticated/mf2/atividades/")({
  head: () => ({
    meta: [
      { title: "Aprendizagem Ativa — 5 atividades práticas | MF2" },
      {
        name: "description",
        content:
          "Cinco atividades práticas sobre dinâmicas e causas do conflito na formação: diagnóstico, mapeamento de causas, consequências, papel do indivíduo e prevenção.",
      },
      { property: "og:title", content: "Aprendizagem Ativa — MF2" },
      {
        property: "og:description",
        content:
          "5 atividades substanciais (~2h) de aplicação prática das competências de análise e gestão de conflitos.",
      },
    ],
  }),
  component: Mf2ActivitiesHub,
});

function Mf2ActivitiesHub() {
  useVisit("mf2-atividades");
  const { isCompleted, hydrated } = useProgress();
  const doneCount = MF2_ACTIVITIES.filter((a) => isCompleted(`mf2-atividade-${a.id}`)).length;

  return (
    <article>
      <header className="rounded-2xl border border-accent/30 bg-accent-soft p-6 shadow-soft sm:p-8">
        <p className="eyebrow text-accent">Aprendizagem Ativa · ~2h</p>
        <h1 className="mt-2 font-display text-3xl leading-tight">
          Cinco atividades para aplicar o que aprendeu
        </h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Não são quizzes: cada atividade pede-lhe produção própria — diagnóstico, análise causal,
          avaliação de consequências, reflexão e planeamento preventivo. As suas respostas ficam
          guardadas na sua conta e podem ser retomadas a qualquer momento, em qualquer dispositivo.
        </p>
        <p className="mt-4 text-sm font-semibold">
          {hydrated ? doneCount : 0} de {MF2_ACTIVITIES.length} atividades concluídas
        </p>
      </header>

      <section className="mt-10">
        <SectionHeading eyebrow="Atividades" title="Escolha por onde começar" />
        <ul className="space-y-3">
          {MF2_ACTIVITIES.map((activity) => {
            const done = hydrated && isCompleted(`mf2-atividade-${activity.id}`);
            return (
              <li key={activity.id}>
                <Link
                  to="/mf2/atividades/$atividadeId"
                  params={{ atividadeId: activity.id }}
                  className="group flex items-start gap-4 rounded-xl border border-border bg-card p-5 transition-colors hover:border-accent/50 hover:bg-secondary"
                >
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-accent font-display text-sm font-semibold text-accent-foreground">
                    {activity.letter}
                  </span>
                  <span className="min-w-0">
                    <span className="block font-display text-lg">{activity.title}</span>
                    <span className="mt-1 block text-sm text-muted-foreground">
                      {activity.description}
                    </span>
                    <span className="mt-2 flex flex-wrap items-center gap-2 text-xs">
                      <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-0.5 text-muted-foreground">
                        <Clock className="size-3" /> ~{activity.minutes} min
                      </span>
                      <span className="rounded-full bg-muted px-2.5 py-0.5 text-muted-foreground">
                        {activity.kind}
                      </span>
                      <span
                        className={
                          done
                            ? "inline-flex items-center gap-1 rounded-full bg-success-soft px-2.5 py-0.5 font-medium text-foreground"
                            : "rounded-full border border-border px-2.5 py-0.5 text-muted-foreground"
                        }
                      >
                        {done ? (
                          <>
                            <Check className="size-3" /> Concluída
                          </>
                        ) : (
                          "Por fazer"
                        )}
                      </span>
                    </span>
                  </span>
                  <ArrowRight className="ml-auto mt-1 size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <div className="mt-8">
        <ContentCard tone="primary" title="Como será avaliado">
          <p>
            A avaliação é formativa: não há classificação automática. As suas produções servem de
            base à sessão síncrona de 2 horas e à autoavaliação da Síntese Final.
          </p>
        </ContentCard>
      </div>

      <StopNav stopId="mf2-atividades" />
    </article>
  );
}
