// Versão do Radar e notas da versão (release notes).
// A cada correção entregue, acrescente um item em NOTAS (a versão mais nova primeiro) e, ao fechar
// uma versão, crie uma nova entrada e atualize VERSAO. O selo ao lado do título abre esta tela.
// status do item: 'feito' (no ar) | 'andamento' (sendo corrigido) | 'analise' (investigando a causa)

import { icon } from './icons.js';
import { render, table, tip } from './ajuda.js';
import { SECOES_QUALIDADE } from './qualidade.js';

export const VERSAO = 'V0.0.1';

export const NOTAS = [
  {
    versao: 'V0.0.1',
    data: '05/11/2026',
    estado: 'Em andamento',
    resumo: 'Primeira versão numerada do protótipo. Reúne os ajustes vindos do teste com o time em 03/11 e as correções que estão sendo feitas a partir dele.',
    itens: [
      {
        tipo: 'correcao', status: 'feito', area: 'Chat',
        titulo: 'Pergunta que retoma a resposta anterior ("quais os resultados neles?")',
        antes: 'Depois de "quais as principais empresas de energia que trabalhamos?", a pergunta "quais os resultados neles?" virou uma busca nova de projetos parecidos: trocou o conjunto (trouxe projetos que não estavam na resposta) e misturou recomendação com resultado.',
        depois: 'Palavras como "neles", "deles", "desses" e "nesses projetos" fazem o Radar responder sobre os mesmos projetos da resposta anterior (os mostrados nela ou os que entraram na contagem). Pedido de resultados traz a seção Resultados do case ou da ata de cada projeto, com a fonte, e diz quais ainda não têm resultado registrado. Pedido de campo ("qual o prazo deles?") traz a tabela com esse campo.',
      },
      {
        tipo: 'melhoria', status: 'feito', area: 'Chat',
        titulo: 'Respostas por tipo de pedido (feedback F3)',
        antes: 'Qualquer pergunta virava "projetos semelhantes", mesmo quando o pedido era uma lista, uma contagem ou um dado de um projeto.',
        depois: 'O Radar identifica o pedido e responde com listagem, contagem, ficha do projeto, comparação ou pergunta composta. Números e tabelas vêm do banco, com as permissões do usuário. Quando a pergunta é ambígua, ele oferece opções.',
      },
      {
        tipo: 'melhoria', status: 'feito', area: 'Dados',
        titulo: 'Avisos de dados mais discretos e mascaramento automático (feedback F2)',
        antes: 'Modal e caixa de confirmação a cada envio, com tom de risco.',
        depois: 'Boas-vindas uma vez por perfil e "Política de dados" no menu. CPF, RG, e-mail, telefone, cartão, senhas e chaves são trocados por marcadores antes de gravar e antes de chegar à IA. O envio nunca é bloqueado.',
      },
      {
        tipo: 'melhoria', status: 'feito', area: 'Projetos',
        titulo: 'Card de projeto voltado ao negócio (feedback F1)',
        antes: 'O card destacava tecnologias, pouco úteis para executivos.',
        depois: 'Mostra segmento do cliente, quantos projetos já fizemos com ele, kit de documentos e valor (gestor) ou porte P/M/G/GG (consultor). Tecnologias ficam no detalhe e nos filtros.',
      },
      {
        tipo: 'melhoria', status: 'feito', area: 'Qualidade',
        titulo: 'Feedbacks com código de correção, roteiro de testes e acompanhamento',
        antes: 'Os feedbacks chegavam por mensagem, sem registro nem acompanhamento, e não havia roteiro de testes regressivos.',
        depois: 'Neste menu: "Enviar feedback" abre um ticket CR-xxx com o nome de quem relatou (as capturas de tela vão para a IA descrever o problema e não são guardadas); "Tickets" acompanha e registra o retorno de cada correção; "Roteiro de testes" traz 74 cenários passo a passo (Conversas, Projetos e Envio de arquivos, com prioridade alta ou média), e cada analista escreve o próprio nome em cada cenário; "Acompanhamento" mostra os gráficos. Os resultados zeram a cada versão; os tickets continuam.',
      },
      {
        tipo: 'correcao', status: 'feito', area: 'Métricas',
        titulo: 'Métricas do piloto sem indicadores',
        antes: 'Com o disco do servidor cheio em 05/11, o registro de uma busca foi gravado pela metade. A tela Métricas do piloto passou a falhar ao ler esse registro e ficou sem nenhum indicador.',
        depois: 'Registros incompletos são ignorados no cálculo e os novos começam sempre numa linha nova. Os indicadores voltaram, com todas as buscas e eventos íntegros; só a busca cortada fica de fora.',
      },
      {
        tipo: 'melhoria', status: 'feito', area: 'Qualidade',
        titulo: 'Página de status com link próprio (/status)',
        antes: 'O andamento das versões, dos tickets e das sugestões só aparecia dentro do menu Versão, sem um link para compartilhar.',
        depois: 'O endereço /status (menu → "Página de status") mostra, só para leitura, as versões com o que mudou, os tickets por situação e os feedbacks de melhoria, com filtros, busca, último retorno e gráficos. Usa o mesmo login do Radar.',
      },
      {
        tipo: 'melhoria', status: 'feito', area: 'Qualidade',
        titulo: 'Quadro de tickets: prioridade, edição, kanban e imagens (/tickets)',
        antes: 'O ticket só aceitava retorno e troca de situação; não tinha prioridade, não dava para corrigir título ou descrição, a lista tinha um filtro só e as capturas de tela eram descartadas depois da análise da IA.',
        depois: 'O endereço /tickets (menu → "Tickets") mostra lista e kanban. A lista filtra por situação, tipo, área e prioridade, com busca e ordenação (prioridade, mais recentes, mais antigos, atualizados). No kanban, arrastar o cartão muda a situação. Cada ticket tem prioridade (Crítica, Alta, Média, Baixa ou A definir) e pode ser editado: título, descrição, tipo, área e imagens. As imagens ficam guardadas no ImgBB, fora do servidor; no roteiro de testes, quem marca Falhou ou Bloqueado também pode anexar capturas de evidência, que vão para o ticket do cenário. Toda mudança entra no histórico com o nome de quem fez.',
      },
      {
        tipo: 'melhoria', status: 'feito', area: 'Geral',
        titulo: 'Versão no título e notas da versão',
        antes: 'Não havia como saber qual versão estava no ar nem o que mudou.',
        depois: 'O selo ao lado de "Radar" mostra a versão e abre esta tela.',
      },
    ],
  },
];

