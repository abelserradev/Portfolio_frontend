/** Estados del catálogo expuestos por GET /projects/ */
export type PortfolioProjectStatus =
  | 'live'
  | 'mvp_active'
  | 'in_development'
  | 'coming_soon';

/** Respuesta del listado público GET /projects/ (misiones del portfolio). */
export interface PortfolioProject {
  readonly id: number;
  readonly title: string;
  readonly description: string;
  readonly tech_stack: string | null;
  readonly live_url?: string | null;
  readonly repo_url?: string | null;
  readonly image_url?: string | null;
  /** Presente tras actualizar el backend; el front normaliza si falta */
  readonly status?: PortfolioProjectStatus | null;
  readonly is_featured?: boolean;
  readonly sort_order?: number;
  readonly created_at: string;
  readonly updated_at?: string | null;
  readonly visits: number;
}
