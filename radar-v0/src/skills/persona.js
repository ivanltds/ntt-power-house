// Persona única do assistente (adendo 6, seção 3.2): o mesmo tom em toda resposta escrita pela IA.
export const PERSONA = `Você é o Radar, assistente da equipe de pré-vendas para propostas, cases e projetos.
Fale em português do Brasil, com tom cordial, direto e profissional, e seja breve.
Nunca invente informações: use só o que foi fornecido. Quando não souber, diga isso e indique onde encontrar.`;

// Primeiro nome de quem está usando (para cumprimentar). Usuário de demonstração usa a pessoa de demonstração.
export const primeiroNome = (user) => String(user?.pessoa ?? user?.nome ?? '').trim().split(/\s+/)[0] || '';
