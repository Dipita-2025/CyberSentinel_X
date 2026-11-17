import { useMemo, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { PageHeader } from "../../Component";
import { RoleForm, RolesTable } from "../../Features/roles/components";
import useGetApiCall from "../../hooks/ApiCall/GetApiCall";

const EMPTY_ROLES = [];
const EMPTY_USERS = [];

function getErrorMessage(error) {
  return error?.response?.data?.detail ?? error?.message ?? "Request failed.";
}

function RoleManagementPage() {
  const token = useSelector((state) => state.auth.token);
  const [roleName, setRoleName] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const {
    data: roleResponse,
    loading: rolesLoading,
    error: rolesError,
    refetch: refetchRoles,
  } = useGetApiCall("/api/roles");
  const {
    data: userResponse,
    error: usersError,
  } = useGetApiCall("/api/users");
  const roles = roleResponse?.roles ?? EMPTY_ROLES;
  const users = userResponse?.users ?? EMPTY_USERS;
  const userCounts = useMemo(
    () =>
      users.reduce((counts, user) => {
        if (user.role) {
          counts[user.role] = (counts[user.role] ?? 0) + 1;
        }
        return counts;
      }, {}),
    [users],
  );

  async function handleCreateRole(event) {
    event.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    const normalizedRoleName = roleName.trim();
    const normalizedDescription = description.trim();
    if (!normalizedRoleName || !normalizedDescription) {
      setErrorMessage("Enter both a role name and description.");
      return;
    }

    setIsSubmitting(true);
    try {
      await axios.post(
        "/api/roles",
        {
          role_name: normalizedRoleName,
          description: normalizedDescription,
        },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setRoleName("");
      setDescription("");
      setSuccessMessage(`Role "${normalizedRoleName}" was created.`);
      refetchRoles();
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex flex-col gap-20 p-16 md:p-24">
      <PageHeader
        eyebrow="Administration"
        title="Role Management"
        description="Create roles and review how they are assigned to users."
      />

      {(errorMessage || rolesError || usersError) && (
        <p
          className="rounded-md border border-(--blocked) px-12 py-10 text-body text-(--blocked)"
          role="alert"
        >
          {errorMessage ||
            (rolesError
              ? `Could not load roles: ${getErrorMessage(rolesError)}`
              : `Could not load user counts: ${getErrorMessage(usersError)}`)}
        </p>
      )}
      {successMessage && (
        <p
          className="rounded-md border border-(--allow) px-12 py-10 text-body text-(--allow)"
          role="status"
        >
          {successMessage}
        </p>
      )}

      <div className="grid grid-cols-1 items-start gap-16 xl:grid-cols-[minmax(0,1.4fr)_minmax(300px,0.8fr)]">
        <section className="flex min-w-0 flex-col gap-12">
          <div className="flex flex-wrap items-center justify-between gap-8">
            <h2 className="text-head-sec font-semibold text-(--text)">
              Available roles
            </h2>
            <span className="text-caption text-(--text-muted)">
              {rolesLoading ? "Loading roles..." : `${roles.length} roles`}
            </span>
          </div>
          {rolesLoading ? (
            <p className="py-24 text-center text-body text-(--text-muted)" role="status">
              Loading roles...
            </p>
          ) : rolesError ? (
            <p className="py-24 text-center text-body text-(--text-muted)">
              Role records could not be loaded.
            </p>
          ) : (
            <RolesTable roles={roles} userCounts={userCounts} />
          )}
        </section>

        <RoleForm
          roleName={roleName}
          description={description}
          onRoleNameChange={setRoleName}
          onDescriptionChange={setDescription}
          onSubmit={handleCreateRole}
          isSubmitting={isSubmitting}
        />
      </div>

      <p className="rounded-md border border-(--border) bg-(--sidebar) px-12 py-10 text-caption text-(--text-muted)">
        The current API supports creating and viewing roles. Editing or deleting
        a role is not available.
      </p>
    </div>
  );
}

export default RoleManagementPage;
