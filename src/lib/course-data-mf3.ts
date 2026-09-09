import type { Activity, Block, Stop } from "./course-data";

export const MF3_MODULE_TITLE = "Estratégias de Resolução de Conflitos na Formação";
export const MF3_MODULE_CODE = "MF3";

/** Citação literal do referencial oficial do IEFP — não parafrasear. */
export const MF3_LEARNING_OBJECTIVES = [
  "Capacitar os participantes para melhorar o autoconhecimento e competências de autorregulação, fortalecendo a gestão emocional e comportamental.",
  "Estimular o desenvolvimento da empatia e habilidades sociais, promovendo a compreensão emocional e perspetiva dos outros, para além de cultivar competências em comunicação e colaboração.",
  "Capacitar os participantes na gestão eficaz de conflitos, para prevenir e resolver disputas de forma construtiva.",
  "Explorar como o stress influencia a dinâmica de conflito, aplicando métodos para gestão de stress, visando uma resolução equilibrada e eficaz dos conflitos.",
  "Capacitar os participantes no uso eficaz da Roda de Mapeamento do Conflito como ferramenta para identificar, analisar e resolver conflitos de forma estruturada e colaborativa.",
];

export const MF3_BLOCKS: Block[] = [
  {
    id: "1",
    number: 1,
    shortTitle: "Inteligência Emocional",
    title: "Inteligência Emocional e Autoconhecimento",
    subtitle:
      "As cinco dimensões da inteligência emocional e a diferença entre reagir por impulso e responder com intenção.",
    minutes: 75,
    focus: ["Conceito de IE", "Autoconsciência", "Autorregulação"],
  },
  {
    id: "2",
    number: 2,
    shortTitle: "Empatia e Competências Sociais",
    title: "Empatia e Competências Sociais",
    subtitle:
      "Compreender a perspetiva do outro e traduzir essa compreensão em competências sociais na sala de formação.",
    minutes: 70,
    focus: ["Empatia cognitiva", "Empatia emocional", "Gestão de grupos"],
  },
  {
    id: "3",
    number: 3,
    shortTitle: "Gestão e Prevenção",
    title: "Gestão de Conflitos e Prevenção",
    subtitle:
      "Os cinco estilos de gestão de conflito e quando cada um ajuda — ou agrava — a situação.",
    minutes: 80,
    focus: ["Thomas-Kilmann", "Adequação do estilo", "Prevenção ativa"],
  },
  {
    id: "4",
    number: 4,
    shortTitle: "Stress e Conflito",
    title: "Stress e Conflito",
    subtitle:
      "Como o stress deturpa a perceção e a resposta ao conflito, e o que fazer antes de intervir.",
    minutes: 70,
    focus: ["Avaliação primária", "Avaliação secundária", "Autorregulação"],
  },
  {
    id: "5",
    number: 5,
    shortTitle: "Roda de Mapeamento",
    title: "Ferramentas de Resolução de Conflitos: a Roda de Mapeamento do Conflito",
    subtitle:
      "Quatro quadrantes — Problema, Pessoas, Processo, Contexto — para analisar um conflito de forma estruturada.",
    minutes: 75,
    focus: ["Os 4 quadrantes", "Questões de diagnóstico", "Aplicação prática"],
  },
];

export const MF3_ACTIVITIES: Activity[] = [
  {
    id: "1",
    letter: "1",
    title: "Autodiagnóstico de Inteligência Emocional",
    kind: "Autoavaliação estruturada",
    description:
      "Avaliar-se nas cinco dimensões da inteligência emocional aplicadas à prática de formador e identificar uma dimensão a desenvolver, com um compromisso concreto.",
    minutes: 20,
  },
  {
    id: "2",
    letter: "2",
    title: "Escolher a Estratégia",
    kind: "Decisão e consequência",
    description:
      "Escolher um dos cinco estilos de gestão de conflito num cenário de formação, ver a consequência dessa escolha e enfrentar uma variante em que a mesma estratégia já não serve.",
    minutes: 25,
  },
  {
    id: "3",
    letter: "3",
    title: "Gerir o Stress Antes de Reagir",
    kind: "Decisão e consequência",
    description:
      "Reconhecer sinais de stress em si mesmo e comparar as consequências de reagir de imediato ou de aplicar uma técnica de autorregulação antes de intervir.",
    minutes: 20,
  },
  {
    id: "4",
    letter: "4",
    title: "Aplicar a Roda de Mapeamento do Conflito",
    kind: "Aplicação de ferramenta",
    description:
      "Mapear um conflito — fornecido ou da sua própria prática — nos quatro quadrantes da Roda, registando uma análise escrita por quadrante.",
    minutes: 35,
  },
  {
    id: "5",
    letter: "5",
    title: "Da Análise à Ação: Plano de Prevenção",
    kind: "Planeamento aplicado",
    description:
      "Construir um plano com 2 a 3 estratégias concretas de prevenção de conflitos para o seu próprio contexto de formação, com justificação.",
    minutes: 20,
  },
];

export const MF3_STOPS: Stop[] = [
  {
    id: "mf3-abertura",
    kind: "abertura",
    shortTitle: "Abertura",
    title: "Abertura do módulo",
    subtitle: "Enquadramento, objetivos e percurso.",
    minutes: 15,
    to: "/mf3",
  },
  ...MF3_BLOCKS.map<Stop>((b) => ({
    id: `mf3-bloco-${b.id}`,
    kind: "bloco" as const,
    shortTitle: `Bloco ${b.number} · ${b.shortTitle}`,
    title: b.title,
    subtitle: b.subtitle,
    minutes: b.minutes,
    to: "/mf3/blocos/$blocoId",
    params: { blocoId: b.id },
  })),
  {
    id: "mf3-atividades",
    kind: "atividades",
    shortTitle: "Aprendizagem Ativa",
    title: "Aprendizagem Ativa",
    subtitle: "5 atividades práticas de aplicação (~2h).",
    minutes: 120,
    to: "/mf3/atividades",
  },
  {
    id: "mf3-sintese",
    kind: "sintese",
    shortTitle: "Síntese Final",
    title: "Síntese Final",
    subtitle: "Recapitulação, autoavaliação e encerramento.",
    minutes: 20,
    to: "/mf3/sintese",
  },
];

export const getMf3Block = (id: string) => MF3_BLOCKS.find((b) => b.id === id);
export const getMf3Activity = (id: string) => MF3_ACTIVITIES.find((a) => a.id === id);

/** Micro-quizzes avaliados dos blocos do MF3 (os da síntese ficam de fora, como no MF1/MF2). */
export const MF3_BLOCK_QUIZ_IDS = [
  "mf3-bloco-1-quiz-conceito",
  "mf3-bloco-1-quiz-dimensao",
  "mf3-bloco-1-quiz-autorregulacao",
  "mf3-bloco-2-quiz-tipos-empatia",
  "mf3-bloco-2-quiz-competencia-social",
  "mf3-bloco-2-quiz-cenario",
  "mf3-bloco-3-quiz-identificar-estilo",
  "mf3-bloco-3-quiz-quando-usar",
  "mf3-bloco-3-quiz-prevencao",
] as const;

