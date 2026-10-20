import { useState } from "react";
import { flushResponses, useProgress } from "@/lib/progress";
import { missingRequirements, type SectionRequirement } from "@/lib/section-requirements";
import { useViewerRole } from "@/components/course/SectionGate";

function scrollToRequirement(id: string) {
  document
    .querySelector(`[data-req="${id}"]`)
    ?.scrollIntoView({ behavior: "smooth", block: "center" });
}

/**
 * Gate do botão «Marcar como concluído» (MF2/MF3): o formando só conclui depois
 * de responder a todos os quizzes e campos de texto da secção. O formador fica
 * isento. O servidor impõe a mesma regra (trigger em progress), por isso ao
 * concluir fazemos primeiro flush das respostas ainda no debounce.
 */
export function useCompletionGate(sectionId: string) {
  const { state, hydrated, isCompleted, isAdminCompleted, markCompleted, unmarkCompleted } = useProgress();
  const role = useViewerRole();
  const [completing, setCompleting] = useState(false);

  const done = hydrated && isCompleted(sectionId);
  const exempt = role.data === "formador";
  const missing = exempt || !hydrated || done ? [] : missingRequirements(sectionId, state);
  const blocked = missing.length > 0;

  const complete = async () => {
    setCompleting(true);
    try {
      await flushResponses();
    } finally {
      setCompleting(false);
    }
    markCompleted(sectionId);
  };

  return { done, adminDone: hydrated && isAdminCompleted(sectionId), blocked, completing, missing, complete, uncomplete: () => unmarkCompleted(sectionId) };
}

/** Lista do que falta responder, com ligação/scroll até cada elemento em falta. */
export function MissingRequirementsList({ missing }: { missing: SectionRequirement[] }) {
  if (missing.length === 0) return null;
  return (
    <div className="rounded-lg border border-border bg-muted/50 p-4 text-sm">
      <p className="font-medium">Para marcar como concluído, falta responder a:</p>
      <ul className="mt-2 space-y-1">
        {missing.map((m) => (
          <li key={m.id}>
            <button
              type="button"
              onClick={() => scrollToRequirement(m.id)}
              className="text-left text-primary underline-offset-4 hover:underline"
            >
              {m.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
