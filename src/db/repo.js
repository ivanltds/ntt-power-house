// Repositório relacional do Radar sobre o SQLite embutido no Node (node:sqlite, Node 22.13+).
// Concentra persistência e consultas combinadas: filtros por facetas, busca textual BM25 (FTS5),
// agregações para insights e histórico de alterações. Toda consulta aplica o filtro de permissão.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { normalize } from '../text.js';

let DatabaseSync;
try {
  ({ DatabaseSync } = await import('node:sqlite'));
} catch {
  throw new Error(`O Radar precisa do SQLite embutido no Node (node:sqlite), disponível a partir do Node 22.13. Versão atual: ${process.version}.`);
}

const SCHEMA = fs.readFileSync(path.join(path.dirname(fileURLToPath(import.meta.url)), 'schema.sql'), 'utf8');
const CONF_RANK = { publica: 0, interna: 1, confidencial: 2 };
export const STATUS_PROPOSTA = ['Em elaboração', 'Enviada', 'Em negociação', 'Vendida', 'Em execução', 'Entregue', 'Perdida', 'Cancelada'];
export const STATUS_GANHO = ['Vendida', 'Em execução', 'Entregue'];
export const STATUS_ANDAMENTO = ['Em elaboração', 'Enviada', 'Em negociação'];
export const CONFIDENCIALIDADES = ['publica', 'interna', 'confidencial'];
// Faixa de valor (card rápido, adendo 5): dá o porte a quem não pode ver valores, sem expor o número.
export const FAIXAS_VALOR = [[500_000, 'P', 'até R$ 500 mil'], [1_500_000, 'M', 'R$ 500 mil a 1,5 mi'], [3_000_000, 'G', 'R$ 1,5 a 3 mi'], [Infinity, 'GG', 'acima de R$ 3 mi']];
export function faixaValor(v) {
  if (v == null || !(Number(v) > 0)) return null;
  const [, sigla, descricao] = FAIXAS_VALOR.find(([lim]) => Number(v) < lim);
  return { sigla, descricao };
}

const now = () => new Date().toISOString();
const json = (v) => JSON.stringify(v ?? []);
const split = (s) => (s ? s.split('|') : []);
// Listas editáveis de entidades (como na revisão do upload) e o tipo gravado em documento_entidade.
const ENTITY_TYPES = { pessoas: 'pessoa', organizacoes: 'organizacao', kpis: 'kpi', riscos: 'risco', licoes: 'licao' };
export const stricterConf = (a, b) => ((CONF_RANK[a] ?? 1) >= (CONF_RANK[b] ?? 1) ? a : b);

// Converte texto livre em consulta FTS5 segura: termos entre aspas com prefixo (*).
export function ftsQuery(text, mode = 'AND') {
  const terms = normalize(text)
    .split(' ')
    .map((t) => t.replace(/[^a-z0-9]/g, ''))
    .filter((t) => t.length > 1)
    .slice(0, 12);
  return terms.length ? terms.map((t) => `"${t}"*`).join(mode === 'AND' ? ' ' : ' OR ') : null;
}

export class Repo {
  constructor(file) {
    fs.mkdirSync(path.dirname(file), { recursive: true });
    this.file = file;
    this.db = new DatabaseSync(file);
    this.db.exec('PRAGMA journal_mode = WAL; PRAGMA synchronous = NORMAL;');
    this.db.exec(SCHEMA);
    this.migrate();
    this.stmts = new Map();
  }

  // Bancos criados antes de UC02.15 recebem as colunas novas de documento.
  migrate() {
    const cols = new Set(this.db.prepare('PRAGMA table_info(documento)').all().map((c) => c.name));
    for (const [nome, tipo] of [['autor', 'TEXT'], ['versao', 'TEXT'], ['link_origem', 'TEXT'], ['observacoes', 'TEXT'], ['reutilizavel', 'INTEGER NOT NULL DEFAULT 0']]) {
      if (!cols.has(nome)) this.db.exec(`ALTER TABLE documento ADD COLUMN ${nome} ${tipo}`);
    }
    // Adendo 4 (UC11): o histórico passa a registrar também criações, exclusões e exportações.
    const hist = new Set(this.db.prepare('PRAGMA table_info(historico_alteracao)').all().map((c) => c.name));
    if (!hist.has('acao')) this.db.exec("ALTER TABLE historico_alteracao ADD COLUMN acao TEXT NOT NULL DEFAULT 'editar'");
    // Discovery r3: cadastro de teste fica na base, mas fora dos insights.
    const proj = new Set(this.db.prepare('PRAGMA table_info(projeto)').all().map((c) => c.name));
    if (!proj.has('teste')) this.db.exec('ALTER TABLE projeto ADD COLUMN teste INTEGER NOT NULL DEFAULT 0');
  }

  // ---------- Registro de atividades (UC11): somente inclusão ----------
  logActivity({ acao, entidade, entidade_id, campo = null, antes = null, depois = null, usuario_id = null }) {
    const txt = (v) => (v == null || v === '' ? null : String(v));
    this.run('INSERT INTO historico_alteracao (acao, entidade, entidade_id, campo, antes, depois, usuario_id, em) VALUES ($acao, $e, $id, $c, $a, $d, $u, $em)', {
      $acao: acao, $e: entidade, $id: String(entidade_id), $c: campo, $a: txt(antes), $d: txt(depois), $u: usuario_id, $em: now(),
    });
  }

  // Consulta paginada do registro, com o projeto relacionado a cada evento (para o link na tela).
  activities({ acao = '', entidade = '', usuario = '', de = '', ate = '', q = '' } = {}, { pagina = 1, tamanho = 50 } = {}) {
    const where = [];
    const params = {};
    if (acao) { where.push('h.acao = $acao'); params.$acao = acao; }
    if (entidade) { where.push('h.entidade = $ent'); params.$ent = entidade; }
    if (usuario) { where.push(usuario === '__base' ? 'h.usuario_id IS NULL' : 'h.usuario_id = $usr'); if (usuario !== '__base') params.$usr = usuario; }
    if (de) { where.push('h.em >= $de'); params.$de = de; }
    if (ate) { where.push('h.em < $ate'); params.$ate = `${ate}T99`; }
    if (q) { where.push("(h.entidade_id || ' ' || coalesce(h.campo, '') || ' ' || coalesce(h.antes, '') || ' ' || coalesce(h.depois, '')) LIKE $q"); params.$q = `%${q}%`; }
    const cond = where.length ? `WHERE ${where.join(' AND ')}` : '';
    const total = this.get(`SELECT count(*) AS n FROM historico_alteracao h ${cond}`, params).n;
    const size = Math.min(200, Math.max(1, Number(tamanho)));
    const page = Math.max(1, Number(pagina));
    const itens = this.all(`SELECT h.id, h.acao, h.entidade, h.entidade_id, h.campo, h.antes, h.depois, h.usuario_id, u.nome AS usuario_nome, h.em,
        CASE h.entidade WHEN 'projeto' THEN h.entidade_id WHEN 'documento' THEN (SELECT d.projeto_id FROM documento d WHERE d.id = h.entidade_id) END AS projeto_id
      FROM historico_alteracao h LEFT JOIN usuario u ON u.id = h.usuario_id ${cond} ORDER BY h.em DESC, h.id DESC LIMIT $lim OFFSET $off`,
    { ...params, $lim: size, $off: (page - 1) * size });
    return { total, pagina: page, tamanho: size, itens };
  }

