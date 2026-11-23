---
projeto_id: P464
cliente: Grãos do Cerrado Trading
titulo: Plataforma de previsão de safra e agricultura de precisão com AWS e Python
segmento: Agronegócio
tecnologias: ["AWS","Python"]
servicos: ["Data Science / ML","Analytics & BI"]
area: Data & Analytics
dono: André Vasconcelos
confidencialidade: confidencial
status_proposta: Perdida
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P464
id: P464-APRES
tipo_documental: apresentacao_comercial
status_documento: final
data: 2026-03-17
prazo_meses: 7
---

# Apresentação Comercial — Grãos do Cerrado Trading

## Slide 1 — Plataforma de previsão de safra e agricultura de precisão com AWS e Python

Grãos do Cerrado Trading · Agronegócio

## Slide 2 — O desafio

A Grãos do Cerrado Trading acompanha 320 mil hectares de soja e milho em 4 estados, mas a previsão de safra é feita em planilhas com defasagem de 15 dias e erro médio de 18% sobre a produção real. Isso gera decisões de compra e hedge tomadas com informação desatualizada e exposição de até R$ 40 milhões por safra.

## Slide 3 — Nossa proposta

Construir uma plataforma de previsão de safra e agricultura de precisão em AWS, com modelos em Python, reduzindo o erro de previsão para até 8% e atualizando os indicadores diariamente para as áreas de originação e trading.

## Slide 4 — Arquitetura e tecnologias

AWS · Python

- Ingestão de dados climáticos, imagens de satélite NDVI e histórico de produtividade de talhões em data lake na AWS (S3 e Glue)
- Pipeline de tratamento e feature engineering em Python para 320 mil hectares, com atualização diária via AWS Lambda e Step Functions
- Modelos de previsão de safra em Python (scikit-learn e XGBoost) por cultura, talhão e região, com validação em safras anteriores

## Slide 5 — Como vamos trabalhar

- Discovery e arquitetura de dados (6 semanas)
- Construção do data lake e pipelines de ingestão (8 semanas)
- Desenvolvimento e validação dos modelos de previsão (10 semanas)
- Painéis, integração e treinamento (4 semanas)

Duração total: 7 meses.

## Slide 6 — Por que nós

Experiência em Data Science / ML, Analytics & BI, com projeto anterior entregue para a Grãos do Cerrado Trading. Equipe: 1 arquiteto de dados, 2 engenheiros de dados, 2 cientistas de dados, 1 analista de BI e 1 gerente de projeto.

## Slide 7 — Próximos passos

Validar escopo com Renata Vasconcelos (Gerente de Originação e Inteligência de Mercado) e agendar o kickoff.
