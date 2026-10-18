-- Requisitos de conclusão por secção (só MF2/MF3): espelha src/lib/section-requirements.ts.
-- Manter os dois em sincronia (ver AGENTS.md).
create or replace function public.section_requirements(_section_id text)
returns table(kind text, item_id text)
language sql
immutable
as $$
  select v.kind, v.item_id
  from (values
    ('quiz','mf2-bloco-1-quiz-tipos-nivel','mf2-bloco-1'),
    ('quiz','mf2-bloco-1-quiz-tipos-conteudo','mf2-bloco-1'),
    ('quiz','mf2-bloco-1-quiz-funcional','mf2-bloco-1'),
    ('quiz','mf2-bloco-2-quiz-abordagem','mf2-bloco-2'),
    ('quiz','mf2-bloco-2-quiz-escalada','mf2-bloco-2'),
    ('quiz','mf2-bloco-2-quiz-cooperativo','mf2-bloco-2'),
    ('texto','mf2-bloco-2-reflexao','mf2-bloco-2'),
    ('quiz','mf2-bloco-3-quiz-causas','mf2-bloco-3'),
    ('quiz','mf2-bloco-3-quiz-custos','mf2-bloco-3'),
    ('quiz','mf2-bloco-3-quiz-consequencias','mf2-bloco-3'),
    ('texto','mf2-bloco-3-reflexao','mf2-bloco-3'),
    ('quiz','mf2-bloco-4-quiz-percecao','mf2-bloco-4'),
    ('quiz','mf2-bloco-4-quiz-papel','mf2-bloco-4'),
    ('texto','mf2-bloco-4-reflexao','mf2-bloco-4'),
    ('texto','mf2-atividade-1-fase','mf2-atividade-1'),
    ('texto','mf2-atividade-1-nivel','mf2-atividade-1'),
    ('texto','mf2-atividade-1-nivel-just','mf2-atividade-1'),
    ('texto','mf2-atividade-1-conteudo','mf2-atividade-1'),
    ('texto','mf2-atividade-1-sinais','mf2-atividade-1'),
    ('texto','mf2-atividade-2-causas','mf2-atividade-2'),
    ('texto','mf2-atividade-2-detonador','mf2-atividade-2'),
    ('texto','mf2-atividade-2-contextuais','mf2-atividade-2'),
    ('texto','mf2-atividade-2-previsao','mf2-atividade-2'),
    ('texto','mf2-atividade-3-funcional','mf2-atividade-3'),
    ('texto','mf2-atividade-3-disfuncional','mf2-atividade-3'),
    ('texto','mf2-atividade-3-classificacao','mf2-atividade-3'),
    ('texto','mf2-atividade-3-classificacao-just','mf2-atividade-3'),
    ('texto','mf2-atividade-3-aprendizagem','mf2-atividade-3'),
    ('texto','mf2-atividade-4-origem','mf2-atividade-4'),
    ('texto','mf2-atividade-4-manutencao','mf2-atividade-4'),
    ('texto','mf2-atividade-4-percecao','mf2-atividade-4'),
    ('texto','mf2-atividade-4-prevencao','mf2-atividade-4'),
    ('texto','mf2-atividade-5-sinais','mf2-atividade-5'),
    ('texto','mf2-atividade-5-medidas','mf2-atividade-5'),
    ('texto','mf2-atividade-5-aplicacao','mf2-atividade-5'),
    ('texto','mf2-atividade-5-abordagem','mf2-atividade-5'),
    ('quiz','mf2-sintese-quiz-1','mf2-sintese'),
    ('quiz','mf2-sintese-quiz-2','mf2-sintese'),
    ('quiz','mf2-sintese-quiz-3','mf2-sintese'),
    ('quiz','mf2-sintese-quiz-4','mf2-sintese'),
    ('texto','mf2-sintese-compromisso','mf2-sintese'),
    ('quiz','mf3-bloco-1-quiz-conceito','mf3-bloco-1'),
    ('quiz','mf3-bloco-1-quiz-dimensao','mf3-bloco-1'),
    ('quiz','mf3-bloco-1-quiz-autorregulacao','mf3-bloco-1'),
    ('texto','mf3-bloco-1-reflexao-gatilho','mf3-bloco-1'),
    ('quiz','mf3-bloco-2-quiz-tipos-empatia','mf3-bloco-2'),
    ('quiz','mf3-bloco-2-quiz-competencia-social','mf3-bloco-2'),
    ('quiz','mf3-bloco-2-quiz-cenario','mf3-bloco-2'),
    ('texto','mf3-bloco-2-reflexao','mf3-bloco-2'),
    ('quiz','mf3-bloco-3-quiz-identificar-estilo','mf3-bloco-3'),
    ('quiz','mf3-bloco-3-quiz-quando-usar','mf3-bloco-3'),
    ('quiz','mf3-bloco-3-quiz-prevencao','mf3-bloco-3'),
    ('texto','mf3-bloco-3-reflexao','mf3-bloco-3'),
    ('quiz','mf3-bloco-4-quiz-avaliacao-primaria','mf3-bloco-4'),
    ('quiz','mf3-bloco-4-quiz-avaliacao-secundaria','mf3-bloco-4'),
    ('quiz','mf3-bloco-4-quiz-distorcao','mf3-bloco-4'),
    ('texto','mf3-bloco-4-reflexao','mf3-bloco-4'),
    ('quiz','mf3-bloco-5-quiz-quadrante','mf3-bloco-5'),
    ('quiz','mf3-bloco-5-quiz-diagnostico','mf3-bloco-5'),
    ('quiz','mf3-bloco-5-quiz-aplicacao','mf3-bloco-5'),
    ('texto','mf3-bloco-5-reflexao','mf3-bloco-5'),
    ('texto','mf3-atividade-1-autoconsciencia','mf3-atividade-1'),
    ('texto','mf3-atividade-1-autorregulacao','mf3-atividade-1'),
    ('texto','mf3-atividade-1-motivacao','mf3-atividade-1'),
    ('texto','mf3-atividade-1-empatia','mf3-atividade-1'),
    ('texto','mf3-atividade-1-competencias-sociais','mf3-atividade-1'),
    ('texto','mf3-atividade-1-compromisso','mf3-atividade-1'),
    ('texto','mf3-atividade-2-estilo-1','mf3-atividade-2'),
    ('texto','mf3-atividade-2-estilo-2','mf3-atividade-2'),
    ('texto','mf3-atividade-2-comparacao','mf3-atividade-2'),
    ('texto','mf3-atividade-3-sinais-fisiologicos','mf3-atividade-3'),
    ('texto','mf3-atividade-3-sinais-cognitivos','mf3-atividade-3'),
    ('texto','mf3-atividade-3-sinais-comportamentais','mf3-atividade-3'),
    ('texto','mf3-atividade-3-decisao','mf3-atividade-3'),
    ('texto','mf3-atividade-3-decisao-real','mf3-atividade-3'),
    ('texto','mf3-atividade-4-caso','mf3-atividade-4'),
    ('texto','mf3-atividade-4-problema','mf3-atividade-4'),
    ('texto','mf3-atividade-4-pessoas','mf3-atividade-4'),
    ('texto','mf3-atividade-4-processo','mf3-atividade-4'),
    ('texto','mf3-atividade-4-contexto','mf3-atividade-4'),
    ('texto','mf3-atividade-5-contexto','mf3-atividade-5'),
    ('texto','mf3-atividade-5-categorias','mf3-atividade-5'),
    ('texto','mf3-atividade-5-estrategia-1','mf3-atividade-5'),
    ('texto','mf3-atividade-5-estrategia-2','mf3-atividade-5'),
    ('quiz','mf3-sintese-quiz-1','mf3-sintese'),
    ('quiz','mf3-sintese-quiz-2','mf3-sintese'),
    ('quiz','mf3-sintese-quiz-3','mf3-sintese'),
    ('quiz','mf3-sintese-quiz-4','mf3-sintese'),
    ('texto','mf3-sintese-compromisso','mf3-sintese'),
    ('texto','mf3-sintese-percurso','mf3-sintese')
  ) as v(kind, item_id, section_id)
  where v.section_id = _section_id
