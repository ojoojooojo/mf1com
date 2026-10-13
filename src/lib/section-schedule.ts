import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type SectionScheduleRow = {
  section_id: string;
  module_key: string;
  opens_at: string;
  updated_at: string;
  updated_by: string | null;
};

export const sectionScheduleQueryKey = ["section-schedule"] as const;

/** Mapa section_id → data de abertura (ISO). Leitura pública — funciona sem sessão. */
export function useSectionSchedule() {
  return useQuery({
    queryKey: sectionScheduleQueryKey,
    staleTime: 30_000,
    queryFn: async (): Promise<Map<string, string>> => {
      const { data, error } = await supabase
        .from("section_schedule")
        .select("section_id, opens_at");
      if (error) throw error;
      return new Map(
        (data ?? []).map((r) => [r.section_id as string, r.opens_at as string]),
      );
    },
  });
}

/** Data de abertura futura da subsecção, ou null se está aberta (ou sem linha no calendário). */
export function lockedUntil(
  schedule: Map<string, string> | undefined,
  sectionId: string,
): Date | null {
  const raw = schedule?.get(sectionId);
  if (!raw) return null;
  const date = new Date(raw);
  return date.getTime() > Date.now() ? date : null;
}

const openingFormat = new Intl.DateTimeFormat("pt-PT", {
  timeZone: "Europe/Lisbon",
  weekday: "long",
  day: "2-digit",
  month: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
});

/** «terça-feira, 14/10, às 19h00» — sempre em hora de Portugal continental. */
export function formatOpening(date: Date): string {
  const parts = Object.fromEntries(
    openingFormat.formatToParts(date).map((p) => [p.type, p.value]),
  );
  return `${parts.weekday}, ${parts.day}/${parts.month}, às ${parts.hour}h${parts.minute}`;
}

const lisbonWallClockFormat = new Intl.DateTimeFormat("pt-PT", {
  timeZone: "Europe/Lisbon",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hourCycle: "h23",
});

function lisbonWallClock(utc: Date): string {
  const parts = Object.fromEntries(
    lisbonWallClockFormat.formatToParts(utc).map((p) => [p.type, p.value]),
  );
  return `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}:${parts.second}`;
}

/** Converte «AAAA-MM-DDTHH:mm» interpretado como hora de Lisboa para ISO UTC. */
export function lisbonLocalToIso(local: string): string {
  let utc = new Date(`${local}:00Z`);
  for (let i = 0; i < 2; i++) {
    const wall = lisbonWallClock(utc);
    const diff = new Date(`${wall}Z`).getTime() - new Date(`${local}:00Z`).getTime();
    utc = new Date(utc.getTime() - diff);
  }
  return utc.toISOString();
}

/** Valor para <input type="datetime-local"> a partir de um instante ISO, em hora de Lisboa. */
export function isoToLisbonLocal(iso: string): string {
  return lisbonWallClock(new Date(iso)).slice(0, 16);
}
