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
id: P237-TRANS
tipo_documental: transcricao_reuniao
status_documento: bruta
data: 2026-01-18
---

# Transcrição — Kickoff Banco Cidadela

Transcrição automática, sem revisão.

[00:05] Débora Castilho: Bom dia. Este é o kickoff de Migração multicloud de data warehouse para AWS, GCP e Azure. Vamos alinhar objetivo, fases e riscos.

[00:49] Renata Vasconcelos: O ponto principal para nós: O Banco Cidadela mantinha um data warehouse on-premises com 180 TB de dados históricos e janelas de carga noturna que chegavam a 7 horas, atrasando relatórios regulatórios do Banco Central. A operação sustentava 420 usuários analíticos e 65 pipelines críticos, com custo de infraestrutura física de R$ 3,2 milhões ao ano e risco crescente de obsolescência de hardware.

[02:00] Débora Castilho: O objetivo combinado foi: Migrar o data warehouse do Banco Cidadela para uma arquitetura multicloud em AWS, GCP e Azure em 4 meses, reduzindo a janela de carga para menos de 90 minutos e eliminando a dependência de infraestrutura física.

[03:32] Eduardo Prado: Do lado técnico vamos usar AWS, GCP, Azure. O primeiro passo é avaliação e desenho da arquitetura-alvo multicloud, definindo cargas analíticas em aws (redshift), gcp (bigquery) e azure (synapse).

[04:22] Renata Vasconcelos: Quais riscos vocês já enxergam?

[05:28] Eduardo Prado: Os principais são indisponibilidade de janela de cutover por conflito com fechamento contábil; divergências de reconciliação em bases legadas com dados duplicados; dependência de acessos e credenciais das três nuvens concedidos pelo cliente.

[06:04] Débora Castilho: Fechado. Mando a ata com os próximos passos ainda hoje.
