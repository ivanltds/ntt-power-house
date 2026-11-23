---
projeto_id: P506
cliente: Proteja Seguros
titulo: Leitura e triagem de documentos com IA generativa para sinistros
segmento: Seguros
tecnologias: ["AWS","IA Generativa"]
servicos: ["Automação de Processos"]
area: AI & Automation
dono: Karina Duarte
confidencialidade: confidencial
status_proposta: Entregue
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P506
id: P506-PROP
tipo_documental: proposta_comercial
status_documento: final_aprovada
data: 2024-07-12
prazo_meses: 4
valor: 1590000
margem: 0.2
---

# Proposta Comercial — Leitura e triagem de documentos com IA generativa para sinistros

**Cliente:** Proteja Seguros
**Segmento:** Seguros
**Área responsável:** AI & Automation · **Dono da proposta:** Karina Duarte
**Data:** 2024-07-12 · **Versão:** final

## 1. Contexto e desafio

A Proteja Seguros recebia cerca de 42 mil documentos por mês (boletins de ocorrência, laudos, notas fiscais e apólices) em formatos PDF e imagem, com triagem 100% manual feita por 18 analistas. O tempo médio de abertura de sinistro chegava a 3,5 dias úteis e 27% dos documentos exigiam retrabalho por classificação incorreta.

## 2. Objetivo

Automatizar a leitura, a extração de dados e a triagem de documentos de sinistros com IA generativa na AWS, reduzindo o tempo de triagem e o retrabalho manual.

## 3. Escopo da solução

- Ingestão de documentos em lote e via API no Amazon S3, com controle de versionamento e trilha de auditoria.
- Extração e classificação de campos críticos (número da apólice, data do evento, valor reclamado, tipo de documento) com Amazon Textract e modelos de IA generativa no Amazon Bedrock.
- Pipeline de orquestração em AWS Step Functions e AWS Lambda para roteamento automático dos documentos por fila de análise.
- Camada de validação humana com interface de revisão e feedback para re-treino dos prompts no Bedrock.
- Painel de acompanhamento em Amazon QuickSight com volumetria, acurácia de extração e tempo médio de triagem.

Tecnologias principais: AWS, IA Generativa.

## 4. Abordagem e cronograma

O projeto será executado em 4 meses, nas seguintes fases:

- Diagnóstico e desenho da solução (4 semanas)
- Desenvolvimento do pipeline e dos prompts no Bedrock (7 semanas)
- Piloto com 3 tipos de documento e ajuste de acurácia (3 semanas)
- Rollout, treinamento e estabilização (2 semanas)

## 5. Entregáveis

- Pipeline de ingestão e extração documental em produção na AWS, integrado ao sistema de sinistros da Proteja.
- Modelo de classificação e extração com acurácia mínima de 94% nos campos críticos, validada em base de 5.000 documentos.
- Interface de revisão humana com registro de correções e métricas de qualidade.
- Dashboard operacional com indicadores de volumetria, acurácia e SLA de triagem.
- Documentação técnica, runbooks de operação e treinamento de 25 usuários das áreas de sinistro e TI.

## 6. Equipe proposta

1 arquiteto de soluções AWS, 2 engenheiros de IA/ML, 1 desenvolvedor backend e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Qualidade variável de digitalização dos documentos recebidos
- Risco: Aderência dos analistas ao novo fluxo de validação humana
- Risco: Limites de cota do Amazon Bedrock durante picos de volume

## 8. Investimento

Investimento total: R$ 1.590.000, em parcelas mensais ao longo de 4 meses.

Margem praticada: 20%.
