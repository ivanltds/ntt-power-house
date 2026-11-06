// Isola os dados gravados pelos testes numa pasta temporária. Deve ser o primeiro import dos testes.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

process.env.RADAR_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), 'radar-test-'));
