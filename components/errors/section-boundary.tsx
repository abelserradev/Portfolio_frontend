'use client';

import { type ReactNode } from 'react';
import { SectionErrorBoundary } from '@/components/errors/section-error-boundary';

/** Wrapper declarativo para aislar secciones en páneas server (Home, layout). */
export function SectionBoundary({
  children,
  section,
  compact = false,
}: {
  readonly children: ReactNode;
  readonly section: string;
  readonly compact?: boolean;
}) {
  return (
    <SectionErrorBoundary section={section} compact={compact}>
      {children}
    </SectionErrorBoundary>
  );
}
