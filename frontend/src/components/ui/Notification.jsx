import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearNotification } from "../../Store/Slice/notificationSlice";
import { CheckCircle, AlertCircle, X } from "lucide-react";

const NOTIFICATION_STYLES = {
  success: {
    icon: CheckCircle,
    color: "var(--allow)",
    background: "var(--card)",
    border: "var(--border)",
    iconBackground: "var(--allow-bg)",
  },
  error: {
    icon: AlertCircle,
    color: "#ffffff",
    background: "rgba(220, 38, 38, 0.88)",
    border: "rgba(239, 68, 68, 0.65)",
    iconBackground: "rgba(185, 28, 28, 0.75)",
  },
};

const Notification = () => {
  const dispatch = useDispatch();
  const { message, type } = useSelector((state) => state.notification);

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!message) {
      setVisible(false);
      return;
    }

    // Trigger slide-down animation
    const animationFrame = requestAnimationFrame(() => {
      setVisible(true);
    });

    const timer = setTimeout(() => {
      setVisible(false);
    }, 3700);

    return () => {
      cancelAnimationFrame(animationFrame);
      clearTimeout(timer);
    };
  }, [message]);

  // Clear Redux state after exit animation
  useEffect(() => {
    if (!message || visible) return;

    const timer = setTimeout(() => {
      dispatch(clearNotification());
    }, 350);

    return () => clearTimeout(timer);
  }, [visible, message, dispatch]);

  if (!message) return null;

  const config = NOTIFICATION_STYLES[type] || NOTIFICATION_STYLES.error;
  const Icon = config.icon;

  return createPortal(
    <div className="pointer-events-none fixed inset-x-0 top-4 z-[9999] flex justify-center px-4">
      <div
        role={type === "error" ? "alert" : "status"}
        aria-live={type === "error" ? "assertive" : "polite"}
        className={`pointer-events-auto flex w-full max-w-sm items-center gap-2.5 rounded-xl border px-3 py-2 shadow-lg backdrop-blur-xl transition-all duration-350 ease-out ${
          visible ? "translate-y-0 opacity-100" : "-translate-y-6 opacity-0"
        }`}
        style={{
          backgroundColor: config.background,
          borderColor: config.border,
          boxShadow: "var(--shadow-lg)",
        }}
      >
        <div
          className="flex size-7 shrink-0 items-center justify-center rounded-lg"
          style={{ backgroundColor: config.iconBackground }}
        >
          <Icon size={15} strokeWidth={2.5} style={{ color: config.color }} />
        </div>

        <p className="min-w-0 flex-1 text-xs font-medium leading-5 text-primary-text">
          {message}
        </p>

        <button
          type="button"
          onClick={() => setVisible(false)}
          aria-label="Dismiss notification"
          className="flex size-7 shrink-0 items-center justify-center rounded-lg transition-colors hover:bg-elevated"
        >
          <X size={15} style={{ color: config.color }} />
        </button>
      </div>
    </div>,
    document.body,
  );
};

export default Notification;
