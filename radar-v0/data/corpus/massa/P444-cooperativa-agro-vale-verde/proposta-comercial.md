---
projeto_id: P444
cliente: Cooperativa Agro Vale Verde
titulo: Previsão de Demanda e Reposição Inteligente para Cooperativa Agro Vale Verde
segmento: Agronegócio
tecnologias: ["Machine Learning","Snowflake","SAP"]
servicos: ["Engenharia de Dados","Data Science / ML"]
area: Data & Analytics
dono: André Vasconcelos
confidencialidade: confidencial
status_proposta: Cancelada
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P444
id: P444-PROP
tipo_documental: proposta_comercial
status_documento: final_enviada
data: 2026-08-16
prazo_meses: 5
valor: 5000000
margem: 0.2
---

# Proposta Comercial — Previsão de Demanda e Reposição Inteligente para Cooperativa Agro Vale Verde

**Cliente:** Cooperativa Agro Vale Verde
**Segmento:** Agronegócio
**Área responsável:** Data & Analytics · **Dono da proposta:** André Vasconcelos
**Data:** 2026-08-16 · **Versão:** final

## 1. Contexto e desafio

A Cooperativa Agro Vale Verde, com 3.200 cooperados e 18 unidades de recebimento, opera hoje com um índice de ruptura de estoque de 11% nos insumos de maior giro e perdas de 4,5% em produtos perecíveis por excesso de reposição. A previsão de demanda é feita em planilhas manuais, com horizonte de apenas 15 dias e baixa acurácia em períodos de safra.

## 2. Objetivo

Implantar um modelo de previsão de demanda e reposição automatizada com horizonte de 90 dias, integrando dados de vendas, safra e estoque, visando reduzir a ruptura para menos de 5% e o excesso de estoque em 20%.

## 3. Escopo da solução

- Engenharia de dados para ingestão e modelagem das bases de vendas, estoque e safra no Snowflake, com pipelines em lote diário
- Construção de modelos de Machine Learning para previsão de demanda por SKU e unidade, com acurácia alvo de MAPE abaixo de 18%
- Integração das recomendações de reposição ao SAP (MM/SD) por meio de interfaces de pedidos sugeridos
- Painéis de acompanhamento de acurácia, ruptura e nível de serviço para as áreas comercial e de suprimentos
- Definição de rotina de retreinamento e monitoramento de deriva dos modelos de Machine Learning

Tecnologias principais: Machine Learning, Snowflake, SAP.

## 4. Abordagem e cronograma

O projeto será executado em 5 meses, nas seguintes fases:

- Diagnóstico e engenharia de dados (6 semanas)
- Desenvolvimento dos modelos de previsão (8 semanas)
- Integração com SAP e reposição automatizada (5 semanas)
- Homologação e transferência de conhecimento (3 semanas)

## 5. Entregáveis

- Data lake Snowflake com camadas raw, tratada e analítica documentadas
- Modelos de previsão de demanda treinados e validados para as 6 principais famílias de produtos
- Motor de reposição com regras de ponto de pedido e lote econômico integrado ao SAP
- Dashboard de KPIs de acurácia, ruptura e giro de estoque
- Relatório de transferência de conhecimento e playbook de operação dos modelos

## 6. Equipe proposta

1 arquiteto de dados, 2 engenheiros de dados, 2 cientistas de dados e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Qualidade e dispersão dos dados históricos de vendas por unidade
- Risco: Baixa adesão das áreas de suprimentos às recomendações automáticas
- Risco: Restrições de janela para interfaces com o SAP em período de safra

## 8. Investimento

Investimento total: R$ 5.000.000, em parcelas mensais ao longo de 5 meses.

Margem praticada: 20%.
