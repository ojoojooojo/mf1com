import { ContentCard, Placeholder, SectionHeading } from "@/components/course/LessonKit";

export function ActivityMf2_2() {
  return (
    <section className="mt-10">
      <SectionHeading
        eyebrow="Atividade 2"
        title="Mapear Causas"
        lead="O enunciado, o cenário e os campos de resposta definitivos serão inseridos aqui."
      />
      <ContentCard title="Conteúdo em preparação">
        <Placeholder label="Situação complexa e grelha de análise causal (causas, fatores precipitantes, escalada, contexto, interpretações) a inserir." />
      </ContentCard>
    </section>
  );
}
