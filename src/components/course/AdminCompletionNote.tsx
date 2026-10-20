import { useProgress } from "@/lib/progress";

export function AdminCompletionNote({ sectionId }: { sectionId: string }) {
  const { hydrated, isCompleted, isAdminCompleted } = useProgress();
  if (!hydrated || !isCompleted(sectionId) || !isAdminCompleted(sectionId)) return null;
  return <p className="text-xs text-muted-foreground">Concluído pela administração por conclusão do conteúdo</p>;
}