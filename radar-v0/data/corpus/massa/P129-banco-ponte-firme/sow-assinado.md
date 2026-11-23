---
projeto_id: P129
cliente: Banco Ponte Firme
titulo: Detecção de Fraude em Tempo Real com Machine Learning e Kafka
segmento: Serviços Financeiros
tecnologias: ["Machine Learning","Kafka","Python","Azure"]
servicos: ["Data Science / ML"]
area: AI & Automation
dono: Bruno Tavares
confidencialidade: interna
status_proposta: Em execução
link_sharepoint: https://sharepoint.exemplo/sites/propostas/P129
id: P129-SOW
tipo_documental: sow
status_documento: assinado
data: 2026-09-10
prazo_meses: 4
valor: 1120000
---

# SOW — Detecção de Fraude em Tempo Real com Machine Learning e Kafka

**Contratante:** Banco Ponte Firme · **Contratada:** NTT DATA Brasil · **Vigência:** 4 meses a partir do kickoff

## 1. Objeto

Implantar um modelo de machine learning em tempo real para detecção de fraude, integrado via Kafka e Azure, visando reduzir perdas em 30% e diminuir falsos positivos para menos de 15% em 4 meses.

## 2. Escopo contratado

- Desenvolvimento de modelos de ML (Python, scikit-learn, XGBoost) para classificação de transações fraudulentas
- Integração do modelo com stream de transações via Apache Kafka para inferência em tempo real
- Deploy e orquestração do modelo em Azure Machine Learning com monitoramento contínuo
- Criação de pipeline de features e retreinamento automatizado com dados históricos
- Dashboard de acompanhamento de métricas de fraude e performance do modelo

## 3. Entregáveis e aceite

- Modelo de ML treinado e validado com AUC-ROC superior a 0,95
- API de scoring em tempo real integrada ao Kafka
- Pipeline de MLOps para retreinamento semanal automático
- Documentação técnica e manual de operação
- Relatório de resultados com comparação baseline vs. modelo implantado

Cada entregável é aceito pelo cliente em até 10 dias úteis após a entrega.

## 4. Fora do escopo

Sustentação após a operação assistida, licenças de software e infraestrutura do cliente.

## 5. Valor e condições

Valor total: R$ 1.120.000, faturado mensalmente conforme o cronograma.
