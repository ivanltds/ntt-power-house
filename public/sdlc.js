// Tela "Processo SDLC": como esta versão foi construída (fluxo ntt-power-house, orquestrado pelo Maestro),
// por que o fluxo é iterativo e incremental, como usamos SDD e em que ponto a demanda radar-propostas-cases está.
// Fonte: docs/sdlc/execucoes/radar-propostas-cases/STATUS.md e DECISIONS.md do repositório ntt-power-house.
// Atualize o bloco de dados abaixo a cada gate aprovado, incremento entregue ou decisão registrada.
// Estamos no MVP 0 (POC): o protótipo exercitou na prática as etapas de NB-04 a QA-03, antes do gate NB-03.
// Os gates formais dessas etapas são registrados no ciclo do MVP 1, após o Go do comitê.

import { icon } from './icons.js';
import { render, flow, steps, tip, table } from './ajuda.js';

// ---------- Dados (espelho do STATUS.md do Maestro) ----------
const FONTE = {
  atualizadoEm: '03/11/2026',
  demanda: 'radar-propostas-cases',
  arquivo: 'docs/sdlc/execucoes/radar-propostas-cases/STATUS.md',
  branch: 'sdlc/negocio/nb-03/radar-propostas-cases',
  po: 'Ivan Lucio Teles de Souza',
};

const FASES = [
  ['negocio', '1. Negócio', 'Transformar a ideia em oportunidade compreendida, especificada, viável e desenhada.'],
  ['dev', '2. Desenvolvimento', 'Transformar o pacote aprovado em solução implementada e revisada.'],
  ['qa', '3. Testes e entrega', 'Validar qualidade, comportamento, aceite do negócio e entregar com controle.'],
];

