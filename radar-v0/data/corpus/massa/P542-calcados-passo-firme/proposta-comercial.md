---
projeto_id: P542
cliente: Calçados Passo Firme
titulo: Migração de Data Warehouse para Nuvem Multi-Cloud no Varejo Calçadista
segmento: Varejo
tecnologias: ["AWS","Azure","GCP"]
servicos: ["Engenharia de Dados","Migração para Nuvem","Change Management"]
area: Cloud & Infra
dono: Débora Castilho
confidencialidade: confidencial
status_proposta: Perdida
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P542
id: P542-PROP
tipo_documental: proposta_comercial
status_documento: final_enviada
data: 2025-06-03
prazo_meses: 10
valor: 660000
margem: 0.3
---

# Proposta Comercial — Migração de Data Warehouse para Nuvem Multi-Cloud no Varejo Calçadista

**Cliente:** Calçados Passo Firme
**Segmento:** Varejo
**Área responsável:** Cloud & Infra · **Dono da proposta:** Débora Castilho
**Data:** 2025-06-03 · **Versão:** final

## 1. Contexto e desafio

A Calçados Passo Firme opera um data warehouse on-premises que processa cerca de 2,4 TB de dados de vendas, estoque e e-commerce de 380 lojas físicas, com janelas de carga noturna que chegam a 6 horas e relatórios gerenciais disponíveis apenas às 10h. O crescimento de 28% ao ano no volume de dados e a necessidade de analytics em near real-time para o time comercial pressionam a infraestrutura atual, que se aproxima do limite de capacidade.

## 2. Objetivo

Migrar o data warehouse on-premises para uma arquitetura em nuvem escalável e resiliente, reduzindo a janela de carga para menos de 2 horas e viabilizando relatórios analíticos antes das 8h.

## 3. Escopo da solução

- Avaliação e desenho de arquitetura multi-cloud comparando AWS, Azure e GCP quanto a custo, latência e serviços de data warehouse
- Migração dos 2,4 TB de dados históricos e 140 pipelines ETL para ambiente cloud-native
- Implementação de camada de ingestão e orquestração com reprocessamento idempotente e monitoramento de qualidade de dados
- Plano de change management com treinamento de 45 usuários das áreas comercial, financeira e supply chain
- Definição de política de FinOps e governança de custos para o ambiente cloud em AWS, Azure e GCP

Tecnologias principais: AWS, Azure, GCP.

## 4. Abordagem e cronograma

O projeto será executado em 10 meses, nas seguintes fases:

- Discovery e arquitetura-alvo (8 semanas)
- Migração de dados e pipelines (16 semanas)
- Homologação e go-live (10 semanas)
- Estabilização e change management (10 semanas)

## 5. Entregáveis

- Documento de arquitetura-alvo e business case comparativo entre AWS, Azure e GCP
- Data warehouse migrado e validado com paridade de 100% dos indicadores críticos
- 140 pipelines ETL reescritos e homologados em produção
- Programa de treinamento executado para 45 usuários com material de apoio
- Dashboard de FinOps com projeção de custo mensal e alertas de desvio

## 6. Equipe proposta

1 arquiteto de dados, 3 engenheiros de dados, 1 especialista em change management e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Janela de corte para migração dos dados históricos impactar a operação das lojas
- Risco: Complexidade de paridade entre múltiplas nuvens elevar o esforço de homologação
- Risco: Baixa adesão dos usuários ao novo modelo de relatórios no go-live

## 8. Investimento

Investimento total: R$ 660.000, em parcelas mensais ao longo de 10 meses.

Margem praticada: 30%.
