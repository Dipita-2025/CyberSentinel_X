import { ShieldCheck, ShieldX } from "lucide-react";
import { Modal, Button } from "../../../components/ui";

const RolePermissionModal = ({
  isOpen,
  onClose,
  role,
  permissions = [],
  loading = false,
}) => {
  const validPermissions = permissions.filter(
    (permission) => permission.app_name !== null,
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`${role?.role_name || "Role"} Policy`}
      description="Application access permissions assigned to this role."
      size="lg"
    >
      <div className="space-y-4">
        {loading ? (
          <p className="py-10 text-center text-sm text-muted">
            Loading permissions...
          </p>
        ) : validPermissions.length === 0 ? (
          <p className="py-10 text-center text-sm text-muted">
            No application permissions found.
          </p>
        ) : (
          <div className="space-y-3">
            {validPermissions.map((permission, index) => {
              const allowed = permission.can_access === 1;

              return (
                <div
                  key={`${permission.app_name}-${index}`}
                  className="flex items-center justify-between gap-4 rounded-lg border border-border bg-elevated p-4"
                >
                  <div className="flex items-center gap-3">
                    {allowed ? (
                      <ShieldCheck size={20} className="text-allow" />
                    ) : (
                      <ShieldX size={20} className="text-blocked" />
                    )}

                    <span className="text-sm font-medium text-primary-text">
                      {permission.app_name}
                    </span>
                  </div>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      allowed
                        ? "bg-allow-bg text-allow"
                        : "bg-blocked-bg text-blocked"
                    }`}
                  >
                    {allowed ? "Allowed" : "Denied"}
                  </span>
                </div>
              );
            })}
          </div>
        )}

        <div className="flex justify-end border-t border-border pt-4">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default RolePermissionModal;
