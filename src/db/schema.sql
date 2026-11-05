-- Esquema relacional do Radar de Propostas & Cases (SQLite embutido no Node, módulo node:sqlite).
-- O MER correspondente está em docs/MER-base-de-conhecimento.md.
-- Os embeddings dos trechos ficam no índice vetorial (data/vectorstore), que é derivado deste banco
-- e reconstruído por "npm run ingest".

PRAGMA foreign_keys = ON;

-- ---------- Taxonomia controlada (RNF11) ----------
-- status 'pendente_curadoria': termo novo sugerido no upload, ainda não validado por um curador.
CREATE TABLE IF NOT EXISTS segmento (
  id INTEGER PRIMARY KEY,
  nome TEXT NOT NULL UNIQUE COLLATE NOCASE,
  status TEXT NOT NULL DEFAULT 'ativo' CHECK (status IN ('ativo', 'pendente_curadoria'))
);

CREATE TABLE IF NOT EXISTS tecnologia (
  id INTEGER PRIMARY KEY,
  nome TEXT NOT NULL UNIQUE COLLATE NOCASE,
  status TEXT NOT NULL DEFAULT 'ativo' CHECK (status IN ('ativo', 'pendente_curadoria'))
);

CREATE TABLE IF NOT EXISTS servico (
  id INTEGER PRIMARY KEY,
  nome TEXT NOT NULL UNIQUE COLLATE NOCASE,
  status TEXT NOT NULL DEFAULT 'ativo' CHECK (status IN ('ativo', 'pendente_curadoria'))
);

-- ---------- Pessoas e acesso ----------
CREATE TABLE IF NOT EXISTS usuario (
  id TEXT PRIMARY KEY,
  nome TEXT NOT NULL,
  perfil TEXT NOT NULL,
  ver_valores INTEGER NOT NULL DEFAULT 0 CHECK (ver_valores IN (0, 1))
);

CREATE TABLE IF NOT EXISTS usuario_confidencialidade (
  usuario_id TEXT NOT NULL REFERENCES usuario(id) ON DELETE CASCADE,
  nivel TEXT NOT NULL CHECK (nivel IN ('publica', 'interna', 'confidencial')),
  PRIMARY KEY (usuario_id, nivel)
);

