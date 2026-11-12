// Tela "Enviar": envio multiformato, fila de processamento com etapas ao vivo e revisão humana (UC02).

import { $, $$, esc, brl, api, state, userId, currentUser, tipoLabel, onTab, onUserChange, openTab, toast, chipPicker, bindChipPickers, readChips, pode } from './common.js';
import { icon } from './icons.js';
import { ELISTS, elist, bindEntityLists, readEntityLists } from './entidades.js';
import { ensureTerms, handleTermsError, maskNote, policyLine } from './aviso.js';
import { openProject, projectFields, readProjectFields, bindClientCombo, STATUS_DOC } from './projetos.js';

const STATUS = {
  enviado: ['loader', 'Enviando'],
  processando: ['loader', 'Processando'],
  aguardando_revisao: ['eye', 'Para revisar'],
  indexado: ['checkCircle', 'Na base'],
  rejeitado: ['xCircle', 'Descartado'],
  erro: ['alert', 'Erro'],
};
const STEP_ICON = { ok: 'check', executando: 'loader', ignorada: 'chevronRight', aviso: 'alert', erro: 'x' };
const STEP_SHORT = { 'Recebimento e verificação': 'Recebido', 'Extração de texto': 'Texto', 'Classificação e metadados por regras': 'Regras', 'Análise com IA': 'IA', 'Vínculo com projeto': 'Projeto', 'Duplicidade e conflitos': 'Conflitos', 'Qualidade dos metadados': 'Qualidade' };
const ALERT_ICON = { erro: 'xCircle', aviso: 'alert', info: 'info' };
const view = { selecionado: null, poll: null, projetos: [], status: new Map() };
// Abaixo desta confiança o campo é destacado para conferência.
const LOW = 0.5;

const statusBadge = (s) => `<span class="st st-${s}">${icon(STATUS[s][0], { size: 14, cls: ['enviado', 'processando'].includes(s) ? 'spin' : '' })}${STATUS[s][1]}</span>`;

export function initUploads() {
  onTab('upload', () => { loadProjects(); loadJobs(); });
  onUserChange(() => { view.selecionado = null; view.status.clear(); $('#job-detail').innerHTML = ''; loadJobs(); if ($('#tab-upload').classList.contains('active')) loadProjects(); });
  $('#upload-aviso').innerHTML = policyLine();
  const drop = $('#drop');
  $('#file').onchange = (e) => sendFiles([...e.target.files]);
  drop.ondragover = (e) => { e.preventDefault(); drop.classList.add('over'); };
  drop.ondragleave = () => drop.classList.remove('over');
  drop.ondrop = (e) => { e.preventDefault(); drop.classList.remove('over'); sendFiles([...e.dataTransfer.files]); };
  document.addEventListener('radar:upload-para', (e) => { loadProjects().then(() => { $('#upload-target').value = e.detail; }); });
  loadJobs();
}

async function loadProjects() {
  const c = state.ctx.catalogo;
  $('#upload-formats').textContent = `${c.formatosUpload.join(' · ').toUpperCase()} · até ${c.maxUploadMb} MB`;
  const r = await api(`/api/projetos?userId=${userId()}&tamanho=100&ordenar=titulo`);
  view.projetos = r.itens;
  const cur = $('#upload-target').value;
  $('#upload-target').innerHTML = `<option value="">Projeto: detectar automaticamente</option>${r.itens.map((p) => `<option value="${p.id}">${esc(p.cliente)} — ${esc(p.titulo)}</option>`).join('')}`;
  $('#upload-target').value = cur;
}

const toBase64 = (buf) => {
  const bytes = new Uint8Array(buf);
  let bin = '';
  for (let i = 0; i < bytes.length; i += 0x8000) bin += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  return btoa(bin);
};

