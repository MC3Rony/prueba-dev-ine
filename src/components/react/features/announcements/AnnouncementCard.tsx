import type { Announcement } from "@/types/announcement.types";
import Button from "@/components/react/ui/Button";
import Badge from "@/components/react/ui/Badge";
import { useState } from "react";
import { Modal } from "../../ui/Modal";
import { AchievementsList } from "./AchievementsList";

/**
 * Función auxiliar que determina la configuración visual para cada categoría de anuncio.
 *
 * @param {Announcement["category"]} category - La categoría del anuncio
 * @returns {Object} Objeto con la etiqueta y variante de badge correspondiente
 * @returns {string} return.label - La etiqueta de texto para mostrar
 * @returns {"info" | "success" | "warning"} return.variant - La variante de estilo del badge
 *
 * @remarks
 * - "general" → "General" con variante "info" (azul)
 * - "convocatorias" → "Convocatoria" con variante "success" (verde)
 * - "comunicados" → "Comunicado" con variante "warning" (ámbar)
 * - Por defecto → "Anuncio" con variante "info"
 */
function categoryConfig(category: Announcement["category"]) {
  switch (category) {
    case "general":
      return { label: "General", variant: "info" as const };
    case "convocatorias":
      return { label: "Convocatoria", variant: "success" as const };
    case "comunicados":
      return { label: "Comunicado", variant: "warning" as const };
    default:
      return { label: "Anuncio", variant: "danger" as const };
  }
}

/**
 * Tarjeta individual para mostrar un anuncio con su información completa.
 *
 * @component
 * @description Componente que renderiza una tarjeta visualmente atractiva con la información
 * de un anuncio, incluyendo categoría, título, resumen, fecha, etiquetas y botones de acción.
 * Utiliza los componentes Badge y Button para mantener consistencia visual.
 *
 * @param {Object} props - Las propiedades del componente
 * @param {Announcement} props.item - El objeto de anuncio que contiene toda la información a mostrar
 * @param {string} props.item.category - Categoría del anuncio (general, convocatorias, o comunicados)
 * @param {string} props.item.title - Título del anuncio
 * @param {string} props.item.summary - Resumen o descripción breve del anuncio
 * @param {string} props.item.dateLabel - Etiqueta de fecha del anuncio
 * @param {string[]} props.item.tags - Array de etiquetas asociadas al anuncio
 *
 * @returns {JSX.Element} Un artículo estilizado con la información del anuncio y botones de acción
 *
 * @remarks
 * - La categoría se traduce a una etiqueta legible en español con colores diferenciados
 * - Incluye dos botones de acción: "Ver detalle" (secundario) y "Acción" (primario)
 * - Las etiquetas se muestran como badges con variante "info"
 * - Utiliza componentes reutilizables Badge y Button del sistema de diseño
 */
export default function AnnouncementCard({ item }: { item: Announcement }) {
  const category = categoryConfig(item.category);

   /** Estado del modal */
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* CARD */}
      <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <Badge variant={category.variant}>{category.label}</Badge>

            <h3 className="text-base font-semibold text-slate-900">
              {item.title}
            </h3>

            <p className="text-sm text-slate-600 line-clamp-3">
              {item.summary}
            </p>
          </div>

          <span className="text-xs text-slate-500">{item.dateLabel}</span>
        </div>

        {/* TAGS */}
        {item.tags?.length > 0 && (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {item.tags.map((t) => (
              <Badge key={t} variant="info">
                {t}
              </Badge>
            ))}
          </div>
        )}

        {/* ACTIONS */}
        <div className="mt-4 flex items-center justify-end gap-2">
          <Button variant="secondary" onClick={() => setIsOpen(true)}>
            Ver detalle
          </Button>
          <Button variant="primary" onClick={() => setIsOpen(true)}>Acción</Button>
        </div>
      </article>

      {/* MODAL */}
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={item.title}
      >
        <div className="space-y-6">
          {/* Info básica */}
          <div>
            <div className="mb-3 flex items-center gap-2">
              <Badge variant={category.variant}>{category.label}</Badge>
              <span className="text-sm text-slate-500">
                {item.dateLabel}
              </span>
            </div>

            <p className="text-slate-700 leading-relaxed">
              {item.summary}
            </p>

            {item.tags?.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {item.tags.map((t) => (
                  <Badge key={t} variant="info">
                    {t}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <hr className="border-slate-200" />

          {/* Achievements */}
          <AchievementsList achievements={item.achievements ?? []} />
        </div>
      </Modal>
    </>
  );
}
