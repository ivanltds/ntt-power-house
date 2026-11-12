# Discovery — Catálogo de informações do projeto (aprofundamento)

> Cópia versionada de `radar-v0/docs/DISCOVERY-catalogo-informacoes-projeto.md` (protótipo), com os links ajustados para esta pasta.

> Demanda: **radar-propostas-cases** · Etapa: NB-01 — Discovery (rodada 2), insumo do [`NB-01-discovery-r2-projetos-listagem-ficha.md`](./NB-01-discovery-r2-projetos-listagem-ficha.md)
> Status: **Rascunho para validação com usuários — nada implementado.**
> Objetivo: mapear, da forma mais completa possível, **o que pode ser mostrado** na listagem e na ficha de projeto para executivos, gestores, consultores e demais públicos. Para cada item, o documento diz de onde vem o dado e quanto custa mantê-lo.

## 0. Como ler

Cada informação tem uma **origem**. A origem define o custo e a confiabilidade:

| Código | Origem | Custo de manutenção |
|---|---|---|
| **V** | Já existe **e já aparece** na tela | — |
| **B** | Já existe **no banco**, mas **não aparece** | Só tela |
| **C** | **Calculável hoje** a partir do que existe, sem cadastro novo | Baixo |
| **IA** | **Extraível dos documentos** pela IA, com revisão humana. A base já extrai riscos, lições, KPIs, pessoas, organizações e valores. | Médio (revisão) |
| **N** | **Campo novo** preenchido por uma pessoa | Alto: alguém precisa preencher sempre |
| **F** | **Integração futura** (CRM, SharePoint, ERP, horas apontadas) | Fora do MVP |

**Princípio:** priorizar **C** e **IA** antes de **N**. Um campo que depende de preenchimento manual e ninguém mantém vira dado velho, e dado velho destrói a confiança.

**Onde a informação aparece:**
- **Card:** decidir se vale abrir o projeto.
- **Ficha:** agir sobre o projeto.
- **Visão:** enxergar o conjunto (portfólio, cliente, segmento).

**O que a base guarda hoje, em números (local):**
- **Documentos por tipo:**
  - 11 propostas, 11 apresentações, 11 estimativas e 11 transcrições;
  - 6 cases;
  - 1 ata.
- **Entidades extraídas dos documentos:**
  - 79 riscos e 7 lições;
  - 7 KPIs;
  - 33 pessoas e 41 organizações;
  - 23 valores monetários e 156 prazos.
- **Status:** mistura **etapas da venda** (Enviada, Em negociação, Vendida, Perdida) com **etapas da execução** (Em execução, Entregue). São dois ciclos diferentes num só campo (ver D5 e D6).
- **Documentos:** já têm `nivel_confianca`, `qualidade_metadados`, `reutilizavel`, `contem_pii`, `autor` e `versao`.
- **Projetos relacionados:** já têm `similaridade` e `motivo`.
- **Uso:** já são registrados abertura de detalhe, "usar como base" e exportação.

---

## 1. As perguntas que cada público faz

O card e a ficha devem responder a estas perguntas sem obrigar a pessoa a abrir documentos. Cada uma remete à dimensão da seção 2 que a responde.

### Executivo / diretoria
1. O que já fizemos para **este cliente** e desde quando? → D2, D10
2. O que já fizemos **neste segmento** e onde somos referência? → D2, Visões
3. Que **case posso citar** amanhã na reunião, e posso dizer o nome do cliente? → D4, D9
4. Qual foi o **resultado de negócio** para o cliente, em número? → D4
5. **Quanto** essa conta ou segmento representa para nós? → D2, D5 (com permissão)
6. Onde **perdemos**, e por quê? → D5
7. Que outros serviços **ainda não vendemos** a esse cliente? → C: espaço em branco
8. Com **quem do cliente** nos relacionamos (cargo e nível)? → D2
9. Esse projeto foi **bem**? O cliente ficou satisfeito? → D6
10. Quais **parceiros** (Microsoft, AWS, Databricks…) estiveram envolvidos? → D3

