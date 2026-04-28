"use client";

import { useState, useEffect } from 'react';
import { obtenerBaseApiPortfolio } from '@/lib/api-config';
import type { PortfolioProject } from '@/lib/types/portfolio-project';

export function useProjects() {
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const baseApi = obtenerBaseApiPortfolio();
    fetch(`${baseApi}/projects/`)
      .then(res => {
        if (!res.ok) throw new Error('Error al cargar');
        return res.json();
      })
      .then((data: PortfolioProject[]) => {
        setProjects(data);
        setIsLoading(false);
      })
      .catch((err: unknown) => {
        setError(err instanceof Error ? err : new Error(String(err)));
        setIsLoading(false);
      });
  }, []);

  return { projects, isLoading, error };
}