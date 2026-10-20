import { describe, expect, test } from "bun:test";
import { contentCounts } from "../src/lib/admin-completion";
import { missingRequirements } from "../src/lib/section-requirements";

describe("Contagens para conclusão administrativa", () => {
  test("MF2 Bloco 2 exige três quizzes e uma reflexão não vazia", () => {
    const quizzes = ["abordagem", "escalada", "cooperativo"].map((id) => ({ quiz_id: `mf2-bloco-2-quiz-${id}` }));
    expect(contentCounts("mf2-bloco-2", quizzes, [{ activity_id: "mf2-bloco-2-reflexao", response_text: "   " }]))
      .toEqual({ quizAnswered: 3, quizTotal: 3, textAnswered: 0, textTotal: 1, missing: true });
    expect(contentCounts("mf2-bloco-2", quizzes, [{ activity_id: "mf2-bloco-2-reflexao", response_text: "x" }]).missing).toBe(false);
  });
  test("MF3 atividade 1 tem seis campos de texto", () => {
    expect(contentCounts("mf3-atividade-1", [], []).textTotal).toBe(6);
    expect(contentCounts("mf3-atividade-1", [], []).missing).toBe(true);
  });
  test("MF1 mostra apenas registos da secção e não impõe requisitos", () => {
    expect(contentCounts("sintese", [{ quiz_id: "final-1" }, { quiz_id: "bloco-1-quiz-fatica" }], [
      { activity_id: "sintese-compromisso", response_text: "x" },
      { activity_id: "atividade-a-p1", response_text: "x" },
    ])).toEqual({ quizAnswered: 1, quizTotal: null, textAnswered: 1, textTotal: null, missing: false });
    expect(missingRequirements("sintese", { visited: [], completed: [], answers: {}, quiz: {}, quizCorrect: {}, flags: {} })).toEqual([]);
  });
  test("Abertura e índices continuam sem requisitos", () => {
    for (const section of ["abertura", "aprendizagem-ativa", "mf2-abertura", "mf2-atividades", "mf3-abertura", "mf3-atividades"]) {
      expect(contentCounts(section, [], []).missing).toBe(false);
    }
  });
});