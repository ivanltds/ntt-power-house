---
projeto_id: P314
cliente: Banco Horizonte Sul
titulo: Pipeline de dados em tempo real com Kafka e Databricks para analytics financeiro
segmento: Serviços Financeiros
tecnologias: ["Kafka","Databricks","Python","AWS"]
servicos: ["Engenharia de Dados"]
area: Data & Analytics
dono: Ana Beatriz Lopes
confidencialidade: interna
status_proposta: Perdida
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P314
id: P314-PROPV1
tipo_documental: proposta_comercial
status_documento: rascunho
data: 2024-06-23
prazo_meses: 10
valor: 590000
margem: 0.33
---

# Proposta Comercial — Pipeline de dados em tempo real com Kafka e Databricks para analytics financeiro (versão 1, rascunho)

**Cliente:** Banco Horizonte Sul
**Segmento:** Serviços Financeiros
**Área responsável:** Data & Analytics · **Dono da proposta:** Ana Beatriz Lopes
**Data:** 2024-06-23 · **Versão:** 1 (rascunho)

## 1. Contexto e desafio

O Banco Horizonte Sul processa cerca de 4,2 milhões de transações por dia em 3 sistemas legados, mas os relatórios gerenciais chegam com até 36 horas de atraso. Isso limita a detecção de fraudes e a gestão de liquidez em janelas críticas, com perda estimada de R$ 1,8 milhão por trimestre em oportunidades de crédito e prevenção.

## 2. Objetivo

Implantar uma plataforma de streaming de dados em tempo real na AWS para disponibilizar eventos transacionais em menos de 5 segundos às áreas de risco e tesouraria, substituindo as cargas batch atuais.

## 3. Escopo da solução

- Ingestão de eventos transacionais com Kafka (MSK) a partir dos 3 sistemas de origem, com tópicos por domínio e retenção de 7 dias
- Camada de processamento e qualidade com Databricks (Delta Live Tables) e jobs em Python para deduplicação e enriquecimento
- Modelagem de tabelas Delta na AWS S3 com arquitetura medalhão (bronze, prata e ouro) para consumo analítico
- Pipeline de streaming contínuo com latência alvo inferior a 5 segundos e monitoramento de SLAs
- Integração dos dados em tempo real com os dashboards de risco e tesouraria via camada de serving

Tecnologias principais: Kafka, Databricks, Python, AWS.

## 4. Abordagem e cronograma

O projeto será executado em 10 meses, nas seguintes fases:

- Diagnóstico e arquitetura (6 semanas)
- Implementação da ingestão Kafka e camada bronze (10 semanas)
- Processamento Databricks e camada prata/ouro (12 semanas)
- Go-live assistido e hypercare (4 semanas)

## 5. Entregáveis

- Documento de arquitetura de referência de streaming com Kafka, Databricks e AWS
- Pipeline de ingestão Kafka operando com 4,2 milhões de eventos/dia
- Camada analítica em Databricks com 12 tabelas Delta certificadas
- Painel de monitoramento de latência, volume e qualidade dos dados
- Runbook operacional e transferência de conhecimento para o time de engenharia do banco

## 6. Equipe proposta

1 arquiteto de dados, 3 engenheiros de dados, 1 especialista em streaming e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Latência dos sistemas legados comprometer o SLA de 5 segundos
- Risco: Qualidade e duplicidade dos eventos de origem
- Risco: Baixa adoção das áreas de risco e tesouraria no novo modelo em tempo real

## 8. Investimento

Investimento total: R$ 590.000, em parcelas mensais ao longo de 10 meses.

Margem praticada: 33%.