### Gestor comercial
1. Qual o **status** e o que falta para fechar? → D5
2. **Por que ganhamos ou perdemos**, e contra quem? → D5
3. **Preço e margem** praticados em projetos parecidos? Qual o desconto? → D5
4. Quanto tempo a venda levou (**ciclo de venda**)? → C
5. O **prazo estimado** se confirmou na execução? → D6
6. Quem é o **dono** da conta e da proposta? → D7
7. Que **objeções** o cliente levantou e como respondemos? → IA: transcrições
8. Há **expansão** ou renovação possível? → D5

### Consultor / pré-vendas
1. Que **problema** foi resolvido e com que **abordagem**? → D3
2. Que **arquitetura e tecnologias** foram usadas? → D3
3. Que **materiais** existem para reaproveitar: proposta, apresentação, estimativa, case? → D8 (kit)
4. Que **riscos** e **lições** apareceram? → D8
5. **Com quem falo** internamente sobre isso? → D7
6. Qual o **porte** (prazo, equipe, faixa de valor) para eu dimensionar? → D5, D6
7. Que **perguntas** o cliente fez na reunião? → IA: transcrições
8. Esse material está **atualizado e confiável**? → D9

### Delivery / gerente de projeto (a confirmar)
1. Como foi a execução: prazo previsto × realizado, mudanças de escopo? → D6
2. Tamanho e composição da equipe? → D6
3. O que deu errado e o que eu faria diferente? → D8

### Marketing / alianças (a confirmar)
1. Que cases são **públicos** e com qual nível de citação? → D9
2. Que cases envolvem o **parceiro X**? → D3
3. Existe **depoimento** ou frase citável do cliente? → D4

### Curador (gestor da base)
1. Que fichas estão **incompletas** ou **desatualizadas**? → D9
2. Que documentos esperam **revisão**? → D9
3. Que projetos são **mais usados** e quais nunca são abertos? → C: uso

---

## 2. As dez dimensões de informação

### D1 — Identidade e resumo

| Informação | Para que serve | Perfis | Onde | Origem |
|---|---|---|---|---|
| Título técnico (atual) | Identificar | Todos | Card, ficha | V |
| **Título executivo** ("Redução de 18% nas perdas de energia") | Comunicar o valor em uma linha | Executivo | Card executivo | IA |
| **Resumo em uma frase** | Decidir se abre sem ler a descrição | Todos | Card | IA |
| **Tipo de iniciativa** (proposta, POC, projeto, sustentação, RFP respondida) | Saber se houve venda ou só tentativa | Gestor, executivo | Card | N (lista curta) |
| Código (P019) | Referência em conversas e no chat | Todos | Ficha | V |

### D2 — Cliente e contexto

| Informação | Para que serve | Perfis | Onde | Origem |
|---|---|---|---|---|
| Cliente | Identificar | Todos | Card | V |
| **Segmento** | Contexto de mercado | Todos | Card | B |
| **Subsegmento** (distribuição de energia, varejo alimentar…) | Precisão maior que o segmento | Executivo, consultor | Ficha, filtro | N (lista) ou IA |
| **Áreas do cliente** (TI, RH, produção, canais de venda…) | Com quem falar no cliente, que dor existe | Executivo, gestor | Card | N + IA (UC12) |
| **Patrocinador e decisor: cargo e nível** (diretor de operações, C-level) | Saber em que nível nos relacionamos | Executivo, gestor | Ficha | N (cargo, **não o nome**) |
| **Porte do cliente** (faixa de faturamento ou funcionários) | Comparar casos equivalentes | Gestor, consultor | Ficha, filtro | N no cadastro do cliente |
| **Região / país** | Restrições e referências locais | Executivo, gestor | Ficha, filtro | N no cadastro do cliente |
| **Contexto regulatório** (LGPD, ANEEL, BACEN, ANS, ANATEL) | Argumento técnico e de risco | Consultor, executivo | Ficha | IA |
| **Maturidade de dados ou tecnologia do cliente** | Calibrar a proposta | Consultor | Ficha | IA (transcrições) |
| **Relação com o cliente**: nº de projetos, primeiro e último, valor acumulado, taxa de ganho | Visão da conta | Executivo, gestor | Card (selo), ficha, visão Conta | **C** |
| **Grupo econômico** | Juntar contas de empresas do mesmo grupo | Executivo | Visão Conta | N |

