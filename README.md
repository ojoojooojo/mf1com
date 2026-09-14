# Gestão de Conflitos na Formação

Vamos construir um MOOC completo (curso digital assíncrono) chamado "Comunicação e Escuta Ativa na Formação" — o Módulo 1 (MF1) de uma formação para formadores profissionais, "Gestão de Conflitos na Formação", com base no referencial oficial do IEFP (Portugal). É uma aplicação web educativa, standalone, SEM autenticação/login (acesso direto e sem fricção — não precisa de conta nem base de dados de utilizadores). O progresso do formando é guardado no localStorage do browser (não precisa de Supabase/backend para já).

CONTEXTO PEDAGÓGICO
Público: formadores certificados (adultos profissionais) a fazer formação contínua.
Duração alvo: representa ~8 horas de trabalho assíncrono, dividido em: ~6h de aprendizagem de conteúdos + ~2h de aprendizagem ativa (atividades práticas substanciais, não apenas quizzes).
5 conteúdos obrigatórios a cobrir (definidos pelo referencial oficial IEFP): (1) Definição e funções da comunicação; (2) Componentes psicológicos e elementos do processo de comunicação; (3) Comunicação assertiva; (4) Barreiras à comunicação; (5) Escuta ativa e empatia.

PRINCÍPIO CENTRAL: alternar sempre CONTEÚDO → EXEMPLO/CENÁRIO → INTERAÇÃO → APLICAÇÃO, nunca uma sequência mecânica de conteúdo→pergunta→conteúdo→pergunta. Evitar paredes de texto. Nada de gamificação artificial, badges, ou stock photography decorativa — toda a imagética é diagramas/infográficos SVG feitos por nós, pedagógicos (não decorativos).

IDENTIDADE VISUAL (própria, não copiar nenhum produto existente)
Cria uma identidade visual profissional, contemporânea, calma e focada em leitura/aprendizagem adulta. Sugestão de direção: fundo claro neutro (não branco puro), uma cor primária de confiança (ex. azul petróleo ou verde-azulado escuro) para ações e navegação, uma cor secundária quente (ex. terracota/âmbar) usada com moderação para destaques e "aprendizagem ativa", tipografia com boa hierarquia (um display serif ou humanista para títulos, sans-serif muito legível para corpo de texto), cantos suaves, muito espaço em branco, sem gradientes exagerados nem excesso de sombras. Deve funcionar impecavelmente em modo claro; considera também suporte a modo escuro se for natural no stack. Excelente contraste e legibilidade (AA mínimo).

ARQUITETURA DE INFORMAÇÃO (constrói já toda a navegação/esqueleto, mesmo que alguns ecrãs fiquem só com placeholder “em construção” por agora — vamos preencher nas próximas mensagens):

1. Página de abertura do módulo (landing): título do módulo, enquadramento (2-3 frases sobre porque a comunicação e escuta ativa são centrais na gestão de conflitos em formação), os 4 objetivos de aprendizagem oficiais (lista abaixo), indicação clara "10h totais do módulo · 8h assíncronas (este MOOC) + 2h síncronas em sessão presencial/online, fora deste MOOC", os 5 conteúdos que vai percorrer, botão "Começar".

Objetivos de aprendizagem oficiais (citar tal como estão, são a fonte curricular oficial):
- Compreender o conceito e a importância da comunicação em diversos contextos sociais e profissionais.
- Desenvolver competências práticas de comunicação, incluindo expressão verbal e não verbal, escuta ativa e feedback construtivo.
- Desenvolver competências de comunicação assertiva, capacitando os participantes a expressarem os seus pensamentos, sentimentos e necessidades de forma clara e respeitosa.
- Identificar e superar as barreiras comuns à comunicação, tais como preconceitos e má interpretação de mensagens, através do desenvolvimento de habilidades de escuta ativa e consciência emocional.

2. Um "mapa do módulo" / trilho de progresso sempre visível (sidebar ou barra de progresso persistente) mostrando as 7 paragens: Abertura → Bloco 1 Definição e Funções da Comunicação → Bloco 2 Componentes Psicológicos e Elementos do Processo → Bloco 3 Comunicação Assertiva → Bloco 4 Barreiras à Comunicação → Bloco 5 Escuta Ativa e Empatia → Aprendizagem Ativa (5 atividades) → Síntese Final. Mostra sempre onde o formando está, o que já fez, o que falta, e permite navegar livremente entre secções já desbloqueadas (não forçar linearidade rígida, mas sugerir ordem recomendada). Guardar progresso (secções visitadas/concluídas, respostas às atividades) em localStorage.

3. Cada "Bloco de conteúdo" (1 a 5) é uma página própria (rota própria) com o seu conteúdo (vamos enviar o conteúdo de cada bloco em mensagens seguintes — por agora cria a página/template genérico reutilizável, com layout que suporte: texto curto, cartões, acordeões, infográficos SVG embutidos, cenários/diálogos, perguntas de reflexão abertas, e micro-quizzes com feedback pedagógico explicativo (nunca apenas "Correto/Incorreto" — sempre explicar o porquê).

4. Uma secção "Aprendizagem Ativa" com 5 atividades substanciais (cada uma a sua própria página/ecrã): A) Análise de situação; B) Transformação de mensagens; C) Escolha e justificação; D) Observação de comunicação verbal/não-verbal; E) Reflexão aplicada à prática do formando. Cria já a listagem/hub destas 5 atividades com descrição breve de cada uma e estado (por fazer / concluída), mesmo que o conteúdo interno ainda não esteja implementado.

5. Página de Síntese Final: recapitulação dos 5 conteúdos, autoavaliação formativa final, e encerramento do módulo com transição para o Módulo 2 (fora de âmbito, apenas uma nota informativa).

IMPORTANTE SOBRE RIGOR: este curso vai conter afirmações baseadas em fontes reais (académicas/institucionais) que te vou fornecer em detalhe nas próximas mensagens — nessa altura vou pedir-te para implementares o conteúdo exatamente como fornecido, incluindo uma pequena atribuição "Fonte:" discreta no fim de cada secção relevante. Não inventes conteúdo teórico por iniciativa própria nas próximas etapas — eu forneço o texto pedagógico; a tua responsabilidade agora é a arquitetura, o design system, os componentes reutilizáveis (cartão, acordeão, cenário/diálogo, quiz com feedback, infográfico SVG placeholder) e a experiência de navegação/progresso.

Por favor implementa tudo isto agora: design system, layout global, landing page completa, mapa/trilho de progresso com localStorage, templates de bloco de conteúdo reutilizáveis, hub de aprendizagem ativa, e página de síntese final (com placeholders de conteúdo onde ainda não temos texto definitivo). Não precisas de aprovação para decisões de implementação — avança autonomamente.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://mf1com.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/09346501-d4be-416a-bf19-c2d674949bd7).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
