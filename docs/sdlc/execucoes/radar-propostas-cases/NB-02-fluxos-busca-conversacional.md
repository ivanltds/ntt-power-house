# NB-02 — Fluxos da Feature: Busca e Recuperação Conversacional (UC03)

> Demanda: **radar-propostas-cases** · Etapa: NB-02 — Especificação de Requisitos (addendum de fluxos)
> Status: **RASCUNHO EXPLORATÓRIO** — mesmo regime de [`NB-02-feature-busca-conversacional.md`](./NB-02-feature-busca-conversacional.md): depende da aprovação conjunta de NB-01/NB-02 (ver `GATE-NB-02.md`, `DECISIONS.md` DEC-0002/DEC-0003).
> Base: [`NB-02-feature-busca-conversacional.md`](./NB-02-feature-busca-conversacional.md) (UC03.1–UC03.15)

Este documento traduz em diagramas os 15 sub-casos de uso já descritos textualmente no addendum de requisitos. Não introduz nenhum requisito novo — é uma visualização de apoio para NB-03 (viabilidade) e DEV-01 (arquitetura).

## 1. Visão geral — pipeline ponta a ponta de UC03

Fluxo único mostrando a sequência completa de um turno de busca, do início da sessão até o registro de auditoria.

```mermaid
flowchart TD
  A["UC03.1\nIniciar/continuar sessão"] --> B["UC03.2\nInterpretar pergunta\n(intenção/entidades)"]
  B --> C{"Intenção reconhecida?"}
  C -->|"Fora do domínio"| C1["Responder que a pergunta\nestá fora do que a base cobre"] --> O["UC03.15\nRegistrar auditoria do turno"]
  C -->|"Pedir detalhe de resultado\nanterior (ex.: 'o segundo')"| UC11["UC03.11\nExpandir detalhes\n(usa UC03.14 p/ resolver referência)"] --> O
  C -->|"Pedir áreas complementares"| UC04["(Relacionado) UC04\nComparar/áreas complementares"] --> O
  C -->|"Buscar referências similares"| D["UC03.3\nEnriquecer consulta\n(briefing + histórico da sessão)"]

  D --> E["UC03.4\nRecuperar candidatos\n(busca semântica)"]
  E --> F["UC03.5\nFiltrar por permissão\ne confidencialidade"]
  F --> G{"Restou algum\ncandidato?"}
  G -->|Não| H["UC03.12\nInformar ausência de\nevidência suficiente"] --> O
  G -->|Sim| I["UC03.6\nCalcular score\nmulti-fator (6 pesos)"]

  I --> J["UC03.7\nSelecionar e ranquear\n3-5 melhores (corte mínimo)"]
  J --> K{"Há divergência de\ndados entre fontes\nde um resultado?"}
  K -->|Sim| L["UC03.8\nResolver via hierarquia\nde confiança + justificar escolha"]
  K -->|Não| M["UC03.9\nGerar justificativa\n(trechos reais como evidência)"]
  L --> M

  M --> N["UC03.10\nApresentar resultados\nem cards (score, resumo, fontes)"]
  N --> P["UC03.11\nUsuário pode expandir\ndetalhes de um card"]
  N --> Q["UC03.13\nUsuário pode dar\nfeedback útil/não útil"]
  P --> O
  Q --> O
  N --> R{"Usuário faz pergunta\nde acompanhamento?"}
  R -->|Sim| S["UC03.14\nFollow-up: reaproveita\ncontexto da sessão"] --> B
  R -->|Não| O
  O --> T(["Fim do turno"])
```

## 2. UC03.1 — Iniciar/continuar sessão de busca conversacional

```mermaid
flowchart TD
  A(["Usuário abre o chat"]) --> B{"Chat aberto a partir\nde uma oportunidade?"}
  B -->|Sim| C["Sistema cria sessão vinculada\nà oportunidade"]
  C --> D["Herda metadados do briefing como\ncontexto inicial (segmento, tecnologias,\nobjetivo, descrição)"]
  B -->|Não| E["Sistema cria sessão\nsem vínculo de oportunidade"]
  D --> F(["Sessão ativa, histórico\nde turnos iniciado"])
  E --> F
```

## 3. UC03.2 — Interpretar pergunta e extrair intenção/entidades

```mermaid
flowchart TD
  A(["Pergunta recebida"]) --> B["Extrair entidades presentes\n(segmento, tecnologia, cliente,\nprazo, tipo doc, área/serviço)"]
  B --> C["Classificar intenção da pergunta"]
  C --> D{"Qual intenção?"}
  D -->|"Buscar referências similares"| E(["Segue para UC03.3\n(enriquecer consulta)"])
  D -->|"Detalhar resultado já exibido"| F(["Segue para UC03.11/UC03.14"])
  D -->|"Pedir áreas complementares"| G(["Segue para UC04"])
  D -->|"Fora do domínio da base"| H["Responder que a pergunta\nnão pode ser respondida pela base"]
  H --> I(["Fim sem inventar resposta"])
```

