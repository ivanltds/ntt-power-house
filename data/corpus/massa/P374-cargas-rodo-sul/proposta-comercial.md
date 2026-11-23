---
projeto_id: P374
cliente: Cargas Rodo Sul
titulo: Otimização de rotas e frota com Machine Learning para operação logística
segmento: Logística
tecnologias: ["GCP","Python","Machine Learning"]
servicos: ["Analytics & BI","Data Science / ML"]
area: AI & Automation
dono: Yuri Monteiro
confidencialidade: interna
status_proposta: Entregue
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P374
id: P374-PROP
tipo_documental: proposta_comercial
status_documento: final_aprovada
data: 2025-04-08
prazo_meses: 5
valor: 1840000
margem: 0.2
---

# Proposta Comercial — Otimização de rotas e frota com Machine Learning para operação logística

**Cliente:** Cargas Rodo Sul
**Segmento:** Logística
**Área responsável:** AI & Automation · **Dono da proposta:** Yuri Monteiro
**Data:** 2025-04-08 · **Versão:** final

## 1. Contexto e desafio

A Cargas Rodo Sul operava com cerca de 1.200 veículos e mais de 3.800 entregas diárias, com rotas definidas manualmente por 14 supervisores regionais. Isso gerava 18% de quilometragem ociosa e um custo anual estimado de R$ 9,4 milhões em combustível e horas extras não planejadas.

## 2. Objetivo

Reduzir a quilometragem ociosa e o custo por entrega por meio de otimização de rotas e alocação de frota baseada em modelos de Machine Learning, integrando dados operacionais em uma plataforma de analytics na GCP.

## 3. Escopo da solução

- Modelagem de rotas com algoritmos de otimização em Python executados em ambientes GCP (Vertex AI e Cloud Run)
- Pipeline de ingestão e tratamento de dados de telemetria, pedidos e trânsito com Python e BigQuery
- Modelos de Machine Learning para previsão de demanda por região e janelas de entrega
- Dashboard de Analytics & BI para acompanhamento de KPIs de frota, ocupação e custo por entrega
- Mecanismo de recomendação de alocação de veículos por filial com validação em campo junto aos supervisores

Tecnologias principais: GCP, Python, Machine Learning.

## 4. Abordagem e cronograma

O projeto será executado em 5 meses, nas seguintes fases:

- Diagnóstico e preparação de dados (4 semanas)
- Desenvolvimento e treinamento dos modelos de ML (8 semanas)
- Integração, dashboards e piloto em 2 filiais (6 semanas)
- Rollout para as 6 filiais e estabilização (2 semanas)

## 5. Entregáveis

- Modelo de otimização de rotas em produção, processando 3.800 entregas/dia
- Dashboard gerencial com 22 indicadores de frota e custo operacional
- Relatório de ganhos com comparativo antes/depois em 6 filiais
- Documentação técnica e playbook de operação dos modelos na GCP
- Treinamento de 45 usuários entre supervisores e analistas de logística

## 6. Equipe proposta

1 arquiteto de dados, 2 engenheiros de dados, 1 cientista de dados, 1 analista de BI e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Qualidade e dispersão dos dados de telemetria de parte da frota
- Risco: Resistência dos supervisores à mudança no processo manual de roteirização
- Risco: Atraso na integração com o sistema de gestão de transportes do cliente

## 8. Investimento

Investimento total: R$ 1.840.000, em parcelas mensais ao longo de 5 meses.

Margem praticada: 20%.
