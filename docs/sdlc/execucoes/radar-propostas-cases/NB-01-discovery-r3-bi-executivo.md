# Discovery — BI para executivos com a base do Radar (rodada 3)

> Demanda: **radar-propostas-cases** · Etapa: NB-01 — Ideação & Discovery (rodada focada, iterativa)
> Status: **RASCUNHO, 2026-11-07.** Aguarda a revisão do PO. Nenhuma tela foi criada ou alterada.
> Origem: pedido do PO ("numa perspectiva de BI, quais informações têm mais relevância e geram mais insights para executivos? O que muda entre um executivo técnico e um de negócio?") e o uso da base por agentes de relatório (endpoint `GET /api/relatorio/qualidade`).
> Relação com a rodada 2: o [catálogo de informações](./NB-01-discovery-r2-catalogo-informacoes-projeto.md) trata do **projeto individual** (card e ficha). Esta rodada trata do **conjunto**: indicadores, tendências e comparações que só aparecem quando se agrega a base. As duas se completam; a seção 5 da rodada 2 ("Visões além da lista de cards") é o ponto de contato.

## 1. Pergunta do discovery

> Com os dados que o Radar **já guarda**, que indicadores ajudam um executivo a decidir, e o que precisa ser diferente para o executivo **de negócio** e para o executivo **técnico**?

Restrição: **priorizar o que é calculável hoje**. Campos novos só entram se um indicador de alto valor depender deles, e com dono e momento de preenchimento definidos.

## 2. O que a base já tem para BI

### 2.1 Fontes

| Fonte | Onde | O que serve para BI |
|---|---|---|
| **Projetos** | `projeto`, `cliente`, `segmento`, `projeto_tecnologia`, `projeto_servico` | Status da proposta (8 estados), valor, margem, prazo, data de referência, segmento, prática NTT ("área"), dono, confidencialidade, tecnologias, serviços |
| **Documentos** | `documento` | Tipo (proposta, estimativa, apresentação, case, transcrição, ata), nível de confiança 1–5, revisado ou não, reutilizável, PII, valor e prazo **por documento** |
| **Entidades extraídas** | `documento_entidade` | KPIs de resultado, riscos, lições, organizações (clientes, parceiros), pessoas, valores e prazos citados |
| **Similaridade** | `projeto_relacionado` | Grupos de projetos parecidos (famílias de solução) |
| **Ingestão** | `processamento`, `correcao_metadado` | Volume de uploads, erros, tempo, e **quanto a IA errou** na sugestão de metadados (campo, sugerido × final) |
| **Histórico** | `historico_alteracao` | Atualização das fichas, quem mantém a base |
| **Novas oportunidades** | `oportunidades.json` | Demanda entrando (segmento, serviços, tecnologias, prazo) |
| **Uso da busca e do chat** | `auditoria/turnos.jsonl` | Pergunta, intenção, segmentos/serviços/tecnologias citados, **"sem evidência"** (não achou nada), projetos retornados, tempo de resposta |
| **Eventos de uso** | `auditoria/eventos.jsonl` | Abrir detalhe, abrir fonte, baixar, exportar proposta, "usar como base" (reaproveitar), feedbacks |
| **Qualidade do produto** | `qualidade.json` | Tickets (tipo, área, prioridade, situação) e execução do roteiro de testes por versão |

### 2.2 Volume do piloto (dados fictícios, ambiente local)

11 projetos de 11 clientes em 8 segmentos (2024–2026), 51 documentos, 867 entidades extraídas, 15 tecnologias e 11 serviços.

**Cuidado:** com 11 projetos, qualquer taxa (ganho, margem por segmento) é **ilustrativa**. O discovery valida **quais perguntas** importam. Os números ganham significado com a base real.

