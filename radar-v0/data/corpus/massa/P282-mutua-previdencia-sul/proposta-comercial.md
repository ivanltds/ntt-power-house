---
projeto_id: P282
cliente: Mútua Previdência Sul
titulo: Leitura e triagem inteligente de documentos com IA generativa para seguros
segmento: Seguros
tecnologias: ["Python","AWS"]
servicos: ["IA Generativa","Automação de Processos"]
area: AI & Automation
dono: Rafael Gonçalves
confidencialidade: interna
status_proposta: Perdida
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P282
id: P282-PROP
tipo_documental: proposta_comercial
status_documento: final_enviada
data: 2026-10-07
prazo_meses: 3
valor: 920000
margem: 0.19
---

# Proposta Comercial — Leitura e triagem inteligente de documentos com IA generativa para seguros

**Cliente:** Mútua Previdência Sul
**Segmento:** Seguros
**Área responsável:** AI & Automation · **Dono da proposta:** Rafael Gonçalves
**Data:** 2026-10-07 · **Versão:** final

## 1. Contexto e desafio

A Mútua Previdência Sul recebe cerca de 12 mil documentos por mês entre propostas, sinistros e apólices, e a triagem manual consome 3.200 horas/ano da equipe de retaguarda, com índice de erro de classificação de 8%. O processo atual em planilhas e caixas de e-mail atrasa a abertura de sinistros em até 5 dias úteis.

## 2. Objetivo

Automatizar a leitura, classificação e extração de dados de documentos com IA generativa, reduzindo o tempo de triagem em 60% e o erro de classificação para menos de 2% em 3 meses.

## 3. Escopo da solução

- Pipeline de ingestão de documentos em Python com OCR e pré-processamento de PDFs e imagens
- Serviço de classificação e extração de campos com IA generativa na AWS (Amazon Bedrock) orquestrado por Lambda
- Camada de validação humana e trilha de auditoria para documentos com baixa confiança
- Integração com o sistema de gestão de sinistros via API REST, com filas SQS para desacoplamento
- Dashboard de acompanhamento de volumes, acurácia e SLA de triagem em Amazon QuickSight

Tecnologias principais: Python, AWS.

## 4. Abordagem e cronograma

O projeto será executado em 3 meses, nas seguintes fases:

- Discovery e definição de arquitetura (3 semanas)
- Desenvolvimento do protótipo de IA generativa (4 semanas)
- Integração, testes e validação com dados reais (4 semanas)
- Implantação assistida e treinamento (1 semanas)

## 5. Entregáveis

- Documento de arquitetura da solução e matriz de riscos
- Protótipo funcional de classificação para 5 tipos de documentos prioritários
- Pipeline de triagem automatizada em ambiente AWS de homologação
- Relatório de acurácia e testes com 2.000 documentos históricos
- Manual de operação, playbook de exceções e treinamento de 8 horas para a equipe

## 6. Equipe proposta

1 arquiteto de soluções de IA, 2 engenheiros de dados Python, 1 especialista em IA generativa AWS e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Qualidade e padronização dos documentos digitalizados
- Risco: Restrições de privacidade e LGPD no envio de dados ao modelo
- Risco: Baixa adesão da equipe de retaguarda ao novo fluxo

## 8. Investimento

Investimento total: R$ 920.000, em parcelas mensais ao longo de 3 meses.

Margem praticada: 19%.
