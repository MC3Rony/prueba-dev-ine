import { useEffect, type ReactNode } from "react";

/**
 * Props del componente Modal.
 *
 * @property isOpen - Indica si el modal está abierto.
 * @property onClose - Función que se llama cuando se cierra el modal.
 * @property title - Título del modal.
 * @property children - Contenido del modal.
 */

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

/**
 * Componente Modal reutilizable.
 *
 * Caracteristicas:
 * - Cierre con la tecla Escape.
 * - Cierre al hacer clic fuera del contenido del modal.
 * - Prevencion del scroll del fondo cuando el modal está abierto.
 * - Animaciones suaves con Tailwind CSS.
 * - Accesibilidad mejorada con ARIA.
 *
 * @ejemplo
 * <Modal isOpen={isOpen} onClose={handleClose} title="Mi Modal">
 *   <p>Contenido del modal</p>
 * </Modal>
 */

export const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden"; // Previene el scroll del fondo
    } 
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = 'unset'; // Restaura el scroll del fondo
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Contenedor del modal */}
      {/* Evita que el clic se propague al contenedor padre */}
      <div
        className="bg-white rounded-lg shadow-2xl max-w-2xl max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header del modal */}
        <div className="flex items-center justify-between p-6 border-b boder-gray-200">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
            aria-label="Cerrar modal"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>
        {/* Contenido del modal */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {children}
        </div>
      </div>
    </div>
  );
};
