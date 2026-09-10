-- 1. Tabela de estado dos módulos
CREATE TABLE public.module_status (
  module_key text PRIMARY KEY CHECK (module_key IN ('mf1','mf2','mf3')),
  is_open boolean NOT NULL DEFAULT true,
  updated_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.module_status TO anon;
GRANT SELECT, INSERT, UPDATE ON public.module_status TO authenticated;
GRANT ALL ON public.module_status TO service_role;

ALTER TABLE public.module_status ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Module status is publicly readable"
  ON public.module_status FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Formadores can open or close modules"
  ON public.module_status FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'formador'))
  WITH CHECK (public.has_role(auth.uid(), 'formador'));

CREATE POLICY "Formadores can create module status rows"
  ON public.module_status FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'formador'));

CREATE TRIGGER module_status_updated_at
  BEFORE UPDATE ON public.module_status
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

INSERT INTO public.module_status (module_key, is_open) VALUES
  ('mf1', true), ('mf2', true), ('mf3', true);

-- 2. Funções auxiliares
CREATE OR REPLACE FUNCTION public.module_key_of(_id text)
RETURNS text LANGUAGE sql IMMUTABLE SET search_path = public AS $$
  SELECT CASE
    WHEN _id LIKE 'mf2-%' THEN 'mf2'
    WHEN _id LIKE 'mf3-%' THEN 'mf3'
    ELSE 'mf1'
  END
$$;

CREATE OR REPLACE FUNCTION public.can_write_module(_id text)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT public.has_role(auth.uid(), 'formador')
    OR COALESCE(
      (SELECT ms.is_open FROM public.module_status ms
        WHERE ms.module_key = public.module_key_of(_id)),
      true)
$$;

-- 3. Substituir as políticas FOR ALL por políticas separadas.
--    SELECT mantém-se exatamente com a mesma condição de antes.
DROP POLICY "Users manage own progress" ON public.progress;
CREATE POLICY "Users read own progress" ON public.progress FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users insert own progress in open modules" ON public.progress FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id AND public.can_write_module(section_id));
CREATE POLICY "Users update own progress in open modules" ON public.progress FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id AND public.can_write_module(section_id));
CREATE POLICY "Users delete own progress" ON public.progress FOR DELETE TO authenticated USING (auth.uid() = user_id);

DROP POLICY "Users manage own quiz answers" ON public.quiz_answers;
CREATE POLICY "Users read own quiz answers" ON public.quiz_answers FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users insert own quiz answers in open modules" ON public.quiz_answers FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id AND public.can_write_module(quiz_id));
CREATE POLICY "Users update own quiz answers in open modules" ON public.quiz_answers FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id AND public.can_write_module(quiz_id));
CREATE POLICY "Users delete own quiz answers" ON public.quiz_answers FOR DELETE TO authenticated USING (auth.uid() = user_id);

DROP POLICY "Users manage own written responses" ON public.written_responses;
CREATE POLICY "Users read own written responses" ON public.written_responses FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users insert own written responses in open modules" ON public.written_responses FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id AND public.can_write_module(activity_id));
CREATE POLICY "Users update own written responses in open modules" ON public.written_responses FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id AND public.can_write_module(activity_id));
CREATE POLICY "Users delete own written responses" ON public.written_responses FOR DELETE TO authenticated USING (auth.uid() = user_id);