  clientExists(nome) {
    return Boolean(nome && this.get('SELECT 1 AS ok FROM cliente WHERE nome_normalizado = $k', { $k: normalize(nome) }));
  }

  termExists(table, nome) {
    return Boolean(nome && this.get(`SELECT 1 AS ok FROM ${table} WHERE nome = $nome`, { $nome: nome }));
  }

  close() {
    this.db.close();
  }

  // Statements preparados ficam em cache. O node:sqlite rejeita parâmetros que a SQL não usa,
  // então cada chamada envia só os parâmetros citados na consulta.
  q(sql) {
    let s = this.stmts.get(sql);
    if (!s) {
      s = { stmt: this.db.prepare(sql), names: new Set(sql.match(/\$[A-Za-z_]\w*/g) ?? []) };
      this.stmts.set(sql, s);
    }
    return s;
  }

  exec(method, sql, params) {
    const { stmt, names } = this.q(sql);
    const used = Object.fromEntries(Object.entries(params).filter(([k]) => names.has(k)));
    return stmt[method](used);
  }

  all(sql, params = {}) {
    return this.exec('all', sql, params).map((r) => ({ ...r }));
  }

  get(sql, params = {}) {
    const r = this.exec('get', sql, params);
    return r ? { ...r } : null;
  }

  run(sql, params = {}) {
    return this.exec('run', sql, params);
  }

  tx(fn) {
    this.db.exec('BEGIN');
    try {
      const out = fn();
      this.db.exec('COMMIT');
      return out;
    } catch (err) {
      this.db.exec('ROLLBACK');
      throw err;
    }
  }

  isEmpty() {
    return this.get('SELECT count(*) AS n FROM projeto').n === 0;
  }

  // ---------- Taxonomia ----------
  termId(table, nome, status = 'ativo', usuarioId) {
    if (!nome) return null;
    const found = this.get(`SELECT id FROM ${table} WHERE nome = $nome`, { $nome: nome });
    if (found) return found.id;
    const id = Number(this.run(`INSERT INTO ${table} (nome, status) VALUES ($nome, $status)`, { $nome: nome, $status: status }).lastInsertRowid);
    if (usuarioId !== undefined) this.logActivity({ acao: 'criar', entidade: table, entidade_id: id, campo: 'nome', depois: nome, usuario_id: usuarioId });
    return id;
  }

  taxonomy() {
    const list = (table) => this.all(`SELECT nome, status FROM ${table} ORDER BY nome`);
    return { segmentos: list('segmento'), tecnologias: list('tecnologia'), servicos: list('servico') };
  }

  // ---------- Usuários e oportunidades ----------
  upsertUser(u) {
    this.run('INSERT INTO usuario (id, nome, perfil, ver_valores) VALUES ($id, $nome, $perfil, $v) ON CONFLICT(id) DO UPDATE SET nome = excluded.nome, perfil = excluded.perfil, ver_valores = excluded.ver_valores', {
      $id: u.id, $nome: u.nome, $perfil: u.perfil, $v: u.verValores ? 1 : 0,
    });
    this.run('DELETE FROM usuario_confidencialidade WHERE usuario_id = $id', { $id: u.id });
    for (const nivel of u.confidencialidades) this.run('INSERT INTO usuario_confidencialidade VALUES ($id, $nivel)', { $id: u.id, $nivel: nivel });
  }

  users() {
    return this.all("SELECT u.id, u.nome, u.perfil, u.ver_valores, group_concat(c.nivel, '|') AS niveis FROM usuario u LEFT JOIN usuario_confidencialidade c ON c.usuario_id = u.id GROUP BY u.id ORDER BY u.ver_valores, count(c.nivel), u.id").map((r) => ({
      id: r.id, nome: r.nome, perfil: r.perfil, verValores: r.ver_valores === 1, confidencialidades: split(r.niveis),
    }));
  }

  upsertOpportunity(o) {
    this.run(`INSERT OR REPLACE INTO oportunidade (id, cliente_nome, titulo, segmento_id, descricao, prazo_meses, tecnologias_json, servicos_json)
      VALUES ($id, $cliente, $titulo, $seg, $descricao, $prazo, $tec, $srv)`, {
      $id: o.id, $cliente: o.cliente, $titulo: o.titulo, $seg: this.termId('segmento', o.segmento), $descricao: o.descricao ?? null,
      $prazo: o.prazoMeses ?? null, $tec: json(o.tecnologias), $srv: json(o.servicos),
    });
  }

  opportunities() {
    return this.all('SELECT o.*, s.nome AS segmento FROM oportunidade o LEFT JOIN segmento s ON s.id = o.segmento_id ORDER BY o.id').map((o) => ({
      id: o.id, cliente: o.cliente_nome, titulo: o.titulo, segmento: o.segmento, descricao: o.descricao, prazoMeses: o.prazo_meses,
      tecnologias: JSON.parse(o.tecnologias_json), servicos: JSON.parse(o.servicos_json),
    }));
  }

  // Projetos para o seletor de foco do chat: os em andamento primeiro, depois os mais recentes.
  // q filtra por código, cliente ou título, sem diferenciar acentos e maiúsculas.
  focusOptions(user, q = '', limite = 30) {
    const termos = normalize(q).split(' ').filter(Boolean);
    const params = {};
    const confIn = user.confidencialidades.map((c, i) => { params[`$c${i}`] = c; return `$c${i}`; }).join(', ');
    return this.all(`SELECT p.id, p.titulo, p.status_proposta, c.nome AS cliente, s.nome AS segmento, p.atualizado_em
      FROM projeto p JOIN cliente c ON c.id = p.cliente_id LEFT JOIN segmento s ON s.id = p.segmento_id
      WHERE p.confidencialidade IN (${confIn})`, params)
      .filter((p) => termos.every((t) => normalize(`${p.id} ${p.cliente} ${p.titulo}`).includes(t)))
      .map((p) => ({ ...p, emAndamento: STATUS_ANDAMENTO.includes(p.status_proposta) }))
      .sort((a, b) => b.emAndamento - a.emAndamento || String(b.atualizado_em).localeCompare(String(a.atualizado_em)))
      .slice(0, limite);
  }

  // ---------- Clientes ----------
  clientId(nome, segmento, usuarioId) {
    const key = normalize(nome);
    const found = this.get('SELECT id FROM cliente WHERE nome_normalizado = $k', { $k: key });
    if (found) return found.id;
    const id = Number(this.run('INSERT INTO cliente (nome, nome_normalizado, segmento_id, criado_em) VALUES ($nome, $k, $seg, $em)', {
      $nome: nome.trim(), $k: key, $seg: this.termId('segmento', segmento, 'ativo', usuarioId), $em: now(),
    }).lastInsertRowid);
    if (usuarioId !== undefined) this.logActivity({ acao: 'criar', entidade: 'cliente', entidade_id: id, campo: 'nome', depois: nome.trim(), usuario_id: usuarioId });
    return id;
  }

