---
projeto_id: P559
cliente: Fintech Pagaí
titulo: Leitura e triagem de documentos com IA generativa para operações financeiras
segmento: Serviços Financeiros
tecnologias: ["AWS","Python"]
servicos: ["Automação de Processos","IA Generativa"]
area: AI & Automation
dono: Bruno Tavares
confidencialidade: interna
status_proposta: Entregue
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P559
id: P559-PROP
tipo_documental: proposta_comercial
status_documento: final_aprovada
data: 2025-04-23
prazo_meses: 5
valor: 2140000
margem: 0.25
---

# Proposta Comercial — Leitura e triagem de documentos com IA generativa para operações financeiras

**Cliente:** Fintech Pagaí
**Segmento:** Serviços Financeiros
**Área responsável:** AI & Automation · **Dono da proposta:** Bruno Tavares
**Data:** 2025-04-23 · **Versão:** final

## 1. Contexto e desafio

A Fintech Pagaí processava cerca de 180 mil documentos por mês (contratos, comprovantes e cartas de cobrança) com 22 analistas em triagem manual, gerando prazo médio de 3,5 dias úteis e 9% de retrabalho por classificação incorreta. O volume crescia 12% ao trimestre e a operação não escalava sem novas contratações.

## 3. Escopo da solução

- Pipeline de ingestão de documentos em Python executado em AWS Lambda e Amazon S3, com processamento de PDFs e imagens
- Uso de IA generativa (Amazon Bedrock) para extração de campos e classificação por tipo de documento, com prompts versionados
- Camada de validação e roteamento de casos de baixa confiança para revisão humana
- Integração com a fila de análise da operação via API e registro de trilha de auditoria no Amazon CloudWatch
- Painel de acompanhamento de acurácia, volume processado e fila de exceções em Amazon QuickSight

Tecnologias principais: AWS, Python.

## 4. Abordagem e cronograma

O projeto será executado em 5 meses, nas seguintes fases:

- Diagnóstico e desenho da solução (4 semanas)
- Desenvolvimento do pipeline e prompts de IA generativa (8 semanas)
- Piloto com 5.000 documentos e ajuste de acurácia (5 semanas)
- Go-live, treinamento e estabilização (3 semanas)

## 5. Entregáveis

- Pipeline de ingestão e leitura de documentos em produção na AWS
- Modelo de extração e triagem com acurácia validada acima de 92% em amostra de 5.000 documentos
- Fluxo de revisão humana para casos de baixa confiança, integrado à operação
- Painel de indicadores de acurácia, volume e tempo de triagem
- Documentação técnica e treinamento de 2 turmas para o time de operações

## 6. Equipe proposta

1 arquiteto de soluções, 2 engenheiros de dados, 1 especialista em IA generativa e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Qualidade e padronização dos documentos enviados pelos clientes
- Risco: Baixa confiança do modelo em novos tipos de documento
- Risco: Dependência de aprovação de acessos e ambientes AWS pelo cliente

## 8. Investimento

Investimento total: R$ 2.140.000, em parcelas mensais ao longo de 5 meses.

Margem praticada: 25%.
