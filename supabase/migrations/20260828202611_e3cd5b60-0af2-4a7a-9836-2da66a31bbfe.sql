-- Papéis
CREATE TYPE public.app_role AS ENUM ('formando', 'formador');

-- Helper de timestamps
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- PROFILES
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY,
  email TEXT NOT NULL,
  role public.app_role NOT NULL DEFAULT 'formando',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Função security definer para evitar recursão nas políticas
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = _user_id AND role = _role
  )
$$;

CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Formadores can view all profiles"
  ON public.profiles FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'formador'));

CREATE POLICY "Users can create own profile"
  ON public.profiles FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = id AND role = 'formando');

CREATE POLICY "Users can update own profile without role change"
  ON public.profiles FOR UPDATE TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id AND role = (SELECT p.role FROM public.profiles p WHERE p.id = auth.uid()));

CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- PROGRESS
CREATE TABLE public.progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  section_id TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'iniciado' CHECK (status IN ('iniciado', 'concluido')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, section_id)
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.progress TO authenticated;
GRANT ALL ON public.progress TO service_role;

ALTER TABLE public.progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own progress"
  ON public.progress FOR ALL TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Formadores can view all progress"
  ON public.progress FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'formador'));

CREATE TRIGGER progress_updated_at
  BEFORE UPDATE ON public.progress
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- QUIZ ANSWERS
CREATE TABLE public.quiz_answers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  quiz_id TEXT NOT NULL,
  selected_option TEXT NOT NULL,
  is_correct BOOLEAN NOT NULL DEFAULT false,
  answered_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, quiz_id)
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.quiz_answers TO authenticated;
GRANT ALL ON public.quiz_answers TO service_role;

ALTER TABLE public.quiz_answers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own quiz answers"
  ON public.quiz_answers FOR ALL TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Formadores can view all quiz answers"
  ON public.quiz_answers FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'formador'));

CREATE TRIGGER quiz_answers_updated_at
  BEFORE UPDATE ON public.quiz_answers
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- WRITTEN RESPONSES
CREATE TABLE public.written_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  activity_id TEXT NOT NULL,
  response_text TEXT NOT NULL DEFAULT '',
  submitted_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, activity_id)
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.written_responses TO authenticated;
GRANT ALL ON public.written_responses TO service_role;

ALTER TABLE public.written_responses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own written responses"
  ON public.written_responses FOR ALL TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Formadores can view all written responses"
  ON public.written_responses FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'formador'));

CREATE TRIGGER written_responses_updated_at
  BEFORE UPDATE ON public.written_responses
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE INDEX idx_progress_user ON public.progress(user_id);
CREATE INDEX idx_quiz_answers_user ON public.quiz_answers(user_id);
CREATE INDEX idx_written_responses_user ON public.written_responses(user_id);