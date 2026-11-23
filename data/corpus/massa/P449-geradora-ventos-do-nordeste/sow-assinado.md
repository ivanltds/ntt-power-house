---
projeto_id: P449
cliente: Geradora Ventos do Nordeste
titulo: Redução de Perdas Não Técnicas com Analytics Avançado em Utilities
segmento: Utilities / Energia
tecnologias: ["Power BI","Databricks"]
servicos: ["Engenharia de Dados","Data Science / ML"]
area: Data & Analytics
dono: Nelson Barbosa
confidencialidade: confidencial
status_proposta: Entregue
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P449
id: P449-SOW
tipo_documental: sow
status_documento: assinado
data: 2024-09-15
prazo_meses: 8
valor: 1430000
---

# SOW — Redução de Perdas Não Técnicas com Analytics Avançado em Utilities

**Contratante:** Geradora Ventos do Nordeste · **Contratada:** NTT DATA Brasil · **Vigência:** 8 meses a partir do kickoff

## 1. Objeto

Reduzir as perdas não técnicas por meio de modelos de priorização de inspeções e de um painel analítico que oriente as equipes de campo às unidades com maior probabilidade de irregularidade.

## 2. Escopo contratado

- Construção de pipeline de ingestão de dados de medição, cadastro e inspeções no Databricks, com camadas bronze, silver e gold
- Desenvolvimento de modelo de machine learning para scoring de probabilidade de fraude por medidor, com features de consumo, histórico e perfil de rede
- Painéis no Power BI para priorização diária de inspeções por regional e acompanhamento de recuperação de receita
- Integração do scoring ao processo de field service, com atualização semanal dos rankings de inspeção
- Monitoramento de deriva do modelo e documentação dos indicadores de perdas não técnicas

## 3. Entregáveis e aceite

- Pipeline de dados no Databricks com 24 meses de histórico de medição e inspeções tratado
- Modelo de scoring de fraude com AUC de validação acima de 0,80 e relatório de explicabilidade
- Painel Power BI com ranking de inspeções, taxa de acerto e receita recuperada por regional
- Guia de operação do processo de priorização e treinamento das equipes de campo
- Relatório final de resultados com comparação entre período baseline e pós-implantação

Cada entregável é aceito pelo cliente em até 10 dias úteis após a entrega.

## 4. Fora do escopo

Sustentação após a operação assistida, licenças de software e infraestrutura do cliente.

## 5. Valor e condições

Valor total: R$ 1.430.000, faturado mensalmente conforme o cronograma.
