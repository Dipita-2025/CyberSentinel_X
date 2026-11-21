import { useCallback, useEffect, useMemo, useState } from "react";
import { Plus, ShieldCheck } from "lucide-react";

import { Modal, Button } from "../../components/ui";

import { useDispatch } from "react-redux";
import { showNotification } from "../../Store/Slice/notificationSlice";

import {
  RoleStats,
  RoleFilters,
  RoleCard,
  RoleForm,
  RolePermissionModal,
} from "../../features/roles/components";

import { roleService, applicationService } from "../../services";

const Roles = () => {
  const dispatch = useDispatch();
  const [roles, setRoles] = useState([]);
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);

  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const [selectedRole, setSelectedRole] = useState(null);
  const [permissions, setPermissions] = useState([]);
  const [permissionsLoading, setPermissionsLoading] = useState(false);
  const [isPermissionOpen, setIsPermissionOpen] = useState(false);
  const [applications, setApplications] = useState([]);

  //   fetch applications
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

  // Fetch roles
  const fetchRoles = useCallback(async () => {
    try {
      setLoading(true);

      const response = await roleService.getRoles();

      setRoles(response.roles || []);
    } catch (error) {
      dispatch(
        showNotification({
          message: error.response?.data?.detail || "Failed to fetch roles.",
          type: "error",
        }),
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRoles();
    fetchApplications();
  }, [fetchRoles, fetchApplications]);

  // Search roles
  const filteredRoles = useMemo(() => {
    const searchTerm = search.trim().toLowerCase();

    if (!searchTerm) return roles;

    return roles.filter(
      (role) =>
        role.role_name?.toLowerCase().includes(searchTerm) ||
        role.description?.toLowerCase().includes(searchTerm),
    );
  }, [roles, search]);

  // Create role
  const handleCreateRole = async (roleData) => {
    try {
      setCreating(true);

      const { selectedApplications = [], ...roleDetails } = roleData;

      // Create role
      await roleService.createRole(roleDetails);

      // Assign application permissions
      const failedApplications = [];

      for (const appName of selectedApplications) {
        try {
          await roleService.grantPermission({
            role_name: roleDetails.role_name,
            app_name: appName,
          });
        } catch {
          failedApplications.push(appName);
        }
      }

      setIsCreateOpen(false);
      await fetchRoles();

      if (failedApplications.length > 0) {
        dispatch(
          showNotification({
            message: `Role created, but permission assignment failed for: ${failedApplications.join(", ")}.`,
            type: "error",
          }),
        );
      } else {
        dispatch(
          showNotification({
            message: "Role created successfully.",
            type: "success",
          }),
        );
      }
    } catch (error) {
      dispatch(
        showNotification({
          message: error.response?.data?.detail || "Failed to create role.",
          type: "error",
        }),
      );
    } finally {
      setCreating(false);
    }
  };
  // View role permissions
  const handleViewPermissions = async (role) => {
    setSelectedRole(role);
    setPermissions([]);
    setIsPermissionOpen(true);
    setPermissionsLoading(true);

    try {
      const response = await roleService.getRolePermissions(role.role_name);

      setPermissions(response.permissions || []);
    } catch (error) {
      dispatch(
        showNotification({
          message:
            error.response?.data?.detail || "Failed to fetch role permissions.",
          type: "error",
        }),
      );

      setIsPermissionOpen(false);
    } finally {
      setPermissionsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex  justify-end">
        <Button
          onClick={() => setIsCreateOpen(true)}
          display="flex justify-center items-center gap-1"
        >
          <Plus size={18} strokeWidth={3} />
          Create Role
        </Button>
      </div>

      {/* Statistics */}
      <RoleStats roles={roles} />

      {/* Search */}
      <RoleFilters
        search={search}
        onSearchChange={setSearch}
        onClear={() => setSearch("")}
      />

      {/* Role Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-primary-text">
            System Roles
          </h2>

          <span className="text-sm text-muted">
            {filteredRoles.length} roles
          </span>
        </div>

        {loading ? (
          <div className="card-base p-10 text-center text-muted">
            Loading roles...
          </div>
        ) : filteredRoles.length === 0 ? (
          <div className="card-base p-10 text-center">
            <ShieldCheck size={32} className="mx-auto mb-3 text-muted" />

            <p className="font-medium text-primary-text">No roles found</p>

            <p className="mt-1 text-sm text-muted">
              Try another search or create a new role.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filteredRoles.map((role) => (
              <RoleCard
                key={role.role_id}
                role={role}
                onViewPermissions={handleViewPermissions}
              />
            ))}
          </div>
        )}
      </div>

      {/* Create Role Modal */}
      <Modal
        isOpen={isCreateOpen}
        onClose={() => {
          if (!creating) setIsCreateOpen(false);
        }}
        title="Create New Role"
        description="Add a new role to the CyberSentinel system."
        size="md"
      >
        <RoleForm
          onSubmit={handleCreateRole}
          roles={roles}
          applications={applications}
          loading={creating}
        />
      </Modal>

      {/* Role Permissions Modal */}
      <RolePermissionModal
        isOpen={isPermissionOpen}
        onClose={() => setIsPermissionOpen(false)}
        role={selectedRole}
        permissions={permissions}
        loading={permissionsLoading}
      />
    </div>
  );
};

export default Roles;