**Base de produção (leitura autorizada pelo PO em 2026-11-07):**
- 19 projetos de 16 clientes: os 11 do piloto mais 8 cadastrados pelo time, todos "Em elaboração".
- 64 documentos, 961 entidades e 32 uploads.
- 55 turnos de chat e 159 eventos de uso entre 30/10 e 07/11, em 7 dias ativos.

O uso é do **time testando**, guiado pelo roteiro de testes. Ele mostra o comportamento dos usuários, mas a demanda é enviesada pelos cenários. O que ele já revela está na seção 5.3.

## 3. Executivo de negócio × executivo técnico

| | **Executivo de negócio / comercial** | **Executivo técnico** (diretor de prática, CTO de delivery, arquitetura) |
|---|---|---|
| **Pergunta de fundo** | Onde ganhamos dinheiro, onde crescer e que conta atacar? | Temos capacidade para entregar o que vendemos, com qualidade e reaproveitamento? |
| **Unidade de análise** | Cliente, segmento, oferta (serviço), carteira | Prática, tecnologia, família de solução, equipe |
| **Métrica-norte** | Valor ganho, taxa de ganho, margem | Precisão de estimativa, prazo cumprido, reuso, riscos recorrentes |
| **Horizonte** | Trimestre e pipeline futuro | Portfólio de capacidades e próximos 12 meses de tecnologia |
| **Uso do resultado** | Reunião com cliente, revisão de pipeline, metas | Investimento em capacitação, aceleradores, parcerias, padrões de arquitetura |
| **Formato preferido** | Poucos números grandes, ranking, "o que mudou" | Matrizes (tecnologia × segmento), distribuição, causas |
| **Risco de interpretação** | Ler valor de proposta como receita | Ler frequência de tecnologia como competência |
| **Sensibilidade** | Valor, margem, concorrentes (só com `verValores`) | Menos sensível; lições podem expor clientes |

Ponto em comum: os dois perguntam **"onde somos fortes?"**. O de negócio quer saber onde **vendemos**; o técnico, onde **sabemos entregar**. O cruzamento das duas visões é o insight mais forte (seção 5.4).

## 4. Catálogo de indicadores

Origem: **C** = calculável hoje · **IA** = extraído dos documentos, com revisão · **N** = campo novo · **F** = integração futura (CRM, horas, financeiro).

### 4.1 Executivo de negócio

| # | Indicador | Pergunta que responde | Cálculo | Origem |
|---|---|---|---|---|
| N1 | **Carteira ganha e pipeline aberto** | Quanto temos fechado e quanto está em jogo? | Soma de valor por grupo de status: ganho (Vendida, Em execução, Entregue), aberto (Em elaboração, Enviada, Em negociação), perdido | C |
| N2 | **Pipeline ponderado** | Quanto do aberto deve virar receita? | Valor × probabilidade por estágio (tabela do gestor) | C + parâmetro |
| N3 | **Taxa de ganho** por segmento, prática, serviço e faixa de valor | Onde ganhamos mais? | Ganhas ÷ (ganhas + perdidas) | C |
| N4 | **Margem ponderada** por segmento, prática e serviço | Onde ganhamos melhor? | Σ(valor × margem) ÷ Σ valor | C (com permissão) |
| N5 | **Ticket médio e porte** | Que tamanho de projeto fazemos? | Média e distribuição de valor e prazo | C |
| N6 | **Concentração da carteira** | Dependemos de poucos clientes ou segmentos? | % do valor nos 3 maiores; índice de concentração | C |
| N7 | **Relação com o cliente** | Quem é recorrente, quem esfriou? | Projetos por cliente, primeiro e último ano, valor acumulado | C |
| N8 | **Espaço em branco** | O que podemos vender a mais para quem já é cliente? | Serviços vendidos no segmento e nunca vendidos ao cliente | C |
| N9 | **Cobertura de prova (cases)** | Temos case para mostrar em cada segmento e oferta? | Entregues com documento `case_sucesso` ÷ entregues, por segmento | C |
| N10 | **Resultados citáveis** | Que números de impacto posso usar? | KPIs extraídos (antes → depois), por segmento | IA |
| N11 | **Demanda × portfólio** | O mercado pede o que temos? | Novas oportunidades e perguntas do chat por segmento e serviço × projetos ganhos no mesmo recorte | C |
| N12 | **Motivos de perda** | Por que perdemos? | Texto das lições e do case das perdidas, classificado | IA, depois N |
| N13 | **Ciclo de venda** | Quanto tempo leva para fechar? | Data da decisão − data do primeiro documento | N (datas de envio e decisão) |
| N14 | **Previsto × realizado** (valor) | O valor vendido virou receita? | — | F (financeiro) |

