import { useNavigate, useParams } from "react-router";
import { PageHeader } from "../../Component";
import { UserDetails } from "../../Features/users/components";
import useGetApiCall from "../../hooks/ApiCall/GetApiCall";

function UserDetailsPage() {
  const navigate = useNavigate();
  const { userId } = useParams();
  const { data, loading, error } = useGetApiCall("/api/users");
  const user = data?.users?.find((item) => String(item.id) === userId);

  return (
    <div className="mx-auto flex w-full max-w-960 flex-col gap-20 p-16 md:p-24">
      <PageHeader
        eyebrow="User Management"
        title={user?.username ?? "User details"}
        description="Review account information and assigned role."
        actions={
          <button
            type="button"
            onClick={() =>
              user
                ? navigate(`/admin/users/${user.id}/edit`)
                : navigate("/admin/users")
            }
            disabled={!user}
            className="rounded-md bg-(--button) px-12 py-10 text-body font-medium text-(--button-text) disabled:cursor-not-allowed disabled:opacity-60"
          >
            Edit user
          </button>
        }
      />

      <button
        type="button"
        onClick={() => navigate("/admin/users")}
        className="self-start rounded-md border border-(--border) bg-(--sidebar) px-12 py-10 text-body text-(--text-muted) hover:text-(--text)"
      >
        Back to users
      </button>

      {loading ? (
        <p role="status" className="text-body text-(--text-muted)">
          Loading user details...
        </p>
      ) : error ? (
        <p role="alert" className="text-body text-(--blocked)">
          {error.response?.data?.detail ?? error.message}
        </p>
      ) : user ? (
        <UserDetails user={user} />
      ) : (
        <p role="alert" className="text-body text-(--text-muted)">
          User not found.
        </p>
      )}
    </div>
  );
}

export default UserDetailsPage;
