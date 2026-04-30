"use client";

import { useState, useEffect } from 'react';
import { obtenerBaseApiPortfolio } from '@/lib/api-config';

export interface LanguageStat {
  readonly name: string;
  readonly percentage: number;
  readonly color: string;
}

export interface ActivityCell {
  readonly month: string;
  readonly day: number;
  readonly level: number;
}

export interface ActivityScanResponse {
  readonly months: string[];
  readonly days_per_month: number;
  readonly cells: ActivityCell[];
}

const MONTHS = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN'];
const DAYS_PER_MONTH = 30;

function crearActivityFallback(): ActivityScanResponse {
  const cells: ActivityCell[] = MONTHS.flatMap((month, monthIndex) => (
    Array.from({ length: DAYS_PER_MONTH }, (_, dayIndex) => {
      const idx = monthIndex * DAYS_PER_MONTH + dayIndex;
      return {
        month,
        day: dayIndex + 1,
        level: (idx * 7 + Math.floor(idx / DAYS_PER_MONTH) * 3) % 4,
      };
    })
  ));
  return { months: MONTHS, days_per_month: DAYS_PER_MONTH, cells };
}

export function useGithub() {
  const [languages, setLanguages] = useState<LanguageStat[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await fetch(`${obtenerBaseApiPortfolio()}/github/languages`);
        if (!response.ok) {
          throw new Error('Failed to fetch github stats');
        }
        const data = await response.json() as LanguageStat[];
        setLanguages(data);
      } catch (err: unknown) {
        const mensajeError = err instanceof Error ? err.message : 'Error desconocido';
        setError(mensajeError);
      } finally {
        setIsLoading(false);
      }
    }

    fetchStats();
  }, []);

  return { languages, isLoading, error };
}

export function useGithubActivity() {
  const [activity, setActivity] = useState<ActivityScanResponse>(() => crearActivityFallback());
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchActivity() {
      try {
        const response = await fetch(`${obtenerBaseApiPortfolio()}/github/activity`);
        if (!response.ok) {
          throw new Error('Failed to fetch github activity');
        }
        const data = await response.json() as ActivityScanResponse;
        setActivity(data);
      } catch (err: unknown) {
        const mensajeError = err instanceof Error ? err.message : 'Error desconocido';
        setError(mensajeError);
      }
    }
    fetchActivity();
  }, []);

  return { activity, error };
}
