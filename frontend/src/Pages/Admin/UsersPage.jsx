import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { PageHeader } from "../../Component";
import { UserFilters, UsersTable } from "../../Features/users/components";
import { DEFAULT_USER_ROLES } from "../../Features/users/components/userRoles";
import useGetApiCall from "../../hooks/ApiCall/GetApiCall";

const EMPTY_USERS = [];

function getErrorMessage(error) {
  return error?.response?.data?.detail ?? error?.message ?? "Request failed.";
}

function UsersPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const {
    data: userResponse,
    loading: usersLoading,
    error: usersError,
  } = useGetApiCall("/api/users");
  const {
    data: roleResponse,
    loading: rolesLoading,
    error: rolesError,
  } = useGetApiCall("/api/roles");
  const users = userResponse?.users ?? EMPTY_USERS;
  const roles =
    roleResponse?.roles?.length > 0
      ? roleResponse.roles
      : DEFAULT_USER_ROLES;
  const filteredUsers = useMemo(() => {
    const query = search.trim().toLowerCase();

    return users.filter((user) => {
      const username = user.username?.toLowerCase() ?? "";
      const userRole = user.role?.toLowerCase() ?? "";
      const matchesSearch =
        !query ||
        username.includes(query) ||
        userRole.replace(/_/g, " ").includes(query);
      const matchesRole = role === "all" || user.role === role;

      return matchesSearch && matchesRole;
    });
  }, [users, search, role]);
  const pageSize = 8;
  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / pageSize));
  const safeCurrentPage = Math.min(currentPage, totalPages);

  function handleSearchChange(value) {
    setSearch(value);
    setCurrentPage(1);
  }

  function handleRoleChange(value) {
    setRole(value);
    setCurrentPage(1);
  }

  const pageError = usersError
    ? `Could not load users: ${getErrorMessage(usersError)}`
    : rolesError
      ? `Could not load roles: ${getErrorMessage(rolesError)}`
      : "";

  return (
    <div className="flex flex-col gap-20 p-16 md:p-24">
      <PageHeader
        eyebrow="Administration"
        title="User Management"
        description="Create accounts, search users, and review user details."
        actions={
          <button
            type="button"
            onClick={() => navigate("/admin/users/new")}
            className="min-h-40 rounded-md bg-(--button) px-16 py-10 text-body font-medium text-(--button-text) transition-opacity hover:opacity-90"
          >
            Create user
          </button>
        }
      />

      {pageError && (
        <p
          className="rounded-md border border-(--blocked) px-12 py-10 text-body text-(--blocked)"
          role="alert"
        >
          {pageError}
        </p>
      )}

      <UserFilters
        search={search}
        role={role}
        roles={[{ role_name: "all", label: "All roles" }, ...roles]}
        onSearchChange={handleSearchChange}
        onRoleChange={handleRoleChange}
      />
      {rolesLoading && (
        <p className="text-caption text-(--text-muted)" role="status">
          Loading role filters...
        </p>
      )}

      <p className="rounded-md border border-(--border) bg-(--sidebar) px-12 py-10 text-caption text-(--text-muted)">
        Account activation status is not available from the current users API.
      </p>

      {usersLoading ? (
        <p
          className="py-24 text-center text-body text-(--text-muted)"
          role="status"
        >
          Loading users...
        </p>
      ) : usersError ? (
        <p className="py-24 text-center text-body text-(--text-muted)">
          User records could not be loaded.
        </p>
      ) : (
        <UsersTable
          users={filteredUsers}
          onViewUser={(user) => navigate(`/admin/users/${user.id}`)}
          currentPage={safeCurrentPage}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          emptyMessage={
            search || role !== "all"
              ? "No users match these filters."
              : "No users have been added yet."
          }
        />
      )}
    </div>
  );
}

export default UsersPage;