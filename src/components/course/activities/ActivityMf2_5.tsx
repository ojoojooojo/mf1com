import { ContentCard, Placeholder, SectionHeading } from "@/components/course/LessonKit";

export function ActivityMf2_5() {
  return (
    <section className="mt-10">
      <SectionHeading
        eyebrow="Atividade 5"
        title="Prevenção"
        lead="O enunciado, o cenário e os campos de resposta definitivos serão inseridos aqui."
      />
      <ContentCard title="Conteúdo em preparação">
        <Placeholder label="Situação de formação, identificação de sinais precoces e plano de medidas preventivas a inserir." />
      </ContentCard>
    </section>
  );
}
