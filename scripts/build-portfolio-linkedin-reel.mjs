/**
 * Genera voz (ElevenLabs) y exporta MP4 con audio para LinkedIn.
 * Requiere: ELEVENLABS_API_KEY en Portfolio_frontend/.env.local
 * Requiere: portfolio-launch-cyber-reel.webm ya grabado
 */
import { execFileSync, spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const MEDIA = path.join(ROOT, 'public', 'media');
const VIDEO_IN = path.join(MEDIA, 'portfolio-launch-cyber-reel.webm');
const SCENES_FILE = path.join(MEDIA, 'portfolio-launch-voiceover-scenes.json');
const AUDIO_DIR = path.join(MEDIA, 'audio', 'portfolio-launch');
const OUT_LINKEDIN = path.join(MEDIA, 'portfolio-launch-linkedin.mp4');
const MARKERS_FILE = path.join(MEDIA, 'portfolio-launch-markers.json');
const MAX_SECONDS = 89.5;
const CHAT_WAIT_KEEP_BEFORE = 3.5;
const CHAT_WAIT_KEEP_AFTER = 1.0;
const VOICE_GAP = 0.2;
const ELEVENLABS_GENERATE = path.join(
  process.env.USERPROFILE || process.env.HOME || '',
  '.agents',
  'skills',
  'elevenlabs-remotion',
  'generate.js',
);

function loadEnvLocal() {
  const envPath = path.join(ROOT, '.env.local');
  if (!fs.existsSync(envPath)) {
    return;
  }
  const content = fs.readFileSync(envPath, 'utf-8');
  for (const line of content.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) {
      continue;
    }
    const eq = trimmed.indexOf('=');
    if (eq <= 0) {
      continue;
    }
    const key = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).trim();
    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
}

async function resolveFfmpeg() {
  try {
    const mod = await import('ffmpeg-static');
    const bin = mod.default || mod;
    if (bin && fs.existsSync(bin)) {
      return bin;
    }
  } catch {
    /* optional dep */
  }
  return 'ffmpeg';
}

function probeAudioSeconds(ffmpeg, filePath) {
  try {
    execFileSync(ffmpeg, ['-hide_banner', '-i', filePath], {
      encoding: 'utf8',
      stdio: ['ignore', 'ignore', 'pipe'],
    });
  } catch (err) {
    const stderr = err.stderr?.toString() || '';
    const match = stderr.match(/Duration:\s(\d+):(\d+):([\d.]+)/);
    if (!match) {
      return null;
    }
    const hours = Number(match[1]);
    const minutes = Number(match[2]);
    const seconds = Number(match[3]);
    return hours * 3600 + minutes * 60 + seconds;
  }
  return null;
}

/**
 * El chatbot tarda distinto en cada toma; esa espera se recorta del video dejando
 * unos segundos de "escribiendo…" para que se entienda que hubo respuesta real.
 */
function computeChatCut(markers) {
  const waitStart = markers.chat_espera_inicio;
  const reply = markers.chat_respuesta;
  if (waitStart == null || reply == null) {
    return null;
  }
  const from = waitStart + CHAT_WAIT_KEEP_BEFORE;
  const to = reply - CHAT_WAIT_KEEP_AFTER;
  return to - from > 0.5 ? { from, to } : null;
}

function buildVoiceTimeline(ffmpeg, scenes, projectName, markers, mapTime) {
  const timeline = [];
  let prevEnd = 0;
  for (const scene of scenes) {
    const mp3 = path.join(AUDIO_DIR, `${projectName}-${scene.id}.mp3`);
    const dur = probeAudioSeconds(ffmpeg, mp3) ?? scene.duration ?? 4;
    const anchor = scene.marker != null ? markers[scene.marker] : undefined;
    const rawStart = anchor != null ? anchor + (scene.offset ?? 0) : (scene.startAt ?? 0);
    // Si dos frases se pisan, la siguiente espera: dos voces a la vez no se entienden.
    const start = Math.max(mapTime(rawStart), prevEnd + VOICE_GAP);
    timeline.push({ id: scene.id, mp3, start, dur });
    prevEnd = start + dur;
  }
  return timeline;
}

function logVoiceTimeline(timeline) {
  console.log('\nLínea de tiempo de voz (inicio → fin):');
  for (const item of timeline) {
    console.log(`  ${item.id.padEnd(18)} ${item.start.toFixed(1)}s → ${(item.start + item.dur).toFixed(1)}s`);
  }
}

