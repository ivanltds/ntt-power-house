// One page de case (CR-075) e apresentação de cases (CR-076).
// A prévia mostra a página como vai sair; os blocos são editáveis (a edição vale só para o arquivo, não muda a base).

import { $, $$, esc, api, userId, currentUser, toast, pct } from './common.js';
import { icon } from './icons.js';

const MAX_CASES = 8;

// Baixa a resposta de um POST que devolve arquivo.
async function baixar(url, body, padrao) {
  const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  if (res.status === 401) { location.replace('/login'); return null; }
  if (!res.ok) {
    const j = await res.json().catch(() => ({}));
    const err = new Error(j.erro ?? 'Não foi possível gerar o arquivo.');
    err.naoCase = j.naoCase;
    throw err;
  }
  const nome = decodeURIComponent(res.headers.get('Content-Disposition')?.match(/filename\*=UTF-8''([^;]+)/)?.[1] ?? padrao);
  const href = URL.createObjectURL(await res.blob());
  const a = Object.assign(document.createElement('a'), { href, download: nome });
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(href), 1000);
  return nome;
}

function dialogo(id, cls = 'xl') {
  let d = document.getElementById(id);
  if (!d) {
    d = Object.assign(document.createElement('dialog'), { id, className: cls });
    d.innerHTML = '<div class="op-body"></div>';
    document.body.appendChild(d);
  }
  return d;
}

