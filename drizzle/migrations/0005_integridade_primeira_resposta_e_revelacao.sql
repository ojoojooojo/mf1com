-- 1) quiz_answers: registo da primeira resposta e contagem de tentativas
ALTER TABLE public.quiz_answers
  ADD COLUMN first_option text,
  ADD COLUMN first_is_correct boolean,
  ADD COLUMN first_answered_at timestamp with time zone,
  ADD COLUMN attempts integer NOT NULL DEFAULT 1,
  ADD COLUMN first_is_legacy boolean NOT NULL DEFAULT false;

-- Backfill ANTES dos triggers: registos anteriores à correção não permitem
-- saber qual foi a primeira resposta — assume-se a atual e marca-se como legado.
UPDATE public.quiz_answers
SET first_option = selected_option,
    first_is_correct = is_correct,
    first_answered_at = answered_at,
    attempts = 1,
    first_is_legacy = true;

CREATE OR REPLACE FUNCTION public.quiz_answers_before_insert()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  -- A primeira resposta é sempre a do insert; valores do cliente são ignorados.
  NEW.first_option := NEW.selected_option;
  NEW.first_is_correct := NEW.is_correct;
  NEW.first_answered_at := now();
  NEW.attempts := 1;
  NEW.first_is_legacy := false;
  RETURN NEW;
END
$$;

CREATE TRIGGER quiz_answers_before_insert
BEFORE INSERT ON public.quiz_answers
FOR EACH ROW EXECUTE FUNCTION public.quiz_answers_before_insert();

CREATE OR REPLACE FUNCTION public.quiz_answers_before_update()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  -- A primeira resposta nunca muda num update.
  NEW.first_option := OLD.first_option;
  NEW.first_is_correct := OLD.first_is_correct;
  NEW.first_answered_at := OLD.first_answered_at;
  NEW.first_is_legacy := OLD.first_is_legacy;
  IF NEW.selected_option IS DISTINCT FROM OLD.selected_option THEN
    NEW.attempts := OLD.attempts + 1;
  ELSE
    NEW.attempts := OLD.attempts;
  END IF;
  RETURN NEW;
END
$$;

CREATE TRIGGER quiz_answers_before_update
BEFORE UPDATE ON public.quiz_answers
FOR EACH ROW EXECUTE FUNCTION public.quiz_answers_before_update();

-- 2) written_responses: fotografia do texto no momento em que o comentário é revelado
ALTER TABLE public.written_responses
  ADD COLUMN revealed_text text,
  ADD COLUMN revealed_at timestamp with time zone;

CREATE OR REPLACE FUNCTION public.written_responses_before_update()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  -- Uma vez registada, a fotografia da revelação não pode ser alterada.
  IF OLD.revealed_at IS NOT NULL THEN
    NEW.revealed_text := OLD.revealed_text;
    NEW.revealed_at := OLD.revealed_at;
  END IF;
  RETURN NEW;
END
$$;

CREATE TRIGGER written_responses_before_update
BEFORE UPDATE ON public.written_responses
FOR EACH ROW EXECUTE FUNCTION public.written_responses_before_update();

-- 3) RPC de fotografia: SECURITY INVOKER — aplica as políticas RLS normais
-- (só a própria conta, e apenas em módulos abertos via can_write_module).
CREATE OR REPLACE FUNCTION public.snapshot_reveal(p_prefix text)
RETURNS integer
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public
AS $$
DECLARE
  n integer;
BEGIN
  UPDATE public.written_responses
  SET revealed_text = response_text,
      revealed_at = now()
  WHERE user_id = auth.uid()
    AND activity_id LIKE p_prefix || '%'
    AND revealed_at IS NULL;
  GET DIAGNOSTICS n = ROW_COUNT;
  RETURN n;
END
$$;

GRANT EXECUTE ON FUNCTION public.snapshot_reveal(text) TO authenticated;

-- 4) Participantes deixam de poder apagar os seus registos; só formadores.
DROP POLICY "Users delete own progress" ON public.progress;
DROP POLICY "Users delete own quiz answers" ON public.quiz_answers;
DROP POLICY "Users delete own written responses" ON public.written_responses;

CREATE POLICY "Formadores podem apagar progresso"
ON public.progress FOR DELETE TO authenticated
USING (public.has_role(auth.uid(), 'formador'::app_role));

CREATE POLICY "Formadores podem apagar respostas de quizzes"
ON public.quiz_answers FOR DELETE TO authenticated
USING (public.has_role(auth.uid(), 'formador'::app_role));

CREATE POLICY "Formadores podem apagar produções escritas"
ON public.written_responses FOR DELETE TO authenticated
USING (public.has_role(auth.uid(), 'formador'::app_role));