---
projeto_id: P286
cliente: Eletro Mais
titulo: Migração do ERP legado para SAP S/4HANA em nuvem híbrida
segmento: Varejo
tecnologias: ["SAP","Azure","AWS"]
servicos: ["ERP","Migração para Nuvem","Change Management"]
area: Enterprise Apps
dono: Olívia Cardoso
confidencialidade: confidencial
status_proposta: Enviada
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P286
id: P286-PROP
tipo_documental: proposta_comercial
status_documento: final_enviada
data: 2026-09-11
prazo_meses: 10
valor: 2470000
margem: 0.31
---

# Proposta Comercial — Migração do ERP legado para SAP S/4HANA em nuvem híbrida

**Cliente:** Eletro Mais
**Segmento:** Varejo
**Área responsável:** Enterprise Apps · **Dono da proposta:** Olívia Cardoso
**Data:** 2026-09-11 · **Versão:** final

## 1. Contexto e desafio

A Eletro Mais opera com um ERP legado que sustenta 320 lojas e um e-commerce com pico de 45 mil pedidos/dia, mas enfrenta fechamentos contábeis de 12 dias e indisponibilidade de 6 horas em média por mês. A base de dados não integrada impede visão única de estoque em 7 centros de distribuição, gerando perda estimada de 3,5% em vendas por ruptura.

## 2. Objetivo

Migrar os processos de ERP para SAP S/4HANA em 10 meses, com infraestrutura em Azure e AWS, reduzindo o fechamento contábil para 4 dias e eliminando 80% das indisponibilidades não planejadas.

## 3. Escopo da solução

- Migração do ERP legado para SAP S/4HANA (FI, CO, MM, SD e WM) com conversão de 1,2 milhão de registros mestre
- Implantação de SAP S/4HANA em Azure como ambiente primário e AWS para disaster recovery e workloads analíticos
- Integração de 14 sistemas satélites (PDV, WMS, e-commerce) via APIs e SAP BTP
- Programa de Change Management com treinamento de 850 usuários em 3 ondas e rede de 40 multiplicadores
- Migração de 32 relatórios e 9 interfaces críticas para o novo modelo de dados
- Cutover assistido em janela de 72 horas com rollback testado

Tecnologias principais: SAP, Azure, AWS.

## 4. Abordagem e cronograma

O projeto será executado em 10 meses, nas seguintes fases:

- Discovery e blueprint (8 semanas)
- Build e conversão de dados (18 semanas)
- Testes integrados e treinamento (12 semanas)
- Cutover, go-live e hypercare (6 semanas)

## 5. Entregáveis

- Blueprint técnico e plano de migração aprovado em 6 semanas
- Ambientes SAP S/4HANA provisionados em Azure e AWS com DR validado
- Carga de dados mestres e transacionais convertidos e conciliados
- Pacote de treinamento e 850 usuários certificados por onda
- Go-live em produção com hypercare de 8 semanas e KPIs de estabilização

## 6. Equipe proposta

1 gerente de projeto, 2 arquitetos SAP S/4HANA, 4 consultores funcionais (FI/CO, MM, SD, WM), 2 engenheiros de nuvem (Azure/AWS), 1 especialista em change management e 1 analista de dados.

## 7. Premissas e riscos

- Risco: Qualidade dos dados mestres legados pode atrasar a conversão
- Risco: Janela de cutover de 72 horas sujeita a imprevistos de integração
- Risco: Baixa adesão dos 850 usuários ao novo processo no pico de vendas
- Risco: Dependência de fornecedores satélites para as 9 interfaces críticas

## 8. Investimento

Investimento total: R$ 2.470.000, em parcelas mensais ao longo de 10 meses.

Margem praticada: 31%.
