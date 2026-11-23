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
id: P506-SOW
tipo_documental: sow
status_documento: assinado
data: 2024-08-06
prazo_meses: 4
valor: 1590000
---

# SOW — Leitura e triagem de documentos com IA generativa para sinistros

**Contratante:** Proteja Seguros · **Contratada:** NTT DATA Brasil · **Vigência:** 4 meses a partir do kickoff

## 1. Objeto

Automatizar a leitura, a extração de dados e a triagem de documentos de sinistros com IA generativa na AWS, reduzindo o tempo de triagem e o retrabalho manual.

## 2. Escopo contratado

- Ingestão de documentos em lote e via API no Amazon S3, com controle de versionamento e trilha de auditoria.
- Extração e classificação de campos críticos (número da apólice, data do evento, valor reclamado, tipo de documento) com Amazon Textract e modelos de IA generativa no Amazon Bedrock.
- Pipeline de orquestração em AWS Step Functions e AWS Lambda para roteamento automático dos documentos por fila de análise.
- Camada de validação humana com interface de revisão e feedback para re-treino dos prompts no Bedrock.
- Painel de acompanhamento em Amazon QuickSight com volumetria, acurácia de extração e tempo médio de triagem.

## 3. Entregáveis e aceite

- Pipeline de ingestão e extração documental em produção na AWS, integrado ao sistema de sinistros da Proteja.
- Modelo de classificação e extração com acurácia mínima de 94% nos campos críticos, validada em base de 5.000 documentos.
- Interface de revisão humana com registro de correções e métricas de qualidade.
- Dashboard operacional com indicadores de volumetria, acurácia e SLA de triagem.
- Documentação técnica, runbooks de operação e treinamento de 25 usuários das áreas de sinistro e TI.

Cada entregável é aceito pelo cliente em até 10 dias úteis após a entrega.

## 4. Fora do escopo

Sustentação após a operação assistida, licenças de software e infraestrutura do cliente.

## 5. Valor e condições

Valor total: R$ 1.590.000, faturado mensalmente conforme o cronograma.
