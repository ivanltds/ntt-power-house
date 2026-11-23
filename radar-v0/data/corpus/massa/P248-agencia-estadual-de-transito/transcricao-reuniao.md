---
projeto_id: P248
cliente: Agência Estadual de Trânsito
titulo: Lakehouse de Dados para Integração AWS/Azure com Governança — Fase 2
segmento: Setor Público
tecnologias: ["AWS","Azure"]
servicos: ["Governança de Dados"]
area: Data & Analytics
dono: Xênia Lacerda
confidencialidade: confidencial
status_proposta: Em execução
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P248
id: P248-TRANS
tipo_documental: transcricao_reuniao
status_documento: bruta
data: 2026-10-12
---

# Transcrição — Kickoff Agência Estadual de Trânsito

Transcrição automática, sem revisão.

[00:05] Xênia Lacerda: Bom dia. Este é o kickoff de Lakehouse de Dados para Integração AWS/Azure com Governança — Fase 2. Vamos alinhar objetivo, fases e riscos.

[00:58] Renata Vasconcelos: O ponto principal para nós: A Agência Estadual de Trânsito mantém dados operacionais distribuídos em 14 sistemas legados, com mais de 40 milhões de registros de veículos e condutores duplicados entre bases. Relatórios gerenciais levam até 9 dias para serem consolidados, comprometendo a fiscalização e a prestação de contas.

[01:57] Xênia Lacerda: O objetivo combinado foi: Evoluir a plataforma lakehouse em AWS e Azure, consolidando as fontes de dados com governança corporativa e reduzindo o tempo de disponibilização de dados analíticos para até 24 horas.

[03:02] Marcelo Tavares: Do lado técnico vamos usar AWS, Azure. O primeiro passo é ingestão incremental de 14 fontes legadas no data lake em aws s3, com catálogo no aws glue.

[04:06] Renata Vasconcelos: Quais riscos vocês já enxergam?

[05:12] Marcelo Tavares: Os principais são acesso restrito às bases legadas pode atrasar a ingestão; baixa qualidade dos dados de origem exige retrabalho nas regras; dependência de aprovação de mudanças pela área de ti do cliente.

[06:12] Xênia Lacerda: Fechado. Mando a ata com os próximos passos ainda hoje.
