---
projeto_id: P312
cliente: Saúde Garantida Seguros
titulo: Precificação Dinâmica com Machine Learning para Seguros de Saúde
segmento: Seguros
tecnologias: ["Machine Learning","Python","GCP"]
servicos: ["Data Science / ML","Analytics & BI"]
area: Data & Analytics
dono: Leonardo Pires
confidencialidade: interna
status_proposta: Em execução
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P312
id: P312-PROP
tipo_documental: proposta_comercial
status_documento: final_aprovada
data: 2025-12-13
prazo_meses: 5
valor: 1920000
margem: 0.31
---

# Proposta Comercial — Precificação Dinâmica com Machine Learning para Seguros de Saúde

**Cliente:** Saúde Garantida Seguros
**Segmento:** Seguros
**Área responsável:** Data & Analytics · **Dono da proposta:** Leonardo Pires
**Data:** 2025-12-13 · **Versão:** final

## 1. Contexto e desafio

A Saúde Garantida Seguros enfrenta perda de competitividade em um mercado com mais de 1.200 apólices coletivas renegociadas por ano, hoje precificadas por planilhas e regras estáticas que levam até 9 dias para responder a uma cotação. A sinistralidade da carteira coletiva cresceu 6,8 pontos percentuais nos últimos 12 meses, pressionando o resultado técnico.

## 2. Objetivo

Implantar um motor de precificação dinâmica baseado em Machine Learning que reduza o tempo de resposta de cotação para menos de 1 dia e melhore a acurácia do prêmio técnico em 15%.

## 3. Escopo da solução

- Modelagem de risco e sinistralidade em Python com pipelines de feature engineering sobre histórico de apólices e sinistros
- Treinamento e validação de modelos de Machine Learning de precificação com monitoramento de deriva
- Deploy dos modelos em GCP (Vertex AI) com APIs de scoring integradas ao sistema de cotação
- Camada de Analytics & BI em GCP para acompanhamento de prêmio técnico, conversão e sinistralidade por segmento
- Governança de modelos com versionamento, trilhas de auditoria e painéis de explicabilidade para a área atuarial

Tecnologias principais: Machine Learning, Python, GCP.

## 4. Abordagem e cronograma

O projeto será executado em 5 meses, nas seguintes fases:

- Diagnóstico e preparação de dados (6 semanas)
- Desenvolvimento e validação dos modelos (8 semanas)
- Deploy em GCP e integração com cotação (4 semanas)
- Analytics & BI e transferência de conhecimento (2 semanas)

## 5. Entregáveis

- Documento de arquitetura de dados e modelagem aprovado pela área atuarial
- Modelos de precificação dinâmica treinados e validados em ambiente de homologação
- API de scoring em GCP integrada ao fluxo de cotação
- Dashboards de Analytics & BI com indicadores de prêmio, conversão e sinistralidade
- Plano de monitoramento e retreinamento dos modelos com SLAs definidos

## 6. Equipe proposta

1 gerente de projeto, 2 cientistas de dados, 1 engenheiro de dados e 1 analista de BI.

## 7. Premissas e riscos

- Risco: Qualidade e dispersão dos dados históricos de sinistros
- Risco: Baixa adoção do motor de precificação pela área comercial
- Risco: Restrições de latência na integração com o sistema de cotação

## 8. Investimento

Investimento total: R$ 1.920.000, em parcelas mensais ao longo de 5 meses.

Margem praticada: 31%.
