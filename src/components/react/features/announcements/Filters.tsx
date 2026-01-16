import type { Category } from "@/types/announcement.types";

/**
 * Opciones de categorías disponibles para filtrar.
 * @internal
 */
const OPTIONS: Array<{ label: string; value: Category }> = [
  { label: "Todos", value: "all" },
  { label: "General", value: "general" },
  { label: "Convocatorias", value: "convocatorias" },
  { label: "Comunicados", value: "comunicados" },
  { label: "Anuncios", value: "anuncio" }
];

/**
 * Componente de filtros por categoría para anuncios.
 * 
 * @component
 * @param {Object} props - Las propiedades del componente
 * @param {Category} props.value - La categoría actualmente seleccionada
 * @param {(value: Category) => void} props.onChange - Función callback al cambiar la categoría
 * @returns {JSX.Element} Grupo de botones de filtro por categoría
 */
export function Filters({ value, onChange }: { value: Category; onChange: (value: Category) => void }) {
  return (
    <div className="flex flex-wrap items-end gap-2">
      <span className="w-full text-xs font-medium text-slate-700 sm:w-auto">Categoría</span>

      {OPTIONS.map((opt) => {
        const active = opt.value === value;

        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={[
              "rounded-full px-3 py-2 text-xs font-semibold transition",
              active
                ? "bg-blue-600 text-white"
                : "bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50",
            ].join(" ")}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
