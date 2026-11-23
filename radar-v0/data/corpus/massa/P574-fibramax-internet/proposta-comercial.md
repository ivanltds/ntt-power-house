---
projeto_id: P574
cliente: FibraMax Internet
titulo: Plataforma Lakehouse para Dados de Banda Larga
segmento: Telecom
tecnologias: ["AWS","Snowflake","Kafka","Azure"]
servicos: ["Governança de Dados","Engenharia de Dados"]
area: Data & Analytics
dono: Henrique Matos
confidencialidade: interna
status_proposta: Perdida
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P574
id: P574-PROP
tipo_documental: proposta_comercial
status_documento: final_enviada
data: 2025-06-01
prazo_meses: 9
valor: 6780000
margem: 0.29
---

# Proposta Comercial — Plataforma Lakehouse para Dados de Banda Larga

**Cliente:** FibraMax Internet
**Segmento:** Telecom
**Área responsável:** Data & Analytics · **Dono da proposta:** Henrique Matos
**Data:** 2025-06-01 · **Versão:** final

## 1. Contexto e desafio

A FibraMax Internet, provedor de banda larga com 1,2 milhão de assinantes, enfrenta dificuldades para consolidar dados de consumo e qualidade de rede, que hoje estão dispersos em sistemas legados e planilhas. A falta de uma visão unificada impede análises em tempo real e atrasa a detecção de falhas, impactando a satisfação do cliente e elevando o churn em 8% ao ano.

## 3. Escopo da solução

- Ingestão de dados de rede e consumo via Kafka em tempo real
- Construção de data lake na AWS S3 com processamento no Azure Databricks
- Modelagem dimensional e carga no Snowflake para análises de negócio
- Implementação de catálogo de dados e políticas de governança (Data Catalog, Lineage e Quality)
- Integração com ferramentas de BI e treinamento para equipe interna

Tecnologias principais: AWS, Snowflake, Kafka, Azure.

## 4. Abordagem e cronograma

O projeto será executado em 9 meses, nas seguintes fases:

- Fase 1 - Discovery e Arquitetura: 6 semanas
- Fase 2 - Implementação da Ingestão e Data Lake: 12 semanas
- Fase 3 - Modelagem e Carga no Snowflake: 10 semanas
- Fase 4 - Governança e Capacitação: 8 semanas

## 5. Entregáveis

- Documento de arquitetura de referência da plataforma lakehouse
- Pipeline de ingestão de dados em tempo real com Kafka
- Camada analítica no Snowflake com 20 tabelas de negócio modeladas
- Catálogo de dados com 500 ativos catalogados e políticas de acesso
- Workshop de capacitação para 15 analistas da FibraMax

## 6. Equipe proposta

1 arquiteto de dados, 2 engenheiros de dados, 1 especialista em governança de dados e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Complexidade na integração de fontes legadas heterogêneas
- Risco: Resistência cultural à adoção de governança de dados
- Risco: Atraso na disponibilização de acessos e credenciais de nuvem

## 8. Investimento

Investimento total: R$ 6.780.000, em parcelas mensais ao longo de 9 meses.

Margem praticada: 29%.
