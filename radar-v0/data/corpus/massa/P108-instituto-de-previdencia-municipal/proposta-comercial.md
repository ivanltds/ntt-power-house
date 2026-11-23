---
projeto_id: P108
cliente: Instituto de Previdência Municipal
titulo: Governança de Dados e Conformidade LGPD para Regime Próprio de Previdência
segmento: Setor Público
tecnologias: ["Azure","Python","Databricks","Snowflake"]
servicos: ["Governança de Dados"]
area: Data & Analytics
dono: Xênia Lacerda
confidencialidade: interna
status_proposta: Entregue
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P108
id: P108-PROP
tipo_documental: proposta_comercial
status_documento: final_aprovada
data: 2024-12-29
prazo_meses: 6
valor: 490000
margem: 0.21
---

# Proposta Comercial — Governança de Dados e Conformidade LGPD para Regime Próprio de Previdência

**Cliente:** Instituto de Previdência Municipal
**Segmento:** Setor Público
**Área responsável:** Data & Analytics · **Dono da proposta:** Xênia Lacerda
**Data:** 2024-12-29 · **Versão:** final

## 1. Contexto e desafio

O Instituto de Previdência Municipal administra cerca de 12 mil beneficiários entre servidores ativos, aposentados e pensionistas, com dados pessoais e financeiros dispersos em 7 sistemas legados e 43 planilhas manuais. A ausência de catálogo, políticas de classificação e trilhas de consentimento expunha o Instituto a riscos de sanções da ANPD e a inconsistências em relatórios atuariais enviados ao Tribunal de Contas.

## 2. Objetivo

Estruturar a governança de dados e adequar o Instituto à LGPD em 6 meses, criando catálogo único, políticas de classificação e controles de acesso rastreáveis sobre a base analítica em nuvem.

## 3. Escopo da solução

- Diagnóstico de maturidade de dados e mapeamento de 100% dos fluxos com dados pessoais, com base em entrevistas e inventário de fontes
- Implantação de catálogo e lineage no Databricks, com ingestão de dados dos sistemas de folha e previdência via Python e Azure Data Factory
- Modelagem de camadas Bronze, Silver e Gold no Snowflake para dados de beneficiários, com mascaramento e pseudonimização de campos sensíveis
- Definição de 18 políticas de classificação, retenção e descarte, além de matriz de papéis e bases legais por tratamento de dados
- Painel de conformidade em Azure com indicadores de consentimentos, acessos e incidentes, integrado ao fluxo de resposta a titulares

Tecnologias principais: Azure, Python, Databricks, Snowflake.

## 4. Abordagem e cronograma

O projeto será executado em 6 meses, nas seguintes fases:

- Diagnóstico e inventário (6 semanas)
- Desenho de políticas e arquitetura (6 semanas)
- Implantação técnica e catálogo (8 semanas)
- Painéis, treinamento e sustentação (6 semanas)

## 5. Entregáveis

- Relatório de diagnóstico de maturidade e inventário de dados pessoais com 7 fontes mapeadas
- Catálogo de dados e lineage no Databricks cobrindo 120 tabelas críticas
- Política de governança de dados e LGPD aprovada pela diretoria do Instituto
- Ambiente Snowflake com camadas de dados e regras de mascaramento em produção
- Dashboard de conformidade e plano de resposta a incidentes com 12 indicadores

## 6. Equipe proposta

1 arquiteto de dados, 1 especialista em privacidade e LGPD, 2 engenheiros de dados e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Baixa qualidade e padronização dos dados nos sistemas legados
- Risco: Disponibilidade limitada das áreas de RH e jurídico para validações
- Risco: Mudanças de interpretação regulatória da ANPD durante o projeto

## 8. Investimento

Investimento total: R$ 490.000, em parcelas mensais ao longo de 6 meses.

Margem praticada: 21%.
