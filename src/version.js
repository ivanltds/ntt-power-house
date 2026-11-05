// Versão publicada do Radar, lida do package.json (ex.: 0.0.1 → "V0.0.1").
// O selo da tela (public/versao.js) usa o mesmo valor; um teste garante que os dois batem.
import fs from 'node:fs';
import path from 'node:path';
import { ROOT } from './config.js';

export const VERSAO = `V${JSON.parse(fs.readFileSync(path.join(ROOT, 'package.json'), 'utf8')).version}`;
