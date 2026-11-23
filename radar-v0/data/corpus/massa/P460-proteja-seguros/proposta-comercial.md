---
projeto_id: P460
cliente: Proteja Seguros
titulo: Assistente virtual com IA generativa para atendimento a segurados
segmento: Seguros
tecnologias: ["IA Generativa","Azure","Python"]
servicos: ["Automação de Processos","IA Generativa"]
area: AI & Automation
dono: Karina Duarte
confidencialidade: interna
status_proposta: Em negociação
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P460
id: P460-PROP
tipo_documental: proposta_comercial
status_documento: final_enviada
data: 2026-09-05
prazo_meses: 7
valor: 550000
margem: 0.26
---

# Proposta Comercial — Assistente virtual com IA generativa para atendimento a segurados

**Cliente:** Proteja Seguros
**Segmento:** Seguros
**Área responsável:** AI & Automation · **Dono da proposta:** Karina Duarte
**Data:** 2026-09-05 · **Versão:** final

## 1. Contexto e desafio

A Proteja Seguros registra cerca de 480 mil interações de atendimento por mês, com 62% delas concentradas em dúvidas repetitivas sobre apólices, sinistros e coberturas. O tempo médio de espera chega a 9 minutos nos picos e o índice de resolução no primeiro contato é de apenas 54%, elevando o custo por atendimento e a insatisfação dos segurados.

## 2. Objetivo

Implantar um assistente virtual com IA generativa no atendimento, capaz de responder dúvidas e conduzir consultas sobre apólices e sinistros com resolução no primeiro contato, reduzindo o tempo de espera e o volume de chamados encaminhados a atendentes humanos.

## 3. Escopo da solução

- Desenvolvimento do assistente virtual em Python com modelos de IA Generativa integrados via serviços do Azure (Azure OpenAI Service e Azure AI Search) sobre a base de conhecimento de produtos e apólices
- Construção de pipeline de ingestão e indexação de documentos de seguros (condições gerais, coberturas e FAQs) com atualização automatizada da base vetorial
- Integração do assistente aos canais de atendimento existentes (web e WhatsApp) por APIs, com orquestração de diálogo e transferência para atendente humano quando necessário
- Implementação de camada de automação de processos para triagem de solicitações e registro de protocolos, com monitoramento de métricas no Azure Monitor
- Aplicação de guardrails, filtros de conteúdo e trilha de auditoria das respostas geradas, em conformidade com as políticas de privacidade de dados de segurados

Tecnologias principais: IA Generativa, Azure, Python.

## 4. Abordagem e cronograma

O projeto será executado em 7 meses, nas seguintes fases:

- Descoberta e desenho da solução (4 semanas)
- Construção do assistente e integração de canais (10 semanas)
- Piloto controlado e ajuste de qualidade das respostas (8 semanas)
- Go-live e estabilização (6 semanas)

## 5. Entregáveis

- Assistente virtual em produção nos canais web e WhatsApp, atendendo consultas sobre apólices, sinistros e coberturas
- Base de conhecimento vetorial indexada e processo automatizado de atualização de documentos
- Conjunto de APIs de integração e fluxo de transferência para atendimento humano documentado
- Painel de indicadores de atendimento (resolução no primeiro contato, tempo de resposta e taxa de escalonamento) no Azure Monitor
- Relatório de avaliação de qualidade das respostas e plano de evolução do assistente para os 6 meses seguintes

## 6. Equipe proposta

1 arquiteto de soluções de IA, 1 gerente de projeto, 2 engenheiros de IA em Python, 1 especialista em Azure e 1 analista de negócios de seguros.

## 7. Premissas e riscos

- Risco: Qualidade das respostas geradas abaixo do aceitável em temas regulados de sinistro
- Risco: Baixa adesão dos atendentes e segurados ao novo canal durante o piloto
- Risco: Atraso na integração com os sistemas legados de apólices e sinistros

## 8. Investimento

Investimento total: R$ 550.000, em parcelas mensais ao longo de 7 meses.

Margem praticada: 26%.