$$;

-- Recusa gravar progress com status 'concluido' em secções do MF2/MF3 enquanto
-- faltar alguma resposta (quiz registado ou texto não vazio). Formador isento.
create or replace function public.progress_enforce_completion()
returns trigger
language plpgsql
as $$
declare
  missing_count integer;
begin
  if new.status <> 'concluido' then
    return new;
  end if;
  if not exists (select 1 from public.section_requirements(new.section_id)) then
    return new;
  end if;
  if public.has_role(auth.uid(), 'formador') then
    return new;
  end if;

  select count(*) into missing_count
  from public.section_requirements(new.section_id) req
  where case req.kind
    when 'quiz' then not exists (
      select 1 from public.quiz_answers qa
      where qa.user_id = new.user_id and qa.quiz_id = req.item_id
    )
    else not exists (
      select 1 from public.written_responses wr
      where wr.user_id = new.user_id and wr.activity_id = req.item_id
        and btrim(wr.response_text) <> ''
    )
  end;

  if missing_count > 0 then
    raise exception 'A secção ainda tem % pergunta(s) por responder.', missing_count
      using errcode = 'check_violation';
  end if;
  return new;
end;
$$;

drop trigger if exists progress_enforce_completion on public.progress;
create trigger progress_enforce_completion
before insert or update on public.progress
for each row execute function public.progress_enforce_completion();