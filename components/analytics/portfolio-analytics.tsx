'use client';

import { useEffect, useRef } from 'react';
import { registrarEventoAnalytics } from '@/lib/analytics-api';

const SECCIONES = ['inicio', 'servicios', 'skills', 'misiones', 'contacto'] as const;

export default function PortfolioAnalytics() {
  const vistasRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    registrarEventoAnalytics({ event: 'page.load', section: 'home' });

    const observadores: IntersectionObserver[] = [];

    for (const id of SECCIONES) {
      const nodo = document.getElementById(id);
      if (!nodo) continue;
      const obs = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting || entry.intersectionRatio < 0.35) continue;
            if (vistasRef.current.has(id)) continue;
            vistasRef.current.add(id);
            registrarEventoAnalytics({ event: 'section.view', section: id });
          }
        },
        { threshold: [0.35, 0.5] },
      );
      obs.observe(nodo);
      observadores.push(obs);
    }

    const onNavClick = (ev: MouseEvent) => {
      const destino = (ev.target as HTMLElement | null)?.closest('a[href^="#"]');
      if (!destino) return;
      const href = destino.getAttribute('href')?.slice(1);
      if (!href) return;
      registrarEventoAnalytics({ event: 'nav.click', section: href });
    };
    document.addEventListener('click', onNavClick);

    return () => {
      document.removeEventListener('click', onNavClick);
      for (const obs of observadores) obs.disconnect();
    };
  }, []);

  return null;
}
