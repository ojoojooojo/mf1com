import type { ProgressState } from "./progress";

export type SectionRequirement = {
  id: string;
  kind: "quiz" | "texto";
  label: string;
};

const quiz = (id: string, label: string): SectionRequirement => ({ id, kind: "quiz", label });
const texto = (id: string, label: string): SectionRequirement => ({ id, kind: "texto", label });

/**
 * Requisitos para um formando marcar uma secção como concluída — só MF2/MF3.
 * O MF1 e as secções sem perguntas (abertura, índices) ficam de fora de propósito.
 * ATENÇÃO: manter em sincronia com a função SQL public.section_requirements(),
 * que impõe a mesma regra no servidor (ver AGENTS.md).
 */
export const SECTION_REQUIREMENTS: Record<string, SectionRequirement[]> = {
  "mf2-bloco-1": [
    quiz("mf2-bloco-1-quiz-tipos-nivel", "Quiz 1"),
    quiz("mf2-bloco-1-quiz-tipos-conteudo", "Quiz 2"),
    quiz("mf2-bloco-1-quiz-funcional", "Quiz 3"),
  ],
  "mf2-bloco-2": [
    quiz("mf2-bloco-2-quiz-abordagem", "Quiz 1"),
    quiz("mf2-bloco-2-quiz-escalada", "Quiz 2"),
    quiz("mf2-bloco-2-quiz-cooperativo", "Quiz 3"),
    texto("mf2-bloco-2-reflexao", "Reflexão"),
  ],
  "mf2-bloco-3": [
    quiz("mf2-bloco-3-quiz-causas", "Quiz 1"),
    quiz("mf2-bloco-3-quiz-custos", "Quiz 2"),
    quiz("mf2-bloco-3-quiz-consequencias", "Quiz 3"),
    texto("mf2-bloco-3-reflexao", "Reflexão"),
  ],
  "mf2-bloco-4": [
    quiz("mf2-bloco-4-quiz-percecao", "Quiz 1"),
    quiz("mf2-bloco-4-quiz-papel", "Quiz 2"),
    texto("mf2-bloco-4-reflexao", "Reflexão"),
  ],
  "mf2-atividade-1": [
    texto("mf2-atividade-1-fase", "Pergunta 1 — fase do conflito"),
    texto("mf2-atividade-1-nivel", "Pergunta 2 — nível de conflito"),
    texto("mf2-atividade-1-nivel-just", "Justificação da escolha"),
    texto("mf2-atividade-1-conteudo", "Pergunta 3 — tipo de conflito"),
    texto("mf2-atividade-1-sinais", "Pergunta 4 — sinal de transição"),
  ],
  "mf2-atividade-2": [
    texto("mf2-atividade-2-causas", "Pergunta 1 — causas de fundo"),
    texto("mf2-atividade-2-detonador", "Pergunta 2 — detonador"),
    texto("mf2-atividade-2-contextuais", "Pergunta 3 — fatores contextuais"),
    texto("mf2-atividade-2-previsao", "Pergunta 4 — previsão"),
  ],
  "mf2-atividade-3": [
    texto("mf2-atividade-3-funcional", "Pergunta 1 — consequências funcionais"),
    texto("mf2-atividade-3-disfuncional", "Pergunta 2 — consequências disfuncionais"),
    texto("mf2-atividade-3-classificacao", "Pergunta 3 — classificação do desfecho"),
    texto("mf2-atividade-3-classificacao-just", "Justificação da classificação"),
    texto("mf2-atividade-3-aprendizagem", "Pergunta 4 — impacto na aprendizagem"),
  ],
  "mf2-atividade-4": [
    texto("mf2-atividade-4-origem", "Pergunta 1 — origem da tensão"),
    texto("mf2-atividade-4-manutencao", "Pergunta 2 — manutenção da tensão"),
    texto("mf2-atividade-4-percecao", "Pergunta 3 — mecanismo de perceção"),
    texto("mf2-atividade-4-prevencao", "Pergunta 4 — papel do terceiro formando"),
  ],
  "mf2-atividade-5": [
    texto("mf2-atividade-5-sinais", "Pergunta 1 — sinais precoces"),
    texto("mf2-atividade-5-medidas", "Pergunta 2 — medidas preventivas"),
    texto("mf2-atividade-5-aplicacao", "Pergunta 3 — aplicação das medidas"),
    texto("mf2-atividade-5-abordagem", "Pergunta 4 — abordagem fundamental"),
  ],
  "mf2-sintese": [
    quiz("mf2-sintese-quiz-1", "Quiz 1"),
    quiz("mf2-sintese-quiz-2", "Quiz 2"),
    quiz("mf2-sintese-quiz-3", "Quiz 3"),
    quiz("mf2-sintese-quiz-4", "Quiz 4"),
    texto("mf2-sintese-compromisso", "Compromisso para a próxima sessão"),
  ],
  "mf3-bloco-1": [
    quiz("mf3-bloco-1-quiz-conceito", "Quiz 1"),
    quiz("mf3-bloco-1-quiz-dimensao", "Quiz 2"),
    quiz("mf3-bloco-1-quiz-autorregulacao", "Quiz 3"),
    texto("mf3-bloco-1-reflexao-gatilho", "Reflexão"),
  ],
  "mf3-bloco-2": [
    quiz("mf3-bloco-2-quiz-tipos-empatia", "Quiz 1"),
    quiz("mf3-bloco-2-quiz-competencia-social", "Quiz 2"),
    quiz("mf3-bloco-2-quiz-cenario", "Quiz 3"),
    texto("mf3-bloco-2-reflexao", "Reflexão"),
  ],
  "mf3-bloco-3": [
    quiz("mf3-bloco-3-quiz-identificar-estilo", "Quiz 1"),
    quiz("mf3-bloco-3-quiz-quando-usar", "Quiz 2"),
    quiz("mf3-bloco-3-quiz-prevencao", "Quiz 3"),
    texto("mf3-bloco-3-reflexao", "Reflexão"),
  ],
  "mf3-bloco-4": [
    quiz("mf3-bloco-4-quiz-avaliacao-primaria", "Quiz 1"),
    quiz("mf3-bloco-4-quiz-avaliacao-secundaria", "Quiz 2"),
    quiz("mf3-bloco-4-quiz-distorcao", "Quiz 3"),
    texto("mf3-bloco-4-reflexao", "Reflexão"),
  ],
  "mf3-bloco-5": [
    quiz("mf3-bloco-5-quiz-quadrante", "Quiz 1"),
    quiz("mf3-bloco-5-quiz-diagnostico", "Quiz 2"),
    quiz("mf3-bloco-5-quiz-aplicacao", "Quiz 3"),
    texto("mf3-bloco-5-reflexao", "Reflexão"),
  ],
  "mf3-atividade-1": [
    texto("mf3-atividade-1-autoconsciencia", "Dimensão 1 — autoconsciência"),
    texto("mf3-atividade-1-autorregulacao", "Dimensão 2 — autorregulação"),
    texto("mf3-atividade-1-motivacao", "Dimensão 3 — motivação"),
    texto("mf3-atividade-1-empatia", "Dimensão 4 — empatia"),
    texto("mf3-atividade-1-competencias-sociais", "Dimensão 5 — competências sociais"),
    texto("mf3-atividade-1-compromisso", "Compromisso de desenvolvimento"),
  ],
  "mf3-atividade-2": [
    texto("mf3-atividade-2-estilo-1", "Escolha de estratégia — primeira situação"),
    texto("mf3-atividade-2-estilo-2", "Escolha de estratégia — variante"),
    texto("mf3-atividade-2-comparacao", "Comparação das duas situações"),
  ],
  "mf3-atividade-3": [
    texto("mf3-atividade-3-sinais-fisiologicos", "Sinais fisiológicos"),
    texto("mf3-atividade-3-sinais-cognitivos", "Sinais cognitivos"),
    texto("mf3-atividade-3-sinais-comportamentais", "Sinais comportamentais"),
    texto("mf3-atividade-3-decisao", "Decisão — os próximos cinco segundos"),
    texto("mf3-atividade-3-decisao-real", "Situação real da sua prática"),
  ],
  "mf3-atividade-4": [
    texto("mf3-atividade-4-caso", "Escolha do conflito a mapear"),
    texto("mf3-atividade-4-problema", "Quadrante 1 — Problema"),
    texto("mf3-atividade-4-pessoas", "Quadrante 2 — Pessoas"),
    texto("mf3-atividade-4-processo", "Quadrante 3 — Processo"),
    texto("mf3-atividade-4-contexto", "Quadrante 4 — Contexto"),
  ],
  "mf3-atividade-5": [
    texto("mf3-atividade-5-contexto", "Contexto de atividade formativa"),
    texto("mf3-atividade-5-categorias", "Categorias de estratégias"),
    texto("mf3-atividade-5-estrategia-1", "Estratégia 1"),
    texto("mf3-atividade-5-estrategia-2", "Estratégia 2"),
  ],
  "mf3-sintese": [
    quiz("mf3-sintese-quiz-1", "Quiz 1"),
    quiz("mf3-sintese-quiz-2", "Quiz 2"),
    quiz("mf3-sintese-quiz-3", "Quiz 3"),
    quiz("mf3-sintese-quiz-4", "Quiz 4"),
    texto("mf3-sintese-compromisso", "Compromisso — ferramenta a usar"),
    texto("mf3-sintese-percurso", "Reflexão final — o que mudou"),
  ],
};

/** O que falta responder numa secção; lista vazia = pode concluir (ou secção sem requisitos). */
export function missingRequirements(
  sectionId: string,
  state: ProgressState,
): SectionRequirement[] {
  const reqs = SECTION_REQUIREMENTS[sectionId];
  if (!reqs) return [];
  return reqs.filter((r) =>
    r.kind === "quiz"
      ? typeof state.quiz[r.id] !== "number"
      : (state.answers[r.id] ?? "").trim() === "",
  );
}
