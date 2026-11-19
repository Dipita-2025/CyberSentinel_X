import { Inbox } from "lucide-react";
import Button from "./Button";

const EmptyState = ({
  title = "No data found",
  description = "There is nothing to display here yet.",
  icon: Icon = Inbox,
  action,
  className = "",
}) => {
  return (
    <div
      className={`
        flex flex-col items-center justify-center
        rounded-xl border border-dashed border-border
        px-6 py-12 text-center
        ${className}
      `}
    >
      <div className="mb-4 rounded-full bg-elevated p-4">
        <Icon size={28} className="text-text-muted" />
      </div>

      <h3 className="text-base font-semibold text-primary-text">{title}</h3>

      <p className="mt-2 max-w-sm text-sm text-text-muted">{description}</p>

      {action && <div className="mt-5">{action}</div>}
    </div>
  );
};

export default EmptyState;
