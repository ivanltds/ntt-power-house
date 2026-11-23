---
projeto_id: P516
cliente: Geradora Ventos do Nordeste
titulo: Streaming de dados em tempo real para operação e manutenção de parques eólicos
segmento: Utilities / Energia
tecnologias: ["Kafka","Azure"]
servicos: ["Analytics & BI","Engenharia de Dados"]
area: Data & Analytics
dono: Nelson Barbosa
confidencialidade: confidencial
status_proposta: Em execução
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P516
id: P516-TRANS
tipo_documental: transcricao_reuniao
status_documento: bruta
data: 2026-08-15
---

# Transcrição — Kickoff Geradora Ventos do Nordeste

Transcrição automática, sem revisão.

[00:05] Nelson Barbosa: Bom dia. Este é o kickoff de Streaming de dados em tempo real para operação e manutenção de parques eólicos. Vamos alinhar objetivo, fases e riscos.

[01:08] Mariana Costa: O ponto principal para nós: A Geradora Ventos do Nordeste opera 12 parques eólicos com 480 aerogeradores e enfrenta latência de até 4 horas na consolidação de dados de sensores, dificultando a detecção de anomalias e a manutenção preditiva. A empresa precisa processar 2,5 TB/dia de telemetria em tempo real para reduzir paradas não planejadas, que hoje representam 8% da geração.

[02:03] Nelson Barbosa: O objetivo combinado foi: Implantar uma plataforma de streaming de dados na Azure com Kafka para ingestão e processamento em tempo real, permitindo analytics operacional e manutenção preditiva com latência inferior a 5 segundos.

[03:26] Rafael Almeida: Do lado técnico vamos usar Kafka, Azure. O primeiro passo é configuração de cluster kafka na azure (hdinsight ou confluent cloud) para ingestão de telemetria de 480 aerogeradores.

[05:00] Mariana Costa: Quais riscos vocês já enxergam?

[06:06] Rafael Almeida: Os principais são volume e velocidade dos dados podem exigir ajustes no dimensionamento do cluster kafka; integração com sistemas legados de scada pode apresentar incompatibilidades de protocolo; disponibilidade de dados históricos para treinamento dos modelos preditivos.

[07:13] Nelson Barbosa: Fechado. Mando a ata com os próximos passos ainda hoje.