### 4.2 Executivo técnico

| # | Indicador | Pergunta que responde | Cálculo | Origem |
|---|---|---|---|---|
| T1 | **Mapa de capacidades** | Onde temos profundidade? | Matriz tecnologia × segmento e serviço × prática, com nº de projetos **entregues** | C |
| T2 | **Tendência tecnológica** | O que está crescendo ou sumindo? | Tecnologias e serviços por ano de referência | C |
| T3 | **Precisão de estimativa** | Nossas estimativas se sustentam? | Valor e prazo da `estimativa_preliminar` × `proposta_comercial` do mesmo projeto | C |
| T4 | **Desvio de prazo na execução** | Entregamos no prazo previsto? | Prazos citados nas lições e nos cases × prazo da proposta | IA, depois N |
| T5 | **Riscos e lições recorrentes** | Que problema se repete entre projetos? | Entidades `risco` e `licao` agrupadas por tema | IA |
| T6 | **Famílias de solução** | Que soluções viram produto ou acelerador? | Grupos de `projeto_relacionado` com alta similaridade e mais de N entregas | C |
| T7 | **Parceiros e fabricantes** | Com quem mais entregamos? | Tecnologias de nuvem e plataformas, e organizações extraídas | C + IA |
| T8 | **Reuso do conhecimento** | A base é usada para montar propostas? | Eventos "usar como base", exportar, baixar, abrir fonte; projetos mais e menos consultados | C |
| T9 | **Lacunas de conhecimento** | O que o time procura e não acha? | Turnos com `semEvidencia`, por segmento, serviço e tecnologia | C |
| T10 | **Saúde da base** | Dá para confiar nos números? | Completude das fichas, % de documentos revisados, confiança média, idade da informação | C |
| T11 | **Acerto da IA na ingestão** | A IA está classificando bem? | `correcao_metadado`: % de campos corrigidos, por campo | C |
| T12 | **Qualidade do produto Radar** | O Radar está estável? | Tickets abertos por prioridade, roteiro executado, falhas por área | C (já no endpoint de relatório) |

### 4.3 Comum aos dois

- **Painel do portfólio:** números da carteira (N1), mapa de capacidades (T1) e cobertura de cases (N9) numa só página.
- **"O que mudou"** desde a última visita: projetos novos, status alterados, cases e lições novas.
- **Filtro de permissão:** os indicadores de valor e margem obedecem a `verValores`. Projetos confidenciais só entram nos agregados de quem pode vê-los.

## 5. O que os dados do piloto já mostram (exemplos para provocar as entrevistas)

> Dados fictícios. Servem para mostrar o **tipo** de insight, não para decidir.

### 5.1 Negócio

