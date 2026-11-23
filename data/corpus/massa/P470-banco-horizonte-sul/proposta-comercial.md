---
projeto_id: P470
cliente: Banco Horizonte Sul
titulo: Plataforma Lakehouse com Kafka e Databricks para Análise de Crédito e Risco
segmento: Serviços Financeiros
tecnologias: ["Kafka","Databricks"]
servicos: ["Engenharia de Dados"]
area: Data & Analytics
dono: Ana Beatriz Lopes
confidencialidade: interna
status_proposta: Cancelada
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P470
id: P470-PROP
tipo_documental: proposta_comercial
status_documento: final_enviada
data: 2026-06-02
prazo_meses: 9
valor: 730000
margem: 0.19
---

# Proposta Comercial — Plataforma Lakehouse com Kafka e Databricks para Análise de Crédito e Risco

**Cliente:** Banco Horizonte Sul
**Segmento:** Serviços Financeiros
**Área responsável:** Data & Analytics · **Dono da proposta:** Ana Beatriz Lopes
**Data:** 2026-06-02 · **Versão:** final

## 1. Contexto e desafio

O Banco Horizonte Sul processa cerca de 12 milhões de transações mensais em sistemas legados, com relatórios gerenciais que levam até 48 horas para consolidar dados de crédito e risco. A ausência de uma camada analítica unificada gera divergências em 8% dos indicadores reportados à diretoria e à área regulatória.

## 2. Objetivo

Construir uma plataforma de dados lakehouse em Databricks alimentada por streaming Kafka, reduzindo o tempo de disponibilização de dados analíticos de 48 para até 2 horas e unificando os indicadores de crédito e risco em uma única fonte confiável.

## 3. Escopo da solução

- Ingestão em streaming de eventos transacionais e de crédito via Apache Kafka, com tópicos segmentados por domínio de negócio
- Implementação do lakehouse no Databricks com arquitetura medallion (bronze, silver e gold) sobre armazenamento em nuvem
- Modelagem de dados analíticos de crédito, risco e inadimplência na camada gold, com tabelas Delta otimizadas
- Pipeline de engenharia de dados orquestrado com processamento incremental e controle de qualidade automatizado
- Governança de dados com catálogo, linhagem e políticas de acesso aplicadas às camadas do lakehouse

Tecnologias principais: Kafka, Databricks.

## 4. Abordagem e cronograma

O projeto será executado em 9 meses, nas seguintes fases:

- Discovery e arquitetura (6 semanas)
- Ingestão Kafka e camada bronze/silver (14 semanas)
- Modelagem gold e qualidade de dados (12 semanas)
- Go-live, estabilização e transferência de conhecimento (8 semanas)

## 5. Entregáveis

- Arquitetura de referência do lakehouse documentada, incluindo topologia Kafka-Databricks e padrões de ingestão
- Pipelines de streaming Kafka para Databricks em produção para os 3 domínios prioritários de crédito
- Camada gold com 15 tabelas analíticas certificadas para relatórios de crédito e risco
- Painéis de monitoramento de qualidade de dados e latência dos pipelines com alertas automatizados
- Documentação técnica, runbooks operacionais e treinamento de 20 usuários das áreas de dados e negócio

## 6. Equipe proposta

1 arquiteto de dados, 3 engenheiros de dados, 1 especialista em Kafka e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Latência e volume de eventos Kafka acima do previsto podem exigir redimensionamento do cluster
- Risco: Dependência de liberação de acessos às fontes legadas pelo time de infraestrutura do banco
- Risco: Mudanças em requisitos regulatórios durante a construção da camada gold

## 8. Investimento

Investimento total: R$ 730.000, em parcelas mensais ao longo de 9 meses.

Margem praticada: 19%.
