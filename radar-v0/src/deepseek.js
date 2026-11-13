// Adaptador DeepSeek (API compatível com OpenAI) usando apenas fetch nativo (Node 18+).
// Implementa a mesma interface do MockLLM. Se a chamada falhar (sem internet na VM, chave inválida,
// timeout ou JSON malformado), cai para o comportamento do mock e informa o motivo em `ia`.
// Só recebe trechos que já passaram pelo filtro de permissão do usuário (UC03.5).

import { MockLLM } from './llm.js';
import { SEGMENTS, TECHNOLOGIES, SERVICES } from './lexicon.js';
import { AGRUPAVEIS, CAMPOS_FICHA, classificar } from './intents.js';
import { STATUS_PROPOSTA } from './db/repo.js';
import { INTENCOES, regrasDoRoteador } from './skills/index.js';
import { PERSONA } from './skills/persona.js';

export const VOCAB = { segmentos: Object.keys(SEGMENTS), tecnologias: Object.keys(TECHNOLOGIES), servicos: Object.keys(SERVICES) };

const UNDERSTAND_PROMPT = `Você é o módulo de interpretação do "Radar de Propostas & Cases", uma base interna de propostas comerciais, apresentações, estimativas, transcrições de reunião e cases de projetos de dados e tecnologia.
Sua tarefa: entender a pergunta atual do usuário considerando o histórico da conversa, os arquivos anexados nesta conversa ("anexos") e os arquivos ainda não enviados à base ("pendentes"), e devolver SOMENTE um JSON com:
{
  "intencao": ${INTENCOES.map((i) => `"${i}"`).join(' | ')},
  "confianca": number,             // 0 a 1: quão seguro você está da intenção
  "continuacao": boolean,          // true se a pergunta depende do contexto de turnos anteriores
  "consulta": string,              // pergunta reescrita de forma autossuficiente, em português, incorporando o contexto quando for continuação
  "segmentos": string[],           // apenas valores da lista SEGMENTOS
  "tecnologias": string[],         // apenas valores da lista TECNOLOGIAS
  "servicos": string[],            // apenas valores da lista SERVICOS
  "prazoMeses": number | null,
  "termos": string[],              // 5 a 12 sinônimos, conceitos e termos técnicos relacionados em português, úteis para recuperar documentos
  "referencia": number | null,     // posição (1 a 5) de um resultado da resposta anterior, quando o usuário pede detalhe dele
  "status": string[],              // apenas valores da lista STATUS, quando a pergunta filtra por situação ("perdidas", "ganhas")
  "anoDe": number | null, "anoAte": number | null,   // período citado ("em 2025", "desde 2024")
  "cliente": string | null,        // cliente citado como filtro
  "agruparPor": string | null,     // em "agregar": um valor de AGRUPAVEIS
  "projetos": string[],            // em "ficha" e "comparar": códigos (P001) ou nomes dos projetos citados; posições da resposta anterior viram os códigos mostrados nela
  "campos": string[],              // em "ficha": valores de CAMPOS pedidos
  "opcoes": string[],              // em "esclarecer": 2 ou 3 perguntas reescritas, uma por interpretação possível
  "conversa": string | null,       // em "conversa": saudacao | capacidades | agradecimento | despedida | critica | fora_escopo
  "acao": string | null            // em "anexo": resumir | perguntar | parecidos
}
Regras de intenção:
${regrasDoRoteador()}
- "fora_dominio": não use; pedidos fora do escopo são "conversa" com "conversa": "fora_escopo".
- "esclarecer": só quando a pergunta admite interpretações realmente diferentes e você não consegue escolher (confianca < 0.5). Nunca para perguntas claras.
- Em continuação ("e só com Databricks?", "e em seguros?"), mantenha os filtros anteriores que ainda fazem sentido e aplique a mudança pedida. Se o usuário mudar de assunto, não carregue filtros antigos.
- Infira segmento, tecnologia e serviço pelo significado, mesmo sem a palavra exata (ex.: "distribuidora de luz" => "Utilities / Energia"; "prever cancelamento de clientes" => serviço de ciência de dados).
SEGMENTOS: ${JSON.stringify(VOCAB.segmentos)}
TECNOLOGIAS: ${JSON.stringify(VOCAB.tecnologias)}
SERVICOS: ${JSON.stringify(VOCAB.servicos)}
STATUS: ${JSON.stringify(STATUS_PROPOSTA)}
AGRUPAVEIS: ${JSON.stringify(Object.keys(AGRUPAVEIS))}
CAMPOS: ${JSON.stringify(Object.keys(CAMPOS_FICHA))}`;

