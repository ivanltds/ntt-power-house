---
projeto_id: P577
cliente: Instituto de Previdência Municipal
titulo: Plataforma de Dados Lakehouse para Previdência Municipal
segmento: Setor Público
tecnologias: ["AWS","Azure"]
servicos: ["Engenharia de Dados"]
area: Data & Analytics
dono: Xênia Lacerda
confidencialidade: interna
status_proposta: Em execução
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P577
id: P577-TRANS
tipo_documental: transcricao_reuniao
status_documento: bruta
data: 2026-03-17
---

# Transcrição — Kickoff Instituto de Previdência Municipal

Transcrição automática, sem revisão.

[00:05] Xênia Lacerda: Bom dia. Este é o kickoff de Plataforma de Dados Lakehouse para Previdência Municipal. Vamos alinhar objetivo, fases e riscos.

[00:46] Carlos Alberto Nogueira: O ponto principal para nós: O Instituto de Previdência Municipal enfrenta dificuldades para consolidar dados de 12 mil servidores ativos e 5 mil inativos, espalhados em 8 sistemas legados, o que atrasa a geração de relatórios de arrecadação e concessão de benefícios em até 15 dias. Além disso, a falta de uma visão unificada impede análises preditivas para planejamento atuarial.

[01:41] Xênia Lacerda: O objetivo combinado foi: Implementar uma plataforma de dados lakehouse nas nuvens AWS e Azure para centralizar e governar os dados previdenciários, permitindo relatórios em tempo quase real e suporte à decisão atuarial.

[02:56] Fernanda Lima: Do lado técnico vamos usar AWS, Azure. O primeiro passo é ingestão de dados de 8 fontes legadas (batch e streaming) para camadas bronze, silver e gold no aws s3 e azure data lake storage gen2.

[03:43] Carlos Alberto Nogueira: Quais riscos vocês já enxergam?

[04:49] Fernanda Lima: Os principais são atraso na liberação de acessos às fontes legadas pelo cliente; volume de dados subestimado para migração inicial; mudanças nos requisitos regulatórios durante a execução.

[05:32] Xênia Lacerda: Fechado. Mando a ata com os próximos passos ainda hoje.
