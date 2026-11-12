# Discovery — Jornada de análise dos insights por perfil (rodada 3, parte 2)

> Demanda: **radar-propostas-cases** · Etapa: NB-01 (insumo para NB-04 — UI/UX)
> Status: **RASCUNHO, 2026-11-07.** Aguarda a revisão do PO. Nenhuma tela foi alterada.
> Base: [`NB-01-discovery-r3-bi-executivo.md`](./NB-01-discovery-r3-bi-executivo.md) (indicadores N1–N14, T1–T12 e oportunidades I1–I15).
> Objetivo: antes do protótipo, revisar o que a aba **Insights** mostra hoje e desenhar **como cada perfil percorre os dados**, da primeira olhada até a ação.

## 1. O que existe hoje na aba Insights

Implementação: `GET /api/insights` (`src/db/repo.js`, `insights()`) e `public/insights.js`. É uma página única, igual para todos. A única diferença por perfil é o valor médio, visível só para quem tem `verValores`.

| Bloco | O que mostra | Para quem serve de fato | Problema |
|---|---|---|---|
| 5 números no topo | Projetos, documentos, conversão, uploads a revisar, correções da IA | Misto | Junta indicador de negócio (conversão) com operação de curadoria (a revisar, correções). O executivo não precisa dos dois últimos. |
| Segmentos | Projetos, conversão, prazo médio, valor médio | Executivo, gestor | Conversão sem o "n" ("100%" com 1 projeto); sem valor total nem margem; sem tempo |
| Tecnologias | Uso e conversão (top 15) | Executivo técnico | Mostra o "lixo" do cadastro ("loja", "play store"); uso não é competência |
| Andam juntas | Pares de tecnologias frequentes | Técnico, oferta | Falta o mesmo para **serviços** (pacotes comerciais, I7) |
| Resultados comprovados | KPIs extraídos de cases | Executivo de negócio | Bom conteúdo, mas sem segmento nem valor em R$ (I6), e sem selo de revisão |
| Lições de perdas | Lições de propostas perdidas | Gestor, consultor | Depende da extração: o motivo de perda da P004 foi parar em "KPI" |
| Documentos | Tipos e completude média | Curador | Operacional |
| Curadoria | Termos pendentes, projetos sem fonte forte | Curador | Operacional |
| Correções | Campos corrigidos por método | Curador / produto | Operacional |

**O que já funciona:** os indicadores respeitam a confidencialidade. Clicar num segmento ou tecnologia abre **Projetos** já filtrado, e clicar num cliente abre a ficha.

**O que falta:**
1. **Uma pergunta por bloco.** Hoje são tabelas, e quem lê precisa descobrir sozinho "o que isso quer dizer".
2. **Manchete.** Não há nada que diga "o que mudou" ou "o que merece atenção".
3. **Lente por perfil.** Executivo, gestor, consultor e curador veem tudo junto.
4. **Tempo e comparação.** Não há período, tendência nem "contra o quê".
5. **Confiança.** Faltam o "n", a origem (calculado ou IA) e a data de atualização.
6. **Ação.** Do número só se chega à lista de projetos. Não dá para exportar um resumo, perguntar ao chat sobre aquele número nem abrir uma pendência de curadoria.

## 2. Perfis e o que esperam

