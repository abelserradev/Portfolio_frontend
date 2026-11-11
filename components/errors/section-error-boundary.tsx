'use client';

import { Component, type ErrorInfo, type ReactNode } from 'react';

type FallbackRender = (reiniciar: () => void) => ReactNode;

interface SectionErrorBoundaryProps {
  readonly children: ReactNode;
  /** Etiqueta para logs y mensaje al usuario */
  readonly section?: string;
  readonly compact?: boolean;
  readonly fallback?: ReactNode | FallbackRender;
  readonly onError?: (error: Error, info: ErrorInfo) => void;
}

interface SectionErrorBoundaryState {
  hasError: boolean;
}

export class SectionErrorBoundary extends Component<
  SectionErrorBoundaryProps,
  SectionErrorBoundaryState
> {
  state: SectionErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): SectionErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    this.props.onError?.(error, info);
    if (process.env.NODE_ENV === 'development') {
      console.error(`[SectionErrorBoundary:${this.props.section ?? 'unknown'}]`, error, info);
    }
  }

  reiniciar = (): void => {
    this.setState({ hasError: false });
  };

  renderFallback(): ReactNode {
    const { fallback, compact, section } = this.props;
    if (typeof fallback === 'function') {
      return fallback(this.reiniciar);
    }
    if (fallback) {
      return fallback;
    }
    const titulo = section ? `Error en ${section}` : 'Algo salió mal';
    if (compact) {
      return (
        <div
          role="alert"
          className="rounded-xl border border-red-500/40 bg-red-950/40 px-3 py-2 text-sm text-red-200"
        >
          <p className="font-medium">{titulo}</p>
          <button
            type="button"
            onClick={this.reiniciar}
            className="mt-2 text-xs text-foundry-brass underline hover:text-foundry-type-bright"
          >
            Reintentar
          </button>
        </div>
      );
    }
    return (
      <div
        role="alert"
        className="foundry-plate mx-auto max-w-lg px-6 py-8 text-center"
      >
        <p className="font-display text-base text-foundry-type-bright">Sección no disponible</p>
        <p className="mt-2 text-base text-foundry-type">{titulo}</p>
        <p className="mt-2 text-xs text-foundry-type-dim">
          El resto del sitio sigue funcionando. Puedes recargar esta parte.
        </p>
        <button
          type="button"
          onClick={this.reiniciar}
          className="foundry-cta mt-5"
        >
          Reintentar
        </button>
      </div>
    );
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return this.renderFallback();
    }
    return this.props.children;
  }
}
