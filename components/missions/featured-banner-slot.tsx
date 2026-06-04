'use client';

import { useProjects } from '@/app/hooks/useProjects';
import FeaturedProductBanner from './featured-product-banner';

export default function FeaturedBannerSlot() {
  const { projects, isLoading, error } = useProjects();

  if (isLoading || error) {
    return null;
  }

  const destacado = projects.find((p) => p.is_featured);
  if (!destacado) {
    return null;
  }

  return (
    <FeaturedProductBanner
      projectId={destacado.id}
      demoUrl={destacado.live_url}
    />
  );
}