### D3 — Problema e solução

| Informação | Para que serve | Perfis | Onde | Origem |
|---|---|---|---|---|
| **Problema de negócio** em lista fechada (churn, fraude, previsão de demanda, manutenção preditiva, atendimento, perdas, precificação…) | **A forma como o executivo pensa:** pelo problema, não pela tecnologia | Executivo, gestor | **Card**, filtro, visão | IA + revisão (lista fechada) |
| **Capacidade de negócio** afetada (vender, atender, operar, cobrar, planejar) | Agrupar problemas parecidos | Executivo | Visão | IA |
| Objetivo | Entender a meta | Todos | Ficha | V |
| **Abordagem** em 3 a 5 passos | Reaproveitar o método | Consultor | Ficha | IA (proposta) |
| Tecnologias | Reaproveitar a arquitetura | Consultor | Card técnico, ficha | V |
| Serviços | Montar o escopo | Consultor, gestor | Ficha | B |
| **Parceiros e fabricantes** (Microsoft, AWS, Databricks, Salesforce) | Alianças, cofinanciamento, cases conjuntos | Executivo, marketing | Card, filtro | IA (organizações já extraídas) |
| **Ativos e aceleradores NTT usados** | Reaproveitar e diferenciar | Consultor, executivo | Ficha | N + IA |
| **Arquitetura de referência** (diagrama ou slide) | Montar a solução mais rápido | Consultor | Ficha | IA: localizar o slide na apresentação |

### D4 — Resultado e valor

Para o executivo, esta é a dimensão mais importante e a mais fraca hoje: só há 7 KPIs, soltos nos documentos.

| Informação | Para que serve | Perfis | Onde | Origem |
|---|---|---|---|---|
| **KPIs de resultado** (indicador, antes, depois, prazo) | Prova de valor | Executivo, marketing | **Card** (o principal), ficha | IA (entidade `kpi`) + revisão |
| **Resultado previsto × realizado** | Separar promessa de entrega | Executivo, gestor | Ficha | N (realizado) |
| **Benefício financeiro estimado para o cliente** (economia, receita) | Argumento de ROI | Executivo | Ficha | IA + revisão |
| **Tempo até o primeiro valor** | Argumento de rapidez | Executivo, consultor | Ficha | N ou IA |
| **Nível de prova:** estimado, medido pela NTT, validado pelo cliente | Saber quão forte é o número | Executivo, marketing | Selo no KPI | N |
| **Frase citável** ou depoimento | Usar em apresentação | Executivo, marketing | Ficha | IA (case) + autorização (D9) |

### D5 — Comercial

| Informação | Para que serve | Perfis | Onde | Origem |
|---|---|---|---|---|
| **Status da venda** (separado da execução) | Onde está a negociação | Gestor | Card | B, depois de separar o campo |
| **Motivo de ganho ou perda** (lista + texto) | Aprender com a venda | Gestor, executivo | Card (perdidas), ficha | N + IA (lições) |
| **Concorrentes** na disputa e quem venceu | Inteligência competitiva | Gestor | Ficha (**restrito**) | N |
| **Modelo comercial** (preço fechado, alocação, sustentação, por resultado) | Comparar preço de forma justa | Gestor | Ficha | N ou IA (proposta) |
| Valor e margem | Precificar | Gestor | Ficha (com permissão) | V |
| **Faixa de valor** (P, M, G, GG) para quem não vê valores | Dimensionar **sem expor o valor** | Consultor | Card | **C** (respeita `verValores`) |
| **Desconto** sobre o preço inicial | Negociação | Gestor | Ficha (restrito) | N ou IA (versões da proposta) |
| **Ciclo de venda** (da primeira proposta à decisão) | Prever fechamento | Gestor | Ficha, visão | **C** (datas dos documentos) |
| **Divergência de prazo e valor entre documentos** (estimativa diz 6 meses, proposta diz 4) | Detectar inconsistências antes de reaproveitar | Gestor, consultor | Alerta na ficha | **C** (entidades `prazo` e `valor_monetario`) |
| **Expansão e renovação** (projeto seguinte, aditivo, contrato vigente até) | Oportunidade de receita | Executivo, gestor | Ficha, visão Conta | N, depois F (CRM) |