async function main() {
  loadEnvLocal();

  if (!fs.existsSync(VIDEO_IN)) {
    console.error(`Falta el video base: ${VIDEO_IN}`);
    console.error('Grabá antes: pnpm media:record-reel');
    process.exit(1);
  }
  if (!fs.existsSync(SCENES_FILE)) {
    console.error(`Falta ${SCENES_FILE}`);
    process.exit(1);
  }
  if (!fs.existsSync(ELEVENLABS_GENERATE)) {
    console.error(`No se encontró ElevenLabs generate.js en ${ELEVENLABS_GENERATE}`);
    process.exit(1);
  }
  if (!process.env.ELEVENLABS_API_KEY) {
    console.error('Falta ELEVENLABS_API_KEY en Portfolio_frontend/.env.local');
    process.exit(1);
  }

  fs.mkdirSync(AUDIO_DIR, { recursive: true });

  const skipVoice = process.argv.includes('--skip-voice');
  const scenesConfig = JSON.parse(fs.readFileSync(SCENES_FILE, 'utf-8'));
  const projectName = scenesConfig.name || 'portfolio-launch';

  if (!skipVoice) {
    console.log('Generando locución con ElevenLabs (voz masculina George, español)...');
    const result = spawnSync(
      process.execPath,
      [
        ELEVENLABS_GENERATE,
        '--scenes',
        SCENES_FILE,
        '--output-dir',
        AUDIO_DIR,
        '--character',
        'narrator',
        '--no-combined',
      ],
      { cwd: ROOT, stdio: 'inherit', env: process.env },
    );
    if (result.status !== 0) {
      process.exit(result.status ?? 1);
    }
  }

  const ffmpeg = await resolveFfmpeg();

  if (!fs.existsSync(MARKERS_FILE)) {
    console.error(`Falta ${MARKERS_FILE}. Grabá con: pnpm media:record-reel`);
    process.exit(1);
  }
  const markers = JSON.parse(fs.readFileSync(MARKERS_FILE, 'utf-8'));
  const rawVideoSeconds = probeAudioSeconds(ffmpeg, VIDEO_IN) ?? (markers.fin ?? 90) + 0.3;

  const chatCut = computeChatCut(markers);
  const cutLength = chatCut ? chatCut.to - chatCut.from : 0;
  const cutSeconds = rawVideoSeconds - cutLength;
  // Último recurso si la toma igual supera el límite: acelerar un poco todo el video.
  const speedFactor = Math.min(1, MAX_SECONDS / cutSeconds);
  const finalSeconds = cutSeconds * speedFactor;
  const mapTime = (t) => {
    const afterCut = chatCut && t >= chatCut.to ? t - cutLength : t;
    return afterCut * speedFactor;
  };

  console.log(
    `Video: ${rawVideoSeconds.toFixed(1)}s grabados, ${cutLength.toFixed(1)}s de espera del chat recortados, ` +
      `factor ${speedFactor.toFixed(3)} → ${finalSeconds.toFixed(1)}s finales`,
  );

  const timeline = buildVoiceTimeline(ffmpeg, scenesConfig.scenes, projectName, markers, mapTime);
  logVoiceTimeline(timeline);
  const lastVoiceEnd = timeline.at(-1).start + timeline.at(-1).dur;
  if (lastVoiceEnd > finalSeconds) {
    console.warn(`Aviso: la voz termina en ${lastVoiceEnd.toFixed(1)}s, después del video (${finalSeconds.toFixed(1)}s).`);
  }

  const filterParts = [];
  if (chatCut) {
    filterParts.push(
      `[0:v]trim=end=${chatCut.from.toFixed(3)},setpts=PTS-STARTPTS[v0]`,
      `[0:v]trim=start=${chatCut.to.toFixed(3)},setpts=PTS-STARTPTS[v1]`,
      `[v0][v1]concat=n=2:v=1:a=0,setpts=PTS*${speedFactor.toFixed(5)},fps=60[vout]`,
    );
  } else {
    filterParts.push(`[0:v]setpts=PTS*${speedFactor.toFixed(5)},fps=60[vout]`);
  }

  timeline.forEach((item, i) => {
    if (!fs.existsSync(item.mp3)) {
      console.error(`Falta audio: ${item.mp3}. Quitá --skip-voice o regenerá la escena.`);
      process.exit(1);
    }
    const delayMs = Math.round(item.start * 1000);
    filterParts.push(`[${i + 1}:a]aresample=48000,adelay=${delayMs}:all=1[a${i + 1}]`);
  });

  // amix por defecto divide el volumen entre las entradas activas: con 14 frases la voz
  // quedaba bajísima y subía al final cuando quedaban pocas. normalize=0 + loudnorm lo
  // deja parejo a -14 LUFS, el nivel que esperan LinkedIn y el resto de redes.
  const mixLabels = timeline.map((_, i) => `[a${i + 1}]`).join('');
  filterParts.push(
    `${mixLabels}amix=inputs=${timeline.length}:duration=longest:dropout_transition=0:normalize=0,` +
      `loudnorm=I=-14:TP=-1.5:LRA=11,aformat=sample_rates=48000:channel_layouts=stereo,apad[aout]`,
  );

  const ffArgs = ['-y', '-i', VIDEO_IN];
  for (const item of timeline) {
    ffArgs.push('-i', item.mp3);
  }
  ffArgs.push(
    '-filter_complex',
    filterParts.join(';'),
    '-map',
    '[vout]',
    '-map',
    '[aout]',
    '-c:v',
    'libx264',
    '-preset',
    'medium',
    '-crf',
    '22',
    '-profile:v',
    'main',
    '-pix_fmt',
    'yuv420p',
    '-c:a',
    'aac',
    '-b:a',
    '192k',
    '-ar',
    '48000',
    '-movflags',
    '+faststart',
    '-t',
    finalSeconds.toFixed(3),
    OUT_LINKEDIN,
  );

  console.log('Exportando MP4 optimizado para LinkedIn...');
  try {
    execFileSync(ffmpeg, ffArgs, { stdio: 'inherit' });
  } catch (err) {
    console.error('\nffmpeg falló. Instalá ffmpeg en PATH o ejecutá: pnpm add -D ffmpeg-static');
    throw err;
  }

  const stats = fs.statSync(OUT_LINKEDIN);
  console.log(`\nListo: ${OUT_LINKEDIN} (${(stats.size / 1024 / 1024).toFixed(2)} MB)`);
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
