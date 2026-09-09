import { createFileRoute } from "@tanstack/react-router";
import { SectionHeading } from "@/components/course/LessonKit";

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

const REFERENCE = {
  title: "Referencial curricular",
  items: [
    "IEFP/CNQF (2024). Referencial de Formação Pedagógica Contínua de Formadores — Gestão de Conflitos na Formação. Instituto do Emprego e Formação Profissional, I.P. 1.ª edição, julho de 2024.",
  ],
};

type Group = { title: string; items: string[] };

const GROUPS: Group[] = [
  {
    title: "Bloco 1 · Inteligência Emocional e Autoconhecimento",
    items: [
      "Salovey, P. & Mayer, J.D. (1990). Emotional Intelligence. Imagination, Cognition, and Personality, 9(3), 185-211.",
      "Goleman, D. (1995). Emotional Intelligence: Why It Can Matter More Than IQ. Bantam Books.",
      "Referencial IEFP/CNQF (2024), objetivo de autoconhecimento e autorregulação do Módulo 3.",
    ],
  },
  {
    title: "Bloco 2 · Empatia e Competências Sociais",
    items: [
      "Goleman, D. (1995). Emotional Intelligence: Why It Can Matter More Than IQ. Bantam Books (dimensões de empatia e competências sociais).",
      "Salovey, P. & Mayer, J.D. (1990). Emotional Intelligence. Imagination, Cognition, and Personality, 9(3), 185-211.",
      "Rogers, C.R. & Farson, R.E. (1957). Active Listening. University of Chicago — Industrial Relations Center (referência de continuidade com o MF1).",
    ],
  },
  {
    title: "Bloco 3 · Gestão de Conflitos e Prevenção",
    items: [
      "Thomas, K.W. & Kilmann, R.H. (1974). Thomas-Kilmann Conflict Mode Instrument. Xicom.",
      "Referencial IEFP/CNQF (2024), objetivo de gestão eficaz de conflitos e prevenção.",
    ],
  },
  {
    title: "Bloco 4 · Stress e Conflito",
    items: [
      "Lazarus, R.S. & Folkman, S. (1984). Stress, Appraisal, and Coping. Springer.",
      "Goleman, D. (1995). Emotional Intelligence. Bantam Books (autorregulação, tratada no Bloco 1 e aqui aplicada ao momento anterior à intervenção).",
    ],
  },
  {
    title: "Bloco 5 · A Roda de Mapeamento do Conflito",
    items: [
      "Lantos, P. & Harari, S.N. (2018). Roda de Mapeamento do Conflito. Mediare.",
      "Mayer, B. (2000). The Dynamics of Conflict Resolution: A Practitioner's Guide. Jossey-Bass (modelo «Wheel of Conflict» de origem, adaptado por Lantos & Harari).",
    ],
  },
];

const ALL_SOURCES = [
  "IEFP/CNQF (2024). Referencial de Formação Pedagógica Contínua de Formadores — Gestão de Conflitos na Formação. Instituto do Emprego e Formação Profissional, I.P. 1.ª edição, julho de 2024.",
  "Salovey, P. & Mayer, J.D. (1990). Emotional Intelligence. Imagination, Cognition, and Personality, 9(3), 185-211.",
  "Goleman, D. (1995). Emotional Intelligence: Why It Can Matter More Than IQ. Bantam Books.",
  "Thomas, K.W. & Kilmann, R.H. (1974). Thomas-Kilmann Conflict Mode Instrument. Xicom.",
  "Lazarus, R.S. & Folkman, S. (1984). Stress, Appraisal, and Coping. Springer.",
  "Lantos, P. & Harari, S.N. (2018). Roda de Mapeamento do Conflito. Mediare — adaptação da «Wheel of Conflict» de Mayer, B. (2000).",
  "Mayer, B. (2000). The Dynamics of Conflict Resolution: A Practitioner's Guide. Jossey-Bass.",
  "Rogers, C.R. & Farson, R.E. (1957). Active Listening. University of Chicago — Industrial Relations Center (ficha completa nas fontes do MF1; aqui apenas como nota de continuidade).",
];

function Mf3SourcesPage() {
  return (
    <article>
      <header className="rounded-2xl border border-border bg-card p-6 shadow-soft sm:p-8">
        <p className="eyebrow">Transparência</p>
        <h1 className="mt-2 font-display text-3xl leading-tight">Fontes e referências — MF3</h1>
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
        <SectionHeading eyebrow="Lista completa" title="Todas as fontes do módulo" />
        <ol className="space-y-2">
          {ALL_SOURCES.map((item, i) => (
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
