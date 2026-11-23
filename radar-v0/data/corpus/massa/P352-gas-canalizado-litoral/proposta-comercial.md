---
projeto_id: P352
cliente: Gás Canalizado Litoral
titulo: Modelo de ML para redução de perdas não técnicas em distribuidora de gás canalizado
segmento: Utilities / Energia
tecnologias: ["Power BI","Azure"]
servicos: ["Data Science / ML"]
area: Data & Analytics
dono: Quésia Ramos
confidencialidade: confidencial
status_proposta: Entregue
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P352
id: P352-PROP
tipo_documental: proposta_comercial
status_documento: final_aprovada
data: 2025-07-28
prazo_meses: 5
valor: 460000
margem: 0.19
---

# Proposta Comercial — Modelo de ML para redução de perdas não técnicas em distribuidora de gás canalizado

**Cliente:** Gás Canalizado Litoral
**Segmento:** Utilities / Energia
**Área responsável:** Data & Analytics · **Dono da proposta:** Quésia Ramos
**Data:** 2025-07-28 · **Versão:** final

## 1. Contexto e desafio

A Gás Canalizado Litoral operava com perdas não técnicas estimadas em 6,8% do volume faturado, equivalentes a cerca de R$ 14 milhões por ano, sem conseguir priorizar inspeções por risco. A detecção dependia de denúncias e varreduras manuais em 42 mil unidades consumidoras, com taxa de acerto de apenas 23% nas inspeções.

## 2. Objetivo

Reduzir as perdas não técnicas por meio de um modelo de priorização de inspeções baseado em dados de consumo, cadastro e histórico de irregularidades, com painéis de acompanhamento para a operação.

## 3. Escopo da solução

- Construção de pipeline de dados no Azure Data Lake e Azure Data Factory integrando medições, cadastro e histórico de inspeções
- Modelo de machine learning de propensão à irregularidade por unidade consumidora, com explicabilidade das variáveis
- Ranking semanal de inspeção com nota de risco e segmentação por rota e região
- Painéis no Power BI para acompanhamento de acurácia do modelo, produtividade das equipes e perdas recuperadas
- Rotina de monitoramento de deriva do modelo e retreinamento periódico no Azure Machine Learning

Tecnologias principais: Power BI, Azure.

## 4. Abordagem e cronograma

O projeto será executado em 5 meses, nas seguintes fases:

- Diagnóstico e preparação de dados (6 semanas)
- Desenvolvimento e validação do modelo (8 semanas)
- Painéis, integração operacional e treinamento (6 semanas)

## 5. Entregáveis

- Documento de arquitetura de dados e dicionário das variáveis do modelo
- Modelo de propensão à irregularidade validado com métricas de lift e precisão
- Painéis de Power BI de operação de inspeção e de resultados de perdas
- Manual de uso do ranking e playbook de inspeção por prioridade
- Relatório de resultados com baseline, ganhos e recomendações de continuidade

## 6. Equipe proposta

1 arquiteto de dados, 1 cientista de dados sênior, 1 engenheiro de dados e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Qualidade e cobertura dos dados de medição em parte da base
- Risco: Baixa adesão das equipes de campo ao ranking priorizado
- Risco: Prazo curto para retreinar e estabilizar o modelo em produção

## 8. Investimento

Investimento total: R$ 460.000, em parcelas mensais ao longo de 5 meses.

Margem praticada: 19%.