## 4. UC03.3 + UC03.4 — Enriquecer consulta e recuperar candidatos

```mermaid
flowchart TD
  A(["Entidades da pergunta atual"]) --> D["Combinar:\n• entidades da pergunta\n• metadados do briefing (se houver)\n• filtros/entidades de turnos anteriores"]
  B(["Metadados do briefing\n(se sessão vinculada)"]) --> D
  C(["Histórico da sessão\n(turnos anteriores)"]) --> D
  D --> E["Montar consulta efetiva\nde recuperação"]
  E --> F["UC03.4: Executar busca semântica\nsobre trechos indexados (chunks)"]
  F --> G(["Conjunto candidato\nordenado por relevância textual bruta"])
```

## 5. UC03.5 — Aplicar filtro de permissão e confidencialidade

```mermaid
flowchart TD
  A(["Conjunto candidato bruto"]) --> B["Para cada candidato:\nverificar classificação de\nconfidencialidade e perfil do usuário"]
  B --> C{"Usuário tem\npermissão?"}
  C -->|Sim| D["Mantém candidato\nno conjunto"]
  C -->|Não| E["Remove candidato\n(não aparece em score,\njustificativa ou menção)"]
  D --> F(["Conjunto filtrado\n(só o que o usuário pode ver)"])
  E --> F
```

> Regra crítica (RNF01/RF22): este filtro ocorre **antes** de qualquer cálculo de score, geração de justificativa ou exibição — nunca depois.

## 6. UC03.6 + UC03.7 — Calcular score multi-fator e ranquear

```mermaid
flowchart TD
  A(["Conjunto filtrado\n(pós-permissão)"]) --> B["Para cada candidato,\ncalcular os 6 fatores:"]
  B --> B1["Descrição/objetivo/escopo — 40%"]
  B --> B2["Segmento — 15%"]
  B --> B3["Tecnologias — 15%"]
  B --> B4["Serviços/área — 15%"]
  B --> B5["Prazo/valor/porte — 10%"]
  B --> B6["Status/resultado do caso — 5%"]
  B1 --> C["Compor score final\n+ manter detalhamento por fator"]
  B2 --> C
  B3 --> C
  B4 --> C
  B5 --> C
  B6 --> C
  C --> D["Ordenar candidatos\npelo score final"]
  D --> E{"Quantos atingem o\ncorte mínimo de relevância?"}
  E -->|"0"| F(["Segue para UC03.12\n(sem evidência suficiente)"])
  E -->|"1 ou 2"| G["Exibir só os que existem +\navisar que há poucas referências fortes"]
  E -->|"3 a 5 ou mais"| H["Selecionar os 3 a 5\nmelhores"]
  G --> I(["Resultados selecionados"])
  H --> I
```

## 7. UC03.8 — Resolver divergência entre fontes (hierarquia de confiança)

```mermaid
flowchart TD
  A(["Montar dado para a resposta\n(ex.: prazo, valor, escopo)"]) --> B{"Dado vem de mais de\num documento com\nvalores conflitantes?"}
  B -->|Não| C(["Usar o único valor\ndisponível, sem nota de conflito"])
  B -->|Sim| D["Aplicar hierarquia de confiança:\ncontrato/proposta final/SOW >\ncase aprovado/apresentação final >\nestimativa/versão preliminar/ata >\ne-mail/transcrição/anotação informal"]
  D --> E["Selecionar o valor da\nfonte de maior confiança"]
  E --> F["Registrar: campo em conflito,\nvalores por documento,\nfonte priorizada e motivo"]
  F --> G(["Declarar explicitamente qual\nfonte foi usada e por quê"])
  C --> H(["Seguir para UC03.9\n(gerar justificativa)"])
  G --> H
```

## 8. UC03.9 + UC03.10 — Gerar justificativa e apresentar resultados

```mermaid
flowchart TD
  A(["Resultado selecionado\n+ fatores de score\n+ resolução de conflito (se houve)"]) --> B["Compor texto curto de justificativa:\nfatores de maior peso + ao menos\num trecho real de evidência"]
  B --> C{"Trecho citado existe\nliteralmente no documento?"}
  C -->|Não| D["Reformular ou descartar\na citação (nunca inventar)"]
  D --> B
  C -->|Sim| E["Montar card: nome, score,\nstatus, segmento, tecnologias,\nresumo, justificativa, fontes"]
  E --> F{"Houve resolução de\nconflito neste resultado?"}
  F -->|Sim| G["Adicionar selo\n'informação consolidada\nde múltiplas fontes'"]
  F -->|Não| H["Card padrão"]
  G --> I(["Exibir card ao usuário"])
  H --> I
```

## 9. UC03.11 — Expandir detalhes de um resultado