- **Carteira:** cerca de R$ 12,9 mi ganhos (8 projetos), R$ 2,75 mi em aberto (2) e R$ 0,72 mi perdidos (1).
- **Concentração por prática:** "Data & Analytics" tem 6 dos 11 projetos e R$ 9,5 mi. Utilities/Energia é o maior segmento (3 projetos, R$ 5,9 mi).
- **Margem:** Serviços Financeiros tem a maior margem ponderada (33%) e Logística a menor (24%). A única perdida tinha a margem mais baixa (22%) e foi perdida por preço.
- **Relação com o cliente:** nenhum cliente tem mais de um projeto. Na base real, isso diria "não há recorrência", um alerta comercial. No piloto, é limitação da amostra.
- **Cobertura de cases:** os 6 entregues têm case. Os 2 em execução ou vendidos ainda não têm, e isso pode virar lembrete no encerramento.
- **Demanda × portfólio:** as duas novas oportunidades são de Utilities (onde temos 3 projetos, 1 entregue com case) e de Seguros com IA Generativa (onde temos 1 projeto vendido, ainda sem entrega nem case). A segunda é a de maior risco: vamos propor sem prova no segmento.

### 5.2 Técnico

- **Estimativa × proposta:** a proposta sai, em média, cerca de 17% acima da estimativa preliminar em valor. Em 5 de 11 projetos, o prazo também cresceu de 1 a 2 meses entre estimativa e proposta.
- **Lições recorrentes:** 3 de 7 lições falam de **atraso causado por sistema ou dado legado**: saneamento de cadastro (+2 meses), CRM legado (+1 mês) e rotinas sem documentação (+1 mês). É um padrão de risco para colocar na estimativa.
- **Tendência:** IA Generativa só aparece em 2026 (2 projetos). Azure cresce (2 em 2025 → 3 em 2026).
- **Parceiros:** Azure em 5 projetos, Databricks em 3, AWS em 2 e GCP em 1.
- **Saúde da base:** nenhum dos 51 documentos foi revisado por uma pessoa e nenhum está marcado como reutilizável. Para BI, isso significa que todo número vem de extração automática sem revisão.
- **Qualidade da extração:** o motivo de perda da P004 ("concorrente com preço 30% menor") foi extraído como **KPI**, não como motivo de perda. Antes de virar indicador, a classificação de entidades precisa de revisão.

### 5.3 O que a base de produção mostra (uso do time em teste)

- **O time já faz perguntas de BI no chat.**
  - Exemplos: "Quais segmentos já atendemos?" (2 vezes), "principais empresas de energia", "desses, quantos são entregues", "faça um consolidado de todos os projetos" (2 vezes), "liste os projetos entregues em 2025".
  - São cerca de 9 das 47 perguntas sobre a base, perto de 20%. Um dos "consolidados" ficou **sem resposta**.
  - É evidência direta da demanda por visão agregada (H6 da rodada 2, HB6 desta).
- **Demanda × portfólio (N11, T9).**
  - Governança de Dados é citada em 7 perguntas, mas só 2 projetos do portfólio têm esse serviço.
  - Utilities (10 citações) e Seguros (9) concentram o interesse.
  - Pelo roteiro, isso pode ser efeito dos cenários. O tipo de sinal é exatamente o que o executivo quer ver com dados reais.
- **Reuso concentrado (T8).**
  - 26 "usar como base", dos quais 19 em 3 projetos (P006, P005 e P014).
  - P001 é o mais aberto (10 vezes) e o que mais aparece no topo das buscas (22 vezes).
  - Na base real, isso aponta os candidatos a acelerador e os cases "estrela".
- **Perguntas sem resposta (11 de 55).**
  - 8 são sobre o próprio sistema ("o que posso perguntar?", "me explique o sistema"). É lacuna de orientação, não de conteúdo.
  - As outras 3 são "projetos confidenciais", "consolidado" e "KPIs do Radar".
- **Qualidade do cadastro (T10).** Os cadastros manuais trouxeram ruído que distorce qualquer painel:
  - 6 de 19 projetos sem área e sem data;
  - a mesma prática escrita de dois jeitos ("Dados e IA" × "Data & Analytics");
  - uma área com texto livre de data ("Dados e IA a data é para 15/07/2027");
  - uma tecnologia "ficha";
  - 6 projetos sem valor.

  Antes do BI, a área precisa de **lista fechada** e o cadastro precisa de campos obrigatórios mínimos.
