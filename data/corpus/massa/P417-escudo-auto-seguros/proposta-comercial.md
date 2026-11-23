---
projeto_id: P417
cliente: Escudo Auto Seguros
titulo: Leitura e triagem inteligente de documentos com IA generativa para sinistros
segmento: Seguros
tecnologias: ["Python","AWS"]
servicos: ["Automação de Processos"]
area: AI & Automation
dono: Karina Duarte
confidencialidade: interna
status_proposta: Cancelada
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P417
id: P417-PROP
tipo_documental: proposta_comercial
status_documento: final_enviada
data: 2025-07-02
prazo_meses: 5
valor: 1260000
margem: 0.18
---

# Proposta Comercial — Leitura e triagem inteligente de documentos com IA generativa para sinistros

**Cliente:** Escudo Auto Seguros
**Segmento:** Seguros
**Área responsável:** AI & Automation · **Dono da proposta:** Karina Duarte
**Data:** 2025-07-02 · **Versão:** final

## 1. Contexto e desafio

A Escudo Auto Seguros recebe cerca de 48 mil documentos por mês entre boletins de ocorrência, laudos e orçamentos, e a triagem manual consome 6 dias úteis em média por processo. Cerca de 22% dos casos exigem reanálise por erros de classificação, elevando o custo operacional da área de sinistros em 18%.

## 2. Objetivo

Automatizar a leitura, classificação e triagem de documentos de sinistros com IA generativa, reduzindo o tempo médio de triagem para até 1 dia útil e a taxa de reanálise para menos de 8%.

## 3. Escopo da solução

- Pipeline de ingestão e OCR de documentos em Python, executado em AWS Lambda e Amazon S3
- Serviço de classificação e extração de campos com IA generativa via Amazon Bedrock
- Motor de regras de triagem e roteamento automático para as filas de analistas
- Painel de acompanhamento de acurácia e volume processado em Amazon CloudWatch e QuickSight
- Integração via API com o sistema de gestão de sinistros existente do cliente

Tecnologias principais: Python, AWS.

## 4. Abordagem e cronograma

O projeto será executado em 5 meses, nas seguintes fases:

- Discovery e arquitetura (4 semanas)
- Desenvolvimento do pipeline e modelo (8 semanas)
- Integração e testes assistidos (6 semanas)
- Go-live assistido e transferência de conhecimento (2 semanas)

## 5. Entregáveis

- Documento de arquitetura da solução em AWS com definição dos modelos generativos
- Pipeline de ingestão e OCR implantado em ambiente de homologação
- Modelo de classificação e extração validado com acurácia mínima de 92% em base de 3 mil documentos
- Motor de triagem e integração com o sistema de sinistros em produção assistida
- Relatório de resultados e plano de evolução pós-projeto

## 6. Equipe proposta

1 arquiteto de soluções AWS, 2 engenheiros de IA, 1 engenheiro de dados Python e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Qualidade e padronização irregular dos documentos digitalizados
- Risco: Baixa adesão dos analistas de sinistros ao novo fluxo de triagem
- Risco: Restrições de privacidade e LGPD no envio de documentos a serviços generativos

## 8. Investimento

Investimento total: R$ 1.260.000, em parcelas mensais ao longo de 5 meses.

Margem praticada: 18%.
