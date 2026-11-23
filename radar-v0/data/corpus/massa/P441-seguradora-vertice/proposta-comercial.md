---
projeto_id: P441
cliente: Seguradora Vértice
titulo: Detecção de Fraude em Tempo Real com Dados e Machine Learning
segmento: Seguros
tecnologias: ["Kafka","Databricks","Machine Learning","Azure"]
servicos: ["Engenharia de Dados"]
area: AI & Automation
dono: Karina Duarte
confidencialidade: confidencial
status_proposta: Em elaboração
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P441
id: P441-PROP
tipo_documental: proposta_comercial
status_documento: preliminar
data: 2026-10-12
prazo_meses: 6
valor: 1450000
margem: 0.28
---

# Proposta Comercial — Detecção de Fraude em Tempo Real com Dados e Machine Learning

**Cliente:** Seguradora Vértice
**Segmento:** Seguros
**Área responsável:** AI & Automation · **Dono da proposta:** Karina Duarte
**Data:** 2026-10-12 · **Versão:** final

## 1. Contexto e desafio

A Seguradora Vértice processa cerca de 180 mil sinistros por mês e identifica apenas 1,2% como suspeitos de fraude, com análise manual levando até 9 dias por caso. A fragmentação dos dados entre sistemas de apólice, sinistro e pagamento impede a detecção de padrões em tempo real e gera perdas estimadas em R$ 24 milhões ao ano.

## 2. Objetivo

Implementar uma plataforma de engenharia de dados e machine learning para detectar indícios de fraude em sinistros em até 15 minutos após o registro, elevando a taxa de identificação para 3,5% e reduzindo o tempo de análise para menos de 1 dia.

## 3. Escopo da solução

- Ingestão contínua de eventos de sinistros, apólices e pagamentos via Apache Kafka, com tópicos segregados por domínio e retenção de 30 dias
- Construção de pipeline de dados em Databricks (medallion architecture) com tabelas Delta nas camadas bronze, silver e gold, incluindo histórico de 36 meses
- Desenvolvimento de modelo de Machine Learning supervisionado para score de fraude com features de comportamento de segurado, rede de relacionamentos e padrões de pagamento
- Implantação da solução em Azure (Databricks, Data Lake Storage e AKS) com monitoramento de data drift e retraining mensal do modelo
- Integração do score de fraude via API com o sistema de análise de sinistros, incluindo fila prioritária para casos com score acima de 0,8

Tecnologias principais: Kafka, Databricks, Machine Learning, Azure.

## 4. Abordagem e cronograma

O projeto será executado em 6 meses, nas seguintes fases:

- Discovery e desenho da arquitetura (4 semanas)
- Engenharia de dados e ingestão Kafka/Databricks (8 semanas)
- Desenvolvimento e treinamento do modelo de Machine Learning (8 semanas)
- Implantação em Azure, integração e go-live assistido (4 semanas)

## 5. Entregáveis

- Pipeline de ingestão Kafka com 12 tópicos e latência inferior a 2 minutos ponta a ponta
- Repositório Databricks com 45 features documentadas e versionadas para o modelo de fraude
- Modelo de Machine Learning em produção com AUC-ROC mínimo de 0,85 e explicabilidade por SHAP
- API de score de fraude integrada ao sistema de sinistros, com SLA de 300 ms por requisição
- Dashboard de monitoramento de performance do modelo e de indicadores de fraude para a área de sinistros

## 6. Equipe proposta

1 arquiteto de dados, 2 engenheiros de dados, 1 cientista de dados, 1 engenheiro de MLOps e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Qualidade e completude dos dados históricos de sinistros pode exigir esforço extra de tratamento
- Risco: Baixa adesão dos analistas de sinistro ao novo score durante o período de transição
- Risco: Restrições de latência e segurança na integração via API com o sistema legado de sinistros

## 8. Investimento

Investimento total: R$ 1.450.000, em parcelas mensais ao longo de 6 meses.

Margem praticada: 28%.
