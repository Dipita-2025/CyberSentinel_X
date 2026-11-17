import { useState } from "react";
import UserStatusToggle from "./UserStatusToggle";
import { formatRoleName } from "./userRoles";

function getUserStatus(user) {
  if (typeof user.is_active === "boolean") {
    return user.is_active ? "Active" : "Deactivated";
  }

  if (typeof user.status === "string" && user.status.trim()) {
    return user.status;
  }

  return "Unavailable";
}

function UsersTable({
  users = [],
  onViewUser,
  onEditUser,
  onStatusChange,
  emptyMessage = "No users found.",
  currentPage = 1,
  pageSize = 8,
  onPageChange,
}) {
  const [internalPage, setInternalPage] = useState(1);
  const hasActions = Boolean(onEditUser);
  const safePageSize = Math.max(1, pageSize);
  const totalPages = Math.max(1, Math.ceil(users.length / safePageSize));
  const requestedPage = onPageChange ? currentPage : internalPage;
  const page = Math.min(Math.max(requestedPage, 1), totalPages);
  const startIndex = (page - 1) * safePageSize;
  const pageUsers = users.slice(startIndex, startIndex + safePageSize);
  const firstUser = users.length === 0 ? 0 : startIndex + 1;
  const lastUser = Math.min(startIndex + safePageSize, users.length);
  const columnCount = 4 + Number(hasActions);
  const changePage = (nextPage) => {
    if (onPageChange) {
      onPageChange(nextPage);
    } else {
      setInternalPage(nextPage);
    }
  };

  return (
    <section
      aria-label="User directory"
      className="overflow-hidden rounded-lg border border-(--border) bg-(--sidebar)"
    >
      <div className="overflow-x-auto">
        <table className="w-full min-w-680 border-collapse text-left">
          <thead className="bg-(--card)">
            <tr className="border-b border-(--border)">
              <th className="px-16 py-12 text-caption font-semibold text-(--text-muted)">
                Name
              </th>
              <th className="px-16 py-12 text-caption font-semibold text-(--text-muted)">
                Email
              </th>
              <th className="px-16 py-12 text-caption font-semibold text-(--text-muted)">
                Role
              </th>
              <th className="px-16 py-12 text-caption font-semibold text-(--text-muted)">
                Status
              </th>
              {hasActions && (
                <th className="px-16 py-12 text-right text-caption font-semibold text-(--text-muted)">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-(--border)">
            {users.length === 0 ? (
              <tr>
                <td
                  colSpan={columnCount}
                  className="px-16 py-24 text-center text-body text-(--text-muted)"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              pageUsers.map((user) => {
                const status = getUserStatus(user);
                const normalizedStatus = status.toLowerCase();
                const isInactive = [
                  "inactive",
                  "deactivated",
                  "disabled",
                  "blocked",
                ].includes(normalizedStatus);
                const isActive = ["active", "enabled"].includes(
                  normalizedStatus,
                );
                const statusStyle = isActive
                  ? "bg-(--allow)/10 text-(--allow)"
                  : isInactive
                    ? "bg-(--blocked)/10 text-(--blocked)"
                    : "bg-(--elevated) text-(--text-muted)";
                const name =
                  user.name ?? user.full_name ?? user.username ?? "Unknown user";

                return (
                  <tr key={user.id ?? user.username}>
                    <td className="max-w-240 px-16 py-12">
                      {onViewUser ? (
                        <button
                          type="button"
                          onClick={() => onViewUser(user)}
                          className="truncate text-left text-body font-medium text-(--text) hover:text-(--accent-light)"
                        >
                          {name}
                        </button>
                      ) : (
                        <p className="truncate text-body font-medium text-(--text)">
                          {name}
                        </p>
                      )}
                    </td>
                    <td className="max-w-240 truncate px-16 py-12 text-caption text-(--text-muted)">
                      {user.email ?? user.email_address ?? "Unavailable"}
                    </td>
                    <td className="whitespace-nowrap px-16 py-12 text-caption text-(--text-muted)">
                      {formatRoleName(user.role) || "Not assigned"}
                    </td>
                    <td className="whitespace-nowrap px-16 py-12">
                      {onStatusChange &&
                      typeof user.is_active === "boolean" ? (
                        <UserStatusToggle
                          label={name}
                          isActive={user.is_active}
                          onChange={(isActive) =>
                            onStatusChange(user, isActive)
                          }
                        />
                      ) : (
                        <span
                          className={`rounded-full px-10 py-6 text-caption ${statusStyle}`}
                        >
                          {status}
                        </span>
                      )}
                    </td>
                    {hasActions && (
                      <td className="whitespace-nowrap px-16 py-12 text-right">
                        <button
                          type="button"
                          onClick={() => onEditUser(user)}
                          className="rounded-md px-8 py-6 text-caption font-medium text-(--text-muted) hover:bg-(--card) hover:text-(--text)"
                        >
                          Edit
                        </button>
                      </td>
                    )}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <footer className="flex flex-col gap-12 border-t border-(--border) px-16 py-12 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-col gap-6">
          <p className="text-caption text-(--text-muted)">
            Showing {pageUsers.length} records
          </p>
          <p className="text-caption text-(--text-muted)">
            {firstUser}-{lastUser} of {users.length} users · Page {page} of{" "}
            {totalPages}
          </p>
        </div>
        <nav aria-label="User pagination" className="flex items-center gap-8">
          <button
            type="button"
            onClick={() => changePage(page - 1)}
            disabled={page <= 1}
            className="rounded-md border border-(--border) bg-(--card) px-12 py-8 text-caption text-(--text) transition-colors hover:bg-(--elevated) disabled:cursor-not-allowed disabled:opacity-40"
          >
            Previous page
          </button>
          <button
            type="button"
            onClick={() => changePage(page + 1)}
            disabled={page >= totalPages}
            className="rounded-md border border-(--border) bg-(--card) px-12 py-8 text-caption text-(--text) transition-colors hover:bg-(--elevated) disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next page
          </button>
        </nav>
      </footer>
    </section>
  );
}

export default UsersTable;
