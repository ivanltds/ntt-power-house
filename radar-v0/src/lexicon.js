// Vocabulário de domínio. No V0 substitui a extração de entidades que seria feita pelo LLM.
// Cada entrada: valor canônico -> termos (já sem acento, minúsculos) que o identificam.

export const SEGMENTS = {
  'Utilities / Energia': ['utilities', 'energia', 'eletrica', 'distribuidora', 'concessionaria', 'saneamento', 'agua', 'geracao', 'transmissao', 'medidor'],
  'Varejo': ['varejo', 'loja', 'lojas', 'ecommerce', 'e-commerce', 'supermercado', 'rede de lojas', 'marketplace'],
  'Serviços Financeiros': ['banco', 'bancos', 'financeiro', 'financeira', 'credito', 'cooperativa', 'fintech', 'pagamentos'],
  'Seguros': ['seguro', 'seguros', 'seguradora', 'sinistro', 'apolice'],
  'Saúde': ['saude', 'hospital', 'hospitalar', 'clinica', 'operadora de saude', 'paciente'],
  'Telecom': ['telecom', 'operadora', 'telefonia', 'fibra', 'banda larga'],
  'Agronegócio': ['agro', 'agronegocio', 'agricola', 'safra', 'cooperativa agricola', 'graos'],
  'Setor Público': ['governo', 'setor publico', 'secretaria', 'prefeitura', 'autarquia'],
  'Logística': ['logistica', 'transportadora', 'frota', 'armazem', 'fretes', 'frete', 'last mile'],
  'Manufatura': ['industria', 'manufatura', 'fabrica', 'chao de fabrica', 'producao industrial'],
};

export const TECHNOLOGIES = {
  'Databricks': ['databricks', 'lakehouse', 'delta lake'],
  'Azure': ['azure', 'synapse', 'data factory', 'adf'],
  'AWS': ['aws', 'amazon web services', 's3', 'glue', 'redshift', 'sagemaker'],
  'GCP': ['gcp', 'google cloud', 'bigquery', 'vertex'],
  'Snowflake': ['snowflake'],
  'Power BI': ['power bi', 'powerbi'],
  'SAP': ['sap', 's/4hana', 's4hana', 'sap bw'],
  'Salesforce': ['salesforce', 'sales cloud', 'service cloud'],
  'Kafka': ['kafka', 'streaming', 'tempo real'],
  'Python': ['python', 'pyspark'],
  'IA Generativa': ['ia generativa', 'genai', 'llm', 'chatbot', 'assistente virtual', 'rag', 'openai'],
  'Machine Learning': ['machine learning', 'modelo preditivo', 'previsao', 'ml', 'churn', 'propensao'],
  'Kubernetes': ['kubernetes', 'k8s', 'aks', 'eks', 'containers'],
  'ServiceNow': ['servicenow', 'itsm'],
  'RPA': ['rpa', 'uipath', 'automacao robotica'],
};

export const SERVICES = {
  'Engenharia de Dados': ['engenharia de dados', 'pipeline', 'ingestao', 'etl', 'elt', 'plataforma de dados', 'data lake', 'lakehouse'],
  'Analytics & BI': ['analytics', 'bi', 'dashboard', 'dashboards', 'indicadores', 'relatorios', 'kpi'],
  'Data Science / ML': ['ciencia de dados', 'data science', 'modelo preditivo', 'machine learning', 'previsao', 'churn'],
  'Governança de Dados': ['governanca', 'catalogo', 'qualidade de dados', 'lgpd', 'linhagem', 'data mesh'],
  'Migração para Nuvem': ['migracao', 'cloud', 'nuvem', 'lift and shift', 'modernizacao'],
  'IA Generativa': ['ia generativa', 'genai', 'llm', 'chatbot', 'assistente', 'rag'],
  'CRM': ['crm', 'salesforce', 'atendimento ao cliente', 'jornada do cliente'],
  'ERP': ['erp', 'sap', 's/4hana'],
  'Automação de Processos': ['rpa', 'automacao', 'workflow', 'servicenow'],
  'Sustentação / AMS': ['sustentacao', 'ams', 'suporte', 'operacao assistida'],
  'Change Management': ['change management', 'gestao da mudanca', 'treinamento', 'adocao'],
};

// Sinônimos usados para expandir a consulta (aproxima a "busca por significado" do V0).
export const SYNONYMS = {
  energia: ['utilities', 'eletrica', 'distribuidora'],
  utilities: ['energia', 'distribuidora', 'saneamento'],
  'plataforma de dados': ['lakehouse', 'data lake', 'engenharia de dados'],
  lakehouse: ['databricks', 'delta lake', 'plataforma de dados'],
  churn: ['retencao', 'evasao', 'cancelamento'],
  retencao: ['churn', 'evasao'],
  perdas: ['perda nao tecnica', 'fraude', 'furto de energia'],
  fraude: ['perdas', 'anomalia'],
  chatbot: ['assistente virtual', 'ia generativa', 'atendimento'],
  previsao: ['forecast', 'demanda', 'modelo preditivo'],
  demanda: ['previsao', 'forecast'],
  migracao: ['modernizacao', 'nuvem', 'cloud'],
  sinistro: ['seguro', 'fraude'],
};

export const STATUS_WEIGHT = {
  'Entregue': 1.0,
  'Vendida': 0.9,
  'Em execução': 0.85,
  'Em negociação': 0.6,
  'Enviada': 0.5,
  'Perdida': 0.3,
};
