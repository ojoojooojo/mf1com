import { createFileRoute } from "@tanstack/react-router";
import { Placeholder, SectionHeading } from "@/components/course/LessonKit";

export const Route = createFileRoute("/mf3/fontes")({
  head: () => ({
    meta: [
      { title: "Fontes e referências | MF3 Estratégias de Resolução de Conflitos" },
      {
        name: "description",
        content:
          "Fontes académicas e institucionais usadas nos cinco conteúdos do módulo MF3 — Estratégias de Resolução de Conflitos na Formação, organizadas por bloco.",
      },
      { property: "og:title", content: "Fontes e referências — MF3" },
      {
        property: "og:description",
        content:
          "Referencial IEFP/CNQF e restantes fontes usadas no módulo MF3, organizadas por conteúdo.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Mf3SourcesPage,
});

function Mf3SourcesPage() {
  return (
    <article>
      <header className="rounded-2xl border border-border bg-card p-6 shadow-soft sm:p-8">
        <p className="eyebrow">MF3 · Fontes</p>
        <h1 className="mt-2 font-display text-3xl leading-tight">Fontes e referências</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Todo o conteúdo teórico deste módulo assenta em fontes identificadas. A lista por bloco é
          publicada à medida que cada conteúdo é finalizado.
        </p>
      </header>

      <section className="mt-10">
        <SectionHeading title="Referencial curricular" />
        <ul className="space-y-2 text-[0.975rem] leading-relaxed">
          <li className="rounded-xl border border-border bg-card p-4">
            IEFP/CNQF (2024). Referencial de Formação Pedagógica Contínua de Formadores — Gestão de
            Conflitos na Formação. Instituto do Emprego e Formação Profissional, I.P. 1.ª edição,
            julho de 2024.
          </li>
        </ul>
      </section>

      <section className="mt-10">
        <SectionHeading
          eyebrow="Por conteúdo"
          title="Fontes por bloco"
          lead="Lista em preparação, a completar com o conteúdo definitivo de cada bloco."
        />
        <Placeholder label="Bloco 1 (Salovey & Mayer, 1990; Goleman, 1995) já em uso na página do bloco; restantes blocos por publicar." />
      </section>
    </article>
  );
}
