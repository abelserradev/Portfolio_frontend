async page => {
  const OUTPUT = 'public/media/portfolio-launch-cyber-reel.webm';
  const BASE = 'https://portfolio.buildforge.work';

  const BF_EASE = 'cubic-bezier(0.45, 0, 0.15, 1)';
  const STYLE_MOTION = `
    @keyframes bfFadeIn { from { opacity: 0; } to { opacity: 1; } }
    @keyframes bfFadeOut { from { opacity: 1; } to { opacity: 0; } }
    @keyframes bfBackdrop {
      0% { opacity: 0; }
      11% { opacity: 1; }
      87% { opacity: 1; }
      100% { opacity: 0; }
    }
    @keyframes bfCard {
      0% { opacity: 0; transform: translateY(32px) scale(0.965); filter: blur(10px); }
      13% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
      84% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
      100% { opacity: 0; transform: translateY(-14px) scale(0.985); filter: blur(8px); }
    }
    @keyframes bfLineIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: none; }
    }
  `;

  /** showOverlay solo interpreta HTML; el CSS debe ir dentro de <style>, no como texto suelto. */
  const htmlOverlay = (markup) => `<style>${STYLE_MOTION.trim()}</style>${markup}`;

  const esperar = async (ms) => {
    await new Promise((r) => setTimeout(r, ms));
  };

  /** Velo negro que se disuelve y deja ver la página (crossfade out). */
  const veloReveal = async (duracion = 1100) => {
    await page.screencast.showOverlay(
      htmlOverlay(`<div style="position:fixed;inset:0;z-index:2147483645;background:#010408;
        animation:bfFadeOut ${duracion}ms ${BF_EASE} forwards;opacity:1;"></div>`),
      { duration: duracion + 80 },
    );
    await esperar(280);
  };

  const placaFullscreen = async ({ chip, titulo, cuerpo, lineas = [], duracion = 5600 }) => {
    const lista = lineas
      .map(
        (l, i) =>
          `<p style="margin:18px 0 0;font-family:Consolas,monospace;font-size:52px;line-height:1.28;color:#cbd5e1;
            opacity:0;animation:bfLineIn .85s ${BF_EASE} ${0.55 + i * 0.35}s forwards;">${l}</p>`,
      )
      .join('');
    await page.screencast.showOverlay(
      htmlOverlay(`<div style="position:fixed;inset:0;z-index:2147483646;display:flex;align-items:center;justify-content:center;
        background:radial-gradient(ellipse 80% 70% at 50% 45%, rgba(6,182,212,0.07), rgba(1,4,12,0.99));
        animation:bfBackdrop ${duracion}ms ${BF_EASE} forwards;opacity:0;">
        <div style="width:min(1680px,94vw);padding:56px 64px;border:1px solid rgba(34,211,238,0.45);
          background:linear-gradient(145deg,#070b14,#0f172a);border-radius:12px;
          box-shadow:0 0 80px rgba(236,72,153,0.12),0 28px 90px rgba(0,0,0,0.5);
          animation:bfCard ${duracion}ms ${BF_EASE} forwards;opacity:0;">
          ${chip ? `<span style="display:inline-block;padding:12px 26px;border-radius:999px;background:rgba(238,131,41,0.2);border:1px solid rgba(238,131,41,0.5);font-family:Consolas,monospace;font-size:32px;letter-spacing:0.12em;color:#fdba74;">${chip}</span>` : ''}
          <h2 style="margin:${chip ? '28px' : '0'} 0 0;font-family:Orbitron,Consolas,monospace;font-size:92px;line-height:1.12;font-weight:800;color:#f8fafc;letter-spacing:0.02em;text-shadow:0 0 40px rgba(34,211,238,0.35);">${titulo}</h2>
          ${cuerpo ? `<p style="margin:22px 0 0;font-family:Consolas,monospace;font-size:64px;line-height:1.28;color:#e2e8f0;">${cuerpo}</p>` : ''}
          ${lista}
          <div style="margin-top:28px;height:3px;width:120px;background:linear-gradient(90deg,#22d3ee,#ec4899,#eab308);opacity:0.75;"></div>
        </div>
      </div>`),
      { duration: duracion + 120 },
    );
    await esperar(420);
  };

  const overlayTerminal = async (lineas, duracion = 5200) => {
    const html = lineas
      .map(
        (l, i) =>
          `<div style="opacity:0;animation:bfLineIn .9s ${BF_EASE} ${0.35 + i * 0.55}s forwards;color:${i === 0 ? '#22d3ee' : '#a5f3fc'};font-size:58px;line-height:1.35;margin-bottom:22px;font-family:Consolas,monospace;">${l}</div>`,
      )
      .join('');
    await page.screencast.showOverlay(
      htmlOverlay(`<div style="position:fixed;inset:0;display:flex;align-items:center;justify-content:center;
        background:#010408;animation:bfBackdrop ${duracion}ms ${BF_EASE} forwards;opacity:0;">
        <div style="width:min(1680px,94vw);padding:52px 60px;border:1px solid rgba(6,182,212,0.35);background:#050810;border-radius:12px;
          animation:bfCard ${duracion}ms ${BF_EASE} forwards;opacity:0;filter:none;transform:none;">
          ${html}
        </div>
      </div>`),
      { duration: duracion + 120 },
    );
    await esperar(380);
  };

  const scrollSuaveAlElemento = async (locator, duracionMs = 2600) => {
    const box = await locator.boundingBox().catch(() => null);
    if (!box) {
      await locator.scrollIntoViewIfNeeded();
      await esperar(duracionMs);
      return;
    }
    const objetivo = Math.max(0, box.y + (await page.evaluate(() => window.scrollY)) - 140);
    await page.evaluate(
      async ({ y, ms }) => {
        const inicio = window.scrollY;
        const delta = y - inicio;
        const t0 = performance.now();
        const ease = (p) => (p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2);
        await new Promise((resolve) => {
          const step = (t) => {
            const p = Math.min(1, (t - t0) / ms);
            window.scrollTo(0, inicio + delta * ease(p));
            if (p < 1) requestAnimationFrame(step);
            else resolve();
          };
          requestAnimationFrame(step);
        });
      },
      { y: objetivo, ms: duracionMs },
    );
    await esperar(500);
  };

  const scrollSuavePx = async (deltaY, duracionMs = 2000) => {
    await page.evaluate(
      async ({ dy, ms }) => {
        const inicio = window.scrollY;
        const t0 = performance.now();
        const ease = (p) => (p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2);
        await new Promise((resolve) => {
          const step = (t) => {
            const p = Math.min(1, (t - t0) / ms);
            window.scrollTo(0, inicio + dy * ease(p));
            if (p < 1) requestAnimationFrame(step);
            else resolve();
          };
          requestAnimationFrame(step);
        });
      },
      { dy: deltaY, ms: duracionMs },
    );
    await esperar(450);
  };

  const captionSuave = async (texto, duracion = 4200) => {
    await page.screencast.showOverlay(
      htmlOverlay(`<div style="position:fixed;left:0;right:0;bottom:48px;display:flex;justify-content:center;pointer-events:none;
        animation:bfBackdrop ${duracion}ms ${BF_EASE} forwards;opacity:0;">
        <p style="max-width:min(920px,88vw);margin:0;padding:14px 22px;border-radius:10px;
          background:rgba(1,4,12,0.88);border:1px solid rgba(34,211,238,0.35);backdrop-filter:blur(12px);
          font-family:Consolas,monospace;font-size:15px;line-height:1.45;color:#e2e8f0;text-align:center;
          animation:bfCard ${duracion}ms ${BF_EASE} forwards;opacity:0;filter:none;transform:none;">${texto}</p>
      </div>`),
      { duration: duracion + 100 },
    );
  };

  const cerrarConsentimiento = async () => {
    const rechazar = page.getByRole('button', { name: 'RECHAZAR' });
    if (await rechazar.isVisible({ timeout: 2500 }).catch(() => false)) {
      await rechazar.click();
      await esperar(500);
    }
  };

  const esperarRespuestaChat = async (dialogo) => {
    const typing = dialogo.getByLabel('El asistente está escribiendo');
    await typing.waitFor({ state: 'visible', timeout: 20000 }).catch(() => undefined);
    await typing.waitFor({ state: 'hidden', timeout: 120000 });
    const burbujaAsistente = dialogo.locator('div.rounded-tl-md.border');
    await burbujaAsistente.last().waitFor({ state: 'visible', timeout: 15000 });
    const texto = await burbujaAsistente.last().innerText();
    if (!texto || texto.trim().length < 8) {
      throw new Error('Respuesta del asistente vacía o demasiado corta');
    }
    return texto;
  };

  const ACTION_STYLE = {
    cursor: 'pointer',
    duration: 1200,
    style: {
      point:
        'width: 14px; height: 14px; border-radius: 50%; background: rgba(34,211,238,0.75); box-shadow: 0 0 20px rgba(34,211,238,0.55); transition: opacity 0.4s ease',
      highlight:
        'outline: 2px solid rgba(250,204,21,0.65); background: rgba(6,182,212,0.08); transition: outline-color 0.35s ease',
      title: 'display: none',
    },
  };

  // Las marcas permiten que build-portfolio-linkedin-reel.mjs sincronice la voz con lo que
  // realmente se grabó, porque el tiempo de respuesta del chatbot cambia en cada toma.
  const marcas = {};
  let inicioGrabacion = 0;
  const marcar = (id) => {
    marcas[id] = Number(((Date.now() - inicioGrabacion) / 1000).toFixed(2));
  };

  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.addInitScript(() => {
    localStorage.setItem('buildforge_analytics_consent', 'rejected');
  });
  // El sitio se carga antes de grabar, tapado por una cortina dentro de la página: si el
  // goto ocurre en plena grabación quedan varios segundos de pantalla vacía en el reel.
  await page.goto(BASE, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => undefined);
  await cerrarConsentimiento();
  await page.evaluate(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    const cortina = document.createElement('div');
    cortina.id = 'bf-cortina';
    cortina.style.cssText = 'position:fixed;inset:0;z-index:2147483000;background:#010408;pointer-events:none;';
    document.body.appendChild(cortina);
  });
  await page.screencast.start({
    path: OUTPUT,
    size: { width: 1920, height: 1080 },
    fps: 60,
  });
  inicioGrabacion = Date.now();
  await page.screencast.showActions(ACTION_STYLE);

  marcar('boot');
  await overlayTerminal(
    [
      '$ boot buildforge-core',
      '> next · fastapi · docker',
      '> portfolio.buildforge.work',
    ],
    3800,
  );
  marcar('intro');
  await placaFullscreen({
    chip: 'ESCENA 01',
    titulo: '// ESTUDIO BUILDFORGE',
    cuerpo: 'Software a medida: Web, APIs, IA & MVPs.',
    duracion: 4400,
  });

  await page.evaluate(() => {
    const cortina = document.getElementById('bf-cortina');
    if (!cortina) return;
    cortina.style.transition = 'opacity 1100ms cubic-bezier(0.45, 0, 0.15, 1)';
    cortina.style.opacity = '0';
    setTimeout(() => cortina.remove(), 1300);
  });
  await esperar(300);
  marcar('hero');
  await esperar(5200);

  marcar('misiones');
  await placaFullscreen({
    chip: 'ESCENA 02',
    titulo: 'MISIONES REALES',
    cuerpo: 'De la idea a producción.',
    lineas: ['Proyectos con estado live, MVP activo o en desarrollo.', 'Demos que puedes probar desde el portfolio.'],
    duracion: 5000,
  });
  marcar('stack');
  await placaFullscreen({
    chip: 'STACK',
    titulo: 'Next.js + FastAPI + Docker',
    cuerpo: 'Stack robusto para web, API y despliegue en Coolify.',
    duracion: 4200,
  });

  await veloReveal(800);
  const misiones = page.locator('#misiones');
  await scrollSuaveAlElemento(misiones, 2000);
  marcar('grid');
  await esperar(1000);
  // La guía 3D solo monta su iframe tras pulsar el botón; se muestra un tramo para probar
  // que la demo funciona, no el recorrido completo.
  const iniciarRecorrido = page.getByRole('button', { name: /INICIAR_RECORRIDO/i });
  let demoActiva = false;
  try {
    await iniciarRecorrido.click({ timeout: 4000 });
    demoActiva = true;
  } catch {
    // FIXME: si cambia el texto del botón en el portfolio, el reel queda sin demo en vivo.
  }
  marcar('demo');
  if (demoActiva) {
    const iframeDemo = page.locator('iframe[src*="demos/"]').first();
    await iframeDemo.waitFor({ state: 'visible', timeout: 10000 }).catch(() => undefined);
    await scrollSuaveAlElemento(iframeDemo, 1300);
    await esperar(3800);
    await page
      .frameLocator('iframe[src*="demos/"]')
      .first()
      .locator('#btn-next')
      .click({ timeout: 2500 })
      .catch(() => undefined);
    await esperar(3400);
  } else {
    await esperar(5000);
  }
  await scrollSuavePx(280, 1400);
  marcar('producto');
  await placaFullscreen({
    chip: 'PRODUCTO DESTACADO',
    titulo: 'Spend$ave · Mobile Gastos',
    cuerpo: 'Control de presupuesto con BCV, OCR y perfiles comercio.',
    duracion: 4200,
  });

  marcar('cotizar');
  await placaFullscreen({
    chip: 'ESCENA 03',
    titulo: '¿Tienes un proyecto en mente?',
    cuerpo: 'Cotiza con IA y conecta al instante.',
    duracion: 4400,
  });
  await veloReveal(750);
  await page.screencast.hideActions();
  await cerrarConsentimiento();
  await esperar(300);
  const fab = page.getByRole('button', { name: /asistente de cotización/i });
  await fab.click({ force: true });
  const dialogo = page.getByRole('dialog', { name: /asistente buildforge/i });
  await dialogo.waitFor({ state: 'visible', timeout: 15000 });
  await esperar(900);

  marcar('chat_envio');
  const consulta =
    'Necesito cotizar un MVP web: landing, panel admin, API REST y despliegue Docker. ¿Qué alcance y tiempos estimas?';
  const textarea = dialogo.getByPlaceholder('Escribe tu mensaje…');
  await textarea.click();
  await textarea.pressSequentially(consulta, { delay: 20 });
  await esperar(600);
  await dialogo.getByRole('button', { name: 'Enviar mensaje' }).click();
  marcar('chat_espera_inicio');

  let respuestaBot = '';
  try {
    respuestaBot = await esperarRespuestaChat(dialogo);
    marcar('chat_respuesta');
    await esperar(4300);
  } catch {
    marcar('chat_respuesta');
    await captionSuave('El asistente no respondió a tiempo — reintenta la grabación con la API activa.', 3800);
  }

  const formCotizacion = dialogo.getByPlaceholder('tu@email.com');
  if (await formCotizacion.isVisible({ timeout: 1500 }).catch(() => false)) {
    await captionSuave('Borrador de cotización listo: completa contacto y envía la solicitud.', 4200);
  } else if (respuestaBot) {
    const extracto = respuestaBot.slice(0, 140).replace(/</g, '&lt;').replace(/>/g, '&gt;');
    await captionSuave(extracto + (respuestaBot.length > 140 ? '…' : ''), 4200);
  }

  await esperar(600);
  // Escape no siempre cierra el panel y el chat quedaba abierto encima de #contacto.
  await page
    .getByRole('button', { name: 'Cerrar chat' })
    .click({ timeout: 2000 })
    .catch(() => page.keyboard.press('Escape'));
  await esperar(700);
  await page.screencast.showActions(ACTION_STYLE);

  marcar('cierre');
  await placaFullscreen({
    chip: 'ESCENA 04',
    titulo: 'BUILDFORGE',
    cuerpo: 'Construimos el futuro de tu software.',
    lineas: ['Visítanos: portfolio.buildforge.work'],
    duracion: 4200,
  });
  await veloReveal(850);
  await scrollSuaveAlElemento(page.locator('#contacto'), 1800);
  marcar('contacto');
  await esperar(1800);
  marcar('cta');
  await page.screencast.showOverlay(
    htmlOverlay(`<div style="position:fixed;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;
      background:rgba(1,4,12,0.98);animation:bfBackdrop 5600ms ${BF_EASE} forwards;opacity:0;">
      <div style="animation:bfCard 5600ms ${BF_EASE} forwards;opacity:0;text-align:center;">
        <div style="font-family:Orbitron,Consolas,monospace;font-size:120px;font-weight:800;color:#f8fafc;letter-spacing:0.06em;text-shadow:0 0 48px rgba(236,72,153,0.35);">
          BUILDFORGE<span style="color:#22d3ee">.</span>
        </div>
        <p style="margin-top:28px;font-family:Consolas,monospace;font-size:52px;color:#cbd5e1;">portfolio.buildforge.work</p>
        <div style="margin:32px auto 0;width:min(560px,85vw);height:2px;background:repeating-linear-gradient(90deg,#22d3ee 0 10px,transparent 10px 20px);opacity:0.5;"></div>
      </div>
    </div>`),
    { duration: 5700 },
  );
  marcar('fin');
  await esperar(300);

  await page.screencast.hideActions();
  await page.screencast.stop();
  return JSON.stringify(marcas);
}

