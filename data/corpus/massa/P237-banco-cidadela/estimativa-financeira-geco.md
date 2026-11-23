---
projeto_id: P237
cliente: Banco Cidadela
titulo: Migração multicloud de data warehouse para AWS, GCP e Azure
segmento: Serviços Financeiros
tecnologias: ["AWS","GCP","Azure"]
servicos: ["Migração para Nuvem","Engenharia de Dados"]
area: Cloud & Infra
dono: Débora Castilho
confidencialidade: interna
status_proposta: Entregue
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P237
id: P237-FIN
tipo_documental: estimativa_preliminar
status_documento: preliminar
data: 2025-12-09
prazo_meses: 2
valor: 550000
---

# Estimativa financeira (GECO) — Banco Cidadela

Documento de trabalho da pré-venda, montado no template GECO do mês. Use como referência de estrutura e equipe; a versão vigente do template fica no Ibiza.

## Premissas

- Escopo considerado: Avaliação e desenho da arquitetura-alvo multicloud, definindo cargas analíticas em AWS (Redshift), GCP (BigQuery) e Azure (Synapse); Migração de 180 TB de dados históricos com validação de integridade e reconciliação de 100% dos registros.
- Tecnologias assumidas: AWS, GCP, Azure.
- Reserva de risco de 5% e provisão de desvio de delivery conforme a matriz da unidade.

## Esforço e prazo

Prazo estimado: 2 meses.

Equipe estimada: 1 arquiteto de dados, 3 engenheiros de dados, 1 especialista em cloud e 1 gerente de projeto.

## Valor de referência

Valor preliminar: R$ 550.000 (sem contingência).

## Pontos em aberto

- Indisponibilidade de janela de cutover por conflito com fechamento contábil
- Divergências de reconciliação em bases legadas com dados duplicados
- Dependência de acessos e credenciais das três nuvens concedidos pelo cliente
