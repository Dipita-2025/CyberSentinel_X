import { formatRoleName } from "./userRoles";

function formatCreatedAt(value) {
  if (!value) {
    return "Not available";
  }

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleString();
}

function UserDetails({ user, onClose, className = "" }) {
  if (!user) {
    return (
      <section
        className={`rounded-lg border border-(--border) bg-(--sidebar) p-16 text-body text-(--text-muted) ${className}`}
      >
        Select a user to view their details.
      </section>
    );
  }

  const details = [
    { label: "User ID", value: user.id ?? "Not available" },
    { label: "Username", value: user.username ?? "Not available" },
    { label: "Role", value: formatRoleName(user.role) || "Not assigned" },
    { label: "Created", value: formatCreatedAt(user.created_at) },
  ];

  if (typeof user.is_active === "boolean") {
    details.push({
      label: "Status",
      value: user.is_active ? "Active" : "Inactive",
    });
  }

  return (
    <section
      aria-labelledby="user-details-heading"
      className={`rounded-lg border border-(--border) bg-(--sidebar) p-16 ${className}`}
    >
      <div className="mb-16 flex items-start justify-between gap-12">
        <div>
          <h2
            id="user-details-heading"
            className="text-head-sec font-semibold text-(--text)"
          >
            User details
          </h2>
          <p className="mt-6 text-caption text-(--text-muted)">
            Account information
          </p>
        </div>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="rounded-md px-10 py-6 text-caption text-(--text-muted) hover:bg-(--card) hover:text-(--text)"
          >
            Close
          </button>
        )}
      </div>

      <dl className="grid grid-cols-1 gap-12 sm:grid-cols-2">
        {details.map((detail) => (
          <div
            key={detail.label}
            className="min-w-0 rounded-md border border-(--border) bg-(--card) p-12"
          >
            <dt className="text-caption text-(--text-muted)">{detail.label}</dt>
            <dd className="mt-6 wrap-break-word text-body font-medium capitalize text-(--text)">
              {detail.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export default UserDetails;
