---
projeto_id: P359
cliente: Laboratório Diagnóstico Preciso
titulo: Lakehouse de Dados Clínicos para Analytics e Governança em Saúde Diagnóstica
segmento: Saúde
tecnologias: ["Kafka","Python","Snowflake"]
servicos: ["Engenharia de Dados","Governança de Dados","Migração para Nuvem"]
area: Data & Analytics
dono: Quésia Ramos
confidencialidade: interna
status_proposta: Em elaboração
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P359
id: P359-PROP
tipo_documental: proposta_comercial
status_documento: preliminar
data: 2026-09-20
prazo_meses: 11
valor: 2700000
margem: 0.32
---

# Proposta Comercial — Lakehouse de Dados Clínicos para Analytics e Governança em Saúde Diagnóstica

**Cliente:** Laboratório Diagnóstico Preciso
**Segmento:** Saúde
**Área responsável:** Data & Analytics · **Dono da proposta:** Quésia Ramos
**Data:** 2026-09-20 · **Versão:** final

## 1. Contexto e desafio

O Laboratório Diagnóstico Preciso realiza cerca de 4,2 milhões de exames por ano em 37 unidades e mantém dados clínicos, operacionais e financeiros dispersos em sistemas legados e planilhas, o que atrasa a consolidação de indicadores em até 9 dias. A ausência de uma camada analítica governada dificulta a rastreabilidade do dado do paciente e limita a criação de painéis confiáveis para as áreas médica e comercial.

## 2. Objetivo

Construir uma plataforma de dados lakehouse na nuvem, integrada em tempo quase real, que consolide exames, faturamento e operação em uma base única governada, reduzindo o tempo de disponibilização de indicadores de 9 dias para menos de 1 dia.

## 3. Escopo da solução

- Ingestão contínua de eventos de exames e faturamento via Kafka, com tópicos segregados por domínio e retenção de 30 dias
- Desenvolvimento de pipelines em Python para tratamento, deduplicação e carga incremental no Snowflake
- Modelagem dimensional no Snowflake em camadas bronze, silver e gold, cobrindo 4,2 milhões de exames anuais
- Implementação de catálogo, linhagem e políticas de acesso a dados sensíveis de saúde, com mascaramento de dados pessoais
- Migração de 3 bases legadas on-premises para a nuvem, com janela de corte e validação de reconciliação de 100% dos registros

Tecnologias principais: Kafka, Python, Snowflake.

## 4. Abordagem e cronograma

O projeto será executado em 11 meses, nas seguintes fases:

- Diagnóstico e arquitetura (8 semanas)
- Ingestão e pipelines com Kafka e Python (16 semanas)
- Modelagem e governança no Snowflake (14 semanas)
- Migração para nuvem e estabilização (10 semanas)

## 5. Entregáveis

- Documento de arquitetura de referência do lakehouse aprovado pelo cliente
- 120 pipelines de ingestão e transformação em produção, monitorados com alertas de SLA
- Modelo dimensional no Snowflake com 14 tabelas gold publicadas para consumo analítico
- Catálogo de dados com 250 ativos catalogados e linhagem documentada
- Plano de migração concluído com 3 bases legadas desativadas e relatório de reconciliação

## 6. Equipe proposta

1 arquiteto de dados, 3 engenheiros de dados, 1 especialista em governança de dados e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Qualidade dos dados legados pode exigir esforço extra de tratamento
- Risco: Restrições de conformidade LGPD podem atrasar liberação de acessos
- Risco: Janela de corte da migração pode impactar a operação do laboratório

## 8. Investimento

Investimento total: R$ 2.700.000, em parcelas mensais ao longo de 11 meses.

Margem praticada: 32%.
