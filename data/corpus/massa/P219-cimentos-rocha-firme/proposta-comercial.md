---
projeto_id: P219
cliente: Cimentos Rocha Firme
titulo: Migração SAP S/4HANA para nuvem híbrida Azure/AWS
segmento: Manufatura
tecnologias: ["SAP","Azure","AWS"]
servicos: ["ERP","Migração para Nuvem"]
area: Enterprise Apps
dono: Tiago Fernandes
confidencialidade: interna
status_proposta: Cancelada
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P219
id: P219-PROP
tipo_documental: proposta_comercial
status_documento: final_enviada
data: 2026-02-13
prazo_meses: 12
valor: 1620000
margem: 0.31
---

# Proposta Comercial — Migração SAP S/4HANA para nuvem híbrida Azure/AWS

**Cliente:** Cimentos Rocha Firme
**Segmento:** Manufatura
**Área responsável:** Enterprise Apps · **Dono da proposta:** Tiago Fernandes
**Data:** 2026-02-13 · **Versão:** final

## 1. Contexto e desafio

A Cimentos Rocha Firme opera com SAP ECC em datacenter próprio, com 14 anos de customizações e 3.200 usuários ativos em 9 plantas industriais. A base de dados de 6,5 TB e as 480 interfaces legadas elevam o custo de manutenção em 38% ao ano e impedem a adoção de analítica em tempo real para planejamento de produção.

## 3. Escopo da solução

- Assessment e blueprint de conversão SAP ECC para S/4HANA com limpeza de customizações (de 480 para no máximo 180)
- Migração de banco de dados de 6,5 TB para SAP HANA em infraestrutura Azure, com disaster recovery em AWS
- Migração para Nuvem das 480 interfaces legadas, priorizando 120 integrações críticas via SAP BTP e APIs
- Conversão de módulos FI, CO, MM, PP e SD para o modelo de dados S/4HANA com testes de regressão em 9 plantas
- Ativação de 3.200 usuários com treinamento e hypercare de 8 semanas pós go-live

Tecnologias principais: SAP, Azure, AWS.

## 4. Abordagem e cronograma

O projeto será executado em 12 meses, nas seguintes fases:

- Assessment e blueprint (12 semanas)
- Conversão e migração de banco (20 semanas)
- Migração de integrações e testes (12 semanas)
- Cutover, go-live e hypercare (8 semanas)

## 5. Entregáveis

- Relatório de assessment com mapa de customizações e plano de conversão em 6 semanas
- Ambiente SAP S/4HANA em Azure provisionado e validado com DR em AWS
- 120 integrações críticas migradas e testadas via SAP BTP
- Plano de cutover com janela de 72 horas e plano de rollback documentado
- Relatório de hypercare com 3.200 usuários treinados e 95% dos tickets críticos resolvidos

## 6. Equipe proposta

1 gerente de projeto, 1 arquiteto SAP S/4HANA, 2 consultores funcionais SAP, 2 engenheiros de nuvem (Azure/AWS) e 1 especialista em integração SAP BTP.

## 7. Premissas e riscos

- Risco: Volume de customizações maior que o estimado no assessment
- Risco: Indisponibilidade de janela de cutover alinhada à produção das 9 plantas
- Risco: Dependência de fornecedores de infraestrutura para provisionamento Azure/AWS

## 8. Investimento

Investimento total: R$ 1.620.000, em parcelas mensais ao longo de 12 meses.

Margem praticada: 31%.
