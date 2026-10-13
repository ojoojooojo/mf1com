CREATE OR REPLACE FUNCTION public.nota_formador_of(_user_id uuid)
RETURNS text
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT nota_formador FROM public.profiles WHERE id = _user_id
$$;

DROP POLICY "Users can update own profile without role change" ON public.profiles;

CREATE POLICY "Users can update own profile without role change"
ON public.profiles
FOR UPDATE
TO authenticated
USING (auth.uid() = id)
WITH CHECK (
  role = public.role_of(id)
  AND nota_formador IS NOT DISTINCT FROM public.nota_formador_of(id)
);