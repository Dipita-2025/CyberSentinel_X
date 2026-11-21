import { ShieldCheck, Eye } from "lucide-react";
import { Button } from "../../../components/ui";

const RoleCard = ({ role, onViewPermissions }) => {
  return (
    <div className="card-base flex flex-col gap-4 p-5 transition-colors hover:border-accent/50">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-base font-semibold text-primary-text">
            {role.role_name[0].toUpperCase() + role.role_name.slice(1)}
          </h3>

          <p className="mt-1 text-xs text-muted">Role ID: {role.role_id}</p>
        </div>

        <div className="rounded-lg bg-accent/10 p-2 text-accent">
          <ShieldCheck size={20} />
        </div>
      </div>

      <p className="min-h-10 text-sm leading-6 text-muted">
        {role.description || "No description provided."}
      </p>

      <div className="mt-auto border-t border-border pt-3">
        <Button size="sm" onClick={() => onViewPermissions?.(role)}>
          View Role Policy
        </Button>
      </div>
    </div>
  );
};

export default RoleCard;