| Perfil | Momento | Pergunta-guia | Frequência | Tempo que dá | Formato que funciona | Canal preferido (hipótese) |
|---|---|---|---|---|---|---|
| **Executivo de negócio** | Revisão mensal ou trimestral, antes de reunião com cliente | "Onde ganhamos, onde crescer, o que mostrar?" | Mensal, ou pontual antes de reunião | 2 a 5 min | Manchetes, poucos números grandes, ranking, quadrante | Resumo pronto (e-mail, Teams, agente de relatório) mais a tela |
| **Executivo técnico** | Planejamento de capacidade, parcerias e aceleradores | "Sabemos entregar o que vendemos? Onde investir?" | Mensal | 5 a 10 min | Matriz tecnologia × segmento, tendência, lista de riscos recorrentes | Tela |
| **Gestor comercial** | Revisão semanal do pipeline e antes de aprovar proposta | "O que está parado, fora do padrão ou em risco?" | Semanal | 5 min | Funil, lista de alertas acionáveis | Tela, com alertas |
| **Consultor / pré-vendas** | Ao receber uma oportunidade nova | "Estamos prontos? O que reaproveitar? Que erro não repetir?" | Por oportunidade | 10 a 20 min | Ficha de prontidão, projetos parecidos, kit | Tela e chat |
| **Curador da base** | Rotina de manutenção | "O que está sujo, faltando ou esperando revisão?" | Semanal | 10 min | Fila de pendências | Tela |

**As lentes não são permissões.** Hoje o app tem os perfis `consultor` e `gestor`, e o executivo não existe como perfil. A proposta é uma **lente de leitura** que qualquer um escolhe, com sugestão inicial pelo perfil. A **permissão continua igual**: valor e margem só com `verValores`, e confidenciais só para quem pode vê-los.

## 3. A jornada comum: Ver → Entender → Provar → Agir

Toda análise segue os mesmos quatro degraus. O que muda por perfil é **onde ela começa** e **qual ação encerra**.

| Degrau | O que a pessoa faz | Como a tela ajuda |
|---|---|---|
| **1. Ver** (manchete) | Bate o olho e decide se algo merece atenção | Até 4 frases-insight com número, comparação e "n". Ex.: "Utilities concentra 29% da carteira ganha (2 projetos)". |
| **2. Entender** (painel da lente) | Explora o recorte: segmento, prática, serviço, tecnologia, período | Cartões com uma pergunta cada e um gráfico simples; filtro global no topo; tooltip "como calculamos" |
| **3. Provar** (evidência) | Vê quais projetos sustentam o número | Clicar abre a lista filtrada, depois a ficha, depois o documento e o trecho. Isso já existe e é um diferencial: **todo número tem fonte**. |
| **4. Agir** | Leva o insight adiante | Ações por cartão: exportar resumo, perguntar ao chat com o contexto, usar como base, abrir pendência de curadoria, inscrever no resumo periódico |

```
  Manchete ──► Cartão da lente ──► Lista de projetos ──► Ficha / documento ──► Ação
  "o quê"       "por quê"            "quais"               "prova"               "e agora"
```

## 4. Jornada por perfil

### 4.1 Executivo de negócio: preparar a revisão trimestral

1. **Ver:** abre Insights na lente **Negócio**. As manchetes dizem, por exemplo:
   - "Carteira ganha: R$ 12,9 mi."
   - "Margem dos projetos curtos 5 p.p. abaixo dos longos."
   - "Seguros: 1 oportunidade nova sem entrega no segmento."
2. **Entender:**
   - Números da carteira (N1) e taxa de ganho por segmento, sempre com o "n" (N3).
   - Quadrante "ganhamos onde sabemos entregar?" (seção 5.4 do r3).
   - Pacotes campeões (I7).
3. **Provar:** clica em "Seguros" no quadrante e vê os 2 projetos, o case e o KPI de R$ 9 mi por ano.
4. **Agir:** "Exportar resumo do segmento" (uma página para a reunião) ou "Perguntar ao Radar: que case de Seguros posso citar?".

**Sucesso:** em 5 minutos, o executivo sai com 3 números e 1 case citável.

### 4.2 Executivo técnico: decidir onde investir em capacidade

1. **Ver:** lente **Técnica**. As manchetes dizem, por exemplo:
   - "3 de 7 lições citam atraso por dado legado."
   - "Kafka, RPA, ServiceNow e Snowflake sem projeto desde 2024."
   - "Proposta sai cerca de 17% acima da estimativa."
