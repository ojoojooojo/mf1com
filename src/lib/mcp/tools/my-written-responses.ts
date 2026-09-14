import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { moduleOfId, notAuthenticated, supabaseForUser } from "../supabase";

export default defineTool({
  name: "my_written_responses",
  title: "As minhas produções escritas",
  description:
    "Devolve as respostas escritas do participante autenticado às atividades e reflexões, por módulo.",
  inputSchema: {
    module_key: z.enum(["mf1", "mf2", "mf3"]).optional().describe("Filtrar por módulo."),
    activity_id: z.string().trim().min(1).optional().describe("Filtrar por um id de atividade."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ module_key, activity_id }, ctx) => {
    if (!ctx.isAuthenticated()) return notAuthenticated();
    const supabase = supabaseForUser(ctx);
    let query = supabase
      .from("written_responses")
      .select("activity_id, response_text, updated_at")
      .eq("user_id", ctx.getUserId());
    if (activity_id) query = query.eq("activity_id", activity_id);
    const { data, error } = await query;
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    const rows = (data ?? []).filter(
      (r) => !module_key || moduleOfId(String(r.activity_id)) === module_key,
    );
    const text = rows.length
      ? rows.map((r) => `# ${r.activity_id}\n${r.response_text}`).join("\n\n")
      : "Sem produções escritas registadas para este filtro.";
    return { content: [{ type: "text", text }], structuredContent: { total: rows.length, rows } };
  },
});
