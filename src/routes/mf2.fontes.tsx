import { createFileRoute } from "@tanstack/react-router";
import { SectionHeading } from "@/components/course/LessonKit";

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

type Group = { title: string; items: string[] };

const GROUPS: Group[] = [
  {
    title: "Bloco 1 · Definição e Tipos de Conflito",
    items: [
      "Deutsch, M. (1973). The Resolution of Conflict: Constructive and Destructive Processes.",
      "Pondy, L.R. (1967). Organizational Conflict: Concepts and Models. Administrative Science Quarterly, 12(2), 296-320.",
      "Rahim, M.A. (2002). Toward a Theory of Managing Organizational Conflict. International Journal of Conflict Management, 13(3), 206-235.",
      "Jehn, K.A. (1997). A Qualitative Analysis of Conflict Types and Dimensions in Organizational Groups. Administrative Science Quarterly, 42(3), 530-557.",
      "De Dreu, C.K.W. & Weingart, L.R. (2003). Task versus Relationship Conflict, Team Performance, and Team Member Satisfaction: A Meta-Analysis. Journal of Applied Psychology, 88(4), 741-749.",
    ],
  },
  {
    title: "Bloco 2 · Estratégias e Abordagens Fundamentais na Gestão de Conflitos",
    items: [
      "Referencial IEFP/CNQF (2024), enquadramento das abordagens de prevenção/intervenção/pós-resolução do Módulo 2.",
      "Deutsch, M. (1973). The Resolution of Conflict.",
      "Glasl, F., modelo dos nove níveis de escalada de conflito, síntese via Jordan, T. (2000). Glasl's Nine-Stage Model of Conflict Escalation.",
    ],
  },
  {
    title: "Bloco 3 · Causas, Custos e Consequências dos Conflitos",
    items: [
      "CPP Inc. (2008). Workplace Conflict and How Businesses Can Harness It to Thrive: The CPP Global Human Capital Report.",
      "Referencial IEFP/CNQF (2024).",
    ],
  },
  {
    title: "Bloco 4 · O Impacto do Conflito nos Indivíduos e o Papel do Indivíduo",
    items: [
      "CPP Inc. (2008). Workplace Conflict and How Businesses Can Harness It to Thrive: The CPP Global Human Capital Report.",
      "Ross, L. (2018). From the Fundamental Attribution Error to the Truly Fundamental Attribution Error and Beyond: My Research Journey. Perspectives on Psychological Science.",
      "Deutsch, M. (1973).",
      "Referencial IEFP/CNQF (2024).",
    ],
  },
];

const ALL_SOURCES = [
  "IEFP/CNQF (2024). Referencial de Formação Pedagógica Contínua de Formadores — Gestão de Conflitos na Formação. Instituto do Emprego e Formação Profissional, I.P. 1.ª edição, julho de 2024.",
  "Deutsch, M. (1973). The Resolution of Conflict: Constructive and Destructive Processes. Yale University Press.",
  "Pondy, L.R. (1967). Organizational Conflict: Concepts and Models. Administrative Science Quarterly, 12(2), 296-320.",
  "Rahim, M.A. (2002). Toward a Theory of Managing Organizational Conflict. International Journal of Conflict Management, 13(3), 206-235.",
  "Jehn, K.A. (1997). A Qualitative Analysis of Conflict Types and Dimensions in Organizational Groups. Administrative Science Quarterly, 42(3), 530-557.",
  "De Dreu, C.K.W. & Weingart, L.R. (2003). Task versus Relationship Conflict, Team Performance, and Team Member Satisfaction: A Meta-Analysis. Journal of Applied Psychology, 88(4), 741-749.",
  "CPP Inc. (2008). Workplace Conflict and How Businesses Can Harness It to Thrive: The CPP Global Human Capital Report.",
  "Glasl, F. — modelo dos nove níveis de escalada de conflito; síntese via Jordan, T. (2000). Glasl's Nine-Stage Model of Conflict Escalation.",
  "Ross, L. (2018). From the Fundamental Attribution Error to the Truly Fundamental Attribution Error and Beyond: My Research Journey. Perspectives on Psychological Science.",
];

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
