---
projeto_id: P314
cliente: Banco Horizonte Sul
titulo: Pipeline de dados em tempo real com Kafka e Databricks para analytics financeiro
segmento: Serviços Financeiros
tecnologias: ["Kafka","Databricks","Python","AWS"]
servicos: ["Engenharia de Dados"]
area: Data & Analytics
dono: Ana Beatriz Lopes
confidencialidade: interna
status_proposta: Perdida
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P314
id: P314-APRES
tipo_documental: apresentacao_comercial
status_documento: final
data: 2024-07-17
prazo_meses: 8
---

# Apresentação Comercial — Banco Horizonte Sul

## Slide 1 — Pipeline de dados em tempo real com Kafka e Databricks para analytics financeiro

Banco Horizonte Sul · Serviços Financeiros

## Slide 2 — O desafio

O Banco Horizonte Sul processa cerca de 4,2 milhões de transações por dia em 3 sistemas legados, mas os relatórios gerenciais chegam com até 36 horas de atraso. Isso limita a detecção de fraudes e a gestão de liquidez em janelas críticas, com perda estimada de R$ 1,8 milhão por trimestre em oportunidades de crédito e prevenção.

## Slide 3 — Nossa proposta

Implantar uma plataforma de streaming de dados em tempo real na AWS para disponibilizar eventos transacionais em menos de 5 segundos às áreas de risco e tesouraria, substituindo as cargas batch atuais.

## Slide 4 — Arquitetura e tecnologias

Kafka · Databricks · Python · AWS

- Ingestão de eventos transacionais com Kafka (MSK) a partir dos 3 sistemas de origem, com tópicos por domínio e retenção de 7 dias
- Camada de processamento e qualidade com Databricks (Delta Live Tables) e jobs em Python para deduplicação e enriquecimento
- Modelagem de tabelas Delta na AWS S3 com arquitetura medalhão (bronze, prata e ouro) para consumo analítico

## Slide 5 — Como vamos trabalhar

- Diagnóstico e arquitetura (6 semanas)
- Implementação da ingestão Kafka e camada bronze (10 semanas)
- Processamento Databricks e camada prata/ouro (12 semanas)
- Go-live assistido e hypercare (4 semanas)

Duração total: 8 meses.

## Slide 6 — Por que nós

Experiência em Engenharia de Dados, com projeto anterior entregue para a Banco Horizonte Sul. Equipe: 1 arquiteto de dados, 3 engenheiros de dados, 1 especialista em streaming e 1 gerente de projeto.

## Slide 7 — Próximos passos

Validar escopo com Renata Vasconcelos (Diretora de Data & Analytics) e agendar o kickoff.
