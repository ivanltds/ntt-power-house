---
projeto_id: P263
cliente: Casa & Construção Prime
titulo: Detecção de Fraude em Tempo Real para Rede de Varejo de Materiais de Construção
segmento: Varejo
tecnologias: ["Python","Kafka"]
servicos: ["Engenharia de Dados","Data Science / ML"]
area: AI & Automation
dono: Rafael Gonçalves
confidencialidade: interna
status_proposta: Perdida
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P263
id: P263-PROP
tipo_documental: proposta_comercial
status_documento: final_enviada
data: 2025-11-11
prazo_meses: 7
valor: 2310000
margem: 0.24
---

# Proposta Comercial — Detecção de Fraude em Tempo Real para Rede de Varejo de Materiais de Construção

**Cliente:** Casa & Construção Prime
**Segmento:** Varejo
**Área responsável:** AI & Automation · **Dono da proposta:** Rafael Gonçalves
**Data:** 2025-11-11 · **Versão:** final

## 1. Contexto e desafio

A Casa & Construção Prime, com 48 lojas e cerca de 2,3 milhões de transações/mês no PDV e e-commerce, sofre perdas estimadas em 1,4% do faturamento com fraudes em cartões, devoluções indevidas e uso de cupons. As regras atuais rodam em lote noturno, o que impede o bloqueio no ponto de venda e gera retrabalho manual de 6 analistas.

## 3. Escopo da solução

- Ingestão em streaming de transações de PDV e e-commerce via Kafka, com schema padronizado e latência-alvo abaixo de 2 segundos
- Pipeline de engenharia de dados em Python para features de risco (velocidade de compras, devoluções, cupons, dispositivo)
- Modelos supervisionados de scoring de fraude em Python, com retreino mensal e explicabilidade das decisões
- Serviço de decisão em tempo real integrado ao PDV e ao checkout, com fila de revisão para casos de score intermediário
- Painel de monitoramento de fraudes, falsos positivos e deriva de modelo para o time de prevenção

Tecnologias principais: Python, Kafka.

## 4. Abordagem e cronograma

O projeto será executado em 7 meses, nas seguintes fases:

- Diagnóstico e arquitetura (5 semanas)
- Engenharia de dados e streaming (8 semanas)
- Modelagem e integração do scoring (11 semanas)
- Piloto em 8 lojas e go-live (4 semanas)

## 5. Entregáveis

- Arquitetura de referência do motor de fraude em streaming com Kafka e Python
- Pipeline de features em produção, com documentação e testes automatizados
- Modelos de scoring treinados e validados sobre 24 meses de histórico transacional
- Serviço de decisão em tempo real integrado a 2 canais (PDV e e-commerce)
- Dashboard operacional de fraude e relatório de desempenho dos modelos

## 6. Equipe proposta

1 arquiteto de dados, 2 engenheiros de dados, 2 cientistas de dados e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Qualidade e atraso na liberação do histórico transacional
- Risco: Latência do PDV acima do suportado pelo serviço de decisão
- Risco: Volume de falsos positivos gerando sobrecarga na equipe de prevenção

## 8. Investimento

Investimento total: R$ 2.310.000, em parcelas mensais ao longo de 7 meses.

Margem praticada: 24%.
