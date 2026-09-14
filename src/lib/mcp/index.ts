import { auth, defineMcp } from "@lovable.dev/mcp-js";
import listModules from "./tools/list-modules";
import setModuleOpen from "./tools/set-module-open";
import myProgress from "./tools/my-progress";
import myQuizResults from "./tools/my-quiz-results";
import myWrittenResponses from "./tools/my-written-responses";

const projectRef = import.meta.env['VITE_SUPABASE_PROJECT_ID'] ?? "project-ref-unset";

export default defineMcp({
  name: "gest-o-de-conflitos-na-forma-o",
  title: "Gestão de Conflitos na Formação",
  version: "0.1.0",
  instructions:
    "Ferramentas do MOOC de Formação Pedagógica Contínua de Formadores (MF1, MF2, MF3). Use `list_modules` para ver que módulos estão abertos, `my_progress`, `my_quiz_results` e `my_written_responses` para consultar o percurso do utilizador autenticado, e `set_module_open` (só formadores) para abrir ou fechar um módulo.",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [listModules, myProgress, myQuizResults, myWrittenResponses, setModuleOpen],
});