async function sendFiles(files) {
  if (!files.length) return;
  // Termo aceito uma vez por versão (UC13.1). O servidor mascara dados sensíveis sem bloquear o envio (UC13.2).
  if (!(await ensureTerms())) { $('#file').value = ''; return; }
  // CR-010: formato não aceito é avisado antes de enviar, com a lista de formatos; o arquivo nem entra na lista.
  const aceitos = state.ctx.catalogo.formatosUpload.map((f) => f.toLowerCase());
  const recusados = files.filter((f) => !aceitos.includes(f.name.split('.').pop().toLowerCase()));
  if (recusados.length) toast(`${recusados.map((f) => f.name).join(', ')}: formato não aceito. Envie ${aceitos.join(', ').toUpperCase()}.`, 'error');
  files = files.filter((f) => !recusados.includes(f));
  if (!files.length) { $('#file').value = ''; return; }
  for (const file of files) {
    const enviar = async () => api('/api/upload', { nome: file.name, conteudoBase64: toBase64(await file.arrayBuffer()), userId: userId(), projetoId: $('#upload-target').value || undefined });
    try {
      view.selecionado = (await enviar()).id;
    } catch (err) {
      if (await handleTermsError(err)) {
        try { view.selecionado = (await enviar()).id; } catch (e2) { toast(`${file.name}: ${e2.message}`, 'error'); }
      } else toast(`${file.name}: ${err.message}`, 'error');
    }
  }
  $('#file').value = '';
  loadJobs();
}

async function loadJobs() {
  const jobs = await api(`/api/uploads?userId=${userId()}`);
  const pendentes = jobs.filter((j) => j.status === 'aguardando_revisao').length;
  // Avisa quando um envio termina de processar e o usuário está em outra tela.
  const prontos = jobs.filter((j) => j.status === 'aguardando_revisao' && ['enviado', 'processando'].includes(view.status.get(j.id)));
  view.status = new Map(jobs.map((j) => [j.id, j.status]));
  if (prontos.length && !$('#tab-upload').classList.contains('active')) {
    toast(prontos.length > 1 ? `${prontos.length} documentos prontos para revisar` : `${prontos[0].nome_arquivo} está pronto para revisar`, 'info', { label: 'Revisar', run: () => { view.selecionado = prontos[0].id; openTab('upload'); } });
  }
  $('#badge-upload').textContent = pendentes;
  $('#badge-upload').classList.toggle('hidden', !pendentes);
  $('#job-list').innerHTML = jobs.length ? jobs.map((j) => `
    <li data-id="${j.id}" class="${j.id === view.selecionado ? 'active' : ''}" title="${(j.tamanho_bytes / 1024).toFixed(1)} KB · ${new Date(j.criado_em).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' })}">
      <span class="fmt f-${esc(j.formato)}">${esc(j.formato)}</span>
      <strong>${esc(j.nome_arquivo)}</strong>
      ${statusBadge(j.status)}
    </li>`).join('') : '';
  $$('#job-list li[data-id]').forEach((li) => (li.onclick = () => { view.selecionado = li.dataset.id; loadJobs(); }));
  if (!view.selecionado && !jobs.length) $('#job-detail').innerHTML = '';
  const pending = jobs.some((j) => ['enviado', 'processando'].includes(j.status));
  clearTimeout(view.poll);
  if (pending) view.poll = setTimeout(loadJobs, 700);
  if (view.selecionado) showJob(view.selecionado, pending);
}

