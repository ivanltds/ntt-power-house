---
projeto_id: P366
cliente: NetVale Provedor
titulo: Detecção de Fraude em Tempo Real com Machine Learning para Provedor de Telecom
segmento: Telecom
tecnologias: ["Machine Learning","Kafka","Databricks"]
servicos: ["Data Science / ML","Engenharia de Dados"]
area: AI & Automation
dono: João Pedro Sales
confidencialidade: confidencial
status_proposta: Vendida
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P366
id: P366-PROP
tipo_documental: proposta_comercial
status_documento: final_aprovada
data: 2026-10-09
prazo_meses: 6
valor: 3590000
margem: 0.23
---

# Proposta Comercial — Detecção de Fraude em Tempo Real com Machine Learning para Provedor de Telecom

**Cliente:** NetVale Provedor
**Segmento:** Telecom
**Área responsável:** AI & Automation · **Dono da proposta:** João Pedro Sales
**Data:** 2026-10-09 · **Versão:** final

## 1. Contexto e desafio

O NetVale Provedor registra cerca de 480 mil eventos de recarga e ativação por mês e perde aproximadamente 3,2% da receita bruta com fraudes de recarga, clonagem de linha e uso indevido de créditos. A análise atual é manual e reativa, com detecção apenas após 48 horas, o que inviabiliza o bloqueio preventivo.

## 2. Objetivo

Implantar uma plataforma de detecção de fraude em tempo real com modelos de Machine Learning sobre streaming de eventos, reduzindo a perda por fraude em pelo menos 40% em 6 meses.

## 3. Escopo da solução

- Ingestão de eventos de recarga, ativação e uso em streaming com Apache Kafka, processando picos de 1.200 eventos por segundo.
- Construção de pipeline de dados em camadas bronze/silver/gold no Databricks com governança e histórico de features.
- Desenvolvimento e treinamento de modelos de Machine Learning de classificação de fraude com explicabilidade e score por evento.
- Integração do scoring em tempo real com a API antifraude do cliente, com latência alvo inferior a 800 ms.
- Painéis de monitoramento de detecção, falsos positivos e impacto financeiro para as equipes de risco.

Tecnologias principais: Machine Learning, Kafka, Databricks.

## 4. Abordagem e cronograma

O projeto será executado em 6 meses, nas seguintes fases:

- Diagnóstico e preparação de dados (6 semanas)
- Engenharia de dados e feature store (8 semanas)
- Modelagem e integração em tempo real (8 semanas)
- Go-live e estabilização (4 semanas)

## 5. Entregáveis

- Pipeline Kafka–Databricks em produção com 99,5% de disponibilidade.
- Modelo de detecção de fraude com AUC superior a 0,90 no conjunto de validação.
- API de scoring em tempo real integrada ao sistema antifraude do cliente.
- Relatório de avaliação de impacto com redução de perda e taxa de falsos positivos.
- Documentação técnica, runbooks e transferência de conhecimento para o time do cliente.

## 6. Equipe proposta

1 arquiteto de dados, 2 engenheiros de dados, 2 cientistas de dados e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Qualidade e atraso na disponibilização dos eventos históricos de recarga.
- Risco: Latência da API do cliente acima do alvo para scoring em tempo real.
- Risco: Volume elevado de falsos positivos impactando clientes legítimos.

## 8. Investimento

Investimento total: R$ 3.590.000, em parcelas mensais ao longo de 6 meses.

Margem praticada: 23%.