// Opção C (UC03.23): a IA decide quais ferramentas chamar. Ela nunca acessa o banco: só pede, e o servidor executa
// com as permissões do usuário. Números e listas exibidos vêm dos resultados das ferramentas.
const TOOLS_PROMPT = `${PERSONA}
Nesta tarefa você responde sobre o "Radar de Propostas & Cases", base interna de projetos, propostas e cases.
Responda à pergunta usando as ferramentas disponíveis. Faça só as chamadas necessárias (no máximo 4).
Depois escreva a resposta final em português, com no máximo 60 palavras, respondendo exatamente ao que foi perguntado.
A tela já mostra em tabelas tudo o que as ferramentas devolveram: não repita campos, listas nem fichas. Traga só a conclusão, a diferença principal ou o insight. Texto corrido, sem markdown nem listas.
Cite projetos como [P001]. Use apenas informações devolvidas pelas ferramentas. Não invente números, valores, clientes ou prazos.
Se uma informação vier como restrita ou não informada, diga isso. Não repita listas longas: a tela já mostra as tabelas.`;

const ANALYZE_PROMPT = `${PERSONA}
Nesta tarefa você é o analista do "Radar de Propostas & Cases". Recebe uma pergunta de um profissional de pré-vendas e projetos candidatos recuperados da base interna, cada um com metadados e frases numeradas extraídas dos documentos.
Devolva SOMENTE um JSON:
{
  "avaliacoes": [ { "projeto_id": string, "relevancia": number, "justificativa": string, "evidencia": string } ],
  "resposta": string
}
Regras:
- "relevancia" de 0 a 1: o quanto o projeto é uma referência útil para a pergunta, pelo significado (problema, objetivo, escopo, segmento, tecnologia), não só por palavras iguais. Use < 0.4 para projetos que não ajudam.
- "justificativa": 1 frase explicando por que o projeto se relaciona (ou não) com a pergunta.
- "evidencia": o id (ex.: "P001-3") da frase que melhor sustenta a justificativa. Nunca escreva o texto da frase, só o id.
- "resposta": texto em português, no máximo 110 palavras, em blocos separados por uma linha em branco ("\n\n"), fácil de escanear:
  1º bloco (1 ou 2 frases): responda diretamente à pergunta e diga por que cada referência citada é relevante. Não misture recomendação neste bloco.
  2º bloco: comece com "Recomendação:" e diga o que reaproveitar de cada referência, cuidados, riscos e lições (inclusive de propostas perdidas).
  3º bloco, SÓ se as frases fornecidas citarem papéis ou perfis da equipe (ex.: arquiteto de dados, cientista de dados): comece com "Perfis sugeridos:" e liste esses perfis. Se as frases não citarem papéis, não escreva este bloco e não invente equipe.
  Cite projetos como [P001]. Cite apenas projetos com relevância >= 0.5 e não mencione os demais.
- Use exclusivamente as informações fornecidas. Não invente números, valores, prazos, clientes ou resultados. Se nenhum projeto ajudar, diga claramente que não há evidência suficiente na base.
- Não mencione valores financeiros que não estejam nas frases fornecidas.`;

function pick(values, allowed) {
  return Array.isArray(values) ? [...new Set(values.filter((v) => allowed.includes(v)))] : [];
}

// Feedback com capturas de tela: descrição objetiva, só texto, sem dados pessoais.
const FEEDBACK_PROMPT = `Você é analista de QA do Radar, um app web de busca de propostas e cases (abas Perguntar, Projetos, Enviar e Insights).
Recebe o relato de um testador e capturas de tela. Responda só com JSON:
{"titulo": string (até 12 palavras, o problema em si),
 "imagens": string[] (uma descrição por imagem, na ordem: qual tela é, o que está visível e o que parece errado; transcreva literalmente mensagens de erro e textos relevantes),
 "problema": string (até 80 palavras: o comportamento observado, o esperado quando der para inferir e onde acontece)}
Regras: descreva só o que está visível; não invente causas técnicas; se a imagem não mostrar problema, diga isso.
Não transcreva nomes de pessoas, e-mails, telefones, documentos ou senhas: escreva [dado pessoal].`;

