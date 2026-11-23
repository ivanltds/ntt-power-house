---
projeto_id: P331
cliente: Grãos do Cerrado Trading
titulo: Previsão de safra e agricultura de precisão com ML e Power BI
segmento: Agronegócio
tecnologias: ["Machine Learning","Python","AWS","Power BI"]
servicos: ["Analytics & BI","Data Science / ML"]
area: Data & Analytics
dono: André Vasconcelos
confidencialidade: interna
status_proposta: Entregue
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P331
id: P331-PROP
tipo_documental: proposta_comercial
status_documento: final_aprovada
data: 2025-01-05
prazo_meses: 7
valor: 1620000
margem: 0.27
---

# Proposta Comercial — Previsão de safra e agricultura de precisão com ML e Power BI

**Cliente:** Grãos do Cerrado Trading
**Segmento:** Agronegócio
**Área responsável:** Data & Analytics · **Dono da proposta:** André Vasconcelos
**Data:** 2025-01-05 · **Versão:** final

## 1. Contexto e desafio

A Grãos do Cerrado Trading gerencia cerca de 180 mil hectares de soja e milho em três estados e não conseguia estimar produtividade com antecedência confiável, errando as previsões de safra em até 22%. Isso gerava compras emergenciais de insumos, custos logísticos extras de aproximadamente R$ 4,2 milhões por ciclo e dificuldade para fechar contratos de venda futura com segurança.

## 3. Escopo da solução

- Modelos de Machine Learning em Python para previsão de produtividade por talhão, integrando séries históricas de produtividade, dados climáticos e NDVI
- Pipeline de ingestão e tratamento de dados em AWS (S3, Glue e Athena) com dados de sensores de máquinas, imagens de satélite e estações meteorológicas
- Feature engineering e validação cruzada por safra e por região produtora, com métricas MAPE e MAE reportadas por cultura
- Dashboard em Power BI com previsão por talhão, comparação safra atual versus histórico e alertas de anomalia de desenvolvimento
- Documentação técnica, notebooks de reprodutibilidade e capacitação do time de agronomia para uso dos painéis

Tecnologias principais: Machine Learning, Python, AWS, Power BI.

## 4. Abordagem e cronograma

O projeto será executado em 7 meses, nas seguintes fases:

- Diagnóstico e preparação de dados (5 semanas)
- Desenvolvimento e validação dos modelos de ML (10 semanas)
- Painéis Power BI e pipeline em produção na AWS (9 semanas)
- Backtesting, capacitação e encerramento (4 semanas)

## 5. Entregáveis

- Modelo de previsão de produtividade de soja e milho por talhão, com MAPE de 9,4% em validação out-of-sample
- Pipeline de dados em AWS operacional e documentado, com atualização diária de dados climáticos e de satélite
- Dashboard Power BI de previsão de safra e agricultura de precisão com 6 visões analíticas
- Relatório de backtesting comparando três safras históricas e recomendações de uso do modelo
- Treinamento de 18 horas para 24 analistas e agrônomos do cliente

## 6. Equipe proposta

1 gerente de projeto, 1 arquiteto de dados, 2 cientistas de dados, 2 engenheiros de dados e 1 especialista de BI.

## 7. Premissas e riscos

- Risco: Qualidade e cobertura irregular de dados históricos de talhões mais antigos
- Risco: Dependência de terceiros para disponibilização tempestiva de imagens de satélite
- Risco: Baixa adoção dos painéis pela equipe de campo sem acompanhamento pós-entrega

## 8. Investimento

Investimento total: R$ 1.620.000, em parcelas mensais ao longo de 7 meses.

Margem praticada: 27%.
