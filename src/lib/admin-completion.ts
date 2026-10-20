import { SECTION_REQUIREMENTS } from "./section-requirements";

export type AdminProgress = {
  completed_by_admin?: boolean;
  admin_completed_at?: string | null;
  admin_completed_by?: string | null;
};

export function contentCounts(
  sectionId: string,
  quizzes: { quiz_id: string }[],
  responses: { activity_id: string; response_text: string }[],
) {
  const requirements = SECTION_REQUIREMENTS[sectionId];
  if (requirements) {
    const quizIds = requirements.filter((r) => r.kind === "quiz").map((r) => r.id);
    const textIds = requirements.filter((r) => r.kind === "texto").map((r) => r.id);
    const quizAnswered = quizIds.filter((id) => quizzes.some((r) => r.quiz_id === id)).length;
    const textAnswered = textIds.filter((id) => responses.some((r) => r.activity_id === id && r.response_text.trim() !== "")).length;
    return { quizAnswered, quizTotal: quizIds.length, textAnswered, textTotal: textIds.length,
      missing: quizAnswered < quizIds.length || textAnswered < textIds.length };
  }
  const belongs = (id: string) => id.startsWith(`${sectionId}-`) ||
    (sectionId === "sintese" && id.startsWith("final-"));
  return {
    quizAnswered: new Set(quizzes.filter((r) => belongs(r.quiz_id)).map((r) => r.quiz_id)).size,
    quizTotal: null,
    textAnswered: new Set(responses.filter((r) => belongs(r.activity_id) && r.response_text.trim() !== "").map((r) => r.activity_id)).size,
    textTotal: null,
    missing: false,
  };
}