import { createFileRoute } from "@tanstack/react-router";
import { SectionHeading } from "@/components/course/LessonKit";
import { MF2_BLOCKS } from "@/lib/course-data-mf2";

export const Route = createFileRoute("/mf2/fontes")({
  head: () => ({
    meta: [
      { title: "Fontes e referências | MF2 Dinâmicas e Causas do Conflito" },
      {
        name: "description",
        content:
          "Fontes académicas e institucionais usadas nos quatro conteúdos do módulo MF2 — Dinâmicas e Causas do Conflito na Formação, organizadas por bloco.",
      },
      { property: "og:title", content: "Fontes e referências — MF2" },
      {
        property: "og:description",
        content:
          "Referencial IEFP/CNQF e restantes fontes usadas no módulo MF2, organizadas por conteúdo.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Mf2SourcesPage,
});

const REFERENCE = {
  title: "Referencial curricular",
  items: [
    "IEFP/CNQF (2024). Referencial de Formação Pedagógica Contínua de Formadores — Gestão de Conflitos na Formação. Instituto do Emprego e Formação Profissional, I.P. 1.ª edição, julho de 2024.",
  ],
};

function Mf2SourcesPage() {
  return (
    <article>
      <header className="rounded-2xl border border-border bg-card p-6 shadow-soft sm:p-8">
        <p className="eyebrow">Transparência</p>
        <h1 className="mt-2 font-display text-3xl leading-tight">Fontes e referências — MF2</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Este módulo segue o Referencial de Formação Pedagógica Contínua de Formadores «Gestão de
          Conflitos na Formação» do IEFP. Os cenários e diálogos com nomes fictícios são situações
          simuladas criadas para fins pedagógicos, não relatos reais.
        </p>
      </header>

      <section className="mt-10">
        <SectionHeading eyebrow="Base curricular" title={REFERENCE.title} />
        <ul className="space-y-2">
          {REFERENCE.items.map((item) => (
            <li
              key={item}
              className="rounded-xl border border-border bg-surface p-4 text-[0.95rem] leading-relaxed"
            >
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12">
        <SectionHeading
          eyebrow="Por conteúdo"
          title="Fontes usadas em cada bloco"
          lead="Cada bloco indica, no fim das secções relevantes, a fonte concreta da afirmação."
        />
        <div className="space-y-4">
          {MF2_BLOCKS.map((block) => (
            <div key={block.id} className="rounded-xl border border-border bg-card p-5">
              <h2 className="font-display text-lg">
                Bloco {block.number} · {block.title}
              </h2>
              <p className="mt-3 border-l-2 border-border pl-3 text-[0.95rem] leading-relaxed text-muted-foreground">
                A preencher com as fontes do conteúdo definitivo deste bloco.
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <SectionHeading eyebrow="Lista completa" title="Todas as fontes do módulo" />
        <ol className="space-y-2">
          {REFERENCE.items.map((item, i) => (
            <li key={item} className="flex gap-3 text-[0.95rem] leading-relaxed">
              <span className="shrink-0 font-semibold tabular-nums text-primary">{i + 1}.</span>
              <span>{item}</span>
            </li>
          ))}
        </ol>
        <p className="mt-3 text-sm text-muted-foreground">
          A lista será completada à medida que o conteúdo definitivo de cada bloco for inserido.
        </p>
      </section>
    </article>
  );
}