2. **Entender:**
   - Mapa tecnologia × segmento, contando só entregues (T1).
   - Riscos previstos × riscos que aconteceram (I9).
   - Capacidades esfriando (I12) e especialistas (I11).
3. **Provar:** clica na célula Azure × Utilities e vê os projetos e as lições.
4. **Agir:** exporta a lista de riscos recorrentes para a régua de estimativa, ou marca uma família de solução como "candidata a acelerador" (I15).

**Sucesso:** sai com 1 decisão de investimento ou corte, com evidência.

### 4.3 Gestor comercial: revisão semanal do pipeline

1. **Ver:** lente **Pipeline**. Manchete: "6 propostas paradas há 8 dias; 1 com margem de 2%."
2. **Entender:**
   - Funil por status, com valor (N1).
   - Lista de alertas: fora da curva (I3), parada, sem valor, sem dono (I8), "parecida com uma perdida" (I5).
3. **Provar:** abre a P018 e compara com projetos parecidos (margem de 22% a 33%).
4. **Agir:** "Avisar o dono" (fase 2; no protótipo, copia um texto pronto) ou corrige o cadastro.

**Sucesso:** a lista de alertas zera ou tem dono.

### 4.4 Consultor / pré-vendas: responder a uma oportunidade nova

1. **Ver:** lente **Pré-venda**. Escolhe a oportunidade e vê a **prontidão** (I4): "2 entregas parecidas, 1 case, 1 KPI; atenção: parecida com a P004, perdida por preço".
2. **Entender:**
   - Kit disponível (proposta, estimativa, apresentação, case).
   - Especialistas do tema (I11).
   - Faixa de prazo e valor de projetos parecidos.
3. **Provar:** abre a P004, lê a lição e o trecho da proposta.
4. **Agir:** "Usar como base" e exportar. Esse fluxo já existe.

**Sucesso:** proposta iniciada com referência e sem repetir o erro conhecido.

### 4.5 Curador: manter a base confiável

1. **Ver:** lente **Curadoria**. Manchete: "51 de 64 documentos sem revisão; 5 tecnologias suspeitas; 6 projetos de teste."
2. **Entender:**
   - Fila: termos suspeitos, cadastros incompletos, entidades de IA sem revisão, projetos de teste.
   - Correções da IA (T11).
3. **Provar e agir:** corrige, mescla o termo ou marca como teste, na própria fila.

**Sucesso:** a "saúde da base" (T10) sobe. Todas as outras lentes dependem disso.

## 5. Como apresentar

### 5.1 Estrutura da tela

```
┌────────────────────────────────────────────────────────────────────────────┐
│ Insights   [ Negócio | Técnica | Pipeline | Pré-venda | Curadoria ]        │
│ Período [12 meses ▾]  Segmento [todos ▾]  Prática [todas ▾]   Atualizado 07/11 │
├────────────────────────────────────────────────────────────────────────────┤
│ ● Utilities concentra 29% da carteira ganha · 2 projetos        ver ›      │
│ ● Projetos de até 4 meses: margem 5 p.p. abaixo dos longos · 11 ver ›      │
│ ● Seguros: oportunidade nova sem entrega no segmento            ver ›      │
├──────────────────────────┬──────────────────────────┬──────────────────────┤
│ Quanto temos?            │ Onde ganhamos?           │ Onde somos fortes?   │
│ R$ 12,9 mi ganhos        │ ▇▇▇▇▇▇ Utilities 2/2     │ (quadrante)          │
│ R$ 2,8 mi em aberto      │ ▇▇▇▇   Varejo    1/2     │  núcleo │ risco      │
│ R$ 0,7 mi perdidos       │ ...  (n ao lado)         │  ───────┼─────       │
│ [calculado]   ver ›      │ [calculado]   ver ›      │  conv.  │ aposta     │
├──────────────────────────┴──────────────────────────┴──────────────────────┤
│ O que mostrar ao cliente? Resultados com selo [IA · revisado]              │
└────────────────────────────────────────────────────────────────────────────┘
```

