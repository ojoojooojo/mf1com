-- Interruptor manual da Avaliação da Formação: reutiliza public.module_status
CREATE OR REPLACE FUNCTION public.evaluation_is_open()
RETURNS boolean
LANGUAGE sql
STABLE
SET search_path = public
AS $$
  SELECT COALESCE(
    (SELECT ms.is_open FROM public.module_status ms WHERE ms.module_key = 'avaliacao'),
    true)
$$;

CREATE OR REPLACE FUNCTION public.submit_course_evaluation(_perfil text, _escala_objetivos smallint, _escala_conteudos smallint, _escala_metodologia smallint, _escala_sincronas smallint, _escala_formador smallint, _escala_organizacao smallint, _escala_materiais smallint, _recomendacao smallint, _satisfacao_global smallint, _pontos_fortes text, _pontos_melhorar text, _sugestoes text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
DECLARE
  uid uuid := auth.uid();
BEGIN
  IF uid IS NULL THEN
    RAISE EXCEPTION 'SEM_SESSAO';
  END IF;

  IF public.has_role(uid, 'formador') THEN
    RAISE EXCEPTION 'SO_FORMANDOS';
  END IF;

  IF NOT public.evaluation_is_open() THEN
    RAISE EXCEPTION 'AVALIACAO_FECHADA';
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
$function$;

REVOKE ALL ON FUNCTION public.evaluation_is_open() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.evaluation_is_open() TO authenticated, anon, service_role;