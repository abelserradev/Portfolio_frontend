/** Respuesta del listado público GET /projects/ (misiones del portfolio). */
export interface PortfolioProject {
  readonly id: number;
  readonly title: string;
  readonly description: string;
  readonly tech_stack: string | null;
  readonly live_url?: string | null;
  readonly repo_url?: string | null;
  readonly image_url?: string | null;
  readonly created_at: string;
  readonly updated_at?: string | null;
  readonly visits: number;
}
