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
id: P314-TRANS
tipo_documental: transcricao_reuniao
status_documento: bruta
data: 2024-06-30
---

# Transcrição — Reunião comercial Banco Horizonte Sul

Transcrição automática, sem revisão.

[00:05] Ana Beatriz Lopes: Obrigado pelo tempo. Queremos entender o cenário antes de fechar a proposta.

[00:56] Renata Vasconcelos: Hoje o problema é este: O Banco Horizonte Sul processa cerca de 4,2 milhões de transações por dia em 3 sistemas legados, mas os relatórios gerenciais chegam com até 36 horas de atraso. Isso limita a detecção de fraudes e a gestão de liquidez em janelas críticas, com perda estimada de R$ 1,8 milhão por trimestre em oportunidades de crédito e prevenção.

[02:24] Felipe Andrade: Já fizemos coisa parecida em Serviços Financeiros. A ideia seria: Implantar uma plataforma de streaming de dados em tempo real na AWS para disponibilizar eventos transacionais em menos de 5 segundos às áreas de risco e tesouraria, substituindo as cargas batch atuais.

[03:26] Renata Vasconcelos: E quanto tempo vocês imaginam?

[04:31] Ana Beatriz Lopes: Algo em torno de 8 meses, dependendo do escopo final.

[05:59] Renata Vasconcelos: Uma preocupação nossa é latência dos sistemas legados comprometer o sla de 5 segundos.

[07:00] Felipe Andrade: Entendido, vamos tratar isso como premissa.
