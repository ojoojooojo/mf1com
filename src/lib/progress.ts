import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation } from "@tanstack/react-router";
import { STOPS, type Stop } from "./course-data";
import { MF2_STOPS } from "./course-data-mf2";
import { supabase } from "@/integrations/supabase/client";

export type ModuleKey = "mf1" | "mf2";

const STORAGE_KEYS: Record<ModuleKey, string> = {
  mf1: "mf1-comunicacao-progresso-v1",
  mf2: "mf2-conflitos-progresso-v1",
};

const MODULE_STOPS: Record<ModuleKey, Stop[]> = {
  mf1: STOPS,
  mf2: MF2_STOPS,
};

const MF2_PREFIX = "mf2-";

/** Os ids do MF2 são prefixados; os do MF1 não têm prefixo. */
function belongsTo(module: ModuleKey, id: string) {
  return module === "mf2" ? id.startsWith(MF2_PREFIX) : !id.startsWith(MF2_PREFIX);
}

export type ProgressState = {
  visited: string[];
  completed: string[];
  answers: Record<string, string>;
  quiz: Record<string, number>;
  quizCorrect: Record<string, boolean>;
  /** Estado de interface (ex. "já revelei a análise de referência") — só localStorage. */
  flags: Record<string, boolean>;
};

const EMPTY: ProgressState = { visited: [], completed: [], answers: {}, quiz: {}, quizCorrect: {}, flags: {} };

function read(storageKey: string): ProgressState {
  if (typeof window === "undefined") return EMPTY;
  try {
    const raw = window.localStorage.getItem(storageKey);
    if (!raw) return EMPTY;
    const parsed = JSON.parse(raw) as Partial<ProgressState>;
    return {
      visited: parsed.visited ?? [],
      completed: parsed.completed ?? [],
      answers: parsed.answers ?? {},
      quiz: parsed.quiz ?? {},
      quizCorrect: parsed.quizCorrect ?? {},
      flags: parsed.flags ?? {},
    };
  } catch {
    return EMPTY;
  }
}

function write(storageKey: string, state: ProgressState) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(storageKey, JSON.stringify(state));
  } catch {
    /* storage indisponível — o módulo continua utilizável */
  }
  window.dispatchEvent(new CustomEvent("mf1-progress-change"));
}

async function currentUserId(): Promise<string | null> {
  const { data } = await supabase.auth.getSession();
  return data.session?.user.id ?? null;
}

/** Lê o progresso guardado na conta e funde-o com a cache local. */
async function pullRemote(module: ModuleKey, storageKey: string): Promise<ProgressState | null> {
  const userId = await currentUserId();
  if (!userId) return null;

  const [{ data: rows }, { data: responses }, { data: quizRows }] = await Promise.all([
    supabase.from("progress").select("section_id, status").eq("user_id", userId),
    supabase.from("written_responses").select("activity_id, response_text").eq("user_id", userId),
    supabase.from("quiz_answers").select("quiz_id, selected_option, is_correct").eq("user_id", userId),
  ]);

  const local = read(storageKey);
  const visited = new Set(local.visited);
  const completed = new Set(local.completed);
  for (const row of rows ?? []) {
    if (!belongsTo(module, row.section_id)) continue;
    visited.add(row.section_id);
    if (row.status === "concluido") completed.add(row.section_id);
    else completed.delete(row.section_id);
  }

  const answers = { ...local.answers };
  for (const row of responses ?? []) {
    if (!belongsTo(module, row.activity_id)) continue;
    if (row.response_text) answers[row.activity_id] = row.response_text;
  }

  // O backend é a fonte de verdade dos quizzes: estado local antigo é descartado.
  const quiz: Record<string, number> = {};
  const quizCorrect: Record<string, boolean> = {};
  for (const row of quizRows ?? []) {
    if (!belongsTo(module, row.quiz_id)) continue;
    const index = Number.parseInt(row.selected_option, 10);
    if (!Number.isNaN(index)) quiz[row.quiz_id] = index;
    quizCorrect[row.quiz_id] = row.is_correct;
  }

  const merged: ProgressState = {
    ...local,
    visited: [...visited],
    completed: [...completed],
    answers,
    quiz,
    quizCorrect,
  };
  write(storageKey, merged);
  return merged;
}

async function pushSection(sectionId: string, status: "iniciado" | "concluido") {
  const userId = await currentUserId();
  if (!userId) return;
  await supabase
    .from("progress")
    .upsert(
      { user_id: userId, section_id: sectionId, status, updated_at: new Date().toISOString() },
      { onConflict: "user_id,section_id" },
    );
}

async function pushQuiz(
  quizId: string,
  optionIndex: number,
  isCorrect: boolean,
  optionText: string,
) {
  const userId = await currentUserId();
  if (!userId) return;
  await supabase.from("quiz_answers").upsert(
    {
      user_id: userId,
      quiz_id: quizId,
      selected_option: optionText ? `${optionIndex}|${optionText}` : String(optionIndex),
      is_correct: isCorrect,
      answered_at: new Date().toISOString(),
    },
    { onConflict: "user_id,quiz_id" },
  );
}

const responseTimers = new Map<string, ReturnType<typeof setTimeout>>();