// ---------- One page ----------
export async function openOnePage(id, { aoGerar } = {}) {
  const dlg = dialogo('onepage-dialog');
  const body = $('.op-body', dlg);
  const st = { citar: false, investimento: false, formato: 'pptx', edicoes: {} };
  body.innerHTML = `<p class="muted">${icon('loader', { size: 16, cls: 'spin' })} Montando a one page…</p>`;
  if (!dlg.open) dlg.showModal();

  const render = async () => {
    let c;
    try {
      c = await api(`/api/onepage?id=${encodeURIComponent(id)}&userId=${userId()}${st.citar ? '&citar=1' : ''}`);
    } catch (err) {
      body.innerHTML = `<p class="alert error">${icon('alert', { size: 16 })}<span>${esc(err.message)}</span></p><div class="dialog-actions"><button type="button" class="btn" data-close>Fechar</button></div>`;
      $('[data-close]', body).onclick = () => dlg.close();
      return;
    }
    const p = c.projeto;
    const texto = (b) => (Object.hasOwn(st.edicoes, b.key) ? st.edicoes[b.key] : b.texto ?? '');
    const bloco = (b, cls = '') => {
      const vazio = !texto(b).trim();
      return `<label class="op-bloco ${cls}${vazio ? ' vazio' : ''}" data-bloco="${b.key}">
        <span class="op-rot">${esc(b.titulo)}${vazio ? `<em>${icon('alert', { size: 12 })}complete antes de enviar</em>` : ''}</span>
        ${b.numeros?.length && !Object.hasOwn(st.edicoes, b.key) ? `<span class="op-nums">${b.numeros.map((n) => `<b>${esc(n)}</b>`).join('')}</span>` : ''}
        <textarea rows="4" maxlength="700" data-ed="${b.key}" placeholder="Não há registro de ${esc(b.titulo.toLowerCase())} neste projeto. Escreva aqui se tiver a informação.">${esc(texto(b))}</textarea>
      </label>`;
    };
    const B = Object.fromEntries(c.blocos.map((b) => [b.key, b]));
    const selos = B.solucao.selos ?? [];
    body.innerHTML = `
      <header class="dlg-head"><div><span class="sub">${esc(p.id)} · ${esc(p.status)}${p.confidencial ? ` · ${icon('lock', { size: 13 })}confidencial` : ''}</span><h3>One page de case</h3></div>
        <button type="button" class="icon-btn" data-close title="Fechar">${icon('x')}</button></header>
      ${c.avisos.map((a) => `<p class="alert warn">${icon('alert', { size: 16 })}<span>${esc(a)}</span></p>`).join('')}
      <div class="op-opcoes">
        <label class="${c.podeCitar ? '' : 'off'}" title="${c.podeCitar ? 'Use só se o cliente autorizou ser citado' : p.confidencial ? 'Projeto confidencial: o nome do cliente não pode aparecer' : 'Só o gestor pode citar o nome do cliente'}">
          <input type="checkbox" data-op="citar"${st.citar ? ' checked' : ''}${c.podeCitar ? '' : ' disabled'}> Citar o nome do cliente</label>
        ${c.verValores ? `<label title="O investimento só entra se você marcar"><input type="checkbox" data-op="investimento"${st.investimento ? ' checked' : ''}> Incluir investimento</label>` : ''}
        <span class="exp-formatos" role="radiogroup" aria-label="Formato">${[['pptx', 'PowerPoint'], ['pdf', 'PDF']].map(([k, l]) => `<label class="${k === st.formato ? 'on' : ''}"><input type="radio" name="op-formato" value="${k}"${k === st.formato ? ' checked' : ''}>${l}</label>`).join('')}</span>
      </div>
      <div class="op-folha">
        <div class="op-cab${c.ehCase ? '' : ' interno'}">
          <small>${c.ehCase ? 'CASE' : 'REFERÊNCIA INTERNA · NÃO É UM CASE'}</small>
          <strong>${esc(p.titulo)}</strong>
          <span>${esc([p.cliente, p.segmento && `Setor: ${p.segmento}`, p.duracao && `Duração: ${p.duracao}`, p.status].filter(Boolean).join(' · '))}</span>
          ${c.ehCase ? '' : '<em class="op-selo">USO INTERNO</em>'}
        </div>
        <div class="op-grade">
          ${bloco(B.contexto)}${bloco(B.desafio)}${bloco(B.objetivo)}
          ${bloco(B.solucao, 'dupla')}
          <div class="op-bloco op-selos"><span class="op-rot">Tecnologias e serviços</span><div class="chips">${selos.length ? selos.map((s) => `<span class="chip">${esc(s)}</span>`).join('') : '<span class="muted small">Não há registro</span>'}</div></div>
          ${bloco(B.beneficios)}${bloco(B.resultados, st.investimento && B.investimento ? 'destaque' : 'dupla destaque')}
          ${st.investimento && B.investimento ? bloco(B.investimento) : ''}
        </div>
        <p class="op-fontes">${icon('file', { size: 12 })}${c.fontes.length ? `Fonte: ${c.fontes.map((f) => esc([f.titulo, f.tipo, f.confianca, f.versao, f.data].filter(Boolean).join(', '))).join(' · ')} · ficha ${esc(p.id)} no Radar` : `Fonte: ficha ${esc(p.id)} no Radar (sem documentos)`}</p>
      </div>
      <p class="muted small">${icon('info', { size: 13 })} As edições valem só para este arquivo e não mudam a base. A IA não cria números: o que não está na base fica marcado para você completar.</p>
      <div id="op-msg"></div>
      <div class="dialog-actions">
        <button type="button" class="btn ghost" data-close>Cancelar</button>
        <button type="button" class="btn primary" data-gerar>${icon('download', { size: 16 })}${c.ehCase ? `Baixar ${st.formato === 'pptx' ? 'PowerPoint' : 'PDF'}` : 'Gerar mesmo assim como referência interna'}</button>
      </div>`;
    $$('[data-close]', body).forEach((b) => (b.onclick = () => dlg.close()));
    $$('[data-ed]', body).forEach((t) => (t.oninput = () => {
      st.edicoes[t.dataset.ed] = t.value;
      t.closest('.op-bloco').classList.toggle('vazio', !t.value.trim());
    }));
    $('[data-op=citar]', body)?.addEventListener('change', (e) => { st.citar = e.target.checked; render(); });
    $('[data-op=investimento]', body)?.addEventListener('change', (e) => { st.investimento = e.target.checked; render(); });
    $$('input[name=op-formato]', body).forEach((r) => (r.onchange = () => { st.formato = r.value; render(); }));
    $('[data-gerar]', body).onclick = async (e) => {
      const btn = e.currentTarget;
      btn.disabled = true;
      btn.innerHTML = `${icon('loader', { size: 16, cls: 'spin' })}Gerando…`;
      try {
        await baixar('/api/onepage/exportar', { id, userId: userId(), formato: st.formato, citar: st.citar, investimento: st.investimento, interno: !c.ehCase, blocos: st.edicoes }, `one-page.${st.formato}`);
        dlg.close();
        toast('One page gerada');
        aoGerar?.();
      } catch (err) {
        $('#op-msg', body).innerHTML = `<p class="alert error">${icon('alert', { size: 16 })}<span>${esc(err.message)}</span></p>`;
        btn.disabled = false;
        btn.innerHTML = `${icon('download', { size: 16 })}Tentar de novo`;
      }
    };
  };
  await render();
}