// status: aprovado (gate formal) | aprovacao (gate em aprovação) | poc (executada na POC) | parcial (parcial na POC) | pendente
// poc: o que a POC (MVP 0) entregou na etapa.
const ETAPAS = [
  { cod: 'NB-01', fase: 'negocio', nome: 'Ideação & Discovery', status: 'aprovado', aprovador: 'PO', data: '29/10/2026', faz: 'Problema, stakeholders, hipótese, riscos, métricas de sucesso e recorte MoSCoW.', saida: 'NB-01-discovery.md', quem: 'Product Owner / Sponsor' },
  { cod: 'NB-02', fase: 'negocio', nome: 'Especificação de Requisitos', status: 'aprovado', aprovador: 'PO', data: '29/10/2026', faz: 'Requisitos funcionais e não funcionais, casos de uso e critérios de aceite testáveis.', saida: 'NB-02-especificacao-requisitos.md + adendos', quem: 'Product Owner / BA líder' },
  { cod: 'NB-03', fase: 'negocio', nome: 'Viabilidade & Priorização', status: 'aprovacao', aprovador: 'Comitê do time', faz: 'Esforço, custo-benefício, riscos, faseamento e recomendação Go / No-Go.', saida: 'NB-03-viabilidade.md (Go com ressalvas)', quem: 'Sponsor / Comitê' },
  { cod: 'NB-04', fase: 'negocio', nome: 'UI/UX Design', status: 'poc', poc: 'Telas navegáveis de chat, envio, revisão, projetos e exportação; tema claro/escuro com contraste verificado; versão para celular.', faz: 'Jornadas, fluxos, wireframes, usabilidade e acessibilidade.', saida: 'NB-04-ui-ux.md', quem: 'PO / Designer' },
  { cod: 'DEV-01', fase: 'dev', nome: 'Arquitetura & Design Técnico', status: 'poc', poc: 'Node sem dependências, SQLite + FTS5, base vetorial local, DeepSeek com fallback e modelo de permissões; MER registrado como insumo.', faz: 'Componentes, integrações, dados, segurança, observabilidade e ADRs.', saida: 'DEV-01-arquitetura.md', quem: 'Arquiteto / Tech Lead' },
  { cod: 'DEV-02', fase: 'dev', nome: 'Plano de Testes BDD', status: 'poc', poc: 'Critérios de aceite em formato Dado / Quando / Então em cada caso de uso dos adendos.', faz: 'Critérios de aceite em cenários Gherkin com matriz de rastreabilidade.', saida: '.feature / plano de testes', quem: 'QA Lead / Tech Lead' },
  { cod: 'DEV-03', fase: 'dev', nome: 'Implementação / TDD', status: 'poc', poc: 'App completo: busca conversacional, envio multiformato, cadastro, exploração, insights, exportação, permissões e registro de atividades.', faz: 'Código conforme arquitetura e cenários aprovados, com testes unitários.', saida: 'Código + DEV-03-implementacao.md', quem: 'Tech Lead / Dev sênior' },
  { cod: 'DEV-04', fase: 'dev', nome: 'Code Review & Qualidade', status: 'poc', poc: 'Revisão a cada incremento, verificação de contraste WCAG nos dois temas e regras de permissão checadas no servidor.', faz: 'Revisão de arquitetura, segurança, legibilidade, análise estática e testes.', saida: 'DEV-04-code-review.md', quem: 'Revisores (CODEOWNERS)' },
  { cod: 'QA-01', fase: 'qa', nome: 'Testes Automatizados', status: 'poc', poc: '52 testes automatizados (node:test) cobrindo extração, permissões, busca, envio, edição e exportação.', faz: 'Testes unitários e de integração, cobertura e rastreabilidade.', saida: 'QA-01-testes-automatizados.md', quem: 'QA Lead / Tech Lead' },
  { cod: 'QA-02', fase: 'qa', nome: 'Homologação Funcional', status: 'poc', poc: 'Testes manuais no navegador (computador e celular) a cada incremento e testes do time no ambiente publicado.', faz: 'Testes manuais, exploratórios e ponta a ponta com evidências.', saida: 'QA-02-homologacao.md', quem: 'Analista de QA' },
  { cod: 'QA-03', fase: 'qa', nome: 'CI/CD e Staging', status: 'parcial', poc: 'Ambiente de demonstração na AWS (Caddy, systemd, login). Falta pipeline de CI/CD e artefato versionado.', faz: 'Pipeline, build, artefato versionado e deploy em staging.', saida: 'QA-03-cicd.md', quem: 'Tech Lead / DevOps' },
  { cod: 'QA-04', fase: 'qa', nome: 'UAT / Avaliação de Negócio', status: 'pendente', faz: 'Aceite com usuários e validação das métricas do discovery.', saida: 'QA-04-uat.md', quem: 'PO / Usuário-chave' },
  { cod: 'QA-05', fase: 'qa', nome: 'Deploy / Release em Produção', status: 'pendente', faz: 'Entrega controlada, rollback, smoke test e registro pós-deploy.', saida: 'QA-05-deploy.md + tag', quem: 'Tech Lead / Operações' },
];

// Incrementos da POC: cada um passou pelo ciclo especificar → construir → testar → publicar → feedback.
const INCREMENTOS = [
  ['1', 'Base da busca', 'Busca semântica em Node puro, base vetorial local e dados fictícios de projetos.', 'NB-02 (UC03)', '—'],
  ['2', 'IA e memória', 'Análise semântica com DeepSeek, memória de conversa, conversas salvas e favoritas.', 'Adendo 2 (UC03.16, UC05, UC06)', 'DEC-0007'],
  ['3', 'Base real', 'Envio multiformato com extração de metadados, revisão humana, cadastro de projetos, filtros, insights e MER.', 'Adendo 3 (UC02, UC07–UC09) + MER', 'DEC-0008'],
  ['4', 'Experiência e publicação', 'Interface enxuta, celular, login, publicação na AWS, detalhe do projeto, download, edição de documentos, foco por projeto, tema claro/escuro.', 'UC02.15, UC07.4, ajustes de UX', '—'],
  ['5', 'Governança', 'Exportação de proposta (PPTX/DOCX/PDF), permissões por perfil, registro de atividades e aviso de dados sensíveis.', 'Adendo 4 (UC10, UC11, RN-V0-01)', 'a registrar'],
  ['6', 'Feedbacks do teste', 'Chat por intenção (listagem, contagem, ficha, comparação, ferramentas da IA), mascaramento automático com boas-vindas e card de projeto com segmento, kit, porte e relação com o cliente.', 'Adendo 5 (UC03.17–UC03.23, UC13, UC12 parcial)', 'a registrar'],
];

