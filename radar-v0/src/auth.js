// Login simples por formulário para o piloto: um usuário e senha compartilhados, definidos no ambiente.
// Sem RADAR_LOGIN_USER/RADAR_LOGIN_PASS o app fica aberto (uso local).
// A sessão é um cookie assinado com HMAC e validade fixa, sem estado no servidor.

import crypto from 'node:crypto';

const COOKIE = 'radar_sessao';
const MAX_AGE_S = 7 * 24 * 3600;
// Liberadas sem sessão: a própria tela de login e o que ela carrega.
const PUBLIC_PATHS = new Set(['/login', '/login.html', '/style.css', '/tema.js', '/api/login', '/img/impactai-claro.png', '/img/impactai-escuro.png']);

const sign = (secret, data) => crypto.createHmac('sha256', secret).update(data).digest('base64url');

const same = (a, b) => {
  const x = Buffer.from(String(a));
  const y = Buffer.from(String(b));
  return x.length === y.length && crypto.timingSafeEqual(x, y);
};

function cookies(req) {
  return Object.fromEntries((req.headers.cookie ?? '').split(';').map((c) => c.trim().split('=')).filter(([k]) => k).map(([k, ...v]) => [k, v.join('=')]));
}

export function createAuth(env = process.env) {
  const user = env.RADAR_LOGIN_USER;
  const pass = env.RADAR_LOGIN_PASS;
  const enabled = Boolean(user && pass);
  // Sem segredo fixo, um reinício do servidor encerra as sessões abertas.
  const secret = env.RADAR_LOGIN_SECRET || crypto.randomBytes(32).toString('hex');
  // Atrás do Caddy o acesso é HTTPS; localmente o cookie precisa funcionar em http.
  const secure = env.RADAR_LOGIN_SECURE !== 'false';

  const token = (exp) => `${exp}.${sign(secret, `${user}.${exp}`)}`;

  function valid(req) {
    const [exp, mac] = (cookies(req)[COOKIE] ?? '').split('.');
    return Boolean(exp && mac) && Number(exp) > Date.now() / 1000 && same(mac, sign(secret, `${user}.${exp}`));
  }

  return {
    enabled,
    isPublic: (pathname) => PUBLIC_PATHS.has(pathname),
    allowed: (req) => !enabled || valid(req),
    // Devolve o Set-Cookie da sessão, ou null se as credenciais não conferem.
    login(u, p) {
      if (!enabled || !same(String(u ?? '').trim().toLowerCase(), user.toLowerCase()) || !same(p ?? '', pass)) return null;
      const exp = Math.floor(Date.now() / 1000) + MAX_AGE_S;
      return `${COOKIE}=${token(exp)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${MAX_AGE_S}${secure ? '; Secure' : ''}`;
    },
    logout: () => `${COOKIE}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0${secure ? '; Secure' : ''}`,
  };
}