  clients(user = null) {
    const params = {};
    const visible = user ? `WHERE EXISTS (SELECT 1 FROM projeto p WHERE p.cliente_id = c.id AND p.confidencialidade IN (${user.confidencialidades.map((n, i) => { params[`$c${i}`] = n; return `$c${i}`; }).join(', ')}))` : '';
    return this.all(`SELECT c.id, c.nome, c.nome_normalizado, s.nome AS segmento, (SELECT count(*) FROM projeto p WHERE p.cliente_id = c.id) AS projetos
      FROM cliente c LEFT JOIN segmento s ON s.id = c.segmento_id ${visible} ORDER BY c.nome`, params);
  }

  // ---------- Projetos ----------
  nextProjectId() {
    const r = this.get("SELECT max(CAST(substr(id, 2) AS INTEGER)) AS n FROM projeto WHERE id GLOB 'P[0-9]*'");
    return `P${String((r.n ?? 0) + 1).padStart(3, '0')}`;
  }

  insertProject(p, { origem, usuarioId = null }) {
    const id = p.id ?? this.nextProjectId();
    const ts = now();
    // Só cadastros feitos por alguém entram no registro; a carga da base piloto não.
    const log = origem === 'seed' ? undefined : usuarioId;
    this.run(`INSERT INTO projeto (id, cliente_id, titulo, segmento_id, area, dono, status_proposta, confidencialidade, prazo_meses, valor, margem,
        data_referencia, descricao, objetivo, link_sharepoint, origem, criado_por, criado_em, atualizado_em)
      VALUES ($id, $cliente, $titulo, $seg, $area, $dono, $status, $conf, $prazo, $valor, $margem, $data, $descricao, $objetivo, $link, $origem, $por, $em, $em)`, {
      $id: id, $cliente: this.clientId(p.cliente, p.segmento, log), $titulo: p.titulo, $seg: this.termId('segmento', p.segmento, 'ativo', log), $area: p.area ?? null,
      $dono: p.dono ?? null, $status: p.status_proposta, $conf: p.confidencialidade ?? 'interna', $prazo: p.prazo_meses ?? null, $valor: p.valor ?? null,
      $margem: p.margem ?? null, $data: p.data_referencia ?? null, $descricao: p.descricao ?? null, $objetivo: p.objetivo ?? null,
      $link: p.link_sharepoint ?? null, $origem: origem, $por: usuarioId, $em: ts,
    });
    this.setProjectTerms(id, p.tecnologias ?? [], p.servicos ?? [], log);
    if (log !== undefined) this.logActivity({ acao: 'criar', entidade: 'projeto', entidade_id: id, campo: 'titulo', depois: `${p.titulo} (${p.cliente})`, usuario_id: usuarioId });
    return id;
  }

  setProjectTerms(id, tecnologias, servicos, usuarioId) {
    this.run('DELETE FROM projeto_tecnologia WHERE projeto_id = $id', { $id: id });
    this.run('DELETE FROM projeto_servico WHERE projeto_id = $id', { $id: id });
    for (const t of new Set(tecnologias)) this.run('INSERT OR IGNORE INTO projeto_tecnologia VALUES ($id, $t)', { $id: id, $t: this.termId('tecnologia', t, 'pendente_curadoria', usuarioId) });
    for (const s of new Set(servicos)) this.run('INSERT OR IGNORE INTO projeto_servico VALUES ($id, $s)', { $id: id, $s: this.termId('servico', s, 'pendente_curadoria', usuarioId) });
  }

  // Atualiza campos do projeto registrando cada alteração (quem, quando, antes, depois).
  updateProject(id, changes, usuarioId) {
    const before = this.project(id);
    if (!before) return null;
    const columns = ['titulo', 'area', 'dono', 'status_proposta', 'confidencialidade', 'prazo_meses', 'valor', 'margem', 'data_referencia', 'descricao', 'objetivo', 'link_sharepoint'];
    const log = (campo, antes, depois) => this.run('INSERT INTO historico_alteracao (entidade, entidade_id, campo, antes, depois, usuario_id, em) VALUES ($e, $id, $c, $a, $d, $u, $em)', {
      $e: 'projeto', $id: id, $c: campo, $a: antes == null ? null : String(antes), $d: depois == null ? null : String(depois), $u: usuarioId, $em: now(),
    });
    let changed = 0;
    for (const col of columns) {
      if (!(col in changes) || String(changes[col] ?? '') === String(before[col] ?? '')) continue;
      this.run(`UPDATE projeto SET ${col} = $v WHERE id = $id`, { $v: changes[col] ?? null, $id: id });
      log(col, before[col], changes[col]);
      changed++;
    }
    if ('cliente' in changes && normalize(changes.cliente) !== normalize(before.cliente)) {
      this.run('UPDATE projeto SET cliente_id = $c WHERE id = $id', { $c: this.clientId(changes.cliente, changes.segmento ?? before.segmento, usuarioId), $id: id });
      log('cliente', before.cliente, changes.cliente);
      changed++;
    }
    if ('segmento' in changes && changes.segmento !== before.segmento) {
      this.run('UPDATE projeto SET segmento_id = $s WHERE id = $id', { $s: this.termId('segmento', changes.segmento, 'ativo', usuarioId), $id: id });
      log('segmento', before.segmento, changes.segmento);
      changed++;
    }
    const sameSet = (a, b) => [...a].sort().join('|') === [...b].sort().join('|');
    const tec = changes.tecnologias ?? before.tecnologias;
    const srv = changes.servicos ?? before.servicos;
    if (!sameSet(tec, before.tecnologias) || !sameSet(srv, before.servicos)) {
      this.setProjectTerms(id, tec, srv, usuarioId);
      if (!sameSet(tec, before.tecnologias)) log('tecnologias', before.tecnologias.join(', '), tec.join(', '));
      if (!sameSet(srv, before.servicos)) log('servicos', before.servicos.join(', '), srv.join(', '));
      changed++;
    }
    if (changed) this.run('UPDATE projeto SET atualizado_em = $em WHERE id = $id', { $em: now(), $id: id });
    return changed;
  }

  project(id) {
    const p = this.get(`SELECT p.*, c.nome AS cliente, s.nome AS segmento,
        (SELECT group_concat(t.nome, '|') FROM projeto_tecnologia pt JOIN tecnologia t ON t.id = pt.tecnologia_id WHERE pt.projeto_id = p.id) AS tecs,
        (SELECT group_concat(v.nome, '|') FROM projeto_servico ps JOIN servico v ON v.id = ps.servico_id WHERE ps.projeto_id = p.id) AS srvs
      FROM projeto p JOIN cliente c ON c.id = p.cliente_id LEFT JOIN segmento s ON s.id = p.segmento_id WHERE p.id = $id`, { $id: id });
    if (!p) return null;
    const { tecs, srvs, ...rest } = p;
    return { ...rest, tecnologias: split(tecs), servicos: split(srvs) };
  }

