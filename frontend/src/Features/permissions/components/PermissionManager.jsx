import { ShieldCheck, ShieldX, Shield } from "lucide-react";
import { Button } from "../../../components/ui";

const PermissionManager = ({
  role,
  permissions = [],
  applications = [],
  onGrant,
  onRevoke,
  loading = false,
}) => {
  const getPermission = (appName) => {
    return permissions.find((permission) => permission.app_name === appName);
  };

  const handleAction = (application) => {
    const permission = getPermission(application.app_name);

    if (permission?.can_access === 1) {
      onRevoke?.(application.app_name);
    } else {
      onGrant?.(application.app_name);
    }
  };

  return (
    <div className="space-y-6">
      {/* Role Information */}
      <div className="rounded-xl border border-border bg-elevated p-4">
        <div className="flex items-center gap-3">
          <Shield className="text-accent" size={24} />

          <div>
            <h3 className="text-lg font-semibold text-primary-text">
              {role?.role_name}
            </h3>

            <p className="text-sm text-muted">
              {role?.description || "Manage application permissions."}
            </p>
          </div>
        </div>
      </div>

      {/* Application Permissions */}
      <div className="space-y-3">
        <div>
          <h4 className="text-base font-semibold text-primary-text">
            Application Permissions
          </h4>

          <p className="mt-1 text-sm text-muted">
            Manage application access for this role.
          </p>
        </div>

        {applications.length === 0 ? (
          <div className="rounded-lg border border-border bg-elevated p-8 text-center">
            <p className="text-sm text-muted">No applications available.</p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full min-w-150">
              <thead className="bg-elevated">
                <tr className="text-xs font-semibold uppercase text-muted">
                  <th className="px-4 py-3 text-left">Application</th>

                  <th className="px-4 py-3 text-center">Permission Status</th>

                  <th className="px-4 py-3 text-center">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-border">
                {applications.map((application) => {
                  const permission = getPermission(application.app_name);

                  const isAllowed = permission?.can_access === 1;

                  return (
                    <tr
                      key={application.app_id}
                      className="transition-colors hover:bg-elevated/50"
                    >
                      {/* Application */}
                      <td className="px-4 py-4">
                        <p className="text-sm font-medium text-primary-text">
                          {application.app_name}
                        </p>

                        <p className="mt-1 text-xs text-muted">
                          {application.description ||
                            "No description available"}
                        </p>
                      </td>

                      {/* Permission Status */}
                      <td className="px-4 py-4 text-center">
                        <div className="inline-flex items-center gap-2">
                          {isAllowed ? (
                            <>
                              <ShieldCheck size={16} className="text-allow" />

                              <span className="text-xs font-medium text-allow">
                                Granted
                              </span>
                            </>
                          ) : (
                            <>
                              <ShieldX size={16} className="text-blocked" />

                              <span className="text-xs font-medium text-blocked">
                                Revoked
                              </span>
                            </>
                          )}
                        </div>
                      </td>

                      {/* Action */}
                      <td className="px-4 py-4 text-center">
                        <Button
                          size="sm"
                          variant={isAllowed ? "danger" : "primary"}
                          disabled={loading}
                          onClick={() => handleAction(application)}
                        >
                          {isAllowed ? "Revoke Access" : "Grant Access"}
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default PermissionManager;
