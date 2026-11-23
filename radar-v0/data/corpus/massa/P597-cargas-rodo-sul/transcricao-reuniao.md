---
projeto_id: P597
cliente: Cargas Rodo Sul
titulo: Manutenção Preditiva de Ativos com Azure e SAP para Operação Logística
segmento: Logística
tecnologias: ["Azure","SAP"]
servicos: ["Data Science / ML","Change Management"]
area: AI & Automation
dono: Karina Duarte
confidencialidade: interna
status_proposta: Em execução
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P597
id: P597-TRANS
tipo_documental: transcricao_reuniao
status_documento: bruta
data: 2026-04-03
---

# Transcrição — Kickoff Cargas Rodo Sul

Transcrição automática, sem revisão.

[00:05] Karina Duarte: Bom dia. Este é o kickoff de Manutenção Preditiva de Ativos com Azure e SAP para Operação Logística. Vamos alinhar objetivo, fases e riscos.

[01:00] Ricardo Menezes: O ponto principal para nós: A Cargas Rodo Sul opera uma frota de 1.850 ativos entre cavalos mecânicos, carretas e empilhadeiras, com 14% de paradas não planejadas que geram R$ 2,3 milhões/ano em custos de manutenção corretiva e perda de SLA. A manutenção hoje é preventiva por calendário, sem uso dos dados de telemetria e de ordens do SAP, o que antecipa trocas desnecessárias e não evita falhas críticas em rota.

[02:29] Karina Duarte: O objetivo combinado foi: Implantar modelos de manutenção preditiva que antecipem falhas em 7 a 15 dias, reduzindo paradas não planejadas em 30% e o custo de manutenção corretiva em 20% até o fim do projeto.

[03:31] Fernanda Toledo: Do lado técnico vamos usar Azure, SAP. O primeiro passo é ingestão e tratamento de telemetria de sensores (temperatura, vibração, pressão) e dados de ordens de manutenção do sap em azure data lake e azure data factory.

[04:44] Ricardo Menezes: Quais riscos vocês já enxergam?

[05:50] Fernanda Toledo: Os principais são qualidade e lacunas na telemetria de ativos mais antigos, comprometendo a acurácia dos modelos; baixa adesão dos times de manutenção às ordens sugeridas pelo sap; restrições de integração e janelas de manutenção no ambiente sap do cliente.

[06:42] Karina Duarte: Fechado. Mando a ata com os próximos passos ainda hoje.
