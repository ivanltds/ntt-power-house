// Versão do Radar e notas da versão (release notes).
// A cada correção entregue, acrescente um item em NOTAS (a versão mais nova primeiro) e, ao fechar
// uma versão, crie uma nova entrada e atualize VERSAO. O selo ao lado do título abre esta tela.
// status do item: 'feito' (no ar) | 'andamento' (sendo corrigido) | 'analise' (investigando a causa)

import { icon } from './icons.js';
import { render, table, tip } from './ajuda.js';
import { SECOES_QUALIDADE } from './qualidade.js';

export const VERSAO = 'V0.0.2';

export const NOTAS = [
  {
    versao: 'V0.0.2',
    data: '13/11/2026',
    estado: 'Em andamento',
    resumo: 'Correções dos tickets da V0.0.1 priorizados para o MVP, das críticas às baixas, e a gestão de versões: a V0.0.1 fica arquivada (roteiro e resultados só para consulta) e o roteiro da V0.0.2 começa zerado. Cada item cita os tickets que corrige; eles ficam como "Corrigido, aguardando reteste" até alguém passar o cenário no roteiro.',
    itens: [
      {
        tipo: 'melhoria', status: 'feito', area: 'Qualidade',
        titulo: 'Versões: V0.0.1 arquivada, seletor de versão e validação automática no reteste',
        antes: 'O roteiro e os resultados eram só da versão atual; não havia como consultar a versão anterior nem saber em que versão um ticket foi aberto, e o ticket de um cenário que voltava a passar continuava aberto até alguém mudar à mão.',
        depois: 'Roteiro de testes e Acompanhamento têm um seletor de versão: a V0.0.1 fica arquivada, com o roteiro congelado e os resultados só para consulta. Os tickets mostram em que versão foram abertos e ganharam o filtro "Aberto na versão" (a lista continua com todas as versões juntas). Quando um cenário que falhou passa (OK) no roteiro da versão nova, os tickets ligados a ele são validados automaticamente, com registro no histórico. No roteiro da V0.0.2, os cenários que falharam ou ficaram bloqueados na V0.0.1 aparecem destacados ("Falhou na V0.0.1" / "Bloqueado na V0.0.1") e têm o filtro "Não passaram na V0.0.1".',
      },
      {
        tipo: 'melhoria', status: 'feito', area: 'Insights',
        titulo: 'Insights (novo) sai das abas e fica só no endereço /insights-novo',
        antes: 'A aba "Insights (novo)" aparecia para todos ao lado de Insights, ainda em protótipo.',
        depois: 'A aba saiu da barra. O protótipo continua acessível pelo endereço /insights-novo, para avaliação do time durante a semana; ele volta com melhorias numa versão seguinte (provavelmente a V0.0.3).',
      },
      {
        tipo: 'correcao', status: 'feito', area: 'Chat', tickets: ['CR-012'],
        titulo: 'Busca sem nada relevante sugere buscas próximas',
        antes: 'Quando não achava nada, a resposta era genérica ("tente refinar a busca"), sem caminho para seguir.',
        depois: 'O Radar diz que não encontrou nada relevante e oferece até 3 buscas próximas, como botões, tiradas dos projetos mais parecidos que o seu perfil pode ver (sempre trazem resultado). Erros de digitação e sinônimos são resolvidos pela IA, como solução provisória; a solução definitiva, com vocabulário curado e registro das buscas vazias, ficou documentada para depois do MVP (caso de uso UC03.16).',
      },
      {
        tipo: 'melhoria', status: 'feito', area: 'Insights', tickets: ['CR-009'],
        titulo: 'Aba Insights refeita: números grandes, funil e top 10',
        antes: 'Tabelas com barras pequenas e sem cor, a lista inteira de segmentos e tecnologias e os dados de curadoria misturados com os de negócio.',
        depois: 'Quatro números grandes no topo (projetos, conversão, segmentos, tecnologias), funil das propostas por status em barra colorida, top 10 segmentos e top 10 tecnologias em barras, projetos por ano, pares de tecnologias, resultados comprovados e lições das perdidas. Cada barra tem dica com o número e leva aos projetos. A curadoria ficou recolhida em "Saúde da base". É um paliativo: o "efeito uau" ainda depende de definições de produto, e o Insights novo é avaliado à parte (V0.0.3).',
      },
      {
        tipo: 'melhoria', status: 'feito', area: 'Chat', tickets: ['CR-027'],
        titulo: 'Resposta em blocos fáceis de ler',
        antes: 'Um parágrafo longo misturava a resposta, a justificativa e o que reaproveitar.',
        depois: 'A resposta vem em blocos: primeiro a resposta direta e por que cada projeto é relevante; depois "Recomendação:", com o que reaproveitar e os cuidados; e "Perfis sugeridos:" só quando os documentos citam papéis da equipe.',
      },
      {
        tipo: 'correcao', status: 'feito', area: 'Chat', tickets: ['CR-028', 'CR-029', 'CR-030', 'CR-051'],
        titulo: 'Card do projeto na resposta: ordem, tags, itens que abrem e barras',
        antes: 'As tecnologias apareciam duas vezes e com destaque; os itens que abrem não pareciam clicáveis; a barra mostrava a nota do critério e o número mostrava o peso (53% aparecia menor que 20%); e "valor restrito" confundia com os resultados em reais.',
        depois: 'Segmento (com ícone), prazo, justificativa e resumo vêm primeiro; as tecnologias aparecem uma vez só, no fim, discretas e clicáveis. Os itens têm setinha e abre um por vez. Cada barra mostra a contribuição do critério para o projeto, de 0 a 100%, e a dica traz nota × peso. Para o consultor, aparece "preço e margem restritos".',
      },
      {
        tipo: 'correcao', status: 'feito', area: 'Chat', tickets: ['CR-042'],
        titulo: 'Projeto sem permissão: aviso curto, sem referências não pedidas',
        antes: 'O consultor que pedia a ficha de um projeto confidencial recebia outras referências que não pediu; o gestor via a ficha repetida no texto e na tabela.',
        depois: 'O consultor recebe só "Não encontrei o P005 entre os projetos que o seu perfil pode ver", com a oferta de buscar pelo tema (sem revelar se o projeto existe). Para o gestor, o texto não repete os campos da tabela.',
      },
      {
        tipo: 'melhoria', status: 'feito', area: 'Chat', tickets: ['CR-017', 'CR-018', 'CR-004', 'CR-035'],
        titulo: 'Conversas em grupos, arquivadas, menu ⋯ e exclusão com confirmação',
        antes: 'As conversas ficavam numa lista só; a estrela aparecia sempre; excluir era um segundo clique na lixeira, sem aviso.',
        depois: 'Cada conversa tem o menu ⋯ com Renomear, Mover para grupo (nome livre, ex.: cliente ou proposta), Arquivar e Excluir. A lista mostra Favoritas, um bloco por grupo, Recentes (sem grupo) e Arquivadas (recolhida, antes de Recentes). Os grupos só organizam; não limitam a busca. A estrela aparece ao passar o mouse e fica fixa nas favoritas. Excluir abre a janela "Excluir conversa" com o nome dela e Cancelar.',
      },
      {
        tipo: 'melhoria', status: 'feito', area: 'Chat', tickets: ['CR-034', 'CR-037', 'CR-044'],
        titulo: 'Título com lápis, enviar só com texto e editar a última pergunta',
        antes: 'Não havia pista de que o título era editável; o botão enviar ficava ativo com a caixa vazia; para corrigir uma pergunta era preciso mandar outra.',
        depois: 'Lápis ao lado do título (Enter salva, Esc cancela). O botão enviar fica apagado sem texto. A última pergunta tem um lápis: ao editar e reenviar, a pergunta e a resposta antigas são trocadas pelas novas.',
      },
      {
        tipo: 'melhoria', status: 'feito', area: 'Envio', tickets: ['CR-049', 'CR-050', 'CR-046'],
        titulo: 'Enviar arquivo pelo chat e pela ficha do projeto',
        antes: 'O envio só acontecia na aba Enviar, escolhendo o projeto na revisão.',
        depois: 'No chat, o clipe anexa arquivos; ao dizer o projeto ("coloca no projeto da Energisul", "é do P003"), na mesma mensagem ou depois, o arquivo vai para ele. Sem projeto, o arquivo fica só na conversa, fora da base. Na ficha do projeto, "Enviar arquivo para este projeto" mostra o andamento ali mesmo. Nos dois casos a revisão abre com o destino fixo ("Vai para…", com opção de trocar).',
      },
      {
        tipo: 'melhoria', status: 'feito', area: 'Envio', tickets: ['CR-010', 'CR-047', 'CR-048'],
        titulo: 'Arquivo recusado, atualização da ficha e aprovação em lote',
        antes: 'Depois de um arquivo recusado, não dava para tirar nem trocar; ao aprovar, só tecnologias e serviços iam para o projeto; vários envios eram revisados um a um.',
        depois: 'Formato não aceito é avisado antes do envio, com a lista de formatos; envio com erro tem "Trocar arquivo" e "Remover da lista". Na revisão, "Atualizar a ficha do projeto" mostra o que o arquivo traz de diferente (prazo, data e, para o gestor, valor e margem) para marcar. "Aprovar os prontos" aprova de uma vez os envios com projeto certo e sem pontos de atenção.',
      },
      {
        tipo: 'correcao', status: 'feito', area: 'Projetos', tickets: ['CR-041', 'CR-013', 'CR-005', 'CR-008'],
        titulo: 'Filtros vindos do chat e dos Insights, etiquetas de filtros e ordenação por data',
        antes: 'Clicar numa barra da contagem podia abrir Projetos sem o filtro (a busca sem filtro chegava depois e apagava o resultado); os filtros ativos ficavam escondidos no painel; o card mostrava só o ano.',
        depois: 'Só a busca mais recente é desenhada, e o filtro vindo de fora aparece nos controles. Os filtros ativos viram etiquetas acima da lista, com X e "Limpar tudo"; o painel aplica na hora e fecha em "Ver N projetos" ou Esc. "Recentes" ordena pela data completa (desempate pelo título) e o card mostra mês e ano.',
      },
      {
        tipo: 'correcao', status: 'feito', area: 'Projetos', tickets: ['CR-033'],
        titulo: 'Baixar original e exportação sem falas de transcrição',
        antes: 'O botão "Baixar" não dizia o formato (na base de exemplo os originais são .md) e a seção de riscos do PDF/Word exportado trazia falas de reunião.',
        depois: 'O botão vira "Baixar original (MD)", com o formato do arquivo enviado; PDF e Word gerados pelo Radar ficam em "Exportar". A exportação tira perguntas e falas ("Nome: …") da seção de riscos. Verificado: os originais enviados estão guardados no servidor.',
      },
      {
        tipo: 'melhoria', status: 'feito', area: 'Projetos', tickets: ['CR-007', 'CR-031'],
        titulo: '"Meus projetos" por perfil e perfil ativo sempre visível',
        antes: '"Meus projetos" mostrava a mesma lista para consultor e gestor, e não havia sinal de qual perfil estava ativo.',
        depois: 'Cada usuário de demonstração representa um responsável da base (Consultor = Marina Costa, Gestor = Thiago Ramos); "Meus projetos" mostra os projetos em que ele é o responsável ou enviou documento. O botão de conta, no canto superior direito, mostra sempre quem está ativo (iniciais, nome e perfil) e abre o menu com o "Ver como".',
      },
      {
        tipo: 'melhoria', status: 'feito', area: 'Geral', tickets: ['CR-006', 'CR-015', 'CR-025', 'CR-026'],
        titulo: 'Menu com X, seção atual em destaque, títulos da ficha e lateral com ajuda',
        antes: 'O menu ⋮ só fechava clicando fora; a aba atual era pouco visível; os títulos da ficha eram pequenos e cinza; a ajuda ficava escondida no menu.',
        depois: 'O menu tem X (e Esc). A aba atual fica em azul cheio com um traço embaixo. Os títulos das seções da ficha estão maiores, em azul. A coluna de conversas ganhou o tom da marca e os atalhos "Como usar o Radar" e "Enviar feedback" (que abre só o formulário). Cards têm um ícone por segmento.',
      },
      {
        tipo: 'melhoria', status: 'feito', area: 'Projetos',
        titulo: 'Ficha do projeto: editar no lugar, comentários, histórico e excluir',
        antes: 'Para corrigir um dado era preciso abrir o formulário inteiro; o histórico ficava escondido na coluna da direita, sem comentários; e não havia como excluir um projeto.',
        depois: 'Ao passar o mouse num campo da ficha aparece um lápis: clicar edita ali mesmo (Enter salva, Esc cancela). Tecnologias e serviços editam no card: o consultor escolhe entre as opções existentes e o gestor também cria novas. Na coluna principal, "Comentários e histórico" junta comentários (balões) e alterações (cartões com antes → depois). Tecnologias, Palavras-chave e Projetos parecidos vêm recolhidos. O gestor, e só ele, exclui um projeto, com confirmação.',
      },
      {
        tipo: 'melhoria', status: 'feito', area: 'Qualidade',
        titulo: 'Roteiro da V0.0.2: 103 cenários, com Insights',
        antes: 'O roteiro tinha 74 cenários de Conversas, Projetos e Envio.',
        depois: 'O roteiro da V0.0.2 tem 103 cenários: os 74 anteriores (ajustados às telas novas) e 29 novos, entre eles 7 da aba Insights, a lista de conversas em caixas (C45), as seções da ficha que recolhem (P29) e a ficha com edição no lugar, comentários e exclusão (P30 a P33). Cada cenário novo diz quais tickets ele retesta; marcar OK valida esses tickets automaticamente.',
      },
    ],
  },
  {
    versao: 'V0.0.1',
    data: '05/11/2026',
    estado: 'Arquivada',
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
        tipo: 'melhoria', status: 'feito', area: 'Insights',
        titulo: 'Insights (novo): cinco lentes por perfil (protótipo do discovery r3)',
        antes: 'A aba Insights era igual para todos, misturava números de negócio com pendências de curadoria e mostrava taxas sem o tamanho da amostra.',
        depois: 'A aba Insights (novo), ao lado da atual, tem as lentes Negócio, Técnica, Pipeline, Pré-venda e Curadoria. Cada lente traz manchetes geradas por regra, cartões com uma pergunta, o n de cada número, o selo calculado ou IA e o caminho para os projetos. O gestor marca cadastros de teste, que saem dos números sem serem apagados. O resumo das manchetes também sai para agentes de relatório.',
      },
      {
        tipo: 'melhoria', status: 'feito', area: 'Qualidade',
        titulo: 'Tickets: prioridade, edição, kanban e imagens (menu Versão → Tickets)',
        antes: 'O ticket só aceitava retorno e troca de situação; não tinha prioridade, não dava para corrigir título ou descrição, a lista tinha um filtro só e as capturas de tela eram descartadas depois da análise da IA.',
        depois: 'Em Versão → Tickets há lista e kanban. A lista filtra por situação, tipo, área, prioridade e quem abriu (vários nomes de uma vez), com busca e ordenação (prioridade, mais recentes, mais antigos, atualizados). No kanban, arrastar o cartão muda a situação. Cada ticket tem prioridade (Crítica, Alta, Média, Baixa ou A definir) e pode ser editado: título, descrição, tipo, área e imagens. As imagens ficam guardadas no ImgBB, fora do servidor; no roteiro de testes, quem marca Falhou ou Bloqueado também pode anexar capturas de evidência, que vão para o ticket do cenário. Toda mudança entra no histórico com o nome de quem fez. Um ticket pode ser apagado (com motivo): some das listas e dos números, mas o registro fica guardado. No Acompanhamento, cada cenário do roteiro conta uma vez por versão, pelo resultado mais recente, porque os analistas dividem as áreas entre si.',
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
    <b>${i.titulo}</b>${i.tickets?.length ? `<span class="rn-tks">${i.tickets.map((c) => `<code>${c}</code>`).join(' ')}</span>` : ''}
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

// Só o formulário de feedback, sem as seções de versão, tickets e testes (lateral das conversas e convite de opinião).
export function showFeedback() {
  render('Enviar feedback', 'Conte o que aconteceu ou o que você mudaria', [SECOES_QUALIDADE.find(([id]) => id === 'feedback')]);
}

export function showReleaseNotes(v = NOTAS[0].versao) {
  render(`Versão ${VERSAO}`, 'Notas da versão, feedbacks e testes regressivos · protótipo com dados fictícios', [...NOTAS.map(secao), ...SECOES_QUALIDADE, COMO], v);
}