- **Recorrência aparente.** 3 clientes aparecem com 2 projetos (ConectaFibra, Energisul, Segura Mais), mas o segundo projeto de cada um é **cadastro de teste** ("Teste", "TESTE X", texto aleatório). Sem uma marca de "teste" ou uma limpeza, o painel mostraria recorrência falsa. É mais um motivo para tratar a qualidade do cadastro antes do BI.
- **Revisão humana.** Só 13 de 64 documentos foram revisados, quase todos fichas de cadastro. Propostas, estimativas e transcrições seguem sem revisão.
- **Tempo de resposta do chat:** mediana de cerca de 5 s e p90 de cerca de 6 s, aceitável para consultas executivas.

### 5.4 O cruzamento das duas visões

**Ganhamos onde sabemos entregar?** Num quadrante, o eixo comercial (taxa de ganho e margem) cruza com o eixo técnico (nº de entregas e cases):

| | Muita entrega e case | Pouca entrega |
|---|---|---|
| **Ganha bem** | Núcleo: defender e virar acelerador | Risco de entrega: vendendo além da capacidade |
| **Ganha pouco** | Problema comercial: temos prova e não convertemos | Fora de foco ou aposta: decidir investir ou sair |

Esse quadro conversa com os dois executivos ao mesmo tempo e só existe porque o Radar junta proposta, entrega e conhecimento na mesma base.

## 6. Lacunas que limitam o BI

| Lacuna | Indicador afetado | Proposta | Origem |
|---|---|---|---|
| Status da venda e fase de execução no mesmo campo | N1, N3, T4 | Separar (já levantado na rodada 2) | Ajuste |
| Sem datas de envio e de decisão | N13, tendências por trimestre | 2 datas no cadastro | N |
| Motivo de perda solto no texto | N12 | Lista fechada no status "Perdida", pré-preenchida pela IA | N + IA |
| Valor da proposta ≠ receita realizada | N1, N14 | Rotular como "valor proposto" até integrar o financeiro | F |
| Sem ligação entre oportunidade e projeto | N11, conversão | Campo "virou o projeto X" | N |
| Entidades sem revisão | N10, T4, T5 | Fila de revisão do curador com o selo "sugerido pela IA" | Processo |
| Porte e região do cliente | Segmentação | Cadastro do cliente | N |
| Base pequena | Todos | Mostrar o "n" ao lado de toda taxa e esconder taxas com menos de 3 projetos | Regra de exibição |

## 7. Cuidados

- **Agregado também vaza.** A soma de um segmento com 1 projeto confidencial revela o valor dele. Agregados de valor só aparecem com pelo menos 3 projetos visíveis para o usuário.
- **Correlação não é competência.** "Usamos Python em 7 projetos" não diz que somos referência. Prefira entregues com case e KPI.
- **Taxa sem denominador engana.** Toda taxa mostra o "n" (ex.: "100% · 1 de 1").
- **A IA não decide número de executivo.** Indicadores de origem IA aparecem com o selo e o nível de revisão.
- **Custo de manutenção.** Cada campo N precisa de dono e de um momento de preenchimento. Senão, o painel apodrece e a confiança cai junto.

## 8. Hipóteses a validar

- **HB1:** o executivo de negócio olha primeiro **carteira, taxa de ganho e margem por segmento** (N1, N3, N4).
- **HB2:** o executivo técnico olha primeiro o **mapa de capacidades** e os **riscos recorrentes** (T1, T5).
- **HB3:** o quadrante "ganhamos onde sabemos entregar?" (5.4) é útil para os **dois** e justifica uma página comum.
- **HB4:** "o que o time procura e não acha" (T9) é visto como insight de mercado pelo de negócio, e não só como métrica técnica.
- **HB5:** sem um sinal de revisão e de "n", os executivos não confiam nos indicadores de origem IA.
- **HB6:** o executivo prefere receber o painel **pronto** (relatório periódico, Teams, agente) a navegar numa tela de BI.

