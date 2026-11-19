import { useEffect } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

const Modal = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  size = "md",
  closeOnOverlay = true,
}) => {
  const sizes = {
    sm: "max-w-sm",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event) => {
      if (event.key === "Escape") onClose?.();
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onMouseDown={(event) => {
        if (closeOnOverlay && event.target === event.currentTarget) {
          onClose?.();
        }
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className={`w-full ${sizes[size] || sizes.md} max-h-[90vh] overflow-y-auto rounded-xl border border-border bg-card shadow-xl`}
      >
        <header className="flex items-start justify-between gap-4 border-b border-border p-5">
          <div>
            <h2
              id="modal-title"
              className="text-lg font-semibold text-primary-text"
            >
              {title}
            </h2>

            {description && (
              <p className="mt-1 text-sm text-text-muted">{description}</p>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="rounded-lg p-2 text-text-muted transition hover:bg-elevated hover:text-primary-text"
          >
            <X size={18} />
          </button>
        </header>

        <div className="p-5">{children}</div>
      </section>
    </div>,
    document.body,
  );
};

export default Modal;
