import type { Achievement } from "@/types/announcement.types";

/**
 * Props del componente AchievementsList.
 */
interface AchievementsListProps {
  achievements: Achievement[];
}

/**
 * Funcion helper que retorna las clases de tailwind segun la dificultad del logro.
 * Esta funcion centraliza la logica de colores para mantener consistencia y facilitar futuros cambios.
 * @param difficulty - La dificultad del logro.
 * @returns Clases de tailwind correspondientes a la dificultad.
 */

const getDifficultyColor = (difficulty: Achievement["difficulty"]) => {
  const colors = {
    Baja: "bg-green-100 text-green-800",
    Media: "bg-yellow-100 text-yellow-800",
    Alta: "bg-red-100 text-red-800",
  };
  return colors[difficulty];
};

/**
 * Funcion helper que retorna las clases de tailwind segun el potencial del logro.
 * Similar a getDifficultyColor, pero para el nivel de potencial.
 *
 * @param potential - El potencial del logro.
 * @returns Clases de tailwind correspondientes al potencial.
 **/

const getPotentialColor = (potential: Achievement["potential"]) => {
  const colors = {
    Bajo: "bg-blue-100 text-blue-800",
    Medio: "bg-purple-100 text-purple-800",
    Alto: "bg-pink-100 text-pink-800",
  };
  return colors[potential];
};

/**
 * Componente que muestra la lista de achievements/logros
 *
 * Características:
 * - Manejo de lista vacia con mensaje apropiado.
 * - Diseño responsivo con grid.
 * - Badges con colores semanticos.
 * - Hover effects para mejor UX.
 *
 * @param achievements - Array de achievements a mostrar.
 */

export const AchievementsList = ({ achievements }: AchievementsListProps) => {
  if (!achievements || achievements.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No hay logros disponibles en este momento.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Titulo de la seccion */}
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Logros Institucionales
      </h3>
      <div className="grid gap-4">
        {/* Grid responsivo para los logros */}
        {/* El indice se usa como key porque no tenemos un ID unico */}
        {achievements.map((achievement, index) => (
          <div
            key={index}
            className="p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            {/* Nombre del achievement */}
            <h4 className="text-md font-medium text-gray-800 mb-2">
              {achievement.name}
            </h4>
            {/* Contenedor de badges */}
            <div className="flex flex-wrap gap-2">
              {/* Badge de dificultad */}
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium border ${getDifficultyColor(
                  achievement.difficulty
                )}`}
              >
                Dificultad: {achievement.difficulty}
              </span>
              {/* Badge de potencial */}
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium border ${getPotentialColor(
                  achievement.potential
                )}`}
              >
                Potencial: {achievement.potential}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