  // Possíveis duplicatas no cadastro: mesmo cliente e título parecido.
  similarProjectsByTitle(cliente, titulo, user) {
    const words = new Set(normalize(titulo).split(' ').filter((w) => w.length > 3));
    return this.all('SELECT p.id, p.titulo, p.confidencialidade, c.nome AS cliente FROM projeto p JOIN cliente c ON c.id = p.cliente_id WHERE c.nome_normalizado = $k', { $k: normalize(cliente) })
      .filter((p) => user.confidencialidades.includes(p.confidencialidade))
      .map((p) => {
        const other = normalize(p.titulo).split(' ').filter((w) => w.length > 3);
        const common = other.filter((w) => words.has(w)).length;
        return { ...p, similaridade: common / Math.max(1, Math.min(words.size, other.length)) };
      })
      .filter((p) => p.similaridade >= 0.5);
  }

  // ---------- Documentos ----------
  insertDocument(d, { entidades = [], trechos = [] }) {
    this.run(`INSERT INTO documento (id, projeto_id, titulo, tipo_documental, status_documento, nivel_confianca, confidencialidade, arquivo, formato,
        tamanho_bytes, hash_sha256, idioma, data_conteudo, prazo_meses, valor, margem, resumo, palavras_chave_json, qualidade_metadados, contem_pii,
        texto, origem, enviado_por, criado_em, revisado_por, revisado_em, autor, versao, link_origem, observacoes, reutilizavel)
      VALUES ($id, $projeto, $titulo, $tipo, $status, $nivel, $conf, $arquivo, $formato, $tamanho, $hash, $idioma, $data, $prazo, $valor, $margem,
        $resumo, $palavras, $qualidade, $pii, $texto, $origem, $por, $em, $revisor, $revisadoEm, $autor, $versao, $link, $obs, $reuso)`, {
      $id: d.id, $projeto: d.projeto_id, $titulo: d.titulo, $tipo: d.tipo_documental, $status: d.status_documento ?? null, $nivel: d.nivel_confianca,
      $conf: d.confidencialidade, $arquivo: d.arquivo, $formato: d.formato, $tamanho: d.tamanho_bytes ?? null, $hash: d.hash_sha256 ?? null,
      $idioma: d.idioma ?? null, $data: d.data_conteudo ?? null, $prazo: d.prazo_meses ?? null, $valor: d.valor ?? null, $margem: d.margem ?? null,
      $resumo: d.resumo ?? null, $palavras: json(d.palavras_chave), $qualidade: d.qualidade_metadados ?? null, $pii: d.contem_pii ? 1 : 0,
      $texto: d.texto, $origem: d.origem, $por: d.enviado_por ?? null, $em: d.criado_em ?? now(), $revisor: d.revisado_por ?? null, $revisadoEm: d.revisado_em ?? null,
      $autor: d.autor ?? null, $versao: d.versao ?? null, $link: d.link_origem ?? null, $obs: d.observacoes ?? null, $reuso: d.reutilizavel ? 1 : 0,
    });
    for (const e of entidades) {
      this.run('INSERT INTO documento_entidade (documento_id, tipo, valor, valor_normalizado, trecho, confianca, metodo) VALUES ($d, $t, $v, $n, $tr, $c, $m)', {
        $d: d.id, $t: e.tipo, $v: String(e.valor), $n: normalize(e.valor), $tr: e.trecho ?? null, $c: e.confianca ?? null, $m: e.metodo ?? 'regras',
      });
    }
    trechos.forEach((t, i) => this.run('INSERT INTO trecho (id, documento_id, ordem, texto, contem_valores) VALUES ($id, $d, $o, $t, $v)', {
      $id: `${d.id}#${i}`, $d: d.id, $o: i, $t: t.texto, $v: t.contem_valores ? 1 : 0,
    }));
  }

