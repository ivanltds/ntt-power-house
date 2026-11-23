---
projeto_id: P533
cliente: Frigorífico Campo Nobre
titulo: Previsão de safra e agricultura de precisão com Power BI e AWS para frigorífico
segmento: Agronegócio
tecnologias: ["Power BI","AWS"]
servicos: ["Analytics & BI","Data Science / ML"]
area: Data & Analytics
dono: André Vasconcelos
confidencialidade: interna
status_proposta: Entregue
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P533
id: P533-PROP
tipo_documental: proposta_comercial
status_documento: final_aprovada
data: 2025-04-03
prazo_meses: 6
valor: 1740000
margem: 0.28
---

# Proposta Comercial — Previsão de safra e agricultura de precisão com Power BI e AWS para frigorífico

**Cliente:** Frigorífico Campo Nobre
**Segmento:** Agronegócio
**Área responsável:** Data & Analytics · **Dono da proposta:** André Vasconcelos
**Data:** 2025-04-03 · **Versão:** final

## 1. Contexto e desafio

O Frigorífico Campo Nobre acompanhava a safra de soja e milho em 38 mil hectares de produtores integrados por meio de planilhas manuais, com defasagem de até 15 dias entre a coleta de campo e a consolidação gerencial. A ausência de previsão confiável de volume gerava compras emergenciais de grãos e variação de até 9% no custo de ração.

## 3. Escopo da solução

- Ingestão na AWS de dados de produtores, imagens de satélite e índices de vegetação (NDVI) de 38 mil hectares, com pipeline automatizado
- Modelos de Data Science/ML para previsão de produtividade por talhão e por cultura (soja e milho), com validação cruzada sobre 5 safras históricas
- Camada analítica na AWS com Data Lake e catálogo de dados para 12 fontes distintas integradas
- Dashboards em Power BI para acompanhamento de safra, clima e produtividade por fazenda, com atualização diária
- Alertas de anomalia de lavoura (estresse hídrico e queda de NDVI) enviados aos agrônomos em até 24 horas

Tecnologias principais: Power BI, AWS.

## 4. Abordagem e cronograma

O projeto será executado em 6 meses, nas seguintes fases:

- Diagnóstico e desenho da arquitetura (4 semanas)
- Ingestão e Data Lake na AWS (7 semanas)
- Modelagem de ML e validação de safra (8 semanas)
- Dashboards Power BI e implantação (5 semanas)

## 5. Entregáveis

- Modelo de previsão de safra em produção com erro médio absoluto de 6,8% na safra de validação
- Data Lake na AWS com 12 fontes integradas e catálogo de dados documentado
- 10 dashboards em Power BI para diretoria, compras e equipe de campo
- Relatório de agricultura de precisão por talhão com índice de vegetação e recomendação de manejo
- Manual técnico e treinamento de 24 usuários nas áreas de compras, agro e controladoria

## 6. Equipe proposta

1 arquiteto de dados, 2 engenheiros de dados, 1 cientista de dados, 1 analista de BI e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Qualidade e cobertura irregular dos dados históricos de produtores integrados
- Risco: Atraso na liberação de imagens de satélite e dados climáticos por terceiros
- Risco: Baixa adoção dos dashboards pelas equipes de campo durante a safra

## 8. Investimento

Investimento total: R$ 1.740.000, em parcelas mensais ao longo de 6 meses.

Margem praticada: 28%.
