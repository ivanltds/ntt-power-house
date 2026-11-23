---
projeto_id: P592
cliente: Ondas Móvel
titulo: Lakehouse de Dados para Operadora de Telecom com AWS, Snowflake e Azure
segmento: Telecom
tecnologias: ["AWS","Snowflake","Azure"]
servicos: ["Engenharia de Dados","Governança de Dados"]
area: Data & Analytics
dono: Henrique Matos
confidencialidade: interna
status_proposta: Entregue
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P592
id: P592-PROP
tipo_documental: proposta_comercial
status_documento: final_aprovada
data: 2025-05-10
prazo_meses: 9
valor: 1400000
margem: 0.29
---

# Proposta Comercial — Lakehouse de Dados para Operadora de Telecom com AWS, Snowflake e Azure

**Cliente:** Ondas Móvel
**Segmento:** Telecom
**Área responsável:** Data & Analytics · **Dono da proposta:** Henrique Matos
**Data:** 2025-05-10 · **Versão:** final

## 1. Contexto e desafio

A Ondas Móvel operava com mais de 40 fontes de dados dispersas entre sistemas de billing, rede e atendimento, gerando relatórios de churn com atraso de até 5 dias e 18% de divergência entre áreas. O time de analytics consumia 60% do tempo em extração e tratamento manual, sem camada única de governança sobre 12 milhões de linhas de CDR diárias.

## 2. Objetivo

Construir uma plataforma lakehouse unificada em AWS, Snowflake e Azure, com engenharia e governança de dados, reduzindo o tempo de disponibilização de dados analíticos e garantindo rastreabilidade ponta a ponta.

## 3. Escopo da solução

- Ingestão em lote e incremental de 40 fontes (billing, CRM, OSS, rede) na camada de armazenamento AWS S3 com orquestração automatizada
- Construção de camadas bronze, silver e gold no Snowflake, com 85 modelos dbt e SLAs de atualização de até 2 horas
- Integração de pipelines híbridos com Azure Data Factory para fontes corporativas e aplicações legadas
- Catálogo de dados e linhagem no Snowflake Horizon, com 300 termos de negócio e classificação de 100% dos campos sensíveis (LGPD)
- Definição de políticas de governança, papéis de acesso e painéis de qualidade de dados com 25 regras automatizadas

Tecnologias principais: AWS, Snowflake, Azure.

## 4. Abordagem e cronograma

O projeto será executado em 9 meses, nas seguintes fases:

- Fase 1 – Discovery e arquitetura: 6 semanas
- Fase 2 – Ingestão e camada bronze/silver: 14 semanas
- Fase 3 – Camada gold, governança e catálogo: 12 semanas
- Fase 4 – Estabilização, hipercare e handover: 4 semanas

## 5. Entregáveis

- Plataforma lakehouse em produção com 40 fontes integradas e 85 modelos de dados documentados
- Catálogo de dados corporativo com 300 termos de negócio e linhagem completa das tabelas gold
- Políticas de governança e matriz de acessos aprovadas pelo comitê de dados do cliente
- Painel de qualidade de dados com 25 regras e alertas automáticos de desvio
- Documentação técnica e transferência de conhecimento para 8 profissionais do cliente

## 6. Equipe proposta

1 arquiteto de dados, 3 engenheiros de dados, 1 especialista em governança de dados e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Atraso na liberação de acessos às fontes legadas pelo time de infraestrutura do cliente
- Risco: Qualidade inconsistente dos dados de rede, exigindo regras adicionais de tratamento
- Risco: Mudança de escopo em requisitos de governança durante a fase de catálogo

## 8. Investimento

Investimento total: R$ 1.400.000, em parcelas mensais ao longo de 9 meses.

Margem praticada: 29%.
