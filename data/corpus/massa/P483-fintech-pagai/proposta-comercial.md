---
projeto_id: P483
cliente: Fintech Pagaí
titulo: Plataforma de detecção de fraude em tempo real com Databricks e Kafka
segmento: Serviços Financeiros
tecnologias: ["Databricks","Azure","Kafka"]
servicos: ["Engenharia de Dados","Change Management"]
area: AI & Automation
dono: Karina Duarte
confidencialidade: interna
status_proposta: Em elaboração
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P483
id: P483-PROP
tipo_documental: proposta_comercial
status_documento: preliminar
data: 2026-11-16
prazo_meses: 7
valor: 350000
margem: 0.24
---

# Proposta Comercial — Plataforma de detecção de fraude em tempo real com Databricks e Kafka

**Cliente:** Fintech Pagaí
**Segmento:** Serviços Financeiros
**Área responsável:** AI & Automation · **Dono da proposta:** Karina Duarte
**Data:** 2026-11-16 · **Versão:** final

## 1. Contexto e desafio

A Fintech Pagaí processa cerca de 4,2 milhões de transações por mês e hoje identifica fraudes apenas em lote, com latência de até 24 horas e taxa de falso positivo de 18%. O time de risco recebe mais de 900 alertas diários sem priorização, o que atrasa o bloqueio de transações suspeitas e gera perdas estimadas em R$ 1,8 milhão por trimestre.

## 3. Escopo da solução

- Ingestão de eventos transacionais em streaming com Apache Kafka no Azure, com tópicos particionados por canal de pagamento e retenção de 7 dias
- Construção de pipelines de Engenharia de Dados no Databricks (Delta Lake) para camadas bronze, prata e ouro, com orquestração horária e qualidade de dados automatizada
- Implementação de features de risco em near real-time e scoring de fraude com modelos no Databricks MLflow, expostos por API ao motor de decisão
- Painéis operacionais no Azure e alertas priorizados por score para o time de risco, integrados ao processo de bloqueio de cartões
- Plano de Change Management com treinamento de 60 analistas de risco em 4 turmas e comunicação de mudança para as áreas de operações e compliance

Tecnologias principais: Databricks, Azure, Kafka.

## 4. Abordagem e cronograma

O projeto será executado em 7 meses, nas seguintes fases:

- Diagnóstico e arquitetura (6 semanas)
- Engenharia de dados e streaming (10 semanas)
- Modelagem e implantação do scoring (8 semanas)
- Change Management e go-live assistido (4 semanas)

## 5. Entregáveis

- Documento de arquitetura de referência da solução de streaming com Databricks, Kafka e Azure aprovado pelo cliente
- Pipelines de Engenharia de Dados em produção para 12 fontes transacionais, com SLA de atualização de 5 minutos
- Modelo de scoring de fraude em produção com relatório de avaliação (precisão, recall e taxa de falso positivo)
- Dashboard de monitoramento de fraude e runbook operacional para o time de risco
- Programa de Change Management concluído, com material de treinamento, 4 turmas realizadas e pesquisa de adoção com meta de 80% de satisfação

## 6. Equipe proposta

1 arquiteto de dados, 3 engenheiros de dados, 1 cientista de dados, 1 especialista em change management e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Qualidade e completude dos eventos transacionais enviados ao Kafka
- Risco: Latência da infraestrutura Azure acima do SLA de 2 minutos
- Risco: Baixa adoção dos novos alertas priorizados pelos analistas de risco

## 8. Investimento

Investimento total: R$ 350.000, em parcelas mensais ao longo de 7 meses.

Margem praticada: 24%.
