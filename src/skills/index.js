// Registro de skills do Radar (adendo 6, seção 3): cada skill descreve a si mesma num lugar só.
// Daqui saem: as intenções e regras do roteador da IA, a resposta "o que você pode fazer?" (filtrada por perfil),
// os exemplos usados nos testes automáticos (exemplos / naoAtiva) e o pré-roteamento por regras.
// Para acrescentar uma skill: crie o executor em src/skills/<id>.js, registre aqui com descrição e exemplos e rode o npm test.

import { can } from '../permissions.js';
import { tipoDeConversa, separarSaudacao } from './conversa.js';
import { ehDuvidaDeUso } from './ajuda.js';
import { acaoComAnexo } from './anexo.js';

// Campos de cada skill:
//   id, intencao (valor que a IA devolve), regraIA (quando escolher, para o prompt do roteador),
//   capacidade { icone, titulo, descricao, exemplo, clicavel, permissao } (para "o que você pode fazer?"),
//   exemplos (frases que DEVEM ativar a skill) e naoAtiva (frases que NÃO devem), usados no teste automático.
export const SKILLS = [
  {
    id: 'buscar', intencao: 'buscar',
    regraIA: 'projetos, propostas ou cases PARECIDOS com um tema, problema, cliente ou oportunidade ("já fizemos fraude em seguros?", "projetos de churn").',
    capacidade: { icone: 'radar', titulo: 'Achar projetos parecidos', descricao: 'Encontro propostas e cases parecidos com um tema, cliente ou problema e mostro de onde veio cada informação.', exemplo: 'Já fizemos projetos de churn em telecom?', clicavel: true },
    exemplos: ['já fizemos algum projeto relacionado com seguros?', 'projetos de previsão de demanda no varejo'],
    naoAtiva: ['olá', 'como favorito uma conversa?'],
  },
  {
    id: 'listar', intencao: 'listar',
    regraIA: 'inventário da base por atributos, sem tema ("consolidado de todos os projetos", "liste as propostas perdidas de 2025", "quantos projetos temos em varejo").',
    capacidade: { icone: 'files', titulo: 'Listar e filtrar a base', descricao: 'Listo os projetos por segmento, status, cliente ou período.', exemplo: 'Liste os projetos entregues em 2025', clicavel: true },
    exemplos: ['liste todos os projetos', 'liste as propostas perdidas'],
    naoAtiva: ['valeu'],
  },
  {
    id: 'agregar', intencao: 'agregar',
    regraIA: 'lista distinta ou contagem de um atributo ("quais áreas/segmentos têm projetos", "quantos projetos por tecnologia", "quais clientes já atendemos"). "Áreas" e "setores" = segmento, salvo se falar em prática da NTT.',
    capacidade: { icone: 'chart', titulo: 'Contar e agrupar', descricao: 'Conto projetos por segmento, tecnologia, status, cliente ou ano.', exemplo: 'Quantos projetos temos por segmento?', clicavel: true },
    exemplos: ['quantos projetos por tecnologia?', 'quais segmentos já atendemos?'],
    naoAtiva: [],
  },
  {
    id: 'ficha', intencao: 'ficha',
    regraIA: 'campos de um projeto específico citado pelo nome ou código ("qual o prazo, valor e responsável do projeto X?").',
    capacidade: { icone: 'file', titulo: 'Ficha de um projeto', descricao: 'Trago prazo, responsável, status e outros campos de um projeto pelo nome ou código.', exemplo: 'Qual o prazo e o responsável do P003?', clicavel: true },
    exemplos: ['qual o prazo do projeto P003?'],
    naoAtiva: [],
  },
  {
    id: 'comparar', intencao: 'comparar',
    regraIA: 'comparar 2 a 4 projetos citados ou mostrados na resposta anterior.',
    capacidade: { icone: 'layout', titulo: 'Comparar projetos', descricao: 'Comparo dois a quatro projetos lado a lado.', exemplo: 'Compare o P001 com o P006', clicavel: true },
    exemplos: ['compare o P006 com o P001'],
    naoAtiva: [],
  },
  {
    id: 'composta', intencao: 'composta',
    regraIA: 'pedido com mais de um passo que combina as anteriores ("liste os de seguros e compare os dois", "quais segmentos têm perdidas e qual a lição mais comum").',
    capacidade: null,
    exemplos: [], naoAtiva: [],
  },
  {
    id: 'detalhar', intencao: 'detalhar',
    regraIA: 'o usuário quer saber mais de um resultado já mostrado ("e o segundo?", "detalhe o primeiro").',
    capacidade: null, exemplos: [], naoAtiva: [],
  },
  {
    id: 'anexo', intencao: 'anexo',
    regraIA: 'SÓ quando "anexos" não está vazio: o usuário quer que o Radar leia, resuma ou explique o arquivo anexado, pergunta algo sobre o conteúdo dele, ou quer projetos parecidos com ele. Preencha "acao": "resumir" | "perguntar" | "parecidos".',
    capacidade: { icone: 'paperclip', titulo: 'Ler um arquivo', descricao: 'Anexe pelo clipe e eu resumo, respondo perguntas sobre ele ou busco projetos parecidos. O arquivo fica só na conversa e não entra na base.', exemplo: 'Anexe um arquivo e escreva "resuma"', clicavel: false },
    exemplos: [], naoAtiva: [],
    exemplosComAnexo: ['leia esse arquivo', 'leia ele e me diga o que ele é', 'resuma', 'qual o prazo?', 'tem algo parecido com isso na base?'],
  },
  {
    id: 'enviar_arquivo', intencao: 'enviar_arquivo',
    regraIA: 'SÓ quando "pendentes" > 0: o usuário quer colocar o arquivo anexado num projeto da base ("coloca no projeto P003", "é do projeto da Energisul").',
    capacidade: { icone: 'upload', titulo: 'Enviar arquivo para um projeto', descricao: 'Com um arquivo anexado, diga o projeto ("coloca no P003") e eu envio para revisão; ele só entra na base depois de aprovado.', exemplo: 'coloca no projeto P003', clicavel: false },
    exemplos: [], naoAtiva: [],
  },
  {
    id: 'criar_projeto', intencao: null,
    capacidade: { icone: 'plus', titulo: 'Criar projeto a partir de um arquivo', descricao: 'Anexe o arquivo e escolha "Criar projeto com este arquivo": eu preencho os campos para você conferir.', exemplo: 'Anexe um arquivo e escolha "Criar projeto"', clicavel: false, permissao: 'cadastrarProjeto' },
    exemplos: [], naoAtiva: [],
  },
  {
    id: 'ajuda', intencao: 'ajuda',
    regraIA: 'dúvida sobre COMO USAR o Radar: telas, botões, envio de arquivos, conversas, filtros, permissões, novidades da versão ("como favorito uma conversa?", "o que é proposta em foco?", "o que mudou nesta versão?").',
    capacidade: { icone: 'help', titulo: 'Tirar dúvidas de uso', descricao: 'Explico como usar o Radar com base no guia e nas notas da versão, e mostro onde ler mais.', exemplo: 'Como favorito uma conversa?', clicavel: true },
    exemplos: ['como favorito uma conversa?', 'o que é proposta em foco?', 'o que mudou nesta versão?', 'como envio um arquivo para um projeto?', 'como edito um campo do projeto?', 'quem pode excluir um projeto?', 'como reporto um problema?', 'como coloco uma conversa num grupo?', 'como é calculado o percentual de semelhança?', 'por que um projeto aparece como muito parecido?'],
    naoAtiva: ['como foi o projeto P003?', 'liste os projetos de varejo', 'como resolver o problema de churn em telecom?'],
  },
  {
    id: 'conversa', intencao: 'conversa',
    regraIA: 'saudação, papo informal ("tudo bem?", "qual seu nome?", elogio, brincadeira), pergunta sobre o que o Radar faz, agradecimento, despedida, crítica à resposta ou pedido fora do escopo (tempo, piadas, esportes). Preencha "conversa": "saudacao" | "papo" | "capacidades" | "agradecimento" | "despedida" | "critica" | "fora_escopo".',
    capacidade: null,
    exemplos: ['olá', 'oi', 'boa noite', 'Boa noite, o que vc pode fazer ?', 'o que você pode fazer?', 'valeu', 'obrigado pela ajuda', 'tchau', 'essa resposta está errada', 'qual a previsão do tempo?', 'ajuda', 'leia esse arquivo', 'tudo bem com você?', 'qual seu nome?', 'você é uma IA?', 'bom trabalho!', 'boa noite, tudo bem?'],
    naoAtiva: ['bom dia, liste os projetos de varejo', 'ok liste os projetos de varejo', 'me ajuda a achar projetos de churn'],
  },
];

