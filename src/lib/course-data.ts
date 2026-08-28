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
    title: "Análise de situação",
    kind: "Análise de caso",
    description:
      "Ler um episódio real de sala de formação e identificar os elementos do processo comunicacional, as barreiras presentes e os pontos de rutura.",
    minutes: 25,
  },
  {
    id: "b",
    letter: "B",
    title: "Transformação de mensagens",
    kind: "Reescrita assertiva",
    description:
      "Reescrever mensagens agressivas ou passivas em formulações assertivas, mantendo o conteúdo e mudando o efeito relacional.",
    minutes: 25,
  },
  {
    id: "c",
    letter: "C",
    title: "Escolha e justificação",
    kind: "Decisão fundamentada",
    description:
      "Escolher a resposta mais adequada em situações ambíguas de formação e justificar a escolha com base nos conceitos do módulo.",
    minutes: 20,
  },
  {
    id: "d",
    letter: "D",
    title: "Observação de comunicação verbal e não verbal",
    kind: "Observação guiada",
    description:
      "Observar uma interação (gravada ou real) com uma grelha de observação e registar sinais verbais, paraverbais e não verbais.",
    minutes: 25,
  },
  {
    id: "e",
    letter: "E",
    title: "Reflexão aplicada à prática",
    kind: "Escrita reflexiva",
    description:
      "Escrever um plano pessoal de melhoria: o que vai mudar na sua próxima sessão de formação, com base no que aprendeu.",
    minutes: 25,
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
