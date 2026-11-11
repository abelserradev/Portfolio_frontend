/**
 * Graba el reel con playwright-cli y guarda las marcas de escena que devuelve el script,
 * para que el montaje de voz no dependa de tiempos fijos.
 */
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const MARKERS_FILE = path.join(ROOT, 'public', 'media', 'portfolio-launch-markers.json');

function cli(args, { capture = false } = {}) {
  const result = spawnSync('playwright-cli', args, {
    cwd: ROOT,
    shell: true,
    encoding: 'utf8',
    stdio: capture ? ['ignore', 'pipe', 'inherit'] : 'inherit',
  });
  if (result.status !== 0) {
    throw new Error(`playwright-cli ${args[0]} terminó con código ${result.status}`);
  }
  return result.stdout ?? '';
}

cli(['open', '--browser=chrome', 'about:blank']);
let raw = '';
try {
  raw = cli(['--raw', 'run-code', '--filename', 'scripts/record-portfolio-launch-video.mjs'], { capture: true });
} finally {
  cli(['close']);
}

// --raw devuelve el string JSON serializado otra vez (comillas escapadas).
let markers = JSON.parse(raw.trim());
if (typeof markers === 'string') {
  markers = JSON.parse(markers);
}
fs.writeFileSync(MARKERS_FILE, `${JSON.stringify(markers, null, 2)}\n`);
console.log(`Marcas guardadas en ${MARKERS_FILE}`);
console.log(markers);
