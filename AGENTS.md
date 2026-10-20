<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Regras do projeto

- Administrative completion uses an authenticated SECURITY INVOKER RPC, trainer-scoped progress policies and a metadata-protection trigger; timestamps and actor IDs are assigned in PostgreSQL so browser inputs cannot forge the audit trail. Learners preserve administrative completion until a trainer explicitly revokes it.
- Administrative content counts use the existing MF2/MF3 requirement registry and registered MF1 response IDs; this inspection does not introduce new learner requirements or change progress denominators.

- Os requisitos de conclusão de secções do MF2/MF3 estão duplicados de propósito em `src/lib/section-requirements.ts` (interface) e na função SQL `public.section_requirements()` (validação no servidor, trigger `progress_enforce_completion` em `progress`). Ao acrescentar/alterar quizzes ou campos de texto numa secção do MF2/MF3, atualizar os dois no mesmo commit.
