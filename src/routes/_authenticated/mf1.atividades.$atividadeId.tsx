import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Check, Clock } from "lucide-react";
import { ACTIVITIES, getActivity } from "@/lib/course-data";
import { ContentCard } from "@/components/course/LessonKit";
import { ActivityA } from "@/components/course/activities/ActivityA";
import { ActivityB } from "@/components/course/activities/ActivityB";
import { ActivityC } from "@/components/course/activities/ActivityC";
import { ActivityD } from "@/components/course/activities/ActivityD";
import { ActivityE } from "@/components/course/activities/ActivityE";
import { useProgress } from "@/lib/progress";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_authenticated/mf1/atividades/$atividadeId")({
  loader: ({ params }) => {
    const activity = getActivity(params.atividadeId);
    if (!activity) throw notFound();
    return { activity };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Atividade indisponível — MF1" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { activity } = loaderData;
    const title = `Atividade ${activity.letter}: ${activity.title} — MF1`;
    return {
      meta: [
        { title },
        { name: "description", content: activity.description },
        { property: "og:title", content: title },
        { property: "og:description", content: activity.description },
      ],
    };
  },
  notFoundComponent: ActivityNotFound,
  component: ActivityPage,
});

function ActivityNotFound() {
  return (
    <div className="rounded-xl border border-border bg-card p-8">
      <h1 className="font-display text-2xl">Atividade não encontrada</h1>
      <Link
        to="/mf1/atividades"
        className="mt-3 inline-flex items-center gap-2 font-medium text-primary hover:underline"
      >
        <ArrowLeft className="size-4" /> Voltar às atividades
      </Link>
    </div>
  );
}

function ActivityPage() {
  const { activity } = Route.useLoaderData();
  const { isCompleted, markCompleted, unmarkCompleted, hydrated } = useProgress();
  const key = `atividade-${activity.id}`;
  const done = hydrated && isCompleted(key);
  const index = ACTIVITIES.findIndex((a) => a.id === activity.id);
  const next = ACTIVITIES[index + 1];

  return (
    <article key={activity.id}>
      <Link
        to="/mf1/atividades"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" /> Aprendizagem Ativa
      </Link>

      <header className="mt-4 rounded-2xl border border-accent/30 bg-card p-6 shadow-soft sm:p-8">
        <p className="eyebrow text-accent">
          Atividade {activity.letter} · {activity.kind}
        </p>
        <h1 className="mt-2 font-display text-3xl leading-tight">{activity.title}</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">{activity.description}</p>
        <span className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
          <Clock className="size-3" /> ~{activity.minutes} min
        </span>
      </header>

      {activity.id === "a" ? (
        <ActivityA />
      ) : activity.id === "b" ? (
        <ActivityB />
      ) : activity.id === "c" ? (
        <ActivityC />
      ) : activity.id === "d" ? (
        <ActivityD />
      ) : (
        <ActivityE />
      )}

      <div className="mt-8 space-y-4 border-t border-border pt-6">
        <button
          type="button"
          onClick={() => (done ? unmarkCompleted(key) : markCompleted(key))}
          className={cn(
            "inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors",
            done
              ? "bg-success-soft text-foreground hover:bg-muted"
              : "bg-accent text-accent-foreground hover:opacity-90",
          )}
        >
          <Check className="size-4" />
          {done ? "Atividade concluída — desmarcar" : "Marcar atividade como concluída"}
        </button>
        {next ? (
          <div>
            <ContentCard title="A seguir">
              <Link
                to="/mf1/atividades/$atividadeId"
                params={{ atividadeId: next.id }}
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                Atividade {next.letter} — {next.title}
              </Link>
            </ContentCard>
          </div>
        ) : (
          <ContentCard tone="primary" title="Concluiu as cinco atividades?">
            <Link
              to="/mf1/sintese"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              Avançar para a Síntese Final
            </Link>
          </ContentCard>
        )}
      </div>
    </article>
  );
}
