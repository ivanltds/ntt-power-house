---
projeto_id: P115
cliente: Operadora Sinal Forte
titulo: Streaming de dados em tempo real para operadora de telecom
segmento: Telecom
tecnologias: ["Databricks","Kafka"]
servicos: ["Engenharia de Dados","Analytics & BI","Change Management"]
area: Data & Analytics
dono: Henrique Matos
confidencialidade: interna
status_proposta: Entregue
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P115
id: P115-PROP
tipo_documental: proposta_comercial
status_documento: final_aprovada
data: 2024-05-04
prazo_meses: 9
valor: 770000
margem: 0.25
---

# Proposta Comercial — Streaming de dados em tempo real para operadora de telecom

**Cliente:** Operadora Sinal Forte
**Segmento:** Telecom
**Área responsável:** Data & Analytics · **Dono da proposta:** Henrique Matos
**Data:** 2024-05-04 · **Versão:** final

## 1. Contexto e desafio

A Operadora Sinal Forte processava cerca de 40 milhões de eventos de rede por dia em lotes noturnos, com latência de até 8 horas na detecção de falhas de qualidade e consumo de dados. Isso limitava a ação proativa em 2,3 milhões de clientes e gerava perda estimada de R$ 1,8 milhão por mês em churn não endereçado.

## 2. Objetivo

Implantar uma plataforma de dados em tempo real com Databricks e Kafka para reduzir a latência de eventos de rede a menos de 2 minutos e habilitar analytics operacional e de experiência do cliente em near real-time.

## 3. Escopo da solução

- Ingestão contínua de eventos de rede e de uso em tópicos Kafka, com volumes de 40 milhões de eventos/dia
- Pipeline de streaming estruturado no Databricks com camadas bronze, silver e gold e governança de dados
- Modelagem de indicadores de qualidade de rede e experiência do cliente para consumo em dashboards de Analytics & BI
- Alertas em tempo real para times de operações e retenção, integrados aos sistemas de atendimento
- Plano de Change Management com treinamento de 120 usuários e comunicação em 3 ondas

Tecnologias principais: Databricks, Kafka.

## 4. Abordagem e cronograma

O projeto será executado em 9 meses, nas seguintes fases:

- Discovery e arquitetura (6 semanas)
- Implementação de ingestão e pipelines de streaming (16 semanas)
- Analytics, alertas e dashboards (10 semanas)
- Change Management e go-live assistido (6 semanas)

## 5. Entregáveis

- Arquitetura de referência de streaming Kafka + Databricks documentada e aprovada
- Pipelines de streaming em produção com SLA de 2 minutos de latência
- 5 dashboards de qualidade de rede e experiência do cliente publicados
- Motor de alertas em tempo real operando com 12 regras de negócio
- Programa de capacitação concluído com 120 usuários treinados e material de apoio

## 6. Equipe proposta

1 arquiteto de dados, 2 engenheiros de dados, 1 analista de BI e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Volume de eventos acima do previsto nos horários de pico
- Risco: Qualidade e padronização dos eventos de rede de múltiplos vendors
- Risco: Baixa adoção dos dashboards pelos times operacionais

## 8. Investimento

Investimento total: R$ 770.000, em parcelas mensais ao longo de 9 meses.

Margem praticada: 25%.