const DECISOES = [
  ['DEC-0001', '21/10/2026', 'Escopo', 'Recorte inicial do MVP: propostas e cases, upload manual com revisão, busca conversacional com score explicável.', 'aprovado'],
  ['DEC-0002', '21/10/2026', 'Processo', 'Exceção: NB-02 produzida antes do gate NB-01, para avaliação conjunta.', 'aprovado'],
  ['DEC-0003', '21/10/2026', 'Escopo', 'Busca conversacional (UC03) detalhada em 15 sub-casos; memória, feedback e conflito de fontes viram requisitos.', 'aprovado'],
  ['DEC-0004', '29/10/2026', 'Governança', 'Ivan Lucio Teles de Souza definido como Product Owner e aprovador dos gates de negócio.', 'aprovado'],
  ['DEC-0005', '29/10/2026', 'Gate', 'Gate NB-01 aprovado.', 'aprovado'],
  ['DEC-0006', '29/10/2026', 'Gate', 'Gate NB-02 aprovado.', 'aprovado'],
  ['DEC-0007', '29/10/2026', 'Exceção', 'POC com IA real (DeepSeek), memória de conversa e conversas salvas.', 'aprovacao'],
  ['DEC-0008', '29/10/2026', 'Exceção', 'POC com upload real, metadados, cadastro de projetos, filtros, insights e base relacional (SQLite).', 'aprovacao'],
];

const ST = {
  aprovado: ['checkCircle', 'Gate aprovado'], aprovacao: ['clock', 'Gate em aprovação'], poc: ['radar', 'Executada na POC'],
  parcial: ['radar', 'Parcial na POC'], pendente: ['history', 'Pendente'], local: ['alert', 'Fora do repositório'],
};
const chip = (s) => `<span class="sd-st s-${s}">${icon(ST[s][0], { size: 13 })}${ST[s][1]}</span>`;
const legenda = () => `<p class="sd-legenda">${['aprovado', 'aprovacao', 'poc', 'parcial', 'pendente'].map(chip).join(' ')}</p>`;

// ---------- Blocos ----------
function board() {
  return `<div class="sd-board">${FASES.map(([id, nome, desc]) => `
    <section class="sd-fase"><header><b>${nome}</b><small>${desc}</small></header>
      <ol>${ETAPAS.filter((e) => e.fase === id).map((e) => `
        <li class="sd-etapa s-${e.status}"${e.poc ? ` title="${e.poc}"` : ''}>
          <span class="sd-cod">${e.cod}</span>
          <span class="sd-nome">${e.nome}</span>
          ${chip(e.status)}
          ${e.data ? `<small>${e.aprovador} · ${e.data}</small>` : e.status === 'aprovacao' ? `<small>aguardando ${e.aprovador.toLowerCase()}</small>` : e.poc ? '<small>gate formal no MVP 1</small>' : ''}
        </li>`).join('')}</ol>
    </section>`).join('')}</div>`;
}

function progresso() {
  const gates = ETAPAS.filter((e) => e.status === 'aprovado').length;
  const exercitadas = ETAPAS.filter((e) => e.status !== 'pendente').length;
  const atual = ETAPAS.find((e) => e.status === 'aprovacao');
  return `<div class="sd-progress">
    <div class="sd-progress-top"><b>MVP 0 (POC): ${exercitadas} de ${ETAPAS.length} etapas exercitadas</b><span>${gates} gates formais aprovados</span></div>
    <div class="sd-bar" role="img" aria-label="${exercitadas} de ${ETAPAS.length} etapas exercitadas">${ETAPAS.map((e) => `<i class="s-${e.status}" title="${e.cod} · ${ST[e.status][1]}"></i>`).join('')}</div>
    <p>Gate que destrava o próximo ciclo: <b>${atual.cod} — ${atual.nome}</b> ${chip(atual.status)}</p>
    ${legenda()}
  </div>`;
}

