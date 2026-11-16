import { CircleAlert, CircleCheck, Info } from "lucide-react";

const notificationTypes = {
  error: {
    Icon: CircleAlert,
    title: "Error",
    styles: " bg-(--blocked)/10 text-(--text)",
    iconStyles: "text-(--blocked)",
  },
  info: {
    Icon: Info,
    title: "Information",
    styles: " bg-(--accent)/10 text-(--text)",
    iconStyles: "text-(--accent)",
  },
  success: {
    Icon: CircleCheck,
    title: "Success",
    styles: " bg-(--allow)/10 text-(--text)",
    iconStyles: "text-(--allow)",
  },
};

function Notification({ type = "info", message, title, className = "" }) {
  const notification = notificationTypes[type];

  if (!notification) {
    throw new Error(`Unsupported notification type: ${type}`);
  }

  const { Icon, styles, iconStyles } = notification;

  return (
    <div
      role={type === "error" ? "alert" : "status"}
      className={`flex items-start gap-12 rounded-md p-12 ${styles} ${className}`}
    >
      <Icon
        aria-hidden="true"
        className={`mt-1 shrink-0 ${iconStyles}`}
        size={20}
      />
      <div className="min-w-0">
        <p className="text-body font-semibold">{title || notification.title}</p>
        <p className="mt-4 text-caption text-(--text-muted)">{message}</p>
      </div>
    </div>
  );
}

export default Notification;