### D6 — Execução

| Informação | Para que serve | Perfis | Onde | Origem |
|---|---|---|---|---|
| **Fase de execução** (não iniciado, em execução, concluído, suspenso) | Separar do status da venda | Todos | Card | B (separar do status) |
| **Início e fim**, previstos e realizados | Prazo real | Gestor, delivery | Ficha | N |
| **Prazo previsto × realizado** (desvio %) | Credibilidade da estimativa | Gestor, consultor | Ficha, visão | **C** quando houver as datas |
| **Equipe**: tamanho e papéis (não nomes) | Dimensionar | Consultor, delivery | Ficha | N ou IA (estimativa) |
| **Modelo de entrega** (local, remoto, nearshore, offshore) | Comparar custo | Gestor | Ficha | N |
| **Saúde do projeto** (verde, amarelo, vermelho) | Risco de citar como referência | Executivo | Card (em execução) | N, depois F |
| **Satisfação do cliente** (NPS ou nota de aceite) | Força da referência | Executivo, marketing | Ficha | N, depois F |
| **Mudanças de escopo** | Lição de estimativa | Delivery | Ficha | IA (atas) |

### D7 — Pessoas: "com quem eu falo"

| Informação | Para que serve | Perfis | Onde | Origem |
|---|---|---|---|---|
| Responsável | Contato principal | Todos | Ficha | V |
| **Papéis internos**: comercial, arquiteto, gerente de projeto | Pessoa certa para cada dúvida | Consultor, gestor | Ficha | N + IA (`pessoa` já extraída, 33 registros) |
| **Especialistas citados nos documentos** | Saber quem conhece o tema | Consultor | Ficha | IA |
| **Quem já reaproveitou** o projeto | Achar quem já passou pela mesma situação | Consultor | Ficha | **C** (eventos "usar como base") |

Nomes de pessoas são dados pessoais. Pela decisão do F2, ficam fora dos metadados enquanto houver IA externa, ou entram só como cargo ou papel.

### D8 — Reaproveitamento e conhecimento

| Informação | Para que serve | Perfis | Onde | Origem |
|---|---|---|---|---|
| **Kit disponível**: ícones de proposta, apresentação, estimativa, case e ata | "Tem o que eu preciso?" sem abrir | Consultor, executivo | **Card** | **C** (tipos dos documentos) |
| **Material reutilizável** (já marcado por documento) | Atalho para o que pode ser copiado | Consultor | Card (selo), ficha | B (`reutilizavel`) |
| **Top 3 riscos** | Preparar a proposta | Consultor, gestor | Ficha | B/IA (79 riscos já extraídos) |
| **Lições** ("faria diferente") | Evitar erros repetidos | Todos | Ficha | B/IA |
| **Perguntas e objeções do cliente**, com a resposta dada | Preparar a reunião | Gestor, consultor | Ficha | IA (11 transcrições) |
| **Premissas e fora de escopo** | Evitar prometer demais | Consultor | Ficha | IA (proposta) |
| **Vezes aberto, reaproveitado e exportado** | Sinal social: "projeto muito usado" | Todos | Card (selo), ordenação | **C** (eventos) |

### D9 — Governança e confiança

| Informação | Para que serve | Perfis | Onde | Origem |
|---|---|---|---|---|
| **Pode ser citado?** em 4 níveis: nome e logo / só nome / anonimizado ("uma grande distribuidora do Sul") / não citar | **Evitar citar um cliente indevidamente**, que é risco de reputação | Executivo, marketing | **Card** (selo), filtro | N (gestor) |
| **Descrição anonimizada pronta** para o nível "anonimizado" | Usar sem expor o cliente | Executivo | Ficha | IA |
| Confidencialidade | Permissão | Todos | Card (ícone) | V |
| **Completude da ficha** (%) e o que falta | Confiar e saber o que pedir | Todos, curador | Card (barra discreta), ficha | **C** |
| **Última atualização** e por quem | Frescor | Todos | Card, ficha | B/C (histórico) |
| **Confiança dos documentos** (rascunho, revisado, validado) | Peso da evidência | Consultor | Ficha | B (`nivel_confianca`) |
| **Pendências de revisão** | Curadoria | Curador | Ficha, visão | B |
| **Validade da informação** ("preço de 2023, reajustar") | Evitar reaproveitar número velho | Gestor | Alerta na ficha | **C** (idade da data de referência) |

