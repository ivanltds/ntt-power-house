---
projeto_id: P183
cliente: Banco Horizonte Sul
titulo: Pipeline de dados em tempo real para análise de risco e crédito com Azure e Python
segmento: Serviços Financeiros
tecnologias: ["Python","Azure"]
servicos: ["Engenharia de Dados","Analytics & BI"]
area: Data & Analytics
dono: Úrsula Campos
confidencialidade: interna
status_proposta: Entregue
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P183
id: P183-PROP
tipo_documental: proposta_comercial
status_documento: final_aprovada
data: 2024-06-23
prazo_meses: 6
valor: 660000
margem: 0.29
---

# Proposta Comercial — Pipeline de dados em tempo real para análise de risco e crédito com Azure e Python

**Cliente:** Banco Horizonte Sul
**Segmento:** Serviços Financeiros
**Área responsável:** Data & Analytics · **Dono da proposta:** Úrsula Campos
**Data:** 2024-06-23 · **Versão:** final

## 1. Contexto e desafio

O Banco Horizonte Sul processava cerca de 4,2 milhões de transações por dia em lotes noturnos, com latência média de 9 horas para relatórios de risco e crédito. Isso limitava a detecção de fraudes e a gestão de limites de exposição em tempo quase real, gerando perdas estimadas em R$ 3,8 milhões anuais.

## 3. Escopo da solução

- Ingestão contínua de eventos transacionais via Azure Event Hubs, com 15 mil mensagens por segundo de pico
- Processamento e transformação em streaming com Python no Azure Databricks, aplicando regras de qualidade e deduplicação
- Camada analítica em Azure Synapse Analytics com tabelas Delta para risco e crédito, atualizadas a cada 90 segundos
- Orquestração e monitoramento de pipelines com Azure Data Factory e alertas de falha em até 5 minutos
- Painéis de Analytics & BI no Power BI conectados à camada de streaming, com 12 indicadores de risco e exposição

Tecnologias principais: Python, Azure.

## 4. Abordagem e cronograma

O projeto será executado em 6 meses, nas seguintes fases:

- Diagnóstico e arquitetura de streaming (5 semanas)
- Construção dos pipelines de ingestão e processamento (9 semanas)
- Camada analítica e painéis de BI (7 semanas)
- Go-live assistido e transferência de conhecimento (5 semanas)

## 5. Entregáveis

- Pipeline de streaming em produção com latência ponta a ponta inferior a 2 minutos
- Modelo de dados Delta com 28 tabelas de risco, crédito e transações, documentado
- 12 painéis de Analytics & BI com atualização quase em tempo real
- Runbooks de operação e 40 alertas configurados para falhas e atrasos
- Treinamento de 25 usuários das áreas de risco e crédito, com material de apoio

## 6. Equipe proposta

1 arquiteto de dados, 2 engenheiros de dados, 1 analista de BI e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Volume de picos transacionais acima do previsto comprometer a latência
- Risco: Qualidade inconsistente nos eventos de origem gerar descartes indevidos
- Risco: Dependência de janelas de mudança em sistemas legados do banco

## 8. Investimento

Investimento total: R$ 660.000, em parcelas mensais ao longo de 6 meses.

Margem praticada: 29%.
