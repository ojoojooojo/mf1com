CREATE OR REPLACE FUNCTION public.can_write_module(_id text)
RETURNS boolean LANGUAGE sql STABLE SECURITY INVOKER SET search_path = public AS $$
  SELECT public.has_role(auth.uid(), 'formador')
    OR COALESCE(
      (SELECT ms.is_open FROM public.module_status ms
        WHERE ms.module_key = public.module_key_of(_id)),
      true)
$$;

REVOKE EXECUTE ON FUNCTION public.can_write_module(text) FROM anon;
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, app_role) FROM anon;