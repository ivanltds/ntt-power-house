// Carrega variáveis de um arquivo .env (KEY=valor) sem dependências.
// process.loadEnvFile só existe a partir do Node 20.12; a VM pode ter Node 18.
// Variáveis já definidas no ambiente têm precedência sobre o arquivo.

import fs from 'node:fs';

export function loadEnv(file) {
  if (!fs.existsSync(file)) return;
  for (const line of fs.readFileSync(file, 'utf8').split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/i);
    if (!m || line.trim().startsWith('#')) continue;
    const value = m[2].replace(/^(['"])(.*)\1$/, '$2');
    if (process.env[m[1]] === undefined) process.env[m[1]] = value;
  }
}
