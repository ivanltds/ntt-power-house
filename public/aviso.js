// Boas-vindas, política de dados e nota de mascaramento (UC13).
// Tom de produto em piloto: boas práticas em linguagem positiva, sem alarme. A proteção real fica no servidor,
// que mascara dados sensíveis antes de gravar ou de enviar texto ao provedor de IA (src/sensitive.js).

import { $, esc, api, userId } from './common.js';
import { icon } from './icons.js';

const CHAVE = 'radar.termo';
const aceitos = new Set();

const BOAS_PRATICAS = [
  ['file', 'Nesta fase piloto, use documentos de exemplo ou públicos.'],
  ['check', 'Revise os metadados sugeridos antes de salvar: a última palavra é sempre sua.'],
  ['message', 'Na dúvida sobre um documento, fale com o curador da base.'],
];
const praticas = () => `<ul class="praticas">${BOAS_PRATICAS.map(([i, t]) => `<li>${icon(i, { size: 16 })}<span>${t}</span></li>`).join('')}</ul>`;

// Único lugar com os detalhes técnicos: provedor, mascaramento e onde os dados ficam.
const politica = () => `<ul class="politica">
  <li><b>Mascaramento automático.</b> Antes de gravar ou de processar com IA, o Radar troca CPF, RG, e-mail, telefone, número de cartão, senhas e chaves por marcadores como <code>[e-mail removido]</code>. Esses dados não ficam nos metadados, na busca nem nas conversas.</li>
  <li><b>Provedor de IA.</b> Nesta fase piloto, a interpretação das perguntas e a sugestão de metadados usam um provedor de IA fora do ambiente NTT (DeepSeek). Ele recebe só o texto já mascarado.</li>
  <li><b>Onde ficam os dados.</b> Banco, índice de busca e arquivos ficam no servidor do piloto, com acesso por login.</li>
  <li><b>Arquivos originais.</b> Arquivos de texto são entregues mascarados no download. PDF, Word, PowerPoint e Excel ficam guardados como foram enviados.</li>
  <li><b>Permissões.</b> Valores e conteúdo confidencial aparecem só para os perfis autorizados.</li>
  <li><b>Registro.</b> O Radar guarda o tipo e a quantidade do que foi mascarado, nunca o valor.</li>
</ul>`;

export function showPolicy() {
  const dlg = $('#sensitive-dialog');
  dlg.onclose = null;
  dlg.innerHTML = `<form method="dialog" class="boas-vindas">
    <header class="dlg-head"><div><span class="sub">Radar · piloto</span><h3>Política de dados</h3></div><button type="submit" class="icon-btn" title="Fechar">${icon('x')}</button></header>
    ${politica()}
    <h4>Boas práticas</h4>${praticas()}
    <div class="dialog-actions"><button type="submit" class="btn primary">Fechar</button></div>
  </form>`;
  dlg.showModal();
}

// Boas-vindas com o termo de uso. Resolve true quando o usuário clica em "Começar".
function showWelcome() {
  const dlg = $('#sensitive-dialog');
  dlg.innerHTML = `<form method="dialog" class="boas-vindas">
    <header class="dlg-head"><div><span class="sub">Radar de Propostas & Cases · piloto</span><h3>Bem-vindo ao Radar</h3></div></header>
    <p class="lead">Encontre propostas e cases parecidos com a sua oportunidade, pergunte em linguagem natural e reaproveite o que a NTT já construiu.</p>
    ${praticas()}
    <details class="politica-det"><summary>Política de dados do piloto</summary>${politica()}</details>
    <p class="muted small">Ao clicar em Começar, você concorda com a política de dados do piloto.</p>
    <div class="dialog-actions"><button type="submit" value="ok" class="btn primary" autofocus>${icon('arrowRight', { size: 16 })}Começar</button></div>
  </form>`;
  return new Promise((resolve) => {
    dlg.returnValue = '';
    dlg.onclose = () => { dlg.onclose = null; resolve(dlg.returnValue === 'ok'); };
    dlg.showModal();
  });
}

async function accept(versao) {
  await api('/api/termo/aceitar', { userId: userId(), versao });
  localStorage.setItem(CHAVE, String(versao));
  aceitos.add(userId());
}

// Primeiro acesso neste navegador (ou termo novo): boas-vindas assim que o app abre.
export async function welcomeOnFirstVisit() {
  const t = await api(`/api/termo?userId=${userId()}`);
  if (t.aceito) aceitos.add(userId());
  if (localStorage.getItem(CHAVE) === String(t.versao) && t.aceito) return;
  if (await showWelcome()) await accept(t.versao);
}

// Antes de enviar, cadastrar ou pedir sugestão: garante o aceite do perfil atual (o servidor também exige).
export async function ensureTerms() {
  if (aceitos.has(userId())) return true;
  const t = await api(`/api/termo?userId=${userId()}`);
  if (t.aceito) { aceitos.add(userId()); return true; }
  if (!(await showWelcome())) return false;
  await accept(t.versao);
  return true;
}

// Erro 428 do servidor (termo pendente, ex.: perfil trocado): mostra as boas-vindas e diz se pode tentar de novo.
export async function handleTermsError(err) {
  if (err?.status !== 428 || !err.data?.termo) return false;
  aceitos.delete(userId());
  return ensureTerms();
}

// Nota leve depois de um cadastro ou sugestão em que algo foi mascarado.
export function maskNote(achados) {
  const total = (achados ?? []).reduce((s, a) => s + a.quantidade, 0);
  if (!total) return '';
  return `<p class="nota-mascara">${icon('shield', { size: 14 })}<span>Removemos ${total} ${total === 1 ? 'dado sensível' : 'dados sensíveis'} (${esc(achados.map((a) => a.tipo).join(', '))}) antes de processar. <a href="#" data-politica-link>Saiba mais</a></span></p>`;
}

// Liga os links "Política de dados" / "Saiba mais" dentro de um container.
export function bindPolicyLinks(root = document) {
  root.querySelectorAll('[data-politica-link]').forEach((a) => (a.onclick = (e) => { e.preventDefault(); showPolicy(); }));
}

export const policyLine = () => `<p class="linha-politica">${icon('shield', { size: 13 })}<span>Dados pessoais e chaves são removidos automaticamente antes do processamento · <a href="#" data-politica-link>Política de dados</a></span></p>`;
