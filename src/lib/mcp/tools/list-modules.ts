import { defineTool } from "@lovable.dev/mcp-js";
import { notAuthenticated, supabaseForUser } from "../supabase";

export default defineTool({
  name: "list_modules",
  title: "Listar módulos e estado",
  description:
    "Lista os três módulos da formação (MF1, MF2, MF3) e indica se cada um está aberto ou fechado aos participantes.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async (_input, ctx) => {
    if (!ctx.isAuthenticated()) return notAuthenticated();
    const supabase = supabaseForUser(ctx);
    const { data, error } = await supabase
      .from("module_status")
      .select("module_key, is_open, updated_at")
      .order("module_key");
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    const rows = data ?? [];
    const text = rows
      .map((r) => `${String(r.module_key).toUpperCase()}: ${r.is_open ? "ABERTO" : "FECHADO"}`)
      .join("\n");
    return {
      content: [{ type: "text", text: text || "Sem registos de estado." }],
      structuredContent: { modules: rows },
    };
  },
});
