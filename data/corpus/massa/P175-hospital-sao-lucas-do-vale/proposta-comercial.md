---
projeto_id: P175
cliente: Hospital São Lucas do Vale
titulo: Lakehouse Clínico para Análise Assistencial e Operacional
segmento: Saúde
tecnologias: ["AWS","Kafka","Python","Azure"]
servicos: ["Engenharia de Dados"]
area: Data & Analytics
dono: Eduarda Prado
confidencialidade: confidencial
status_proposta: Em elaboração
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P175
id: P175-PROP
tipo_documental: proposta_comercial
status_documento: preliminar
data: 2026-11-17
prazo_meses: 7
valor: 1180000
margem: 0.23
---

# Proposta Comercial — Lakehouse Clínico para Análise Assistencial e Operacional

**Cliente:** Hospital São Lucas do Vale
**Segmento:** Saúde
**Área responsável:** Data & Analytics · **Dono da proposta:** Eduarda Prado
**Data:** 2026-11-17 · **Versão:** final

## 1. Contexto e desafio

O Hospital São Lucas do Vale opera com dados assistenciais e administrativos distribuídos em 3 sistemas distintos (prontuário eletrônico, ERP hospitalar e sistema de faturamento), gerando relatórios manuais que consomem cerca de 40 horas por mês da equipe de TI e atrasam a análise de indicadores em até 10 dias. A ausência de uma camada analítica confiável limita a visão sobre ocupação de leitos, custos por procedimento e indicadores de qualidade assistencial.

## 2. Objetivo

Implantar uma plataforma de dados lakehouse na AWS com ingestão em tempo real via Kafka, criando uma base analítica confiável e governada para indicadores assistenciais e operacionais do hospital.

## 3. Escopo da solução

- Ingestão de dados do prontuário eletrônico, ERP hospitalar e faturamento com Apache Kafka em pipelines de streaming e batch em Python
- Construção do lakehouse na AWS com camadas bronze, silver e gold em Amazon S3 e catálogo de dados no AWS Glue
- Modelagem dimensional em Python e dbt para indicadores de ocupação de leitos, custos por procedimento e qualidade assistencial
- Integração com o ecossistema Azure do hospital para consumo de dashboards e compartilhamento seguro de dados via Azure Data Share
- Implementação de governança de dados, controle de acesso por perfil e monitoramento de pipelines com alertas operacionais

Tecnologias principais: AWS, Kafka, Python, Azure.

## 4. Abordagem e cronograma

O projeto será executado em 7 meses, nas seguintes fases:

- Diagnóstico e arquitetura (4 semanas)
- Ingestão e pipelines de dados (6 semanas)
- Modelagem e camada analítica (10 semanas)
- Governança, homologação e treinamento (8 semanas)

## 5. Entregáveis

- Documento de arquitetura do lakehouse e plano de ingestão das 3 fontes de dados
- Pipelines de ingestão em Kafka e Python homologados para as fontes assistencial, ERP e faturamento
- Camada gold com 12 indicadores assistenciais e operacionais modelados e validados
- Painéis analíticos integrados ao ambiente Azure com controle de acesso por perfil
- Runbook operacional, documentação técnica e treinamento de 16 horas para a equipe de TI do hospital

## 6. Equipe proposta

1 arquiteto de dados, 2 engenheiros de dados, 1 especialista em integração e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Qualidade e padronização dos dados legados do prontuário eletrônico podem exigir esforço adicional de tratamento
- Risco: Restrições de conformidade e privacidade de dados de saúde (LGPD) podem atrasar aprovações de acesso
- Risco: Disponibilidade limitada das equipes do hospital para validação dos indicadores durante o projeto

## 8. Investimento

Investimento total: R$ 1.180.000, em parcelas mensais ao longo de 7 meses.

Margem praticada: 23%.
