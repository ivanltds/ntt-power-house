---
projeto_id: P508
cliente: Escudo Auto Seguros
titulo: Migração do Data Warehouse para Snowflake no Azure com Engenharia de Dados
segmento: Seguros
tecnologias: ["Snowflake","Azure"]
servicos: ["Migração para Nuvem","Engenharia de Dados"]
area: Cloud & Infra
dono: Débora Castilho
confidencialidade: interna
status_proposta: Entregue
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P508
id: P508-TRANS
tipo_documental: transcricao_reuniao
status_documento: bruta
data: 2025-06-12
---

# Transcrição — Kickoff Escudo Auto Seguros

Transcrição automática, sem revisão.

[00:05] Débora Castilho: Bom dia. Este é o kickoff de Migração do Data Warehouse para Snowflake no Azure com Engenharia de Dados. Vamos alinhar objetivo, fases e riscos.

[01:04] Renata Vasconcelos: O ponto principal para nós: A Escudo Auto Seguros processava 4,2 TB de dados de apólices e sinistros em um data warehouse on-premises com janelas de carga noturnas de 7 horas, o que atrasava a apuração de sinistralidade e limitava a análise a relatórios diários. Com 1,8 milhão de apólices ativas e 320 usuários de BI, a infraestrutura local não suportava o crescimento de 35% ao ano no volume de dados de telemetria de veículos.

[01:48] Débora Castilho: O objetivo combinado foi: Migrar o data warehouse da Escudo Auto Seguros para Snowflake no Azure em 8 meses, reduzindo a latência das cargas e habilitando análises quase em tempo real para as áreas de subscrição e sinistros.

[03:07] Marcelo Tavares: Do lado técnico vamos usar Snowflake, Azure. O primeiro passo é assessment e mapeamento de 240 objetos do data warehouse legado, incluindo 95 procedures e 60 cubos de relatórios.

[04:40] Renata Vasconcelos: Quais riscos vocês já enxergam?

[05:46] Marcelo Tavares: Os principais são divergência de dados entre o legado e o snowflake durante a reconciliação de sinistralidade; dependência de janelas de acesso restritas aos sistemas de origem para extração de dados; consumo do snowflake acima do previsto por consultas mal otimizadas de usuários de bi.

[07:08] Débora Castilho: Fechado. Mando a ata com os próximos passos ainda hoje.
