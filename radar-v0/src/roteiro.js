// Roteiro de testes regressivos da versão, escrito para quem não é técnico.
// Cada cenário: objetivo, o que preparar, o passo a passo exato e o que deve acontecer.
// prioridade 'alta' = fluxo principal (fazer sempre); 'media' = variações e casos de borda.
// Cenários que alteram a base (aprovar envio, editar projeto) pedem para desfazer ou são feitos uma vez só.
// Ao mudar uma tela, revise os cenários dela: o texto precisa bater com os botões e rótulos reais.
// O roteiro abaixo é o da versão atual. Versões fechadas ficam congeladas em src/roteiros/<versão>.json (fim do arquivo).

import fs from 'node:fs';

// "Ver como" fica no botão de conta (iniciais, nome e perfil), no canto superior direito — separado do menu ⋮.
const PERFIL = (p, pessoa) => `Clique no botão de conta (círculo com as iniciais e o nome), no canto superior direito. Em "Ver como", escolha "${p}" (o botão passa a mostrar ${pessoa}). Clique fora para fechar.`;
const CONSULTOR = PERFIL('Consultor', 'Marina · Consultor');
const GESTOR = PERFIL('Gestor', 'Thiago · Gestor');
const NOVA = 'Na aba "Perguntar", clique no botão azul "Nova conversa", no alto da coluna da esquerda.';
const PERGUNTE = (q) => `Clique na caixa de texto na parte de baixo da tela, escreva exatamente: "${q}" e aperte Enter.`;
const ESPERE = 'Espere a resposta aparecer.';
const ETIQUETA = 'Olhe a etiqueta pequena acima da resposta, à direita (ela diz o tipo de resposta).';
const PROJETOS = 'Clique na aba "Projetos", no alto da tela.';
const FILTROS = 'Clique no botão "Filtros", ao lado da caixa de busca, para abrir o painel de filtros à esquerda.';
const LIMPAR = 'Ao terminar, clique em "Limpar", no alto do painel de filtros.';
// Envio de arquivos (V0.0.2): sempre dentro de um projeto (bloco "Enviar arquivo" da ficha) ou pela conversa (clipe).
const ABRA_PROJETO = (cliente) => `Clique na aba "Projetos", no alto da tela, e abra o projeto da ${cliente}.`;
const ESCOLHA = (a) => `Role a ficha até o bloco "Enviar arquivo" (logo acima de "Comentários e histórico"), clique em "escolha" e selecione o arquivo "${a}" que você baixou (ou arraste o arquivo para o bloco).`;
const ESPERE_ENVIO = 'Espere o cartão do arquivo aparecer em "Aguardando aprovação" com "tudo certo" ou "pontos para conferir" e clique em "Mais detalhes" para abrir a revisão.';
const DESCARTAR = 'No fim, clique em "Descartar" (na janela ou no cartão) para não colocar o arquivo na base.';
const FOCO = (cliente) => `Na aba "Perguntar", clique no ícone de alvo, na ponta esquerda da caixa de pergunta, e escolha o projeto da ${cliente}.`;
const CELULAR = 'No celular, abra o mesmo endereço do Radar no navegador e entre com o mesmo usuário e senha.';

const c = (id, prioridade, titulo, objetivo, preparo, passos, esperado, extra = {}) => ({ id, area: { C: 'conversas', P: 'projetos', U: 'upload', I: 'insights' }[id[0]], prioridade, titulo, objetivo, preparo, passos, esperado, ...extra });

