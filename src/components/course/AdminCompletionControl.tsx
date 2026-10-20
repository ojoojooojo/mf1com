import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ShieldCheck, Undo2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { contentCounts, type AdminProgress } from "@/lib/admin-completion";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader,
  AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel,
} from "@/components/ui/alert-dialog";

export function AdminCompletionControl({ userId, sectionId, label, progress }: {
  userId: string; sectionId: string; label: string;
  progress: (AdminProgress & { status: string }) | undefined;
}) {
  const [open, setOpen] = useState(false);
  const undo = progress?.completed_by_admin === true;
  const queryClient = useQueryClient();
  const counts = useQuery({
    queryKey: ["admin-completion-content", userId, sectionId],
    enabled: open && !undo,
    staleTime: 0,
    queryFn: async () => {
      const [quiz, text] = await Promise.all([
        supabase.from("quiz_answers").select("quiz_id").eq("user_id", userId),
        supabase.from("written_responses").select("activity_id, response_text").eq("user_id", userId),
      ]);
      if (quiz.error) throw quiz.error;
      if (text.error) throw text.error;
      return contentCounts(sectionId, quiz.data ?? [], text.data ?? []);
    },
  });
  const save = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.rpc("set_admin_section_completion", {
        p_user_id: userId, p_section_id: sectionId, p_complete: !undo,
      });
      if (error) throw error;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["formador", "dados"] });
      setOpen(false);
    },
  });
  if (progress?.status === "concluido" && !undo) return null;
  return (
    <AlertDialog open={open} onOpenChange={(value) => { if (!save.isPending) { setOpen(value); save.reset(); } }}>
      <AlertDialogTrigger asChild>
        <Button variant="outline" size="sm" className="h-auto min-h-8 whitespace-normal text-left"
          aria-label={`${undo ? "Anular conclusão administrativa" : "Concluir (administração)"} — ${label}`}>
          {undo ? <Undo2 /> : <ShieldCheck />}
          {undo ? "Anular conclusão administrativa" : "Concluir (administração)"}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-h-[90dvh] overflow-y-auto">
        <AlertDialogHeader>
          <AlertDialogTitle>{undo ? "Anular conclusão administrativa?" : "Concluir pela administração?"}</AlertDialogTitle>
          <AlertDialogDescription>{label}. {undo ? "A secção volta a «Iniciado» e a identificação administrativa é removida. As respostas mantêm-se." : "A conclusão fica identificada com o formador e a data, mesmo que falte conteúdo."}</AlertDialogDescription>
        </AlertDialogHeader>
        {!undo && (counts.isFetching ? <p className="text-sm text-muted-foreground">A verificar respostas registadas…</p> : counts.isError ?
          <p role="alert" className="text-sm text-destructive">Não foi possível verificar as respostas. Feche e tente novamente.</p> : counts.data ? <div className="space-y-2 text-sm">
            <p>Perguntas respondidas: {counts.data.quizAnswered}{counts.data.quizTotal === null ? " registadas" : ` de ${counts.data.quizTotal}`}.</p>
            <p>Respostas escritas: {counts.data.textAnswered}{counts.data.textTotal === null ? " registadas (não vazias)" : ` de ${counts.data.textTotal}`}.</p>
            {counts.data.missing && <p role="alert" className="text-accent">Falta conteúdo por responder. Pode concluir administrativamente na mesma.</p>}
          </div> : null)}
        {save.isError && <p role="alert" className="text-sm text-destructive">Não foi possível guardar a alteração. Tente novamente.</p>}
        <AlertDialogFooter>
          <AlertDialogCancel disabled={save.isPending}>Cancelar</AlertDialogCancel>
          <Button disabled={save.isPending || (!undo && (counts.isFetching || !counts.data || counts.isError))}
            onClick={() => save.mutate()}>{save.isPending ? "A guardar…" : undo ? "Confirmar anulação" : "Confirmar conclusão"}</Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}