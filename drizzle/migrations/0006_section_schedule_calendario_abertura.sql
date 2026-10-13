-- 1) Calendário de abertura das subsecções (sempre às 19h00, hora de Lisboa)
CREATE TABLE public.section_schedule (
  section_id text PRIMARY KEY,
  module_key text NOT NULL,
  opens_at timestamp with time zone NOT NULL,
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_by uuid
);

GRANT SELECT ON public.section_schedule TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.section_schedule TO authenticated;
GRANT ALL ON public.section_schedule TO service_role;

ALTER TABLE public.section_schedule ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Calendario de abertura e publico"
ON public.section_schedule FOR SELECT TO anon, authenticated
USING (true);

CREATE POLICY "Formadores inserem no calendario"
ON public.section_schedule FOR INSERT TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'formador'::app_role));

CREATE POLICY "Formadores atualizam o calendario"
ON public.section_schedule FOR UPDATE TO authenticated
USING (public.has_role(auth.uid(), 'formador'::app_role))
WITH CHECK (public.has_role(auth.uid(), 'formador'::app_role));

CREATE POLICY "Formadores apagam do calendario"
ON public.section_schedule FOR DELETE TO authenticated
USING (public.has_role(auth.uid(), 'formador'::app_role));

CREATE TRIGGER set_section_schedule_updated_at
BEFORE UPDATE ON public.section_schedule
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- 2) Calendário inicial (datas de abertura às 19h00 Europe/Lisbon)
INSERT INTO public.section_schedule (section_id, module_key, opens_at) VALUES
  -- MF1
  ('abertura',     'mf1', '2026-10-13 19:00' AT TIME ZONE 'Europe/Lisbon'),
  ('bloco-1',      'mf1', '2026-10-13 19:00' AT TIME ZONE 'Europe/Lisbon'),
  ('bloco-2',      'mf1', '2026-10-13 19:00' AT TIME ZONE 'Europe/Lisbon'),
  ('atividade-c',  'mf1', '2026-10-14 19:00' AT TIME ZONE 'Europe/Lisbon'),
  ('atividade-d',  'mf1', '2026-10-14 19:00' AT TIME ZONE 'Europe/Lisbon'),
  ('bloco-3',      'mf1', '2026-10-15 19:00' AT TIME ZONE 'Europe/Lisbon'),
  ('bloco-4',      'mf1', '2026-10-15 19:00' AT TIME ZONE 'Europe/Lisbon'),
  ('bloco-5',      'mf1', '2026-10-16 19:00' AT TIME ZONE 'Europe/Lisbon'),
  ('atividade-a',  'mf1', '2026-10-16 19:00' AT TIME ZONE 'Europe/Lisbon'),
  ('atividade-b',  'mf1', '2026-10-16 19:00' AT TIME ZONE 'Europe/Lisbon'),
  ('atividade-e',  'mf1', '2026-10-16 19:00' AT TIME ZONE 'Europe/Lisbon'),
  ('sintese',      'mf1', '2026-10-16 19:00' AT TIME ZONE 'Europe/Lisbon'),
  -- MF2
  ('mf2-abertura',    'mf2', '2026-10-20 19:00' AT TIME ZONE 'Europe/Lisbon'),
  ('mf2-bloco-1',     'mf2', '2026-10-20 19:00' AT TIME ZONE 'Europe/Lisbon'),
  ('mf2-bloco-2',     'mf2', '2026-10-20 19:00' AT TIME ZONE 'Europe/Lisbon'),
  ('mf2-atividade-1', 'mf2', '2026-10-21 19:00' AT TIME ZONE 'Europe/Lisbon'),
  ('mf2-atividade-5', 'mf2', '2026-10-21 19:00' AT TIME ZONE 'Europe/Lisbon'),
  ('mf2-bloco-3',     'mf2', '2026-10-22 19:00' AT TIME ZONE 'Europe/Lisbon'),
  ('mf2-atividade-2', 'mf2', '2026-10-22 19:00' AT TIME ZONE 'Europe/Lisbon'),
  ('mf2-bloco-4',     'mf2', '2026-10-23 19:00' AT TIME ZONE 'Europe/Lisbon'),
  ('mf2-atividade-3', 'mf2', '2026-10-23 19:00' AT TIME ZONE 'Europe/Lisbon'),
  ('mf2-atividade-4', 'mf2', '2026-10-23 19:00' AT TIME ZONE 'Europe/Lisbon'),
  ('mf2-sintese',     'mf2', '2026-10-23 19:00' AT TIME ZONE 'Europe/Lisbon'),
  -- MF3 (depois da mudança de hora de 25/10: 19h00 Lisboa = 19h00 UTC)
  ('mf3-abertura',    'mf3', '2026-10-27 19:00' AT TIME ZONE 'Europe/Lisbon'),
  ('mf3-bloco-1',     'mf3', '2026-10-27 19:00' AT TIME ZONE 'Europe/Lisbon'),
  ('mf3-bloco-2',     'mf3', '2026-10-27 19:00' AT TIME ZONE 'Europe/Lisbon'),
  ('mf3-atividade-1', 'mf3', '2026-10-27 19:00' AT TIME ZONE 'Europe/Lisbon'),
  ('mf3-atividade-2', 'mf3', '2026-10-28 19:00' AT TIME ZONE 'Europe/Lisbon'),
  ('mf3-bloco-3',     'mf3', '2026-10-29 19:00' AT TIME ZONE 'Europe/Lisbon'),
  ('mf3-bloco-4',     'mf3', '2026-10-29 19:00' AT TIME ZONE 'Europe/Lisbon'),
  ('mf3-atividade-3', 'mf3', '2026-10-29 19:00' AT TIME ZONE 'Europe/Lisbon'),
  ('mf3-bloco-5',     'mf3', '2026-10-30 19:00' AT TIME ZONE 'Europe/Lisbon'),
  ('mf3-atividade-4', 'mf3', '2026-10-30 19:00' AT TIME ZONE 'Europe/Lisbon'),
  ('mf3-atividade-5', 'mf3', '2026-10-30 19:00' AT TIME ZONE 'Europe/Lisbon'),
  ('mf3-sintese',     'mf3', '2026-10-30 19:00' AT TIME ZONE 'Europe/Lisbon');

