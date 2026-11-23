---
projeto_id: P330
cliente: TeleNorte Conecta
titulo: Streaming de dados em tempo real para operações de rede e atendimento
segmento: Telecom
tecnologias: ["Azure","Databricks"]
servicos: ["Analytics & BI","Engenharia de Dados"]
area: Data & Analytics
dono: Henrique Matos
confidencialidade: confidencial
status_proposta: Entregue
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P330
id: P330-PROP
tipo_documental: proposta_comercial
status_documento: final_aprovada
data: 2024-07-22
prazo_meses: 7
valor: 1920000
margem: 0.22
---

# Proposta Comercial — Streaming de dados em tempo real para operações de rede e atendimento

**Cliente:** TeleNorte Conecta
**Segmento:** Telecom
**Área responsável:** Data & Analytics · **Dono da proposta:** Henrique Matos
**Data:** 2024-07-22 · **Versão:** final

## 1. Contexto e desafio

A TeleNorte Conecta processava dados de rede e atendimento em lotes diários, com latência de até 24 horas, dificultando a detecção de falhas e a personalização de ofertas. Com 4,2 milhões de clientes e picos de 1,8 TB/dia, a empresa precisava de visibilidade em tempo real para reduzir churn e melhorar a experiência.

## 2. Objetivo

Implementar uma plataforma de streaming de dados em tempo real na Azure com Databricks para ingestão, processamento e análise contínua de eventos de rede e atendimento, permitindo reação imediata a incidentes e ofertas personalizadas.

## 3. Escopo da solução

- Ingestão de eventos de rede e atendimento via Azure Event Hubs e Kafka, com processamento em streaming no Databricks (Structured Streaming).
- Construção de pipelines de dados em tempo real com Delta Lake na Azure, garantindo confiabilidade e escalabilidade para 1,8 TB/dia.
- Integração com Azure Data Lake Storage Gen2 para armazenamento de dados brutos e curados, com governança via Unity Catalog.
- Implementação de dashboards em tempo real no Power BI conectados ao Databricks SQL para monitoramento de KPIs operacionais.
- Automação de alertas de anomalias de rede e atendimento usando Azure Functions e Logic Apps, integrados aos pipelines de streaming.

Tecnologias principais: Azure, Databricks.

## 4. Abordagem e cronograma

O projeto será executado em 7 meses, nas seguintes fases:

- Fase 1 - Discovery e arquitetura: 4 semanas
- Fase 2 - Implementação de pipelines de streaming: 12 semanas
- Fase 3 - Integração de analytics e dashboards: 8 semanas
- Fase 4 - Testes, treinamento e go-live: 4 semanas

## 5. Entregáveis

- Plataforma de streaming operacional com latência inferior a 5 segundos para eventos críticos de rede.
- Pipeline de dados em tempo real com 99,9% de disponibilidade e processamento de 1,8 TB/dia.
- Dashboards em tempo real para 5 áreas de negócio (Operações, Atendimento, Marketing, Engenharia e Diretoria).
- Documentação técnica e manuais de operação para sustentação da plataforma.
- Treinamento para 25 usuários-chave e 10 desenvolvedores internos sobre a arquitetura e uso das ferramentas.

## 6. Equipe proposta

1 arquiteto de dados, 2 engenheiros de dados, 1 especialista em BI e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Volume de dados acima do previsto durante picos de tráfego
- Risco: Integração com sistemas legados de rede com protocolos proprietários
- Risco: Resistência à mudança por parte das equipes operacionais

## 8. Investimento

Investimento total: R$ 1.920.000, em parcelas mensais ao longo de 7 meses.

Margem praticada: 22%.
