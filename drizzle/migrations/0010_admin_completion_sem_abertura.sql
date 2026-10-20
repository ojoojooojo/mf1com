CREATE OR REPLACE FUNCTION public.set_admin_section_completion(p_user_id uuid, p_section_id text, p_complete boolean)
RETURNS void LANGUAGE plpgsql SECURITY INVOKER SET search_path = public AS $$
BEGIN
  IF NOT public.has_role(auth.uid(), 'formador') THEN
    RAISE EXCEPTION 'Apenas formadores podem administrar conclusões.' USING ERRCODE = '42501';
  END IF;
  IF p_section_id NOT IN (
    'bloco-1','bloco-2','bloco-3','bloco-4','bloco-5','aprendizagem-ativa','atividade-a','atividade-b','atividade-c','atividade-d','atividade-e','sintese',
    'mf2-bloco-1','mf2-bloco-2','mf2-bloco-3','mf2-bloco-4','mf2-atividades','mf2-atividade-1','mf2-atividade-2','mf2-atividade-3','mf2-atividade-4','mf2-atividade-5','mf2-sintese',
    'mf3-bloco-1','mf3-bloco-2','mf3-bloco-3','mf3-bloco-4','mf3-bloco-5','mf3-atividades','mf3-atividade-1','mf3-atividade-2','mf3-atividade-3','mf3-atividade-4','mf3-atividade-5','mf3-sintese'
  ) OR p_section_id IS NULL OR p_complete IS NULL THEN
    RAISE EXCEPTION 'Secção inválida.' USING ERRCODE = '22023';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM public.profiles WHERE id = p_user_id AND NOT public.has_role(id, 'formador')) THEN
    RAISE EXCEPTION 'Participante inválido.' USING ERRCODE = '22023';
  END IF;
  IF p_complete THEN
    INSERT INTO public.progress (user_id, section_id, status, completed_by_admin)
      VALUES (p_user_id, p_section_id, 'concluido', true)
      ON CONFLICT (user_id, section_id) DO UPDATE
      SET status = 'concluido', completed_by_admin = true
      WHERE progress.status <> 'concluido';
  ELSE
    UPDATE public.progress SET status = 'iniciado', completed_by_admin = false,
      admin_completed_at = NULL, admin_completed_by = NULL
      WHERE user_id = p_user_id AND section_id = p_section_id AND completed_by_admin;
  END IF;
END;
$$;
REVOKE ALL ON FUNCTION public.set_admin_section_completion(uuid, text, boolean) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.set_admin_section_completion(uuid, text, boolean) TO authenticated;