### D10 — Conexões

| Informação | Para que serve | Perfis | Onde | Origem |
|---|---|---|---|---|
| Projetos parecidos, com o motivo | Ampliar referências | Todos | Ficha | B (`projeto_relacionado.motivo`) |
| **Outros projetos do mesmo cliente** | Histórico da conta | Executivo, gestor | Ficha, visão Conta | **C** |
| **Mesmo problema em outros segmentos** | Levar uma solução para outro mercado | Executivo, consultor | Ficha | **C** (com D3) |
| **Oportunidades abertas parecidas** (tabela `oportunidade` e foco) | "Use este projeto naquela proposta" | Gestor, consultor | Ficha | **C** |
| **Propostas perdidas parecidas** | Não repetir o erro | Gestor | Ficha | **C** |

---

## 3. Informações calculadas que já dá para mostrar

Estas não exigem nenhum cadastro novo e podem entrar num protótipo para as entrevistas:

| # | Informação | Como calcular |
|---|---|---|
| 1 | **Relação com o cliente** | Projetos agrupados por cliente: quantidade, primeiro e último ano, taxa de ganho e valor acumulado (com permissão) |
| 2 | **Kit disponível** | Tipos de documento do projeto, em ícones |
| 3 | **Faixa de valor** para quem não vê valores | Faixas P, M, G, GG definidas pelo gestor sobre o valor |
| 4 | **Completude** | % de campos-chave preenchidos, com a lista do que falta |
| 5 | **Atualização** | Data da última alteração (histórico) e do último documento |
| 6 | **Popularidade e reuso** | Eventos de abertura, "usar como base" e exportação dos últimos 90 dias |
| 7 | **Divergência entre documentos** | Valores e prazos diferentes extraídos de documentos do mesmo projeto |
| 8 | **Validade da informação** | Idade da data de referência acima de N meses vira o alerta "conferir antes de reaproveitar" |
| 9 | **Taxa de ganho** por segmento, problema e serviço | Status de venda agrupado |
| 10 | **Espaço em branco do cliente** | Serviços vendidos no segmento do cliente que **nunca** foram vendidos a ele: sugestão de venda adicional |
| 11 | **Ciclo de venda** | Diferença entre a data do primeiro documento e a da decisão |
| 12 | **Precisa de atenção** (para o curador) | Entregue sem case, perdida sem motivo, sem lição, completude abaixo de 50% |

## 4. Informações que a IA pode gerar a partir dos documentos

Sempre com revisão humana e com o selo "sugerido pela IA" até a aprovação:

1. **Título executivo** e **resumo em uma frase**.
2. **Resumo no formato case:** Desafio → Solução → Resultado, em até 3 linhas cada.
3. **Problema de negócio** e **área do cliente**, classificados em listas fechadas.
4. **KPIs organizados** (indicador, antes, depois), a partir das frases.
5. **Parceiros e fabricantes**, a partir das organizações extraídas.
6. **Contexto regulatório** e **maturidade do cliente**.
7. **Objeções e perguntas do cliente**, com a resposta dada, a partir das transcrições.
8. **Premissas, fora de escopo e abordagem em passos**, a partir da proposta.
9. **Versão anonimizada** da descrição, para o nível de citação "anonimizado".
10. **Motivo provável de perda**, marcado como **inferência** até alguém confirmar.

## 5. Visões além da lista de cards

O feedback falou do card, mas parte das perguntas do executivo é sobre **o conjunto**, e a lista de cards não responde. São a mesma natureza das perguntas que falharam no chat ("liste as áreas", "consolidado").

