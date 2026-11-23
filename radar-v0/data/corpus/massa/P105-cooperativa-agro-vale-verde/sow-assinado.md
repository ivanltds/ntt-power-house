---
projeto_id: P105
cliente: Cooperativa Agro Vale Verde
titulo: Manutenção Preditiva de Ativos Industriais com IA no Agronegócio
segmento: Agronegócio
tecnologias: ["Azure","Kafka","Python"]
servicos: ["Data Science / ML","Engenharia de Dados"]
area: AI & Automation
dono: Bruno Tavares
confidencialidade: interna
status_proposta: Entregue
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P105
id: P105-SOW
tipo_documental: sow
status_documento: assinado
data: 2025-04-19
prazo_meses: 6
valor: 3200000
---

# SOW — Manutenção Preditiva de Ativos Industriais com IA no Agronegócio

**Contratante:** Cooperativa Agro Vale Verde · **Contratada:** NTT DATA Brasil · **Vigência:** 6 meses a partir do kickoff

## 1. Objeto

Implantar uma solução de manutenção preditiva baseada em dados de sensores IoT para antecipar falhas em ativos críticos, reduzindo paradas não planejadas e direcionando a manutenção antes do pico da safra.

## 2. Escopo contratado

- Ingestão em tempo real de dados de sensores (vibração, temperatura e corrente) via Azure Event Hubs e Apache Kafka
- Pipeline de Engenharia de Dados em Python no Azure Data Lake e Azure Databricks para tratamento e feature engineering
- Modelos de ML em Python (classificação de falha e regressão de vida útil remanescente) treinados e versionados no Azure Machine Learning
- Painéis de alerta e priorização de ordens de serviço no Power BI integrados ao sistema de manutenção existente
- Monitoramento de deriva de modelo e alarmes automáticos para a equipe de manutenção

## 3. Entregáveis e aceite

- Pipeline de dados em streaming operando com latência inferior a 60 segundos para 180 ativos
- Modelos preditivos com recall mínimo de 85% para falhas críticas em validação
- Dashboard de saúde de ativos e fila priorizada de manutenção
- Documentação técnica, playbooks de operação e treinamento de 15 usuários
- Relatório de resultados e plano de evolução pós-entrega

Cada entregável é aceito pelo cliente em até 10 dias úteis após a entrega.

## 4. Fora do escopo

Sustentação após a operação assistida, licenças de software e infraestrutura do cliente.

## 5. Valor e condições

Valor total: R$ 3.200.000, faturado mensalmente conforme o cronograma.
