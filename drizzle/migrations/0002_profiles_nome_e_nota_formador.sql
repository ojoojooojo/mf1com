ALTER TABLE public.profiles ADD COLUMN nome_proprio text;
ALTER TABLE public.profiles ADD COLUMN apelido text;
ALTER TABLE public.profiles ADD COLUMN nota_formador text;

CREATE OR REPLACE FUNCTION public.role_of(_user_id uuid)
RETURNS public.app_role
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT role FROM public.profiles WHERE id = _user_id
$$;

CREATE POLICY "Formadores podem editar notas dos participantes"
ON public.profiles
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'formador'::app_role))
WITH CHECK (role = public.role_of(id));