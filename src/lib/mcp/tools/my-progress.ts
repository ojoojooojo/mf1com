import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { moduleOfId, notAuthenticated, supabaseForUser } from "../supabase";

export default defineTool({
  name: "my_progress",
  title: "O meu progresso",
  description:
    "Devolve as secções concluídas pelo participante autenticado, por módulo (mf1, mf2, mf3).",
  inputSchema: {
    module_key: z.enum(["mf1", "mf2", "mf3"]).optional().describe("Filtrar por módulo."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ module_key }, ctx) => {
    if (!ctx.isAuthenticated()) return notAuthenticated();
    const supabase = supabaseForUser(ctx);
    const { data, error } = await supabase
      .from("progress")
      .select("section_id, status, updated_at")
      .eq("user_id", ctx.getUserId());
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    const rows = (data ?? []).filter(
      (r) => !module_key || moduleOfId(String(r.section_id)) === module_key,
    );
    const byModule = { mf1: 0, mf2: 0, mf3: 0 } as Record<"mf1" | "mf2" | "mf3", number>;
    for (const r of rows) byModule[moduleOfId(String(r.section_id))] += 1;
    const text = `Secções registadas: ${rows.length} (MF1: ${byModule.mf1}, MF2: ${byModule.mf2}, MF3: ${byModule.mf3})`;
    return { content: [{ type: "text", text }], structuredContent: { total: rows.length, byModule, rows } };
  },
});