## 9. Como validar (encaixe na rodada 2)

1. **Entrevistas da rodada 2:** acrescentar 3 perguntas para os executivos:
   - "Que 3 números você quer ver toda segunda-feira?"
   - "Que decisão você tomou no último trimestre sem ter o dado?"
   - "Você prefere abrir um painel ou receber um resumo?"
2. **Card sorting de indicadores:** cada executivo escolhe 5 indicadores das tabelas 4.1 e 4.2.
3. **Protótipo de painel** com os dados do piloto, com 2 abas (Negócio e Técnica) e o quadrante 5.4, só com indicadores **C**. Assim a conversa é sobre a tela, não sobre o abstrato.
4. **Perfil da base de produção:** feito em 2026-11-07 (seção 5.3). Refazer depois do uso real, fora do roteiro de testes.
5. **Síntese:** indicadores priorizados por perfil (MoSCoW), definição de cada um (fórmula, origem, permissão) e decisão do formato (tela, relatório ou endpoint para agentes).

## 10. Questões para o PO

1. Quem são os executivos de negócio e técnicos para as entrevistas? São os mesmos da rodada 2?
2. O painel é **tela no Radar**, **relatório periódico** (ex.: alimentado pelo agente do Status Report) ou os dois?
3. Valor e margem agregados podem aparecer para executivos sem `verValores`, só em faixas?
4. Os cadastros manuais têm ruído (área em texto livre, campos vazios). Fechamos a lista de áreas e os campos obrigatórios antes do painel?
5. Entram nesta rodada os indicadores que dependem de campo novo (N13, N12), ou só os calculáveis?

## 11. Quinze novas oportunidades de insight (ideação, 2026-11-07)

> Complementam o catálogo da seção 4 e não repetem N1–N14 nem T1–T12. Cada uma tem a **evidência na base de produção** (dados do piloto mais o uso do time em teste), a **decisão que habilita** e a origem: **C** = calculável hoje, **IA** = extraído com revisão, **N** = campo novo.
> Números ilustrativos: a base é pequena e fictícia. Nenhuma oportunidade foi implementada.

### Negócio

| # | Oportunidade | Justificativa (evidência na base) | Decisão que habilita | Origem |
|---|---|---|---|---|
| I1 | **Prêmio de preço × resultado**: quanto a proposta sobe em relação à estimativa preliminar, cruzado com ganho ou perda | A proposta sai cerca de 17% acima da estimativa em **todos** os 11 projetos, um markup fixo. A única perda foi por preço, contra um concorrente 30% mais barato. | Onde há espaço para cobrar mais e onde o preço nos tira da disputa | C |
| I2 | **Margem por duração e porte** | Projetos de 7 meses ou mais têm margem ponderada de cerca de 32%; os de até 4 meses, cerca de 27%. É contraintuitivo: projetos pequenos parecem render menos. | Política de preço mínimo e foco em contratos maiores | C |
| I3 | **Proposta fora da curva**: alerta quando valor, margem ou prazo fogem do histórico do segmento ou serviço | A P018, em elaboração, tem margem de **2%**. O histórico vai de 22% a 33%. Hoje nada avisa. | Revisão antes de enviar; guarda-corpo de margem | C |
| I4 | **Prontidão da candidatura** por oportunidade nova: projetos parecidos entregues, com case e com KPI | A oportunidade de Seguros com IA Generativa não tem nenhum projeto entregue no segmento; a de Utilities tem 1 entregue, com case e com KPI de R$ 18 mi. | Ir ou não ir; reforçar a proposta com parceiro ou piloto | C + IA |
| I5 | **"Parecida com uma perdida"**: alerta quando uma oportunidade se parece com uma proposta perdida, com o motivo e a lição | A lição da P004 (perdida) diz: "oferecer uma fase 1 menor para competir em preço". Esse conhecimento se perde se ninguém lembrar dela. | Mudar a estratégia antes de repetir o erro | C (similaridade) + IA |
| I6 | **Impacto entregue ao cliente (ROI do cliente)**: soma dos ganhos em R$ dos KPIs por segmento | P001 e P006 citam R$ 18 mi e R$ 9 mi por ano de ganho, contra R$ 4,3 mi de contrato: cerca de 6 vezes o valor investido. | Narrativa executiva ("cada real gerou X") e prova por segmento | IA + revisão |
| I7 | **Pacotes campeões**: combinações de serviços mais vendidas e o ticket médio de cada uma | Engenharia de Dados + Analytics & BI aparecem juntos em 7 projetos, com R$ 1,86 mi médios. Projetos com 1 ou 2 serviços valem bem menos. | Montar ofertas combinadas e metas de venda adicional | C |
| I8 | **Saúde do pipeline**: propostas paradas, incompletas e sem dono | 6 das 8 propostas "Em elaboração" estão sem valor e sem margem, e sem alteração desde 30/10. | Cobrança do gestor; limpeza do funil; previsão confiável | C |

