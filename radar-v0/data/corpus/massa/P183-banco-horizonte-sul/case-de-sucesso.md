---
projeto_id: P183
cliente: Banco Horizonte Sul
titulo: Pipeline de dados em tempo real para análise de risco e crédito com Azure e Python
segmento: Serviços Financeiros
tecnologias: ["Python","Azure"]
servicos: ["Engenharia de Dados","Analytics & BI"]
area: Data & Analytics
dono: Úrsula Campos
confidencialidade: interna
status_proposta: Entregue
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P183
id: P183-CASE
tipo_documental: case_sucesso
status_documento: aprovado
data: 2025-01-09
prazo_meses: 6
---

# Case de Sucesso — Banco Horizonte Sul

## Desafio

O Banco Horizonte Sul processava cerca de 4,2 milhões de transações por dia em lotes noturnos, com latência média de 9 horas para relatórios de risco e crédito. Isso limitava a detecção de fraudes e a gestão de limites de exposição em tempo quase real, gerando perdas estimadas em R$ 3,8 milhões anuais.

## Solução

Implantar uma plataforma de streaming de dados no Azure, com engenharia em Python, para disponibilizar eventos financeiros em até 2 minutos e alimentar análises de risco e crédito em tempo real. A solução usou Python, Azure e foi entregue em 6 meses.

## Resultados

A latência dos relatórios de risco caiu de 9 horas para 2 minutos, e a detecção de transações suspeitas aumentou 37% no primeiro trimestre após o go-live. A operação passou a monitorar 100% dos eventos transacionais em tempo quase real, com redução estimada de R$ 2,1 milhões em perdas anuais por fraude.

## Lições aprendidas

A integração com os sistemas legados de crédito consumiu 3 semanas além do previsto, por causa de formatos de dados não documentados. Foi decisiva a realização de testes de carga com volumes reais desde a fase de arquitetura, o que permitiu ajustar a capacidade do Azure antes do go-live.