| Visão | Responde | Perfis |
|---|---|---|
| **Cards** (atual, em versão executiva ou técnica) | "Que projetos existem com esses filtros?" | Todos |
| **Tabela compacta** com colunas escolhidas e exportação | Comparar muitos de uma vez | Gestor |
| **Por cliente** (Conta 360) | "O que fizemos para esse cliente?" | Executivo, gestor |
| **Mapa do portfólio**: segmento × problema de negócio, com contagem e taxa de ganho | "Onde somos fortes? Onde há lacuna?" | Executivo |
| **Vitrine de cases citáveis** | "O que posso mostrar amanhã?" | Executivo, marketing |
| **Linha do tempo** por cliente ou segmento | "Como a relação evoluiu?" | Executivo |
| **Funil**: status da venda em colunas | "Como está o pipeline?" | Gestor |
| **Comparar** de 2 a 4 projetos lado a lado | "Qual usar como referência?" | Consultor, gestor |

**Visões salvas por perfil.** Exemplos:
- "Cases citáveis de Utilities";
- "Perdidas nos últimos 12 meses";
- "Meus projetos".

**Ordenações executivas:**
- mais recentes;
- maior resultado;
- maior valor (com permissão);
- mais reaproveitados.

## 6. Esboços (para provocar a conversa nas entrevistas)

### 6.1 Card executivo

```
┌───────────────────────────────────────────────┐
│ ● Entregue · 2025            [Citável: nome]  │
│ Redução de 18% nas perdas não técnicas        │  ← título executivo (IA)
│ Energisul Distribuidora                       │
│ Utilities / Energia · Operações · Comercial   │  ← segmento + áreas do cliente
│ Problema: perdas e fraude                     │  ← problema de negócio
│ ▲ −18% perdas em 9 meses  (validado cliente)  │  ← KPI principal + nível de prova
│ Parceiros: Azure · Databricks                 │
│ 3º projeto com o cliente · Kit: 📄📊📈⭐        │  ← relação + kit
└───────────────────────────────────────────────┘
```

### 6.2 Card do gestor (visão comercial)

```
┌───────────────────────────────────────────────┐
│ ✖ Perdida · 2026 · ciclo de 74 dias           │
│ Previsão de demanda — Rede Bom Preço          │
│ Varejo · Supply chain · Canais de venda       │
│ R$ 1,8 mi · margem 22% · preço fechado        │  ← só com verValores
│ Motivo: preço (perdemos para concorrente)     │
│ Dono: Comercial Sul · atualizado há 3 dias    │
└───────────────────────────────────────────────┘
```

### 6.3 Card técnico (consultor)

```
┌───────────────────────────────────────────────┐
│ ● Entregue · 2025 · Porte G · 9 meses         │  ← faixa de valor, não o valor
│ Plataforma de dados para perdas não técnicas  │
│ Energisul · Utilities / Energia               │
│ Databricks · Azure · Power BI   +2            │
│ Eng. de dados · Data Science                  │
│ Kit: proposta, apresentação, estimativa, case │
│ ♻ reaproveitado 4× · 2 materiais reutilizáveis│
└───────────────────────────────────────────────┘
```

### 6.4 Ficha em formato "uma página" (ordem sugerida)

1. **Cabeçalho:**
   - título executivo e título técnico;
   - cliente, segmento e áreas do cliente;
   - status da venda e fase de execução;
   - selo de citação, completude e atualização;
   - ações: Exportar, Perguntar, Usar como base, Comparar.
2. **Resumo em formato case**, em três colunas: **Desafio | Solução | Resultado**, com os KPIs e o nível de prova.
3. **Faixas recolhíveis**, abertas conforme o perfil:
   - Comercial (D5): aberta para gestor e executivo;
   - Execução (D6);
   - Solução técnica (D3): aberta para consultor;
   - Pessoas (D7);
   - Reaproveitamento (D8): kit, riscos, lições, objeções;
   - Governança (D9).
4. **Conexões** (D10): mesmo cliente, mesmo problema, oportunidades abertas parecidas, perdidas parecidas.
5. **Fontes e documentos**, e o **histórico de atividades**.

### 6.5 Conta 360 (nova página, a partir do nome do cliente)

