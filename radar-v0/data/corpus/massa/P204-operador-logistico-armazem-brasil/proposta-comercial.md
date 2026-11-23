---
projeto_id: P204
cliente: Operador Logístico Armazém Brasil
titulo: Streaming de dados em tempo real para operação logística com Databricks e Kafka
segmento: Logística
tecnologias: ["Databricks","Kafka"]
servicos: ["Analytics & BI","Engenharia de Dados"]
area: Data & Analytics
dono: Zilda Correia
confidencialidade: confidencial
status_proposta: Em execução
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P204
id: P204-PROP
tipo_documental: proposta_comercial
status_documento: final_aprovada
data: 2026-01-06
prazo_meses: 7
valor: 1390000
margem: 0.26
---

# Proposta Comercial — Streaming de dados em tempo real para operação logística com Databricks e Kafka

**Cliente:** Operador Logístico Armazém Brasil
**Segmento:** Logística
**Área responsável:** Data & Analytics · **Dono da proposta:** Zilda Correia
**Data:** 2026-01-06 · **Versão:** final

## 1. Contexto e desafio

O Operador Logístico Armazém Brasil acompanha a movimentação de 1,2 milhão de volumes por mês em 9 centros de distribuição, mas os relatórios de estoque e expedição chegam com até 6 horas de atraso, gerando rupturas e retrabalho de separação em cerca de 8% dos pedidos. A operação também não consegue reagir a desvios de rota e atrasos de doca em tempo hábil, o que pressiona o SLA contratado com os embarcadores.

## 2. Objetivo

Implantar uma plataforma de dados em tempo real com ingestão via Kafka e processamento no Databricks, reduzindo a latência de visibilidade operacional de horas para menos de 5 minutos e habilitando painéis de acompanhamento contínuo da cadeia logística.

## 3. Escopo da solução

- Ingestão de eventos de WMS, TMS e rastreadores de frota em tópicos Kafka, com 14 fluxos e volume estimado de 2.500 eventos por segundo no pico
- Construção de pipelines de streaming no Databricks (Delta Live Tables) em camadas bronze, prata e ouro, com regras de deduplicação e tratamento de eventos fora de ordem
- Modelagem de indicadores operacionais em near real time: ocupação de doca, acuracidade de estoque, tempo de ciclo de separação e aderência de janelas de entrega
- Integração dos dados tratados ao Databricks SQL e ao conector de BI corporativo, com 6 dashboards operacionais e alertas automáticos por limiar
- Implementação de monitoramento de pipelines, contratos de dados e política de retenção e qualidade sobre os tópicos Kafka e tabelas Delta

Tecnologias principais: Databricks, Kafka.

## 4. Abordagem e cronograma

O projeto será executado em 7 meses, nas seguintes fases:

- Discovery e arquitetura de streaming (6 semanas)
- Construção dos pipelines Kafka–Databricks e camadas bronze/prata (12 semanas)
- Camada ouro, dashboards e alertas operacionais (8 semanas)
- Homologação, go-live e transferência de conhecimento (4 semanas)

## 5. Entregáveis

- Ambiente Databricks provisionado com 3 workspaces (dev, homologação e produção) e governança via Unity Catalog
- 14 pipelines de streaming Kafka–Databricks em produção, com SLA de latência inferior a 5 minutos
- 6 dashboards operacionais de acompanhamento de doca, estoque e entregas, publicados para 120 usuários
- Catálogo de dados com 85 campos críticos documentados e regras de qualidade automatizadas
- Runbook operacional, plano de sustentação e treinamento de 20 analistas e engenheiros do cliente

## 6. Equipe proposta

1 arquiteto de dados, 3 engenheiros de dados, 1 analista de BI e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Latência e indisponibilidade dos sistemas de origem (WMS e TMS) comprometendo a ingestão contínua
- Risco: Qualidade e padronização dos eventos de rastreamento de frota enviados por operadores terceiros
- Risco: Capacidade do cluster Databricks durante picos sazonais de volume logístico

## 8. Investimento

Investimento total: R$ 1.390.000, em parcelas mensais ao longo de 7 meses.

Margem praticada: 26%.
