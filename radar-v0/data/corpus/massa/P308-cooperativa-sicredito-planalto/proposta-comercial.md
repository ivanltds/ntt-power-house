---
projeto_id: P308
cliente: Cooperativa Sicrédito Planalto
titulo: Modelo de risco de crédito com Machine Learning e Snowflake para cooperativa de crédito
segmento: Serviços Financeiros
tecnologias: ["Machine Learning","Snowflake","AWS"]
servicos: ["Governança de Dados","Data Science / ML"]
area: AI & Automation
dono: Vinícius Batista
confidencialidade: interna
status_proposta: Entregue
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P308
id: P308-PROP
tipo_documental: proposta_comercial
status_documento: final_aprovada
data: 2025-11-18
prazo_meses: 7
valor: 680000
margem: 0.32
---

# Proposta Comercial — Modelo de risco de crédito com Machine Learning e Snowflake para cooperativa de crédito

**Cliente:** Cooperativa Sicrédito Planalto
**Segmento:** Serviços Financeiros
**Área responsável:** AI & Automation · **Dono da proposta:** Vinícius Batista
**Data:** 2025-11-18 · **Versão:** final

## 1. Contexto e desafio

A cooperativa Sicrédito Planalto, com 48 mil cooperados e R$ 3,2 bilhões em carteira de crédito, decidia concessões e limites com base em planilhas e regras manuais, gerando 12 dias de prazo médio de análise e taxa de inadimplência de 6,1% na carteira de pessoas físicas. A ausência de uma base de dados unificada impedia calibrar políticas por segmento e monitorar o risco em tempo quase real.

## 2. Objetivo

Construir um modelo de risco de crédito em Machine Learning sobre base unificada no Snowflake, integrado à esteira de decisão, para reduzir inadimplência e encurtar o prazo de análise de propostas.

## 3. Escopo da solução

- Unificação de dados cadastrais, de crédito e de comportamento de pagamento no Snowflake, com pipelines de ingestão na AWS
- Análise exploratória e engenharia de atributos sobre histórico de 5 anos de operações de crédito
- Desenvolvimento e validação de modelos de score de risco em Machine Learning, com métricas de KS, AUC e estabilidade populacional
- Implantação dos modelos em ambiente AWS com monitoramento de performance e retreinamento periódico
- Estruturação de governança de dados: catálogo, linhagem, dicionário de dados e política de uso de variáveis sensíveis

Tecnologias principais: Machine Learning, Snowflake, AWS.

## 4. Abordagem e cronograma

O projeto será executado em 7 meses, nas seguintes fases:

- Diagnóstico e governança de dados (8 semanas)
- Engenharia de dados e base analítica no Snowflake (8 semanas)
- Desenvolvimento e validação dos modelos de Machine Learning (8 semanas)
- Implantação em AWS, monitoramento e transferência de conhecimento (4 semanas)

## 5. Entregáveis

- Base analítica de crédito consolidada no Snowflake, com 180 variáveis documentadas
- Dois modelos de score de risco (pessoa física e pessoa jurídica) validados e documentados
- Relatório de validação estatística e de explicabilidade dos modelos
- Painel de monitoramento de performance e de inadimplência por safra
- Política de governança de dados e catálogo de dados publicado às áreas de negócio

## 6. Equipe proposta

1 gerente de projeto, 1 arquiteto de dados, 2 engenheiros de dados, 2 cientistas de dados e 1 especialista em governança de dados.

## 7. Premissas e riscos

- Risco: Qualidade e dispersão dos dados históricos de crédito entre sistemas legados
- Risco: Baixa adoção do score pelos analistas de crédito nas agências
- Risco: Restrições de uso de dados pessoais e de explicabilidade regulatória dos modelos

## 8. Investimento

Investimento total: R$ 680.000, em parcelas mensais ao longo de 7 meses.

Margem praticada: 32%.
