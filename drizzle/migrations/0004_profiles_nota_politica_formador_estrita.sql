DROP POLICY "Formadores podem editar notas dos participantes" ON public.profiles;

CREATE POLICY "Formadores podem editar notas dos participantes"
ON public.profiles
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'formador'::app_role))
WITH CHECK (
  public.has_role(auth.uid(), 'formador'::app_role)
  AND role = public.role_of(id)
);