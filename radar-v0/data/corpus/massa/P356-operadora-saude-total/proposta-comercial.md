---
projeto_id: P356
cliente: Operadora Saúde Total
titulo: Plataforma de Dados Lakehouse para Análise de Saúde Populacional
segmento: Saúde
tecnologias: ["AWS","Kafka"]
servicos: ["Migração para Nuvem"]
area: Data & Analytics
dono: Eduarda Prado
confidencialidade: confidencial
status_proposta: Perdida
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P356
id: P356-PROP
tipo_documental: proposta_comercial
status_documento: final_enviada
data: 2025-08-28
prazo_meses: 7
valor: 1050000
margem: 0.31
---

# Proposta Comercial — Plataforma de Dados Lakehouse para Análise de Saúde Populacional

**Cliente:** Operadora Saúde Total
**Segmento:** Saúde
**Área responsável:** Data & Analytics · **Dono da proposta:** Eduarda Prado
**Data:** 2025-08-28 · **Versão:** final

## 1. Contexto e desafio

A Operadora Saúde Total gerencia 2,3 milhões de beneficiários e enfrenta dificuldades para consolidar dados de sinistros, autorizações e prontuários eletrônicos espalhados em 12 sistemas legados. O tempo médio para gerar relatórios analíticos é de 5 dias, impactando a agilidade na tomada de decisão e a personalização de programas de saúde.

## 2. Objetivo

Implementar uma plataforma de dados lakehouse na AWS com ingestão em tempo real via Kafka, unificando fontes de dados e reduzindo o tempo de acesso analítico para menos de 1 hora.

## 3. Escopo da solução

- Migração de 12 fontes de dados legadas para um data lake na AWS S3, com catalogação no AWS Glue.
- Implementação de pipeline de ingestão em tempo real utilizando Apache Kafka para eventos de sinistros e autorizações.
- Construção de camada de armazenamento lakehouse com Delta Lake no AWS EMR, integrando dados estruturados e não estruturados.
- Desenvolvimento de 15 dashboards analíticos no Amazon QuickSight para monitoramento de indicadores de saúde.
- Configuração de governança de dados com AWS Lake Formation e controle de acesso baseado em políticas de segurança.

Tecnologias principais: AWS, Kafka.

## 4. Abordagem e cronograma

O projeto será executado em 7 meses, nas seguintes fases:

- Fase 1 - Discovery e Arquitetura: 4 semanas
- Fase 2 - Implementação de Ingestão e Lakehouse: 10 semanas
- Fase 3 - Desenvolvimento Analítico e Governança: 8 semanas
- Fase 4 - Testes, Treinamento e Go-live: 6 semanas

## 5. Entregáveis

- Documento de arquitetura de dados lakehouse na AWS, incluindo diagramas de fluxo e definição de zonas (raw, trusted, refined).
- Pipeline de ingestão Kafka operacional, com 12 conectores configurados e monitoramento via Amazon CloudWatch.
- Catálogo de dados unificado com 200 tabelas mapeadas e metadados no AWS Glue Data Catalog.
- Conjunto de 15 dashboards no QuickSight, validados pelas áreas de negócio, com tempos de resposta inferiores a 5 segundos.
- Relatório de testes de performance e segurança, incluindo simulações de carga com 1 TB de dados.

## 6. Equipe proposta

1 arquiteto de dados, 2 engenheiros de dados, 1 especialista em Kafka e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Complexidade na integração de sistemas legados com formatos de dados heterogêneos.
- Risco: Latência na ingestão de eventos Kafka devido a picos de volume de sinistros.
- Risco: Resistência dos usuários na adoção de novos dashboards e processos analíticos.

## 8. Investimento

Investimento total: R$ 1.050.000, em parcelas mensais ao longo de 7 meses.

Margem praticada: 31%.
