import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Clock } from "lucide-react";
import { MF3_BLOCKS, getMf3Block } from "@/lib/course-data-mf3";
import { StopNav, useVisit } from "@/components/course/StopNav";
import { Block1ContentMf3 } from "@/components/course/Block1ContentMf3";
import { Block2ContentMf3 } from "@/components/course/Block2ContentMf3";
import { Block3ContentMf3 } from "@/components/course/Block3ContentMf3";
import { Block4ContentMf3 } from "@/components/course/Block4ContentMf3";
import { Block5ContentMf3 } from "@/components/course/Block5ContentMf3";

export const Route = createFileRoute("/_authenticated/mf3/blocos/$blocoId")({
  loader: ({ params }) => {
    const block = getMf3Block(params.blocoId);
    if (!block) throw notFound();
    return { block };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Bloco indisponível — MF3" }, { name: "robots", content: "noindex" }],
      };
    }
    const { block } = loaderData;
    const title = `Bloco ${block.number}: ${block.title} — MF3`;
    return {
      meta: [
        { title },
        { name: "description", content: block.subtitle },
        { property: "og:title", content: title },
        { property: "og:description", content: block.subtitle },
      ],
    };
  },
  notFoundComponent: Mf3BlockNotFound,
  component: Mf3BlockPage,
});

function Mf3BlockNotFound() {
  return (
    <div className="rounded-xl border border-border bg-card p-8">
      <h1 className="font-display text-2xl">Bloco não encontrado</h1>
      <p className="mt-2 text-muted-foreground">
        Escolha um dos cinco blocos do módulo no mapa lateral.
      </p>
      <ul className="mt-4 space-y-2">
        {MF3_BLOCKS.map((b) => (
          <li key={b.id}>
            <Link
              to="/mf3/blocos/$blocoId"
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

function Mf3BlockPage() {
  const { block } = Route.useLoaderData();
  const stopId = `mf3-bloco-${block.id}`;
  useVisit(stopId);

  return (
    <article key={block.id}>
      <header className="rounded-2xl border border-border bg-card p-6 shadow-soft sm:p-8">
        <p className="eyebrow">Bloco {block.number} de 5</p>
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
        <Block1ContentMf3 />
      ) : block.id === "2" ? (
        <Block2ContentMf3 />
      ) : block.id === "3" ? (
        <Block3ContentMf3 />
      ) : block.id === "4" ? (
        <Block4ContentMf3 />
      ) : (
        <Block5ContentMf3 />
      )}

      <StopNav stopId={stopId} />
    </article>
  );
}
