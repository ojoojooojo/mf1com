import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

/**
 * Elimina por completo a conta de um participante e todos os dados associados
 * (progresso, respostas a quizzes, produções escritas, perfil e o registo de
 * controlo «já respondeu» da avaliação). Nunca toca nas respostas anónimas da
 * avaliação da formação — essa tabela não tem qualquer ligação a contas.
 * Apenas formadores.
 */
export const deleteParticipant = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { userId: string }) => {
    if (
      !input ||
      typeof input.userId !== "string" ||
      !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(input.userId)
    ) {
      throw new Error("Identificador de participante inválido.");
    }
    return input;
  })
  .handler(async ({ data, context }) => {
    const { data: isFormador } = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "formador",
    });
    if (!isFormador) throw new Error("Apenas formadores podem remover participantes.");
    if (data.userId === context.userId) {
      throw new Error("Não pode remover a sua própria conta de formador.");
    }

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    // Estas tabelas guardam o user_id sem chave externa — removem-se explicitamente.
    for (const table of ["progress", "quiz_answers", "written_responses"] as const) {
      const { error } = await supabaseAdmin.from(table).delete().eq("user_id", data.userId);
      if (error) throw new Error(`Falha ao remover dados (${table}): ${error.message}`);
    }

    // Apagar o utilizador faz cascata para profiles e evaluation_submissions
    // (chaves externas com ON DELETE CASCADE).
    const { error } = await supabaseAdmin.auth.admin.deleteUser(data.userId);
    if (error) throw new Error(`Falha ao remover a conta: ${error.message}`);
    return { ok: true };
  });
