import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { notAuthenticated, supabaseForUser } from "../supabase";

export default defineTool({
  name: "set_module_open",
  title: "Abrir ou fechar um módulo",
  description:
    "Abre ou fecha um módulo (mf1, mf2 ou mf3) aos participantes. Apenas formadores têm permissão.",
  inputSchema: {
    module_key: z.enum(["mf1", "mf2", "mf3"]).describe("Módulo a alterar."),
    is_open: z.boolean().describe("true abre o módulo, false fecha-o."),
  },
  annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: true, openWorldHint: false },
  handler: async ({ module_key, is_open }, ctx) => {
    if (!ctx.isAuthenticated()) return notAuthenticated();
    const supabase = supabaseForUser(ctx);
    const { data, error } = await supabase
      .from("module_status")
      .update({ is_open, updated_by: ctx.getUserId() })
      .eq("module_key", module_key)
      .select("module_key, is_open, updated_at");
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    if (!data || data.length === 0) {
      return {
        content: [
          {
            type: "text",
            text: "Sem permissão para alterar o estado dos módulos (apenas formadores).",
          },
        ],
        isError: true,
      };
    }
    return {
      content: [
        { type: "text", text: `${module_key.toUpperCase()} ficou ${is_open ? "ABERTO" : "FECHADO"}.` },
      ],
      structuredContent: { module: data[0] },
    };
  },
});
