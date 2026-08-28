import { ContentCard, Placeholder, SectionHeading } from "@/components/course/LessonKit";

export function ActivityMf2_4() {
  return (
    <section className="mt-10">
      <SectionHeading
        eyebrow="Atividade 4"
        title="O Papel do Indivíduo"
        lead="O enunciado, o cenário e os campos de resposta definitivos serão inseridos aqui."
      />
      <ContentCard title="Conteúdo em preparação">
        <Placeholder label="Cenário e campos de reflexão sobre o contributo de cada interveniente na origem, manutenção, escalada ou prevenção do conflito a inserir." />
      </ContentCard>
    </section>
  );
}