const ciclo = () => `<div class="sd-loop" aria-label="Ciclo de cada incremento">${[
  ['file', 'Especificar', 'caso de uso + critérios de aceite'],
  ['user', 'Revisar', 'PO valida a especificação'],
  ['cpu', 'Construir', 'implementação a partir da spec'],
  ['checkCircle', 'Testar', 'automatizado + manual'],
  ['upload', 'Publicar', 'ambiente de demonstração'],
  ['message', 'Feedback', 'time e PO usam e ajustam'],
].map(([ic, t, d], i) => `<div class="sd-loop-step"><span>${i + 1}</span>${icon(ic, { size: 18 })}<b>${t}</b><small>${d}</small></div>`).join('')}
  <div class="sd-loop-back">${icon('history', { size: 15 })}o feedback vira a especificação do próximo incremento</div></div>`;

// ---------- Seções ----------
const SECOES = [
  ['agora', 'gauge', 'Onde estamos', () => `
    <p class="muted small">Demanda <code>${FONTE.demanda}</code> · fonte: <code>${FONTE.arquivo}</code> mantido pelo Maestro · atualizado em ${FONTE.atualizadoEm}.</p>
    <div class="sd-ciclo">${icon('radar', { size: 22 })}<div><b>Estamos no MVP 0: uma POC.</b> Ela percorreu o fluxo inteiro de forma compacta, em 6 incrementos: telas, arquitetura, implementação, revisão e testes, até um ambiente de demonstração. Assim o comitê decide o NB-03 testando algo real. Depois do Go, o <b>MVP 1</b> percorre de novo as mesmas etapas, agora com os gates formais e usando a POC como insumo.</div></div>
    ${progresso()}
    <h4>Situação atual</h4>
    ${table(['Etapa', 'Situação'], [
      ['NB-01 Discovery', `${chip('aprovado')} Aprovado pelo PO em 29/10/2026 (DEC-0005).`],
      ['NB-02 Requisitos', `${chip('aprovado')} Aprovado pelo PO em 29/10/2026 (DEC-0006), avaliado junto com NB-01 (exceção DEC-0002).`],
      ['NB-03 Viabilidade', `${chip('aprovacao')} Recomendação <b>Go com ressalvas</b>: MVP em duas ondas, LLM DeepSeek, PO como curador. Decisão do <b>comitê do time após apresentação e testes</b> desta POC.`],
      ['NB-04 a DEV-04', `${chip('poc')} Executadas na POC: telas, arquitetura, critérios de aceite, implementação e revisão. Gate formal no MVP 1.`],
      ['QA-01 e QA-02', `${chip('poc')} 52 testes automatizados e testes manuais no navegador e pelo time.`],
      ['QA-03', `${chip('parcial')} Ambiente de demonstração na AWS; falta pipeline de CI/CD.`],
      ['QA-04 e QA-05', `${chip('pendente')} UAT com usuários reais e deploy em produção ficam para o MVP 1.`],
    ])}
    <h4>Próximos ciclos</h4>
    ${flow([
      ['MVP 0 · POC', 'apresentação e testes do comitê', 'eye', true],
      ['Gate NB-03', 'Go / Go com ressalvas / No-Go', 'user'],
      ['MVP 1 · Onda 1', 'NB-04 a QA-05 com gates formais', 'layers'],
      ['MVP 1 · Onda 2', 'experiência conversacional', 'message'],
    ])}
    ${tip('O Go no NB-03 não leva a POC para produção: ele libera o ciclo do MVP 1, que formaliza cada etapa a partir do que a POC já produziu.')}
    <h4>Pendências para seguir o processo</h4>
    <ul class="sd-pend">
      <li>${chip('aprovacao')} <b>Gate NB-03:</b> decisão do comitê após a apresentação e os testes.</li>
      <li>${chip('aprovacao')} <b>Adendos da POC (DEC-0007 e DEC-0008):</b> validação pelo comitê junto com NB-03.</li>
      <li>${chip('local')} <b>Adendo 4</b> (exportação, permissões, registro de atividades e aviso de dados sensíveis): especificado no protótipo, ainda sem decisão no <code>DECISIONS.md</code> e sem cópia no repositório.</li>
      <li>${chip('local')} <b>STATUS.md do repositório:</b> ainda mostra NB-04 a QA-05 como "Pendente". Falta registrar que a POC exercitou essas etapas.</li>
      <li>${chip('local')} <b>Publicação no CI:</b> a branch <code>${FONTE.branch}</code> tem commits locais ainda não enviados e não há Pull Request aberto para NB-03.</li>
      <li>${chip('local')} <b>Documentação do processo:</b> a tabela do <code>SOURCE_OF_TRUTH.md</code> ainda lista 10 etapas; o README e o STATUS usam 13.</li>
    </ul>`],

  ['processo', 'layers', 'Como o processo funciona', () => `
    <p>O Radar é construído com o <b>SDLC do ntt-power-house</b>: um processo orientado por agentes de IA, com <b>gates bloqueantes</b>, <b>aprovação humana obrigatória</b> e rastreabilidade no CI. O fluxo é <b>iterativo</b> (o ciclo se repete) e a construção é <b>incremental</b> (cada volta entrega uma fatia nova e utilizável). As etapas guiadas por <b>especificações</b> (SDD) garantem que cada fatia nasça de um documento revisado.</p>
    ${tip('<b>Regra principal:</b> a IA prepara artefatos e evidências; uma pessoa responsável aprova ou reprova cada gate. Nenhum agente aprova a própria saída, pula etapa ou avança sem o gate anterior aprovado.')}
    <h4>Quem faz o quê</h4>
    ${flow([
      ['Maestro', 'orquestra: lê o STATUS.md e decide a próxima etapa', 'radar', true],
      ['Agente da etapa', 'gera os artefatos e o checklist técnico', 'sparkles'],
      ['Agente de CI', 'branch, commit, PR e registro', 'link'],
      ['Gate humano', 'aprova, aprova com ressalvas ou reprova', 'user', true],
    ])}
    ${table(['Papel', 'Responsabilidade', 'Nunca faz'], [
      ['<b>Maestro</b>', 'Único com visão ponta a ponta. Mantém o <code>STATUS.md</code>, valida o gate anterior, aciona a etapa seguinte e para para aprovação humana.', 'Aprovar gate, gerar artefato, executar git, mudar a ordem do fluxo'],
      ['<b>Agentes de etapa</b>', 'Um por etapa (NB-01 a QA-05). Geram as saídas previstas e preenchem só o checklist técnico do gate.', 'Sair do próprio escopo ou marcar aprovação humana'],
      ['<b>Agente de CI</b>', 'Materializa o processo no CI: branch <code>sdlc/&lt;fase&gt;/&lt;etapa&gt;/&lt;demanda&gt;</code>, commits com trailers de aprovação, PRs e labels.', 'Decidir conteúdo ou inventar aprovadores'],
      ['<b>Pessoas</b>', 'PO, comitê, arquiteto, QA, operações: aprovam ou reprovam cada gate.', '—'],
    ])}
    <h4>Princípios</h4>
    ${steps([
      '<b>Aprovação humana obrigatória</b> em todo gate, registrada no <code>GATE.md</code> da etapa.',
      '<b>Gates bloqueantes:</b> uma etapa só começa com o gate anterior aprovado.',
      '<b>Rastreabilidade:</b> toda decisão relevante vai para o <code>DECISIONS.md</code> (somente inclusão), com autor, data e justificativa.',
      '<b>CI como sistema de controle:</b> o estado real vive em branches, PRs e commits.',
      '<b>Reprovação</b> volta para a etapa com os apontamentos; um <b>No-Go</b> em NB-03 encerra a demanda.',
    ])}`],

  ['iterativo', 'history', 'Iterativo e incremental', () => `
    <p>O SDLC não é uma cascata executada uma única vez. É um <b>ciclo que se repete</b>, e cada volta entrega um <b>incremento</b>: uma fatia nova do produto, que funciona e pode ser testada. As etapas e os gates continuam valendo em toda volta; o que muda é o tamanho da fatia.</p>
    <h4>O ciclo de cada incremento</h4>
    ${ciclo()}
    <h4>Iterativo: os ciclos da demanda</h4>
    ${table(['Ciclo', 'Objetivo', 'Como percorre o SDLC'], [
      ['<b>MVP 0 · POC</b> (atual)', 'Provar a hipótese do discovery com algo real e apoiar a decisão do NB-03.', 'Todas as etapas de forma compacta, com exceções registradas (DEC-0007, DEC-0008).'],
      ['<b>MVP 1 · Onda 1</b>', 'Validar a hipótese com usuários reais: base, envio, cadastro, busca, feedback e auditoria.', 'NB-04 a QA-05 com gates formais, usando a POC como insumo.'],
      ['<b>MVP 1 · Onda 2</b>', 'Experiência conversacional: memória multi-turno, conflito de fontes, UC04.', 'Novo ciclo curto sobre a base da Onda 1.'],
      ['<b>Evoluções</b>', 'Novas necessidades vindas do uso e das métricas.', 'Cada evolução abre um novo ciclo a partir de NB-01 ou NB-02.'],
    ])}
    <h4>Incremental: as 5 fatias da POC</h4>
    <p>Mesmo dentro do MVP 0 a construção foi incremental. Cada fatia começou por uma especificação, foi construída, testada, publicada e ajustada com o feedback do PO.</p>
    ${table(['#', 'Incremento', 'O que entregou', 'Especificação', 'Decisão'], INCREMENTOS.map(([n, t, o, e, d]) => [`<b>${n}</b>`, `<b>${t}</b>`, o, e, d === 'a registrar' ? chip('local') : d]))}
    ${tip('Cada incremento deixa o produto funcionando. Se um ciclo for interrompido, o que já foi entregue continua utilizável, e o risco fica limitado à fatia em construção.')}`],

  ['sdd', 'file', 'SDD: guiado por especificação', () => `
    <p><b>SDD (Spec-Driven Development)</b> significa que a <b>especificação vem antes do código</b> e é a fonte da verdade. Nada é implementado sem um documento revisado que diga o que fazer, para quem e como saber que está pronto. Com agentes de IA isso é essencial: a IA constrói a partir da spec, e a pessoa revisa a spec, não só o código.</p>
    ${flow([
      ['Especificação', 'caso de uso, regras e critérios de aceite', 'file', true],
      ['Revisão humana', 'PO aprova o que será feito', 'user'],
      ['Implementação', 'agente constrói a partir da spec', 'cpu'],
      ['Verificação', 'testes ligados aos critérios', 'checkCircle'],
    ])}
    <h4>As especificações deste projeto</h4>
    ${table(['Camada', 'Especificação', 'Onde fica'], [
      ['Processo', 'Como cada agente trabalha e o que cada gate exige', '<code>AGENT.md</code> e <code>GATE.md</code> de cada etapa; <code>SOURCE_OF_TRUTH.md</code>'],
      ['Produto', 'Problema, requisitos, casos de uso e critérios de aceite', '<code>NB-01-discovery.md</code>, <code>NB-02-*.md</code> e adendos'],
      ['Dados', 'Entidades, relacionamentos e campos', 'MER (<code>DEV-01-insumo-MER</code>)'],
      ['Regras', 'Regras de negócio e restrições do V0', 'ex.: RN-V0-01 (aviso de dados sensíveis), permissões por perfil'],
      ['Decisões', 'Mudanças de escopo, exceções e aprovações', '<code>DECISIONS.md</code>'],
    ])}
    <h4>Regras do SDD que seguimos</h4>
    ${steps([
      '<b>Primeiro a spec, depois o código.</b> Ex.: exportação, permissões e registro de atividades só foram implementados depois de o adendo 4 ser escrito.',
      '<b>Mudança começa na spec.</b> Para mudar o comportamento de um agente, edita-se primeiro o <code>AGENT.md</code>/<code>GATE.md</code>; para mudar o produto, o caso de uso.',
      '<b>Critérios de aceite testáveis.</b> Cada caso de uso traz critérios no formato Dado / Quando / Então, que viram cenários BDD (DEV-02).',
      '<b>Rastreabilidade spec → teste.</b> Os testes automatizados citam o caso de uso que verificam (ex.: UC08.6, UC10, UC07.4).',
      '<b>Divergência se resolve na spec.</b> Se o código e a spec discordam, decide-se qual está certo e a spec é atualizada primeiro.',
    ])}
    ${tip('No MVP 1, as specs da POC (casos de uso, MER e regras) entram como insumo das etapas formais: o agente de cada etapa parte delas, e o gate humano aprova a versão final.')}`],

  ['etapas', 'grid', 'As 13 etapas', () => `
    <p>Três fases e treze etapas, cada uma com um agente dedicado e um gate humano. As cores mostram o que já tem gate formal e o que foi exercitado na POC (MVP 0).</p>
    ${legenda()}
    ${board()}
    ${table(['Etapa', 'Status', 'O que entrega', 'Saída principal', 'Quem aprova'], ETAPAS.map((e) => [`<b>${e.cod}</b> ${e.nome}`, chip(e.status), e.faz, `<code>${e.saida}</code>`, e.quem]))}
    ${tip('QA-03 só valida o caminho técnico até staging. O deploy em produção acontece apenas em QA-05, depois do aceite de negócio (QA-04).')}`],

  ['poc', 'radar', 'A POC (MVP 0)', () => `
    <p>Este app é o <b>MVP 0</b>: uma POC construída antes do gate NB-03, como exceção registrada (DEC-0007 e DEC-0008). Ela <b>ativou na prática</b> a etapa de UI/UX, todas as de desenvolvimento e parte das de teste, de forma compacta, para o comitê testar a hipótese do discovery com algo real.</p>
    ${board()}
    ${tip('"Executada na POC" não é o mesmo que gate aprovado. Os gates formais de NB-04 a QA-05 são registrados no MVP 1, depois do Go do comitê, aproveitando o que a POC produziu.', 'warn')}
    <h4>O que a POC entregou em cada etapa</h4>
    ${table(['Etapa', 'Status', 'Entrega da POC'], ETAPAS.filter((e) => e.poc).map((e) => [`<b>${e.cod}</b> ${e.nome}`, chip(e.status), e.poc]))}
    <h4>Ondas do MVP (NB-03)</h4>
    ${table(['Onda', 'Escopo', 'Na POC'], [
      ['<b>Onda 1</b> — validar a hipótese (semanas 1–4)', 'Fundação, upload, cadastro, busca conversacional de um turno, feedback e auditoria.', 'Demonstrado.'],
      ['<b>Onda 2</b> — experiência conversacional (semanas 5–6)', 'Memória multi-turno (RF33), resolução de conflito de fontes (RF35), UC04.', 'Memória e conflito de fontes já demonstrados, a pedido do PO.'],
    ])}
    <h4>Restrições válidas na POC</h4>
    <ul>
      <li>Só <b>dados fictícios</b> vão para a DeepSeek até haver aprovação de segurança e jurídico (risco R10).</li>
      <li>Login compartilhado; "Ver como" simula os perfis.</li>
      <li>A VM alvo precisa de Node 22.13 ou superior (risco R11).</li>
    </ul>`],

  ['decisoes', 'bookmark', 'Decisões registradas', () => `
    <p>Log do <code>DECISIONS.md</code> para esta demanda. As decisões são somente de inclusão: uma decisão nova pode substituir outra, mas nunca apagá-la.</p>
    <ol class="sd-timeline">${DECISOES.map(([id, data, tipo, txt, st]) => `
      <li><span class="sd-dot s-${st}"></span><div><b>${id}</b> <span class="sd-tipo">${tipo}</span> <small>${data}</small> ${chip(st)}<p>${txt}</p></div></li>`).join('')}
      <li><span class="sd-dot s-local"></span><div><b>Próxima</b> <span class="sd-tipo">Exceção</span> ${chip('local')}<p>Registrar o incremento 5 da POC (adendo 4: exportação, permissões, registro de atividades e aviso de dados sensíveis) e a situação das etapas exercitadas pela POC, para validação do comitê.</p></div></li>
    </ol>`],
];

export function showSdlc(secao = 'agora') {
  render('Processo SDLC do Radar', `Demanda ${FONTE.demanda} · MVP 0 (POC) · PO ${FONTE.po}`, SECOES, secao);
}
