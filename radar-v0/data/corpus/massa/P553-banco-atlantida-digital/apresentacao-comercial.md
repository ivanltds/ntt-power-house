---
projeto_id: P553
cliente: Banco Atlântida Digital
titulo: Detecção de Fraude em Tempo Real com Databricks e Kafka no Banco Atlântida Digital
segmento: Serviços Financeiros
tecnologias: ["Kafka","Databricks","Azure","Python"]
servicos: ["Data Science / ML","Change Management"]
area: AI & Automation
dono: Bruno Tavares
confidencialidade: interna
status_proposta: Cancelada
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P553
id: P553-APRES
tipo_documental: apresentacao_comercial
status_documento: final
data: 2026-05-30
prazo_meses: 4
---

# Apresentação Comercial — Banco Atlântida Digital

## Slide 1 — Detecção de Fraude em Tempo Real com Databricks e Kafka no Banco Atlântida Digital

Banco Atlântida Digital · Serviços Financeiros

## Slide 2 — O desafio

O Banco Atlântida Digital registra 2,3 milhões de transações/dia em canais digitais e enfrenta uma taxa de fraude de 0,42% do volume financeiro, com tempo médio de detecção de 36 horas. O modelo atual, baseado em regras estáticas, gera 1.800 falsos positivos por semana, sobrecarregando o time de análise e degradando a experiência de 480 mil clientes ativos.

## Slide 3 — Nossa proposta

Implantar uma plataforma de detecção de fraude em tempo real com modelos de ML, reduzindo o tempo de detecção para menos de 5 minutos e os falsos positivos em 40% em 4 meses.

## Slide 4 — Arquitetura e tecnologias

Kafka · Databricks · Azure · Python

- Ingestão de eventos transacionais via Kafka com throughput estimado de 60 msg/s e retenção de 7 dias
- Pipeline de features e treinamento de modelos de ML em Databricks com Python (scikit-learn e MLflow)
- Deploy de scoring em tempo real no Azure (AKS e Event Hubs) com latência alvo de 200 ms por transação

## Slide 5 — Como vamos trabalhar

- Discovery e arquitetura (4 semanas)
- Desenvolvimento de modelos e pipelines (8 semanas)
- Piloto em produção e Change Management (4 semanas)

Duração total: 4 meses.

## Slide 6 — Por que nós

Experiência em Data Science / ML, Change Management, com projeto anterior entregue para a Banco Atlântida Digital. Equipe: 1 arquiteto de dados, 2 engenheiros de dados, 1 cientista de dados sênior, 1 especialista em Change Management e 1 gerente de projeto.

## Slide 7 — Próximos passos

Validar escopo com Renata Vasconcelos (Diretora de Risco e Prevenção a Fraudes) e agendar o kickoff.
