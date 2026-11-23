---
projeto_id: P559
cliente: Fintech Pagaí
titulo: Leitura e triagem de documentos com IA generativa para operações financeiras
segmento: Serviços Financeiros
tecnologias: ["AWS","Python"]
servicos: ["Automação de Processos","IA Generativa"]
area: AI & Automation
dono: Bruno Tavares
confidencialidade: interna
status_proposta: Entregue
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P559
id: P559-TRANS
tipo_documental: transcricao_reuniao
status_documento: bruta
data: 2025-05-23
---

# Transcrição — Kickoff Fintech Pagaí

Transcrição automática, sem revisão.

[00:05] Bruno Tavares: Bom dia. Este é o kickoff de Leitura e triagem de documentos com IA generativa para operações financeiras. Vamos alinhar objetivo, fases e riscos.

[01:06] Renata Vasconcelos: O ponto principal para nós: A Fintech Pagaí processava cerca de 180 mil documentos por mês (contratos, comprovantes e cartas de cobrança) com 22 analistas em triagem manual, gerando prazo médio de 3,5 dias úteis e 9% de retrabalho por classificação incorreta. O volume crescia 12% ao trimestre e a operação não escalava sem novas contratações.

[02:24] Bruno Tavares: O objetivo combinado foi: Automatizar a leitura, extração de campos e triagem de documentos com IA generativa na AWS, reduzindo o esforço manual e o tempo de resposta da operação.

[03:58] Bruno Tavares: Do lado técnico vamos usar AWS, Python. O primeiro passo é pipeline de ingestão de documentos em python executado em aws lambda e amazon s3, com processamento de pdfs e imagens.

[05:30] Renata Vasconcelos: Quais riscos vocês já enxergam?

[06:36] Bruno Tavares: Os principais são qualidade e padronização dos documentos enviados pelos clientes; baixa confiança do modelo em novos tipos de documento; dependência de aprovação de acessos e ambientes aws pelo cliente.

[07:34] Bruno Tavares: Fechado. Mando a ata com os próximos passos ainda hoje.