- **Topo:**
  - segmento, porte e região;
  - nº de projetos, desde quando, taxa de ganho e valor acumulado (com permissão).
- **Linha do tempo** dos projetos e das propostas.
- **Áreas do cliente atendidas** e **espaço em branco** (serviços ainda não vendidos).
- **Cases citáveis** dessa conta.
- **Pessoas da NTT** que conhecem a conta.

## 7. Cuidados

| Risco | Cuidado |
|---|---|
| **Excesso de informação** no card | Card com no máximo 6 ou 7 linhas. O resto vai para a ficha, com faixas recolhíveis por perfil. |
| **Campos que ninguém preenche** | Toda informação **N** precisa de dono e de um momento de preenchimento: no cadastro, no fechamento da venda ou no encerramento do projeto. Senão, não entra. |
| **Informação sensível** (concorrentes, margem, desconto, NPS) | Novas regras de permissão, além de `verValores`. |
| **Citação indevida de cliente** | Sem o selo "pode ser citado", a exportação para o cliente usa a versão anonimizada por padrão. |
| **Dados pessoais** (nomes, cargos de pessoas do cliente) | Só cargo e papel. Mascaramento conforme o F2. |
| **Números da IA tratados como verdade** | Selo "sugerido pela IA" até a revisão. KPIs com nível de prova. |
| **Dois ciclos num campo só** (venda e execução) | Separar em "status da venda" e "fase de execução". É pré-requisito de várias informações de D5 e D6. |

## 8. Priorização preliminar para levar às entrevistas

Os candidatos com melhor relação entre valor e esforço, que o discovery deve confirmar ou derrubar:

| # | Informação | Dimensão | Origem | Por que é forte |
|---|---|---|---|---|
| 1 | Resultado de negócio (KPI principal + nível de prova) | D4 | IA + revisão | É a primeira pergunta do executivo. |
| 2 | Pode ser citado? (4 níveis) | D9 | N (1 campo) | Evita risco de reputação e habilita a vitrine. |
| 3 | Problema de negócio (lista fechada) | D3 | IA + revisão | Muda o card da tecnologia para o problema. |
| 4 | Segmento + áreas do cliente | D2 | B + N/IA | Já decidido (UC12). |
| 5 | Relação com o cliente + Conta 360 | D2, D10 | C | Custo zero de cadastro, muito valor para o executivo. |
| 6 | Kit disponível | D8 | C | Custo zero, decide o clique do consultor. |
| 7 | Status da venda separado da fase de execução | D5, D6 | B (ajuste) | Pré-requisito. |
| 8 | Motivo de ganho ou perda | D5 | N + IA | Aprendizado comercial. |
| 9 | Faixa de valor (P, M, G, GG) | D5 | C | Dá porte ao consultor sem expor o valor. |
| 10 | Completude e atualização | D9 | C | Confiança no dado. |
| 11 | Parceiros e fabricantes | D3 | IA | Alianças e marketing. |
| 12 | Objeções e perguntas do cliente | D8 | IA | Diferencial: hoje esse conhecimento só existe nas transcrições. |
| 13 | Mapa do portfólio (segmento × problema) | Visão | C (depois do item 3) | Responde "onde somos fortes". |
| 14 | Espaço em branco do cliente | C | C | Venda adicional. |

**Sugestão para o discovery:** montar um **protótipo navegável** com os itens 1 a 7, usando os dados atuais e valores de exemplo para os campos N. Testar com os perfis antes de criar qualquer campo novo. Assim, a entrevista mostra a tela em vez de perguntar no abstrato.

## 9. Perguntas novas para as entrevistas

1. "Se o card tivesse só **três** informações, quais seriam?" Repetir para card e ficha.
2. "Você já citou um cliente e depois descobriu que não podia?"
3. "O que conta como **resultado** para você: número do cliente, entrega no prazo, margem?"
4. "Você confia mais num número **medido pela NTT** ou **validado pelo cliente**? Faz diferença mostrar isso?"
5. "Quando um projeto é perdido, onde fica registrado o porquê hoje?"
6. "Você prefere ver projetos ou **clientes** primeiro?"
7. "Que informação você precisaria para usar o Radar **na frente do cliente**, na reunião?"