// ---------- Apresentação de cases ----------
// dados: { tema, candidatos, removidos, internos, semGanhos, ampliado } (resposta do chat ou de /api/apresentacao/cases).
export async function openApresentacao({ tema = '', ids = null, dados = null, para = '' } = {}) {
  const dlg = dialogo('deck-dialog', 'wide');
  const body = $('.op-body', dlg);
  if (!dlg.open) dlg.showModal();
  if (!dados) {
    body.innerHTML = `<p class="muted">${icon('loader', { size: 16, cls: 'spin' })} Procurando cases ganhos…</p>`;
    try {
      dados = await api('/api/apresentacao/cases', { userId: userId(), tema, ids: ids ?? undefined });
    } catch (err) {
      body.innerHTML = `<p class="alert error">${icon('alert', { size: 16 })}<span>${esc(err.message)}</span></p><div class="dialog-actions"><button type="button" class="btn" data-close>Fechar</button></div>`;
      $('[data-close]', body).onclick = () => dlg.close();
      return;
    }
  }
  const st = { lista: dados.candidatos.map((c) => ({ ...c })), formato: 'pptx', aprendizados: false, tema: dados.tema || tema, para };
  const render = () => {
    const marcados = st.lista.filter((c) => c.marcado).length;
    const total = marcados + 3 + (st.aprendizados ? 1 : 0);
    body.innerHTML = `
      <header class="dlg-head"><div><span class="sub">Apresentação de cases</span><h3>${esc(st.tema ? `Cases em ${st.tema}` : 'Cases da lista')}</h3></div>
        <button type="button" class="icon-btn" data-close title="Fechar">${icon('x')}</button></header>
      ${dados.removidos ? `<p class="alert warn">${icon('info', { size: 16 })}<span>${dados.removidos} ${dados.removidos === 1 ? 'projeto parecido ficou' : 'projetos parecidos ficaram'} de fora porque não ${dados.removidos === 1 ? 'é case ganho' : 'são cases ganhos'} (status em aberto, perdida ou cancelada). Perdidas só entram no slide de aprendizados, que é interno.</span></p>` : ''}
      ${dados.semGanhos ? `<p class="alert warn">${icon('alert', { size: 16 })}<span>Não achei case ganho sobre "${esc(st.tema)}". O Radar não monta material para cliente sem prova.${st.lista.length ? ' Abaixo estão cases ganhos parecidos só nas palavras: marque só se servirem.' : ''}${dados.internos?.length ? ` Para consulta interna: ${dados.internos.map((x) => `${esc(x.titulo)} (${esc(x.status)})`).join('; ')}.` : ''}</span></p>` : dados.ampliado ? `<p class="alert warn">${icon('info', { size: 16 })}<span>Achei poucos cases ganhos. Os que dizem "parecido só nas palavras" vêm desmarcados: confira antes de incluir.</span></p>` : ''}
      <div class="form-grid">
        <label class="span2">Tema<input name="tema" value="${esc(st.tema)}" maxlength="80" placeholder="ex.: fraude em seguros"></label>
        <label>Para quem é (opcional)<input name="para" value="${esc(st.para)}" maxlength="80" placeholder="Cliente ou área"></label>
      </div>
      <h5 class="sect-title">${icon('layers', { size: 16 })}Cases na apresentação <em class="muted small">${marcados} de no máximo ${MAX_CASES} · ${total} slides</em></h5>
      ${st.lista.length ? `<ol class="deck-lista">${st.lista.map((c, i) => `
        <li class="${c.marcado ? 'on' : ''}">
          <label><input type="checkbox" data-i="${i}"${c.marcado ? ' checked' : ''}>
            <span><b>${esc(c.titulo)}</b><small>${esc(c.cliente)} · ${esc(c.segmento ?? '')} · ${esc(c.status)}${c.similaridade != null ? ` · ${pct(c.similaridade)} parecido` : ''}</small><small class="muted">${esc(c.motivo ?? '')}</small></span></label>
          <span class="deck-mover"><button type="button" class="icon-btn sm" data-up="${i}" title="Subir"${i === 0 ? ' disabled' : ''}>${icon('chevronUp', { size: 14 })}</button><button type="button" class="icon-btn sm" data-down="${i}" title="Descer"${i === st.lista.length - 1 ? ' disabled' : ''}>${icon('chevronDown', { size: 14 })}</button></span>
        </li>`).join('')}</ol>` : '<p class="muted">Nenhum case ganho para mostrar.</p>'}
      <p class="muted small">${icon('info', { size: 13 })} Estrutura: capa, "O que a NTT DATA já fez em ${esc(st.tema || '…')}" (números contados na base), uma one page por case (cliente anônimo) e fontes.</p>
      <div class="op-opcoes">
        <label title="Lições dos cases escolhidos, num slide marcado como uso interno"><input type="checkbox" data-aprend${st.aprendizados ? ' checked' : ''}> Incluir slide de aprendizados (uso interno)</label>
        <span class="exp-formatos" role="radiogroup" aria-label="Formato">${[['pptx', 'PowerPoint'], ['pdf', 'PDF']].map(([k, l]) => `<label class="${k === st.formato ? 'on' : ''}"><input type="radio" name="deck-formato" value="${k}"${k === st.formato ? ' checked' : ''}>${l}</label>`).join('')}</span>
      </div>
      <div id="deck-msg"></div>
      <div class="dialog-actions">
        <button type="button" class="btn ghost" data-close>Cancelar</button>
        <button type="button" class="btn primary" data-gerar${marcados ? '' : ' disabled'}>${icon('download', { size: 16 })}Gerar apresentação</button>
      </div>`;
    const keep = () => { st.tema = $('[name=tema]', body).value; st.para = $('[name=para]', body).value; };
    $$('[data-close]', body).forEach((b) => (b.onclick = () => dlg.close()));
    $$('[data-i]', body).forEach((cb) => (cb.onchange = () => {
      keep();
      const c = st.lista[Number(cb.dataset.i)];
      if (cb.checked && st.lista.filter((x) => x.marcado).length >= MAX_CASES) { cb.checked = false; toast(`No máximo ${MAX_CASES} cases por apresentação.`, 'warn'); return; }
      c.marcado = cb.checked;
      render();
    }));
    const mover = (i, d) => { keep(); const [x] = st.lista.splice(i, 1); st.lista.splice(i + d, 0, x); render(); };
    $$('[data-up]', body).forEach((b) => (b.onclick = () => mover(Number(b.dataset.up), -1)));
    $$('[data-down]', body).forEach((b) => (b.onclick = () => mover(Number(b.dataset.down), 1)));
    $('[data-aprend]', body).onchange = (e) => { keep(); st.aprendizados = e.target.checked; render(); };
    $$('input[name=deck-formato]', body).forEach((r) => (r.onchange = () => { keep(); st.formato = r.value; render(); }));
    $('[data-gerar]', body).onclick = async (e) => {
      keep();
      const btn = e.currentTarget;
      btn.disabled = true;
      btn.innerHTML = `${icon('loader', { size: 16, cls: 'spin' })}Gerando…`;
      try {
        await baixar('/api/apresentacao/exportar', { userId: userId(), ids: st.lista.filter((c) => c.marcado).map((c) => c.projeto_id), tema: st.tema, para: st.para, formato: st.formato, aprendizados: st.aprendizados }, `cases.${st.formato}`);
        dlg.close();
        toast('Apresentação gerada');
      } catch (err) {
        $('#deck-msg', body).innerHTML = `<p class="alert error">${icon('alert', { size: 16 })}<span>${esc(err.message)}</span></p>`;
        btn.disabled = false;
        btn.innerHTML = `${icon('download', { size: 16 })}Tentar de novo`;
      }
    };
  };
  render();
}

export const podeVerValores = () => Boolean(currentUser()?.verValores);
