---
projeto_id: P396
cliente: Companhia de Saneamento Rio Claro
titulo: Detecção de Fraude em Tempo Real com Machine Learning e Kafka
segmento: Utilities / Energia
tecnologias: ["Machine Learning","Kafka"]
servicos: ["Data Science / ML"]
area: AI & Automation
dono: Karina Duarte
confidencialidade: confidencial
status_proposta: Em negociação
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P396
id: P396-APRES
tipo_documental: apresentacao_comercial
status_documento: final
data: 2026-07-16
prazo_meses: 8
---

# Apresentação Comercial — Companhia de Saneamento Rio Claro

## Slide 1 — Detecção de Fraude em Tempo Real com Machine Learning e Kafka

Companhia de Saneamento Rio Claro · Utilities / Energia

## Slide 2 — O desafio

A Companhia de Saneamento Rio Claro registra cerca de 1,2 milhão de ligações de água e 850 mil economias ativas, com perdas não técnicas estimadas em 18% do volume faturado. A análise de inconsistências de consumo hoje é manual e trimestral, cobrindo apenas 6% dos hidrômetros, o que atrasa a identificação de fraudes e limita a recuperação de receita a R$ 4,5 milhões por ano.

## Slide 3 — Nossa proposta

Implantar um motor de detecção de fraude em tempo real que priorize casos suspeitos com base em Machine Learning sobre o fluxo de leituras e eventos, elevando a taxa de acerto das vistorias e ampliando a recuperação de receita não técnica.

## Slide 4 — Arquitetura e tecnologias

Machine Learning · Kafka

- Ingestão contínua de leituras de hidrômetros e eventos de campo via Apache Kafka, com tópicos segregados por região e latência máxima de 5 segundos
- Modelos de Machine Learning para scoring de anomalias de consumo, com explicabilidade das variáveis e retreino mensal
- Pipeline de features em streaming combinando histórico de consumo, inadimplência e ocorrências de vistoria

## Slide 5 — Como vamos trabalhar

- Diagnóstico e preparação de dados (6 semanas)
- Desenvolvimento dos modelos e pipeline Kafka (14 semanas)
- Integração com operação de campo e piloto (8 semanas)
- Go-live, estabilização e transferência de conhecimento (4 semanas)

Duração total: 8 meses.

## Slide 6 — Por que nós

Experiência em Data Science / ML, com projeto anterior entregue para a Companhia de Saneamento Rio Claro. Equipe: 1 arquiteto de dados, 2 cientistas de dados, 1 engenheiro de dados, 1 especialista em Kafka e 1 gerente de projeto.

## Slide 7 — Próximos passos

Validar escopo com Marcelo Tavares (Gerente de Receita e Combate a Perdas) e agendar o kickoff.
