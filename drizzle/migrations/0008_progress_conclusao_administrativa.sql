ALTER TABLE public.progress
  ADD COLUMN completed_by_admin boolean NOT NULL DEFAULT false,
  ADD COLUMN admin_completed_at timestamptz,
  ADD COLUMN admin_completed_by uuid;

CREATE POLICY "Formadores registam progresso administrativo" ON public.progress
FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'formador'));
CREATE POLICY "Formadores atualizam progresso administrativo" ON public.progress
FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'formador'))
WITH CHECK (public.has_role(auth.uid(), 'formador'));

CREATE OR REPLACE FUNCTION public.progress_guard_admin_completion()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN
  IF public.has_role(auth.uid(), 'formador') THEN
    IF NEW.completed_by_admin THEN
      NEW.status := 'concluido';
      IF TG_OP = 'INSERT' THEN
        NEW.admin_completed_at := now();
        NEW.admin_completed_by := auth.uid();
      ELSIF NOT OLD.completed_by_admin THEN
        NEW.admin_completed_at := now();
        NEW.admin_completed_by := auth.uid();
      ELSE
        NEW.admin_completed_at := OLD.admin_completed_at;
        NEW.admin_completed_by := OLD.admin_completed_by;
      END IF;
    ELSE
      NEW.admin_completed_at := NULL;
      NEW.admin_completed_by := NULL;
    END IF;
    RETURN NEW;
  END IF;
  IF TG_OP = 'INSERT' THEN
    IF NEW.completed_by_admin OR NEW.admin_completed_at IS NOT NULL OR NEW.admin_completed_by IS NOT NULL THEN
      RAISE EXCEPTION 'Apenas formadores podem registar uma conclusão administrativa.' USING ERRCODE = '42501';
    END IF;
  ELSE
    IF NEW.completed_by_admin IS DISTINCT FROM OLD.completed_by_admin
       OR NEW.admin_completed_at IS DISTINCT FROM OLD.admin_completed_at
       OR NEW.admin_completed_by IS DISTINCT FROM OLD.admin_completed_by
       OR NEW.user_id IS DISTINCT FROM OLD.user_id
       OR NEW.section_id IS DISTINCT FROM OLD.section_id THEN
      RAISE EXCEPTION 'Não pode alterar a identificação da conclusão administrativa.' USING ERRCODE = '42501';
    END IF;
    IF OLD.completed_by_admin THEN NEW.status := 'concluido'; END IF;
  END IF;
  RETURN NEW;
END;
$$;
CREATE TRIGGER a_progress_guard_admin_completion BEFORE INSERT OR UPDATE ON public.progress
FOR EACH ROW EXECUTE FUNCTION public.progress_guard_admin_completion();

CREATE OR REPLACE FUNCTION public.progress_enforce_completion()
RETURNS trigger LANGUAGE plpgsql AS $$
DECLARE missing_count integer;
BEGIN
  IF NEW.status <> 'concluido' THEN RETURN NEW; END IF;
  IF public.has_role(auth.uid(), 'formador') THEN RETURN NEW; END IF;
  IF TG_OP = 'UPDATE' THEN
    IF OLD.completed_by_admin AND OLD.status = 'concluido' THEN RETURN NEW; END IF;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM public.section_requirements(NEW.section_id)) THEN RETURN NEW; END IF;
  SELECT count(*) INTO missing_count FROM public.section_requirements(NEW.section_id) req
  WHERE CASE req.kind
    WHEN 'quiz' THEN NOT EXISTS (SELECT 1 FROM public.quiz_answers qa WHERE qa.user_id = NEW.user_id AND qa.quiz_id = req.item_id)
    ELSE NOT EXISTS (SELECT 1 FROM public.written_responses wr WHERE wr.user_id = NEW.user_id AND wr.activity_id = req.item_id AND btrim(wr.response_text) <> '')
  END;
  IF missing_count > 0 THEN
    RAISE EXCEPTION 'A secção ainda tem % pergunta(s) por responder.', missing_count USING ERRCODE = 'check_violation';
  END IF;
  RETURN NEW;
END;
$$;

CREATE FUNCTION public.set_admin_section_completion(p_user_id uuid, p_section_id text, p_complete boolean)
RETURNS void LANGUAGE plpgsql SECURITY INVOKER SET search_path = public AS $$
BEGIN
  IF NOT public.has_role(auth.uid(), 'formador') THEN
    RAISE EXCEPTION 'Apenas formadores podem administrar conclusões.' USING ERRCODE = '42501';
  END IF;
  IF p_section_id NOT IN (
    'abertura','bloco-1','bloco-2','bloco-3','bloco-4','bloco-5','aprendizagem-ativa','atividade-a','atividade-b','atividade-c','atividade-d','atividade-e','sintese',
    'mf2-abertura','mf2-bloco-1','mf2-bloco-2','mf2-bloco-3','mf2-bloco-4','mf2-atividades','mf2-atividade-1','mf2-atividade-2','mf2-atividade-3','mf2-atividade-4','mf2-atividade-5','mf2-sintese',
    'mf3-abertura','mf3-bloco-1','mf3-bloco-2','mf3-bloco-3','mf3-bloco-4','mf3-bloco-5','mf3-atividades','mf3-atividade-1','mf3-atividade-2','mf3-atividade-3','mf3-atividade-4','mf3-atividade-5','mf3-sintese'
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