**Regras de cada cartão:**
- O título é **uma pergunta** do perfil.
- Um número ou gráfico principal, com **comparação** (período anterior, média da base ou meta).
- O "n" sempre visível; taxa com menos de 3 projetos aparece em cinza, com o aviso "amostra pequena".
- Selo de origem: **calculado**, **IA · sugerido** ou **IA · revisado**.
- "Como calculamos" no tooltip, e "ver ›" leva aos projetos (degrau Provar).
- Menu de ações: exportar, perguntar ao chat, inscrever no resumo.

### 5.2 Forma visual por tipo de pergunta

| Tipo de pergunta | Forma | Exemplos |
|---|---|---|
| "Quanto?" (uma grandeza) | Número grande com comparação | Carteira (N1), pipeline ponderado (N2) |
| "Quem é maior?" | Barras horizontais ordenadas, com o "n" | Taxa de ganho e margem por segmento (N3, N4), pacotes (I7) |
| "Onde se cruzam?" | Matriz de calor (uma cor, do claro ao escuro) | Tecnologia × segmento (T1), espaço em branco (N8) |
| "Como se comparam em 2 eixos?" | Quadrante (dispersão com 4 zonas nomeadas) | Ganhamos onde sabemos entregar? |
| "Como evolui?" | Linha ou barras por ano ou trimestre | Tendência tecnológica (T2), capacidades esfriando (I12) |
| "Onde a gente perde gente?" | Funil | Pipeline (N1), funil de uso do Radar (I14) |
| "O que fazer agora?" | Lista de alertas com ação | Fora da curva (I3), pipeline parado (I8), curadoria |
| "Que prova temos?" | Lista de frases com fonte | Resultados (N10, I6), lições (T5), riscos (I9) |

Sem gráfico de dois eixos, sem pizza para mais de 3 fatias e sem cores do arco-íris. As cores de status ficam reservadas para alertas.

### 5.3 Canais além da tela

| Canal | Para quem | Conteúdo |
|---|---|---|
| **Resumo periódico** (o mesmo JSON do endpoint de relatório, estendido) | Executivos | As manchetes de cada lente e o "o que mudou". Alimenta o agente do Status Report sem tela nova. |
| **Chat com contexto** | Todos | "Explique este número", "quais projetos formam esta taxa?". O chat já responde perguntas agregadas, que são cerca de 20% das perguntas sobre a base. |
| **Exportar uma página** | Executivo de negócio, consultor | Resumo do segmento ou da oportunidade para levar à reunião |

## 6. Onde cada indicador mora

| Lente | Manchetes candidatas | Cartões |
|---|---|---|
| **Negócio** | Carteira e variação; segmento que mais cresce; oportunidade sem prova | N1, N3, N4, N6, N9, N10, I2, I6, I7, quadrante |
| **Técnica** | Riscos recorrentes; capacidades esfriando; precisão de estimativa | T1, T2, T3, T5, T6, I9, I10, I11, I12, I13 |
| **Pipeline** | Propostas paradas; fora da curva | N1 (funil), N2, I1, I3, I5, I8 |
| **Pré-venda** | Prontidão da oportunidade escolhida | I4, I5, kit, especialistas (I11), faixas de prazo e valor |
| **Curadoria** | Saúde da base; fila de pendências | T10, T11, termos suspeitos, registros de teste |
| **Transversal** (rodapé de todas) | — | I14 (uso do Radar), I15 (candidatos a oferta), T9 (o que procuram e não acham) |

### O que acontece com os blocos atuais

