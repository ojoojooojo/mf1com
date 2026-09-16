REVOKE ALL ON FUNCTION public.has_completed_mf3(uuid) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.submit_course_evaluation(text, smallint, smallint, smallint, smallint, smallint, smallint, smallint, smallint, smallint, text, text, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_completed_mf3(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.submit_course_evaluation(text, smallint, smallint, smallint, smallint, smallint, smallint, smallint, smallint, smallint, text, text, text) TO authenticated;