export class DeepSeekLLM extends MockLLM {
  constructor({ apiKey, model = 'deepseek-chat', baseUrl = 'https://api.deepseek.com', timeoutMs = 45000 } = {}) {
    super();
    this.apiKey = apiKey;
    this.model = model;
    this.baseUrl = baseUrl.replace(/\/$/, '');
    this.timeoutMs = timeoutMs;
    this.name = model;
    this.provider = 'deepseek';
  }

  async chat(system, user, maxTokens) {
    const res = await fetch(`${this.baseUrl}/chat/completions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${this.apiKey}` },
      body: JSON.stringify({
        model: this.model,
        temperature: 0.1,
        max_tokens: maxTokens,
        response_format: { type: 'json_object' },
        messages: [
          { role: 'system', content: system },
          { role: 'user', content: user },
        ],
      }),
      signal: AbortSignal.timeout(this.timeoutMs),
    });
    if (!res.ok) throw new Error(`DeepSeek respondeu HTTP ${res.status}`);
    const data = await res.json();
    return JSON.parse(data.choices?.[0]?.message?.content ?? '{}');
  }

  // Resposta com base em trechos fornecidos (ajuda e arquivo anexado): devolve o JSON pedido no prompt.
  async grounded({ sistema, payload, maxTokens = 500 }) {
    return this.chat(sistema, JSON.stringify(payload), maxTokens);
  }

  fallbackStatus(err) {
    const motivo = err.name === 'TimeoutError' ? 'tempo esgotado' : err.message;
    return { provedor: 'mock', fallback: true, erro: `DeepSeek indisponível (${motivo}); usado o modo offline.` };
  }

  async understand({ query, history = [], opportunity, anexos = [], pendentes = 0 }) {
    const conversa = history.slice(-6).map((t, i) => ({
      turno: i + 1,
      pergunta: t.pergunta,
      consulta: t.consulta,
      entidades: t.entidades,
      resultados: (t.resultados ?? []).map((r, j) => `${j + 1}. ${r.projeto_id} ${r.titulo} (${r.cliente})`),
    }));
    const payload = { historico: conversa, briefing: opportunity ? { cliente: opportunity.cliente, segmento: opportunity.segmento, descricao: opportunity.descricao } : null, anexos: anexos.map((a) => ({ nome: a.nome, tipo: a.analise?.tipo ?? null })), pendentes, pergunta: query };
    try {
      const out = await this.chat(UNDERSTAND_PROMPT, JSON.stringify(payload), 600);
      const intencao = INTENCOES.includes(out.intencao) ? out.intencao : 'buscar';
      const strs = (v, n = 4) => (Array.isArray(v) ? v.filter((x) => typeof x === 'string' && x.trim()).map((x) => x.trim().slice(0, 160)).slice(0, n) : []);
      return {
        intencao,
        confianca: Number.isFinite(Number(out.confianca)) ? Math.max(0, Math.min(1, Number(out.confianca))) : 1,
        filtros: {
          status: pick(out.status, STATUS_PROPOSTA),
          anoDe: Number.isInteger(out.anoDe) ? out.anoDe : null,
          anoAte: Number.isInteger(out.anoAte) ? out.anoAte : null,
          cliente: typeof out.cliente === 'string' ? out.cliente.slice(0, 80) : '',
        },
        agruparPor: Object.keys(AGRUPAVEIS).includes(out.agruparPor) ? out.agruparPor : null,
        projetos: strs(out.projetos),
        campos: pick(out.campos, Object.keys(CAMPOS_FICHA)),
        opcoes: strs(out.opcoes, 3),
        conversa: ['saudacao', 'capacidades', 'agradecimento', 'despedida', 'critica', 'fora_escopo'].includes(out.conversa) ? out.conversa : null,
        acao: ['resumir', 'perguntar', 'parecidos'].includes(out.acao) ? out.acao : null,
        continuacao: Boolean(out.continuacao),
        consulta: typeof out.consulta === 'string' && out.consulta.trim() ? out.consulta.trim() : query,
        segmentos: pick(out.segmentos, VOCAB.segmentos),
        tecnologias: pick(out.tecnologias, VOCAB.tecnologias),
        servicos: pick(out.servicos, VOCAB.servicos),
        prazoMeses: Number.isFinite(out.prazoMeses) ? out.prazoMeses : null,
        termos: Array.isArray(out.termos) ? out.termos.filter((t) => typeof t === 'string').slice(0, 12) : [],
        referencia: Number.isInteger(out.referencia) ? out.referencia : null,
        ia: { provedor: 'deepseek', fallback: false },
      };
    } catch (err) {
      return { ...(await super.understand({ query, history, anexos, pendentes })), ia: this.fallbackStatus(err) };
    }
  }

  // Classificação por regras usada como segunda opinião: corrige "buscar" quando o pedido é claramente outro.
  static reforcar(query, intencao) {
    if (intencao !== 'buscar') return intencao;
    const r = classificar(query).intencao;
    return ['listar', 'agregar'].includes(r) ? r : intencao;
  }

  async analyze({ query, history = [], candidates }) {
    if (!candidates.length) return null;
    const payload = {
      contexto_da_conversa: history.slice(-3).map((t) => ({ pergunta: t.pergunta, resposta: t.resposta?.slice(0, 400) })),
      pergunta: query,
      projetos: candidates.map((c) => ({
        projeto_id: c.projeto_id,
        titulo: c.titulo,
        cliente: c.cliente,
        segmento: c.segmento,
        status: c.status,
        tecnologias: c.tecnologias,
        servicos: c.servicos,
        objetivo: c.objetivo,
        licoes: c.licoes,
        frases: c.frases.map((f) => `[${f.id}] ${f.texto}`),
      })),
    };
    try {
      const out = await this.chat(ANALYZE_PROMPT, JSON.stringify(payload), 1500);
      const avaliacoes = {};
      for (const a of Array.isArray(out.avaliacoes) ? out.avaliacoes : []) {
        if (!a?.projeto_id || !Number.isFinite(Number(a.relevancia))) continue;
        avaliacoes[a.projeto_id] = {
          relevancia: Math.max(0, Math.min(1, Number(a.relevancia))),
          justificativa: typeof a.justificativa === 'string' ? a.justificativa : null,
          evidencia: typeof a.evidencia === 'string' ? a.evidencia : null,
        };
      }
      return { avaliacoes, resposta: typeof out.resposta === 'string' ? out.resposta : null, ia: { provedor: 'deepseek', fallback: false } };
    } catch (err) {
      return { avaliacoes: {}, resposta: null, ia: this.fallbackStatus(err) };
    }
  }

  // Opção C: laço de ferramentas no formato OpenAI (tools / tool_calls), compatível com a API do DeepSeek.
  // execute(nome, args) roda no servidor com as permissões do usuário e devolve { paraIA, ... }.
  async runTools({ query, history = [], tools, execute, maxCalls = 4, deadlineMs = 20000 }) {
    const t0 = Date.now();
    const contexto = history.slice(-3).map((t) => `Pergunta anterior: ${t.pergunta}${t.resultados?.length ? ` (mostrados: ${t.resultados.map((r) => r.projeto_id).join(', ')})` : ''}`).join('\n');
    const messages = [
      { role: 'system', content: TOOLS_PROMPT },
      { role: 'user', content: `${contexto ? `${contexto}\n\n` : ''}Pergunta: ${query}` },
    ];
    const passos = [];
    for (let rodada = 0; rodada < 6; rodada++) {
      const restante = deadlineMs - (Date.now() - t0);
      if (restante < 1500) break;
      const podeChamar = passos.length < maxCalls;
      const res = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${this.apiKey}` },
        body: JSON.stringify({ model: this.model, temperature: 0.1, max_tokens: 500, messages, ...(podeChamar ? { tools, tool_choice: 'auto' } : {}) }),
        signal: AbortSignal.timeout(restante),
      });
      if (!res.ok) throw new Error(`DeepSeek respondeu HTTP ${res.status}`);
      const msg = (await res.json()).choices?.[0]?.message ?? {};
      if (!msg.tool_calls?.length) return { resposta: msg.content ?? '', passos, ia: { provedor: 'deepseek', fallback: false } };
      messages.push({ role: 'assistant', content: msg.content ?? '', tool_calls: msg.tool_calls });
      // A API exige uma resposta para cada pedido de ferramenta, mesmo os que passam do limite.
      for (const call of msg.tool_calls) {
        let saida;
        if (passos.length >= maxCalls) saida = { erro: 'Limite de chamadas atingido. Responda com o que já tem.' };
        else {
          let args = null;
          try { args = JSON.parse(call.function?.arguments || '{}'); } catch { /* parâmetros inválidos */ }
          const r = args ? await execute(call.function?.name, args) : { paraIA: { erro: 'Parâmetros inválidos.' } };
          passos.push({ ferramenta: call.function?.name, parametros: args, ...r });
          saida = r.paraIA;
        }
        messages.push({ role: 'tool', tool_call_id: call.id, content: JSON.stringify(saida) });
      }
    }
    return { resposta: '', passos, ia: { provedor: 'deepseek', fallback: false }, incompleta: true };
  }

  // UC02: metadados sugeridos para um documento enviado. O prompt fica em EXTRACT_PROMPT, abaixo da classe.
  // Feedback de teste: a IA examina as capturas de tela e descreve o problema. As imagens não são guardadas.
  async describeFeedback({ texto, area, imagens = [] }) {
    const content = [
      { type: 'text', text: `Relato de quem testou (área: ${area}): """${String(texto).slice(0, 2000)}"""
Examine as ${imagens.length} captura(s) de tela a seguir.` },
      ...imagens.map((url) => ({ type: 'image_url', image_url: { url } })),
    ];
    const r = await this.chat(FEEDBACK_PROMPT, content, 700);
    return {
      titulo: String(r.titulo ?? '').slice(0, 90),
      imagens: (Array.isArray(r.imagens) ? r.imagens : []).map((x) => String(x).slice(0, 1500)).slice(0, imagens.length),
      problema: String(r.problema ?? '').slice(0, 1500),
    };
  }

  async extractMetadata({ texto, filename }) {
    const body = texto.length > 14000 ? `${texto.slice(0, 10000)}\n[...]\n${texto.slice(-4000)}` : texto;
    try {
      const out = await this.chat(EXTRACT_PROMPT, JSON.stringify({ arquivo: filename, texto: body }), 1400);
      return {
        ...out,
        segmento: VOCAB.segmentos.includes(out.segmento) ? out.segmento : null,
        tecnologias: pick(out.tecnologias, VOCAB.tecnologias),
        servicos: pick(out.servicos, VOCAB.servicos),
        ia: { provedor: 'deepseek', fallback: false },
      };
    } catch (err) {
      return { ia: this.fallbackStatus(err) };
    }
  }
}

const EXTRACT_PROMPT = `Você é o módulo de catalogação do "Radar de Propostas & Cases". Recebe o texto extraído de um documento de pré-vendas ou de projeto (proposta, apresentação, estimativa, transcrição de reunião, case, ata, e-mail, documento técnico).
Devolva SOMENTE um JSON com os metadados que conseguir identificar no texto (use null ou [] quando não houver evidência):
{
  "tipo_documental": "proposta_comercial" | "apresentacao_comercial" | "estimativa_preliminar" | "transcricao_reuniao" | "case_sucesso" | "ata_validada" | "sow" | "email" | "documento_tecnico" | "outro",
  "cliente": string | null,            // nome da empresa cliente exatamente como aparece no texto
  "titulo": string | null,             // título curto do projeto/documento
  "segmento": string | null,           // apenas um valor da lista SEGMENTOS
  "tecnologias": string[],             // apenas valores da lista TECNOLOGIAS
  "servicos": string[],                // apenas valores da lista SERVICOS
  "status_proposta": "Em elaboração" | "Enviada" | "Em negociação" | "Vendida" | "Em execução" | "Entregue" | "Perdida" | "Cancelada" | null,
  "prazo_meses": number | null,        // só se o texto declarar o prazo
  "valor": number | null,              // valor total da proposta em reais, só se declarado
  "resumo": string,                    // 2 a 3 frases objetivas em português
  "objetivo": string | null,
  "resultados": string[],              // resultados/KPIs declarados, frases curtas
  "riscos": string[],
  "licoes": string[],
  "pessoas": [ { "nome": string, "papel": string | null } ],  // nomes exatamente como aparecem
  "palavras_chave": string[]           // 5 a 8 termos
}
Não invente: tudo deve estar sustentado pelo texto.
SEGMENTOS: ${JSON.stringify(VOCAB.segmentos)}
TECNOLOGIAS: ${JSON.stringify(VOCAB.tecnologias)}
SERVICOS: ${JSON.stringify(VOCAB.servicos)}`;

// Escolhe o provedor pelas variáveis de ambiente (ver .env.example).
export function createLLM(env = process.env) {
  if ((env.LLM_PROVIDER ?? 'deepseek') === 'deepseek' && env.DEEPSEEK_API_KEY) {
    return new DeepSeekLLM({
      apiKey: env.DEEPSEEK_API_KEY,
      model: env.DEEPSEEK_MODEL,
      baseUrl: env.DEEPSEEK_BASE_URL,
      timeoutMs: Number(env.DEEPSEEK_TIMEOUT_MS ?? 45000),
    });
  }
  return new MockLLM();
}
