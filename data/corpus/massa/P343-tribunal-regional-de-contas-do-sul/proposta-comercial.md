---
projeto_id: P343
cliente: Tribunal Regional de Contas do Sul
titulo: Migração do Data Warehouse do TCE-Sul para Nuvem com Databricks e Snowflake
segmento: Setor Público
tecnologias: ["Databricks","Snowflake","AWS","GCP"]
servicos: ["Migração para Nuvem"]
area: Cloud & Infra
dono: Igor Peixoto
confidencialidade: interna
status_proposta: Enviada
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P343
id: P343-PROP
tipo_documental: proposta_comercial
status_documento: final_enviada
data: 2026-08-04
prazo_meses: 6
valor: 1220000
margem: 0.19
---

# Proposta Comercial — Migração do Data Warehouse do TCE-Sul para Nuvem com Databricks e Snowflake

**Cliente:** Tribunal Regional de Contas do Sul
**Segmento:** Setor Público
**Área responsável:** Cloud & Infra · **Dono da proposta:** Igor Peixoto
**Data:** 2026-08-04 · **Versão:** final

## 1. Contexto e desafio

O Tribunal Regional de Contas do Sul opera um data warehouse on-premises com 14 TB de dados históricos de fiscalização e prestação de contas, sustentado por hardware com 7 anos de uso e janelas de manutenção que travam a operação por até 36 horas mensais. Consultas analíticas de auditoria levam em média 45 minutos para serem concluídas, comprometendo prazos de relatórios de controle externo e a capacidade de resposta a órgãos de fiscalização.

## 2. Objetivo

Migrar o data warehouse para a nuvem em 6 meses, modernizando a plataforma analítica com Databricks e Snowflake sobre AWS e GCP, reduzindo o tempo médio de consultas analíticas em pelo menos 60% e eliminando as paradas de manutenção da infraestrutura local.

## 3. Escopo da solução

- Avaliação e desenho da arquitetura-alvo em nuvem, definindo a distribuição de workloads entre AWS e GCP e a integração do Databricks com o Snowflake como camada de serving analítico
- Migração de 14 TB de dados históricos e 320 objetos de modelagem (tabelas, views e procedures) para o Snowflake, com validação de integridade e reconciliação de contagens
- Reimplementação de 85 pipelines ETL/ELT em Databricks, substituindo jobs legados e aplicando orquestração e monitoramento automatizados
- Configuração de governança de dados, controle de acesso por perfil de auditor e criptografia em repouso e em trânsito nas duas nuvens
- Execução de testes de performance, homologação com usuários das áreas de fiscalização e plano de cutover com janela de rollback

Tecnologias principais: Databricks, Snowflake, AWS, GCP.

## 4. Abordagem e cronograma

O projeto será executado em 6 meses, nas seguintes fases:

- Diagnóstico e desenho de arquitetura (6 semanas)
- Migração de dados e pipelines (12 semanas)
- Testes, homologação e ajustes de performance (4 semanas)
- Cutover, treinamento e estabilização (4 semanas)

## 5. Entregáveis

- Documento de arquitetura-alvo e plano de migração aprovado pela área de TI do Tribunal
- Ambiente de data warehouse em nuvem com os 14 TB migrados e reconciliados no Snowflake
- 85 pipelines Databricks em produção com monitoramento e alertas configurados
- Relatório de testes de performance comparando consultas antes e depois da migração
- Plano de cutover, treinamento de 40 usuários-chave e documentação operacional de runbook

## 6. Equipe proposta

1 arquiteto de dados, 3 engenheiros de dados, 1 especialista em Snowflake, 1 especialista em Databricks e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Qualidade e consistência dos dados legados exigindo esforço adicional de limpeza e reconciliação
- Risco: Restrições de conformidade e segurança do setor público atrasando aprovações de trânsito de dados entre nuvens
- Risco: Indisponibilidade de usuários-chave do Tribunal durante as janelas de homologação

## 8. Investimento

Investimento total: R$ 1.220.000, em parcelas mensais ao longo de 6 meses.

Margem praticada: 19%.
