---
projeto_id: P396
cliente: Companhia de Saneamento Rio Claro
titulo: Detecção de Fraude em Tempo Real com Machine Learning e Kafka
segmento: Utilities / Energia
tecnologias: ["Machine Learning","Kafka"]
servicos: ["Data Science / ML"]
area: AI & Automation
dono: Karina Duarte
confidencialidade: confidencial
status_proposta: Em negociação
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P396
id: P396-PROP
tipo_documental: proposta_comercial
status_documento: final_enviada
data: 2026-07-13
prazo_meses: 8
valor: 1000000
margem: 0.25
---

# Proposta Comercial — Detecção de Fraude em Tempo Real com Machine Learning e Kafka

**Cliente:** Companhia de Saneamento Rio Claro
**Segmento:** Utilities / Energia
**Área responsável:** AI & Automation · **Dono da proposta:** Karina Duarte
**Data:** 2026-07-13 · **Versão:** final

## 1. Contexto e desafio

A Companhia de Saneamento Rio Claro registra cerca de 1,2 milhão de ligações de água e 850 mil economias ativas, com perdas não técnicas estimadas em 18% do volume faturado. A análise de inconsistências de consumo hoje é manual e trimestral, cobrindo apenas 6% dos hidrômetros, o que atrasa a identificação de fraudes e limita a recuperação de receita a R$ 4,5 milhões por ano.

## 2. Objetivo

Implantar um motor de detecção de fraude em tempo real que priorize casos suspeitos com base em Machine Learning sobre o fluxo de leituras e eventos, elevando a taxa de acerto das vistorias e ampliando a recuperação de receita não técnica.

## 3. Escopo da solução

- Ingestão contínua de leituras de hidrômetros e eventos de campo via Apache Kafka, com tópicos segregados por região e latência máxima de 5 segundos
- Modelos de Machine Learning para scoring de anomalias de consumo, com explicabilidade das variáveis e retreino mensal
- Pipeline de features em streaming combinando histórico de consumo, inadimplência e ocorrências de vistoria
- Painel de priorização de casos para as equipes de campo, com ranking diário de até 2.500 ordens de vistoria
- Monitoramento de deriva de modelo e métricas de precisão/recall com alertas automáticos

Tecnologias principais: Machine Learning, Kafka.

## 4. Abordagem e cronograma

O projeto será executado em 8 meses, nas seguintes fases:

- Diagnóstico e preparação de dados (6 semanas)
- Desenvolvimento dos modelos e pipeline Kafka (14 semanas)
- Integração com operação de campo e piloto (8 semanas)
- Go-live, estabilização e transferência de conhecimento (4 semanas)

## 5. Entregáveis

- Arquitetura de referência do pipeline Kafka e do ambiente de ML documentada e validada
- Modelo de detecção de fraude em produção com recall mínimo de 70% sobre a base de validação
- Painel de priorização de vistorias integrado ao processo das equipes de campo
- Relatório de avaliação de desempenho com ganho estimado de recuperação de receita
- Plano de retreino e monitoramento contínuo dos modelos

## 6. Equipe proposta

1 arquiteto de dados, 2 cientistas de dados, 1 engenheiro de dados, 1 especialista em Kafka e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Qualidade e atraso na entrega das bases históricas de consumo e vistorias
- Risco: Baixa adesão das equipes de campo ao novo ranking de priorização
- Risco: Deriva de comportamento de fraude que reduza a precisão do modelo após o go-live

## 8. Investimento

Investimento total: R$ 1.000.000, em parcelas mensais ao longo de 8 meses.

Margem praticada: 25%.
