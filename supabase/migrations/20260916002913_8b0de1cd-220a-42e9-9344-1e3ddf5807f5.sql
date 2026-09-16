CREATE TABLE public.course_evaluations (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  perfil text,
  escala_objetivos smallint NOT NULL CHECK (escala_objetivos BETWEEN 1 AND 5),
  escala_conteudos smallint NOT NULL CHECK (escala_conteudos BETWEEN 1 AND 5),
  escala_metodologia smallint NOT NULL CHECK (escala_metodologia BETWEEN 1 AND 5),
  escala_sincronas smallint NOT NULL CHECK (escala_sincronas BETWEEN 1 AND 5),
  escala_formador smallint NOT NULL CHECK (escala_formador BETWEEN 1 AND 5),
  escala_organizacao smallint NOT NULL CHECK (escala_organizacao BETWEEN 1 AND 5),
  escala_materiais smallint NOT NULL CHECK (escala_materiais BETWEEN 1 AND 5),
  recomendacao smallint NOT NULL CHECK (recomendacao BETWEEN 0 AND 10),
  satisfacao_global smallint NOT NULL CHECK (satisfacao_global BETWEEN 1 AND 5),
  pontos_fortes text NOT NULL DEFAULT '',
  pontos_melhorar text NOT NULL DEFAULT '',
  sugestoes text NOT NULL DEFAULT '',
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

GRANT SELECT ON public.course_evaluations TO authenticated;
GRANT ALL ON public.course_evaluations TO service_role;
ALTER TABLE public.course_evaluations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Formadores leem as avaliacoes anonimas"
  ON public.course_evaluations FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'formador'));

CREATE TABLE public.evaluation_submissions (
  user_id uuid NOT NULL PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  submitted_at timestamp with time zone NOT NULL DEFAULT now()
);

GRANT SELECT ON public.evaluation_submissions TO authenticated;
GRANT ALL ON public.evaluation_submissions TO service_role;
ALTER TABLE public.evaluation_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Cada conta ve apenas o seu proprio registo"
  ON public.evaluation_submissions FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.has_completed_mf3(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.progress
    WHERE user_id = _user_id
      AND section_id = 'mf3-sintese'
      AND status = 'concluido'
  )
$$;

CREATE OR REPLACE FUNCTION public.submit_course_evaluation(
  _perfil text,
  _escala_objetivos smallint,
  _escala_conteudos smallint,
  _escala_metodologia smallint,
  _escala_sincronas smallint,
  _escala_formador smallint,
  _escala_organizacao smallint,
  _escala_materiais smallint,
  _recomendacao smallint,
  _satisfacao_global smallint,
  _pontos_fortes text,
  _pontos_melhorar text,
  _sugestoes text
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  uid uuid := auth.uid();
BEGIN
  IF uid IS NULL THEN
    RAISE EXCEPTION 'SEM_SESSAO';
  END IF;

  IF public.has_role(uid, 'formador') THEN
    RAISE EXCEPTION 'SO_FORMANDOS';
  END IF;

  IF EXISTS (SELECT 1 FROM public.evaluation_submissions WHERE user_id = uid) THEN
    RAISE EXCEPTION 'JA_RESPONDEU';
  END IF;

  IF NOT public.has_completed_mf3(uid) THEN
    RAISE EXCEPTION 'MF3_INCOMPLETO';
  END IF;

  INSERT INTO public.evaluation_submissions (user_id) VALUES (uid);

  INSERT INTO public.course_evaluations (
    perfil, escala_objetivos, escala_conteudos, escala_metodologia, escala_sincronas,
    escala_formador, escala_organizacao, escala_materiais, recomendacao,
    satisfacao_global, pontos_fortes, pontos_melhorar, sugestoes
  ) VALUES (
    NULLIF(btrim(COALESCE(_perfil, '')), ''),
    _escala_objetivos, _escala_conteudos, _escala_metodologia, _escala_sincronas,
    _escala_formador, _escala_organizacao, _escala_materiais, _recomendacao,
    _satisfacao_global,
    COALESCE(_pontos_fortes, ''), COALESCE(_pontos_melhorar, ''), COALESCE(_sugestoes, '')
  );
END;
$$;

GRANT EXECUTE ON FUNCTION public.submit_course_evaluation(text, smallint, smallint, smallint, smallint, smallint, smallint, smallint, smallint, smallint, text, text, text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.has_completed_mf3(uuid) TO authenticated;