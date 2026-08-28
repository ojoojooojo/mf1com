import type { Activity, Block, Stop } from "./course-data";

export const MF2_MODULE_TITLE = "Dinâmicas e Causas do Conflito na Formação";
export const MF2_MODULE_CODE = "MF2";

/** Citação literal do referencial oficial do IEFP — não parafrasear. */
export const MF2_LEARNING_OBJECTIVES = [
  "Compreender o conceito, a natureza, e as várias formas de conflitos, identificando as suas características, dinâmicas e tipos.",
  "Analisar os custos associados aos conflitos e desenvolver estratégias para mitigar as suas consequências negativas, promovendo uma gestão construtiva de desacordos.",
  "Explorar como os conflitos afetam os indivíduos e qual é o papel destes na origem, escalada e resolução dos conflitos.",
  "Explorar o papel e a responsabilidade do indivíduo na origem, escalada e resolução dos conflitos, incentivando a reflexão sobre as suas próprias atitudes e comportamentos.",
];

export const MF2_BLOCKS: Block[] = [
  {
    id: "1",
    number: 1,
    shortTitle: "Definição e Tipos",
    title: "Definição e Tipos de Conflito",
    subtitle:
      "O que é (e o que não é) um conflito, e como distinguir os seus tipos por nível e por conteúdo.",
    minutes: 85,
    focus: ["O que é conflito", "Tipos por nível", "Tipos por conteúdo"],
  },
  {
    id: "2",
    number: 2,
    shortTitle: "Estratégias Fundamentais",
    title: "Estratégias e Abordagens Fundamentais na Gestão de Conflitos",
    subtitle:
      "Como agir antes, durante e depois de um conflito, sem o transformar numa disputa pessoal.",
    minutes: 85,
    focus: ["Prevenção", "Intervenção", "Pós-resolução"],
  },
  {
    id: "3",
    number: 3,
    shortTitle: "Causas, Custos e Consequências",
    title: "Causas, Custos e Consequências dos Conflitos",
    subtitle: "De onde vêm os conflitos, o que custam e o que deixam atrás de si.",
    minutes: 95,
    focus: ["Causas", "Custos", "Consequências"],
  },
  {
    id: "4",
    number: 4,
    shortTitle: "Impacto e Papel do Indivíduo",
    title: "O Impacto do Conflito nos Indivíduos e o Papel do Indivíduo no Conflito",
    subtitle:
      "O que o conflito faz a cada pessoa — e o que cada pessoa faz ao conflito, sem sempre o notar.",
    minutes: 85,
    focus: ["Impacto psicológico", "Perceção", "Papel individual"],
  },
];

export const MF2_ACTIVITIES: Activity[] = [
  {
    id: "1",
    letter: "1",
    title: "Diagnosticar o Conflito",
    kind: "Análise de situação",
    description:
      "Identificar partes envolvidas, tipo de conflito, objeto do desacordo, interesses/perceções e sinais de conflito num cenário de formação.",
    minutes: 25,
  },
  {
    id: "2",
    letter: "2",
    title: "Mapear Causas",
    kind: "Análise causal",
    description:
      "Distinguir causas, fatores precipitantes, fatores de escalada, fatores contextuais e interpretações numa situação complexa.",
    minutes: 25,
  },
  {
    id: "3",
    letter: "3",
    title: "Analisar Consequências",
    kind: "Análise de impacto",
    description:
      "Identificar consequências de um conflito para os indivíduos, o grupo, a aprendizagem e a relação pedagógica.",
    minutes: 22,
  },
  {
    id: "4",
    letter: "4",
    title: "O Papel do Indivíduo",
    kind: "Reflexão aplicada",
    description:
      "Analisar como o comportamento de cada interveniente contribui para a origem, manutenção, escalada ou prevenção de um conflito.",
    minutes: 24,
  },
  {
    id: "5",
    letter: "5",
    title: "Prevenção",
    kind: "Identificação e planeamento",
    description:
      "Reconhecer sinais precoces de conflito numa situação de formação e propor medidas preventivas concretas.",
    minutes: 24,
  },
];

export const MF2_STOPS: Stop[] = [
  {
    id: "mf2-abertura",
    kind: "abertura",
    shortTitle: "Abertura",
    title: "Abertura do módulo",
    subtitle: "Enquadramento, objetivos e percurso.",
    minutes: 15,
    to: "/mf2",
  },
  ...MF2_BLOCKS.map<Stop>((b) => ({
    id: `mf2-bloco-${b.id}`,
    kind: "bloco" as const,
    shortTitle: `Bloco ${b.number} · ${b.shortTitle}`,
    title: b.title,
    subtitle: b.subtitle,
    minutes: b.minutes,
    to: "/mf2/blocos/$blocoId",
    params: { blocoId: b.id },
  })),
  {
    id: "mf2-atividades",
    kind: "atividades",
    shortTitle: "Aprendizagem Ativa",
    title: "Aprendizagem Ativa",
    subtitle: "5 atividades práticas de aplicação (~2h).",
    minutes: 120,
    to: "/mf2/atividades",
  },
  {
    id: "mf2-sintese",
    kind: "sintese",
    shortTitle: "Síntese Final",
    title: "Síntese Final",
    subtitle: "Recapitulação, autoavaliação e encerramento.",
    minutes: 20,
    to: "/mf2/sintese",
  },
];

export const getMf2Block = (id: string) => MF2_BLOCKS.find((b) => b.id === id);
export const getMf2Activity = (id: string) => MF2_ACTIVITIES.find((a) => a.id === id);

/** Micro-quizzes avaliados dos 4 blocos do MF2 (os da síntese ficam de fora, como no MF1). */
export const MF2_BLOCK_QUIZ_IDS = [
  "mf2-bloco-1-quiz-tipos-nivel",
  "mf2-bloco-1-quiz-tipos-conteudo",
  "mf2-bloco-1-quiz-funcional",
  "mf2-bloco-2-quiz-abordagem",
  "mf2-bloco-2-quiz-escalada",
  "mf2-bloco-2-quiz-cooperativo",
  "mf2-bloco-3-quiz-causas",
  "mf2-bloco-3-quiz-custos",
  "mf2-bloco-3-quiz-consequencias",
  "mf2-bloco-4-quiz-impacto",
  "mf2-bloco-4-quiz-percecao",
  "mf2-bloco-4-quiz-papel",
] as const;
