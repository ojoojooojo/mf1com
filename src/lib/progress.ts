import { useCallback, useEffect, useState } from "react";
import { STOPS } from "./course-data";

const STORAGE_KEY = "mf1-comunicacao-progresso-v1";

export type ProgressState = {
  visited: string[];
  completed: string[];
  answers: Record<string, string>;
  quiz: Record<string, number>;
};

const EMPTY: ProgressState = { visited: [], completed: [], answers: {}, quiz: {} };

function read(): ProgressState {
  if (typeof window === "undefined") return EMPTY;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY;
    const parsed = JSON.parse(raw) as Partial<ProgressState>;
    return {
      visited: parsed.visited ?? [],
      completed: parsed.completed ?? [],
      answers: parsed.answers ?? {},
      quiz: parsed.quiz ?? {},
    };
  } catch {
    return EMPTY;
  }
}

function write(state: ProgressState) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* storage indisponível — o módulo continua utilizável */
  }
  window.dispatchEvent(new CustomEvent("mf1-progress-change"));
}

export function useProgress() {
  const [state, setState] = useState<ProgressState>(EMPTY);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setState(read());
    setHydrated(true);
    const sync = () => setState(read());
    window.addEventListener("mf1-progress-change", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("mf1-progress-change", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const update = useCallback((fn: (prev: ProgressState) => ProgressState) => {
    const next = fn(read());
    write(next);
    setState(next);
  }, []);

  const markVisited = useCallback(
    (id: string) =>
      update((p) =>
        p.visited.includes(id) ? p : { ...p, visited: [...p.visited, id] },
      ),
    [update],
  );

  const markCompleted = useCallback(
    (id: string) =>
      update((p) => ({
        ...p,
        visited: p.visited.includes(id) ? p.visited : [...p.visited, id],
        completed: p.completed.includes(id) ? p.completed : [...p.completed, id],
      })),
    [update],
  );

  const unmarkCompleted = useCallback(
    (id: string) =>
      update((p) => ({ ...p, completed: p.completed.filter((x) => x !== id) })),
    [update],
  );

  const saveAnswer = useCallback(
    (key: string, value: string) =>
      update((p) => ({ ...p, answers: { ...p.answers, [key]: value } })),
    [update],
  );

  const saveQuiz = useCallback(
    (key: string, optionIndex: number) =>
      update((p) => ({ ...p, quiz: { ...p.quiz, [key]: optionIndex } })),
    [update],
  );

  const reset = useCallback(() => {
    write(EMPTY);
    setState(EMPTY);
  }, []);

  const trackable = STOPS.length;
  const done = state.completed.filter((id) => STOPS.some((s) => s.id === id)).length;

  return {
    state,
    hydrated,
    markVisited,
    markCompleted,
    unmarkCompleted,
    saveAnswer,
    saveQuiz,
    reset,
    percent: Math.min(100, Math.round((done / trackable) * 100)),
    isVisited: (id: string) => state.visited.includes(id),
    isCompleted: (id: string) => state.completed.includes(id),
  };
}

export type UseProgress = ReturnType<typeof useProgress>;
