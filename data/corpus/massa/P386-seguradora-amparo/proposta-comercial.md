---
projeto_id: P386
cliente: Seguradora Amparo
titulo: Leitura e triagem de documentos com IA generativa para sinistros
segmento: Seguros
tecnologias: ["RPA","Azure","IA Generativa"]
servicos: ["IA Generativa","Automação de Processos"]
area: AI & Automation
dono: Karina Duarte
confidencialidade: interna
status_proposta: Entregue
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P386
id: P386-PROP
tipo_documental: proposta_comercial
status_documento: final_aprovada
data: 2024-10-01
prazo_meses: 3
valor: 4150000
margem: 0.18
---

# Proposta Comercial — Leitura e triagem de documentos com IA generativa para sinistros

**Cliente:** Seguradora Amparo
**Segmento:** Seguros
**Área responsável:** AI & Automation · **Dono da proposta:** Karina Duarte
**Data:** 2024-10-01 · **Versão:** final

## 1. Contexto e desafio

A Seguradora Amparo recebia cerca de 42 mil documentos por mês entre avisos de sinistro, laudos e boletins de ocorrência, com triagem 100% manual e prazo médio de 3,5 dias úteis por processo. O volume crescia 18% ao ano e 27% dos documentos chegavam com dados incompletos, gerando retrabalho e atraso no pagamento de indenizações.

## 2. Objetivo

Automatizar a leitura, classificação e triagem de documentos de sinistro com IA generativa e RPA, reduzindo o tempo de triagem para menos de 1 dia útil e liberando a equipe para análise de casos complexos.

## 3. Escopo da solução

- Extração e classificação de documentos (PDF, imagens e e-mails) com modelos de IA generativa no Azure OpenAI, incluindo OCR e resumo automático por processo
- Orquestração de fluxos de triagem e roteamento de pendências com RPA integrado às esteiras de sinistros existentes
- Camada de validação humana com fila de exceções, limites de confiança e trilha de auditoria para 100% das decisões automatizadas
- Painel de acompanhamento no Azure com indicadores de volume, acurácia de extração e tempo de triagem por tipo de documento
- Integração via APIs com o sistema de gestão de sinistros e o repositório documental do cliente, com monitoramento e alertas operacionais

Tecnologias principais: RPA, Azure, IA Generativa.

## 4. Abordagem e cronograma

O projeto será executado em 3 meses, nas seguintes fases:

- Diagnóstico e desenho da solução (3 semanas)
- Desenvolvimento do pipeline de IA generativa e OCR (4 semanas)
- Implementação dos fluxos RPA e integrações (3 semanas)
- Homologação, treinamento e go-live (2 semanas)

## 5. Entregáveis

- Pipeline de ingestão e leitura documental com IA generativa em produção, cobrindo 6 tipos de documentos
- Robôs RPA de triagem e roteamento implantados para 100% dos novos avisos de sinistro
- Fila de exceções com interface de validação humana e relatório de acurácia por tipo de documento
- Painel de indicadores operacionais no Azure com atualização diária
- Documentação técnica, manuais operacionais e treinamento de 15 analistas da seguradora

## 6. Equipe proposta

1 arquiteto de soluções de IA, 1 cientista de dados, 2 desenvolvedores RPA, 1 engenheiro de integração Azure e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Qualidade e legibilidade de documentos digitalizados enviados por segurados
- Risco: Baixa adoção da fila de exceções pelos analistas de sinistro
- Risco: Atraso nas integrações com o sistema legado de gestão de sinistros

## 8. Investimento

Investimento total: R$ 4.150.000, em parcelas mensais ao longo de 3 meses.

Margem praticada: 18%.
