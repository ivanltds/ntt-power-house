---
projeto_id: P132
cliente: Banco Aurora
titulo: Programa de FinOps e otimização de custos multicloud AWS e GCP
segmento: Serviços Financeiros
tecnologias: ["AWS","GCP"]
servicos: ["Migração para Nuvem","Analytics & BI"]
area: Cloud & Infra
dono: Flávia Guimarães
confidencialidade: interna
status_proposta: Entregue
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P132
id: P132-PROP
tipo_documental: proposta_comercial
status_documento: final_aprovada
data: 2025-05-18
prazo_meses: 4
valor: 2360000
margem: 0.24
---

# Proposta Comercial — Programa de FinOps e otimização de custos multicloud AWS e GCP

**Cliente:** Banco Aurora
**Segmento:** Serviços Financeiros
**Área responsável:** Cloud & Infra · **Dono da proposta:** Flávia Guimarães
**Data:** 2025-05-18 · **Versão:** final

## 1. Contexto e desafio

O Banco Aurora operava uma infraestrutura híbrida com gasto mensal de nuvem de aproximadamente R$ 4,2 milhões, distribuído entre AWS (62%) e GCP (38%), sem visibilidade por centro de custo e com 27% do parque de instâncias superprovisionado. A ausência de governança de custos impedia decisões de capacity planning e comprometia a meta de reduzir despesas de TI em 15% no exercício.

## 3. Escopo da solução

- Diagnóstico de custos e rateio por centro de custo e squad nas contas AWS e GCP, com tagging padronizado e dashboards em ferramenta de Analytics & BI
- Rightsizing de 640 instâncias EC2 e Compute Engine e migração de cargas elegíveis para instâncias Spot e Savings Plans/Committed Use Discounts
- Definição de políticas de FinOps, orçamentos e alertas de anomalia de gasto integrados às contas AWS e GCP
- Migração para Nuvem de 14 workloads on-premises remanescentes para AWS, com descomissionamento de servidores físicos
- Painel executivo mensal de custos unitários (custo por transação) e relatório de economia realizada por frente

Tecnologias principais: AWS, GCP.

## 4. Abordagem e cronograma

O projeto será executado em 4 meses, nas seguintes fases:

- Diagnóstico e visibilidade de custos (5 semanas)
- Plano de otimização e políticas de FinOps (3 semanas)
- Execução de rightsizing e migração de workloads (6 semanas)
- Painel executivo e transferência de conhecimento (3 semanas)

## 5. Entregáveis

- Relatório de diagnóstico de custos com mapa de calor por conta, serviço e squad
- Catálogo de tagging e dashboards de FinOps em BI com visão AWS e GCP
- Plano de otimização priorizado com 38 iniciativas e economia estimada por iniciativa
- 14 workloads migrados para AWS e 9 servidores físicos descomissionados
- Playbook de FinOps e painel executivo de custo unitário por transação

## 6. Equipe proposta

1 arquiteto de cloud, 2 engenheiros de FinOps, 1 engenheiro de dados de BI e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Resistência das squads à alteração de sizing e desligamento de recursos
- Risco: Janelas de mudança restritas em períodos de fechamento contábil
- Risco: Dados de billing incompletos por tagging inconsistente em contas legadas

## 8. Investimento

Investimento total: R$ 2.360.000, em parcelas mensais ao longo de 4 meses.

Margem praticada: 24%.
