import { createFileRoute } from "@tanstack/react-router";
import { SectionHeading } from "@/components/course/LessonKit";

export const Route = createFileRoute("/mf1/fontes")({
  head: () => ({
    meta: [
      { title: "Fontes e referências | MF1 Comunicação e Escuta Ativa" },
      {
        name: "description",
        content:
          "Fontes académicas e institucionais usadas nos cinco conteúdos do módulo MF1 — Comunicação e Escuta Ativa na Formação, organizadas por bloco.",
      },
      { property: "og:title", content: "Fontes e referências — MF1" },
      {
        property: "og:description",
        content:
          "Referencial IEFP/CNQF e restantes fontes usadas no módulo, organizadas por conteúdo.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: SourcesPage,
});

type Group = { title: string; items: string[] };

const REFERENCE = {
  title: "Referencial curricular",
  items: [
    "IEFP/CNQF (2024). Referencial de Formação Pedagógica Contínua de Formadores — Gestão de Conflitos na Formação. Instituto do Emprego e Formação Profissional, I.P. 1.ª edição, julho de 2024.",
  ],
};

const GROUPS: Group[] = [
  {
    title: "Bloco 1 · Definição e Funções da Comunicação",
    items: [
      "Knoow.net — Dias, M. (2019). Modelos de Comunicação.",
      "Manual UFCD 9205 — Comunicação e Perfis (Sistema Nacional de Qualificações, Portugal).",
    ],
  },
  {
    title: "Bloco 2 · Componentes Psicológicos e Elementos do Processo",
    items: [
      "Manual UFCD 9205 — Comunicação e Perfis (Sistema Nacional de Qualificações, Portugal).",
      "Knoow.net — Dias, M. (2019). Modelos de Comunicação.",
    ],
  },
  {
    title: "Bloco 3 · Comunicação Assertiva",
    items: [
      "Instituto Politécnico de Lisboa (IPL). Comunicação Interpessoal: A Importância da Assertividade — Síntese de Conteúdos.",
    ],
  },
  {
    title: "Bloco 4 · Barreiras à Comunicação",
    items: [
      "Abreu, T. M. B. & Bazoni, M. C. (2016). Como superar barreiras da comunicação nas organizações. R. Dito Efeito, 7(11), 74-94.",
      "Gil, A. C. (2001), Kunsch, M. M. K. (2003) e Dubrin, A. (2003) — citados via Abreu & Bazoni (2016).",
    ],
  },
  {
    title: "Bloco 5 · Escuta Ativa e Empatia",
    items: [
      "Rogers, C. R. & Farson, R. E. (1957). Active Listening. University of Chicago — Industrial Relations Center.",
    ],
  },
];

function SourcesPage() {
  return (
    <article>
      <header className="rounded-2xl border border-border bg-card p-6 shadow-soft sm:p-8">
        <p className="eyebrow">Transparência</p>
        <h1 className="mt-2 font-display text-3xl leading-tight">Fontes e referências</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Este módulo segue o Referencial de Formação Pedagógica Contínua de Formadores «Gestão de
          Conflitos na Formação» do IEFP. Os exemplos, diálogos e cenários com nomes fictícios (ex.
          formador, formando, «Benjamim») são situações simuladas criadas para fins pedagógicos, não
          relatos reais.
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
          lead="Cada bloco do curso indica, no fim das secções relevantes, a fonte concreta da afirmação."
        />
        <div className="space-y-4">
          {GROUPS.map((group) => (
            <div key={group.title} className="rounded-xl border border-border bg-card p-5">
              <h2 className="font-display text-lg">{group.title}</h2>
              <ul className="mt-3 space-y-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="border-l-2 border-border pl-3 text-[0.95rem] leading-relaxed text-muted-foreground"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <SectionHeading eyebrow="Lista completa" title="Todas as fontes do curso" />
        <ol className="space-y-2">
          {[
            ...REFERENCE.items,
            "Rogers, C. R. & Farson, R. E. (1957). Active Listening. University of Chicago — Industrial Relations Center.",
            "Instituto Politécnico de Lisboa (IPL). Comunicação Interpessoal: A Importância da Assertividade — Síntese de Conteúdos.",
            "Manual UFCD 9205 — Comunicação e Perfis (Sistema Nacional de Qualificações, Portugal).",
            "Abreu, T. M. B. & Bazoni, M. C. (2016). Como superar barreiras da comunicação nas organizações. R. Dito Efeito, 7(11), 74-94.",
            "Knoow.net — Dias, M. (2019). Modelos de Comunicação.",
            "Gil, A. C. (2001), Kunsch, M. M. K. (2003), Dubrin, A. (2003) — citados via Abreu & Bazoni (2016).",
          ].map((item, i) => (
            <li key={item} className="flex gap-3 text-[0.95rem] leading-relaxed">
              <span className="shrink-0 font-semibold tabular-nums text-primary">{i + 1}.</span>
              <span>{item}</span>
            </li>
          ))}
        </ol>
      </section>
    </article>
  );
}
