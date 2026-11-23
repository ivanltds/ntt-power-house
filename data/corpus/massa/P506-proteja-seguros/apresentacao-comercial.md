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
id: P506-APRES
tipo_documental: apresentacao_comercial
status_documento: final
data: 2024-07-15
prazo_meses: 4
---

# Apresentação Comercial — Proteja Seguros

## Slide 1 — Leitura e triagem de documentos com IA generativa para sinistros

Proteja Seguros · Seguros

## Slide 2 — O desafio

A Proteja Seguros recebia cerca de 42 mil documentos por mês (boletins de ocorrência, laudos, notas fiscais e apólices) em formatos PDF e imagem, com triagem 100% manual feita por 18 analistas. O tempo médio de abertura de sinistro chegava a 3,5 dias úteis e 27% dos documentos exigiam retrabalho por classificação incorreta.

## Slide 3 — Nossa proposta

Automatizar a leitura, a extração de dados e a triagem de documentos de sinistros com IA generativa na AWS, reduzindo o tempo de triagem e o retrabalho manual.

## Slide 4 — Arquitetura e tecnologias

AWS · IA Generativa

- Ingestão de documentos em lote e via API no Amazon S3, com controle de versionamento e trilha de auditoria.
- Extração e classificação de campos críticos (número da apólice, data do evento, valor reclamado, tipo de documento) com Amazon Textract e modelos de IA generativa no Amazon Bedrock.
- Pipeline de orquestração em AWS Step Functions e AWS Lambda para roteamento automático dos documentos por fila de análise.

## Slide 5 — Como vamos trabalhar

- Diagnóstico e desenho da solução (4 semanas)
- Desenvolvimento do pipeline e dos prompts no Bedrock (7 semanas)
- Piloto com 3 tipos de documento e ajuste de acurácia (3 semanas)
- Rollout, treinamento e estabilização (2 semanas)

Duração total: 4 meses.

## Slide 6 — Por que nós

Experiência em Automação de Processos, com projeto anterior entregue para a Proteja Seguros. Equipe: 1 arquiteto de soluções AWS, 2 engenheiros de IA/ML, 1 desenvolvedor backend e 1 gerente de projeto.

## Slide 7 — Próximos passos

Validar escopo com Renata Vasconcelos (Diretora de Sinistros) e agendar o kickoff.
