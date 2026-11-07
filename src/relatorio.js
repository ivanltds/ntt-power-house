// Endpoint de leitura para agentes de relatório (ex.: Status Report gerado por IA).
// Não usa o login da tela: o agente se identifica com uma chave fixa (RADAR_RELATORIO_TOKEN),
// enviada em "Authorization: Bearer <chave>" ou, para agentes que só fazem GET simples, em ?chave=<chave>.
// Sem a variável definida, o endpoint fica desligado (404).
import crypto from 'node:crypto';
import { ROTEIRO, AREAS, TIPOS, STATUS, RESULTADOS, PRIORIDADES } from './qualidade.js';

export const RELATORIO_PATH = '/api/relatorio/qualidade';
// Resumo executivo dos insights (manchetes por lente e números-chave), com a mesma chave.
export const RELATORIO_INSIGHTS_PATH = '/api/relatorio/insights';

// O agente lê como um usuário sem acesso a confidenciais e, por padrão, sem valores e margens.
// RADAR_RELATORIO_VALORES=1 inclui valores (decisão do PO; a chave passa a dar acesso a números financeiros).
export const usuarioRelatorio = (env = process.env) => ({ id: 'relatorio', nome: 'Agente de relatório', perfil: 'relatorio', confidencialidades: ['publica', 'interna'], verValores: env.RADAR_RELATORIO_VALORES === '1' });
export const RELATORIO_FORMATO = 1;

export function criarAcessoRelatorio(env = process.env) {
  const chave = String(env.RADAR_RELATORIO_TOKEN ?? '').trim();
  const ativo = chave.length >= 24;
  const igual = (x) => {
    const a = crypto.createHash('sha256').update(String(x)).digest();
    const b = crypto.createHash('sha256').update(chave).digest();
    return crypto.timingSafeEqual(a, b);
  };
  return {
    ativo,
    autorizado(req, url) {
      if (!ativo) return false;
      const h = String(req.headers.authorization ?? '');
      const enviada = h.toLowerCase().startsWith('bearer ') ? h.slice(7).trim() : url.searchParams.get('chave') ?? '';
      return enviada !== '' && igual(enviada);
    },
  };
}

// Só leitura e sem segredos: tira o link de apagar imagem e os tickets apagados (tickets() já os exclui).
const semApagar = (imgs = []) => imgs.map(({ apagar, ...i }) => i);

export function montarRelatorio(qualidade, versao) {
  const tickets = qualidade.tickets().map((t) => ({ ...t, imagens: semApagar(t.imagens) }));
  const resumo = qualidade.resumo(versao);
  return {
    formato: RELATORIO_FORMATO,
    geradoEm: new Date().toISOString(),
    versao,
    regraMetrica: resumo.regra,
    rotulos: { areas: AREAS, tipos: TIPOS, status: STATUS, resultados: RESULTADOS, prioridades: PRIORIDADES },
    resumo,
    roteiro: ROTEIRO.map(({ id, titulo, area, prioridade }) => ({ id, titulo, area, prioridade })),
    tickets,
  };
}
