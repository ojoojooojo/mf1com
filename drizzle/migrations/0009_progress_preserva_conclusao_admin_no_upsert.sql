CREATE OR REPLACE FUNCTION public.progress_enforce_completion()
RETURNS trigger LANGUAGE plpgsql AS $$
DECLARE missing_count integer;
BEGIN
  IF NEW.status <> 'concluido' THEN RETURN NEW; END IF;
  IF public.has_role(auth.uid(), 'formador') THEN RETURN NEW; END IF;
  -- An upsert executes BEFORE INSERT before resolving the existing row.
  -- Only an already administratively completed row owned by this caller is exempt.
  IF auth.uid() = NEW.user_id AND EXISTS (
    SELECT 1 FROM public.progress p WHERE p.user_id = NEW.user_id
      AND p.section_id = NEW.section_id AND p.status = 'concluido' AND p.completed_by_admin
  ) THEN RETURN NEW; END IF;
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