```mermaid
flowchart TD
  A(["Usuário clica\n'exibir detalhes'"]) --> B{"Pedido faz referência a\num card anterior (ex. 'o segundo')?"}
  B -->|Sim| C["UC03.14: resolver referência\nusando histórico da sessão"]
  C --> D
  B -->|Não| D["Carregar dados completos\ndo resultado selecionado"]
  D --> E["Exibir: problema/desafio, objetivo,\nescopo, entregáveis, tecnologias,\náreas, prazo/porte (se permitido),\nstatus, trechos de evidência, link/fonte"]
  E --> F(["Usuário pode voltar\naos resultados ou abrir a fonte"])
```

## 10. UC03.12 — Informar ausência de evidência suficiente

```mermaid
flowchart TD
  A(["Nenhum candidato atingiu\nrelevância mínima, ou pergunta\nnão respondível pela base"]) --> B["Comunicar claramente a\nausência de evidência"]
  B --> C["Sugerir ação construtiva:\nrefinar busca, completar briefing,\nou considerar enviar novas referências"]
  C --> D(["Nenhum score ou referência\n'forçada' é exibida"])
```

## 11. UC03.13 — Capturar feedback de utilidade por resultado

```mermaid
flowchart TD
  A(["Card de resultado exibido"]) --> B["Usuário opcionalmente marca\nútil / não útil"]
  B --> C["Persistir feedback vinculado a:\nsessão, turno, pergunta,\ndocumento avaliado, usuário"]
  C --> D(["Conversa continua normalmente\n(feedback nunca bloqueia o fluxo)"])
```

## 12. UC03.14 — Continuar a conversa (follow-up) refinando a busca

```mermaid
flowchart TD
  A(["Pergunta de acompanhamento\n(ex.: 'e só com Databricks?',\n'o segundo', 'tem algo mais recente?')"]) --> B["Recuperar histórico da sessão\n(turnos anteriores)"]
  B --> C{"Referência resolvível com\no histórico disponível?"}
  C -->|Sim| D["Ajustar contexto/filtros\ncom base no turno anterior"]
  D --> E(["Segue como novo turno:\nUC03.2 → ... com contexto herdado"])
  C -->|Não| F["Pedir esclarecimento ao usuário\nem vez de assumir referência errada"]
  F --> E
```

## 13. UC03.15 — Registrar auditoria da busca

```mermaid
flowchart TD
  A(["Qualquer evento do turno:\npergunta, intenção extraída,\ncandidatos considerados"]) --> E["Gravar registro de auditoria\ndo turno"]
  B(["Resultados exibidos + scores\n+ fontes citadas"]) --> E
  C(["Aberturas de detalhe /\nacesso à fonte original"]) --> E
  D(["Feedback útil/não útil\nrecebido"]) --> E
  E --> F(["Dados disponíveis para as\nmétricas de validação do MVP\n(sem levantamento manual)"])
```

## 14. Diagrama de sequência — turno completo (ator × sistema)

Visão complementar, mostrando a troca de mensagens entre o usuário e os componentes lógicos do sistema ao longo de um turno de busca.

```mermaid
sequenceDiagram
  actor U as Usuário
  participant Chat as Sessão de Conversa (UC03.1/14)
  participant NLU as Interpretação (UC03.2/3)
  participant Busca as Recuperação Semântica (UC03.4)
  participant Perm as Filtro de Permissão (UC03.5)
  participant Score as Motor de Score (UC03.6/7)
  participant Conf as Resolução de Conflito (UC03.8)
  participant Resp as Geração de Resposta (UC03.9/10/11)
  participant Aud as Auditoria (UC03.15)

  U->>Chat: Pergunta (turno N)
  Chat->>NLU: Pergunta + histórico + briefing
  NLU->>Busca: Consulta enriquecida
  Busca->>Perm: Conjunto candidato bruto
  Perm->>Score: Conjunto filtrado (só permitido)
  Score->>Conf: Top candidatos + dados por fator
  Conf->>Resp: Dados consolidados (fonte priorizada se houve conflito)
  Resp->>U: Cards com score, resumo, justificativa, fontes
  U->>Resp: Expande detalhes (UC03.11) [opcional]
  U->>Resp: Feedback útil/não útil (UC03.13) [opcional]
  Resp->>Aud: Registra resultados, fontes, aberturas, feedback
  U->>Chat: Pergunta de acompanhamento (turno N+1)
  Chat->>NLU: Nova pergunta + contexto herdado do turno N
```

## 15. Rastreabilidade

Todos os diagramas acima representam exatamente os sub-casos de uso UC03.1–UC03.15 definidos em [`NB-02-feature-busca-conversacional.md`](./NB-02-feature-busca-conversacional.md) — nenhum comportamento novo foi introduzido. Este documento é material de apoio visual para a avaliação do gate NB-02 e para o desenho técnico em DEV-01 (arquitetura/sequência de chamadas/modelo de dados).
