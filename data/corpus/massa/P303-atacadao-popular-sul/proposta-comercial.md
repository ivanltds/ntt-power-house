---
projeto_id: P303
cliente: Atacadão Popular Sul
titulo: Detecção de fraude em tempo real com Machine Learning e Kafka no varejo
segmento: Varejo
tecnologias: ["Machine Learning","Kafka","Python"]
servicos: ["Data Science / ML"]
area: AI & Automation
dono: Fábio Nunes
confidencialidade: interna
status_proposta: Em execução
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P303
id: P303-PROP
tipo_documental: proposta_comercial
status_documento: final_aprovada
data: 2025-08-21
prazo_meses: 7
valor: 340000
margem: 0.21
---

# Proposta Comercial — Detecção de fraude em tempo real com Machine Learning e Kafka no varejo

**Cliente:** Atacadão Popular Sul
**Segmento:** Varejo
**Área responsável:** AI & Automation · **Dono da proposta:** Fábio Nunes
**Data:** 2025-08-21 · **Versão:** final

## 1. Contexto e desafio

O Atacadão Popular Sul processa cerca de 1,2 milhão de transações por mês em 48 lojas e no e-commerce, com perdas estimadas em 0,9% do faturamento por fraudes em cartões e devoluções indevidas. A análise atual é manual e reativa, com detecção média de 36 horas após a ocorrência.

## 2. Objetivo

Implantar um motor de detecção de fraude em tempo real com Machine Learning sobre streaming Kafka, reduzindo o tempo de detecção para menos de 5 minutos e as perdas em 30% no primeiro ano.

## 3. Escopo da solução

- Modelagem de features e treinamento de modelos supervisionados em Python para scoring de risco transacional
- Pipeline de streaming com Kafka para ingestão de eventos de PDV e e-commerce com latência inferior a 2 segundos
- API de scoring em Python integrada ao antifraude e ao checkout, com decisão em tempo real
- Painel de monitoramento de drift e performance dos modelos com alertas automáticos
- Regras de negócio híbridas (modelo + listas) para bloqueio e revisão manual de transações suspeitas

Tecnologias principais: Machine Learning, Kafka, Python.

## 4. Abordagem e cronograma

O projeto será executado em 7 meses, nas seguintes fases:

- Diagnóstico e preparação de dados (6 semanas)
- Desenvolvimento e treinamento dos modelos (10 semanas)
- Integração com Kafka e sistemas transacionais (8 semanas)
- Go-live assistido e otimização (4 semanas)

## 5. Entregáveis

- Documento de arquitetura da solução de detecção em tempo real
- Modelos de ML treinados e validados com AUC acima de 0,90 em base histórica de 24 meses
- Pipeline Kafka em produção processando 100% dos eventos de PDV e e-commerce
- API de scoring com SLA de 150 ms no percentil 95
- Dashboard de monitoramento e relatório mensal de eficácia do antifraude

## 6. Equipe proposta

1 gerente de projeto, 1 arquiteto de dados, 2 cientistas de dados e 1 engenheiro de dados.

## 7. Premissas e riscos

- Risco: Qualidade e atraso na disponibilização dos dados históricos de transações
- Risco: Latência da infraestrutura de PDV impactando o streaming em tempo real
- Risco: Falsos positivos elevados gerando atrito no atendimento ao cliente

## 8. Investimento

Investimento total: R$ 340.000, em parcelas mensais ao longo de 7 meses.

Margem praticada: 21%.
