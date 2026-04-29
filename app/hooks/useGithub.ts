"use client";

import { useState, useEffect } from 'react';

export interface LanguageStat {
  name: string;
  percentage: number;
  color: string;
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
        const data = await response.json();
        setLanguages(data);
      } catch (err: any) {
        setError(err.message || 'Error desconocido');
      } finally {
        setIsLoading(false);
      }
    }

    fetchStats();
  }, []);

  return { languages, isLoading, error };
}
