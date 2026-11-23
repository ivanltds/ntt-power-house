---
projeto_id: P171
cliente: NetVale Provedor
titulo: Streaming de dados em tempo real para operações de rede e consumo
segmento: Telecom
tecnologias: ["AWS","Databricks"]
servicos: ["Analytics & BI","Engenharia de Dados"]
area: Data & Analytics
dono: Henrique Matos
confidencialidade: interna
status_proposta: Cancelada
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P171
id: P171-PROP
tipo_documental: proposta_comercial
status_documento: final_enviada
data: 2026-07-12
prazo_meses: 8
valor: 1720000
margem: 0.31
---

# Proposta Comercial — Streaming de dados em tempo real para operações de rede e consumo

**Cliente:** NetVale Provedor
**Segmento:** Telecom
**Área responsável:** Data & Analytics · **Dono da proposta:** Henrique Matos
**Data:** 2026-07-12 · **Versão:** final

## 1. Contexto e desafio

A NetVale Provedor monitora cerca de 1,2 milhão de assinantes e enfrenta latência de até 6 horas na consolidação de dados de consumo e de eventos de rede, o que atrasa a detecção de anomalias e a ação comercial. Os relatórios atuais em lote não sustentam a meta de reduzir o churn mensal de 2,4% nem de priorizar investimentos em expansão de capacidade.

## 2. Objetivo

Implantar uma plataforma de streaming na AWS com Databricks para disponibilizar dados de rede e consumo em tempo real, com latência máxima de 5 minutos, apoiando analytics operacional e decisões comerciais.

## 3. Escopo da solução

- Ingestão contínua de eventos de rede e consumo via Amazon Kinesis e AWS Lambda, com volume estimado de 40 mil eventos por segundo
- Pipeline de dados em camadas bronze, silver e gold no Databricks com Delta Lake e processamento em streaming
- Modelagem de indicadores operacionais e comerciais em Databricks SQL para consumo por Analytics & BI
- Orquestração, monitoramento e alertas de pipelines com Databricks Workflows e Amazon CloudWatch
- Governança de dados com Unity Catalog e políticas de qualidade e linhagem

Tecnologias principais: AWS, Databricks.

## 4. Abordagem e cronograma

O projeto será executado em 8 meses, nas seguintes fases:

- Diagnóstico e arquitetura (6 semanas)
- Construção dos pipelines de streaming (14 semanas)
- Analytics & BI e governança (10 semanas)
- Homologação e go-live assistido (4 semanas)

## 5. Entregáveis

- Arquitetura de referência de streaming na AWS e no Databricks aprovada
- Pipelines em tempo real operando para 100% das fontes priorizadas
- Painéis de Analytics & BI com indicadores de consumo, rede e churn atualizados a cada 5 minutos
- Documentação técnica, runbooks e plano de sustentação
- Treinamento de 20 usuários das áreas de operações e comercial

## 6. Equipe proposta

1 arquiteto de dados, 2 engenheiros de dados, 1 analista de BI e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Qualidade e atraso na disponibilização das fontes de eventos pela área de redes
- Risco: Volume de eventos acima do previsto elevando custos de AWS e Databricks
- Risco: Baixa adoção dos painéis pelas áreas de negócio

## 8. Investimento

Investimento total: R$ 1.720.000, em parcelas mensais ao longo de 8 meses.

Margem praticada: 31%.
