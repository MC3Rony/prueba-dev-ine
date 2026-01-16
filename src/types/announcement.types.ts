/**
 * Categorías disponibles para los anuncios.
 */
export type Category = "all" | "general" | "convocatorias" | "comunicados" | "anuncio";

/**
 * Interfaz que presenta un logro o achievement instucional.
 */
export interface Achievement {
  name: string;
  difficulty: 'Baja' | 'Media' | 'Alta';
  potential: 'Bajo' | 'Medio' | 'Alto';
}


/**
 * Modelo de anuncio.
 */
export interface Announcement {
  id: string;
  title: string;
  summary: string;
  category: Exclude<Category, "all">;
  tags: string[];
  dateLabel: string;
  achievements?: Achievement[];
}
