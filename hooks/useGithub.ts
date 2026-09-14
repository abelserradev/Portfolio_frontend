"use client";

import { useState, useEffect } from 'react';
import {
  obtenerActividadGithub,
  obtenerLenguajesGithub,
  type ActivityScanResponse,
  type LanguageStat,
} from '@/lib/github-api';

export type { LanguageStat, ActivityScanResponse, ActivityCell } from '@/lib/github-api';

const MONTHS = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN'];
const DAYS_PER_MONTH = 30;

function crearActivityFallback(): ActivityScanResponse {
  const cells = MONTHS.flatMap((month, monthIndex) =>
    Array.from({ length: DAYS_PER_MONTH }, (_, dayIndex) => {
      const idx = monthIndex * DAYS_PER_MONTH + dayIndex;
      return {
        month,
        day: dayIndex + 1,
        level: (idx * 7 + Math.floor(idx / DAYS_PER_MONTH) * 3) % 4,
      };
    }),
  );
  return { months: MONTHS, days_per_month: DAYS_PER_MONTH, cells };
}

export function useGithub() {
  const [languages, setLanguages] = useState<LanguageStat[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    obtenerLenguajesGithub()
      .then(setLanguages)
      .catch((err: unknown) => {
        const mensajeError = err instanceof Error ? err.message : 'Error desconocido';
        setError(mensajeError);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return { languages, isLoading, error };
}

export function useGithubActivity() {
  const [activity, setActivity] = useState<ActivityScanResponse>(() => crearActivityFallback());
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    obtenerActividadGithub()
      .then(setActivity)
      .catch((err: unknown) => {
        const mensajeError = err instanceof Error ? err.message : 'Error desconocido';
        setError(mensajeError);
      });
  }, []);

  return { activity, error };
}