| Bloco atual | Destino |
|---|---|
| Números do topo | Divididos: conversão vai para Negócio; "a revisar" e correções vão para Curadoria |
| Segmentos | Negócio, com o "n", valor total e margem (com permissão) |
| Tecnologias | Técnica, contando só entregues e com o lixo filtrado |
| Andam juntas | Técnica (tecnologias) e Negócio (serviços, I7) |
| Resultados comprovados | Negócio, com segmento, R$ e selo de revisão |
| Lições de perdas | Pipeline e Pré-venda |
| Documentos, Curadoria, Correções | Curadoria |

## 7. Regras transversais

1. **Permissão:** valor e margem só com `verValores`. Agregados de valor só aparecem com 3 ou mais projetos visíveis.
2. **Registros de teste fora:** precisa de um sinal "teste" no cadastro, ou de uma limpeza antes.
3. **Taxonomia fechada** para área, tecnologia e serviço. Termos novos vão para a fila do curador, como já acontece hoje (`pendente_curadoria`).
4. **Selos de origem e data de atualização** em todo cartão.
5. **Manchetes geradas por regra, não por IA livre.** São modelos de frase preenchidos com números calculados. A IA, se usada, só reescreve o texto e nunca inventa número.
6. **Mobile:** manchetes e cartões empilhados, com a lente num seletor.

## 8. Proposta para o protótipo

- **Fase A (dados atuais, só indicadores calculáveis):**
  - lentes **Negócio** e **Técnica**;
  - faixa de manchetes;
  - de 5 a 6 cartões por lente;
  - degrau "Provar" reaproveitando o filtro de Projetos que já existe.
  - Cobre I2, I3, I7, I12, I13, N1, N3, N4, T1, T2, T3 e o quadrante.
- **Fase B:** lentes Pipeline e Curadoria (alertas I3, I8 e a fila de limpeza), mais o resumo periódico no endpoint de relatório.
- **Fase C:** lente Pré-venda (prontidão I4, I5) e os cartões de IA com revisão (I6, I9).

Cada fase passa pelas entrevistas da rodada 2: o executivo usa o protótipo em vez de responder perguntas abstratas.

## 9. Questões para o PO

1. As **5 lentes** fazem sentido, ou Pipeline e Pré-venda ficam dentro de Negócio para começar mais simples?
2. A lente inicial vem do perfil (consultor → Pré-venda, gestor → Negócio)? Ou criamos um perfil **executivo**?
3. O protótipo substitui a aba Insights atual ou fica ao lado ("Insights (novo)") durante os testes?
4. Limpamos os cadastros de teste da produção (com backup) antes do protótipo, ou só os escondemos com um sinal "teste"?
5. O resumo periódico para executivos entra na fase A, aproveitando o endpoint já publicado?

## 10. Decisões do PO (2026-11-07) e protótipo

Respostas do PO às questões da seção 9:

1. **5 lentes.**
2. Lente inicial pelo perfil (consultor → Pré-venda, gestor → Negócio), sem perfil novo. Não houve resposta explícita: foi adotado o padrão sugerido.
3. **Aba nova** "Insights (novo)", ao lado da aba atual.
4. **Esconder** os testes (marca "teste", sem apagar).
5. **Resumo periódico na fase A**, pelo endpoint de relatório.

O protótipo, implementado em `radar-v0`, cobre as 5 lentes de uma vez, só com indicadores calculáveis e os de IA com selo:

- `src/painel.js`: cálculo das lentes, manchetes por regra, prontidão e curadoria.
- `GET /api/painel`: filtros de segmento, prática e ano.
- `POST /api/projeto/teste`: marcar e desmarcar teste, só o gestor.
- `GET /api/relatorio/insights`: resumo para agentes, com a mesma chave do relatório de qualidade.
  - Sem valores por padrão; `RADAR_RELATORIO_VALORES=1` inclui valores.
- `public/painel.js`: aba nova.

**Ajuste do desenho:** o quadrante virou uma **grade 2 × 2 com os segmentos listados em cada zona**. Com poucos dados, os pontos de um gráfico de dispersão se sobrepunham.
