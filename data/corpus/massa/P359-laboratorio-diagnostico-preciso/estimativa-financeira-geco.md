---
projeto_id: P359
cliente: Laboratório Diagnóstico Preciso
titulo: Lakehouse de Dados Clínicos para Analytics e Governança em Saúde Diagnóstica
segmento: Saúde
tecnologias: ["Kafka","Python","Snowflake"]
servicos: ["Engenharia de Dados","Governança de Dados","Migração para Nuvem"]
area: Data & Analytics
dono: Quésia Ramos
confidencialidade: interna
status_proposta: Em elaboração
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P359
id: P359-FIN
tipo_documental: estimativa_preliminar
status_documento: preliminar
data: 2026-09-10
prazo_meses: 11
valor: 2380000
---

# Estimativa financeira (GECO) — Laboratório Diagnóstico Preciso

Documento de trabalho da pré-venda, montado no template GECO do mês. Use como referência de estrutura e equipe; a versão vigente do template fica no Ibiza.

## Premissas

- Escopo considerado: Ingestão contínua de eventos de exames e faturamento via Kafka, com tópicos segregados por domínio e retenção de 30 dias; Desenvolvimento de pipelines em Python para tratamento, deduplicação e carga incremental no Snowflake.
- Tecnologias assumidas: Kafka, Python, Snowflake.
- Reserva de risco de 5% e provisão de desvio de delivery conforme a matriz da unidade.

## Esforço e prazo

Prazo estimado: 11 meses.

Equipe estimada: 1 arquiteto de dados, 3 engenheiros de dados, 1 especialista em governança de dados e 1 gerente de projeto.

## Valor de referência

Valor preliminar: R$ 2.380.000 (sem contingência).

## Pontos em aberto

- Qualidade dos dados legados pode exigir esforço extra de tratamento
- Restrições de conformidade LGPD podem atrasar liberação de acessos
- Janela de corte da migração pode impactar a operação do laboratório
