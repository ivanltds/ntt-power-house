---
projeto_id: P203
cliente: Consórcio União Nacional
titulo: Assistente virtual com IA generativa para atendimento omnichannel no consórcio
segmento: Serviços Financeiros
tecnologias: ["Azure","Salesforce","ServiceNow"]
servicos: ["IA Generativa"]
area: AI & Automation
dono: Bruno Tavares
confidencialidade: confidencial
status_proposta: Perdida
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P203
id: P203-PROP
tipo_documental: proposta_comercial
status_documento: final_enviada
data: 2025-03-01
prazo_meses: 7
valor: 2770000
margem: 0.34
---

# Proposta Comercial — Assistente virtual com IA generativa para atendimento omnichannel no consórcio

**Cliente:** Consórcio União Nacional
**Segmento:** Serviços Financeiros
**Área responsável:** AI & Automation · **Dono da proposta:** Bruno Tavares
**Data:** 2025-03-01 · **Versão:** final

## 1. Contexto e desafio

O Consórcio União Nacional atende cerca de 480 mil consorciados ativos e registra 1,2 milhão de interações por ano nos canais de atendimento, com tempo médio de primeira resposta de 9 minutos no chat e 62% dos contatos concentrados em dúvidas repetitivas sobre contemplação, parcelas e assembleias. A operação atual, baseada em Salesforce e ServiceNow com triagem manual, gera filas no pico de assembleias e custo por atendimento 18% acima da meta anual.

## 2. Objetivo

Implantar um assistente virtual com IA generativa integrado ao Salesforce e ao ServiceNow, hospedado em Azure, para automatizar a resolução de dúvidas repetitivas e reduzir o tempo de primeira resposta e o custo por atendimento.

## 3. Escopo da solução

- Desenho da arquitetura de IA generativa em Azure (Azure OpenAI Service, Azure AI Search e Azure Functions) integrada ao Salesforce Service Cloud e ao ServiceNow
- Construção de base de conhecimento vetorizada a partir de 3.400 artigos e 12 políticas de consórcio, com RAG e guardrails de resposta
- Desenvolvimento do assistente virtual para WhatsApp e chat web, com handoff para atendentes humanos no Salesforce e abertura automática de tickets no ServiceNow
- Painel de observabilidade e avaliação contínua de qualidade das respostas, com métricas de acurácia, taxa de escalonamento e satisfação (CSAT)
- Capacitação de 45 atendentes e 6 supervisores e documentação técnica para sustentação

Tecnologias principais: Azure, Salesforce, ServiceNow.

## 4. Abordagem e cronograma

O projeto será executado em 7 meses, nas seguintes fases:

- Discovery e arquitetura (6 semanas)
- Construção do assistente e base de conhecimento (12 semanas)
- Integrações e piloto com 2 squads de atendimento (6 semanas)
- Rollout, treinamento e estabilização (4 semanas)

## 5. Entregáveis

- Assistente virtual em produção nos canais WhatsApp e chat web, cobrindo 80% dos 25 principais motivos de contato
- Base de conhecimento vetorizada com 3.400 artigos validados e política de atualização mensal
- Integrações homologadas com Salesforce Service Cloud e ServiceNow, incluindo handoff e abertura de tickets
- Painel de observabilidade com 12 indicadores de qualidade e acurácia das respostas
- Plano de sustentação, documentação técnica e treinamento de 51 profissionais do cliente

## 6. Equipe proposta

1 arquiteto de soluções de IA, 2 engenheiros de IA generativa, 1 especialista Salesforce, 1 especialista ServiceNow, 1 analista de CX e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Baixa qualidade dos 3.400 artigos da base de conhecimento eleva a taxa de respostas incorretas
- Risco: Restrições de segurança e LGPD atrasam a aprovação do uso de Azure OpenAI no ambiente do cliente
- Risco: Adesão limitada dos 45 atendentes ao novo fluxo de handoff reduz o ganho esperado no piloto

## 8. Investimento

Investimento total: R$ 2.770.000, em parcelas mensais ao longo de 7 meses.

Margem praticada: 34%.
