// Ajuda do Radar: guia de uso passo a passo e explicação técnica (extração, persistência e busca semântica).
// Conteúdo estático; os números citados (pesos, limites, dimensões) refletem o código do V0.

import { $, $$, state } from './common.js';
import { icon } from './icons.js';

// ---------- Blocos de apresentação ----------

// Fluxo desenhado: caixas ligadas por setas. node: [título, detalhe, ícone?, destaque?]
// parallel: caixas lado a lado sem setas (componentes independentes, não etapas).
export const flow = (nodes, { vertical = false, parallel = false } = {}) => `<ol class="flow${vertical ? ' v' : ''}${parallel ? ' parallel' : ''}">${nodes.map(([t, d, ic, hl]) => `
  <li class="node${hl ? ' hl' : ''}">${ic ? icon(ic, { size: 16 }) : ''}<b>${t}</b>${d ? `<small>${d}</small>` : ''}</li>`).join('')}</ol>`;

// Passo a passo numerado.
export const steps = (list) => `<ol class="guide-steps">${list.map((s) => `<li>${s}</li>`).join('')}</ol>`;

export const tip = (html, kind = 'tip') => `<p class="callout ${kind}">${icon(kind === 'warn' ? 'alert' : 'bulb', { size: 16 })}<span>${html}</span></p>`;

