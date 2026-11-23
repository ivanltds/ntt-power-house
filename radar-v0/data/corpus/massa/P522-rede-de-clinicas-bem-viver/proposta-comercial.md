---
projeto_id: P522
cliente: Rede de Clínicas Bem Viver
titulo: Plataforma de Dados Lakehouse para Análise Clínica e Operacional
segmento: Saúde
tecnologias: ["Python","Snowflake"]
servicos: ["Engenharia de Dados"]
area: Data & Analytics
dono: Eduarda Prado
confidencialidade: interna
status_proposta: Perdida
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P522
id: P522-PROP
tipo_documental: proposta_comercial
status_documento: final_enviada
data: 2026-04-23
prazo_meses: 7
valor: 960000
margem: 0.21
---

# Proposta Comercial — Plataforma de Dados Lakehouse para Análise Clínica e Operacional

**Cliente:** Rede de Clínicas Bem Viver
**Segmento:** Saúde
**Área responsável:** Data & Analytics · **Dono da proposta:** Eduarda Prado
**Data:** 2026-04-23 · **Versão:** final

## 1. Contexto e desafio

A Rede de Clínicas Bem Viver possui 42 unidades e atende 380 mil pacientes por ano, mas os dados de prontuários, faturamento e estoque ficam dispersos em 7 sistemas distintos, gerando relatórios manuais que consomem 120 horas mensais da equipe de TI e atrasam a tomada de decisão em até 5 dias.

## 2. Objetivo

Implementar uma plataforma de dados lakehouse em Snowflake e Python para centralizar e integrar os dados das clínicas, permitindo análises em tempo quase real e reduzindo o tempo de geração de relatórios estratégicos de 5 dias para menos de 4 horas.

## 3. Escopo da solução

- Ingestão de dados de 7 fontes (prontuário eletrônico, ERP financeiro, sistema de estoque, CRM, entre outros) usando Python e conectores nativos Snowflake.
- Modelagem dimensional no Snowflake com camadas bronze, prata e ouro para dados clínicos, financeiros e operacionais.
- Implementação de pipelines de dados orquestrados com Python (Airflow) para carga incremental diária e streaming de eventos críticos.
- Criação de 15 data marts no Snowflake para as áreas de operações, finanças e qualidade assistencial.
- Configuração de governança de dados com políticas de acesso, mascaramento de dados sensíveis (LGPD) e catálogo de metadados no Snowflake.

Tecnologias principais: Python, Snowflake.

## 4. Abordagem e cronograma

O projeto será executado em 7 meses, nas seguintes fases:

- Fase 1 - Descoberta e Arquitetura: 4 semanas
- Fase 2 - Implementação de Pipelines e Modelagem: 10 semanas
- Fase 3 - Data Marts e Visualização: 8 semanas
- Fase 4 - Governança, Testes e Go-live: 6 semanas

## 5. Entregáveis

- Documento de arquitetura de dados lakehouse detalhando a integração das 7 fontes e o modelo dimensional no Snowflake.
- Pipeline de ingestão automatizado em Python com 7 conectores validados e monitoramento de qualidade de dados.
- Modelo dimensional implementado no Snowflake com 15 data marts e documentação de linhagem.
- Painéis de visualização (Power BI) para 3 áreas-chave, integrados ao Snowflake.
- Plano de governança de dados e treinamento para 20 usuários-chave da Rede de Clínicas Bem Viver.

## 6. Equipe proposta

1 arquiteto de dados, 2 engenheiros de dados, 1 especialista em Snowflake e 1 gerente de projeto.

## 7. Premissas e riscos

- Risco: Atraso na liberação de acessos às fontes de dados legadas do cliente.
- Risco: Qualidade dos dados de prontuários incompleta ou inconsistente.
- Risco: Mudanças de escopo durante a implementação devido a necessidades não mapeadas.

## 8. Investimento

Investimento total: R$ 960.000, em parcelas mensais ao longo de 7 meses.

Margem praticada: 21%.