export const INTENCOES = [...SKILLS.map((s) => s.intencao).filter(Boolean), 'fora_dominio', 'esclarecer'];
export const skill = (id) => SKILLS.find((s) => s.id === id);

// Linhas de regra do prompt do roteador, geradas do registro (o prompt não cresce à mão a cada skill).
export function regrasDoRoteador() {
  return SKILLS.filter((s) => s.intencao && s.regraIA).map((s) => `- "${s.intencao}": ${s.regraIA}`).join('\n');
}

// "O que você pode fazer?": só o que o perfil pode usar.
export function capacidades(user) {
  return SKILLS.filter((s) => s.capacidade && (!s.capacidade.permissao || can(user, s.capacidade.permissao)))
    .map((s) => ({ id: s.id, ...s.capacidade }));
}

// Pré-roteamento por regras, antes da IA: casos claros (saudação, agradecimento, dúvida de uso, pedidos sobre o arquivo)
// são resolvidos sem chamar a IA — mais rápido, mais barato e previsível.
// ctx: { anexos, pendentes }. Devolve { skill, tipo?, acao? } | { saudacao, resto } | null.
export function preRotear(query, ctx = {}) {
  const s = separarSaudacao(query);
  const texto = s?.resto ?? query;
  const acao = acaoComAnexo(texto, ctx);
  if (acao === 'enviar') return { skill: 'enviar_arquivo', saudacao: s?.saudacao };
  if (acao) return { skill: 'anexo', acao, saudacao: s?.saudacao };
  const tipo = tipoDeConversa(query, ctx);
  if (tipo) return { skill: 'conversa', tipo, saudacao: s?.saudacao };
  if (ehDuvidaDeUso(texto)) return { skill: 'ajuda', saudacao: s?.saudacao };
  if (s?.resto) return { saudacao: s.saudacao, resto: s.resto };
  return null;
}
