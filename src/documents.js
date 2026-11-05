// Edição das informações de um documento já indexado (UC07.4): os mesmos campos da revisão do upload.

import { stricterConf } from './db/repo.js';
import { trustLevel } from './corpus.js';
import { TIPOS_DOCUMENTAIS } from './analysis.js';

const TEXT_FIELDS = { titulo: 200, status_documento: 40, idioma: 5, resumo: 2000, autor: 120, versao: 40, link_origem: 500, observacoes: 2000 };
const LISTS = ['pessoas', 'organizacoes', 'kpis', 'riscos', 'licoes'];
const clip = (v, n) => (v == null ? '' : String(v).trim().slice(0, n));

// Dados para o formulário, já sem o que o perfil não pode ver.
export function documentForEdit(engine, id, user) {
  const d = engine.repo.documentForEdit(id);
  if (!d || !user.confidencialidades.includes(d.confidencialidade)) return null;
  if (!user.verValores) { delete d.valor; delete d.margem; }
  return d;
}

export function updateDocument(engine, id, dados, user) {
  const atual = documentForEdit(engine, id, user);
  if (!atual) return { naoEncontrado: true };
  const projeto = engine.repo.project(atual.projeto_id);
  const erros = [];
  const changes = {};
  for (const [k, max] of Object.entries(TEXT_FIELDS)) if (k in dados) changes[k] = clip(dados[k], max) || null;
  if ('titulo' in changes && !changes.titulo) erros.push('Título é obrigatório.');
  if (changes.link_origem && !/^https?:\/\//i.test(changes.link_origem)) erros.push('O link do original precisa começar com http:// ou https://.');
  if ('tipo_documental' in dados) {
    if (!(dados.tipo_documental in TIPOS_DOCUMENTAIS)) erros.push('Tipo de documento inválido.');
    changes.tipo_documental = dados.tipo_documental;
  }
  if ('data_conteudo' in dados) {
    changes.data_conteudo = dados.data_conteudo || null;
    if (changes.data_conteudo && !/^\d{4}-\d{2}-\d{2}$/.test(changes.data_conteudo)) erros.push('Data deve estar no formato AAAA-MM-DD.');
  }
  const num = (k, ok, msg) => {
    if (!(k in dados)) return;
    changes[k] = dados[k] === '' || dados[k] == null ? null : Number(dados[k]);
    if (changes[k] != null && !ok(changes[k])) erros.push(msg);
  };
  num('prazo_meses', (v) => v > 0 && v <= 120, 'Prazo deve estar entre 0 e 120 meses.');
  // Valor e margem só para quem enxerga valores; para os demais, o que vier é ignorado.
  if (user.verValores) {
    num('valor', (v) => v >= 0, 'Valor deve ser positivo.');
    num('margem', (v) => v >= -1 && v <= 1, 'Margem deve estar entre -1 e 1 (use fração, ex.: 0.25).');
  }
  if ('confidencialidade' in dados) {
    // Nunca fica mais aberto que o projeto, e o perfil precisa enxergar o nível escolhido.
    changes.confidencialidade = stricterConf(dados.confidencialidade, projeto.confidencialidade);
    if (!user.confidencialidades.includes(changes.confidencialidade)) erros.push('Seu perfil não pode classificar documentos nesse nível de acesso.');
  }
  if ('reutilizavel' in dados) changes.reutilizavel = dados.reutilizavel ? 1 : 0;
  if ('palavras_chave' in dados) {
    const lista = Array.isArray(dados.palavras_chave) ? dados.palavras_chave : String(dados.palavras_chave ?? '').split(',');
    changes.palavras_chave = [...new Set(lista.map((x) => clip(x, 60)).filter(Boolean))].slice(0, 30);
  }
  if (erros.length) return { erros };

  // Tipo e status definem o nível de confiança da fonte.
  const tipo = changes.tipo_documental ?? atual.tipo_documental;
  const status = 'status_documento' in changes ? changes.status_documento : atual.status_documento;
  if ('tipo_documental' in changes || 'status_documento' in changes) changes.nivel_confianca = trustLevel(tipo, status);

  let entidades = null;
  if (dados.entidades) {
    entidades = {};
    for (const k of LISTS) {
      if (!Array.isArray(dados.entidades[k])) continue;
      const vistos = new Set();
      entidades[k] = dados.entidades[k].slice(0, 50)
        .map((e) => ({ valor: clip(e?.valor, 300), papel: clip(e?.papel, 80) || null }))
        .filter((e) => e.valor && !vistos.has(e.valor.toLowerCase()) && vistos.add(e.valor.toLowerCase()));
    }
  }
  const alteracoes = engine.repo.tx(() => engine.repo.updateDocument(id, changes, entidades, user.id));
  return { alteracoes, documento: documentForEdit(engine, id, user) };
}
