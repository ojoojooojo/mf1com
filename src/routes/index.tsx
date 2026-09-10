import { Fragment } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowDown, ArrowRight, Clock, Users } from "lucide-react";
import { ContentCard, SectionHeading } from "@/components/course/LessonKit";
import logoIefp from "@/assets/logo-iefp-oficial.png";
import logosCofinanciamento from "@/assets/logos-cofinanciamento.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Gestão de Conflitos na Formação | Formação Pedagógica Contínua de Formadores" },
      {
        name: "description",
        content:
          "Referencial de Formação Pedagógica Contínua de Formadores do IEFP: três módulos de 10 horas sobre comunicação, dinâmicas de conflito e estratégias de resolução.",
      },
      {
        property: "og:title",
        content: "Gestão de Conflitos na Formação | Formação Pedagógica Contínua de Formadores",
      },
      {
        property: "og:description",
        content:
          "Três módulos (MF1, MF2, MF3) de 10h cada, promovidos pelo IEFP — Delegação de Portalegre.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: GlobalLanding,
});

const MODULES = [
  {
    code: "MF1",
    title: "Comunicação e Escuta Ativa na Formação",
    description:
      "Formule mensagens com clareza e escute o que o outro está realmente a dizer, intervindo antes de a tensão escalar.",
    to: "/mf1",
    tone: "primary" as const,
  },
  {
    code: "MF2",
    title: "Dinâmicas e Causas do Conflito na Formação",
    description:
      "Compreenda a natureza, os tipos, as causas e o impacto do conflito — e o papel de cada pessoa na sua origem ou prevenção.",
    to: "/mf2",
    tone: "accent" as const,
  },
  {
    code: "MF3",
    title: "Estratégias de Resolução de Conflitos na Formação",
    description:
      "Desenvolva autoconhecimento, empatia, competências sociais e ferramentas estruturadas para resolver conflitos na formação.",
    to: "/mf3",
    tone: "success" as const,
  },
];

function GlobalLanding() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <main className="flex-1">
        {/* Hero */}
        <section className="border-b border-border bg-surface px-4 pb-12 pt-16 sm:pb-16 sm:pt-24">
          <div className="mx-auto max-w-5xl text-center">
            <p className="eyebrow">Referencial de Formação Pedagógica Contínua de Formadores</p>
            <h1 className="mx-auto mt-4 max-w-4xl font-display text-4xl leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              GESTÃO DE CONFLITOS NA FORMAÇÃO
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground sm:text-xl">
              Formação Pedagógica Contínua de Formadores
            </p>
            <div className="mx-auto mt-8 max-w-3xl rounded-2xl border border-border bg-card p-6 text-left shadow-soft sm:p-8">
            <p className="text-[1.025rem] leading-relaxed text-foreground">
              Esta formação insere-se no{" "}
              <strong>Referencial de Formação Pedagógica Contínua de Formadores Gestão de Conflitos na Formação</strong>
              , do IEFP — Instituto do Emprego e Formação Profissional, I.P. (Centro Nacional de
              Qualificação de Formadores), promovida pelo IEFP — Centro de Formação de Portalegre.
            </p>
            <p className="mt-4 text-[1.025rem] leading-relaxed text-muted-foreground">
              São três módulos de <strong>10 horas</strong> cada, num total de <strong>30 horas</strong>,
              a percorrer na sequência recomendada <strong>MF1 → MF2 → MF3</strong>. Cada módulo
              combina <strong>6 horas</strong> de aprendizagem assíncrona neste MOOC com{" "}
              <strong>4 horas</strong> de sessão síncrona online, realizada fora do MOOC — perfazendo{" "}
              <strong>18 horas assíncronas</strong> e <strong>12 horas síncronas online</strong>.
            </p>
            </div>
          </div>
        </section>

        {/* Module cards */}
        <section className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
          <SectionHeading
            eyebrow="Estrutura modular"
            title="Três módulos de 10 horas"
            lead="Percorra os módulos na sequência recomendada: MF1 → MF2 → MF3."
            className="text-center"
          />

          <div className="mt-8 flex flex-col items-stretch gap-4 sm:flex-row sm:items-stretch sm:justify-center">
            {MODULES.map((mod, idx) => (
              <Fragment key={mod.code}>
                <Link
                  to={mod.to}
                  className="group flex flex-col rounded-2xl border border-border bg-card p-6 shadow-soft transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:w-80"
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary text-sm font-semibold text-primary-foreground">
                      {mod.code}
                    </span>
                    <ArrowRight className="size-5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                  </div>
                  <h3 className="mt-5 font-display text-xl leading-tight">{mod.title}</h3>
                  <p className="mt-2 flex-1 text-[0.975rem] leading-relaxed text-muted-foreground">
                    {mod.description}
                  </p>
                  <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="size-4" /> 10 horas
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Users className="size-4" /> 6h assíncronas + 4h síncronas online
                    </span>
                  </div>
                </Link>
                {idx < MODULES.length - 1 && (
                  <div className="flex shrink-0 items-center justify-center py-2 text-primary sm:px-2 sm:py-0">
                    <ArrowDown className="size-6 sm:hidden" />
                    <ArrowRight className="hidden size-6 sm:block" />
                  </div>
                )}
              </Fragment>
            ))}
          </div>
        </section>
      </main>

      {/* Footer / institutional identity */}
      <footer className="border-t border-border bg-surface">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-8 sm:flex-row sm:justify-between sm:py-10">
          <div className="flex flex-col items-center gap-4 sm:items-start">
            <img
              src={logoIefp}
              alt="Logótipo do IEFP — Instituto do Emprego e Formação Profissional, I.P."
              width={178}
              height={38}
              loading="lazy"
              className="h-auto w-40 object-contain"
            />
            <p className="max-w-md text-center text-xs text-muted-foreground sm:text-left">
              IEFP — Instituto do Emprego e Formação Profissional, I.P.
              <br />
              Centro Nacional de Qualificação de Formadores · Centro de Formação de Portalegre
            </p>
          </div>
          <img
            src={logosCofinanciamento}
            alt="Logótipos PESSOAS 2030, Portugal 2030 e União Europeia — cofinanciamento"
            width={210}
            height={30}
            loading="lazy"
            className="h-auto w-52 object-contain opacity-90"
          />
        </div>
      </footer>
    </div>
  );
}
