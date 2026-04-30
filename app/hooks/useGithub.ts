"use client";

import { useState, useEffect } from 'react';

export interface LanguageStat {
  readonly name: string;
  readonly percentage: number;
  readonly color: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://apiportfolio.buildforge.work/';

export function useGithub() {
  const [languages, setLanguages] = useState<LanguageStat[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await fetch(`${API_URL}/github/languages`);
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
