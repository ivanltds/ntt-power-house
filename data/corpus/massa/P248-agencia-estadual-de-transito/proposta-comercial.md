---
projeto_id: P248
cliente: Agência Estadual de Trânsito
titulo: Lakehouse de Dados para Integração AWS/Azure com Governança — Fase 2
segmento: Setor Público
tecnologias: ["AWS","Azure"]
servicos: ["Governança de Dados"]
area: Data & Analytics
dono: Xênia Lacerda
confidencialidade: confidencial
status_proposta: Em execução
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P248
id: P248-PROP
tipo_documental: proposta_comercial
status_documento: final_aprovada
data: 2026-09-12
prazo_meses: 5
valor: 3200000
margem: 0.32
---

# Proposta Comercial — Lakehouse de Dados para Integração AWS/Azure com Governança — Fase 2

**Cliente:** Agência Estadual de Trânsito
**Segmento:** Setor Público
**Área responsável:** Data & Analytics · **Dono da proposta:** Xênia Lacerda
**Data:** 2026-09-12 · **Versão:** final

## 1. Contexto e desafio

A Agência Estadual de Trânsito mantém dados operacionais distribuídos em 14 sistemas legados, com mais de 40 milhões de registros de veículos e condutores duplicados entre bases. Relatórios gerenciais levam até 9 dias para serem consolidados, comprometendo a fiscalização e a prestação de contas.

## 2. Objetivo

Evoluir a plataforma lakehouse em AWS e Azure, consolidando as fontes de dados com governança corporativa e reduzindo o tempo de disponibilização de dados analíticos para até 24 horas.

## 3. Escopo da solução

- Ingestão incremental de 14 fontes legadas no data lake em AWS S3, com catálogo no AWS Glue
- Camada analítica em Azure Synapse e Data Lake Storage Gen2 para consumo de relatórios e painéis
- Implementação de catálogo corporativo e linhagem de dados com políticas de governança de dados
- Definição de 120 regras de qualidade de dados e 35 indicadores de conformidade
- Pipelines de orquestração com monitoramento de SLA e alertas de falha

Tecnologias principais: AWS, Azure.

## 4. Abordagem e cronograma

O projeto será executado em 5 meses, nas seguintes fases:

- Diagnóstico e desenho de governança (4 semanas)
- Ingestão e catalogação de fontes (6 semanas)
- Camada analítica e regras de qualidade (6 semanas)
- Homologação e entrada em produção (4 semanas)

## 5. Entregáveis

- Catálogo de dados com 100% das fontes críticas mapeadas e linhagem documentada
- Pipeline de ingestão em produção para as 14 fontes legadas
- Painel de qualidade de dados com 120 regras ativas
- Documento de políticas de governança e matriz de responsabilidades (RACI)
- Relatório mensal de conformidade e SLA de dados

## 6. Equipe proposta

1 arquiteto de dados, 2 engenheiros de dados, 1 especialista em governança de dados e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Acesso restrito às bases legadas pode atrasar a ingestão
- Risco: Baixa qualidade dos dados de origem exige retrabalho nas regras
- Risco: Dependência de aprovação de mudanças pela área de TI do cliente

## 8. Investimento

Investimento total: R$ 3.200.000, em parcelas mensais ao longo de 5 meses.

Margem praticada: 32%.
