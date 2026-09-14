"use client";

import { useState, useEffect } from 'react';
import { listarProyectos } from '@/lib/projects-api';
import type { PortfolioProject } from '@/lib/types/portfolio-project';

export function useProjects() {
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    listarProyectos()
      .then((data) => {
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
