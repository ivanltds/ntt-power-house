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
id: P183-TRANS
tipo_documental: transcricao_reuniao
status_documento: bruta
data: 2024-07-23
---

# Transcrição — Kickoff Banco Horizonte Sul

Transcrição automática, sem revisão.

[00:05] Úrsula Campos: Bom dia. Este é o kickoff de Pipeline de dados em tempo real para análise de risco e crédito com Azure e Python. Vamos alinhar objetivo, fases e riscos.

[01:12] Marina Cordeiro: O ponto principal para nós: O Banco Horizonte Sul processava cerca de 4,2 milhões de transações por dia em lotes noturnos, com latência média de 9 horas para relatórios de risco e crédito. Isso limitava a detecção de fraudes e a gestão de limites de exposição em tempo quase real, gerando perdas estimadas em R$ 3,8 milhões anuais.

[02:18] Úrsula Campos: O objetivo combinado foi: Implantar uma plataforma de streaming de dados no Azure, com engenharia em Python, para disponibilizar eventos financeiros em até 2 minutos e alimentar análises de risco e crédito em tempo real.

[03:33] Rafael Nogueira: Do lado técnico vamos usar Python, Azure. O primeiro passo é ingestão contínua de eventos transacionais via azure event hubs, com 15 mil mensagens por segundo de pico.

[04:55] Marina Cordeiro: Quais riscos vocês já enxergam?

[06:01] Rafael Nogueira: Os principais são volume de picos transacionais acima do previsto comprometer a latência; qualidade inconsistente nos eventos de origem gerar descartes indevidos; dependência de janelas de mudança em sistemas legados do banco.

[07:22] Úrsula Campos: Fechado. Mando a ata com os próximos passos ainda hoje.