export const ROTEIRO = [
  // =====================================================================
  // CONVERSAS (aba Perguntar)
  // =====================================================================
  c('C01', 'alta', 'Pergunta sobre projetos parecidos',
    'Ver se o Radar encontra projetos parecidos e mostra de onde tirou a informação.',
    [CONSULTOR, NOVA],
    [PERGUNTE('Já fizemos fraude em seguros?'), ESPERE, ETIQUETA],
    ['A etiqueta diz "Projetos parecidos".', 'Aparece pelo menos um card de projeto do segmento Seguros.', 'Cada card mostra o título, o cliente, o status e uma porcentagem de semelhança.', 'Os nomes de clientes citados no texto da resposta são os mesmos dos cards.']),

  c('C02', 'media', 'Pergunta sem acento e com erro de digitação',
    'Ver se o Radar entende a pergunta mesmo escrita de forma informal.',
    [CONSULTOR, NOVA],
    [PERGUNTE('ja fizemos fraude em seguros'), ESPERE],
    ['A resposta é parecida com a do cenário C01: etiqueta "Projetos parecidos" e card do segmento Seguros.']),

  c('C03', 'alta', 'Listagem completa (consolidado)',
    'Ver se um pedido de lista traz a lista, e não "projetos parecidos".',
    [CONSULTOR, NOVA],
    [PERGUNTE('faça um consolidado de todos os projetos'), ESPERE, ETIQUETA, 'Clique em uma linha da tabela.'],
    ['A etiqueta diz "Listagem".', 'Aparece uma tabela com as colunas Projeto, Cliente, Segmento, Status e Ano.', 'O texto informa quantos projetos existem.', 'O clique na linha abre a janela de detalhe daquele projeto.']),

  c('C04', 'alta', 'Listagem com filtro de status e ano',
    'Ver se o Radar aplica os filtros que estão na pergunta.',
    [CONSULTOR, NOVA],
    [PERGUNTE('Liste os projetos entregues em 2025'), ESPERE, 'Leia as colunas Status e Ano de todas as linhas da tabela.'],
    ['A etiqueta diz "Listagem".', 'Todas as linhas têm status "Entregue".', 'Todas as linhas têm ano 2025.']),

  c('C05', 'media', 'Listagem por segmento e por status',
    'Ver variações de pedido de lista.',
    [CONSULTOR, NOVA],
    [PERGUNTE('quantos projetos temos de Saúde?'), ESPERE, PERGUNTE('liste as propostas perdidas'), ESPERE],
    ['As duas respostas têm a etiqueta "Listagem".', 'Na primeira, todas as linhas são do segmento Saúde e o texto diz quantos são.', 'Na segunda, todas as linhas têm status "Perdida" (a base de exemplo já tem uma proposta perdida, da ModaViva; não é preciso enviar nada).']),

  c('C06', 'media', 'Abrir a listagem na tela de Projetos',
    'Ver se dá para continuar a análise na tela de Projetos com os mesmos filtros.',
    ['Faça o cenário C04 até a tabela aparecer.'],
    ['Abaixo da tabela, clique no botão "Abrir em Projetos" (ou "Ver os N em Projetos").'],
    ['A aba "Projetos" abre sozinha.', 'O painel de filtros aparece com "Entregue" marcado em Status.', 'Os cards mostram os mesmos projetos da tabela.']),

  c('C07', 'alta', 'Contagem por "áreas" e troca de agrupamento',
    'Ver se o Radar conta projetos e permite ver por outro critério.',
    [CONSULTOR, NOVA],
    [PERGUNTE('quais áreas têm projetos?'), ESPERE, 'Abaixo das barras, clique no botão "Ver por prática NTT".', ESPERE],
    ['A primeira resposta tem a etiqueta "Contagem" e barras com um número ao lado de cada item.', 'Aparecem botões para ver por outro critério (por exemplo "Ver por prática NTT" e "Ver por serviço").', 'Depois do clique, chega uma nova resposta agrupada por prática NTT.']),

  c('C08', 'media', 'Contagem por tecnologia, por ano e por cliente',
    'Ver outras formas de contagem.',
    [CONSULTOR, NOVA],
    [PERGUNTE('Quantos projetos por tecnologia?'), ESPERE, PERGUNTE('distribuição de projetos por ano'), ESPERE, PERGUNTE('quais clientes temos na base?'), ESPERE],
    ['As três respostas têm a etiqueta "Contagem", cada uma por uma dimensão (o cruzamento tecnologia × ano em barras empilhadas não está nesta versão).', 'Na de tecnologia, o texto avisa que um projeto pode contar em mais de um item.', 'Na de ano, as barras mostram anos (ex.: 2026, 2025, 2024).', 'Na de clientes, aparecem nomes de clientes com a quantidade de projetos de cada um.'],
    { tickets: ['CR-040'] }),

  c('C09', 'media', 'Clicar numa barra da contagem',
    'Ver se o item da contagem leva aos projetos dele.',
    [CONSULTOR, NOVA, PERGUNTE('Quais segmentos já atendemos?'), ESPERE],
    ['Na lista de barras, clique no nome de um segmento (por exemplo "Varejo").'],
    ['A aba "Projetos" abre sozinha.', 'Só aparecem cards do segmento clicado, e o filtro aparece como etiqueta acima da lista (ex.: "Segmento: Varejo").', 'A quantidade de cards é igual ao número que aparecia ao lado da barra.']),

  c('C10', 'alta', 'Ficha de um projeto: consultor não vê valores, gestor vê',
    'Ver se a ficha respeita o que cada perfil pode ver.',
    [CONSULTOR, NOVA],
    [PERGUNTE('Qual o prazo, o valor e a margem do P001?'), ESPERE, 'Anote o que aparece em Valor e Margem.', GESTOR, NOVA, PERGUNTE('Qual o prazo, o valor e a margem do P001?'), ESPERE],
    ['As duas respostas têm a etiqueta "Ficha do projeto".', 'Como consultor: Valor e Margem aparecem com um cadeado e o texto "restrito ao seu perfil".', 'Como gestor: Valor aparece em reais e Margem em porcentagem.', 'O prazo aparece nas duas.']),

  c('C11', 'media', 'Ficha pelo nome do projeto',
    'Ver se o Radar acha o projeto pelo nome, sem o código.',
    [CONSULTOR, NOVA],
    [PERGUNTE('qual o prazo do projeto Predição de churn em tempo real para banda larga?'), ESPERE],
    ['A etiqueta diz "Ficha do projeto".', 'A ficha é do projeto da ConectaFibra Telecom e mostra o prazo em meses.']),

  c('C12', 'alta', 'Projeto confidencial não aparece para o consultor',
    'Ver se um projeto confidencial fica escondido de quem não tem permissão.',
    [CONSULTOR, NOVA],
    [PERGUNTE('ficha do P005'), ESPERE, GESTOR, NOVA, PERGUNTE('ficha do P005'), ESPERE],
    ['Como consultor: o Radar não mostra nenhum dado do P005 (nem cliente, nem valor) e responde só "Não encontrei o P005 entre os projetos que o seu perfil pode ver", oferecendo buscar pelo tema, sem listar outros projetos.', 'Como gestor: aparece a ficha do projeto da Cooperativa de Crédito Horizonte, com valor e margem na tabela; o texto não repete os campos da tabela.']),

  c('C13', 'alta', 'Comparar dois projetos pelo código',
    'Ver a comparação lado a lado.',
    [CONSULTOR, NOVA],
    [PERGUNTE('compare o P001 com o P002'), ESPERE],
    ['A etiqueta diz "Comparação".', 'Aparece uma tabela com uma coluna para cada projeto.', 'O texto resume o que é igual e o que é diferente (segmento, status, prazo, tecnologias).']),

  c('C14', 'alta', 'Comparar os projetos da resposta anterior ("os dois")',
    'Ver se o Radar entende "os dois" como os projetos que acabou de mostrar.',
    [GESTOR, NOVA],
    [PERGUNTE('mostre todos os projetos de varejo'), ESPERE, 'Anote os nomes dos projetos da tabela.', PERGUNTE('compare os dois'), ESPERE],
    ['A segunda resposta tem a etiqueta "Comparação".', 'A tabela compara exatamente os projetos da lista anterior, lado a lado.']),

  c('C15', 'alta', 'Pergunta composta (várias etapas)',
    'Ver se o Radar resolve uma pergunta que pede mais de uma coisa.',
    [GESTOR, NOVA],
    [PERGUNTE('liste os projetos de varejo e compare os dois'), ESPERE, 'Passe o mouse sobre a etiqueta acima da resposta.', CONSULTOR, NOVA, PERGUNTE('liste os projetos de varejo e compare os dois'), ESPERE],
    ['A etiqueta diz "Resposta em etapas"; passando o mouse, aparecem as etapas (ex.: "listou projetos → leu a ficha").', 'A resposta traz os projetos de varejo e a comparação entre eles.', 'Como gestor, a resposta pode citar valores em reais.', 'Como consultor, nenhum valor em reais nem margem aparece no texto ou na tabela.']),

  c('C16', 'alta', 'Continuar a conversa com "neles"',
    'Ver se o Radar mantém o assunto quando a pergunta se refere à resposta anterior.',
    [CONSULTOR, NOVA],
    [PERGUNTE('quais as principais empresas de energia que trabalhamos?'), ESPERE, 'Anote os nomes dos clientes.', PERGUNTE('quais os resultados neles?'), ESPERE],
    ['A segunda resposta tem a etiqueta "Resultados".', 'Ela fala dos mesmos clientes da resposta anterior, sem trazer clientes novos.', 'Para cada projeto aparece o resultado registrado ou o aviso "Sem resultados registrados".']),

  c('C17', 'media', 'Continuar a conversa trocando o segmento ("e em varejo?")',
    'Ver se o Radar mantém o tema e troca só o segmento.',
    [CONSULTOR, NOVA],
    [PERGUNTE('projetos de churn em telecom'), ESPERE, PERGUNTE('e em varejo?'), ESPERE],
    ['A segunda resposta mostra a etiqueta "continuando a conversa".', 'Ela fala de churn (perda de clientes) no varejo, e não de varejo em geral, e deixa claro o que entendeu (ex.: projetos de churn no varejo).', 'Na caixa de texto aparece a marca "lembrando 1 pergunta" (ou mais).'],
    { tickets: ['CR-036'] }),

  c('C18', 'media', 'Continuar uma contagem ("desses")',
    'Ver se o Radar aplica um filtro novo sobre a resposta anterior.',
    [CONSULTOR, NOVA],
    [PERGUNTE('Quais segmentos já atendemos?'), ESPERE, PERGUNTE('quais desses têm projetos entregues?'), ESPERE],
    ['A segunda resposta tem a etiqueta "Contagem".', 'O texto fala só dos projetos com status entregue.', 'O total da segunda resposta é menor ou igual ao da primeira.']),

  c('C19', 'media', 'Esquecer a memória da conversa',
    'Ver se o botão de esquecer começa do zero.',
    ['Faça o cenário C17 até o fim.'],
    ['Na marca "lembrando N perguntas", dentro da caixa de texto, clique no X.', PERGUNTE('e em varejo?'), ESPERE],
    ['Depois do X, a tela volta para a tela inicial de conversa nova e a marca "lembrando" some.', 'A resposta de "e em varejo?" não fala mais de churn: ela trata a pergunta sozinha (ou pede para você explicar melhor).']),

  c('C20', 'media', 'Pergunta ambígua: o Radar pergunta de volta',
    'Ver se o Radar oferece opções quando não entende.',
    [CONSULTOR, NOVA],
    [PERGUNTE('me fala sobre aquilo'), ESPERE, 'Clique em uma das opções que aparecerem.', ESPERE],
    ['A etiqueta diz "Pergunta de volta" e aparecem de 2 a 3 opções clicáveis.', 'Clicar numa opção envia aquela pergunta e chega uma resposta normal.']),

  c('C21', 'alta', 'Pergunta fora do assunto',
    'Ver se o Radar recusa com educação o que não é sobre propostas e projetos.',
    [NOVA],
    [PERGUNTE('qual a previsão do tempo para amanhã?'), ESPERE, ETIQUETA],
    ['A etiqueta diz "Conversa".', 'O Radar explica, com educação, que isso foge do que ele faz (propostas, cases, projetos da base e uso do Radar) e pergunta se pode ajudar com algo assim.', 'Abaixo aparecem sugestões clicáveis de perguntas que ele responde.', 'Nenhum card de projeto aparece.'],
    { tickets: ['CR-053'] }),

  c('C22', 'media', 'Assunto que não existe na base',
    'Ver se o Radar não inventa projetos.',
    [NOVA],
    [PERGUNTE('projetos de computação quântica para mineração em Marte'), ESPERE],
    ['O Radar diz que não encontrou evidência ou que a pergunta está fora do que a base responde.', 'Nenhum card de projeto aparece e nenhum projeto é inventado no texto.']),

  c('C23', 'alta', 'Dar foco a um projeto ("Proposta em foco")',
    'Ver se o chat passa a responder pensando no projeto escolhido.',
    [CONSULTOR, NOVA],
    ['Na ponta esquerda da caixa de pergunta, clique no ícone de alvo ("Proposta em foco").', 'Na caixa de busca que abrir, escreva "Bom Preço" e clique no projeto da Rede Bom Preço Supermercados.', 'Leia a faixa que aparece acima do chat e as sugestões da tela.', PERGUNTE('algum case parecido?'), ESPERE, 'Na faixa "Respondendo com foco em…", clique no X.', 'Escolha o foco de novo e tire pelo X do botão "Foco: …".'],
    ['Aparece a faixa "Respondendo com foco em Rede Bom Preço Supermercados".', 'As sugestões da tela inicial mudam para perguntas sobre esse cliente.', 'A resposta traz cards de projetos parecidos com o da Rede Bom Preço.', 'Antes de clicar, o botão é só um ícone; ao clicar, ele se abre com uma animação suave mostrando "Proposta em foco" e a lista. Com o projeto escolhido, mostra "Foco: Rede Bom Preço Supermercados", em azul, com um X.', 'Depois do X (da faixa ou do botão), a faixa some e o botão volta a ser só o ícone.']),

  c('C24', 'alta', 'Ver os detalhes de um card de resposta',
    'Ver se o card mostra as evidências e a explicação da posição.',
    [CONSULTOR, NOVA, PERGUNTE('tem algum case de manutenção preditiva?'), ESPERE],
    ['Clique no título do primeiro card para abri-lo.', 'Clique em "Trechos que sustentam a resposta".', 'Clique em "Por que apareceu nesta posição".', 'Em "Fontes", no fim do card, clique em um dos documentos.', 'Feche a janela do documento.'],
    ['O card abre e mostra primeiro o segmento, o prazo, a justificativa e o resumo; as tecnologias aparecem uma vez só, no fim do card.', 'Os trechos mostram frases dos documentos do projeto.', 'A explicação mostra barras com fatores como conteúdo, segmento e tecnologias.', 'O documento abre numa janela com o texto e o botão "Baixar original".', 'Como consultor, no lugar do preço aparece "preço e margem restritos" (os resultados em reais dos cases continuam aparecendo).'],
    { tickets: ['CR-051'] }),

  c('C25', 'media', 'Reaproveitar um card: abrir, copiar escopo e usar como base',
    'Ver os botões de reaproveitamento.',
    [GESTOR, NOVA, PERGUNTE('Já fizemos fraude em seguros?'), ESPERE, 'Abra o primeiro card clicando no título.'],
    ['Clique em "Copiar escopo" e cole (Ctrl+V) num bloco de notas.', 'Clique em "Abrir projeto" e depois feche a janela pelo X.', 'Clique em "Usar como base".', 'Feche o formulário pelo X, sem cadastrar.', CONSULTOR, 'Repita a pergunta numa conversa nova e abra o primeiro card.'],
    ['Aparece o aviso "Escopo copiado" e o texto colado tem o título, o cliente e o escopo.', '"Abrir projeto" abre o detalhe do projeto.', '"Usar como base" abre o formulário "Novo projeto" já com segmento, tecnologias e serviços preenchidos.', 'Como consultor, o botão "Usar como base" não aparece.']),

  c('C26', 'alta', 'Avaliar uma resposta (útil / não ajudou)',
    'Ver se é possível dar retorno sobre uma resposta.',
    [NOVA, PERGUNTE('tem algum case de manutenção preditiva?'), ESPERE],
    ['No primeiro card, clique no polegar para cima ("Útil").', 'No segundo card (se houver), clique no polegar para baixo ("Não ajudou").', 'Escolha um dos motivos que aparecem.'],
    ['Depois do polegar para cima, aparece o aviso "Obrigado! Isso melhora as próximas buscas."', 'Depois do polegar para baixo, aparecem os motivos "Não é parecido", "Informação errada", "Desatualizado" e "Outro".', 'Depois do motivo, aparece o aviso "Obrigado! Vamos usar isso para ajustar a busca."']),

  c('C27', 'alta', 'Conversa salva, renomeada e encontrada pela busca',
    'Ver se as conversas ficam guardadas e podem ser encontradas.',
    [NOVA],
    [PERGUNTE('Quais segmentos já atendemos?'), ESPERE, 'Clique no título da conversa, no alto, apague o texto, escreva "Teste do roteiro" seguido do seu nome e aperte Enter.', 'Na coluna da esquerda, clique em "Buscar conversas" e escreva "Teste do roteiro".', 'Clique na conversa encontrada.'],
    ['Depois do Enter, aparece o aviso "Conversa renomeada".', 'A busca da esquerda mostra a conversa com o novo nome.', 'Clicar nela reabre a conversa com a pergunta e a resposta.']),

  c('C28', 'media', 'Favoritar e desfavoritar uma conversa',
    'Ver se as favoritas ficam no alto da lista.',
    ['Faça o cenário C27.'],
    ['Clique na estrela (☆) no alto da conversa, à direita do título.', 'Olhe a coluna da esquerda.', 'Clique de novo na estrela.'],
    ['A estrela fica preenchida e a conversa aparece na caixa "Favoritas", no alto da lista, com a estrela sempre visível.', 'Nas outras conversas, a estrela só aparece ao passar o mouse.', 'Clicando de novo, a estrela fica vazia e a conversa sai de "Favoritas" (continua em "Recentes" ou no grupo dela).'],
    { tickets: ['CR-004'] }),

  c('C29', 'media', 'Excluir uma conversa',
    'Ver se a exclusão pede confirmação antes de apagar.',
    ['Faça o cenário C27 (use a sua conversa "Teste do roteiro", não a de outra pessoa).'],
    ['Na coluna da esquerda, passe o mouse sobre a conversa e clique nos três pontinhos (⋯) à direita dela.', 'Clique em "Excluir".', 'Na janela que abre, clique em "Cancelar".', 'Repita os dois primeiros passos e clique fora da janela.', 'Repita mais uma vez e clique em "Excluir conversa".'],
    ['A janela "Excluir conversa" mostra o nome da conversa e avisa que a exclusão é permanente.', '"Cancelar" e o clique fora fecham a janela sem apagar nada.', '"Excluir conversa" apaga: a conversa some da lista e aparece o aviso "Conversa excluída".']),

  c('C30', 'media', 'Reabrir uma conversa e continuar perguntando',
    'Ver se a memória volta quando a conversa é reaberta.',
    ['Faça os cenários C16 e C27 (deixe uma conversa salva).'],
    ['Clique em "Nova conversa".', 'Na coluna da esquerda, clique na conversa do cenário C16.', PERGUNTE('e qual o prazo deles?'), ESPERE],
    ['A conversa reabre com todas as perguntas e respostas anteriores.', 'A marca "lembrando N perguntas" aparece na caixa de texto.', 'A resposta fala dos mesmos projetos de energia da conversa.']),

  c('C31', 'media', 'Sugestões da tela inicial mudam com o perfil',
    'Ver se cada perfil recebe sugestões próprias.',
    [CONSULTOR, NOVA],
    ['Anote as sugestões que aparecem no meio da tela.', 'Clique em uma delas.', ESPERE, GESTOR, NOVA, 'Compare as sugestões com as anotadas.'],
    ['Clicar numa sugestão envia a pergunta sem precisar digitar.', 'As sugestões do gestor são diferentes das do consultor (ex.: "Quantos projetos por status?").']),

  c('C32', 'media', 'Detalhes técnicos da resposta (ícone "i")',
    'Ver como o Radar entendeu a pergunta.',
    [NOVA, PERGUNTE('e os de varejo?'), ESPERE],
    ['Passe o mouse sobre o pequeno "i" à direita da etiqueta da resposta.'],
    ['Aparece uma caixa com o tempo da resposta, "IA: DeepSeek" e, quando a pergunta foi reescrita, "Entendi como: …".']),

  c('C33', 'media', 'Envio vazio e pergunta muito longa',
    'Ver se o Radar lida com envio sem texto e texto grande.',
    [NOVA],
    ['Com a caixa de texto vazia, aperte Enter.', 'Escreva uma pergunta longa, com umas 5 linhas, descrevendo uma proposta de dados para um banco (cliente, objetivo, tecnologias), e aperte Enter.', ESPERE],
    ['Com a caixa vazia, nada acontece (nenhuma mensagem vazia é enviada).', 'A pergunta longa recebe uma resposta normal, sem erro.']),

  c('C34', 'media', 'Conversas no celular',
    'Ver se o chat funciona bem na tela pequena.',
    [CELULAR],
    ['Na aba "Perguntar", faça a pergunta "faça um consolidado de todos os projetos".', 'Arraste a tabela da resposta para o lado com o dedo.', 'Toque no ícone de lista, no alto à esquerda da conversa, para abrir a lista de conversas, e toque numa conversa.'],
    ['A tabela rola para o lado dentro da resposta, sem a página inteira sair da tela.', 'A lista de conversas abre como uma gaveta e fecha ao tocar numa conversa.', 'As abas ficam numa barra na parte de baixo da tela.']),

  // =====================================================================
  // PROJETOS (aba Projetos)
  // =====================================================================
  c('P01', 'alta', 'Ler o card de projeto (gestor)',
    'Ver se os cards trazem as informações de negócio.',
    [GESTOR],
    [PROJETOS, 'Escolha qualquer card e leia o que está escrito nele.', 'Passe o mouse sobre as letras no canto inferior direito do card (P, A, C…).'],
    ['Cada card mostra status, título, cliente e segmento.', 'Quando há mais de um projeto com o mesmo cliente, aparece "N projetos com o cliente".', 'Passando o mouse sobre as letras, aparece o nome completo de cada documento (proposta, apresentação, case…).', 'Como gestor, aparece o valor em reais.', 'Acima dos cards aparece o total de projetos.']),

  c('P02', 'alta', 'Card sem valor para o consultor',
    'Ver se o consultor não vê valores nos cards.',
    [CONSULTOR],
    [PROJETOS, 'Olhe a parte de baixo de três cards diferentes.'],
    ['Nenhum card mostra valor em reais.', 'No lugar do valor aparece "Porte" com P, M, G ou GG.', 'Nenhum card mostra o cadeado de "Confidencial".']),

  c('P03', 'alta', 'Filtrar por segmento e limpar',
    'Ver se os filtros reduzem a lista corretamente.',
    [GESTOR, PROJETOS],
    ['Anote o total de projetos que aparece acima dos cards.', FILTROS, 'No grupo "Segmento", marque "Varejo".', 'Olhe o total e os cards.', LIMPAR],
    ['Depois de marcar Varejo, só aparecem cards do segmento Varejo e o total diminui.', 'O número ao lado de "Varejo" no filtro é igual à quantidade de cards.', 'O botão "Filtros" mostra o número 1 (um filtro ativo).', 'Depois de "Limpar", o total volta ao número anotado.']),

  c('P04', 'alta', 'Combinar filtros de grupos diferentes',
    'Ver se dois filtros juntos mostram só o que atende aos dois.',
    [GESTOR, PROJETOS, FILTROS],
    ['Em "Segmento", marque "Utilities / Energia".', 'Em "Status", marque "Entregue".', 'Confira os cards.', LIMPAR],
    ['Só aparecem cards de Utilities / Energia com status Entregue.', 'O botão "Filtros" mostra o número 2.', 'Se nenhum projeto atender aos dois, aparece "Nenhum projeto com esses critérios" e o botão "Limpar filtros".']),

  c('P05', 'media', 'Vários itens no mesmo grupo e "todas" × "qualquer"',
    'Ver a diferença entre exigir todas as tecnologias ou qualquer uma.',
    [GESTOR, PROJETOS, FILTROS],
    ['Em "Tecnologias", marque "Python" e "Azure".', 'Anote o total. Ao lado do título "Tecnologias", a opção "todas" deve estar marcada.', 'Ao lado do título "Tecnologias", marque "qualquer".', 'Anote o total de novo.', LIMPAR],
    ['Com "todas", aparecem só projetos que têm Python e Azure ao mesmo tempo.', 'Com "qualquer", aparecem projetos com Python ou com Azure, e o total é maior ou igual ao anterior.']),

  c('P06', 'media', 'Filtrar por documento disponível',
    'Ver se dá para achar projetos que têm um tipo de documento.',
    [GESTOR, PROJETOS, FILTROS],
    ['No grupo "Tem documento", marque "Case de sucesso".', 'Olhe as letras no canto dos cards.', LIMPAR],
    ['Todos os cards que sobram têm a letra C (case) entre as letras do canto.']),

  c('P07', 'media', 'Filtrar por cliente, prazo e data',
    'Ver os filtros de texto, número e data.',
    [GESTOR, PROJETOS, FILTROS],
    ['Na caixa "Cliente", escreva "Energisul" e olhe os cards. Depois apague.', 'Em prazo, escreva 4 em "meses de" e 6 em "até". Olhe os cards. Depois apague os dois.', 'Em data, escolha 01/01/2025 no primeiro campo e 31/12/2025 no segundo. Olhe os cards.', LIMPAR],
    ['Com "Energisul", só aparecem projetos desse cliente.', 'Com prazo de 4 a 6 meses, todos os cards mostram prazo entre 4 e 6 m.', 'Com a data de 2025, todos os cards mostram o ano 2025.']),

  c('P08', 'alta', 'Filtro de valor só para o gestor',
    'Ver se o filtro de valor some para quem não pode ver valores.',
    [GESTOR, PROJETOS, FILTROS],
    ['Procure os campos "R$ de" e "até" no painel de filtros.', 'Escreva 1000000 em "R$ de" e olhe os cards.', LIMPAR, CONSULTOR, 'Abra o painel de filtros de novo e procure os campos de valor.'],
    ['Como gestor, os campos de valor aparecem e, com R$ 1.000.000, só ficam projetos a partir desse valor.', 'Como consultor, os campos de valor não aparecem.']),

  c('P09', 'media', '"Meus projetos"',
    'Ver o filtro de projetos ligados a você.',
    [CONSULTOR, PROJETOS, FILTROS],
    ['Clique em "Meus projetos", no alto do painel de filtros, e anote os projetos.', 'Clique de novo para desligar.', GESTOR, 'Ligue "Meus projetos" de novo.'],
    ['No canto superior direito, o botão de conta mostra "MC Marina · Consultor" e depois "TR Thiago · Gestor".', 'Como consultor, aparecem os projetos em que Marina Costa é a responsável (ou em que esse perfil enviou documento).', 'Como gestor, a lista é outra: os projetos de Thiago Ramos.', 'Clicando de novo, a lista completa volta.']),

  c('P10', 'alta', 'Buscar no conteúdo dos documentos',
    'Ver se a busca encontra projetos pelo que está escrito nos documentos.',
    [PROJETOS],
    ['Clique na caixa "Buscar no conteúdo dos documentos" e escreva "churn".', 'Espere um segundo e leia o trecho destacado nos cards.', 'Apague o texto.'],
    ['A lista mostra só projetos que falam de churn.', 'Os cards mostram um trecho do documento com a palavra destacada.', 'Apagando o texto, a lista completa volta.']),

  c('P11', 'media', 'Busca com várias palavras: "todas" × "qualquer"',
    'Ver como a busca combina palavras.',
    [PROJETOS, FILTROS],
    ['Na caixa de busca, escreva "churn varejo".', 'No painel de filtros, a opção "todas as palavras" deve estar marcada. Anote o total.', 'Marque "qualquer" e anote o total de novo.', 'Apague a busca e clique em "Limpar".'],
    ['Com "todas as palavras", aparecem só projetos que falam de churn e de varejo.', 'Com "qualquer", o total é maior ou igual.']),

  c('P12', 'media', 'Busca sem resultado leva ao chat',
    'Ver o que acontece quando nada é encontrado.',
    [PROJETOS],
    ['Na caixa de busca, escreva "xyzteste".', 'Clique no botão "Perguntar ao Radar sobre “xyzteste”".'],
    ['Aparece "Nenhum projeto com esses critérios".', 'O botão leva para a aba "Perguntar" e envia a pergunta.']),

  c('P13', 'media', 'Ordenar a lista',
    'Ver se a ordenação muda a ordem dos cards.',
    [GESTOR, PROJETOS],
    ['Clique na caixa de ordenação (mostra "Relevância"), ao lado do botão Filtros, e escolha "Recentes".', 'Escolha "Prazo".', 'Escolha "A–Z".', 'Escolha "Valor".', CONSULTOR, 'Abra a caixa de ordenação de novo.'],
    ['"Recentes": da data mais nova para a mais antiga; os cards mostram mês e ano (ex.: set/2026).', '"Prazo": em ordem de prazo.', '"A–Z": em ordem alfabética do título.', '"Valor" (gestor): do maior para o menor valor.', 'Como consultor, a opção "Valor" não aparece na lista.']),

  c('P14', 'alta', 'Abrir o detalhe do projeto',
    'Ver se o detalhe mostra os dados e os documentos.',
    [GESTOR, PROJETOS],
    ['Clique num card qualquer.', 'Leia a coluna da direita ("Ficha", "Tecnologias", "Serviços", "Projetos parecidos").', 'Role a janela até o fim e clique em "Documentos" para abrir a seção.', 'Clique em "Documentos" de novo para fechar.', 'Feche pelo X no canto superior direito.'],
    ['Abre uma janela com título, cliente, objetivo e contexto; Resultados, Lições aprendidas, Riscos e Documentos vêm fechados, com a quantidade de itens no título e uma setinha.', 'A coluna "Ficha" mostra cliente, segmento, status, acesso e origem.', 'Ao abrir "Documentos", cada documento mostra o tipo (proposta, apresentação, case…); clicar no título de novo fecha a seção.', 'O X fecha a janela e você volta para a lista.']),

  c('P15', 'media', 'Navegar para um projeto parecido e abrir um documento',
    'Ver as ligações entre projetos e os documentos.',
    [GESTOR, PROJETOS, 'Abra o detalhe de um projeto que tenha "Projetos parecidos" na coluna da direita.'],
    ['Na coluna da direita, clique em "Projetos parecidos" para abrir o card e clique num dos projetos.', 'No novo detalhe, abra a seção "Documentos" e clique no nome de um documento.', 'Na janela do documento, clique em "Baixar original".', 'Feche as janelas.'],
    ['O detalhe muda para o projeto parecido.', 'O documento abre numa janela com o texto.', '"Baixar original" baixa o arquivo como foi enviado (na base de exemplo os documentos são .md; o botão mostra o formato). PDF e Word gerados pelo Radar ficam em "Exportar", na ficha.']),

  c('P16', 'alta', 'Detalhe do projeto como consultor',
    'Ver se o consultor não vê valores no detalhe.',
    [CONSULTOR, PROJETOS],
    ['Abra o detalhe de um projeto qualquer.', 'Procure valor e margem.'],
    ['Valor aparece com cadeado (oculto para o perfil).', 'O botão "Usar como base" não aparece no alto da janela.']),

  c('P17', 'alta', 'Exportar proposta (apresentação e resumo)',
    'Ver se o Radar gera os documentos para o cliente.',
    [GESTOR, PROJETOS, 'Abra o detalhe de um projeto com vários documentos (ex.: o da Energisul).'],
    ['Clique em "Exportar", no alto da janela.', 'Deixe "Apresentação para o cliente" e "PowerPoint" e clique em "Gerar PowerPoint".', 'Abra o arquivo baixado.', 'Clique em "Exportar" de novo, escolha "Resumo executivo" e "PDF" e clique em "Gerar PDF".', CONSULTOR, 'Abra o mesmo projeto, clique em "Exportar" e leia a parte de baixo da janela.'],
    ['Os arquivos são baixados e abrem sem erro, com o título e o cliente do projeto.', 'As seções marcadas em "O que levar para o documento" aparecem no arquivo.', 'Como consultor, aparece o aviso "Valores e margens não entram para o seu perfil".']),

  c('P18', 'media', 'Escolher as seções da exportação',
    'Ver se dá para tirar e pôr seções.',
    [GESTOR, PROJETOS, 'Abra o detalhe de um projeto e clique em "Exportar".'],
    ['Clique em "Limpar", ao lado de "O que levar para o documento".', 'Marque só duas seções.', 'Clique em "Marcar todas".', 'Feche a janela sem gerar ("Cancelar").'],
    ['"Limpar" desmarca todas.', '"Marcar todas" marca todas as que estão disponíveis; as indisponíveis ficam cinza e explicam o motivo.', '"Cancelar" fecha sem baixar nada.']),

  c('P19', 'media', 'Perguntar sobre o projeto a partir do detalhe',
    'Ver o atalho do detalhe para o chat.',
    [PROJETOS, 'Abra o detalhe de um projeto.'],
    ['Clique em "Perguntar", no alto da janela.'],
    ['A janela fecha e a aba "Perguntar" abre com o título e o cliente do projeto já escritos na caixa de texto.']),

  c('P20', 'media', '"Usar como base" a partir do detalhe',
    'Ver se o cadastro novo já vem preenchido.',
    [GESTOR, PROJETOS, 'Abra o detalhe de um projeto.'],
    ['Clique em "Usar como base".', 'Leia o formulário.', 'Feche pelo X, sem cadastrar.'],
    ['Abre o formulário "Novo projeto" com a marca "a partir de" e o nome do projeto original.', 'Segmento, tecnologias e serviços já vêm preenchidos.', 'Fechar pelo X não cria nada.']),

  c('P21', 'alta', 'Cadastro de projeto só para o gestor',
    'Ver se só o gestor tem o botão de cadastrar.',
    [],
    [CONSULTOR, PROJETOS, 'Procure o botão azul "Projeto", à direita da barra de busca.', GESTOR, 'Procure de novo o botão azul "Projeto" e clique nele.', 'Feche o formulário pelo X, sem cadastrar.'],
    ['Como consultor, o botão "Projeto" não aparece.', 'Como gestor, o botão aparece e abre o formulário "Novo projeto".', 'Fechar pelo X não cria nada.']),

  c('P22', 'alta', 'Preencher o cadastro com IA',
    'Ver se o Radar preenche os campos a partir de uma frase.',
    [GESTOR, PROJETOS, 'Clique no botão azul "Projeto".'],
    ['Na caixa "Descreva o projeto em uma frase…", escreva: "Modelo de previsão de demanda para uma rede de farmácias usando Azure e Power BI, em 5 meses".', 'Clique no botão com estrelinhas ao lado ("Sugerir campos").', 'Espere e leia os campos.', 'Feche pelo X, sem cadastrar.'],
    ['Os campos de segmento, tecnologias (Azure, Power BI), serviços e prazo são preenchidos.', 'Se houver projetos parecidos na base, o Radar mostra links para eles.', 'Nada é cadastrado ao fechar pelo X.']),

  c('P23', 'media', 'Editar um projeto e desfazer',
    'Ver se a edição grava e fica no histórico.',
    [GESTOR, PROJETOS, 'Abra o detalhe do projeto da AgroCerrado Cooperativa.'],
    ['Clique no lápis do alto da janela ("Editar tudo num formulário").', 'Anote o "Responsável" atual e troque por "Teste roteiro".', 'Clique em "Salvar".', 'Abra o detalhe de novo e role até "Comentários e histórico", na coluna principal.', 'Edite de novo e volte o Responsável ao nome anotado. Salve.'],
    ['Depois de salvar, aparece o aviso "P0xx atualizado".', '"Comentários e histórico" mostra um cartão com a troca do responsável (antes riscado → depois), com o nome de quem fez e a data.', 'Depois de desfazer, o responsável volta ao original.']),

  c('P24', 'media', 'Lista de documentos',
    'Ver a lista geral de documentos.',
    [PROJETOS],
    ['No alto, clique em "Documentos" (ao lado de "Projetos").', 'Na caixa "Filtrar por nome, cliente ou tipo", escreva "case".', 'Clique no nome de um documento.'],
    ['Aparece uma tabela com Documento, Projeto, Tipo e Fonte.', 'Depois de escrever "case", sobram só documentos ligados a cases.', 'Clicar abre o documento numa janela.']),

  c('P25', 'media', 'Projetos no celular',
    'Ver a tela de projetos na tela pequena.',
    [CELULAR],
    ['Toque na aba "Projetos", na barra de baixo.', 'Toque em "Filtros" e marque um segmento.', 'Toque num card.'],
    ['Os cards aparecem um embaixo do outro, sem cortar texto.', 'O painel de filtros abre e filtra.', 'O detalhe abre ocupando a tela e fecha pelo X.']),

  // =====================================================================
  // ENVIO DE ARQUIVOS (V0.0.2: dentro do projeto ou pela conversa; a aba Enviar saiu)
  // =====================================================================
  c('U01', 'alta', 'Enviar um arquivo pela ficha e revisar o que o Radar leu',
    'Ver se o Radar lê o arquivo enviado dentro do projeto e aponta o que conferir.',
    ['Baixe o arquivo de exemplo pelo botão deste cenário.', GESTOR],
    [ABRA_PROJETO('Energisul Distribuidora'), 'Leia a linha de formatos aceitos no bloco "Enviar arquivo".', ESCOLHA('apresentacao-energisul-fase2.pptx'), ESPERE_ENVIO, DESCARTAR],
    ['A linha de formatos começa pelos mais comuns: PDF · PPTX · DOCX · XLSX, depois os outros, e o limite de 15 MB.', 'O cartão mostra o nome, o tipo, o título e o acesso, e os pontos para conferir (ex.: o prazo diverge do projeto).', '"Mais detalhes" abre a janela "Conferir e aprovar" enxuta: tipo, título, acesso, "Vai para" o projeto da Energisul, "Atualizar a ficha do projeto" e o resto recolhido em "Mais detalhes".', 'O tipo vem como apresentação comercial.'],
    { tickets: ['CR-052'], arquivo: 'apresentacao-energisul-fase2.pptx' }),

  c('U02', 'alta', 'Descartar um envio',
    'Ver se é possível desistir de um envio sem que ele entre na base.',
    ['Faça o cenário U01 até o cartão aparecer.'],
    ['No cartão, clique em "Descartar".'],
    ['Aparece o aviso de arquivo descartado e o cartão some de "Aguardando aprovação" (ao reabrir a ficha).', 'O arquivo não aparece em "Documentos".']),

  c('U03', 'alta', 'Aprovar um envio com informações extras (fazer uma vez só)',
    'Ver se o documento aprovado entra na base com o que você completou.',
    ['Combine com os outros analistas: só a primeira pessoa aprova. Quem vier depois verá o aviso de duplicidade (cenário U04).', 'Baixe o arquivo pelo botão deste cenário.', GESTOR],
    [ABRA_PROJETO('Segura Mais Seguros'), ESCOLHA('case-segura-mais-resultados.pdf'), ESPERE_ENVIO, 'Na janela, abra "Mais detalhes" e, em "Sobre o documento", escreva seu nome em "Autor" e "v1" em "Versão".', 'Em "Por que este documento é relevante?", escreva "Teste do roteiro de regressão" e marque "Bom modelo para reaproveitar em novas propostas".', 'Clique em "Aprovar".'],
    ['A janela fecha, aparece o aviso "… está na base" e o cartão some de "Aguardando aprovação".', 'Em "Documentos", o novo documento aparece com a estrela "bom modelo" e a nota que você escreveu.'],
    { arquivo: 'case-segura-mais-resultados.pdf' }),

  c('U04', 'alta', 'Aviso de arquivo duplicado',
    'Ver se o Radar avisa quando o mesmo arquivo já está na base.',
    ['O cenário U03 precisa ter sido aprovado por alguém antes.', 'Baixe o arquivo pelo botão deste cenário.'],
    [ABRA_PROJETO('Segura Mais Seguros'), ESCOLHA('case-segura-mais-resultados.pdf'), ESPERE_ENVIO, DESCARTAR],
    ['O cartão e a janela mostram o aviso "Arquivo idêntico já está na base", com o nome do documento existente.', 'A tela não trava e é possível descartar.'],
    { arquivo: 'case-segura-mais-resultados.pdf' }),

  c('U05', 'alta', 'Dados pessoais são mascarados',
    'Ver se e-mails e telefones são escondidos de forma discreta.',
    ['Baixe o arquivo pelo botão deste cenário.'],
    [ABRA_PROJETO('Rede Bom Preço Supermercados'), ESCOLHA('email-rede-bom-preco-ampliacao.eml'), ESPERE_ENVIO, 'Na janela, abra "Mais detalhes" e depois "Texto extraído" e "Pessoas, resultados, lições e riscos".', DESCARTAR],
    ['Aparece uma nota discreta: "Removemos 3 dados sensíveis (e-mail, telefone) antes de processar."', 'No texto extraído, os e-mails e o telefone aparecem como "[e-mail removido]" e "[telefone removido]".', 'O envio não é bloqueado.'],
    { arquivo: 'email-rede-bom-preco-ampliacao.eml' }),

  c('U06', 'alta', 'Enviar pela conversa com uma proposta em foco',
    'Ver se, com um projeto em foco, o arquivo anexado já vai para ele.',
    ['Baixe o arquivo pelo botão deste cenário.', NOVA],
    [FOCO('Hospital Santa Aurora'), 'Clique no clipe, ao lado do ícone de alvo, e escolha o arquivo baixado.', 'Espere o cartão do arquivo aparecer na conversa.', 'No cartão, clique em "Mais detalhes" e leia "Em qual projeto entra?".', DESCARTAR],
    ['Sem precisar escrever nada, o arquivo é enviado para o projeto do Hospital Santa Aurora e aparece "Arquivo enviado para … Confira e aprove abaixo".', 'O cartão mostra a situação ("extraindo os dados", depois "tudo certo" ou "pontos para conferir") e os botões Mais detalhes, Descartar e Aprovar.', 'A janela mostra "Vai para" o projeto do Hospital; o tipo vem como documento técnico.'],
    { tickets: ['CR-052'], arquivo: 'levantamento-requisitos-hospital.html' }),

  c('U07', 'media', 'Enviar pela conversa dizendo o projeto',
    'Ver se, sem foco, o arquivo espera até você dizer o projeto.',
    ['Baixe o arquivo pelo botão deste cenário.', NOVA, 'Confirme que não há proposta em foco (o ícone de alvo está fechado).'],
    ['Clique no clipe e escolha o arquivo.', 'Escreva "de qual projeto é esse arquivo?" e aperte Enter.', 'Escreva "é do projeto P003" e aperte Enter.', DESCARTAR],
    ['O arquivo aparece como etiqueta acima da caixa de texto, com X para tirar.', 'Sem projeto, o Radar responde "Para qual projeto vai o arquivo? … Nada foi enviado ainda." (etiqueta "Envio de arquivo"); o arquivo continua só na conversa.', 'Com o projeto, o arquivo é enviado para a Rede Bom Preço e aparece o cartão para aprovar.'],
    { tickets: ['CR-050', 'CR-053'], arquivo: 'pipeline-oportunidades.csv' }),

  c('U08', 'media', 'Vários arquivos de uma vez pela ficha',
    'Ver a lista de envios do projeto com mais de um arquivo e formatos diferentes.',
    ['Baixe os dois arquivos pelos botões deste cenário.', GESTOR],
    [ABRA_PROJETO('Transportes Rota Certa'), 'No bloco "Enviar arquivo", clique em "escolha" e selecione os dois arquivos juntos (segure Ctrl e clique nos dois).', 'Espere os dois cartões ficarem prontos.', 'Descarte os dois pelos cartões.'],
    ['Aparecem dois cartões em "Aguardando aprovação", cada um com a sua situação.', 'A planilha vem como estimativa preliminar e a transcrição como transcrição de reunião.', 'Se os dois vierem "tudo certo", aparece "Aprovar os 2 prontos" (não clique: descarte).'],
    { arquivo: 'estimativa-preliminar-banco-aurora.xlsx', arquivo2: 'kickoff-logistica-expressa-norte.vtt' }),

  c('U09', 'alta', 'Consultor não cria projeto a partir de arquivo',
    'Ver se só o gestor cria projeto novo com um arquivo.',
    ['Baixe o arquivo pelo botão deste cenário.', CONSULTOR, NOVA],
    [PROJETOS, 'Procure o botão "Novo a partir de arquivo", ao lado da busca.', 'Volte para "Perguntar", clique no clipe e escolha o arquivo.', 'Escreva "esse arquivo é de um cliente novo" e aperte Enter.', 'Tire o anexo pelo X da etiqueta.'],
    ['Como consultor, o botão "Novo a partir de arquivo" não aparece em Projetos.', 'Na conversa, o Radar pede o projeto e diz para pedir ao gestor se o projeto ainda não existe; não aparece "Criar projeto com este arquivo" (nem na resposta, nem nos botões).'],
    { arquivo: 'estimativa-preliminar-banco-aurora.xlsx' }),

  c('U10', 'media', 'Documento confidencial',
    'Ver se o Radar reconhece um documento confidencial.',
    ['Baixe o arquivo pelo botão deste cenário.', GESTOR],
    [ABRA_PROJETO('Cooperativa de Crédito Horizonte'), ESCOLHA('proposta-banco-aurora-antifraude.docx'), ESPERE_ENVIO, 'Olhe o campo "Acesso" no topo da janela.', DESCARTAR],
    ['O campo "Acesso" vem como "confidencial".', 'O tipo vem como proposta comercial.'],
    { arquivo: 'proposta-banco-aurora-antifraude.docx' }),

  c('U11', 'media', 'Planilha com divergência de dados',
    'Ver o aviso quando o arquivo contradiz o que já está na base.',
    ['Baixe o arquivo pelo botão deste cenário.'],
    [ABRA_PROJETO('Rede Bom Preço Supermercados'), ESCOLHA('pipeline-oportunidades.csv'), ESPERE_ENVIO, DESCARTAR],
    ['O cartão mostra "pontos para conferir" com o aviso de que o prazo diverge do que está na base, explicando qual valor prevalece.', 'A janela mostra os mesmos pontos no topo.'],
    { arquivo: 'pipeline-oportunidades.csv' }),

  c('U12', 'media', 'Corrigir campos na revisão',
    'Ver se dá para mudar o que o Radar leu.',
    ['Baixe o arquivo pelo botão deste cenário.'],
    [ABRA_PROJETO('Transportes Rota Certa'), ESCOLHA('kickoff-logistica-expressa-norte.vtt'), ESPERE_ENVIO, 'Troque o "Tipo" e mude o "Título".', 'Abra "Mais detalhes" > "Tecnologias e serviços", tire uma tecnologia pelo X e acrescente outra.', 'Em "Mais campos", preencha a "Data".', DESCARTAR],
    ['Todos os campos aceitam a mudança sem erro.', 'As tecnologias podem ser retiradas e acrescentadas.'],
    { arquivo: 'kickoff-logistica-expressa-norte.vtt' }),

  c('U13', 'alta', 'Formato de arquivo não aceito',
    'Ver se o Radar explica quando o formato não é aceito.',
    ['Tenha no computador uma imagem qualquer (.png ou .jpg), por exemplo uma captura de tela.'],
    [ABRA_PROJETO('Energisul Distribuidora'), 'No bloco "Enviar arquivo", clique em "escolha" e selecione a imagem.', 'Na aba "Perguntar", clique no clipe e escolha a mesma imagem, com uma proposta em foco.'],
    ['Nos dois casos aparece o aviso de formato não aceito, com a lista de formatos (PDF, PPTX, DOCX, XLSX…).', 'A imagem não vira cartão nem entra na base, e a tela não trava.']),

  c('U14', 'alta', 'Projeto novo a partir de um arquivo (gestor)',
    'Ver se o gestor cria um projeto com os campos preenchidos pelo que o Radar leu.',
    ['Baixe o arquivo pelo botão deste cenário.', GESTOR],
    [PROJETOS, 'Clique em "Novo a partir de arquivo", ao lado da busca, e escolha o arquivo baixado.', 'Espere a janela "Conferir e aprovar" carregar.', 'Leia o bloco "Projeto novo".', 'Clique em "Descartar" (não crie o projeto).'],
    ['A janela mostra "Projeto novo (preenchido com o que o Radar leu; confira)" com cliente, título, segmento, status e acesso preenchidos, e o botão "Criar projeto e aprovar".', '"Descartar" fecha sem criar nada.', 'Na conversa, sem foco e sem projeto, o gestor também vê "Criar projeto com este arquivo".'],
    { tickets: ['CR-052'], arquivo: 'kickoff-logistica-expressa-norte.vtt' }),

  c('U15', 'media', 'Envio no celular',
    'Ver o envio de arquivo pela tela pequena.',
    [CELULAR, 'Tenha no celular um dos arquivos de exemplo (pode baixar pelo botão deste cenário no próprio celular).'],
    ['Abra a aba "Projetos", abra um projeto e role até o bloco "Enviar arquivo".', 'Toque em "escolha" e selecione o arquivo.', 'Quando o cartão ficar pronto, toque em "Mais detalhes" e depois em "Descartar".'],
    ['O arquivo é enviado e a janela de revisão abre inteira, sem cortar botões.', '"Descartar" funciona.'],
    { arquivo: 'levantamento-requisitos-hospital.html' }),

  // =====================================================================
  // NOVOS NA V0.0.2 (correções dos tickets da V0.0.1). "tickets" = o que o cenário retesta: marcar OK valida esses tickets.
  // =====================================================================
  c('C35', 'alta', 'Busca sem nada relevante sugere buscas próximas',
    'Ver se, quando não há nada na base, o Radar diz isso e oferece buscas que trazem resultado.',
    [CONSULTOR, NOVA],
    [PERGUNTE('preciso de propostas de mineração'), ESPERE, 'Clique numa das buscas sugeridas abaixo da resposta.', PERGUNTE('preiso de propostas de energia'), ESPERE],
    ['A primeira resposta diz "Não encontrei nada relevante na base" e mostra até 3 buscas próximas como botões.', 'Clicar numa sugestão faz a busca e traz projetos (não volta vazia).', 'A pergunta com erro de digitação ("preiso") traz os projetos de Utilities / Energia.'],
    { tickets: ['CR-012'] }),

  c('C36', 'alta', 'Resposta curta e direta',
    'Ver se a resposta vai direto ao ponto, sem blocos genéricos de recomendação e de perfis.',
    [CONSULTOR, NOVA],
    [PERGUNTE('Já fizemos projetos de churn em telecom?'), ESPERE],
    ['A resposta tem até dois parágrafos curtos: responde à pergunta e diz em poucas palavras por que cada projeto citado serve.', 'NÃO aparecem os blocos "Recomendação:" nem "Perfis sugeridos:".', 'Quando dois projetos citados são do mesmo cliente, as etiquetas mostram também o código (ex.: "ConectaFibra Telecom · P008") e o texto diferencia os dois pelo tema.', 'O que reaproveitar continua no cartão de cada projeto ("Escopo, resultados e lições", "Copiar escopo").'],
    { tickets: ['CR-027', 'CR-060', 'CR-062'] }),

  c('C37', 'alta', 'Card do projeto: ordem, tags, itens que abrem e barras',
    'Ver o novo card de projeto da resposta.',
    [CONSULTOR, NOVA, PERGUNTE('tem algum case de manutenção preditiva?'), ESPERE, 'Clique no título do primeiro card para abri-lo.'],
    ['Olhe a ordem das informações do card.', 'Clique em "Escopo, resultados e lições" e depois em "Por que apareceu nesta posição".', 'Passe o mouse sobre uma das barras.', 'Clique numa tecnologia, no fim do card.'],
    ['O ícone do segmento aparece ao lado do título; segmento, prazo, justificativa e resumo vêm antes dos botões, e as tecnologias aparecem uma vez só, no fim, discretas.', 'Cada item que abre tem uma setinha que vira ao abrir, e só um fica aberto por vez (abrir outro fecha o anterior).', 'Cada barra tem o mesmo tamanho do percentual ao lado (53% é maior que 20%) e a dica mostra "nota × peso"; a soma das barras dá a semelhança do projeto.', 'Clicar na tecnologia abre a aba Projetos filtrada por ela.'],
    { tickets: ['CR-028', 'CR-029', 'CR-030'] }),

  c('C38', 'alta', 'Grupos de conversas, arquivar e menu da conversa',
    'Ver se dá para organizar as conversas por cliente ou proposta.',
    ['Faça o cenário C27 (tenha a sua conversa "Teste do roteiro").'],
    ['Na coluna da esquerda, passe o mouse sobre a sua conversa e clique nos três pontinhos (⋯).', 'Em "Mover para grupo", escreva "Roteiro" seguido do seu nome e clique no +.', 'Abra o menu de novo e clique em "Renomear"; mude o nome e aperte Enter.', 'Abra o menu e clique em "Arquivar".', 'Abra a caixa "Arquivadas" (entre Grupos e Recentes), abra o menu da conversa e clique em "Desarquivar".'],
    ['A conversa sai de "Recentes" e aparece na caixa "Grupos", dentro do grupo com o nome escolhido.', 'O nome muda na lista e aparece o aviso "Conversa renomeada".', 'Arquivada, a conversa sai de "Grupos" e passa para a caixa "Arquivadas".', 'Desarquivada, ela volta para o grupo.'],
    { tickets: ['CR-017', 'CR-018'] }),

  c('C39', 'media', 'Editar o título pelo lápis',
    'Ver se fica claro que o título da conversa pode ser editado.',
    ['Abra uma conversa sua.'],
    ['Clique no lápis ao lado do título da conversa, no alto.', 'Mude o nome e aperte Esc.', 'Clique no lápis de novo, mude o nome e aperte Enter.'],
    ['O lápis aparece ao lado do título e, ao clicar, o título fica selecionado para edição.', 'Esc desfaz e volta o nome anterior.', 'Enter salva e aparece o aviso "Conversa renomeada".'],
    { tickets: ['CR-034'] }),

  c('C40', 'media', 'Botão enviar só com texto',
    'Ver se o botão de enviar fica desligado com a caixa vazia.',
    [NOVA],
    ['Olhe o botão de enviar (seta azul) com a caixa de texto vazia.', 'Digite só espaços.', 'Digite uma pergunta.'],
    ['Com a caixa vazia ou só com espaços, o botão fica apagado e não envia (nem com Enter).', 'Com texto, o botão fica azul e envia.'],
    { tickets: ['CR-037'] }),

  c('C41', 'media', 'Editar a última pergunta e reenviar',
    'Ver se dá para corrigir a última pergunta sem mandar outra.',
    [CONSULTOR, NOVA, PERGUNTE('projetos de telecom'), ESPERE],
    ['Passe o mouse sobre a sua pergunta (balão azul) e clique no lápis ao lado dela.', 'Mude a pergunta para "projetos de telecom com machine learning" e aperte Enter.'],
    ['A caixa de texto recebe a pergunta e aparece o aviso "Editando a última pergunta" com "Cancelar".', 'A pergunta e a resposta antigas somem e aparecem a pergunta nova e a resposta dela; a conversa continua com o mesmo número de perguntas.'],
    { tickets: ['CR-044'] }),

  c('C42', 'media', 'Enviar arquivo pelo chat para um projeto',
    'Ver se dá para mandar um documento para um projeto conversando com o Radar.',
    [GESTOR, NOVA, 'Baixe o arquivo de exemplo deste cenário.', 'Confirme que não há proposta em foco.'],
    ['Clique no clipe e escolha o arquivo baixado.', 'Escreva "esse arquivo é de qual projeto?" e aperte Enter.', 'Escreva "coloca no projeto de energia" e aperte Enter.', 'Nos botões que aparecem, clique no projeto da Energisul Distribuidora.', 'No cartão que aparece, clique em "Mais detalhes" e depois em "Descartar".'],
    ['O arquivo aparece como etiqueta acima da caixa de texto, com X para tirar.', 'Sem projeto definido, o Radar pergunta para qual projeto vai (o gestor também vê o botão "Criar projeto com este arquivo") e o arquivo continua só na conversa; a etiqueta diz "Envio de arquivo".', 'Com um nome que combina com mais de um projeto ("de energia"), o Radar mostra os projetos possíveis como botões e avisa "Nada foi enviado ainda"; só envia depois do clique (com o código, ex.: "P003", ou com "Proposta em foco", envia direto).', 'Depois do clique, aparece "Arquivo enviado para … Confira e aprove abaixo" e um cartão com a situação e os botões Mais detalhes, Descartar e Aprovar.', 'A janela abre com "Vai para" o projeto da Energisul.', '"Descartar" tira o arquivo, sem entrar na base.'],
    { tickets: ['CR-049', 'CR-050', 'CR-053'], arquivo: 'apresentacao-energisul-fase2.pptx' }),

  c('C43', 'media', 'Etiqueta da visão, menu e seção atual',
    'Ver se fica claro com que perfil e em que seção você está.',
    [],
    ['Olhe o canto superior direito da tela.', 'Clique no botão com as iniciais e o nome e troque o "Ver como".', 'Clique nos três pontinhos (⋮), ao lado do botão de conta.', 'Clique no X no alto desse menu.', 'Clique nas abas Projetos e Insights.'],
    ['O botão de conta mostra um círculo com as iniciais, o primeiro nome e, embaixo, o perfil (ex.: "MC Marina · Consultor"), nas cores da página, sempre visível.', 'Clicar nele abre só o perfil, com o "Ver como"; trocando, o botão passa a mostrar a outra pessoa e o outro perfil, e aparece um aviso.', 'O menu ⋮ é separado: tem tema, documentos, métricas, ajuda e versão, mas não o "Ver como"; o X fecha esse menu (Esc também).', 'A aba atual fica em azul cheio, com um traço embaixo, bem diferente das outras.'],
    { tickets: ['CR-031', 'CR-006', 'CR-025'] }),

  c('C44', 'media', 'Ajuda e versão na lateral das conversas',
    'Ver se a ajuda está à vista, sem depender do menu.',
    [NOVA],
    ['Olhe o fim da coluna da esquerda.', 'Clique em "Como usar o Radar" e feche.', 'Clique em "Enviar feedback" e feche sem enviar.', 'Olhe o alto da tela, acima das abas de conteúdo.'],
    ['A coluna da esquerda tem o fundo no tom azul da marca e, no fim, os atalhos "Como usar o Radar" e "Enviar feedback" (não há atalho de versão e testes).', '"Como usar o Radar" abre o guia; "Enviar feedback" abre só o formulário de feedback, sem a coluna de versão, tickets e testes, e o texto não fala da tela de Tickets.', 'Não aparece mais a faixa "Desbloqueie a próxima fase do Radar" no alto da tela (campanha encerrada).', 'O logo da ImpactAI ("Criado e desenvolvido por") fica sempre visível no fim da coluna.'],
    { tickets: ['CR-026', 'CR-003'] }),

  c('P26', 'alta', 'Filtros ativos como etiquetas e "Ver N projetos"',
    'Ver se é fácil enxergar e tirar os filtros aplicados.',
    [CONSULTOR, PROJETOS, FILTROS],
    ['Marque dois segmentos no painel.', 'Clique em "Ver N projetos", no fim do painel.', 'Clique no X de uma das etiquetas acima da lista.', 'Clique em "Limpar tudo".'],
    ['Cada filtro marcado é aplicado na hora, e dá para marcar mais de um antes de fechar.', '"Ver N projetos" fecha o painel; os filtros aparecem como etiquetas acima da lista (ex.: "Segmento: Varejo").', 'O X tira só aquele filtro e a lista atualiza.', '"Limpar tudo" volta a lista completa.'],
    { tickets: ['CR-005', 'CR-013'] }),

  c('P27', 'media', 'Títulos da ficha e ícone do segmento',
    'Ver o destaque visual da ficha do projeto.',
    [PROJETOS],
    ['Olhe os cards da lista.', 'Abra um projeto.'],
    ['Cada card mostra um ícone do segmento (ex.: raio para Utilities / Energia, carrinho para Varejo).', 'Na ficha, os títulos das seções (Objetivo, Contexto, Documentos…) estão maiores, em azul e com uma linha embaixo.'],
    { tickets: ['CR-015', 'CR-026'] }),

  c('P28', 'alta', 'Enviar arquivo pela ficha do projeto',
    'Ver se dá para mandar um documento sem sair do projeto.',
    [GESTOR, PROJETOS, 'Baixe o arquivo de exemplo deste cenário.', 'Abra o projeto "Plataforma de dados para redução de perdas não técnicas" (Energisul).'],
    [ESCOLHA('apresentacao-energisul-fase2.pptx'), 'Feche a ficha e veja o card do projeto na lista.', 'Abra a ficha de novo, clique em "Mais detalhes" no cartão e depois em "Descartar".'],
    ['O bloco "Enviar arquivo" é discreto (linha tracejada) e fica logo acima de "Comentários e histórico".', 'O andamento aparece na própria ficha, em "Aguardando aprovação", sem trocar de tela.', 'Enquanto não for aprovado, o card do projeto na lista mostra "1 para aprovar".', 'A janela abre com "Vai para" o projeto da Energisul; "Descartar" tira o arquivo, sem entrar na base.'],
    { tickets: ['CR-046'], arquivo: 'apresentacao-energisul-fase2.pptx' }),

  c('C45', 'alta', 'Lista de conversas em caixas',
    'Ver se a coluna da esquerda separa bem favoritas, grupos, arquivadas e recentes.',
    ['Faça os cenários C28 e C38 (tenha uma conversa num grupo e outra favorita).'],
    ['Olhe a coluna da esquerda de cima para baixo, sem clicar em nada.', 'Clique no título de "Favoritas", "Grupos" e "Arquivadas" para abrir as três.', 'Dentro de "Grupos", clique no nome do seu grupo para abrir.', 'Favorite a conversa que está no seu grupo (estrela ao passar o mouse).', 'Diminua a janela do navegador na altura (ou use uma tela menor) e olhe a caixa "Recentes".', 'Feche "Favoritas" e aperte F5 para recarregar a página.'],
    ['As conversas ficam em caixas separadas, nesta ordem: "Favoritas", "Grupos", "Arquivadas" e "Recentes" (caixa sem conversas não aparece).', 'Ao abrir a tela, "Favoritas", "Grupos" e "Arquivadas" vêm fechadas (uma linha cada, com o nome e uma setinha, sem contagem de conversas) e "Recentes" aparece inteira logo abaixo.', 'Abertas, as caixas mostram as conversas e, se forem muitas, rolam por dentro; "Recentes" continua visível, com rolagem própria, mesmo com tudo aberto ou com a janela baixa.', 'A conversa favorita que está num grupo aparece duas vezes: em "Favoritas" e dentro do grupo.', 'Depois do F5, cada caixa e cada grupo continuam como você deixou (abertos ou fechados).']),

  // ---------- Adendo 6 (CR-053): conversa cordial, dúvidas de uso e arquivo lido na conversa ----------
  c('C46', 'alta', 'Cumprimentar o Radar',
    'Ver se o Radar responde a uma saudação com educação, diz o que faz e oferece caminhos.',
    [CONSULTOR, NOVA],
    [PERGUNTE('olá'), ESPERE, ETIQUETA, PERGUNTE('bom dia, liste os projetos de varejo'), ESPERE],
    ['A etiqueta diz "Conversa".', 'A resposta começa com "Olá, Marina!", diz em uma frase o que o Radar faz e termina com "Como posso ajudar?".', 'Abaixo aparecem sugestões clicáveis e os links "Como usar o Radar" e "Bons exemplos de pergunta".', 'Não aparece "Não encontrei nada relevante".', 'A segunda pergunta começa com "Bom dia!" e traz a listagem dos projetos de varejo.'],
    { tickets: ['CR-053'] }),

  c('C47', 'alta', 'Perguntar o que o Radar sabe fazer',
    'Ver se o Radar explica o próprio funcionamento e mostra só o que o perfil pode usar.',
    [CONSULTOR, NOVA],
    [PERGUNTE('Boa noite, o que vc pode fazer?'), ESPERE, 'Clique no exemplo de um dos cartões (ex.: "Liste os projetos entregues em 2025").', GESTOR, NOVA, PERGUNTE('o que você pode fazer?'), ESPERE],
    ['A resposta começa com "Boa noite!" e mostra cartões de capacidades, cada um com ícone, descrição e um exemplo (achar parecidos, listar, contar, ficha, comparar, ler um arquivo, enviar arquivo, tirar dúvidas).', 'Clicar no exemplo faz a pergunta e traz a resposta.', 'Como consultor, NÃO aparece o cartão "Criar projeto a partir de um arquivo"; como gestor, aparece.', 'Embaixo há links para "Como usar o Radar" e "Como o Radar funciona".'],
    { tickets: ['CR-053'] }),

  c('C48', 'alta', 'Tirar uma dúvida de uso no chat',
    'Ver se o Radar responde como usar o produto com base na ajuda e mostra de onde tirou.',
    [CONSULTOR, NOVA],
    [PERGUNTE('como favorito uma conversa?'), ESPERE, ETIQUETA, 'Clique em "ver trecho" e depois em "Abrir no guia", no fim do trecho.', 'Feche a ajuda.', PERGUNTE('o que mudou nesta versão?'), ESPERE],
    ['A etiqueta diz "Dúvida de uso".', 'A resposta explica, em poucas linhas, que é pela estrela.', 'Abaixo vem, recolhida, a linha "Fonte: Como usar o Radar › Conversas salvas · ver trecho"; ao clicar, abre só o trecho que fala de favoritar (ex.: "Favoritar: Passe o mouse na conversa e clique na ⭐…"), coerente com a resposta, e não o começo da seção.', 'A fonte aparece uma vez só: não há outro botão solto com o nome da seção abaixo da resposta.', '"Abrir no guia" abre a ajuda direto na seção "Conversas salvas".', 'A pergunta sobre a versão lista as novidades da V0.0.2 e oferece o botão "Notas da V0.0.2".'],
    { tickets: ['CR-053', 'CR-056', 'CR-058'] }),

  c('C49', 'media', 'Agradecer e reclamar de uma resposta',
    'Ver se o Radar responde a agradecimento e crítica de forma curta e útil.',
    [CONSULTOR, NOVA],
    [PERGUNTE('liste os projetos de varejo'), ESPERE, PERGUNTE('valeu'), ESPERE, PERGUNTE('essa resposta está errada'), ESPERE],
    ['"valeu" recebe uma resposta curta e cordial ("Por nada! …"), sem busca.', 'A crítica recebe um pedido de desculpas, a dica de reformular com mais detalhes e o botão "Enviar feedback".', 'O botão "Enviar feedback" abre o formulário de feedback.'],
    { tickets: ['CR-053'] }),

  c('C50', 'media', 'Frase sem assunto',
    'Ver se, quando não entende, o Radar diz isso e mostra o que dá para fazer, em vez de uma busca vazia.',
    [CONSULTOR, NOVA],
    [PERGUNTE('faz aí'), ESPERE],
    ['A resposta diz "Não entendi bem o que você precisa" e mostra alguns cartões de capacidades com exemplos clicáveis.', 'Não aparece "Não encontrei nada relevante na base".'],
    { tickets: ['CR-053'] }),

  c('C51', 'alta', 'Pedir para o Radar ler um arquivo',
    'Ver se o Radar lê e resume um arquivo anexado sem pedir projeto e sem colocá-lo na base.',
    ['Baixe o arquivo de exemplo deste cenário.', GESTOR, NOVA, 'Confirme que não há proposta em foco (o ícone de alvo está fechado).'],
    ['Clique no clipe, ao lado da caixa de pergunta, e escolha o arquivo baixado.', 'Escreva "leia esse arquivo" e aperte Enter.', ESPERE, ETIQUETA, 'Abra a aba "Projetos" e confira se apareceu algum envio novo aguardando aprovação.'],
    ['Enquanto lê, aparece "Lendo o arquivo…".', 'A etiqueta diz "Arquivo da conversa".', 'A resposta diz o que é o documento (proposta comercial do Banco Aurora, sobre detecção de fraude em PIX) e que o arquivo fica só nesta conversa e não entra na base.', 'Um cartão mostra o nome do arquivo, o tema, o tipo, o cliente, o prazo, os pontos principais e as tecnologias.', 'Abaixo aparecem "Buscar projetos parecidos", "Perguntar algo sobre o arquivo", "Enviar para um projeto" e, para o gestor, "Criar projeto com este arquivo".', 'O Radar NÃO pergunta para qual projeto vai o arquivo, e nada novo aparece aguardando aprovação.'],
    { tickets: ['CR-053'], arquivo: 'proposta-banco-aurora-antifraude.docx' }),

  c('C52', 'alta', 'Perguntar sobre o arquivo e buscar parecidos',
    'Ver se o Radar responde com o conteúdo do arquivo e usa o arquivo para achar projetos parecidos na base.',
    ['Faça o cenário C51 e continue na mesma conversa.'],
    [PERGUNTE('quais os riscos?'), ESPERE, 'Clique em "Buscar projetos parecidos" na resposta do C51 (ou escreva "tem algo parecido com isso na base?").', ESPERE],
    ['A resposta sobre riscos cita os riscos do arquivo (acesso aos dados de transações e homologação do modelo); o trecho do arquivo de onde tirou fica recolhido em "Fonte: proposta-banco-aurora-antifraude.docx · ver trecho".', 'A busca de parecidos começa com "Busquei na base projetos parecidos com o arquivo …" e traz cards de projetos (ex.: streaming com Kafka e Databricks).'],
    { tickets: ['CR-053', 'CR-056'], arquivo: 'proposta-banco-aurora-antifraude.docx' }),

  c('C53', 'media', 'Enviar à base só quando pedir',
    'Ver se o arquivo lido na conversa só vai para um projeto quando você pede.',
    ['Faça o cenário C51 e continue na mesma conversa (o arquivo ainda aparece como etiqueta acima da caixa de texto).'],
    [PERGUNTE('coloca no projeto P003'), ESPERE, 'No cartão que aparece, clique em "Descartar".'],
    ['A etiqueta diz "Envio de arquivo" e aparece "Arquivo enviado para Previsão de demanda e reposição automática de estoque (Rede Bom Preço Supermercados). Confira e aprove abaixo".', 'O cartão do envio aparece na conversa; "Descartar" tira o arquivo, sem entrar na base.', 'A etiqueta do arquivo some de cima da caixa de texto depois do envio.'],
    { tickets: ['CR-053'], arquivo: 'proposta-banco-aurora-antifraude.docx' }),

  // ---------- Celular e credibilidade da resposta (CR-054, CR-055, CR-057) ----------
  c('C54', 'alta', 'Cartão de projeto na conversa, no celular',
    'Ver se o cartão de projeto da resposta fica legível no celular e sem avisos que confundem.',
    [CELULAR, GESTOR, NOVA],
    [PERGUNTE('Já fizemos fraude em seguros?'), ESPERE, 'Olhe o cartão do projeto "Detecção de fraude em sinistros…" (Segura Mais Seguros) sem abrir.', 'Toque no cartão para abrir e depois em "Abrir projeto".'],
    ['No cartão fechado, em cima ficam o ícone, o título (até 3 linhas, sem cortar em "Det… de…") e a setinha; embaixo do título, "Muito parecido", o cliente e o status, e depois os botões 👍 e 👎. Nada fica por cima de nada.', 'O cartão NÃO mostra "dados divergentes".', 'A linha "Também costumam entrar: …" aparece como uma frase que quebra normalmente, não em colunas.', 'Na ficha do projeto aparece o aviso "Prazo diverge entre fontes", com a fonte que prevaleceu (a divergência fica só dentro do projeto).'],
    { tickets: ['CR-054', 'CR-055'] }),

  c('C56', 'alta', 'Conversa informal com cordialidade',
    'Ver se o Radar conversa de forma natural num papo curto, sem parecer um robô.',
    [CONSULTOR, NOVA],
    [PERGUNTE('boa noite, tudo bem?'), ESPERE, PERGUNTE('qual seu nome?'), ESPERE, PERGUNTE('liste os projetos de varejo'), ESPERE, PERGUNTE('bom trabalho!'), ESPERE, PERGUNTE('tudo bem com você?'), ESPERE],
    ['"boa noite, tudo bem?" recebe um boa noite (com o nome Marina), diz que está tudo bem e pergunta de volta, em poucas frases; só nesta primeira mensagem o Radar se apresenta.', '"qual seu nome?" responde que é o Radar e o que faz, em uma ou duas frases.', 'Depois da listagem, "bom trabalho!" recebe um agradecimento natural, sem se reapresentar.', '"tudo bem com você?" no meio da conversa responde e pergunta de volta, sem a apresentação inteira de novo.', 'As respostas variam com o que foi dito (não são sempre a mesma frase) e nenhuma inventa projetos ou números.'],
    { tickets: ['CR-061'] }),

  c('C55', 'alta', 'Caixa de pergunta no celular com memória da conversa',
    'Ver se a caixa de pergunta continua numa linha só quando o chat está lembrando perguntas anteriores.',
    [CELULAR, NOVA],
    [PERGUNTE('Já fizemos fraude em seguros?'), ESPERE, PERGUNTE('e em varejo?'), ESPERE, 'Olhe a caixa de pergunta, o título da conversa, no alto, e o balão da sua última pergunta.'],
    ['A etiqueta "lembrando N perguntas" fica numa linha própria, acima.', 'Na linha de baixo ficam, lado a lado, o ícone de alvo, o clipe, o campo de texto (com espaço para escrever) e o botão de enviar; o botão NÃO desce para outra linha.', 'O título da conversa mostra o lápis e a estrela dentro da tela, sem rolagem para o lado.', 'O menu de baixo (Perguntar, Projetos, Insights) fica centralizado, com as três abas do mesmo tamanho.', 'O lápis de editar a última pergunta fica à esquerda, fora do balão azul; o balão tem só o texto, sem uma linha vazia embaixo.'],
    { tickets: ['CR-057', 'CR-063'] }),

  c('P29', 'media', 'Seções da ficha que recolhem',
    'Ver se a ficha mostra primeiro o essencial e deixa o resto recolhido.',
    [PROJETOS, 'Abra o projeto "Plataforma de dados para redução de perdas não técnicas" (Energisul).'],
    ['Olhe as seções abaixo de Objetivo e Contexto.', 'Clique em "Resultados", depois em "Lições aprendidas" e em "Riscos".', 'Clique de novo em "Riscos".', 'Na coluna da direita, clique em "Tecnologias", "Palavras-chave" e "Projetos parecidos".', 'Feche a ficha e abra de novo.'],
    ['Objetivo e Contexto aparecem abertos; "Resultados", "Lições aprendidas", "Riscos" e "Documentos" vêm fechados, cada um com a quantidade de itens e uma setinha.', 'Clicar no título abre a seção com os itens e de onde vieram; a setinha vira; clicar de novo fecha.', 'Na coluna da direita, "Tecnologias", "Palavras-chave" e "Projetos parecidos" também vêm fechados e abrem ao clicar.', 'Ao reabrir a ficha, essas seções vêm fechadas de novo.']),

  c('P30', 'alta', 'Editar um campo da ficha sem abrir o formulário',
    'Ver se dá para corrigir um dado do projeto direto na ficha.',
    [CONSULTOR, PROJETOS, 'Abra um projeto qualquer.'],
    ['Passe o mouse sobre o prazo (no alto da ficha) e clique no lápis que aparece.', 'Mude o número e aperte Enter.', 'Clique no lápis do "Objetivo", mude o texto e aperte Esc.', 'Clique no lápis do "Segmento", escreva um segmento que não existe e tente salvar.', 'Ao terminar, volte o prazo ao valor original pelo mesmo lápis.'],
    ['O lápis aparece só ao passar o mouse sobre o campo (título, cliente, segmento, prazo, responsável, data, objetivo, contexto, área, status, acesso e pasta; valor e margem só para o gestor).', 'Enter salva: aparece o aviso "Prazo atualizado" e o novo valor já aparece na ficha.', 'Esc cancela e volta o texto anterior, sem salvar.', 'Como consultor, segmento que não existe não é aceito: aparece "só o gestor cria opções novas".', 'Campo vazio mostra "Adicionar …" para preencher.']),

  c('P31', 'media', 'Tecnologias e serviços pela ficha',
    'Ver se dá para pôr e tirar tecnologias e serviços direto no card.',
    [PROJETOS, 'Abra um projeto qualquer.'],
    [CONSULTOR, 'Na coluna da direita, abra "Tecnologias" e clique no lápis.', 'Escreva parte do nome de uma tecnologia da lista, escolha e aperte Enter.', 'Escreva "Tecnologia Teste" e aperte Enter.', 'Tire a tecnologia que você colocou (X no chip) e clique em "Salvar".', GESTOR, 'Abra o mesmo projeto, clique no lápis de "Serviços", escreva "Serviço Teste" + o seu nome, aperte Enter e depois tire o chip e clique em "Cancelar".'],
    ['O lápis abre os chips com X para tirar e uma caixa com a lista de opções.', 'Como consultor, só entram opções que já existem; "Tecnologia Teste" mostra "só o gestor cria opções novas".', 'Como gestor, um nome novo entra como chip (é criado ao salvar).', '"Cancelar" não muda nada; "Salvar" grava e aparece o aviso.']),

  c('P32', 'alta', 'Comentários e histórico da ficha',
    'Ver a conversa e o registro do que mudou no projeto.',
    [PROJETOS, 'Faça o cenário P30 no mesmo projeto.'],
    ['Na coluna principal, role até "Comentários e histórico".', 'Escreva um comentário com o seu nome e clique em "Comentar".', 'Olhe os itens abaixo do campo de comentário.'],
    ['O botão "Comentar" só fica ativo com texto; o comentário aparece no topo como um balão, com as iniciais, o nome e a hora.', 'As edições aparecem como cartões com o campo, o valor antigo riscado (vermelho) → o novo (verde); em tecnologias e serviços, chips "+" e "−".', 'Edições feitas juntas ficam num cartão só; exportações e outros registros aparecem como linhas com ícone.', 'Tudo fica num cartão próprio; aparecem os 5 itens mais recentes e "Mostrar mais" abre de 5 em 5 (com "Mostrando N de M" e "Mostrar menos").']),

  c('P33', 'alta', 'Excluir um projeto (só gestor)',
    'Ver se só o gestor exclui projetos e se a exclusão pede confirmação.',
    [GESTOR, PROJETOS, 'Cadastre um projeto de teste pelo botão azul "Projeto" (título "Projeto para excluir" + o seu nome; cliente, segmento e status quaisquer da lista). Nunca exclua um projeto da base.'],
    ['Abra o projeto de teste e clique na lixeira, no alto da ficha.', 'Na janela, clique em "Cancelar".', 'Clique na lixeira de novo e em "Excluir projeto".', CONSULTOR, 'Abra um projeto qualquer e procure a lixeira.'],
    ['A janela "Excluir projeto" mostra o nome do projeto e avisa que a ação não pode ser desfeita.', '"Cancelar" fecha sem excluir.', '"Excluir projeto" fecha a ficha, aparece o aviso e o projeto some da lista e das buscas.', 'Como consultor, a lixeira não aparece.']),

  c('U16', 'alta', 'Arquivo recusado: trocar ou remover',
    'Ver se um arquivo de formato errado não trava o envio.',
    [ABRA_PROJETO('Energisul Distribuidora'), 'Tenha no computador uma imagem (PNG ou JPG) qualquer.'],
    ['No bloco "Enviar arquivo", escolha a imagem.'],
    ['Aparece o aviso de formato não aceito com a lista de formatos (PDF, PPTX, DOCX…), e a imagem nem vira cartão.', 'Se algum envio terminar com erro, o cartão mostra a mensagem e o botão "Remover", que tira o envio da lista.'],
    { tickets: ['CR-010'] }),

  c('U17', 'media', 'Atualizar a ficha do projeto ao aprovar um arquivo',
    'Ver se os dados novos do arquivo podem atualizar o projeto.',
    [GESTOR, 'Baixe o arquivo de exemplo deste cenário.', ABRA_PROJETO('Energisul Distribuidora')],
    [ESCOLHA('apresentacao-energisul-fase2.pptx'), ESPERE_ENVIO, 'Na janela, procure a seção "Atualizar a ficha do projeto".', DESCARTAR],
    ['Quando o arquivo traz prazo, data ou valor diferentes da ficha do projeto de destino, aparece a seção com cada diferença (antes → depois) e uma caixa para marcar.', 'Só o que for marcado é atualizado na ficha ao aprovar (e fica no histórico do projeto).'],
    { tickets: ['CR-047'], arquivo: 'apresentacao-energisul-fase2.pptx' }),

  c('U18', 'media', 'Aprovar vários envios de uma vez',
    'Ver a aprovação em lote.',
    [GESTOR, NOVA, 'Baixe os dois arquivos de exemplo deste cenário.', 'Combine com os outros analistas: faça uma vez só (os arquivos entram na base).'],
    [FOCO('Segura Mais Seguros'), 'Clique no clipe e escolha os dois arquivos juntos (segure Ctrl).', 'Espere os dois cartões ficarem prontos.', 'Se aparecer "Aprovar os N prontos", clique; os que tiverem pontos para conferir, revise em "Mais detalhes" (1 de N) ou descarte.'],
    ['Os dois arquivos vão direto para o projeto em foco e aparecem como cartões na conversa.', '"Aprovar os N prontos" aprova de uma vez os que vieram "tudo certo"; os com pontos para conferir ficam para revisar um a um.', 'Os cartões aprovados mostram "aprovado e na base".'],
    { tickets: ['CR-048'], arquivo: 'case-segura-mais-resultados.pdf', arquivo2: 'proposta-banco-aurora-antifraude.docx' }),

  // =====================================================================
  // INSIGHTS (aba Insights, refeita na V0.0.2)
  // =====================================================================
  c('I01', 'alta', 'Números do topo',
    'Ver se os números grandes do topo batem com a base.',
    [CONSULTOR, 'Clique na aba "Insights", no alto da tela.'],
    ['Leia os quatro números do topo.', PROJETOS, 'Leia quantos projetos a lista mostra.'],
    ['O topo mostra projetos na base, taxa de conversão (com ganhos e perdidos), segmentos atendidos e tecnologias usadas, cada um com uma cor.', 'O número de projetos é igual ao total da aba Projetos para o mesmo perfil.'],
    { tickets: ['CR-009'] }),

  c('I02', 'alta', 'Funil das propostas',
    'Ver em que etapa estão os projetos.',
    [CONSULTOR, 'Clique na aba "Insights".'],
    ['Passe o mouse sobre um pedaço da barra colorida do funil.', 'Clique no nome "Entregue" na legenda.'],
    ['A barra mostra um pedaço por status (Enviada, Em negociação, Vendida, Em execução, Entregue, Perdida…), cada um com sua cor, e a legenda traz o número e a porcentagem.', 'A dica mostra o status, a quantidade e a porcentagem.', 'Clicar em "Entregue" abre a aba Projetos só com os entregues.'],
    { tickets: ['CR-009'] }),

  c('I03', 'alta', 'Top 10 segmentos e tecnologias',
    'Ver os rankings e o atalho para os projetos.',
    [CONSULTOR, 'Clique na aba "Insights".'],
    ['Olhe os cartões "Top 10 segmentos" e "Top 10 tecnologias".', 'Passe o mouse sobre uma barra.', 'Clique no nome de um segmento.', 'Volte para Insights e clique no nome de uma tecnologia.'],
    ['As barras estão em ordem, da maior para a menor, numeradas, com no máximo 10 itens e o número no fim de cada barra.', 'A dica traz o detalhe (conversão e prazo médio; para o gestor, também o valor médio).', 'Clicar no segmento ou na tecnologia abre a aba Projetos filtrada por ele.'],
    { tickets: ['CR-009'] }),

  c('I04', 'media', 'Projetos por ano, pares de tecnologias, resultados e lições',
    'Ver os outros cartões da tela.',
    [CONSULTOR, 'Clique na aba "Insights".'],
    ['Olhe o cartão "Projetos por ano".', 'Role a tela e leia "Tecnologias que andam juntas", "Resultados comprovados" e "Lições das propostas perdidas".', 'Clique no nome de um cliente em "Resultados comprovados".'],
    ['"Projetos por ano" mostra uma coluna por ano com o número em cima.', 'Os pares mostram duas tecnologias e em quantos projetos aparecem juntas.', 'Resultados e lições trazem frases dos documentos com o cliente; clicar no cliente abre o projeto.'],
    { tickets: ['CR-009'] }),

  c('I05', 'alta', 'Insights respeitam o perfil',
    'Ver se o consultor não vê números de projetos confidenciais.',
    [CONSULTOR, 'Clique na aba "Insights" e anote o número de projetos do topo.'],
    [GESTOR, 'Olhe de novo a aba Insights.'],
    ['O gestor vê mais projetos que o consultor (o projeto confidencial entra só para o gestor).', 'Para o consultor, as dicas das barras não mostram valor médio.'],
    { tickets: ['CR-009'] }),

  c('I06', 'media', 'Saúde da base recolhida',
    'Ver se os dados de curadoria não poluem a tela.',
    ['Clique na aba "Insights".'],
    ['Role até o fim e clique em "Saúde da base (curadoria)".'],
    ['A seção começa recolhida e, ao abrir, mostra documentos por tipo, envios aguardando revisão e pendências de cadastro.'],
    { tickets: ['CR-009'] }),

  c('I07', 'media', 'Insights (novo) fora das abas',
    'Ver se o protótipo antigo saiu da barra de abas.',
    [],
    ['Olhe a barra de abas no alto.', 'Na barra de endereço do navegador, troque o fim do endereço por "/insights-novo" e aperte Enter.'],
    ['A barra de abas tem só Perguntar, Projetos e Insights (o envio de arquivos fica dentro do projeto e na conversa).', 'O endereço /insights-novo abre o protótipo "Insights (novo)" direto, para avaliação.']),
];

// Roteiros de versões anteriores, congelados: a versão arquivada só pode ser consultada.
// O arquivo JSON de cada uma é uma foto do roteiro no dia em que a versão foi fechada; um teste garante que não muda.
const ARQUIVO = (v) => new URL(`./roteiros/${v}.json`, import.meta.url);
export const VERSOES_ARQUIVADAS = ['V0.0.1'];
const congelar = (o) => { Object.values(o).forEach((v) => v && typeof v === 'object' && congelar(v)); return Object.freeze(o); };
const ARQUIVADOS = Object.fromEntries(VERSOES_ARQUIVADAS.map((v) => [v, congelar(JSON.parse(fs.readFileSync(ARQUIVO(v), 'utf8')))]));
export const versaoArquivada = (v) => Object.hasOwn(ARQUIVADOS, v);
// Roteiro de uma versão: o congelado, se arquivada; senão, o roteiro atual (acima).
export const roteiroDe = (v) => ARQUIVADOS[v] ?? ROTEIRO;
