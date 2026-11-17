import { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import { useSelector } from "react-redux";
import { PageHeader } from "../../Component";
import { UserEditForm } from "../../Features/users/components";
import { DEFAULT_USER_ROLES } from "../../Features/users/components/userRoles";
import useGetApiCall from "../../hooks/ApiCall/GetApiCall";

function EditUserPage() {
  const navigate = useNavigate();
  const { userId } = useParams();
  const token = useSelector((state) => state.auth.token);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const {
    data: userResponse,
    loading: usersLoading,
    error: usersError,
    refetch: refetchUsers,
  } = useGetApiCall("/api/users");
  const { data: roleResponse, error: rolesError } =
    useGetApiCall("/api/roles");
  const user = userResponse?.users?.find(
    (item) => String(item.id) === userId,
  );
  const roles =
    roleResponse?.roles?.length > 0
      ? roleResponse.roles
      : DEFAULT_USER_ROLES;

  async function handleSubmit(values) {
    const headers = { Authorization: `Bearer ${token}` };
    const completedChanges = [];
    let username = user.username;
    setIsSubmitting(true);
    setSubmitError("");

    try {
      if (values.username !== user.username) {
        await axios.put(
          `/api/users/${encodeURIComponent(user.username)}/rename`,
          null,
          {
            headers,
            params: { new_username: values.username },
          },
        );
        username = values.username;
        completedChanges.push("Username");
      }

      if (values.role !== user.role) {
        await axios.put(
          `/api/users/${encodeURIComponent(username)}/role`,
          { role_name: values.role },
          { headers },
        );
        completedChanges.push("Role");
      }

      navigate(`/admin/users/${user.id}`);
    } catch (error) {
      const message =
        error?.response?.data?.detail ?? error?.message ?? "Could not update user.";
      setSubmitError(
        completedChanges.length
          ? `${completedChanges.join(" and ")} saved, but another update failed: ${message}`
          : message,
      );
      refetchUsers();
    } finally {
      setIsSubmitting(false);
    }
  }

  const pageError = submitError
    ? submitError
    : usersError
      ? `Could not load users: ${
          usersError.response?.data?.detail ?? usersError.message
        }`
      : rolesError
        ? "Could not load available roles. Default roles are shown."
        : "";

  return (
    <div className="mx-auto flex w-full max-w-760 flex-col gap-20 p-16 md:p-24">
      <PageHeader
        eyebrow="User Management"
        title={user ? `Edit ${user.username}` : "Edit user"}
        description="Update the username or assigned role."
        actions={
          <button
            type="button"
            onClick={() => navigate("/admin/users")}
            className="rounded-md border border-(--border) bg-(--sidebar) px-12 py-10 text-body text-(--text-muted) hover:text-(--text)"
          >
            Back to users
          </button>
        }
      />

      {pageError && (
        <p className="text-body text-(--blocked)" role="alert">
          {pageError}
        </p>
      )}

      {usersLoading ? (
        <p role="status" className="text-body text-(--text-muted)">
          Loading user details...
        </p>
      ) : user ? (
        <UserEditForm
          key={user.id}
          user={user}
          roles={roles}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      ) : usersError ? (
        <p className="text-body text-(--text-muted)">
          User records could not be loaded.
        </p>
      ) : (
        <p className="text-body text-(--text-muted)">User not found.</p>
      )}
    </div>
  );
}

export default EditUserPage;
