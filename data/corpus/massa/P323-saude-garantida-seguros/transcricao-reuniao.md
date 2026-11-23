---
projeto_id: P323
cliente: Saúde Garantida Seguros
titulo: Precificação Dinâmica com Databricks e Machine Learning no setor de Seguros
segmento: Seguros
tecnologias: ["Databricks","Machine Learning"]
servicos: ["Analytics & BI","Data Science / ML"]
area: Data & Analytics
dono: Leonardo Pires
confidencialidade: confidencial
status_proposta: Em execução
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P323
id: P323-TRANS
tipo_documental: transcricao_reuniao
status_documento: bruta
data: 2025-12-06
---

# Transcrição — Kickoff Saúde Garantida Seguros

Transcrição automática, sem revisão.

[00:05] Leonardo Pires: Bom dia. Este é o kickoff de Precificação Dinâmica com Databricks e Machine Learning no setor de Seguros. Vamos alinhar objetivo, fases e riscos.

[01:05] Renata Vasconcelos: O ponto principal para nós: A Saúde Garantida Seguros, com carteira de 420 mil apólices e R$ 1,8 bilhão em prêmios anuais, ainda define preços com tabelas estáticas revisadas apenas duas vezes por ano, o que gera perda de competitividade em 18% das cotações e prêmios subavaliados em segmentos de maior sinistralidade. A defasagem entre a sinistralidade observada e a tarifa praticada chega a 90 dias em produtos de saúde e odontológico.

[01:57] Leonardo Pires: O objetivo combinado foi: Implantar um motor de precificação dinâmica baseado em Databricks e Machine Learning para recalcular prêmios com granularidade por perfil de risco, atualizando os modelos a cada ciclo semanal e reduzindo a defasagem tarifária.

[02:44] Bruno Tavares: Do lado técnico vamos usar Databricks, Machine Learning. O primeiro passo é modelagem de features de risco (sinistralidade, faixa etária, região, histórico de utilização) em camada delta lake no databricks.

[03:45] Renata Vasconcelos: Quais riscos vocês já enxergam?

[04:51] Bruno Tavares: Os principais são qualidade e cobertura histórica dos dados de sinistralidade no databricks; resistência das áreas de subscrição à adoção de tarifas dinâmicas; prazo de 3 meses pressionado pela validação regulatória dos modelos.

[06:14] Leonardo Pires: Fechado. Mando a ata com os próximos passos ainda hoje.