### Técnico

| # | Oportunidade | Justificativa (evidência na base) | Decisão que habilita | Origem |
|---|---|---|---|---|
| I9 | **Riscos previstos × riscos que aconteceram** | A proposta da P001 listava "qualidade do cadastro comercial" como risco. O case mostra que ele aconteceu e custou +2 meses. O risco era conhecido e não foi precificado. | Contingência na estimativa para riscos que costumam acontecer | IA |
| I10 | **O que realmente explica o prazo** | O número de tecnologias e serviços não explica o prazo: a P004 tem 6 itens e 3 meses; a P005, 7 itens e 8 meses. As lições apontam legado e saneamento de dados. | Trocar a régua de estimativa: perguntar por legado e qualidade dos dados no discovery | C + IA |
| I11 | **Mapa de especialistas e ponto único de conhecimento** | 4 donos concentram os 11 projetos do piloto. Customer Experience depende de uma pessoa só. | Quem chamar para cada tema; plano de sucessão e mentoria | C |
| I12 | **Capacidades esfriando**: tecnologias e serviços sem projeto há mais de 18 meses | Kafka, RPA, ServiceNow e Snowflake não aparecem desde 2024. | Reciclar o time ou deixar de ofertar; alinhar com parceiros | C |

### Negócio e técnico

| # | Oportunidade | Justificativa (evidência na base) | Decisão que habilita | Origem |
|---|---|---|---|---|
| I13 | **Rentabilidade por plataforma**: margem média por tecnologia ou parceiro | Azure tem cerca de 30% de margem ponderada; Salesforce, cerca de 24%. | Onde investir em parceria e certificação; preço por plataforma | C |
| I14 | **Funil de uso do Radar**: buscar → abrir → usar como base → exportar | 55 perguntas → 39 aberturas → 26 "usar como base" → 6 exportações. O maior gargalo está no fim: quase ninguém leva a proposta até o documento. | Melhorar a exportação; medir o tempo de pré-venda economizado (o ROI do próprio Radar) | C |
| I15 | **Candidatos a oferta empacotada ou acelerador**: alta demanda no chat + reuso + case entregue | Governança de Dados tem 7 citações no chat e poucos projetos. P006, P005 e P014 concentram 19 dos 26 reaproveitamentos. | O que transformar em produto, acelerador ou material padrão | C |

### Observações

- **Base suja distorce insight.** As tecnologias "loja", "play store", "release notes" e "ficha", e os clientes de teste, viriam de cadastros manuais. As oportunidades I11, I12 e I13 dependem de **taxonomia fechada** e de excluir registros de teste.
- **Prioridade sugerida para o protótipo** (só origem C, maior valor percebido): I3, I8, I7, I2, I14 e I12. As oportunidades com IA (I4, I6, I9) entram depois da fila de revisão do curador.
