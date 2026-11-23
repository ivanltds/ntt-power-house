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
id: P597-SOW
tipo_documental: sow
status_documento: assinado
data: 2026-03-29
prazo_meses: 10
valor: 1280000
---

# SOW — Manutenção Preditiva de Ativos com Azure e SAP para Operação Logística

**Contratante:** Cargas Rodo Sul · **Contratada:** NTT DATA Brasil · **Vigência:** 10 meses a partir do kickoff

## 1. Objeto

Implantar modelos de manutenção preditiva que antecipem falhas em 7 a 15 dias, reduzindo paradas não planejadas em 30% e o custo de manutenção corretiva em 20% até o fim do projeto.

## 2. Escopo contratado

- Ingestão e tratamento de telemetria de sensores (temperatura, vibração, pressão) e dados de ordens de manutenção do SAP em Azure Data Lake e Azure Data Factory
- Construção de feature store e pipelines de dados em Azure Databricks para 1.850 ativos com histórico de 24 meses
- Desenvolvimento de modelos de ML de classificação de falha e regressão de vida útil restante (RUL) em Azure Machine Learning, com acurácia mínima de 85%
- Integração dos scores preditivos ao SAP PM via APIs, gerando alertas e ordens de manutenção sugeridas automaticamente
- Plano de Change Management com treinamento de 120 usuários de manutenção e oficinas com gestores de frota em 6 filiais

## 3. Entregáveis e aceite

- Pipeline de dados de telemetria e SAP operacional em produção no Azure, com SLA de atualização de 15 minutos
- Dois modelos preditivos validados (classificação de falha e RUL) com relatório de performance e matriz de confusão
- Integração dos alertas preditivos ao SAP PM com 3 cenários de manutenção automatizados
- Dashboard de gestão de ativos com indicadores de risco e economia gerada, em Power BI sobre Azure
- Programa de Change Management concluído: 120 usuários treinados, 6 filiais engajadas e plano de adoção com metas de uso

Cada entregável é aceito pelo cliente em até 10 dias úteis após a entrega.

## 4. Fora do escopo

Sustentação após a operação assistida, licenças de software e infraestrutura do cliente.

## 5. Valor e condições

Valor total: R$ 1.280.000, faturado mensalmente conforme o cronograma.
