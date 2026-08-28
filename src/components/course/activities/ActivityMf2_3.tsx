import { ContentCard, Placeholder, SectionHeading } from "@/components/course/LessonKit";

export function ActivityMf2_3() {
  return (
    <section className="mt-10">
      <SectionHeading
        eyebrow="Atividade 3"
        title="Analisar Consequências"
        lead="O enunciado, o cenário e os campos de resposta definitivos serão inseridos aqui."
      />
      <ContentCard title="Conteúdo em preparação">
        <Placeholder label="Cenário e campos de análise de consequências para indivíduos, grupo, aprendizagem e relação pedagógica a inserir." />
      </ContentCard>
    </section>
  );
}