-- 3) Mapeamento de qualquer id (paragem, quiz, atividade) para a subsecção do calendário.
--    Devolve NULL quando não há mapeamento seguro → o item fica permitido.
--    Nota: 'abertura', 'aprendizagem-ativa', 'mf2-atividades' e 'mf3-atividades' não são
--    mapeados de propósito — as páginas de índice ficam sempre acessíveis com o módulo aberto.
CREATE OR REPLACE FUNCTION public.section_of(_id text)
RETURNS text
LANGUAGE sql
IMMUTABLE
SET search_path = public
AS $$
  SELECT CASE
    WHEN _id LIKE 'mf2-bloco-%'     THEN substring(_id from '^(mf2-bloco-[0-9]+)')
    WHEN _id LIKE 'mf2-atividade-%' THEN substring(_id from '^(mf2-atividade-[0-9]+)')
    WHEN _id LIKE 'mf2-sintese%'    THEN 'mf2-sintese'
    WHEN _id LIKE 'mf3-bloco-%'     THEN substring(_id from '^(mf3-bloco-[0-9]+)')
    WHEN _id LIKE 'mf3-atividade-%' THEN substring(_id from '^(mf3-atividade-[0-9]+)')
    WHEN _id LIKE 'mf3-sintese%'    THEN 'mf3-sintese'
    WHEN _id LIKE 'bloco-%'         THEN substring(_id from '^(bloco-[0-9]+)')
    WHEN _id LIKE 'atividade-%'     THEN substring(_id from '^(atividade-[a-e])')
    WHEN _id LIKE 'final-%'         THEN 'sintese'
    WHEN _id = 'sintese'            THEN 'sintese'
    ELSE NULL
  END
$$;

-- 4) Regra de escrita: módulo aberto E (sem linha no calendário OU já passou a data).
CREATE OR REPLACE FUNCTION public.can_write_module(_id text)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY INVOKER
SET search_path = public
AS $$
  SELECT public.has_role(auth.uid(), 'formador'::app_role)
    OR (
      COALESCE(
        (SELECT ms.is_open FROM public.module_status ms
          WHERE ms.module_key = public.module_key_of(_id)),
        true)
      AND COALESCE(
        (SELECT ss.opens_at <= now() FROM public.section_schedule ss
          WHERE ss.section_id = public.section_of(_id)),
        true)
    )
$$;