  // Documento com as entidades editáveis agrupadas como na revisão do upload (UC07.4).
  documentForEdit(id) {
    const d = this.get(`SELECT id, projeto_id, titulo, tipo_documental, status_documento, nivel_confianca, confidencialidade, arquivo, formato, idioma, data_conteudo, prazo_meses,
        valor, margem, resumo, palavras_chave_json, origem, autor, versao, link_origem, observacoes, reutilizavel FROM documento WHERE id = $id`, { $id: id });
    if (!d) return null;
    const { palavras_chave_json, ...rest } = d;
    const entidades = Object.fromEntries(Object.keys(ENTITY_TYPES).map((k) => [k, []]));
    for (const e of this.all('SELECT tipo, valor, trecho, metodo FROM documento_entidade WHERE documento_id = $id ORDER BY rowid', { $id: id })) {
      const lista = Object.keys(ENTITY_TYPES).find((k) => ENTITY_TYPES[k] === e.tipo);
      if (!lista) continue;
      const m = lista === 'pessoas' && e.valor.match(/^(.*) \(([^)]+)\)$/);
      entidades[lista].push({ valor: m ? m[1] : e.valor, papel: m ? m[2] : null, evidencia: e.trecho, metodo: e.metodo });
    }
    return { ...rest, palavras_chave: JSON.parse(palavras_chave_json), entidades };
  }

  // Grava só o que mudou e registra cada mudança no histórico. Devolve o número de alterações.
  updateDocument(id, changes, entidades, usuarioId) {
    const before = this.documentForEdit(id);
    if (!before) return null;
    const log = (campo, antes, depois) => this.run('INSERT INTO historico_alteracao (entidade, entidade_id, campo, antes, depois, usuario_id, em) VALUES ($e, $id, $c, $a, $d, $u, $em)', {
      $e: 'documento', $id: id, $c: campo, $a: antes == null || antes === '' ? null : String(antes), $d: depois == null || depois === '' ? null : String(depois), $u: usuarioId, $em: now(),
    });
    let changed = 0;
    for (const [col, v] of Object.entries(changes)) {
      if (col === 'palavras_chave') {
        if (v.join(', ') === before.palavras_chave.join(', ')) continue;
        this.run('UPDATE documento SET palavras_chave_json = $v WHERE id = $id', { $v: json(v), $id: id });
        log(col, before.palavras_chave.join(', '), v.join(', '));
      } else {
        if (String(v ?? '') === String(before[col] ?? '')) continue;
        this.run(`UPDATE documento SET ${col} = $v WHERE id = $id`, { $v: v ?? null, $id: id });
        log(col, before[col], v);
      }
      changed++;
    }
    const label = (e) => (e.papel ? `${e.valor} (${e.papel})` : e.valor);
    for (const [lista, itens] of Object.entries(entidades ?? {})) {
      const tipo = ENTITY_TYPES[lista];
      if (!tipo) continue;
      const antes = before.entidades[lista].map(label);
      const depois = itens.map(label);
      if ([...antes].sort().join('|') === [...depois].sort().join('|')) continue;
      // Itens mantidos preservam trecho e método; os novos ficam como "manual".
      const orig = new Map(before.entidades[lista].map((e) => [label(e).toLowerCase(), e]));
      this.run('DELETE FROM documento_entidade WHERE documento_id = $d AND tipo = $t', { $d: id, $t: tipo });
      for (const e of itens) {
        const o = orig.get(label(e).toLowerCase());
        this.run('INSERT INTO documento_entidade (documento_id, tipo, valor, valor_normalizado, trecho, confianca, metodo) VALUES ($d, $t, $v, $n, $tr, $c, $m)', {
          $d: id, $t: tipo, $v: label(e), $n: normalize(label(e)), $tr: o?.evidencia ?? null, $c: o ? null : 1, $m: o?.metodo ?? 'manual',
        });
      }
      log(`entidades.${lista}`, antes.join('; '), depois.join('; '));
      changed++;
    }
    return changed;
  }

  deleteDocument(id) {
    this.run('DELETE FROM documento WHERE id = $id', { $id: id });
  }

  documentByHash(hash) {
    return this.get('SELECT d.id, d.titulo, d.projeto_id, d.arquivo FROM documento d WHERE d.hash_sha256 = $h', { $h: hash });
  }

  nextDocumentId(projetoId, prefix = 'UP') {
    const n = this.get('SELECT count(*) AS n FROM documento WHERE id LIKE $prefixo', { $prefixo: `${projetoId}-${prefix}%` }).n;
    let i = n + 1;
    while (this.get('SELECT 1 AS x FROM documento WHERE id = $id', { $id: `${projetoId}-${prefix}${i}` })) i++;
    return `${projetoId}-${prefix}${i}`;
  }

  // Documentos no formato usado pelo motor de busca e pela indexação vetorial ({ meta, body }).
  documentsForIndex() {
    return this.all(`SELECT d.*, p.titulo AS projeto_titulo, p.area, p.dono, p.status_proposta, p.link_sharepoint, c.nome AS cliente, s.nome AS segmento,
        (SELECT group_concat(t.nome, '|') FROM projeto_tecnologia pt JOIN tecnologia t ON t.id = pt.tecnologia_id WHERE pt.projeto_id = p.id) AS tecs,
        (SELECT group_concat(v.nome, '|') FROM projeto_servico ps JOIN servico v ON v.id = ps.servico_id WHERE ps.projeto_id = p.id) AS srvs
      FROM documento d JOIN projeto p ON p.id = d.projeto_id JOIN cliente c ON c.id = p.cliente_id LEFT JOIN segmento s ON s.id = p.segmento_id
      ORDER BY d.projeto_id, d.id`).map((r) => ({
      meta: {
        id: r.id, projeto_id: r.projeto_id, cliente: r.cliente, titulo: r.projeto_titulo, documento_titulo: r.titulo, segmento: r.segmento,
        tecnologias: split(r.tecs), servicos: split(r.srvs), area: r.area, dono: r.dono, confidencialidade: r.confidencialidade,
        status_proposta: r.status_proposta, link_sharepoint: r.link_sharepoint, tipo_documental: r.tipo_documental, status_documento: r.status_documento,
        nivel_confianca: r.nivel_confianca, data: r.data_conteudo, prazo_meses: r.prazo_meses, valor: r.valor, margem: r.margem, arquivo: r.arquivo,
        origem: r.origem,
      },
      body: r.observacoes ? `${r.texto}

Notas do revisor: ${r.observacoes}` : r.texto,
    }));
  }

  // Grava os projetos relacionados calculados na indexação.
  replaceRelated(rows) {
    this.run('DELETE FROM projeto_relacionado');
    for (const r of rows) this.run('INSERT INTO projeto_relacionado VALUES ($a, $b, $s, $m)', { $a: r.projeto_id, $b: r.relacionado_id, $s: r.similaridade, $m: r.motivo });
  }

  // ---------- Processamento de uploads ----------
  insertJob(j) {
    this.run(`INSERT INTO processamento (id, nome_arquivo, formato, tamanho_bytes, hash_sha256, caminho_arquivo, projeto_alvo_id, status, enviado_por, criado_em)
      VALUES ($id, $nome, $formato, $tamanho, $hash, $caminho, $alvo, 'enviado', $por, $em)`, {
      $id: j.id, $nome: j.nome_arquivo, $formato: j.formato, $tamanho: j.tamanho_bytes, $hash: j.hash_sha256, $caminho: j.caminho_arquivo,
      $alvo: j.projeto_alvo_id ?? null, $por: j.enviado_por, $em: now(),
    });
  }

  updateJob(id, fields) {
    const allowed = ['status', 'etapas_json', 'sugestao_json', 'texto_extraido', 'erro', 'documento_id', 'concluido_em'];
    for (const [k, v] of Object.entries(fields)) {
      if (allowed.includes(k)) this.run(`UPDATE processamento SET ${k} = $v WHERE id = $id`, { $v: v ?? null, $id: id });
    }
  }

  job(id) {
    const j = this.get('SELECT * FROM processamento WHERE id = $id', { $id: id });
    if (!j) return null;
    const { etapas_json, sugestao_json, texto_extraido, ...rest } = j;
    return { ...rest, etapas: JSON.parse(etapas_json), sugestao: sugestao_json ? JSON.parse(sugestao_json) : null, tamanhoTexto: texto_extraido?.length ?? 0 };
  }

  jobText(id) {
    return this.get('SELECT texto_extraido FROM processamento WHERE id = $id', { $id: id })?.texto_extraido ?? null;
  }

  jobs(usuarioId) {
    return this.all(`SELECT id, nome_arquivo, formato, tamanho_bytes, status, projeto_alvo_id, documento_id, erro, criado_em, concluido_em
      FROM processamento WHERE enviado_por = $u AND status <> 'rejeitado' ORDER BY criado_em DESC LIMIT 100`, { $u: usuarioId });
  }

  logCorrection(c) {
    this.run('INSERT INTO correcao_metadado (processamento_id, campo, valor_sugerido, valor_final, metodo_sugestao, usuario_id, em) VALUES ($p, $c, $s, $f, $m, $u, $em)', {
      $p: c.processamento_id, $c: c.campo, $s: c.valor_sugerido, $f: c.valor_final, $m: c.metodo_sugestao ?? null, $u: c.usuario_id, $em: now(),
    });
  }

  // Trechos mais relevantes por BM25 (qualquer termo), já filtrados por permissão: Map<id do trecho, posição>.
  ftsChunks(text, user, limit = 40) {
    const fts = ftsQuery(text, 'OR');
    if (!fts) return new Map();
    const params = { $fts: fts, $limit: limit };
    const confIn = user.confidencialidades.map((c, i) => { params[`$c${i}`] = c; return `$c${i}`; }).join(', ');
    const rows = this.all(`SELECT t.id FROM trecho_fts JOIN trecho t ON t.rowid = trecho_fts.rowid JOIN documento d ON d.id = t.documento_id
      WHERE trecho_fts MATCH $fts AND d.confidencialidade IN (${confIn})${user.verValores ? '' : ' AND t.contem_valores = 0'}
      ORDER BY bm25(trecho_fts) LIMIT $limit`, params);
    return new Map(rows.map((r, i) => [r.id, i]));
  }

  // ---------- Consultas combinadas (UC08) ----------
  // Filtros: q (texto), segmentos, tecnologias + modoTecnologias ('todas'|'qualquer'), servicos, status,
  // tiposDocumento, cliente, prazoMin/Max, valorMin/Max (só com permissão), dataDe/Ate, entidade {tipo, valor}.
  searchProjects(f, user, { ordenar = 'relevancia', pagina = 1, tamanho = 20 } = {}) {
    const t0 = performance.now();
    const params = {};
    let n = 0;
    const list = (values) => values.map((v) => {
      const key = `$p${n++}`;
      params[key] = v;
      return key;
    }).join(', ');
    const confIn = list(user.confidencialidades);
    const where = [`p.confidencialidade IN (${confIn})`];
    const valueFilter = user.verValores ? '' : ' AND t.contem_valores = 0';

    let cte = '';
    let ftsUsed = false;
    const fts = f.q?.trim() ? ftsQuery(f.q, f.modoTexto === 'qualquer' ? 'OR' : 'AND') : null;
    if (fts) {
      ftsUsed = true;
      params.$fts = fts;
      cte = `WITH fts AS (
          SELECT d.projeto_id, bm25(trecho_fts) AS rank, snippet(trecho_fts, 0, '[[', ']]', '…', 14) AS trecho, d.id AS doc_id, d.tipo_documental AS tipo
          FROM trecho_fts JOIN trecho t ON t.rowid = trecho_fts.rowid JOIN documento d ON d.id = t.documento_id
          WHERE trecho_fts MATCH $fts AND d.confidencialidade IN (${confIn})${valueFilter}
        ), best AS (
          SELECT *, row_number() OVER (PARTITION BY projeto_id ORDER BY rank) AS rn, count(*) OVER (PARTITION BY projeto_id) AS ocorrencias FROM fts
        ) `;
    }
    if (f.segmentos?.length) where.push(`p.segmento_id IN (SELECT id FROM segmento WHERE nome IN (${list(f.segmentos)}))`);
    if (f.status?.length) where.push(`p.status_proposta IN (${list(f.status)})`);
    for (const [key, table, link, col] of [['tecnologias', 'tecnologia', 'projeto_tecnologia', 'tecnologia_id'], ['servicos', 'servico', 'projeto_servico', 'servico_id']]) {
      const values = f[key];
      if (!values?.length) continue;
      const any = f[`modo${key[0].toUpperCase()}${key.slice(1)}`] === 'qualquer';
      where.push(`p.id IN (SELECT x.projeto_id FROM ${link} x JOIN ${table} t ON t.id = x.${col} WHERE t.nome IN (${list(values)})
        GROUP BY x.projeto_id${any ? '' : ` HAVING count(DISTINCT t.id) = ${values.length}`})`);
    }
    if (f.tiposDocumento?.length) where.push(`p.id IN (SELECT projeto_id FROM documento WHERE tipo_documental IN (${list(f.tiposDocumento)}) AND confidencialidade IN (${confIn}))`);
    // UC08.6: criados por mim, em que sou o responsável ou em que enviei/revisei documento.
    if (f.meus) {
      params.$eu = user.id;
      params.$euNome = user.nome;
      where.push('(p.criado_por = $eu OR p.dono = $euNome OR p.id IN (SELECT projeto_id FROM documento WHERE enviado_por = $eu OR revisado_por = $eu))');
    }
    if (f.cliente?.trim()) {
      params.$cliente = `%${normalize(f.cliente)}%`;
      where.push('c.nome_normalizado LIKE $cliente');
    }
    if (f.prazoMin != null) { params.$prazoMin = Number(f.prazoMin); where.push('p.prazo_meses >= $prazoMin'); }
    if (f.prazoMax != null) { params.$prazoMax = Number(f.prazoMax); where.push('p.prazo_meses <= $prazoMax'); }
    if (user.verValores && f.valorMin != null) { params.$valorMin = Number(f.valorMin); where.push('p.valor >= $valorMin'); }
    if (user.verValores && f.valorMax != null) { params.$valorMax = Number(f.valorMax); where.push('p.valor <= $valorMax'); }
    if (f.dataDe) { params.$dataDe = f.dataDe; where.push('p.data_referencia >= $dataDe'); }
    if (f.dataAte) { params.$dataAte = f.dataAte; where.push('p.data_referencia <= $dataAte'); }
    if (f.entidade?.valor) {
      params.$entTipo = f.entidade.tipo;
      params.$entValor = `%${normalize(f.entidade.valor)}%`;
      where.push(`p.id IN (SELECT d.projeto_id FROM documento_entidade e JOIN documento d ON d.id = e.documento_id
        WHERE e.tipo = $entTipo AND e.valor_normalizado LIKE $entValor AND d.confidencialidade IN (${confIn}))`);
    }

    const from = `FROM projeto p JOIN cliente c ON c.id = p.cliente_id LEFT JOIN segmento s ON s.id = p.segmento_id
      ${ftsUsed ? 'JOIN best b ON b.projeto_id = p.id AND b.rn = 1' : ''} WHERE ${where.join(' AND ')}`;
    const ids = `${cte}SELECT p.id ${from}`;
    const orders = {
      relevancia: ftsUsed ? 'b.rank' : 'p.data_referencia DESC',
      // CR-008: "Recentes" pela data do projeto, desempatando pelo título.
      data: 'p.data_referencia IS NULL, p.data_referencia DESC, p.titulo',
      prazo: 'p.prazo_meses IS NULL, p.prazo_meses',
      valor: user.verValores ? 'p.valor IS NULL, p.valor DESC' : 'p.data_referencia DESC',
      titulo: 'p.titulo COLLATE NOCASE',
      documentos: 'documentos DESC',
    };
    params.$limit = Math.min(100, Math.max(1, Number(tamanho)));
    params.$offset = (Math.max(1, Number(pagina)) - 1) * params.$limit;

    const items = this.all(`${cte}SELECT p.id, p.titulo, p.status_proposta, p.confidencialidade, p.prazo_meses, p.valor, p.margem, p.data_referencia, p.origem,
        p.descricao, p.area, p.dono, c.nome AS cliente, s.nome AS segmento,
        (SELECT group_concat(t.nome, '|') FROM projeto_tecnologia pt JOIN tecnologia t ON t.id = pt.tecnologia_id WHERE pt.projeto_id = p.id) AS tecs,
        (SELECT group_concat(v.nome, '|') FROM projeto_servico ps JOIN servico v ON v.id = ps.servico_id WHERE ps.projeto_id = p.id) AS srvs,
        (SELECT count(*) FROM documento d WHERE d.projeto_id = p.id AND d.confidencialidade IN (${confIn})) AS documentos,
        (SELECT max(nivel_confianca) FROM documento d WHERE d.projeto_id = p.id AND d.confidencialidade IN (${confIn})) AS confianca_max,
        (SELECT group_concat(DISTINCT d.tipo_documental) FROM documento d WHERE d.projeto_id = p.id AND d.confidencialidade IN (${confIn})) AS tipos_doc,
        (SELECT count(*) FROM projeto p2 WHERE p2.cliente_id = p.cliente_id AND p2.confidencialidade IN (${confIn})) AS projetos_cliente
        ${ftsUsed ? ', b.trecho, b.rank, b.ocorrencias, b.doc_id, b.tipo AS doc_tipo' : ''}
      ${from} ORDER BY ${orders[ordenar] ?? orders.relevancia}, p.id LIMIT $limit OFFSET $offset`, params)
      .map(({ tecs, srvs, tipos_doc, ...r }) => {
        const out = { ...r, tecnologias: split(tecs), servicos: split(srvs), tiposDocumento: tipos_doc ? tipos_doc.split(',') : [], faixaValor: faixaValor(r.valor) };
        if (!user.verValores) { delete out.valor; delete out.margem; }
        return out;
      });

    const { $limit, $offset, ...facetParams } = params;
    const facet = (sql) => this.all(sql.replace('$IDS', ids), facetParams);
    const total = this.get(`SELECT count(*) AS n FROM (${ids})`, facetParams).n;
    const facetas = {
      segmentos: facet('SELECT s.nome AS valor, count(*) AS n FROM projeto p JOIN segmento s ON s.id = p.segmento_id WHERE p.id IN ($IDS) GROUP BY s.nome ORDER BY n DESC, valor'),
      status: facet('SELECT p.status_proposta AS valor, count(*) AS n FROM projeto p WHERE p.id IN ($IDS) GROUP BY p.status_proposta ORDER BY n DESC, valor'),
      tecnologias: facet('SELECT t.nome AS valor, count(*) AS n FROM projeto_tecnologia x JOIN tecnologia t ON t.id = x.tecnologia_id WHERE x.projeto_id IN ($IDS) GROUP BY t.nome ORDER BY n DESC, valor'),
      servicos: facet('SELECT v.nome AS valor, count(*) AS n FROM projeto_servico x JOIN servico v ON v.id = x.servico_id WHERE x.projeto_id IN ($IDS) GROUP BY v.nome ORDER BY n DESC, valor'),
      tiposDocumento: facet(`SELECT d.tipo_documental AS valor, count(DISTINCT d.projeto_id) AS n FROM documento d WHERE d.projeto_id IN ($IDS) AND d.confidencialidade IN (${confIn}) GROUP BY d.tipo_documental ORDER BY n DESC, valor`),
    };
    return { total, pagina: Number(pagina), tamanho: params.$limit, itens: items, facetas, consulta: fts, tempoMs: Math.round((performance.now() - t0) * 10) / 10 };
  }

  // Detalhe do projeto (UC07): campos, documentos, entidades agregadas, relacionados, conflitos e histórico.
  projectDetail(id, user) {
    const p = this.project(id);
    if (!p || !user.confidencialidades.includes(p.confidencialidade)) return null;
    const params = { $id: id };
    const confIn = user.confidencialidades.map((c, i) => { params[`$c${i}`] = c; return `$c${i}`; }).join(', ');
    const docs = this.all(`SELECT id, titulo, tipo_documental, status_documento, nivel_confianca, confidencialidade, arquivo, formato, tamanho_bytes, idioma,
        data_conteudo, prazo_meses, valor, margem, resumo, palavras_chave_json, qualidade_metadados, contem_pii, origem, criado_em, revisado_por, revisado_em,
        autor, versao, link_origem, observacoes, reutilizavel
      FROM documento WHERE projeto_id = $id AND confidencialidade IN (${confIn}) ORDER BY nivel_confianca DESC, id`, params)
      .map(({ palavras_chave_json, ...d }) => {
        const out = { ...d, palavras_chave: JSON.parse(palavras_chave_json) };
        if (!user.verValores) { delete out.valor; delete out.margem; }
        return out;
      });
    const entidades = {};
    for (const e of this.all(`SELECT e.tipo, e.valor, e.trecho, e.metodo, e.documento_id, e.confianca FROM documento_entidade e JOIN documento d ON d.id = e.documento_id
        WHERE d.projeto_id = $id AND d.confidencialidade IN (${confIn}) AND e.tipo NOT IN ('pii') ORDER BY e.tipo, e.confianca DESC`, params)) {
      if (!user.verValores && e.tipo === 'valor_monetario') continue;
      const group = (entidades[e.tipo] ??= new Map());
      const key = normalize(e.valor);
      const item = group.get(key) ?? { valor: e.valor, documentos: [], trecho: e.trecho, metodo: e.metodo };
      if (!item.documentos.includes(e.documento_id)) item.documentos.push(e.documento_id);
      group.set(key, item);
    }
    const relacionados = this.all(`SELECT r.relacionado_id AS id, r.similaridade, r.motivo, p.titulo, c.nome AS cliente, p.status_proposta
      FROM projeto_relacionado r JOIN projeto p ON p.id = r.relacionado_id JOIN cliente c ON c.id = p.cliente_id
      WHERE r.projeto_id = $id AND p.confidencialidade IN (${confIn}) ORDER BY r.similaridade DESC LIMIT 5`, params);
    const historico = this.all(`SELECT CASE WHEN h.entidade = 'documento' THEN h.entidade_id || ' · ' || h.campo ELSE h.campo END AS campo, h.acao, h.antes, h.depois, h.usuario_id, h.em
      FROM historico_alteracao h WHERE (h.entidade = 'projeto' AND h.entidade_id = $id)
        OR (h.entidade = 'documento' AND h.entidade_id IN (SELECT id FROM documento WHERE projeto_id = $id AND confidencialidade IN (${confIn})))
      ORDER BY h.em DESC LIMIT 50`, params)
      .filter((h) => user.verValores || !['valor', 'margem'].includes(h.campo.split(' · ').pop()));

    // Divergências entre documentos e o cadastro do projeto, resolvidas pela hierarquia de confiança.
    const conflitos = [];
    for (const campo of user.verValores ? ['prazo_meses', 'valor'] : ['prazo_meses']) {
      const fontes = docs.filter((d) => d[campo] != null).map((d) => ({ fonte: d.id, tipo: d.tipo_documental, confianca: d.nivel_confianca, valor: d[campo] }));
      if (p[campo] != null) fontes.push({ fonte: 'cadastro', tipo: 'cadastro do projeto', confianca: 3, valor: p[campo] });
      if (new Set(fontes.map((x) => x.valor)).size > 1) {
        const escolhido = [...fontes].sort((a, b) => b.confianca - a.confianca)[0];
        conflitos.push({ campo, fontes, escolhido });
      }
    }
    const campos = ['cliente', 'titulo', 'segmento', 'status_proposta', 'prazo_meses', 'descricao', 'objetivo', 'dono'];
    const faltando = campos.filter((c) => p[c] == null || p[c] === '');
    if (!p.tecnologias.length) faltando.push('tecnologias');
    if (!p.servicos.length) faltando.push('servicos');
    if (!docs.some((d) => d.nivel_confianca >= 4)) faltando.push('documento de alta confiança (proposta final, case ou apresentação)');
    const project = { ...p };
    if (!user.verValores) { delete project.valor; delete project.margem; }
    return {
      projeto: project,
      documentos: docs,
      entidades: Object.fromEntries(Object.entries(entidades).map(([k, v]) => [k, [...v.values()].slice(0, 15)])),
      relacionados,
      conflitos,
      historico,
      qualidade: { percentual: Math.round((1 - faltando.length / (campos.length + 3)) * 100), faltando },
    };
  }

  // Marca ou desmarca um projeto como cadastro de teste (some dos insights; nada é apagado).
  marcarTeste(id, teste, user) {
    const p = this.get('SELECT id, teste FROM projeto WHERE id = $id', { $id: id });
    if (!p) return null;
    const novo = teste ? 1 : 0;
    if (p.teste !== novo) {
      this.run('UPDATE projeto SET teste = $t WHERE id = $id', { $t: novo, $id: id });
      this.logActivity({ acao: 'editar', entidade: 'projeto', entidade_id: id, campo: 'teste', antes: p.teste ? 'sim' : 'não', depois: novo ? 'sim' : 'não', usuario_id: user?.id ?? null });
    }
    return { id, teste: Boolean(novo) };
  }

  // Indicadores agregados da base (UC09), sempre restritos ao que o perfil pode ver.
  insights(user) {
    const params = {};
    const confIn = user.confidencialidades.map((c, i) => { params[`$c${i}`] = c; return `$c${i}`; }).join(', ');
    const won = STATUS_GANHO.map((s) => `'${s}'`).join(', ');
    const rate = `ROUND(100.0 * sum(p.status_proposta IN (${won})) / NULLIF(sum(p.status_proposta IN (${won})) + sum(p.status_proposta = 'Perdida'), 0), 1)`;
    const valor = user.verValores ? ', ROUND(avg(p.valor)) AS valor_medio' : '';
    const visible = `p.confidencialidade IN (${confIn})`;
    return {
      totais: this.get(`SELECT count(*) AS projetos, (SELECT count(*) FROM documento d WHERE d.confidencialidade IN (${confIn})) AS documentos,
          count(DISTINCT p.cliente_id) AS clientes, sum(p.status_proposta IN (${won})) AS ganhos, sum(p.status_proposta = 'Perdida') AS perdidos,
          ${rate} AS taxa_conversao FROM projeto p WHERE ${visible}`, params),
      porSegmento: this.all(`SELECT s.nome AS segmento, count(*) AS projetos, ${rate} AS taxa_conversao, ROUND(avg(p.prazo_meses), 1) AS prazo_medio${valor}
          FROM projeto p JOIN segmento s ON s.id = p.segmento_id WHERE ${visible} GROUP BY s.nome ORDER BY projetos DESC`, params),
      porTecnologia: this.all(`SELECT t.nome AS tecnologia, count(*) AS projetos, ${rate} AS taxa_conversao, ROUND(avg(p.prazo_meses), 1) AS prazo_medio${valor}
          FROM projeto p JOIN projeto_tecnologia x ON x.projeto_id = p.id JOIN tecnologia t ON t.id = x.tecnologia_id WHERE ${visible}
          GROUP BY t.nome ORDER BY projetos DESC LIMIT 15`, params),
      // V0.0.2 (CR-009): funil por status, projetos por ano e quantas tecnologias distintas aparecem.
      porStatus: this.all(`SELECT p.status_proposta AS status, count(*) AS projetos FROM projeto p WHERE ${visible} GROUP BY p.status_proposta`, params),
      porAno: this.all(`SELECT substr(p.data_referencia, 1, 4) AS ano, count(*) AS projetos FROM projeto p WHERE ${visible} AND p.data_referencia IS NOT NULL GROUP BY ano ORDER BY ano`, params),
      totalTecnologias: this.get(`SELECT count(DISTINCT x.tecnologia_id) AS n FROM projeto_tecnologia x JOIN projeto p ON p.id = x.projeto_id WHERE ${visible}`, params).n,
      coocorrencia: this.all(`SELECT a.nome AS tecnologia_a, b.nome AS tecnologia_b, count(*) AS projetos
          FROM projeto_tecnologia x JOIN projeto_tecnologia y ON y.projeto_id = x.projeto_id AND x.tecnologia_id < y.tecnologia_id
          JOIN tecnologia a ON a.id = x.tecnologia_id JOIN tecnologia b ON b.id = y.tecnologia_id JOIN projeto p ON p.id = x.projeto_id
          WHERE ${visible} GROUP BY a.nome, b.nome HAVING count(*) >= 2 ORDER BY projetos DESC LIMIT 10`, params),
      documentosPorTipo: this.all(`SELECT tipo_documental AS tipo, count(*) AS documentos, ROUND(avg(qualidade_metadados), 2) AS qualidade_media
          FROM documento WHERE confidencialidade IN (${confIn}) GROUP BY tipo_documental ORDER BY documentos DESC`, params),
      licoesDePerdas: this.all(`SELECT e.valor AS licao, p.id AS projeto_id, c.nome AS cliente FROM documento_entidade e JOIN documento d ON d.id = e.documento_id
          JOIN projeto p ON p.id = d.projeto_id JOIN cliente c ON c.id = p.cliente_id
          WHERE e.tipo = 'licao' AND p.status_proposta = 'Perdida' AND ${visible} AND d.confidencialidade IN (${confIn}) LIMIT 8`, params),
      resultados: this.all(`SELECT e.valor AS resultado, p.id AS projeto_id, c.nome AS cliente FROM documento_entidade e JOIN documento d ON d.id = e.documento_id
          JOIN projeto p ON p.id = d.projeto_id JOIN cliente c ON c.id = p.cliente_id
          WHERE e.tipo = 'kpi' AND d.tipo_documental = 'case_sucesso' AND ${visible} AND d.confidencialidade IN (${confIn}) LIMIT 8`, params),
      curadoria: {
        termosPendentes: this.all("SELECT 'tecnologia' AS tipo, nome FROM tecnologia WHERE status = 'pendente_curadoria' UNION ALL SELECT 'servico', nome FROM servico WHERE status = 'pendente_curadoria'"),
        projetosSemFonteForte: this.all(`SELECT p.id, p.titulo FROM projeto p WHERE ${visible} AND NOT EXISTS (SELECT 1 FROM documento d WHERE d.projeto_id = p.id AND d.nivel_confianca >= 4)`, params),
        aguardandoRevisao: this.get("SELECT count(*) AS n FROM processamento WHERE status = 'aguardando_revisao'").n,
      },
      // RNF08: quanto das sugestões automáticas precisou de correção humana.
      correcoes: this.all(`SELECT campo, count(*) AS correcoes, metodo_sugestao AS metodo FROM correcao_metadado GROUP BY campo, metodo_sugestao ORDER BY correcoes DESC`),
      revisados: this.get("SELECT count(*) AS n FROM processamento WHERE status = 'indexado'").n,
    };
  }
}