-- ---------- Clientes, oportunidades e projetos ----------
CREATE TABLE IF NOT EXISTS cliente (
  id INTEGER PRIMARY KEY,
  nome TEXT NOT NULL,
  nome_normalizado TEXT NOT NULL UNIQUE,
  segmento_id INTEGER REFERENCES segmento(id),
  criado_em TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS oportunidade (
  id TEXT PRIMARY KEY,
  cliente_nome TEXT NOT NULL,
  titulo TEXT NOT NULL,
  segmento_id INTEGER REFERENCES segmento(id),
  descricao TEXT,
  prazo_meses REAL,
  tecnologias_json TEXT NOT NULL DEFAULT '[]',
  servicos_json TEXT NOT NULL DEFAULT '[]'
);

CREATE TABLE IF NOT EXISTS projeto (
  id TEXT PRIMARY KEY,
  cliente_id INTEGER NOT NULL REFERENCES cliente(id),
  titulo TEXT NOT NULL,
  segmento_id INTEGER REFERENCES segmento(id),
  area TEXT,
  dono TEXT,
  status_proposta TEXT NOT NULL CHECK (status_proposta IN ('Em elaboração', 'Enviada', 'Em negociação', 'Vendida', 'Em execução', 'Entregue', 'Perdida', 'Cancelada')),
  confidencialidade TEXT NOT NULL DEFAULT 'interna' CHECK (confidencialidade IN ('publica', 'interna', 'confidencial')),
  prazo_meses REAL CHECK (prazo_meses IS NULL OR prazo_meses > 0),
  valor REAL CHECK (valor IS NULL OR valor >= 0),
  margem REAL CHECK (margem IS NULL OR (margem >= -1 AND margem <= 1)),
  data_referencia TEXT,
  descricao TEXT,
  objetivo TEXT,
  link_sharepoint TEXT,
  origem TEXT NOT NULL CHECK (origem IN ('seed', 'cadastro', 'upload')),
  criado_por TEXT REFERENCES usuario(id),
  criado_em TEXT NOT NULL,
  atualizado_em TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS projeto_tecnologia (
  projeto_id TEXT NOT NULL REFERENCES projeto(id) ON DELETE CASCADE,
  tecnologia_id INTEGER NOT NULL REFERENCES tecnologia(id),
  PRIMARY KEY (projeto_id, tecnologia_id)
);

CREATE TABLE IF NOT EXISTS projeto_servico (
  projeto_id TEXT NOT NULL REFERENCES projeto(id) ON DELETE CASCADE,
  servico_id INTEGER NOT NULL REFERENCES servico(id),
  PRIMARY KEY (projeto_id, servico_id)
);

-- Projetos parecidos, calculados na indexação (similaridade de conteúdo + atributos em comum).
CREATE TABLE IF NOT EXISTS projeto_relacionado (
  projeto_id TEXT NOT NULL REFERENCES projeto(id) ON DELETE CASCADE,
  relacionado_id TEXT NOT NULL REFERENCES projeto(id) ON DELETE CASCADE,
  similaridade REAL NOT NULL,
  motivo TEXT,
  PRIMARY KEY (projeto_id, relacionado_id)
);

-- ---------- Documentos, trechos e metadados extraídos ----------
CREATE TABLE IF NOT EXISTS documento (
  id TEXT PRIMARY KEY,
  projeto_id TEXT NOT NULL REFERENCES projeto(id) ON DELETE CASCADE,
  titulo TEXT NOT NULL,
  tipo_documental TEXT NOT NULL,
  status_documento TEXT,
  nivel_confianca INTEGER NOT NULL CHECK (nivel_confianca BETWEEN 1 AND 5),
  confidencialidade TEXT NOT NULL CHECK (confidencialidade IN ('publica', 'interna', 'confidencial')),
  arquivo TEXT NOT NULL,
  formato TEXT NOT NULL,
  tamanho_bytes INTEGER,
  hash_sha256 TEXT UNIQUE,
  idioma TEXT,
  data_conteudo TEXT,
  prazo_meses REAL,
  valor REAL,
  margem REAL,
  resumo TEXT,
  palavras_chave_json TEXT NOT NULL DEFAULT '[]',
  qualidade_metadados REAL,
  contem_pii INTEGER NOT NULL DEFAULT 0,
  texto TEXT NOT NULL,
  origem TEXT NOT NULL CHECK (origem IN ('seed', 'upload', 'cadastro')),
  enviado_por TEXT REFERENCES usuario(id),
  criado_em TEXT NOT NULL,
  revisado_por TEXT REFERENCES usuario(id),
  revisado_em TEXT,
  -- Informados por quem revisa o envio (UC02.15).
  autor TEXT,
  versao TEXT,
  link_origem TEXT,
  observacoes TEXT,
  reutilizavel INTEGER NOT NULL DEFAULT 0
);

-- Entidades extraídas de cada documento: pessoas, organizações, KPIs, riscos, lições, datas, PII...
CREATE TABLE IF NOT EXISTS documento_entidade (
  id INTEGER PRIMARY KEY,
  documento_id TEXT NOT NULL REFERENCES documento(id) ON DELETE CASCADE,
  tipo TEXT NOT NULL,
  valor TEXT NOT NULL,
  valor_normalizado TEXT NOT NULL,
  trecho TEXT,
  confianca REAL,
  metodo TEXT NOT NULL
);

-- Trechos pesquisáveis (chunks). O rowid implícito liga a tabela ao índice FTS5.
CREATE TABLE IF NOT EXISTS trecho (
  id TEXT NOT NULL UNIQUE,
  documento_id TEXT NOT NULL REFERENCES documento(id) ON DELETE CASCADE,
  ordem INTEGER NOT NULL,
  texto TEXT NOT NULL,
  contem_valores INTEGER NOT NULL DEFAULT 0
);

-- Busca textual com ranking BM25, sem acento e sem diferença de maiúsculas.
CREATE VIRTUAL TABLE IF NOT EXISTS trecho_fts USING fts5(
  texto,
  content = 'trecho',
  content_rowid = 'rowid',
  tokenize = 'unicode61 remove_diacritics 2'
);

CREATE TRIGGER IF NOT EXISTS trecho_ai AFTER INSERT ON trecho BEGIN
  INSERT INTO trecho_fts(rowid, texto) VALUES (new.rowid, new.texto);
END;
CREATE TRIGGER IF NOT EXISTS trecho_ad AFTER DELETE ON trecho BEGIN
  INSERT INTO trecho_fts(trecho_fts, rowid, texto) VALUES ('delete', old.rowid, old.texto);
END;
CREATE TRIGGER IF NOT EXISTS trecho_au AFTER UPDATE ON trecho BEGIN
  INSERT INTO trecho_fts(trecho_fts, rowid, texto) VALUES ('delete', old.rowid, old.texto);
  INSERT INTO trecho_fts(rowid, texto) VALUES (new.rowid, new.texto);
END;

-- ---------- Upload, processamento e revisão humana (UC02) ----------
CREATE TABLE IF NOT EXISTS processamento (
  id TEXT PRIMARY KEY,
  nome_arquivo TEXT NOT NULL,
  formato TEXT,
  tamanho_bytes INTEGER,
  hash_sha256 TEXT,
  caminho_arquivo TEXT,
  projeto_alvo_id TEXT REFERENCES projeto(id) ON DELETE SET NULL,
  documento_id TEXT REFERENCES documento(id) ON DELETE SET NULL,
  status TEXT NOT NULL CHECK (status IN ('enviado', 'processando', 'aguardando_revisao', 'indexado', 'rejeitado', 'erro')),
  etapas_json TEXT NOT NULL DEFAULT '[]',
  sugestao_json TEXT,
  texto_extraido TEXT,
  erro TEXT,
  enviado_por TEXT NOT NULL REFERENCES usuario(id),
  criado_em TEXT NOT NULL,
  concluido_em TEXT
);

-- Cada correção humana de um metadado sugerido (RNF08: nº de correções é métrica do MVP).
CREATE TABLE IF NOT EXISTS correcao_metadado (
  id INTEGER PRIMARY KEY,
  processamento_id TEXT NOT NULL REFERENCES processamento(id) ON DELETE CASCADE,
  campo TEXT NOT NULL,
  valor_sugerido TEXT,
  valor_final TEXT,
  metodo_sugestao TEXT,
  usuario_id TEXT NOT NULL REFERENCES usuario(id),
  em TEXT NOT NULL
);

-- Quem alterou o quê e quando (UC01 / UC07: versionamento mínimo).
CREATE TABLE IF NOT EXISTS historico_alteracao (
  id INTEGER PRIMARY KEY,
  entidade TEXT NOT NULL,
  entidade_id TEXT NOT NULL,
  campo TEXT NOT NULL,
  antes TEXT,
  depois TEXT,
  usuario_id TEXT REFERENCES usuario(id),
  em TEXT NOT NULL
);

-- ---------- Índices para as consultas combinadas ----------
CREATE INDEX IF NOT EXISTS ix_projeto_segmento ON projeto(segmento_id);
CREATE INDEX IF NOT EXISTS ix_projeto_status ON projeto(status_proposta);
CREATE INDEX IF NOT EXISTS ix_projeto_cliente ON projeto(cliente_id);
CREATE INDEX IF NOT EXISTS ix_projeto_conf ON projeto(confidencialidade);
CREATE INDEX IF NOT EXISTS ix_projeto_data ON projeto(data_referencia);
CREATE INDEX IF NOT EXISTS ix_pt_tecnologia ON projeto_tecnologia(tecnologia_id);
CREATE INDEX IF NOT EXISTS ix_ps_servico ON projeto_servico(servico_id);
CREATE INDEX IF NOT EXISTS ix_documento_projeto ON documento(projeto_id);
CREATE INDEX IF NOT EXISTS ix_documento_tipo ON documento(tipo_documental);
CREATE INDEX IF NOT EXISTS ix_entidade_doc ON documento_entidade(documento_id);
CREATE INDEX IF NOT EXISTS ix_entidade_tipo_valor ON documento_entidade(tipo, valor_normalizado);
CREATE INDEX IF NOT EXISTS ix_trecho_documento ON trecho(documento_id);
CREATE INDEX IF NOT EXISTS ix_processamento_status ON processamento(status, enviado_por);
CREATE INDEX IF NOT EXISTS ix_historico ON historico_alteracao(entidade, entidade_id);
