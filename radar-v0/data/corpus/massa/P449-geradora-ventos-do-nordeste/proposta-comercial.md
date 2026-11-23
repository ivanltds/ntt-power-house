---
projeto_id: P449
cliente: Geradora Ventos do Nordeste
titulo: Redução de Perdas Não Técnicas com Analytics Avançado em Utilities
segmento: Utilities / Energia
tecnologias: ["Power BI","Databricks"]
servicos: ["Engenharia de Dados","Data Science / ML"]
area: Data & Analytics
dono: Nelson Barbosa
confidencialidade: confidencial
status_proposta: Entregue
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P449
id: P449-PROP
tipo_documental: proposta_comercial
status_documento: final_aprovada
data: 2024-08-21
prazo_meses: 8
valor: 1430000
margem: 0.29
---

# Proposta Comercial — Redução de Perdas Não Técnicas com Analytics Avançado em Utilities

**Cliente:** Geradora Ventos do Nordeste
**Segmento:** Utilities / Energia
**Área responsável:** Data & Analytics · **Dono da proposta:** Nelson Barbosa
**Data:** 2024-08-21 · **Versão:** final

## 1. Contexto e desafio

A Geradora Ventos do Nordeste identificou que 7,4% da energia distribuída em sua área de concessão era perdida por fraude e ligações irregulares, o que representava cerca de R$ 18 milhões em receita não faturada por ano. A detecção era feita por inspeções manuais em apenas 3% dos medidores por mês, sem priorização baseada em dados.

## 2. Objetivo

Reduzir as perdas não técnicas por meio de modelos de priorização de inspeções e de um painel analítico que oriente as equipes de campo às unidades com maior probabilidade de irregularidade.

## 3. Escopo da solução

- Construção de pipeline de ingestão de dados de medição, cadastro e inspeções no Databricks, com camadas bronze, silver e gold
- Desenvolvimento de modelo de machine learning para scoring de probabilidade de fraude por medidor, com features de consumo, histórico e perfil de rede
- Painéis no Power BI para priorização diária de inspeções por regional e acompanhamento de recuperação de receita
- Integração do scoring ao processo de field service, com atualização semanal dos rankings de inspeção
- Monitoramento de deriva do modelo e documentação dos indicadores de perdas não técnicas

Tecnologias principais: Power BI, Databricks.

## 4. Abordagem e cronograma

O projeto será executado em 8 meses, nas seguintes fases:

- Diagnóstico e engenharia de dados (10 semanas)
- Modelagem e validação do scoring (12 semanas)
- Painéis e integração operacional (8 semanas)
- Piloto, ajustes e transferência de conhecimento (4 semanas)

## 5. Entregáveis

- Pipeline de dados no Databricks com 24 meses de histórico de medição e inspeções tratado
- Modelo de scoring de fraude com AUC de validação acima de 0,80 e relatório de explicabilidade
- Painel Power BI com ranking de inspeções, taxa de acerto e receita recuperada por regional
- Guia de operação do processo de priorização e treinamento das equipes de campo
- Relatório final de resultados com comparação entre período baseline e pós-implantação

## 6. Equipe proposta

1 arquiteto de dados, 2 engenheiros de dados, 1 cientista de dados e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Qualidade e dispersão dos dados de medidores legados
- Risco: Baixa adesão das equipes de campo ao novo ranking de inspeções
- Risco: Mudanças regulatórias no cálculo de perdas durante o projeto

## 8. Investimento

Investimento total: R$ 1.430.000, em parcelas mensais ao longo de 8 meses.

Margem praticada: 29%.
