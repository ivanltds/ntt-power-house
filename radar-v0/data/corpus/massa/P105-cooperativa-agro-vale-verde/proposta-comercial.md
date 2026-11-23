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
id: P105-PROP
tipo_documental: proposta_comercial
status_documento: final_aprovada
data: 2025-03-25
prazo_meses: 6
valor: 3200000
margem: 0.2
---

# Proposta Comercial — Manutenção Preditiva de Ativos Industriais com IA no Agronegócio

**Cliente:** Cooperativa Agro Vale Verde
**Segmento:** Agronegócio
**Área responsável:** AI & Automation · **Dono da proposta:** Bruno Tavares
**Data:** 2025-03-25 · **Versão:** final

## 1. Contexto e desafio

A cooperativa operava 3 unidades de recebimento e secagem de grãos com 180 equipamentos críticos (motores, elevadores e secadores) sob manutenção corretiva, gerando R$ 2,4 milhões/ano em paradas não planejadas e 12% de perda de produtividade no pico da safra. A ausência de monitoramento contínuo impedia antecipar falhas e priorizar ordens de serviço.

## 3. Escopo da solução

- Ingestão em tempo real de dados de sensores (vibração, temperatura e corrente) via Azure Event Hubs e Apache Kafka
- Pipeline de Engenharia de Dados em Python no Azure Data Lake e Azure Databricks para tratamento e feature engineering
- Modelos de ML em Python (classificação de falha e regressão de vida útil remanescente) treinados e versionados no Azure Machine Learning
- Painéis de alerta e priorização de ordens de serviço no Power BI integrados ao sistema de manutenção existente
- Monitoramento de deriva de modelo e alarmes automáticos para a equipe de manutenção

Tecnologias principais: Azure, Kafka, Python.

## 4. Abordagem e cronograma

O projeto será executado em 6 meses, nas seguintes fases:

- Diagnóstico e preparação de dados (6 semanas)
- Engenharia de dados e streaming (6 semanas)
- Modelagem e validação de ML (8 semanas)
- Implantação, treinamento e entrega (4 semanas)

## 5. Entregáveis

- Pipeline de dados em streaming operando com latência inferior a 60 segundos para 180 ativos
- Modelos preditivos com recall mínimo de 85% para falhas críticas em validação
- Dashboard de saúde de ativos e fila priorizada de manutenção
- Documentação técnica, playbooks de operação e treinamento de 15 usuários
- Relatório de resultados e plano de evolução pós-entrega

## 6. Equipe proposta

1 arquiteto de dados, 2 engenheiros de dados, 2 cientistas de dados e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Qualidade e cobertura dos sensores IoT em parte dos ativos
- Risco: Janela curta antes do pico da safra
- Risco: Baixa adesão da equipe de manutenção aos alertas

## 8. Investimento

Investimento total: R$ 3.200.000, em parcelas mensais ao longo de 6 meses.

Margem praticada: 20%.
