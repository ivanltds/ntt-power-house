---
projeto_id: P276
cliente: Hospital São Lucas do Vale
titulo: Lakehouse de dados clínicos e operacionais em Snowflake na nuvem híbrida
segmento: Saúde
tecnologias: ["Snowflake","AWS","Azure","Python"]
servicos: ["Migração para Nuvem","Engenharia de Dados"]
area: Data & Analytics
dono: Quésia Ramos
confidencialidade: interna
status_proposta: Entregue
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P276
id: P276-SOW
tipo_documental: sow
status_documento: assinado
data: 2026-02-03
prazo_meses: 11
valor: 1260000
---

# SOW — Lakehouse de dados clínicos e operacionais em Snowflake na nuvem híbrida

**Contratante:** Hospital São Lucas do Vale · **Contratada:** NTT DATA Brasil · **Vigência:** 11 meses a partir do kickoff

## 1. Objeto

Implantar uma plataforma lakehouse em Snowflake sobre AWS e Azure, unificando dados clínicos e administrativos para análises quase em tempo real e redução do custo de armazenamento e processamento.

## 2. Escopo contratado

- Migração do data warehouse on-premises para Snowflake, com ingestão via AWS S3 e pipelines em Python para 14 fontes de dados
- Integração híbrida com o ERP hospitalar e sistemas de prontuário eletrônico, usando Azure Data Factory para as fontes corporativas
- Modelagem em camadas (raw, curadoria e consumo) com 180 tabelas e visões semânticas para as áreas assistencial, financeira e operacional
- Orquestração e monitoramento de cargas com alertas automatizados e SLA de atualização de 30 minutos para indicadores críticos
- Governança de dados com catálogo, linhagem e políticas de acesso a dados sensíveis de pacientes (LGPD)

## 3. Entregáveis e aceite

- Plataforma lakehouse em produção no Snowflake com 14 fontes integradas e 99,5% de disponibilidade
- 120 dashboards e relatórios migrados, incluindo ocupação de leitos, produção assistencial e faturamento de convênios
- Pipeline de dados em Python com 240 execuções diárias automatizadas e logs centralizados
- Documentação técnica, runbooks operacionais e catálogo de dados com 180 tabelas catalogadas
- Treinamento de 45 usuários-chave e 8 analistas internos em Snowflake e boas práticas de engenharia de dados

Cada entregável é aceito pelo cliente em até 10 dias úteis após a entrega.

## 4. Fora do escopo

Sustentação após a operação assistida, licenças de software e infraestrutura do cliente.

## 5. Valor e condições

Valor total: R$ 1.260.000, faturado mensalmente conforme o cronograma.