/** Debounce por campo: o localStorage serve de buffer enquanto a pessoa escreve. */
function queueResponse(activityId: string, text: string) {
  const existing = responseTimers.get(activityId);
  if (existing) clearTimeout(existing);
  responseTimers.set(
    activityId,
    setTimeout(() => {
      responseTimers.delete(activityId);
      void pushResponse(activityId, text).catch(() => {
        /* sem sessão ou offline — a cache local mantém a resposta */
      });
    }, 700),
  );
}

async function pushResponse(activityId: string, text: string) {
  const userId = await currentUserId();
  if (!userId) return;
  await supabase.from("written_responses").upsert(
    {
      user_id: userId,
      activity_id: activityId,
      response_text: text,
      submitted_at: new Date().toISOString(),
    },
    { onConflict: "user_id,activity_id" },
  );
}

export function useProgress() {
  const pathname = useLocation({ select: (l) => l.pathname });
  const module: ModuleKey = pathname.startsWith("/mf2") ? "mf2" : "mf1";
  const storageKey = STORAGE_KEYS[module];
  const stops = MODULE_STOPS[module];

  const [state, setState] = useState<ProgressState>(EMPTY);
  const [hydrated, setHydrated] = useState(false);
  const [synced, setSynced] = useState(false);

  useEffect(() => {
    setState(read(storageKey));
    setHydrated(true);
    const sync = () => setState(read(storageKey));
    window.addEventListener("mf1-progress-change", sync);
    window.addEventListener("storage", sync);

    let cancelled = false;
    void pullRemote(module, storageKey)
      .then((remote) => {
        if (cancelled) return;
        if (remote) {
          setState(remote);
          setSynced(true);
        }
      })
      .catch(() => {
        /* offline ou sem sessão — a cache local continua a servir */
      });

    return () => {
      cancelled = true;
      window.removeEventListener("mf1-progress-change", sync);
      window.removeEventListener("storage", sync);
    };
  }, [module, storageKey]);

  const update = useCallback(
    (fn: (prev: ProgressState) => ProgressState) => {
      const next = fn(read(storageKey));
      write(storageKey, next);
      setState(next);
    },
    [storageKey],
  );

  const markVisited = useCallback(
    (id: string) => {
      update((p) => (p.visited.includes(id) ? p : { ...p, visited: [...p.visited, id] }));
      if (!read(storageKey).completed.includes(id)) void pushSection(id, "iniciado");
    },
    [update, storageKey],
  );

  const markCompleted = useCallback(
    (id: string) => {
      update((p) => ({
        ...p,
        visited: p.visited.includes(id) ? p.visited : [...p.visited, id],
        completed: p.completed.includes(id) ? p.completed : [...p.completed, id],
      }));
      void pushSection(id, "concluido");
    },
    [update],
  );

  const unmarkCompleted = useCallback(
    (id: string) => {
      update((p) => ({ ...p, completed: p.completed.filter((x) => x !== id) }));
      void pushSection(id, "iniciado");
    },
    [update],
  );

  const saveAnswer = useCallback(
    (key: string, value: string) => {
      update((p) => ({ ...p, answers: { ...p.answers, [key]: value } }));
      queueResponse(key, value);
    },
    [update],
  );

  const saveQuiz = useCallback(
    (key: string, optionIndex: number, isCorrect = false, optionText = "") => {
      update((p) => ({
        ...p,
        quiz: { ...p.quiz, [key]: optionIndex },
        quizCorrect: { ...p.quizCorrect, [key]: isCorrect },
      }));
      void pushQuiz(key, optionIndex, isCorrect, optionText).catch(() => {
        /* offline — fica a cache local */
      });
    },
    [update],
  );

  const saveFlag = useCallback(
    (key: string, value = true) => update((p) => ({ ...p, flags: { ...p.flags, [key]: value } })),
    [update],
  );

  const reset = useCallback(() => {
    write(storageKey, EMPTY);
    setState(EMPTY);
    void (async () => {
      const userId = await currentUserId();
      if (!userId) return;
      const pattern = `${MF2_PREFIX}%`;
      if (module === "mf2") {
        await supabase.from("progress").delete().eq("user_id", userId).like("section_id", pattern);
        await supabase.from("quiz_answers").delete().eq("user_id", userId).like("quiz_id", pattern);
        await supabase
          .from("written_responses")
          .delete()
          .eq("user_id", userId)
          .like("activity_id", pattern);
      } else {
        await supabase
          .from("progress")
          .delete()
          .eq("user_id", userId)
          .not("section_id", "like", pattern);
        await supabase
          .from("quiz_answers")
          .delete()
          .eq("user_id", userId)
          .not("quiz_id", "like", pattern);
        await supabase
          .from("written_responses")
          .delete()
          .eq("user_id", userId)
          .not("activity_id", "like", pattern);
      }
    })();
  }, [module, storageKey]);

  const trackable = stops.length;
  const done = useMemo(
    () => state.completed.filter((id) => stops.some((s) => s.id === id)).length,
    [state.completed, stops],
  );

  return {
    state,
    hydrated,
    synced,
    markVisited,
    markCompleted,
    unmarkCompleted,
    saveAnswer,
    saveQuiz,
    saveFlag,
    reset,
    percent: Math.min(100, Math.round((done / trackable) * 100)),
    isVisited: (id: string) => state.visited.includes(id),
    isCompleted: (id: string) => state.completed.includes(id),
  };
}

export type UseProgress = ReturnType<typeof useProgress>;
