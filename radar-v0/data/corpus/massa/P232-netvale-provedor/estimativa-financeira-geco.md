---
projeto_id: P232
cliente: NetVale Provedor
titulo: Plataforma Lakehouse na AWS com Kafka e Snowflake para Análise de Dados
segmento: Telecom
tecnologias: ["AWS","Kafka","Snowflake","Python"]
servicos: ["Engenharia de Dados","Governança de Dados","Migração para Nuvem"]
area: Data & Analytics
dono: Henrique Matos
confidencialidade: interna
status_proposta: Enviada
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P232
id: P232-FIN
tipo_documental: estimativa_preliminar
status_documento: preliminar
data: 2026-11-02
prazo_meses: 5
valor: 1440000
---

# Estimativa financeira (GECO) — NetVale Provedor

Documento de trabalho da pré-venda, montado no template GECO do mês. Use como referência de estrutura e equipe; a versão vigente do template fica no Ibiza.

## Premissas

- Escopo considerado: Ingestão em streaming de eventos de rede e atendimento com Apache Kafka na AWS (Amazon MSK); Construção de camadas bronze, prata e ouro em Amazon S3 com pipelines em Python e AWS Glue.
- Tecnologias assumidas: AWS, Kafka, Snowflake, Python.
- Reserva de risco de 5% e provisão de desvio de delivery conforme a matriz da unidade.

## Esforço e prazo

Prazo estimado: 5 meses.

Equipe estimada: 1 arquiteto de dados, 2 engenheiros de dados, 1 especialista em governança de dados e 1 gerente de projeto.

## Valor de referência

Valor preliminar: R$ 1.440.000 (sem contingência).

## Pontos em aberto

- Qualidade dos dados legados pode exigir esforço extra de limpeza
- Janela de migração limitada pela operação 24x7 do provedor
- Dependência de acesso à infraestrutura de rede do cliente para ingestão Kafka
