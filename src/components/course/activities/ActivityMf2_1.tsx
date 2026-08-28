import { ContentCard, Placeholder, SectionHeading } from "@/components/course/LessonKit";

export function ActivityMf2_1() {
  return (
    <section className="mt-10">
      <SectionHeading
        eyebrow="Atividade 1"
        title="Diagnosticar o Conflito"
        lead="O enunciado, o cenário e os campos de resposta definitivos serão inseridos aqui."
      />
      <ContentCard title="Conteúdo em preparação">
        <Placeholder label="Cenário de formação, campos de análise (partes, tipo, objeto, interesses, sinais) e análise de referência a inserir." />
      </ContentCard>
    </section>
  );
}