async function showJob(id, refreshing) {
  const job = await api(`/api/upload?id=${id}&userId=${userId()}`);
  const box = $('#job-detail');
  // Não redesenha um formulário de revisão que o usuário já está editando.
  if (refreshing && box.dataset.job === id && box.dataset.status === job.status && job.status === 'aguardando_revisao') return;
  box.dataset.job = id;
  box.dataset.status = job.status;
  const processando = ['enviado', 'processando'].includes(job.status);
  const lista = `<ol class="steps">${job.etapas.map((e) => `<li class="e-${e.status}" title="${esc(`${e.nome}${e.ms != null ? ` · ${e.ms} ms` : ''}${e.detalhe ? `\n${e.detalhe}` : ''}`)}">${icon(STEP_ICON[e.status] ?? 'check', { size: 14, cls: e.status === 'executando' ? 'spin' : '' })}<span>${esc(STEP_SHORT[e.nome] ?? e.nome)}</span></li>`).join('')}</ol>`;
  // Durante o processamento as etapas mostram o progresso; depois ficam recolhidas.
  const etapas = processando ? lista : `<details class="how"><summary>${icon('layers', { size: 14 })}Como foi processado</summary>${lista}</details>`;
  const head = `<header class="job-head"><h3>${icon('file', { size: 18 })}${esc(job.nome_arquivo)}</h3>${statusBadge(job.status)}</header>`;
  // CR-010: arquivo recusado não trava o envio: dá para tirar da lista ou trocar por outro, e a mensagem diz os formatos aceitos.
  if (job.status === 'erro') {
    const formatos = state.ctx.catalogo.formatosUpload.join(', ').toUpperCase();
    box.innerHTML = `${head}${etapas}<p class="alert error">${icon('xCircle', { size: 16 })}<span>${esc(job.erro)}</span></p>
      <p class="muted small">Formatos aceitos: ${esc(formatos)} · até ${state.ctx.catalogo.maxUploadMb} MB.</p>
      <div class="actions"><button id="job-trocar" class="btn primary">${icon('upload', { size: 16 })}Trocar arquivo</button><button id="job-remover" class="btn">${icon('x', { size: 16 })}Remover da lista</button></div>`;
    const remover = async () => { await api('/api/upload/rejeitar', { id: job.id, userId: userId() }); view.selecionado = null; $('#job-detail').innerHTML = ''; loadJobs(); };
    $('#job-remover').onclick = () => remover().then(() => toast(`${job.nome_arquivo} removido da lista.`)).catch((e) => toast(e.message, 'error'));
    $('#job-trocar').onclick = () => { if (job.projeto_alvo_id) $('#upload-target').value = job.projeto_alvo_id; remover().then(() => $('#file').click()).catch((e) => toast(e.message, 'error')); };
    return;
  }
  if (job.status === 'indexado') {
    box.innerHTML = `${head}${etapas}<div class="done">${icon('checkCircle', { size: 36 })}<p>Na base como <b>${esc(job.documento_id)}</b></p><button id="job-open" class="btn">${icon('folder', { size: 16 })}Abrir projeto</button><button id="job-next" class="link-btn">Enviar outro</button></div>`;
    $('#job-open').onclick = () => openProject(job.documento_id.replace(/-[^-]+$/, ''));
    $('#job-next').onclick = () => $('#file').click();
    return;
  }
  if (job.status !== 'aguardando_revisao') { box.innerHTML = `${head}${etapas}`; return; }
  box.innerHTML = `${head}${reviewForm(job, etapas)}`;
  bindReview(job);
}

// Só os campos de baixa confiança ganham destaque; método e trecho ficam no title.
const low = (f) => f?.valor != null && (f.confianca ?? 0) < LOW;
const conf = (f) => (low(f) ? `<em class="confira" title="${esc(`Confiança ${Math.round((f.confianca ?? 0) * 100)}% · ${f.metodo}${f.evidencia ? `\n“${f.evidencia}”` : ''}`)}">confira</em>` : '');
const alts = (f, name) => (f?.alternativas?.length ? `<span class="alts">${f.alternativas.map((a) => `<button type="button" data-alt="${name}" value="${esc(a.valor)}" title="Usar esta alternativa">${esc(name === 'tipo_documental' ? tipoLabel(a.valor) : a.valor)}</button>`).join('')}</span>` : '');

