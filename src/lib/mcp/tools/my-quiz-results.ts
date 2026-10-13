import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { moduleOfId, notAuthenticated, supabaseForUser } from "../supabase";

export default defineTool({
  name: "my_quiz_results",
  title: "As minhas respostas aos quizzes",
  description:
    "Devolve as respostas aos quizzes do participante autenticado, com o total de respostas certas À PRIMEIRA por módulo (a primeira resposta é a que conta para a avaliação).",
  inputSchema: {
    module_key: z.enum(["mf1", "mf2", "mf3"]).optional().describe("Filtrar por módulo."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ module_key }, ctx) => {
    if (!ctx.isAuthenticated()) return notAuthenticated();
    const supabase = supabaseForUser(ctx);
    const { data, error } = await supabase
      .from("quiz_answers")
      .select(
        "quiz_id, selected_option, is_correct, first_option, first_is_correct, first_answered_at, attempts, first_is_legacy, updated_at",
      )
      .eq("user_id", ctx.getUserId());
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    const rows = (data ?? []).filter(
      (r) => !module_key || moduleOfId(String(r.quiz_id)) === module_key,
    );
    // Conta a primeira resposta; em registos anteriores à correção usa o valor atual.
    const correct = rows.filter((r) => r.first_is_correct ?? r.is_correct).length;
    const legacy = rows.filter((r) => r.first_is_legacy).length;
    return {
      content: [
        {
          type: "text",
          text: `Respostas registadas: ${rows.length} — certas à primeira: ${correct}${legacy ? ` (${legacy} registo(s) anterior(es) à correção de integridade)` : ""}.`,
        },
      ],
      structuredContent: { total: rows.length, correct, legacy, rows },
    };
  },
});
