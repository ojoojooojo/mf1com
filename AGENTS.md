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

- Os requisitos de conclusão de secções do MF2/MF3 estão duplicados de propósito em `src/lib/section-requirements.ts` (interface) e na função SQL `public.section_requirements()` (validação no servidor, trigger `progress_enforce_completion` em `progress`). Ao acrescentar/alterar quizzes ou campos de texto numa secção do MF2/MF3, atualizar os dois no mesmo commit.