function reviewForm(job, etapas) {
  const s = job.sugestao;
  const c = s.campos;
  const cat = state.ctx.catalogo;
  const user = currentUser();
  const opt = (list, cur, label = (x) => x) => list.map((v) => `<option value="${esc(v)}"${v === cur ? ' selected' : ''}>${esc(label(v))}</option>`).join('');
  const meta = (list) => Object.fromEntries(list.map((t) => [t.valor, `${Math.round(t.confianca * 100)}% · ${t.metodo}${t.evidencia ? `\n“${t.evidencia}”` : ''}`]));
  const v = s.vinculo;
  const ent = (ic, label, list, fmt = (e) => esc(e.valor)) => (list?.length ? `<div class="ent"><h6>${icon(ic, { size: 14 })}${label}</h6><ul>${list.map((e) => `<li>${fmt(e)}</li>`).join('')}</ul></div>` : '');
  const nEnts = ELISTS.reduce((n, [k]) => n + (c.entidades[k]?.length ?? 0), 0);
  const autor = s.arquivo?.autor ?? c.entidades.pessoas?.find((p) => p.papel === 'autor do arquivo')?.valor ?? '';
  const iaOn = s.ia?.provedor === 'deepseek' && !s.ia?.fallback;
  const avisos = s.alertas.filter((a) => a.nivel !== 'info');
  const conferir = [c.tipo_documental, c.titulo, c.confidencialidade].filter(low).length;
  const destinoCerto = v.recomendacao === 'existente' && Boolean(v.projetoAlvo || (v.sugestoes[0]?.score ?? 0) >= 0.6);
  const pontos = avisos.length + conferir + (destinoCerto ? 0 : 1);
  const resumo = pontos
    ? `<p class="ready warn">${icon('eye', { size: 16 })}<span><b>Pronto para revisar</b> · ${pontos} ponto${pontos > 1 ? 's' : ''} de atenção</span></p>`
    : `<p class="ready ok">${icon('checkCircle', { size: 16 })}<span><b>Tudo certo.</b> O Radar leu o documento com alta confiança.</span><button type="button" id="quick-ok" class="btn primary sm">${icon('check', { size: 15 })}Aprovar</button></p>`;
  return `
    ${resumo}${etapas}
    ${avisos.map((a) => `<p class="alert ${a.nivel === 'erro' ? 'error' : 'warn'}">${icon(ALERT_ICON[a.nivel], { size: 16 })}<span>${esc(a.mensagem)}</span></p>`).join('')}
    ${maskNote(s.mascaramento)}
    <form id="review" class="review">
      <div class="review-meta">
        <span title="${iaOn ? 'Metadados por regras + IA (DeepSeek)' : 'Metadados só por regras (IA offline)'}">${icon(iaOn ? 'sparkles' : 'cpu', { size: 15 })}${iaOn ? 'Lido com IA' : 'Lido por regras'}</span>
        <span title="${c.qualidade.faltando.length ? `Falta: ${c.qualidade.faltando.join(', ')}` : 'Todos os campos preenchidos'}">${icon('checkCircle', { size: 15 })}${c.qualidade.percentual}% dos campos preenchidos</span>
        ${s.alertas.some((a) => a.nivel === 'info' && a.codigo !== 'mascaramento') ? `<span title="${esc(s.alertas.filter((a) => a.nivel === 'info' && a.codigo !== 'mascaramento').map((a) => a.mensagem).join('\n'))}">${icon('info', { size: 15 })}</span>` : ''}
      </div>

      <div class="form-grid">
        <label><span>Tipo ${conf(c.tipo_documental)}</span><select name="tipo_documental">${opt(Object.keys(cat.tiposDocumentais), c.tipo_documental.valor, tipoLabel)}</select>${alts(c.tipo_documental, 'tipo_documental')}</label>
        <label class="span2"><span>Título ${conf(c.titulo)}</span><input name="titulo" value="${esc(c.titulo.valor ?? '')}"></label>
        <label><span>Acesso ${conf(c.confidencialidade)}</span><select name="confidencialidade" title="${esc(c.confidencialidade.motivos?.join('; ') ?? '')}">${opt(cat.confidencialidades.filter((x) => user.confidencialidades.includes(x)), c.confidencialidade.valor)}</select></label>
      </div>

      <h5 class="sect-title">${icon('folder', { size: 16 })}Em qual projeto entra?${destinoCerto ? '' : ' <em class="confira">confira</em>'}</h5>
      <div class="dest">
        ${v.sugestoes.map((p, i) => `<label class="opt"><input type="radio" name="destino" value="${p.projeto_id}"${(v.projetoAlvo ? v.projetoAlvo === p.projeto_id : v.recomendacao === 'existente' && i === 0) ? ' checked' : ''}>
          <span>${esc(p.titulo)}<small>${esc(p.cliente)} · <b title="${esc(p.motivos.join('; '))}">${Math.round(p.score * 100)}% compatível</b></small></span></label>`).join('')}
        <label class="opt"><input type="radio" name="destino" value="__outro"${v.projetoAlvo && !v.sugestoes.some((p) => p.projeto_id === v.projetoAlvo) ? ' checked' : ''}>${icon('search', { size: 16 })}
          <select name="outro">${view.projetos.map((p) => `<option value="${p.id}"${p.id === v.projetoAlvo ? ' selected' : ''}>${esc(p.cliente)} — ${esc(p.titulo)}</option>`).join('')}</select></label>
        ${pode('cadastrarProjeto') ? `<label class="opt"><input type="radio" name="destino" value="__novo"${!v.projetoAlvo && v.recomendacao === 'novo' ? ' checked' : ''}>${icon('plus', { size: 16 })}<span>Criar projeto novo</span></label>` : `<p class="muted small">${icon('info', { size: 14 })} Não achou o projeto? Só o gestor cadastra projetos novos: peça o cadastro e envie o documento depois.</p>`}
        ${pode('cadastrarProjeto') ? `<div id="novo-projeto" class="novo">${projectFields(v.projetoNovo, { prefix: 'np_' })}</div>` : ''}
      </div>

      <details class="sec" open><summary>${icon('info', { size: 16 })}Sobre o documento</summary>
        <div class="form-grid">
          <label><span>Autor</span><input name="x_autor" value="${esc(autor)}" placeholder="Quem escreveu" maxlength="120"></label>
          <label><span>Versão</span><input name="x_versao" placeholder="Ex.: v2, final" maxlength="40"></label>
          <label><span>Link do original</span><input name="x_link_origem" type="url" inputmode="url" placeholder="https://… (SharePoint, Drive)" maxlength="500"></label>
          <label class="span3"><span>Por que este documento é relevante?</span><textarea name="x_observacoes" rows="2" maxlength="2000" placeholder="Contexto que não está no arquivo: quando reaproveitar, o que mudou, cuidados… (entra na busca)"></textarea></label>
          <label class="check span3"><input type="checkbox" name="x_reutilizavel">${icon('star', { size: 15 })}Bom modelo para reaproveitar em novas propostas</label>
        </div>
      </details>

      <details class="sec"><summary>${icon('tag', { size: 16 })}Tecnologias e serviços<em>${c.tecnologias.length + c.servicos.length}</em></summary>
        ${chipPicker('tecnologias', c.tecnologias.map((t) => t.valor), cat.tecnologias.map((t) => t.nome), meta(c.tecnologias))}
        ${chipPicker('servicos', c.servicos.map((t) => t.valor), cat.servicos.map((t) => t.nome), meta(c.servicos))}
        <label class="check"><input type="checkbox" name="atualizarProjeto" checked>Adicionar ao projeto</label>
      </details>

      <details class="sec"><summary>${icon('edit', { size: 16 })}Mais campos</summary>
        <div class="form-grid">
          <label><span>Status ${conf(c.status_documento)}</span><select name="status_documento">${opt(STATUS_DOC, c.status_documento.valor)}</select></label>
          <label><span>Data ${conf(c.data_conteudo)}</span><input name="data_conteudo" type="date" value="${esc(c.data_conteudo.valor ?? '')}">${alts(c.data_conteudo, 'data_conteudo')}</label>
          <label><span>Prazo (meses) ${conf(c.prazo_meses)}</span><input name="prazo_meses" type="number" step="0.1" value="${esc(c.prazo_meses.valor ?? '')}">${alts(c.prazo_meses, 'prazo_meses')}</label>
          ${user.verValores ? `<label><span>Valor (R$) ${conf(c.valor)}</span><input name="valor" type="number" value="${esc(c.valor.valor ?? '')}"></label><label><span>Margem ${conf(c.margem)}</span><input name="margem" type="number" step="0.01" value="${esc(c.margem.valor ?? '')}"></label>` : ''}
          <label><span>Idioma ${conf(c.idioma)}</span><select name="idioma">${opt(['pt', 'en', 'es'], c.idioma.valor)}</select></label>
          <label class="span3"><span>Resumo ${conf(c.resumo)}</span><textarea name="resumo" rows="3">${esc(c.resumo.valor ?? '')}</textarea></label>
          <label class="span3"><span>Palavras-chave</span><input name="palavras_chave" value="${esc(c.palavras_chave.join(', '))}"></label>
        </div>
      </details>

      <details class="sec"${nEnts ? '' : ' open'}><summary>${icon('users', { size: 16 })}Pessoas, resultados, lições e riscos<em>${nEnts}</em></summary>
        <p class="muted small">Revise o que o Radar encontrou e acrescente o que faltou. Isso aparece no detalhe do projeto e ajuda nas buscas.</p>
        <div class="ents-grid">${ELISTS.map((l) => elist(l, c.entidades[l[0]])).join('')}</div>
        ${(user.verValores && c.entidades.valores?.length) || c.pii?.length ? `<div class="ents-grid ro">
          ${user.verValores ? ent('money', 'Valores citados', c.entidades.valores, (e) => `${brl(e.valor)}`) : ''}
          ${ent('shield', 'Dados pessoais (mascarados)', c.pii, (p) => `${esc(p.tipo)}: ${esc(p.valor)}`)}
        </div>` : ''}
      </details>

      <details class="sec"><summary>${icon('eye', { size: 16 })}Texto extraído</summary><pre class="preview">${esc(s.previa)}${job.tamanhoTexto > s.previa.length ? '\n…' : ''}</pre></details>
      <div id="review-msg"></div>
      <div class="dialog-actions">
        <button type="button" id="job-reject" class="btn ghost">${icon('x', { size: 16 })}Descartar</button>
        <button type="submit" class="btn primary">${icon('check', { size: 16 })}Aprovar e indexar</button>
      </div>
    </form>`;
}

