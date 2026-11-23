---
projeto_id: P307
cliente: FibraMax Internet
titulo: Assistente Virtual com IA Generativa para Atendimento ao Cliente
segmento: Telecom
tecnologias: ["Salesforce","Python","Azure"]
servicos: ["IA Generativa","Automação de Processos"]
area: AI & Automation
dono: João Pedro Sales
confidencialidade: confidencial
status_proposta: Enviada
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P307
id: P307-PROP
tipo_documental: proposta_comercial
status_documento: final_enviada
data: 2026-11-12
prazo_meses: 5
valor: 4840000
margem: 0.29
---

# Proposta Comercial — Assistente Virtual com IA Generativa para Atendimento ao Cliente

**Cliente:** FibraMax Internet
**Segmento:** Telecom
**Área responsável:** AI & Automation · **Dono da proposta:** João Pedro Sales
**Data:** 2026-11-12 · **Versão:** final

## 1. Contexto e desafio

A FibraMax Internet atende cerca de 480 mil assinantes e recebe 1,2 milhão de contatos por mês nos canais digitais, dos quais 62% são dúvidas repetitivas sobre faturas, planos e suporte técnico de primeiro nível. O tempo médio de espera no chat é de 9 minutos e a taxa de resolução no primeiro contato está em 54%, elevando o custo por atendimento e a insatisfação.

## 2. Objetivo

Implantar um assistente virtual com IA generativa integrado ao Salesforce para resolver automaticamente consultas de primeiro nível, reduzindo o tempo de espera e elevando a resolução no primeiro contato para 75% em 5 meses.

## 3. Escopo da solução

- Assistente conversacional em Python com LLM via Azure OpenAI, orquestrado por APIs publicadas no Azure API Management
- Integração com Salesforce Service Cloud para consulta de faturas, planos e histórico de tickets do assinante
- Automação de processos de triagem e roteamento de chamados com Azure Functions e regras no Salesforce Flow
- Camada de conhecimento com base vetorial no Azure AI Search alimentada por políticas, FAQs e procedimentos de suporte
- Painel de acompanhamento no Salesforce com métricas de contenção, CSAT e taxa de escalonamento humano

Tecnologias principais: Salesforce, Python, Azure.

## 4. Abordagem e cronograma

O projeto será executado em 5 meses, nas seguintes fases:

- Discovery e desenho da solução: 4 semanas
- Desenvolvimento das integrações Salesforce e Azure: 8 semanas
- Construção do assistente e base de conhecimento: 6 semanas
- Homologação, treinamento e go-live assistido: 4 semanas

## 5. Entregáveis

- Assistente virtual em produção nos canais chat e WhatsApp com cobertura de 20 intenções de atendimento
- Integração Salesforce–Azure documentada e homologada com testes de carga para 3.000 sessões simultâneas
- Base de conhecimento vetorial com 1.500 artigos curados e processo de atualização contínua
- Dashboard de KPIs no Salesforce com relatórios de contenção, CSAT e transbordo
- Documentação técnica, manuais operacionais e treinamento de 40 atendentes e 8 supervisores

## 6. Equipe proposta

1 arquiteto de soluções, 2 engenheiros de IA, 1 desenvolvedor Salesforce, 1 engenheiro de automação e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Baixa qualidade dos artigos de conhecimento impacta a precisão das respostas
- Risco: Latência das APIs do Salesforce acima do SLA em horários de pico
- Risco: Resistência dos atendentes à adoção do assistente no fluxo de trabalho

## 8. Investimento

Investimento total: R$ 4.840.000, em parcelas mensais ao longo de 5 meses.

Margem praticada: 29%.
