---
projeto_id: P199
cliente: Operador Logístico Armazém Brasil
titulo: Streaming de dados em tempo real para operações logísticas
segmento: Logística
tecnologias: ["Python","Azure","AWS"]
servicos: ["Engenharia de Dados","Analytics & BI","Change Management"]
area: Data & Analytics
dono: Úrsula Campos
confidencialidade: interna
status_proposta: Perdida
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P199
id: P199-PROP
tipo_documental: proposta_comercial
status_documento: final_enviada
data: 2026-08-31
prazo_meses: 4
valor: 430000
margem: 0.32
---

# Proposta Comercial — Streaming de dados em tempo real para operações logísticas

**Cliente:** Operador Logístico Armazém Brasil
**Segmento:** Logística
**Área responsável:** Data & Analytics · **Dono da proposta:** Úrsula Campos
**Data:** 2026-08-31 · **Versão:** final

## 1. Contexto e desafio

O Operador Logístico Armazém Brasil opera 12 centros de distribuição e movimenta cerca de 85 mil pedidos por dia, mas os indicadores de estoque e de status de entrega chegam aos gestores com atraso de até 6 horas, gerando 18% de retrabalho na separação e perda de visibilidade sobre 3 mil veículos em rota. A área de operações não consegue reagir a desvios de SLA em tempo hábil e a diretoria cobra redução de 25% nas ocorrências de atraso até o fim do ano.

## 2. Objetivo

Implantar uma plataforma de streaming de dados em tempo real para consolidar eventos de WMS, TMS e telemetria, disponibilizando indicadores operacionais com latência inferior a 2 minutos para as equipes de operação e diretoria.

## 3. Escopo da solução

- Construção de pipelines de ingestão de eventos em Python sobre Azure Event Hubs, com replicação de dados para AWS Kinesis
- Modelagem de camada de streaming e near real-time no Azure Databricks, consumindo dados das origens WMS e TMS
- Criação de 8 dashboards operacionais no Power BI com atualização em janelas de 1 a 2 minutos
- Implementação de alertas automatizados de desvio de SLA em AWS Lambda e Azure Functions
- Plano de change management com treinamento de 120 usuários em 3 ondas e definição de novos rituais de gestão à vista

Tecnologias principais: Python, Azure, AWS.

## 4. Abordagem e cronograma

O projeto será executado em 4 meses, nas seguintes fases:

- Discovery e arquitetura de streaming (4 semanas)
- Construção dos pipelines e integração de fontes (6 semanas)
- Dashboards, alertas e Analytics & BI (4 semanas)
- Change management e go-live assistido (2 semanas)

## 5. Entregáveis

- Arquitetura de referência de streaming validada em ambiente Azure e AWS
- 6 pipelines de ingestão de eventos em produção, documentados e monitorados
- 8 dashboards operacionais em tempo real publicados no Power BI
- Catálogo de alertas de SLA com 15 regras automatizadas em operação
- Programa de treinamento executado e material de apoio entregue aos 120 usuários-chave

## 6. Equipe proposta

1 arquiteto de dados, 2 engenheiros de dados, 1 analista de BI e 1 consultor de change management, com 1 gerente de projeto dedicado 50%.

## 7. Premissas e riscos

- Risco: Qualidade e padronização dos eventos emitidos pelos sistemas WMS e TMS legados
- Risco: Latência de rede entre os 12 centros de distribuição e os serviços de nuvem
- Risco: Baixa adesão dos operadores aos novos rituais de gestão à vista

## 8. Investimento

Investimento total: R$ 430.000, em parcelas mensais ao longo de 4 meses.

Margem praticada: 32%.