function readExtras(form) {
  const entidades = readEntityLists(form);
  return {
    autor: form.x_autor.value, versao: form.x_versao.value, link_origem: form.x_link_origem.value,
    observacoes: form.x_observacoes.value, reutilizavel: form.x_reutilizavel.checked, entidades,
  };
}

function bindReview(job) {
  const form = $('#review');
  const s = job.sugestao.campos;
  bindChipPickers(form);
  const toggleNovo = () => $('#novo-projeto')?.classList.toggle('hidden', form.destino.value !== '__novo');
  bindClientCombo(form);
  $$('input[name=destino]', form).forEach((r) => (r.onchange = toggleNovo));
  toggleNovo();
  $('#quick-ok')?.addEventListener('click', () => form.requestSubmit());
  bindEntityLists(form);
  $$('[data-alt]', form).forEach((b) => (b.onclick = () => { form.querySelector(`[name="${b.dataset.alt}"]`).value = b.value; }));
  $('#job-reject').onclick = async () => { await api('/api/upload/rejeitar', { id: job.id, userId: userId() }); toast('Documento descartado'); loadJobs(); };
  form.onsubmit = async (e) => {
    e.preventDefault();
    const fields = ['tipo_documental', 'titulo', 'status_documento', 'confidencialidade', 'data_conteudo', 'prazo_meses', 'valor', 'margem', 'idioma', 'resumo'];
    const metadados = {};
    // Só envia o que mudou em relação à sugestão: o servidor registra cada mudança como correção (RNF08).
    for (const k of fields) {
      const el = form.querySelector(`[name="${k}"]`);
      if (!el) continue;
      const sugerido = s[k]?.valor ?? '';
      if (String(el.value) !== String(sugerido)) metadados[k] = el.value === '' ? null : el.value;
    }
    const palavras = form.palavras_chave.value.split(',').map((x) => x.trim()).filter(Boolean);
    if (palavras.join(',') !== s.palavras_chave.join(',')) metadados.palavras_chave = palavras;
    const destino = form.destino.value;
    const msg = (html) => { $('#review-msg').innerHTML = html; };
    if (!destino) { msg(`<p class="alert error">${icon('alert', { size: 16 })}<span>Escolha o projeto.</span></p>`); return; }
    const tecnologias = readChips(form, 'tecnologias');
    const servicos = readChips(form, 'servicos');
    const projeto = destino === '__novo'
      ? { modo: 'novo', dados: { ...readProjectFields(form, 'np_'), tecnologias, servicos } }
      : { modo: 'existente', id: destino === '__outro' ? form.outro.value : destino };
    const send = async (forcar) => {
      try {
        const r = await api('/api/upload/confirmar', { id: job.id, userId: userId(), metadados, projeto: { ...projeto, forcar }, tecnologias, servicos, atualizarProjeto: form.atualizarProjeto.checked, extras: readExtras(form) });
        toast(`${r.documento} está na base`);
        state.ctx = await api(`/api/contexto?userId=${userId()}`);
        loadJobs();
      } catch (err) {
        if (err.status === 409 && err.data?.duplicatas) {
          msg(`<p class="alert warn">${icon('alert', { size: 16 })}<span>Já existe: ${err.data.duplicatas.map((d) => `<b>${esc(d.titulo)}</b>`).join(', ')}</span><button type="button" id="force" class="btn sm">Criar mesmo assim</button></p>`);
          $('#force').onclick = () => send(true);
        } else {
          msg(`<p class="alert error">${icon('alert', { size: 16 })}<span>${esc(err.message)}</span></p>`);
        }
      }
    };
    send(false);
  };
}
