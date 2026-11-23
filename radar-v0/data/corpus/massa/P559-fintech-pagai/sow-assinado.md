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
id: P559-SOW
tipo_documental: sow
status_documento: assinado
data: 2025-05-18
prazo_meses: 5
valor: 2140000
---

# SOW — Leitura e triagem de documentos com IA generativa para operações financeiras

**Contratante:** Fintech Pagaí · **Contratada:** NTT DATA Brasil · **Vigência:** 5 meses a partir do kickoff

## 1. Objeto

Automatizar a leitura, extração de campos e triagem de documentos com IA generativa na AWS, reduzindo o esforço manual e o tempo de resposta da operação.

## 2. Escopo contratado

- Pipeline de ingestão de documentos em Python executado em AWS Lambda e Amazon S3, com processamento de PDFs e imagens
- Uso de IA generativa (Amazon Bedrock) para extração de campos e classificação por tipo de documento, com prompts versionados
- Camada de validação e roteamento de casos de baixa confiança para revisão humana
- Integração com a fila de análise da operação via API e registro de trilha de auditoria no Amazon CloudWatch
- Painel de acompanhamento de acurácia, volume processado e fila de exceções em Amazon QuickSight

## 3. Entregáveis e aceite

- Pipeline de ingestão e leitura de documentos em produção na AWS
- Modelo de extração e triagem com acurácia validada acima de 92% em amostra de 5.000 documentos
- Fluxo de revisão humana para casos de baixa confiança, integrado à operação
- Painel de indicadores de acurácia, volume e tempo de triagem
- Documentação técnica e treinamento de 2 turmas para o time de operações

Cada entregável é aceito pelo cliente em até 10 dias úteis após a entrega.

## 4. Fora do escopo

Sustentação após a operação assistida, licenças de software e infraestrutura do cliente.

## 5. Valor e condições

Valor total: R$ 2.140.000, faturado mensalmente conforme o cronograma.
