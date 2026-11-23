---
projeto_id: P122
cliente: Geradora Ventos do Nordeste
titulo: Plataforma de Indicadores ESG e Monitoramento de Emissões para Geração Eólica
segmento: Utilities / Energia
tecnologias: ["Azure","Power BI","Python","Snowflake"]
servicos: ["Analytics & BI","Governança de Dados","Change Management"]
area: Data & Analytics
dono: Nelson Barbosa
confidencialidade: interna
status_proposta: Entregue
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P122
id: P122-PROP
tipo_documental: proposta_comercial
status_documento: final_aprovada
data: 2025-10-14
prazo_meses: 3
valor: 520000
margem: 0.19
---

# Proposta Comercial — Plataforma de Indicadores ESG e Monitoramento de Emissões para Geração Eólica

**Cliente:** Geradora Ventos do Nordeste
**Segmento:** Utilities / Energia
**Área responsável:** Data & Analytics · **Dono da proposta:** Nelson Barbosa
**Data:** 2025-10-14 · **Versão:** final

## 1. Contexto e desafio

A Geradora Ventos do Nordeste precisava consolidar dados de emissões e indicadores ESG de 14 parques eólicos e 3 centros de operação, hoje dispersos em planilhas e sistemas operacionais distintos. O processo de reporte trimestral consumia cerca de 320 horas de trabalho manual por ciclo e gerava risco de inconsistência em auditorias e no atendimento a exigências de financiadores.

## 2. Objetivo

Implantar uma plataforma analítica centralizada em nuvem para medir, monitorar e reportar indicadores ESG e emissões com rastreabilidade, automatizando a consolidação de dados e reduzindo o esforço manual de reporte.

## 3. Escopo da solução

- Ingestão automatizada de dados operacionais e de emissões via pipelines em Python, integrados ao Snowflake como camada analítica central
- Modelagem dimensional de indicadores ESG (escopo 1, 2 e 3, consumo hídrico, resíduos e segurança do trabalho) no Snowflake
- Construção de dashboards e relatórios gerenciais em Power BI para acompanhamento mensal e trimestral por parque e por centro de operação
- Implementação de camada de governança de dados no Azure, com catálogo, dicionário de dados e políticas de qualidade e linhagem
- Definição de trilha de auditoria e validações automatizadas para garantir consistência dos números reportados a financiadores

Tecnologias principais: Azure, Power BI, Python, Snowflake.

## 4. Abordagem e cronograma

O projeto será executado em 3 meses, nas seguintes fases:

- Diagnóstico e desenho da arquitetura de dados (3 semanas)
- Construção dos pipelines e modelo analítico no Snowflake (5 semanas)
- Desenvolvimento dos painéis em Power BI e validação com áreas de negócio (3 semanas)
- Governança, treinamento e go-live assistido (2 semanas)

## 5. Entregáveis

- Pipeline de ingestão e tratamento de dados ESG em produção no Azure e Snowflake
- Modelo de dados ESG documentado com dicionário e regras de qualidade
- Painéis em Power BI para reporte mensal e trimestral, com visões por parque e consolidada
- Catálogo de dados e políticas de governança implantados na plataforma Azure
- Plano de change management com treinamento de 45 usuários e material de apoio ao reporte

## 6. Equipe proposta

1 arquiteto de dados, 2 engenheiros de dados, 1 especialista em BI, 1 analista de governança de dados e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Baixa qualidade e padronização dos dados históricos de emissões
- Risco: Dependência de validação de números pelas áreas de sustentabilidade e financeiro
- Risco: Prazo curto de 3 meses para go-live com escopo de governança amplo

## 8. Investimento

Investimento total: R$ 520.000, em parcelas mensais ao longo de 3 meses.

Margem praticada: 19%.
