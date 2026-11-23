---
projeto_id: P263
cliente: Casa & Construção Prime
titulo: Detecção de Fraude em Tempo Real para Rede de Varejo de Materiais de Construção
segmento: Varejo
tecnologias: ["Python","Kafka"]
servicos: ["Engenharia de Dados","Data Science / ML"]
area: AI & Automation
dono: Rafael Gonçalves
confidencialidade: interna
status_proposta: Perdida
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P263
id: P263-FIN
tipo_documental: estimativa_preliminar
status_documento: preliminar
data: 2025-11-01
prazo_meses: 6
valor: 2030000
---

# Estimativa financeira (GECO) — Casa & Construção Prime

Documento de trabalho da pré-venda, montado no template GECO do mês. Use como referência de estrutura e equipe; a versão vigente do template fica no Ibiza.

## Premissas

- Escopo considerado: Ingestão em streaming de transações de PDV e e-commerce via Kafka, com schema padronizado e latência-alvo abaixo de 2 segundos; Pipeline de engenharia de dados em Python para features de risco (velocidade de compras, devoluções, cupons, dispositivo).
- Tecnologias assumidas: Python, Kafka.
- Reserva de risco de 5% e provisão de desvio de delivery conforme a matriz da unidade.

## Esforço e prazo

Prazo estimado: 6 meses.

Equipe estimada: 1 arquiteto de dados, 2 engenheiros de dados, 2 cientistas de dados e 1 gerente de projeto.

## Valor de referência

Valor preliminar: R$ 2.030.000 (sem contingência).

## Pontos em aberto

- Qualidade e atraso na liberação do histórico transacional
- Latência do PDV acima do suportado pelo serviço de decisão
- Volume de falsos positivos gerando sobrecarga na equipe de prevenção
