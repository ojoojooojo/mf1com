export type StopKind = "abertura" | "bloco" | "atividades" | "sintese";

export type Stop = {
  id: string;
  kind: StopKind;
  shortTitle: string;
  title: string;
  subtitle: string;
  minutes: number;
  to: string;
  params?: Record<string, string>;
};

export const MODULE_TITLE = "Comunicação e Escuta Ativa na Formação";
export const MODULE_CODE = "MF1";
export const COURSE_TITLE = "Gestão de Conflitos na Formação";

export const LEARNING_OBJECTIVES = [
  "Compreender o conceito e a importância da comunicação em diversos contextos sociais e profissionais.",
  "Desenvolver competências práticas de comunicação, incluindo expressão verbal e não verbal, escuta ativa e feedback construtivo.",
  "Desenvolver competências de comunicação assertiva, capacitando os participantes a expressarem os seus pensamentos, sentimentos e necessidades de forma clara e respeitosa.",
  "Identificar e superar as barreiras comuns à comunicação, tais como preconceitos e má interpretação de mensagens, através do desenvolvimento de habilidades de escuta ativa e consciência emocional.",
];

export type Block = {
  id: string;
  number: number;
  shortTitle: string;
  title: string;
  subtitle: string;
  minutes: number;
  focus: string[];
};

export const BLOCKS: Block[] = [
  {
    id: "1",
    number: 1,
    shortTitle: "Definição e Funções",
    title: "Definição e Funções da Comunicação",
    subtitle:
      "O que é, afinal, comunicar — e que funções cumpre a comunicação numa sala de formação.",
    minutes: 65,
    focus: [
      "Conceito de comunicação",
      "Funções da comunicação",
      "Comunicação em contexto formativo",
    ],
  },
  {
    id: "2",
    number: 2,
    shortTitle: "Componentes e Processo",
    title: "Componentes Psicológicos e Elementos do Processo de Comunicação",
    subtitle:
      "Emissor, mensagem, canal, recetor, ruído, feedback — e o que se passa por dentro de cada pessoa.",
    minutes: 75,
    focus: [
      "Elementos do processo comunicacional",
      "Componentes psicológicos",
      "Verbal, paraverbal e não verbal",
    ],
  },
  {
    id: "3",
    number: 3,
    shortTitle: "Comunicação Assertiva",
    title: "Comunicação Assertiva",
    subtitle:
      "Dizer o que precisa de ser dito, com clareza e respeito, sem agressividade nem fuga.",
    minutes: 75,
    focus: ["Estilos de comunicação", "Técnicas assertivas", "Feedback construtivo"],
  },
  {
    id: "4",
    number: 4,
    shortTitle: "Barreiras",
    title: "Barreiras à Comunicação",
    subtitle:
      "Preconceitos, filtros, ruído e má interpretação: onde a mensagem se perde e como recuperá-la.",
    minutes: 65,
    focus: ["Tipos de barreiras", "Preconceitos e juízos", "Estratégias de superação"],
  },
  {
    id: "5",
    number: 5,
    shortTitle: "Escuta Ativa e Empatia",
    title: "Escuta Ativa e Empatia",
    subtitle:
      "A competência que desarma conflitos: escutar para compreender antes de responder.",
    minutes: 80,
    focus: ["Níveis de escuta", "Técnicas de escuta ativa", "Empatia e consciência emocional"],
  },
];

export type Activity = {
  id: string;
  letter: string;
  title: string;
  kind: string;
  description: string;
  minutes: number;
};

export const ACTIVITIES: Activity[] = [
  {
    id: "a",
    letter: "A",
    title: "Análise de situação: a primeira sessão de um formador novo",
    kind: "Análise de caso",
    description:
      "Analisar um cenário simulado de sala de formação em quatro partes — elementos do processo, barreiras, sinais não-verbais e primeira ação — e comparar com uma análise de referência comentada.",
    minutes: 25,
  },
  {
    id: "b",
    letter: "B",
    title: "Transformação de mensagens",
    kind: "Reescrita assertiva",
    description:
      "Reescrever três frases agressivas ou passivas com a técnica D.E.E. e comparar cada versão com uma reformulação de referência anotada.",
    minutes: 25,
  },
  {
    id: "c",
    letter: "C",
    title: "Escolha e justificação",
    kind: "Decisão fundamentada",
    description:
      "Escolher e justificar uma resposta a um formando que desafia publicamente a competência do formador — e ler o comentário pedagógico às quatro opções.",
    minutes: 20,
  },
  {
    id: "d",
    letter: "D",
    title: "Observação de comunicação verbal e não verbal",
    kind: "Observação guiada",
    description:
      "Ler um diálogo anotado com tom, postura, olhar e distância, assinalar os momentos de incongruência entre verbal e não-verbal e registar o que observou.",
    minutes: 25,
  },
  {
    id: "e",
    letter: "E",
    title: "Reflexão aplicada à prática",
    kind: "Escrita reflexiva",
    description:
      "Reflexão privada sobre uma situação de tensão já vivida: que conteúdo do módulo teria feito diferença e como o aplicaria da próxima vez.",
    minutes: 15,
  },
];

export const STOPS: Stop[] = [
  {
    id: "abertura",
    kind: "abertura",
    shortTitle: "Abertura",
    title: "Abertura do módulo",
    subtitle: "Enquadramento, objetivos e percurso.",
    minutes: 15,
    to: "/",
  },
  ...BLOCKS.map<Stop>((b) => ({
    id: `bloco-${b.id}`,
    kind: "bloco" as const,
    shortTitle: `Bloco ${b.number} · ${b.shortTitle}`,
    title: b.title,
    subtitle: b.subtitle,
    minutes: b.minutes,
    to: "/blocos/$blocoId",
    params: { blocoId: b.id },
  })),
  {
    id: "aprendizagem-ativa",
    kind: "atividades",
    shortTitle: "Aprendizagem Ativa",
    title: "Aprendizagem Ativa",
    subtitle: "5 atividades práticas de aplicação (~2h).",
    minutes: 120,
    to: "/atividades",
  },
  {
    id: "sintese",
    kind: "sintese",
    shortTitle: "Síntese Final",
    title: "Síntese Final",
    subtitle: "Recapitulação, autoavaliação e encerramento.",
    minutes: 25,
    to: "/sintese",
  },
];

export const getBlock = (id: string) => BLOCKS.find((b) => b.id === id);
export const getActivity = (id: string) => ACTIVITIES.find((a) => a.id === id);

/** Identificadores estáveis de todos os micro-quizzes dos blocos de conteúdo (1 a 5). */
export const BLOCK_QUIZ_IDS = [
  "bloco-1-quiz-fatica",
  "bloco-1-quiz-assoc-1",
  "bloco-1-quiz-assoc-2",
  "bloco-1-quiz-assoc-3",
  "bloco-1-quiz-assoc-4",
  "bloco-2-quiz-filtro-1",
  "bloco-2-quiz-filtro-2",
  "bloco-2-quiz-filtro-3",
  "bloco-2-quiz-filtro-4",
  "bloco-3-quiz-reformulacao",
  "bloco-4-quiz-1",
  "bloco-4-quiz-2",
  "bloco-4-quiz-3",
  "bloco-4-quiz-4",
  "bloco-5-quiz-cenario",
  "bloco-5-quiz-class-1",
  "bloco-5-quiz-class-2",
  "bloco-5-quiz-class-3",
  "bloco-5-quiz-class-4",
] as const;
