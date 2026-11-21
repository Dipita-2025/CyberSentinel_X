import { useCallback, useEffect, useState } from "react";
import { ShieldCheck, Shield, ShieldX } from "lucide-react";

import { useDispatch } from "react-redux";
import { showNotification } from "../../Store/Slice/notificationSlice";

import { Button, Select, StatCard } from "../../components/ui";

import { PermissionManager } from "../../features/permissions/components";

import { roleService, applicationService } from "../../services";

const Permissions = () => {
  const dispatch = useDispatch();
  const [roles, setRoles] = useState([]);
  const [applications, setApplications] = useState([]);

  const [selectedRole, setSelectedRole] = useState(null);
  const [permissions, setPermissions] = useState([]);

  const [loading, setLoading] = useState(true);
  const [permissionsLoading, setPermissionsLoading] = useState(false);

  const fetchRoles = useCallback(async () => {
    try {
      const response = await roleService.getRoles();
      setRoles(response.roles || []);
    } catch (error) {
      dispatch(
        showNotification({
          message: error.response?.data?.detail || "Failed to fetch roles.",
          type: "error",
        }),
      );
    }
  }, []);

  const fetchApplications = useCallback(async () => {
    try {
      const response = await applicationService.getApplications();
      setApplications(response.applications || []);
    } catch (error) {
      dispatch(
        showNotification({
          message:
            error.response?.data?.detail || "Failed to fetch applications.",
          type: "error",
        }),
      );
    }
  }, []);

  const fetchRolePermissions = useCallback(
    async (role) => {
      if (!role) return false;

      try {
        setPermissionsLoading(true);
        setSelectedRole(role);

        const response = await roleService.getRolePermissions(role.role_name);

        setPermissions(response.permissions || []);
        return true;
      } catch (error) {
        setPermissions([]);

        dispatch(
          showNotification({
            message:
              error.response?.data?.detail ||
              "Failed to fetch role permissions.",
            type: "error",
          }),
        );

        return false;
      } finally {
        setPermissionsLoading(false);
      }
    },
    [dispatch],
  );

  const handleGrantPermission = async (appName) => {
    try {
      setPermissionsLoading(true);

      await roleService.grantPermission({
        role_name: selectedRole.role_name,
        app_name: appName,
      });

      const refreshed = await fetchRolePermissions(selectedRole);

      if (refreshed) {
        dispatch(
          showNotification({
            message: `Access granted to ${appName}.`,
            type: "success",
          }),
        );
      }
    } catch (error) {
      dispatch(
        showNotification({
          message:
            error.response?.data?.detail || "Failed to grant permission.",
          type: "error",
        }),
      );
    } finally {
      setPermissionsLoading(false);
    }
  };

  const handleRevokePermission = async (appName) => {
    try {
      setPermissionsLoading(true);

      await roleService.revokePermission({
        role_name: selectedRole.role_name,
        app_name: appName,
      });

      const refreshed = await fetchRolePermissions(selectedRole);

      if (refreshed) {
        dispatch(
          showNotification({
            message: `Access revoked for ${appName}.`,
            type: "success",
          }),
        );
      }
    } catch (error) {
      dispatch(
        showNotification({
          message:
            error.response?.data?.detail || "Failed to revoke permission.",
          type: "error",
        }),
      );
    } finally {
      setPermissionsLoading(false);
    }
  };
  const grantedCount = applications.filter((application) =>
    permissions.some(
      (permission) =>
        permission.app_name === application.app_name &&
        permission.can_access === 1,
    ),
  ).length;

  const revokedCount = applications.length - grantedCount;

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);

      await Promise.all([fetchRoles(), fetchApplications()]);

      setLoading(false);
    };

    loadData();
  }, [fetchRoles, fetchApplications]);

  return (
    <div className="space-y-6">
      {/* Permission Statistics */}
      {selectedRole && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <StatCard
            title="Total Granted"
            value={grantedCount}
            description="Applications with access granted"
            icon={ShieldCheck}
          />

          <StatCard
            title="Total Revoked"
            value={revokedCount}
            description="Applications without access"
            icon={ShieldX}
          />
        </div>
      )}

      {/* Role Selection */}
      <div className="rounded-xl border border-border bg-card p-5">
        <div className="mb-4">
          <h2 className="text-base font-semibold text-primary-text">
            Select Role
          </h2>

          <p className="mt-1 text-sm text-muted">
            Choose a role to view and manage its permissions.
          </p>
        </div>

        <div className="max-w-md">
          <Select
            name="role"
            value={selectedRole?.role_name || ""}
            onChange={(value) => {
              const role = roles.find((item) => item.role_name === value);

              if (role) {
                fetchRolePermissions(role);
              } else {
                setSelectedRole(null);
                setPermissions([]);
              }
            }}
            options={roles.map((role) => ({
              label: role.role_name,
              value: role.role_name,
            }))}
            placeholder="Select a role"
            disabled={loading || roles.length === 0}
          />
        </div>
      </div>

      {/* Permission Manager */}
      {selectedRole && (
        <div className="rounded-xl border border-border bg-card p-5">
          {permissionsLoading && permissions.length === 0 ? (
            <div className="py-10 text-center text-sm text-muted">
              Loading permissions...
            </div>
          ) : (
            <PermissionManager
              role={selectedRole}
              permissions={permissions}
              applications={applications}
              onGrant={handleGrantPermission}
              onRevoke={handleRevokePermission}
              loading={permissionsLoading}
            />
          )}
        </div>
      )}

      {/* Empty State */}
      {!selectedRole && !loading && (
        <div className="rounded-xl border border-border bg-card p-10 text-center">
          <ShieldCheck size={36} className="mx-auto text-muted" />

          <h3 className="mt-3 text-base font-semibold text-primary-text">
            No Role Selected
          </h3>

          <p className="mt-1 text-sm text-muted">
            Select a role above to manage its application permissions.
          </p>
        </div>
      )}

      {loading && (
        <div className="rounded-xl border border-border bg-card p-10 text-center text-sm text-muted">
          Loading roles and applications...
        </div>
      )}
    </div>
  );
};

export default Permissions;
