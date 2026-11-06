// Caminhos do Radar. RADAR_DATA_DIR permite apontar os dados gravados (banco, índice vetorial,
// uploads, conversas, auditoria) para outra pasta, como nos testes.
// A massa piloto (corpus fictício, usuários e oportunidades) fica sempre em data/.

import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const SEED_DIR = path.join(ROOT, 'data');
export const CORPUS_DIR = path.join(SEED_DIR, 'corpus');
export const DATA_DIR = process.env.RADAR_DATA_DIR ? path.resolve(process.env.RADAR_DATA_DIR) : SEED_DIR;
export const DB_PATH = path.join(DATA_DIR, 'radar.db');
export const STORE_PATH = path.join(DATA_DIR, 'vectorstore', 'radar.json');
export const UPLOADS_DIR = path.join(DATA_DIR, 'uploads');
export const CONVERSAS_PATH = path.join(DATA_DIR, 'conversas', 'conversas.json');
export const AUDITORIA_DIR = path.join(DATA_DIR, 'auditoria');
