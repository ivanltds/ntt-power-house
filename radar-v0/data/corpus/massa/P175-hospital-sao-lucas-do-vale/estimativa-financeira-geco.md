---
projeto_id: P175
cliente: Hospital São Lucas do Vale
titulo: Lakehouse Clínico para Análise Assistencial e Operacional
segmento: Saúde
tecnologias: ["AWS","Kafka","Python","Azure"]
servicos: ["Engenharia de Dados"]
area: Data & Analytics
dono: Eduarda Prado
confidencialidade: confidencial
status_proposta: Em elaboração
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P175
id: P175-FIN
tipo_documental: estimativa_preliminar
status_documento: preliminar
data: 2026-11-07
prazo_meses: 6
valor: 1040000
---

# Estimativa financeira (GECO) — Hospital São Lucas do Vale

Documento de trabalho da pré-venda, montado no template GECO do mês. Use como referência de estrutura e equipe; a versão vigente do template fica no Ibiza.

## Premissas

- Escopo considerado: Ingestão de dados do prontuário eletrônico, ERP hospitalar e faturamento com Apache Kafka em pipelines de streaming e batch em Python; Construção do lakehouse na AWS com camadas bronze, silver e gold em Amazon S3 e catálogo de dados no AWS Glue.
- Tecnologias assumidas: AWS, Kafka, Python, Azure.
- Reserva de risco de 5% e provisão de desvio de delivery conforme a matriz da unidade.

## Esforço e prazo

Prazo estimado: 6 meses.

Equipe estimada: 1 arquiteto de dados, 2 engenheiros de dados, 1 especialista em integração e 1 gerente de projeto.

## Valor de referência

Valor preliminar: R$ 1.040.000 (sem contingência).

## Pontos em aberto

- Qualidade e padronização dos dados legados do prontuário eletrônico podem exigir esforço adicional de tratamento
- Restrições de conformidade e privacidade de dados de saúde (LGPD) podem atrasar aprovações de acesso
- Disponibilidade limitada das equipes do hospital para validação dos indicadores durante o projeto
