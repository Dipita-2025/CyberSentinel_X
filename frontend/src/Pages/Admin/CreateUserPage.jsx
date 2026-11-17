import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { PageHeader } from "../../Component";
import { UserForm } from "../../Features/users/components";
import { DEFAULT_USER_ROLES } from "../../Features/users/components/userRoles";
import useGetApiCall from "../../hooks/ApiCall/GetApiCall";

function CreateUserPage() {
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const { data: roleResponse, error: rolesError } = useGetApiCall("/api/roles");
  const roles =
    roleResponse?.roles?.length > 0
      ? roleResponse.roles
      : DEFAULT_USER_ROLES;

  async function handleSubmit(user) {
    setIsSubmitting(true);
    setSubmitError("");

    try {
      await axios.post("/api/users", user, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate("/admin/users");
    } catch (error) {
      setSubmitError(
        error?.response?.data?.detail ?? error?.message ?? "Could not create user.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="mx-auto flex w-full max-w-760 flex-col gap-20 p-16 md:p-24">
      <PageHeader
        eyebrow="User Management"
        title="Create user"
        description="Add an account and choose its initial role."
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

      {rolesError && (
        <p className="text-body text-(--blocked)" role="alert">
          Could not load available roles. Default roles are shown.
        </p>
      )}
      {submitError && (
        <p className="text-body text-(--blocked)" role="alert">
          {submitError}
        </p>
      )}

      <UserForm
        roles={roles}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}

export default CreateUserPage;