export const TIPO = { correcao: ['Correção', 'bug'], melhoria: ['Melhoria', 'sparkle'] };
export const STATUS = { feito: ['No ar', 'ok'], andamento: ['Corrigindo', 'run'], analise: ['Em análise', 'wait'] };

const chip = (s) => `<span class="rn-chip rn-${STATUS[s][1]}">${STATUS[s][0]}</span>`;

const item = (i) => `
  <li class="rn-item">
    <div class="rn-top">${chip(i.status)}<span class="rn-tipo">${TIPO[i.tipo][0]} · ${i.area}</span></div>
    <b>${i.titulo}</b>
    <dl><dt>Antes</dt><dd>${i.antes}</dd><dt>${i.status === 'feito' ? 'Agora' : 'Próximo passo'}</dt><dd>${i.depois}</dd></dl>
  </li>`;

const secao = (n) => [n.versao, 'tag', `${n.versao} · ${n.estado}`, () => {
  const cont = Object.keys(STATUS).map((s) => [STATUS[s][0], n.itens.filter((i) => i.status === s).length]).filter(([, q]) => q);
  return `
    <p class="muted small">Iniciada em ${n.data} · ${cont.map(([t, q]) => `${q} ${t.toLowerCase()}`).join(' · ')}</p>
    <p>${n.resumo}</p>
    <ul class="rn-list">${n.itens.map(item).join('')}</ul>`;
}];

const COMO = ['como', 'info', 'Como ler', () => `
  <p>Cada versão lista o que mudou no Radar, com o comportamento <b>antes</b> e <b>agora</b>.</p>
  ${table(['Situação', 'Significado'], Object.values(STATUS).map(([t, c]) => [`<span class="rn-chip rn-${c}">${t}</span>`, { ok: 'Já está no ambiente publicado.', run: 'Causa conhecida, correção em desenvolvimento.', wait: 'Problema relatado, causa ainda em investigação.' }[c]]))}
  <h4>Feedbacks e testes</h4>
  <p><b>Enviar feedback</b> abre um ticket com código (CR-001, CR-002…). <b>Tickets</b> mostra os abertos e o retorno de cada correção. <b>Roteiro de testes</b> é o checklist regressivo da versão: cada analista marca OK, Falhou ou Bloqueado; uma falha abre um ticket automaticamente. <b>Acompanhamento</b> mostra o andamento em gráficos.</p>
  ${tip('Ao publicar uma versão nova, o roteiro começa zerado para ela. Os tickets não resolvidos continuam abertos e o histórico das versões anteriores fica no Acompanhamento.')}`];

export function showReleaseNotes(v = NOTAS[0].versao) {
  render(`Versão ${VERSAO}`, 'Notas da versão, feedbacks e testes regressivos · protótipo com dados fictícios', [...NOTAS.map(secao), ...SECOES_QUALIDADE, COMO], v);
}
