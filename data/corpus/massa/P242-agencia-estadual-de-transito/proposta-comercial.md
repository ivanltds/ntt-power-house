---
projeto_id: P242
cliente: Agência Estadual de Trânsito
titulo: Migração de Data Warehouse para Nuvem MultiCloud para Agência Estadual de Trânsito
segmento: Setor Público
tecnologias: ["GCP","Databricks","AWS","Azure"]
servicos: ["Migração para Nuvem"]
area: Cloud & Infra
dono: Igor Peixoto
confidencialidade: interna
status_proposta: Em execução
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P242
id: P242-PROP
tipo_documental: proposta_comercial
status_documento: final_aprovada
data: 2026-09-04
prazo_meses: 10
valor: 650000
margem: 0.27
---

# Proposta Comercial — Migração de Data Warehouse para Nuvem MultiCloud para Agência Estadual de Trânsito

**Cliente:** Agência Estadual de Trânsito
**Segmento:** Setor Público
**Área responsável:** Cloud & Infra · **Dono da proposta:** Igor Peixoto
**Data:** 2026-09-04 · **Versão:** final

## 1. Contexto e desafio

A Agência Estadual de Trânsito processa diariamente 2,5 milhões de transações de veículos e condutores, mas seu data warehouse on-premises apresenta lentidão e custos de manutenção crescentes. O ambiente atual suporta apenas 30% da demanda analítica prevista para os próximos dois anos, limitando a emissão de relatórios de fiscalização e a integração com sistemas de mobilidade urbana.

## 3. Escopo da solução

- Avaliação e desenho da arquitetura multicloud com GCP (BigQuery) e Databricks para processamento analítico
- Migração de 120 TB de dados históricos e 450 tabelas para ambientes AWS (S3, Redshift) e Azure (Synapse)
- Implementação de pipelines de ingestão e orquestração com Databricks e serviços gerenciados GCP/AWS/Azure
- Configuração de camada de governança e segurança de dados nos quatro provedores, incluindo criptografia e controle de acesso
- Execução de testes de performance e validação de cargas analíticas com usuários-chave da Agência

Tecnologias principais: GCP, Databricks, AWS, Azure.

## 4. Abordagem e cronograma

O projeto será executado em 10 meses, nas seguintes fases:

- Diagnóstico e Arquitetura (8 semanas)
- Migração de Dados e Pipelines (16 semanas)
- Validação e Otimização (12 semanas)
- Cutover e Estabilização (4 semanas)

## 5. Entregáveis

- Documento de arquitetura de referência multicloud aprovado
- Ambiente de data warehouse migrado e operacional em GCP e Databricks
- Relatório de migração de 450 tabelas e 120 TB de dados com validação de integridade
- Painéis de monitoramento de custos e performance nos quatro provedores
- Plano de cutover e descomissionamento do ambiente legado

## 6. Equipe proposta

1 gerente de projeto, 1 arquiteto de dados, 2 engenheiros de dados, 1 especialista em segurança de nuvem e 1 analista de negócios.

## 7. Premissas e riscos

- Risco: Atraso na liberação de acessos e credenciais nos provedores de nuvem
- Risco: Inconsistências nos dados legados que impactam a migração
- Risco: Resistência de usuários-chave à mudança de ferramentas analíticas

## 8. Investimento

Investimento total: R$ 650.000, em parcelas mensais ao longo de 10 meses.

Margem praticada: 27%.