export const table = (head, rows) => `<div class="tbl-wrap"><table class="guide-tbl"><thead><tr>${head.map((h) => `<th>${h}</th>`).join('')}</tr></thead>
  <tbody>${rows.map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;

const kbd = (k) => `<kbd>${k}</kbd>`;
const ui = (t) => `<span class="ui">${t}</span>`;

// ---------- Guia de uso ----------

const GUIA = [
  ['inicio', 'radar', 'Primeiros passos', () => `
    <p>O Radar é a memória de propostas e cases da equipe. Ele junta propostas, apresentações, estimativas, atas e cases e
    responde perguntas em linguagem natural, mostrando <b>quais projetos parecidos já fizemos</b> e <b>de onde veio cada informação</b>.</p>
    ${flow([['Perguntar', 'encontre referências', 'message'], ['Projetos', 'explore e abra os detalhes', 'folder'], ['Enviar', 'alimente a base', 'upload'], ['Insights', 'padrões da base', 'chart']])}
    <h4>As 4 áreas</h4>
    ${table(['Área', 'Para que serve', 'Quando usar'], [
      [`${icon('message', { size: 14 })} Perguntar`, 'Chat que busca na base pelo significado da pergunta, não só pelas palavras.', 'Começo de uma proposta: "já fizemos algo assim?"'],
      [`${icon('folder', { size: 14 })} Projetos`, 'Lista de todos os projetos com filtros, detalhe completo e documentos.', 'Quando você sabe o que procura ou quer comparar projetos.'],
      [`${icon('upload', { size: 14 })} Enviar`, 'Envio de arquivos. O Radar lê, preenche os dados e você revisa.', 'Ao terminar uma proposta, ata ou case.'],
      [`${icon('chart', { size: 14 })} Insights`, 'Números da base: segmentos, tecnologias, taxa de ganho, lições.', 'Para entender tendências e preparar argumentos.'],
    ])}
    <h4>Menu ${icon('menu', { size: 14 })}</h4>
    <ul>
      <li><b>Ver como (demonstração):</b> troca o usuário de demonstração (Consultor ou Gestor); o botão de conta, no canto superior direito, mostra quem está ativo (iniciais, nome e perfil); clique nele para trocar. O menu ⋮, ao lado, tem as demais opções. <b>Consultor</b> não vê projetos confidenciais nem o <b>preço e a margem</b> das propostas; os resultados dos cases (ex.: economia gerada para o cliente) aparecem para todos. <b>Gestor</b> vê tudo. "Meus projetos" mostra os projetos em que o usuário é o responsável ou enviou documento. Serve para testar as permissões; some quando houver login individual.</li>
      <li><b>Todos os documentos:</b> lista de arquivos da base com tipo e rótulo de confiança.</li>
      <li><b>Métricas do piloto:</b> indicadores que o comitê usa para avaliar o Radar.</li>
      <li><b>Registro de atividades</b> (só gestor): quem criou, editou, excluiu ou exportou cada item.</li>
      <li><b>Tema:</b> Auto (segue o sistema), Claro ou Escuro.</li>
      <li><b>Processo SDLC:</b> como esta versão foi construída (fases, etapas e gates humanos) e em que ponto a demanda está.</li>
      <li><b>Como o Radar funciona:</b> a explicação técnica, com os fluxos de extração e busca.</li>
      <li><b>Sair:</b> encerra a sessão neste navegador. A sessão dura 7 dias.</li>
    </ul>
    ${tip('Todos os dados desta versão são <b>fictícios</b>. Pode testar à vontade: perguntar, enviar arquivos e editar não afeta nenhum cliente real.')}`],

  ['perguntar', 'message', 'Perguntar ao Radar', () => `
    <p>Escreva como falaria com um colega. O Radar entende sinônimos e o sentido da frase: "distribuidora de luz" encontra projetos de <i>Utilities / Energia</i>.</p>
    ${steps([
      `Clique em ${ui('Perguntar')} e digite no campo de baixo. ${kbd('Enter')} envia.`,
      'Leia a resposta curta no topo: ela resume as referências e cita os projetos como <b>[P001]</b>.',
      'Abaixo vêm os <b>cartões de projeto</b>, do mais parecido para o menos. Clique em um cartão para ver o porquê e as fontes.',
      'Use as ações do cartão para reaproveitar (veja abaixo) e avalie com 👍 ou 👎.',
    ])}
    <h4>Bons exemplos de pergunta</h4>
    ${table(['Objetivo', 'Pergunta'], [
      ['Achar referência', '<i>"Propostas de utilities com Databricks"</i>'],
      ['Checar experiência', '<i>"Já fizemos fraude em seguros?"</i>'],
      ['Aprender com perdas', '<i>"Propostas perdidas e o que aprendemos"</i>'],
      ['Estimar', '<i>"Quanto tempo levou um projeto de churn?"</i> (valores só para gestor)'],
      ['Riscos', '<i>"Que riscos aparecem em projetos de IA generativa?"</i>'],
    ])}
    <h4>Como ler um cartão</h4>
    <ul>
      <li><b>Muito parecido / Parecido / Relacionado:</b> o quanto o projeto combina com a pergunta. Passe o mouse para ver o percentual.</li>
      <li><b>Por que apareceu:</b> ao abrir o cartão, a frase de justificativa e os fatores (conteúdo, segmento, tecnologias, serviços, porte, status).</li>
      <li><b>Fontes:</b> os documentos de onde veio cada informação, com rótulo de confiança: <b>Oficial</b> (proposta aprovada, SOW), <b>Enviado</b> (proposta, case), <b>Interno</b> (estimativa, ata), <b>Informal</b> (transcrição, e-mail), <b>Rascunho</b>.</li>
      <li><b>dados divergentes:</b> dois documentos discordam (ex.: prazo de 5 e de 6 meses). O Radar mostra o valor da fonte mais confiável.</li>
    </ul>
    <h4>Reaproveitar</h4>
    ${table(['Ação', 'O que faz'], [
      [`${icon('folder', { size: 14 })} Abrir projeto`, 'Abre o detalhe completo, com todos os documentos.'],
      [`${icon('copy', { size: 14 })} Copiar escopo`, 'Copia o título, o cliente e a seção de escopo do projeto para colar na sua proposta.'],
      [`${icon('duplicate', { size: 14 })} Usar como base`, 'Abre o cadastro de um projeto novo já preenchido com segmento, tecnologias, serviços, prazo e objetivo do escolhido.'],
    ])}
    <h4>Conversa com memória</h4>
    <p>O Radar lembra as últimas <b>8 perguntas</b> da conversa (aparece "lembrando N perguntas"). Por isso dá para continuar:</p>
    ${steps(['<i>"Projetos de churn em telecom"</i>', '<i>"E em varejo?"</i> (entende que ainda é churn)', '<i>"Detalhe o segundo"</i> (abre o 2º resultado da resposta anterior)'])}
    ${tip(`Mudou de assunto? Clique no ✕ de "lembrando N perguntas" ou em ${ui('Nova conversa')}. Assim as perguntas antigas não influenciam a nova busca.`)}
    <h4>Avaliar</h4>
    <p>👍 conta como referência útil. 👎 pergunta o motivo (Não é parecido, Informação errada, Desatualizado, Outro). Essas avaliações alimentam as <b>Métricas do piloto</b>.</p>
    ${tip('A IA nunca inventa: ela só pode citar o que está nos documentos que você tem permissão de ver. Se não houver evidência, a resposta diz isso.', 'warn')}`],

  ['foco', 'target', 'Proposta em foco', () => `
    <p>Quando você está montando uma proposta, escolha um projeto como <b>foco</b>. A partir daí, cada pergunta considera o cliente, o segmento, as tecnologias, os serviços e o prazo dele, mesmo que você não escreva isso.</p>
    ${steps([
      `Na caixa de pergunta, ao lado do clipe, clique em ${ui(`${icon('target', { size: 13 })} Proposta em foco`)}.`,
      'Digite parte do cliente, do título ou o código (ex.: <i>"energ"</i>, <i>"P012"</i>). A lista filtra enquanto você digita.',
      `Escolha com o mouse, ou com ${kbd('↑')} ${kbd('↓')} e ${kbd('Enter')}. Projetos <b>Em andamento</b> (em elaboração, enviada, em negociação) aparecem primeiro.`,
      'O botão fica azul com "Foco: " e o nome do cliente (o X ao lado tira o foco), e o chat mostra "Respondendo com foco em…".',
      'Agora pergunte de forma curta: <i>"algum case parecido?"</i>, <i>"que riscos considerar?"</i>.',
    ])}
    ${flow([['Pergunta curta', '"algum case parecido?"', 'message'], ['+ contexto do foco', 'cliente, segmento, tecnologias, serviços, prazo', 'briefcase', true], ['Busca', 'referências para esse cliente', 'search']])}
    <ul>
      <li>O próprio projeto em foco <b>não aparece</b> nos resultados: você quer referências <i>para</i> ele.</li>
      <li>Para voltar à busca geral, clique no ✕ da faixa azul ou escolha <b>Sem foco</b>.</li>
      <li>O foco fica salvo na conversa e volta quando você a reabre.</li>
    </ul>`],

  ['conversas', 'bookmark', 'Conversas salvas', () => `
    <p>Toda conversa é <b>salva automaticamente</b> na primeira pergunta. A lista fica à esquerda (no celular, no botão ${icon('sidebar', { size: 14 })}).</p>
    ${table(['Quero…', 'Como'], [
      ['Renomear', `Clique no título no topo do chat, edite e aperte ${kbd('Enter')}.`],
      ['Favoritar', 'Clique na ⭐. As favoritas ficam no topo da lista, antes das recentes.'],
      ['Encontrar uma conversa', 'Use "Buscar conversas" na lista.'],
      ['Continuar de onde parou', 'Abra a conversa: a memória e o foco voltam junto.'],
      ['Começar do zero', `${ui('Nova conversa')}.`],
    ])}`],

  ['projetos', 'folder', 'Explorar projetos', () => `
    <p>A aba ${ui('Projetos')} lista tudo o que o seu perfil pode ver, <b>20 por página</b>.</p>
    <h4>Buscar e filtrar</h4>
    ${steps([
      '<b>Meus projetos</b> (topo dos filtros): os que você criou, em que é o responsável ou em que enviou documentos.',
      '<b>Busca no conteúdo:</b> procura dentro do texto dos documentos, sem diferenciar acentos. Escolha se o projeto precisa ter <i>todas as palavras</i> ou <i>qualquer</i> delas.',
      `<b>${icon('filter', { size: 13 })} Filtros:</b> cliente, prazo, valor (gestor), data e "citado nos documentos" (pessoa, organização, resultado, risco, lição, palavra-chave).`,
      '<b>Facetas:</b> segmento, status, tecnologias, serviços e tipo de documento, com a contagem de projetos. Em tecnologias e serviços, <i>todas</i> exige todas as marcadas e <i>qualquer</i> aceita uma delas.',
      '<b>Ordenar:</b> relevância, recentes, prazo, valor, A–Z ou número de documentos.',
    ])}
    ${tip('Os filtros se somam. Se nada aparecer, use "Limpar filtros" ou "Perguntar ao Radar", que busca pelo significado.')}
    <h4>Detalhe do projeto</h4>
    <p>Clique em um cartão para abrir o detalhe em tela grande:</p>
    <ul>
      <li><b>Topo:</b> prazo, valor e margem (gestor), responsável, data, número de documentos e quanto do cadastro está completo.</li>
      <li><b>Conteúdo:</b> objetivo, contexto, resultados, lições e riscos, cada um com o trecho e o documento de origem.</li>
      <li><b>Documentos:</b> resumo, tipo, status, palavras-chave e autor. ${icon('edit', { size: 13 })} <b>Editar informações</b> e ${icon('download', { size: 13 })} <b>Baixar</b> (para o consultor, valores saem ocultos).</li>
      <li><b>Lateral:</b> ficha, tecnologias, serviços, pessoas, organizações, palavras-chave, projetos parecidos e o que falta no cadastro (tecnologias, palavras-chave e projetos parecidos vêm recolhidos).</li>
      <li><b>Editar no lugar:</b> passe o mouse num campo e clique no lápis; Enter salva, Esc cancela. Tecnologias e serviços editam no card: o consultor escolhe entre as opções existentes; o gestor também cria novas.</li>
      <li><b>Comentários e histórico:</b> no fim da coluna principal, comentários em balões e cada alteração num cartão com antes → depois.</li>
      <li><b>Ações:</b> ${icon('download', { size: 13 })} <b>Exportar</b> (apresentação ou resumo executivo), Perguntar sobre o projeto, Usar como base (gestor), Enviar documento para ele, Editar tudo num formulário e, só para o gestor, Excluir (com confirmação).</li>
      <li><b>Ficha:</b> mostra quem criou o projeto e quando.</li>
    </ul>
    <h4>Cadastrar projeto (só gestor)</h4>
    <p>Só o gestor cadastra projetos e clientes novos. O consultor envia documentos para projetos existentes e edita os que enxerga.</p>
    ${steps([
      `${ui('+ Projeto')}. Se quiser, descreva o projeto em texto livre e clique em <b>Sugerir campos</b>: o Radar preenche cliente, segmento, tecnologias, prazo e mostra projetos parecidos.`,
      'Escolha o <b>cliente</b> no seletor com busca. Se ele não existir, aparece <b>"+ Cadastrar cliente"</b>.',
      'Confira os obrigatórios: cliente, título, segmento e status. Tecnologias e serviços novos ("+ outro") também são só para o gestor.',
      'Salve. Se já existir um projeto do mesmo cliente com título parecido, o Radar avisa antes de criar.',
    ])}
    ${tip('Toda edição de projeto ou documento fica em <b>Comentários e histórico</b>, na ficha (quem, quando, antes e depois).')}`],

  ['enviar', 'upload', 'Enviar documentos', () => `
    <p>Envie o arquivo e o Radar faz o trabalho pesado. Você só confere e completa.</p>
    ${flow([['Enviar', 'arraste ou escolha', 'upload'], ['Radar lê', '7 etapas automáticas', 'cpu'], ['Você revisa', 'confere e completa', 'eye', true], ['Na base', 'aparece no chat e em Projetos', 'checkCircle']])}
    <h4>1. Enviar</h4>
    <ul>
      <li><b>Formatos:</b> DOCX, PPTX, XLSX, PDF (com texto, não imagem escaneada), EML, MD, TXT, CSV, JSON, HTML, VTT e SRT. Até <b>15 MB</b> cada, vários de uma vez.</li>
      <li>Se já sabe o projeto, escolha em ${ui(`${icon('folder', { size: 13 })} Projeto de destino`)} antes de enviar. Se não, o Radar sugere.</li>
      <li>Pode trocar de tela: quando o processamento terminar, um aviso aparece com o botão <b>Revisar</b>.</li>
    </ul>
    <h4>2. O que o Radar faz sozinho</h4>
    ${table(['Etapa', 'O que acontece'], [
      ['Recebido', 'Confere tamanho e formato real do arquivo e calcula a impressão digital (SHA-256).'],
      ['Texto', 'Extrai o texto e as propriedades (título, autor, data, páginas, slides).'],
      ['Regras', 'Identifica tipo, cliente, segmento, tecnologias, serviços, prazo, valor, datas, pessoas, riscos, lições e dados pessoais.'],
      ['IA', 'A DeepSeek complementa pelo significado. O que ela "inventar" e não estiver no texto é descartado.'],
      ['Projeto', 'Sugere em qual projeto o documento entra ou propõe criar um novo.'],
      ['Conflitos', 'Bloqueia arquivo idêntico e avisa se prazo, valor ou cliente divergem do projeto.'],
      ['Qualidade', 'Calcula quantos % dos campos ficaram preenchidos.'],
    ])}
    <h4>3. Revisar (a parte humana)</h4>
    ${steps([
      'Leia o resumo no topo: <b>Tudo certo</b> (dá para aprovar com um clique) ou <b>N pontos de atenção</b>.',
      'Campos marcados com <em class="confira">confira</em> têm baixa confiança. Passe o mouse para ver o trecho que gerou a sugestão. Botões cinza abaixo do campo são <b>alternativas</b> que você aplica com um clique.',
      '<b>Em qual projeto entra?</b> Escolha uma sugestão (com % de compatibilidade), outro projeto, ou <b>Criar projeto novo</b> (já vem preenchido).',
      '<b>Sobre o documento:</b> autor, versão, link do original, <b>por que é relevante</b> (essa nota entra na busca) e ⭐ <b>bom modelo para reaproveitar</b>.',
      `<b>Tecnologias e serviços:</b> confirme ou ajuste. "Adicionar ao projeto" leva os novos itens para a ficha do projeto.`,
      `<b>Pessoas, resultados, lições e riscos:</b> remova com ✕ o que não procede e acrescente o que faltou (digite e ${kbd('Enter')}).`,
      '<b>Aprovar e indexar</b> grava e coloca o documento na busca. <b>Descartar</b> não grava nada.',
    ])}
    ${tip('Cada correção que você faz é registrada para medir onde a leitura automática erra. Corrigir é tão valioso quanto aprovar.')}
    ${tip('Documento que se declara confidencial só pode ser aprovado por quem tem acesso a confidencial (gestor).', 'warn')}`],

  ['exportar', 'download', 'Exportar proposta', () => `
    <p>Transforme um projeto em um documento pronto para o cliente ou para a diretoria, com layout padronizado. O conteúdo vem só da base: <b>nada é inventado por IA</b>.</p>
    ${flow([['Abrir o projeto', 'em Projetos ou pelo chat', 'folder'], ['Exportar', 'modelo e formato', 'download'], ['Escolher seções', 'o que levar', 'check', true], ['Gerar', 'o arquivo é baixado', 'file']])}
    ${steps([
      `No detalhe do projeto, clique em ${ui(`${icon('download', { size: 13 })} Exportar`)}.`,
      'Escolha o <b>modelo</b>: <b>Apresentação para o cliente</b> (slides 16:9, PowerPoint ou PDF) ou <b>Resumo executivo</b> (A4, Word ou PDF).',
      'Ajuste o <b>título</b> e <b>para quem é</b> o documento.',
      'Marque as <b>seções</b> que quer levar. As que não têm conteúdo no projeto aparecem desabilitadas, com o motivo.',
      `Clique em ${ui('Gerar')}. O arquivo sai com o nome "Cliente - Título - Modelo".`,
    ])}
    ${table(['Seção', 'O que entra'], [
      ['Capa', 'título, cliente, segmento e data'],
      ['Contexto e Objetivo', 'textos do cadastro do projeto'],
      ['Solução proposta', 'serviços e tecnologias'],
      ['Escopo e prazo', 'prazo, status, responsável, área e data'],
      ['Investimento', 'valor e margem (só gestor)'],
      ['Resultados, Riscos e Lições', 'o que foi extraído dos documentos (revise em "Editar informações")'],
      ['Cases de referência', 'projetos parecidos que você pode ver'],
      ['Fontes', 'documentos usados, com o rótulo de confiança'],
    ])}
    ${tip('No PowerPoint e no Word o arquivo é editável: ajuste o texto antes de enviar ao cliente. A exportação fica no registro de atividades.')}
    ${tip('Para o consultor, valores e margens nunca entram, e projetos confidenciais não aparecem nem como referência.', 'warn')}`],

  ['insights', 'chart', 'Insights e métricas', () => `
    <h4>Insights</h4>
    <p>Visão agregada do que o seu perfil enxerga: números grandes no topo (projetos, <b>conversão</b>, segmentos e tecnologias), o <b>funil</b> das propostas por status, o <b>top 10</b> de segmentos e de tecnologias, projetos <b>por ano</b>, tecnologias que <b>andam juntas</b>, <b>resultados comprovados</b> e <b>lições de propostas perdidas</b>. Passe o mouse numa barra para ver o detalhe e clique num item para abrir ${ui('Projetos')} já filtrado. A <b>saúde da base</b> (documentos por tipo, envios a revisar e pendências de cadastro) fica recolhida no fim.</p>
    <h4>Métricas do piloto (menu ${icon('menu', { size: 14 })})</h4>
    ${table(['Indicador', 'O que mede'], [
      ['Buscas e sessões', 'Uso do Radar.'],
      ['% úteis (e no top 3)', 'Quantas avaliações foram 👍, geral e só nos 3 primeiros resultados.'],
      ['Sem resultado', 'Perguntas em que a base não tinha evidência: lacunas de conteúdo.'],
      ['Tempo até a 1ª referência útil', 'Da primeira pergunta ao primeiro 👍 da sessão.'],
      ['Reaproveitamentos', 'Cliques em Abrir projeto, Copiar escopo e Usar como base.'],
      ['Por que não ajudou', 'Motivos dos 👎.'],
    ])}`],

  ['permissoes', 'lock', 'Permissões e privacidade', () => `
    ${table(['', 'Consultor', 'Gestor'], [
      ['Documentos públicos e internos', '✔', '✔'],
      ['Documentos e projetos confidenciais', '—', '✔'],
      ['Valores e margens', 'ocultos (inclusive no download)', '✔'],
      ['Classificar algo como confidencial', '—', '✔'],
      ['Cadastrar projeto e cliente novo', '—', '✔'],
      ['Criar tecnologia ou serviço novo', 'sugere ao gestor', '✔'],
      ['Exportar apresentação e resumo', '✔ (sem valores)', '✔'],
      ['Consultar o registro de atividades', '—', '✔'],
    ])}
    <ul>
      <li>O filtro de permissão é aplicado <b>antes</b> da busca e da IA: um conteúdo que você não pode ver nunca entra na resposta.</li>
      <li>Dados pessoais (CPF, CNPJ, e-mail, telefone) são detectados no envio e aparecem mascarados.</li>
      <li>O acesso de um documento nunca fica mais aberto que o do projeto dele.</li>
    </ul>`],

  ['duvidas', 'info', 'Dúvidas frequentes', () => `
    ${table(['Situação', 'O que fazer'], [
      ['A resposta trouxe projetos que não têm nada a ver.', 'Dê 👎 com o motivo. Reformule com mais contexto (segmento, objetivo) ou use o foco.'],
      ['"Não há evidência suficiente na base."', 'A base não tem esse assunto. Vale enviar documentos sobre ele.'],
      ['Mudei de assunto e as respostas ficaram estranhas.', 'A memória da conversa ainda está ativa: clique no ✕ de "lembrando N perguntas".'],
      ['Não acho um projeto em Projetos.', 'Limpe os filtros. Se for confidencial, o perfil consultor não o vê.'],
      ['Enviei um PDF e não veio texto.', 'Provavelmente é uma imagem escaneada. O V0 não faz OCR: envie a versão em Word ou PDF com texto.'],
      ['O Radar diz que o arquivo já existe.', 'Um arquivo idêntico já está na base. Abra o projeto para encontrá-lo.'],
      ['Aparece "Modo regras" ou "resposta direta da base".', 'A resposta foi montada pelas regras e pela busca por palavras do Radar, direto dos dados da base. Repita a pergunta para ter a resposta com a análise da IA.'],
    ])}`],
];

// ---------- Como o Radar funciona (técnico) ----------

const TECNICO = [
  ['arquitetura', 'layers', 'Arquitetura', () => `
    <p>O V0 roda em um único processo <b>Node.js</b>, <b>sem nenhuma dependência npm</b>: só módulos nativos. Isso atende à restrição da VM (somente Node) e deixa o app leve (limite de 220 MB de RAM no servidor).</p>
    <div class="arch">
      ${flow([['Navegador', 'HTML + CSS + JavaScript (módulos ES), sem framework', 'eye'], ['Caddy', 'HTTPS automático (Let\'s Encrypt), proxy reverso, log de acesso', 'shield'], ['Servidor Node', 'node:http · login por cookie assinado (HMAC-SHA256) · API JSON', 'cpu', true]])}
      <div class="arch-down">${icon('chevronDown', { size: 18 })}</div>
      ${flow([['SQLite', 'node:sqlite · projetos, documentos, entidades, trechos, histórico · FTS5', 'files'], ['Base vetorial', 'JSON local, API no estilo Chroma · embeddings de 1024 dimensões', 'grid'], ['DeepSeek', 'API compatível com OpenAI via fetch · modo JSON · temperatura 0,1', 'sparkles'], ['Auditoria', 'JSONL: buscas, avaliações, downloads → métricas', 'gauge']], { parallel: true })}
    </div>
    <h4>Ferramentas e bibliotecas</h4>
    ${table(['Camada', 'Tecnologia', 'Uso no Radar'], [
      ['Runtime', '<b>Node.js ≥ 22.13</b> (ESM)', 'Servidor, extração, indexação e busca. Zero dependências npm.'],
      ['Banco relacional', '<b>node:sqlite</b> (SQLite embutido, modo WAL)', 'Persistência de projetos, documentos, metadados, entidades, histórico e correções.'],
      ['Busca textual', '<b>SQLite FTS5</b> (BM25, tokenizer <code>unicode61 remove_diacritics</code>)', 'Busca por palavras sem acento; reforça a busca semântica.'],
      ['Embeddings', '<b>hashing-tfidf-v1</b> (próprio, <code>src/embedder.js</code>)', 'Transforma texto em vetor sem rede e sem modelo externo.'],
      ['Base vetorial', '<b>LocalVectorStore</b> (próprio, <code>src/vectorstore.js</code>)', 'Busca por similaridade de cosseno com filtro <code>where</code>; API igual à do Chroma para troca futura.'],
      ['Extração', '<b>zlib</b> nativo + leitor ZIP próprio', 'DOCX, PPTX e XLSX (ZIP com XML) e PDF (streams compactados).'],
      ['IA generativa', '<b>DeepSeek</b> (<code>deepseek-chat</code>) via <b>fetch</b> nativo', 'Entender a pergunta, reavaliar candidatos, redigir a resposta e enriquecer metadados.'],
      ['Fallback', '<b>MockLLM</b> (regras)', 'Se a IA falhar ou estiver sem chave, tudo continua funcionando por regras.'],
      ['Infra', '<b>Caddy</b> + <b>systemd</b> na AWS', 'HTTPS, proxy, reinício automático e limites de memória.'],
      ['Testes', '<b>node:test</b> + <b>node:assert</b>', 'Testes automatizados de extração, permissões, busca, upload e edição.'],
    ])}`],

  ['extracao', 'cpu', 'Extração de dados', () => `
    <p>Cada arquivo enviado vira um <b>processamento</b> com etapas registradas e cronometradas. O resultado são <b>sugestões</b>: cada campo traz valor, confiança (0 a 1), método e o trecho que o sustenta. Nada entra na base sem revisão humana.</p>
    ${flow([
      ['1. Recebimento', 'formato real pelo conteúdo · SHA-256 · limite 15 MB', 'upload'],
      ['2. Extração de texto', 'parser por formato → Markdown leve + propriedades', 'file'],
      ['3. Regras', 'léxico, regex, TF-IDF, PII', 'filter'],
      ['4. IA', 'DeepSeek em modo JSON · validação anti-invenção', 'sparkles', true],
      ['5. Vínculo', 'ranking de projetos candidatos', 'folder'],
      ['6. Conflitos', 'duplicata exata e > 90% · divergências', 'alert'],
      ['7. Qualidade', '% de completude', 'checkCircle'],
      ['Revisão humana', 'aprovar · corrigir · descartar', 'eye', true],
    ], { vertical: true })}
    <h4>Leitura por formato</h4>
    ${table(['Formato', 'Como o texto é obtido'], [
      ['DOCX · PPTX · XLSX', 'São arquivos ZIP com XML. Um leitor ZIP próprio lê o diretório central e descompacta com <code>zlib.inflateRawSync</code>. Do XML saem títulos, listas, parágrafos, slides, notas do apresentador e linhas de planilha como "coluna: valor". Autor e título vêm de <code>docProps/core.xml</code>.'],
      ['PDF', 'Os <i>content streams</i> são descompactados (FlateDecode) e os operadores de texto (<code>Tj</code>, <code>TJ</code>, <code>\'</code>, <code>"</code>) são lidos. PDFs só com imagem não têm texto (sem OCR no V0).'],
      ['EML', 'Cabeçalhos MIME decodificados (assunto, remetente, data) e corpo em texto.'],
      ['VTT · SRT', 'Legendas de reunião (Teams, Zoom, Meet): mantém quem falou e o minuto, descarta numeração e tempos de corte.'],
      ['HTML · MD · TXT · CSV · JSON', 'Texto limpo; scripts e estilos do HTML são descartados.'],
    ])}
    <h4>Regras (sem IA)</h4>
    <ul>
      <li><b>Tipo do documento:</b> pistas do nome do arquivo, do formato e do conteúdo, com até 3 alternativas.</li>
      <li><b>Vocabulário controlado:</b> segmentos, tecnologias e serviços com sinônimos (ex.: "lakehouse" → Databricks). Termos novos são sugeridos à parte.</li>
      <li><b>Expressões regulares:</b> valores em R$ com escala ("2,4 milhões"), margem, prazos (meses, semanas, sprints, soma de semanas em planilha) e datas.</li>
      <li><b>Entidades:</b> pessoas (falantes, papéis, autor), organizações, resultados/KPIs, riscos e lições, inclusive a partir de seções como "Lições aprendidas".</li>
      <li><b>Resumo e palavras-chave:</b> TF-IDF contra toda a base (frases e termos mais característicos do documento).</li>
      <li><b>Dados pessoais:</b> CPF, CNPJ, e-mail e telefone, mascarados na tela e usados para sugerir "confidencial".</li>
    </ul>
    <h4>IA com trava anti-invenção</h4>
    ${flow([['Texto do documento', '', 'file'], ['DeepSeek', 'devolve JSON com campos e entidades', 'sparkles'], ['Validação', 'cada valor precisa aparecer no texto', 'shield', true], ['Mescla', 'IA + regras concordam → confiança sobe', 'checkCircle']])}
    <p>Cliente, pessoas, prazo e valor sugeridos pela IA que <b>não aparecem no texto são descartados</b>. Quando IA e regras concordam, a confiança sobe e o método vira "regras+ia".</p>
    <h4>Vínculo com projeto</h4>
    <p><code>score = 0,6 × conteúdo semelhante (cosseno) + 0,45 se for o mesmo cliente + 0,1 se o título for parecido</code> (limitado a 1). Cliente com baixa confiança não pesa. Com score ≥ 0,6 o projeto já vem marcado como destino. Sem candidato forte, o Radar propõe criar um projeto novo com os campos já extraídos.</p>`],

  ['persistencia', 'files', 'Persistência dos metadados', () => `
    <p>Tudo fica em um arquivo <b>SQLite</b> (<code>radar.db</code>), aberto com o módulo nativo <code>node:sqlite</code> em modo <b>WAL</b> (leitura e escrita simultâneas). O esquema é criado e migrado na inicialização.</p>
    <h4>Modelo de dados (resumo)</h4>
    <div class="er">
      <div class="er-box"><b>cliente</b><small>nome, segmento</small></div>
      <div class="er-rel">1 — N</div>
      <div class="er-box hl"><b>projeto</b><small>título, status, prazo, valor, margem, objetivo, contexto, acesso</small></div>
      <div class="er-rel">1 — N</div>
      <div class="er-box hl"><b>documento</b><small>tipo, status, confiança 1–5, resumo, palavras-chave, autor, versão, link, notas, bom modelo, texto</small></div>
      <div class="er-rel">1 — N</div>
      <div class="er-split">
        <div class="er-box"><b>documento_entidade</b><small>pessoa, organização, KPI, risco, lição… + trecho e método</small></div>
        <div class="er-box"><b>trecho</b><small>pedaços de ~700 caracteres → índice FTS5</small></div>
      </div>
    </div>
    ${table(['Tabela', 'Guarda'], [
      ['<code>projeto_tecnologia</code> · <code>projeto_servico</code>', 'Taxonomia controlada (N–N).'],
      ['<code>projeto_relacionado</code>', 'Projetos parecidos, calculados a cada indexação.'],
      ['<code>processamento</code>', 'Cada envio: etapas, sugestões, status e texto extraído.'],
      ['<code>correcao_metadado</code>', 'O que o revisor mudou em relação à sugestão e qual método errou.'],
      ['<code>historico_alteracao</code>', 'Antes e depois de cada edição em projeto e documento, com usuário e data.'],
      ['<code>trecho_fts</code>', 'Tabela virtual FTS5 ligada a <code>trecho</code> por gatilhos (inserção e exclusão).'],
    ])}
    <h4>Indexação</h4>
    <p>Depois de aprovar um envio ou editar um projeto ou documento, a base vetorial é <b>reconstruída</b> a partir do banco:</p>
    ${flow([
      ['Documentos', 'texto + notas do revisor', 'files'],
      ['Chunking', 'parágrafos agrupados até ~700 caracteres, com sobreposição de 1 parágrafo', 'layers'],
      ['Cabeçalho', 'cliente, tipo e título em cada trecho', 'tag'],
      ['Embedding', 'vetor de 1024 dimensões', 'grid', true],
      ['Base vetorial', 'JSON persistido em disco', 'files'],
    ])}
    <h4>Como o embedding é calculado (hashing-tfidf-v1)</h4>
    ${steps([
      '<b>Tokenização</b> em português: minúsculas, sem acento, sem stopwords e com stemming leve.',
      '<b>Features:</b> cada palavra e cada par de palavras vizinhas (bigrama), como "perdas_tecnicas".',
      '<b>Feature hashing:</b> cada feature vira uma posição de 0 a 1023 pelo hash FNV-1a.',
      '<b>Peso:</b> <code>(1 + log tf) × idf</code>, com o idf calculado sobre todos os trechos da base.',
      '<b>Normalização L2:</b> a similaridade entre dois vetores vira o cosseno do ângulo entre eles.',
    ])}
    ${tip('O embedder é intercambiável: um modelo neural (ex.: embeddings multilíngues) só precisa implementar <code>fit</code>, <code>embed</code> e <code>toJSON</code>. A base vetorial também pode ser trocada pelo Chroma sem mudar o motor de busca.')}
    <h4>Projetos relacionados</h4>
    <p><code>similaridade = 0,6 × cosseno(vetores) + 0,2 × Jaccard(tecnologias) + 0,1 × Jaccard(serviços) + 0,1 × (mesmo segmento)</code></p>`],

  ['busca', 'search', 'Busca semântica', () => `
    <p>Uma pergunta em linguagem natural passa por interpretação, recuperação híbrida (vetorial + textual), pontuação por vários fatores e uma reavaliação pela IA, sempre restrita ao que o usuário pode ver.</p>
    ${flow([
      ['Pergunta', '+ últimas 8 perguntas da conversa + foco', 'message'],
      ['Entendimento (IA)', 'intenção, consulta reescrita, segmentos, tecnologias, serviços, prazo', 'sparkles', true],
      ['Consulta enriquecida', 'sinônimos do léxico + descrição do foco', 'tag'],
      ['Filtro de permissão', 'confidencialidade do perfil aplicada no where', 'lock', true],
      ['Recuperação híbrida', '80 trechos por cosseno + BM25 (FTS5) como reforço de até 25%', 'search'],
      ['Agrupar por projeto', 'melhores trechos de cada projeto', 'folder'],
      ['Score multi-fator', 'conteúdo, segmento, tecnologias, serviços, porte, status', 'chart'],
      ['Reavaliação (IA)', '8 melhores: relevância, justificativa, evidência e resposta', 'sparkles', true],
      ['Corte e conflitos', 'score ≥ 0,4 · até 5 projetos · fonte mais confiável prevalece', 'checkCircle'],
    ], { vertical: true })}
    <h4>1. Entendimento</h4>
    <p>A DeepSeek recebe a pergunta, o histórico e o foco e devolve um JSON com a <b>intenção</b>, a <b>consulta reescrita</b> sem ambiguidade (ex.: "e em varejo?" → "projetos de churn em varejo") e as entidades, escolhidas apenas do vocabulário controlado.</p>
    <p>Cada intenção tem uma resposta própria. Só <i>buscar</i> segue para a busca de projetos parecidos descrita abaixo:</p>
    ${table(['Intenção', 'Exemplo', 'Como responde'], [
      ['<b>buscar</b>', '"Já fizemos fraude em seguros?"', 'Busca híbrida, score e análise da IA (passos 2 a 5).'],
      ['<b>listar</b>', '"Consolidado de todos os projetos"', 'Consulta ao banco com filtros e permissões: total, tabela e distribuição por status e segmento.'],
      ['<b>agregar</b>', '"Quais áreas têm projetos?"', 'Lista distinta com contagem. "Áreas" é ambíguo: responde por um campo e oferece os outros.'],
      ['<b>ficha</b>', '"Qual o prazo e a margem do P001?"', 'Campos do cadastro do projeto, com valor e margem só para quem pode ver.'],
      ['<b>comparar</b>', '"Compare o P001 com o P002", "compare os dois"', 'Tabela lado a lado dos projetos citados ou mostrados na resposta anterior.'],
      ['<b>composta</b>', '"Liste os de varejo e compare os dois"', 'A IA chama ferramentas (listar, contar, localizar, ficha, parecidos, trechos), no máximo 4, em até 20 s. O servidor executa cada uma com as permissões do usuário.'],
      ['<b>esclarecer</b>', 'Pergunta com leituras realmente diferentes', 'Devolve 2 ou 3 opções clicáveis. Nunca duas vezes seguidas.'],
    ])}
    <p>Sem IA, regras de palavras-chave fazem a mesma classificação. Números, listas e fichas sempre vêm do banco; a IA só escreve a síntese. O conjunto de avaliação fica em <code>test/avaliacao-intencoes.js</code>.</p>
    <h4>2. Recuperação híbrida</h4>
    <ul>
      <li><b>Vetorial:</b> a consulta vira um embedding e a base devolve os 80 trechos de maior cosseno, já filtrados por <code>where: { confidencialidade: { $in: [...] } }</code>.</li>
      <li><b>Textual:</b> o FTS5 roda a mesma consulta com BM25. Trechos que aparecem nas duas listas têm a similaridade multiplicada por até 1,25, conforme a posição no BM25. O reforço só amplia o que já é semanticamente parecido.</li>
    </ul>
    <h4>3. Score multi-fator</h4>
    ${table(['Fator', 'Peso', 'Como é medido'], [
      ['Conteúdo', '0,40', '70% do melhor trecho + 30% da média dos 3 melhores, normalizado pelo maior da busca'],
      ['Segmento', '0,15', 'mesmo segmento da pergunta ou do foco'],
      ['Tecnologias', '0,15', 'proporção das tecnologias pedidas que o projeto usa'],
      ['Serviços', '0,15', 'idem, para serviços'],
      ['Porte', '0,10', 'proximidade do prazo em meses'],
      ['Status', '0,05', 'Entregue 1,0 · Vendida 0,9 · Em execução 0,85 · Em negociação 0,6 · Enviada 0,5 · Perdida 0,3'],
    ])}
    <p>Fatores sem sinal na pergunta não entram e os pesos são <b>renormalizados</b>. Uma pergunta só sobre conteúdo usa só o conteúdo.</p>
    <h4>4. Reavaliação e resposta pela IA</h4>
    <p>Os 8 melhores candidatos vão para a DeepSeek com metadados e <b>frases numeradas</b> dos documentos. Ela devolve, para cada projeto, a relevância (0 a 1), uma justificativa e o <b>id da frase</b> que a sustenta, além da resposta curta com citações [P001].</p>
    ${tip('Travas contra alucinação: a IA só recebe trechos que o usuário pode ver; cita a evidência por id (o texto exibido vem da base, não da IA); só cita projetos com relevância ≥ 0,5; não pode inventar números; e, sem evidência, deve dizer que não há.', 'warn')}
    <p>A nota final do conteúdo mistura 35% do score vetorial e 65% da relevância da IA. Ficam projetos com relevância ≥ 0,4 e score ≥ 0,4, até 5.</p>
    <h4>5. Conflito de fontes</h4>
    <p>Quando documentos discordam (prazo, valor), vale a fonte de maior confiança: <b>5</b> proposta final aprovada, SOW ou contrato · <b>4</b> proposta ou case · <b>3</b> estimativa, ata validada ou ficha · <b>2</b> transcrição, e-mail ou documento técnico · <b>1</b> rascunho. O cartão mostra "dados divergentes".</p>
    <h4>Sem IA</h4>
    <p>Se a DeepSeek falhar (timeout de 45 s, chave inválida, JSON malformado), o <b>MockLLM</b> assume com regras: entidades pelo léxico, ranking só pelo score multi-fator e resposta montada a partir dos fatos. A tela mostra "Modo regras" no alto ou "resposta direta da base" na resposta.</p>`],

  ['exportacao', 'download', 'Exportação e registro', () => `
    <h4>Exportação de proposta</h4>
    ${flow([['Detalhe do projeto', 'já filtrado por permissão', 'lock', true], ['Modelo de conteúdo', 'seções → slides ou blocos', 'layers'], ['Template', 'geometria única (pt)', 'layout'], ['Renderizador', 'PPTX · DOCX · PDF', 'file'], ['Download', 'nada fica no servidor', 'download']])}
    ${table(['Formato', 'Como é gerado (sem bibliotecas)'], [
      ['PPTX', 'Pacote OOXML montado à mão: <code>presentation.xml</code>, slide master, layout, tema e um XML por slide, compactados pelo escritor ZIP próprio (<code>zlib</code>). Texto em Arial, editável.'],
      ['DOCX', 'OOXML com estilos (Título 1), marcadores (<code>numbering.xml</code>), tabela para a ficha e rodapé com número de página.'],
      ['PDF', 'Escrito direto: fontes padrão Helvetica com codificação WinAnsi (acentos), medidas de largura AFM para quebrar linhas, paginação e rodapé. Os slides usam a mesma geometria do PPTX.'],
    ])}
    <p>A apresentação e o PDF de slides partem do mesmo <b>layout em pontos</b> (960 × 540): retângulos e caixas de texto posicionados. Por isso os dois formatos ficam iguais. Listas longas viram slides "(cont.)" com até 6 tópicos.</p>
    <h4>Registro de atividades</h4>
    <p>A tabela <code>historico_alteracao</code> ganhou a coluna <code>acao</code> (criar, editar, excluir, exportar, sugerir). Criações de projeto, documento, cliente e termos da taxonomia são gravadas no mesmo ponto em que o item é inserido no banco, com o usuário. A consulta é paginada, filtrável e só para o gestor; não existe API para alterar ou apagar eventos.</p>
    <h4>Permissões</h4>
    <p>As capacidades por perfil ficam em <code>src/permissions.js</code> e são checadas no servidor (cadastro de projeto, cliente e termo novos, registro). A tela só esconde o que o perfil não pode fazer.</p>`],

  ['seguranca', 'shield', 'Segurança e limites do V0', () => `
    <h4>Segurança</h4>
    <ul>
      <li><b>Acesso:</b> tela de login com sessão em cookie <code>HttpOnly</code>, <code>Secure</code>, <code>SameSite=Lax</code>, assinado com HMAC-SHA256 e válido por 7 dias. Erros de senha têm atraso fixo.</li>
      <li><b>Permissão antes de tudo:</b> busca, IA, detalhe, download e edição respeitam o nível de confidencialidade do perfil.</li>
      <li><b>Valores:</b> perfis sem permissão não recebem valores nem margens, nem na API, nem no download.</li>
      <li><b>Segredos:</b> a chave da IA fica só no servidor (arquivo com acesso restrito), nunca no navegador.</li>
      <li><b>Mascaramento:</b> CPF, RG, e-mail, telefone, cartão, senhas e chaves são trocados por marcadores no servidor antes de gravar, indexar ou enviar texto à DeepSeek (envio, cadastro, sugestão, edição e perguntas). O envio nunca é bloqueado; o registro guarda só o tipo e a quantidade.</li>
      <li><b>Termo de uso:</b> aceito uma vez por perfil e por versão, na tela de boas-vindas.</li>
      <li><b>Dados:</b> no piloto, use documentos de exemplo ou públicos.</li>
    </ul>
    <h4>Limites conhecidos (V0)</h4>
    ${table(['Limite', 'Caminho para a próxima versão'], [
      ['Embedding por hashing (sem modelo neural): entende sinônimos do léxico, mas não o sentido de qualquer frase.', 'Trocar por um modelo de embeddings multilíngue; a interface já está preparada.'],
      ['Base vetorial em JSON, reconstruída a cada alteração.', 'Chroma ou pgvector com atualização incremental.'],
      ['Login único compartilhado; "Ver como" simula perfis.', 'SSO corporativo com perfil real por pessoa.'],
      ['Sem OCR para PDFs escaneados.', 'Etapa de OCR no pipeline de extração.'],
      ['Um único servidor pequeno.', 'Infra dimensionada para o volume real.'],
    ])}`],
];

// ---------- Diálogo ----------

export function render(titulo, subtitulo, secoes, inicial) {
  const dlg = $('#help');
  const ativa = secoes.some(([id]) => id === inicial) ? inicial : secoes[0][0];
  dlg.innerHTML = `
    <header class="dlg-head help-head"><div><span class="sub">${subtitulo}</span><h3>${titulo}</h3></div>
      <button type="button" class="icon-btn" data-close title="Fechar">${icon('x')}</button></header>
    <div class="help-grid${secoes.length === 1 ? ' solo' : ''}">
      <nav class="help-nav" aria-label="Seções">${secoes.map(([id, ic, t]) => `<button type="button" data-sec="${id}">${icon(ic, { size: 16 })}<span>${t}</span></button>`).join('')}</nav>
      <article class="help-body" tabindex="-1"></article>
    </div>`;
  const show = (id) => {
    const [, ic, t, html, bind] = secoes.find(([x]) => x === id);
    const body = $('.help-body', dlg);
    body.innerHTML = `<h2>${icon(ic, { size: 20 })}${t}</h2>${html()}`;
    // Seções interativas (formulários, listas) ligam os eventos depois de desenhadas.
    bind?.(body, show);
    $('.help-body', dlg).scrollTop = 0;
    $$('[data-sec]', dlg).forEach((b) => b.classList.toggle('on', b.dataset.sec === id));
    $(`[data-sec="${id}"]`, dlg).setAttribute('aria-current', 'true');
  };
  $$('[data-sec]', dlg).forEach((b) => (b.onclick = () => show(b.dataset.sec)));
  $('[data-close]', dlg).onclick = () => dlg.close();
  show(ativa);
  if (!dlg.open) dlg.showModal();
}

export function showGuide(secao) {
  const b = state.ctx.base;
  render('Como usar o Radar', `${b.projetos} projetos · ${b.documentos} documentos na base`, GUIA, secao);
}

export function showTech(secao) {
  render('Como o Radar funciona', 'Extração, persistência e busca semântica', TECNICO, secao);
}
