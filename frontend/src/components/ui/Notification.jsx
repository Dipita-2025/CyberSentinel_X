import { useEffect } from "react";
import { CheckCircle, AlertCircle, X } from "lucide-react";

const NOTIFICATION_STYLES = {
  success: {
    icon: CheckCircle,
    color: "text-allow",
    background: "var(--allow-bg)",
    border: "var(--allow)",
  },
  error: {
    icon: AlertCircle,
    color: "text-blocked",
    background: "var(--blocked-bg)",
    border: "var(--blocked)",
  },
};

const Notification = ({ type = "error", message, onClose }) => {
  if (!message) return null;

  const config = NOTIFICATION_STYLES[type] || NOTIFICATION_STYLES.error;
  const Icon = config.icon;

  return (
    <div
      role={type === "error" ? "alert" : "status"}
      aria-live={type === "error" ? "assertive" : "polite"}
      className="flex items-start gap-3 rounded-lg border px-3 py-3"
      style={{
        backgroundColor: config.background,
        borderColor: config.border,
      }}
    >
      <Icon size={18} className={`mt-0.5 shrink-0 ${config.color}`} />

      <p className={`min-w-0 flex-1 text-body ${config.color}`}>{message}</p>

      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Dismiss notification"
          className="shrink-0 text-muted transition-colors hover:text-primary-text"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
};

export default Notification;
