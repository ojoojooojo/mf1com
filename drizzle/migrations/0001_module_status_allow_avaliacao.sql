ALTER TABLE public.module_status DROP CONSTRAINT IF EXISTS module_status_module_key_check;
ALTER TABLE public.module_status ADD CONSTRAINT module_status_module_key_check
  CHECK (module_key IN ('mf1','mf2','mf3','avaliacao'));