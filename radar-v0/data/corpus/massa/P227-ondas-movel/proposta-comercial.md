---
projeto_id: P227
cliente: Ondas Móvel
titulo: Detecção de Fraude em Tempo Real com Machine Learning e Kafka no Setor Telecom
segmento: Telecom
tecnologias: ["Machine Learning","Python","Kafka","Azure"]
servicos: ["Engenharia de Dados"]
area: AI & Automation
dono: João Pedro Sales
confidencialidade: interna
status_proposta: Perdida
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P227
id: P227-PROP
tipo_documental: proposta_comercial
status_documento: final_enviada
data: 2025-06-14
prazo_meses: 6
valor: 400000
margem: 0.31
---

# Proposta Comercial — Detecção de Fraude em Tempo Real com Machine Learning e Kafka no Setor Telecom

**Cliente:** Ondas Móvel
**Segmento:** Telecom
**Área responsável:** AI & Automation · **Dono da proposta:** João Pedro Sales
**Data:** 2025-06-14 · **Versão:** final

## 1. Contexto e desafio

A Ondas Móvel registra 2,4 milhões de transações mensais e sofre com perdas de aproximadamente R$ 18 milhões/ano por fraudes em recarga e ativação de linhas. O processo atual é baseado em regras estáticas e análise manual, com tempo médio de 36 horas para identificar um caso suspeito.

## 2. Objetivo

Construir uma plataforma de detecção de fraude em tempo real com Machine Learning e Python sobre Kafka, hospedada no Azure, para reduzir o tempo de identificação para menos de 5 minutos e aumentar a taxa de detecção em 40%.

## 3. Escopo da solução

- Ingestão de eventos de recarga, ativação e portabilidade em tópicos Kafka com engenharia de dados em Python
- Pipeline de features e treinamento de modelos de Machine Learning para scoring de risco em tempo real
- Implantação do modelo como serviço no Azure com monitoramento de drift e retraining mensal
- Painel analítico e alertas operacionais integrados ao time antifraude
- Integração com sistemas legados de billing e CRM via APIs

Tecnologias principais: Machine Learning, Python, Kafka, Azure.

## 4. Abordagem e cronograma

O projeto será executado em 6 meses, nas seguintes fases:

- Discovery e engenharia de dados (6 semanas)
- Modelagem e treinamento de ML (8 semanas)
- Implantação no Azure e integrações (6 semanas)
- Homologação e treinamento (4 semanas)

## 5. Entregáveis

- Pipeline de dados em Kafka e Python documentado e em produção
- Modelo de ML treinado com AUC superior a 0,85 e relatório de validação
- Serviço de scoring em tempo real no Azure com SLA de 200 ms
- Painel de monitoramento de fraudes com alertas automáticos
- Manual operacional e treinamento do time antifraude

## 6. Equipe proposta

1 arquiteto de dados, 2 engenheiros de dados, 1 cientista de dados e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Qualidade e disponibilidade dos dados históricos de fraude
- Risco: Latência na integração com sistemas legados de billing
- Risco: Baixa adoção do modelo pelo time antifraude

## 8. Investimento

Investimento total: R$ 400.000, em parcelas mensais ao longo de 6 meses.

Margem praticada: 31%.
