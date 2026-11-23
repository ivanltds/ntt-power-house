---
projeto_id: P173
cliente: Geradora Ventos do Nordeste
titulo: Plataforma de Indicadores ESG e Monitoramento de Emissões para o Setor Eólico
segmento: Utilities / Energia
tecnologias: ["Python","Azure","Power BI"]
servicos: ["Governança de Dados"]
area: Data & Analytics
dono: Nelson Barbosa
confidencialidade: interna
status_proposta: Perdida
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P173
id: P173-PROP
tipo_documental: proposta_comercial
status_documento: final_enviada
data: 2025-02-09
prazo_meses: 5
valor: 890000
margem: 0.33
---

# Proposta Comercial — Plataforma de Indicadores ESG e Monitoramento de Emissões para o Setor Eólico

**Cliente:** Geradora Ventos do Nordeste
**Segmento:** Utilities / Energia
**Área responsável:** Data & Analytics · **Dono da proposta:** Nelson Barbosa
**Data:** 2025-02-09 · **Versão:** final

## 1. Contexto e desafio

A Geradora Ventos do Nordeste opera 14 parques eólicos com 620 MW de capacidade instalada e precisa consolidar indicadores ESG e dados de emissões de escopo 1 e 2 exigidos por 3 bancos financiadores e pelo mercado regulado. Hoje o acompanhamento é feito em 27 planilhas manuais, com atraso médio de 18 dias na consolidação mensal e risco de inconsistência nos relatórios anuais de sustentabilidade.

## 2. Objetivo

Estruturar uma base governada de dados ESG e emissões em Azure, com pipelines em Python e painéis em Power BI, garantindo consolidação mensal em até 2 dias úteis e rastreabilidade auditável dos indicadores.

## 3. Escopo da solução

- Desenho da arquitetura de dados ESG em Azure (Data Lake e Synapse) integrando medições dos 14 parques e sistemas de faturamento de energia
- Desenvolvimento de pipelines em Python para ingestão, tratamento e cálculo de emissões de escopo 1 e 2 conforme metodologia GHG Protocol
- Implementação de catálogo de dados, linhagem e regras de qualidade para 45 indicadores ESG prioritários
- Construção de 6 dashboards em Power BI para diretoria, área de sustentabilidade e financiadores
- Definição do modelo de governança de dados com papéis, políticas de acesso e rotina de validação mensal

Tecnologias principais: Python, Azure, Power BI.

## 4. Abordagem e cronograma

O projeto será executado em 5 meses, nas seguintes fases:

- Diagnóstico e arquitetura de dados (5 semanas)
- Engenharia de pipelines e cálculos de emissões (7 semanas)
- Governança e dashboards em Power BI (6 semanas)
- Homologação, treinamento e go-live (4 semanas)

## 5. Entregáveis

- Documento de arquitetura de dados ESG e plano de governança aprovado
- Pipelines em Python em produção para cálculo automatizado de emissões de escopo 1 e 2
- Catálogo com 45 indicadores ESG documentados, com regras de qualidade e linhagem
- 6 dashboards em Power BI publicados e validados pelas áreas de negócio
- Relatório de encerramento com plano de sustentação e capacitação de 12 usuários-chave

## 6. Equipe proposta

1 arquiteto de dados, 2 engenheiros de dados, 1 especialista em governança de dados, 1 analista de BI e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Baixa qualidade e dispersão dos dados históricos dos parques eólicos
- Risco: Dependência de validação externa da metodologia de emissões pelos financiadores
- Risco: Indisponibilidade das áreas de negócio para homologar indicadores dentro do cronograma

## 8. Investimento

Investimento total: R$ 890.000, em parcelas mensais ao longo de 5 meses.

Margem praticada: 33%.
