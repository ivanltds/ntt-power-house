---
projeto_id: P506
cliente: Proteja Seguros
titulo: Leitura e triagem de documentos com IA generativa para sinistros
segmento: Seguros
tecnologias: ["AWS","IA Generativa"]
servicos: ["Automação de Processos"]
area: AI & Automation
dono: Karina Duarte
confidencialidade: confidencial
status_proposta: Entregue
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P506
id: P506-FIN
tipo_documental: estimativa_preliminar
status_documento: preliminar
data: 2024-07-02
prazo_meses: 3
valor: 1400000
---

# Estimativa financeira (GECO) — Proteja Seguros

Documento de trabalho da pré-venda, montado no template GECO do mês. Use como referência de estrutura e equipe; a versão vigente do template fica no Ibiza.

## Premissas

- Escopo considerado: Ingestão de documentos em lote e via API no Amazon S3, com controle de versionamento e trilha de auditoria.; Extração e classificação de campos críticos (número da apólice, data do evento, valor reclamado, tipo de documento) com Amazon Textract e modelos de IA generativa no Amazon Bedrock..
- Tecnologias assumidas: AWS, IA Generativa.
- Reserva de risco de 5% e provisão de desvio de delivery conforme a matriz da unidade.

## Esforço e prazo

Prazo estimado: 3 meses.

Equipe estimada: 1 arquiteto de soluções AWS, 2 engenheiros de IA/ML, 1 desenvolvedor backend e 1 gerente de projeto.

## Valor de referência

Valor preliminar: R$ 1.400.000 (sem contingência).

## Pontos em aberto

- Qualidade variável de digitalização dos documentos recebidos
- Aderência dos analistas ao novo fluxo de validação humana
- Limites de cota do Amazon Bedrock durante picos de volume
