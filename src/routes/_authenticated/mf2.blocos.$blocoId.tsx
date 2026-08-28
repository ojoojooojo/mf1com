import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Clock } from "lucide-react";
import { MF2_BLOCKS, getMf2Block } from "@/lib/course-data-mf2";
import { StopNav, useVisit } from "@/components/course/StopNav";
import { Block1ContentMf2 } from "@/components/course/Block1ContentMf2";
import { Block2ContentMf2 } from "@/components/course/Block2ContentMf2";
import { Block3ContentMf2 } from "@/components/course/Block3ContentMf2";
import { Block4ContentMf2 } from "@/components/course/Block4ContentMf2";

export const Route = createFileRoute("/_authenticated/mf2/blocos/$blocoId")({
  loader: ({ params }) => {
    const block = getMf2Block(params.blocoId);
    if (!block) throw notFound();
    return { block };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Bloco indisponível — MF2" }, { name: "robots", content: "noindex" }],
      };
    }
    const { block } = loaderData;
    const title = `Bloco ${block.number}: ${block.title} — MF2`;
    return {
      meta: [
        { title },
        { name: "description", content: block.subtitle },
        { property: "og:title", content: title },
        { property: "og:description", content: block.subtitle },
      ],
    };
  },
  notFoundComponent: Mf2BlockNotFound,
  component: Mf2BlockPage,
});

function Mf2BlockNotFound() {
  return (
    <div className="rounded-xl border border-border bg-card p-8">
      <h1 className="font-display text-2xl">Bloco não encontrado</h1>
      <p className="mt-2 text-muted-foreground">
        Escolha um dos quatro blocos do módulo no mapa lateral.
      </p>
      <ul className="mt-4 space-y-2">
        {MF2_BLOCKS.map((b) => (
          <li key={b.id}>
            <Link
              to="/mf2/blocos/$blocoId"
              params={{ blocoId: b.id }}
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              Bloco {b.number} — {b.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Mf2BlockPage() {
  const { block } = Route.useLoaderData();
  const stopId = `mf2-bloco-${block.id}`;
  useVisit(stopId);

  return (
    <article key={block.id}>
      <header className="rounded-2xl border border-border bg-card p-6 shadow-soft sm:p-8">
        <p className="eyebrow">Bloco {block.number} de 4</p>
        <h1 className="mt-2 font-display text-3xl leading-tight">{block.title}</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">{block.subtitle}</p>
        <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1 text-muted-foreground">
            <Clock className="size-3" /> ~{block.minutes} min
          </span>
          {block.focus.map((f) => (
            <span
              key={f}
              className="rounded-full bg-primary-soft px-3 py-1 font-medium text-primary"
            >
              {f}
            </span>
          ))}
        </div>
      </header>

      {block.id === "1" ? (
        <Block1ContentMf2 />
      ) : block.id === "2" ? (
        <Block2ContentMf2 />
      ) : block.id === "3" ? (
        <Block3ContentMf2 />
      ) : (
        <Block4ContentMf2 />
      )}

      <StopNav stopId={stopId} />
    </article>
  );
}
